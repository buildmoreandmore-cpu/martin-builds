import { NextRequest, NextResponse } from "next/server";
import { handleWhatsAppMessage } from "@/lib/whatsapp-agent-brain";
import { getClientByPhone } from "@/lib/clients";
import { sendEmail } from "@/lib/send-email";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "martin-builds-whatsapp-2026";
const WA_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || "";
const WA_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || "981166815089695";

// Meta webhook verification (GET)
export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("hub.mode");
  const token = req.nextUrl.searchParams.get("hub.verify_token");
  const challenge = req.nextUrl.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("[WhatsApp] Webhook verified");
    return new NextResponse(challenge || "", { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// Meta webhook incoming messages (POST)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Meta sends webhook events with this structure
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    // Check if this is a message event
    if (value?.messages?.[0]) {
      const message = value.messages[0];
      const phone = message.from; // sender's phone number
      const messageBody = message.text?.body || "";
      const messageType = message.type;

      if (!messageBody || messageType !== "text") {
        // Only handle text messages for now
        return NextResponse.json({ ok: true });
      }

      console.log(`[WhatsApp] Incoming from ${phone}: ${messageBody.slice(0, 100)}`);

      // Process through agent brain
      const reply = await handleWhatsAppMessage(phone, messageBody);

      // Send reply back via WhatsApp API
      if (reply && WA_ACCESS_TOKEN) {
        const waSuccess = await sendWhatsAppMessage(phone, reply);
        if (waSuccess) {
          console.log(`[WhatsApp] Reply sent to ${phone}: ${reply.slice(0, 100)}`);
        } else {
          // Fallback: send via email
          console.log(`[WhatsApp] Send failed, attempting email fallback for ${phone}`);
          const client = await getClientByPhone(phone);
          if (client?.email) {
            await sendEmail({
              to: client.email,
              subject: "Your AI Agent Reply",
              body: `${reply}\n\n---\nYour agent replied via email while we finish setting up your WhatsApp connection. Once WhatsApp is fully active, all replies will come directly to your WhatsApp.`,
            });
            console.log(`[WhatsApp] Email fallback sent to ${client.email}`);
          } else {
            console.error(`[WhatsApp] No email found for phone ${phone}, reply dropped`);
          }
        }
      }
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[WhatsApp Webhook] Error:", err);
    // Still return 200 so Meta doesn't retry
    return NextResponse.json({ ok: true });
  }
}

async function sendWhatsAppMessage(to: string, text: string): Promise<boolean> {
  const res = await fetch(`https://graph.facebook.com/v21.0/${WA_PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${WA_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: text },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[WhatsApp] Send failed:", err);
    return false;
  }
  return true;
}
