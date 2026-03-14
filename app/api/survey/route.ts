import { NextRequest, NextResponse } from "next/server";
import { updateFunnelEntry, getFunnelEntry } from "@/lib/funnel";
import { sendEmail } from "@/lib/send-email";

export async function POST(req: NextRequest) {
  try {
    const { email, answers } = await req.json();
    if (!email || !answers) {
      return NextResponse.json({ error: "Missing email or answers" }, { status: 400 });
    }

    const entry = getFunnelEntry(email);
    updateFunnelEntry(email, { surveyCompleted: true, surveyAnswers: answers });

    // Email notification
    await sendEmail({
      subject: `Survey Response: ${entry?.businessName || email}`,
      body: [
        `Survey response from ${entry?.name || "Unknown"} (${email})`,
        `Business: ${entry?.businessName || "Unknown"}`,
        ``,
        `1. Biggest time drain: ${answers.timeDrain || "—"}`,
        `2. AI experience: ${answers.aiExperience || "—"}`,
        `3. What's stopping them: ${answers.blocker || "—"}`,
      ].join("\n"),
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[survey]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
