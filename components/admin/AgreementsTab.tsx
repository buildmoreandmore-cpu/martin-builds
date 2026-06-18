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
  const [paymentType, setPaymentType] = useState<"one_time" | "installments">("installments");
  const [totalAmount, setTotalAmount] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string; link?: string } | null>(null);

  const [signed, setSigned] = useState<SignedRow[]>([]);
  const [invites, setInvites] = useState<InviteRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

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

  const total = parseFloat(totalAmount) || 0;
  const isOneTime = paymentType === "one_time";
  // For one-time, monthly == total (single payment); for installments use entered monthly.
  const monthly = isOneTime ? total : (parseFloat(monthlyAmount) || 0);
  const numPayments = isOneTime ? 1 : (monthly > 0 ? Math.ceil(total / monthly) : 0);
  const canSend = Boolean(
    clientName && projectName && clientEmail && total > 0 &&
    (isOneTime || monthly > 0)
  );

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
          paymentType,
          totalAmount: total,
          monthlyAmount: monthly,
          numPayments,
          note: note || undefined,
        }),
      });
      const d = await r.json();
      if (!r.ok || !d.ok) {
        // Even when the email fails, the invite + URL were generated — let
        // the user copy the link and send it themselves.
        setMsg({ kind: "err", text: d.error || "Send failed", link: d.signingUrl });
      } else {
        setMsg({ kind: "ok", text: `Sent to ${clientEmail}`, link: d.signingUrl });
        setClientName(""); setProjectName(""); setClientEmail(""); setTotalAmount(""); setMonthlyAmount(""); setNote(""); setPaymentType("installments");
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
          <Field label="Payment type *" full>
            <div style={{ display: "flex", gap: 8 }}>
              <PaymentTypeOption active={paymentType === "one_time"} onClick={() => setPaymentType("one_time")} label="One-time" sub="Single flat fee" />
              <PaymentTypeOption active={paymentType === "installments"} onClick={() => setPaymentType("installments")} label="Installments" sub="Monthly payments" />
            </div>
          </Field>
          {isOneTime ? (
            <Field label="Amount *" full>
              <input type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} placeholder="5000" style={inp} />
            </Field>
          ) : (
            <>
              <Field label="Total amount *">
                <input type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} placeholder="5000" style={inp} />
              </Field>
              <Field label="Monthly payment *">
                <input type="number" value={monthlyAmount} onChange={(e) => setMonthlyAmount(e.target.value)} placeholder="500" style={inp} />
              </Field>
            </>
          )}
          <Field label="Optional note (shows in the email)" full>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Looking forward to building this with you." style={{ ...inp, minHeight: 60, fontFamily: "inherit" }} />
          </Field>
        </div>

        {total > 0 && (
          <div style={{ marginTop: 12, padding: "12px 14px", background: BG, borderRadius: 8, border: "1px solid rgba(200,255,0,0.12)", fontSize: "0.85rem", color: TEXT }}>
            {isOneTime ? (
              <><strong style={{ color: GREEN }}>Flat fee</strong> · ${total.toLocaleString()} one-time</>
            ) : monthly > 0 ? (
              <><strong style={{ color: GREEN }}>{numPayments} payments</strong> of ${monthly.toLocaleString()}/mo → total ${total.toLocaleString()}</>
            ) : (
              <span style={{ color: DIM }}>Enter a monthly payment to see the schedule</span>
            )}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
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
          <button
            onClick={() => setShowPreview((v) => !v)}
            style={{
              padding: "9px 14px",
              background: "transparent",
              color: TEXT,
              border: `1px solid ${BORDER}`,
              borderRadius: 8,
              fontWeight: 600,
              fontSize: "0.8rem",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {showPreview ? "Hide preview" : "Preview agreement"}
          </button>
          {msg && (
            <div style={{ fontSize: "0.8rem", color: msg.kind === "ok" ? GREEN : "#ff6b6b" }}>
              {msg.text}
              {msg.link && <> · <a href={msg.link} target="_blank" rel="noreferrer" style={{ color: GREEN }}>open link</a></>}
            </div>
          )}
        </div>
      </section>

      {/* Preview pane */}
      {showPreview && (
        <section style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "1rem", marginTop: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontSize: "0.7rem", color: GREEN, fontFamily: "'Space Mono', monospace", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              Preview — what the prospect will see
            </div>
            <a
              href={previewUrl(clientName, projectName, clientEmail, totalAmount, isOneTime ? totalAmount : monthlyAmount, numPayments, paymentType)}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: "0.75rem", color: DIM, textDecoration: "none", border: `1px solid ${BORDER}`, padding: "4px 10px", borderRadius: 6 }}
            >
              Open in new tab ↗
            </a>
          </div>
          <iframe
            key={previewUrl(clientName, projectName, clientEmail, totalAmount, isOneTime ? totalAmount : monthlyAmount, numPayments, paymentType)}
            src={previewUrl(clientName, projectName, clientEmail, totalAmount, isOneTime ? totalAmount : monthlyAmount, numPayments, paymentType)}
            style={{ width: "100%", height: 600, border: `1px solid ${BORDER}`, borderRadius: 8, background: BG }}
            title="Agreement preview"
          />
          <div style={{ fontSize: "0.72rem", color: DIM, marginTop: 8 }}>
            Live preview — updates as you fill the form. Clicking Sign inside the preview will fire the real signing flow, so use this read-only.
          </div>
        </section>
      )}

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

function previewUrl(client: string, project: string, email: string, total: string, monthly: string, numPayments: number, paymentType?: "one_time" | "installments"): string {
  const params = new URLSearchParams();
  if (client) params.set("client", client);
  if (project) params.set("project", project);
  if (email) params.set("email", email);
  if (total) params.set("total", total);
  if (monthly) params.set("monthly", monthly);
  if (numPayments) params.set("payments", String(numPayments));
  if (paymentType) params.set("type", paymentType);
  const q = params.toString();
  return `/installment-agreement${q ? `?${q}` : ""}`;
}

function PaymentTypeOption({ active, onClick, label, sub }: { active: boolean; onClick: () => void; label: string; sub: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        padding: "10px 14px",
        background: active ? "rgba(200,255,0,0.08)" : BG,
        border: `1px solid ${active ? GREEN : BORDER}`,
        borderRadius: 8,
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "inherit",
      }}
    >
      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: active ? GREEN : TEXT, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: "0.72rem", color: DIM }}>{sub}</div>
    </button>
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
