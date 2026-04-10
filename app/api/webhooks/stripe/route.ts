import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getClientByStripeCustomer, updateClient } from "@/lib/clients";
import { sendEmail } from "@/lib/send-email";
import { buildThankYouEmail, getThankYouSubject } from "@/lib/payment-email-templates";
import { releaseBot, configureBot } from "@/lib/bot-pool";
import { supabase } from "@/lib/supabase";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  const stripe = getStripe();

  // Try both webhook secrets — main webhook + automate-signups destination
  const secrets = [
    process.env.STRIPE_WEBHOOK_SECRET,
    process.env.STRIPE_AGENT_WEBHOOK_SECRET,
  ].filter(Boolean) as string[];

  let event: Stripe.Event | null = null;
  for (const secret of secrets) {
    try {
      event = stripe.webhooks.constructEvent(body, sig, secret);
      break;
    } catch {
      // Try next secret
    }
  }

  if (!event) {
    console.error("[Stripe Webhook] Signature verification failed with all secrets");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const customerId = getCustomerId(event.data.object);
  const client = customerId ? await getClientByStripeCustomer(customerId) : null;

  switch (event.type) {
    // Checkout completed — new agent signup via /automate
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const plan = session.metadata?.agent_plan || session.metadata?.plan;
      const customerEmail = session.customer_email || session.customer_details?.email;
      const stripeCustomerId = typeof session.customer === "string" ? session.customer : null;
      const subscriptionId = typeof session.subscription === "string" ? session.subscription : null;

      console.log(
        `[CHECKOUT] Session completed — ${session.id} | Plan: ${plan} | Email: ${customerEmail} | Subscription: ${subscriptionId}`
      );

      // Store the metered subscription item ID for usage reporting
      if (subscriptionId) {
        const stripe = getStripe();
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const meteredItem = subscription.items.data.find(
          (item) => (item.price as Stripe.Price).recurring?.usage_type === "metered"
        );

        if (meteredItem) {
          // Save to Supabase for usage tracking
          await supabase.from("agent_subscriptions").upsert({
            stripe_customer_id: stripeCustomerId,
            subscription_id: subscriptionId,
            subscription_item_id: meteredItem.id,
            plan: plan,
            customer_email: customerEmail,
            status: "active",
            created_at: new Date().toISOString(),
          }, { onConflict: "stripe_customer_id" });

          console.log(`[CHECKOUT] Stored metered item ${meteredItem.id} for usage tracking`);
        }
      }

      // Alert you about new agent signup
      await sendEmail({
        to: "agent@martinbuilds.ai",
        subject: `🚀 New Agent Signup: ${plan?.toUpperCase()} — ${customerEmail}`,
        body: `New AI agent customer!\n\nPlan: ${plan}\nEmail: ${customerEmail}\nCustomer ID: ${stripeCustomerId}\nSubscription: ${subscriptionId}\n\nSetup fee has been charged. Metered billing is active.\nTime to build their agent! 🏗️`,
      }).catch(() => {});

      break;
    }

    // Payment succeeded — ensure active + log metadata
    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(
        `[PAYMENT] Invoice paid — ${invoice.id} | $${(invoice.amount_paid / 100).toFixed(2)} | Customer: ${invoice.customer_email || invoice.customer}`,
        invoice.metadata
      );
      if (client) {
        await updateClient(client.email, { active: true });
        console.log(`[Stripe] ${client.business_name} payment received — agent active`);
      }

      // Handle installment subscription payments
      const subId = (invoice as unknown as { subscription?: string | null }).subscription;
      let installmentContext: {
        clientName: string;
        projectName: string;
        paymentsMade: number;
        totalPayments: number;
        totalAmount: number;
        complete: boolean;
      } | null = null;

      if (subId && typeof subId === "string") {
        try {
          const sub = await stripe.subscriptions.retrieve(subId);
          if (sub.metadata?.payment_type === "installment") {
            const paymentsMade = parseInt(sub.metadata.payments_made || "0") + 1;
            const totalPayments = parseInt(sub.metadata.num_payments || "0");
            const totalAmount = parseInt(sub.metadata.total_owed || "0");
            await stripe.subscriptions.update(sub.id, {
              metadata: { ...sub.metadata, payments_made: paymentsMade.toString() },
            });
            console.log(`[INSTALLMENT] Payment ${paymentsMade}/${totalPayments} received for ${sub.metadata.project_name}`);

            installmentContext = {
              clientName: sub.metadata.client_name || "there",
              projectName: sub.metadata.project_name || "your project",
              paymentsMade,
              totalPayments,
              totalAmount,
              complete: paymentsMade >= totalPayments,
            };

            if (installmentContext.complete) {
              console.log(`[INSTALLMENT] All payments complete for ${sub.metadata.project_name}`);
            }
          }
        } catch (e) {
          console.error("Installment tracking error:", e);
        }
      }

      // Send branded thank-you for admin-created invoices
      if (invoice.metadata?.created_by === "martin.builds admin") {
        const paymentType = invoice.metadata.payment_type as "full" | "deposit" | "final";
        if (paymentType === "full" || paymentType === "deposit" || paymentType === "final") {
          const recipientEmail = invoice.customer_email || (invoice.customer as Stripe.Customer)?.email;
          if (recipientEmail) {
            const html = buildThankYouEmail({
              type: paymentType,
              clientName: invoice.metadata.client_name || "there",
              projectName: invoice.metadata.project_name || "your project",
              amount: invoice.amount_paid,
              totalAmount: parseInt(invoice.metadata.total_amount || "0") || undefined,
            });
            await sendEmail({
              to: recipientEmail,
              subject: getThankYouSubject(paymentType, invoice.metadata.project_name || "your project"),
              body: html,
              isHtml: true,
            }).catch((e) => console.error("Thank-you email failed:", e));
          }
        }
      }

      // Send branded installment receipt (+ completion email on last payment)
      if (installmentContext) {
        const recipientEmail = invoice.customer_email || (invoice.customer as Stripe.Customer)?.email;
        if (recipientEmail) {
          const receiptHtml = buildThankYouEmail({
            type: "installment",
            clientName: installmentContext.clientName,
            projectName: installmentContext.projectName,
            amount: invoice.amount_paid,
            totalAmount: installmentContext.totalAmount || undefined,
            installmentNumber: installmentContext.paymentsMade,
            totalInstallments: installmentContext.totalPayments,
          });
          await sendEmail({
            to: recipientEmail,
            subject: getThankYouSubject("installment", installmentContext.projectName),
            body: receiptHtml,
            isHtml: true,
          }).catch((e) => console.error("Installment receipt email failed:", e));

          if (installmentContext.complete) {
            const doneHtml = buildThankYouEmail({
              type: "installment_complete",
              clientName: installmentContext.clientName,
              projectName: installmentContext.projectName,
              amount: installmentContext.totalAmount || invoice.amount_paid,
              totalAmount: installmentContext.totalAmount || undefined,
              installmentNumber: installmentContext.paymentsMade,
              totalInstallments: installmentContext.totalPayments,
            });
            await sendEmail({
              to: recipientEmail,
              subject: getThankYouSubject("installment_complete", installmentContext.projectName),
              body: doneHtml,
              isHtml: true,
            }).catch((e) => console.error("Installment completion email failed:", e));
          }
        }
      }
      break;
    }

    case "payment_intent.succeeded": {
      const intent = event.data.object as Stripe.PaymentIntent;
      console.log(
        `[PAYMENT] PaymentIntent succeeded — ${intent.id} | $${(intent.amount / 100).toFixed(2)}`,
        intent.metadata
      );

      // Handle two-phase project payments
      if (intent.metadata?.payment_type === "two_phase") {
        const phase = intent.metadata.phase;

        if (phase === "1") {
          // Phase 1 payment succeeded - update project status
          const { data: projects } = await supabase
            .from("project_payments")
            .select("*")
            .eq("phase_1_payment_intent_id", intent.id)
            .single();

          if (projects) {
            await supabase
              .from("project_payments")
              .update({
                phase_1_status: "paid",
                phase_1_paid_at: new Date().toISOString(),
                project_status: "in_progress",
              })
              .eq("id", projects.id);

            console.log(`[TWO-PHASE] Phase 1 paid for project: ${projects.project_name}`);

            // Send branded confirmation email
            const phase1Html = buildThankYouEmail({
              type: "deposit",
              clientName: projects.client_name,
              projectName: projects.project_name,
              amount: intent.amount,
              totalAmount: projects.total_amount,
            });
            await sendEmail({
              to: projects.client_email,
              subject: getThankYouSubject("deposit", projects.project_name),
              body: phase1Html,
              isHtml: true,
            }).catch((e) => console.error("Email send failed:", e));

            // Alert me
            await sendEmail({
              to: "agent@martinbuilds.ai",
              subject: `✅ Phase 1 Paid: ${projects.project_name}`,
              body: `${projects.client_name} (${projects.client_email}) paid Phase 1.\nProject: ${projects.project_name}\nAmount: $${(intent.amount / 100).toFixed(2)}\nTotal: $${(projects.total_amount / 100).toFixed(2)}\n\nProject ID: ${projects.id}`,
            }).catch(() => {});
          }
        } else if (phase === "2") {
          // Phase 2 payment succeeded - project complete
          const { data: projects } = await supabase
            .from("project_payments")
            .select("*")
            .eq("phase_2_payment_intent_id", intent.id)
            .single();

          if (projects) {
            await supabase
              .from("project_payments")
              .update({
                phase_2_status: "paid",
                phase_2_paid_at: new Date().toISOString(),
                project_status: "completed",
              })
              .eq("id", projects.id);

            console.log(`[TWO-PHASE] Phase 2 paid - project completed: ${projects.project_name}`);

            // Send branded confirmation email
            const phase2Html = buildThankYouEmail({
              type: "final",
              clientName: projects.client_name,
              projectName: projects.project_name,
              amount: intent.amount,
              totalAmount: projects.total_amount,
            });
            await sendEmail({
              to: projects.client_email,
              subject: getThankYouSubject("final", projects.project_name),
              body: phase2Html,
              isHtml: true,
            }).catch((e) => console.error("Email send failed:", e));

            // Alert me
            await sendEmail({
              to: "agent@martinbuilds.ai",
              subject: `🎉 Phase 2 Paid - Project Complete: ${projects.project_name}`,
              body: `${projects.client_name} (${projects.client_email}) paid Phase 2.\nProject: ${projects.project_name}\nAmount: $${(intent.amount / 100).toFixed(2)}\nTotal project value: $${(projects.total_amount / 100).toFixed(2)}\n\nProject ID: ${projects.id}\n\nREADY FOR DELIVERY!`,
            }).catch(() => {});
          }
        }
      }
      break;
    }

    // Payment failed — kill switch
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      console.error(
        `[PAYMENT] Invoice payment failed — ${invoice.id} | Customer: ${invoice.customer_email || invoice.customer}`,
        invoice.metadata
      );
      if (client) {
        await updateClient(client.email, { active: false });
        console.log(`[Stripe] ${client.business_name} payment FAILED — agent DEACTIVATED`);

        await sendEmail({
          to: "agent@martinbuilds.ai",
          subject: `⚠️ Payment Failed: ${client.business_name}`,
          body: `${client.name} (${client.email}) payment failed.\nAgent has been automatically deactivated.\nBusiness: ${client.business_name}\nPlan: ${client.plan}`,
        }).catch(() => {});
      }
      break;
    }

    // New subscription created
    case "customer.subscription.created": {
      const sub = event.data.object as Stripe.Subscription;
      console.log(
        `[SUBSCRIPTION] New subscription — ${sub.id} | Customer: ${sub.customer}`,
        sub.metadata
      );
      break;
    }

    // Subscription canceled — release bot back to pool
    case "customer.subscription.deleted": {
      if (client) {
        await updateClient(client.email, { active: false });
        console.log(`[Stripe] ${client.business_name} subscription canceled — agent DEACTIVATED`);

        if (client.id && client.bot_token) {
          await releaseBot(client.id);
          await configureBot(client.bot_token, "MB Agent (Available)", "martin.builds", "Available agent — pending assignment.");
          await updateClient(client.email, { bot_token: undefined, bot_username: undefined });
          console.log(`[Stripe] Bot released back to pool for ${client.business_name}`);
        }

        await sendEmail({
          to: "agent@martinbuilds.ai",
          subject: `❌ Subscription Canceled: ${client.business_name}`,
          body: `${client.name} (${client.email}) canceled their subscription.\nAgent deactivated. Bot released back to pool.\nBusiness: ${client.business_name}`,
        }).catch(() => {});
      }
      break;
    }

    // Subscription reactivated
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      if (client && sub.status === "active") {
        await updateClient(client.email, { active: true });
        console.log(`[Stripe] ${client.business_name} subscription reactivated`);
      }
      break;
    }

    default:
      console.log(`[STRIPE] Unhandled event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

function getCustomerId(obj: unknown): string | null {
  const o = obj as Record<string, unknown>;
  if (typeof o?.customer === "string") return o.customer;
  return null;
}
