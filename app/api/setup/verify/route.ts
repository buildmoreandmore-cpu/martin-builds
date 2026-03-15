import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendEmail } from "@/lib/send-email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) return NextResponse.json({ error: "Missing session_id" }, { status: 400 });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify payment was successful
    if (session.payment_status !== "paid" && session.status !== "complete") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    const email = session.customer_email || session.customer_details?.email || "";
    const name = session.customer_details?.name || "";
    const plan = session.metadata?.plan || "starter";

    // Send resume link email so they can come back if they close the tab
    if (email) {
      await sendEmail({
        to: email,
        subject: "Complete your AI agent setup — martin.builds",
        body: `Hey ${name || "there"},

Thanks for signing up! If you need to come back to finish setting up your agent, use this link:

https://martinbuilds.ai/setup?email=${encodeURIComponent(email)}&plan=${plan}

This link is unique to you and won't expire.

— martin.builds`,
      }).catch(() => {});
    }

    return NextResponse.json({
      email,
      name,
      customerId: session.customer || "",
      subscriptionId: session.subscription || "",
      plan,
    });
  } catch (err) {
    console.error("[Setup Verify]", err);
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }
}
