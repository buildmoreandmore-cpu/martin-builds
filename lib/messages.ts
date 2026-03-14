/**
 * Conversation memory — stores and retrieves recent messages per client.
 */

import { supabase } from "./supabase";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

/**
 * Save a message to the conversation history.
 */
export async function saveMessage(
  clientId: string,
  role: "user" | "assistant",
  content: string,
  channel: string = "telegram"
): Promise<void> {
  await supabase.from("messages").insert({
    client_id: clientId,
    role,
    content,
    channel,
  });
}

/**
 * Get recent messages for a client (last N messages).
 */
export async function getRecentMessages(
  clientId: string,
  limit: number = 20
): Promise<Message[]> {
  const { data } = await supabase
    .from("messages")
    .select("role, content")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (!data) return [];

  // Reverse so oldest first
  return data.reverse().map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
  }));
}
