/**
 * Client Identification Middleware
 * Resolves client identity from embed_key (widget) or telegram_chat_id.
 * Uses utility_clients table.
 */

import { supabase } from "../supabase";

export interface IdentifiedClient {
  id: string;
  business_name: string;
  email: string;
  tier: string;
  is_active: boolean;
}

/**
 * Identify client by their widget embed key.
 */
export async function identifyByEmbedKey(
  embedKey: string
): Promise<IdentifiedClient | null> {
  const { data } = await supabase
    .from("utility_clients")
    .select("id, business_name, email, tier, is_active")
    .eq("embed_key", embedKey)
    .single();

  return data || null;
}

/**
 * Identify client by their Telegram chat ID.
 */
export async function identifyByTelegramId(
  chatId: string | number
): Promise<IdentifiedClient | null> {
  const { data } = await supabase
    .from("utility_clients")
    .select("id, business_name, email, tier, is_active")
    .eq("telegram_chat_id", Number(chatId))
    .single();

  return data || null;
}

/**
 * Look up a client by email (used during Telegram onboarding).
 */
export async function identifyByEmail(
  email: string
): Promise<IdentifiedClient | null> {
  const { data } = await supabase
    .from("utility_clients")
    .select("id, business_name, email, tier, is_active")
    .eq("email", email.toLowerCase().trim())
    .single();

  return data || null;
}
