"use client";

export default function AgentHero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "8rem 3rem 4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
              style={{ display: "inline-block", padding: "1rem 2.5rem", background: "#c8ff00", color: "#0a0a0a", borderRadius: "100px", fontWeight: 700, fontSize: "1rem", transition: "all 0.3s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
            >
              Tell Us What You Need
            </a>
            <a
              href="#use-cases"
              style={{ display: "inline-block", padding: "1rem 2.5rem", background: "transparent", color: "#f5f5f0", borderRadius: "100px", fontWeight: 600, fontSize: "1rem", border: "1px solid rgba(245,245,240,0.2)", transition: "all 0.3s" }}
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

        {/* Right: Agent Cards Grid */}
        <div className="animate-fade-up-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div
            style={{ background: "#1a1a1a", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "12px", padding: "1.5rem", transition: "all 0.3s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,255,0,0.15)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,245,240,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
          >
            <div style={{ width: "36px", height: "36px", background: "rgba(200,255,0,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="M21 15.5c-1.5-1.5-3.5-2.5-5.5-2.5s-4 1-5.5 2.5"/>
              </svg>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", color: "#f5f5f0" }}>Operations Agent</h3>
            <p style={{ fontSize: "0.8rem", color: "#888", lineHeight: 1.5 }}>Manages your inbox, schedules meetings, sends follow-ups</p>
          </div>

          <div
            style={{ background: "#1a1a1a", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "12px", padding: "1.5rem", transition: "all 0.3s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,255,0,0.15)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,245,240,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
          >
            <div style={{ width: "36px", height: "36px", background: "rgba(200,255,0,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <path d="M20 8v6"/>
                <path d="M23 11l-3-3 3-3"/>
              </svg>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", color: "#f5f5f0" }}>Sales Agent</h3>
            <p style={{ fontSize: "0.8rem", color: "#888", lineHeight: 1.5 }}>Qualifies leads, sends proposals, tracks pipeline</p>
          </div>

          <div
            style={{ background: "#1a1a1a", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "12px", padding: "1.5rem", transition: "all 0.3s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,255,0,0.15)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,245,240,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
          >
            <div style={{ width: "36px", height: "36px", background: "rgba(200,255,0,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", color: "#f5f5f0" }}>Support Agent</h3>
            <p style={{ fontSize: "0.8rem", color: "#888", lineHeight: 1.5 }}>Answers customer questions 24/7, escalates when needed</p>
          </div>

          <div
            style={{ background: "#1a1a1a", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "12px", padding: "1.5rem", transition: "all 0.3s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,255,0,0.15)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,245,240,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
          >
            <div style={{ width: "36px", height: "36px", background: "rgba(200,255,0,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", color: "#f5f5f0" }}>Admin Agent</h3>
            <p style={{ fontSize: "0.8rem", color: "#888", lineHeight: 1.5 }}>Invoicing, data entry, reports, bookkeeping prep</p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .agent-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}