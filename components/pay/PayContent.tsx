"use client";

import { useState } from "react";

const accent = "#c8ff00";
const black = "#0a0a0a";
const white = "#f5f5f0";
const grayDark = "#1a1a1a";
const grayMid = "#2a2a2a";
const grayText = "#888";

interface PendingInvoice {
  id: string;
  project_name: string;
  description: string;
  amount: number;
  payment_type: string;
  pay_url: string | null;
}

export default function PayContent() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState<PendingInvoice[] | null>(null);
  const [error, setError] = useState("");

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");
    setInvoices(null);

    try {
      const res = await fetch("/api/pay/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to look up payments");
      } else {
        setInvoices(data.invoices || []);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: "120px", paddingBottom: "4rem" }}>
      <section
        style={{
          maxWidth: 600,
          margin: "0 auto",
          padding: "0 1.5rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            fontWeight: 700,
            letterSpacing: "-1px",
            marginBottom: "0.75rem",
          }}
        >
          martin<span style={{ color: accent }}>.builds</span>
        </div>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.85rem",
            color: grayText,
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: "3rem",
          }}
        >
          Payment Portal
        </p>

        {/* Email Lookup */}
        <div
          style={{
            padding: "2.5rem 2rem",
            background: grayDark,
            borderRadius: 16,
            border: `1px solid ${grayMid}`,
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: grayMid,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              fontSize: "1.3rem",
              color: accent,
              fontWeight: 700,
              fontFamily: "'Space Mono', monospace",
            }}
          >
            $
          </div>

          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: white,
              marginBottom: "0.5rem",
            }}
          >
            Find Your Invoice
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: grayText,
              lineHeight: 1.6,
              marginBottom: "1.75rem",
            }}
          >
            Enter the email address associated with your project to view and
            pay your invoice.
          </p>

          <form
            onSubmit={handleLookup}
            style={{
              display: "flex",
              gap: "0.75rem",
              flexDirection: "column",
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              style={{
                width: "100%",
                padding: "0.85rem 1rem",
                background: grayMid,
                border: `1px solid ${email ? "rgba(200,255,0,0.2)" : grayMid}`,
                borderRadius: 10,
                color: white,
                fontSize: "1rem",
                boxSizing: "border-box",
                outline: "none",
                textAlign: "center",
                fontFamily: "'Outfit', sans-serif",
                transition: "border-color 0.3s",
              }}
            />
            <button
              type="submit"
              disabled={loading || !email.trim()}
              style={{
                width: "100%",
                padding: "0.85rem",
                background:
                  loading || !email.trim() ? grayMid : accent,
                color: loading || !email.trim() ? grayText : black,
                borderRadius: 10,
                fontWeight: 700,
                fontSize: "0.95rem",
                border: "none",
                cursor:
                  loading || !email.trim() ? "not-allowed" : "pointer",
                fontFamily: "'Outfit', sans-serif",
                transition: "all 0.3s",
              }}
            >
              {loading ? "Looking up..." : "Look Up My Invoice"}
            </button>
          </form>

          {error && (
            <p
              style={{
                color: "#ff4444",
                fontSize: "0.85rem",
                marginTop: "1rem",
              }}
            >
              {error}
            </p>
          )}
        </div>

        {/* Results */}
        {invoices !== null && (
          <div
            style={{
              padding: "2rem",
              background: grayDark,
              borderRadius: 16,
              border: `1px solid ${grayMid}`,
              marginBottom: "1.5rem",
              textAlign: "left",
            }}
          >
            {invoices.length === 0 ? (
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    color: grayText,
                    fontSize: "0.95rem",
                    marginBottom: "1rem",
                  }}
                >
                  No pending invoices found for{" "}
                  <strong style={{ color: white }}>{email}</strong>
                </p>
                <p
                  style={{
                    color: grayText,
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                  }}
                >
                  If you have a payment link, click it directly from your
                  email. Or reach out to us below.
                </p>
              </div>
            ) : (
              <>
                <div
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: accent,
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    fontFamily: "'Space Mono', monospace",
                    marginBottom: "1rem",
                  }}
                >
                  Pending Invoices ({invoices.length})
                </div>

                {invoices.map((inv) => (
                  <div
                    key={inv.id}
                    style={{
                      padding: "1.25rem",
                      background: grayMid,
                      borderRadius: 10,
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            color: white,
                            fontSize: "1rem",
                          }}
                        >
                          {inv.project_name}
                        </div>
                        {inv.description && (
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: grayText,
                              marginTop: "0.25rem",
                            }}
                          >
                            {inv.description}
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontWeight: 800,
                          fontSize: "1.2rem",
                          color: accent,
                          whiteSpace: "nowrap",
                          marginLeft: "1rem",
                        }}
                      >
                        $
                        {inv.amount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          padding: "0.2rem 0.6rem",
                          borderRadius: 100,
                          background: "rgba(200,255,0,0.1)",
                          color: accent,
                        }}
                      >
                        {inv.payment_type === "deposit"
                          ? "Deposit (50%)"
                          : inv.payment_type === "final"
                            ? "Final Balance"
                            : "Full Payment"}
                      </span>

                      {inv.pay_url ? (
                        <a
                          href={inv.pay_url}
                          style={{
                            display: "inline-block",
                            padding: "0.5rem 1.5rem",
                            background: accent,
                            color: black,
                            borderRadius: 100,
                            fontWeight: 700,
                            fontSize: "0.8rem",
                            textDecoration: "none",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Pay Now
                        </a>
                      ) : (
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: grayText,
                          }}
                        >
                          Contact for payment link
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* Contact CTA */}
        <div
          style={{
            padding: "2rem",
            background: grayDark,
            borderRadius: 16,
            border: `1px solid ${grayMid}`,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.95rem",
              color: grayText,
              marginBottom: "1rem",
              lineHeight: 1.6,
            }}
          >
            Have a payment link? Click it directly from your email.
            <br />
            Need help? Get in touch.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
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
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Get in Touch
            </a>
            <a
              href="/terms"
              style={{
                fontSize: "0.82rem",
                color: grayText,
                textDecoration: "underline",
              }}
            >
              View Service Agreement
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
