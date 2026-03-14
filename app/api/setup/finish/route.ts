import { NextRequest, NextResponse } from "next/server";
import { generateLinkingCode, getClientByEmail } from "@/lib/clients";
import { sendEmail } from "@/lib/send-email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const code = await generateLinkingCode(email);
    if (!code) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    const client = await getClientByEmail(email);
    const botName = client?.bot_name || (client?.business_name || "") + " Agent";
    const botUsername = client?.bot_username;
    const telegramLink = botUsername
      ? `https://t.me/${botUsername}`
      : "https://t.me/Martinbuilds_bot";

    // Send welcome email with bot link
    await sendEmail({
      to: email,
      subject: `${botName} is ready — here's how to connect`,
      body: `Hey ${client?.name || "there"},

Your AI agent "${botName}" for ${client?.business_name || "your business"} is set up and ready to go.

${botUsername
  ? `Open your agent on Telegram:\n${telegramLink}\n\nJust tap Start — you'll be connected automatically.`
  : `Your dedicated bot is being created. We'll email you the link within 24 hours.\n\nIn the meantime, you can use our shared bot:\n${telegramLink}?start=${code}\n\nOr search for @Martinbuilds_bot on Telegram and send:\n/start ${code}`
}

Things you can ask:
• "Check my emails"
• "What's on my calendar today?"
• "Schedule a meeting for tomorrow at 2pm"
• "Connect my Google Sheets"

You can connect more tools anytime — just tell your agent what you want to connect.

${!botUsername ? `Your linking code: ${code}\n(Save this — you can use it to reconnect anytime)\n` : ""}
If you need help, reply to this email.

— martin.builds`,
    }).catch((err) => console.error("[Welcome email failed]", err));

    return NextResponse.json({
      linkingCode: code,
      telegramLink,
      botUsername: botUsername || null,
      hasDedicatedBot: !!botUsername,
    });
  } catch (err) {
    console.error("[Setup Finish]", err);
    return NextResponse.json({ error: "Failed to generate code" }, { status: 500 });
  }
}
