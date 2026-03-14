import { NextRequest, NextResponse } from "next/server";
import { getFunnelEntry, updateFunnelEntry } from "@/lib/funnel";
import { getEmailTemplate } from "@/lib/email-templates";
import { sendEmail } from "@/lib/send-email";

export async function POST(req: NextRequest) {
  try {
    const { email, dayNumber } = await req.json();
    if (!email || dayNumber === undefined) {
      return NextResponse.json({ error: "Missing email or dayNumber" }, { status: 400 });
    }

    const entry = getFunnelEntry(email);
    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    if (entry.emailsSent.includes(dayNumber)) {
      return NextResponse.json({ error: "Email already sent", dayNumber }, { status: 409 });
    }

    const template = getEmailTemplate(dayNumber, { name: entry.name, businessName: entry.businessName, industry: entry.industry, email });
    if (!template) {
      return NextResponse.json({ error: "No template for this day" }, { status: 400 });
    }

    const sent = await sendEmail({ to: email, subject: template.subject, body: template.body });
    if (sent) {
      updateFunnelEntry(email, { emailsSent: [...entry.emailsSent, dayNumber] });
    }

    return NextResponse.json({ ok: true, sent, dayNumber });
  } catch (err) {
    console.error("[funnel/send]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
