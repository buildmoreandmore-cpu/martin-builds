-- Paid-ads attribution columns for the existing `leads` table.
-- Additive only: the contact form + admin panel keep working unchanged.
-- Paid leads are tagged source='paid_ads', type=<channel slug>.
--   company            -> reuses existing `business` column
--   project_description-> reuses existing `message` column
-- Everything below is new.

alter table leads add column if not exists budget_range     text;
alter table leads add column if not exists landing_page     text;

-- Attribution: flattened click params (last-touch wins) for easy SQL filtering
alter table leads add column if not exists utm_source       text;
alter table leads add column if not exists utm_medium       text;
alter table leads add column if not exists utm_campaign     text;
alter table leads add column if not exists utm_term         text;
alter table leads add column if not exists utm_content      text;
alter table leads add column if not exists gclid            text;
alter table leads add column if not exists gbraid           text;
alter table leads add column if not exists wbraid           text;
alter table leads add column if not exists fbclid           text;
alter table leads add column if not exists msclkid          text;
alter table leads add column if not exists referrer         text;

-- Full snapshots: first-touch is set once and never overwritten; last-touch is current
alter table leads add column if not exists first_touch_json jsonb;
alter table leads add column if not exists last_touch_json  jsonb;

create index if not exists leads_utm_campaign_idx on leads (utm_campaign);
create index if not exists leads_created_at_idx   on leads (created_at);

-- RLS note:
--   `leads` is written ONLY by the service-role key from the server route handler
--   (/api/leads and /api/contact). The browser never talks to Supabase directly.
--   Keep RLS enabled and do NOT add an anon insert policy — there is no client-side
--   insert path to authorize. If RLS is not yet enabled on this table, run:
--       alter table leads enable row level security;
--   (no policies needed; the service role bypasses RLS).
