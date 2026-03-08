"use client";

import { useState, useEffect } from "react";

const TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getWeekdays(): { label: string; num: number; date: string }[] {
  const result = [];
  const today = new Date();
  let added = 0;
  let offset = 1;
  while (added < 5) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      result.push({
        label: DAYS[d.getDay()],
        num: d.getDate(),
        date: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      });
      added++;
    }
    offset++;
  }
  return result;
}

export default function DiscoveryBookingCard() {
  const [step, setStep] = useState(1);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [biz, setBiz] = useState("");
  const [question, setQuestion] = useState("");
  const [weekdays, setWeekdays] = useState<{ label: string; num: number; date: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setWeekdays(getWeekdays());
    const params = new URLSearchParams(window.location.search);
    if (params.get("booked") === "1") {
      setName(params.get("name") || "");
      setSelectedDay(params.get("date") || "");
      setSelectedTime(params.get("time") || "");
      setStep(3);
    }
  }, []);

  const step1Valid = !!(selectedDay && selectedTime);
  const step2Valid = !!(name.trim() && email.includes("@"));

  const goTo = (n: number) => setStep(n);

  const handleBook = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/discovery-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, business: biz, question, date: selectedDay, time: selectedTime }),
      });
      const data = await res.json();
      if (data.ok) {
        setStep(3);
      } else {
        setError(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setError("Connection error. Try again.");
    }
    setLoading(false);
  };

  return (
    <div
      id="book"
      style={{
        background: "#1a1a1a",
        border: "1px solid rgba(245,245,240,0.06)",
        borderRadius: "16px",
        padding: "2.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#c8ff00", borderRadius: "16px 16px 0 0" }} />

      <div style={{ display: "inline-block", background: "rgba(200,255,0,0.1)", color: "#c8ff00", fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", padding: "0.4rem 1rem", borderRadius: "100px", marginBottom: "1.5rem" }}>
        Free — 30 Minutes
      </div>

      <div style={{ fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1 }}>$0</div>
      <div style={{ fontSize: "0.9rem", color: "#888", marginTop: "0.3rem", marginBottom: "1.5rem" }}>
        30-minute discovery call via Zoom
      </div>

      <ul style={{ listStyle: "none", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {[
          "1-on-1 with Francis — no bots, no assistants",
          "Understand your business and what AI can do for it",
          "Walk away with a clear next step",
          "Zero obligation — no hard sell",
        ].map((item) => (
          <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem", fontSize: "0.95rem", color: "rgba(245,245,240,0.85)", lineHeight: 1.5 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
              <circle cx="9" cy="9" r="8.5" stroke="rgba(200,255,0,0.3)" />
              <path d="M5.5 9L7.8 11.5L12.5 6.5" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {item}
          </li>
        ))}
      </ul>

      <div style={{ borderTop: "1px solid rgba(245,245,240,0.06)", marginBottom: "1.5rem" }} />

      {/* Step dots */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {[1, 2, 3].map((n) => (
          <div key={n} style={{ width: "40px", height: "4px", borderRadius: "2px", background: n < step ? "#a8d600" : n === step ? "#c8ff00" : "#2a2a2a", transition: "background 0.3s" }} />
        ))}
      </div>

      {/* STEP 1: Pick date/time */}
      {step === 1 && (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <label style={labelStyle}>Pick a day</label>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.2rem", overflowX: "auto", paddingBottom: "0.3rem" }}>
            {weekdays.map((d) => (
              <div
                key={d.date}
                onClick={() => setSelectedDay(d.date)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  padding: "0.7rem 1rem",
                  background: selectedDay === d.date ? "rgba(200,255,0,0.1)" : "#2a2a2a",
                  border: `1px solid ${selectedDay === d.date ? "#c8ff00" : "rgba(245,245,240,0.08)"}`,
                  borderRadius: "10px", cursor: "pointer", minWidth: "70px", transition: "all 0.2s", userSelect: "none",
                }}
              >
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: selectedDay === d.date ? "#c8ff00" : "#888", textTransform: "uppercase", letterSpacing: "1px" }}>{d.label}</span>
                <span style={{ fontSize: "1.2rem", fontWeight: 700, marginTop: "0.2rem", color: selectedDay === d.date ? "#c8ff00" : "#f5f5f0" }}>{d.num}</span>
              </div>
            ))}
          </div>

          <label style={labelStyle}>Pick a time (EST)</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem", marginBottom: "1.25rem" }}>
            {TIMES.map((t) => (
              <div
                key={t}
                onClick={() => setSelectedTime(t)}
                style={{
                  padding: "0.7rem", textAlign: "center",
                  background: selectedTime === t ? "rgba(200,255,0,0.1)" : "#2a2a2a",
                  border: `1px solid ${selectedTime === t ? "#c8ff00" : "rgba(245,245,240,0.08)"}`,
                  borderRadius: "10px", fontFamily: "'Space Mono', monospace", fontSize: "0.8rem",
                  color: selectedTime === t ? "#c8ff00" : "#888", cursor: "pointer",
                  fontWeight: selectedTime === t ? 700 : 400, transition: "all 0.2s", userSelect: "none",
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <PrimaryBtn disabled={!step1Valid} onClick={() => goTo(2)}>Continue</PrimaryBtn>
        </div>
      )}

      {/* STEP 2: Info */}
      {step === 2 && (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <label style={labelStyle}>Your info</label>
          <input style={inputStyle} type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <input style={inputStyle} type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input style={inputStyle} type="text" placeholder="Business name (optional)" value={biz} onChange={(e) => setBiz(e.target.value)} />
          <label style={labelStyle}>What do you want to explore?</label>
          <span style={{ fontSize: "0.8rem", color: "#888", marginBottom: "0.75rem", display: "block" }}>
            Helps me prep so we make the most of 30 minutes.
          </span>
          <textarea
            style={{ ...inputStyle, minHeight: "90px", resize: "vertical" }}
            placeholder="e.g. I want to automate client onboarding but don't know where to start..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          {error && <p style={{ color: "#ff4444", fontSize: "0.85rem", marginBottom: "0.75rem" }}>{error}</p>}
          <PrimaryBtn disabled={!step2Valid || loading} onClick={handleBook}>
            {loading ? "Booking..." : "Book My Free Call"}
          </PrimaryBtn>
          <button onClick={() => goTo(1)} style={{ background: "none", border: "none", color: "#888", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", cursor: "pointer", padding: "0.6rem 0", marginTop: "0.5rem", display: "block", width: "100%", textAlign: "center", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#f5f5f0")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#888")}
          >
            &larr; Back
          </button>
        </div>
      )}

      {/* STEP 3: Confirmed */}
      {step === 3 && (
        <div style={{ textAlign: "center", padding: "0.5rem 0", animation: "fadeIn 0.3s ease" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
              <path d="M2 11L10 19L26 2" stroke="#c8ff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.5rem" }}>You&apos;re booked.</div>
          <div style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            I&apos;ll send you a calendar invite and Zoom link within 24 hours. Looking forward to it.
          </div>
          <div style={{ background: "#2a2a2a", borderRadius: "10px", padding: "1.25rem", textAlign: "left", marginBottom: "1.5rem" }}>
            {[
              ["Name", name],
              ["Date", selectedDay ?? ""],
              ["Time", `${selectedTime} EST`],
              ["Price", "Free"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", fontSize: "0.85rem" }}>
                <span style={{ color: "#888" }}>{label}</span>
                <span style={{ fontWeight: 600, color: label === "Price" ? "#c8ff00" : "#f5f5f0" }}>{value}</span>
              </div>
            ))}
          </div>
          <a href="/" style={{ display: "block", textAlign: "center", background: "#c8ff00", color: "#0a0a0a", padding: "0.9rem 1.5rem", borderRadius: "100px", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
            Back to martin.builds
          </a>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function PrimaryBtn({ disabled, onClick, children }: { disabled: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        width: "100%", padding: "1rem",
        background: disabled ? "rgba(200,255,0,0.3)" : "#c8ff00",
        color: "#0a0a0a", border: "none", borderRadius: "100px",
        fontFamily: "'Outfit', sans-serif", fontSize: "1rem", fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.3s", opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );
}

const labelStyle: React.CSSProperties = { fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.6rem", display: "block" };

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.85rem 1rem", background: "#2a2a2a",
  border: "1px solid rgba(245,245,240,0.08)", borderRadius: "10px",
  color: "#f5f5f0", fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem",
  outline: "none", marginBottom: "0.75rem", display: "block",
};
