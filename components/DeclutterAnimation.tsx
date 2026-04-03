"use client";

import { useState } from "react";

/* ── Sidebar pages for the clean dashboard ── */
const pages: Record<string, { greeting: string; content: React.ReactNode }> = {
  Dashboard: {
    greeting: "Good morning, Marcus",
    content: <DashboardPage />,
  },
  Clients: {
    greeting: "Client Directory",
    content: <ClientsPage />,
  },
  Revenue: {
    greeting: "Revenue Overview",
    content: <RevenuePage />,
  },
  Notes: {
    greeting: "Team Notes",
    content: <NotesPage />,
  },
  Files: {
    greeting: "Uploads & Files",
    content: <FilesPage />,
  },
  Reports: {
    greeting: "Reports",
    content: <ReportsPage />,
  },
};

const cleanSidebarItems = Object.keys(pages);

const bloatedSidebarItems = [
  "Dashboard", "Pipeline", "Contacts", "Deals", "Reports",
  "Forecasts", "Tasks", "Calendar", "Campaigns", "Sequences",
  "Workflows", "Settings", "Help", "Integrations",
];

const bloatedWidgets = [
  { label: "Pipeline", value: "$284K", sub: "42 deals" },
  { label: "Activity Feed", value: "38", sub: "actions today" },
  { label: "Tasks Due", value: "12", sub: "overdue: 5" },
  { label: "Forecast", value: "$1.2M", sub: "Q2 target" },
  { label: "Contacts", value: "2,847", sub: "+34 this week" },
  { label: "Campaigns", value: "6", sub: "active" },
];

export default function DeclutterAnimation() {
  const [view, setView] = useState<"bloated" | "clean">("clean");
  const [activePage, setActivePage] = useState("Dashboard");
  const page = pages[activePage];

  return (
    <section
      style={{
        padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(200,255,0,0.08)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <p style={tagStyle}>The Problem</p>
        <h2 style={titleStyle}>
          You&apos;re paying for 200 features.
          <br />
          <span style={{ color: "#c8ff00" }}>You use 8.</span>
        </h2>
        <p style={subStyle}>I build the 8. You own it forever.</p>
      </div>

      {/* Toggle tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <button
          onClick={() => setView("bloated")}
          style={{
            padding: "0.6rem 1.5rem",
            borderRadius: "100px",
            border: "1px solid",
            borderColor: view === "bloated" ? "rgba(200,255,0,0.3)" : "rgba(245,245,240,0.1)",
            background: view === "bloated" ? "rgba(200,255,0,0.08)" : "transparent",
            color: view === "bloated" ? "#c8ff00" : "#888",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "1px",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          What You&apos;re Paying For
        </button>
        <button
          onClick={() => { setView("clean"); setActivePage("Dashboard"); }}
          style={{
            padding: "0.6rem 1.5rem",
            borderRadius: "100px",
            border: "1px solid",
            borderColor: view === "clean" ? "rgba(200,255,0,0.3)" : "rgba(245,245,240,0.1)",
            background: view === "clean" ? "rgba(200,255,0,0.08)" : "transparent",
            color: view === "clean" ? "#c8ff00" : "#888",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "1px",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          What You Actually Need
        </button>
      </div>

      {/* Dashboard mock */}
      <div className="declutter-desktop" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            border: `1px solid ${view === "clean" ? "rgba(200,255,0,0.12)" : "rgba(255,255,255,0.06)"}`,
            background: view === "clean" ? "#1a1a1a" : "#1e2a3a",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            display: "flex",
            minHeight: "480px",
          }}
        >
          {/* Sidebar */}
          <div
            style={{
              width: view === "clean" ? "170px" : "200px",
              background: view === "clean" ? "#111" : "#162030",
              borderRight: `1px solid ${view === "clean" ? "rgba(200,255,0,0.06)" : "rgba(255,255,255,0.06)"}`,
              padding: "1rem 0",
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                padding: "0 1rem 1rem",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: view === "clean" ? "#c8ff00" : "#5a7a9a",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontFamily: "'Space Mono', monospace",
                transition: "color 0.4s",
              }}
            >
              {view === "clean" ? "your.app" : "MEGACRM PRO"}
            </div>
            {(view === "clean" ? cleanSidebarItems : bloatedSidebarItems).map((item, i) => {
              const isActive = view === "clean" && item === activePage;
              return (
                <div
                  key={item}
                  onClick={() => { if (view === "clean") setActivePage(item); }}
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.75rem",
                    color: view === "clean"
                      ? (isActive ? "#c8ff00" : "#888")
                      : "#5a7a9a",
                    fontWeight: isActive ? 600 : 400,
                    background: isActive ? "rgba(200,255,0,0.06)" : "transparent",
                    borderRadius: "6px",
                    margin: "0 0.5rem 0.15rem",
                    cursor: view === "clean" ? "pointer" : "default",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    if (view === "clean" && !isActive) {
                      (e.currentTarget as HTMLDivElement).style.background = "rgba(200,255,0,0.03)";
                      (e.currentTarget as HTMLDivElement).style.color = "#ccc";
                    }
                  }}
                  onMouseLeave={e => {
                    if (view === "clean" && !isActive) {
                      (e.currentTarget as HTMLDivElement).style.background = "transparent";
                      (e.currentTarget as HTMLDivElement).style.color = "#888";
                    }
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>

          {/* Main content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Top bar */}
            <div
              style={{
                padding: "0.75rem 1.25rem",
                borderBottom: `1px solid ${view === "clean" ? "rgba(200,255,0,0.06)" : "rgba(255,255,255,0.06)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "all 0.5s",
              }}
            >
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: view === "clean" ? "#f5f5f0" : "#8aa0b8", transition: "color 0.3s" }}>
                {view === "clean" ? page.greeting : "Dashboard"}
              </div>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                {view !== "clean" && (
                  <>
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: "rgba(255,255,255,0.08)" }} />
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: "rgba(255,255,255,0.08)" }} />
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: "rgba(255,255,255,0.08)" }} />
                  </>
                )}
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: view === "clean" ? "#c8ff00" : "#3a5a7a",
                    transition: "all 0.5s",
                  }}
                />
              </div>
            </div>

            {/* Content area */}
            <div style={{ padding: "1.25rem", flex: 1, overflowY: "auto" }}>
              {view === "clean" ? (
                <div key={activePage} style={{ animation: "dcFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                  {page.content}
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
                  {bloatedWidgets.map((w) => (
                    <div
                      key={w.label}
                      style={{
                        padding: "1rem",
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "8px",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div style={{ fontSize: "0.6rem", color: "#5a7a9a", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.4rem" }}>{w.label}</div>
                      <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#8aa0b8" }}>{w.value}</div>
                      <div style={{ fontSize: "0.6rem", color: "#4a6a8a", marginTop: "0.2rem" }}>{w.sub}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hint */}
        {view === "clean" && (
          <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.75rem", color: "#555", fontFamily: "'Space Mono', monospace" }}>
            Click the sidebar to explore →
          </p>
        )}
      </div>

      {/* Mobile: simplified */}
      <div className="declutter-mobile" style={{ display: "none", maxWidth: "400px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: "0.7rem", color: "#888", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem", textAlign: "center" }}>Before</p>
            <div style={{ background: "#1e2a3a", borderRadius: "12px", padding: "1rem", border: "1px solid rgba(255,255,255,0.06)" }}>
              {bloatedSidebarItems.slice(0, 8).map((item) => (
                <div key={item} style={{ fontSize: "0.55rem", color: "#5a7a9a", padding: "0.2rem 0" }}>{item}</div>
              ))}
              <div style={{ fontSize: "0.5rem", color: "#3a5a7a", marginTop: "0.3rem" }}>...6 more</div>
            </div>
          </div>
          <div>
            <p style={{ fontSize: "0.7rem", color: "#c8ff00", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem", textAlign: "center", fontWeight: 600 }}>After</p>
            <div style={{ background: "#1a1a1a", borderRadius: "12px", padding: "1rem", border: "1px solid rgba(200,255,0,0.12)" }}>
              {cleanSidebarItems.map((item) => (
                <div key={item} style={{ fontSize: "0.6rem", color: "#888", padding: "0.3rem 0", fontWeight: 500 }}>{item}</div>
              ))}
              <div style={{ marginTop: "0.5rem", fontSize: "0.7rem", fontWeight: 700, color: "#c8ff00" }}>$48.2K</div>
              <div style={{ fontSize: "0.5rem", color: "#666" }}>revenue this month</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <a
          href="/discovery-call"
          style={{ color: "#c8ff00", fontWeight: 600, fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", textDecoration: "none", transition: "all 0.3s" }}
          onMouseEnter={e => { const arrow = e.currentTarget.querySelector("span"); if (arrow) (arrow as HTMLSpanElement).style.transform = "translateX(3px)"; }}
          onMouseLeave={e => { const arrow = e.currentTarget.querySelector("span"); if (arrow) (arrow as HTMLSpanElement).style.transform = "translateX(0)"; }}
        >
          Ready to replace your bloated tool? Book a discovery call{" "}
          <span style={{ transition: "transform 0.3s", display: "inline-block" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </a>
      </div>

      <style>{`
        @keyframes dcFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .declutter-desktop { display: none !important; }
          .declutter-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
}

/* ── Page Components ── */

function DashboardPage() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.25rem" }}>
        {[
          { label: "Revenue", value: "$48.2K", sub: "this month", accent: true },
          { label: "Active Clients", value: "24", sub: "+3 this week", accent: false },
          { label: "Pipeline", value: "$124K", sub: "6 proposals out", accent: false },
        ].map((w) => (
          <div
            key={w.label}
            style={{
              padding: "1.25rem",
              background: w.accent ? "rgba(200,255,0,0.04)" : "rgba(245,245,240,0.02)",
              borderRadius: "12px",
              border: `1px solid ${w.accent ? "rgba(200,255,0,0.15)" : "rgba(245,245,240,0.06)"}`,
            }}
          >
            <div style={{ fontSize: "0.65rem", color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.4rem", fontFamily: "'Space Mono', monospace" }}>{w.label}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: w.accent ? "#c8ff00" : "#f5f5f0" }}>{w.value}</div>
            <div style={{ fontSize: "0.7rem", color: "#666", marginTop: "0.2rem" }}>{w.sub}</div>
          </div>
        ))}
      </div>
      <ChartWidget title="Weekly Revenue" />
      <ActivityWidget />
    </>
  );
}

function ClientsPage() {
  const clients = [
    { name: "Marcus Johnson", status: "Active", value: "$12,400" },
    { name: "Sarah Chen", status: "Active", value: "$8,200" },
    { name: "David Park", status: "Pending", value: "$15,000" },
    { name: "Lisa Williams", status: "Active", value: "$6,800" },
    { name: "James Rivera", status: "Closed", value: "$22,100" },
  ];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ fontSize: "0.7rem", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase" }}>24 Active Clients</div>
        <MockButton label="+ Add Client" />
      </div>
      <div style={{ background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "0.75rem 1.25rem", borderBottom: "1px solid rgba(245,245,240,0.06)" }}>
          {["Name", "Status", "Value"].map((h) => (
            <div key={h} style={{ fontSize: "0.6rem", color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>
        {clients.map((c, i) => (
          <div
            key={c.name}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              padding: "0.7rem 1.25rem",
              borderBottom: i < clients.length - 1 ? "1px solid rgba(245,245,240,0.04)" : "none",
              cursor: "default",
            }}
          >
            <div style={{ fontSize: "0.8rem", color: "#f5f5f0", fontWeight: 500 }}>{c.name}</div>
            <div>
              <span style={{
                fontSize: "0.6rem",
                padding: "0.2rem 0.5rem",
                borderRadius: "100px",
                background: c.status === "Active" ? "rgba(200,255,0,0.08)" : c.status === "Pending" ? "rgba(255,200,0,0.08)" : "rgba(245,245,240,0.04)",
                color: c.status === "Active" ? "#c8ff00" : c.status === "Pending" ? "#ffc800" : "#888",
                fontFamily: "'Space Mono', monospace",
              }}>{c.status}</span>
            </div>
            <div style={{ fontSize: "0.8rem", color: "#888" }}>{c.value}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function RevenuePage() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
        {[
          { label: "Monthly Revenue", value: "$48.2K", sub: "↑ 12% vs last month" },
          { label: "Avg Deal Size", value: "$8.4K", sub: "↑ 6% vs last month" },
        ].map((w) => (
          <div key={w.label} style={{ padding: "1.25rem", background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)" }}>
            <div style={{ fontSize: "0.65rem", color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.4rem", fontFamily: "'Space Mono', monospace" }}>{w.label}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f5f5f0" }}>{w.value}</div>
            <div style={{ fontSize: "0.7rem", color: "#c8ff00", marginTop: "0.2rem" }}>{w.sub}</div>
          </div>
        ))}
      </div>
      <ChartWidget title="Revenue Trend (6 months)" heights={[30, 42, 55, 48, 65, 82]} labels={["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]} />
    </>
  );
}

function NotesPage() {
  const [notes, setNotes] = useState([
    { id: 1, text: "Follow up with Sarah about the Q2 proposal", time: "2h ago", author: "Marcus" },
    { id: 2, text: "Client onboarding docs updated — send to new clients", time: "Yesterday", author: "Team" },
    { id: 3, text: "Dashboard KPIs reviewed with stakeholders. All green.", time: "2 days ago", author: "Marcus" },
  ]);
  const [newNote, setNewNote] = useState("");

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ fontSize: "0.7rem", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase" }}>Team Notes</div>
      </div>
      {/* Add note input */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newNote.trim()) {
              setNotes([{ id: Date.now(), text: newNote, time: "Just now", author: "You" }, ...notes]);
              setNewNote("");
            }
          }}
          placeholder="Add a note..."
          style={{
            flex: 1,
            padding: "0.7rem 1rem",
            background: "rgba(245,245,240,0.03)",
            border: "1px solid rgba(245,245,240,0.08)",
            borderRadius: "10px",
            color: "#f5f5f0",
            fontSize: "0.8rem",
            fontFamily: "'Outfit', sans-serif",
            outline: "none",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(200,255,0,0.3)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(245,245,240,0.08)"; }}
        />
        <button
          onClick={() => {
            if (newNote.trim()) {
              setNotes([{ id: Date.now(), text: newNote, time: "Just now", author: "You" }, ...notes]);
              setNewNote("");
            }
          }}
          style={{
            padding: "0.7rem 1.2rem",
            background: "#c8ff00",
            color: "#0a0a0a",
            border: "none",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "0.75rem",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          + Add
        </button>
      </div>
      {/* Notes list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {notes.map((n) => (
          <div key={n.id} style={{ padding: "1rem 1.25rem", background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)" }}>
            <p style={{ fontSize: "0.85rem", color: "#f5f5f0", lineHeight: 1.5, margin: 0 }}>{n.text}</p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
              <span style={{ fontSize: "0.65rem", color: "#c8ff00", fontFamily: "'Space Mono', monospace" }}>{n.author}</span>
              <span style={{ fontSize: "0.65rem", color: "#555" }}>{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function FilesPage() {
  const [files, setFiles] = useState([
    { name: "proposal-q2-draft.pdf", size: "2.4 MB", date: "Today" },
    { name: "client-onboarding.docx", size: "840 KB", date: "Yesterday" },
    { name: "site-audit-results.png", size: "1.1 MB", date: "Mar 28" },
  ]);
  const [dragOver, setDragOver] = useState(false);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ fontSize: "0.7rem", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase" }}>Uploads & Files</div>
      </div>
      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files.length > 0) {
            const f = e.dataTransfer.files[0];
            setFiles([{ name: f.name, size: `${(f.size / 1024).toFixed(0)} KB`, date: "Just now" }, ...files]);
          }
        }}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.onchange = (e) => {
            const f = (e.target as HTMLInputElement).files?.[0];
            if (f) setFiles([{ name: f.name, size: `${(f.size / 1024).toFixed(0)} KB`, date: "Just now" }, ...files]);
          };
          input.click();
        }}
        style={{
          padding: "2rem",
          border: `2px dashed ${dragOver ? "#c8ff00" : "rgba(245,245,240,0.1)"}`,
          borderRadius: "12px",
          background: dragOver ? "rgba(200,255,0,0.04)" : "transparent",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.2s",
          marginBottom: "1.25rem",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={dragOver ? "#c8ff00" : "#555"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "0.5rem", transition: "stroke 0.2s" }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p style={{ fontSize: "0.8rem", color: dragOver ? "#c8ff00" : "#888", margin: 0, transition: "color 0.2s" }}>
          {dragOver ? "Drop file here" : "Click or drag files to upload"}
        </p>
        <p style={{ fontSize: "0.65rem", color: "#555", margin: "0.25rem 0 0" }}>PDF, PNG, DOCX — up to 10MB</p>
      </div>
      {/* File list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {files.map((f, i) => (
          <div key={`${f.name}-${i}`} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 1rem", background: "rgba(245,245,240,0.02)", borderRadius: "10px", border: "1px solid rgba(245,245,240,0.06)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.8rem", color: "#f5f5f0", fontWeight: 500 }}>{f.name}</div>
              <div style={{ fontSize: "0.6rem", color: "#555" }}>{f.size}</div>
            </div>
            <div style={{ fontSize: "0.65rem", color: "#555" }}>{f.date}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function ReportsPage() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
        {[
          { label: "Close Rate", value: "68%", sub: "↑ 4% this quarter" },
          { label: "Avg Response", value: "2.4h", sub: "↓ from 6h" },
          { label: "Client NPS", value: "92", sub: "Excellent" },
        ].map((w) => (
          <div key={w.label} style={{ padding: "1.25rem", background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)" }}>
            <div style={{ fontSize: "0.65rem", color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.4rem", fontFamily: "'Space Mono', monospace" }}>{w.label}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f5f5f0" }}>{w.value}</div>
            <div style={{ fontSize: "0.7rem", color: "#c8ff00", marginTop: "0.2rem" }}>{w.sub}</div>
          </div>
        ))}
      </div>
      <ChartWidget title="Monthly Close Rate" heights={[52, 58, 61, 55, 64, 68]} labels={["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]} />
    </>
  );
}

/* ── Shared Widgets ── */

function ChartWidget({ title, heights = [45, 62, 38, 71, 55, 82, 68], labels = ["M", "T", "W", "T", "F", "S", "S"] }: { title: string; heights?: number[]; labels?: string[] }) {
  return (
    <div style={{ background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)", padding: "1.25rem", marginBottom: "1rem" }}>
      <div style={{ fontSize: "0.7rem", color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem", fontFamily: "'Space Mono', monospace" }}>{title}</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "80px" }}>
        {heights.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              background: i === heights.length - 2 ? "#c8ff00" : "rgba(200,255,0,0.12)",
              borderRadius: "4px 4px 0 0",
              transition: "height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.4rem" }}>
        {labels.map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", fontSize: "0.6rem", color: "#555" }}>{d}</div>
        ))}
      </div>
    </div>
  );
}

function ActivityWidget() {
  return (
    <div style={{ background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)", padding: "1rem 1.25rem" }}>
      <div style={{ fontSize: "0.7rem", color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem", fontFamily: "'Space Mono', monospace" }}>Recent Activity</div>
      {["New lead — Marcus Johnson", "Proposal sent — $12K", "Invoice paid — $4,500"].map((row, i) => (
        <div key={i} style={{ padding: "0.5rem 0", borderBottom: i < 2 ? "1px solid rgba(245,245,240,0.04)" : "none", fontSize: "0.75rem", color: "#888", display: "flex", justifyContent: "space-between" }}>
          <span>{row}</span>
          <span style={{ color: "#555", fontSize: "0.65rem" }}>{["2m ago", "1h ago", "3h ago"][i]}</span>
        </div>
      ))}
    </div>
  );
}

function MockButton({ label }: { label: string }) {
  return (
    <button
      style={{
        padding: "0.4rem 0.9rem",
        background: "rgba(200,255,0,0.08)",
        border: "1px solid rgba(200,255,0,0.15)",
        borderRadius: "8px",
        color: "#c8ff00",
        fontSize: "0.7rem",
        fontWeight: 600,
        cursor: "default",
        fontFamily: "'Space Mono', monospace",
      }}
    >
      {label}
    </button>
  );
}

/* ── Styles ── */

const tagStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.75rem",
  color: "#c8ff00",
  letterSpacing: "3px",
  textTransform: "uppercase",
  marginBottom: "1.5rem",
};

const titleStyle: React.CSSProperties = {
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-2px",
  maxWidth: "700px",
  margin: "0 auto",
};

const subStyle: React.CSSProperties = {
  fontSize: "clamp(1rem, 2vw, 1.2rem)",
  fontWeight: 300,
  color: "#888",
  marginTop: "1rem",
  lineHeight: 1.7,
};
