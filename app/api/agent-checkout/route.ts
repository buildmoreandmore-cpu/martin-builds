import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

/*
  Tier pricing — each tier has a one-time setup fee + metered per-conversation price.
  Stripe Checkout creates a subscription with the metered price.
  The setup fee is added as a one-time invoice item.
*/
const TIERS: Record<string, { setup: string; usage: string }> = {
  essential: {
    setup: "price_1TIKh4H8PIRJCA4GyWeDl4M1",   // $49 one-time
    usage: "price_1TIKh5H8PIRJCA4GjpdHCJUq",   // $0.04/conversation metered
  },
  professional: {
    setup: "price_1TIKh6H8PIRJCA4GUZD9Ovq5",   // $99 one-time
    usage: "price_1TIKh7H8PIRJCA4G85sUv6pP",   // $0.12/conversation metered
  },
  enterprise: {
    setup: "price_1TIKh7H8PIRJCA4GfAFJWNqt",   // $149 one-time
    usage: "price_1TIKh9H8PIRJCA4GoSb5sBCY",   // $0.35/conversation metered
  },
};

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const { plan, email } = await req.json();
    const tier = TIERS[plan];
    if (!tier) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email || undefined,
      line_items: [
        // One-time setup fee (charged immediately on first invoice)
        { price: tier.setup, quantity: 1 },
        // Metered per-conversation billing (usage reported via API)
        { price: tier.usage },
      ],
      subscription_data: {
        metadata: { plan, tier: plan },
      },
      metadata: { plan },
      success_url: `https://martinbuilds.ai/setup?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `https://martinbuilds.ai/automate?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("Agent checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
