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
    const botName = client?.bot_name || client?.business_name + " Agent" || "Your Agent";
    const telegramLink = "https://t.me/Martinbuilds_bot";

    // Send welcome email with linking code
    await sendEmail({
      to: email,
      subject: `${botName} is ready — here's how to connect`,
      body: `Hey ${client?.name || "there"},

Your AI agent "${botName}" for ${client?.business_name || "your business"} is set up and ready to go.

To start chatting with your agent on Telegram:
${telegramLink}?start=${code}

Or search for @Martinbuilds_bot on Telegram and send:
/start ${code}

Things you can ask:
• "Check my emails"
• "What's on my calendar today?"
• "Schedule a meeting for tomorrow at 2pm"
• "Connect my Google Sheets"

You can connect more tools anytime — just tell your agent what you want to connect.

Your linking code: ${code}
(Save this — you can use it to reconnect anytime)

If you need help, reply to this email.

— martin.builds`,
    }).catch((err) => console.error("[Welcome email failed]", err));

    return NextResponse.json({
      linkingCode: code,
      telegramLink,
      instructions: `Open Telegram and click the link, or search for @Martinbuilds_bot and send: /start ${code}`,
    });
  } catch (err) {
    console.error("[Setup Finish]", err);
    return NextResponse.json({ error: "Failed to generate code" }, { status: 500 });
  }
}
