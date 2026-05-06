"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Why does this start at $5,000?",
    a: "Builds start at $5,000 and scale up from there based on scope and complexity. There's no agency overhead — one operator, fixed scope, modern AI-assisted tooling — so you're paying for the work, not for layers. Final price is set before we start, no surprise invoices.",
  },
  {
    q: "What if we go past 14 days?",
    a: "14 days is the standard, not a hard rule. Most builds hit it. Larger or more complex platforms may take 2–3 weeks, and you'll know the timeline before we start. Scope is locked, so there are no surprise invoices.",
  },
  {
    q: "Do I really own the code?",
    a: "Yes. All the backend code, frontend code, and database schema are delivered to you. No subscription, no licensing fees, no vendor lock-in. If you ever want to take it to another developer or host it yourself, everything is in your hands.",
  },
  {
    q: "What happens after the 14 days?",
    a: "Two options. Most clients add a Utility Agent to their dashboard — an AI that handles day-to-day questions, small fixes, and routine updates 24/7. The other option is keeping me on monthly retainer for new features, iterations, and hands-on support as your business grows. Either way, you're not left on your own.",
  },
  {
    q: "What tools do you build with?",
    a: "Modern, well-documented technology that any developer can maintain. The stack is built to last and easy to hand off if you ever need to.",
  },
  {
    q: "Is this just for tech-savvy founders?",
    a: "No. Most clients are operators in staffing, screening, energy, and services who needed software that didn't exist. You don't need a technical background — that's my job.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)", background: "#0f0f0f", borderTop: "1px solid rgba(200,255,0,0.08)" }}>
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>
        <ScrollReveal>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem", textAlign: "center" }}>
            FAQ
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1.5px", textAlign: "center", marginBottom: "3rem" }}>
            The questions most owners ask <span style={{ color: "#c8ff00" }}>before they decide.</span>
          </h2>
        </ScrollReveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <ScrollReveal key={i}>
                <div
                  style={{
                    background: isOpen ? "#1a1a1a" : "#141414",
                    border: `1px solid ${isOpen ? "rgba(200,255,0,0.25)" : "rgba(245,245,240,0.06)"}`,
                    borderRadius: 12,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      padding: "clamp(1rem, 2.5vw, 1.4rem) clamp(1.25rem, 3vw, 1.75rem)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 16,
                      cursor: "pointer",
                      color: "inherit",
                      fontFamily: "inherit",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                        fontWeight: 600,
                        color: isOpen ? "#f5f5f0" : "#ddd",
                        lineHeight: 1.4,
                        transition: "color 0.3s",
                      }}
                    >
                      {f.q}
                    </span>
                    <span
                      style={{
                        flexShrink: 0,
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: `1px solid ${isOpen ? "#c8ff00" : "rgba(245,245,240,0.15)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={isOpen ? "#c8ff00" : "#888"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transition: "transform 0.3s",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: isOpen ? 400 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div style={{ padding: "0 clamp(1.25rem, 3vw, 1.75rem) clamp(1.25rem, 3vw, 1.5rem)" }}>
                      <p style={{ fontSize: "clamp(0.9rem, 1.7vw, 1rem)", color: "#aaa", lineHeight: 1.7, margin: 0 }}>
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
