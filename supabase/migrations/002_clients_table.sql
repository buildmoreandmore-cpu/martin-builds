-- Clients table for AI Agent setup flow
-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/szedjomnmwnbkwolegiw/sql

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  phone text default 'not-provided',
  business_name text not null,
  business_description text,
  bot_name text,
  industry text default 'other',
  plan text default 'starter',
  connected_tools text[] default '{}',
  telegram_chat_id text,
  linking_code text,
  stripe_customer_id text,
  stripe_subscription_id text,
  bot_token text,
  bot_username text,
  active boolean default true,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Indexes
create index if not exists idx_clients_email on clients(email);
create index if not exists idx_clients_telegram on clients(telegram_chat_id);
create index if not exists idx_clients_stripe on clients(stripe_customer_id);
create index if not exists idx_clients_linking_code on clients(linking_code);
