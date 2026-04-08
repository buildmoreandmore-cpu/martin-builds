/**
 * Complete onboarding — saves agent training data and activates client.
 * POST { token, business_name, business_description, services, ... }
 */

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, business_name, business_description, services, coverage_area, pricing_notes, tone, intake_questions, custom_instructions } = body;

    if (!token || !business_name || !business_description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify token
    const { data: tokenData } = await supabase
      .from("onboarding_tokens")
      .select("email, tier, used, expires_at")
      .eq("token", token)
      .single();

    if (!tokenData || tokenData.used || new Date(tokenData.expires_at) < new Date()) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // Find the client
    const { data: client } = await supabase
      .from("utility_clients")
      .select("id, embed_key")
      .eq("email", tokenData.email.toLowerCase())
      .single();

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Update business name
    await supabase
      .from("utility_clients")
      .update({ business_name, onboarding_complete: true })
      .eq("id", client.id);

    // Save agent training data (upsert)
    await supabase.from("agent_training").upsert(
      {
        client_id: client.id,
        business_description,
        services: services || null,
        coverage_area: coverage_area || null,
        pricing_notes: pricing_notes || null,
        tone: tone || "professional",
        intake_questions: intake_questions || null,
        custom_instructions: custom_instructions || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "client_id" }
    );

    // Mark token as used
    await supabase
      .from("onboarding_tokens")
      .update({ used: true })
      .eq("token", token);

    console.log(`[onboard] Client onboarded: ${tokenData.email} (${tokenData.tier})`);

    return NextResponse.json({ embed_key: client.embed_key });
  } catch (err) {
    console.error("[onboard/complete] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
