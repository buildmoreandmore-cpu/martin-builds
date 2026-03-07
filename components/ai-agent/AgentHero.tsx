"use client";

import DemoChat from "./DemoChat";

export default function AgentHero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "8rem 3rem 4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(200,255,0,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "3rem", alignItems: "center", maxWidth: "1200px", margin: "0 auto", width: "100%" }} className="agent-hero-grid">
        {/* Left */}
        <div>
          <div className="animate-fade-up-1" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            AI Agent for Your Business
          </div>
          <h1 className="animate-fade-up-2" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-2px" }}>
            An AI employee that{" "}
            <span style={{ color: "#c8ff00" }}>never sleeps</span>,
            <br />
            never calls in sick,
            <br />
            and knows your business cold.
          </h1>
          <p className="animate-fade-up-3" style={{ fontSize: "1.1rem", fontWeight: 300, color: "#888", marginTop: "1.5rem", lineHeight: 1.7, maxWidth: "500px" }}>
            A custom AI chat agent trained on your business — answers customer questions, captures leads, and books appointments 24/7. Installed on your site in 48 hours.
          </p>
          <div className="animate-fade-up-4" style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
            <a
              href="#pricing"
              style={{ display: "inline-block", padding: "1rem 2.5rem", background: "#c8ff00", color: "#0a0a0a", borderRadius: "100px", fontWeight: 700, fontSize: "1rem", transition: "all 0.3s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
            >
              Get Your Agent
            </a>
            <a
              href="#demo-section"
              style={{ display: "inline-block", padding: "1rem 2.5rem", background: "transparent", color: "#f5f5f0", borderRadius: "100px", fontWeight: 600, fontSize: "1rem", border: "1px solid rgba(245,245,240,0.2)", transition: "all 0.3s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#c8ff00"; (e.currentTarget as HTMLAnchorElement).style.color = "#c8ff00"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,245,240,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0"; }}
            >
              See It In Action
            </a>
          </div>
          <p className="animate-fade-up-4" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.85rem", color: "#888", marginTop: "1rem" }}>
            Starting at <strong style={{ color: "#c8ff00", fontSize: "1.1rem" }}>$300/month</strong> &mdash; cancel anytime
          </p>
        </div>

        {/* Right: Demo Chat */}
        <DemoChat />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .agent-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
