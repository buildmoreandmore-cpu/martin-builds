"use client";

import ScrollReveal from "../ScrollReveal";

const blocks = [
  {
    subhead: "Your money is protected.",
    body: "Every build starts with a 50% deposit. If you're not happy with the direction after the first week, I refund that deposit in full — no questions, no awkwardness, no forms to fill out. I've never had to do this. But the offer stands because I know what I deliver.",
  },
  {
    subhead: "Results, not promises.",
    body: "On the AI Agent, if your agent doesn't capture at least 10 leads in the first 30 days, your first month is free. On the Power Hour, if you don't leave with a clear, actionable game plan, you don't pay. I don't get paid for showing up — I get paid for delivering.",
  },
  {
    subhead: "No contracts. No traps.",
    body: "Retainers are month-to-month. AI Agents are month-to-month. Cancel anytime with one email. If I'm not delivering value every single month, you shouldn't be paying me. It's that simple.",
  },
];

export default function TheGuarantee() {
  return (
    <section
      style={{
        padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)",
        background: "radial-gradient(circle at 50% 50%, rgba(200,255,0,0.04) 0%, transparent 60%), #0a0a0a",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <ScrollReveal>
          <p style={tagStyle}>THE GUARANTEE</p>
        </ScrollReveal>
        <ScrollReveal>
          <h2 style={headlineStyle}>I assume the risk. Not you.</h2>
        </ScrollReveal>

        <div
          style={{
            marginTop: "3rem",
            borderLeft: "4px solid #c8ff00",
            borderRadius: "2px",
            paddingLeft: "2.5rem",
          }}
        >
          {blocks.map((block, i) => (
            <ScrollReveal key={i}>
              <div style={{ marginBottom: i < blocks.length - 1 ? "2rem" : 0 }}>
                <h3 style={subheadStyle}>{block.subhead}</h3>
                <p style={bodyStyle}>{block.body}</p>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal>
            <p style={anchorLine}>
              Agencies charge{" "}
              <span style={{ color: "#ff4444", fontWeight: 700 }}>$50,000–$100,000</span>{" "}
              for what I build at{" "}
              <span style={{ color: "#c8ff00", fontWeight: 700 }}>$5,000–$12,000</span>.
              And they take 6 months. I take 14 days.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
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

const headlineStyle: React.CSSProperties = {
  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
  fontWeight: 800,
  color: "#f5f5f0",
  marginBottom: "2rem",
  lineHeight: 1.1,
  letterSpacing: "-1px",
};

const subheadStyle: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontSize: "1.15rem",
  fontWeight: 700,
  color: "#f5f5f0",
  marginBottom: "0.6rem",
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.95rem",
  fontWeight: 300,
  color: "#888",
  lineHeight: 1.8,
};

const anchorLine: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontSize: "1.05rem",
  fontWeight: 400,
  color: "#f5f5f0",
  marginTop: "2.5rem",
  paddingTop: "2rem",
  borderTop: "1px solid rgba(245,245,240,0.06)",
  lineHeight: 1.7,
};
