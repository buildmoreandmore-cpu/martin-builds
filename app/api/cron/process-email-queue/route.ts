import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Allow longer execution so we can drain the daily batch in one run
export const maxDuration = 60;

const CRON_SECRET = process.env.CRON_SECRET || "";
const MAX_PER_RUN = 15; // Daily cap is 10 — 15 gives buffer for any catch-up

export async function GET(req: NextRequest) {
  // Optional auth: Vercel Cron sends "Authorization: Bearer <CRON_SECRET>" automatically
  // If CRON_SECRET is set, enforce it. If not, allow (useful for manual testing).
  if (CRON_SECRET) {
    const auth = req.headers.get("authorization") || "";
    if (auth !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const nowIso = new Date().toISOString();

  // Fetch due items
  const { data: due, error: fetchErr } = await supabase
    .from("email_queue")
    .select("*")
    .eq("status", "queued")
    .lte("scheduled_for", nowIso)
    .order("scheduled_for", { ascending: true })
    .limit(MAX_PER_RUN);

  if (fetchErr) {
    console.error("[Cron] Fetch error:", fetchErr);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }

  if (!due || due.length === 0) {
    return NextResponse.json({ processed: 0 });
  }

  let sent = 0;
  let failed = 0;
  const origin = req.nextUrl.origin;

  for (const item of due) {
    try {
      // Fetch lead details
      const { data: lead } = await supabase
        .from("leads")
        .select("id, email, name, business, industry, status")
        .eq("id", item.lead_id)
        .single();

      if (!lead || !lead.email || lead.email === "not found" || lead.status === "unsubscribed") {
        await supabase
          .from("email_queue")
          .update({ status: "skipped", error: "no email or unsubscribed", sent_at: nowIso })
          .eq("id", item.id);
        continue;
      }

      const res = await fetch(`${origin}/api/admin/leads/send-followup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: lead.id,
          lead_email: lead.email,
          lead_name: lead.name,
          lead_business: lead.business,
          lead_industry: lead.industry,
          template_id: item.template_id,
          type: item.type,
          custom_subject: item.custom_subject,
          custom_message: item.custom_message,
          sequence_step: item.sequence_step,
        }),
      });

      if (res.ok) {
        await supabase
          .from("email_queue")
          .update({ status: "sent", sent_at: new Date().toISOString() })
          .eq("id", item.id);
        sent++;
      } else {
        const errText = await res.text().catch(() => `${res.status}`);
        await supabase
          .from("email_queue")
          .update({ status: "failed", error: errText.slice(0, 500) })
          .eq("id", item.id);
        failed++;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await supabase
        .from("email_queue")
        .update({ status: "failed", error: msg.slice(0, 500) })
        .eq("id", item.id);
      failed++;
    }
  }

  return NextResponse.json({ processed: due.length, sent, failed });
}
