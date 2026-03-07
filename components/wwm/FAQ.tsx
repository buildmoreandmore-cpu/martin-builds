"use client";

import { useState } from "react";
import ScrollReveal from "../ScrollReveal";

const faqs = [
  {
    q: "What does the process actually look like?",
    a: "We start with a 30-minute discovery call — you tell me the problem, I tell you exactly what I'd build and what it costs. If we're a fit, I send a scope document, you approve, and I start building. You get daily progress updates and a live deployment within 2 weeks.",
  },
  {
    q: "I'm not technical. Will I understand what you're building?",
    a: "That's the whole point. I bridge the gap between what AI can do and what your business needs. No jargon, no black boxes. You'll see it come together in plain English with daily screen recordings.",
  },
  {
    q: "What if I need changes after it's done?",
    a: "Every project includes 2 rounds of revisions. After that, most clients move to a retainer so I can keep building and improving. But you're never locked in — if it's done, it's done.",
  },
  {
    q: "Do you work with businesses outside of Atlanta?",
    a: "Yes. Most of my clients are remote. I build, deploy, and hand off everything digitally. If you're local, we can meet in person — but it's not required.",
  },
  {
    q: "What makes you different from an agency?",
    a: "Agencies give you a team of 12, a 40-page proposal, and a 6-month timeline. I give you one builder, a clear scope, and a live product in 2 weeks. No layers. No overhead. Just the work.",
  },
  {
    q: "Can you build mobile apps too?",
    a: "Yes. I've shipped apps to both the App Store and Google Play. LockIn Focus Timer is one example. I build with React Native/Expo so you get both iOS and Android from a single codebase.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ padding: "6rem 3rem", background: "#0a0a0a", borderTop: "1px solid rgba(245,245,240,0.06)" }}>
      <ScrollReveal>
        <p style={sectionTag}>Questions</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={sectionTitle}>You might be wondering...</h2>
      </ScrollReveal>

      <div style={{ maxWidth: "760px", marginTop: "4rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {faqs.map((faq, i) => (
          <ScrollReveal key={i}>
            <div
              style={{
                background: "#1a1a1a",
                border: `1px solid ${open === i ? "rgba(200,255,0,0.2)" : "rgba(245,245,240,0.06)"}`,
                borderRadius: "12px",
                overflow: "hidden",
                transition: "border-color 0.3s",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "transparent",
                  border: "none",
                  padding: "1.5rem 2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: "1rem",
                }}
              >
                <span style={{ fontSize: "1rem", fontWeight: 600, color: "#f5f5f0", fontFamily: "'Outfit', sans-serif", lineHeight: 1.4 }}>
                  {faq.q}
                </span>
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "1px solid rgba(200,255,0,0.25)",
                    background: "rgba(200,255,0,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "transform 0.3s",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1v8M1 5h8" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>

              <div
                style={{
                  maxHeight: open === i ? "400px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <p
                  style={{
                    padding: "0 2rem 1.75rem",
                    fontSize: "0.95rem",
                    color: "#888",
                    lineHeight: 1.75,
                    fontWeight: 300,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

const sectionTag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
const sectionTitle: React.CSSProperties = { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "700px" };
