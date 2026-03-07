"use client";

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
  return (
    <section id="pricing" style={{ padding: "6rem 3rem", background: "rgba(200,255,0,0.015)" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Pricing
            </p>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-2px", marginBottom: "1rem" }}>
              Hire your AI employee today
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#888", maxWidth: "600px", margin: "0 auto" }}>
              No contracts. No setup fees. Your agent starts working in 48 hours.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "stretch" }}>
          {plans.map((plan) => (
            <ScrollReveal key={plan.name}>
              <div
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
                  if (!plan.popular) {
                    el.style.borderColor = "rgba(200,255,0,0.15)";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0)";
                  if (!plan.popular) {
                    el.style.borderColor = "rgba(245,245,240,0.06)";
                  }
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#c8ff00",
                    color: "#0a0a0a",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    MOST POPULAR
                  </div>
                )}

                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                    {plan.name}
                  </h3>
                  <p style={{ color: "#888", fontSize: "0.95rem", lineHeight: 1.5 }}>
                    {plan.description}
                  </p>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                    <span style={{ fontSize: "3rem", fontWeight: 900, color: "#c8ff00" }}>
                      {plan.price}
                    </span>
                    <span style={{ fontSize: "1.1rem", color: "#888" }}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <div style={{ flex: 1, marginBottom: "2rem" }}>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {plan.features.map((feature, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                        <div style={{ 
                          width: "20px", 
                          height: "20px", 
                          background: "rgba(200,255,0,0.1)", 
                          borderRadius: "50%", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px"
                        }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2.5">
                            <polyline points="20,6 9,17 4,12"/>
                          </svg>
                        </div>
                        <span style={{ fontSize: "0.95rem", color: "#f5f5f0", lineHeight: 1.4 }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  style={{
                    width: "100%",
                    padding: "1.25rem 2rem",
                    background: plan.popular ? "#c8ff00" : "transparent",
                    color: plan.popular ? "#0a0a0a" : "#c8ff00",
                    border: plan.popular ? "none" : "2px solid rgba(200,255,0,0.3)",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    if (plan.popular) {
                      el.style.background = "rgba(200,255,0,0.9)";
                    } else {
                      el.style.background = "rgba(200,255,0,0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    if (plan.popular) {
                      el.style.background = "#c8ff00";
                    } else {
                      el.style.background = "transparent";
                    }
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div style={{ textAlign: "center", marginTop: "3rem", padding: "2rem", background: "rgba(200,255,0,0.03)", borderRadius: "16px" }}>
            <p style={{ fontSize: "0.9rem", color: "#888", marginBottom: "0.5rem" }}>
              Need something custom? Handling 50,000+ tasks per month?
            </p>
            <a 
              href="/contact"
              style={{ color: "#c8ff00", fontWeight: 600, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline"}
              onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none"}
            >
              Let's talk about Enterprise pricing →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}