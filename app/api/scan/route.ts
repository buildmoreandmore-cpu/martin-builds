import { NextResponse } from "next/server";

type Severity = "CRITICAL" | "WARNING" | "OK";

function computeScore(q1: string, q2: string, q3: string): number {
  let score = 100;
  // Leak 1 — After-Hours
  if (q3 === "Nothing") score -= 20;
  else if (q3 === "Contact form") score -= 10;
  // Leak 2 — Lead Capture (always CRITICAL)
  score -= 20;
  // Leak 3 — Follow-Up
  if (q1 === "No") score -= 20;
  else if (q1 === "Manually sometimes") score -= 10;
  // Leak 4 — Booking
  if (q2 === "No") score -= 20;
  else if (q2 === "Not easily") score -= 10;
  // Leak 5 — Mobile (always WARNING)
  score -= 10;
  return Math.max(score, 10);
}

function leakSeverity(q1: string, q2: string, q3: string) {
  const s = (v: string, crit: string, warn: string): Severity =>
    v === crit ? "CRITICAL" : v === warn ? "WARNING" : "OK";
  return [
    { title: "After-Hours Dead Zone", severity: s(q3, "Nothing", "Contact form") },
    { title: "Lead Capture Failure", severity: "CRITICAL" as Severity },
    { title: "No Automated Follow-Up", severity: s(q1, "No", "Manually sometimes") },
    { title: "Booking Friction", severity: s(q2, "No", "Not easily") },
    { title: "Mobile Experience Gap", severity: "WARNING" as Severity },
  ];
}

function buildEmailHtml(url: string, score: number, leaks: { title: string; severity: Severity }[]) {
  const sc = score <= 40 ? "#ff4444" : score <= 70 ? "#ffaa00" : "#c8ff00";
  const label =
    score <= 40
      ? "Critical — You're leaking revenue daily"
      : score <= 70
        ? "Moderate — There's significant room to improve"
        : "Good — A few tweaks could unlock more leads";

  const sevColor: Record<Severity, string> = { CRITICAL: "#ff4444", WARNING: "#ffaa00", OK: "#c8ff00" };

  const leakRows = leaks
    .map(
      (l) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #222;color:${sevColor[l.severity]};font-weight:700;font-size:12px;">${l.severity}</td><td style="padding:8px 12px;border-bottom:1px solid #222;color:#ccc;">${l.title}</td></tr>`
    )
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f0;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">
<h1 style="font-size:22px;margin-bottom:4px;">Website Revenue Leak Report</h1>
<p style="color:#888;font-size:14px;margin-bottom:32px;">${url}</p>
<div style="text-align:center;margin-bottom:32px;">
<div style="display:inline-block;width:100px;height:100px;border-radius:50%;border:3px solid ${sc};line-height:100px;font-size:36px;font-weight:800;color:${sc};">${score}</div>
<p style="color:${sc};font-weight:600;margin-top:12px;">${label}</p>
</div>
<table style="width:100%;border-collapse:collapse;margin-bottom:32px;">${leakRows}</table>
<div style="text-align:center;"><a href="https://martinbuilds.ai/discovery-call" style="display:inline-block;padding:14px 32px;background:#c8ff00;color:#0a0a0a;font-weight:700;border-radius:8px;text-decoration:none;">Book a Free Discovery Call</a></div>
<p style="color:#666;font-size:12px;text-align:center;margin-top:24px;">martin.builds — martinbuilds.ai</p>
</div></body></html>`;
}

async function composioAction(actionName: string, connectedAccountId: string, input: Record<string, unknown>) {
  const res = await fetch("https://backend.composio.dev/api/v2/actions/" + actionName + "/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "ak_DfieMFaURtUC3XbWlj-Q",
    },
    body: JSON.stringify({ connectedAccountId, input }),
  });
  if (!res.ok) throw new Error(`Composio ${actionName} failed: ${res.status}`);
  return res.json();
}

export async function POST(req: Request) {
  try {
    const { url, email, industry, q1, q2, q3 } = await req.json();
    const score = computeScore(q1, q2, q3);
    const leaks = leakSeverity(q1, q2, q3);

    // Store to Supabase
    try {
      const sbRes = await fetch("https://lnvzvmjhulntglbjyryz.supabase.co/rest/v1/scans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxudnp2bWpodWxudGdsYmp5cnl6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzQ1Mzk4MywiZXhwIjoyMDg5MDI5OTgzfQ.FBIT5IoBUNxQGHvHEBW-m_ss-9jbR88T72-Y1ulOyj4",
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxudnp2bWpodWxudGdsYmp5cnl6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzQ1Mzk4MywiZXhwIjoyMDg5MDI5OTgzfQ.FBIT5IoBUNxQGHvHEBW-m_ss-9jbR88T72-Y1ulOyj4"}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ email, url, industry, q1, q2, q3, score }),
      });
      if (!sbRes.ok) throw new Error("Supabase insert failed");
    } catch (e) {
      console.error("Supabase store failed:", e);
    }

    // Send results email to prospect
    try {
      await composioAction("GMAIL_SEND_EMAIL", "b3bc9414-a6c2-4430-8f2b-7998a7f70a3b", {
        recipient_email: email,
        subject: `Your Website Revenue Leak Report — ${url}`,
        body: buildEmailHtml(url, score, leaks),
        is_html: true,
      });
    } catch {
      console.error("Failed to send results email");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Scan API error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
