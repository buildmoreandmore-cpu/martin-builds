import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail, EMAIL_SIGNATURE } from "@/lib/send-email";
import { supabase } from "@/lib/supabase";

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "agent@martinbuilds.ai";

// ---- Validation -----------------------------------------------------------

const attributionSchema = z
  .object({
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_term: z.string().optional(),
    utm_content: z.string().optional(),
    gclid: z.string().optional(),
    gbraid: z.string().optional(),
    wbraid: z.string().optional(),
    fbclid: z.string().optional(),
    msclkid: z.string().optional(),
    referrer: z.string().optional(),
    landing_page: z.string().optional(),
    ts: z.string().optional(),
  })
  .nullable()
  .optional();

const leadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional().default(""),
  project_description: z.string().trim().min(1).max(4000),
  budget_range: z.string().trim().min(1).max(40),
  channel: z.string().trim().max(40).optional().default("google"),
  defaultCampaign: z.string().trim().max(80).optional().default(""),
  landing_page: z.string().trim().max(200).optional().default(""),
  firstTouch: attributionSchema,
  lastTouch: attributionSchema,
});

// ---- Rate limiting (simple in-memory; Upstash not configured) -------------

const RATE_LIMIT = 5; // submissions
const RATE_WINDOW_MS = 60_000; // per minute, per IP
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// ---- Helpers --------------------------------------------------------------

type Attribution = NonNullable<z.infer<typeof attributionSchema>>;

/** Pull flat attribution columns, preferring last-touch, falling back to first-touch. */
function flatten(last: Attribution | null | undefined, first: Attribution | null | undefined) {
  const l = last || {};
  const f = first || {};
  const pick = (k: keyof Attribution) => l[k] || f[k] || null;
  return {
    utm_source: pick("utm_source"),
    utm_medium: pick("utm_medium"),
    utm_campaign: pick("utm_campaign"),
    utm_term: pick("utm_term"),
    utm_content: pick("utm_content"),
    gclid: pick("gclid"),
    gbraid: pick("gbraid"),
    wbraid: pick("wbraid"),
    fbclid: pick("fbclid"),
    msclkid: pick("msclkid"),
    referrer: pick("referrer"),
  };
}

function buildConfirmationEmail(name: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f0;font-family:Arial,'Helvetica Neue',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">
<div style="margin-bottom:24px;">
<h1 style="font-size:20px;font-weight:700;letter-spacing:-0.5px;margin:0 0 4px 0;"><span style="color:#f5f5f0;">martin</span><span style="color:#c8ff00;">.</span><span style="color:#f5f5f0;">builds</span></h1>
<p style="color:#888;font-size:12px;margin:0;text-transform:uppercase;letter-spacing:1px;">Fixed-price AI builds</p>
</div>
<div style="height:1px;background:#222;margin-bottom:28px;"></div>
<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 12px 0;letter-spacing:-0.5px;">Got it, ${name}.</h2>
<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 16px 0;">Thanks for the details on what you want built. I personally read every request and I'll reply within a few hours — usually faster — to set up a short scoping call.</p>
<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">On that call we'll lock the exact scope and a fixed price before any work starts. From there, most builds ship in a ~14-day sprint.</p>
${EMAIL_SIGNATURE}
</div></body></html>`;
}

// ---- Route ----------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req);
    if (rateLimited(ip)) {
      return NextResponse.json({ error: "Too many submissions. Please wait a moment." }, { status: 429 });
    }

    const json = await req.json().catch(() => null);
    const parsed = leadSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
    }

    const lead = parsed.data;
    const attr = flatten(lead.lastTouch, lead.firstTouch);
    const landingPage = lead.landing_page || `/go/${lead.channel}`;

    const row = {
      name: lead.name,
      email: lead.email,
      business: lead.company || null, // `business` column = company
      message: lead.project_description, // `message` column = project description
      type: lead.channel,
      source: "paid_ads",
      status: "new",
      budget_range: lead.budget_range,
      landing_page: landingPage,
      ...attr,
      utm_campaign: attr.utm_campaign || lead.defaultCampaign || null,
      first_touch_json: lead.firstTouch ?? null,
      last_touch_json: lead.lastTouch ?? null,
      created_at: new Date().toISOString(),
    };

    // Dedup by email, matching the existing contact-form behavior.
    const { data: existing } = await supabase.from("leads").select("id").eq("email", lead.email).limit(1);
    if (!existing || existing.length === 0) {
      const { error: insertError } = await supabase.from("leads").insert(row);
      if (insertError) {
        console.error("Lead insert failed:", insertError);
        return NextResponse.json({ error: "Could not save your request. Please try again." }, { status: 500 });
      }
    } else {
      // Returning visitor — refresh attribution + note rather than create a duplicate.
      await supabase
        .from("leads")
        .update({
          budget_range: row.budget_range,
          landing_page: row.landing_page,
          ...attr,
          utm_campaign: row.utm_campaign,
          last_touch_json: row.last_touch_json,
          notes: `Re-submitted paid-ads form ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} (${lead.channel}): ${lead.project_description}`,
        })
        .eq("id", existing[0].id)
        .then(undefined, (e: unknown) => console.error("Lead update failed:", e));
    }

    // Notify admin with full attribution detail.
    const attrLines = [
      `Campaign: ${row.utm_campaign || "—"}`,
      `Source / Medium: ${attr.utm_source || "—"} / ${attr.utm_medium || "—"}`,
      `Term / Content: ${attr.utm_term || "—"} / ${attr.utm_content || "—"}`,
      `gclid: ${attr.gclid || "—"}  gbraid: ${attr.gbraid || "—"}  wbraid: ${attr.wbraid || "—"}`,
      `fbclid: ${attr.fbclid || "—"}  msclkid: ${attr.msclkid || "—"}`,
      `Referrer: ${attr.referrer || "—"}`,
      `Landing page: ${landingPage}`,
    ].join("\n");

    await sendEmail({
      to: NOTIFY_EMAIL,
      subject: `New paid lead — ${lead.name}${lead.company ? ` (${lead.company})` : ""} [${lead.channel}]`,
      body: `New /go/${lead.channel} lead:\n\nName: ${lead.name}\nEmail: ${lead.email}\nCompany: ${lead.company || "N/A"}\nBudget: ${lead.budget_range}\n\nWants built:\n${lead.project_description}\n\n--- Attribution ---\n${attrLines}\n\nReply to ${lead.email} to respond.`,
    });

    // Instant confirmation to the lead.
    await sendEmail({
      to: lead.email,
      subject: `Got your request, ${lead.name} — martin.builds`,
      body: buildConfirmationEmail(lead.name),
      isHtml: true,
    }).catch((e) => console.error("Confirmation email failed:", e));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead route error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
