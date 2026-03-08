import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, business, question, date, time } = await req.json();
    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Log for server — forwarded to support@newhyer.com via Composio in production
    console.log(`[Discovery Call Booked] ${name} <${email}> | Biz: ${business} | ${date} at ${time} EST | Q: ${question}`);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
