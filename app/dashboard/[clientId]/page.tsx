"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

const bg = "#0A0A0F";
const sidebarBg = "#111113";
const sidebarActive = "#1c1c1f";
const card = "#16161a";
const border = "#222228";
const accent = "#c8ff00";
const muted = "#666";
const textLight = "#f5f5f0";
const fontBody = "'DM Sans', sans-serif";
const fontMono = "'DM Mono', monospace";

interface Message {
  role: "user" | "assistant";
  content: string;
  interface: string;
  created_at: string;
}

interface ClientInfo {
  id: string;
  name: string;
  email: string;
  business_name: string;
  bot_name: string;
  plan: string;
  industry: string;
  active: boolean;
  created_at: string;
}

type View = "chat" | "activity" | "settings";

const NAV: { key: View; label: string; icon: string }[] = [
  { key: "chat", label: "Chat", icon: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" },
  { key: "activity", label: "Activity", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { key: "settings", label: "Settings", icon: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" },
];

export default function ClientDashboard() {
  const { clientId } = useParams<{ clientId: string }>();
  const [view, setView] = useState<View>("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [client, setClient] = useState<ClientInfo | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastCount = useRef(0);

  // Fetch client info
  useEffect(() => {
    fetch(`/api/dashboard/client?clientId=${clientId}`)
      .then((r) => r.json())
      .then((data) => { if (data.id) setClient(data); })
      .catch(() => {});
  }, [clientId]);

  // Fetch messages + poll
  useEffect(() => {
    const load = () => {
      fetch(`/api/dashboard/messages?clientId=${clientId}`)
        .then((r) => r.json())
        .then((data) => {
          const msgs = data.messages || data;
          if (Array.isArray(msgs)) {
            setMessages(msgs);
            if (msgs.length > lastCount.current) {
              lastCount.current = msgs.length;
              setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
            }
          }
        })
        .catch(() => {});
    };
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [clientId]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const text = input.trim();
    setInput("");
    setSending(true);

    const temp: Message = { role: "user", content: text, interface: "dashboard", created_at: new Date().toISOString() };
    setMessages((prev) => [...prev, temp]);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);

    try {
      const res = await fetch("/api/dashboard/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, message: text }),
      });
      const data = await res.json();
      if (data.content) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.content, interface: "dashboard", created_at: new Date().toISOString() },
        ]);
        lastCount.current += 2;
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
      }
    } catch { /* silent */ } finally {
      setSending(false);
    }
  };

  const formatTime = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const t = new Date();
    if (d.toDateString() === t.toDateString()) return "Today";
    const y = new Date(t); y.setDate(y.getDate() - 1);
    if (d.toDateString() === y.toDateString()) return "Yesterday";
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  const botName = client?.bot_name || "Agent";
  const bizName = client?.business_name || "Loading...";
  const initial = botName.charAt(0).toUpperCase();

  // Activity stats
  const totalMessages = messages.length;
  const telegramMessages = messages.filter((m) => m.interface === "telegram").length;
  const dashboardMessages = messages.filter((m) => m.interface === "dashboard").length;
  const lastActive = messages.length > 0 ? messages[messages.length - 1].created_at : null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: fontBody, color: textLight, background: bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
        html, body { background: ${bg} !important; margin: 0; }
        .dash-sb { display: flex; }
        .dash-m { margin-left: 200px; }
        @media (max-width: 768px) { .dash-sb { display: none !important; } .dash-m { margin-left: 0 !important; } }
        .dash-inp:focus { outline: none; border-color: ${accent} !important; }
      `}</style>

      {/* Sidebar */}
      <aside className="dash-sb" style={{ width: 200, background: sidebarBg, flexDirection: "column", padding: "24px 0", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 40 }}>
        <div style={{ padding: "0 20px", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#111", fontFamily: fontMono }}>{initial}</span>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{botName}</p>
              <p style={{ margin: 0, fontSize: 11, color: muted }}>{bizName}</p>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, padding: "0 8px" }}>
          {NAV.map((item) => {
            const active = view === item.key;
            return (
              <div key={item.key} onClick={() => setView(item.key)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, cursor: "pointer", background: active ? sidebarActive : "transparent" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? "#fff" : "#666"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
                <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#fff" : "#888" }}>{item.label}</span>
              </div>
            );
          })}
        </nav>
        {/* Support link */}
        <div style={{ padding: "12px 20px", borderTop: "1px solid #222" }}>
          <a href="mailto:agent@martinbuilds.ai" style={{ fontSize: 12, color: muted, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r=".5"/></svg>
            Need help?
          </a>
        </div>
      </aside>

      {/* Main */}
      <main className="dash-m" style={{ flex: 1, marginLeft: 200, display: "flex", flexDirection: "column", height: "100vh" }}>

        {/* ── Chat ── */}
        {view === "chat" && (
          <>
            <div style={{ padding: "16px 24px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: 9999, background: accent }} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>{botName}</span>
              <span style={{ fontSize: 12, color: muted }}>Online</span>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 12px" }}>
              {messages.length === 0 && (
                <div style={{ textAlign: "center", padding: "60px 20px", color: muted }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 16px", display: "block" }}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                  <p style={{ fontSize: 14, margin: "0 0 4px", fontWeight: 600, color: "#555" }}>No messages yet</p>
                  <p style={{ fontSize: 13, margin: 0 }}>Send a message to start talking to {botName}</p>
                </div>
              )}

              {messages.map((msg, i) => {
                const isUser = msg.role === "user";
                const showDate = i === 0 || formatDate(messages[i - 1].created_at) !== formatDate(msg.created_at);
                const isTelegram = msg.interface === "telegram";

                return (
                  <div key={i}>
                    {showDate && (
                      <div style={{ textAlign: "center", margin: "20px 0 12px" }}>
                        <span style={{ fontSize: 11, color: muted, fontFamily: fontMono, background: "#111116", padding: "3px 10px", borderRadius: 6 }}>{formatDate(msg.created_at)}</span>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 10 }}>
                      <div style={{ maxWidth: "75%" }}>
                        <div style={{
                          padding: "12px 16px",
                          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                          background: isUser ? accent : card,
                          color: isUser ? "#0a0a0a" : textLight,
                          fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap",
                        }}>{msg.content}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, justifyContent: isUser ? "flex-end" : "flex-start" }}>
                          <span style={{ fontSize: 11, color: "#555" }}>{formatTime(msg.created_at)}</span>
                          {isTelegram && (
                            <span style={{ fontSize: 10, color: "#0088cc", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 3 }}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="#0088cc"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                              Telegram
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {sending && (
                <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
                  <div style={{ padding: "12px 16px", borderRadius: "16px 16px 16px 4px", background: card, fontSize: 14, color: muted }}>Thinking...</div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div style={{ padding: "12px 24px 20px", borderTop: `1px solid ${border}` }}>
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: "flex", gap: 10 }}>
                <input
                  className="dash-inp"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Message ${botName}...`}
                  disabled={sending}
                  style={{ flex: 1, padding: "12px 16px", background: card, border: `1px solid ${border}`, borderRadius: 12, color: textLight, fontSize: 14, fontFamily: fontBody }}
                />
                <button type="submit" disabled={sending || !input.trim()} style={{
                  padding: "12px 20px", background: input.trim() ? accent : "#333", color: input.trim() ? "#0a0a0a" : "#666",
                  border: "none", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: input.trim() ? "pointer" : "default", fontFamily: fontBody, transition: "all 0.2s",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                </button>
              </form>
            </div>
          </>
        )}

        {/* ── Activity ── */}
        {view === "activity" && (
          <div style={{ padding: "40px 32px", maxWidth: 600 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>Activity</h2>
            <p style={{ fontSize: 13, color: muted, margin: "0 0 28px" }}>
              How {botName} has been working for {bizName}.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ padding: "16px 20px", background: card, border: `1px solid ${border}`, borderRadius: 10 }}>
                <p style={{ margin: 0, fontSize: 11, color: muted, fontFamily: fontMono, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Total conversations</p>
                <p style={{ margin: 0, fontSize: 24, fontWeight: 700, fontFamily: fontMono }}>{totalMessages}</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ padding: "16px 20px", background: card, border: `1px solid ${border}`, borderRadius: 10 }}>
                  <p style={{ margin: 0, fontSize: 11, color: muted, fontFamily: fontMono, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Via Dashboard</p>
                  <p style={{ margin: 0, fontSize: 20, fontWeight: 700, fontFamily: fontMono }}>{dashboardMessages}</p>
                </div>
                <div style={{ padding: "16px 20px", background: card, border: `1px solid ${border}`, borderRadius: 10 }}>
                  <p style={{ margin: 0, fontSize: 11, color: muted, fontFamily: fontMono, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Via Telegram</p>
                  <p style={{ margin: 0, fontSize: 20, fontWeight: 700, fontFamily: fontMono, color: "#0088cc" }}>{telegramMessages}</p>
                </div>
              </div>

              <div style={{ padding: "16px 20px", background: card, border: `1px solid ${border}`, borderRadius: 10 }}>
                <p style={{ margin: 0, fontSize: 11, color: muted, fontFamily: fontMono, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Last active</p>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{lastActive ? `${formatDate(lastActive)} at ${formatTime(lastActive)}` : "No activity yet"}</p>
              </div>
            </div>

            <div style={{ marginTop: 28, padding: "20px", background: "rgba(200,255,0,0.03)", border: `1px solid rgba(200,255,0,0.1)`, borderRadius: 10 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: accent, marginBottom: 8 }}>Tips to get more from {botName}</p>
              <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 13, color: "#999", lineHeight: 2 }}>
                <li>Ask {botName} about your services — test how it responds to clients</li>
                <li>Send it a lead scenario to see how it handles intake</li>
                <li>Use Telegram for quick questions on the go</li>
                <li>Check back here to see how conversations are trending</li>
              </ul>
            </div>
          </div>
        )}

        {/* ── Settings ── */}
        {view === "settings" && (
          <div style={{ padding: "40px 32px", maxWidth: 500 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>Settings</h2>
            <p style={{ fontSize: 13, color: muted, margin: "0 0 28px" }}>
              Your agent configuration. Contact us to make changes.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Business", value: client?.business_name || "—" },
                { label: "Agent Name", value: client?.bot_name || "—" },
                { label: "Plan", value: client?.plan ? client.plan.charAt(0).toUpperCase() + client.plan.slice(1) : "—" },
                { label: "Industry", value: client?.industry ? client.industry.charAt(0).toUpperCase() + client.industry.slice(1) : "—" },
                { label: "Email", value: client?.email || "—" },
                { label: "Status", value: client?.active ? "Active" : "Paused" },
              ].map((item) => (
                <div key={item.label} style={{ padding: "14px 18px", background: card, border: `1px solid ${border}`, borderRadius: 10 }}>
                  <p style={{ margin: 0, fontSize: 11, color: muted, fontFamily: fontMono, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{item.label}</p>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 28, padding: "20px", background: card, border: `1px solid ${border}`, borderRadius: 10 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Need to update something?</p>
              <p style={{ margin: 0, fontSize: 13, color: muted, lineHeight: 1.6 }}>
                Email <a href="mailto:agent@martinbuilds.ai" style={{ color: accent, textDecoration: "none" }}>agent@martinbuilds.ai</a> or message us in Telegram. We typically respond within a few hours.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
