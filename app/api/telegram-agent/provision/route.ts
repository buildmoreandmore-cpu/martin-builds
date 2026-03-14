/**
 * Provision a Telegram bot for a client.
 * 
 * POST { email, botToken, botUsername }
 * 
 * - Stores the bot token and username on the client record
 * - Automatically sets the Telegram webhook to our dynamic endpoint
 * - Sets the bot name and description via Telegram API
 * 
 * Protected by CRON_SECRET (reusing existing admin auth).
 */

import { NextRequest, NextResponse } from "next/server";
import { getClientByEmail, updateClient } from "@/lib/clients";

const ADMIN_SECRET = process.env.CRON_SECRET || "";

export async function POST(req: NextRequest) {
  // Auth check
  const auth = req.headers.get("authorization");
  if (!auth || auth !== `Bearer ${ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email, botToken, botUsername } = await req.json();

    if (!email || !botToken) {
      return NextResponse.json({ error: "email and botToken required" }, { status: 400 });
    }

    const client = await getClientByEmail(email);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Set the webhook on Telegram
    const webhookUrl = `https://martinbuilds.ai/api/telegram-agent/webhook/${botToken}`;
    const whRes = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook?url=${encodeURIComponent(webhookUrl)}`);
    const whData = await whRes.json();

    if (!whData.ok) {
      return NextResponse.json({ error: "Failed to set webhook", details: whData }, { status: 500 });
    }

    // Set bot name and description
    const botName = client.bot_name || client.business_name + " Agent";
    await fetch(`https://api.telegram.org/bot${botToken}/setMyName`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: botName }),
    }).catch(() => {});

    const description = client.business_description
      ? `AI agent for ${client.business_name}. ${client.business_description.slice(0, 200)}`
      : `AI agent for ${client.business_name}. Powered by martin.builds.`;

    await fetch(`https://api.telegram.org/bot${botToken}/setMyDescription`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: description.slice(0, 512) }),
    }).catch(() => {});

    // Save to client record
    await updateClient(email, {
      bot_token: botToken,
      bot_username: botUsername || undefined,
    });

    return NextResponse.json({
      ok: true,
      webhookUrl,
      botName,
      telegramLink: botUsername ? `https://t.me/${botUsername}` : undefined,
    });
  } catch (err) {
    console.error("[Provision]", err);
    return NextResponse.json({ error: "Provision failed" }, { status: 500 });
  }
}
