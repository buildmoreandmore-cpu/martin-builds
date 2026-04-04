import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";

/*
  POST /api/automate/usage
  Called by the AI agent system after each conversation to:
  1. Send a meter event to Stripe (for metered billing)
  2. Increment conversation count in Supabase

  Body: { client_id: string, conversations?: number }
*/
export async function POST(req: NextRequest) {
  try {
    const { client_id, conversations = 1 } = await req.json();

    const { data: client, error } = await supabase
      .from("agent_subscriptions")
      .select("*")
      .eq("id", client_id)
      .single();

    if (error || !client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    if (client.status !== "active") {
      return NextResponse.json({ error: "Client is not active" }, { status: 400 });
    }

    // Send meter event to Stripe for billing
    if (client.stripe_customer_id && STRIPE_KEY) {
      try {
        await fetch("https://api.stripe.com/v1/billing/meter_events", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${STRIPE_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            event_name: "ai_agent_conversation",
            "payload[stripe_customer_id]": client.stripe_customer_id,
            "payload[value]": String(conversations),
          }),
        });
      } catch (meterErr) {
        console.error("[Automate Usage] Meter event failed:", meterErr);
      }
    }

    // Increment in Supabase
    const newCount = (client.conversations_this_month || 0) + conversations;
    await supabase
      .from("agent_subscriptions")
      .update({
        conversations_this_month: newCount,
        last_conversation_at: new Date().toISOString(),
      })
      .eq("id", client_id);

    return NextResponse.json({
      success: true,
      conversations_this_month: newCount,
    });
  } catch (err) {
    console.error("[Automate Usage] Error:", err);
    return NextResponse.json({ error: "Failed to report usage" }, { status: 500 });
  }
}
