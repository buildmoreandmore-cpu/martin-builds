import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const leadId = req.nextUrl.searchParams.get("lid");
  const url = req.nextUrl.searchParams.get("url");
  const label = req.nextUrl.searchParams.get("label");

  if (!url) {
    return NextResponse.redirect("https://martinbuilds.ai");
  }

  if (leadId) {
    // Fire-and-forget
    trackClick(leadId, url, label).catch(() => {});
  }

  return NextResponse.redirect(url);
}

async function trackClick(leadId: string, url: string, label: string | null) {
  const { data: lead } = await supabase
    .from("leads")
    .select("link_clicks, notes")
    .eq("id", leadId)
    .single();

  if (!lead) return;

  const clicks = (lead.link_clicks || 0) + 1;
  const clickNote = `Clicked "${label || url}" ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}`;
  const existingNotes = lead.notes || "";
  const updatedNotes = existingNotes ? `${existingNotes}\n${clickNote}` : clickNote;

  await supabase
    .from("leads")
    .update({
      link_clicks: clicks,
      notes: updatedNotes,
    })
    .eq("id", leadId);
}
