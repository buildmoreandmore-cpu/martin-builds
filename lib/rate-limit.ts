/**
 * Simple rate limiter using Supabase messages table.
 * Counts messages per client in a rolling window.
 */

import { supabase } from "./supabase";

const LIMITS: Record<string, number> = {
  starter: 500,  // 500 messages/month
  pro: 5000,     // 5000 messages/month
};

const MINUTE_LIMIT = 10; // max 10 messages per minute (burst protection)

/**
 * Check if a client has exceeded their rate limit.
 * Returns { allowed: boolean, reason?: string }
 */
export async function checkRateLimit(
  clientId: string,
  plan: string
): Promise<{ allowed: boolean; reason?: string }> {
  // Check per-minute burst limit
  const oneMinuteAgo = new Date(Date.now() - 60_000).toISOString();
  const { count: minuteCount } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("client_id", clientId)
    .eq("role", "user")
    .gte("created_at", oneMinuteAgo);

  if ((minuteCount || 0) >= MINUTE_LIMIT) {
    return { allowed: false, reason: "Slow down! You're sending messages too fast. Try again in a minute." };
  }

  // Check monthly limit
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const { count: monthCount } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("client_id", clientId)
    .eq("role", "user")
    .gte("created_at", monthStart.toISOString());

  const monthlyLimit = LIMITS[plan] || LIMITS.starter;
  if ((monthCount || 0) >= monthlyLimit) {
    return {
      allowed: false,
      reason: `You've reached your monthly message limit (${monthlyLimit} messages). Your limit resets on the 1st. Upgrade your plan for more.`,
    };
  }

  return { allowed: true };
}
