import { NextRequest, NextResponse } from "next/server";
import { generateLinkingCode, getClientByEmail, updateClient } from "@/lib/clients";
import { sendEmail } from "@/lib/send-email";
import { assignBot, configureBot } from "@/lib/bot-pool";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const code = await generateLinkingCode(email);
    if (!code) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    const client = await getClientByEmail(email);
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    const botName = client.bot_name || client.business_name + " Agent";
    let telegramLink = "";
    let hasDedicatedBot = false;

    // Check if client already has a bot
    if (client.bot_token && client.bot_username) {
      telegramLink = `https://t.me/${client.bot_username}`;
      hasDedicatedBot = true;
    } else {
      // Auto-assign from pool
      const bot = await assignBot(client.id!);
      if (bot) {
        // Configure the bot with client's branding
        const configured = await configureBot(
          bot.bot_token,
          botName,
          client.business_name,
          client.business_description || undefined
        );

        if (configured) {
          await updateClient(email, {
            bot_token: bot.bot_token,
            bot_username: bot.bot_username,
          });
          telegramLink = `https://t.me/${bot.bot_username}`;
          hasDedicatedBot = true;
        }
      }
    }

    // Fallback if no bot available
    if (!hasDedicatedBot) {
      telegramLink = "https://t.me/Martinbuilds_bot";
    }

    // Send welcome email
    await sendEmail({
      to: email,
      subject: `${botName} is ready — here's how to connect`,
      body: `Hey ${client.name || "there"},

Your AI agent "${botName}" for ${client.business_name} is set up and ready to go.

${hasDedicatedBot
  ? `Open your agent on Telegram:\n${telegramLink}\n\nJust tap Start — you'll be connected automatically.`
  : `Your dedicated bot is being created. We'll email you the link within 24 hours.\n\nIn the meantime, you can use:\n${telegramLink}?start=${code}`
}

Things you can ask:
• "Check my emails"
• "What's on my calendar today?"
• "Schedule a meeting for tomorrow at 2pm"
• "Connect my Google Sheets"

You can connect more tools anytime — just tell your agent.

If you need help, reply to this email.

— martin.builds`,
    }).catch((err) => console.error("[Welcome email failed]", err));

    // Notify me (Alex) about new client + pool status
    await sendEmail({
      to: "agent@martinbuilds.ai",
      subject: hasDedicatedBot
        ? `✅ Bot auto-assigned: ${botName} → ${client.business_name}`
        : `⚠️ No bots in pool — ${client.business_name} needs a bot`,
      body: `Client: ${client.name} (${email})\nBusiness: ${client.business_name}\nBot Name: ${botName}\n${hasDedicatedBot ? `Bot: @${client.bot_username || "assigned"}\nLink: ${telegramLink}` : "POOL EMPTY — create more bots via BotFather"}`,
    }).catch(() => {});

    return NextResponse.json({
      linkingCode: code,
      telegramLink,
      botUsername: hasDedicatedBot ? telegramLink.replace("https://t.me/", "") : null,
      hasDedicatedBot,
    });
  } catch (err) {
    console.error("[Setup Finish]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
