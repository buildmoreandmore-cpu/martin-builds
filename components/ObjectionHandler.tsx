"use client";

import ScrollReveal from "./ScrollReveal";

const ROWS: Array<{ label: string; agency: string; mb: string }> = [
  { label: "Who you talk to", agency: "Account manager + project manager + dev you never meet", mb: "The person who scopes it writes the code and answers your texts." },
  { label: "Timeline", agency: "8–16 weeks. Scope creep, status calls.", mb: "Shipped in 2 weeks. Fixed price." },
  { label: "What you get", agency: "Generic template wearing your logo", mb: "Custom infrastructure built around how your team runs" },
  { label: "Ownership", agency: "You rent it forever — monthly fee, vendor lock-in", mb: "You own the code. Walk away anytime." },
  { label: "Onboarding", agency: "Weeks. Your team learns their tool.", mb: "Familiar on day one — built around your existing workflow." },
];

const XGlyph = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const CheckGlyph = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12l5 5L20 7" />
  </svg>
);

export default function ObjectionHandler() {
  return (
    <section style={{ padding: "clamp(5rem,9vw,8rem) clamp(1.25rem,5vw,3rem)", background: "#0a0a0a", position: "relative", overflow: "hidden" }}>
      {/* Subtle backdrop tint to differentiate from neighbouring sections */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(200,255,0,0.05), transparent 60%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: "1080px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={tagStyle}>The Difference</p>
            <h2 style={titleStyle}>
              You&rsquo;re not hiring an agency.<br />
              <span style={{ color: "#c8ff00" }}>You&rsquo;re installing a system.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* "Receipt" style card — the table is the hero, not the headline */}
        <ScrollReveal>
          <div className="cmp-card" style={cardStyle}>
            {/* Header row */}
            <div className="cmp-header" style={headerRow}>
              <div style={{ ...headerCell, textAlign: "left", color: "#666" }}>—</div>
              <div style={{ ...headerCell, color: "#888" }}>Typical Agency</div>
              <div style={{ ...headerCell, color: "#c8ff00", position: "relative" }}>
                martin.builds
                <span style={mbHeaderTab}>Recommended</span>
              </div>
            </div>

            {/* Rows */}
            <div>
              {ROWS.map((r, i) => (
                <div key={r.label} className="cmp-row" style={{ ...rowStyle, borderTop: i === 0 ? "none" : "1px solid rgba(245,245,240,0.06)" }}>
                  <div className="cmp-label" style={labelCell}>{r.label}</div>
                  <div className="cmp-agency" style={cellAgency}>
                    <span style={iconAgency}><XGlyph /></span>
                    <span>{r.agency}</span>
                  </div>
                  <div className="cmp-mb" style={cellMb}>
                    <span style={iconMb}><CheckGlyph /></span>
                    <span>{r.mb}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer summary row — single grounding line */}
            <div className="cmp-footer" style={footerRow}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#666", letterSpacing: 2, textTransform: "uppercase" }}>Same project</span>
              <span className="cmp-foot-agency" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.85rem", color: "#888" }}>$30K · 12 weeks</span>
              <span className="cmp-foot-mb" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.85rem", color: "#c8ff00", fontWeight: 700 }}>$5K · 14 days</span>
            </div>
          </div>
        </ScrollReveal>

        <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.85rem", color: "#666" }}>
          Comparing custom-build dev work, mid-market agency baseline.
        </p>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .cmp-header { display: none !important; }
          .cmp-row {
            grid-template-columns: 1fr !important;
            padding: 1.25rem !important;
            gap: 0.5rem !important;
          }
          .cmp-label {
            font-size: 0.7rem !important;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #666 !important;
            margin-bottom: 0.25rem;
          }
          .cmp-agency, .cmp-mb {
            font-size: 0.95rem !important;
          }
          .cmp-mb {
            border-left: 3px solid #c8ff00 !important;
            padding-left: 0.75rem !important;
            margin-top: 0.5rem;
          }
          .cmp-footer {
            grid-template-columns: 1fr !important;
            text-align: left !important;
            gap: 0.5rem !important;
          }
          .cmp-footer span { text-align: left !important; }
          .cmp-foot-agency { color: #666 !important; }
        }
      `}</style>
    </section>
  );
}

const tagStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.72rem",
  color: "#c8ff00",
  letterSpacing: "3px",
  textTransform: "uppercase",
  marginBottom: "1.5rem",
};
const titleStyle: React.CSSProperties = {
  fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-1.5px",
  maxWidth: "780px",
  margin: "0 auto",
};

const cardStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, #111 0%, #0c0c0c 100%)",
  border: "1px solid #222",
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 30px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,255,0,0.04)",
};

const headerRow: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "180px 1fr 1fr",
  padding: "1rem 1.5rem",
  background: "rgba(200,255,0,0.02)",
  borderBottom: "1px solid rgba(200,255,0,0.08)",
};
const headerCell: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "2px",
  textTransform: "uppercase",
  textAlign: "left",
};
const mbHeaderTab: React.CSSProperties = {
  marginLeft: "0.75rem",
  fontSize: "0.55rem",
  background: "#c8ff00",
  color: "#0a0a0a",
  padding: "2px 8px",
  borderRadius: 100,
  letterSpacing: "1px",
  fontWeight: 800,
  verticalAlign: "middle",
};

const rowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "180px 1fr 1fr",
  padding: "1.1rem 1.5rem",
  gap: "1.5rem",
  alignItems: "flex-start",
};
const labelCell: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.72rem",
  color: "#999",
  textTransform: "uppercase",
  letterSpacing: "1.5px",
  paddingTop: 4,
};
const cellAgency: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  color: "#777",
  fontSize: "0.95rem",
  lineHeight: 1.55,
  fontFamily: "'Outfit', sans-serif",
};
const cellMb: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  color: "#f5f5f0",
  fontSize: "0.95rem",
  lineHeight: 1.55,
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 500,
};
const iconAgency: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 18, height: 18,
  flexShrink: 0,
  marginTop: 4,
  background: "rgba(255,255,255,0.04)",
  borderRadius: 4,
  color: "#666",
};
const iconMb: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 18, height: 18,
  flexShrink: 0,
  marginTop: 4,
  background: "rgba(200,255,0,0.12)",
  borderRadius: 4,
  color: "#c8ff00",
};

const footerRow: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "180px 1fr 1fr",
  padding: "1.25rem 1.5rem",
  borderTop: "1px solid rgba(200,255,0,0.08)",
  background: "rgba(200,255,0,0.02)",
  alignItems: "center",
};
