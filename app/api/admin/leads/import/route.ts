import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const API_KEY = process.env.LEADS_IMPORT_API_KEY || "mb_import_2026_s3cur3";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";

// Hardcoded canonical industries (also stored in industry_pains table)
const CANONICAL_INDUSTRIES = ["Law Firm", "Real Estate", "Healthcare", "Construction", "Restaurant", "Retail", "Professional Services", "Technology", "Finance"];

/** Use Claude to map a raw industry/business to a canonical industry, or suggest a new one */
async function inferIndustry(rawIndustry: string | null, business: string | null, knownIndustries: string[]): Promise<string | null> {
  if (!ANTHROPIC_API_KEY) return rawIndustry;
  if (!rawIndustry && !business) return null;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 64,
        messages: [
          {
            role: "user",
            content: `You are normalizing industry labels for a B2B lead database.

Business name: "${business || "unknown"}"
Raw industry label: "${rawIndustry || "unknown"}"

Known industries we already have pain points for: ${knownIndustries.join(", ")}

If the lead clearly fits one of the known industries, respond with that exact name. If it's a meaningfully different industry, respond with a clean 2-3 word title-case name (e.g. "Employment Agency", "Auto Repair", "HVAC Services"). Respond with ONLY the industry name, nothing else.`,
          },
        ],
      }),
    });

    if (!res.ok) return rawIndustry;
    const data = await res.json();
    const text = (data.content?.[0]?.text || "").trim().replace(/^["']|["']$/g, "");
    return text || rawIndustry;
  } catch {
    return rawIndustry;
  }
}

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

    // Fetch all known industries from industry_pains for matching
    const { data: knownPains } = await supabase.from("industry_pains").select("industry");
    const knownIndustries = Array.from(new Set([
      ...CANONICAL_INDUSTRIES,
      ...((knownPains || []) as { industry: string }[]).map((k) => k.industry),
    ]));

    let imported = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const lead of leads) {
      const name = (lead.name || lead.primary_contact_name || "").trim();
      const email = (lead.email || lead.primary_contact_email || "").toLowerCase().trim();
      const phone = (lead.phone || "").trim() || null;
      const business = (lead.business || lead.business_name || lead.company_name || "").trim() || null;
      const rawIndustry = (lead.industry || lead.vertical || lead.category || "").trim() || null;
      const type = (lead.type || "General").trim();

      if (!email) { skipped++; continue; }
      if (existingEmails.has(email)) { skipped++; continue; }

      // If the raw industry already matches a known one (case-insensitive), use it.
      // Otherwise, ask Claude to map it to a known industry or suggest a new clean name.
      let industry: string | null = rawIndustry;
      if (rawIndustry) {
        const exact = knownIndustries.find((k) => k.toLowerCase() === rawIndustry.toLowerCase());
        if (exact) {
          industry = exact;
        } else {
          industry = await inferIndustry(rawIndustry, business, knownIndustries);
        }
      } else if (business) {
        // No industry provided — infer from business name
        industry = await inferIndustry(null, business, knownIndustries);
      }

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
