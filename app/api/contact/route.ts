import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, business, type, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Log for now — in production, forward via Composio Gmail to support@newhyer.com
    console.log(`[Contact Form] From: ${name} <${email}> | Biz: ${business} | Type: ${type} | Message: ${message}`);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
