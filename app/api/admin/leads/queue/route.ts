import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateSchedule } from "@/lib/email-schedule";

/** GET — list queued + recently sent items */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("email_queue")
      .select("id, lead_id, template_id, type, scheduled_for, sent_at, status, error, created_at")
      .order("scheduled_for", { ascending: true })
      .limit(200);

    if (error) {
      console.error("[Queue] Fetch error:", error);
      return NextResponse.json({ queue: [] });
    }

    return NextResponse.json({ queue: data || [] });
  } catch (error) {
    console.error("[Queue] Error:", error);
    return NextResponse.json({ queue: [] });
  }
}

/** POST — enqueue a batch of emails with scheduled times */
export async function POST(req: NextRequest) {
  try {
    const { lead_ids, template_id, type, custom_subject, custom_message, sequence_step } = await req.json();

    if (!Array.isArray(lead_ids) || lead_ids.length === 0) {
      return NextResponse.json({ error: "lead_ids must be a non-empty array" }, { status: 400 });
    }

    // Generate scheduled times spread across days/windows
    const scheduled = generateSchedule(lead_ids.length);

    const rows = lead_ids.map((lead_id: string, i: number) => ({
      lead_id,
      template_id: template_id || null,
      custom_subject: custom_subject || null,
      custom_message: custom_message || null,
      type: type || null,
      sequence_step: typeof sequence_step === "number" ? sequence_step : null,
      scheduled_for: scheduled[i],
      status: "queued",
    }));

    const { error } = await supabase.from("email_queue").insert(rows);

    if (error) {
      console.error("[Queue] Insert error:", error);
      return NextResponse.json({ error: "Failed to enqueue" }, { status: 500 });
    }

    return NextResponse.json({ success: true, queued: rows.length, scheduled_times: scheduled });
  } catch (error) {
    console.error("[Queue] Error:", error);
    return NextResponse.json({ error: "Failed to enqueue" }, { status: 500 });
  }
}

/** DELETE — cancel a queued item */
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const { error } = await supabase
      .from("email_queue")
      .update({ status: "cancelled" })
      .eq("id", id)
      .eq("status", "queued"); // only cancel still-queued items

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Queue] Cancel error:", error);
    return NextResponse.json({ error: "Failed to cancel" }, { status: 500 });
  }
}
