"use client";

import { useState } from "react";
import ScrollReveal from "../ScrollReveal";

const faqs = [
  { q: "What happens after I book?", a: "You'll get a confirmation email with a calendar invite and Zoom link. I'll review the question you submitted so we can skip the small talk and dive straight into your business." },
  { q: "Can I get a refund if it's not helpful?", a: "If you leave the session feeling like you didn't get value, I'll refund you in full. No forms, no questions. I've never had to do this, but the offer stands." },
  { q: "Do I need to prepare anything?", a: "Just fill in the 'biggest AI question' when you book. That's all I need. If you want to go deeper, have your current workflow or tools list handy — but it's not required." },
  { q: "What if I want you to build something after?", a: "Many Power Hour clients end up hiring me for a full build. If that happens, I'll credit your $500 session fee toward any project. The consultation is never wasted money." },
  { q: "Is this virtual or in-person?", a: "Virtual via Zoom. The session is recorded and sent to you after so you can reference it anytime. If you're in the Atlanta area and prefer in-person, we can arrange that too." },
];

export default function PowerHourFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ padding: "6rem 3rem", maxWidth: "800px", margin: "0 auto" }}>
      <ScrollReveal>
        <p style={tag}>Questions</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={{ ...title, marginBottom: "2.5rem" }}>Quick answers.</h2>
      </ScrollReveal>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {faqs.map((faq, i) => (
          <ScrollReveal key={i}>
            <div style={{ borderBottom: "1px solid rgba(245,245,240,0.06)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  color: open === i ? "#c8ff00" : "#f5f5f0",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  textAlign: "left",
                  padding: "1.3rem 0",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  transition: "color 0.2s",
                }}
              >
                {faq.q}
                <span style={{ fontSize: "1.4rem", color: open === i ? "#c8ff00" : "#888", transform: open === i ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s, color 0.2s", flexShrink: 0, lineHeight: 1 }}>+</span>
              </button>
              <div style={{ maxHeight: open === i ? "300px" : "0", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                <p style={{ fontSize: "0.95rem", color: "#888", lineHeight: 1.7, paddingBottom: "1.3rem", fontWeight: 300 }}>{faq.a}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

const tag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
const title: React.CSSProperties = { fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "600px" };
