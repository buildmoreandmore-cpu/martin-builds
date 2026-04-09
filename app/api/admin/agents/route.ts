/**
 * Admin Agents API
 * GET — returns all AI agent clients with stats (message count, last active, cost estimate)
 */

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  // Check admin auth
  const auth = req.headers.get("x-admin-password");
  if (auth !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all clients
  const { data: clients, error } = await supabase
    .from("clients")
    .select("id, name, email, business_name, bot_name, industry, plan, active, telegram_chat_id, bot_username, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to load agents" }, { status: 500 });
  }

  // Get message counts and last message per client
  const enriched = await Promise.all(
    (clients || []).map(async (client: Record<string, string | number | boolean | null>) => {
      const { count } = await supabase
        .from("client_messages")
        .select("*", { count: "exact", head: true })
        .eq("client_id", client.id);

      const { data: lastMsg } = await supabase
        .from("client_messages")
        .select("created_at, interface")
        .eq("client_id", client.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      // Rough cost estimate: ~$0.015 per message for Haiku 4.5 with tool use
      // (system prompt + history + tool results + output, averaged across light/heavy users)
      const estimatedCost = (count || 0) * 0.015;

      return {
        ...client,
        message_count: count || 0,
        last_active: lastMsg?.created_at || null,
        last_interface: lastMsg?.interface || null,
        estimated_cost: Math.round(estimatedCost * 100) / 100,
        telegram_connected: !!client.telegram_chat_id,
      };
    })
  );

  return NextResponse.json(enriched);
}

export async function DELETE(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  // Delete messages first (foreign key)
  await supabase.from("client_messages").delete().eq("client_id", id);

  // Delete the client
  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: "Failed to delete client" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
