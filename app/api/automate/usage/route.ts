import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/*
  POST /api/automate/usage
  Called by the AI agent system after each conversation to increment the count.
  Stripe metered billing is handled via the subscription.

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
