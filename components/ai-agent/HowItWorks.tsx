"use client";

import ScrollReveal from "../ScrollReveal";

const steps = [
  {
    number: "1",
    title: "Tell us what you need",
    description: "What tasks eat your time? What falls through the cracks? We listen and scope the agent."
  },
  {
    number: "2", 
    title: "We build & train your agent",
    description: "Custom-trained on your business, your tools, your tone. Not a template — built from scratch."
  },
  {
    number: "3",
    title: "You review & approve", 
    description: "Test it. Try to break it. We refine until it handles everything your way."
  },
  {
    number: "4",
    title: "Your agent goes to work",
    description: "It starts handling tasks immediately. You get daily summaries of everything it did."
  }
];

export default function HowItWorks() {
  return (
    <section style={{ padding: "6rem 3rem", maxWidth: "1000px", margin: "0 auto" }}>
      <ScrollReveal>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            How It Works
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-2px" }}>
            From discovery call to working employee in 48 hours
          </h2>
        </div>
      </ScrollReveal>

      <div style={{ display: "grid", gap: "3rem" }}>
        {steps.map((step, i) => (
          <ScrollReveal key={step.number}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "2rem", alignItems: "center" }} className="how-it-works-step">
              <div style={{ 
                width: "60px", 
                height: "60px", 
                background: "rgba(200,255,0,0.1)", 
                borderRadius: "50%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                fontSize: "1.5rem", 
                fontWeight: 700,
                color: "#c8ff00",
                border: "2px solid rgba(200,255,0,0.2)"
              }}>
                {step.number}
              </div>
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "1rem", color: "#888", lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .how-it-works-step { grid-template-columns: 1fr !important; text-align: center; }
        }
      `}</style>
    </section>
  );
}