import { NextRequest, NextResponse } from "next/server";
import { updateFunnelEntry, getFunnelEntry } from "@/lib/funnel";

const TELEGRAM_BOT_TOKEN = "8069316114:AAHoQz5hzq1jbetdAeGfEAAuu6YpSFDG6x8";
const TELEGRAM_GROUP = "-1003713142905";

export async function POST(req: NextRequest) {
  try {
    const { email, answers } = await req.json();
    if (!email || !answers) {
      return NextResponse.json({ error: "Missing email or answers" }, { status: 400 });
    }

    const entry = getFunnelEntry(email);
    updateFunnelEntry(email, { surveyCompleted: true, surveyAnswers: answers });

    // Send Telegram notification
    const message = [
      `📋 SURVEY RESPONSE`,
      ``,
      `From: ${entry?.name || "Unknown"} (${email})`,
      `Business: ${entry?.businessName || "Unknown"}`,
      ``,
      `1. Biggest time drain: ${answers.timeDrain || "—"}`,
      `2. AI experience: ${answers.aiExperience || "—"}`,
      `3. What's stopping them: ${answers.blocker || "—"}`,
    ].join("\n");

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_GROUP, message_thread_id: 21, text: message }),
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[survey]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
