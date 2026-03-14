import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICES: Record<string, string> = {
  starter: "price_1TArH5H8PIRJCA4G7BFgxEJR",
  pro: "price_1TArH9H8PIRJCA4GJBKiKjvM",
};

export async function POST(req: NextRequest) {
  try {
    const { plan, email } = await req.json();
    const priceId = PRICES[plan];
    if (!priceId) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email || undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { plan },
      success_url: `https://martinbuilds.ai/setup?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `https://martinbuilds.ai/ai-agent?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("Agent checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
