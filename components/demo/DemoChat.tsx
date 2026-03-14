"use client";

import { useState, useRef, useEffect } from "react";

interface DemoConfig {
  businessName: string;
  avatarInitials: string;
  industry: string;
  welcomeMessage: string;
  quickPrompts: { label: string; question: string }[];
  responses: Record<string, string>;
  fallback: string;
}

interface Message {
  role: "agent" | "user";
  text: string;
  buttons?: { label: string; href?: string; action?: string }[];
}

const CTA_APPEND = "\n\nBy the way — this is just the demo version. The full agent captures every lead, books appointments directly into your calendar, follows up automatically, and integrates with your existing tools. Want to see what the full setup looks like?";

const FALLBACK_VARIANTS = [
  (name: string) => `That's a great question! For the most specific answer, I'd recommend speaking with the team at ${name} directly. Want me to help you schedule that?`,
  (name: string) => `I want to make sure I give you accurate info on that. The team at ${name} can give you the details — would you like to book a quick call?`,
  (name: string) => `Good question. I don't have that specific detail right now, but I can connect you with someone at ${name} who does. Want to schedule a time?`,
  (name: string) => `I appreciate you asking! That's something the team at ${name} handles directly. Can I help you set up a time to chat with them?`,
  (name: string) => `Let me make sure you get the right answer on that. Would you like to schedule a consultation with ${name}? I can help with that right now.`,
];

export default function DemoChat({ config }: { config: DemoConfig }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "agent", text: config.welcomeMessage },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [promptsUsed, setPromptsUsed] = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [ctaShown, setCTAShown] = useState(false);
  const usedResponseKeys = useRef<Set<string>>(new Set());
  const fallbackIndex = useRef(0);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typing]);

  function findResponse(text: string): string {
    const lower = text.toLowerCase();

    // Score each response key by how many keywords match
    const scored: { key: string; response: string; score: number; matchCount: number }[] = [];

    for (const [keys, response] of Object.entries(config.responses)) {
      const keywords = keys.split("|").map(k => k.trim().toLowerCase());
      const matchCount = keywords.filter(k => lower.includes(k)).length;
      if (matchCount > 0) {
        // Penalize already-used responses so we prefer fresh ones
        const usedPenalty = usedResponseKeys.current.has(keys) ? -0.5 : 0;
        scored.push({ key: keys, response, score: matchCount + usedPenalty, matchCount });
      }
    }

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    // Try to find an unused response first
    const unused = scored.find(s => !usedResponseKeys.current.has(s.key));
    if (unused) {
      usedResponseKeys.current.add(unused.key);
      return unused.response;
    }

    // If all matching responses have been used, return the best match anyway
    if (scored.length > 0) {
      return scored[0].response;
    }

    // Rotate through fallback variants
    const idx = fallbackIndex.current % FALLBACK_VARIANTS.length;
    fallbackIndex.current++;
    return FALLBACK_VARIANTS[idx](config.businessName);
  }

  function sendMessage(text: string) {
    const newCount = userMsgCount + 1;
    setUserMsgCount(newCount);
    setPromptsUsed(true);
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      let response = findResponse(text);
      const shouldCTA = newCount >= 4 && !ctaShown;
      if (shouldCTA) {
        response += CTA_APPEND;
        setCTAShown(true);
      }
      const buttons: Message["buttons"] = shouldCTA
        ? [
            { label: "Book a Discovery Call", href: "/discovery-call" },
            { label: "Tell Me More", action: "tellmore" },
          ]
        : undefined;
      setMessages((prev) => [...prev, { role: "agent", text: response, buttons }]);
      setTyping(false);
    }, 1000 + Math.random() * 1000);
  }

  function handleTellMore() {
    setMessages((prev) => {
      const updated = [...prev];
      const last = updated[updated.length - 1];
      if (last && last.buttons) updated[updated.length - 1] = { ...last, buttons: undefined };
      return [...updated, { role: "user", text: "Tell me more" }];
    });
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          text: `The full version includes: 24/7 lead capture, appointment booking, automated follow-ups, CRM integration, and weekly performance reports. Setup takes 48 hours and starts at $300/mo. No contracts. Francis can walk you through exactly what he'd build for ${config.businessName} on a quick 15-minute call.`,
          buttons: [{ label: "Book a Discovery Call", href: "/discovery-call" }],
        },
      ]);
      setTyping(false);
    }, 1500);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", flexDirection: "column", fontFamily: "'Outfit', sans-serif" }}>
      {/* Top bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "1rem clamp(1rem,4vw,2rem)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,10,10,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(245,245,240,0.06)" }}>
        <a href="/" style={{ fontFamily: "'Space Mono', monospace", fontSize: "1rem", fontWeight: 700, textDecoration: "none", color: "#f5f5f0" }}>
          martin<span style={{ color: "#c8ff00" }}>.builds</span>
        </a>
        <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#f5f5f0" }}>{config.businessName}</span>
        <span style={{ padding: "0.25rem 0.75rem", borderRadius: 100, background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>DEMO</span>
      </div>

      {/* Chat area */}
      <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "5rem clamp(1rem,4vw,2rem) 6rem", maxWidth: 700, width: "100%", margin: "0 auto" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: "1rem", alignItems: "flex-end", gap: "0.5rem" }}>
            {msg.role === "agent" && (
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(200,255,0,0.15)", color: "#c8ff00", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, fontFamily: "'Space Mono', monospace", flexShrink: 0 }}>
                {config.avatarInitials}
              </div>
            )}
            <div>
              <div style={{
                padding: "0.85rem 1.1rem",
                borderRadius: msg.role === "agent" ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
                background: msg.role === "agent" ? "#1a1a1a" : "#c8ff00",
                color: msg.role === "agent" ? "#f5f5f0" : "#0a0a0a",
                fontSize: "0.9rem",
                lineHeight: 1.55,
                maxWidth: 480,
                whiteSpace: "pre-wrap",
              }}>
                {msg.text}
              </div>
              {msg.buttons && (
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                  {msg.buttons.map((btn, j) =>
                    btn.href ? (
                      <a key={j} href={btn.href} style={{ padding: "0.55rem 1.2rem", borderRadius: 10, background: "#c8ff00", color: "#0a0a0a", fontWeight: 700, fontSize: "0.8rem", textDecoration: "none", transition: "transform 0.2s" }}>
                        {btn.label}
                      </a>
                    ) : (
                      <button key={j} onClick={() => btn.action === "tellmore" && handleTellMore()} style={{ padding: "0.55rem 1.2rem", borderRadius: 10, background: "transparent", border: "1.5px solid #c8ff00", color: "#c8ff00", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.2s" }}>
                        {btn.label}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", marginBottom: "1rem" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(200,255,0,0.15)", color: "#c8ff00", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, fontFamily: "'Space Mono', monospace", flexShrink: 0 }}>
              {config.avatarInitials}
            </div>
            <div style={{ padding: "0.85rem 1.1rem", borderRadius: "16px 16px 16px 4px", background: "#1a1a1a" }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[0, 1, 2].map((d) => (
                  <span key={d} style={{ width: 7, height: 7, borderRadius: "50%", background: "#888", animation: "typingDot 1.4s infinite", animationDelay: `${d * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick prompts */}
        {!promptsUsed && !typing && messages.length === 1 && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem", marginLeft: 40 }}>
            {config.quickPrompts.map((qp, i) => (
              <button key={i} onClick={() => sendMessage(qp.question)} style={{ padding: "0.5rem 1rem", borderRadius: 100, background: "transparent", border: "1.5px solid #c8ff00", color: "#c8ff00", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                {qp.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input area */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "1rem clamp(1rem,4vw,2rem)", background: "rgba(10,10,10,0.95)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(245,245,240,0.06)" }}>
        <form onSubmit={(e) => { e.preventDefault(); if (input.trim() && !typing) sendMessage(input.trim()); }} style={{ maxWidth: 700, margin: "0 auto", display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={typing}
            style={{ flex: 1, padding: "0.8rem 1rem", borderRadius: 12, border: "1px solid rgba(245,245,240,0.1)", background: "rgba(245,245,240,0.04)", color: "#f5f5f0", fontSize: "0.9rem", fontFamily: "'Outfit', sans-serif", outline: "none" }}
          />
          <button type="submit" disabled={typing || !input.trim()} style={{ padding: "0.8rem 1.25rem", borderRadius: 12, border: "none", background: "#c8ff00", color: "#0a0a0a", fontWeight: 700, fontSize: "0.85rem", cursor: typing ? "not-allowed" : "pointer", fontFamily: "'Outfit', sans-serif", opacity: typing || !input.trim() ? 0.5 : 1 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </form>
      </div>

      <style>{`
        @keyframes typingDot {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
