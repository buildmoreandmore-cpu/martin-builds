/**
 * Stripe Checkout — creates checkout session for utility agent signup.
 * POST { tier, email, businessName }
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_IDS: Record<string, string | undefined> = {
  essential: process.env.STRIPE_ESSENTIAL_PRICE_ID,
  professional: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
  enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID,
};

export async function POST(req: NextRequest) {
  try {
    const { tier, email, businessName } = await req.json();

    if (!tier || !email || !businessName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const priceId = PRICE_IDS[tier];
    if (!priceId) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    // Find or create Stripe customer
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customer: Stripe.Customer;
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        email,
        name: businessName,
        metadata: { source: "utility_agent", tier },
      });
    }

    // Create onboarding token
    const { data: tokenRow } = await supabase
      .from("onboarding_tokens")
      .insert({ email: email.toLowerCase(), tier })
      .select("token")
      .single();

    const token = tokenRow?.token || "error";

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://martinbuilds.ai"}/utility/onboard/${token}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://martinbuilds.ai"}/utility`,
      metadata: { tier, email, businessName, onboarding_token: token },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[stripe/checkout] Error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
