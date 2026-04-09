/**
 * Dashboard Client Info API
 * GET ?clientId=xxx — returns client profile info
 */

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const clientId = req.nextUrl.searchParams.get("clientId");

  if (!clientId) {
    return NextResponse.json({ error: "clientId required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("clients")
    .select("id, name, email, business_name, bot_name, industry, plan, active, created_at")
    .eq("id", clientId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
