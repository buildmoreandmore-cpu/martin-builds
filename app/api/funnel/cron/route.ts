import { NextRequest, NextResponse } from "next/server";
import { getEntriesDueForEmail, updateFunnelEntry, getScanEntriesDueForEmail, updateScanFunnelEntry } from "@/lib/funnel";
import { getEmailTemplate, getScanEmailTemplate } from "@/lib/email-templates";
import { sendEmail } from "@/lib/send-email";

const EMAIL_SCHEDULE = [0, 2, 4, 7]; // days after CTA hit
const SCAN_EMAIL_SCHEDULE = [0, 2, 4, 7]; // days after scan

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary: { email: string; day: number; sent: boolean }[] = [];

  for (const day of EMAIL_SCHEDULE) {
    const due = await getEntriesDueForEmail(day);
    for (const { email, entry } of due) {
      const template = getEmailTemplate(day, { name: entry.name, businessName: entry.business_name, industry: entry.industry, email });
      if (!template) continue;

      const sent = await sendEmail({ to: email, subject: template.subject, body: template.body });
      if (sent) {
        await updateFunnelEntry(email, { emails_sent: [...entry.emails_sent, day] });
      }
      summary.push({ email, day, sent });
    }
  }

  // Process scan funnel entries
  for (const day of SCAN_EMAIL_SCHEDULE) {
    const due = await getScanEntriesDueForEmail(day);
    for (const { email, entry } of due) {
      const template = getScanEmailTemplate(day, {
        name: entry.name,
        businessName: entry.business_name,
        websiteUrl: entry.website_url,
        score: entry.score,
        leaks: entry.leaks,
      });
      if (!template) continue;

      const sent = await sendEmail({ to: email, subject: template.subject, body: template.body });
      if (sent) {
        await updateScanFunnelEntry(email, { emails_sent: [...entry.emails_sent, day] });
      }
      summary.push({ email, day, sent });
    }
  }

  return NextResponse.json({ ok: true, processed: summary.length, summary });
}
