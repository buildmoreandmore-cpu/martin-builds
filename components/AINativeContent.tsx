"use client";

import ScrollReveal from "./ScrollReveal";

const comparisons = [
  {
    category: "Chatbot",
    layered: "Widget pasted on your homepage. Generic responses. Customers ignore it after day one.",
    native: "AI trained on your actual services, pricing, and intake flow. Qualifies leads, books calls, answers real questions — 24/7.",
  },
  {
    category: "Client Intake",
    layered: "PDF form emailed back and forth. Someone on your team re-types it into a spreadsheet.",
    native: "Smart form that adapts questions based on answers, auto-fills records, triggers workflows, and sends branded confirmations — no human in the loop.",
  },
  {
    category: "Proposals",
    layered: "Template doc with your logo. Copy-paste pricing. Takes 2 hours per proposal.",
    native: "AI generates custom proposals from intake data in under 60 seconds. Formatted, branded, ready to send with e-signature.",
  },
  {
    category: "Operations",
    layered: "Dashboard that shows data you already have. Looks nice, changes nothing.",
    native: "System that reads incoming data, flags anomalies, routes tasks, and alerts your team before problems become fires.",
  },
  {
    category: "Follow-ups",
    layered: "Mailchimp drip campaign. Same email to everyone. 18% open rate.",
    native: "Context-aware follow-ups triggered by client behavior — what they viewed, what they submitted, where they dropped off. Every message feels personal because it is.",
  },
  {
    category: "Reporting",
    layered: "Weekly PDF export someone skims on Monday. Tells you what already happened.",
    native: "Real-time intelligence layer that tells you what's about to happen — which leads are going cold, which deals are stalling, where your pipeline leaks.",
  },
];

export default function AINativeContent() {
  return (
    <main style={{ paddingTop: "6rem" }}>
      {/* Hero */}
      <section style={{ padding: "clamp(4rem,8vw,6rem) clamp(1.25rem,5vw,3rem)", maxWidth: "900px", margin: "0 auto" }}>
        <ScrollReveal>
          <p style={tagStyle}>The Difference</p>
        </ScrollReveal>
        <ScrollReveal>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: "1.5rem" }}>
            AI-layered is a feature.
            <br />
            <span style={{ color: "#c8ff00" }}>AI-native is a transformation.</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal>
          <p style={{ fontSize: "1.15rem", fontWeight: 300, color: "#888", lineHeight: 1.8, maxWidth: "700px" }}>
            Most studios bolt a chatbot onto your homepage and call it AI. That&apos;s surface-level — it looks modern but changes nothing about how your business actually runs. AI-native means intelligence is built into every layer: your operations, your workflows, your client experience. It&apos;s the difference between a coat of paint and a new foundation.
          </p>
        </ScrollReveal>
      </section>

      {/* Comparison grid */}
      <section style={{ padding: "0 clamp(1.25rem,5vw,3rem) clamp(5rem,8vw,7rem)", maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header row */}
        <ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: "16px 16px 0 0", overflow: "hidden", border: "1px solid rgba(245,245,240,0.06)", borderBottom: "none" }} className="comparison-grid">
            <div style={{ background: "rgba(255,68,68,0.06)", padding: "1.2rem 1.5rem" }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#ff4444", letterSpacing: "2px", textTransform: "uppercase", margin: 0, fontWeight: 700 }}>AI-Layered</p>
              <p style={{ fontSize: "0.8rem", color: "#666", margin: "0.3rem 0 0" }}>What most studios deliver</p>
            </div>
            <div style={{ background: "rgba(200,255,0,0.06)", padding: "1.2rem 1.5rem", borderLeft: "1px solid rgba(245,245,240,0.06)" }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#c8ff00", letterSpacing: "2px", textTransform: "uppercase", margin: 0, fontWeight: 700 }}>AI-Native</p>
              <p style={{ fontSize: "0.8rem", color: "#888", margin: "0.3rem 0 0" }}>What martin.builds delivers</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Comparison rows */}
        {comparisons.map((c, i) => (
          <ScrollReveal key={c.category}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                borderLeft: "1px solid rgba(245,245,240,0.06)",
                borderRight: "1px solid rgba(245,245,240,0.06)",
                borderBottom: "1px solid rgba(245,245,240,0.06)",
                borderRadius: i === comparisons.length - 1 ? "0 0 16px 16px" : undefined,
                overflow: "hidden",
              }}
              className="comparison-grid"
            >
              <div style={{ background: "#111", padding: "1.5rem" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#555", letterSpacing: "2px", textTransform: "uppercase" }}>{c.category}</span>
                <p style={{ fontSize: "0.9rem", color: "#666", lineHeight: 1.7, marginTop: "0.5rem", marginBottom: 0 }}>{c.layered}</p>
              </div>
              <div style={{ background: "#141414", padding: "1.5rem", borderLeft: "1px solid rgba(245,245,240,0.06)" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#c8ff00", letterSpacing: "2px", textTransform: "uppercase" }}>{c.category}</span>
                <p style={{ fontSize: "0.9rem", color: "#ccc", lineHeight: 1.7, marginTop: "0.5rem", marginBottom: 0 }}>{c.native}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* Bottom line */}
      <section style={{ padding: "clamp(4rem,8vw,6rem) clamp(1.25rem,5vw,3rem)", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <ScrollReveal>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-1px", marginBottom: "1.5rem" }}>
            Your competitors are adding chatbots.
            <br />
            <span style={{ color: "#c8ff00" }}>You should be rebuilding the engine.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal>
          <p style={{ fontSize: "1rem", fontWeight: 300, color: "#888", lineHeight: 1.8, maxWidth: "550px", margin: "0 auto 2rem" }}>
            AI-native isn&apos;t more expensive. It&apos;s not slower. It just requires a builder who understands both the technology and the business problem. That&apos;s the gap I fill.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <a
            href="/discovery-call"
            style={{
              display: "inline-block",
              background: "#c8ff00",
              color: "#0a0a0a",
              padding: "1rem 2.5rem",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.5px",
              transition: "all 0.3s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Book a Free Discovery Call
          </a>
          <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#666" }}>
            Or <a href="/scan" style={{ color: "#c8ff00", textDecoration: "none", fontWeight: 600 }}>run a free site scan</a> to see where you&apos;re leaking leads right now.
          </p>
        </ScrollReveal>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .comparison-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

const tagStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.75rem",
  color: "#c8ff00",
  letterSpacing: "3px",
  textTransform: "uppercase",
  marginBottom: "1.5rem",
};
