/**
 * Bot Pool Management API
 * 
 * GET — Pool stats (available/assigned count)
 * POST { botToken, botUsername } — Add a bot to the pool
 * 
 * Protected by CRON_SECRET.
 */

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getPoolStats } from "@/lib/bot-pool";

const ADMIN_SECRET = process.env.CRON_SECRET || "";

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${ADMIN_SECRET}`;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const stats = await getPoolStats();

  // Also get list of available bots
  const { data: available } = await supabase
    .from("bot_pool")
    .select("bot_username, status")
    .eq("status", "available");

  const { data: assigned } = await supabase
    .from("bot_pool")
    .select("bot_username, assigned_to, assigned_at")
    .eq("status", "assigned");

  return NextResponse.json({ ...stats, available, assigned });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { botToken, botUsername } = await req.json();
    if (!botToken || !botUsername) {
      return NextResponse.json({ error: "botToken and botUsername required" }, { status: 400 });
    }

    // Verify the token works
    const res = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    const data = await res.json();
    if (!data.ok) {
      return NextResponse.json({ error: "Invalid bot token", details: data }, { status: 400 });
    }

    // Add to pool
    const { error } = await supabase.from("bot_pool").insert({
      bot_token: botToken,
      bot_username: botUsername.replace("@", ""),
      status: "available",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const stats = await getPoolStats();
    return NextResponse.json({ ok: true, added: botUsername, pool: stats });
  } catch (err) {
    console.error("[Pool Add]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
