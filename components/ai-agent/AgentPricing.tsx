"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "../ScrollReveal";

const plans = [
  {
    name: "Starter Agent",
    price: "$300",
    period: "/month",
    description: "For solopreneurs and small teams that need help with the basics.",
    features: [
      "Handles one core workflow (email, scheduling, OR support)",
      "Up to 500 tasks/month",
      "Daily activity summary",
      "Email notifications",
      "48-hour setup",
      "Cancel anytime"
    ],
    cta: "Start Your Starter Agent",
    popular: false
  },
  {
    name: "Pro Agent",
    price: "$500",
    period: "/month",
    description: "For businesses that need a full AI employee across multiple workflows.",
    features: [
      "Handles multiple workflows",
      "Unlimited tasks",
      "Integrates with your tools (CRM, calendar, email, etc.)",
      "Weekly performance reports",
      "Priority support",
      "Proactive suggestions & alerts",
      "Custom escalation rules"
    ],
    cta: "Get Your Pro Agent",
    popular: true
  }
];

export default function AgentPricing() {
  const [showIntro, setShowIntro] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showOutro, setShowOutro] = useState(false);
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
    timers.push(setTimeout(() => setShowTyping(true), 200));
    timers.push(setTimeout(() => { setShowTyping(false); setShowIntro(true); }, 800));
    timers.push(setTimeout(() => setShowCards(true), 1300));
    timers.push(setTimeout(() => setShowOutro(true), 2000));
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <section id="pricing" className="pricing-section" style={{ padding: "6rem 3rem", background: "rgba(200,255,0,0.015)" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>Pricing</p>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-2px", marginBottom: "1rem" }}>Hire your AI employee today</h2>
            <p style={{ fontSize: "1.1rem", color: "#888", maxWidth: "600px", margin: "0 auto" }}>No contracts. No setup fees. Your agent starts working in 48 hours.</p>
          </div>
        </ScrollReveal>

        <div ref={ref}>
          {/* Agent intro message */}
          {(showIntro || showTyping) && (
            <div style={{ maxWidth: "600px", margin: "0 auto 2rem", display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(200,255,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>
              </div>
              {showTyping && !showIntro ? (
                <div style={{ background: "rgba(200,255,0,0.08)", padding: "0.75rem 1rem", borderRadius: "14px", display: "flex", gap: "4px", alignItems: "center" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8ff00", display: "inline-block", animation: "pricingTypingDot 1s infinite 0s" }} />
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8ff00", display: "inline-block", animation: "pricingTypingDot 1s infinite 0.2s" }} />
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8ff00", display: "inline-block", animation: "pricingTypingDot 1s infinite 0.4s" }} />
                </div>
              ) : showIntro ? (
                <div style={{ background: "rgba(200,255,0,0.08)", padding: "0.75rem 1rem", borderRadius: "14px 14px 14px 4px", fontSize: "0.95rem", color: "#f5f5f0", lineHeight: 1.5, animation: "pricingFadeSlideUp 0.4s ease-out forwards" }}>
                  Based on what you&apos;ve told me, here&apos;s what I&apos;d recommend:
                </div>
              ) : null}
            </div>
          )}

          {/* Pricing Cards */}
          {showCards && (
            <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "stretch", animation: "pricingFadeSlideUp 0.5s ease-out forwards" }}>
              {plans.map((plan) => (
                <div key={plan.name}
                  style={{
                    background: "#1a1a1a",
                    border: plan.popular ? "2px solid rgba(200,255,0,0.3)" : "1px solid rgba(245,245,240,0.06)",
                    borderRadius: "20px",
                    padding: "2.5rem",
                    position: "relative",
                    transition: "all 0.4s",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(-8px)";
                    if (!plan.popular) el.style.borderColor = "rgba(200,255,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(0)";
                    if (!plan.popular) el.style.borderColor = "rgba(245,245,240,0.06)";
                  }}
                >
                  {plan.popular && (
                    <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#c8ff00", color: "#0a0a0a", padding: "0.5rem 1.5rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
                      MOST POPULAR
                    </div>
                  )}
                  <div style={{ marginBottom: "2rem" }}>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>{plan.name}</h3>
                    <p style={{ color: "#888", fontSize: "0.95rem", lineHeight: 1.5 }}>{plan.description}</p>
                  </div>
                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                      <span style={{ fontSize: "3rem", fontWeight: 900, color: "#c8ff00" }}>{plan.price}</span>
                      <span style={{ fontSize: "1.1rem", color: "#888" }}>{plan.period}</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, marginBottom: "2rem" }}>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {plan.features.map((feature, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                          <div style={{ width: "20px", height: "20px", background: "rgba(200,255,0,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>
                          </div>
                          <span style={{ fontSize: "0.95rem", color: "#f5f5f0", lineHeight: 1.4 }}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a href="/contact" style={{
                    display: "block",
                    width: "100%",
                    padding: "1.25rem 2rem",
                    background: plan.popular ? "#c8ff00" : "transparent",
                    color: plan.popular ? "#0a0a0a" : "#c8ff00",
                    border: plan.popular ? "none" : "2px solid rgba(200,255,0,0.3)",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.3s",
                    textDecoration: "none",
                    textAlign: "center",
                    boxSizing: "border-box"
                  }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = plan.popular ? "rgba(200,255,0,0.9)" : "rgba(200,255,0,0.1)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = plan.popular ? "#c8ff00" : "transparent"; }}
                  >{plan.cta}</a>

                  <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid rgba(245,245,240,0.06)", fontSize: "0.8rem", color: "#c8ff00", fontFamily: "'Space Mono', monospace", display: "flex", alignItems: "center", gap: "0.5rem", opacity: 0.8 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                    10 leads in 30 days or month 1 is free
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Outro message */}
          {showOutro && (
            <div style={{ maxWidth: "600px", margin: "2rem auto 0", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", animation: "pricingFadeSlideUp 0.4s ease-out forwards" }}>
                <div style={{ width: "30px", flexShrink: 0 }} />
                <div style={{ background: "rgba(200,255,0,0.08)", padding: "0.75rem 1rem", borderRadius: "14px 14px 14px 4px", fontSize: "0.9rem", color: "#f5f5f0", lineHeight: 1.5 }}>
                  The Pro plan is our most popular — unlimited tasks, multiple workflows, all your tools connected.
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", animation: "pricingFadeSlideUp 0.4s ease-out 0.3s both" }}>
                <div style={{ width: "30px", flexShrink: 0 }} />
                <div style={{ background: "rgba(200,255,0,0.08)", padding: "0.75rem 1rem", borderRadius: "14px 14px 14px 4px", fontSize: "0.9rem", color: "#f5f5f0", lineHeight: 1.5 }}>
                  Need something bigger? <a href="/contact" style={{ color: "#c8ff00", textDecoration: "none", fontWeight: 600 }} onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline"} onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none"}>Let&apos;s talk enterprise.</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pricingFadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pricingTypingDot {
          0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
          30% { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 640px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
          .pricing-section { padding: 3rem 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}
