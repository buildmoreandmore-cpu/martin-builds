import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const { invoice_id } = await req.json();

    if (!invoice_id) {
      return NextResponse.json(
        { error: "invoice_id is required" },
        { status: 400 }
      );
    }

    // Fetch the invoice to verify it's a draft final invoice
    const invoice = await stripe.invoices.retrieve(invoice_id);

    if (invoice.status !== "draft") {
      return NextResponse.json(
        { error: `Invoice is not a draft (status: ${invoice.status})` },
        { status: 400 }
      );
    }

    if (invoice.metadata?.payment_type !== "final") {
      return NextResponse.json(
        { error: "This invoice is not a final payment invoice" },
        { status: 400 }
      );
    }

    // Finalize and send
    const finalized = await stripe.invoices.finalizeInvoice(invoice_id);
    await stripe.invoices.sendInvoice(finalized.id);

    return NextResponse.json({
      success: true,
      invoice_id: finalized.id,
      status: "sent",
    });
  } catch (err) {
    console.error("POST /api/admin/invoices/release error:", err);
    const message = err instanceof Error ? err.message : "Failed to release invoice";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
