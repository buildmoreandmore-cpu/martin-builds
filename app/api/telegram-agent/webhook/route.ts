/**
 * Telegram Agent Webhook — interim client channel while WhatsApp Meta review is pending.
 * Clients link via /start CODE, then message their AI agent directly.
 * Same agent brain as WhatsApp — MiniMax-powered, Composio tools.
 */

import { NextRequest, NextResponse } from "next/server";
import { handleWhatsAppMessage } from "@/lib/whatsapp-agent-brain";
import { getClientByTelegramId, linkTelegram } from "@/lib/clients";

const BOT_TOKEN = process.env.AGENT_TELEGRAM_BOT_TOKEN || "";

async function sendTelegramMessage(chatId: string, text: string): Promise<boolean> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body.message;
    if (!message?.text) return NextResponse.json({ ok: true });

    const chatId = String(message.chat.id);
    const text = message.text.trim();
    const firstName = message.from?.first_name || "there";

    // Handle /start with linking code
    if (text.startsWith("/start")) {
      const parts = text.split(" ");
      if (parts.length > 1) {
        const code = parts[1].trim().toUpperCase();
        const client = await linkTelegram(code, chatId);
        if (client) {
          await sendTelegramMessage(
            chatId,
            `✅ Connected! Hey ${client.name}, I'm your AI agent for ${client.businessName}.\n\nYou can message me anytime — I'll check your emails, calendar, and anything else you've connected.\n\nTry: "Any new emails today?" or "What's on my calendar?"`
          );
          return NextResponse.json({ ok: true });
        } else {
          await sendTelegramMessage(chatId, `❌ Invalid linking code. Check the code from your setup email and try again.\n\nFormat: /start YOUR_CODE`);
          return NextResponse.json({ ok: true });
        }
      }

      // Plain /start
      const existing = await getClientByTelegramId(chatId);
      if (existing) {
        await sendTelegramMessage(chatId, `Hey ${existing.name}! 👋 Your agent for ${existing.businessName} is ready. Just message me anything.`);
      } else {
        await sendTelegramMessage(chatId, `Hey ${firstName}! 👋 I'm your martin.builds AI agent.\n\nTo get started, use the linking code from your setup email:\n\n/start YOUR_CODE`);
      }
      return NextResponse.json({ ok: true });
    }

    // Regular message — look up client
    const client = await getClientByTelegramId(chatId);
    if (!client) {
      await sendTelegramMessage(chatId, `I don't recognize this account yet. Use /start YOUR_CODE to link your agent.`);
      return NextResponse.json({ ok: true });
    }

    // Route through agent brain
    const reply = await handleWhatsAppMessage(client.phone, text);
    await sendTelegramMessage(chatId, reply);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[TG Agent Webhook] Error:", err);
    return NextResponse.json({ ok: true });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", service: "martinbuilds-telegram-agent" });
}
