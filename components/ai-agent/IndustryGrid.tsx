"use client";

import ScrollReveal from "../ScrollReveal";

const industries = [
  {
    icon: "🏥",
    name: "Healthcare & Dental",
    handles: "Insurance questions, appointment scheduling, new patient intake, office hours, provider availability",
    example: '"Do you accept Aetna? I need a cleaning and X-rays"',
  },
  {
    icon: "⚖",
    name: "Law Firms",
    handles: "Practice area questions, consultation booking, case intake, after-hours inquiries, fee structure",
    example: '"I need help with a commercial lease dispute, do you handle that?"',
  },
  {
    icon: "🔧",
    name: "Energy / HVAC / Solar",
    handles: "Service quoting, emergency scheduling, maintenance plan signups, equipment questions, seasonal promotions",
    example: '"My AC went out, can someone come today?"',
  },
  {
    icon: "🏠",
    name: "Real Estate & Property Management",
    handles: "Listing questions, showing scheduling, tenant maintenance requests, application status, availability",
    example: '"Is the 2-bedroom on Oak Street still available? Can I tour it Saturday?"',
  },
  {
    icon: "💰",
    name: "Financial Services & Insurance",
    handles: "Policy questions, claims intake, appointment booking, document requests, coverage inquiries",
    example: '"I need to file a claim for water damage at my property"',
  },
  {
    icon: "📊",
    name: "Professional Services",
    handles: "Service descriptions, consultation booking, pricing inquiries, onboarding questions, availability",
    example: '"What does your bookkeeping package include? Can we set up a call?"',
  },
];

export default function IndustryGrid() {
  return (
    <section style={{ padding: "clamp(5rem,8vw,8rem) 3rem", background: "#0a0a0a" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal>
          <p style={tagStyle}>WORKS FOR YOUR INDUSTRY</p>
        </ScrollReveal>
        <ScrollReveal>
          <h2 style={titleStyle}>
            Your customers are already asking these questions.
            <br />
            Your agent should be answering them.
          </h2>
        </ScrollReveal>

        <div className="industry-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginTop: "3rem" }}>
          {industries.map((ind) => (
            <ScrollReveal key={ind.name}>
              <div
                className="industry-card"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(245,245,240,0.06)",
                  borderRadius: "16px",
                  padding: "1.8rem",
                  transition: "all 0.4s",
                  height: "100%",
                }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(200,255,0,0.15)"; el.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(245,245,240,0.06)"; el.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{ind.icon}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f5f5f0", marginBottom: "0.6rem" }}>{ind.name}</h3>
                <p style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.6 }}>{ind.handles}</p>
                <div style={{
                  marginTop: "1rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(245,245,240,0.06)",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.72rem",
                  color: "#c8ff00",
                  opacity: 0.5,
                }}>
                  → {ind.example}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .industry-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .industry-grid { grid-template-columns: 1fr !important; }
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
  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
  fontWeight: 800,
  lineHeight: 1.2,
  letterSpacing: "-1px",
  maxWidth: "700px",
};
