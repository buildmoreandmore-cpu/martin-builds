import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) return NextResponse.json({ error: "Missing session_id" }, { status: 400 });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({
      email: session.customer_email || session.customer_details?.email || "",
      name: session.customer_details?.name || "",
      customerId: session.customer || "",
      subscriptionId: session.subscription || "",
      plan: session.metadata?.plan || "",
    });
  } catch (err) {
    console.error("[Setup Verify]", err);
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }
}
