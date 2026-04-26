import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// 1x1 transparent PNG
const PIXEL = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIABQABNjN9GQAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xMkMEa+wAAAANSURBVBhXY2BgYPgPAAEEAQBwIGkLAAAAAElFTkSuQmCC",
  "base64"
);

export async function GET(req: NextRequest) {
  const leadId = req.nextUrl.searchParams.get("lid");
  const templateId = req.nextUrl.searchParams.get("tid");

  if (leadId) {
    // Fire-and-forget — don't block the pixel response
    trackOpen(leadId, templateId).catch(() => {});
  }

  return new NextResponse(PIXEL, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Length": String(PIXEL.length),
      "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}

// Debounce window: opens within this window are treated as the same view
// (filters out preview+open double counts and Apple Mail pre-fetch noise)
const DEBOUNCE_MS = 5 * 60 * 1000; // 5 minutes

async function trackOpen(leadId: string, templateId: string | null) {
  const now = new Date();
  const nowIso = now.toISOString();

  // Fetch current lead
  const { data: lead } = await supabase
    .from("leads")
    .select("email_opens, last_opened_at, notes")
    .eq("id", leadId)
    .single();

  if (!lead) return;

  // If last open was within the debounce window, just update the timestamp
  // — don't increment count or add a new note
  const lastOpenedAt = lead.last_opened_at ? new Date(lead.last_opened_at) : null;
  const isDuplicate = lastOpenedAt && now.getTime() - lastOpenedAt.getTime() < DEBOUNCE_MS;

  if (isDuplicate) {
    await supabase.from("leads").update({ last_opened_at: nowIso }).eq("id", leadId);
    return;
  }

  const opens = (lead.email_opens || 0) + 1;
  const openNote = `Email${templateId ? ` (${templateId})` : ""} opened ${now.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}`;
  const existingNotes = lead.notes || "";
  const updatedNotes = existingNotes ? `${existingNotes}\n${openNote}` : openNote;

  await supabase
    .from("leads")
    .update({
      email_opens: opens,
      last_opened_at: nowIso,
      notes: updatedNotes,
    })
    .eq("id", leadId);
}
