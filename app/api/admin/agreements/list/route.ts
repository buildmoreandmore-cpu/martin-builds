import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const [signedRes, invitesRes] = await Promise.all([
      supabase
        .from("signed_agreements")
        .select("id, client_name, client_email, project_name, total_amount, monthly_amount, num_payments, signature_name, signed_at, invite_id")
        .order("signed_at", { ascending: false })
        .limit(50),
      supabase
        .from("agreement_invites")
        .select("id, client_name, client_email, project_name, total_amount, monthly_amount, sent_at")
        .order("sent_at", { ascending: false })
        .limit(50),
    ]);

    const signed = (signedRes.data as unknown[] | null) || [];
    const invites = (invitesRes.data as unknown[] | null) || [];
    return NextResponse.json({ signed, invites });
  } catch (err) {
    return NextResponse.json({ signed: [], invites: [], error: String(err) }, { status: 500 });
  }
}
