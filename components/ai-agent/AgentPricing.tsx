"use client";

import ScrollReveal from "../ScrollReveal";

const plans = [
  {
    featured: false,
    name: "Starter Agent",
    price: "$300",
    period: "/mo",
    desc: "Perfect for small businesses that need 24/7 customer support without hiring someone.",
    includes: [
      "Custom-trained on your business",
      "Up to 500 conversations/month",
      "Lead capture + email notifications",
      "Branded to match your site",
      "48-hour setup",
      "Monthly performance report",
    ],
    cta: "Get Started",
  },
  {
    featured: true,
    name: "Pro Agent",
    price: "$500",
    period: "/mo",
    desc: "For businesses that want the full package — booking, CRM integration, and smarter AI.",
    includes: [
      "Everything in Starter",
      "Unlimited conversations",
      "Calendar booking integration",
      "CRM / email tool integration",
      "Weekly AI training updates",
      "Priority support",
      "Multi-language support",
    ],
    cta: "Get the Pro Agent",
  },
];

export default function AgentPricing() {
  return (
    <section id="pricing" style={{ padding: "6rem 3rem", maxWidth: "1200px", margin: "0 auto" }}>
      <ScrollReveal><p style={tag}>Pricing</p></ScrollReveal>
      <ScrollReveal><h2 style={title}>Cheaper than a part-time employee. Smarter than a contact form.</h2></ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginTop: "3rem", alignItems: "start" }}>
        {plans.map((plan) => (
          <ScrollReveal key={plan.name}>
            <div
              style={{
                background: plan.featured ? "linear-gradient(180deg, rgba(200,255,0,0.04) 0%, #1a1a1a 100%)" : "#1a1a1a",
                border: `1px solid ${plan.featured ? "#c8ff00" : "rgba(245,245,240,0.06)"}`,
                borderRadius: "16px",
                padding: "2.5rem",
                position: "relative",
                transition: "border-color 0.4s",
              }}
              onMouseEnter={(e) => { if (!plan.featured) (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,255,0,0.15)"; }}
              onMouseLeave={(e) => { if (!plan.featured) (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,245,240,0.06)"; }}
            >
              {plan.featured && (
                <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#c8ff00", color: "#0a0a0a", fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "1.5px", padding: "0.3rem 1rem", borderRadius: "100px", whiteSpace: "nowrap" }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>{plan.name}</div>
              <div style={{ fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1 }}>
                {plan.price}<span style={{ fontSize: "0.9rem", fontWeight: 400, color: "#888" }}>{plan.period}</span>
              </div>
              <p style={{ fontSize: "0.9rem", color: "#888", margin: "1rem 0 1.5rem", lineHeight: 1.5 }}>{plan.desc}</p>
              <ul style={{ listStyle: "none", marginBottom: "2rem", display: "flex", flexDirection: "column" }}>
                {plan.includes.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", padding: "0.45rem 0", fontSize: "0.9rem", color: "rgba(245,245,240,0.8)" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
                      <circle cx="8" cy="8" r="7.5" stroke="rgba(200,255,0,0.3)" />
                      <path d="M5 8L7 10.5L11 5.5" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:francis@martin.builds"
                style={{
                  display: "block",
                  textAlign: "center",
                  width: "100%",
                  padding: "0.9rem",
                  borderRadius: "100px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  background: plan.featured ? "#c8ff00" : "transparent",
                  color: plan.featured ? "#0a0a0a" : "#f5f5f0",
                  border: plan.featured ? "none" : "1px solid rgba(245,245,240,0.2)",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  if (plan.featured) { el.style.boxShadow = "0 6px 25px rgba(200,255,0,0.25)"; el.style.transform = "translateY(-2px)"; }
                  else { el.style.borderColor = "#c8ff00"; el.style.color = "#c8ff00"; }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.boxShadow = "none"; el.style.transform = "translateY(0)";
                  if (!plan.featured) { el.style.borderColor = "rgba(245,245,240,0.2)"; el.style.color = "#f5f5f0"; }
                }}
              >
                {plan.cta}
              </a>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

const tag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
const title: React.CSSProperties = { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "700px" };
