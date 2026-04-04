-- Migration: Create agent_subscriptions table for metered billing tracking
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

CREATE TABLE IF NOT EXISTS agent_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_customer_id TEXT UNIQUE NOT NULL,
  subscription_id TEXT NOT NULL,
  subscription_item_id TEXT NOT NULL,  -- metered item ID for usage reporting
  plan TEXT NOT NULL,                  -- essential | professional | enterprise
  customer_email TEXT,
  status TEXT DEFAULT 'active',        -- active | canceled | past_due
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups when reporting usage
CREATE INDEX IF NOT EXISTS idx_agent_subs_customer ON agent_subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_agent_subs_status ON agent_subscriptions(status);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_agent_subscriptions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_agent_subscriptions_updated_at
  BEFORE UPDATE ON agent_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_agent_subscriptions_updated_at();

-- Enable RLS (service role key bypasses this)
ALTER TABLE agent_subscriptions ENABLE ROW LEVEL SECURITY;
