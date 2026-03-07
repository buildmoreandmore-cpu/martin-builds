"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "../ScrollReveal";

const stats = [
  { value: "24/7", label: "I never sleep", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>) },
  { value: "5 min", label: "Average response time this week", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>) },
  { value: "90%", label: "Tasks I handled without bothering you", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>) },
  { value: "$0", label: "What you paid to set me up", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>) },
];

export default function AgentStats() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setShowTyping(true), 200));
    timers.push(setTimeout(() => { setShowTyping(false); setShowIntro(true); }, 800));
    stats.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 1400 + i * 500));
    });
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <section className="stats-section" style={{ padding: "5rem 3rem", background: "rgba(200,255,0,0.02)" }}>
      <div ref={ref} style={{ maxWidth: "700px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1rem" }}>Performance</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, letterSpacing: "-1px" }}>Weekly status report</h2>
          </div>
        </ScrollReveal>

        {/* Chat container */}
        <div style={{ background: "#1a1a1a", borderRadius: "16px", border: "1px solid rgba(245,245,240,0.06)", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(245,245,240,0.06)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "10px", height: "10px", background: "#c8ff00", borderRadius: "50%", animation: "statsPulse 2s infinite" }} />
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#f5f5f0" }}>Agent Status Report</span>
            <span style={{ fontSize: "0.7rem", color: "#555", fontFamily: "'Space Mono', monospace", marginLeft: "auto" }}>Just now</span>
          </div>

          <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {/* Intro message */}
            {showIntro && (
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", animation: "statsFadeSlideUp 0.4s ease-out forwards" }}>
                <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(200,255,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>
                </div>
                <div style={{ background: "rgba(200,255,0,0.08)", padding: "0.7rem 1rem", borderRadius: "14px 14px 14px 4px", fontSize: "0.88rem", color: "#f5f5f0", lineHeight: 1.5 }}>
                  Here&apos;s my weekly report:
                </div>
              </div>
            )}

            {showTyping && (
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(200,255,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>
                </div>
                <div style={{ background: "rgba(200,255,0,0.08)", padding: "0.7rem 1rem", borderRadius: "14px", display: "flex", gap: "4px", alignItems: "center" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8ff00", display: "inline-block", animation: "statsTypingDot 1s infinite 0s" }} />
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8ff00", display: "inline-block", animation: "statsTypingDot 1s infinite 0.2s" }} />
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8ff00", display: "inline-block", animation: "statsTypingDot 1s infinite 0.4s" }} />
                </div>
              </div>
            )}

            {/* Stat cards as message bubbles */}
            <div className="stats-bubble-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginLeft: "36px" }}>
              {stats.slice(0, visibleCount).map((stat, i) => (
                <div key={i} style={{
                  background: "rgba(200,255,0,0.06)",
                  border: "1px solid rgba(200,255,0,0.1)",
                  borderRadius: "14px",
                  padding: "1.25rem 1rem",
                  textAlign: "center",
                  animation: "statsFadeSlideUp 0.4s ease-out forwards",
                  transition: "border-color 0.3s"
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,255,0,0.3)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,255,0,0.1)"; }}
                >
                  <div style={{ marginBottom: "0.5rem", display: "flex", justifyContent: "center" }}>{stat.icon}</div>
                  <div style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: "#c8ff00", lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: "0.78rem", color: "#888", marginTop: "0.4rem", lineHeight: 1.3 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes statsFadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes statsTypingDot {
          0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
          30% { opacity: 1; transform: scale(1); }
        }
        @keyframes statsPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 480px) {
          .stats-bubble-grid { grid-template-columns: 1fr !important; margin-left: 0 !important; }
          .stats-section { padding: 3rem 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}
