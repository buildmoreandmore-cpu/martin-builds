"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const accent = "#c8ff00";
const black = "#0a0a0a";
const white = "#f5f5f0";
const grayDark = "#1a1a1a";
const grayMid = "#2a2a2a";
const grayText = "#888";

interface PaymentData {
  client_secret: string;
  amount: number;
  currency: string;
  status: string;
  metadata: {
    project_name?: string;
    total_amount?: string;
    phase?: string;
    client_name?: string;
    client_email?: string;
    [key: string]: string | undefined;
  };
}

interface ClientInfo {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface ProjectPaymentFormProps {
  paymentIntentId: string;
}

export default function ProjectPaymentForm({
  paymentIntentId,
}: ProjectPaymentFormProps) {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [signatureName, setSignatureName] = useState("");
  const [signedAt, setSignedAt] = useState<string | null>(null);
  const [signError, setSignError] = useState<string | null>(null);
  const [signing, setSigning] = useState(false);

  useEffect(() => {
    fetch(`/api/payment-intent/${paymentIntentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setPaymentData(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load payment details");
        setLoading(false);
      });
  }, [paymentIntentId]);

  if (loading) {
    return (
      <div
        style={{
          paddingTop: "120px",
          paddingBottom: "4rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: `3px solid ${grayMid}`,
            borderTopColor: accent,
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 1rem",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: grayText }}>Loading payment details...</p>
      </div>
    );
  }

  if (error || !paymentData) {
    return (
      <div
        style={{
          paddingTop: "120px",
          paddingBottom: "4rem",
          textAlign: "center",
          maxWidth: 500,
          margin: "0 auto",
          padding: "120px 1.5rem 4rem",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>!</div>
        <p
          style={{
            color: "#ff4444",
            fontSize: "1.1rem",
            fontWeight: 600,
            marginBottom: "1rem",
          }}
        >
          {error || "Payment link invalid or expired"}
        </p>
        <a
          href="/contact?type=Payment+Question"
          style={{
            display: "inline-block",
            padding: "0.75rem 2rem",
            background: accent,
            color: black,
            borderRadius: 100,
            fontWeight: 700,
            fontSize: "0.85rem",
            textDecoration: "none",
          }}
        >
          Contact Support
        </a>
      </div>
    );
  }

  const depositAmount = paymentData.amount / 100;
  const totalAmount = paymentData.metadata.total_amount
    ? parseInt(paymentData.metadata.total_amount) / 100
    : depositAmount;
  const projectName =
    paymentData.metadata.project_name || "Project Payment";
  const phase = paymentData.metadata.phase || "1";
  const isInstallment = paymentData.metadata.payment_type === "installment";
  const installmentNumber = parseInt(paymentData.metadata.installment_number || "1");
  const numPayments = parseInt(paymentData.metadata.num_payments || "1");
  const monthlyAmount = paymentData.metadata.monthly_amount
    ? parseInt(paymentData.metadata.monthly_amount) / 100
    : depositAmount;

  const handleContinueToAgreement = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSign = async () => {
    if (!signatureName.trim()) return;
    setSigning(true);
    setSignError(null);

    const now = new Date().toISOString();
    setSignedAt(now);

    try {
      const res = await fetch(
        `/api/payment-intent/${paymentIntentId}/sign`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client_name: clientInfo.name,
            client_email: clientInfo.email,
            client_phone: clientInfo.phone,
            client_company: clientInfo.company || null,
            signature_name: signatureName.trim(),
            signed_at: now,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setSignError(data.error || "Failed to save signature");
        setSigning(false);
        return;
      }
      setSigning(false);
      setStep(3);
    } catch {
      setSignError("Failed to save signature. Please try again.");
      setSigning(false);
    }
  };

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "4rem" }}>
      <section
        style={{ maxWidth: 600, margin: "0 auto", padding: "0 1.5rem" }}
      >
        {/* Step Indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "2.5rem",
            alignItems: "center",
          }}
        >
          {[
            { num: 1, label: "Your Info" },
            { num: 2, label: "Agreement" },
            { num: 3, label: "Payment" },
          ].map((s, i) => (
            <div
              key={s.num}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {i > 0 && (
                <div
                  style={{
                    width: 32,
                    height: 1,
                    background:
                      step > i ? accent : "rgba(245,245,240,0.1)",
                  }}
                />
              )}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  fontFamily: "'Space Mono', monospace",
                  background:
                    step === s.num
                      ? accent
                      : step > s.num
                        ? "rgba(200,255,0,0.15)"
                        : grayMid,
                  color:
                    step === s.num
                      ? black
                      : step > s.num
                        ? accent
                        : grayText,
                  transition: "all 0.3s",
                }}
              >
                {step > s.num ? "\u2713" : s.num}
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: step === s.num ? white : grayText,
                  display: "none",
                }}
                className="step-label"
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Client Info */}
        {step === 1 && (
          <form onSubmit={handleContinueToAgreement}>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)",
                fontWeight: 700,
                letterSpacing: "-1px",
                marginBottom: "0.5rem",
                textAlign: "center",
              }}
            >
              Your Information
            </div>
            <p
              style={{
                textAlign: "center",
                color: grayText,
                fontSize: "0.9rem",
                marginBottom: "2rem",
              }}
            >
              Enter your details to continue with payment for{" "}
              <strong style={{ color: accent }}>{projectName}</strong>
            </p>

            <div
              style={{
                padding: "2rem",
                background: grayDark,
                borderRadius: 12,
                border: `1px solid ${grayMid}`,
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                marginBottom: "1.5rem",
              }}
            >
              <InputField
                label="Full Name"
                type="text"
                required
                value={clientInfo.name}
                onChange={(v) =>
                  setClientInfo({ ...clientInfo, name: v })
                }
                placeholder="John Smith"
              />
              <InputField
                label="Email Address"
                type="email"
                required
                value={clientInfo.email}
                onChange={(v) =>
                  setClientInfo({ ...clientInfo, email: v })
                }
                placeholder="john@company.com"
              />
              <InputField
                label="Phone Number"
                type="tel"
                required
                value={clientInfo.phone}
                onChange={(v) =>
                  setClientInfo({ ...clientInfo, phone: v })
                }
                placeholder="+1 (555) 123-4567"
              />
              <InputField
                label="Company Name"
                type="text"
                required={false}
                value={clientInfo.company}
                onChange={(v) =>
                  setClientInfo({ ...clientInfo, company: v })
                }
                placeholder="Acme Corp (optional)"
              />
            </div>

            <button
              type="submit"
              disabled={
                !clientInfo.name.trim() ||
                !clientInfo.email.trim() ||
                !clientInfo.phone.trim()
              }
              style={{
                width: "100%",
                padding: "1rem",
                background:
                  clientInfo.name.trim() &&
                  clientInfo.email.trim() &&
                  clientInfo.phone.trim()
                    ? accent
                    : grayMid,
                color:
                  clientInfo.name.trim() &&
                  clientInfo.email.trim() &&
                  clientInfo.phone.trim()
                    ? black
                    : grayText,
                borderRadius: 8,
                fontWeight: 700,
                fontSize: "1rem",
                border: "none",
                cursor:
                  clientInfo.name.trim() &&
                  clientInfo.email.trim() &&
                  clientInfo.phone.trim()
                    ? "pointer"
                    : "not-allowed",
                transition: "all 0.3s",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Continue
            </button>
          </form>
        )}

        {/* Step 2: Service Agreement + Signature */}
        {step === 2 && (
          <div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)",
                fontWeight: 700,
                letterSpacing: "-1px",
                marginBottom: "0.5rem",
                textAlign: "center",
              }}
            >
              Service Agreement
            </div>
            <p
              style={{
                textAlign: "center",
                color: grayText,
                fontSize: "0.9rem",
                marginBottom: "2rem",
              }}
            >
              Review and sign to continue
            </p>

            <div
              style={{
                padding: "2rem",
                background: grayDark,
                borderRadius: 12,
                border: `1px solid ${grayMid}`,
                marginBottom: "1.5rem",
              }}
            >
              {/* Scrollable terms */}
              <div
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                  color: grayText,
                  maxHeight: 280,
                  overflowY: "auto",
                  paddingRight: "0.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <p style={{ marginBottom: "0.75rem" }}>
                  <strong style={{ color: white }}>Payment Terms:</strong>{" "}
                  {isInstallment ? (
                    <>
                      This project uses an installment payment plan. You will
                      be charged <strong style={{ color: white }}>${monthlyAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}/mo</strong> for{" "}
                      <strong style={{ color: white }}>{numPayments} months</strong> (total:{" "}
                      <strong style={{ color: white }}>${totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong>).
                      Your card will be saved and charged automatically each month.
                      This first payment initiates the plan.
                    </>
                  ) : (
                    <>
                      All projects require payment before work begins. No
                      exceptions. For split-payment projects: a 50% deposit is
                      due at booking; the remaining 50% is due before final
                      delivery and handoff.
                    </>
                  )}
                </p>
                {isInstallment && (
                  <p style={{ marginBottom: "0.75rem" }}>
                    <strong style={{ color: white }}>Autopay:</strong>{" "}
                    By completing this payment, your card will be saved as the
                    default payment method. Subsequent monthly payments will be
                    charged automatically on the same date each month. You may
                    pay off the remaining balance early at any time by contacting
                    Martin Builds.
                  </p>
                )}
                <p style={{ marginBottom: "0.75rem" }}>
                  <strong style={{ color: white }}>Refund Policy:</strong>{" "}
                  {isInstallment ? (
                    <>
                      Installment payments are non-refundable once processed.
                      If Martin Builds cancels a project before work begins, a
                      full refund will be issued within 5 business days.
                    </>
                  ) : (
                    <>
                      Deposits are non-refundable once work has begun. Full
                      payments for completed projects are non-refundable. If
                      Martin Builds cancels a project before work begins, a
                      full refund will be issued within 5 business days.
                    </>
                  )}
                </p>
                <p style={{ marginBottom: "0.75rem" }}>
                  <strong style={{ color: white }}>Delivery:</strong>{" "}
                  {isInstallment ? (
                    <>
                      Project work begins after the first payment clears. Final
                      project files, credentials, and assets will not be
                      transferred until all installments are paid in full.
                    </>
                  ) : (
                    <>
                      Martin Builds operates on a 14-day delivery model for
                      standard website projects. Final project files,
                      credentials, and assets will not be transferred until all
                      outstanding balances are paid in full.
                    </>
                  )}
                </p>
                <p style={{ marginBottom: "0.75rem" }}>
                  <strong style={{ color: white }}>Revisions:</strong> Each
                  project includes up to two rounds of revisions within the
                  agreed scope. Revisions outside of scope are billed at
                  Martin Builds&apos; current hourly rate.
                </p>
                <p>
                  <strong style={{ color: white }}>Disputes:</strong> Any
                  disputes will be resolved through good-faith negotiation.
                  If unresolved, disputes will be submitted to binding
                  arbitration in Atlanta, Georgia.
                </p>
              </div>

              <a
                href="/terms"
                target="_blank"
                style={{
                  display: "inline-block",
                  fontSize: "0.82rem",
                  color: accent,
                  textDecoration: "underline",
                  marginBottom: "1.75rem",
                }}
              >
                Read the full Martin Builds Service Agreement &rarr;
              </a>

              {/* Digital Signature */}
              <div
                style={{
                  padding: "1.5rem",
                  background: grayMid,
                  borderRadius: 10,
                  border: "1px solid rgba(245,245,240,0.06)",
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: accent,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "0.75rem",
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  Digital Signature
                </label>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: grayText,
                    marginBottom: "0.75rem",
                    lineHeight: 1.5,
                  }}
                >
                  Type your full legal name below to sign this agreement
                </p>
                <input
                  type="text"
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  placeholder="Type your full name"
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem",
                    background: "rgba(245,245,240,0.04)",
                    border: `1px solid ${signatureName.trim() ? accent : "rgba(245,245,240,0.1)"}`,
                    borderRadius: 8,
                    color: white,
                    fontSize: "1.1rem",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontStyle: "italic",
                    boxSizing: "border-box",
                    outline: "none",
                    transition: "border-color 0.3s",
                  }}
                />
                {signatureName.trim() && (
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: grayText,
                      marginTop: "0.5rem",
                    }}
                  >
                    Signed as:{" "}
                    <span
                      style={{
                        color: white,
                        fontStyle: "italic",
                        fontFamily:
                          "Georgia, 'Times New Roman', serif",
                      }}
                    >
                      {signatureName}
                    </span>{" "}
                    &middot;{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "long",
                      timeStyle: "short",
                    }).format(new Date())}
                  </p>
                )}
              </div>
            </div>

            {signError && (
              <div
                style={{
                  padding: "0.75rem 1rem",
                  background: "rgba(255,68,68,0.1)",
                  border: "1px solid rgba(255,68,68,0.2)",
                  borderRadius: 8,
                  color: "#ff4444",
                  fontSize: "0.85rem",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                {signError}
              </div>
            )}

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  padding: "1rem 1.5rem",
                  background: grayMid,
                  color: white,
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Back
              </button>
              <button
                onClick={handleSign}
                disabled={!signatureName.trim() || signing}
                style={{
                  flex: 1,
                  padding: "1rem",
                  background:
                    signatureName.trim() && !signing
                      ? accent
                      : grayMid,
                  color:
                    signatureName.trim() && !signing
                      ? black
                      : grayText,
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: "1rem",
                  border: "none",
                  cursor:
                    signatureName.trim() && !signing
                      ? "pointer"
                      : "not-allowed",
                  transition: "all 0.3s",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {signing ? "Saving..." : "Sign & Continue"}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && paymentData.client_secret && (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: paymentData.client_secret }}
          >
            <PaymentStep
              projectName={projectName}
              depositAmount={depositAmount}
              totalAmount={totalAmount}
              phase={phase}
              clientName={clientInfo.name}
              isInstallment={isInstallment}
              installmentNumber={installmentNumber}
              numPayments={numPayments}
              monthlyAmount={monthlyAmount}
            />
          </Elements>
        )}
      </section>
    </div>
  );
}

/* ── Step 3: Payment Form ─────────────────────────────────── */

function PaymentStep({
  projectName,
  depositAmount,
  totalAmount,
  phase,
  clientName,
  isInstallment,
  installmentNumber,
  numPayments,
  monthlyAmount,
}: {
  projectName: string;
  depositAmount: number;
  totalAmount: number;
  phase: string;
  clientName: string;
  isInstallment: boolean;
  installmentNumber: number;
  numPayments: number;
  monthlyAmount: number;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/pay/success`,
        payment_method_data: {
          billing_details: { name: clientName },
        },
      },
    });

    if (error) {
      setMessage(error.message || "An error occurred");
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)",
          fontWeight: 700,
          letterSpacing: "-1px",
          marginBottom: "0.5rem",
          textAlign: "center",
        }}
      >
        Complete Payment
      </div>
      <p
        style={{
          textAlign: "center",
          color: grayText,
          fontSize: "0.9rem",
          marginBottom: "2rem",
        }}
      >
        Secure payment powered by Stripe
      </p>

      {/* Payment Summary */}
      <div
        style={{
          padding: "1.5rem",
          background: grayDark,
          borderRadius: 12,
          border: `1px solid ${grayMid}`,
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: accent,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            Payment Summary
          </div>
          {isInstallment && (
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: black,
                background: accent,
                padding: "3px 10px",
                borderRadius: 100,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {installmentNumber} of {numPayments}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ color: grayText, fontSize: "0.9rem" }}>
            Project
          </span>
          <span
            style={{ color: white, fontSize: "0.9rem", fontWeight: 600 }}
          >
            {projectName}
          </span>
        </div>
        {(totalAmount !== depositAmount || isInstallment) && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <span style={{ color: grayText, fontSize: "0.9rem" }}>
              Total Project
            </span>
            <span style={{ color: grayText, fontSize: "0.9rem" }}>
              ${totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
        )}
        {isInstallment && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ color: grayText, fontSize: "0.9rem" }}>
                Monthly Payment
              </span>
              <span style={{ color: grayText, fontSize: "0.9rem" }}>
                ${monthlyAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}/mo &times; {numPayments}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ color: grayText, fontSize: "0.9rem" }}>
                Remaining After This
              </span>
              <span style={{ color: grayText, fontSize: "0.9rem" }}>
                {numPayments - installmentNumber > 0
                  ? `$${((numPayments - installmentNumber) * monthlyAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })} (${numPayments - installmentNumber} payment${numPayments - installmentNumber === 1 ? "" : "s"})`
                  : "Paid in full"}
              </span>
            </div>
          </>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "0.75rem",
            borderTop: `1px solid ${grayMid}`,
          }}
        >
          <span style={{ color: white, fontSize: "1rem", fontWeight: 700 }}>
            {isInstallment
              ? `Installment ${installmentNumber}`
              : phase === "2"
                ? "Final Payment"
                : totalAmount !== depositAmount
                  ? "Phase 1 Deposit (50%)"
                  : "Amount Due"}
          </span>
          <span
            style={{
              color: accent,
              fontSize: "1.4rem",
              fontWeight: 800,
              fontFamily: "'Space Mono', monospace",
            }}
          >
            ${depositAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Autopay Notice */}
      {isInstallment && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
            padding: "1rem 1.25rem",
            background: "rgba(200,255,0,0.05)",
            border: "1px solid rgba(200,255,0,0.15)",
            borderRadius: 10,
            marginBottom: "1.5rem",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <p style={{ color: grayText, fontSize: "0.82rem", lineHeight: 1.5, margin: 0 }}>
            Your card will be saved and charged <strong style={{ color: white }}>${monthlyAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong> automatically each month until all {numPayments} payments are complete. No action needed after this.
          </p>
        </div>
      )}

      {/* Card Form */}
      <form onSubmit={handleSubmit}>
        <div
          style={{
            padding: "2rem",
            background: grayDark,
            borderRadius: 12,
            border: `1px solid ${grayMid}`,
            marginBottom: "1.5rem",
          }}
        >
          <PaymentElement />
        </div>

        <button
          type="submit"
          disabled={isProcessing || !stripe || !elements}
          style={{
            width: "100%",
            padding: "1.1rem",
            background: isProcessing ? grayMid : accent,
            color: black,
            borderRadius: 8,
            fontWeight: 700,
            fontSize: "1.05rem",
            letterSpacing: "0.5px",
            border: "none",
            cursor: isProcessing ? "not-allowed" : "pointer",
            transition: "all 0.3s",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          {isProcessing
            ? "Processing..."
            : `Pay $${depositAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
        </button>

        {message && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "rgba(255,68,68,0.1)",
              border: "1px solid rgba(255,68,68,0.2)",
              borderRadius: 8,
              color: "#ff4444",
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          >
            {message}
          </div>
        )}
      </form>

      <p
        style={{
          textAlign: "center",
          fontSize: "0.75rem",
          color: grayText,
          marginTop: "1.5rem",
        }}
      >
        Payments are securely processed by Stripe. Your card details never
        touch our servers.
      </p>
    </div>
  );
}

/* ── Shared Input Component ───────────────────────────────── */

function InputField({
  label,
  type,
  required,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: string;
  required: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: white,
          marginBottom: "0.5rem",
        }}
      >
        {label}
        {required && (
          <span style={{ color: accent, marginLeft: 4 }}>*</span>
        )}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          background: grayMid,
          border: `1px solid ${value ? "rgba(200,255,0,0.2)" : grayMid}`,
          borderRadius: 8,
          color: white,
          fontSize: "0.95rem",
          boxSizing: "border-box",
          outline: "none",
          transition: "border-color 0.3s",
          fontFamily: "'Outfit', sans-serif",
        }}
      />
    </div>
  );
}
