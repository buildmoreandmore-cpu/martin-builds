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

async function trackOpen(leadId: string, templateId: string | null) {
  const now = new Date().toISOString();

  // Fetch current lead
  const { data: lead } = await supabase
    .from("leads")
    .select("email_opens, last_opened_at, notes")
    .eq("id", leadId)
    .single();

  if (!lead) return;

  const opens = (lead.email_opens || 0) + 1;
  const openNote = `Email${templateId ? ` (${templateId})` : ""} opened ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}`;
  const existingNotes = lead.notes || "";
  const updatedNotes = existingNotes ? `${existingNotes}\n${openNote}` : openNote;

  await supabase
    .from("leads")
    .update({
      email_opens: opens,
      last_opened_at: now,
      notes: updatedNotes,
    })
    .eq("id", leadId);
}
