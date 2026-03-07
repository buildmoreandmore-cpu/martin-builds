"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "../ScrollReveal";

const messages = [
  { text: "Every task I handle is one you never have to think about again.", delay: 500 },
  { text: "Start with one workflow. Scale to everything. I'll be live in 48 hours.", delay: 1800 },
];

export default function AgentFinalCTA() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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
    messages.forEach((msg, i) => {
      timers.push(setTimeout(() => setShowTyping(true), msg.delay - 400));
      timers.push(setTimeout(() => { setShowTyping(false); setVisibleCount(i + 1); }, msg.delay));
    });
    timers.push(setTimeout(() => setShowCTA(true), 2500));
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <section id="cta" className="cta-section" style={{ padding: "6rem 3rem", background: "linear-gradient(135deg, rgba(200,255,0,0.03) 0%, rgba(200,255,0,0.01) 100%)" }}>
      <div ref={ref} style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
        <ScrollReveal>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "2rem" }}>
            Your Business Runs 24/7 — Your Team Doesn't
          </p>
        </ScrollReveal>

        {/* Chat messages */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "center", marginBottom: "2.5rem" }}>
          {messages.slice(0, visibleCount).map((msg, i) => (
            <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", maxWidth: "520px", width: "100%", animation: "ctaFadeSlideUp 0.5s ease-out forwards" }}>
              {i === 0 && (
                <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(200,255,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>
                </div>
              )}
              {i !== 0 && <div style={{ width: "34px", flexShrink: 0 }} />}
              <div style={{ background: "rgba(200,255,0,0.08)", padding: "1rem 1.25rem", borderRadius: "16px 16px 16px 4px", fontSize: i === 0 ? "1.2rem" : "1rem", lineHeight: 1.5, color: "#f5f5f0", fontWeight: i === 0 ? 700 : 400, textAlign: "left" }}>
                {msg.text}
              </div>
            </div>
          ))}

          {showTyping && (
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", maxWidth: "520px", width: "100%" }}>
              <div style={{ width: "34px", flexShrink: 0 }} />
              <div style={{ background: "rgba(200,255,0,0.08)", padding: "0.75rem 1rem", borderRadius: "14px", display: "flex", gap: "4px", alignItems: "center" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#c8ff00", display: "inline-block", animation: "ctaTypingDot 1s infinite 0s" }} />
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#c8ff00", display: "inline-block", animation: "ctaTypingDot 1s infinite 0.2s" }} />
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#c8ff00", display: "inline-block", animation: "ctaTypingDot 1s infinite 0.4s" }} />
              </div>
            </div>
          )}
        </div>

        {/* CTA buttons */}
        {showCTA && (
          <div style={{ animation: "ctaFadeSlideUp 0.5s ease-out forwards" }}>
            <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
              <a
                href="/contact"
                style={{ display: "inline-block", padding: "1.25rem 3rem", background: "#c8ff00", color: "#0a0a0a", borderRadius: "100px", fontWeight: 700, fontSize: "1.1rem", textDecoration: "none", transition: "all 0.3s", boxShadow: "0 4px 20px rgba(200,255,0,0.15)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(200,255,0,0.15)"; }}
              >
                Get Your AI Employee — From $300/mo
              </a>
              <a
                href="/contact"
                style={{ display: "inline-block", padding: "1.25rem 3rem", background: "transparent", color: "#f5f5f0", borderRadius: "100px", fontWeight: 600, fontSize: "1.1rem", textDecoration: "none", border: "2px solid rgba(245,245,240,0.2)", transition: "all 0.3s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#c8ff00"; (e.currentTarget as HTMLAnchorElement).style.color = "#c8ff00"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(200,255,0,0.05)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,245,240,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
              >
                Questions? Let's Talk
              </a>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", fontSize: "0.9rem", color: "#666" }}>
              {["48-hour setup", "Cancel anytime", "No setup fees"].map((badge) => (
                <div key={badge} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes ctaFadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ctaTypingDot {
          0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
          30% { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 480px) {
          .cta-section { padding: 3rem 1.25rem !important; }
          .cta-section a { padding: 1rem 2rem !important; font-size: 0.95rem !important; }
        }
      `}</style>
    </section>
  );
}
