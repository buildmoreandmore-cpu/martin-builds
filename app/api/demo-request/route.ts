import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/send-email";

const SB_URL = "https://lnvzvmjhulntglbjyryz.supabase.co";
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxudnp2bWpodWxudGdsYmp5cnl6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzQ1Mzk4MywiZXhwIjoyMDg5MDI5OTgzfQ.FBIT5IoBUNxQGHvHEBW-m_ss-9jbR88T72-Y1ulOyj4";

const sbHeaders = {
  "Content-Type": "application/json",
  apikey: SB_KEY,
  Authorization: `Bearer ${SB_KEY}`,
};

async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/demo_requests?email=eq.${encodeURIComponent(email)}&select=id&limit=1`,
      { headers: sbHeaders }
    );
    const rows = await res.json();
    return Array.isArray(rows) && rows.length > 0;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, businessName, websiteUrl, industry } = await req.json();
    if (!name || !email || !businessName || !industry) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const exists = await checkEmailExists(email);
    if (exists) {
      return NextResponse.json({ error: "already_requested", message: "A demo has already been requested with this email address." }, { status: 409 });
    }

    // Store to Supabase
    try {
      await fetch(`${SB_URL}/rest/v1/demo_requests`, {
        method: "POST",
        headers: { ...sbHeaders, Prefer: "return=minimal" },
        body: JSON.stringify({
          name,
          email,
          business_name: businessName,
          website_url: websiteUrl || null,
          industry,
        }),
      });
    } catch (e) {
      console.error("Supabase store failed:", e);
    }

    // Confirmation email to prospect
    const htmlBody = `<div style="background:#0a0a0a;color:#f5f5f0;padding:2rem;font-family:Arial,sans-serif;border-radius:12px;max-width:550px;">
<h2 style="color:#c8ff00;margin-bottom:0.5rem;">Your demo is being built.</h2>
<p>Hi ${name},</p>
<p>We're building your custom AI agent demo for <strong>${businessName}</strong> right now. You'll receive a link within the hour.</p>
<p>In the meantime, scan your website for revenue leaks:<br/><a href="https://martinbuilds.ai/scan" style="color:#c8ff00;">martinbuilds.ai/scan</a></p>
<p style="color:#888;margin-top:1.5rem;">— Francis, martin.builds</p>
</div>`;

    await sendEmail({
      to: email,
      subject: `Your AI Agent Demo for ${businessName} — Coming Soon`,
      body: htmlBody,
    });

    // Internal notification
    await sendEmail({
      subject: `New Demo Request: ${businessName}`,
      body: `New demo request:\n\nBusiness: ${businessName} (${industry})\nWebsite: ${websiteUrl || "N/A"}\nName: ${name}\nEmail: ${email}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Demo request error]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
