import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail, EMAIL_SIGNATURE } from "@/lib/send-email";

/**
 * Called from the /installment-agreement page when a prospect clicks Sign.
 * Persists the signed record + emails Martin so he actually gets the receipt.
 * Previously the page only flipped local state — nothing reached the server.
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    clientName,
    projectName,
    clientEmail,
    totalAmount,
    monthlyAmount,
    numPayments,
    signatureName,
    inviteId,
  } = body || {};

  if (!clientName || !projectName || !signatureName || !totalAmount || !monthlyAmount) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const signedAt = new Date().toISOString();
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const ua = req.headers.get("user-agent") || "unknown";

  let storedId: string | null = null;
  try {
    const { data, error } = await supabase
      .from("signed_agreements")
      .insert({
        client_name: clientName,
        project_name: projectName,
        client_email: clientEmail || null,
        total_amount: Number(totalAmount),
        monthly_amount: Number(monthlyAmount),
        num_payments: Number(numPayments) || null,
        signature_name: signatureName,
        invite_id: inviteId || null,
        signed_at: signedAt,
        ip_address: ip,
        user_agent: ua,
      })
      .select("id")
      .single();
    if (error) console.error("[agreement-sign] supabase insert error:", error.message);
    else storedId = (data as { id?: string })?.id || null;
  } catch (err) {
    console.error("[agreement-sign] supabase exception:", err);
  }

  const isOneTime = Number(numPayments) === 1 || Number(totalAmount) === Number(monthlyAmount);
  const paymentRows = isOneTime
    ? `<tr><td style="color:#6b7280;padding:4px 12px 4px 0;">Payment</td><td style="padding:4px 0;">$${Number(totalAmount).toLocaleString()} <span style="color:#6b7280;">(one-time)</span></td></tr>`
    : `<tr><td style="color:#6b7280;padding:4px 12px 4px 0;">Total</td><td style="padding:4px 0;">$${Number(totalAmount).toLocaleString()}</td></tr>
       <tr><td style="color:#6b7280;padding:4px 12px 4px 0;">Monthly</td><td style="padding:4px 0;">$${Number(monthlyAmount).toLocaleString()} × ${numPayments || "?"}</td></tr>`;

  // Email Martin with the receipt
  const subject = `Agreement signed — ${clientName} / ${projectName}`;
  const html = `<div style="font-family:Arial,'Helvetica Neue',sans-serif;color:#1a1a1a;max-width:560px;line-height:1.6;">
    <h2 style="margin:0 0 12px 0;font-size:18px;">New signed agreement</h2>
    <table cellpadding="0" cellspacing="0" style="font-size:14px;border-collapse:collapse;">
      <tr><td style="color:#6b7280;padding:4px 12px 4px 0;">Client</td><td style="padding:4px 0;"><strong>${clientName}</strong></td></tr>
      <tr><td style="color:#6b7280;padding:4px 12px 4px 0;">Email</td><td style="padding:4px 0;">${clientEmail || "(not provided)"}</td></tr>
      <tr><td style="color:#6b7280;padding:4px 12px 4px 0;">Project</td><td style="padding:4px 0;"><strong>${projectName}</strong></td></tr>
      ${paymentRows}
      <tr><td style="color:#6b7280;padding:4px 12px 4px 0;">Signed by</td><td style="padding:4px 0;">${signatureName}</td></tr>
      <tr><td style="color:#6b7280;padding:4px 12px 4px 0;">Signed at</td><td style="padding:4px 0;">${signedAt}</td></tr>
      <tr><td style="color:#6b7280;padding:4px 12px 4px 0;vertical-align:top;">IP / UA</td><td style="padding:4px 0;font-size:11px;color:#9ca3af;">${ip}<br/>${ua}</td></tr>
    </table>
    <p style="margin-top:16px;color:#6b7280;font-size:13px;">Record ID: ${storedId || "(not stored — check Supabase table)"}</p>
    ${EMAIL_SIGNATURE}
  </div>`;
  await sendEmail({ to: "agent@martinbuilds.ai", subject, body: html, isHtml: true });

  // Also send a copy to the client if they provided email
  if (clientEmail) {
    const clientSubject = isOneTime
      ? `Your service agreement — ${projectName}`
      : `Your installment agreement — ${projectName}`;
    const clientIntro = isOneTime
      ? `thanks for signing the agreement for <strong>${projectName}</strong>. Here's a copy of the terms you accepted:`
      : `thanks for signing the installment agreement for <strong>${projectName}</strong>. Here's a copy of the terms you accepted:`;
    const closing = isOneTime
      ? "Full ownership transfers once payment is received in full. Reply to this email with any questions."
      : "Full ownership transfers after the final installment is received. Reply to this email with any questions.";
    const clientHtml = `<div style="font-family:Arial,'Helvetica Neue',sans-serif;color:#1a1a1a;max-width:560px;line-height:1.6;">
      <h2 style="margin:0 0 12px 0;font-size:18px;">Agreement signed ✓</h2>
      <p style="margin:0 0 14px 0;">Hi ${clientName.split(" ")[0]}, ${clientIntro}</p>
      <table cellpadding="0" cellspacing="0" style="font-size:14px;border-collapse:collapse;margin:8px 0 14px 0;background:#FAFAF7;border:1px solid #E8E3DC;border-radius:8px;padding:8px 14px;">
        ${paymentRows}
        <tr><td style="color:#6b7280;padding:4px 12px 4px 0;">Signed by</td><td style="padding:4px 0;">${signatureName}</td></tr>
        <tr><td style="color:#6b7280;padding:4px 12px 4px 0;">Signed at</td><td style="padding:4px 0;">${signedAt}</td></tr>
      </table>
      <p style="margin-top:12px;font-size:13px;color:#6b7280;">${closing}</p>
      ${EMAIL_SIGNATURE}
    </div>`;
    await sendEmail({ to: clientEmail, subject: clientSubject, body: clientHtml, isHtml: true });
  }

  return NextResponse.json({ ok: true, id: storedId });
}
