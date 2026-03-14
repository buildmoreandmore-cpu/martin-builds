/**
 * Bot Pool — manages pre-created Telegram bots.
 * When a client signs up, we assign an available bot from the pool,
 * rename it to their chosen agent name, and set the webhook.
 */

import { supabase } from "./supabase";

interface PoolBot {
  id: string;
  bot_token: string;
  bot_username: string;
  assigned_to: string | null;
  status: string;
}

/**
 * Assign an available bot from the pool to a client.
 * Returns the bot token and username, or null if pool is empty.
 */
export async function assignBot(clientId: string): Promise<PoolBot | null> {
  // Grab the first available bot
  const { data: bot, error } = await supabase
    .from("bot_pool")
    .select("*")
    .eq("status", "available")
    .limit(1)
    .single();

  if (error || !bot) {
    console.error("[BotPool] No available bots in pool");
    return null;
  }

  // Mark it as assigned
  const { data: updated } = await supabase
    .from("bot_pool")
    .update({
      assigned_to: clientId,
      status: "assigned",
      assigned_at: new Date().toISOString(),
    })
    .eq("id", bot.id)
    .eq("status", "available") // optimistic lock
    .select()
    .single();

  if (!updated) {
    // Race condition — try again
    return assignBot(clientId);
  }

  return updated;
}

/**
 * Release a bot back to the pool (e.g., client canceled).
 */
export async function releaseBot(clientId: string): Promise<void> {
  await supabase
    .from("bot_pool")
    .update({ assigned_to: null, status: "available", assigned_at: null })
    .eq("assigned_to", clientId);
}

/**
 * Get pool stats.
 */
export async function getPoolStats(): Promise<{ available: number; assigned: number }> {
  const { count: available } = await supabase
    .from("bot_pool")
    .select("*", { count: "exact", head: true })
    .eq("status", "available");

  const { count: assigned } = await supabase
    .from("bot_pool")
    .select("*", { count: "exact", head: true })
    .eq("status", "assigned");

  return { available: available || 0, assigned: assigned || 0 };
}

/**
 * Configure a Telegram bot — rename it, set description, set webhook.
 */
export async function configureBot(
  botToken: string,
  botName: string,
  businessName: string,
  businessDescription?: string
): Promise<boolean> {
  try {
    // Set bot display name
    await fetch(`https://api.telegram.org/bot${botToken}/setMyName`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: botName.slice(0, 64) }),
    });

    // Set description
    const desc = businessDescription
      ? `AI agent for ${businessName}. ${businessDescription}`.slice(0, 512)
      : `AI agent for ${businessName}. Powered by martin.builds.`;

    await fetch(`https://api.telegram.org/bot${botToken}/setMyDescription`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: desc }),
    });

    // Set short description (shown in profile)
    await fetch(`https://api.telegram.org/bot${botToken}/setMyShortDescription`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ short_description: `AI agent for ${businessName}`.slice(0, 120) }),
    });

    // Set webhook
    const webhookUrl = `https://martinbuilds.ai/api/telegram-agent/webhook/${botToken}`;
    const whRes = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook?url=${encodeURIComponent(webhookUrl)}`);
    const whData = await whRes.json();

    if (!whData.ok) {
      console.error("[BotPool] Webhook setup failed:", whData);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[BotPool] configureBot error:", err);
    return false;
  }
}
