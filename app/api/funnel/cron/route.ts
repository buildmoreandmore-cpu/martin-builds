import { NextRequest, NextResponse } from "next/server";
import { getEntriesDueForEmail, updateFunnelEntry } from "@/lib/funnel";
import { getEmailTemplate } from "@/lib/email-templates";
import { sendEmail } from "@/lib/send-email";

const EMAIL_SCHEDULE = [0, 2, 4, 7]; // days after CTA hit

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary: { email: string; day: number; sent: boolean }[] = [];

  for (const day of EMAIL_SCHEDULE) {
    const due = getEntriesDueForEmail(day);
    for (const { email, entry } of due) {
      const template = getEmailTemplate(day, { name: entry.name, businessName: entry.businessName, industry: entry.industry, email });
      if (!template) continue;

      const sent = await sendEmail({ to: email, subject: template.subject, body: template.body });
      if (sent) {
        updateFunnelEntry(email, { emailsSent: [...entry.emailsSent, day] });
      }
      summary.push({ email, day, sent });
    }
  }

  return NextResponse.json({ ok: true, processed: summary.length, summary });
}
