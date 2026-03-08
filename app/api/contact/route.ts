import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/send-email";

export async function POST(req: NextRequest) {
  try {
    const { name, email, business, type, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await sendEmail({
      subject: `📩 Contact Form — ${name}`,
      body: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nBusiness: ${business || "N/A"}\nType: ${type || "General"}\nMessage: ${message}\n\nReply to ${email} to respond.`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
