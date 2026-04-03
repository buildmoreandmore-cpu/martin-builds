"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "../ScrollReveal";

/*
  Tiered AI agent billing — like choosing a carrier.
  Pick your tier (model quality), low setup, monthly auto-pay for usage.
*/

type TierKey = "essential" | "professional" | "enterprise";

interface TierConfig {
  name: string;
  tagline: string;
  model: string;
  setup: string;
  perConvo: string;
  perConvoNum: number;
  color: string;
  bestFor: string;
  features: string[];
}

const tiers: Record<TierKey, TierConfig> = {
  essential: {
    name: "Essential",
    tagline: "Reliable coverage for everyday conversations",
    model: "MiniMax-Text-01",
    setup: "$49",
    perConvo: "$0.04",
    perConvoNum: 0.04,
    color: "#c8ff00",
    bestFor: "FAQs, booking, basic support",
    features: [
      "Custom-trained on your business",
      "24/7 customer support agent",
      "Lead capture & notifications",
      "48-hour setup",
      "Auto-pay monthly",
    ],
  },
  professional: {
    name: "Professional",
    tagline: "Smarter conversations that close deals",
    model: "Claude Haiku 4.5",
    setup: "$99",
    perConvo: "$0.12",
    perConvoNum: 0.12,
    color: "#64b4ff",
    bestFor: "Lead qualifying, consultations, complex support",
    features: [
      "Everything in Essential",
      "Nuanced conversation handling",
      "Multi-step lead qualification",
      "CRM & calendar integration",
      "Auto-pay monthly",
    ],
  },
  enterprise: {
    name: "Enterprise",
    tagline: "Premium intelligence for high-value interactions",
    model: "Claude Sonnet 4.6",
    setup: "$149",
    perConvo: "$0.35",
    perConvoNum: 0.35,
    color: "#b482ff",
    bestFor: "Sales, legal intake, consulting, high-stakes conversations",
    features: [
      "Everything in Professional",
      "Best-in-class AI reasoning",
      "Complex workflow automation",
      "Priority support & monitoring",
      "Auto-pay monthly",
    ],
  },
};

const tierOrder: TierKey[] = ["essential", "professional", "enterprise"];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

function getUsageData(tier: TierConfig) {
  const convos = [120, 340, 580, 890, 1240, 1680];
  return convos.map((c, i) => {
    const total = c * tier.perConvoNum;
    return {
      month: MONTHS[i],
      conversations: c,
      total: `$${total.toFixed(2)}`,
      totalNum: total,
    };
  });
}

const FLAT_MONTHLY = 300;

export default function UtilityBilling() {
  const [activeTier, setActiveTier] = useState<TierKey>("essential");
  const [activeMonth, setActiveMonth] = useState(0);
  const [meterValue, setMeterValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [autoCycle, setAutoCycle] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const tier = tiers[activeTier];
  const usageData = getUsageData(tier);

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
    if (!isVisible || !autoCycle) return;
    const interval = setInterval(() => {
      setActiveMonth(m => (m + 1) % MONTHS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isVisible, autoCycle]);

  useEffect(() => {
    const target = usageData[activeMonth].conversations;
    const duration = 600;
    const start = meterValue;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setMeterValue(Math.round(start + (target - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [activeMonth, activeTier]);

  const data = usageData[activeMonth];
  const utilityTotal = data.totalNum;
  const savings = FLAT_MONTHLY - utilityTotal;
  const meterPct = Math.min((meterValue / 2000) * 100, 100);

  return (
    <section ref={ref} style={{ padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)", background: "#0a0a0a", borderTop: "1px solid rgba(200,255,0,0.08)" }}>
      <ScrollReveal>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={tagStyle}>Choose Your Plan</p>
          <h2 style={titleStyle}>
            Pick your network.
            <br />
            <span style={{ color: "#c8ff00" }}>Pay for what you use.</span>
          </h2>
          <p style={subStyle}>
            Low setup fee. Monthly auto-pay based on actual usage. Pick the AI model that fits your business — upgrade or downgrade anytime.
          </p>
        </div>
      </ScrollReveal>

      <div className="utility-desktop" style={{ maxWidth: "960px", margin: "0 auto" }}>
        {/* Tier selector — carrier style */}
        <ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
            {tierOrder.map((key) => {
              const t = tiers[key];
              const isActive = activeTier === key;
              return (
                <button
                  key={key}
                  onClick={() => { setActiveTier(key); setActiveMonth(0); }}
                  style={{
                    padding: "1.5rem",
                    background: isActive ? "rgba(245,245,240,0.03)" : "#1a1a1a",
                    border: `2px solid ${isActive ? t.color : "rgba(245,245,240,0.06)"}`,
                    borderRadius: "16px",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    textAlign: "left",
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Top accent bar */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: t.color, opacity: isActive ? 1 : 0, transition: "opacity 0.3s" }} />

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: isActive ? t.color : "#f5f5f0" }}>{t.name}</div>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#888", lineHeight: 1.4, marginBottom: "0.75rem" }}>{t.tagline}</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem" }}>
                    <span style={{ fontSize: "1.5rem", fontWeight: 800, color: isActive ? t.color : "#f5f5f0" }}>{t.setup}</span>
                    <span style={{ fontSize: "0.7rem", color: "#666" }}>setup</span>
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "#555", marginTop: "0.3rem", fontFamily: "'Space Mono', monospace" }}>then {t.perConvo} / conversation</div>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Auto-pay badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1.2rem", background: "rgba(200,255,0,0.04)", border: "1px solid rgba(200,255,0,0.1)", borderRadius: "100px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tier.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span style={{ fontSize: "0.7rem", color: "#888", fontFamily: "'Space Mono', monospace", letterSpacing: "0.5px" }}>
              Auto-pay monthly • Card on file • Cancel anytime
            </span>
          </div>
        </div>

        {/* What's included */}
        <ScrollReveal>
          <div
            key={activeTier}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              marginBottom: "2rem",
              animation: "utilFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div style={{ padding: "1.5rem", background: "#1a1a1a", borderRadius: "16px", border: `1px solid ${tier.color}22` }}>
              <div style={{ fontSize: "0.65rem", color: tier.color, fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.75rem" }}>{tier.name} Plan Includes</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "#f5f5f0" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tier.color} strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: "1.5rem", background: "#1a1a1a", borderRadius: "16px", border: "1px solid rgba(245,245,240,0.06)" }}>
              <div style={{ fontSize: "0.65rem", color: "#888", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.75rem" }}>Best For</div>
              <p style={{ fontSize: "0.9rem", color: "#f5f5f0", lineHeight: 1.6, marginBottom: "1rem" }}>{tier.bestFor}</p>
              <div style={{ padding: "1rem", background: "rgba(245,245,240,0.02)", borderRadius: "10px", border: "1px solid rgba(245,245,240,0.06)" }}>
                <div style={{ fontSize: "0.6rem", color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.3rem" }}>Billing Model</div>
                <div style={{ fontSize: "0.8rem", color: "#f5f5f0", lineHeight: 1.5 }}>
                  <span style={{ color: tier.color, fontWeight: 700 }}>{tier.setup}</span> setup → agent goes live in 48h
                  <br />
                  Then <span style={{ color: tier.color, fontWeight: 600 }}>{tier.perConvo} per conversation</span>
                  <br />
                  <span style={{ color: "#888", fontSize: "0.7rem" }}>Billed monthly to your card on file</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Interactive billing demo */}
        <div
          style={{
            background: "#1a1a1a",
            borderRadius: "16px",
            border: `1px solid ${tier.color}20`,
            overflow: "hidden",
          }}
          onMouseEnter={() => setAutoCycle(false)}
          onMouseLeave={() => setAutoCycle(true)}
        >
          {/* Month selector */}
          <div style={{ display: "flex", borderBottom: `1px solid ${tier.color}10`, padding: "0 1rem" }}>
            {MONTHS.map((m, i) => (
              <button
                key={m}
                onClick={() => { setActiveMonth(i); setAutoCycle(false); }}
                style={{
                  flex: 1,
                  padding: "0.75rem 0.5rem",
                  background: "transparent",
                  border: "none",
                  borderBottom: i === activeMonth ? `2px solid ${tier.color}` : "2px solid transparent",
                  color: i === activeMonth ? tier.color : "#555",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "1px",
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  fontWeight: i === activeMonth ? 700 : 400,
                }}
              >
                {m}
              </button>
            ))}
          </div>

          <div style={{ padding: "1.5rem" }}>
            {/* Usage meter */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <div style={{ fontSize: "0.65rem", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase" }}>Usage Meter</div>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: tier.color, fontFamily: "'Space Mono', monospace" }}>
                  {meterValue.toLocaleString()} conversations
                </div>
              </div>
              <div style={{ height: "12px", background: "rgba(245,245,240,0.06)", borderRadius: "6px", overflow: "hidden", position: "relative" }}>
                <div
                  style={{
                    width: `${meterPct}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${tier.color}66, ${tier.color})`,
                    borderRadius: "6px",
                    transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    position: "relative",
                  }}
                >
                  <div style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "4px",
                    height: "18px",
                    background: tier.color,
                    borderRadius: "2px",
                    boxShadow: `0 0 8px ${tier.color}66`,
                  }} />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.3rem" }}>
                <span style={{ fontSize: "0.55rem", color: "#444" }}>0</span>
                <span style={{ fontSize: "0.55rem", color: "#444" }}>2,000</span>
              </div>
            </div>

            {/* Bill breakdown */}
            <div
              key={`${activeTier}-${activeMonth}`}
              style={{ animation: "utilFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div style={{ fontSize: "0.65rem", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>
                {data.month} Statement — {tier.name} Plan
              </div>

              <div style={{ background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)", overflow: "hidden" }}>
                {[
                  { label: "Conversations", value: data.conversations.toLocaleString(), detail: `${tier.name} plan` },
                  { label: "Rate", value: `${tier.perConvo} each`, detail: "AI processing, infrastructure, monitoring, support" },
                ].map((row, i) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.85rem 1.25rem",
                      borderBottom: i < 1 ? "1px solid rgba(245,245,240,0.04)" : "none",
                      animation: `utilRowSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1) ${i * 50}ms both`,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "#f5f5f0" }}>{row.label}</div>
                      <div style={{ fontSize: "0.6rem", color: "#555", marginTop: "0.15rem" }}>{row.detail}</div>
                    </div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f5f5f0", fontFamily: "'Space Mono', monospace" }}>{row.value}</div>
                  </div>
                ))}
                {/* Total */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", background: `${tier.color}08`, borderTop: `1px solid ${tier.color}1a` }}>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: tier.color }}>Auto-Pay Total</div>
                    <div style={{ fontSize: "0.55rem", color: "#555", marginTop: "0.1rem" }}>Charged to card on file</div>
                  </div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: tier.color, fontFamily: "'Space Mono', monospace" }}>{data.total}</div>
                </div>
              </div>
            </div>

            {/* Comparison */}
            <div style={{ marginTop: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ padding: "1.25rem", borderRadius: "12px", background: "rgba(255,107,107,0.04)", border: "1px solid rgba(255,107,107,0.1)" }}>
                <div style={{ fontSize: "0.6rem", color: "#ff6b6b", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.3rem" }}>Typical SaaS</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#ff6b6b", fontFamily: "'Space Mono', monospace", textDecoration: "line-through", opacity: 0.7 }}>${FLAT_MONTHLY}</div>
                <div style={{ fontSize: "0.65rem", color: "#888", marginTop: "0.2rem" }}>Same price whether you use it or not</div>
              </div>
              <div style={{ padding: "1.25rem", borderRadius: "12px", background: `${tier.color}08`, border: `1px solid ${tier.color}25` }}>
                <div style={{ fontSize: "0.6rem", color: tier.color, fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.3rem" }}>Your {tier.name} Bill</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: tier.color, fontFamily: "'Space Mono', monospace" }}>{data.total}</div>
                <div style={{ fontSize: "0.65rem", color: savings > 0 ? tier.color : "#888", marginTop: "0.2rem" }}>
                  {savings > 0 ? `Save $${savings.toFixed(0)}/mo` : `Only $${Math.abs(savings).toFixed(0)} more at ${data.conversations.toLocaleString()} convos`}
                </div>
              </div>
            </div>

            {/* 6-month chart */}
            <div style={{ marginTop: "1.5rem", background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)", padding: "1.25rem" }}>
              <div style={{ fontSize: "0.65rem", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>
                6-Month Cost — {tier.name}
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "100px" }}>
                {usageData.map((d, i) => {
                  const utilHeight = (d.totalNum / FLAT_MONTHLY) * 100;
                  const isActive = i === activeMonth;
                  return (
                    <div key={d.month} style={{ flex: 1, position: "relative", display: "flex", gap: "3px", alignItems: "flex-end", height: "100px" }}>
                      <div
                        style={{
                          flex: 1,
                          height: "100%",
                          background: isActive ? "rgba(255,107,107,0.15)" : "rgba(255,107,107,0.06)",
                          borderRadius: "3px 3px 0 0",
                          transition: "all 0.3s",
                          position: "relative",
                        }}
                      >
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "#ff6b6b", opacity: 0.4, borderRadius: "1px" }} />
                      </div>
                      <div
                        style={{
                          flex: 1,
                          height: `${Math.min(utilHeight, 100)}%`,
                          background: isActive ? tier.color : `${tier.color}25`,
                          borderRadius: "3px 3px 0 0",
                          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                          ...(isActive ? { boxShadow: `0 0 8px ${tier.color}25` } : {}),
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.4rem" }}>
                {MONTHS.map((m) => (
                  <div key={m} style={{ flex: 1, textAlign: "center", fontSize: "0.55rem", color: "#555" }}>{m}</div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.75rem", justifyContent: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <div style={{ width: "10px", height: "3px", background: "#ff6b6b", borderRadius: "1px", opacity: 0.6 }} />
                  <span style={{ fontSize: "0.6rem", color: "#888" }}>Flat $300/mo SaaS</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <div style={{ width: "10px", height: "10px", background: `${tier.color}50`, borderRadius: "2px" }} />
                  <span style={{ fontSize: "0.6rem", color: "#888" }}>Your {tier.name} cost</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.6, maxWidth: "550px", margin: "0 auto" }}>
            Low setup. Auto-pay monthly. Upgrade your model anytime. No contracts, no overage charges — just your agent working 24/7 and a transparent bill at the end of the month.
          </p>
          <a
            href="/discovery-call"
            style={{
              display: "inline-block",
              marginTop: "1.5rem",
              background: tier.color,
              color: "#0a0a0a",
              padding: "1rem 2.5rem",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.5px",
              transition: "all 0.3s",
              textDecoration: "none",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 30px ${tier.color}40`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
          >
            Get Your Agent
          </a>
        </div>
      </div>

      {/* Mobile version */}
      <div className="utility-mobile" style={{ display: "none", maxWidth: "400px", margin: "0 auto" }}>
        {/* Tier pills */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          {tierOrder.map((key) => {
            const t = tiers[key];
            const isActive = activeTier === key;
            return (
              <button
                key={key}
                onClick={() => { setActiveTier(key); setActiveMonth(0); }}
                style={{
                  flex: 1,
                  padding: "0.6rem 0.5rem",
                  borderRadius: "10px",
                  border: `1px solid ${isActive ? t.color : "rgba(245,245,240,0.1)"}`,
                  background: isActive ? `${t.color}10` : "transparent",
                  color: isActive ? t.color : "#888",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {t.name}
              </button>
            );
          })}
        </div>

        <div style={{ background: "#1a1a1a", borderRadius: "12px", border: `1px solid ${tier.color}20`, padding: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: tier.color }}>{tier.name}</div>
          </div>

          {[
            { step: "1", label: "Setup", detail: `${tier.setup} one-time — agent live in 48h` },
            { step: "2", label: "Usage", detail: "Agent handles conversations 24/7" },
            { step: "3", label: "Auto-Pay", detail: `Monthly bill at ${tier.perConvo}/conversation` },
          ].map((s, i) => (
            <div key={s.step} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.75rem 0", borderBottom: i < 2 ? "1px solid rgba(245,245,240,0.06)" : "none" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: `${tier.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.65rem", fontWeight: 700, color: tier.color, fontFamily: "'Space Mono', monospace" }}>{s.step}</div>
              <div>
                <div style={{ fontSize: "0.8rem", color: "#f5f5f0", fontWeight: 600 }}>{s.label}</div>
                <div style={{ fontSize: "0.7rem", color: "#888", marginTop: "0.15rem" }}>{s.detail}</div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "1rem", padding: "1rem", background: `${tier.color}08`, borderRadius: "10px", border: `1px solid ${tier.color}25` }}>
            <div style={{ fontSize: "0.6rem", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.3rem" }}>Example Month</div>
            <div style={{ fontSize: "0.75rem", color: "#888" }}>340 conversations → <span style={{ color: tier.color, fontWeight: 700 }}>{getUsageData(tier)[1].total}</span></div>
            <div style={{ fontSize: "0.6rem", color: "#555", marginTop: "0.2rem" }}>vs $300/mo flat SaaS</div>
          </div>

          <a
            href="/discovery-call"
            style={{
              display: "block",
              marginTop: "1rem",
              padding: "0.9rem",
              background: tier.color,
              color: "#0a0a0a",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "0.85rem",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            Get Your Agent
          </a>
        </div>
      </div>

      <style>{`
        @keyframes utilFadeIn {
          from { opacity: 0; transform: translateY(6px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes utilRowSlide {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 768px) {
          .utility-desktop { display: none !important; }
          .utility-mobile { display: block !important; }
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
  textAlign: "center",
};

const titleStyle: React.CSSProperties = {
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-2px",
  maxWidth: "700px",
  margin: "0 auto",
  textAlign: "center",
};

const subStyle: React.CSSProperties = {
  fontSize: "clamp(1rem, 2vw, 1.15rem)",
  fontWeight: 300,
  color: "#888",
  marginTop: "1.5rem",
  lineHeight: 1.7,
  maxWidth: "600px",
  margin: "1.5rem auto 0",
  textAlign: "center",
};
