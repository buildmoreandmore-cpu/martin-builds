"use client";

import { useEffect, useRef, useState } from "react";

const sidebarItemsFull = [
  "Dashboard", "Pipeline", "Contacts", "Deals", "Reports",
  "Forecasts", "Tasks", "Calendar", "Campaigns", "Sequences",
  "Workflows", "Settings", "Help", "Integrations",
];
const sidebarItemsClean = ["Dashboard", "Clients", "Revenue", "Reports"];

const widgetsFull = [
  { label: "Pipeline", value: "$284K", sub: "42 deals" },
  { label: "Activity Feed", value: "38", sub: "actions today" },
  { label: "Tasks Due", value: "12", sub: "overdue: 5" },
  { label: "Forecast", value: "$1.2M", sub: "Q2 target" },
  { label: "Contacts", value: "2,847", sub: "+34 this week" },
  { label: "Campaigns", value: "6", sub: "active" },
];

const widgetsClean = [
  { label: "Revenue", value: "$48.2K", sub: "this month", accent: true },
  { label: "Active Clients", value: "24", sub: "+3 this week", accent: false },
  { label: "Pipeline", value: "$124K", sub: "6 proposals out", accent: false },
];

export default function DeclutterAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"bloated" | "transitioning" | "clean">("bloated");
  const hasTriggered = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          setTimeout(() => setPhase("transitioning"), 500);
          setTimeout(() => setPhase("clean"), 3000);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(200,255,0,0.08)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <p style={tagStyle}>The Problem</p>
        <h2 style={titleStyle}>
          You&apos;re paying for 200 features.
          <br />
          <span style={{ color: "#c8ff00" }}>You use 8.</span>
        </h2>
        <p style={subStyle}>I build the 8. You own it forever.</p>
      </div>

      {/* Desktop: animated dashboard */}
      <div className="declutter-desktop" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(245,245,240,0.08)",
            background: phase === "clean" ? "#ffffff" : "#1e2a3a",
            transition: "background 0.8s ease",
            display: "flex",
            minHeight: "420px",
          }}
        >
          {/* Sidebar */}
          <div
            style={{
              width: phase === "clean" ? "180px" : "200px",
              background: phase === "clean" ? "#f8f9fa" : "#162030",
              borderRight: `1px solid ${phase === "clean" ? "#e5e7eb" : "rgba(255,255,255,0.06)"}`,
              padding: "1rem 0",
              transition: "all 0.8s ease",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                padding: "0 1rem 1rem",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: phase === "clean" ? "#1d9e75" : "#5a7a9a",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              {phase === "clean" ? "your.app" : "MEGACRM PRO"}
            </div>
            {(phase === "clean" ? sidebarItemsClean : sidebarItemsFull).map((item, i) => {
              const isKept = sidebarItemsClean.includes(item);
              const isRemoving = phase === "transitioning" && !isKept;
              return (
                <div
                  key={item}
                  style={{
                    padding: "0.45rem 1rem",
                    fontSize: "0.75rem",
                    color: phase === "clean"
                      ? (i === 0 ? "#1d9e75" : "#555")
                      : isRemoving ? "transparent" : (isKept ? "#c8d8e8" : "#5a7a9a"),
                    fontWeight: i === 0 ? 600 : 400,
                    background: i === 0
                      ? (phase === "clean" ? "rgba(29,158,117,0.08)" : "rgba(255,255,255,0.04)")
                      : "transparent",
                    borderRadius: "6px",
                    margin: "0 0.5rem",
                    transition: `all 0.5s ease ${isRemoving ? i * 0.08 : 0}s`,
                    opacity: isRemoving ? 0 : 1,
                    maxHeight: isRemoving ? "0px" : "36px",
                    overflow: "hidden",
                    marginBottom: phase === "clean" ? "0.25rem" : "0",
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>

          {/* Main content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Top bar */}
            <div
              style={{
                padding: "0.75rem 1.25rem",
                borderBottom: `1px solid ${phase === "clean" ? "#e5e7eb" : "rgba(255,255,255,0.06)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "all 0.8s ease",
              }}
            >
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: phase === "clean" ? "#333" : "#8aa0b8" }}>
                {phase === "clean" ? "Good morning, Marcus" : "Dashboard"}
              </div>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                {phase !== "clean" && (
                  <>
                    <TopBarIcon opacity={phase === "transitioning" ? 0 : 0.4} />
                    <TopBarIcon opacity={phase === "transitioning" ? 0 : 0.4} />
                    <TopBarIcon opacity={phase === "transitioning" ? 0 : 0.4} />
                  </>
                )}
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: phase === "clean" ? "#1d9e75" : "#3a5a7a",
                    transition: "all 0.8s ease",
                  }}
                />
              </div>
            </div>

            {/* Widgets */}
            <div style={{ padding: "1.25rem", flex: 1 }}>
              {phase === "clean" ? (
                /* Clean state */
                <>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "1rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {widgetsClean.map((w, i) => (
                      <div
                        key={w.label}
                        style={{
                          padding: "1.25rem",
                          background: w.accent ? "rgba(29,158,117,0.08)" : "#f8f9fa",
                          borderRadius: "12px",
                          border: `1px solid ${w.accent ? "rgba(29,158,117,0.2)" : "#e5e7eb"}`,
                          animation: `slideUpClean 0.5s ease ${i * 0.1}s both`,
                        }}
                      >
                        <div style={{ fontSize: "0.65rem", color: "#888", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.4rem" }}>{w.label}</div>
                        <div style={{ fontSize: "1.5rem", fontWeight: 700, color: w.accent ? "#1d9e75" : "#333" }}>{w.value}</div>
                        <div style={{ fontSize: "0.7rem", color: "#aaa", marginTop: "0.2rem" }}>{w.sub}</div>
                      </div>
                    ))}
                  </div>
                  {/* Clean chart */}
                  <div style={{ background: "#f8f9fa", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "1.25rem", animation: "slideUpClean 0.5s ease 0.3s both" }}>
                    <div style={{ fontSize: "0.7rem", color: "#888", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem" }}>Weekly Revenue</div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "80px" }}>
                      {[45, 62, 38, 71, 55, 82, 68].map((h, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            height: `${h}%`,
                            background: i === 5 ? "#1d9e75" : "rgba(29,158,117,0.2)",
                            borderRadius: "4px 4px 0 0",
                            animation: `growBar 0.6s ease ${0.4 + i * 0.05}s both`,
                          }}
                        />
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.4rem" }}>
                      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                        <div key={i} style={{ flex: 1, textAlign: "center", fontSize: "0.6rem", color: "#bbb" }}>{d}</div>
                      ))}
                    </div>
                  </div>
                  {/* Clean table */}
                  <div style={{ marginTop: "1rem", background: "#f8f9fa", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "1rem 1.25rem", animation: "slideUpClean 0.5s ease 0.5s both" }}>
                    <div style={{ fontSize: "0.7rem", color: "#888", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem" }}>Recent Activity</div>
                    {["New lead — Marcus Johnson", "Proposal sent — $12K", "Invoice paid — $4,500"].map((row, i) => (
                      <div key={i} style={{ padding: "0.5rem 0", borderBottom: i < 2 ? "1px solid #eee" : "none", fontSize: "0.75rem", color: "#555", display: "flex", justifyContent: "space-between" }}>
                        <span>{row}</span>
                        <span style={{ color: "#bbb", fontSize: "0.65rem" }}>{["2m ago", "1h ago", "3h ago"][i]}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Bloated state */
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "0.75rem",
                  }}
                >
                  {widgetsFull.map((w, i) => {
                    const isRemoving = phase === "transitioning" && i > 2;
                    return (
                      <div
                        key={w.label}
                        style={{
                          padding: "1rem",
                          background: "rgba(255,255,255,0.03)",
                          borderRadius: "8px",
                          border: "1px solid rgba(255,255,255,0.06)",
                          transition: `all 0.5s ease ${isRemoving ? (i - 3) * 0.15 : 0}s`,
                          opacity: isRemoving ? 0 : 1,
                          transform: isRemoving ? "scale(0.9)" : "scale(1)",
                        }}
                      >
                        <div style={{ fontSize: "0.6rem", color: "#5a7a9a", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.4rem" }}>{w.label}</div>
                        <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#8aa0b8" }}>{w.value}</div>
                        <div style={{ fontSize: "0.6rem", color: "#4a6a8a", marginTop: "0.2rem" }}>{w.sub}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Labels */}
        <div style={{ display: "flex", justifyContent: "center", gap: "3rem", marginTop: "1.5rem" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.85rem", color: phase === "clean" ? "#555" : "#888", fontWeight: 500, transition: "color 0.5s" }}>
              What you&apos;re paying for
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.85rem", color: phase === "clean" ? "#1d9e75" : "#555", fontWeight: 600, transition: "color 0.5s" }}>
              What you actually need
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: static before/after */}
      <div className="declutter-mobile" style={{ display: "none", maxWidth: "400px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {/* Before */}
          <div>
            <p style={{ fontSize: "0.7rem", color: "#888", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem", textAlign: "center" }}>Before</p>
            <div style={{ background: "#1e2a3a", borderRadius: "12px", padding: "1rem", border: "1px solid rgba(255,255,255,0.06)" }}>
              {sidebarItemsFull.slice(0, 8).map((item) => (
                <div key={item} style={{ fontSize: "0.55rem", color: "#5a7a9a", padding: "0.2rem 0" }}>{item}</div>
              ))}
              <div style={{ fontSize: "0.5rem", color: "#3a5a7a", marginTop: "0.3rem" }}>...6 more</div>
            </div>
          </div>
          {/* After */}
          <div>
            <p style={{ fontSize: "0.7rem", color: "#1d9e75", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem", textAlign: "center", fontWeight: 600 }}>After</p>
            <div style={{ background: "#ffffff", borderRadius: "12px", padding: "1rem", border: "1px solid #e5e7eb" }}>
              {sidebarItemsClean.map((item) => (
                <div key={item} style={{ fontSize: "0.6rem", color: "#555", padding: "0.3rem 0", fontWeight: 500 }}>{item}</div>
              ))}
              <div style={{ marginTop: "0.5rem", fontSize: "0.7rem", fontWeight: 700, color: "#1d9e75" }}>$48.2K</div>
              <div style={{ fontSize: "0.5rem", color: "#aaa" }}>revenue this month</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <a
          href="/discovery-call"
          style={{ color: "#c8ff00", fontWeight: 600, fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", textDecoration: "none", transition: "all 0.3s" }}
          onMouseEnter={e => { const arrow = e.currentTarget.querySelector("span"); if (arrow) (arrow as HTMLSpanElement).style.transform = "translateX(3px)"; }}
          onMouseLeave={e => { const arrow = e.currentTarget.querySelector("span"); if (arrow) (arrow as HTMLSpanElement).style.transform = "translateX(0)"; }}
        >
          Ready to replace your bloated tool? Book a discovery call{" "}
          <span style={{ transition: "transform 0.3s", display: "inline-block" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </a>
      </div>

      <style>{`
        @keyframes slideUpClean {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes growBar {
          from { height: 0; }
        }
        @media (max-width: 768px) {
          .declutter-desktop { display: none !important; }
          .declutter-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
}

function TopBarIcon({ opacity }: { opacity: number }) {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "4px",
        background: "rgba(255,255,255,0.08)",
        transition: "opacity 0.5s ease",
        opacity,
      }}
    />
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

const subStyle: React.CSSProperties = {
  fontSize: "clamp(1rem, 2vw, 1.2rem)",
  fontWeight: 300,
  color: "#888",
  marginTop: "1rem",
  lineHeight: 1.7,
};
