/**
 * Unified Telegram Webhook — single shared bot for all utility clients.
 * Clients link via /start + email onboarding flow.
 *
 * Setup (one time):
 * 1. Message @BotFather → /newbot → name: martin.builds Agent
 * 2. Copy token → TELEGRAM_BOT_TOKEN env var
 * 3. Set webhook:
 *    curl https://api.telegram.org/bot{TOKEN}/setWebhook \
 *      -d "url=https://martinbuilds.ai/api/telegram/webhook" \
 *      -d "secret_token={TELEGRAM_SECRET_TOKEN}"
 */

import { NextRequest, NextResponse } from "next/server";
import { identifyByTelegramId, identifyByEmail } from "@/lib/middleware/identify";
import { runAgent, canUseTelegram } from "@/lib/agent";
import { supabase } from "@/lib/supabase";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const SECRET_TOKEN = process.env.TELEGRAM_SECRET_TOKEN || "";

// Pending onboarding state — stores chat_ids awaiting email input
const pendingOnboard = new Map<string, boolean>();

async function sendMessage(chatId: string | number, text: string) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
}

export async function POST(req: NextRequest) {
  // Verify secret token
  const secretHeader = req.headers.get("x-telegram-bot-api-secret-token");
  if (SECRET_TOKEN && secretHeader !== SECRET_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const message = body.message;
    if (!message?.text || !message?.chat?.id) {
      return NextResponse.json({ ok: true });
    }

    const chatId = String(message.chat.id);
    const text = message.text.trim();

    // /start command → begin onboarding
    if (text === "/start") {
      pendingOnboard.set(chatId, true);
      await sendMessage(
        chatId,
        "Hey! To connect your martin.builds agent, reply with the email address on your account."
      );
      return NextResponse.json({ ok: true });
    }

    // Pending onboarding — expect email
    if (pendingOnboard.has(chatId)) {
      const email = text.toLowerCase().trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        await sendMessage(chatId, "That doesn't look like an email. Try again:");
        return NextResponse.json({ ok: true });
      }

      const client = await identifyByEmail(email);
      if (!client) {
        await sendMessage(
          chatId,
          "I don't see that email in our system. Need an account? Visit martinbuilds.ai/utility"
        );
        pendingOnboard.delete(chatId);
        return NextResponse.json({ ok: true });
      }

      if (!canUseTelegram(client.tier)) {
        await sendMessage(
          chatId,
          "Telegram access requires a Professional or Enterprise plan. Upgrade at martinbuilds.ai/utility"
        );
        pendingOnboard.delete(chatId);
        return NextResponse.json({ ok: true });
      }

      // Link Telegram to client
      await supabase
        .from("utility_clients")
        .update({
          telegram_chat_id: Number(chatId),
          telegram_linked_at: new Date().toISOString(),
        })
        .eq("id", client.id);

      pendingOnboard.delete(chatId);
      await sendMessage(
        chatId,
        `✅ Connected! Your agent for <b>${client.business_name}</b> is ready.\n\nTry: "Show me my leads this week"`
      );
      return NextResponse.json({ ok: true });
    }

    // Regular message — identify by chat ID
    const client = await identifyByTelegramId(chatId);
    if (!client) {
      await sendMessage(
        chatId,
        "I don't recognize this account. Send /start to connect your martin.builds agent."
      );
      return NextResponse.json({ ok: true });
    }

    if (!client.is_active) {
      await sendMessage(chatId, "Your agent is currently paused. Contact support at martinbuilds.ai/contact");
      return NextResponse.json({ ok: true });
    }

    // Run agent
    const result = await runAgent({
      clientId: client.id,
      message: text,
      interface: "telegram",
    });

    await sendMessage(chatId, result.response);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[telegram/webhook] Error:", err);
    return NextResponse.json({ ok: true }); // Always 200 for Telegram
  }
}
