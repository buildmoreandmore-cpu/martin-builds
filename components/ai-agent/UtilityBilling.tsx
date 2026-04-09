"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ScrollReveal from "../ScrollReveal";

/*
  Tiered AI agent billing — like choosing a carrier.
  Pick your tier (model quality), low setup, pay based on usage.
*/

type TierKey = "essential" | "professional" | "enterprise";

interface TierConfig {
  name: string;
  tagline: string;
  model: string;
  setup: string;
  perConvo: string;
  perConvoNum: number;
  monthlyCap: number;
  color: string;
  bestFor: string;
  features: string[];
}

const tiers: Record<TierKey, TierConfig> = {
  essential: {
    name: "Essential",
    tagline: "Reliable coverage for everyday conversations",
    model: "Claude Haiku 4.5",
    setup: "$49",
    perConvo: "$0.04",
    perConvoNum: 0.04,
    monthlyCap: 1000,
    color: "#c8ff00",
    bestFor: "FAQs, booking, basic support",
    features: [
      "AI agent trained on your business",
      "Website widget (one line of code)",
      "Lead capture & notifications",
      "Client and job management",
      "Dashboard login",
      "48-hour setup",
    ],
  },
  professional: {
    name: "Professional",
    tagline: "Smarter conversations that close deals",
    model: "Claude Haiku 4.5",
    setup: "$99",
    perConvo: "$0.12",
    perConvoNum: 0.12,
    monthlyCap: 1500,
    color: "#64b4ff",
    bestFor: "Lead qualifying, consultations, complex support",
    features: [
      "Everything in Essential",
      "Telegram bot — manage your business by text",
      "Smarter conversations",
      "CRM sync",
      "Priority email support",
    ],
  },
  enterprise: {
    name: "Enterprise",
    tagline: "Premium intelligence for high-value interactions",
    model: "Claude Sonnet 4.6",
    setup: "$149",
    perConvo: "$0.35",
    perConvoNum: 0.35,
    monthlyCap: 2000,
    color: "#b482ff",
    bestFor: "Sales, legal intake, consulting, high-stakes conversations",
    features: [
      "Everything in Professional",
      "Highest intelligence model",
      "Full conversation history",
      "Admin reporting",
      "Dedicated onboarding call",
      "Same-day support",
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
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const tier = tiers[activeTier];
  const usageData = getUsageData(tier);

  const [checkoutTier, setCheckoutTier] = useState<TierKey | null>(null);

  const handleCheckout = useCallback(async (plan: TierKey) => {
    setCheckoutLoading(true);
    setCheckoutTier(plan);
    try {
      const res = await fetch("/api/agent-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        setCheckoutLoading(false);
        setCheckoutTier(null);
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      setCheckoutLoading(false);
      setCheckoutTier(null);
    }
  }, []);

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
            Low setup fee. Pay based on actual usage. Pick the AI model that fits your business — upgrade or downgrade anytime.
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
                  <div
                    onClick={(e) => { e.stopPropagation(); setActiveTier(key); handleCheckout(key); }}
                    style={{
                      marginTop: "1rem",
                      padding: "0.6rem 0",
                      background: isActive ? t.color : "rgba(245,245,240,0.06)",
                      color: isActive ? "#0a0a0a" : "#888",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      textAlign: "center",
                      cursor: checkoutLoading ? "wait" : "pointer",
                      transition: "all 0.3s",
                      opacity: checkoutLoading ? 0.6 : 1,
                    }}
                  >
                    {checkoutLoading && checkoutTier === key ? "Loading..." : "Get Your Agent"}
                  </div>
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
              Pay as you go • Card on file • Cancel anytime
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
                  <span style={{ color: "#888", fontSize: "0.7rem" }}>Up to {tier.monthlyCap.toLocaleString()} conversations/month included</span>
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
            Low setup. Pay as you go. Upgrade your model anytime. No contracts, no overage charges — just your agent working 24/7 and a transparent bill at the end of the month.
          </p>
        </div>

        {/* Delivery methods */}
        <ScrollReveal>
          <div style={{ marginTop: "3.5rem", textAlign: "center" }}>
            <p style={tagStyle}>How Your Agent Gets Delivered</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem", maxWidth: "900px", margin: "1.5rem auto 0" }}>
            <div style={{ padding: "1.75rem", background: "#1a1a1a", borderRadius: "16px", border: "1px solid rgba(200,255,0,0.1)" }}>
              <div style={{ width: 44, height: 44, borderRadius: "12px", background: "rgba(200,255,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f5f5f0", marginBottom: "0.5rem" }}>Website Widget</h3>
              <p style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.6 }}>
                Drop one line of code on your site. Your agent goes live in 48 hours.
              </p>
            </div>
            <div style={{ padding: "1.75rem", background: "#1a1a1a", borderRadius: "16px", border: "1px solid rgba(100,180,255,0.12)" }}>
              <div style={{ width: 44, height: 44, borderRadius: "12px", background: "rgba(100,180,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64b4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f5f5f0", marginBottom: "0.5rem" }}>
                Telegram Bot <span style={{ fontSize: "0.65rem", color: "#64b4ff", fontWeight: 500 }}>Pro+</span>
              </h3>
              <p style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.6 }}>
                Text your agent like you text anyone else. Add clients, check stats, trigger follow-ups — from your phone, no login required.
              </p>
            </div>
            <div style={{ padding: "1.75rem", background: "#1a1a1a", borderRadius: "16px", border: "1px solid rgba(180,130,255,0.12)" }}>
              <div style={{ width: 44, height: 44, borderRadius: "12px", background: "rgba(180,130,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b482ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f5f5f0", marginBottom: "0.5rem" }}>Your Dashboard</h3>
              <p style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.6 }}>
                Log in anytime to see your data, update your agent&apos;s training, and review every conversation.
              </p>
            </div>
          </div>
        </ScrollReveal>
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

          <button
            onClick={() => handleCheckout(activeTier)}
            disabled={checkoutLoading}
            style={{
              display: "block",
              width: "100%",
              marginTop: "1rem",
              padding: "0.9rem",
              background: checkoutLoading ? "#666" : tier.color,
              color: "#0a0a0a",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "0.85rem",
              textAlign: "center",
              border: "none",
              cursor: checkoutLoading ? "wait" : "pointer",
              opacity: checkoutLoading ? 0.7 : 1,
            }}
          >
            {checkoutLoading ? "Loading..." : "Get Your Agent"}
          </button>
        </div>

        {/* Pricing footnote */}
        <div style={{ marginTop: "2.5rem", padding: "1.25rem 1.5rem", background: "rgba(245,245,240,0.02)", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "12px", maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>
          <p style={{ fontSize: "0.7rem", color: "#888", lineHeight: 1.7, margin: 0, textAlign: "center" }}>
            <span style={{ color: "#aaa", fontWeight: 600 }}>Fair-use note:</span> A conversation = up to 10 message exchanges. Each plan includes a generous monthly conversation cap. Heavy tool usage (CRM sync, custom integrations, dashboard queries) may count as additional conversations. Need more? We&apos;ll talk before any overage shows up on your bill — never a surprise charge.
          </p>
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
