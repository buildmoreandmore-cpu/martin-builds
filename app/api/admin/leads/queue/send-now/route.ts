import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const maxDuration = 60;

/**
 * Manual stagger send. Picks the next N queued items, marks them as due now,
 * then triggers the cron processor inline so they fire immediately.
 *
 * Body: { count?: number }  — default 5, max 15
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const requested = typeof body.count === "number" ? body.count : 5;
    const count = Math.max(1, Math.min(15, requested));

    // Grab the next N queued items by scheduled order
    const { data: nextItems, error: fetchErr } = await supabase
      .from("email_queue")
      .select("id")
      .eq("status", "queued")
      .order("scheduled_for", { ascending: true })
      .limit(count);

    if (fetchErr) {
      console.error("[Queue SendNow] Fetch error:", fetchErr);
      return NextResponse.json({ error: "Failed to fetch queue" }, { status: 500 });
    }

    if (!nextItems || nextItems.length === 0) {
      return NextResponse.json({ pushed: 0, sent: 0, failed: 0, message: "No queued items" });
    }

    const ids = nextItems.map((i: { id: string }) => i.id);
    const nowIso = new Date().toISOString();

    // Mark them as due right now
    const { error: updateErr } = await supabase
      .from("email_queue")
      .update({ scheduled_for: nowIso })
      .in("id", ids);

    if (updateErr) {
      console.error("[Queue SendNow] Update error:", updateErr);
      return NextResponse.json({ error: "Failed to mark items due" }, { status: 500 });
    }

    // Trigger the cron processor inline
    const cronSecret = process.env.CRON_SECRET || "";
    const origin = req.nextUrl.origin;
    const cronRes = await fetch(`${origin}/api/cron/process-email-queue`, {
      method: "GET",
      headers: cronSecret ? { Authorization: `Bearer ${cronSecret}` } : {},
    });
    const cronData = await cronRes.json().catch(() => ({}));

    return NextResponse.json({
      pushed: ids.length,
      sent: cronData.sent ?? 0,
      failed: cronData.failed ?? 0,
      processed: cronData.processed ?? 0,
    });
  } catch (error) {
    console.error("[Queue SendNow] Error:", error);
    return NextResponse.json({ error: "Send-now failed" }, { status: 500 });
  }
}
