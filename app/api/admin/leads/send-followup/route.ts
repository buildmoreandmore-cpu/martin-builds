import { NextRequest, NextResponse } from "next/server";
import { sendEmail, EMAIL_SIGNATURE } from "@/lib/send-email";
import { supabase } from "@/lib/supabase";

/* ─── Shared email shell ─── */
const HEADER = `<div style="margin-bottom:32px;">
<h1 style="font-size:24px;font-weight:800;letter-spacing:-0.5px;margin:0 0 4px 0;">
<span style="color:#c8ff00;">m</span><span style="color:#f5f5f0;">artin</span><span style="color:#c8ff00;font-size:28px;">.</span><span style="color:#f5f5f0;">builds</span>
</h1>
<p style="color:#666;font-size:11px;margin:0;text-transform:uppercase;letter-spacing:2px;">Custom Dashboards That You Own</p>
</div>
<div style="height:2px;background:linear-gradient(90deg,#c8ff00 0%,#c8ff0000 100%);margin-bottom:32px;"></div>`;

function shell(content: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f0;font-family:Arial,'Helvetica Neue',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">
${HEADER}
${content}
${EMAIL_SIGNATURE}
</div></body></html>`;
}

/* ─── Drip Template A — Warm Intro (Day 0) ─── */
function buildDripA(firstName: string, firmName: string): string {
  return shell(`
<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 16px 0;letter-spacing:-0.5px;">Hi ${firstName},</h2>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
My name is Francis with martin.builds and I help firms like <strong style="color:#f5f5f0;">${firmName}</strong> simplify the workflows that eat up your team&rsquo;s time &mdash; intake, conflict checks, engagement letters, all of it.
</p>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 24px 0;">
I&rsquo;d love to learn more about how your team runs things today and see if there&rsquo;s a way I can help.
</p>

<!-- What I'd build for them -->
<div style="background:#111;border:1px solid #222;border-radius:12px;padding:24px;margin-bottom:24px;">
<h3 style="font-size:12px;color:#c8ff00;margin:0 0 16px 0;text-transform:uppercase;letter-spacing:1.5px;">What I&rsquo;d build for ${firmName}</h3>
<table style="width:100%;border-collapse:collapse;">
<tr>
<td style="width:36px;vertical-align:top;padding:8px 0;"><div style="width:28px;height:28px;border-radius:50%;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:13px;line-height:28px;text-align:center;">1</div></td>
<td style="padding:10px 0 10px 12px;color:#ccc;font-size:14px;line-height:1.5;"><strong style="color:#f5f5f0;">Intake &amp; onboarding portal</strong> &mdash; clients fill it out once, it feeds directly into your workflow</td>
</tr>
<tr><td colspan="2" style="padding:0;"><div style="height:1px;background:#222;"></div></td></tr>
<tr>
<td style="width:36px;vertical-align:top;padding:8px 0;"><div style="width:28px;height:28px;border-radius:50%;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:13px;line-height:28px;text-align:center;">2</div></td>
<td style="padding:10px 0 10px 12px;color:#ccc;font-size:14px;line-height:1.5;"><strong style="color:#f5f5f0;">Operations dashboard</strong> &mdash; cases, billing, and team workload in one view</td>
</tr>
<tr><td colspan="2" style="padding:0;"><div style="height:1px;background:#222;"></div></td></tr>
<tr>
<td style="width:36px;vertical-align:top;padding:8px 0;"><div style="width:28px;height:28px;border-radius:50%;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:13px;line-height:28px;text-align:center;">3</div></td>
<td style="padding:10px 0 10px 12px;color:#ccc;font-size:14px;line-height:1.5;"><strong style="color:#f5f5f0;">AI assistant on your site</strong> &mdash; captures leads and answers client questions 24/7</td>
</tr>
</table>
</div>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 24px 0;">
I put together a few working demos of what this looks like. Take a look when you have a minute &mdash; if anything feels familiar, I&rsquo;d enjoy a conversation.
</p>

<div style="text-align:center;margin-bottom:32px;">
<a href="https://martinbuilds.ai/demo" style="display:inline-block;padding:14px 32px;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;">See Live Demos</a>
</div>

<p style="color:#888;font-size:13px;line-height:1.6;margin:0 0 0 0;">
Feel free to reply to this email or reach out anytime.
</p>
`);
}

/* ─── Drip Template B — Pain + Demo (Day 5) ─── */
function buildDripB(firstName: string, _firmName: string): string {
  return shell(`
<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 16px 0;letter-spacing:-0.5px;">Hi ${firstName},</h2>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 24px 0;">
Every business owner I talk to says some version of the same thing:
</p>

<!-- Pull quote -->
<div style="border-left:3px solid #c8ff00;padding:16px 20px;margin:0 0 24px 0;background:#111;border-radius:0 8px 8px 0;">
<p style="font-size:20px;font-weight:700;color:#f5f5f0;margin:0;line-height:1.4;font-style:italic;">
&ldquo;There has to be an easier way to do this.&rdquo;
</p>
</div>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
All the steps, all the clicks &mdash; and knowing there&rsquo;s a better way but not having the time or the $50K an agency would charge to fix it.
</p>

<!-- The fix -->
<div style="background:#111;border:1px solid #222;border-radius:12px;padding:24px;margin-bottom:24px;">
<h3 style="font-size:12px;color:#c8ff00;margin:0 0 16px 0;text-transform:uppercase;letter-spacing:1.5px;">I Build the Fix</h3>
<table style="width:100%;border-collapse:collapse;">
<tr>
<td style="padding:8px 0;vertical-align:middle;"><span style="display:inline-block;background:#c8ff00;color:#0a0a0a;font-weight:800;font-size:11px;padding:3px 10px;border-radius:100px;text-transform:uppercase;letter-spacing:0.5px;">Custom</span></td>
<td style="padding:8px 0 8px 12px;color:#ccc;font-size:14px;">Built around how your team actually works</td>
</tr>
<tr><td colspan="2" style="padding:0;"><div style="height:1px;background:#222;"></div></td></tr>
<tr>
<td style="padding:8px 0;vertical-align:middle;"><span style="display:inline-block;background:#c8ff00;color:#0a0a0a;font-weight:800;font-size:11px;padding:3px 10px;border-radius:100px;text-transform:uppercase;letter-spacing:0.5px;">2 Weeks</span></td>
<td style="padding:8px 0 8px 12px;color:#ccc;font-size:14px;">Not 2 months, not 6 months</td>
</tr>
<tr><td colspan="2" style="padding:0;"><div style="height:1px;background:#222;"></div></td></tr>
<tr>
<td style="padding:8px 0;vertical-align:middle;"><span style="display:inline-block;background:#c8ff00;color:#0a0a0a;font-weight:800;font-size:11px;padding:3px 10px;border-radius:100px;text-transform:uppercase;letter-spacing:0.5px;">Fixed $</span></td>
<td style="padding:8px 0 8px 12px;color:#ccc;font-size:14px;">No hourly billing, no surprises</td>
</tr>
<tr><td colspan="2" style="padding:0;"><div style="height:1px;background:#222;"></div></td></tr>
<tr>
<td style="padding:8px 0;vertical-align:middle;"><span style="display:inline-block;background:#c8ff00;color:#0a0a0a;font-weight:800;font-size:11px;padding:3px 10px;border-radius:100px;text-transform:uppercase;letter-spacing:0.5px;">Yours</span></td>
<td style="padding:8px 0 8px 12px;color:#ccc;font-size:14px;">You own the code &mdash; no vendor lock-in</td>
</tr>
</table>
</div>

<div style="text-align:center;margin-bottom:24px;">
<a href="https://martinbuilds.ai/demo" style="display:inline-block;padding:14px 32px;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;">See What It Looks Like</a>
</div>

<p style="color:#888;font-size:14px;line-height:1.7;margin:0 0 0 0;padding:16px 0;border-top:1px solid #222;">
<strong style="color:#ccc;">P.S.</strong> Reply with the one workflow that bugs your team the most. I&rsquo;ll send back a working demo built around it &mdash; no call, no commitment.
</p>
`);
}

/* ─── Drip Template C — Breakup (Day 12) ─── */
function buildDripC(firstName: string, _firmName: string): string {
  return shell(`
<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 16px 0;letter-spacing:-0.5px;">Hi ${firstName},</h2>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
Closing the loop &mdash; should I stop reaching out?
</p>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">
If the timing isn&rsquo;t right, no hard feelings. The demos are still live if you ever want to take a look.
</p>

<div style="text-align:center;margin-bottom:24px;">
<a href="https://martinbuilds.ai/demo" style="display:inline-block;padding:14px 32px;background:transparent;color:#c8ff00;font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;border:2px solid #c8ff00;">martinbuilds.ai/demo</a>
</div>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 0 0;">
If a workflow ever comes up that&rsquo;s eating your team&rsquo;s time, you know where to find me.
</p>
`);
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
A few things I&rsquo;ve built recently for firms in your space:
</p>

<div style="background:#111;border:1px solid #222;border-radius:12px;padding:20px;margin-bottom:24px;">
<table style="width:100%;border-collapse:collapse;">
<tr>
<td style="width:32px;vertical-align:top;padding:6px 0;"><div style="width:24px;height:24px;border-radius:50%;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:12px;line-height:24px;text-align:center;">1</div></td>
<td style="padding:8px 0 8px 10px;color:#ccc;font-size:14px;line-height:1.5;"><strong style="color:#f5f5f0;">Client intake portals</strong> &mdash; online forms that feed directly into your workflow, no re-typing</td>
</tr>
<tr>
<td style="width:32px;vertical-align:top;padding:6px 0;"><div style="width:24px;height:24px;border-radius:50%;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:12px;line-height:24px;text-align:center;">2</div></td>
<td style="padding:8px 0 8px 10px;color:#ccc;font-size:14px;line-height:1.5;"><strong style="color:#f5f5f0;">Operations dashboards</strong> &mdash; case status, billing, team workload in one view</td>
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
<a href="https://martinbuilds.ai/discovery-call" style="display:inline-block;padding:14px 32px;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;">Book a 15-Min Call</a>
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
<a href="https://martinbuilds.ai/discovery-call" style="display:inline-block;padding:14px 32px;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;">Book a Quick Call</a>
</div>
`);
  }

  // Initial follow-up
  return shell(`
<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 12px 0;letter-spacing:-0.5px;">Hey ${firstName} &mdash; Martin here</h2>

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
<a href="https://martinbuilds.ai/discovery-call" style="display:inline-block;padding:14px 32px;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;">Book a Discovery Call</a>
</div>
`);
}

/* ─── Custom compose email ─── */
function buildCustomEmail(firstName: string, businessName: string, _subject: string, message: string): string {
  // Replace placeholders in message (support both formats)
  const processedMessage = message
    .replace(/\{\{firstName\}\}/g, firstName)
    .replace(/\{\{first_name\}\}/g, firstName)
    .replace(/\{\{company\}\}/g, businessName || "your company")
    .replace(/\{\{firm_name\}\}/g, businessName || "your firm");

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
const DRIP_TEMPLATES: Record<string, { subject: string; build: (fn: string, biz: string) => string }> = {
  A: { subject: "hello from martin.builds", build: buildDripA },
  B: { subject: "there has to be an easier way", build: buildDripB },
  C: { subject: "re: hello from martin.builds", build: buildDripC },
};

export async function POST(req: NextRequest) {
  try {
    const { lead_id, lead_email, lead_name, lead_business, type, custom_subject, custom_message, sequence_step, template_id } = await req.json();

    if (!lead_email || !lead_name) {
      return NextResponse.json({ error: "Missing lead info" }, { status: 400 });
    }

    const firstName = lead_name.split(" ")[0] || "there";
    const bizName = lead_business || "your firm";
    let html: string;
    let subject: string;

    // Check for drip template first
    if (template_id && DRIP_TEMPLATES[template_id]) {
      const drip = DRIP_TEMPLATES[template_id];
      html = drip.build(firstName, bizName);
      subject = drip.subject;
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
        : `Hey ${firstName} — Martin from martin.builds`;
    }

    await sendEmail({
      to: lead_email,
      subject,
      body: html,
      isHtml: true,
    });

    // Auto-update lead status + track email timestamp + sequence step
    if (lead_id) {
      const newStatus = type === "proposal" ? "proposal_sent" : "contacted";
      const now = new Date();
      const updateData: Record<string, unknown> = {
        status: newStatus,
        last_emailed_at: now.toISOString(),
        notes: `Email sent ${now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}`,
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
