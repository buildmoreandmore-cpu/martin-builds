/**
 * Stripe Webhook — handles checkout completion and subscription events.
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("[stripe/webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const { tier, email, businessName } = session.metadata || {};

      if (!email) break;

      // Create or update utility_clients record
      const { data: existing } = await supabase
        .from("utility_clients")
        .select("id")
        .eq("email", email.toLowerCase())
        .single();

      if (existing) {
        await supabase
          .from("utility_clients")
          .update({
            tier: tier || "essential",
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            is_active: true,
          })
          .eq("id", existing.id);
      } else {
        await supabase.from("utility_clients").insert({
          business_name: businessName || "",
          email: email.toLowerCase(),
          tier: tier || "essential",
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          is_active: true,
        });
      }

      console.log(`[stripe/webhook] New utility client: ${email} (${tier})`);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await supabase
        .from("utility_clients")
        .update({ is_active: false })
        .eq("stripe_subscription_id", subscription.id);

      console.log(`[stripe/webhook] Subscription cancelled: ${subscription.id}`);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
