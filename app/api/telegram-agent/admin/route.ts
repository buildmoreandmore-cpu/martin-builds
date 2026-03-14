/**
 * @Martinbuilds_bot webhook — the orchestrator bot.
 * Runs on MiniMax, handles admin commands from Francis,
 * and manages the bot pool.
 * 
 * Commands:
 * /pool — Check bot pool status
 * /clients — List active clients
 * /addbot <token> <username> — Add a bot to the pool
 * Any other message — MiniMax-powered admin assistant
 */

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getPoolStats } from "@/lib/bot-pool";
import { chatCompletion } from "@/lib/minimax";

const BOT_TOKEN = process.env.AGENT_TELEGRAM_BOT_TOKEN || "";
const FRANCIS_CHAT_ID = "7348962993";

async function sendMessage(chatId: string, text: string): Promise<void> {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body.message;
    if (!message?.text) return NextResponse.json({ ok: true });

    const chatId = String(message.chat.id);
    const text = message.text.trim();

    // Only Francis can use admin commands
    if (chatId !== FRANCIS_CHAT_ID) {
      await sendMessage(chatId, "This bot is for admin use only.");
      return NextResponse.json({ ok: true });
    }

    // /pool — Check pool status
    if (text === "/pool") {
      const stats = await getPoolStats();
      const { data: available } = await supabase
        .from("bot_pool")
        .select("bot_username")
        .eq("status", "available");

      const { data: assigned } = await supabase
        .from("bot_pool")
        .select("bot_username")
        .eq("status", "assigned");

      const avail = available?.map((b) => `@${b.bot_username}`).join(", ") || "none";
      const used = assigned?.map((b) => `@${b.bot_username}`).join(", ") || "none";

      await sendMessage(chatId,
        `<b>Bot Pool</b>\n\n` +
        `Available: ${stats.available}\n${avail}\n\n` +
        `Assigned: ${stats.assigned}\n${used}\n\n` +
        `${stats.available < 3 ? "⚠️ Pool is low — create more bots via @BotFather" : "✅ Pool healthy"}`
      );
      return NextResponse.json({ ok: true });
    }

    // /clients — List active clients
    if (text === "/clients") {
      const { data: clients } = await supabase
        .from("clients")
        .select("name, business_name, bot_username, active, plan")
        .order("created_at", { ascending: false })
        .limit(20);

      if (!clients?.length) {
        await sendMessage(chatId, "No clients yet.");
        return NextResponse.json({ ok: true });
      }

      const list = clients.map((c) => {
        const status = c.active ? "✅" : "❌";
        const bot = c.bot_username ? `@${c.bot_username}` : "no bot";
        return `${status} <b>${c.business_name}</b> (${c.plan}) — ${bot}`;
      }).join("\n");

      await sendMessage(chatId, `<b>Clients</b>\n\n${list}`);
      return NextResponse.json({ ok: true });
    }

    // /addbot <token> <username> — Add bot to pool
    if (text.startsWith("/addbot")) {
      const parts = text.split(/\s+/);
      if (parts.length < 3) {
        await sendMessage(chatId, "Usage: /addbot <token> <username>");
        return NextResponse.json({ ok: true });
      }

      const botToken = parts[1];
      const botUsername = parts[2].replace("@", "");

      // Verify token
      const res = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
      const data = await res.json();
      if (!data.ok) {
        await sendMessage(chatId, `❌ Invalid token. Bot API says: ${data.description || "unknown error"}`);
        return NextResponse.json({ ok: true });
      }

      // Add to pool
      const { error } = await supabase.from("bot_pool").insert({
        bot_token: botToken,
        bot_username: botUsername,
        status: "available",
      });

      if (error) {
        await sendMessage(chatId, `❌ Failed: ${error.message}`);
      } else {
        const stats = await getPoolStats();
        await sendMessage(chatId, `✅ @${botUsername} added to pool\n\nPool: ${stats.available} available, ${stats.assigned} assigned`);
      }
      return NextResponse.json({ ok: true });
    }

    // Any other message — MiniMax admin assistant
    const systemPrompt = `You are the martin.builds admin assistant. You help Francis manage AI agent clients.

You know about:
- Bot pool: pre-created Telegram bots that get auto-assigned to new clients
- Client management: Supabase-backed, Stripe billing, kill switch on payment failure
- The full stack: Stripe → onboarding → tool OAuth → bot assignment → MiniMax agent brain

Available commands (tell Francis about these):
/pool — Check bot pool status
/clients — List active clients  
/addbot <token> <username> — Add a bot to the pool

Be concise. This is Telegram.`;

    const response = await chatCompletion(
      [{ role: "user", content: text }],
      systemPrompt
    );

    await sendMessage(chatId, response.content || "I couldn't process that.");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Admin Bot]", err);
    return NextResponse.json({ ok: true });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", service: "martinbuilds-admin-bot" });
}
