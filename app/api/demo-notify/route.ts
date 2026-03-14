import { NextRequest, NextResponse } from "next/server";
import { addToFunnel } from "@/lib/funnel";
import { getEmailTemplate } from "@/lib/email-templates";
import { sendEmail } from "@/lib/send-email";

const TELEGRAM_BOT_TOKEN = "8069316114:AAHoQz5hzq1jbetdAeGfEAAuu6YpSFDG6x8";
const TELEGRAM_GROUP = "-1003713142905";

export async function POST(req: NextRequest) {
  try {
    const { businessName, industry, slug, email, name } = await req.json();

    // If email provided, add to funnel and send immediate email
    if (email) {
      const entry = addToFunnel({ email, name: name || "", businessName: businessName || "", industry: industry || "", slug: slug || "" });
      // Send Day 0 email immediately
      if (!entry.emailsSent.includes(0)) {
        const template = getEmailTemplate(0, { name: entry.name, businessName: entry.businessName, industry: entry.industry, email });
        if (template) {
          const sent = await sendEmail({ to: email, subject: template.subject, body: template.body });
          if (sent) {
            const { updateFunnelEntry } = await import("@/lib/funnel");
            updateFunnelEntry(email, { emailsSent: [...entry.emailsSent, 0] });
          }
        }
      }
    }

    const message = [
      `🎯 DEMO CONVERSION`,
      ``,
      `A prospect just hit the discovery call CTA in their demo.`,
      ``,
      `Business: ${businessName || "Unknown"}`,
      `Industry: ${industry || "Unknown"}`,
      `Demo: martinbuilds.ai/demo/${slug || "?"}`,
      ``,
      `They're warm — follow up fast.`,
    ].join("\n");

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_GROUP,
        message_thread_id: 21, // Alerts topic
        text: message,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // Don't fail the UX
  }
}
