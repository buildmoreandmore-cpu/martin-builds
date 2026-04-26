"use client";

import { useEffect, useMemo, useState } from "react";

const BG = "#0a0a0a";
const CARD = "#111";
const BORDER = "#222";
const GREEN = "#c8ff00";
const TEXT = "#f5f5f0";
const DIM = "#888";

type Slot = { start: string; end: string };
type Step = "pick-date" | "pick-time" | "details" | "success";

export default function BookPage() {
  const [step, setStep] = useState<Step>("pick-date");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [tz, setTz] = useState("America/New_York");

  useEffect(() => {
    try {
      setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York");
    } catch { /* default */ }
  }, []);

  // Build next 21 selectable days (skip weekends)
  const days = useMemo(() => {
    const out: { iso: string; label: string; sub: string; disabled: boolean }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let added = 0;
    for (let i = 0; i < 30 && added < 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const dow = d.getDay();
      if (dow === 0 || dow === 6) continue;
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      out.push({
        iso,
        label: d.toLocaleDateString("en-US", { weekday: "short" }),
        sub: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        disabled: false,
      });
      added++;
    }
    return out;
  }, []);

  async function loadSlots(dateIso: string) {
    setSlotsLoading(true);
    setSlots([]);
    try {
      const res = await fetch(`/api/book/slots?date=${dateIso}`);
      if (res.ok) {
        const data = await res.json();
        setSlots(data.slots || []);
      }
    } catch { /* ignore */ }
    setSlotsLoading(false);
  }

  function pickDate(iso: string) {
    setSelectedDate(iso);
    setStep("pick-time");
    loadSlots(iso);
  }

  function pickSlot(slot: Slot) {
    setSelectedSlot(slot);
    setStep("details");
  }

  async function submit() {
    if (!selectedSlot || !name.trim() || !email.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: selectedSlot.start,
          name: name.trim(),
          email: email.trim(),
          business: business.trim() || undefined,
          message: message.trim() || undefined,
          timezone: tz,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Booking failed");
        setSubmitting(false);
        return;
      }
      setStep("success");
    } catch {
      setError("Network error. Try again.");
    }
    setSubmitting(false);
  }

  const slotTimeFmt = (iso: string) => new Date(iso).toLocaleTimeString("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" });
  const fullDateFmt = (iso: string) => new Date(iso).toLocaleString("en-US", { timeZone: tz, weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" });

  return (
    <main style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: "Arial,'Helvetica Neue',sans-serif", padding: "clamp(2rem,6vw,4rem) 1rem", position: "relative", overflow: "hidden" }}>
      {/* Background gradient orbs */}
      <div className="bg-orb orb1" />
      <div className="bg-orb orb2" />

      <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: 40, textAlign: "center" }} className="fade-in">
          <h1 style={{ fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, letterSpacing: "-1px", margin: 0 }}>
            <span style={{ color: GREEN }}>m</span>artin<span style={{ color: GREEN }}>.</span>builds
          </h1>
          <p style={{ fontSize: 12, color: DIM, marginTop: 8, textTransform: "uppercase", letterSpacing: 2 }}>Book a 15-min discovery call</p>
        </div>

        {/* Stepper */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 32 }}>
          {(["pick-date", "pick-time", "details", "success"] as Step[]).map((s, i) => {
            const idx = (["pick-date", "pick-time", "details", "success"] as Step[]).indexOf(step);
            const active = i <= idx;
            return <div key={s} className={active ? "step-active" : "step-dot"} style={{ width: 32, height: 4, borderRadius: 2, background: active ? GREEN : "#222", transition: "all 0.4s ease" }} />;
          })}
        </div>

        {/* Step 1: Pick Date */}
        {step === "pick-date" && (
          <section className="slide-up">
            <h2 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.5px" }}>Pick a day</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: 10 }}>
              {days.map((d, i) => (
                <button
                  key={d.iso}
                  onClick={() => pickDate(d.iso)}
                  className="slot-btn"
                  style={{
                    padding: "14px 8px",
                    background: CARD,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 10,
                    color: TEXT,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s ease",
                    animationDelay: `${i * 30}ms`,
                  }}
                >
                  <div style={{ fontSize: 11, color: DIM, textTransform: "uppercase", letterSpacing: 1 }}>{d.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>{d.sub}</div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Step 2: Pick Time */}
        {step === "pick-time" && (
          <section className="slide-up">
            <button onClick={() => setStep("pick-date")} style={{ background: "transparent", border: "none", color: DIM, fontSize: 12, cursor: "pointer", marginBottom: 16, fontFamily: "inherit" }}>
              ← back to dates
            </button>
            <h2 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 700, marginBottom: 8, letterSpacing: "-0.5px" }}>Pick a time</h2>
            <p style={{ fontSize: 13, color: DIM, marginBottom: 20 }}>{new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · times shown in <strong style={{ color: TEXT }}>{tz}</strong></p>

            {slotsLoading && (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div className="loader" />
                <p style={{ fontSize: 12, color: DIM, marginTop: 12 }}>Loading available slots...</p>
              </div>
            )}

            {!slotsLoading && slots.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 0", color: DIM, fontSize: 14 }}>
                No times available this day. Try another date.
              </div>
            )}

            {!slotsLoading && slots.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 10 }}>
                {slots.map((s, i) => (
                  <button
                    key={s.start}
                    onClick={() => pickSlot(s)}
                    className="slot-btn"
                    style={{
                      padding: "12px 8px",
                      background: CARD,
                      border: `1px solid ${BORDER}`,
                      borderRadius: 10,
                      color: TEXT,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: 14,
                      fontWeight: 600,
                      transition: "all 0.2s ease",
                      animationDelay: `${i * 25}ms`,
                    }}
                  >
                    {slotTimeFmt(s.start)}
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Step 3: Details */}
        {step === "details" && selectedSlot && (
          <section className="slide-up">
            <button onClick={() => setStep("pick-time")} style={{ background: "transparent", border: "none", color: DIM, fontSize: 12, cursor: "pointer", marginBottom: 16, fontFamily: "inherit" }}>
              ← change time
            </button>
            <h2 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 700, marginBottom: 8, letterSpacing: "-0.5px" }}>Confirm your booking</h2>
            <p style={{ fontSize: 13, color: GREEN, marginBottom: 20, fontWeight: 600 }}>
              {fullDateFmt(selectedSlot.start)}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                type="text"
                placeholder="Your name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Business name"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                style={inputStyle}
              />
              <textarea
                placeholder="Anything specific you'd like to discuss? (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: "vertical" as const, minHeight: 80, fontFamily: "inherit" }}
              />

              {error && <p style={{ fontSize: 13, color: "#ff6666", margin: 0 }}>{error}</p>}

              <button
                onClick={submit}
                disabled={submitting || !name.trim() || !email.trim()}
                className="cta-btn"
                style={{
                  marginTop: 8,
                  padding: "16px 24px",
                  background: GREEN,
                  color: BG,
                  border: "none",
                  borderRadius: 100,
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: submitting || !name.trim() || !email.trim() ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  letterSpacing: 0.5,
                  opacity: submitting || !name.trim() || !email.trim() ? 0.6 : 1,
                  transition: "all 0.2s ease",
                }}
              >
                {submitting ? "Booking..." : "Confirm 15-min call"}
              </button>
            </div>
          </section>
        )}

        {/* Step 4: Success */}
        {step === "success" && selectedSlot && (
          <section className="slide-up" style={{ textAlign: "center" }}>
            <div className="success-check">
              <svg viewBox="0 0 52 52" width="80" height="80">
                <circle cx="26" cy="26" r="24" fill="none" stroke={GREEN} strokeWidth="2" className="check-circle" />
                <path d="M14 27 l8 8 l16-16" fill="none" stroke={GREEN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="check-mark" />
              </svg>
            </div>
            <h2 style={{ fontSize: "clamp(24px,4vw,32px)", fontWeight: 700, marginTop: 24, letterSpacing: "-0.5px" }}>You&apos;re booked.</h2>
            <p style={{ fontSize: 15, color: GREEN, marginTop: 8, fontWeight: 600 }}>{fullDateFmt(selectedSlot.start)}</p>
            <p style={{ fontSize: 14, color: DIM, marginTop: 16, lineHeight: 1.6, maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
              A confirmation email is on its way to <strong style={{ color: TEXT }}>{email}</strong> with a calendar invite. I&rsquo;ll send the meeting link a few hours before we chat.
            </p>
            <a href="https://martinbuilds.ai" style={{ display: "inline-block", marginTop: 32, fontSize: 13, color: DIM, textDecoration: "underline" }}>← back to martin.builds</a>
          </section>
        )}
      </div>

      <style jsx>{`
        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
        }
        .orb1 {
          width: 400px;
          height: 400px;
          background: ${GREEN};
          top: -100px;
          left: -150px;
          animation: float 20s ease-in-out infinite;
        }
        .orb2 {
          width: 300px;
          height: 300px;
          background: #c084fc;
          bottom: -100px;
          right: -100px;
          animation: float 25s ease-in-out infinite reverse;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(40px, 30px); }
        }

        .fade-in {
          animation: fadeIn 0.6s ease forwards;
        }
        .slide-up {
          animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        :global(.slot-btn) {
          opacity: 0;
          animation: slotIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        :global(.slot-btn:hover) {
          border-color: ${GREEN} !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px -8px ${GREEN}40;
        }
        @keyframes slotIn {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        :global(.cta-btn:hover:not(:disabled)) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px -8px ${GREEN}60;
        }

        .loader {
          width: 32px;
          height: 32px;
          border: 2px solid #222;
          border-top-color: ${GREEN};
          border-radius: 50%;
          margin: 0 auto;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .success-check :global(.check-circle) {
          stroke-dasharray: 153;
          stroke-dashoffset: 153;
          animation: drawCircle 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.1s forwards;
        }
        .success-check :global(.check-mark) {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: drawCheck 0.4s cubic-bezier(0.65, 0, 0.45, 1) 0.7s forwards;
        }
        @keyframes drawCircle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "14px 16px",
  background: CARD,
  border: `1px solid ${BORDER}`,
  borderRadius: 8,
  color: TEXT,
  fontSize: 15,
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s ease",
};
