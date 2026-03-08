import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/send-email";

export async function POST(req: NextRequest) {
  try {
    const { name, email, business, question, date, time } = await req.json();
    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await sendEmail({
      subject: `🗓️ Discovery Call Booked — ${name}`,
      body: `New discovery call booking:\n\nName: ${name}\nEmail: ${email}\nBusiness: ${business || "N/A"}\nDate: ${date}\nTime: ${time} EST\nQuestion: ${question || "None"}\n\nReply to ${email} to confirm.`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
