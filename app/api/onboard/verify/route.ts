/**
 * Verify onboarding token — checks if token is valid and unused.
 * GET ?token=xxx
 */

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const { data } = await supabase
    .from("onboarding_tokens")
    .select("email, tier, used, expires_at")
    .eq("token", token)
    .single();

  if (!data) {
    return NextResponse.json({ error: "Invalid token" }, { status: 404 });
  }

  if (data.used) {
    return NextResponse.json({ error: "Token already used" }, { status: 410 });
  }

  if (new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ error: "Token expired" }, { status: 410 });
  }

  return NextResponse.json({ email: data.email, tier: data.tier });
}
