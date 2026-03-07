"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "../ScrollReveal";

type Message = {
  role: "user" | "agent";
  content: string;
  timestamp?: string;
};

const quickQuestions = [
  { label: "What can you do?", key: "capabilities" },
  { label: "How much does it cost?", key: "pricing" },
  { label: "How fast can you start?", key: "speed" },
  { label: "Is this a chatbot?", key: "notbot" },
];

const responses: Record<string, string> = {
  capabilities: "I handle the repetitive work that eats your day — emails, scheduling, lead follow-ups, invoicing, CRM updates, customer support, and reporting. Think of me as a full-time employee who never sleeps, never forgets, and costs a fraction of a hire.",
  pricing: "Plans start at $300/month for a Starter Agent (one core workflow, up to 500 tasks). The Pro Agent is $500/month — unlimited tasks, multiple workflows, integrations with all your tools. No contracts, cancel anytime.",
  speed: "Most clients are live within 48 hours. We scope your needs, build and train your agent on your business, you test it, and then it starts working. Simple as that.",
  notbot: "Not even close. Chatbots answer questions. I do work — I send emails, book meetings, chase invoices, update your CRM, generate reports. I take action across your tools, not just respond in a chat window.",
};

export default function DemoChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState<string[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  // Initial animated entrance
  useEffect(() => {
    const t1 = setTimeout(() => setShowTyping(true), 300);
    const t2 = setTimeout(() => {
      setShowTyping(false);
      setMessages([{
        role: "agent",
        content: "Hi there! I'm an AI employee demo. Ask me anything about what I can do for your business.",
        timestamp: "Now"
      }]);
      setInitialLoaded(true);
      setActiveQuestions(quickQuestions.map(q => q.key));
    }, 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, showTyping]);

  const handleQuestion = (key: string) => {
    const q = quickQuestions.find(qq => qq.key === key);
    if (!q) return;

    const userMsg: Message = { role: "user", content: q.label, timestamp: "Now" };
    setMessages(prev => [...prev, userMsg]);
    setActiveQuestions(prev => prev.filter(k => k !== key));
    setShowTyping(true);

    setTimeout(() => {
      setShowTyping(false);
      setMessages(prev => [...prev, { role: "agent", content: responses[key], timestamp: "Now" }]);
    }, 1000 + Math.random() * 500);
  };

  return (
    <section id="demo-section" className="demo-section" style={{ padding: "6rem 3rem" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1rem" }}>Try It</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, letterSpacing: "-1px" }}>Ask the agent anything</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(245,245,240,0.06)" }}>
            {/* Header */}
            <div style={{ background: "#1a1a1a", padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(245,245,240,0.06)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: "10px", height: "10px", background: "#c8ff00", borderRadius: "50%", animation: "demoPulse 2s infinite" }} />
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#f5f5f0" }}>AI Employee Demo — <span style={{ color: "#c8ff00" }}>Online now</span></div>
                <div style={{ fontSize: "0.75rem", color: "#666", fontFamily: "'Space Mono', monospace" }}>Interactive preview</div>
              </div>
            </div>

            {/* Messages */}
            <div ref={chatRef} style={{ background: "#1a1a1a", minHeight: "340px", maxHeight: "440px", overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: "flex", flexDirection: msg.role === "user" ? "row-reverse" : "row", gap: "0.6rem", alignItems: "flex-start", animation: "demoFadeSlideUp 0.4s ease-out forwards" }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: msg.role === "agent" ? "rgba(200,255,0,0.15)" : "rgba(245,245,240,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {msg.role === "agent" ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    )}
                  </div>
                  <div style={{
                    background: msg.role === "agent" ? "rgba(200,255,0,0.08)" : "rgba(245,245,240,0.05)",
                    padding: "0.75rem 1rem",
                    borderRadius: msg.role === "agent" ? "14px 14px 14px 4px" : "14px 14px 4px 14px",
                    maxWidth: "82%",
                    fontSize: "0.88rem",
                    lineHeight: 1.55,
                    color: msg.role === "agent" ? "#f5f5f0" : "#ccc"
                  }}>
                    {msg.content}
                    <div style={{ fontSize: "0.7rem", color: "#555", marginTop: "0.4rem", fontFamily: "'Space Mono', monospace" }}>{msg.timestamp}</div>
                  </div>
                </div>
              ))}

              {showTyping && (
                <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", animation: "demoFadeSlideUp 0.3s ease-out forwards" }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(200,255,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>
                  </div>
                  <div style={{ background: "rgba(200,255,0,0.08)", padding: "0.75rem 1rem", borderRadius: "14px", display: "flex", gap: "5px", alignItems: "center" }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#c8ff00", display: "inline-block", animation: "demoTypingDot 1s infinite 0s" }} />
                    <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#c8ff00", display: "inline-block", animation: "demoTypingDot 1s infinite 0.2s" }} />
                    <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#c8ff00", display: "inline-block", animation: "demoTypingDot 1s infinite 0.4s" }} />
                  </div>
                </div>
              )}

              {initialLoaded && activeQuestions.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem", animation: "demoFadeSlideUp 0.4s ease-out forwards" }}>
                  {activeQuestions.map((key) => {
                    const q = quickQuestions.find(qq => qq.key === key);
                    return q ? (
                      <button key={key} onClick={() => handleQuestion(key)} style={{ background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.3)", color: "#c8ff00", padding: "0.5rem 1rem", borderRadius: "20px", fontSize: "0.8rem", cursor: "pointer", transition: "all 0.2s", fontWeight: 600 }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,255,0,0.2)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,255,0,0.1)"; }}
                      >{q.label}</button>
                    ) : null;
                  })}
                </div>
              )}
            </div>

            {/* Input */}
            <div style={{ background: "#1a1a1a", padding: "1rem 1.5rem", borderTop: "1px solid rgba(245,245,240,0.06)" }}>
              <div style={{ display: "flex", gap: "0.75rem", padding: "0.6rem 1rem", background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)" }}>
                <input type="text" placeholder="Click a question above to try..." disabled style={{ flex: 1, background: "transparent", border: "none", color: "#666", fontSize: "0.85rem", outline: "none" }} />
                <div style={{ width: "30px", height: "30px", background: "rgba(200,255,0,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9 22,2"/></svg>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @keyframes demoFadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes demoTypingDot {
          0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
          30% { opacity: 1; transform: scale(1); }
        }
        @keyframes demoPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 480px) {
          .demo-section { padding: 3rem 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}
