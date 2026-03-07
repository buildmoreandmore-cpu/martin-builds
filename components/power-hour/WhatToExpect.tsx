"use client";

import ScrollReveal from "../ScrollReveal";

const cards = [
  { num: "01", title: "Your business, dissected", body: "We start with your specific workflows, pain points, and goals. No generic advice — everything is mapped to your situation." },
  { num: "02", title: "Live tool demos", body: "I'll show you the exact AI tools that fit your business — and actually walk through them in real time so you see how they work." },
  { num: "03", title: "Your AI game plan", body: "You leave with a clear action plan: what to implement first, what to ignore, and what to build when you're ready to go deeper." },
];

export default function WhatToExpect() {
  return (
    <section style={{ padding: "6rem 3rem", maxWidth: "1200px", margin: "0 auto" }}>
      <ScrollReveal>
        <p style={tag}>What to Expect</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={title}>Not a lecture. A working session.</h2>
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}>
        {cards.map((c) => (
          <ScrollReveal key={c.num}>
            <div
              style={{ background: "#1a1a1a", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "16px", padding: "2rem", transition: "all 0.4s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,255,0,0.15)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,245,240,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
            >
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "2.5rem", fontWeight: 700, color: "rgba(200,255,0,0.12)", lineHeight: 1, marginBottom: "0.8rem" }}>{c.num}</div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>{c.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.6 }}>{c.body}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

const tag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
const title: React.CSSProperties = { fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "600px" };
