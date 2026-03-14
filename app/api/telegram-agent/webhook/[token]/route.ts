/**
 * Dynamic Telegram webhook — each client bot has its own URL:
 * /api/telegram-agent/webhook/{bot_token}
 *
 * When a bot is provisioned, we set its webhook to this URL.
 * The token in the URL identifies which client's bot received the message.
 */

import { NextRequest, NextResponse } from "next/server";
import { handleWhatsAppMessage } from "@/lib/whatsapp-agent-brain";
import { getClientByBotToken, getClientByTelegramId, linkTelegram } from "@/lib/clients";
import { supabase } from "@/lib/supabase";

async function sendTelegramMessage(botToken: string, chatId: string, text: string): Promise<boolean> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!res.ok) {
      console.error("[TG Agent] Send failed:", await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[TG Agent] Send error:", err);
    return false;
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  try {
    const body = await req.json();
    const message = body.message;
    if (!message?.text) return NextResponse.json({ ok: true });

    const chatId = String(message.chat.id);
    const text = message.text.trim();
    const firstName = message.from?.first_name || "there";

    // Look up which client owns this bot
    const client = await getClientByBotToken(token);
    if (!client) {
      console.error(`[TG Agent] No client found for bot token: ${token.slice(0, 10)}...`);
      return NextResponse.json({ ok: true });
    }

    const botName = client.bot_name || client.business_name + " Agent";

    // Handle /start with linking code
    if (text.startsWith("/start")) {
      const parts = text.split(" ");
      if (parts.length > 1) {
        const code = parts[1].trim().toUpperCase();
        const linked = await linkTelegram(code, chatId);
        if (linked) {
          await sendTelegramMessage(
            token, chatId,
            `✅ Connected! Hey ${linked.name}, I'm ${botName} — your AI agent for ${client.business_name}.\n\nYou can message me anytime — I'll check your emails, calendar, and anything else you've connected.\n\nTry: "Any new emails today?" or "What's on my calendar?"`
          );
          return NextResponse.json({ ok: true });
        } else {
          await sendTelegramMessage(token, chatId, `❌ Invalid linking code. Check the code from your setup email and try again.\n\nFormat: /start YOUR_CODE`);
          return NextResponse.json({ ok: true });
        }
      }

      // Plain /start — auto-link if this bot belongs to the client
      if (!client.telegram_chat_id) {
        // First user to /start this bot gets linked automatically
        await supabase
          .from("clients")
          .update({ telegram_chat_id: chatId })
          .eq("id", client.id);

        await sendTelegramMessage(
          token, chatId,
          `Hey ${firstName}! 👋 I'm ${botName}, your AI agent for ${client.business_name}.\n\nJust message me anything — I can check your emails, manage your calendar, and more.`
        );
        return NextResponse.json({ ok: true });
      }

      if (client.telegram_chat_id === chatId) {
        await sendTelegramMessage(token, chatId, `Hey! 👋 ${botName} here. Just message me anything.`);
      } else {
        await sendTelegramMessage(token, chatId, `This agent is already connected to another account.`);
      }
      return NextResponse.json({ ok: true });
    }

    // Regular message — verify this is the linked user
    if (client.telegram_chat_id !== chatId) {
      // Auto-link if no one is linked yet
      if (!client.telegram_chat_id) {
        await supabase
          .from("clients")
          .update({ telegram_chat_id: chatId })
          .eq("id", client.id);
      } else {
        await sendTelegramMessage(token, chatId, `This agent is connected to another account.`);
        return NextResponse.json({ ok: true });
      }
    }

    // Kill switch
    if (client.active === false) {
      await sendTelegramMessage(token, chatId, `Your agent is currently paused. Please update your payment to reactivate.`);
      return NextResponse.json({ ok: true });
    }

    // Route through agent brain
    const reply = await handleWhatsAppMessage(client.phone, text);
    await sendTelegramMessage(token, chatId, reply);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[TG Agent Webhook] Error:", err);
    return NextResponse.json({ ok: true });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", service: "martinbuilds-telegram-agent" });
}
