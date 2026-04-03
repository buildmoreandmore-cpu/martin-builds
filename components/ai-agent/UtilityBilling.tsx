"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "../ScrollReveal";

/*
  Animated utility billing demo.
  Shows: setup fee → agent goes live → usage meter ticks → monthly bill generated.
  Compares flat SaaS pricing vs pay-for-what-you-use.
*/

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const USAGE_DATA = [
  { month: "Jan", conversations: 120, tokens: "82K", tokenCost: "$1.64", margin: "$4.92", total: "$6.56" },
  { month: "Feb", conversations: 340, tokens: "228K", tokenCost: "$4.56", margin: "$13.68", total: "$18.24" },
  { month: "Mar", conversations: 580, tokens: "412K", tokenCost: "$8.24", margin: "$24.72", total: "$32.96" },
  { month: "Apr", conversations: 890, tokens: "634K", tokenCost: "$12.68", margin: "$38.04", total: "$50.72" },
  { month: "May", conversations: 1240, tokens: "892K", tokenCost: "$17.84", margin: "$53.52", total: "$71.36" },
  { month: "Jun", conversations: 1680, tokens: "1.2M", tokenCost: "$24.00", margin: "$72.00", total: "$96.00" },
];

// What they'd pay with flat SaaS
const FLAT_MONTHLY = 300;

export default function UtilityBilling() {
  const [activeMonth, setActiveMonth] = useState(0);
  const [meterValue, setMeterValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [autoCycle, setAutoCycle] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection observer
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle months
  useEffect(() => {
    if (!isVisible || !autoCycle) return;
    const interval = setInterval(() => {
      setActiveMonth(m => (m + 1) % MONTHS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isVisible, autoCycle]);

  // Animate meter
  useEffect(() => {
    const target = USAGE_DATA[activeMonth].conversations;
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
  }, [activeMonth]);

  const data = USAGE_DATA[activeMonth];
  const flatTotal = FLAT_MONTHLY;
  const utilityTotal = parseFloat(data.total.replace("$", ""));
  const savings = flatTotal - utilityTotal;
  const savingsPct = Math.round((savings / flatTotal) * 100);
  const meterPct = Math.min((meterValue / 2000) * 100, 100);

  return (
    <section ref={ref} style={{ padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)", background: "#0a0a0a", borderTop: "1px solid rgba(200,255,0,0.08)" }}>
      <ScrollReveal>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={tagStyle}>How Billing Works</p>
          <h2 style={titleStyle}>
            Pay for what you use.
            <br />
            <span style={{ color: "#c8ff00" }}>Like a utility bill.</span>
          </h2>
          <p style={subStyle}>
            One-time setup fee to build and deploy your agent. After that, you only pay for actual usage — tokens in, tokens out. No flat monthly fee eating into your margins on slow months.
          </p>
        </div>
      </ScrollReveal>

      <div className="utility-desktop" style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Setup fee callout */}
        <ScrollReveal>
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "200px", padding: "1.5rem", background: "#1a1a1a", borderRadius: "16px", border: "1px solid rgba(200,255,0,0.15)" }}>
              <div style={{ fontSize: "0.65rem", color: "#c8ff00", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.5rem" }}>One-Time Setup</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#c8ff00" }}>$500</div>
              <p style={{ fontSize: "0.8rem", color: "#888", marginTop: "0.5rem", lineHeight: 1.5 }}>
                Custom-trained agent, deployed on your site, connected to your tools. Live in 48 hours.
              </p>
            </div>
            <div style={{ flex: 1, minWidth: "200px", padding: "1.5rem", background: "#1a1a1a", borderRadius: "16px", border: "1px solid rgba(245,245,240,0.06)" }}>
              <div style={{ fontSize: "0.65rem", color: "#888", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.5rem" }}>Monthly Usage</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#f5f5f0" }}>Token Cost + Margin</div>
              <p style={{ fontSize: "0.8rem", color: "#888", marginTop: "0.5rem", lineHeight: 1.5 }}>
                You pay the actual AI cost plus a transparent margin. Scales with your business.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Interactive billing demo */}
        <div
          style={{
            background: "#1a1a1a",
            borderRadius: "16px",
            border: "1px solid rgba(200,255,0,0.12)",
            overflow: "hidden",
          }}
          onMouseEnter={() => setAutoCycle(false)}
          onMouseLeave={() => setAutoCycle(true)}
        >
          {/* Month selector */}
          <div style={{ display: "flex", borderBottom: "1px solid rgba(200,255,0,0.06)", padding: "0 1rem" }}>
            {MONTHS.map((m, i) => (
              <button
                key={m}
                onClick={() => { setActiveMonth(i); setAutoCycle(false); }}
                style={{
                  flex: 1,
                  padding: "0.75rem 0.5rem",
                  background: "transparent",
                  border: "none",
                  borderBottom: i === activeMonth ? "2px solid #c8ff00" : "2px solid transparent",
                  color: i === activeMonth ? "#c8ff00" : "#555",
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
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#c8ff00", fontFamily: "'Space Mono', monospace" }}>
                  {meterValue.toLocaleString()} conversations
                </div>
              </div>
              <div style={{ height: "12px", background: "rgba(245,245,240,0.06)", borderRadius: "6px", overflow: "hidden", position: "relative" }}>
                <div
                  style={{
                    width: `${meterPct}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, rgba(200,255,0,0.4), #c8ff00)",
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
                    background: "#c8ff00",
                    borderRadius: "2px",
                    boxShadow: "0 0 8px rgba(200,255,0,0.4)",
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
              key={activeMonth}
              style={{ animation: "utilFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div style={{ fontSize: "0.65rem", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>
                {data.month} Invoice Breakdown
              </div>

              <div style={{ background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)", overflow: "hidden" }}>
                {[
                  { label: "Conversations", value: data.conversations.toLocaleString(), detail: `${data.tokens} tokens processed` },
                  { label: "Token Cost (AI processing)", value: data.tokenCost, detail: "MiniMax-Text-01 @ $0.02/1K tokens" },
                  { label: "Service Margin (3x)", value: data.margin, detail: "Infrastructure, monitoring, support" },
                ].map((row, i) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.85rem 1.25rem",
                      borderBottom: i < 2 ? "1px solid rgba(245,245,240,0.04)" : "none",
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", background: "rgba(200,255,0,0.04)", borderTop: "1px solid rgba(200,255,0,0.1)" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#c8ff00" }}>Monthly Total</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#c8ff00", fontFamily: "'Space Mono', monospace" }}>{data.total}</div>
                </div>
              </div>
            </div>

            {/* Comparison */}
            <div style={{ marginTop: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ padding: "1.25rem", borderRadius: "12px", background: "rgba(255,107,107,0.04)", border: "1px solid rgba(255,107,107,0.1)" }}>
                <div style={{ fontSize: "0.6rem", color: "#ff6b6b", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.3rem" }}>Flat SaaS Plan</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#ff6b6b", fontFamily: "'Space Mono', monospace", textDecoration: "line-through", opacity: 0.7 }}>${FLAT_MONTHLY}</div>
                <div style={{ fontSize: "0.65rem", color: "#888", marginTop: "0.2rem" }}>Same price whether you use it or not</div>
              </div>
              <div style={{ padding: "1.25rem", borderRadius: "12px", background: "rgba(200,255,0,0.04)", border: "1px solid rgba(200,255,0,0.15)" }}>
                <div style={{ fontSize: "0.6rem", color: "#c8ff00", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.3rem" }}>Your Utility Bill</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#c8ff00", fontFamily: "'Space Mono', monospace" }}>{data.total}</div>
                <div style={{ fontSize: "0.65rem", color: "#c8ff00", marginTop: "0.2rem" }}>
                  {savings > 0 ? `Save $${savings.toFixed(0)}/mo (${savingsPct}% less)` : `Scales with growth — only ${savingsPct > 0 ? "" : ""}$${Math.abs(savings).toFixed(0)} more at ${data.conversations.toLocaleString()} convos`}
                </div>
              </div>
            </div>

            {/* Growth chart */}
            <div style={{ marginTop: "1.5rem", background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)", padding: "1.25rem" }}>
              <div style={{ fontSize: "0.65rem", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>
                Cost Comparison Over 6 Months
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "100px" }}>
                {USAGE_DATA.map((d, i) => {
                  const utilHeight = (parseFloat(d.total.replace("$", "")) / FLAT_MONTHLY) * 100;
                  const isActive = i === activeMonth;
                  return (
                    <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      {/* Flat line */}
                      <div style={{ position: "relative", width: "100%", display: "flex", gap: "3px", alignItems: "flex-end", height: "100px" }}>
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
                            background: isActive ? "#c8ff00" : "rgba(200,255,0,0.15)",
                            borderRadius: "3px 3px 0 0",
                            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                            ...(isActive ? { boxShadow: "0 0 8px rgba(200,255,0,0.15)" } : {}),
                          }}
                        />
                      </div>
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
                  <span style={{ fontSize: "0.6rem", color: "#888" }}>Flat $300/mo</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <div style={{ width: "10px", height: "10px", background: "rgba(200,255,0,0.3)", borderRadius: "2px" }} />
                  <span style={{ fontSize: "0.6rem", color: "#888" }}>Your actual cost</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.6, maxWidth: "550px", margin: "0 auto" }}>
            Low usage months? Low bill. Growth months? Your agent scales with you. No penalties, no overage charges — just transparent, honest pricing.
          </p>
          <a
            href="/discovery-call"
            style={{
              display: "inline-block",
              marginTop: "1.5rem",
              color: "#c8ff00",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => { const arrow = e.currentTarget.querySelector("span"); if (arrow) (arrow as HTMLSpanElement).style.transform = "translateX(3px)"; }}
            onMouseLeave={e => { const arrow = e.currentTarget.querySelector("span"); if (arrow) (arrow as HTMLSpanElement).style.transform = "translateX(0)"; }}
          >
            See what your agent would cost →{" "}
            <span style={{ transition: "transform 0.3s", display: "inline-block" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </a>
        </div>
      </div>

      {/* Mobile version */}
      <div className="utility-mobile" style={{ display: "none", maxWidth: "400px", margin: "0 auto" }}>
        <div style={{ background: "#1a1a1a", borderRadius: "12px", border: "1px solid rgba(200,255,0,0.12)", padding: "1.25rem" }}>
          <div style={{ fontSize: "0.65rem", color: "#c8ff00", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.75rem" }}>How It Works</div>

          {[
            { step: "1", label: "Setup", detail: "$500 one-time — your agent built & deployed" },
            { step: "2", label: "Usage", detail: "Your agent handles conversations 24/7" },
            { step: "3", label: "Bill", detail: "Monthly invoice for actual token usage + margin" },
          ].map((s, i) => (
            <div key={s.step} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.75rem 0", borderBottom: i < 2 ? "1px solid rgba(245,245,240,0.06)" : "none" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(200,255,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.65rem", fontWeight: 700, color: "#c8ff00", fontFamily: "'Space Mono', monospace" }}>{s.step}</div>
              <div>
                <div style={{ fontSize: "0.8rem", color: "#f5f5f0", fontWeight: 600 }}>{s.label}</div>
                <div style={{ fontSize: "0.7rem", color: "#888", marginTop: "0.15rem" }}>{s.detail}</div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "1rem", padding: "1rem", background: "rgba(200,255,0,0.04)", borderRadius: "10px", border: "1px solid rgba(200,255,0,0.15)" }}>
            <div style={{ fontSize: "0.6rem", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.3rem" }}>Example Month</div>
            <div style={{ fontSize: "0.75rem", color: "#888" }}>340 conversations → <span style={{ color: "#c8ff00", fontWeight: 700 }}>$18.24</span></div>
            <div style={{ fontSize: "0.6rem", color: "#555", marginTop: "0.2rem" }}>vs $300/mo flat → save 94%</div>
          </div>
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
  fontSize: "clamp(1rem, 2vw, 1.15rem)",
  fontWeight: 300,
  color: "#888",
  marginTop: "1.5rem",
  lineHeight: 1.7,
  maxWidth: "600px",
  margin: "1.5rem auto 0",
};
