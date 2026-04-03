"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const APP_AVG_COST = 85; // avg $/mo per app

const useCases = [
  { label: "CRM", icon: "👤" },
  { label: "Scheduling", icon: "📅" },
  { label: "Invoicing", icon: "💰" },
  { label: "Reports", icon: "📊" },
  { label: "Email Marketing", icon: "✉️" },
  { label: "Project Mgmt", icon: "📋" },
  { label: "Analytics", icon: "📈" },
  { label: "File Storage", icon: "📁" },
  { label: "Support Tickets", icon: "🎫" },
  { label: "Social Media", icon: "📱" },
];

export default function AppAudit() {
  const [step, setStep] = useState(1);
  const [appCount, setAppCount] = useState(3);
  const [selected, setSelected] = useState<string[]>([]);
  const [showReveal, setShowReveal] = useState(false);
  const [countUp, setCountUp] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const monthlyCost = appCount * APP_AVG_COST;
  const annualCost = monthlyCost * 12;
  const annualSavings = Math.round(annualCost * 0.7); // ~70% savings

  // Count-up animation for savings
  useEffect(() => {
    if (step !== 3 || !showReveal) return;
    const target = annualSavings;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCountUp(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [step, showReveal, annualSavings]);

  // Delay reveal animation
  useEffect(() => {
    if (step === 3) {
      const t = setTimeout(() => setShowReveal(true), 300);
      return () => clearTimeout(t);
    }
    setShowReveal(false);
  }, [step]);

  const toggleUseCase = (label: string) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    );
  };

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(200,255,0,0.08)",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={tagStyle}>Reality Check</p>
            <h2 style={titleStyle}>
              How many apps are you
              <br />
              <span style={{ color: "#c8ff00" }}>paying for?</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Step indicator */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "2.5rem" }}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              style={{
                width: s === step ? "32px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: s === step ? "#c8ff00" : s < step ? "rgba(200,255,0,0.4)" : "rgba(245,245,240,0.1)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          ))}
        </div>

        {/* ── Step 1: App Count ── */}
        {step === 1 && (
          <div style={{ animation: "auditFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div
              style={{
                background: "#141414",
                borderRadius: "20px",
                border: "1px solid rgba(245,245,240,0.06)",
                padding: "3rem 2rem",
                textAlign: "center",
              }}
            >
              {/* App stack visual */}
              <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "2rem", height: "60px", alignItems: "flex-end" }}>
                {Array.from({ length: Math.min(appCount, 12) }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: "36px",
                      height: `${20 + i * 3}px`,
                      borderRadius: "8px",
                      background: i < 3 ? "rgba(200,255,0,0.15)" : "rgba(255,100,100,0.1)",
                      border: `1px solid ${i < 3 ? "rgba(200,255,0,0.2)" : "rgba(255,100,100,0.15)"}`,
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      animation: `auditStackIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 40}ms both`,
                      transform: i > 5 ? `rotate(${(i - 5) * 2}deg)` : "none",
                    }}
                  />
                ))}
              </div>

              {/* Counter */}
              <div
                style={{
                  fontSize: "4rem",
                  fontWeight: 900,
                  color: appCount > 5 ? "#ff6b6b" : "#f5f5f0",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                  transition: "color 0.3s",
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                {appCount}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#888", marginBottom: "2rem" }}>
                apps &amp; subscriptions
              </div>

              {/* Slider */}
              <div style={{ maxWidth: "400px", margin: "0 auto", marginBottom: "2rem" }}>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={appCount}
                  onChange={(e) => setAppCount(Number(e.target.value))}
                  style={{
                    width: "100%",
                    accentColor: "#c8ff00",
                    cursor: "pointer",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "#555", fontFamily: "'Space Mono', monospace", marginTop: "0.5rem" }}>
                  <span>1</span>
                  <span>12+</span>
                </div>
              </div>

              {/* Running cost */}
              <div
                style={{
                  padding: "1.25rem",
                  background: appCount > 5 ? "rgba(255,100,100,0.06)" : "rgba(245,245,240,0.02)",
                  borderRadius: "12px",
                  border: `1px solid ${appCount > 5 ? "rgba(255,100,100,0.15)" : "rgba(245,245,240,0.06)"}`,
                  transition: "all 0.3s",
                }}
              >
                <div style={{ fontSize: "0.65rem", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                  Estimated monthly spend
                </div>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: appCount > 5 ? "#ff6b6b" : "#f5f5f0",
                    fontFamily: "'Space Mono', monospace",
                    transition: "color 0.3s",
                  }}
                >
                  ~${monthlyCost.toLocaleString()}/mo
                </div>
                <div style={{ fontSize: "0.75rem", color: "#666", marginTop: "0.25rem" }}>
                  That&apos;s <span style={{ color: appCount > 5 ? "#ff6b6b" : "#c8ff00", fontWeight: 700 }}>${annualCost.toLocaleString()}/yr</span> — and you probably use half of it.
                </div>
              </div>

              {/* Next */}
              <button
                onClick={() => setStep(2)}
                style={nextBtnStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 24px rgba(200,255,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                Next: What do you actually use?
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Use Cases ── */}
        {step === 2 && (
          <div style={{ animation: "auditFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div
              style={{
                background: "#141414",
                borderRadius: "20px",
                border: "1px solid rgba(245,245,240,0.06)",
                padding: "3rem 2rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f5f5f0", marginBottom: "0.5rem" }}>
                What do you actually use?
              </div>
              <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "2rem" }}>
                Tap the tools your business needs every day.
              </p>

              {/* Pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center", maxWidth: "600px", margin: "0 auto 2rem" }}>
                {useCases.map((uc, i) => {
                  const isSelected = selected.includes(uc.label);
                  return (
                    <button
                      key={uc.label}
                      onClick={() => toggleUseCase(uc.label)}
                      style={{
                        padding: "0.7rem 1.2rem",
                        borderRadius: "100px",
                        border: "1px solid",
                        borderColor: isSelected ? "rgba(200,255,0,0.4)" : "rgba(245,245,240,0.1)",
                        background: isSelected ? "rgba(200,255,0,0.1)" : "transparent",
                        color: isSelected ? "#c8ff00" : "#888",
                        fontSize: "0.82rem",
                        fontWeight: isSelected ? 600 : 400,
                        cursor: "pointer",
                        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                        transform: isSelected ? "scale(1.05)" : "scale(1)",
                        animation: `auditPillIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 40}ms both`,
                      }}
                    >
                      <span style={{ marginRight: "0.4rem" }}>{uc.icon}</span>
                      {uc.label}
                    </button>
                  );
                })}
              </div>

              {/* Waste indicator */}
              {selected.length > 0 && selected.length < appCount && (
                <div
                  style={{
                    padding: "1rem 1.5rem",
                    background: "rgba(255,100,100,0.06)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,100,100,0.12)",
                    marginBottom: "2rem",
                    animation: "auditFadeIn 0.3s ease-out",
                  }}
                >
                  <div style={{ fontSize: "0.85rem", color: "#ccc" }}>
                    You need <span style={{ color: "#c8ff00", fontWeight: 700 }}>{selected.length}</span> tools.
                    You&apos;re paying for <span style={{ color: "#ff6b6b", fontWeight: 700 }}>{appCount}</span>.
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#888", marginTop: "0.3rem" }}>
                    That&apos;s {appCount - selected.length} subscriptions collecting dust.
                  </div>
                </div>
              )}

              {/* Nav */}
              <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}>
                <button
                  onClick={() => setStep(1)}
                  style={backBtnStyle}
                >
                  Back
                </button>
                <button
                  onClick={() => { if (selected.length > 0) setStep(3); }}
                  style={{
                    ...nextBtnStyle,
                    opacity: selected.length > 0 ? 1 : 0.4,
                    cursor: selected.length > 0 ? "pointer" : "not-allowed",
                  }}
                  onMouseEnter={(e) => {
                    if (selected.length > 0) {
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 24px rgba(200,255,0,0.2)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  }}
                >
                  See the difference
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 3: The Reveal ── */}
        {step === 3 && (
          <div style={{ animation: "auditFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            {/* Side by side */}
            <div className="audit-reveal-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
              {/* Their current stack */}
              <div
                style={{
                  background: "#141414",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,100,100,0.12)",
                  padding: "2rem",
                  opacity: showReveal ? 1 : 0,
                  transform: showReveal ? "translateX(0)" : "translateX(-16px)",
                  transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div style={{ fontSize: "0.65rem", color: "#ff6b6b", fontFamily: "'Space Mono', monospace", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                  Your Current Stack
                </div>

                {/* App list */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.5rem" }}>
                  {Array.from({ length: appCount }).map((_, i) => {
                    const isUsed = i < selected.length;
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "8px",
                          background: isUsed ? "rgba(245,245,240,0.03)" : "rgba(255,100,100,0.04)",
                          border: `1px solid ${isUsed ? "rgba(245,245,240,0.06)" : "rgba(255,100,100,0.08)"}`,
                          opacity: showReveal ? 1 : 0,
                          transform: showReveal ? "translateY(0)" : "translateY(6px)",
                          transition: `all 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 50 + 200}ms`,
                        }}
                      >
                        <span style={{ fontSize: "0.78rem", color: isUsed ? "#ccc" : "#555", textDecoration: isUsed ? "none" : "line-through" }}>
                          {isUsed ? selected[i] : `App ${i + 1}`}
                        </span>
                        <span style={{ fontSize: "0.7rem", color: isUsed ? "#888" : "#ff6b6b", fontFamily: "'Space Mono', monospace" }}>
                          ~${APP_AVG_COST}/mo
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Total */}
                <div style={{ padding: "1rem", background: "rgba(255,100,100,0.06)", borderRadius: "10px", border: "1px solid rgba(255,100,100,0.1)", textAlign: "center" }}>
                  <div style={{ fontSize: "0.6rem", color: "#888", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.3rem" }}>Annual cost</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ff6b6b", fontFamily: "'Space Mono', monospace", textDecoration: "line-through", textDecorationColor: "rgba(255,100,100,0.4)" }}>
                    ${annualCost.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Custom dashboard */}
              <div
                style={{
                  background: "#141414",
                  borderRadius: "16px",
                  border: "1px solid rgba(200,255,0,0.15)",
                  padding: "2rem",
                  opacity: showReveal ? 1 : 0,
                  transform: showReveal ? "translateX(0)" : "translateX(16px)",
                  transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
                }}
              >
                <div style={{ fontSize: "0.65rem", color: "#c8ff00", fontFamily: "'Space Mono', monospace", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                  One Custom Dashboard
                </div>

                {/* Selected features */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.5rem" }}>
                  {selected.map((label, i) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "8px",
                        background: "rgba(200,255,0,0.04)",
                        border: "1px solid rgba(200,255,0,0.1)",
                        opacity: showReveal ? 1 : 0,
                        transform: showReveal ? "translateY(0)" : "translateY(6px)",
                        transition: `all 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 60 + 400}ms`,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ fontSize: "0.78rem", color: "#f5f5f0" }}>{label}</span>
                    </div>
                  ))}
                </div>

                {/* Value */}
                <div style={{ padding: "1rem", background: "rgba(200,255,0,0.04)", borderRadius: "10px", border: "1px solid rgba(200,255,0,0.12)", textAlign: "center" }}>
                  <div style={{ fontSize: "0.6rem", color: "#888", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.3rem" }}>One-time investment</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#c8ff00", fontFamily: "'Space Mono', monospace" }}>
                    You own it
                  </div>
                </div>
              </div>
            </div>

            {/* Savings callout */}
            <div
              style={{
                background: "rgba(200,255,0,0.04)",
                borderRadius: "16px",
                border: "1px solid rgba(200,255,0,0.15)",
                padding: "2rem",
                textAlign: "center",
                opacity: showReveal ? 1 : 0,
                transform: showReveal ? "translateY(0)" : "translateY(12px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ fontSize: "0.7rem", color: "#888", fontFamily: "'Space Mono', monospace", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Estimated annual savings
              </div>
              <div style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)", fontWeight: 900, color: "#c8ff00", lineHeight: 1, fontFamily: "'Space Mono', monospace" }}>
                ${countUp.toLocaleString()}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#888", marginTop: "0.75rem", lineHeight: 1.6 }}>
                Stop renting features you don&apos;t use.
                <br />
                <span style={{ color: "#f5f5f0", fontWeight: 600 }}>Build exactly what you need. Own it forever.</span>
              </div>
            </div>

            {/* CTA */}
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
              <button onClick={() => { setStep(1); setSelected([]); }} style={backBtnStyle}>
                Start Over
              </button>
              <a
                href="/discovery-call"
                style={ctaBtnStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                Book a Free Discovery Call
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes auditFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes auditStackIn {
          from { opacity: 0; transform: translateY(8px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes auditPillIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 640px) {
          .audit-reveal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
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

const nextBtnStyle: React.CSSProperties = {
  marginTop: "1.5rem",
  padding: "0.9rem 2rem",
  background: "#c8ff00",
  color: "#0a0a0a",
  border: "none",
  borderRadius: "100px",
  fontWeight: 700,
  fontSize: "0.9rem",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
};

const backBtnStyle: React.CSSProperties = {
  marginTop: "1.5rem",
  padding: "0.9rem 2rem",
  background: "transparent",
  color: "#888",
  border: "1px solid rgba(245,245,240,0.1)",
  borderRadius: "100px",
  fontWeight: 600,
  fontSize: "0.9rem",
  cursor: "pointer",
  transition: "all 0.3s",
};

const ctaBtnStyle: React.CSSProperties = {
  marginTop: "1.5rem",
  padding: "0.9rem 2.5rem",
  background: "#c8ff00",
  color: "#0a0a0a",
  border: "none",
  borderRadius: "100px",
  fontWeight: 700,
  fontSize: "1rem",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  textDecoration: "none",
  display: "inline-block",
};
