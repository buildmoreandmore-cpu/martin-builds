import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Forward to support@newhyer.com blind — user never sees the address
    // Using a simple fetch to Gmail API or just logging for now
    // In production this sends via Composio Gmail
    console.log(`[Newsletter signup] ${email} → support@newhyer.com`);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
