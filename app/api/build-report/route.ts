import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/send-email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      business_name,
      industry,
      location,
      before,
      built,
      tech_tags,
      impact,
      rating,
      quote,
      referral_name,
      referral_business,
      referral_contact,
      referral_reason,
    } = body;

    if (!name || !business_name || !industry || !before || !built || !impact) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Store in Supabase
    const { error: dbError } = await supabase.from("build_reports").insert({
      name,
      business_name,
      industry,
      location: location || null,
      before,
      built,
      tech_tags: tech_tags || [],
      impact,
      rating: rating || null,
      quote: quote || null,
      referral_name,
      referral_business,
      referral_contact,
      referral_reason,
      status: "pending",
      created_at: new Date().toISOString(),
    });

    if (dbError) {
      console.error("[Build Report] DB error:", dbError);
    }

    // Notify admin
    await sendEmail({
      to: "agent@martinbuilds.ai",
      subject: `New Build Report: ${business_name} (${industry})`,
      body: [
        `New build report submitted!\n`,
        `Name: ${name}`,
        `Business: ${business_name}`,
        `Industry: ${industry}`,
        `Location: ${location || "N/A"}`,
        `\n--- Before ---`,
        before,
        `\n--- What Was Built ---`,
        built,
        `Tech: ${(tech_tags || []).join(", ") || "None selected"}`,
        `\n--- Impact ---`,
        impact,
        `Rating: ${rating || "N/A"}`,
        `Quote: ${quote || "N/A"}`,
        referral_name ? `\n--- Referral ---\nName: ${referral_name}\nBusiness: ${referral_business}\nContact: ${referral_contact}\nWhy: ${referral_reason || "N/A"}` : "",
      ].join("\n"),
    }).catch((e) => console.error("[Build Report] Email error:", e));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Build Report] Error:", error);
    return NextResponse.json({ error: "Failed to submit report" }, { status: 500 });
  }
}
