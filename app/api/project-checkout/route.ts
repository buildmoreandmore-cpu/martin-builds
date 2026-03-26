import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      client_name,
      client_email,
      client_phone,
      project_name,
      project_description,
      total_amount, // in dollars
      phase, // "1" or "2"
      project_id, // For phase 2, pass existing project_id
    } = body;

    // Validation
    if (!client_name || !client_email || !project_name) {
      return NextResponse.json(
        { error: "Missing required fields: client_name, client_email, project_name" },
        { status: 400 }
      );
    }

    if (phase === "2" && !project_id) {
      return NextResponse.json(
        { error: "project_id required for Phase 2 payment" },
        { status: 400 }
      );
    }

    // Phase 1: Initial deposit (50%)
    if (phase === "1" || !phase) {
      if (!total_amount || total_amount <= 0) {
        return NextResponse.json(
          { error: "total_amount must be greater than 0" },
          { status: 400 }
        );
      }

      const totalCents = Math.round(total_amount * 100);
      const phase1Amount = Math.round(totalCents / 2); // 50% deposit
      const phase2Amount = totalCents - phase1Amount; // Remaining amount

      // Create or retrieve Stripe customer
      let customer: Stripe.Customer;
      const existingCustomers = await stripe.customers.list({
        email: client_email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: client_email,
          name: client_name,
          phone: client_phone,
          metadata: {
            source: "martin.builds",
            project_type: "two_phase",
          },
        });
      }

      // Create Phase 1 payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: phase1Amount,
        currency: "usd",
        customer: customer.id,
        receipt_email: client_email,
        metadata: {
          client_name,
          client_email,
          project_name,
          payment_type: "two_phase",
          phase: "1",
          total_phases: "2",
          total_amount: totalCents.toString(),
        },
        description: `${project_name} - Phase 1 Deposit (50%)`,
      });

      // Create project record in Supabase
      const { data: project, error: dbError } = await supabase
        .from("project_payments")
        .insert({
          client_name,
          client_email,
          client_phone,
          project_name,
          project_description,
          total_amount: totalCents,
          phase_1_amount: phase1Amount,
          phase_2_amount: phase2Amount,
          stripe_customer_id: customer.id,
          phase_1_payment_intent_id: paymentIntent.id,
          phase_1_status: "pending",
          phase_2_status: "pending",
          project_status: "awaiting_deposit",
          phase_1_payment_link: `${process.env.NEXT_PUBLIC_BASE_URL || "https://martinbuilds.ai"}/pay/${paymentIntent.id}`,
        })
        .select()
        .single();

      if (dbError) {
        console.error("Supabase insert error:", dbError);
        return NextResponse.json(
          { error: "Failed to create project record", details: dbError.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        phase: 1,
        project_id: project.id,
        client_secret: paymentIntent.client_secret,
        amount: phase1Amount,
        total_amount: totalCents,
        payment_link: project.phase_1_payment_link,
      });
    }

    // Phase 2: Final payment (remaining 50%)
    if (phase === "2") {
      // Fetch project from database
      const { data: project, error: fetchError } = await supabase
        .from("project_payments")
        .select("*")
        .eq("id", project_id)
        .single();

      if (fetchError || !project) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }

      // Check if phase 1 is paid
      if (project.phase_1_status !== "paid") {
        return NextResponse.json(
          { error: "Phase 1 payment must be completed before Phase 2" },
          { status: 400 }
        );
      }

      // Check if phase 2 already paid
      if (project.phase_2_status === "paid") {
        return NextResponse.json(
          { error: "Phase 2 already paid" },
          { status: 400 }
        );
      }

      // Create Phase 2 payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: project.phase_2_amount,
        currency: "usd",
        customer: project.stripe_customer_id,
        receipt_email: project.client_email,
        metadata: {
          client_name: project.client_name,
          client_email: project.client_email,
          project_name: project.project_name,
          payment_type: "two_phase",
          phase: "2",
          total_phases: "2",
          project_id: project.id,
        },
        description: `${project.project_name} - Phase 2 Final Payment (50%)`,
      });

      // Update project with phase 2 payment intent
      const { error: updateError } = await supabase
        .from("project_payments")
        .update({
          phase_2_payment_intent_id: paymentIntent.id,
          phase_2_status: "ready",
          project_status: "awaiting_final_payment",
          phase_2_payment_link: `${process.env.NEXT_PUBLIC_BASE_URL || "https://martinbuilds.ai"}/pay/${paymentIntent.id}`,
        })
        .eq("id", project_id);

      if (updateError) {
        console.error("Supabase update error:", updateError);
        return NextResponse.json(
          { error: "Failed to update project" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        phase: 2,
        project_id: project.id,
        client_secret: paymentIntent.client_secret,
        amount: project.phase_2_amount,
        payment_link: `${process.env.NEXT_PUBLIC_BASE_URL || "https://martinbuilds.ai"}/pay/${paymentIntent.id}`,
      });
    }

    return NextResponse.json(
      { error: "Invalid phase specified" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Project checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
