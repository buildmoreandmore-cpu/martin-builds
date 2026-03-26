import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const paymentIntent = await stripe.paymentIntents.retrieve(id);

    if (!paymentIntent) {
      return NextResponse.json(
        { error: "Payment intent not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      client_secret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      metadata: paymentIntent.metadata,
    });
  } catch (error: any) {
    console.error("Payment intent fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch payment intent" },
      { status: 500 }
    );
  }
}
