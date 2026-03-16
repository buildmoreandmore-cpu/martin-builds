import { NextResponse } from "next/server";
import { addToScanFunnel, updateScanFunnelEntry } from "@/lib/funnel";
import { getScanEmailTemplate } from "@/lib/email-templates";
import { sendEmail } from "@/lib/send-email";

type Severity = "CRITICAL" | "WARNING" | "OK";

const PAGESPEED_KEY = "AIzaSyD0S4CRNd1_y79QcyYseXEV7-OS6tUwDxk";

interface SiteAnalysis {
  performance: number; // 0-100
  mobileScore: number; // 0-100
  fcp: number; // First Contentful Paint in seconds
  lcp: number; // Largest Contentful Paint in seconds
  cls: number; // Cumulative Layout Shift
  tbt: number; // Total Blocking Time in ms
  hasHttps: boolean;
  speedRating: "FAST" | "AVERAGE" | "SLOW";
}

async function analyzeSite(url: string): Promise<SiteAnalysis | null> {
  try {
    // Ensure URL has protocol
    const targetUrl = url.startsWith("http") ? url : `https://${url}`;
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&key=${PAGESPEED_KEY}&strategy=mobile&category=performance`;

    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(25000) });
    if (!res.ok) return null;

    const data = await res.json();
    const lhr = data.lighthouseResult;
    if (!lhr) return null;

    const perfScore = Math.round((lhr.categories?.performance?.score || 0) * 100);
    const fcp = lhr.audits?.["first-contentful-paint"]?.numericValue / 1000 || 0;
    const lcp = lhr.audits?.["largest-contentful-paint"]?.numericValue / 1000 || 0;
    const cls = lhr.audits?.["cumulative-layout-shift"]?.numericValue || 0;
    const tbt = lhr.audits?.["total-blocking-time"]?.numericValue || 0;

    return {
      performance: perfScore,
      mobileScore: perfScore,
      fcp: Math.round(fcp * 10) / 10,
      lcp: Math.round(lcp * 10) / 10,
      cls: Math.round(cls * 1000) / 1000,
      tbt: Math.round(tbt),
      hasHttps: targetUrl.startsWith("https"),
      speedRating: perfScore >= 90 ? "FAST" : perfScore >= 50 ? "AVERAGE" : "SLOW",
    };
  } catch (e) {
    console.error("PageSpeed analysis failed:", e);
    return null;
  }
}

function computeScore(q1: string, q2: string, q3: string, site: SiteAnalysis | null): number {
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
  // Leak 5 — Mobile (real data if available)
  if (site) {
    if (site.mobileScore < 50) score -= 20;
    else if (site.mobileScore < 75) score -= 10;
    else score -= 5; // minor deduction even for decent sites
  } else {
    score -= 10;
  }
  return Math.max(score, 10);
}

function leakSeverity(q1: string, q2: string, q3: string, site: SiteAnalysis | null) {
  const s = (v: string, crit: string, warn: string): Severity =>
    v === crit ? "CRITICAL" : v === warn ? "WARNING" : "OK";

  const mobileSeverity: Severity = site
    ? site.mobileScore < 50 ? "CRITICAL" : site.mobileScore < 75 ? "WARNING" : "OK"
    : "WARNING";

  return [
    { title: "After-Hours Dead Zone", severity: s(q3, "Nothing", "Contact form") },
    { title: "Lead Capture Failure", severity: "CRITICAL" as Severity },
    { title: "No Automated Follow-Up", severity: s(q1, "No", "Manually sometimes") },
    { title: "Booking Friction", severity: s(q2, "No", "Not easily") },
    { title: "Mobile Experience Gap", severity: mobileSeverity },
  ];
}

function buildEmailHtml(url: string, score: number, leaks: { title: string; severity: Severity }[], site: SiteAnalysis | null) {
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

  // Real PageSpeed data section
  const siteSection = site ? `
<div style="background:#111;border-radius:8px;padding:20px;margin-bottom:32px;">
<h3 style="font-size:14px;color:#c8ff00;margin:0 0 16px 0;text-transform:uppercase;letter-spacing:1px;">Real Site Performance Data</h3>
<table style="width:100%;border-collapse:collapse;">
<tr><td style="padding:6px 0;color:#888;font-size:13px;">Mobile Performance</td><td style="padding:6px 0;text-align:right;font-weight:700;color:${site.mobileScore >= 90 ? '#c8ff00' : site.mobileScore >= 50 ? '#ffaa00' : '#ff4444'};font-size:13px;">${site.mobileScore}/100</td></tr>
<tr><td style="padding:6px 0;color:#888;font-size:13px;">First Contentful Paint</td><td style="padding:6px 0;text-align:right;font-weight:700;color:${site.fcp <= 1.8 ? '#c8ff00' : site.fcp <= 3 ? '#ffaa00' : '#ff4444'};font-size:13px;">${site.fcp}s</td></tr>
<tr><td style="padding:6px 0;color:#888;font-size:13px;">Largest Contentful Paint</td><td style="padding:6px 0;text-align:right;font-weight:700;color:${site.lcp <= 2.5 ? '#c8ff00' : site.lcp <= 4 ? '#ffaa00' : '#ff4444'};font-size:13px;">${site.lcp}s</td></tr>
<tr><td style="padding:6px 0;color:#888;font-size:13px;">Layout Shift (CLS)</td><td style="padding:6px 0;text-align:right;font-weight:700;color:${site.cls <= 0.1 ? '#c8ff00' : site.cls <= 0.25 ? '#ffaa00' : '#ff4444'};font-size:13px;">${site.cls}</td></tr>
<tr><td style="padding:6px 0;color:#888;font-size:13px;">Total Blocking Time</td><td style="padding:6px 0;text-align:right;font-weight:700;color:${site.tbt <= 200 ? '#c8ff00' : site.tbt <= 600 ? '#ffaa00' : '#ff4444'};font-size:13px;">${site.tbt}ms</td></tr>
<tr><td style="padding:6px 0;color:#888;font-size:13px;">HTTPS</td><td style="padding:6px 0;text-align:right;font-weight:700;color:${site.hasHttps ? '#c8ff00' : '#ff4444'};font-size:13px;">${site.hasHttps ? 'Yes ✓' : 'No ✕'}</td></tr>
</table>
<p style="color:#666;font-size:11px;margin-top:12px;">Measured on mobile via Google PageSpeed Insights</p>
</div>` : '';

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f0;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">
<h1 style="font-size:22px;margin-bottom:4px;">Website Revenue Leak Report</h1>
<p style="color:#888;font-size:14px;margin-bottom:32px;">${url}</p>
<div style="text-align:center;margin-bottom:32px;">
<div style="display:inline-block;width:100px;height:100px;border-radius:50%;border:3px solid ${sc};line-height:100px;font-size:36px;font-weight:800;color:${sc};">${score}</div>
<p style="color:${sc};font-weight:600;margin-top:12px;">${label}</p>
</div>
${siteSection}
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

    // Actually scan the site with PageSpeed API
    const siteAnalysis = await analyzeSite(url);

    const score = computeScore(q1, q2, q3, siteAnalysis);
    const leaks = leakSeverity(q1, q2, q3, siteAnalysis);

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
        body: buildEmailHtml(url, score, leaks, siteAnalysis),
        is_html: true,
      });
    } catch {
      console.error("Failed to send results email");
    }

    // Notify Francis — new lead scanned
    try {
      const critCount = leaks.filter(l => l.severity === "CRITICAL").length;
      const siteInfo = siteAnalysis
        ? `\nPageSpeed: ${siteAnalysis.mobileScore}/100 | FCP: ${siteAnalysis.fcp}s | LCP: ${siteAnalysis.lcp}s`
        : "\nPageSpeed: Could not scan";
      await sendEmail({
        to: "agent@martinbuilds.ai",
        subject: `🔍 New Scanner Lead: ${url} (Score: ${score}/100)`,
        body: `<div style="font-family:Arial,sans-serif;padding:20px;background:#111;color:#eee;">
<h2 style="color:#c8ff00;">New Scanner Lead</h2>
<p><strong>Website:</strong> ${url}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Industry:</strong> ${industry}</p>
<p><strong>Score:</strong> <span style="color:${score <= 40 ? '#ff4444' : score <= 70 ? '#ffaa00' : '#c8ff00'};font-size:24px;font-weight:bold;">${score}/100</span></p>
<p><strong>Critical Issues:</strong> ${critCount}</p>
<p><strong>Answers:</strong> Follow-up: ${q1} | Booking: ${q2} | After-hours: ${q3}</p>
<p style="color:#888;">${siteInfo}</p>
<hr style="border-color:#333;margin:16px 0;">
<p style="color:#888;font-size:12px;">This lead entered the scan funnel. Day 0 email sent automatically.</p>
</div>`,
      });
    } catch {
      console.error("Failed to send lead notification");
    }

    // Add to scan funnel and send Day 0 email
    try {
      const entry = await addToScanFunnel({
        email,
        name: email.split("@")[0], // best we have; scan form may not capture name
        businessName: url,
        websiteUrl: url,
        score,
        leaks: leaks.map(l => ({ title: l.title, severity: l.severity })),
      });

      if (!entry) throw new Error("Failed to add to scan funnel");

      const template = getScanEmailTemplate(0, {
        name: entry.name,
        businessName: entry.business_name,
        websiteUrl: entry.website_url,
        score: entry.score,
        leaks: entry.leaks,
      });

      if (template) {
        const sent = await sendEmail({ to: email, subject: template.subject, body: template.body });
        if (sent) {
          await updateScanFunnelEntry(email, { emails_sent: [0] });
        }
      }
    } catch (e) {
      console.error("Scan funnel error:", e);
    }

    return NextResponse.json({
      success: true,
      siteData: siteAnalysis ? {
        mobileScore: siteAnalysis.mobileScore,
        fcp: siteAnalysis.fcp,
        lcp: siteAnalysis.lcp,
        cls: siteAnalysis.cls,
        tbt: siteAnalysis.tbt,
        hasHttps: siteAnalysis.hasHttps,
        speedRating: siteAnalysis.speedRating,
      } : null,
    });
  } catch (err) {
    console.error("Scan API error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
