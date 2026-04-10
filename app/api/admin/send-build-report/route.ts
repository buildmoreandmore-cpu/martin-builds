import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/send-email";

export async function POST(req: NextRequest) {
  try {
    const { client_email, client_name } = await req.json();

    if (!client_email) {
      return NextResponse.json({ error: "No client email" }, { status: 400 });
    }

    const firstName = (client_name || "").split(" ")[0] || "there";

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f0;font-family:Arial,'Helvetica Neue',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">

<div style="margin-bottom:32px;">
<h1 style="font-size:20px;font-weight:700;letter-spacing:-0.5px;margin:0 0 4px 0;"><span style="color:#f5f5f0;">martin</span><span style="color:#c8ff00;">.</span><span style="color:#f5f5f0;">builds</span></h1>
<p style="color:#888;font-size:12px;margin:0;text-transform:uppercase;letter-spacing:1px;">AI Tools for Small Business</p>
</div>

<div style="height:1px;background:#222;margin-bottom:32px;"></div>

<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 12px 0;letter-spacing:-0.5px;">Hey ${firstName} &mdash; how&rsquo;s the build going?</h2>

<p style="color:#888;font-size:14px;line-height:1.7;margin:0 0 24px 0;">
Your platform is live. I&rsquo;d love to hear how it&rsquo;s working for you &mdash; what changed, what clicked, what you&rsquo;d tell another business owner considering a build.
</p>

<p style="color:#888;font-size:14px;line-height:1.7;margin:0 0 28px 0;">
Takes about 2 minutes. Your story gets published on martinbuilds.ai &mdash; indexed, searchable, and pointing back to your business.
</p>

<div style="text-align:center;margin-bottom:32px;">
<a href="https://martinbuilds.ai/results" style="display:inline-block;padding:14px 32px;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;">Submit Your Build Report</a>
</div>

<div style="height:1px;background:#222;margin-bottom:24px;"></div>
<p style="color:#666;font-size:12px;text-align:center;margin:0;">
<a href="https://martinbuilds.ai" style="color:#c8ff00;text-decoration:none;">martinbuilds.ai</a>
</p>

</div></body></html>`;

    await sendEmail({
      to: client_email,
      subject: `${firstName}, how's the build going?`,
      body: html,
      isHtml: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Send Build Report] Error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
