import { NextRequest, NextResponse } from "next/server";
import { generateLinkingCode } from "@/lib/clients";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const code = await generateLinkingCode(email);
    if (!code) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    return NextResponse.json({
      linkingCode: code,
      telegramLink: "https://t.me/Martinbuilds_bot",
      instructions: `Open Telegram and click the link, or search for @Martinbuilds_bot and send: /start ${code}`,
    });
  } catch (err) {
    console.error("[Setup Finish]", err);
    return NextResponse.json({ error: "Failed to generate code" }, { status: 500 });
  }
}
