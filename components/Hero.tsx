"use client";

import { useState, useEffect } from "react";

const industries = [
  {
    label: "Staffing",
    greeting: "Good morning, Jessica",
    metrics: [
      { label: "Open Roles", value: "34", accent: true },
      { label: "Placements", value: "12", accent: false },
      { label: "Fill Rate", value: "78%", accent: false },
    ],
    bars: [40, 55, 35, 70, 62, 85, 72],
  },
  {
    label: "Restaurant",
    greeting: "Good morning, Chef",
    metrics: [
      { label: "Today's Sales", value: "$4.8K", accent: true },
      { label: "Food Cost", value: "28%", accent: false },
      { label: "Covers", value: "142", accent: false },
    ],
    bars: [60, 45, 72, 55, 80, 68, 90],
  },
  {
    label: "Real Estate",
    greeting: "Good morning, Marcus",
    metrics: [
      { label: "Pipeline", value: "$2.4M", accent: true },
      { label: "Active Deals", value: "8", accent: false },
      { label: "Avg ROI", value: "24%", accent: false },
    ],
    bars: [50, 65, 45, 80, 58, 75, 88],
  },
];

export default function Hero() {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndustry((prev) => (prev + 1) % industries.length);
      setAnimKey((k) => k + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const ind = industries[activeIndustry];

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "clamp(6rem,12vw,8rem) clamp(1.25rem,5vw,3rem) clamp(3rem,6vw,4rem)",
        position: "relative",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="hero-layout" style={{ display: "flex", alignItems: "center", gap: "clamp(2rem,6vw,5rem)", maxWidth: "1200px", width: "100%" }}>
        {/* Left: Text */}
        <div style={{ flex: "1 1 50%" }}>
          <div className="animate-fade-up-1" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "2rem" }}>
            Custom Websites &amp; Dashboards That Work
          </div>

          <h1
            className="animate-fade-up-2"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-3px",
            }}
          >
            Your site.{" "}
            <span style={{ color: "#c8ff00", position: "relative", display: "inline-block" }}>
              Your dashboard.
              <span
                style={{
                  position: "absolute",
                  bottom: "4px",
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "#c8ff00",
                  opacity: 0.4,
                  borderRadius: "2px",
                  display: "block",
                }}
              />
            </span>
            <br />
            <span style={{ color: "#888", fontSize: "clamp(1.5rem, 4vw, 3.2rem)", fontWeight: 700 }}>
              Owned forever.
            </span>
          </h1>

          <p
            className="animate-fade-up-3"
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
              fontWeight: 300,
              color: "#888",
              maxWidth: "480px",
              marginTop: "1.5rem",
              lineHeight: 1.7,
            }}
          >
            Every site ships with a custom admin dashboard — not a template, not a no-code embed. Built around your workflow, your metrics, your team.
          </p>

          <div
            className="animate-fade-up-4"
            style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}
          >
            <a href="/discovery-call" style={primaryBtnStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
            >
              Book a Free Discovery Call
            </a>
            <a href="/scan" style={secondaryBtnStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#c8ff00"; (e.currentTarget as HTMLAnchorElement).style.color = "#c8ff00"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,245,240,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0"; }}
            >
              Free Site Audit
            </a>
          </div>
        </div>

        {/* Right: Floating Dashboard */}
        <div className="hero-dash" style={{ flex: "1 1 45%", display: "flex", justifyContent: "center" }}>
          <div
            key={animKey}
            style={{
              width: "100%",
              maxWidth: "420px",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(200,255,0,0.12)",
              background: "#1a1a1a",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(200,255,0,0.03)",
              animation: "heroFloat 6s ease-in-out infinite, heroDashIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Top bar */}
            <div style={{ padding: "0.6rem 1rem", borderBottom: "1px solid rgba(200,255,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ fontSize: "0.6rem", fontWeight: 700, color: "#c8ff00", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase" }}>{ind.label}</div>
              </div>
              <div style={{ display: "flex", gap: "0.3rem" }}>
                {industries.map((_, i) => (
                  <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: i === activeIndustry ? "#c8ff00" : "rgba(245,245,240,0.1)", transition: "background 0.3s" }} />
                ))}
              </div>
            </div>

            {/* Greeting */}
            <div style={{ padding: "0.75rem 1rem 0", fontSize: "0.75rem", fontWeight: 600, color: "#f5f5f0", animation: "heroMetricIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
              {ind.greeting}
            </div>

            {/* Metrics */}
            <div style={{ padding: "0.75rem 1rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
              {ind.metrics.map((m, i) => (
                <div
                  key={m.label}
                  style={{
                    padding: "0.75rem",
                    background: m.accent ? "rgba(200,255,0,0.04)" : "rgba(245,245,240,0.02)",
                    borderRadius: "10px",
                    border: `1px solid ${m.accent ? "rgba(200,255,0,0.12)" : "rgba(245,245,240,0.04)"}`,
                    animation: `heroMetricIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms both`,
                  }}
                >
                  <div style={{ fontSize: "0.5rem", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "0.2rem" }}>{m.label}</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: m.accent ? "#c8ff00" : "#f5f5f0" }}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div style={{ padding: "0 1rem 1rem" }}>
              <div style={{ background: "rgba(245,245,240,0.02)", borderRadius: "10px", border: "1px solid rgba(245,245,240,0.04)", padding: "0.75rem" }}>
                <div style={{ fontSize: "0.5rem", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "0.6rem" }}>Weekly</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "50px" }}>
                  {ind.bars.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${h}%`,
                        background: i === ind.bars.length - 2 ? "#c8ff00" : "rgba(200,255,0,0.12)",
                        borderRadius: "3px 3px 0 0",
                        transformOrigin: "bottom",
                        animation: `heroBarGrow 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 50 + 200}ms both`,
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.3rem" }}>
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <div key={i} style={{ flex: 1, textAlign: "center", fontSize: "0.45rem", color: "#555" }}>{d}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes heroDashIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes heroMetricIn {
          from { opacity: 0; transform: translateY(8px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes heroBarGrow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @media (max-width: 768px) {
          .hero-layout {
            flex-direction: column !important;
          }
          .hero-dash {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

const primaryBtnStyle: React.CSSProperties = {
  background: "#c8ff00",
  color: "#0a0a0a",
  padding: "1rem 2.5rem",
  borderRadius: "100px",
  fontWeight: 700,
  fontSize: "1rem",
  letterSpacing: "0.5px",
  transition: "all 0.3s",
  display: "inline-block",
  textDecoration: "none",
};

const secondaryBtnStyle: React.CSSProperties = {
  background: "transparent",
  color: "#f5f5f0",
  padding: "1rem 2.5rem",
  borderRadius: "100px",
  fontWeight: 600,
  fontSize: "1rem",
  border: "1px solid rgba(245,245,240,0.2)",
  transition: "all 0.3s",
  display: "inline-block",
  textDecoration: "none",
};
