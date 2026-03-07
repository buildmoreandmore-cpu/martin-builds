"use client";

import { useState } from "react";
import ScrollReveal from "../ScrollReveal";

const faqs = [
  {
    question: "Is this just a chatbot?",
    answer: "No. Chatbots answer questions. AI employees do work — they send emails, book meetings, follow up on invoices, update your CRM. They take action, not just respond."
  },
  {
    question: "What tools does it integrate with?",
    answer: "Gmail, Outlook, Google Calendar, Slack, HubSpot, Salesforce, QuickBooks, Stripe, Shopify, and more. If it has an API, we can connect it."
  },
  {
    question: "What if it makes a mistake?", 
    answer: "Your agent has guardrails. Critical actions (sending money, deleting data) always require your approval. For everything else, you get a daily summary of everything it handled."
  },
  {
    question: "How is this different from hiring a VA?",
    answer: "A VA works 8 hours, needs training, takes PTO, and handles one thing at a time. Your AI agent works 24/7, learns instantly, never forgets, and costs a fraction of a hire."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. Month-to-month. No contracts. If it's not delivering value, cancel with one email."
  },
  {
    question: "What industries do you work with?",
    answer: "Any. We've built agents for restaurants, law firms, contractors, e-commerce, real estate, agencies, and more. If you run a business, we can build an agent for it."
  }
];

export default function AgentFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{ padding: "6rem 3rem", maxWidth: "800px", margin: "0 auto" }}>
      <ScrollReveal>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Frequently Asked Questions
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-2px" }}>
            Everything you need to know
          </h2>
        </div>
      </ScrollReveal>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {faqs.map((faq, index) => (
          <ScrollReveal key={index}>
            <div
              style={{
                background: "#1a1a1a",
                border: "1px solid rgba(245,245,240,0.06)",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "all 0.3s"
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                style={{
                  width: "100%",
                  padding: "1.5rem 2rem",
                  background: "transparent",
                  border: "none",
                  color: "#f5f5f0",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "color 0.3s"
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#c8ff00";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = openIndex === index ? "#c8ff00" : "#f5f5f0";
                }}
              >
                <span>{faq.question}</span>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.3s"
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </div>
              </button>
              
              <div
                style={{
                  maxHeight: openIndex === index ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease-in-out"
                }}
              >
                <div style={{ padding: "0 2rem 1.5rem 2rem", fontSize: "1rem", color: "#888", lineHeight: 1.6 }}>
                  {faq.answer}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div style={{ textAlign: "center", marginTop: "3rem", padding: "2rem", background: "rgba(200,255,0,0.03)", borderRadius: "16px" }}>
          <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
            Still have questions?
          </p>
          <a 
            href="/contact"
            style={{
              display: "inline-block",
              padding: "0.75rem 2rem",
              background: "#c8ff00",
              color: "#0a0a0a",
              borderRadius: "8px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(200,255,0,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Get in touch
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}