/**
 * Client-side attribution capture for paid-traffic landing pages.
 *
 * On the first page load of a session we parse UTM + click-ID params from the URL
 * and persist them. Two windows are tracked:
 *   - first-touch: the very first attribution we ever saw (90-day cookie, never overwritten)
 *   - last-touch:  the most recent attribution (overwritten on every captured visit)
 *
 * Both live in a first-party cookie AND sessionStorage so a lead form can read them
 * back with getAttribution() and POST them alongside the submission.
 *
 * No dependencies, no React — safe to import anywhere. All browser access is guarded
 * by `typeof window` so it's a no-op during SSR.
 */

export const CAPTURE_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
] as const;

export type AttributionKey = (typeof CAPTURE_KEYS)[number];

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbclid?: string;
  msclkid?: string;
  referrer?: string;
  landing_page?: string;
  ts?: string; // ISO timestamp of capture
}

const FIRST_KEY = "mb_attr_first";
const LAST_KEY = "mb_attr_last";
const COOKIE_MAX_AGE = 90 * 24 * 60 * 60; // 90 days in seconds

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, maxAge: number): void {
  if (typeof document === "undefined") return;
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
}

function parse(raw: string | null): Attribution | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Attribution;
  } catch {
    return null;
  }
}

/** Build an Attribution payload from the current URL + document context. */
function readFromUrl(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const payload: Attribution = {};
  for (const key of CAPTURE_KEYS) {
    const value = params.get(key);
    if (value) payload[key] = value;
  }
  payload.referrer = document.referrer || undefined;
  payload.landing_page = window.location.pathname;
  // Note: Date.now via toISOString is fine in the browser at runtime.
  payload.ts = new Date().toISOString();
  return payload;
}

/** True if the payload carries any campaign signal worth storing. */
function hasSignal(a: Attribution): boolean {
  return CAPTURE_KEYS.some((k) => a[k]) || !!a.referrer;
}

/**
 * Capture attribution from the current URL. Call once on mount of a landing page.
 * First-touch is set only if absent; last-touch is always refreshed when there's signal.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  const current = readFromUrl();

  // Always seed first-touch on the very first visit, even with no params,
  // so we record the entry path/referrer of the session.
  const existingFirst = readCookie(FIRST_KEY) ?? sessionStorage.getItem(FIRST_KEY);
  if (!existingFirst) {
    const serialized = JSON.stringify(current);
    writeCookie(FIRST_KEY, serialized, COOKIE_MAX_AGE);
    try { sessionStorage.setItem(FIRST_KEY, serialized); } catch { /* storage blocked */ }
  }

  // Last-touch refreshes whenever the new visit carries campaign signal.
  // (If there's no signal, keep the prior last-touch rather than blanking it.)
  if (hasSignal(current) || !readCookie(LAST_KEY)) {
    const serialized = JSON.stringify(current);
    writeCookie(LAST_KEY, serialized, COOKIE_MAX_AGE);
    try { sessionStorage.setItem(LAST_KEY, serialized); } catch { /* storage blocked */ }
  }
}

/**
 * Read back stored attribution. sessionStorage is preferred (fresh within the tab),
 * with the cookie as a durable fallback across sessions.
 */
export function getAttribution(): { firstTouch: Attribution | null; lastTouch: Attribution | null } {
  if (typeof window === "undefined") return { firstTouch: null, lastTouch: null };

  let firstTouch: Attribution | null = null;
  let lastTouch: Attribution | null = null;
  try {
    firstTouch = parse(sessionStorage.getItem(FIRST_KEY));
    lastTouch = parse(sessionStorage.getItem(LAST_KEY));
  } catch { /* storage blocked */ }

  if (!firstTouch) firstTouch = parse(readCookie(FIRST_KEY));
  if (!lastTouch) lastTouch = parse(readCookie(LAST_KEY));

  return { firstTouch, lastTouch };
}
