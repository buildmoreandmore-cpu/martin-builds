"use client";

import { useState } from "react";

type Message = {
  role: "user" | "agent";
  content: string;
  timestamp?: string;
};

export default function DemoChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      content: "Good morning! I've handled 3 things while you were offline: replied to 2 client emails, scheduled tomorrow's consultation with the Johnson account, and flagged an overdue invoice from Apex Corp ($4,200 — 15 days past due). Want me to send a follow-up on that invoice?",
      timestamp: "9:23 AM"
    }
  ]);
  const [showOptions, setShowOptions] = useState(true);

  const handleQuickReply = (action: string) => {
    let userMsg = "";
    let agentResponse = "";

    switch (action) {
      case "follow-up":
        userMsg = "Send the follow-up";
        agentResponse = "✅ Follow-up email sent to Apex Corp. I've escalated this to 'urgent' status and set a reminder to check payment status in 3 days. Also added a note in your CRM about their payment pattern.";
        break;
      case "emails":
        userMsg = "Show me the emails";
        agentResponse = "📧 Here's what I handled:\n\n1. Sarah Chen (Zenith Marketing) - Requested proposal timeline. I confirmed your 3-day turnaround and asked for project scope details.\n\n2. Mike Rodriguez (Local Contractor) - Invoice #2847 payment confirmation. I thanked him and updated your accounting spreadsheet.";
        break;
      case "calendar":
        userMsg = "What's on my calendar today?";
        agentResponse = "📅 Today's schedule:\n\n• 11:00 AM - Strategy call with Peterson Group (Zoom link ready)\n• 2:30 PM - Site visit at downtown project\n• 4:00 PM - New client discovery call with Martinez LLC\n\nI've also blocked 10:30-11:00 AM for your Johnson consultation prep.";
        break;
      default:
        return;
    }

    const newUserMsg: Message = { role: "user", content: userMsg, timestamp: "Now" };
    const newAgentMsg: Message = { role: "agent", content: agentResponse, timestamp: "Now" };

    setMessages(prev => [...prev, newUserMsg, newAgentMsg]);
    setShowOptions(false);

    // Reset options after showing response
    setTimeout(() => setShowOptions(true), 2000);
  };

  return (
    <div className="animate-fade-up-4" id="demo-section" style={{ maxWidth: "420px", margin: "0 auto" }}>
      {/* Chat Header */}
      <div style={{ 
        background: "#1a1a1a", 
        borderRadius: "16px 16px 0 0", 
        padding: "1.5rem", 
        borderBottom: "1px solid rgba(245,245,240,0.06)" 
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ 
            width: "10px", 
            height: "10px", 
            background: "#c8ff00", 
            borderRadius: "50%",
            animation: "pulse 2s infinite"
          }} />
          <div>
            <div style={{ fontSize: "1rem", fontWeight: 600, color: "#f5f5f0" }}>
              Your AI Employee — <span style={{ color: "#c8ff00" }}>Online now</span>
            </div>
            <div style={{ fontSize: "0.8rem", color: "#888" }}>Handling tasks 24/7</div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div style={{ 
        background: "#1a1a1a", 
        minHeight: "320px", 
        padding: "1.5rem", 
        display: "flex", 
        flexDirection: "column", 
        gap: "1rem",
        borderBottom: "1px solid rgba(245,245,240,0.06)"
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ 
            display: "flex", 
            flexDirection: msg.role === "user" ? "row-reverse" : "row",
            gap: "0.75rem",
            alignItems: "flex-start"
          }}>
            {/* Avatar */}
            <div style={{ 
              width: "32px", 
              height: "32px", 
              borderRadius: "50%", 
              background: msg.role === "agent" ? "rgba(200,255,0,0.15)" : "rgba(245,245,240,0.1)",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              flexShrink: 0
            }}>
              {msg.role === "agent" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              )}
            </div>

            {/* Message */}
            <div style={{ 
              background: msg.role === "agent" ? "rgba(200,255,0,0.08)" : "rgba(245,245,240,0.05)",
              padding: "1rem 1.25rem", 
              borderRadius: "16px",
              maxWidth: "85%",
              fontSize: "0.9rem",
              lineHeight: 1.5,
              color: msg.role === "agent" ? "#f5f5f0" : "#ccc",
              whiteSpace: "pre-line"
            }}>
              {msg.content}
              {msg.timestamp && (
                <div style={{ 
                  fontSize: "0.75rem", 
                  color: "#666", 
                  marginTop: "0.5rem",
                  fontFamily: "'Space Mono', monospace"
                }}>
                  {msg.timestamp}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Quick Reply Options */}
        {showOptions && (
          <div style={{ marginTop: "1rem" }}>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "0.5rem",
              alignItems: "flex-start"
            }}>
              <button 
                onClick={() => handleQuickReply("follow-up")}
                style={{ 
                  background: "rgba(200,255,0,0.1)", 
                  border: "1px solid rgba(200,255,0,0.3)",
                  color: "#c8ff00", 
                  padding: "0.5rem 1rem", 
                  borderRadius: "20px", 
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = "rgba(200,255,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = "rgba(200,255,0,0.1)";
                }}
              >
                Send the follow-up
              </button>
              <button 
                onClick={() => handleQuickReply("emails")}
                style={{ 
                  background: "rgba(200,255,0,0.1)", 
                  border: "1px solid rgba(200,255,0,0.3)",
                  color: "#c8ff00", 
                  padding: "0.5rem 1rem", 
                  borderRadius: "20px", 
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = "rgba(200,255,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = "rgba(200,255,0,0.1)";
                }}
              >
                Show me the emails
              </button>
              <button 
                onClick={() => handleQuickReply("calendar")}
                style={{ 
                  background: "rgba(200,255,0,0.1)", 
                  border: "1px solid rgba(200,255,0,0.3)",
                  color: "#c8ff00", 
                  padding: "0.5rem 1rem", 
                  borderRadius: "20px", 
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = "rgba(200,255,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = "rgba(200,255,0,0.1)";
                }}
              >
                What's on my calendar today?
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input (disabled) */}
      <div style={{ 
        background: "#1a1a1a", 
        padding: "1.5rem", 
        borderRadius: "0 0 16px 16px"
      }}>
        <div style={{ 
          display: "flex", 
          gap: "0.75rem", 
          padding: "0.75rem 1rem", 
          background: "rgba(245,245,240,0.02)", 
          borderRadius: "12px",
          border: "1px solid rgba(245,245,240,0.06)"
        }}>
          <input 
            type="text" 
            placeholder="Your AI employee is ready to work..."
            disabled
            style={{ 
              flex: 1, 
              background: "transparent", 
              border: "none", 
              color: "#666", 
              fontSize: "0.9rem",
              outline: "none"
            }}
          />
          <div style={{ 
            width: "32px", 
            height: "32px", 
            background: "rgba(200,255,0,0.1)", 
            borderRadius: "8px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center"
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22,2 15,22 11,13 2,9 22,2"/>
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}