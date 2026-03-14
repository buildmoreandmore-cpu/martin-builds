import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getClientByStripeCustomer, updateClient } from "@/lib/clients";
import { sendEmail } from "@/lib/send-email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const WEBHOOK_SECRET = process.env.STRIPE_AGENT_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error("[Stripe Webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const customerId = getCustomerId(event.data.object);
  if (!customerId) return NextResponse.json({ ok: true });

  const client = await getClientByStripeCustomer(customerId);

  switch (event.type) {
    // Payment succeeded — ensure active
    case "invoice.paid": {
      if (client) {
        await updateClient(client.email, { active: true });
        console.log(`[Stripe] ${client.business_name} payment received — agent active`);
      }
      break;
    }

    // Payment failed — kill switch
    case "invoice.payment_failed": {
      if (client) {
        await updateClient(client.email, { active: false });
        console.log(`[Stripe] ${client.business_name} payment FAILED — agent DEACTIVATED`);

        // Notify Francis
        await sendEmail({
          to: "agent@martinbuilds.ai",
          subject: `⚠️ Payment Failed: ${client.business_name}`,
          body: `${client.name} (${client.email}) payment failed.\nAgent has been automatically deactivated.\nBusiness: ${client.business_name}\nPlan: ${client.plan}`,
        }).catch(() => {});
      }
      break;
    }

    // Subscription canceled
    case "customer.subscription.deleted": {
      if (client) {
        await updateClient(client.email, { active: false });
        console.log(`[Stripe] ${client.business_name} subscription canceled — agent DEACTIVATED`);

        await sendEmail({
          to: "agent@martinbuilds.ai",
          subject: `❌ Subscription Canceled: ${client.business_name}`,
          body: `${client.name} (${client.email}) canceled their subscription.\nAgent has been deactivated.\nBusiness: ${client.business_name}`,
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
  }

  return NextResponse.json({ ok: true });
}

function getCustomerId(obj: unknown): string | null {
  const o = obj as Record<string, unknown>;
  if (typeof o?.customer === "string") return o.customer;
  return null;
}
