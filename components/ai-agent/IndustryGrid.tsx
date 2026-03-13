"use client";

import ScrollReveal from "../ScrollReveal";

const HealthIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
const ScaleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 3h5v5" /><path d="M8 3H3v5" /><path d="M12 22V8" /><path d="M21 3l-9 9" /><path d="M3 3l9 9" />
  </svg>
);
const WrenchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const industries = [
  {
    icon: <HealthIcon />,
    name: "Healthcare & Dental",
    handles: "Insurance questions, appointment scheduling, new patient intake, office hours, provider availability",
    example: '"Do you accept Aetna? I need a cleaning and X-rays"',
  },
  {
    icon: <ScaleIcon />,
    name: "Law Firms",
    handles: "Practice area questions, consultation booking, case intake, after-hours inquiries, fee structure",
    example: '"I need help with a commercial lease dispute, do you handle that?"',
  },
  {
    icon: <WrenchIcon />,
    name: "Energy / HVAC / Solar",
    handles: "Service quoting, emergency scheduling, maintenance plan signups, equipment questions, seasonal promotions",
    example: '"My AC went out, can someone come today?"',
  },
  {
    icon: <HomeIcon />,
    name: "Real Estate & Property Management",
    handles: "Listing questions, showing scheduling, tenant maintenance requests, application status, availability",
    example: '"Is the 2-bedroom on Oak Street still available? Can I tour it Saturday?"',
  },
  {
    icon: <ShieldIcon />,
    name: "Financial Services & Insurance",
    handles: "Policy questions, claims intake, appointment booking, document requests, coverage inquiries",
    example: '"I need to file a claim for water damage at my property"',
  },
  {
    icon: <BriefcaseIcon />,
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
                <div style={{ width: "44px", height: "44px", background: "rgba(200,255,0,0.1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>{ind.icon}</div>
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
