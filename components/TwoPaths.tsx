"use client";

import ScrollReveal from "./ScrollReveal";

export default function TwoPaths() {
  return (
    <section style={{ padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)", background: "#0a0a0a" }}>
      <ScrollReveal>
        <p style={sectionTag}>Who I Work With</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={sectionTitle}>
          Two ways I can help — depending
          <br />
          on where your business is.
        </h2>
      </ScrollReveal>

      <div className="two-paths-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "3rem", maxWidth: "1000px" }}>
        {/* Card 1: Growing Businesses (Primary) */}
        <ScrollReveal>
          <div style={primaryCardStyle}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#c8ff00", borderRadius: "16px 16px 0 0" }} />
            <div style={pillPrimary}>Revenue $1M+</div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.8rem", letterSpacing: "-0.5px" }}>
              You need AI built into your operations.
            </h3>
            <p style={descStyle}>
              Custom platforms, client portals, internal dashboards, and AI automation systems. I build the tools your team uses every day — scoped, built, and deployed in 2-3 weeks.
            </p>
            <ul style={listStyle}>
              <li style={listItem}>AI-powered client portals</li>
              <li style={listItem}>Internal operations dashboards</li>
              <li style={listItem}>Automated proposal &amp; document systems</li>
              <li style={listItem}>Custom CRM and workflow tools</li>
              <li style={listItem}>AI agents integrated into your stack</li>
            </ul>
            <div style={priceStyle}>Builds from $5,000 · Monthly retainers available</div>
            <a href="/discovery-call" style={primaryBtnStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
            >
              Book a Discovery Call
            </a>
          </div>
        </ScrollReveal>

        {/* Card 2: Small Businesses (Secondary) */}
        <ScrollReveal>
          <div style={secondaryCardStyle}>
            <div style={pillSecondary}>Getting Started</div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.8rem", letterSpacing: "-0.5px" }}>
              You need to understand what AI can do for you.
            </h3>
            <p style={descStyle}>
              Not ready for a full build? Start with a 1-on-1 strategy session where I show you exactly which AI tools fit your business — or let me set up an AI agent that works for you 24/7.
            </p>
            <ul style={listStyle}>
              <li style={listItem}>AI Power Hour — 1-on-1 strategy session ($500)</li>
              <li style={listItem}>AI Chat Agent for your website ($300-$500/mo)</li>
              <li style={listItem}>Personalized AI tool recommendations</li>
              <li style={listItem}>Recorded session + 30-day follow-up</li>
            </ul>
            <a href="/power-hour" style={secondaryBtnStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#c8ff00"; (e.currentTarget as HTMLAnchorElement).style.color = "#c8ff00"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,245,240,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0"; }}
            >
              Explore Options
            </a>
            <p style={{ fontSize: "0.85rem", color: "#888", marginTop: "1rem", textAlign: "center", lineHeight: 1.6 }}>
              Not sure which path?{" "}
              <a href="/discovery-call" style={{ color: "#c8ff00", textDecoration: "none" }}>Book a free discovery call</a>
              {" "}and I&apos;ll help you figure it out.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .two-paths-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

const primaryCardStyle: React.CSSProperties = {
  background: "#1a1a1a",
  border: "1px solid rgba(200,255,0,0.15)",
  borderRadius: "16px",
  padding: "clamp(1.5rem, 4vw, 2.5rem)",
  position: "relative",
  overflow: "hidden",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const secondaryCardStyle: React.CSSProperties = {
  background: "#1a1a1a",
  border: "1px solid rgba(245,245,240,0.06)",
  borderRadius: "16px",
  padding: "clamp(1.5rem, 4vw, 2.5rem)",
  position: "relative",
  overflow: "hidden",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const pillPrimary: React.CSSProperties = {
  display: "inline-block",
  background: "#c8ff00",
  color: "#0a0a0a",
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.65rem",
  fontWeight: 700,
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  padding: "0.35rem 0.9rem",
  borderRadius: "100px",
  marginBottom: "1.2rem",
  alignSelf: "flex-start",
};

const pillSecondary: React.CSSProperties = {
  display: "inline-block",
  background: "#2a2a2a",
  color: "#888",
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.65rem",
  fontWeight: 700,
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  padding: "0.35rem 0.9rem",
  borderRadius: "100px",
  marginBottom: "1.2rem",
  alignSelf: "flex-start",
};

const descStyle: React.CSSProperties = {
  fontSize: "0.95rem",
  color: "#888",
  lineHeight: 1.7,
  marginBottom: "1.2rem",
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: "0 0 1.5rem 0",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  flex: 1,
};

const listItem: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "rgba(245,245,240,0.8)",
  paddingLeft: "1.2rem",
  position: "relative",
};

const priceStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.8rem",
  color: "#c8ff00",
  marginBottom: "1.5rem",
  paddingTop: "1rem",
  borderTop: "1px solid rgba(245,245,240,0.06)",
};

const primaryBtnStyle: React.CSSProperties = {
  background: "#c8ff00",
  color: "#0a0a0a",
  padding: "0.9rem 2rem",
  borderRadius: "100px",
  fontWeight: 700,
  fontSize: "0.95rem",
  textAlign: "center",
  display: "block",
  textDecoration: "none",
  transition: "all 0.3s",
};

const secondaryBtnStyle: React.CSSProperties = {
  background: "transparent",
  color: "#f5f5f0",
  padding: "0.9rem 2rem",
  borderRadius: "100px",
  fontWeight: 600,
  fontSize: "0.95rem",
  border: "1px solid rgba(245,245,240,0.2)",
  textAlign: "center",
  display: "block",
  textDecoration: "none",
  transition: "all 0.3s",
};

const sectionTag: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.75rem",
  color: "#c8ff00",
  letterSpacing: "3px",
  textTransform: "uppercase",
  marginBottom: "1.5rem",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "clamp(1.8rem, 4vw, 3rem)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-2px",
  maxWidth: "700px",
};
