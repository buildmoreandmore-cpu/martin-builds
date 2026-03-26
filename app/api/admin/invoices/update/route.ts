import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const body = await req.json();
    const { action, invoice_id } = body;

    if (!action) {
      return NextResponse.json({ error: "action is required" }, { status: 400 });
    }

    /* ─── Update memo / description ─── */
    if (action === "update_memo") {
      const { memo } = body;
      if (!invoice_id) {
        return NextResponse.json({ error: "invoice_id is required" }, { status: 400 });
      }

      const invoice = await stripe.invoices.retrieve(invoice_id);
      if (invoice.status !== "draft" && invoice.status !== "open") {
        return NextResponse.json(
          { error: "Can only update memo on draft or open invoices" },
          { status: 400 }
        );
      }

      const updated = await stripe.invoices.update(invoice_id, {
        description: memo || "",
        metadata: {
          ...invoice.metadata,
          scope_summary: (memo || "").slice(0, 500),
        },
      });

      return NextResponse.json({ success: true, invoice_id: updated.id });
    }

    /* ─── Add line item ─── */
    if (action === "add_item") {
      const { description, amount } = body;
      if (!invoice_id || !description || !amount) {
        return NextResponse.json(
          { error: "invoice_id, description, and amount are required" },
          { status: 400 }
        );
      }

      const invoice = await stripe.invoices.retrieve(invoice_id);
      if (invoice.status !== "draft") {
        return NextResponse.json(
          { error: "Can only add line items to draft invoices" },
          { status: 400 }
        );
      }

      const customerId = typeof invoice.customer === "string"
        ? invoice.customer
        : invoice.customer?.id;

      if (!customerId) {
        return NextResponse.json(
          { error: "Invoice has no associated customer" },
          { status: 400 }
        );
      }

      const item = await stripe.invoiceItems.create({
        customer: customerId,
        invoice: invoice_id,
        description,
        amount: Math.round(amount * 100),
        currency: "usd",
      });

      return NextResponse.json({ success: true, item_id: item.id });
    }

    /* ─── Remove line item ─── */
    if (action === "remove_item") {
      const { invoice_item_id } = body;
      if (!invoice_item_id) {
        return NextResponse.json(
          { error: "invoice_item_id is required" },
          { status: 400 }
        );
      }

      // Verify the invoice is still in draft
      if (invoice_id) {
        const invoice = await stripe.invoices.retrieve(invoice_id);
        if (invoice.status !== "draft") {
          return NextResponse.json(
            { error: "Can only remove line items from draft invoices" },
            { status: 400 }
          );
        }
      }

      await stripe.invoiceItems.del(invoice_item_id);

      return NextResponse.json({ success: true });
    }

    /* ─── Void an invoice ─── */
    if (action === "void") {
      if (!invoice_id) {
        return NextResponse.json({ error: "invoice_id is required" }, { status: 400 });
      }

      const invoice = await stripe.invoices.retrieve(invoice_id);
      if (invoice.status !== "open") {
        return NextResponse.json(
          { error: "Can only void open invoices" },
          { status: 400 }
        );
      }

      const voided = await stripe.invoices.voidInvoice(invoice_id);

      return NextResponse.json({ success: true, invoice_id: voided.id });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    console.error("POST /api/admin/invoices/update error:", err);
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
