import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/send-email";

function buildConfirmationEmail(name: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f0;font-family:Arial,'Helvetica Neue',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">

<div style="margin-bottom:24px;">
<h1 style="font-size:20px;font-weight:700;letter-spacing:-0.5px;margin:0 0 4px 0;"><span style="color:#f5f5f0;">martin</span><span style="color:#c8ff00;">.</span><span style="color:#f5f5f0;">builds</span></h1>
<p style="color:#888;font-size:12px;margin:0;text-transform:uppercase;letter-spacing:1px;">AI Tools for Small Business</p>
</div>

<div style="height:1px;background:#222;margin-bottom:28px;"></div>

<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 12px 0;letter-spacing:-0.5px;">Got it, ${name}.</h2>
<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">I personally read every message. You'll hear back from me within a few hours — usually faster.</p>

<div style="background:#111;border:1px solid #222;border-radius:12px;padding:20px;margin-bottom:24px;">
<h3 style="font-size:13px;color:#c8ff00;margin:0 0 12px 0;text-transform:uppercase;letter-spacing:1px;">While You Wait</h3>
<table style="width:100%;border-collapse:collapse;">
<tr>
<td style="width:32px;vertical-align:top;padding:6px 0;"><div style="width:24px;height:24px;border-radius:50%;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:12px;line-height:24px;text-align:center;">1</div></td>
<td style="padding:8px 0 8px 10px;color:#ccc;font-size:14px;line-height:1.5;">Check out <a href="https://martinbuilds.ai/scan" style="color:#c8ff00;text-decoration:none;font-weight:600;">the free site audit</a> — see where your site is leaking leads</td>
</tr>
<tr>
<td style="width:32px;vertical-align:top;padding:6px 0;"><div style="width:24px;height:24px;border-radius:50%;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:12px;line-height:24px;text-align:center;">2</div></td>
<td style="padding:8px 0 8px 10px;color:#ccc;font-size:14px;line-height:1.5;">Browse <a href="https://martinbuilds.ai/work-with-me" style="color:#c8ff00;text-decoration:none;font-weight:600;">how I work</a> — exact process, pricing, and timeline</td>
</tr>
<tr>
<td style="width:32px;vertical-align:top;padding:6px 0;"><div style="width:24px;height:24px;border-radius:50%;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:12px;line-height:24px;text-align:center;">3</div></td>
<td style="padding:8px 0 8px 10px;color:#ccc;font-size:14px;line-height:1.5;">Or skip the wait and <a href="https://martinbuilds.ai/discovery-call" style="color:#c8ff00;text-decoration:none;font-weight:600;">book a discovery call</a> right now</td>
</tr>
</table>
</div>

<p style="color:#888;font-size:14px;line-height:1.7;margin:0 0 24px 0;">Talk soon,<br/><strong style="color:#f5f5f0;">Martin</strong></p>

<div style="height:1px;background:#222;margin-bottom:20px;"></div>
<p style="color:#666;font-size:12px;text-align:center;margin:0;"><a href="https://martinbuilds.ai" style="color:#c8ff00;text-decoration:none;">martinbuilds.ai</a></p>
</div></body></html>`;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, business, type, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Notify admin
    await sendEmail({
      subject: `New Inquiry — ${name}${business ? ` (${business})` : ""}`,
      body: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nBusiness: ${business || "N/A"}\nType: ${type || "General"}\nMessage: ${message}\n\nReply to ${email} to respond.`,
    });

    // Instant confirmation to client — the delight window
    await sendEmail({
      to: email,
      subject: `Got your message, ${name} — martin.builds`,
      body: buildConfirmationEmail(name),
      isHtml: true,
    }).catch((e) => console.error("Confirmation email failed:", e));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
