"use client";

import { useState, useEffect } from "react";

const GREEN = "#c8ff00";
const BG = "#0a0a0a";
const CARD_BG = "#1a1a1a";
const TEXT = "#e0e0e0";
const DIM = "#888";

export default function InstallmentAgreement() {
  const [clientName, setClientName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [signatureName, setSignatureName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [inviteId, setInviteId] = useState<string | null>(null);

  // Pre-fill from query params (admin sends a link with ?client=&project=&total=&monthly=&email=&invite=)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    if (p.get("client")) setClientName(p.get("client") || "");
    if (p.get("project")) setProjectName(p.get("project") || "");
    if (p.get("email")) setClientEmail(p.get("email") || "");
    if (p.get("total")) setTotalAmount(p.get("total") || "");
    if (p.get("monthly")) setMonthlyAmount(p.get("monthly") || "");
    if (p.get("invite")) setInviteId(p.get("invite"));
  }, []);

  const total = parseFloat(totalAmount) || 0;
  const monthly = parseFloat(monthlyAmount) || 0;
  const numPayments = monthly > 0 ? Math.ceil(total / monthly) : 0;
  const finalPayment = total % monthly !== 0 ? total % monthly : monthly;
  const isOneTime = numPayments === 1;

  const handleSign = async () => {
    if (!clientName || !projectName || !totalAmount || !monthlyAmount || !signatureName || !agreed) return;
    if (monthly <= 0) return;
    if (submitting) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/agreement/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          projectName,
          clientEmail: clientEmail || null,
          totalAmount: total,
          monthlyAmount: monthly,
          numPayments,
          signatureName,
          inviteId,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => null);
        setSubmitError(d?.error || "Couldn't record signature — please email agent@martinbuilds.ai");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Network error — please try again");
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ textAlign: "center", maxWidth: 500 }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>&#9989;</div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f5f5f0", marginBottom: "0.75rem" }}>Agreement Signed</h1>
          <p style={{ color: DIM, lineHeight: 1.7 }}>
            {isOneTime ? (
              <>Your agreement for <strong style={{ color: GREEN }}>{projectName}</strong> is confirmed. A one-time payment of ${total.toLocaleString()} will be processed.</>
            ) : (
              <>Your installment plan for <strong style={{ color: GREEN }}>{projectName}</strong> is confirmed. {numPayments} monthly payments of ${monthly.toLocaleString()}/mo begin on your billing date.</>
            )}
          </p>
          <p style={{ color: DIM, fontSize: "0.85rem", marginTop: "1rem" }}>
            Signed by {signatureName} on {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, padding: "clamp(2rem, 5vw, 4rem)" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <a href="/" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.9rem", fontWeight: 700, textDecoration: "none", color: "#f5f5f0" }}>
            martin<span style={{ color: GREEN }}>.builds</span>
          </a>
        </div>

        <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 800, color: "#f5f5f0", marginBottom: "0.5rem" }}>
          {isOneTime ? "Service Agreement" : "Installment Payment Agreement"}
        </h1>
        <p style={{ color: DIM, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem" }}>
          {isOneTime
            ? "This agreement outlines the terms of your one-time payment with Martin Builds."
            : "This agreement outlines the terms of your installment plan with Martin Builds."}
        </p>

        {/* Project Details */}
        <div style={{ background: CARD_BG, borderRadius: 12, border: "1px solid #2a2a2a", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "0.65rem", color: GREEN, fontFamily: "'Space Mono', monospace", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1rem" }}>
            Project Details
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", color: DIM, display: "block", marginBottom: 4 }}>Client Name</label>
              <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Your full name" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: "0.75rem", color: DIM, display: "block", marginBottom: 4 }}>Project Name</label>
              <input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project name" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: "0.75rem", color: DIM, display: "block", marginBottom: 4 }}>Total Project Cost</label>
              <input type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} placeholder="5000" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: "0.75rem", color: DIM, display: "block", marginBottom: 4 }}>Payment Amount</label>
              <input type="number" value={monthlyAmount} onChange={(e) => setMonthlyAmount(e.target.value)} placeholder="500" style={inputStyle} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontSize: "0.75rem", color: DIM, display: "block", marginBottom: 4 }}>Your Email <span style={{ color: "#555" }}>(for your copy of the signed agreement)</span></label>
              <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
            </div>
          </div>

          {numPayments > 0 && (
            <div style={{ marginTop: "1rem", padding: "1rem", background: BG, borderRadius: 8, border: "1px solid rgba(200,255,0,0.1)" }}>
              <div style={{ fontSize: "0.85rem", color: TEXT }}>
                {isOneTime ? (
                  <><strong style={{ color: GREEN }}>One-time payment</strong> of ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</>
                ) : (
                  <>
                    <strong style={{ color: GREEN }}>{numPayments} payments</strong> of ${monthly.toLocaleString("en-US", { minimumFractionDigits: 2 })}/mo
                    {finalPayment !== monthly && (
                      <span style={{ color: DIM }}> (final payment: ${finalPayment.toLocaleString("en-US", { minimumFractionDigits: 2 })})</span>
                    )}
                  </>
                )}
              </div>
              {!isOneTime && (
                <div style={{ fontSize: "0.75rem", color: DIM, marginTop: 4 }}>
                  Total: ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Terms */}
        <div style={{ background: CARD_BG, borderRadius: 12, border: "1px solid #2a2a2a", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "0.65rem", color: GREEN, fontFamily: "'Space Mono', monospace", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1rem" }}>
            Installment Terms
          </div>
          <div style={{ fontSize: "0.85rem", color: TEXT, lineHeight: 1.8 }}>
            <ol style={{ paddingLeft: "1.25rem", margin: 0 }}>
              <li style={{ marginBottom: "0.75rem" }}>
                {isOneTime ? (
                  <><strong>Payment Method.</strong> Payment is processed via Stripe at the time of signing or shortly after, using the card or method provided.</>
                ) : (
                  <><strong>Autopay Required.</strong> A valid credit or debit card must remain on file. Payments are processed automatically on the same date each month via Stripe.</>
                )}
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Fixed Payment.</strong> The payment amount agreed above is fixed for the duration of this plan.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Ownership Transfer.</strong> Full ownership and unrestricted access to the delivered product transfers only after {isOneTime ? "the payment is received in full" : "the final installment is received in full"}.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Failed Payments.</strong> If a scheduled payment fails, Stripe will automatically retry up to 3 times. If all retries fail, Martin Builds reserves the right to pause access until the outstanding balance is resolved.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Early Payoff.</strong> You may pay the remaining balance in full at any time with no penalty or additional fees.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>No Refunds.</strong> Installment payments for completed work are non-refundable. Cancellation of the plan does not entitle the client to a refund of payments already made.
              </li>
              <li>
                <strong>Late Payment.</strong> If your account remains delinquent for more than 30 days, Martin Builds may terminate this agreement and retain all payments received as compensation for work completed.
              </li>
            </ol>
          </div>
        </div>

        {/* Signature */}
        <div style={{ background: CARD_BG, borderRadius: 12, border: "1px solid #2a2a2a", padding: "1.5rem" }}>
          <div style={{ fontSize: "0.65rem", color: GREEN, fontFamily: "'Space Mono', monospace", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1rem" }}>
            E-Signature
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{ accentColor: GREEN, marginTop: 3, width: 16, height: 16, flexShrink: 0 }}
              />
              <span style={{ fontSize: "0.82rem", color: TEXT, lineHeight: 1.6 }}>
                I have read and agree to the {isOneTime ? "payment" : "installment payment"} terms above and the{" "}
                <a href="/terms" target="_blank" style={{ color: GREEN, textDecoration: "none" }}>Terms of Service</a>.
                {isOneTime
                  ? " I authorize Martin Builds to charge the agreed amount for this project."
                  : " I authorize Martin Builds to charge the card on file for the agreed amount on each scheduled date until the total is paid in full."}
              </span>
            </label>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.75rem", color: DIM, display: "block", marginBottom: 4 }}>Type your full legal name to sign</label>
            <input
              value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
              placeholder="Your full name"
              style={{ ...inputStyle, fontStyle: "italic", fontSize: "1.1rem" }}
            />
          </div>
          <button
            onClick={handleSign}
            disabled={submitting || !clientName || !projectName || !totalAmount || !monthlyAmount || !signatureName || !agreed || monthly <= 0}
            style={{
              width: "100%",
              padding: "0.9rem",
              background: (submitting || !clientName || !projectName || !totalAmount || !monthlyAmount || !signatureName || !agreed || monthly <= 0) ? "#333" : GREEN,
              color: (submitting || !clientName || !projectName || !totalAmount || !monthlyAmount || !signatureName || !agreed || monthly <= 0) ? "#666" : BG,
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: (submitting || !clientName || !projectName || !totalAmount || !monthlyAmount || !signatureName || !agreed || monthly <= 0) ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {submitting ? "Submitting…" : "Sign Agreement"}
          </button>
          {submitError && (
            <p style={{ marginTop: "0.75rem", color: "#ff6b6b", fontSize: "0.8rem", textAlign: "center" }}>{submitError}</p>
          )}
        </div>

        <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.75rem", color: "#555" }}>
          This agreement is governed by the laws of the State of Georgia. &middot;{" "}
          <a href="/terms" style={{ color: DIM, textDecoration: "none" }}>Full Terms of Service</a>
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .install-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem 0.75rem",
  background: "#111",
  border: "1px solid #2a2a2a",
  borderRadius: 6,
  color: "#f5f5f0",
  fontSize: "0.85rem",
  outline: "none",
};
