import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail, EMAIL_SIGNATURE } from "@/lib/send-email";

const BASE = "https://martinbuilds.ai";

/**
 * Admin endpoint — sends a pre-filled signing link to a prospect.
 * The /installment-agreement page reads the same params and pre-fills the form.
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    clientName,
    projectName,
    clientEmail,
    paymentType, // "one_time" | "installments" (optional; inferred if missing)
    totalAmount,
    monthlyAmount,
    numPayments,
    note,
  } = body || {};

  if (!clientEmail || !clientName || !projectName || !totalAmount) {
    return NextResponse.json({ error: "Missing required fields (clientName, projectName, clientEmail, totalAmount)" }, { status: 400 });
  }
  const isOneTime = paymentType === "one_time"
    || Number(numPayments) === 1
    || (Number(monthlyAmount) > 0 && Number(monthlyAmount) === Number(totalAmount))
    || !monthlyAmount;
  // For one-time agreements, "monthly" equals the total (single payment).
  const effectiveMonthly = isOneTime ? Number(totalAmount) : Number(monthlyAmount);
  if (!isOneTime && (!monthlyAmount || Number(monthlyAmount) <= 0)) {
    return NextResponse.json({ error: "Installments require monthlyAmount > 0" }, { status: 400 });
  }
  const effectiveNumPayments = isOneTime ? 1 : (Number(numPayments) || Math.ceil(Number(totalAmount) / effectiveMonthly));

  // Generate a short invite id for tracking + URL
  const inviteId = Math.random().toString(36).slice(2, 10);

  // Persist the invite so we can match it when they sign
  try {
    await supabase.from("agreement_invites").insert({
      id: inviteId,
      client_name: clientName,
      client_email: clientEmail,
      project_name: projectName,
      total_amount: Number(totalAmount),
      monthly_amount: effectiveMonthly,
      num_payments: effectiveNumPayments,
      sent_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[agreements-send] supabase insert error:", err);
  }

  const params = new URLSearchParams({
    invite: inviteId,
    client: clientName,
    project: projectName,
    email: clientEmail,
    total: String(totalAmount),
    monthly: String(effectiveMonthly),
    payments: String(effectiveNumPayments),
    type: isOneTime ? "one_time" : "installments",
  });
  const signingUrl = `${BASE}/installment-agreement?${params.toString()}`;

  const firstName = clientName.split(" ")[0];
  const subject = isOneTime
    ? `Your agreement — ${projectName}`
    : `Your installment agreement — ${projectName}`;
  const headline = isOneTime
    ? `Service agreement for <strong>${projectName}</strong>`
    : `Installment agreement for <strong>${projectName}</strong>`;

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 0 });
  const bigAmount = isOneTime
    ? `<div style="font-size:34px;font-weight:800;color:#0a0a0a;line-height:1.1;letter-spacing:-0.5px;">$${fmt(Number(totalAmount))}</div>
       <div style="font-size:13px;color:#6b7280;margin-top:6px;">One-time payment</div>`
    : `<div style="font-size:34px;font-weight:800;color:#0a0a0a;line-height:1.1;letter-spacing:-0.5px;">$${fmt(Number(totalAmount))}</div>
       <div style="font-size:13px;color:#6b7280;margin-top:6px;">${effectiveNumPayments} monthly payments of $${fmt(effectiveMonthly)}</div>`;

  const html = `<div style="font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#1a1a1a;max-width:560px;line-height:1.6;padding:0 4px;">
    <p style="margin:0 0 16px 0;font-size:16px;color:#0a0a0a;">Hi ${firstName},</p>
    <p style="margin:0 0 24px 0;font-size:15px;color:#374151;">${headline}. The details are already filled in below — review, type your name to sign, and you're done.</p>

    <div style="background:#FAFAF7;border:1px solid #E8E3DC;border-radius:12px;padding:22px 24px;margin:20px 0 28px 0;">
      ${bigAmount}
    </div>

    ${note ? `<div style="background:#FBFAF3;border-left:3px solid #c8ff00;padding:14px 16px;font-size:14px;margin:0 0 24px 0;color:#1a1a1a;border-radius:0 6px 6px 0;">${note}</div>` : ""}

    <div style="margin:24px 0;">
      <a href="${signingUrl}" style="display:inline-block;background:#c8ff00;color:#0a0a0a;padding:14px 26px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">Review and sign →</a>
    </div>

    <p style="font-size:12px;color:#9ca3af;margin-top:20px;line-height:1.5;">Button not working? Open this link:<br/><a href="${signingUrl}" style="color:#9ca3af;word-break:break-all;">${signingUrl}</a></p>
    ${EMAIL_SIGNATURE}
  </div>`;

  const sent = await sendEmail({ to: clientEmail, subject, body: html, isHtml: true });
  if (!sent) {
    return NextResponse.json({
      ok: false,
      inviteId,
      signingUrl,
      error: "Email delivery failed. Check Composio connection / Vercel logs. Signing URL is still valid — you can copy it from the response.",
    }, { status: 502 });
  }
  return NextResponse.json({ ok: true, inviteId, signingUrl });
}
