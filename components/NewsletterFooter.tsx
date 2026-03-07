"use client";

import { useState } from "react";

export default function NewsletterFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
  };

  return (
    <section
      style={{
        background: "#1a1a1a",
        borderTop: "1px solid rgba(245,245,240,0.06)",
        borderBottom: "1px solid rgba(245,245,240,0.06)",
        padding: "4rem 3rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "-10%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
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
        {/* Left */}
        <div style={{ maxWidth: "460px" }}>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.7rem",
              color: "#c8ff00",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Newsletter
          </p>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: "0.5rem" }}>
            What I&apos;m building this week.
          </h3>
          <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.6, fontWeight: 300 }}>
            Tools I&apos;m shipping, AI strategies that work, and lessons from building in public. Sent every Friday.
          </p>
        </div>

        {/* Right */}
        <div style={{ minWidth: "300px", flex: "0 1 420px" }}>
          {submitted ? (
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "1rem",
                color: "#c8ff00",
                fontWeight: 700,
                animation: "fadeIn 0.4s ease",
              }}
            >
              You&apos;re in. See you Friday.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                style={{
                  flex: "1 1 220px",
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
