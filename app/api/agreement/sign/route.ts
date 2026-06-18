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
    paymentType,
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

  const isOneTime = paymentType === "one_time" || Number(numPayments) === 1 || Number(totalAmount) === Number(monthlyAmount);
  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 0 });
  const bigAmount = isOneTime
    ? `<div style="font-size:28px;font-weight:800;color:#0a0a0a;line-height:1.1;letter-spacing:-0.4px;">$${fmt(Number(totalAmount))}</div>
       <div style="font-size:12px;color:#6b7280;margin-top:4px;">One-time payment</div>`
    : `<div style="font-size:28px;font-weight:800;color:#0a0a0a;line-height:1.1;letter-spacing:-0.4px;">$${fmt(Number(totalAmount))}</div>
       <div style="font-size:12px;color:#6b7280;margin-top:4px;">${numPayments || "?"} monthly payments of $${fmt(Number(monthlyAmount))}</div>`;

  // Email Martin with the receipt (denser layout — internal use)
  const subject = `Agreement signed — ${clientName} / ${projectName}`;
  const paymentLine = isOneTime
    ? `$${fmt(Number(totalAmount))} (one-time)`
    : `$${fmt(Number(totalAmount))} total · ${numPayments || "?"} × $${fmt(Number(monthlyAmount))}/mo`;
  const html = `<div style="font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#1a1a1a;max-width:560px;line-height:1.6;">
    <h2 style="margin:0 0 12px 0;font-size:18px;color:#0a0a0a;">New signed agreement</h2>
    <table cellpadding="0" cellspacing="0" style="font-size:14px;border-collapse:collapse;">
      <tr><td style="color:#6b7280;padding:5px 14px 5px 0;">Client</td><td style="padding:5px 0;"><strong>${clientName}</strong></td></tr>
      <tr><td style="color:#6b7280;padding:5px 14px 5px 0;">Email</td><td style="padding:5px 0;">${clientEmail || "(not provided)"}</td></tr>
      <tr><td style="color:#6b7280;padding:5px 14px 5px 0;">Project</td><td style="padding:5px 0;"><strong>${projectName}</strong></td></tr>
      <tr><td style="color:#6b7280;padding:5px 14px 5px 0;">Amount</td><td style="padding:5px 0;">${paymentLine}</td></tr>
      <tr><td style="color:#6b7280;padding:5px 14px 5px 0;">Signed by</td><td style="padding:5px 0;">${signatureName}</td></tr>
      <tr><td style="color:#6b7280;padding:5px 14px 5px 0;">Signed at</td><td style="padding:5px 0;">${signedAt}</td></tr>
      <tr><td style="color:#6b7280;padding:5px 14px 5px 0;vertical-align:top;">IP / UA</td><td style="padding:5px 0;font-size:11px;color:#9ca3af;">${ip}<br/>${ua}</td></tr>
    </table>
    <p style="margin-top:16px;color:#6b7280;font-size:13px;">Record ID: ${storedId || "(not stored — check Supabase table)"}</p>
    ${EMAIL_SIGNATURE}
  </div>`;
  await sendEmail({ to: "agent@martinbuilds.ai", subject, body: html, isHtml: true });

  // Also send a copy to the client (clean, big-amount layout)
  if (clientEmail) {
    const clientSubject = isOneTime
      ? `Your agreement — ${projectName}`
      : `Your installment agreement — ${projectName}`;
    const clientIntro = isOneTime
      ? `thanks for signing the agreement for <strong>${projectName}</strong>. Here's the confirmation:`
      : `thanks for signing the installment agreement for <strong>${projectName}</strong>. Here's the confirmation:`;
    const closing = isOneTime
      ? "Full ownership transfers once payment is received in full. Reply to this email with any questions."
      : "Full ownership transfers after the final installment is received. Reply to this email with any questions.";
    const clientHtml = `<div style="font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#1a1a1a;max-width:560px;line-height:1.6;padding:0 4px;">
      <h2 style="margin:0 0 12px 0;font-size:20px;color:#0a0a0a;">Agreement signed ✓</h2>
      <p style="margin:0 0 20px 0;font-size:15px;color:#374151;">Hi ${clientName.split(" ")[0]}, ${clientIntro}</p>
      <div style="background:#FAFAF7;border:1px solid #E8E3DC;border-radius:12px;padding:22px 24px;margin:20px 0 24px 0;">
        ${bigAmount}
        <div style="border-top:1px solid #E8E3DC;margin-top:18px;padding-top:14px;font-size:12px;color:#6b7280;">
          Signed by <strong style="color:#1a1a1a;">${signatureName}</strong> · ${signedAt}
        </div>
      </div>
      <p style="margin-top:16px;font-size:13px;color:#6b7280;">${closing}</p>
      ${EMAIL_SIGNATURE}
    </div>`;
    await sendEmail({ to: clientEmail, subject: clientSubject, body: clientHtml, isHtml: true });
  }

  return NextResponse.json({ ok: true, id: storedId });
}
