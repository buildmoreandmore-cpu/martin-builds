"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "../ScrollReveal";

const cases = [
  {
    title: "Email Management",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>),
    messages: [
      { role: "user", text: "I haven't checked my inbox in 3 days" },
      { role: "agent", text: "Already handled. 47 emails sorted — 3 need your attention, 12 replied to, rest archived." },
      { role: "agent", text: "Sarah Chen — Proposal deadline tomorrow", arrow: true },
    ]
  },
  {
    title: "Lead Follow-Up",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6"/><path d="M23 11l-3-3 3-3"/></svg>),
    messages: [
      { role: "user", text: "Did anyone fill out the contact form?" },
      { role: "agent", text: "3 new leads since yesterday. I've already responded to all of them within 5 minutes." },
      { role: "agent", text: "One looks hot — Martinez LLC wants a demo this week. I proposed Thursday 2pm.", arrow: true },
    ]
  },
  {
    title: "Appointment Scheduling",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>),
    messages: [
      { role: "user", text: "Can you reschedule my 2pm?" },
      { role: "agent", text: "Done. Moved to Thursday 3pm. Sent confirmation to both parties and updated your calendar." },
    ]
  },
  {
    title: "Customer Support",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>),
    messages: [
      { role: "user", text: "How many support tickets came in today?" },
      { role: "agent", text: "14 tickets. I resolved 11 automatically. 3 need your input — all flagged as priority." },
    ]
  },
  {
    title: "Social Media",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>),
    messages: [
      { role: "user", text: "I keep forgetting to post on LinkedIn" },
      { role: "agent", text: "I've drafted 4 posts for this week based on your recent projects. Want to review them or should I schedule?" },
    ]
  },
  {
    title: "Invoicing & Billing",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>),
    messages: [
      { role: "user", text: "Any overdue invoices?" },
      { role: "agent", text: "2 overdue. Apex Corp ($4,200 — 15 days late) and Chen Studios ($1,800 — 7 days). I've sent follow-ups on both." },
    ]
  },
  {
    title: "Reporting & Analytics",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>),
    messages: [
      { role: "user", text: "How did we do this week?" },
      { role: "agent", text: "Revenue up 12% vs last week. 8 new leads, 3 converted. Your full weekly report is ready — want me to send it to your email?" },
    ]
  },
  {
    title: "Data Entry & CRM",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>),
    messages: [
      { role: "user", text: "I had 3 calls today but didn't update the CRM" },
      { role: "agent", text: "Already done. I logged all 3 calls, updated contact status, and set follow-up reminders for next week." },
    ]
  },
];

function MiniChat({ title, icon, messages }: { title: string; icon: React.ReactNode; messages: { role: string; text: string; arrow?: boolean }[] }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timers: NodeJS.Timeout[] = [];
    messages.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 300 + i * 400));
    });
    return () => timers.forEach(clearTimeout);
  }, [isVisible, messages]);

  return (
    <div ref={ref} style={{ background: "#1a1a1a", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "16px", overflow: "hidden", transition: "all 0.4s", height: "100%", display: "flex", flexDirection: "column" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,255,0,0.15)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,245,240,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
    >
      {/* Header */}
      <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid rgba(245,245,240,0.06)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ width: "36px", height: "36px", background: "rgba(200,255,0,0.1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f5f5f0" }}>{title}</div>
        <div style={{ marginLeft: "auto", width: "8px", height: "8px", background: "#c8ff00", borderRadius: "50%", animation: "ucPulse 2s infinite" }} />
      </div>
      {/* Messages */}
      <div style={{ padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
        {messages.slice(0, visibleCount).map((msg, i) => (
          <div key={i} style={{ display: "flex", flexDirection: msg.role === "user" ? "row-reverse" : "row", gap: "0.5rem", alignItems: "flex-start", animation: "ucFadeSlideUp 0.35s ease-out forwards" }}>
            <div style={{
              background: msg.role === "agent" ? "rgba(200,255,0,0.08)" : "rgba(245,245,240,0.05)",
              padding: "0.6rem 0.9rem",
              borderRadius: msg.role === "agent" ? "12px 12px 12px 4px" : "12px 12px 4px 12px",
              maxWidth: "90%",
              fontSize: "0.82rem",
              lineHeight: 1.5,
              color: msg.role === "agent" ? "#f5f5f0" : "#ccc"
            }}>
              {msg.arrow && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2.5" style={{ marginRight: "4px", verticalAlign: "middle" }}><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              )}
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UseCases() {
  return (
    <section id="use-cases" className="uc-section" style={{ padding: "6rem 3rem", maxWidth: "1200px", margin: "0 auto" }}>
      <ScrollReveal><p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>What Your AI Employee Can Do</p></ScrollReveal>
      <ScrollReveal><h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "700px" }}>One agent. Dozens of tasks. Zero sick days.</h2></ScrollReveal>

      <div className="uc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}>
        {cases.map((c) => (
          <ScrollReveal key={c.title}>
            <MiniChat title={c.title} icon={c.icon} messages={c.messages} />
          </ScrollReveal>
        ))}
      </div>

      <style>{`
        @keyframes ucFadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ucPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 640px) {
          .uc-grid { grid-template-columns: 1fr !important; }
          .uc-section { padding: 3rem 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}
