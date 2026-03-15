/**
 * Demo & Scan Funnel — Supabase-backed.
 */

import { supabase } from "./supabase";

export interface FunnelEntry {
  name: string;
  business_name: string;
  industry: string;
  slug: string;
  cta_hit_at: string;
  emails_sent: number[];
  survey_completed: boolean;
  survey_answers: Record<string, string>;
  created_at: string;
}

// Backward compat aliases
export type { FunnelEntry as FunnelEntryLegacy };

export async function addToFunnel(data: {
  email: string;
  name: string;
  businessName: string;
  industry: string;
  slug: string;
}): Promise<FunnelEntry | null> {
  const row = {
    email: data.email.toLowerCase(),
    name: data.name,
    business_name: data.businessName,
    industry: data.industry,
    slug: data.slug,
    cta_hit_at: new Date().toISOString(),
  };

  const { data: entry, error } = await supabase
    .from("funnel")
    .upsert(row, { onConflict: "email" })
    .select()
    .single();

  if (error) {
    console.error("[Funnel] addToFunnel error:", error);
    return null;
  }
  return entry;
}

export async function getFunnelEntry(email: string): Promise<FunnelEntry | null> {
  const { data } = await supabase
    .from("funnel")
    .select("*")
    .eq("email", email.toLowerCase())
    .single();
  return data;
}

export async function updateFunnelEntry(
  email: string,
  updates: Partial<FunnelEntry>
): Promise<FunnelEntry | null> {
  const { data } = await supabase
    .from("funnel")
    .update(updates)
    .eq("email", email.toLowerCase())
    .select()
    .single();
  return data;
}

export async function getEntriesDueForEmail(
  dayNumber: number
): Promise<{ email: string; entry: FunnelEntry }[]> {
  const cutoff = new Date(Date.now() - dayNumber * 86400000).toISOString();

  const { data } = await supabase
    .from("funnel")
    .select("*")
    .lte("cta_hit_at", cutoff)
    .not("emails_sent", "cs", `{${dayNumber}}`);

  if (!data) return [];
  return data.map((entry) => ({ email: entry.email, entry }));
}

export async function getAllEntries(): Promise<Record<string, FunnelEntry>> {
  const { data } = await supabase.from("funnel").select("*");
  const result: Record<string, FunnelEntry> = {};
  if (data) {
    for (const entry of data) {
      result[entry.email] = entry;
    }
  }
  return result;
}

// --- Scan Funnel ---

export interface ScanFunnelEntry {
  email: string;
  name: string;
  business_name: string;
  website_url: string;
  score: number;
  leaks: { title: string; severity: string }[];
  scan_completed_at: string;
  emails_sent: number[];
}

export async function addToScanFunnel(data: {
  email: string;
  name: string;
  businessName: string;
  websiteUrl: string;
  score: number;
  leaks: { title: string; severity: string }[];
}): Promise<ScanFunnelEntry | null> {
  const row = {
    email: data.email.toLowerCase(),
    name: data.name,
    business_name: data.businessName,
    website_url: data.websiteUrl,
    score: data.score,
    leaks: data.leaks,
    scan_completed_at: new Date().toISOString(),
  };

  const { data: entry, error } = await supabase
    .from("scan_funnel")
    .upsert(row, { onConflict: "email" })
    .select()
    .single();

  if (error) {
    console.error("[ScanFunnel] error:", error);
    return null;
  }
  return entry;
}

export async function getScanFunnelEntry(email: string): Promise<ScanFunnelEntry | null> {
  const { data } = await supabase
    .from("scan_funnel")
    .select("*")
    .eq("email", email.toLowerCase())
    .single();
  return data;
}

export async function updateScanFunnelEntry(
  email: string,
  updates: Partial<ScanFunnelEntry>
): Promise<ScanFunnelEntry | null> {
  const { data } = await supabase
    .from("scan_funnel")
    .update(updates)
    .eq("email", email.toLowerCase())
    .select()
    .single();
  return data;
}

export async function getScanEntriesDueForEmail(
  dayNumber: number
): Promise<{ email: string; entry: ScanFunnelEntry }[]> {
  const cutoff = new Date(Date.now() - dayNumber * 86400000).toISOString();

  const { data } = await supabase
    .from("scan_funnel")
    .select("*")
    .lte("scan_completed_at", cutoff)
    .not("emails_sent", "cs", `{${dayNumber}}`);

  if (!data) return [];
  return data.map((entry) => ({ email: entry.email, entry }));
}
