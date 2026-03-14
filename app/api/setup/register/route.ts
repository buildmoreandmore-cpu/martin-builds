import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { registerClient, getClientByEmail, updateClient } from "@/lib/clients";
import { sendEmail } from "@/lib/send-email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, businessName, businessDescription, botName, industry, plan, sessionId } = body;

    if (!name || !email || !businessName) {
      return NextResponse.json({ error: "Name, email, and business name are required." }, { status: 400 });
    }

    // Get Stripe IDs from session
    let stripeCustomerId = "";
    let stripeSubscriptionId = "";
    if (sessionId) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        stripeCustomerId = typeof session.customer === "string" ? session.customer : "";
        stripeSubscriptionId = typeof session.subscription === "string" ? session.subscription : "";
      } catch { /* proceed without Stripe data */ }
    }

    // Check if client already exists
    const existing = await getClientByEmail(email);
    if (existing) {
      await updateClient(email, {
        name, businessName, businessDescription, botName, industry,
        ...(phone ? { phone } : {}),
        ...(stripeCustomerId ? { stripeCustomerId } : {}),
        ...(stripeSubscriptionId ? { stripeSubscriptionId } : {}),
      });
      return NextResponse.json({ ok: true, updated: true });
    }

    // Register new client
    const client = await registerClient({
      name, email,
      phone: phone || "not-provided",
      businessName, industry: industry || "other",
      plan: plan || "starter",
    });

    // Update with extra fields
    await updateClient(email, {
      businessDescription,
      botName: botName || businessName + " Agent",
      stripeCustomerId,
      stripeSubscriptionId,
    });

    // Send internal notification
    await sendEmail({
      to: "agent@martinbuilds.ai",
      subject: `New AI Agent Client: ${businessName}`,
      body: `New client signed up!\n\nName: ${name}\nEmail: ${email}\nBusiness: ${businessName}\nPlan: ${plan}\nIndustry: ${industry}\n\nBot Name: ${botName || businessName + " Agent"}\nDescription: ${businessDescription || "Not provided"}`,
    }).catch(() => {});

    return NextResponse.json({ ok: true, client });
  } catch (err) {
    console.error("[Setup Register]", err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
