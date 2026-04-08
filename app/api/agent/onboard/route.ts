/**
 * Agent Onboard API — creates client record and generates embed key.
 * Used for manual onboarding (admin). Normal flow goes through Stripe → onboarding_tokens.
 * POST { business_name, email, tier }
 */

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { business_name, email, tier } = await req.json();

    if (!business_name || !email) {
      return NextResponse.json({ error: "Missing business_name or email" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if client already exists
    const { data: existing } = await supabase
      .from("utility_clients")
      .select("id, embed_key")
      .eq("email", normalizedEmail)
      .single();

    if (existing) {
      return NextResponse.json({ embed_key: existing.embed_key });
    }

    // Create new client
    const { data: client, error } = await supabase
      .from("utility_clients")
      .insert({
        business_name,
        email: normalizedEmail,
        tier: tier || "essential",
        is_active: true,
      })
      .select("embed_key")
      .single();

    if (error) {
      console.error("[agent/onboard] Insert error:", error);
      return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
    }

    return NextResponse.json({ embed_key: client.embed_key });
  } catch (err) {
    console.error("[agent/onboard] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
