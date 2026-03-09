"use client";

import ScrollReveal from "../ScrollReveal";

export default function AgentGuarantee() {
  return (
    <section style={{ padding: "4rem 3rem", background: "#0a0a0a" }}>
      <ScrollReveal>
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
          <div style={{
            display: "inline-block",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "2px",
            color: "#c8ff00",
            background: "rgba(200,255,0,0.08)",
            padding: "0.4rem 1.2rem",
            borderRadius: "100px",
            border: "1px solid rgba(200,255,0,0.15)",
            marginBottom: "1.5rem",
          }}>
            PERFORMANCE GUARANTEE
          </div>
          <h3 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1.8rem",
            fontWeight: 800,
            color: "#f5f5f0",
            letterSpacing: "-1px",
            marginBottom: "1rem",
            lineHeight: 1.2,
          }}>
            10 leads in 30 days. Or your first month is free.
          </h3>
          <p style={{
            fontSize: "1rem",
            color: "#888",
            lineHeight: 1.7,
            fontWeight: 300,
          }}>
            If your AI agent doesn&apos;t capture at least 10 qualified leads in the first 30 days, I&apos;ll refund your entire first month. No questions. No fine print. I&apos;m that confident in what this agent will do for your business.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
