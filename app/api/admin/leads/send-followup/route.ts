import { NextRequest, NextResponse } from "next/server";
import { sendEmail, EMAIL_SIGNATURE } from "@/lib/send-email";
import { supabase } from "@/lib/supabase";

function buildFollowUpEmail(firstName: string, type: "initial" | "proposal" | "cold", businessName?: string): string {
  if (type === "cold") {
    const bizLine = businessName ? ` at <strong style="color:#f5f5f0;">${businessName}</strong>` : "";
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f0;font-family:Arial,'Helvetica Neue',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">

<div style="margin-bottom:32px;">
<h1 style="font-size:20px;font-weight:700;letter-spacing:-0.5px;margin:0 0 4px 0;"><span style="color:#f5f5f0;">martin</span><span style="color:#c8ff00;">.</span><span style="color:#f5f5f0;">builds</span></h1>
<p style="color:#888;font-size:12px;margin:0;text-transform:uppercase;letter-spacing:1px;">AI Tools for Small Business</p>
</div>

<div style="height:1px;background:#222;margin-bottom:32px;"></div>

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

${EMAIL_SIGNATURE}

</div></body></html>`;
  }

  if (type === "proposal") {
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f0;font-family:Arial,'Helvetica Neue',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">

<div style="margin-bottom:32px;">
<h1 style="font-size:20px;font-weight:700;letter-spacing:-0.5px;margin:0 0 4px 0;"><span style="color:#f5f5f0;">martin</span><span style="color:#c8ff00;">.</span><span style="color:#f5f5f0;">builds</span></h1>
<p style="color:#888;font-size:12px;margin:0;text-transform:uppercase;letter-spacing:1px;">AI Tools for Small Business</p>
</div>

<div style="height:1px;background:#222;margin-bottom:32px;"></div>

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

${EMAIL_SIGNATURE}

</div></body></html>`;
  }

  // Initial follow-up
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f0;font-family:Arial,'Helvetica Neue',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">

<div style="margin-bottom:32px;">
<h1 style="font-size:20px;font-weight:700;letter-spacing:-0.5px;margin:0 0 4px 0;"><span style="color:#f5f5f0;">martin</span><span style="color:#c8ff00;">.</span><span style="color:#f5f5f0;">builds</span></h1>
<p style="color:#888;font-size:12px;margin:0;text-transform:uppercase;letter-spacing:1px;">AI Tools for Small Business</p>
</div>

<div style="height:1px;background:#222;margin-bottom:32px;"></div>

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

${EMAIL_SIGNATURE}

</div></body></html>`;
}

export async function POST(req: NextRequest) {
  try {
    const { lead_id, lead_email, lead_name, lead_business, type } = await req.json();

    if (!lead_email || !lead_name) {
      return NextResponse.json({ error: "Missing lead info" }, { status: 400 });
    }

    const emailType = (type === "proposal" ? "proposal" : type === "cold" ? "cold" : "initial") as "initial" | "proposal" | "cold";
    const firstName = lead_name.split(" ")[0] || "there";
    const html = buildFollowUpEmail(firstName, emailType, lead_business || undefined);

    const subject = emailType === "proposal"
      ? `Following up — ${firstName}`
      : emailType === "cold"
      ? `Quick question for ${lead_business || firstName}`
      : `Hey ${firstName} — Martin from martin.builds`;

    await sendEmail({
      to: lead_email,
      subject,
      body: html,
      isHtml: true,
    });

    // Auto-update lead status
    if (lead_id) {
      const newStatus = emailType === "proposal" ? "proposal_sent" : "contacted";
      await supabase
        .from("leads")
        .update({
          status: newStatus,
          notes: `Follow-up email (${emailType}) sent ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
        })
        .eq("id", lead_id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Lead Follow-up] Error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
