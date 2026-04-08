-- martin.builds Utility Platform Schema
-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/szedjomnmwnbkwolegiw/sql

-- Clients
create table if not exists utility_clients (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  email text unique not null,
  tier text default 'essential',
  stripe_customer_id text,
  stripe_subscription_id text,
  embed_key text unique default gen_random_uuid()::text,
  telegram_chat_id bigint,
  telegram_linked_at timestamp,
  is_active boolean default false,
  onboarding_complete boolean default false,
  created_at timestamp default now()
);

-- Agent training data per client
create table if not exists agent_training (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references utility_clients(id) on delete cascade,
  business_description text,
  services text,
  coverage_area text,
  pricing_notes text,
  tone text default 'professional',
  intake_questions text,
  custom_instructions text,
  updated_at timestamp default now()
);

-- Conversation history (shared across widget + telegram)
create table if not exists agent_messages (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references utility_clients(id) on delete cascade,
  role text not null,
  content text not null,
  interface text not null,
  created_at timestamp default now()
);

-- Client business data (CRM records)
create table if not exists client_data (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references utility_clients(id) on delete cascade,
  record_type text not null,
  data jsonb not null,
  status text default 'active',
  created_at timestamp default now()
);

-- Usage tracking for billing
create table if not exists usage_log (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references utility_clients(id) on delete cascade,
  interface text not null,
  tokens_used integer,
  billed_at timestamp,
  billing_period text,
  created_at timestamp default now()
);

-- Onboarding tokens (magic links)
create table if not exists onboarding_tokens (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  tier text not null,
  token text unique default gen_random_uuid()::text,
  used boolean default false,
  expires_at timestamp default now() + interval '7 days',
  created_at timestamp default now()
);

-- RLS policies
alter table utility_clients enable row level security;
alter table agent_training enable row level security;
alter table agent_messages enable row level security;
alter table client_data enable row level security;
alter table usage_log enable row level security;

-- Indexes
create index if not exists idx_agent_messages_client on agent_messages(client_id, created_at desc);
create index if not exists idx_client_data_client on client_data(client_id, record_type);
create index if not exists idx_usage_log_client on usage_log(client_id, created_at desc);
create index if not exists idx_utility_clients_embed on utility_clients(embed_key);
create index if not exists idx_utility_clients_telegram on utility_clients(telegram_chat_id);
create index if not exists idx_onboarding_tokens_token on onboarding_tokens(token);
