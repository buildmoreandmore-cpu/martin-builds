import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-04-30.basil" as Stripe.LatestApiVersion });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, business, question, date, time } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "AI Power Hour — 60 min session",
              description: `Session with Francis | ${date} at ${time} EST`,
            },
            unit_amount: 50000, // $500
          },
          quantity: 1,
        },
      ],
      metadata: {
        client_name: name,
        client_email: email,
        business,
        question: question?.slice(0, 500) || "",
        date,
        time,
      },
      success_url: `${req.nextUrl.origin}/power-hour?success=1&name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`,
      cancel_url: `${req.nextUrl.origin}/power-hour?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("Stripe checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
