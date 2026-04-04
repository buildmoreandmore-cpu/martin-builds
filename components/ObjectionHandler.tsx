"use client";

import ScrollReveal from "./ScrollReveal";

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ChainIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const UnlockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </svg>
);

export default function ObjectionHandler() {
  return (
    <section style={{ padding: "clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,3rem)" }}>
      <ScrollReveal>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p style={tagStyle}>The Real Objection</p>
          <h2 style={titleStyle}>
            You don&apos;t stay because it&apos;s good.
            <br />
            <span style={{ color: "#c8ff00" }}>You stay because it&apos;s familiar.</span>
          </h2>
        </div>
      </ScrollReveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
        className="objection-grid"
      >
        {/* The Comfort Trap */}
        <ScrollReveal>
          <div style={painCardStyle}>
            <div style={iconWrapStyle}><ShieldIcon /></div>
            <h3 style={painTitleStyle}>The Comfort Trap</h3>
            <p style={painTextStyle}>You&apos;ve spent months learning Salesforce. Your team knows where things are. Switching feels risky.</p>
            <p style={{ ...painTextStyle, marginTop: "0.8rem", fontStyle: "italic", fontSize: "0.85rem" }}>But familiar doesn&apos;t mean efficient. It means you&apos;ve memorized the workarounds.</p>
          </div>
        </ScrollReveal>

        {/* The Hidden Cost */}
        <ScrollReveal>
          <div style={painCardStyle}>
            <div style={iconWrapStyle}><ChainIcon /></div>
            <h3 style={painTitleStyle}>The Hidden Cost</h3>
            <p style={painTextStyle}>Every new hire takes weeks to onboard. Dashboards nobody opens. Features you pay for but ignore. Per-seat pricing that scales against you.</p>
            <p style={{ ...painTextStyle, marginTop: "0.8rem", fontStyle: "italic", fontSize: "0.85rem" }}>Familiar is expensive when it&apos;s not built for you.</p>
          </div>
        </ScrollReveal>

        {/* The Switch */}
        <ScrollReveal>
          <div style={solutionCardStyle}>
            <div style={{ ...iconWrapStyle, background: "rgba(200,255,0,0.1)" }}><UnlockIcon /></div>
            <h3 style={{ ...painTitleStyle, color: "#f5f5f0" }}>Custom is familiar on day one.</h3>
            <p style={{ ...painTextStyle, color: "rgba(245,245,240,0.7)" }}>A dashboard built around your workflow has nothing to learn. Six pages instead of sixty. Your data, your metrics, your language.</p>
            <p style={{ ...painTextStyle, color: "rgba(245,245,240,0.5)", marginTop: "0.8rem", fontSize: "0.85rem" }}>Your team opens it because it&apos;s useful — not because they have to. That&apos;s the difference between renting a tool and owning one.</p>
          </div>
        </ScrollReveal>
      </div>

      {/* Cost of inaction */}
      <ScrollReveal>
        <div
          style={{
            maxWidth: "1000px",
            margin: "2.5rem auto 0",
            padding: "1.5rem 2rem",
            background: "rgba(255,68,68,0.03)",
            border: "1px solid rgba(255,68,68,0.08)",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.95rem", color: "#ccc", lineHeight: 1.7, margin: 0 }}>
            Your competitors already stopped renting. They own their tools, their data, their workflow.{" "}
            <span style={{ color: "#c8ff00", fontWeight: 600 }}>Every week you stay comfortable is revenue you&apos;re handing to someone who isn&apos;t.</span>
          </p>
        </div>
      </ScrollReveal>

      <style>{`
        @media (max-width: 768px) {
          .objection-grid {
            grid-template-columns: 1fr !important;
            max-width: 400px !important;
          }
        }
      `}</style>
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

const titleStyle: React.CSSProperties = {
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-2px",
  maxWidth: "700px",
  margin: "0 auto",
};

const painCardStyle: React.CSSProperties = {
  background: "#1a1a1a",
  border: "1px solid rgba(245,245,240,0.06)",
  borderRadius: "16px",
  padding: "2rem",
  height: "100%",
};

const solutionCardStyle: React.CSSProperties = {
  background: "#1a1a1a",
  border: "1px solid rgba(200,255,0,0.15)",
  borderLeft: "3px solid #c8ff00",
  borderRadius: "16px",
  padding: "2rem",
  height: "100%",
};

const iconWrapStyle: React.CSSProperties = {
  width: "48px",
  height: "48px",
  background: "rgba(245,245,240,0.04)",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "1.2rem",
};

const painTitleStyle: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontSize: "1.15rem",
  fontWeight: 700,
  color: "#888",
  marginBottom: "0.6rem",
};

const painTextStyle: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.95rem",
  fontWeight: 300,
  color: "#666",
  lineHeight: 1.7,
};
