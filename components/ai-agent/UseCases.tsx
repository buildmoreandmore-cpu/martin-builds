"use client";

import ScrollReveal from "../ScrollReveal";

const cases = [
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: "Email Management", 
    body: "Reads, sorts, drafts replies, flags urgent. Your inbox handled before you wake up.",
    example: "reply_to_client('Thanks for your inquiry, I'll have a proposal ready by Friday')"
  },
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="8.5" cy="7" r="4"/>
        <path d="M20 8v6"/>
        <path d="M23 11l-3-3 3-3"/>
      </svg>
    ),
    title: "Lead Follow-Up", 
    body: "Every lead gets a response within 5 minutes. Every time. No exceptions.",
    example: "send_follow_up(lead_id: '12345', template: 'consultation_request')"
  },
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: "Appointment Scheduling", 
    body: "Books meetings, sends confirmations, handles reschedules. Syncs with your calendar.",
    example: "schedule_meeting(date: '2024-03-15', time: '2:00 PM', client: 'Johnson Co')"
  },
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Customer Support", 
    body: "Answers questions, resolves issues, escalates to you only when necessary.",
    example: "handle_inquiry(type: 'refund_request', priority: 'high')"
  },
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
      </svg>
    ),
    title: "Social Media", 
    body: "Drafts posts, responds to comments, tracks mentions. Consistent presence without the hours.",
    example: "post_content(platform: 'linkedin', type: 'weekly_update')"
  },
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
      </svg>
    ),
    title: "Invoicing & Billing", 
    body: "Sends invoices, tracks payments, follows up on overdue. Your cash flow stays tight.",
    example: "send_invoice(client: 'Apex Corp', amount: '$4,200', due: '15 days')"
  },
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: "Reporting & Analytics", 
    body: "Weekly summaries, KPI tracking, trend alerts. Know your numbers without pulling reports.",
    example: "generate_report(type: 'weekly_summary', metrics: ['revenue', 'leads'])"
  },
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
      </svg>
    ),
    title: "Data Entry & CRM", 
    body: "Updates records, logs interactions, keeps your CRM clean. No more manual entry.",
    example: "update_crm(contact: 'new_lead', status: 'qualified', next_action: 'demo')"
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" style={{ padding: "6rem 3rem", maxWidth: "1200px", margin: "0 auto" }}>
      <ScrollReveal><p style={tag}>What Your AI Employee Can Do</p></ScrollReveal>
      <ScrollReveal><h2 style={title}>One agent. Dozens of tasks. Zero sick days.</h2></ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}>
        {cases.map((c) => (
          <ScrollReveal key={c.title}>
            <div
              style={{ background: "#1a1a1a", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "16px", padding: "2rem", transition: "all 0.4s", position: "relative", overflow: "hidden", height: "100%" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(200,255,0,0.15)";
                el.style.transform = "translateY(-4px)";
                const bar = el.querySelector(".uc-bar") as HTMLDivElement;
                if (bar) bar.style.transform = "scaleX(1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(245,245,240,0.06)";
                el.style.transform = "translateY(0)";
                const bar = el.querySelector(".uc-bar") as HTMLDivElement;
                if (bar) bar.style.transform = "scaleX(0)";
              }}
            >
              <div className="uc-bar" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#c8ff00", transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.4s" }} />
              <div style={{ width: "44px", height: "44px", background: "rgba(200,255,0,0.1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.2rem" }}>
                {c.icon}
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>{c.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.6 }}>{c.body}</p>
              <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(245,245,240,0.06)", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", opacity: 0.7 }}>{c.example}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

const tag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
const title: React.CSSProperties = { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "700px" };