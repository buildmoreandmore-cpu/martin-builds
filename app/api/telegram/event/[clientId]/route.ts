/**
 * PCG Webhook Receiver
 * PCG calls this endpoint when an event happens (new candidate, screening complete, etc.).
 * We verify the HMAC signature, format a friendly message, and DM it to the client via Telegram.
 *
 * URL pattern: https://martinbuilds.ai/api/telegram/event/{clientId}
 * Header: X-PCG-Signature: <hex hmac-sha256 of raw body using PCG_AGENT_WEBHOOK_SECRET>
 */

import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { supabase } from "@/lib/supabase";

const WEBHOOK_SECRET = (process.env.PCG_WEBHOOK_SECRET || "").trim();

interface PcgEvent {
  event_type: string;
  summary?: string;
  detail?: unknown;
  timestamp?: string;
}

function verifySignature(rawBody: string, signature: string | null): boolean {
  if (!signature || !WEBHOOK_SECRET) return false;
  const expected = createHmac("sha256", WEBHOOK_SECRET).update(rawBody).digest("hex");
  // Constant-time compare to prevent timing attacks
  if (signature.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

function formatEvent(event: PcgEvent): string {
  const summary = event.summary || event.event_type.replace(/_/g, " ");
  const time = event.timestamp ? new Date(event.timestamp).toLocaleString("en-US", { hour: "numeric", minute: "2-digit" }) : "";

  // Pick an emoji-free prefix per event type
  const prefixes: Record<string, string> = {
    candidate_submitted: "New candidate",
    screening_completed: "Screening complete",
    screening_flagged: "Screening flagged",
    screening_status_changed: "Status update",
    client_onboarded: "New client",
    payment_received: "Payment received",
    payment_failed: "Payment failed",
  };
  const prefix = prefixes[event.event_type] || "Update";
  return `<b>${prefix}</b>\n${summary}${time ? `\n<i>${time}</i>` : ""}`;
}

async function sendTelegram(botToken: string, chatId: string, text: string) {
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;

  // Read raw body for HMAC verification
  const rawBody = await req.text();
  const signature = req.headers.get("x-pcg-signature");

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: PcgEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Look up the client and their bot
  const { data: client, error } = await supabase
    .from("clients")
    .select("bot_token, telegram_chat_id")
    .eq("id", clientId)
    .single();

  if (error || !client?.bot_token || !client?.telegram_chat_id) {
    // Client not found or not connected to Telegram — accept the webhook anyway
    return NextResponse.json({ ok: true, delivered: false });
  }

  await sendTelegram(client.bot_token, client.telegram_chat_id, formatEvent(event));
  return NextResponse.json({ ok: true, delivered: true });
}
