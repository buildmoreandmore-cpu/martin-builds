import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/send-email";
import { INTRO_TESTIMONIAL } from "@/lib/email-testimonials";
import { supabase } from "@/lib/supabase";

/* ─── Industry pain point map ─── */
const INDUSTRY_PAINS: Record<string, { pains: string; items: { title: string; desc: string }[] }> = {
  "Law Firm": {
    pains: "intake, conflict checks, engagement letters",
    items: [
      { title: "Intake &amp; onboarding portal", desc: "clients fill it out once, it feeds directly into your case management" },
      { title: "Operations dashboard", desc: "cases, billing, and team workload in one view" },
      { title: "AI assistant on your site", desc: "captures leads and answers client questions 24/7" },
    ],
  },
  "Real Estate": {
    pains: "tenant applications, lease management, maintenance requests",
    items: [
      { title: "Tenant application portal", desc: "online applications that feed directly into your screening workflow" },
      { title: "Property dashboard", desc: "leases, payments, and maintenance requests in one view" },
      { title: "AI assistant on your site", desc: "answers tenant questions and captures leads 24/7" },
    ],
  },
  "Healthcare": {
    pains: "credentialing, provider onboarding, compliance tracking",
    items: [
      { title: "Provider onboarding portal", desc: "credentialing docs submitted once, tracked automatically" },
      { title: "Compliance dashboard", desc: "certifications, expirations, and audit trails in one view" },
      { title: "AI assistant on your site", desc: "handles patient intake questions and appointment routing 24/7" },
    ],
  },
  "Construction": {
    pains: "project bids, subcontractor scheduling, change orders",
    items: [
      { title: "Project intake portal", desc: "bid requests and scope docs submitted once, organized automatically" },
      { title: "Operations dashboard", desc: "active jobs, crew schedules, and budgets in one view" },
      { title: "AI assistant on your site", desc: "captures project inquiries and qualifies leads 24/7" },
    ],
  },
  "Restaurant": {
    pains: "scheduling, inventory tracking, vendor orders",
    items: [
      { title: "Staff scheduling portal", desc: "shifts, availability, and swaps handled in one place" },
      { title: "Operations dashboard", desc: "inventory, vendor orders, and labor costs in one view" },
      { title: "AI assistant on your site", desc: "handles reservations and answers menu questions 24/7" },
    ],
  },
  "Retail": {
    pains: "inventory tracking, vendor orders, customer follow-ups",
    items: [
      { title: "Inventory management portal", desc: "stock levels, reorders, and vendor POs in one workflow" },
      { title: "Sales dashboard", desc: "daily revenue, top products, and customer trends in one view" },
      { title: "AI assistant on your site", desc: "answers product questions and captures leads 24/7" },
    ],
  },
  "Professional Services": {
    pains: "client intake, project tracking, invoicing",
    items: [
      { title: "Client onboarding portal", desc: "intake forms, contracts, and payments in one flow" },
      { title: "Operations dashboard", desc: "projects, billing, and team utilization in one view" },
      { title: "AI assistant on your site", desc: "qualifies leads and books consultations 24/7" },
    ],
  },
  "Technology": {
    pains: "onboarding, support tickets, usage reporting",
    items: [
      { title: "Customer onboarding portal", desc: "setup steps, integrations, and training tracked automatically" },
      { title: "Operations dashboard", desc: "support tickets, usage metrics, and churn signals in one view" },
      { title: "AI assistant on your site", desc: "handles support questions and captures demo requests 24/7" },
    ],
  },
  "Finance": {
    pains: "client onboarding, document collection, compliance reporting",
    items: [
      { title: "Client intake portal", desc: "KYC docs, applications, and agreements collected in one flow" },
      { title: "Operations dashboard", desc: "accounts, compliance deadlines, and team workload in one view" },
      { title: "AI assistant on your site", desc: "answers client questions and pre-qualifies leads 24/7" },
    ],
  },
};

const DEFAULT_PAINS = {
  pains: "client intake, scheduling, reporting",
  items: [
    { title: "Intake &amp; onboarding portal", desc: "clients fill it out once, it feeds directly into your workflow" },
    { title: "Operations dashboard", desc: "projects, billing, and team workload in one view" },
    { title: "AI assistant on your site", desc: "captures leads and answers client questions 24/7" },
  ],
};

async function getIndustryData(industry?: string | null) {
  if (!industry) return DEFAULT_PAINS;

  // Check hardcoded map first (fast path)
  if (INDUSTRY_PAINS[industry]) return INDUSTRY_PAINS[industry];

  // Check Supabase for dynamic industry pains
  try {
    const { data } = await supabase
      .from("industry_pains")
      .select("pains, items")
      .eq("industry", industry)
      .single();
    if (data?.pains && Array.isArray(data.items) && data.items.length > 0) {
      return { pains: data.pains, items: data.items as { title: string; desc: string }[] };
    }
  } catch { /* fall through to default */ }

  return DEFAULT_PAINS;
}

/* ─── Plain-text email helpers ─── */
function plainSignature(): string {
  return `Francis\nmartin.builds`;
}

function plainUnsubscribe(leadId?: string): string {
  if (!leadId) return "";
  return `\n\n---\nUnsubscribe: https://martinbuilds.ai/api/unsubscribe?lid=${leadId}`;
}

/* ─── Drip Template A — Warm Intro (Day 0) ─── */
async function buildDripA(firstName: string, firmName: string, industry?: string | null, leadId?: string): Promise<string> {
  const ind = await getIndustryData(industry);
  return `Hi ${firstName},

Every business owner I talk to says some version of the same thing: "There has to be an easier way to do this."

I'm Francis with martin.builds. I help businesses like ${firmName} simplify the workflows that eat up your team's time — ${ind.pains}, all of it.

A recent client told me:

"${INTRO_TESTIMONIAL.quote}"
— ${INTRO_TESTIMONIAL.attribution}

If that sounds familiar, I'd love 15 minutes to hear how your team runs things today: https://martinbuilds.ai/book

Not ready for a call? Just reply with the one workflow that eats the most time and I'll send you a custom demo built around it.

${plainSignature()}${plainUnsubscribe(leadId)}`;
}

/* ─── Drip Template B — The Demo Reveal (Day 5) ─── */
function buildDripB(firstName: string, firmName?: string, _ind?: string | null, leadId?: string): string {
  return `Hi ${firstName},

Last time I asked if "there has to be an easier way" sounded familiar. Here's what "easier" actually looks like in practice: https://martinbuilds.ai/demo

These are real working tools I've built — client portals, operations dashboards, AI assistants. Yours would be custom to how ${firmName || "your business"} actually runs, not a template.

Two weeks. Fixed price. You own the code.

P.S. Reply with the one workflow that bugs your team the most. I'll send back a working demo built around it — no call, no commitment.

${plainSignature()}${plainUnsubscribe(leadId)}`;
}

/* ─── Drip Template C — Value + Question (Day 10) ─── */
function buildDripC(firstName: string, firmName: string, _ind?: string | null, leadId?: string): string {
  return `Hi ${firstName},

Not following up to pitch — just sharing something useful.

A business owner I worked with recently discovered the biggest time drain wasn't the big process everyone complained about. It was a small repetitive one the whole team had accepted as normal — re-typing the same data into three different places, every single day.

That one fix saved his team about 6 hours a week.

If you could eliminate one repetitive task at ${firmName} tomorrow, what would it be?

No agenda. Just curious.

${plainSignature()}${plainUnsubscribe(leadId)}`;
}

/* ─── Drip Template D — Direct Ask (Day 17) ─── */
function buildDripD(firstName: string, _biz?: string, _ind?: string | null, leadId?: string): string {
  return `Hi ${firstName},

Would 15 minutes this week or next work?

I'll look at one workflow and tell you straight up whether it's worth automating. Think of it as a working session, not a sales call.

Book here: https://martinbuilds.ai/book

Or see live demos first: https://martinbuilds.ai/demo

${plainSignature()}${plainUnsubscribe(leadId)}`;
}

/* ─── Drip Template E — Breakup (Day 24) ─── */
function buildDripE(firstName: string, _biz?: string, _ind?: string | null, leadId?: string): string {
  return `Hi ${firstName},

Closing the loop — should I stop reaching out?

If the timing isn't right, no hard feelings. The demos are still live if you ever want to take a look: https://martinbuilds.ai/demo

If a workflow ever comes up that's eating your team's time, you know where to find me.

${plainSignature()}${plainUnsubscribe(leadId)}`;
}

/* ─── Original follow-up templates (plain text) ─── */
function buildFollowUpEmail(firstName: string, type: "initial" | "proposal" | "cold", businessName?: string, leadId?: string): string {
  if (type === "cold") {
    const bizLine = businessName ? ` at ${businessName}` : "";
    return `Hey ${firstName},

I came across your work${bizLine} and wanted to reach out. I build custom dashboards and AI tools for businesses like yours — things that replace the spreadsheets, manual intake forms, and disconnected systems that slow your team down.

A few things I've built recently:

1. Client intake portals — online forms that feed directly into your workflow, no re-typing
2. Operations dashboards — projects, billing, team workload in one view
3. AI agents — 24/7 lead capture and client communication on your website

If any of that sounds relevant, I'd love a quick 15-minute call. No pitch, just a conversation: https://martinbuilds.ai/book

${plainSignature()}${plainUnsubscribe(leadId)}`;
  }

  if (type === "proposal") {
    return `Hey ${firstName} — checking in,

Just following up on the proposal I sent over. Wanted to make sure you had a chance to look through it and see if any questions came up.

No rush — just want to make sure I'm available if you want to talk through anything. Happy to jump on a quick call whenever it works for you: https://martinbuilds.ai/book

${plainSignature()}${plainUnsubscribe(leadId)}`;
  }

  // Initial follow-up
  return `Hey ${firstName} — Francis here,

Thanks for reaching out. I got your message and wanted to personally follow up.

I build custom dashboards and AI tools for small businesses — things like client portals, automated workflows, and AI agents that handle leads and support 24/7.

Here's how it works:

1. Discovery call — 15 minutes, I learn how your business runs
2. Proposal — scope, timeline, and flat-rate pricing within 24 hours
3. Build — I build it, you review it, we iterate until it's right

Book a discovery call: https://martinbuilds.ai/book

${plainSignature()}${plainUnsubscribe(leadId)}`;
}

/* ─── Custom compose email (plain text) ─── */
function buildCustomEmail(firstName: string, businessName: string, _subject: string, message: string, leadId?: string): string {
  const processedMessage = message
    .replace(/\{\{firstName\}\}/g, firstName)
    .replace(/\{\{first_name\}\}/g, firstName)
    .replace(/\{\{company\}\}/g, businessName || "your business")
    .replace(/\{\{firm_name\}\}/g, businessName || "your business");

  // Skip signature if message already includes sign-off
  const skipSig = message.includes("martin.builds");
  return `${processedMessage}${skipSig ? "" : `\n\n${plainSignature()}`}${plainUnsubscribe(leadId)}`;
}

/* ─── Drip template map ─── */
type SubjectFn = (firstName: string, firmName: string) => string;
type SubjectOption = string | SubjectFn;
const DRIP_TEMPLATES: Record<string, {
  subject: SubjectOption | SubjectOption[];
  build: (fn: string, biz: string, industry?: string | null, leadId?: string) => string | Promise<string>;
}> = {
  A: {
    subject: [
      "hello from martin.builds",
      "Francis from martin.builds",
      (_fn, biz) => `for ${biz}`,
      "how many clicks does one task take your team?",
    ],
    build: buildDripA,
  },
  B: {
    subject: [
      "here's what \"easier\" actually looks like",
      "the demo I mentioned",
    ],
    build: buildDripB,
  },
  C: { subject: (fn) => `quick question for ${fn}`, build: buildDripC },
  D: { subject: ["15 minutes this week?", "quick working session?"], build: buildDripD },
  E: { subject: "re: hello from martin.builds", build: buildDripE },
};

function resolveSubject(option: SubjectOption | SubjectOption[], firstName: string, firmName: string): string {
  const picked = Array.isArray(option) ? option[Math.floor(Math.random() * option.length)] : option;
  return typeof picked === "function" ? picked(firstName, firmName) : picked;
}

export async function POST(req: NextRequest) {
  try {
    const { lead_id, lead_email, lead_name, lead_business, lead_industry, type, custom_subject, custom_message, sequence_step, template_id } = await req.json();

    if (!lead_email || !lead_name) {
      return NextResponse.json({ error: "Missing lead info" }, { status: 400 });
    }

    // Block sending to unsubscribed leads
    if (lead_id) {
      const { data: leadCheck } = await supabase.from("leads").select("status").eq("id", lead_id).single();
      if (leadCheck?.status === "unsubscribed") {
        return NextResponse.json({ error: "Lead has unsubscribed" }, { status: 400 });
      }
    }

    const firstName = lead_name.split(" ")[0] || "there";
    const bizName = lead_business || "your business";
    let body: string;
    let subject: string;

    // Check for drip template first
    if (template_id && DRIP_TEMPLATES[template_id]) {
      const drip = DRIP_TEMPLATES[template_id];
      body = await drip.build(firstName, bizName, lead_industry, lead_id);
      subject = resolveSubject(drip.subject, firstName, bizName);
    } else if (type === "custom" && custom_message) {
      const processedSubject = (custom_subject || "Quick question")
        .replace(/\{\{firstName\}\}/g, firstName)
        .replace(/\{\{first_name\}\}/g, firstName)
        .replace(/\{\{company\}\}/g, bizName)
        .replace(/\{\{firm_name\}\}/g, bizName);
      body = buildCustomEmail(firstName, bizName, processedSubject, custom_message, lead_id);
      subject = processedSubject;
    } else {
      const emailType = (type === "proposal" ? "proposal" : type === "cold" ? "cold" : "initial") as "initial" | "proposal" | "cold";
      body = buildFollowUpEmail(firstName, emailType, lead_business || undefined, lead_id);
      subject = emailType === "proposal"
        ? `Following up — ${firstName}`
        : emailType === "cold"
        ? `Quick question for ${lead_business || firstName}`
        : `Hey ${firstName} — Francis from martin.builds`;
    }

    // Send as plain text — no tracking pixel, no HTML wrapper
    await sendEmail({
      to: lead_email,
      subject,
      body,
      isHtml: false,
    });

    // Auto-update lead status + track email timestamp + sequence step
    if (lead_id) {
      const now = new Date();
      const emailNote = `Email${template_id ? ` (${template_id})` : ""} sent ${now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}`;

      // Fetch current lead to avoid downgrading status or wiping notes
      const { data: current } = await supabase.from("leads").select("status, notes").eq("id", lead_id).single();
      const statusRank: Record<string, number> = { new: 0, contacted: 1, qualified: 2, proposal_sent: 3, won: 4, lost: -1 };
      const intendedStatus = type === "proposal" ? "proposal_sent" : "contacted";
      const currentRank = statusRank[current?.status || "new"] ?? 0;
      const intendedRank = statusRank[intendedStatus] ?? 0;
      // Only upgrade status, never downgrade (e.g. don't move "qualified" back to "contacted")
      const newStatus = intendedRank > currentRank ? intendedStatus : current?.status || intendedStatus;

      // Append email note to existing notes instead of overwriting
      const existingNotes = current?.notes || "";
      const updatedNotes = existingNotes ? `${existingNotes}\n${emailNote}` : emailNote;

      const updateData: Record<string, unknown> = {
        status: newStatus,
        last_emailed_at: now.toISOString(),
        notes: updatedNotes,
      };
      if (typeof sequence_step === "number") {
        updateData.sequence_step = sequence_step;
      }
      await supabase
        .from("leads")
        .update(updateData)
        .eq("id", lead_id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Lead Follow-up] Error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
