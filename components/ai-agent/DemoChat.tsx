"use client";

import { useState, useRef, useEffect } from "react";

const RESPONSES: Record<string, string> = {
  "what are your hours": "We're open Monday–Friday 6 AM to 8 PM, and weekends 7 AM to 6 PM. Our kitchen closes 30 minutes before closing. Anything else I can help with?",
  "do you have oat milk": "Yes! We have Oatly oat milk available for any drink — lattes, cappuccinos, iced coffee, you name it. No extra charge. Want to see our full drink menu?",
  "can i book for a group": "Absolutely! For groups of 10+, I'd recommend our back patio area. Let me grab a few details — what date and time were you thinking? I'll check availability and get you locked in.",
  "do you do catering": "We do! We offer coffee catering for events, meetings, and parties. Packages start at $150 for up to 25 people. Want me to send you our catering menu, or would you prefer to chat directly?",
};

const PROMPTS = [
  { label: "What are your hours?", q: "What are your hours?" },
  { label: "Do you have oat milk?", q: "Do you have oat milk?" },
  { label: "Book for a group", q: "Can I book for a group of 12?" },
  { label: "Catering?", q: "Do you do catering?" },
];

type Message = { text: string; isUser: boolean };

export default function DemoChat() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey! Welcome to Birdhouse Coffee. I can help with hours, menu, catering, or booking a table. What do you need?", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const getReply = (text: string) => {
    const lower = text.toLowerCase();
    const key = Object.keys(RESPONSES).find((k) => lower.includes(k.split(" ").slice(0, 3).join(" ")));
    return key ? RESPONSES[key] : "Great question! Let me look into that for you. In the meantime, you can reach us at hello@birdhousecoffee.com or I can have someone call you back. Want to leave your number?";
  };

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { text, isUser: true }]);
    setInput("");
    setShowPrompts(false);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { text: getReply(text), isUser: false }]);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div
      id="demo-section"
      style={{
        background: "#1a1a1a",
        border: "1px solid rgba(245,245,240,0.06)",
        borderRadius: "16px",
        overflow: "hidden",
        maxWidth: "420px",
        width: "100%",
        justifySelf: "end",
        animation: "fadeUp 0.8s 0.6s forwards",
        opacity: 0,
      }}
      className="demo-chat-widget"
    >
      {/* Header */}
      <div style={{ padding: "1rem 1.2rem", background: "#2a2a2a", borderBottom: "1px solid rgba(245,245,240,0.06)", display: "flex", alignItems: "center", gap: "0.8rem" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(200,255,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 700, color: "#c8ff00", flexShrink: 0 }}>
          AI
        </div>
        <div>
          <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>Birdhouse Coffee AI</div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "2px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8ff00", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "0.7rem", color: "#c8ff00" }}>Online now</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ padding: "1.2rem", minHeight: "260px", maxHeight: "260px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              maxWidth: "85%",
              padding: "0.7rem 1rem",
              borderRadius: "14px",
              fontSize: "0.88rem",
              lineHeight: 1.5,
              alignSelf: m.isUser ? "flex-end" : "flex-start",
              background: m.isUser ? "rgba(200,255,0,0.12)" : "#2a2a2a",
              borderBottomLeftRadius: m.isUser ? "14px" : "4px",
              borderBottomRightRadius: m.isUser ? "4px" : "14px",
              animation: "msgIn 0.35s forwards",
            }}
          >
            {m.text}
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", gap: "0.3rem", alignItems: "center", padding: "0.7rem 1rem", background: "#2a2a2a", borderRadius: "14px", borderBottomLeftRadius: "4px", alignSelf: "flex-start" }}>
            {[0, 150, 300].map((delay) => (
              <div key={delay} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#888", animation: `typingBounce 1.2s ${delay}ms infinite` }} />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Prompts */}
      {showPrompts && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", padding: "0 1rem 0.75rem", background: "#1a1a1a" }}>
          {PROMPTS.map((p) => (
            <button
              key={p.label}
              onClick={() => send(p.q)}
              style={{ padding: "0.4rem 0.8rem", background: "#2a2a2a", border: "1px solid rgba(245,245,240,0.08)", borderRadius: "100px", fontSize: "0.72rem", color: "#888", cursor: "pointer", fontFamily: "'Space Mono', monospace", transition: "all 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#c8ff00"; (e.currentTarget as HTMLButtonElement).style.color = "#c8ff00"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,245,240,0.08)"; (e.currentTarget as HTMLButtonElement).style.color = "#888"; }}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ display: "flex", gap: "0.5rem", padding: "0.8rem 1rem", borderTop: "1px solid rgba(245,245,240,0.06)", background: "#1a1a1a" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Type a message..."
          style={{ flex: 1, background: "#2a2a2a", border: "1px solid rgba(245,245,240,0.08)", borderRadius: "100px", padding: "0.6rem 1rem", color: "#f5f5f0", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", outline: "none", transition: "border-color 0.2s" }}
          onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "#c8ff00")}
          onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "rgba(245,245,240,0.08)")}
        />
        <button
          onClick={() => send(input)}
          style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#c8ff00", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "transform 0.2s" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 12V2M2 7l5-5 5 5" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes msgIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes typingBounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-5px); } }
        @media (max-width: 900px) { .demo-chat-widget { max-width: 100% !important; justify-self: center !important; } }
      `}</style>
    </div>
  );
}
