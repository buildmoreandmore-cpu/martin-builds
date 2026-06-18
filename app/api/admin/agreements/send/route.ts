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
    totalAmount,
    monthlyAmount,
    numPayments,
    note,
  } = body || {};

  if (!clientEmail || !clientName || !projectName || !totalAmount || !monthlyAmount) {
    return NextResponse.json({ error: "Missing required fields (clientName, projectName, clientEmail, totalAmount, monthlyAmount)" }, { status: 400 });
  }

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
      monthly_amount: Number(monthlyAmount),
      num_payments: Number(numPayments) || null,
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
    monthly: String(monthlyAmount),
    ...(numPayments ? { payments: String(numPayments) } : {}),
  });
  const signingUrl = `${BASE}/installment-agreement?${params.toString()}`;

  const firstName = clientName.split(" ")[0];
  const subject = `Your installment agreement — ${projectName}`;
  const html = `<div style="font-family:Arial,'Helvetica Neue',sans-serif;color:#1a1a1a;max-width:560px;line-height:1.6;">
    <h2 style="margin:0 0 12px 0;">Hi ${firstName},</h2>
    <p>Here's the installment agreement for <strong>${projectName}</strong>. The details are already filled in — just review, type your name to sign, and you're done.</p>
    <table cellpadding="6" cellspacing="0" style="font-size:14px;border-collapse:collapse;margin:12px 0;background:#FAFAF7;border:1px solid #E8E3DC;border-radius:6px;">
      <tr><td style="color:#666;">Total</td><td><strong>$${Number(totalAmount).toLocaleString()}</strong></td></tr>
      <tr><td style="color:#666;">Monthly</td><td><strong>$${Number(monthlyAmount).toLocaleString()}</strong>${numPayments ? ` × ${numPayments}` : ""}</td></tr>
    </table>
    ${note ? `<p style="background:#FBFAF7;border-left:3px solid #c8ff00;padding:10px 14px;font-size:14px;margin:14px 0;">${note}</p>` : ""}
    <p style="margin:20px 0;"><a href="${signingUrl}" style="display:inline-block;background:#c8ff00;color:#0a0a0a;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:700;font-size:14px;">Review and sign →</a></p>
    <p style="font-size:12px;color:#888;">If the button doesn't open, paste this into your browser:<br/><a href="${signingUrl}" style="color:#888;word-break:break-all;">${signingUrl}</a></p>
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
