import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://szedjomnmwnbkwolegiw.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export async function POST() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
      db: { schema: "public" },
    });

    // Try to query the table first
    const { error: checkError } = await supabase.from("industry_pains").select("id").limit(1);

    if (checkError?.code === "PGRST205" || checkError?.message?.includes("Could not find")) {
      // Table doesn't exist — create it via SQL
      const { error: sqlError } = await supabase.rpc("exec_sql", {
        sql: `
          create table if not exists industry_pains (
            id uuid default gen_random_uuid() primary key,
            industry text unique not null,
            pains text not null,
            items jsonb not null default '[]'::jsonb,
            created_at timestamptz default now()
          );
        `,
      });

      if (sqlError) {
        // rpc won't work — user needs to create table manually
        return NextResponse.json({
          error: "Table does not exist. Please run the SQL migration in Supabase dashboard.",
          sql: `create table if not exists industry_pains (
  id uuid default gen_random_uuid() primary key,
  industry text unique not null,
  pains text not null,
  items jsonb not null default '[]'::jsonb,
  created_at timestamptz default now()
);`,
        }, { status: 400 });
      }
    }

    // Seed with defaults if empty
    const { data: existing } = await supabase.from("industry_pains").select("id").limit(1);
    if (!existing || existing.length === 0) {
      const seeds = [
        { industry: "Law Firm", pains: "intake, conflict checks, engagement letters", items: [{ title: "Intake & onboarding portal", desc: "clients fill it out once, it feeds directly into your case management" }, { title: "Operations dashboard", desc: "cases, billing, and team workload in one view" }, { title: "AI assistant on your site", desc: "captures leads and answers client questions 24/7" }] },
        { industry: "Real Estate", pains: "tenant applications, lease management, maintenance requests", items: [{ title: "Tenant application portal", desc: "online applications that feed directly into your screening workflow" }, { title: "Property dashboard", desc: "leases, payments, and maintenance requests in one view" }, { title: "AI assistant on your site", desc: "answers tenant questions and captures leads 24/7" }] },
        { industry: "Healthcare", pains: "credentialing, provider onboarding, compliance tracking", items: [{ title: "Provider onboarding portal", desc: "credentialing docs submitted once, tracked automatically" }, { title: "Compliance dashboard", desc: "certifications, expirations, and audit trails in one view" }, { title: "AI assistant on your site", desc: "handles patient intake questions and appointment routing 24/7" }] },
        { industry: "Construction", pains: "project bids, subcontractor scheduling, change orders", items: [{ title: "Project intake portal", desc: "bid requests and scope docs submitted once, organized automatically" }, { title: "Operations dashboard", desc: "active jobs, crew schedules, and budgets in one view" }, { title: "AI assistant on your site", desc: "captures project inquiries and qualifies leads 24/7" }] },
        { industry: "Restaurant", pains: "scheduling, inventory tracking, vendor orders", items: [{ title: "Staff scheduling portal", desc: "shifts, availability, and swaps handled in one place" }, { title: "Operations dashboard", desc: "inventory, vendor orders, and labor costs in one view" }, { title: "AI assistant on your site", desc: "handles reservations and answers menu questions 24/7" }] },
        { industry: "Retail", pains: "inventory tracking, vendor orders, customer follow-ups", items: [{ title: "Inventory management portal", desc: "stock levels, reorders, and vendor POs in one workflow" }, { title: "Sales dashboard", desc: "daily revenue, top products, and customer trends in one view" }, { title: "AI assistant on your site", desc: "answers product questions and captures leads 24/7" }] },
        { industry: "Professional Services", pains: "client intake, project tracking, invoicing", items: [{ title: "Client onboarding portal", desc: "intake forms, contracts, and payments in one flow" }, { title: "Operations dashboard", desc: "projects, billing, and team utilization in one view" }, { title: "AI assistant on your site", desc: "qualifies leads and books consultations 24/7" }] },
        { industry: "Technology", pains: "onboarding, support tickets, usage reporting", items: [{ title: "Customer onboarding portal", desc: "setup steps, integrations, and training tracked automatically" }, { title: "Operations dashboard", desc: "support tickets, usage metrics, and churn signals in one view" }, { title: "AI assistant on your site", desc: "handles support questions and captures demo requests 24/7" }] },
        { industry: "Finance", pains: "client onboarding, document collection, compliance reporting", items: [{ title: "Client intake portal", desc: "KYC docs, applications, and agreements collected in one flow" }, { title: "Operations dashboard", desc: "accounts, compliance deadlines, and team workload in one view" }, { title: "AI assistant on your site", desc: "answers client questions and pre-qualifies leads 24/7" }] },
      ];

      await supabase.from("industry_pains").upsert(seeds, { onConflict: "industry" });
    }

    return NextResponse.json({ success: true, message: "Table ready" });
  } catch (error) {
    console.error("[IndustryPains Setup] Error:", error);
    return NextResponse.json({ error: "Setup failed" }, { status: 500 });
  }
}
