const COMPOSIO_API_KEY = process.env.COMPOSIO_API_KEY || "ak_DfieMFaURtUC3XbWlj-Q";
const GMAIL_CONNECTION_ID = "b3bc9414-a6c2-4430-8f2b-7998a7f70a3b";

export async function sendEmail({
  to = "agent@martinbuilds.ai",
  subject,
  body,
}: {
  to?: string;
  subject: string;
  body: string;
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
