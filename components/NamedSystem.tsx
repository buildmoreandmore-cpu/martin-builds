"use client";

import ScrollReveal from "./ScrollReveal";

const TrackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);
const RevenueIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const AutomateIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
const BottleneckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const BULLETS = [
  { icon: <TrackIcon />, text: "Track every lead from source to close" },
  { icon: <RevenueIcon />, text: "Monitor revenue in real time" },
  { icon: <AutomateIcon />, text: "Automate reporting — no more manual updates" },
  { icon: <BottleneckIcon />, text: "Identify bottlenecks instantly" },
];

export default function NamedSystem() {
  return (
    <section
      style={{
        padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)",
        background: "#0f0f0f",
        borderTop: "1px solid rgba(200,255,0,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <ScrollReveal>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            The System
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "700px" }}>
            The Revenue Visibility{" "}
            <span style={{ color: "#c8ff00" }}>System&trade;</span>
          </h2>
          <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", color: "#888", maxWidth: "640px", marginTop: "1.5rem", lineHeight: 1.7 }}>
            A custom-built AI-powered dashboard that becomes the control center of your business.
          </p>
        </ScrollReveal>

        {/* Bullets grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "1rem",
            marginTop: "3rem",
          }}
        >
          {BULLETS.map((b, i) => (
            <ScrollReveal key={i}>
              <div
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(245,245,240,0.06)",
                  borderRadius: 12,
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span style={{ color: "#c8ff00", flexShrink: 0 }}>{b.icon}</span>
                <span style={{ fontSize: "0.95rem", color: "#f5f5f0", lineHeight: 1.5, fontWeight: 500 }}>{b.text}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Callout — the "5-10 hours" stat */}
        <ScrollReveal>
          <div
            style={{
              marginTop: "2rem",
              padding: "1.5rem 2rem",
              background: "linear-gradient(135deg, rgba(200,255,0,0.08), rgba(200,255,0,0.02))",
              border: "1px solid rgba(200,255,0,0.25)",
              borderLeft: "3px solid #c8ff00",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(200,255,0,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <p style={{ fontSize: "1rem", color: "#f5f5f0", lineHeight: 1.6, margin: 0, flex: 1, minWidth: 200 }}>
              <strong style={{ color: "#c8ff00", fontSize: "1.15rem" }}>5–10+ hours per week</strong>
              <span style={{ display: "block", fontSize: "0.9rem", color: "#888", marginTop: 4 }}>
                What most clients recover in admin time within the first 30 days.
              </span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
