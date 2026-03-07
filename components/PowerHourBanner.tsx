"use client";

import ScrollReveal from "./ScrollReveal";

export default function PowerHourBanner() {
  return (
    <section style={{ padding: "0 3rem 6rem", background: "#0a0a0a" }}>
      <ScrollReveal>
        <div
          style={{
            background: "linear-gradient(135deg, #111 0%, #141a0a 100%)",
            border: "1px solid rgba(200,255,0,0.15)",
            borderRadius: "20px",
            padding: "3rem 3.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background glow */}
          <div style={{ position: "absolute", right: "-5%", top: "-50%", width: "40%", height: "200%", background: "radial-gradient(ellipse, rgba(200,255,0,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              New — AI Power Hour
            </div>
            <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.1, maxWidth: "500px" }}>
              Not ready for a full build?
              <br />
              Start with one hour. <span style={{ color: "#c8ff00" }}>$500.</span>
            </h3>
            <p style={{ fontSize: "0.95rem", color: "#888", marginTop: "0.75rem", lineHeight: 1.6, maxWidth: "480px", fontWeight: 300 }}>
              A focused 1-on-1 session where I map out exactly what AI can do for your business — tools, workflows, and a clear action plan.
            </p>
          </div>

          <a
            href="/power-hour"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#c8ff00",
              color: "#0a0a0a",
              padding: "1rem 2rem",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "0.95rem",
              whiteSpace: "nowrap",
              transition: "all 0.3s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 28px rgba(200,255,0,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Book a Power Hour
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
