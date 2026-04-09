"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const TOOL_ICONS: Record<string, React.ReactNode> = {
  gmail: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>,
  googlecalendar: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>,
  slack: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19v-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M14 20.5c0-.83.67-1.5 1.5-1.5h0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h0c-.83 0-1.5-.67-1.5-1.5z"/><path d="M10 9.5C10 10.33 9.33 11 8.5 11h-5C2.67 11 2 10.33 2 9.5S2.67 8 3.5 8h5c.83 0 1.5.67 1.5 1.5z"/></svg>,
  googlesheets: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>,
  googledrive: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 19.5h20L12 2z"/><path d="M2 19.5l5-8.5h14"/><path d="M16 11L22 19.5"/></svg>,
  hubspot: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
  quickbooks: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  shopify: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>,
  email: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>,
  dashboard: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>,
};

const TOOLS = [
  { key: "gmail", name: "Gmail", desc: "Email management" },
  { key: "googlecalendar", name: "Google Calendar", desc: "Scheduling" },
  { key: "slack", name: "Slack", desc: "Team chat" },
  { key: "googlesheets", name: "Google Sheets", desc: "Data & reports" },
  { key: "googledrive", name: "Google Drive", desc: "File storage" },
  { key: "hubspot", name: "HubSpot", desc: "CRM" },
  { key: "quickbooks", name: "QuickBooks", desc: "Accounting" },
  { key: "shopify", name: "Shopify", desc: "E-commerce" },
  { key: "email", name: "Email", desc: "Send & receive emails" },
  { key: "dashboard", name: "Dashboard", desc: "Your custom dashboard" },
];

type Step = "loading" | "profile" | "tools" | "done";

function SetupInner() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || "";
  const plan = searchParams.get("plan") || "starter";

  const [step, setStep] = useState<Step>("loading");
  const [error, setError] = useState("");

  // Profile fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [botName, setBotName] = useState("");
  const [industry, setIndustry] = useState("");

  // Tools
  const [connectedTools, setConnectedTools] = useState<Set<string>>(new Set());
  const [connecting, setConnecting] = useState<string | null>(null);

  // Result
  const [telegramLink, setTelegramLink] = useState("");
  const [linkingCode, setLinkingCode] = useState("");

  const [verified, setVerified] = useState(false);

  // On mount, verify the Stripe session is paid
  useEffect(() => {
    // Allow resume via magic link (email param)
    const resumeEmail = searchParams.get("email");
    if (resumeEmail) {
      setEmail(resumeEmail);
      setVerified(true);
      setStep("profile");
      return;
    }

    if (!sessionId) {
      setError("No payment found. Please purchase an agent plan first.");
      setStep("loading");
      return;
    }
    fetch(`/api/setup/verify?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error || !data.email) {
          setError("Payment not verified. Please try again or contact support.");
          return;
        }
        if (data.email) setEmail(data.email);
        if (data.name) setName(data.name);
        setVerified(true);
        setStep("profile");
      })
      .catch(() => {
        setError("Payment verification failed. Please try again.");
      });
  }, [sessionId, searchParams]);

  const handleProfileSubmit = async () => {
    if (!name || !email || !businessName) {
      setError("Name, email, and business name are required.");
      return;
    }
    setError("");

    const res = await fetch("/api/setup/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name, email, phone, businessName, businessDescription,
        botName: botName || businessName + " Agent",
        industry, plan, sessionId,
      }),
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      return;
    }
    setStep("tools");
  };

  const handleConnect = async (appKey: string) => {
    setConnecting(appKey);
    try {
      const res = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ app: appKey, clientEmail: email }),
      });
      const data = await res.json();
      if (data.redirectUrl) {
        // Store state so we can resume after OAuth redirect
        sessionStorage.setItem("setup_state", JSON.stringify({
          name, email, phone, businessName, businessDescription, botName, industry, plan, sessionId,
          connectedTools: Array.from(connectedTools),
        }));
        window.location.href = data.redirectUrl;
      }
    } catch {
      setError("Connection failed. Try again.");
    } finally {
      setConnecting(null);
    }
  };

  const [hasDedicatedBot, setHasDedicatedBot] = useState(false);

  const handleFinish = async () => {
    const res = await fetch("/api/setup/finish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setTelegramLink(data.telegramLink || "https://t.me/Martinbuilds_bot");
    setLinkingCode(data.linkingCode || "");
    setHasDedicatedBot(data.hasDedicatedBot || false);
    setStep("done");
  };

  // Check if returning from OAuth redirect
  useEffect(() => {
    const connected = searchParams.get("connected");
    if (connected) {
      setConnectedTools((prev) => new Set([...Array.from(prev), connected]));
      const saved = sessionStorage.getItem("setup_state");
      if (saved) {
        const s = JSON.parse(saved);
        setName(s.name || ""); setEmail(s.email || ""); setPhone(s.phone || "");
        setBusinessName(s.businessName || ""); setBusinessDescription(s.businessDescription || "");
        setBotName(s.botName || ""); setIndustry(s.industry || "");
        if (s.connectedTools) setConnectedTools(new Set([...s.connectedTools, connected]));
        sessionStorage.removeItem("setup_state");
      }
      setStep("tools");
    }
  }, [searchParams]);

  if (step === "loading") {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          {error ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <h1 style={styles.h1}>Setup Requires Payment</h1>
              <p style={{ color: "#999", fontSize: 14, margin: "12px 0 20px" }}>{error}</p>
              <a
                href="/ai-agent"
                style={{ ...styles.button, display: "inline-block", textDecoration: "none", textAlign: "center" as const }}
              >
                View Plans →
              </a>
            </div>
          ) : (
            <p style={{ color: "#999", textAlign: "center" }}>Verifying payment...</p>
          )}
        </div>
      </div>
    );
  }

  if (step === "profile") {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 style={styles.h1}>Set Up Your AI Agent</h1>
            <p style={styles.subtitle}>Tell us about your business so your agent knows how to work for you.</p>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.field}>
            <label style={styles.label}>Your Name *</label>
            <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email *</label>
            <input style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@company.com" type="email" />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Phone</label>
            <input style={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 123 4567" />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Business Name *</label>
            <input style={styles.input} value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Bright Smile Dental" />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>What does your business do?</label>
            <textarea
              style={{ ...styles.input, minHeight: 80, resize: "vertical" }}
              value={businessDescription}
              onChange={(e) => setBusinessDescription(e.target.value)}
              placeholder="We're a family dental practice in Atlanta with 3 locations..."
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Agent Name</label>
            <input style={styles.input} value={botName} onChange={(e) => setBotName(e.target.value)} placeholder="e.g. 'Sarah' or 'Bright Smile Assistant'" />
            <span style={{ color: "#666", fontSize: 12 }}>What your agent calls itself when talking to you</span>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Industry</label>
            <select style={styles.input} value={industry} onChange={(e) => setIndustry(e.target.value)}>
              <option value="">Select...</option>
              <option value="healthcare">Healthcare / Dental</option>
              <option value="legal">Law Firm</option>
              <option value="realestate">Real Estate</option>
              <option value="hvac">HVAC / Home Services</option>
              <option value="financial">Financial Services</option>
              <option value="insurance">Insurance</option>
              <option value="restaurant">Restaurant / Food</option>
              <option value="retail">Retail / E-commerce</option>
              <option value="consulting">Consulting</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button style={styles.button} onClick={handleProfileSubmit}>Continue →</button>
        </div>
      </div>
    );
  }

  if (step === "tools") {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.card, maxWidth: 640 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h1 style={styles.h1}>Connect Your Tools</h1>
            <p style={styles.subtitle}>Your agent can manage these for you. Connect what you use — you can always add more later by messaging your agent.</p>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {TOOLS.map((tool) => {
              const isConnected = connectedTools.has(tool.key);
              return (
                <button
                  key={tool.key}
                  onClick={() => !isConnected && handleConnect(tool.key)}
                  disabled={connecting === tool.key}
                  style={{
                    background: isConnected ? "rgba(200,255,0,0.08)" : "#111118",
                    border: isConnected ? "1px solid rgba(200,255,0,0.4)" : "1px solid #222",
                    borderRadius: 10,
                    padding: "14px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: isConnected ? "default" : "pointer",
                    opacity: connecting === tool.key ? 0.5 : 1,
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, flexShrink: 0 }}>{TOOL_ICONS[tool.key]}</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
                      {tool.name} {isConnected && <span style={{ color: "#c8ff00" }}>✓</span>}
                    </div>
                    <div style={{ color: "#777", fontSize: 11 }}>{tool.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <button
              onClick={handleFinish}
              style={styles.button}
            >
              {connectedTools.size > 0 ? "Finish Setup →" : "Skip for Now →"}
            </button>
          </div>

          <p style={{ color: "#555", fontSize: 12, textAlign: "center", marginTop: 12 }}>
            You can connect more tools anytime by messaging your agent: &quot;connect my Google Calendar&quot;
          </p>
        </div>
      </div>
    );
  }

  // Done
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ textAlign: "center" }}>
          <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1 style={styles.h1}>Your Agent is Ready!</h1>
          <p style={styles.subtitle}>
            Meet <strong style={{ color: "#c8ff00" }}>{botName || businessName + " Agent"}</strong> — your AI employee.
          </p>
        </div>

        <div style={{ background: "#111118", border: "1px solid #222", borderRadius: 12, padding: 20, marginTop: 20 }}>
          <h3 style={{ color: "#fff", fontSize: 16, margin: "0 0 12px", fontWeight: 600 }}>Start a conversation:</h3>

          {hasDedicatedBot ? (
            <a
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#0088cc",
                color: "#fff",
                padding: "12px 16px",
                borderRadius: 10,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 15,
                marginBottom: 10,
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              Open {botName} on Telegram
            </a>
          ) : (
            <div>
              <div style={{ background: "#0d0d14", border: "1px solid #c8ff0040", borderRadius: 10, padding: 14, marginBottom: 10 }}>
                <p style={{ color: "#c8ff00", fontSize: 14, margin: "0 0 6px", fontWeight: 600 }}>🔧 Your dedicated bot is being set up</p>
                <p style={{ color: "#999", fontSize: 13, margin: 0 }}>
                  We&apos;re creating a Telegram bot named <strong style={{ color: "#fff" }}>{botName}</strong> just for you. You&apos;ll get an email with the link within 24 hours.
                </p>
              </div>
              <p style={{ color: "#666", fontSize: 12, margin: "8px 0 0" }}>
                We&apos;ve also sent these details to your email.
              </p>
            </div>
          )}

          <p style={{ color: "#777", fontSize: 13, margin: "12px 0 0" }}>
            WhatsApp coming soon — we&apos;ll notify you when it&apos;s ready.
          </p>
        </div>

        <div style={{ background: "#111118", border: "1px solid #222", borderRadius: 12, padding: 20, marginTop: 16 }}>
          <h3 style={{ color: "#fff", fontSize: 14, margin: "0 0 8px", fontWeight: 600 }}>Things to try:</h3>
          <ul style={{ color: "#999", fontSize: 13, margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
            <li>&quot;Check my emails&quot;</li>
            <li>&quot;What&apos;s on my calendar today?&quot;</li>
            <li>&quot;Schedule a meeting for tomorrow at 2pm&quot;</li>
            <li>&quot;Connect my Google Sheets&quot;</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    background: "#0A0A0F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 16px",
  },
  card: {
    background: "#0d0d14",
    border: "1px solid #1a1a24",
    borderRadius: 16,
    padding: "32px 28px",
    width: "100%",
    maxWidth: 480,
  },
  h1: { color: "#fff", fontSize: 22, fontWeight: 700, margin: "0 0 6px" },
  subtitle: { color: "#888", fontSize: 14, margin: 0 },
  field: { marginBottom: 16 },
  label: { display: "block", color: "#ccc", fontSize: 13, fontWeight: 500, marginBottom: 6 },
  input: {
    width: "100%",
    padding: "10px 12px",
    background: "#111118",
    border: "1px solid #222",
    borderRadius: 8,
    color: "#fff",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box" as const,
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#c8ff00",
    color: "#000",
    fontWeight: 700,
    fontSize: 15,
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    marginTop: 8,
  },
  error: {
    background: "rgba(255,50,50,0.1)",
    border: "1px solid rgba(255,50,50,0.3)",
    borderRadius: 8,
    padding: 10,
    color: "#ff5555",
    fontSize: 13,
    textAlign: "center" as const,
    marginBottom: 16,
  },
};

export default function SetupPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0A0A0F" }} />}>
      <SetupInner />
    </Suspense>
  );
}
