import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

const TIER_MODELS: Record<string, string> = {
  essential: "MiniMax-Text-01",
  professional: "Claude Haiku 4.5",
  enterprise: "Claude Sonnet 4.6",
};

const TIER_RATES: Record<string, number> = {
  essential: 4,
  professional: 12,
  enterprise: 35,
};

/* ─── GET: list all automation clients ─── */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("agent_subscriptions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const clients = (data || []).map((row: Record<string, unknown>) => {
      const rate = TIER_RATES[row.plan as string] || 0;
      const convos = (row.conversations_this_month as number) || 0;
      return {
        ...row,
        model: (row.model as string) || TIER_MODELS[row.plan as string] || "",
        per_convo_cents: (row.per_convo_cents as number) || rate,
        current_usage: convos,
        current_bill: convos * rate / 100,
      };
    });

    const active = clients.filter((c: Record<string, unknown>) => c.status === "active");

    return NextResponse.json({
      clients,
      summary: {
        total: clients.length,
        active: active.length,
        paused: clients.filter((c: Record<string, unknown>) => c.status === "paused").length,
        canceled: clients.filter((c: Record<string, unknown>) => c.status === "canceled").length,
        monthly_revenue: active.reduce((sum: number, c: Record<string, unknown>) => sum + (c.current_bill as number), 0),
      },
    });
  } catch (err) {
    console.error("[Admin Automation] GET error:", err);
    return NextResponse.json({ error: "Failed to load automation clients" }, { status: 500 });
  }
}

/* ─── POST: actions (pause, resume, cancel, change_tier) ─── */
export async function POST(req: NextRequest) {
  try {
    const { action, client_id, tier } = await req.json();
    const stripe = getStripe();

    const { data: client, error: fetchError } = await supabase
      .from("agent_subscriptions")
      .select("*")
      .eq("id", client_id)
      .single();

    if (fetchError || !client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    switch (action) {
      case "pause": {
        if (client.subscription_id) {
          await stripe.subscriptions.update(client.subscription_id, {
            pause_collection: { behavior: "void" },
          });
        }
        await supabase
          .from("agent_subscriptions")
          .update({ status: "paused" })
          .eq("id", client_id);
        return NextResponse.json({ success: true, message: "Client paused" });
      }

      case "resume": {
        if (client.subscription_id) {
          await stripe.subscriptions.update(client.subscription_id, {
            pause_collection: "",
          });
        }
        await supabase
          .from("agent_subscriptions")
          .update({ status: "active" })
          .eq("id", client_id);
        return NextResponse.json({ success: true, message: "Client resumed" });
      }

      case "change_tier": {
        if (!TIER_MODELS[tier]) {
          return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
        }
        await supabase
          .from("agent_subscriptions")
          .update({
            plan: tier,
            model: TIER_MODELS[tier],
            per_convo_cents: TIER_RATES[tier],
          })
          .eq("id", client_id);
        return NextResponse.json({ success: true, message: `Tier changed to ${tier}` });
      }

      case "cancel": {
        if (client.subscription_id) {
          await stripe.subscriptions.cancel(client.subscription_id);
        }
        await supabase
          .from("agent_subscriptions")
          .update({ status: "canceled" })
          .eq("id", client_id);
        return NextResponse.json({ success: true, message: "Client canceled" });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (err) {
    console.error("[Admin Automation] POST error:", err);
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}
