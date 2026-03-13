"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "../ScrollReveal";

const ChartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const TargetIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const ToolIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const deliverables = [
  {
    icon: <ChartIcon />,
    title: "Performance Dashboard",
    desc: "See how your business is actually doing — revenue trends, top services, busiest days, customer retention. Updated automatically.",
    example: "\"Your Tuesday appointments are up 34% since adding the evening slot.\""
  },
  {
    icon: <SearchIcon />,
    title: "Market Research Report",
    desc: "Know what your competitors charge, what customers in your area are searching for, and where the gaps are. Monthly intel drops.",
    example: "\"3 dental offices within 2 miles don't offer Saturday hours. You do.\""
  },
  {
    icon: <UsersIcon />,
    title: "Customer Insights Report",
    desc: "Who's coming back, who's not, what services they want next. Your agent tracks patterns humans miss.",
    example: "\"68% of your new clients found you through Google — not referrals.\""
  },
  {
    icon: <TargetIcon />,
    title: "Lead Generation List",
    desc: "Fresh prospects in your area that match your ideal customer. Names, contacts, and why they're a fit. Delivered weekly.",
    example: "\"12 new homeowners within 5 miles who haven't chosen an HVAC provider yet.\""
  },
  {
    icon: <ToolIcon />,
    title: "Decision-Making Tools",
    desc: "ROI calculators, profit estimators, pricing analyzers — custom tools built for your business so you stop guessing.",
    example: "\"If you raise your cleaning price by $15, you'd net $2,400 more per month.\""
  },
];

export default function Deliverables() {
  const [visibleCards, setVisibleCards] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
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
    deliverables.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCards(i + 1), 1400 + i * 250));
    });
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <section className="deliverables-section" style={{ padding: "6rem 3rem", background: "rgba(200,255,0,0.015)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal>
          <p style={tag}>What You Get Every Month</p>
        </ScrollReveal>
        <ScrollReveal>
          <h2 style={title}>Your AI doesn&apos;t just answer questions.<br />It runs your back office.</h2>
        </ScrollReveal>
        <ScrollReveal>
          <p style={subtitle}>Most businesses have data — they just don&apos;t have anyone turning it into decisions. Your agent does that automatically.</p>
        </ScrollReveal>

        <div ref={ref} style={{ marginTop: "3rem" }}>
          {/* Agent intro bubble */}
          {(showIntro || showTyping) && (
            <div style={{ maxWidth: "650px", margin: "0 auto 2.5rem", display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(200,255,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>
              </div>
              {showTyping && !showIntro ? (
                <div style={{ background: "rgba(200,255,0,0.08)", padding: "0.75rem 1rem", borderRadius: "14px", display: "flex", gap: "4px", alignItems: "center" }}>
                  <span style={{ ...dot, animation: "delTypingDot 1s infinite 0s" }} />
                  <span style={{ ...dot, animation: "delTypingDot 1s infinite 0.2s" }} />
                  <span style={{ ...dot, animation: "delTypingDot 1s infinite 0.4s" }} />
                </div>
              ) : showIntro ? (
                <div style={{ background: "rgba(200,255,0,0.08)", padding: "0.75rem 1rem", borderRadius: "14px 14px 14px 4px", fontSize: "0.95rem", color: "#f5f5f0", lineHeight: 1.5, animation: "delFadeUp 0.4s ease-out forwards" }}>
                  Here&apos;s what I deliver to your inbox every month — no login required:
                </div>
              ) : null}
            </div>
          )}

          {/* Cards */}
          <div className="deliverables-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {deliverables.map((d, i) => (
              <div
                key={d.title}
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(245,245,240,0.06)",
                  borderRadius: "16px",
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                  opacity: visibleCards > i ? 1 : 0,
                  transform: visibleCards > i ? "translateY(0)" : "translateY(16px)",
                  transition: "all 0.5s ease-out",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column" as const,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(200,255,0,0.15)";
                  el.style.transform = "translateY(-4px)";
                  const bar = el.querySelector(".del-bar") as HTMLDivElement;
                  if (bar) bar.style.transform = "scaleX(1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(245,245,240,0.06)";
                  el.style.transform = "translateY(0)";
                  const bar = el.querySelector(".del-bar") as HTMLDivElement;
                  if (bar) bar.style.transform = "scaleX(0)";
                }}
              >
                <div className="del-bar" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#c8ff00", transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.4s" }} />
                <div style={{ width: "44px", height: "44px", background: "rgba(200,255,0,0.1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.2rem", flexShrink: 0 }}>{d.icon}</div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>{d.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.6, flex: 1 }}>{d.desc}</p>
                <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(245,245,240,0.06)", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", opacity: 0.7 }}>{d.example}</div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <ScrollReveal>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <p style={{ fontSize: "0.95rem", color: "#888", lineHeight: 1.6, maxWidth: "600px", margin: "0 auto" }}>
                All deliverables included in both plans. Starter gets monthly reports. Pro gets weekly reports + real-time alerts.
              </p>
            </div>
          </ScrollReveal>
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
        @media (max-width: 640px) {
          .deliverables-section { padding: 3rem 1.25rem !important; }
          .deliverables-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

const dot: React.CSSProperties = { width: "6px", height: "6px", borderRadius: "50%", background: "#c8ff00", display: "inline-block" };
const tag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
const title: React.CSSProperties = { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "750px" };
const subtitle: React.CSSProperties = { fontSize: "1.1rem", color: "#888", lineHeight: 1.6, maxWidth: "600px", marginTop: "1.5rem" };
