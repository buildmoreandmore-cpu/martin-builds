/**
 * Client Registry — Supabase-backed.
 */

import { supabase } from "./supabase";

export interface Client {
  id?: string;
  email: string;
  name: string;
  phone: string;
  business_name: string;
  business_description?: string;
  bot_name?: string;
  industry: string;
  plan: string;
  connected_tools: string[];
  telegram_chat_id?: string;
  linking_code?: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Backward compat alias
export type WhatsAppClient = Client;

export async function getClientByPhone(phone: string): Promise<Client | null> {
  const normalized = normalizePhone(phone);
  const { data } = await supabase
    .from("clients")
    .select("*")
    .eq("phone", normalized)
    .single();
  return data;
}

export async function getClientByEmail(email: string): Promise<Client | null> {
  const { data } = await supabase
    .from("clients")
    .select("*")
    .eq("email", email.toLowerCase())
    .single();
  return data;
}

export async function getClientByTelegramId(chatId: string): Promise<Client | null> {
  const { data } = await supabase
    .from("clients")
    .select("*")
    .eq("telegram_chat_id", chatId)
    .single();
  return data;
}

export async function getClientByStripeCustomer(customerId: string): Promise<Client | null> {
  const { data } = await supabase
    .from("clients")
    .select("*")
    .eq("stripe_customer_id", customerId)
    .single();
  return data;
}

export async function registerClient(data: {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  industry: string;
  plan?: string;
}): Promise<Client> {
  const row = {
    name: data.name,
    email: data.email.toLowerCase(),
    phone: normalizePhone(data.phone),
    business_name: data.businessName,
    industry: data.industry || "other",
    plan: data.plan || "starter",
    connected_tools: [],
    active: true,
  };

  const { data: client, error } = await supabase
    .from("clients")
    .upsert(row, { onConflict: "email" })
    .select()
    .single();

  if (error) throw new Error(`registerClient: ${error.message}`);
  return client;
}

export async function updateClient(
  email: string,
  updates: Partial<Client>
): Promise<Client | null> {
  // Map camelCase to snake_case for common fields
  const mapped: Record<string, unknown> = {};
  const keyMap: Record<string, string> = {
    businessName: "business_name",
    businessDescription: "business_description",
    botName: "bot_name",
    telegramChatId: "telegram_chat_id",
    linkingCode: "linking_code",
    stripeCustomerId: "stripe_customer_id",
    stripeSubscriptionId: "stripe_subscription_id",
    connectedTools: "connected_tools",
  };

  for (const [k, v] of Object.entries(updates)) {
    if (v === undefined) continue;
    const dbKey = keyMap[k] || k;
    mapped[dbKey] = v;
  }

  const { data, error } = await supabase
    .from("clients")
    .update(mapped)
    .eq("email", email.toLowerCase())
    .select()
    .single();

  if (error) {
    console.error("updateClient error:", error);
    return null;
  }
  return data;
}

export async function linkTelegram(code: string, chatId: string): Promise<Client | null> {
  // Find client by linking code
  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("linking_code", code)
    .single();

  if (!client) return null;

  const { data: updated } = await supabase
    .from("clients")
    .update({ telegram_chat_id: chatId, linking_code: null })
    .eq("id", client.id)
    .select()
    .single();

  return updated;
}

export async function generateLinkingCode(email: string): Promise<string | null> {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  const { data, error } = await supabase
    .from("clients")
    .update({ linking_code: code })
    .eq("email", email.toLowerCase())
    .select()
    .single();

  if (error || !data) return null;
  return code;
}

function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
}
