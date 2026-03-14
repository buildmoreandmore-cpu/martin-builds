import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/send-email";

const COMPOSIO_API_KEY = process.env.COMPOSIO_API_KEY || "ak_DfieMFaURtUC3XbWlj-Q";
const SHEETS_CONNECTION_ID = "b7b9c346-46c2-4669-a56b-0887df49e72a";

async function appendToSheet(row: string[]) {
  try {
    const res = await fetch("https://backend.composio.dev/api/v2/actions/GOOGLESHEETS_BATCH_UPDATE/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": COMPOSIO_API_KEY,
      },
      body: JSON.stringify({
        connectedAccountId: SHEETS_CONNECTION_ID,
        input: {
          spreadsheet_id: "Demo Requests",
          range: "Sheet1!A:H",
          values: [row],
          majorDimension: "ROWS",
        },
      }),
    });
    const data = await res.json();
    return data.successfull || data.successful;
  } catch (err) {
    console.error("[Sheets error]", err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, businessName, websiteUrl, industry } = await req.json();
    if (!name || !email || !businessName || !industry) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const timestamp = new Date().toISOString();

    // Store to Google Sheets
    const sheetOk = await appendToSheet([
      timestamp, name, email, businessName, websiteUrl || "", industry, "Pending", "",
    ]);

    if (!sheetOk) {
      // Fallback: email notification with all data
      await sendEmail({
        subject: `[Sheet Fallback] Demo Request — ${businessName}`,
        body: `Sheets failed. Data:\nTimestamp: ${timestamp}\nName: ${name}\nEmail: ${email}\nBusiness: ${businessName}\nWebsite: ${websiteUrl || "N/A"}\nIndustry: ${industry}`,
      });
    }

    // Confirmation email to prospect (HTML)
    const htmlBody = `<div style="background:#0a0a0a;color:#f5f5f0;padding:2rem;font-family:Arial,sans-serif;border-radius:12px;max-width:550px;">
<h2 style="color:#c8ff00;margin-bottom:0.5rem;">Your demo is being built.</h2>
<p>Hi ${name},</p>
<p>We're building your custom AI agent demo for <strong>${businessName}</strong> right now. You'll receive a link within the hour.</p>
<p>In the meantime, scan your website for revenue leaks:<br/><a href="https://martinbuilds.ai/scan" style="color:#c8ff00;">martinbuilds.ai/scan</a></p>
<p style="color:#888;margin-top:1.5rem;">— Francis, martin.builds</p>
</div>`;

    await sendEmail({
      to: email,
      subject: `Your AI Agent Demo for ${businessName} — Coming Soon`,
      body: htmlBody,
    });

    // Internal notification
    await sendEmail({
      subject: `New Demo Request: ${businessName}`,
      body: `New demo request:\n\nBusiness: ${businessName} (${industry})\nWebsite: ${websiteUrl || "N/A"}\nName: ${name}\nEmail: ${email}\nTimestamp: ${timestamp}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Demo request error]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
