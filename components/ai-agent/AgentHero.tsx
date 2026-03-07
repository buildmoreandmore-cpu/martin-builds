"use client";

import { useState, useEffect } from "react";

const chatMessages = [
  { role: "agent" as const, text: "Good morning! While you slept, I handled 12 tasks.", delay: 500 },
  { role: "agent" as const, text: "Replied to 3 client emails", delay: 2000, arrow: true },
  { role: "agent" as const, text: "Scheduled 2 meetings for today", delay: 2500, arrow: true },
  { role: "agent" as const, text: "Flagged an overdue invoice — $4,200 from Apex Corp", delay: 3000, arrow: true },
  { role: "agent" as const, text: "Want me to send a follow-up on that invoice?", delay: 4000 },
];

export default function AgentHero() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    chatMessages.forEach((msg, i) => {
      // Show typing indicator before each message
      timers.push(setTimeout(() => setShowTyping(true), msg.delay - 400));
      timers.push(setTimeout(() => {
        setShowTyping(false);
        setVisibleCount(i + 1);
      }, msg.delay));
    });

    timers.push(setTimeout(() => setShowButtons(true), 4500));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "8rem 3rem 4rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(200,255,0,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "3rem", alignItems: "center", maxWidth: "1200px", margin: "0 auto", width: "100%" }} className="agent-hero-grid">
        {/* Left */}
        <div>
          <div className="animate-fade-up-1" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            AI Employees That Actually Work
          </div>
          <h1 className="animate-fade-up-2" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-2px" }}>
            Hire an AI employee.{" "}
            <span style={{ color: "#c8ff00" }}>It starts Monday</span>.
          </h1>
          <p className="animate-fade-up-3" style={{ fontSize: "1.1rem", fontWeight: 300, color: "#888", marginTop: "1.5rem", lineHeight: 1.7, maxWidth: "500px" }}>
            Not a chatbot. Not a dashboard. A trained AI employee that handles the work you don't have time for — emails, scheduling, follow-ups, reporting, and more. Custom-built for your business.
          </p>
          <div className="animate-fade-up-4" style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
            <a
              href="#cta"
              style={{ display: "inline-block", padding: "1rem 2.5rem", background: "#c8ff00", color: "#0a0a0a", borderRadius: "100px", fontWeight: 700, fontSize: "1rem", transition: "all 0.3s", textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
            >
              Tell Us What You Need
            </a>
            <a
              href="#use-cases"
              style={{ display: "inline-block", padding: "1rem 2.5rem", background: "transparent", color: "#f5f5f0", borderRadius: "100px", fontWeight: 600, fontSize: "1rem", border: "1px solid rgba(245,245,240,0.2)", transition: "all 0.3s", textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#c8ff00"; (e.currentTarget as HTMLAnchorElement).style.color = "#c8ff00"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,245,240,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0"; }}
            >
              See What They Can Do
            </a>
          </div>
          <p className="animate-fade-up-4" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.85rem", color: "#888", marginTop: "1rem" }}>
            Starting at <strong style={{ color: "#c8ff00", fontSize: "1.1rem" }}>$300/month</strong> &mdash; cancel anytime
          </p>
        </div>

        {/* Right: Live Chat Demo */}
        <div className="animate-fade-up-3" style={{ maxWidth: "460px", width: "100%" }}>
          {/* Chat Header */}
          <div style={{ background: "#1a1a1a", borderRadius: "16px 16px 0 0", padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(245,245,240,0.06)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "10px", height: "10px", background: "#c8ff00", borderRadius: "50%", animation: "heroPulse 2s infinite" }} />
            <div>
              <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#f5f5f0" }}>
                Your AI Employee — <span style={{ color: "#c8ff00" }}>Online now</span>
              </div>
              <div style={{ fontSize: "0.75rem", color: "#666", fontFamily: "'Space Mono', monospace" }}>Handling tasks 24/7</div>
            </div>
          </div>

          {/* Chat Body */}
          <div style={{ background: "#1a1a1a", padding: "1.5rem", minHeight: "320px", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {chatMessages.slice(0, visibleCount).map((msg, i) => (
              <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", animation: "heroFadeSlideUp 0.4s ease-out forwards" }}>
                {i === 0 && (
                  <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(200,255,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>
                  </div>
                )}
                {i !== 0 && <div style={{ width: "30px", flexShrink: 0 }} />}
                <div style={{ background: "rgba(200,255,0,0.08)", padding: "0.7rem 1rem", borderRadius: "14px", maxWidth: "88%", fontSize: "0.88rem", lineHeight: 1.5, color: "#f5f5f0" }}>
                  {msg.arrow && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2.5" style={{ marginRight: "6px", verticalAlign: "middle" }}><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  )}
                  {msg.text}
                  {i === 0 && (
                    <div style={{ fontSize: "0.7rem", color: "#555", marginTop: "0.4rem", fontFamily: "'Space Mono', monospace" }}>9:23 AM</div>
                  )}
                </div>
              </div>
            ))}

            {showTyping && (
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                <div style={{ width: "30px", flexShrink: 0 }} />
                <div style={{ background: "rgba(200,255,0,0.08)", padding: "0.7rem 1rem", borderRadius: "14px", display: "flex", gap: "4px", alignItems: "center" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8ff00", animation: "heroTypingDot 1s infinite 0s" }} />
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8ff00", animation: "heroTypingDot 1s infinite 0.2s" }} />
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8ff00", animation: "heroTypingDot 1s infinite 0.4s" }} />
                </div>
              </div>
            )}

            {showButtons && (
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", marginLeft: "36px", animation: "heroFadeSlideUp 0.4s ease-out forwards", flexWrap: "wrap" }}>
                {["Send it", "Show me the emails"].map((label) => (
                  <button key={label} style={{ background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.3)", color: "#c8ff00", padding: "0.5rem 1rem", borderRadius: "20px", fontSize: "0.8rem", cursor: "pointer", transition: "all 0.2s", fontWeight: 600 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,255,0,0.2)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,255,0,0.1)"; }}
                  >{label}</button>
                ))}
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <div style={{ background: "#1a1a1a", padding: "1rem 1.5rem", borderRadius: "0 0 16px 16px", borderTop: "1px solid rgba(245,245,240,0.06)" }}>
            <div style={{ display: "flex", gap: "0.75rem", padding: "0.6rem 1rem", background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)" }}>
              <input type="text" placeholder="Your AI employee is ready..." disabled style={{ flex: 1, background: "transparent", border: "none", color: "#666", fontSize: "0.85rem", outline: "none" }} />
              <div style={{ width: "30px", height: "30px", background: "rgba(200,255,0,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9 22,2"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroFadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroTypingDot {
          0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
          30% { opacity: 1; transform: scale(1); }
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 768px) {
          .agent-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
