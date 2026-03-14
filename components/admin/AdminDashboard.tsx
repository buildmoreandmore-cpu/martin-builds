"use client";

import { useState, useEffect } from "react";

const SB_URL = "https://lnvzvmjhulntglbjyryz.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxudnp2bWpodWxudGdsYmp5cnl6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzQ1Mzk4MywiZXhwIjoyMDg5MDI5OTgzfQ.FBIT5IoBUNxQGHvHEBW-m_ss-9jbR88T72-Y1ulOyj4";

interface Scan {
  id: string;
  email: string;
  url: string;
  industry: string;
  q1: string;
  q2: string;
  q3: string;
  score: number;
  created_at: string;
}

interface DemoRequest {
  id: string;
  name: string;
  email: string;
  business_name: string;
  website_url: string;
  industry: string;
  status: string;
  demo_slug: string;
  created_at: string;
}

interface Demo {
  id: string;
  slug: string;
  business_name: string;
  industry: string;
  active: boolean;
  created_at: string;
}

const PASSWORD = "martinbuilds2026";

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState<"scans" | "demos" | "requests">("scans");
  const [scans, setScans] = useState<Scan[]>([]);
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [demos, setDemos] = useState<Demo[]>([]);
  const [loading, setLoading] = useState(false);

  const headers = { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` };

  async function fetchData() {
    setLoading(true);
    try {
      const [s, r, d] = await Promise.all([
        fetch(`${SB_URL}/rest/v1/scans?select=*&order=created_at.desc&limit=100`, { headers }).then(r => r.json()),
        fetch(`${SB_URL}/rest/v1/demo_requests?select=*&order=created_at.desc&limit=100`, { headers }).then(r => r.json()),
        fetch(`${SB_URL}/rest/v1/demos?select=id,slug,business_name,industry,active,created_at&order=created_at.desc`, { headers }).then(r => r.json()),
      ]);
      setScans(Array.isArray(s) ? s : []);
      setRequests(Array.isArray(r) ? r : []);
      setDemos(Array.isArray(d) ? d : []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (authed) fetchData();
  }, [authed]);

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit', sans-serif" }}>
        <form onSubmit={(e) => { e.preventDefault(); if (pw === PASSWORD) setAuthed(true); }} style={{ background: "#1a1a1a", padding: "2.5rem", borderRadius: 16, borderTop: "3px solid #c8ff00", maxWidth: 400, width: "100%" }}>
          <h2 style={{ color: "#f5f5f0", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>Admin Access</h2>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: 10, border: "1px solid rgba(245,245,240,0.1)", background: "rgba(245,245,240,0.04)", color: "#f5f5f0", fontSize: "0.95rem", fontFamily: "'Outfit', sans-serif", outline: "none", boxSizing: "border-box", marginBottom: "1rem" }}
          />
          <button type="submit" style={{ width: "100%", padding: "0.85rem", borderRadius: 10, background: "#c8ff00", color: "#0a0a0a", fontWeight: 700, fontSize: "0.95rem", border: "none", cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
            Enter
          </button>
        </form>
      </div>
    );
  }

  const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  const scoreColor = (s: number) => s <= 40 ? "#ff4444" : s <= 70 ? "#ffaa00" : "#c8ff00";

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "'Outfit', sans-serif", color: "#f5f5f0" }}>
      {/* Header */}
      <div style={{ padding: "1.5rem clamp(1rem,4vw,2rem)", borderBottom: "1px solid rgba(245,245,240,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <a href="/" style={{ fontFamily: "'Space Mono', monospace", fontSize: "1rem", fontWeight: 700, textDecoration: "none", color: "#f5f5f0" }}>
            martin<span style={{ color: "#c8ff00" }}>.builds</span>
          </a>
          <span style={{ color: "#888", fontSize: "0.85rem" }}>Admin</span>
        </div>
        <button onClick={fetchData} disabled={loading} style={{ padding: "0.5rem 1rem", borderRadius: 8, background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.2)", color: "#c8ff00", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {/* Stats bar */}
      <div style={{ padding: "1.5rem clamp(1rem,4vw,2rem)", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        {[
          { label: "Total Scans", value: scans.length, color: "#c8ff00" },
          { label: "Demo Requests", value: requests.length, color: "#c8ff00" },
          { label: "Live Demos", value: demos.filter(d => d.active).length, color: "#c8ff00" },
        ].map((s) => (
          <div key={s.label} style={{ background: "#1a1a1a", borderRadius: 12, padding: "1.25rem 1.5rem", minWidth: 140 }}>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "0.8rem", color: "#888", marginTop: "0.25rem" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ padding: "0 clamp(1rem,4vw,2rem)", display: "flex", gap: "0.5rem", borderBottom: "1px solid rgba(245,245,240,0.06)" }}>
        {(["scans", "requests", "demos"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "0.75rem 1.25rem", background: "transparent", border: "none", borderBottom: tab === t ? "2px solid #c8ff00" : "2px solid transparent", color: tab === t ? "#c8ff00" : "#888", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", fontFamily: "'Outfit', sans-serif", textTransform: "capitalize" }}>
            {t === "scans" ? `Scans (${scans.length})` : t === "requests" ? `Demo Requests (${requests.length})` : `Demos (${demos.length})`}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem clamp(1rem,4vw,2rem)" }}>
        {tab === "scans" && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(245,245,240,0.1)" }}>
                  {["Date", "Email", "URL", "Industry", "Score", "Q1 (Follow-up)", "Q2 (Booking)", "Q3 (After-hours)"].map(h => (
                    <th key={h} style={{ padding: "0.75rem 0.5rem", textAlign: "left", color: "#888", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scans.map((s) => (
                  <tr key={s.id} style={{ borderBottom: "1px solid rgba(245,245,240,0.04)" }}>
                    <td style={{ padding: "0.75rem 0.5rem", whiteSpace: "nowrap", color: "#888" }}>{fmt(s.created_at)}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>{s.email}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}><a href={s.url} target="_blank" rel="noopener" style={{ color: "#c8ff00", textDecoration: "none" }}>{s.url}</a></td>
                    <td style={{ padding: "0.75rem 0.5rem", color: "#888" }}>{s.industry}</td>
                    <td style={{ padding: "0.75rem 0.5rem", fontWeight: 700, color: scoreColor(s.score) }}>{s.score}</td>
                    <td style={{ padding: "0.75rem 0.5rem", color: "#888" }}>{s.q1}</td>
                    <td style={{ padding: "0.75rem 0.5rem", color: "#888" }}>{s.q2}</td>
                    <td style={{ padding: "0.75rem 0.5rem", color: "#888" }}>{s.q3}</td>
                  </tr>
                ))}
                {scans.length === 0 && <tr><td colSpan={8} style={{ padding: "2rem", textAlign: "center", color: "#888" }}>No scans yet</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {tab === "requests" && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(245,245,240,0.1)" }}>
                  {["Date", "Name", "Email", "Business", "Website", "Industry", "Status", "Demo"].map(h => (
                    <th key={h} style={{ padding: "0.75rem 0.5rem", textAlign: "left", color: "#888", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid rgba(245,245,240,0.04)" }}>
                    <td style={{ padding: "0.75rem 0.5rem", whiteSpace: "nowrap", color: "#888" }}>{fmt(r.created_at)}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>{r.name}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>{r.email}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>{r.business_name}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>{r.website_url ? <a href={r.website_url} target="_blank" rel="noopener" style={{ color: "#c8ff00", textDecoration: "none" }}>{r.website_url}</a> : "—"}</td>
                    <td style={{ padding: "0.75rem 0.5rem", color: "#888" }}>{r.industry}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>
                      <span style={{ padding: "0.2rem 0.6rem", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", background: r.status === "pending" ? "rgba(255,170,0,0.12)" : "rgba(200,255,0,0.12)", color: r.status === "pending" ? "#ffaa00" : "#c8ff00" }}>
                        {r.status}
                      </span>
                    </td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>{r.demo_slug ? <a href={`/demo/${r.demo_slug}`} style={{ color: "#c8ff00", textDecoration: "none" }}>/demo/{r.demo_slug}</a> : "—"}</td>
                  </tr>
                ))}
                {requests.length === 0 && <tr><td colSpan={8} style={{ padding: "2rem", textAlign: "center", color: "#888" }}>No demo requests yet</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {tab === "demos" && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(245,245,240,0.1)" }}>
                  {["Date", "Business", "Industry", "Slug", "Status"].map(h => (
                    <th key={h} style={{ padding: "0.75rem 0.5rem", textAlign: "left", color: "#888", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {demos.map((d) => (
                  <tr key={d.id} style={{ borderBottom: "1px solid rgba(245,245,240,0.04)" }}>
                    <td style={{ padding: "0.75rem 0.5rem", whiteSpace: "nowrap", color: "#888" }}>{fmt(d.created_at)}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>{d.business_name}</td>
                    <td style={{ padding: "0.75rem 0.5rem", color: "#888" }}>{d.industry}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}><a href={`/demo/${d.slug}`} target="_blank" style={{ color: "#c8ff00", textDecoration: "none" }}>/demo/{d.slug}</a></td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>
                      <span style={{ padding: "0.2rem 0.6rem", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", background: d.active ? "rgba(200,255,0,0.12)" : "rgba(255,68,68,0.12)", color: d.active ? "#c8ff00" : "#ff4444" }}>
                        {d.active ? "Active" : "Disabled"}
                      </span>
                    </td>
                  </tr>
                ))}
                {demos.length === 0 && <tr><td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "#888" }}>No demos yet</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
