import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/send-email";
import { addToFunnel } from "@/lib/funnel";
import { getEmailTemplate } from "@/lib/email-templates";

export async function POST(req: NextRequest) {
  try {
    const { businessName, industry, slug, email, name } = await req.json();

    // Add to funnel and send Day 0 email if we have their email
    if (email) {
      await addToFunnel({ email, name, businessName, industry, slug });

      const template = getEmailTemplate(0, { name, businessName, industry, email });
      if (template) {
        await sendEmail({ to: email, subject: template.subject, body: template.body }).catch(() => {});
      }
    }

    // Email notification instead of Telegram
    await sendEmail({
      subject: `Demo Conversion: ${businessName || "Unknown"}`,
      body: [
        `A prospect just hit the discovery call CTA in their demo.`,
        ``,
        `Business: ${businessName || "Unknown"}`,
        `Industry: ${industry || "Unknown"}`,
        `Name: ${name || "Unknown"}`,
        `Email: ${email || "Unknown"}`,
        `Demo: martinbuilds.ai/demo/${slug || "?"}`,
      ].join("\n"),
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
