"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "../ScrollReveal";

const ChartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const ToolIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const TargetIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const included = [
  {
    icon: <ChartIcon />,
    title: "Business Dashboard",
    desc: "A custom dashboard built around your business — revenue, appointments, top services, busiest days, customer retention. Set up for you, updated automatically.",
    example: "\"Your Tuesday appointments are up 34% since adding the evening slot.\""
  },
  {
    icon: <ToolIcon />,
    title: "Decision Tools",
    desc: "ROI calculators, profit estimators, pricing analyzers — built into your dashboard so you stop guessing and start knowing.",
    example: "\"If you raise your cleaning price by $15, you'd net $2,400 more per month.\"",
    proOnly: true,
  },
];

const addons = [
  {
    icon: <TargetIcon />,
    title: "Lead Generation List",
    price: "$200/mo",
    desc: "Fresh prospects in your area that match your ideal customer. Names, contacts, and why they're a fit. Delivered monthly.",
    example: "\"12 new homeowners within 5 miles who haven't chosen an HVAC provider yet.\""
  },
  {
    icon: <SearchIcon />,
    title: "Market Research Report",
    price: "$150/mo",
    desc: "What your competitors charge, what customers in your area search for, and where the gaps are. Monthly intel so you stay ahead.",
    example: "\"3 dental offices within 2 miles don't offer Saturday hours. You do.\""
  },
];

export default function Deliverables() {
  const [visibleIncluded, setVisibleIncluded] = useState(0);
  const [visibleAddons, setVisibleAddons] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showAddonIntro, setShowAddonIntro] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setShowTyping(true), 300));
    timers.push(setTimeout(() => { setShowTyping(false); setShowIntro(true); }, 900));
    included.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleIncluded(i + 1), 1400 + i * 250));
    });
    timers.push(setTimeout(() => setShowAddonIntro(true), 2200));
    addons.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleAddons(i + 1), 2700 + i * 250));
    });
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <section className="deliverables-section" style={{ padding: "6rem 3rem", background: "rgba(200,255,0,0.015)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal>
          <p style={tagStyle}>More Than an Agent</p>
        </ScrollReveal>
        <ScrollReveal>
          <h2 style={title}>Your agent handles the front line.<br />We handle the intelligence behind it.</h2>
        </ScrollReveal>

        <div ref={ref} style={{ marginTop: "3rem" }}>
          {/* Agent intro bubble */}
          {(showIntro || showTyping) && (
            <div style={{ maxWidth: "650px", margin: "0 auto 2.5rem", display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
              <div style={agentDot}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>
              </div>
              {showTyping && !showIntro ? (
                <div style={{ background: "rgba(200,255,0,0.08)", padding: "0.75rem 1rem", borderRadius: "14px", display: "flex", gap: "4px", alignItems: "center" }}>
                  <span style={{ ...dotStyle, animation: "delTypingDot 1s infinite 0s" }} />
                  <span style={{ ...dotStyle, animation: "delTypingDot 1s infinite 0.2s" }} />
                  <span style={{ ...dotStyle, animation: "delTypingDot 1s infinite 0.4s" }} />
                </div>
              ) : showIntro ? (
                <div style={bubble}>Every plan comes with a custom dashboard. Pro agents get decision tools built in.</div>
              ) : null}
            </div>
          )}

          {/* Included cards */}
          <div className="deliverables-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
            {included.map((d, i) => (
              <div key={d.title} style={{ ...cardBase, opacity: visibleIncluded > i ? 1 : 0, transform: visibleIncluded > i ? "translateY(0)" : "translateY(16px)" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "rgba(200,255,0,0.15)"; el.style.transform = "translateY(-4px)"; const bar = el.querySelector(".del-bar") as HTMLDivElement; if (bar) bar.style.transform = "scaleX(1)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "rgba(245,245,240,0.06)"; el.style.transform = "translateY(0)"; const bar = el.querySelector(".del-bar") as HTMLDivElement; if (bar) bar.style.transform = "scaleX(0)"; }}
              >
                <div className="del-bar" style={barStyle} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem" }}>
                  <div style={iconBox}>{d.icon}</div>
                  <span style={{ ...labelStyle, color: "#c8ff00" }}>{d.proOnly ? "PRO PLAN" : "INCLUDED"}</span>
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>{d.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.6, flex: 1 }}>{d.desc}</p>
                <div style={exampleStyle}>{d.example}</div>
              </div>
            ))}
          </div>

          {/* Add-on intro bubble */}
          {showAddonIntro && (
            <div style={{ maxWidth: "650px", margin: "2.5rem auto", display: "flex", gap: "0.6rem", alignItems: "flex-start", animation: "delFadeUp 0.4s ease-out forwards" }}>
              <div style={agentDot}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>
              </div>
              <div style={bubble}>Want even more? Add these to any plan:</div>
            </div>
          )}

          {/* Add-on cards */}
          {showAddonIntro && (
            <div className="deliverables-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
              {addons.map((d, i) => (
                <div key={d.title} style={{ ...cardBase, opacity: visibleAddons > i ? 1 : 0, transform: visibleAddons > i ? "translateY(0)" : "translateY(16px)" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "rgba(200,255,0,0.15)"; el.style.transform = "translateY(-4px)"; const bar = el.querySelector(".del-bar") as HTMLDivElement; if (bar) bar.style.transform = "scaleX(1)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "rgba(245,245,240,0.06)"; el.style.transform = "translateY(0)"; const bar = el.querySelector(".del-bar") as HTMLDivElement; if (bar) bar.style.transform = "scaleX(0)"; }}
                >
                  <div className="del-bar" style={barStyle} />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem" }}>
                    <div style={iconBox}>{d.icon}</div>
                    <span style={{ ...labelStyle, color: "#888" }}>ADD-ON · {d.price}</span>
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>{d.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.6, flex: 1 }}>{d.desc}</p>
                  <div style={exampleStyle}>{d.example}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes delFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes delTypingDot {
          0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
          30% { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 700px) {
          .deliverables-section { padding: 3rem 1.25rem !important; }
          .deliverables-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

const dotStyle: React.CSSProperties = { width: "6px", height: "6px", borderRadius: "50%", background: "#c8ff00", display: "inline-block" };
const tagStyle: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
const title: React.CSSProperties = { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "750px" };
const agentDot: React.CSSProperties = { width: "30px", height: "30px", borderRadius: "50%", background: "rgba(200,255,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };
const bubble: React.CSSProperties = { background: "rgba(200,255,0,0.08)", padding: "0.75rem 1rem", borderRadius: "14px 14px 14px 4px", fontSize: "0.95rem", color: "#f5f5f0", lineHeight: 1.5, animation: "delFadeUp 0.4s ease-out forwards" };
const cardBase: React.CSSProperties = { background: "#1a1a1a", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "16px", padding: "2rem", position: "relative", overflow: "hidden", transition: "all 0.5s ease-out", height: "100%", display: "flex", flexDirection: "column" };
const barStyle: React.CSSProperties = { position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#c8ff00", transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.4s" };
const iconBox: React.CSSProperties = { width: "44px", height: "44px", background: "rgba(200,255,0,0.1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };
const labelStyle: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "1.5px", textTransform: "uppercase", opacity: 0.8 };
const exampleStyle: React.CSSProperties = { marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(245,245,240,0.06)", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", opacity: 0.7 };
