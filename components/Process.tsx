"use client";

import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    num: "01",
    title: "Audit",
    desc: "We break down your current workflow, tools, and data gaps in a 15-minute call. You'll walk away knowing exactly what's worth automating.",
  },
  {
    num: "02",
    title: "Blueprint",
    desc: "Day 1: You get a clear system design — what we're building and why. Locked scope, locked timeline, locked price. No surprises.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Heads down. Daily updates. You see it come to life in real time. No disappearing acts. No handoffs.",
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Day 14: Fully live, tested, and ready to use. Your team gets a full walkthrough. You own the code from day one.",
  },
];

export default function Process() {
  return (
    <section id="process" style={{ padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)", background: "#1a1a1a" }}>
      <ScrollReveal>
        <p style={sectionTag}>How It Works</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={sectionTitle}>
          Built in 4 steps.
          <br />
          <span style={{ color: "#c8ff00" }}>Deployed in 14 days.</span>
        </h2>
        <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)", color: "#888", marginTop: "1.5rem", maxWidth: "560px", lineHeight: 1.6 }}>
          No confusion. No delays. No handoffs.
        </p>
      </ScrollReveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
          gap: "2rem",
          marginTop: "4rem",
        }}
      >
        {steps.map((s) => (
          <ScrollReveal key={s.num}>
            <div style={{ padding: "2rem 0" }}>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "4rem",
                  fontWeight: 700,
                  color: "rgba(200,255,0,0.1)",
                  lineHeight: 1,
                  marginBottom: "1rem",
                }}
              >
                {s.num}
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.6rem" }}>{s.title}</h3>
              <p style={{ fontSize: "0.95rem", color: "#888", lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Transparency strip — information symmetry */}
      <ScrollReveal>
        <div
          className="transparency-grid"
          style={{
            marginTop: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "rgba(245,245,240,0.06)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {[
            { label: "What you get", value: "Scope doc, daily updates, deployed product, full walkthrough, source code" },
            { label: "What it costs", value: "Exact quote after discovery call — no hidden fees, no surprises" },
            { label: "How long", value: "2 weeks for sprints. 2-3 weeks for platforms. Locked timeline before we start" },
            { label: "What success looks like", value: "Your team uses it daily. It saves real hours — and closes more deals. You come back for Phase 2" },
          ].map((item) => (
            <div key={item.label} style={{ background: "#1a1a1a", padding: "1.5rem" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#c8ff00", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.5rem" }}>{item.label}</div>
              <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.6, margin: 0 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <style>{`
        @media (max-width: 768px) {
          .transparency-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .transparency-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <ScrollReveal>
        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <a
            href="/discovery-call"
            style={{ color: "#c8ff00", fontWeight: 600, fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", textDecoration: "none", transition: "all 0.3s" }}
            onMouseEnter={e => { const arrow = e.currentTarget.querySelector("span"); if (arrow) (arrow as HTMLSpanElement).style.transform = "translateX(3px)"; }}
            onMouseLeave={e => { const arrow = e.currentTarget.querySelector("span"); if (arrow) (arrow as HTMLSpanElement).style.transform = "translateX(0)"; }}
          >
            Ready to start? Book a free discovery call <span style={{ transition: "transform 0.3s", display: "inline-block" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}

const sectionTag: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.75rem",
  color: "#c8ff00",
  letterSpacing: "3px",
  textTransform: "uppercase",
  marginBottom: "1.5rem",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-2px",
  maxWidth: "700px",
};
