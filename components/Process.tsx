"use client";

import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "30 minutes. You tell me the problem. I tell you exactly what I'd build, how long it takes, and what it costs. No fluff.",
  },
  {
    num: "02",
    title: "Blueprint & Scope",
    desc: "I map out the architecture, features, and AI integrations. You approve. We lock scope so nothing creeps.",
  },
  {
    num: "03",
    title: "Build Week",
    desc: "Heads down. Daily progress updates. You see it come to life in real time. No disappearing acts.",
  },
  {
    num: "04",
    title: "Ship & Support",
    desc: "Deployed, tested, and live. I walk your team through everything. Then we talk about what's next.",
  },
];

export default function Process() {
  return (
    <section id="process" style={{ padding: "clamp(3rem,8vw,6rem) clamp(1.25rem,5vw,3rem)", background: "#1a1a1a" }}>
      <ScrollReveal>
        <p style={sectionTag}>How It Works</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={sectionTitle}>
          From &ldquo;I need this&rdquo; to
          <br />
          &ldquo;it&apos;s live&rdquo; in 14 days.
        </h2>
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
