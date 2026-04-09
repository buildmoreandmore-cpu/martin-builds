/**
 * Shared helpers for reading/writing client_messages in Supabase.
 */

import { supabase } from "@/lib/supabase";

export type MessageRole = "user" | "assistant";
export type MessageInterface = "telegram" | "dashboard";

export interface ClientMessage {
  id: string;
  client_id: string;
  role: MessageRole;
  content: string;
  interface: MessageInterface;
  created_at: string;
}

/**
 * Save a message to the client_messages table.
 */
export async function saveMessage(
  clientId: string,
  role: MessageRole,
  content: string,
  iface: MessageInterface
) {
  const { error } = await supabase.from("client_messages").insert({
    client_id: clientId,
    role,
    content,
    interface: iface,
  });
  if (error) {
    console.error("[client-messages] save error:", error);
  }
}

/**
 * Load the most recent N messages for a client (across all interfaces),
 * ordered oldest-first so they can be passed directly to Claude.
 */
export async function loadHistory(
  clientId: string,
  limit: number = 20
): Promise<{ role: "user" | "assistant"; content: string }[]> {
  const { data, error } = await supabase
    .from("client_messages")
    .select("role, content")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[client-messages] load error:", error);
    return [];
  }

  // Reverse so oldest comes first (Claude expects chronological order)
  return (data || []).reverse();
}
