import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      client_name,
      client_email,
      client_phone,
      client_company,
      signature_name,
      signed_at,
    } = body;

    if (!client_name || !client_email || !signature_name || !signed_at) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Try to find the project by phase 1 or phase 2 payment intent ID
    const { data: project, error: fetchError } = await supabase
      .from("project_payments")
      .select("id")
      .or(
        `phase_1_payment_intent_id.eq.${id},phase_2_payment_intent_id.eq.${id}`
      )
      .single();

    if (fetchError || !project) {
      // No project record yet — that's OK, store signature info for webhook to pick up later
      // This happens when payment intents are created outside of the project-checkout flow
      console.log("No project_payments record found for PI:", id, "— skipping DB update");
      return NextResponse.json({ success: true, stored: false });
    }

    const { error: updateError } = await supabase
      .from("project_payments")
      .update({
        client_name,
        client_email,
        client_phone,
        client_company: client_company || null,
        signature_name,
        signed_at,
      })
      .eq("id", project.id);

    if (updateError) {
      console.error("Failed to update project_payments:", updateError);
      return NextResponse.json(
        { error: "Failed to save signature" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, stored: true });
  } catch (error) {
    console.error("Sign endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
