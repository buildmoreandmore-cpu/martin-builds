import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getClientByStripeCustomer, updateClient } from "@/lib/clients";
import { sendEmail } from "@/lib/send-email";
import { releaseBot, configureBot } from "@/lib/bot-pool";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  const stripe = getStripe();
  const WEBHOOK_SECRET = process.env.STRIPE_AGENT_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET || "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error("[Stripe Webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const customerId = getCustomerId(event.data.object);
  const client = customerId ? await getClientByStripeCustomer(customerId) : null;

  switch (event.type) {
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
      break;
    }

    case "payment_intent.succeeded": {
      const intent = event.data.object as Stripe.PaymentIntent;
      console.log(
        `[PAYMENT] PaymentIntent succeeded — ${intent.id} | $${(intent.amount / 100).toFixed(2)}`,
        intent.metadata
      );
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
