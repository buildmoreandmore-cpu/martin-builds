"use client";

import { useState } from "react";
import ScrollReveal from "../ScrollReveal";

const faqs = [
  { q: "Is this just a basic chatbot?", a: "No. Basic chatbots follow scripts. Your AI agent is trained on your actual business data and can handle conversations it's never seen before. It understands context, follows up naturally, and gets smarter over time." },
  { q: "What if it says something wrong?", a: "The agent is trained with guardrails — it only answers based on the information you provide. If it doesn't know something, it says so and offers to connect the customer with you directly. No hallucinations, no made-up answers." },
  { q: "Will it match my brand?", a: "Completely. Your colors, your logo, your tone of voice. It looks and feels like part of your site, not a third-party widget. Your customers won't know it's AI — they'll just think your support is incredibly fast." },
  { q: "How do I get the leads it captures?", a: "Starter plan sends you an email notification for every lead. Pro plan integrates directly with your CRM, Google Sheets, or whatever tool you use. You'll never miss a lead again." },
  { q: "Can I cancel anytime?", a: "Yes. Month-to-month. No contracts, no cancellation fees. If the agent isn't delivering value, you can pause or cancel with one email. But nobody has yet." },
  { q: "Do I need a website from you to use this?", a: "No. The agent works on any website — WordPress, Shopify, Squarespace, custom-built, anything. It's a single script tag that drops into your existing site." },
];

export default function AgentFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ padding: "6rem 3rem", maxWidth: "800px", margin: "0 auto" }}>
      <ScrollReveal><p style={tag}>Questions</p></ScrollReveal>
      <ScrollReveal><h2 style={{ ...title, marginBottom: "2.5rem" }}>Before you ask...</h2></ScrollReveal>

      {faqs.map((faq, i) => (
        <ScrollReveal key={i}>
          <div style={{ borderBottom: "1px solid rgba(245,245,240,0.06)" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              style={{ width: "100%", background: "none", border: "none", color: open === i ? "#c8ff00" : "#f5f5f0", fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", fontWeight: 600, textAlign: "left", padding: "1.3rem 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", transition: "color 0.2s" }}
            >
              {faq.q}
              <span style={{ fontSize: "1.4rem", color: open === i ? "#c8ff00" : "#888", transform: open === i ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s, color 0.2s", flexShrink: 0, lineHeight: 1 }}>+</span>
            </button>
            <div style={{ maxHeight: open === i ? "300px" : "0", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
              <p style={{ fontSize: "0.95rem", color: "#888", lineHeight: 1.7, paddingBottom: "1.3rem", fontWeight: 300 }}>{faq.a}</p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </section>
  );
}

const tag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
const title: React.CSSProperties = { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "700px" };
