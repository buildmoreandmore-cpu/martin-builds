import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const API_KEY = process.env.LEADS_IMPORT_API_KEY || "mb_import_2026_s3cur3";

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const authHeader = req.headers.get("authorization") || "";
    const apiKey = req.headers.get("x-api-key") || "";
    const token = authHeader.replace("Bearer ", "") || apiKey;

    if (token !== API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { leads } = await req.json();

    if (!Array.isArray(leads) || leads.length === 0) {
      return NextResponse.json({ error: "Provide a non-empty 'leads' array" }, { status: 400 });
    }

    // Fetch existing emails for dedup
    const emails = leads
      .map((l: Record<string, unknown>) => (l.email as string)?.toLowerCase()?.trim())
      .filter(Boolean);

    const { data: existing } = await supabase
      .from("leads")
      .select("email")
      .in("email", emails);

    const existingEmails = new Set((existing || []).map((e: { email: string }) => e.email?.toLowerCase()));

    let imported = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const lead of leads) {
      const name = (lead.name || lead.primary_contact_name || "").trim();
      const email = (lead.email || lead.primary_contact_email || "").toLowerCase().trim();
      const phone = (lead.phone || "").trim() || null;
      const business = (lead.business || lead.business_name || lead.company_name || "").trim() || null;
      const industry = (lead.industry || lead.vertical || lead.category || "").trim() || null;
      const type = (lead.type || "General").trim();

      if (!email) { skipped++; continue; }
      if (existingEmails.has(email)) { skipped++; continue; }

      const { error } = await supabase.from("leads").insert({
        name: name || email.split("@")[0] || "Unknown",
        email,
        phone,
        business,
        industry,
        type,
        source: "api_sync",
        status: "new",
        created_at: new Date().toISOString(),
      });

      if (error) {
        errors.push(`${email}: ${error.message}`);
        skipped++;
      } else {
        imported++;
        existingEmails.add(email); // prevent dupes within same batch
      }
    }

    return NextResponse.json({
      success: true,
      imported,
      skipped,
      total: leads.length,
      ...(errors.length > 0 ? { errors: errors.slice(0, 5) } : {}),
    });
  } catch (error) {
    console.error("[Leads Import] Error:", error);
    return NextResponse.json({ error: "Import failed" }, { status: 500 });
  }
}
