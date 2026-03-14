"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const TOOLS = [
  { key: "gmail", name: "Gmail", desc: "Agent manages your email", icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>` },
  { key: "googlecalendar", name: "Google Calendar", desc: "Scheduling & appointments", icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>` },
  { key: "slack", name: "Slack", desc: "Workspace communication", icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z"/></svg>` },
  { key: "googlesheets", name: "Google Sheets", desc: "Data & reporting", icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM7 13h4v2H7v-2zm0 4h10v2H7v-2zm10-4h-4v2h4v-2z"/></svg>` },
  { key: "googledrive", name: "Google Drive", desc: "File access & storage", icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.71 3.5L1.15 15l2.79 4.84L10.5 8.34 7.71 3.5zm1.66.01L15.28 14H2.88l2.78 4.83h12.42l2.78-4.83L13.22 3.5H9.37zm6.65.49l-3.63 6.3 5.57 9.65h5.6L16.02 3.99z"/></svg>` },
  { key: "hubspot", name: "HubSpot", desc: "CRM & contacts", icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984v-.066A2.2 2.2 0 0017.231.834h-.066a2.2 2.2 0 00-2.2 2.2v.066c0 .867.507 1.617 1.24 1.97v2.862a5.667 5.667 0 00-2.774 1.476l-7.34-5.709a2.588 2.588 0 00.076-.607 2.622 2.622 0 10-2.622 2.622c.47 0 .91-.127 1.288-.347l7.208 5.607a5.694 5.694 0 00-.618 2.58c0 .964.244 1.872.67 2.668l-2.12 2.12a2.04 2.04 0 00-.605-.1 2.066 2.066 0 102.066 2.065c0-.213-.038-.417-.1-.606l2.082-2.083a5.686 5.686 0 003.55 1.24 5.708 5.708 0 000-11.416 5.694 5.694 0 00-2.76.713z"/></svg>` },
  { key: "salesforce", name: "Salesforce", desc: "CRM & sales pipeline", icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.905.85 3.633 2.108a5.69 5.69 0 012.11-.405c2.578 0 4.667 2.09 4.667 4.668a4.668 4.668 0 01-4.667 4.668c-.37 0-.73-.044-1.074-.127a3.997 3.997 0 01-3.548 2.156c-.592 0-1.152-.13-1.657-.363a4.93 4.93 0 01-4.344 2.594 4.934 4.934 0 01-4.6-3.148A3.63 3.63 0 012 13.11a3.63 3.63 0 012.625-3.49 4.46 4.46 0 01-.124-1.035c0-2.467 2-4.467 4.467-4.467 1.376 0 2.606.623 3.425 1.603z"/></svg>` },
  { key: "shopify", name: "Shopify", desc: "E-commerce management", icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73a.372.372 0 00-.332-.305c-.14-.013-2.762-.042-2.762-.042s-1.837-1.785-2.046-1.983a.556.556 0 00-.332-.143l-1.443 22.251 2.324-.487z"/></svg>` },
  { key: "quickbooks", name: "QuickBooks", desc: "Accounting & invoicing", icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm.12 18.96H9.6V16.8h2.52c1.44 0 2.52-1.08 2.52-2.52V9.72c0-1.44-1.08-2.52-2.52-2.52H9.6V5.04h2.52c2.76 0 4.68 1.92 4.68 4.68v4.56c0 2.76-1.92 4.68-4.68 4.68z"/></svg>` },
];

function ToolCard({ tool, connected, onConnect, connecting }: {
  tool: typeof TOOLS[0];
  connected: boolean;
  onConnect: () => void;
  connecting: boolean;
}) {
  return (
    <div style={{
      background: "#12121a",
      border: connected ? "1px solid rgba(200,255,0,0.4)" : "1px solid #222",
      borderRadius: 12,
      padding: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      transition: "border-color 0.2s",
    }}>
      <div style={{ width: 40, height: 40, color: "#fff" }} dangerouslySetInnerHTML={{ __html: tool.icon }} />
      <h3 style={{ color: "#fff", fontWeight: 600, fontSize: 14, margin: 0 }}>{tool.name}</h3>
      <p style={{ color: "#888", fontSize: 12, textAlign: "center", margin: 0 }}>{tool.desc}</p>
      {connected ? (
        <span style={{ color: "#c8ff00", fontSize: 14, fontWeight: 500, marginTop: "auto" }}>Connected ✓</span>
      ) : (
        <button
          onClick={onConnect}
          disabled={connecting}
          style={{
            marginTop: "auto",
            width: "100%",
            padding: "8px 0",
            background: "#c8ff00",
            color: "#000",
            fontWeight: 600,
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            cursor: connecting ? "not-allowed" : "pointer",
            opacity: connecting ? 0.5 : 1,
          }}
        >
          {connecting ? "Connecting..." : "Connect"}
        </button>
      )}
    </div>
  );
}

function ConnectInner() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const justConnected = searchParams.get("connected");
  const [connectedApps, setConnectedApps] = useState<Set<string>>(new Set());
  const [connecting, setConnecting] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (justConnected) {
      setConnectedApps((prev) => { const next = new Set(Array.from(prev)); next.add(justConnected); return next; });
    }
  }, [justConnected]);

  const handleConnect = async (appKey: string) => {
    if (!email) {
      setError("Missing email parameter. Please use the link from your setup email.");
      return;
    }
    setConnecting(appKey);
    setError("");
    try {
      const res = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ app: appKey, clientEmail: email }),
      });
      const data = await res.json();
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        setError(data.error || "Failed to initiate connection");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setConnecting(null);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F", padding: "64px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>Connect Your Tools</h1>
          <p style={{ color: "#888", fontSize: 16, margin: 0 }}>
            Give your AI agent access to the tools it needs to work for you.
          </p>
          {email && <p style={{ color: "#555", fontSize: 13, marginTop: 8 }}>Setting up for <span style={{ color: "#999" }}>{email}</span></p>}
        </div>

        {error && (
          <div style={{ background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,50,50,0.3)", borderRadius: 8, padding: 12, color: "#ff5555", fontSize: 14, textAlign: "center", marginBottom: 24 }}>
            {error}
          </div>
        )}

        {connectedApps.size > 0 && (
          <div style={{ background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.3)", borderRadius: 8, padding: 12, color: "#c8ff00", fontSize: 14, textAlign: "center", marginBottom: 24 }}>
            ✅ Successfully connected! Connect more tools below or close this page — your agent is ready.
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 16 }}>
          {TOOLS.map((tool) => (
            <ToolCard
              key={tool.key}
              tool={tool}
              connected={connectedApps.has(tool.key)}
              connecting={connecting === tool.key}
              onConnect={() => handleConnect(tool.key)}
            />
          ))}
        </div>

        <p style={{ color: "#555", fontSize: 12, textAlign: "center", marginTop: 32 }}>
          You can always connect more tools later. Your agent only accesses what you authorize.
        </p>
      </div>
    </div>
  );
}

export default function ConnectPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0A0A0F" }} />}>
      <ConnectInner />
    </Suspense>
  );
}
