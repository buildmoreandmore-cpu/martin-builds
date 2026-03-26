"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const accent = "#c8ff00";
const black = "#0a0a0a";
const white = "#f5f5f0";
const grayDark = "#1a1a1a";
const grayMid = "#2a2a2a";
const grayText = "#888";

export default function QuickPayPage() {
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    company_name: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Generate a simple payment/contact link
    const params = new URLSearchParams({
      name: formData.client_name,
      email: formData.client_email,
      phone: formData.client_phone,
      company: formData.company_name,
    });

    const link = `${window.location.origin}/pay?${params.toString()}`;

    setResult(link);
    setLoading(false);
  };

  const copyLink = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      alert("Payment link copied to clipboard!");
    }
  };

  const resetForm = () => {
    setFormData({
      client_name: "",
      client_email: "",
      client_phone: "",
      company_name: "",
    });
    setResult(null);
  };

  return (
    <>
      <Nav />
      <div style={{ paddingTop: "120px", paddingBottom: "4rem" }}>
        <section
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "0 1.5rem",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-1px",
              marginBottom: "0.5rem",
            }}
          >
            Quick Payment Link
          </div>
          <p
            style={{
              fontSize: "1rem",
              color: grayText,
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            Generate a payment link for a client. They'll review the terms and you'll send them an invoice via email.
          </p>

          {!result ? (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  padding: "2rem",
                  background: grayDark,
                  borderRadius: "12px",
                  border: `1px solid ${grayMid}`,
                  marginBottom: "1.5rem",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: white, marginBottom: "0.5rem" }}>
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      placeholder="John Smith"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        background: grayMid,
                        border: `1px solid ${grayMid}`,
                        borderRadius: "8px",
                        color: white,
                        fontSize: "1rem",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: white, marginBottom: "0.5rem" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.client_email}
                      onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                      placeholder="john@company.com"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        background: grayMid,
                        border: `1px solid ${grayMid}`,
                        borderRadius: "8px",
                        color: white,
                        fontSize: "1rem",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: white, marginBottom: "0.5rem" }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.client_phone}
                      onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        background: grayMid,
                        border: `1px solid ${grayMid}`,
                        borderRadius: "8px",
                        color: white,
                        fontSize: "1rem",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: white, marginBottom: "0.5rem" }}>
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      placeholder="Acme Corp"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        background: grayMid,
                        border: `1px solid ${grayMid}`,
                        borderRadius: "8px",
                        color: white,
                        fontSize: "1rem",
                      }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "1rem",
                  background: loading ? grayMid : accent,
                  color: black,
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "0.5px",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.3s",
                }}
              >
                {loading ? "Generating..." : "Generate Payment Link"}
              </button>
            </form>
          ) : (
            <div
              style={{
                padding: "2rem",
                background: grayDark,
                borderRadius: "12px",
                border: `1px solid ${accent}`,
              }}
            >
              <div style={{ fontSize: "1.2rem", fontWeight: 700, color: accent, marginBottom: "1rem" }}>
                ✓ Payment Link Created!
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.85rem", color: grayText, marginBottom: "0.5rem" }}>
                  Client: {formData.client_name} ({formData.company_name})
                </div>
                <div style={{ fontSize: "0.85rem", color: grayText, marginBottom: "1rem" }}>
                  Contact: {formData.client_email} • {formData.client_phone}
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.85rem", color: grayText, marginBottom: "0.5rem" }}>
                  Payment Link:
                </div>
                <div
                  style={{
                    padding: "1rem",
                    background: grayMid,
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    color: white,
                    wordBreak: "break-all",
                    marginBottom: "0.75rem",
                  }}
                >
                  {result}
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    onClick={copyLink}
                    style={{
                      flex: 1,
                      padding: "0.75rem 1rem",
                      background: accent,
                      color: black,
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={resetForm}
                    style={{
                      flex: 1,
                      padding: "0.75rem 1rem",
                      background: grayMid,
                      color: white,
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    Create Another
                  </button>
                </div>
              </div>

              <div
                style={{
                  fontSize: "0.85rem",
                  color: grayText,
                  lineHeight: 1.6,
                  padding: "1rem",
                  background: grayMid,
                  borderRadius: "8px",
                }}
              >
                <strong style={{ color: white }}>Next Steps:</strong>
                <br />
                1. Send this link to {formData.client_name}
                <br />
                2. They'll review the service agreement at /pay
                <br />
                3. You'll create and send a Stripe invoice via email with project details
              </div>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}
