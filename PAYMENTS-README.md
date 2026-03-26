# Martin Builds — Payment Operations Guide

All payments are handled through Stripe. No custom admin UI — everything is managed from the Stripe Dashboard.

---

## 1. Create a New Project Invoice

1. Go to **Stripe Dashboard → Billing → Invoices → Create Invoice**
2. Enter the client's email address
3. Add line items:
   - **Description**: Full project name and scope (e.g., "AI Starter Build — Custom Lead Capture Tool")
   - **Amount**: Exact project price
4. Set **Due date** to "Due on receipt"
5. Add a **Memo** with the project scope summary, deliverables, and timeline
6. Add **Metadata** (scroll to bottom of invoice creation):
   - `client_name` — Client's full name
   - `project_name` — Project name
   - `payment_type` — `deposit`, `full`, or `retainer`
   - `scope_summary` — Brief scope description
7. Click **Send Invoice**

The client receives a branded email with a pay-now link.

---

## 2. Multi-Phase Invoices

Each phase gets its own invoice. Create them upfront so the client sees the full roadmap.

1. **Invoice 1 (Phase 1):**
   - Description: "Phase 1 of 3 — Discovery & Design"
   - Memo: Full phase roadmap (all 3 phases listed with deliverables)
   - Metadata: add `phase` = `1`, `total_phases` = `3`
   - Due: On receipt

2. **Invoice 2 (Phase 2):**
   - Description: "Phase 2 of 3 — Development"
   - Metadata: add `phase` = `2`, `total_phases` = `3`
   - **Save as draft** — do NOT send until Phase 1 is paid and delivered

3. **Invoice 3 (Phase 3):**
   - Description: "Phase 3 of 3 — Launch & Handoff"
   - Metadata: add `phase` = `3`, `total_phases` = `3`
   - **Save as draft** — send only after Phase 2 is complete

**Rule:** Never send the next phase invoice until the current phase is paid AND delivered.

---

## 3. Itemize Add-Ons Using Line Items

Each invoice can have multiple line items. Use them to break down project components:

| Line Item | Description | Amount |
|-----------|-------------|--------|
| Core Website Build | 5-page Next.js site with CMS | $5,000 |
| AI Chat Integration | Custom ChatGPT-powered assistant | $2,000 |
| SEO Optimization | Technical SEO + local targeting | $1,000 |

- Each line item should include: feature name, brief description, and price
- Total = sum of all line items
- If the client requests add-ons after the invoice is sent: **void the original** and **create a new invoice** with the updated line items

---

## 4. Void and Reissue a Revised Invoice

1. Go to **Billing → Invoices** and find the original invoice
2. Click the invoice → **Actions → Void Invoice**
3. Create a new invoice with the updated line items and amounts
4. Add a note in the memo: "Revised invoice — replaces [original invoice ID]"
5. Send the new invoice

**Never edit a sent invoice.** Always void and reissue.

---

## 5. Split Payment Projects (50/50)

Create both invoices at project start:

1. **Invoice 1 — Deposit (50%):**
   - Description: "[Project Name] — Deposit (50%)"
   - Amount: Half the total project cost
   - Metadata: `payment_type` = `deposit`
   - Due: On receipt
   - **Send immediately**

2. **Invoice 2 — Final Balance (50%):**
   - Description: "[Project Name] — Final Balance (50%)"
   - Amount: Remaining half
   - Metadata: `payment_type` = `final`
   - Due date: Set to expected delivery date
   - **Save as draft** or send with future due date

**Rule:** Final assets, credentials, and handoff do not occur until Invoice 2 is marked paid in full.

---

## 6. Retainer Clients (Stripe Subscriptions)

1. Go to **Billing → Subscriptions → Create Subscription**
2. Select or create the customer
3. Add a product/price:
   - Product name: "Martin Builds Monthly Retainer"
   - Price: Monthly amount (e.g., $2,500/mo or $5,000/mo)
4. Set billing date and enable auto-renewal
5. Add metadata: `client_name`, `payment_type` = `retainer`
6. Start the subscription

The client enters their card once and is charged automatically every month. Cancellation requires written notice per the service agreement.

---

## 7. Configure Auto-Reminders

1. Go to **Settings → Billing → Invoices → Reminders**
2. Enable automatic reminders:
   - **3 days** after due date: Polite reminder
   - **7 days** after due date: Follow-up reminder
   - **14 days** after due date: Final notice
3. Customize the reminder email copy if desired

After 14 days unpaid: Initiate formal demand sequence (see Section 9).

---

## 8. Find, Filter, and Export Transactions

### Search & Filter
1. Go to **Payments → All Payments** or **Billing → Invoices**
2. Use filters:
   - Status: Paid, Open, Void, Uncollectible
   - Date range
   - Customer email
   - Metadata fields (use the search bar: `metadata:project_name:ProjectX`)

### Export
1. Apply your desired filters
2. Click **Export** (top right)
3. Choose CSV or other format
4. Download includes all transaction details and metadata

---

## 9. Formal Demand Sequence (14+ Days Unpaid)

When an invoice is 14+ days overdue and auto-reminders have been exhausted:

1. **Day 14:** Send a direct email from your business email (not Stripe) stating:
   - Invoice number and amount
   - Original due date
   - Reference to the Martin Builds Service Agreement
   - Request for immediate payment
   - State that work is paused until payment is received

2. **Day 21:** Send a formal demand letter:
   - Reference the service agreement (Section 3 and Section 9)
   - State that continued non-payment will result in arbitration
   - Give a 7-day deadline

3. **Day 30:** If still unpaid:
   - Mark the invoice as **Uncollectible** in Stripe
   - Initiate binding arbitration per the service agreement (Atlanta, GA, American Arbitration Association)

---

## Environment Variables

Set these in Vercel (Settings → Environment Variables):

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Stripe secret key (sk_live_...) |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (pk_live_...) |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret (whsec_...) |

---

## Stripe Webhook Setup

1. Go to **Developers → Webhooks → Add Endpoint**
2. Endpoint URL: `https://martin.builds/api/webhooks/stripe`
3. Select events:
   - `payment_intent.succeeded`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `customer.subscription.created`
4. Copy the signing secret → set as `STRIPE_WEBHOOK_SECRET` in Vercel
