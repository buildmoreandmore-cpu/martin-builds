import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(req: NextRequest) {
  try {
    const { invoice_id } = await req.json();
    if (!invoice_id) {
      return NextResponse.json({ error: "invoice_id required" }, { status: 400 });
    }

    const stripe = getStripe();
    const invoice = await stripe.invoices.retrieve(invoice_id);

    if (invoice.metadata?.created_by !== "martin.builds admin") {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    if (invoice.status === "open") {
      // Resend the invoice email via Stripe
      await stripe.invoices.sendInvoice(invoice_id);
      return NextResponse.json({ success: true, message: "Invoice resent" });
    }

    if (invoice.status === "draft") {
      return NextResponse.json({ error: "Invoice is still a draft — finalize it first" }, { status: 400 });
    }

    if (invoice.status === "paid") {
      return NextResponse.json({ error: "Invoice is already paid" }, { status: 400 });
    }

    return NextResponse.json({ error: `Cannot resend invoice with status: ${invoice.status}` }, { status: 400 });
  } catch (error: any) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: error.message || "Failed to resend" }, { status: 500 });
  }
}
