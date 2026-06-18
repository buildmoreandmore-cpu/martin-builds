const COMPOSIO_API_KEY = process.env.COMPOSIO_API_KEY || "";
// v3 ids look like ca_xxx; user_id is the entity that owns the connection.
// The legacy UUID 8e6d20c6-... is gone after the v2 → v3 migration.
const GMAIL_CONNECTION_ID = process.env.GMAIL_CONNECTION_ID || "ca_xK4gbyKwbxNc";
const COMPOSIO_USER_ID = process.env.COMPOSIO_USER_ID || "martin-builds-prod";

/**
 * Branded email signature block — matches martin.builds identity.
 * Colors tuned to read on a WHITE Gmail/Outlook background. The old
 * #f5f5f0 wash rendered as near-invisible "ghost text" in production.
 * Drop this at the bottom of every outgoing HTML email.
 */
export const EMAIL_SIGNATURE = `<div style="margin-top:32px;padding-top:20px;border-top:1px solid #e5e5e5;font-family:Arial,'Helvetica Neue',sans-serif;">
<table cellpadding="0" cellspacing="0" border="0">
<tr><td style="padding-bottom:4px;"><strong style="font-size:16px;color:#0a0a0a;letter-spacing:-0.3px;">Francis</strong></td></tr>
<tr><td style="padding-bottom:2px;font-size:13px;color:#0a0a0a;font-weight:600;">martin.builds</td></tr>
<tr><td style="padding-bottom:10px;font-size:12px;color:#6b7280;font-style:italic;">Custom dashboards that you own</td></tr>
<tr><td style="padding-bottom:2px;font-size:13px;"><a href="mailto:agent@martinbuilds.ai" style="color:#1f2937;text-decoration:none;">agent@martinbuilds.ai</a></td></tr>
<tr><td style="padding-bottom:2px;font-size:13px;"><a href="https://martinbuilds.ai" style="color:#1f2937;text-decoration:none;">martinbuilds.ai</a></td></tr>
<tr><td style="padding-bottom:10px;font-size:13px;"><a href="https://martinbuilds.ai/book" style="color:#4d8400;text-decoration:none;font-weight:600;">Book a 15-min call →</a></td></tr>
<tr><td style="padding-top:8px;border-top:1px solid #e5e5e5;"><span style="font-size:12px;color:#6b7280;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10b981;vertical-align:middle;margin-right:6px;"></span>Accepting new builds</span></td></tr>
</table>
</div>`;

/** Hidden preheader text — shows in inbox preview but not in email body */
export function preheader(text: string): string {
  return `<div style="display:none;font-size:1px;color:#0a0a0a;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${text}${"&zwnj;&nbsp;".repeat(30)}</div>`;
}

/** Wrap a URL through click tracking. Returns tracked URL if leadId provided, original if not. */
export function trackLink(url: string, leadId?: string, label?: string): string {
  if (!leadId) return url;
  const params = new URLSearchParams({ lid: leadId, url });
  if (label) params.set("label", label);
  return `https://martinbuilds.ai/api/track/click?${params.toString()}`;
}

/** Unsubscribe footer — CAN-SPAM compliant */
export function unsubscribeFooter(leadId?: string): string {
  if (!leadId) return "";
  const url = `https://martinbuilds.ai/api/unsubscribe?lid=${leadId}`;
  return `<div style="text-align:center;padding:16px 0 0 0;margin-top:16px;border-top:1px solid #222;">
<a href="${url}" style="font-size:11px;color:#555;text-decoration:none;">Unsubscribe from future emails</a>
</div>`;
}

/** Append a 1x1 tracking pixel to HTML email body */
export function appendTrackingPixel(html: string, leadId: string, templateId?: string): string {
  const params = new URLSearchParams({ lid: leadId });
  if (templateId) params.set("tid", templateId);
  const pixel = `<img src="https://martinbuilds.ai/api/track/open?${params.toString()}" width="1" height="1" style="display:block;width:1px;height:1px;border:0;" alt="" />`;
  // Insert before closing </body> or append at end
  if (html.includes("</body>")) {
    return html.replace("</body>", `${pixel}</body>`);
  }
  return html + pixel;
}

export async function sendEmail({
  to = "agent@martinbuilds.ai",
  subject,
  body,
  isHtml = false,
}: {
  to?: string;
  subject: string;
  body: string;
  isHtml?: boolean;
}) {
  if (!COMPOSIO_API_KEY) {
    console.log(`[Email skipped - no API key] To: ${to} | Subject: ${subject}`);
    return false;
  }

  try {
    // Composio v3 (v2 was deprecated mid-2026; the v2 endpoint now returns
    // "Please upgrade to v3 APIs" instead of doing the send).
    const res = await fetch("https://backend.composio.dev/api/v3/tools/execute/GMAIL_SEND_EMAIL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": COMPOSIO_API_KEY,
      },
      body: JSON.stringify({
        connected_account_id: GMAIL_CONNECTION_ID,
        user_id: COMPOSIO_USER_ID,
        arguments: {
          recipient_email: to,
          subject,
          body,
          ...(isHtml ? { is_html: true } : {}),
        },
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && !data?.error && data?.successful !== false) {
      console.log(`[Email sent] To: ${to} | Subject: ${subject}`);
      return true;
    }
    console.error(`[Email failed]`, res.status, JSON.stringify(data).slice(0, 400));
    return false;
  } catch (err) {
    console.error(`[Email error]`, err);
    return false;
  }
}
