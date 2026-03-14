import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

const FUNNEL_PATH = path.join(process.cwd(), "data", "funnel.json");
const SCAN_FUNNEL_PATH = path.join(process.cwd(), "data", "scan-funnel.json");

export interface FunnelEntry {
  name: string;
  businessName: string;
  industry: string;
  slug: string;
  ctaHitAt: string;
  emailsSent: number[];
  surveyCompleted: boolean;
  surveyAnswers: Record<string, string>;
  createdAt: string;
}

type FunnelData = Record<string, FunnelEntry>;

function readFunnel(): FunnelData {
  const dir = path.dirname(FUNNEL_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  if (!existsSync(FUNNEL_PATH)) return {};
  try {
    return JSON.parse(readFileSync(FUNNEL_PATH, "utf-8"));
  } catch {
    return {};
  }
}

function writeFunnel(data: FunnelData) {
  const dir = path.dirname(FUNNEL_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(FUNNEL_PATH, JSON.stringify(data, null, 2));
}

export function addToFunnel(data: { email: string; name: string; businessName: string; industry: string; slug: string }) {
  const funnel = readFunnel();
  if (funnel[data.email]) {
    // Update existing entry with CTA hit
    funnel[data.email].ctaHitAt = new Date().toISOString();
    funnel[data.email].slug = data.slug || funnel[data.email].slug;
  } else {
    funnel[data.email] = {
      name: data.name,
      businessName: data.businessName,
      industry: data.industry,
      slug: data.slug,
      ctaHitAt: new Date().toISOString(),
      emailsSent: [],
      surveyCompleted: false,
      surveyAnswers: {},
      createdAt: new Date().toISOString(),
    };
  }
  writeFunnel(funnel);
  return funnel[data.email];
}

export function getFunnelEntry(email: string): FunnelEntry | null {
  const funnel = readFunnel();
  return funnel[email] || null;
}

export function updateFunnelEntry(email: string, data: Partial<FunnelEntry>) {
  const funnel = readFunnel();
  if (!funnel[email]) return null;
  funnel[email] = { ...funnel[email], ...data };
  writeFunnel(funnel);
  return funnel[email];
}

export function getEntriesDueForEmail(dayNumber: number): { email: string; entry: FunnelEntry }[] {
  const funnel = readFunnel();
  const now = Date.now();
  const results: { email: string; entry: FunnelEntry }[] = [];

  for (const [email, entry] of Object.entries(funnel)) {
    if (!entry.ctaHitAt) continue;
    const daysSince = (now - new Date(entry.ctaHitAt).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince >= dayNumber && !entry.emailsSent.includes(dayNumber)) {
      results.push({ email, entry });
    }
  }
  return results;
}

export function getAllEntries(): FunnelData {
  return readFunnel();
}

// --- Scan Funnel ---

export interface ScanFunnelEntry {
  email: string;
  name: string;
  businessName: string;
  websiteUrl: string;
  score: number;
  leaks: { title: string; severity: string }[];
  scanCompletedAt: string;
  emailsSent: number[];
  type: "scan";
}

type ScanFunnelData = Record<string, ScanFunnelEntry>;

function readScanFunnel(): ScanFunnelData {
  const dir = path.dirname(SCAN_FUNNEL_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  if (!existsSync(SCAN_FUNNEL_PATH)) return {};
  try {
    return JSON.parse(readFileSync(SCAN_FUNNEL_PATH, "utf-8"));
  } catch {
    return {};
  }
}

function writeScanFunnel(data: ScanFunnelData) {
  const dir = path.dirname(SCAN_FUNNEL_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(SCAN_FUNNEL_PATH, JSON.stringify(data, null, 2));
}

export function addToScanFunnel(data: {
  email: string;
  name: string;
  businessName: string;
  websiteUrl: string;
  score: number;
  leaks: { title: string; severity: string }[];
}): ScanFunnelEntry {
  const funnel = readScanFunnel();
  funnel[data.email] = {
    email: data.email,
    name: data.name,
    businessName: data.businessName,
    websiteUrl: data.websiteUrl,
    score: data.score,
    leaks: data.leaks,
    scanCompletedAt: new Date().toISOString(),
    emailsSent: [],
    type: "scan",
  };
  writeScanFunnel(funnel);
  return funnel[data.email];
}

export function getScanFunnelEntry(email: string): ScanFunnelEntry | null {
  const funnel = readScanFunnel();
  return funnel[email] || null;
}

export function updateScanFunnelEntry(email: string, data: Partial<ScanFunnelEntry>) {
  const funnel = readScanFunnel();
  if (!funnel[email]) return null;
  funnel[email] = { ...funnel[email], ...data };
  writeScanFunnel(funnel);
  return funnel[email];
}

export function getScanEntriesDueForEmail(dayNumber: number): { email: string; entry: ScanFunnelEntry }[] {
  const funnel = readScanFunnel();
  const now = Date.now();
  const results: { email: string; entry: ScanFunnelEntry }[] = [];

  for (const [email, entry] of Object.entries(funnel)) {
    if (!entry.scanCompletedAt) continue;
    const daysSince = (now - new Date(entry.scanCompletedAt).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince >= dayNumber && !entry.emailsSent.includes(dayNumber)) {
      results.push({ email, entry });
    }
  }
  return results;
}
