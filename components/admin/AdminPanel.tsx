"use client";

import { useState, useEffect, useCallback, type CSSProperties, type FormEvent } from "react";

/* ─── Design tokens ─── */
const GREEN = "#c8ff00";
const BG = "#0a0a0a";
const CARD_BG = "#1a1a1a";
const BORDER = "#2a2a2a";
const TEXT = "#e0e0e0";
const DIM = "#888";

/* ─── Types ─── */
interface LineItem {
  id: string;
  description: string;
  amount: string;
}

interface InvoiceEntry {
  id: string;
  amount: number;
  amount_paid: number;
  status: string | null;
  due_date: string | null;
  payment_type: string;
  stripe_url: string;
  pay_url: string | null;
}

interface SubscriptionEntry {
  id: string;
  status: string;
  current_period_end: string;
  monthly_amount: number;
  stripe_url: string;
}

interface ProjectCard {
  client_name: string;
  project_name: string;
  payment_type: string;
  phase: string | null;
  invoices: InvoiceEntry[];
  status: string;
  status_label: string;
  total_amount: number;
  amount_paid: number;
  subscription?: SubscriptionEntry;
}

/* ─── Styles ─── */
const s: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: BG,
    color: TEXT,
    fontFamily: "'Outfit', sans-serif",
    padding: 0,
    margin: 0,
  },
  loginWrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: BG,
  },
  loginBox: {
    width: "100%",
    maxWidth: 380,
    padding: "32px clamp(16px, 5vw, 32px)",
  },
  loginTitle: {
    color: GREEN,
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 8,
    fontFamily: "'Space Mono', monospace",
    letterSpacing: 1,
  },
  loginSub: {
    color: DIM,
    fontSize: 13,
    marginBottom: 24,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    background: "#0a0f0a",
    border: `1px solid ${BORDER}`,
    borderRadius: 4,
    color: TEXT,
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box" as const,
  },
  inputFocus: {
    borderColor: GREEN,
  },
  btn: {
    width: "100%",
    padding: "10px 0",
    background: GREEN,
    color: BG,
    border: "none",
    borderRadius: 4,
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "inherit",
    marginTop: 12,
  },
  btnDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  header: {
    padding: "16px clamp(12px, 4vw, 24px)",
    borderBottom: `1px solid ${BORDER}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: GREEN,
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
  },
  logoutBtn: {
    background: "transparent",
    border: `1px solid ${BORDER}`,
    color: DIM,
    padding: "6px 14px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "inherit",
  },
  content: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "24px clamp(12px, 4vw, 24px)",
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    color: GREEN,
    fontSize: 14,
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: 2,
    marginBottom: 16,
    borderBottom: `1px solid ${BORDER}`,
    paddingBottom: 8,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    display: "block",
    color: DIM,
    fontSize: 11,
    textTransform: "uppercase" as const,
    letterSpacing: 1,
    marginBottom: 4,
  },
  row: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap" as const,
  },
  flex1: {
    flex: 1,
    minWidth: 200,
  },
  lineItemRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    marginBottom: 8,
    flexWrap: "wrap" as const,
  },
  trashBtn: {
    background: "transparent",
    border: "none",
    color: "#ff4444",
    cursor: "pointer",
    fontSize: 18,
    padding: "4px 8px",
    lineHeight: 1,
  },
  addBtn: {
    background: "transparent",
    border: `1px dashed ${BORDER}`,
    color: GREEN,
    padding: "8px 16px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "inherit",
    width: "100%",
  },
  toggleGroup: {
    display: "flex",
    gap: 0,
    borderRadius: 4,
    overflow: "hidden",
    border: `1px solid ${BORDER}`,
  },
  toggleBtn: {
    flex: 1,
    padding: "8px 4px",
    background: CARD_BG,
    color: DIM,
    border: "none",
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "inherit",
    borderRight: `1px solid ${BORDER}`,
  },
  toggleActive: {
    background: GREEN,
    color: BG,
    fontWeight: 700,
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    background: "#0a0f0a",
    border: `1px solid ${BORDER}`,
    borderRadius: 4,
    color: TEXT,
    fontSize: 14,
    fontFamily: "inherit",
    resize: "vertical" as const,
    minHeight: 80,
    outline: "none",
    boxSizing: "border-box" as const,
  },
  card: {
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 6,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: TEXT,
    margin: 0,
  },
  cardClient: {
    fontSize: 12,
    color: DIM,
    margin: 0,
  },
  badge: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 12,
    fontSize: 11,
    fontWeight: 600,
    whiteSpace: "nowrap" as const,
  },
  cardMeta: {
    display: "flex",
    gap: 16,
    fontSize: 12,
    color: DIM,
    marginTop: 8,
    flexWrap: "wrap" as const,
  },
  releaseBtn: {
    background: "transparent",
    border: `1px solid ${GREEN}`,
    color: GREEN,
    padding: "6px 14px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 11,
    fontFamily: "inherit",
    fontWeight: 600,
    marginTop: 8,
    marginRight: 8,
  },
  stripeLink: {
    color: DIM,
    fontSize: 11,
    textDecoration: "underline",
    marginTop: 10,
    display: "inline-block",
  },
  error: {
    color: "#ff4444",
    fontSize: 12,
    marginTop: 4,
  },
  success: {
    color: GREEN,
    fontSize: 13,
    marginTop: 8,
    padding: "8px 12px",
    border: `1px solid ${GREEN}`,
    borderRadius: 4,
  },
  spinner: {
    display: "inline-block",
    width: 14,
    height: 14,
    border: "2px solid transparent",
    borderTop: `2px solid ${BG}`,
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
    marginRight: 6,
    verticalAlign: "middle",
  },
  emptyState: {
    textAlign: "center" as const,
    color: DIM,
    padding: "40px 0",
    fontSize: 13,
  },
  dueDateRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    flexWrap: "wrap" as const,
  },
};

/* ─── Component ─── */
export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Form state
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [phaseNumber, setPhaseNumber] = useState("");
  const [totalPhases, setTotalPhases] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: crypto.randomUUID(), description: "", amount: "" },
  ]);
  const [paymentType, setPaymentType] = useState<"full" | "split" | "retainer">("full");
  const [memo, setMemo] = useState("");
  const [dueDateType, setDueDateType] = useState<"receipt" | "custom">("receipt");
  const [dueDate, setDueDate] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Projects
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [releasingId, setReleasingId] = useState<string | null>(null);

  // Check sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("mb_admin_auth");
    if (stored === "true") setAuthed(true);
    setCheckingAuth(false);
  }, []);

  const fetchProjects = useCallback(async () => {
    setProjectsLoading(true);
    try {
      const res = await fetch("/api/admin/invoices");
      const data = await res.json();
      if (data.projects) setProjects(data.projects);
    } catch {
      // silently fail
    }
    setProjectsLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchProjects();
  }, [authed, fetchProjects]);

  /* ─── Login ─── */
  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem("mb_admin_auth", "true");
        setAuthed(true);
      } else {
        setLoginError("Invalid password");
      }
    } catch {
      setLoginError("Network error");
    }
    setLoginLoading(false);
  }

  function handleLogout() {
    sessionStorage.removeItem("mb_admin_auth");
    setAuthed(false);
    setPassword("");
  }

  /* ─── Line items ─── */
  function addLineItem() {
    setLineItems([...lineItems, { id: crypto.randomUUID(), description: "", amount: "" }]);
  }

  function removeLineItem(id: string) {
    if (lineItems.length <= 1) return;
    setLineItems(lineItems.filter((li) => li.id !== id));
  }

  function updateLineItem(id: string, field: "description" | "amount", value: string) {
    setLineItems(lineItems.map((li) => (li.id === id ? { ...li, [field]: value } : li)));
  }

  /* ─── Submit invoice ─── */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    setFormSuccess("");

    const items = lineItems
      .filter((li) => li.description && li.amount)
      .map((li) => ({ description: li.description, amount: parseFloat(li.amount) }));

    if (!items.length) {
      setFormError("At least one complete line item is required");
      setFormLoading(false);
      return;
    }

    if (items.some((li) => isNaN(li.amount) || li.amount <= 0)) {
      setFormError("All amounts must be positive numbers");
      setFormLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: clientName,
          client_email: clientEmail,
          project_name: projectName,
          phase_number: phaseNumber || null,
          total_phases: totalPhases || null,
          line_items: items,
          payment_type: paymentType,
          memo,
          due_date: dueDateType === "receipt" ? "receipt" : dueDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create invoice");

      const typeLabel =
        data.type === "split"
          ? "Split invoices created (deposit sent, final held)"
          : data.type === "retainer"
          ? "Retainer subscription created"
          : "Invoice sent";

      const linkMsg = data.payment_link
        ? `\nPayment link: ${data.payment_link}`
        : "";
      setFormSuccess(`${typeLabel} for ${clientName}${linkMsg}`);

      // Reset form
      setClientName("");
      setClientEmail("");
      setProjectName("");
      setPhaseNumber("");
      setTotalPhases("");
      setLineItems([{ id: crypto.randomUUID(), description: "", amount: "" }]);
      setPaymentType("full");
      setMemo("");
      setDueDateType("receipt");
      setDueDate("");

      // Refresh projects
      fetchProjects();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong");
    }
    setFormLoading(false);
  }

  /* ─── Release final invoice ─── */
  async function handleRelease(invoiceId: string) {
    if (!confirm("Send the final invoice to the client?")) return;
    setReleasingId(invoiceId);
    try {
      const res = await fetch("/api/admin/invoices/release", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoice_id: invoiceId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      fetchProjects();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to release invoice");
    }
    setReleasingId(null);
  }

  /* ─── Status badge ─── */
  function statusBadge(status: string, label: string) {
    const colors: Record<string, { bg: string; text: string }> = {
      deposit_pending: { bg: "#332b00", text: "#ffcc00" },
      deposit_paid: { bg: "#003300", text: GREEN },
      final_sent: { bg: "#001a33", text: "#4da6ff" },
      paid_full: { bg: "#002200", text: GREEN },
      overdue: { bg: "#330000", text: "#ff4444" },
      awaiting_payment: { bg: "#1a1a00", text: "#cccc00" },
    };
    const c = colors[status] || colors.awaiting_payment;

    const emoji: Record<string, string> = {
      deposit_pending: "\uD83D\uDFE1",
      deposit_paid: "\uD83D\uDFE2",
      final_sent: "\uD83D\uDD35",
      paid_full: "\u2705",
      overdue: "\uD83D\uDD34",
      awaiting_payment: "\u23F3",
    };

    return (
      <span style={{ ...s.badge, background: c.bg, color: c.text }}>
        {emoji[status] || ""} {label}
      </span>
    );
  }

  /* ─── Total ─── */
  const total = lineItems.reduce((sum, li) => {
    const n = parseFloat(li.amount);
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  /* ─── Render ─── */
  if (checkingAuth) {
    return <div style={s.page} />;
  }

  if (!authed) {
    return (
      <div style={s.page}>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } } input:focus { border-color: ${GREEN} !important; }`}</style>
        <div style={s.loginWrap}>
          <form onSubmit={handleLogin} style={s.loginBox}>
            <div style={s.loginTitle}>martin.builds admin</div>
            <div style={s.loginSub}>Internal tools &mdash; authorized access only</div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={s.input}
              autoFocus
            />
            <button
              type="submit"
              disabled={loginLoading || !password}
              style={{
                ...s.btn,
                ...(loginLoading || !password ? s.btnDisabled : {}),
              }}
            >
              {loginLoading ? "Verifying..." : "Enter"}
            </button>
            {loginError && <div style={s.error}>{loginError}</div>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        input:focus, textarea:focus, select:focus { border-color: ${GREEN} !important; }
        button:hover { opacity: 0.85; }
        ::selection { background: ${GREEN}; color: ${BG}; }
      `}</style>

      {/* Header */}
      <div style={s.header}>
        <h1 style={s.headerTitle}>martin.builds admin</h1>
        <button onClick={handleLogout} style={s.logoutBtn}>
          Logout
        </button>
      </div>

      <div style={s.content}>
        {/* ─── Invoice Generator ─── */}
        <div style={s.section}>
          <div style={s.sectionTitle}>Invoice Generator</div>
          <form onSubmit={handleSubmit}>
            <div style={s.row}>
              <div style={{ ...s.formGroup, ...s.flex1 }}>
                <label style={s.label}>Client Name *</label>
                <input
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  style={s.input}
                  placeholder="Acme Corp"
                />
              </div>
              <div style={{ ...s.formGroup, ...s.flex1 }}>
                <label style={s.label}>Client Email *</label>
                <input
                  required
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  style={s.input}
                  placeholder="hello@acme.com"
                />
              </div>
            </div>

            <div style={s.row}>
              <div style={{ ...s.formGroup, flex: 2 }}>
                <label style={s.label}>Project Name *</label>
                <input
                  required
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  style={s.input}
                  placeholder="AI Lead Qualifier"
                />
              </div>
              <div style={{ ...s.formGroup, flex: 1 }}>
                <label style={s.label}>Phase #</label>
                <div style={{ display: "flex", gap: 6 }}>
                  <input
                    value={phaseNumber}
                    onChange={(e) => setPhaseNumber(e.target.value)}
                    style={{ ...s.input, width: "50%" }}
                    placeholder="1"
                    type="number"
                    min="1"
                  />
                  <span style={{ color: DIM, alignSelf: "center", fontSize: 12 }}>of</span>
                  <input
                    value={totalPhases}
                    onChange={(e) => setTotalPhases(e.target.value)}
                    style={{ ...s.input, width: "50%" }}
                    placeholder="3"
                    type="number"
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div style={s.formGroup}>
              <label style={s.label}>Line Items</label>
              {lineItems.map((li) => (
                <div key={li.id} style={s.lineItemRow}>
                  <input
                    value={li.description}
                    onChange={(e) => updateLineItem(li.id, "description", e.target.value)}
                    style={{ ...s.input, flex: 3 }}
                    placeholder="Description"
                  />
                  <div style={{ position: "relative", flex: 1 }}>
                    <span
                      style={{
                        position: "absolute",
                        left: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: DIM,
                        fontSize: 14,
                        pointerEvents: "none",
                      }}
                    >
                      $
                    </span>
                    <input
                      value={li.amount}
                      onChange={(e) => updateLineItem(li.id, "amount", e.target.value)}
                      style={{ ...s.input, paddingLeft: 22 }}
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLineItem(li.id)}
                    style={{
                      ...s.trashBtn,
                      visibility: lineItems.length > 1 ? "visible" : "hidden",
                    }}
                    title="Remove"
                  >
                    &#128465;
                  </button>
                </div>
              ))}
              <button type="button" onClick={addLineItem} style={s.addBtn}>
                + Add Line Item
              </button>
              {total > 0 && (
                <div style={{ textAlign: "right", marginTop: 8, fontSize: 13, color: GREEN }}>
                  Total: ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  {paymentType === "split" && (
                    <span style={{ color: DIM, marginLeft: 8 }}>
                      (2 &times; ${(total / 2).toLocaleString("en-US", { minimumFractionDigits: 2 })})
                    </span>
                  )}
                  {paymentType === "retainer" && (
                    <span style={{ color: DIM, marginLeft: 8 }}>/month</span>
                  )}
                </div>
              )}
            </div>

            {/* Payment Type */}
            <div style={s.formGroup}>
              <label style={s.label}>Payment Type</label>
              <div style={s.toggleGroup}>
                {(["full", "split", "retainer"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setPaymentType(t)}
                    style={{
                      ...s.toggleBtn,
                      ...(paymentType === t ? s.toggleActive : {}),
                    }}
                  >
                    {t === "full" ? "Full Payment" : t === "split" ? "Split (50/50)" : "Retainer"}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 11, color: DIM, marginTop: 4 }}>
                {paymentType === "full" && "Single invoice, sent immediately"}
                {paymentType === "split" &&
                  "Deposit invoice sent now, final invoice held as draft"}
                {paymentType === "retainer" && "Monthly recurring subscription"}
              </div>
            </div>

            {/* Memo */}
            <div style={s.formGroup}>
              <label style={s.label}>Memo / Scope Summary</label>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                style={s.textarea}
                placeholder="Brief scope of work..."
              />
            </div>

            {/* Due Date */}
            {paymentType !== "retainer" && (
              <div style={s.formGroup}>
                <label style={s.label}>Due Date</label>
                <div style={s.dueDateRow}>
                  <button
                    type="button"
                    onClick={() => setDueDateType("receipt")}
                    style={{
                      ...s.toggleBtn,
                      borderRadius: 4,
                      border: `1px solid ${BORDER}`,
                      ...(dueDateType === "receipt" ? s.toggleActive : {}),
                    }}
                  >
                    Due on Receipt
                  </button>
                  <button
                    type="button"
                    onClick={() => setDueDateType("custom")}
                    style={{
                      ...s.toggleBtn,
                      borderRadius: 4,
                      border: `1px solid ${BORDER}`,
                      ...(dueDateType === "custom" ? s.toggleActive : {}),
                    }}
                  >
                    Custom Date
                  </button>
                  {dueDateType === "custom" && (
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      style={{ ...s.input, flex: 1 }}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={formLoading}
              style={{
                ...s.btn,
                marginTop: 16,
                ...(formLoading ? s.btnDisabled : {}),
              }}
            >
              {formLoading ? (
                <>
                  <span style={s.spinner} /> Creating...
                </>
              ) : paymentType === "retainer" ? (
                "Create Retainer"
              ) : (
                "Send Invoice"
              )}
            </button>

            {formError && <div style={s.error}>{formError}</div>}
            {formSuccess && <div style={s.success}>{formSuccess}</div>}
          </form>
        </div>

        {/* ─── Project Status Board ─── */}
        <div style={s.section}>
          <div style={{ ...s.sectionTitle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Project Status Board</span>
            <button
              onClick={fetchProjects}
              disabled={projectsLoading}
              style={{ ...s.logoutBtn, fontSize: 11, color: GREEN, borderColor: GREEN }}
            >
              {projectsLoading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {projectsLoading && !projects.length && (
            <div style={s.emptyState}>Loading projects...</div>
          )}

          {!projectsLoading && !projects.length && (
            <div style={s.emptyState}>No invoices yet. Create one above.</div>
          )}

          {projects.map((p, i) => (
            <div key={i} style={s.card}>
              <div style={s.cardHeader}>
                <div>
                  <p style={s.cardTitle}>{p.project_name}</p>
                  <p style={s.cardClient}>
                    {p.client_name}
                    {p.phase && <span style={{ marginLeft: 8 }}>Phase {p.phase}</span>}
                  </p>
                </div>
                {statusBadge(p.status, p.status_label)}
              </div>

              <div style={s.cardMeta}>
                <span>
                  Type:{" "}
                  {p.payment_type === "split"
                    ? "Split (50/50)"
                    : p.payment_type === "retainer"
                    ? "Retainer"
                    : "Full"}
                </span>
                {p.subscription ? (
                  <span>
                    ${p.subscription.monthly_amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    /mo
                  </span>
                ) : (
                  <>
                    <span>
                      Total: ${p.total_amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                    <span>
                      Paid: ${p.amount_paid.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </>
                )}
              </div>

              <div style={{ marginTop: 10 }}>
                {/* Release button for split payments where deposit is paid */}
                {p.status === "deposit_paid" &&
                  p.invoices
                    .filter((inv) => inv.payment_type === "final" && inv.status === "draft")
                    .map((inv) => (
                      <button
                        key={inv.id}
                        onClick={() => handleRelease(inv.id)}
                        disabled={releasingId === inv.id}
                        style={{
                          ...s.releaseBtn,
                          ...(releasingId === inv.id ? s.btnDisabled : {}),
                        }}
                      >
                        {releasingId === inv.id ? "Releasing..." : "Release Final Invoice"}
                      </button>
                    ))}

                {/* Payment links */}
                {p.invoices
                  .filter((inv) => inv.pay_url && inv.status === "open")
                  .map((inv) => (
                    <button
                      key={`pay-${inv.id}`}
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}${inv.pay_url}`
                        );
                        alert("Payment link copied!");
                      }}
                      style={{
                        ...s.releaseBtn,
                        background: GREEN,
                        color: BG,
                        borderColor: GREEN,
                      }}
                    >
                      Copy Payment Link
                    </button>
                  ))}

                {/* Stripe links */}
                {p.invoices.map((inv) => (
                  <a
                    key={inv.id}
                    href={inv.stripe_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...s.stripeLink, marginRight: 12 }}
                  >
                    View {inv.payment_type} in Stripe &rarr;
                  </a>
                ))}
                {p.subscription && (
                  <a
                    href={p.subscription.stripe_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={s.stripeLink}
                  >
                    View subscription in Stripe &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
