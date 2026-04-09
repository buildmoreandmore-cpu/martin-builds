/**
 * Dashboard Messages API
 * GET ?clientId=xxx — returns last 50 messages from client_messages ordered by created_at
 */

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const clientId = req.nextUrl.searchParams.get("clientId");

  if (!clientId) {
    return NextResponse.json(
      { error: "clientId query parameter is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("client_messages")
    .select("role, content, interface, created_at")
    .eq("client_id", clientId)
    .order("created_at", { ascending: true })
    .limit(50);

  if (error) {
    console.error("[dashboard/messages] Error:", error);
    return NextResponse.json(
      { error: "Failed to load messages" },
      { status: 500 }
    );
  }

  return NextResponse.json({ messages: data || [] });
}
