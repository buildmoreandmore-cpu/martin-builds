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

  // Email Martin with the receipt
  const subject = `Agreement signed — ${clientName} / ${projectName}`;
  const html = `<div style="font-family:Arial,'Helvetica Neue',sans-serif;color:#1a1a1a;max-width:560px;">
    <h2 style="margin:0 0 12px 0;">New signed agreement</h2>
    <table cellpadding="6" cellspacing="0" style="font-size:14px;border-collapse:collapse;">
      <tr><td style="color:#666;">Client</td><td><strong>${clientName}</strong></td></tr>
      <tr><td style="color:#666;">Email</td><td>${clientEmail || "(not provided)"}</td></tr>
      <tr><td style="color:#666;">Project</td><td><strong>${projectName}</strong></td></tr>
      <tr><td style="color:#666;">Total</td><td>$${Number(totalAmount).toLocaleString()}</td></tr>
      <tr><td style="color:#666;">Monthly</td><td>$${Number(monthlyAmount).toLocaleString()} × ${numPayments || "?"}</td></tr>
      <tr><td style="color:#666;">Signed by</td><td>${signatureName}</td></tr>
      <tr><td style="color:#666;">Signed at</td><td>${signedAt}</td></tr>
      <tr><td style="color:#666;">IP / UA</td><td style="font-size:11px;color:#888;">${ip}<br/>${ua}</td></tr>
    </table>
    <p style="margin-top:16px;color:#666;font-size:13px;">Record ID: ${storedId || "(not stored — check Supabase table)"}</p>
    ${EMAIL_SIGNATURE}
  </div>`;
  await sendEmail({ to: "agent@martinbuilds.ai", subject, body: html, isHtml: true });

  // Also send a copy to the client if they provided email
  if (clientEmail) {
    const clientSubject = `Your signed agreement — ${projectName}`;
    const clientHtml = `<div style="font-family:Arial,'Helvetica Neue',sans-serif;color:#1a1a1a;max-width:560px;">
      <h2 style="margin:0 0 12px 0;">Agreement signed ✓</h2>
      <p>Hi ${clientName.split(" ")[0]}, thanks for signing the installment agreement for <strong>${projectName}</strong>. Here's a copy of the terms you accepted:</p>
      <table cellpadding="6" cellspacing="0" style="font-size:14px;border-collapse:collapse;">
        <tr><td style="color:#666;">Total</td><td>$${Number(totalAmount).toLocaleString()}</td></tr>
        <tr><td style="color:#666;">Monthly</td><td>$${Number(monthlyAmount).toLocaleString()} × ${numPayments || "?"}</td></tr>
        <tr><td style="color:#666;">Signed by</td><td>${signatureName}</td></tr>
        <tr><td style="color:#666;">Signed at</td><td>${signedAt}</td></tr>
      </table>
      <p style="margin-top:12px;font-size:13px;color:#666;">Full ownership transfers after the final installment is received. Reply to this email with any questions.</p>
      ${EMAIL_SIGNATURE}
    </div>`;
    await sendEmail({ to: clientEmail, subject: clientSubject, body: clientHtml, isHtml: true });
  }

  return NextResponse.json({ ok: true, id: storedId });
}
