/**
 * Google Ads offline / Enhanced Conversions upload — STUB.
 *
 * When a paid-ads lead later becomes a real, qualified opportunity (or a closed
 * deal), we can report that back to Google Ads against the stored `gclid` so the
 * ad platform optimizes toward leads that actually convert — not just form fills.
 *
 * This file is intentionally a no-op scaffold. Nothing here makes a live API call
 * yet. Fill in the TODOs when you're ready to wire offline conversions.
 *
 * Prerequisites (env vars to add when implementing):
 *   GOOGLE_ADS_DEVELOPER_TOKEN
 *   GOOGLE_ADS_CLIENT_ID
 *   GOOGLE_ADS_CLIENT_SECRET
 *   GOOGLE_ADS_REFRESH_TOKEN
 *   GOOGLE_ADS_CUSTOMER_ID          (the account that owns the conversion action)
 *   GOOGLE_ADS_LOGIN_CUSTOMER_ID    (manager account, if used)
 *   GOOGLE_ADS_CONVERSION_ACTION    (resource name of the offline conversion action)
 */

export interface OfflineConversion {
  /** The Google click ID captured at form submission and stored on the lead. */
  gclid: string;
  /** Resource name / label of the configured offline conversion action. */
  conversionName: string;
  /** Conversion value, e.g. estimated deal size. */
  value: number;
  /** ISO 4217 currency code, e.g. "USD". */
  currency: string;
  /** When the conversion happened — Google wants "yyyy-mm-dd hh:mm:ss+|-hh:mm". */
  conversionTime: string;
}

/**
 * Upload a single offline conversion to Google Ads.
 *
 * TODO(impl): implement using the Google Ads API:
 *   1. Obtain an OAuth2 access token from the stored refresh token.
 *   2. Build a ClickConversion:
 *        { gclid, conversionAction, conversionDateTime, conversionValue, currencyCode }
 *   3. Call customers.uploadClickConversions on GOOGLE_ADS_CUSTOMER_ID with
 *        partialFailure: true and validateOnly: false.
 *   4. Inspect the response for partialFailureError and log per-row results.
 *
 * For Enhanced Conversions for Leads (hashed email/phone instead of gclid), the
 * shape differs — use ConversionUploadService.uploadUserData with SHA-256 hashed,
 * normalized identifiers. Keep raw PII out of logs.
 */
export async function uploadOfflineConversion(conversion: OfflineConversion): Promise<{ ok: boolean; skipped?: boolean }> {
  // TODO: remove this guard once credentials are configured.
  if (!process.env.GOOGLE_ADS_DEVELOPER_TOKEN) {
    console.log(`[google-ads] offline conversion stubbed (no credentials):`, {
      gclid: conversion.gclid,
      value: conversion.value,
      currency: conversion.currency,
    });
    return { ok: false, skipped: true };
  }

  // TODO: real upload goes here.
  return { ok: false, skipped: true };
}
