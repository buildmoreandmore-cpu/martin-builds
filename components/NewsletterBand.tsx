"use client";

import { useState } from "react";

export default function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch { /* silent */ }
    setSubmitted(true);
  };

  return (
    <section
      style={{
        background: "#1a1a1a",
        padding: "3.5rem clamp(1.25rem,5vw,3rem)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "3rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ maxWidth: "460px" }}>
          <h3
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#f5f5f0",
              marginBottom: "0.5rem",
            }}
          >
            What I&apos;m building this week.
          </h3>
          <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.6, fontWeight: 300 }}>
            Tools I&apos;m shipping, AI strategies that work, and lessons from building in public. Sent every Friday.
          </p>
        </div>

        <div style={{ minWidth: "0", flex: "1 1 300px" }}>
          {submitted ? (
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "1rem",
                color: "#c8ff00",
                fontWeight: 700,
              }}
            >
              You&apos;re in. See you Friday.
            </p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                style={{
                  flex: "1 1 180px",
                  padding: "0.85rem 1.1rem",
                  background: "#2a2a2a",
                  border: "1px solid rgba(245,245,240,0.08)",
                  borderRadius: "10px",
                  color: "#f5f5f0",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "#c8ff00")}
                onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "rgba(245,245,240,0.08)")}
              />
              <button
                type="submit"
                style={{
                  padding: "0.85rem 1.75rem",
                  background: "#c8ff00",
                  color: "#0a0a0a",
                  border: "none",
                  borderRadius: "100px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(200,255,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
