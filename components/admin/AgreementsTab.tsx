"use client";

import { useCallback, useEffect, useState } from "react";

const GREEN = "#c8ff00";
const BG = "#0a0a0a";
const CARD = "#141414";
const BORDER = "#222";
const TEXT = "#f5f5f0";
const DIM = "#888";

type SignedRow = {
  id: string;
  client_name: string;
  client_email: string | null;
  project_name: string;
  total_amount: number;
  monthly_amount: number;
  num_payments: number | null;
  signature_name: string;
  signed_at: string;
};
type InviteRow = {
  id: string;
  client_name: string;
  client_email: string;
  project_name: string;
  total_amount: number;
  monthly_amount: number;
  sent_at: string;
};

export default function AgreementsTab() {
  const [clientName, setClientName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string; link?: string } | null>(null);

  const [signed, setSigned] = useState<SignedRow[]>([]);
  const [invites, setInvites] = useState<InviteRow[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/agreements/list");
      const d = await r.json();
      setSigned(d.signed || []);
      setInvites(d.invites || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const monthly = parseFloat(monthlyAmount) || 0;
  const total = parseFloat(totalAmount) || 0;
  const numPayments = monthly >= 300 ? Math.ceil(total / monthly) : 0;
  const canSend = clientName && projectName && clientEmail && total > 0 && monthly >= 300;

  async function send() {
    if (!canSend || sending) return;
    setSending(true);
    setMsg(null);
    try {
      const r = await fetch("/api/admin/agreements/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          projectName,
          clientEmail,
          totalAmount: total,
          monthlyAmount: monthly,
          numPayments,
          note: note || undefined,
        }),
      });
      const d = await r.json();
      if (!r.ok || !d.ok) {
        setMsg({ kind: "err", text: d.error || "Send failed" });
      } else {
        setMsg({ kind: "ok", text: `Sent to ${clientEmail}`, link: d.signingUrl });
        setClientName(""); setProjectName(""); setClientEmail(""); setTotalAmount(""); setMonthlyAmount(""); setNote("");
        load();
      }
    } catch (err) {
      setMsg({ kind: "err", text: err instanceof Error ? err.message : "Network error" });
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ padding: "1.5rem", maxWidth: 900, margin: "0 auto", color: TEXT, fontFamily: "Inter, system-ui, sans-serif" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0, color: TEXT }}>Agreements</h1>
      <p style={{ color: DIM, fontSize: "0.85rem", marginTop: 6 }}>
        Send an installment-agreement signing link to a prospect. They get a pre-filled form, sign, and you get an email + a row in the table below.
      </p>

      {/* Send form */}
      <section style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "1.25rem", marginTop: "1.5rem" }}>
        <div style={{ fontSize: "0.7rem", color: GREEN, fontFamily: "'Space Mono', monospace", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>
          Send a signing link
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Client name *">
            <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Jane Doe" style={inp} />
          </Field>
          <Field label="Client email *">
            <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="jane@example.com" style={inp} />
          </Field>
          <Field label="Project name *" full>
            <input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Vendor Portal" style={inp} />
          </Field>
          <Field label="Total amount *">
            <input type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} placeholder="5000" style={inp} />
          </Field>
          <Field label="Monthly payment * (min $300)">
            <input type="number" value={monthlyAmount} onChange={(e) => setMonthlyAmount(e.target.value)} placeholder="500" min="300" style={inp} />
          </Field>
          <Field label="Optional note (shows in the email)" full>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Looking forward to building this with you." style={{ ...inp, minHeight: 60, fontFamily: "inherit" }} />
          </Field>
        </div>

        {numPayments > 0 && (
          <div style={{ marginTop: 12, padding: "10px 12px", background: BG, borderRadius: 8, border: "1px solid rgba(200,255,0,0.12)", fontSize: "0.85rem", color: TEXT }}>
            <strong style={{ color: GREEN }}>{numPayments} payments</strong> of ${monthly.toLocaleString()} → total ${total.toLocaleString()}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
          <button
            onClick={send}
            disabled={!canSend || sending}
            style={{
              padding: "9px 18px",
              background: (!canSend || sending) ? "#333" : GREEN,
              color: (!canSend || sending) ? "#666" : BG,
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: (!canSend || sending) ? "not-allowed" : "pointer",
              fontFamily: "inherit",
            }}
          >
            {sending ? "Sending…" : "Send signing link"}
          </button>
          {msg && (
            <div style={{ fontSize: "0.8rem", color: msg.kind === "ok" ? GREEN : "#ff6b6b" }}>
              {msg.text}
              {msg.link && <> · <a href={msg.link} target="_blank" rel="noreferrer" style={{ color: GREEN }}>preview link</a></>}
            </div>
          )}
        </div>
      </section>

      {/* Signed */}
      <section style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "1.25rem", marginTop: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: "0.7rem", color: GREEN, fontFamily: "'Space Mono', monospace", letterSpacing: "1.5px", textTransform: "uppercase" }}>
            Signed agreements · {signed.length}
          </div>
          <button onClick={load} disabled={loading} style={{ background: "transparent", border: `1px solid ${BORDER}`, color: DIM, fontSize: "0.75rem", padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit" }}>
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>
        {signed.length === 0 ? (
          <div style={{ color: DIM, fontSize: "0.85rem", padding: "8px 0" }}>No signed agreements yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {signed.map((s) => (
              <div key={s.id} style={{ padding: "10px 12px", background: BG, border: `1px solid ${BORDER}`, borderRadius: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{s.client_name} — {s.project_name}</div>
                  <div style={{ fontSize: "0.7rem", color: DIM, fontFamily: "'Space Mono', monospace" }}>{new Date(s.signed_at).toLocaleString()}</div>
                </div>
                <div style={{ fontSize: "0.78rem", color: DIM, marginTop: 4 }}>
                  ${s.total_amount.toLocaleString()} · ${s.monthly_amount.toLocaleString()}/mo{s.num_payments ? ` × ${s.num_payments}` : ""}
                  {s.client_email && <> · {s.client_email}</>}
                  · signed by <span style={{ color: TEXT, fontStyle: "italic" }}>{s.signature_name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Invites */}
      <section style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "1.25rem", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.7rem", color: DIM, fontFamily: "'Space Mono', monospace", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>
          Pending invites · {invites.filter((i) => !signed.find((s) => s.client_email === i.client_email && s.project_name === i.project_name)).length}
        </div>
        {invites.length === 0 ? (
          <div style={{ color: DIM, fontSize: "0.85rem" }}>No invites sent yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {invites.map((i) => {
              const isSigned = !!signed.find((s) => s.client_email === i.client_email && s.project_name === i.project_name);
              return (
                <div key={i.id} style={{ padding: "8px 12px", background: BG, border: `1px solid ${BORDER}`, borderRadius: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "0.82rem" }}>
                    {i.client_name} · {i.project_name}
                    <span style={{ color: DIM, marginLeft: 8, fontSize: "0.75rem" }}>({i.client_email})</span>
                  </div>
                  <div style={{ fontSize: "0.7rem", fontFamily: "'Space Mono', monospace", color: isSigned ? GREEN : DIM }}>
                    {isSigned ? "✓ signed" : `sent ${new Date(i.sent_at).toLocaleDateString()}`}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : "auto" }}>
      <label style={{ fontSize: "0.72rem", color: DIM, display: "block", marginBottom: 4 }}>{label}</label>
      {children}
    </div>
  );
}

const inp: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  background: BG,
  border: `1px solid ${BORDER}`,
  borderRadius: 6,
  color: TEXT,
  fontSize: "0.85rem",
  fontFamily: "inherit",
  outline: "none",
};
