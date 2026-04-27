import { NextRequest, NextResponse } from "next/server";
import { sendEmail, EMAIL_SIGNATURE, appendTrackingPixel, preheader, trackLink, unsubscribeFooter } from "@/lib/send-email";
import { INTRO_TESTIMONIAL, renderTestimonialHtml } from "@/lib/email-testimonials";
import { supabase } from "@/lib/supabase";

/* ─── Shared email shell ─── */
const HEADER = `<div style="margin-bottom:32px;">
<h1 style="font-size:24px;font-weight:800;letter-spacing:-0.5px;margin:0 0 4px 0;">
<span style="color:#c8ff00;">m</span><span style="color:#f5f5f0;">artin</span><span style="color:#c8ff00;font-size:28px;">.</span><span style="color:#f5f5f0;">builds</span>
</h1>
<p style="color:#666;font-size:11px;margin:0;text-transform:uppercase;letter-spacing:2px;">Custom Dashboards That You Own</p>
</div>
<div style="height:2px;background:linear-gradient(90deg,#c8ff00 0%,#c8ff0000 100%);margin-bottom:32px;"></div>`;

function shell(content: string, opts?: { preheaderText?: string; leadId?: string }): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f0;font-family:Arial,'Helvetica Neue',sans-serif;">
${opts?.preheaderText ? preheader(opts.preheaderText) : ""}
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">
${HEADER}
${content}
${EMAIL_SIGNATURE}
${unsubscribeFooter(opts?.leadId)}
</div></body></html>`;
}

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

/* ─── Drip Template A — Warm Intro (Day 0) ─── */
async function buildDripA(firstName: string, firmName: string, industry?: string | null, leadId?: string): Promise<string> {
  const ind = await getIndustryData(industry);
  const calLink = trackLink("https://martinbuilds.ai/book", leadId, "book-call");
  const siteLink = trackLink("https://martinbuilds.ai", leadId, "site");
  return shell(`
<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 16px 0;letter-spacing:-0.5px;">Hi ${firstName},</h2>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
Every business owner I talk to says some version of the same thing:
</p>

<!-- Pull quote -->
<div style="border-left:3px solid #c8ff00;padding:16px 20px;margin:0 0 24px 0;background:#111;border-radius:0 8px 8px 0;">
<p style="font-size:20px;font-weight:700;color:#f5f5f0;margin:0;line-height:1.4;font-style:italic;">
&ldquo;There has to be an easier way to do this.&rdquo;
</p>
</div>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
I&rsquo;m Francis with <a href="${siteLink}" style="color:#c8ff00;text-decoration:none;border-bottom:1px solid rgba(200,255,0,0.4);">martin.builds</a> and I help businesses like <strong style="color:#f5f5f0;">${firmName}</strong> simplify the workflows that eat up your team&rsquo;s time &mdash; ${ind.pains}, all of it.
</p>

${renderTestimonialHtml(INTRO_TESTIMONIAL)}

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 24px 0;">
If that sounds familiar, I&rsquo;d love 15 minutes to hear how your team runs things today:
</p>

<div style="text-align:center;margin-bottom:24px;">
<a href="${calLink}" style="display:inline-block;padding:14px 32px;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;">Book 15 Minutes</a>
</div>

<p style="color:#888;font-size:14px;line-height:1.7;margin:0;padding-top:16px;border-top:1px solid #222;">
Not ready for a call? Just reply with the one workflow that eats the most time and I&rsquo;ll send you a custom demo built around it.
</p>
`, { preheaderText: `Every business owner I talk to says some version of the same thing...`, leadId });
}

/* ─── Drip Template B — The Demo Reveal (Day 5) ─── */
function buildDripB(firstName: string, firmName?: string, _ind?: string | null, leadId?: string): string {
  const demoLink = trackLink("https://martinbuilds.ai/demo", leadId, "demos");
  return shell(`
<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 16px 0;letter-spacing:-0.5px;">Hi ${firstName},</h2>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
Last time I asked if &ldquo;there has to be an easier way&rdquo; sounded familiar. Here&rsquo;s what &ldquo;easier&rdquo; actually looks like in practice:
</p>

<div style="text-align:center;margin-bottom:24px;">
<a href="${demoLink}" style="display:inline-block;padding:14px 32px;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;">See Live Demos</a>
</div>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
These are real working tools I&rsquo;ve built &mdash; client portals, operations dashboards, AI assistants. Yours would be <strong style="color:#f5f5f0;">custom to how ${firmName || "your business"} actually runs</strong>, not a template.
</p>

<!-- The fix -->
<div style="background:#111;border:1px solid #222;border-radius:12px;padding:24px;margin-bottom:24px;">
<h3 style="font-size:12px;color:#c8ff00;margin:0 0 16px 0;text-transform:uppercase;letter-spacing:1.5px;">I Build the Fix</h3>
<table style="width:100%;border-collapse:collapse;">
<tr>
<td style="width:90px;padding:8px 0;vertical-align:middle;"><span style="display:inline-block;background:#c8ff00;color:#0a0a0a;font-weight:800;font-size:11px;padding:3px 10px;border-radius:100px;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;">Custom</span></td>
<td style="padding:8px 0 8px 12px;color:#ccc;font-size:14px;">Built around how your team actually works</td>
</tr>
<tr><td colspan="2" style="padding:0;"><div style="height:1px;background:#222;"></div></td></tr>
<tr>
<td style="width:90px;padding:8px 0;vertical-align:middle;"><span style="display:inline-block;background:#c8ff00;color:#0a0a0a;font-weight:800;font-size:11px;padding:3px 10px;border-radius:100px;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;">2 Weeks</span></td>
<td style="padding:8px 0 8px 12px;color:#ccc;font-size:14px;">Not 2 months, not 6 months</td>
</tr>
<tr><td colspan="2" style="padding:0;"><div style="height:1px;background:#222;"></div></td></tr>
<tr>
<td style="width:90px;padding:8px 0;vertical-align:middle;"><span style="display:inline-block;background:#c8ff00;color:#0a0a0a;font-weight:800;font-size:11px;padding:3px 10px;border-radius:100px;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;">Fixed $</span></td>
<td style="padding:8px 0 8px 12px;color:#ccc;font-size:14px;">No hourly billing, no surprises</td>
</tr>
<tr><td colspan="2" style="padding:0;"><div style="height:1px;background:#222;"></div></td></tr>
<tr>
<td style="width:90px;padding:8px 0;vertical-align:middle;"><span style="display:inline-block;background:#c8ff00;color:#0a0a0a;font-weight:800;font-size:11px;padding:3px 10px;border-radius:100px;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;">Yours</span></td>
<td style="padding:8px 0 8px 12px;color:#ccc;font-size:14px;">You own the code &mdash; no vendor lock-in</td>
</tr>
</table>
</div>

<div style="text-align:center;margin-bottom:24px;">
<a href="${demoLink}" style="display:inline-block;padding:14px 32px;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;">See What It Looks Like</a>
</div>

<p style="color:#888;font-size:14px;line-height:1.7;margin:0 0 0 0;padding:16px 0;border-top:1px solid #222;">
<strong style="color:#ccc;">P.S.</strong> Reply with the one workflow that bugs your team the most. I&rsquo;ll send back a working demo built around it &mdash; no call, no commitment.
</p>
`, { preheaderText: "\"There has to be an easier way to do this.\" — I build the fix.", leadId });
}

/* ─── Drip Template C — Value + Question (Day 10) ─── */
function buildDripC(firstName: string, firmName: string, _ind?: string | null, leadId?: string): string {
  return shell(`
<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 16px 0;letter-spacing:-0.5px;">Hi ${firstName},</h2>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
Not following up to pitch &mdash; just sharing something useful.
</p>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
A business owner I worked with recently discovered the biggest time drain wasn&rsquo;t the big process everyone complained about. It was a small repetitive one the whole team had accepted as normal &mdash; re-typing the same data into three different places, every single day.
</p>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 24px 0;">
That one fix saved his team about 6 hours a week.
</p>

<!-- The question -->
<div style="border-left:3px solid #c8ff00;padding:16px 20px;margin:0 0 24px 0;background:#111;border-radius:0 8px 8px 0;">
<p style="font-size:16px;font-weight:600;color:#f5f5f0;margin:0;line-height:1.5;">
If you could eliminate one repetitive task at <strong style="color:#c8ff00;">${firmName}</strong> tomorrow, what would it be?
</p>
</div>

<p style="color:#888;font-size:14px;line-height:1.6;margin:0 0 0 0;">
No agenda. Just curious.
</p>
`, { preheaderText: "One fix saved a business owner 6 hours a week.", leadId });
}

/* ─── Drip Template D — Direct Ask (Day 17) ─── */
function buildDripD(firstName: string, _biz?: string, _ind?: string | null, leadId?: string): string {
  const demoLink = trackLink("https://martinbuilds.ai/demo", leadId, "demos");
  const calLink = trackLink("https://martinbuilds.ai/book", leadId, "book-call");
  return shell(`
<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 16px 0;letter-spacing:-0.5px;">Hi ${firstName},</h2>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
Would 15 minutes this week or next work?
</p>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 24px 0;">
I&rsquo;ll look at one workflow and tell you straight up whether it&rsquo;s worth automating. Think of it as a working session, not a sales call.
</p>

<div style="text-align:center;margin-bottom:12px;">
<a href="${calLink}" style="display:inline-block;padding:14px 32px;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;">Book 15 Minutes</a>
</div>

<div style="text-align:center;margin-bottom:24px;">
<a href="${demoLink}" style="font-size:13px;color:#888;text-decoration:underline;">or see live demos first</a>
</div>
`, { preheaderText: "15 minutes — I'll tell you straight up if it's worth automating.", leadId });
}

/* ─── Drip Template E — Breakup (Day 24) ─── */
function buildDripE(firstName: string, _biz?: string, _ind?: string | null, leadId?: string): string {
  const demoLink = trackLink("https://martinbuilds.ai/demo", leadId, "demos");
  return shell(`
<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 16px 0;letter-spacing:-0.5px;">Hi ${firstName},</h2>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
Closing the loop &mdash; should I stop reaching out?
</p>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
If the timing isn&rsquo;t right, no hard feelings. The demos are still live if you ever want to take a look.
</p>

<div style="text-align:center;margin-bottom:24px;">
<a href="${demoLink}" style="display:inline-block;padding:14px 32px;background:transparent;color:#c8ff00;font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;border:2px solid #c8ff00;">See Live Demos</a>
</div>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 0 0;">
If a workflow ever comes up that&rsquo;s eating your team&rsquo;s time, you know where to find me.
</p>
`, { preheaderText: "Closing the loop — no hard feelings either way.", leadId });
}

/* ─── Original follow-up templates ─── */
function buildFollowUpEmail(firstName: string, type: "initial" | "proposal" | "cold", businessName?: string): string {
  if (type === "cold") {
    const bizLine = businessName ? ` at <strong style="color:#f5f5f0;">${businessName}</strong>` : "";
    return shell(`
<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 12px 0;letter-spacing:-0.5px;">Hey ${firstName}</h2>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
I came across your work${bizLine} and wanted to reach out. I build custom dashboards and AI tools for businesses like yours &mdash; things that replace the spreadsheets, manual intake forms, and disconnected systems that slow your team down.
</p>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
A few things I&rsquo;ve built recently for businesses like yours:
</p>

<div style="background:#111;border:1px solid #222;border-radius:12px;padding:20px;margin-bottom:24px;">
<table style="width:100%;border-collapse:collapse;">
<tr>
<td style="width:32px;vertical-align:top;padding:6px 0;"><div style="width:24px;height:24px;border-radius:50%;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:12px;line-height:24px;text-align:center;">1</div></td>
<td style="padding:8px 0 8px 10px;color:#ccc;font-size:14px;line-height:1.5;"><strong style="color:#f5f5f0;">Client intake portals</strong> &mdash; online forms that feed directly into your workflow, no re-typing</td>
</tr>
<tr>
<td style="width:32px;vertical-align:top;padding:6px 0;"><div style="width:24px;height:24px;border-radius:50%;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:12px;line-height:24px;text-align:center;">2</div></td>
<td style="padding:8px 0 8px 10px;color:#ccc;font-size:14px;line-height:1.5;"><strong style="color:#f5f5f0;">Operations dashboards</strong> &mdash; projects, billing, team workload in one view</td>
</tr>
<tr>
<td style="width:32px;vertical-align:top;padding:6px 0;"><div style="width:24px;height:24px;border-radius:50%;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:12px;line-height:24px;text-align:center;">3</div></td>
<td style="padding:8px 0 8px 10px;color:#ccc;font-size:14px;line-height:1.5;"><strong style="color:#f5f5f0;">AI agents</strong> &mdash; 24/7 lead capture and client communication on your website and Telegram</td>
</tr>
</table>
</div>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 24px 0;">
If any of that sounds relevant, I&rsquo;d love to do a quick 15-minute call to learn how your operation runs. No pitch, just a conversation.
</p>

<div style="text-align:center;margin-bottom:32px;">
<a href="https://martinbuilds.ai/book" style="display:inline-block;padding:14px 32px;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;">Book a 15-Min Call</a>
</div>
`);
  }

  if (type === "proposal") {
    return shell(`
<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 12px 0;letter-spacing:-0.5px;">Hey ${firstName} &mdash; checking in</h2>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
Just following up on the proposal I sent over. Wanted to make sure you had a chance to look it through and see if any questions came up.
</p>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 24px 0;">
No rush &mdash; just want to make sure I&rsquo;m available if you want to talk through anything. Happy to jump on a quick call whenever it works for you.
</p>

<div style="text-align:center;margin-bottom:32px;">
<a href="https://martinbuilds.ai/book" style="display:inline-block;padding:14px 32px;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;">Book a Quick Call</a>
</div>
`);
  }

  // Initial follow-up
  return shell(`
<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 12px 0;letter-spacing:-0.5px;">Hey ${firstName} &mdash; Francis here</h2>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
Thanks for reaching out. I got your message and wanted to personally follow up.
</p>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
I build custom dashboards and AI tools for small businesses &mdash; things like client portals, automated workflows, and AI agents that handle leads and support 24/7.
</p>

<div style="background:#111;border:1px solid #222;border-radius:12px;padding:20px;margin-bottom:24px;">
<h3 style="font-size:13px;color:#c8ff00;margin:0 0 12px 0;text-transform:uppercase;letter-spacing:1px;">Here&rsquo;s how it works</h3>
<table style="width:100%;border-collapse:collapse;">
<tr>
<td style="width:32px;vertical-align:top;padding:6px 0;"><div style="width:24px;height:24px;border-radius:50%;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:12px;line-height:24px;text-align:center;">1</div></td>
<td style="padding:8px 0 8px 10px;color:#ccc;font-size:14px;line-height:1.5;"><strong style="color:#f5f5f0;">Discovery call</strong> &mdash; 15 minutes, I learn how your business runs</td>
</tr>
<tr>
<td style="width:32px;vertical-align:top;padding:6px 0;"><div style="width:24px;height:24px;border-radius:50%;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:12px;line-height:24px;text-align:center;">2</div></td>
<td style="padding:8px 0 8px 10px;color:#ccc;font-size:14px;line-height:1.5;"><strong style="color:#f5f5f0;">Proposal</strong> &mdash; scope, timeline, and flat-rate pricing within 24 hours</td>
</tr>
<tr>
<td style="width:32px;vertical-align:top;padding:6px 0;"><div style="width:24px;height:24px;border-radius:50%;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:12px;line-height:24px;text-align:center;">3</div></td>
<td style="padding:8px 0 8px 10px;color:#ccc;font-size:14px;line-height:1.5;"><strong style="color:#f5f5f0;">Build</strong> &mdash; I build it, you review it, we iterate until it&rsquo;s right</td>
</tr>
</table>
</div>

<div style="text-align:center;margin-bottom:32px;">
<a href="https://martinbuilds.ai/book" style="display:inline-block;padding:14px 32px;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;">Book a Discovery Call</a>
</div>
`);
}

/* ─── Custom compose email ─── */
function buildCustomEmail(firstName: string, businessName: string, _subject: string, message: string): string {
  // Replace placeholders in message (support both formats)
  const processedMessage = message
    .replace(/\{\{firstName\}\}/g, firstName)
    .replace(/\{\{first_name\}\}/g, firstName)
    .replace(/\{\{company\}\}/g, businessName || "your business")
    .replace(/\{\{firm_name\}\}/g, businessName || "your business");

  // Convert newlines to HTML paragraphs
  const paragraphs = processedMessage
    .split(/\n\n+/)
    .map((p) => {
      if (p.includes("\n")) {
        const lines = p.split("\n");
        const processed = lines.map((line) => {
          if (line.startsWith("• ") || line.startsWith("- ")) {
            return `<br/>&bull; ${line.slice(2)}`;
          }
          return line;
        });
        return `<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">${processed.join("")}</p>`;
      }
      if (p.match(/^https?:\/\/\S+$/)) {
        return `<div style="text-align:center;margin-bottom:24px;"><a href="${p}" style="display:inline-block;padding:14px 32px;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;">${p.replace(/^https?:\/\//, "").split("/").slice(0, 2).join("/")}</a></div>`;
      }
      return `<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">${p}</p>`;
    })
    .join("\n");

  // Skip signature if message already includes sign-off
  const skipSig = message.includes("martin.builds");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f0;font-family:Arial,'Helvetica Neue',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">
${HEADER}
${paragraphs}
${skipSig ? "" : EMAIL_SIGNATURE}
</div></body></html>`;
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
    let html: string;
    let subject: string;

    // Check for drip template first
    if (template_id && DRIP_TEMPLATES[template_id]) {
      const drip = DRIP_TEMPLATES[template_id];
      html = await drip.build(firstName, bizName, lead_industry, lead_id);
      subject = resolveSubject(drip.subject, firstName, bizName);
    } else if (type === "custom" && custom_message) {
      const processedSubject = (custom_subject || "Quick question")
        .replace(/\{\{firstName\}\}/g, firstName)
        .replace(/\{\{first_name\}\}/g, firstName)
        .replace(/\{\{company\}\}/g, bizName)
        .replace(/\{\{firm_name\}\}/g, bizName);
      html = buildCustomEmail(firstName, bizName, processedSubject, custom_message);
      subject = processedSubject;
    } else {
      const emailType = (type === "proposal" ? "proposal" : type === "cold" ? "cold" : "initial") as "initial" | "proposal" | "cold";
      html = buildFollowUpEmail(firstName, emailType, lead_business || undefined);
      subject = emailType === "proposal"
        ? `Following up — ${firstName}`
        : emailType === "cold"
        ? `Quick question for ${lead_business || firstName}`
        : `Hey ${firstName} — Francis from martin.builds`;
    }

    // Inject tracking pixel if we have a lead ID
    if (lead_id) {
      html = appendTrackingPixel(html, lead_id, template_id || undefined);
    }

    await sendEmail({
      to: lead_email,
      subject,
      body: html,
      isHtml: true,
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
