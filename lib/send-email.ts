const COMPOSIO_API_KEY = process.env.COMPOSIO_API_KEY || "ak_DfieMFaURtUC3XbWlj-Q";
const GMAIL_CONNECTION_ID = "b3bc9414-a6c2-4430-8f2b-7998a7f70a3b";

/**
 * Branded email signature block — matches martin.builds identity.
 * Drop this at the bottom of every outgoing HTML email.
 */
export const EMAIL_SIGNATURE = `<div style="margin-top:32px;padding-top:24px;border-top:1px solid #222;">
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,'Helvetica Neue',sans-serif;">
<tr><td style="padding-bottom:4px;"><strong style="font-size:18px;color:#f5f5f0;letter-spacing:-0.5px;">Francis</strong></td></tr>
<tr><td style="padding-bottom:2px;font-size:14px;color:#f5f5f0;">martin.builds</td></tr>
<tr><td style="padding-bottom:12px;font-size:13px;color:#888;font-style:italic;">Custom dashboards that you own</td></tr>
<tr><td style="padding-bottom:2px;font-size:13px;"><a href="mailto:agent@martinbuilds.ai" style="color:#f5f5f0;text-decoration:none;">agent@martinbuilds.ai</a></td></tr>
<tr><td style="padding-bottom:12px;font-size:13px;"><a href="https://martinbuilds.ai" style="color:#f5f5f0;text-decoration:none;">martinbuilds.ai</a></td></tr>
<tr><td style="padding-top:8px;border-top:1px solid #222;"><span style="display:inline-flex;align-items:center;gap:6px;font-size:12px;color:#888;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#4ade80;"></span>Accepting new builds</span></td></tr>
</table>
</div>`;

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
    const res = await fetch("https://backend.composio.dev/api/v2/actions/GMAIL_SEND_EMAIL/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": COMPOSIO_API_KEY,
      },
      body: JSON.stringify({
        connectedAccountId: GMAIL_CONNECTION_ID,
        input: {
          recipient_email: to,
          subject,
          body,
          ...(isHtml ? { is_html: true } : {}),
        },
      }),
    });

    const data = await res.json();
    if (data.successfull || data.successful) {
      console.log(`[Email sent] To: ${to} | Subject: ${subject}`);
      return true;
    }
    console.error(`[Email failed]`, JSON.stringify(data).slice(0, 300));
    return false;
  } catch (err) {
    console.error(`[Email error]`, err);
    return false;
  }
}
