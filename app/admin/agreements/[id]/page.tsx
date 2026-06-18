import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import PrintButton from "./PrintButton";

type SignedAgreement = {
  id: string;
  client_name: string;
  client_email: string | null;
  project_name: string;
  total_amount: number;
  monthly_amount: number;
  num_payments: number | null;
  signature_name: string;
  invite_id: string | null;
  signed_at: string;
  ip_address: string | null;
  user_agent: string | null;
};

export const dynamic = "force-dynamic";

export default async function SignedAgreementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabase
    .from("signed_agreements")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();
  const a = data as SignedAgreement;

  const isOneTime = (a.num_payments === 1) || (a.total_amount === a.monthly_amount);
  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 0 });
  const signedDate = new Date(a.signed_at);
  const dateStr = signedDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const timeStr = signedDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" });

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f0", padding: "32px 16px", fontFamily: "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif" }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .doc { box-shadow: none !important; border: none !important; max-width: 100% !important; padding: 0 !important; }
        }
        @page { size: letter; margin: 0.6in; }
      `}</style>

      {/* Top bar — hidden in print */}
      <div className="no-print" style={{ maxWidth: 720, margin: "0 auto 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <a href="/admin" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>← back to admin</a>
        <PrintButton />
      </div>

      {/* Document */}
      <div className="doc" style={{ maxWidth: 720, margin: "0 auto", background: "#ffffff", padding: "56px 56px 48px", borderRadius: 8, border: "1px solid #e5e5e5", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32, borderBottom: "1px solid #e5e5e5", paddingBottom: 16 }}>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, color: "#0a0a0a", letterSpacing: "0.05em" }}>
              martin<span style={{ color: "#4d8400" }}>.builds</span>
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>agent@martinbuilds.ai · martinbuilds.ai</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>Signed</div>
            <div style={{ fontSize: 13, color: "#0a0a0a", marginTop: 2 }}>{dateStr}</div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>{timeStr}</div>
          </div>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px 0", color: "#0a0a0a", letterSpacing: "-0.02em" }}>
          {isOneTime ? "Service Agreement" : "Installment Payment Agreement"}
        </h1>
        <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 32 }}>
          Between Martin Builds and {a.client_name}{a.client_email ? ` (${a.client_email})` : ""}
        </div>

        {/* Project + payment */}
        <div style={{ background: "#FAFAF7", border: "1px solid #E8E3DC", borderRadius: 10, padding: "20px 24px", marginBottom: 32 }}>
          <div style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: 4 }}>
            Project
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, color: "#0a0a0a", marginBottom: 18 }}>{a.project_name}</div>

          <div style={{ fontSize: 34, fontWeight: 800, color: "#0a0a0a", lineHeight: 1.1, letterSpacing: "-0.5px" }}>
            ${fmt(a.total_amount)}
          </div>
          <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>
            {isOneTime
              ? "One-time payment"
              : `${a.num_payments || "?"} monthly payments of $${fmt(a.monthly_amount)}`}
          </div>
        </div>

        {/* Terms */}
        <h2 style={{ fontSize: 14, fontWeight: 700, color: "#0a0a0a", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12, marginTop: 0 }}>
          Terms
        </h2>
        <ol style={{ paddingLeft: 20, margin: 0, marginBottom: 32, fontSize: 13, color: "#1f2937", lineHeight: 1.7 }}>
          <li style={{ marginBottom: 10 }}>
            {isOneTime ? (
              <><strong>Payment Method.</strong> Payment is processed via Stripe at the time of signing or shortly after, using the card or method provided.</>
            ) : (
              <><strong>Autopay Required.</strong> A valid credit or debit card must remain on file. Payments are processed automatically on the same date each month via Stripe.</>
            )}
          </li>
          <li style={{ marginBottom: 10 }}>
            <strong>Fixed Payment.</strong> The payment amount agreed above is fixed for the duration of this plan.
          </li>
          <li style={{ marginBottom: 10 }}>
            <strong>Ownership Transfer.</strong> Full ownership and unrestricted access to the delivered product transfers only after {isOneTime ? "the payment is received in full" : "the final installment is received in full"}.
          </li>
          {!isOneTime && (
            <li style={{ marginBottom: 10 }}>
              <strong>Failed Payments.</strong> If a scheduled payment fails, Stripe will automatically retry up to 3 times. If all retries fail, Martin Builds reserves the right to pause access until the outstanding balance is resolved.
            </li>
          )}
          <li style={{ marginBottom: 10 }}>
            <strong>Early Payoff.</strong> The client may pay the remaining balance in full at any time with no penalty or additional fees.
          </li>
          <li style={{ marginBottom: 10 }}>
            <strong>No Refunds.</strong> Payments for completed work are non-refundable. Cancellation does not entitle the client to a refund of payments already made.
          </li>
          <li>
            <strong>Late Payment.</strong> If the account remains delinquent for more than 30 days, Martin Builds may terminate this agreement and retain all payments received as compensation for work completed.
          </li>
        </ol>

        {/* Signature block */}
        <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: 24 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "#0a0a0a", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16, marginTop: 0 }}>
            Signature
          </h2>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 32, alignItems: "flex-end" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ borderBottom: "1px solid #1f2937", paddingBottom: 8 }}>
                <span style={{ fontStyle: "italic", fontSize: 22, color: "#0a0a0a", fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}>
                  {a.signature_name}
                </span>
              </div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 6 }}>Client signature (typed)</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0a0a0a" }}>{dateStr}</div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>Date signed</div>
            </div>
          </div>
        </div>

        {/* Footer / audit */}
        <div style={{ marginTop: 36, paddingTop: 16, borderTop: "1px solid #e5e5e5", fontSize: 10, color: "#9ca3af", lineHeight: 1.6 }}>
          Record ID: {a.id} {a.invite_id && <>· Invite: {a.invite_id}</>}<br />
          {a.ip_address && <>Signed from IP {a.ip_address}<br /></>}
          This agreement is governed by the laws of the State of Georgia.
        </div>
      </div>
    </div>
  );
}
