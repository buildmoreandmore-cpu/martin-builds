"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "../ScrollReveal";

const conversation = [
  { role: "user", text: "How does this work?" },
  { role: "agent", text: "Simple. Four steps." },
  { role: "agent", text: "Step 1 — Tell us what you need. What tasks eat your time?" },
  { role: "user", text: "I spend 3 hours a day on emails and scheduling" },
  { role: "agent", text: "Step 2 — We build & train your agent on your business, your tools, your tone." },
  { role: "agent", text: "Step 3 — You test it. Try to break it. We refine." },
  { role: "agent", text: "Step 4 — Your agent starts working. You get daily summaries." },
  { role: "agent", text: "Most clients are live within 48 hours." },
];

export default function HowItWorks() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timers: NodeJS.Timeout[] = [];
    const delays = [300, 1000, 1800, 2800, 3600, 4400, 5200, 6000];

    conversation.forEach((msg, i) => {
      if (msg.role === "agent" && i > 0) {
        timers.push(setTimeout(() => setShowTyping(true), delays[i] - 350));
      }
      timers.push(setTimeout(() => {
        setShowTyping(false);
        setVisibleCount(i + 1);
      }, delays[i]));
    });
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <section className="hiw-section" style={{ padding: "6rem 3rem", maxWidth: "700px", margin: "0 auto" }}>
      <ScrollReveal>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>How It Works</p>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-2px" }}>From discovery call to working employee in 48 hours</h2>
        </div>
      </ScrollReveal>

      <div ref={ref} style={{ background: "#1a1a1a", borderRadius: "16px", border: "1px solid rgba(245,245,240,0.06)", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(245,245,240,0.06)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: "10px", height: "10px", background: "#c8ff00", borderRadius: "50%", animation: "hiwPulse 2s infinite" }} />
          <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#f5f5f0" }}>Getting Started</span>
          <span style={{ fontSize: "0.7rem", color: "#555", fontFamily: "'Space Mono', monospace", marginLeft: "auto" }}>4 steps</span>
        </div>

        {/* Messages */}
        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {conversation.slice(0, visibleCount).map((msg, i) => {
            const isUser = msg.role === "user";
            const isStep = msg.text.startsWith("Step ");
            return (
              <div key={i} style={{ display: "flex", flexDirection: isUser ? "row-reverse" : "row", gap: "0.6rem", alignItems: "flex-start", animation: "hiwFadeSlideUp 0.4s ease-out forwards" }}>
                <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: isUser ? "rgba(245,245,240,0.1)" : "rgba(200,255,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {isUser ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>
                  )}
                </div>
                <div style={{
                  background: isUser ? "rgba(245,245,240,0.05)" : "rgba(200,255,0,0.08)",
                  padding: "0.75rem 1rem",
                  borderRadius: isUser ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  maxWidth: "85%",
                  fontSize: "0.88rem",
                  lineHeight: 1.55,
                  color: isUser ? "#ccc" : "#f5f5f0"
                }}>
                  {isStep && (
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#c8ff00", display: "inline-block", marginRight: "6px", background: "rgba(200,255,0,0.1)", padding: "2px 6px", borderRadius: "4px" }}>
                      {msg.text.split(" — ")[0]}
                    </span>
                  )}
                  {isStep ? msg.text.split(" — ").slice(1).join(" — ") : msg.text}
                </div>
              </div>
            );
          })}

          {showTyping && (
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(200,255,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>
              </div>
              <div style={{ background: "rgba(200,255,0,0.08)", padding: "0.75rem 1rem", borderRadius: "14px", display: "flex", gap: "4px", alignItems: "center" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8ff00", display: "inline-block", animation: "hiwTypingDot 1s infinite 0s" }} />
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8ff00", display: "inline-block", animation: "hiwTypingDot 1s infinite 0.2s" }} />
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8ff00", display: "inline-block", animation: "hiwTypingDot 1s infinite 0.4s" }} />
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes hiwFadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hiwTypingDot {
          0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
          30% { opacity: 1; transform: scale(1); }
        }
        @keyframes hiwPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 480px) {
          .hiw-section { padding: 3rem 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}
