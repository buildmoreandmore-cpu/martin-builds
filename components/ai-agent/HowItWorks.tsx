"use client";

import ScrollReveal from "../ScrollReveal";

const steps = [
  { num: "01", title: "You send me your info", body: "Your website, your FAQ, your services, your tone of voice. I train the agent on everything your customers ask about." },
  { num: "02", title: "I build & train the agent", body: "Custom AI model trained specifically on your business. Not a generic chatbot — an agent that sounds like you." },
  { num: "03", title: "We test it together", body: "You try to stump it. We refine until it handles every question your customers actually ask." },
  { num: "04", title: "One line of code, you're live", body: "I give you a single script tag. Paste it on your site. Your AI agent is live and working in minutes." },
];

export default function HowItWorks() {
  return (
    <section style={{ padding: "6rem 3rem", background: "#1a1a1a" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal><p style={tag}>How It Works</p></ScrollReveal>
        <ScrollReveal><h2 style={title}>Live on your site in 48 hours.</h2></ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", marginTop: "3rem" }}>
          {steps.map((s) => (
            <ScrollReveal key={s.num}>
              <div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "3rem", fontWeight: 700, color: "rgba(200,255,0,0.1)", lineHeight: 1, marginBottom: "0.8rem" }}>{s.num}</div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>{s.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.6 }}>{s.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const tag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
const title: React.CSSProperties = { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "700px" };
