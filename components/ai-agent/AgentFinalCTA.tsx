"use client";

import ScrollReveal from "../ScrollReveal";

export default function AgentFinalCTA() {
  return (
    <section id="cta" style={{ padding: "6rem 3rem", background: "linear-gradient(135deg, rgba(200,255,0,0.03) 0%, rgba(200,255,0,0.01) 100%)" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <ScrollReveal>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Your Business Runs 24/7 — Your Team Doesn't
          </p>
        </ScrollReveal>
        
        <ScrollReveal>
          <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-2px", marginBottom: "1.5rem" }}>
            Every task your AI agent handles is{" "}
            <span style={{ color: "#c8ff00" }}>one you never have to think about again</span>.
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <p style={{ fontSize: "1.2rem", color: "#888", marginBottom: "3rem", maxWidth: "600px", margin: "0 auto 3rem", lineHeight: 1.6 }}>
            Start with one workflow. Scale to everything. Your first agent is live in 48 hours.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
            <a
              href="/contact"
              style={{
                display: "inline-block",
                padding: "1.25rem 3rem",
                background: "#c8ff00",
                color: "#0a0a0a",
                borderRadius: "100px",
                fontWeight: 700,
                fontSize: "1.1rem",
                textDecoration: "none",
                transition: "all 0.3s",
                boxShadow: "0 4px 20px rgba(200,255,0,0.15)"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(200,255,0,0.15)";
              }}
            >
              Get Your AI Employee — From $300/mo
            </a>
            <a
              href="/contact"
              style={{
                display: "inline-block",
                padding: "1.25rem 3rem",
                background: "transparent",
                color: "#f5f5f0",
                borderRadius: "100px",
                fontWeight: 600,
                fontSize: "1.1rem",
                textDecoration: "none",
                border: "2px solid rgba(245,245,240,0.2)",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#c8ff00";
                (e.currentTarget as HTMLAnchorElement).style.color = "#c8ff00";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(200,255,0,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,245,240,0.2)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0";
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              Questions? Let's Talk
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", fontSize: "0.9rem", color: "#666" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
              <span>48-hour setup</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
              <span>Cancel anytime</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
              <span>No setup fees</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}