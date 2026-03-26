-- Two-Phase Project Payments Schema
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS project_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Client Info
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,

  -- Project Details
  project_name TEXT NOT NULL,
  project_description TEXT,
  total_amount INTEGER NOT NULL, -- in cents

  -- Payment Tracking
  phase_1_amount INTEGER NOT NULL, -- 50% down payment in cents
  phase_2_amount INTEGER NOT NULL, -- remaining 50% in cents

  phase_1_status TEXT DEFAULT 'pending' CHECK (phase_1_status IN ('pending', 'paid', 'failed')),
  phase_2_status TEXT DEFAULT 'pending' CHECK (phase_2_status IN ('pending', 'paid', 'failed', 'ready')),

  phase_1_paid_at TIMESTAMPTZ,
  phase_2_paid_at TIMESTAMPTZ,

  -- Stripe IDs
  stripe_customer_id TEXT,
  phase_1_payment_intent_id TEXT,
  phase_2_payment_intent_id TEXT,
  phase_1_invoice_id TEXT,
  phase_2_invoice_id TEXT,

  -- Project Status
  project_status TEXT DEFAULT 'awaiting_deposit' CHECK (project_status IN (
    'awaiting_deposit',
    'in_progress',
    'ready_for_review',
    'awaiting_final_payment',
    'completed',
    'cancelled'
  )),

  -- Payment Links (for easy resending)
  phase_1_payment_link TEXT,
  phase_2_payment_link TEXT,

  -- Metadata
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_project_payments_email ON project_payments(client_email);
CREATE INDEX IF NOT EXISTS idx_project_payments_stripe_customer ON project_payments(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_project_payments_status ON project_payments(project_status);
CREATE INDEX IF NOT EXISTS idx_project_payments_phase_1_status ON project_payments(phase_1_status);
CREATE INDEX IF NOT EXISTS idx_project_payments_phase_2_status ON project_payments(phase_2_status);

-- Updated timestamp trigger
CREATE OR REPLACE FUNCTION update_project_payments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_project_payments_updated_at
  BEFORE UPDATE ON project_payments
  FOR EACH ROW
  EXECUTE FUNCTION update_project_payments_updated_at();

-- Row Level Security (optional - adjust based on your needs)
ALTER TABLE project_payments ENABLE ROW LEVEL SECURITY;

-- Policy: Service role can do everything
CREATE POLICY "Service role has full access" ON project_payments
  FOR ALL
  USING (auth.role() = 'service_role');
