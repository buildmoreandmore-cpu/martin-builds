import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const stripe = getStripe();
    const { id } = await params;
    const paymentIntent = await stripe.paymentIntents.retrieve(id);

    if (!paymentIntent) {
      return NextResponse.json(
        { error: "Payment intent not found" },
        { status: 404 }
      );
    }

    // Only serve payment intents created by martin.builds admin
    if (paymentIntent.metadata?.created_by !== "martin.builds admin") {
      return NextResponse.json(
        { error: "Payment not found" },
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
