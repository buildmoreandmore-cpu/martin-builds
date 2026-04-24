-- Industry pain points for drip email personalization
create table if not exists industry_pains (
  id uuid default gen_random_uuid() primary key,
  industry text unique not null,
  pains text not null,
  items jsonb not null default '[]'::jsonb,
  created_at timestamptz default now()
);

-- Seed with existing hardcoded industries
insert into industry_pains (industry, pains, items) values
  ('Law Firm', 'intake, conflict checks, engagement letters', '[{"title":"Intake & onboarding portal","desc":"clients fill it out once, it feeds directly into your case management"},{"title":"Operations dashboard","desc":"cases, billing, and team workload in one view"},{"title":"AI assistant on your site","desc":"captures leads and answers client questions 24/7"}]'),
  ('Real Estate', 'tenant applications, lease management, maintenance requests', '[{"title":"Tenant application portal","desc":"online applications that feed directly into your screening workflow"},{"title":"Property dashboard","desc":"leases, payments, and maintenance requests in one view"},{"title":"AI assistant on your site","desc":"answers tenant questions and captures leads 24/7"}]'),
  ('Healthcare', 'credentialing, provider onboarding, compliance tracking', '[{"title":"Provider onboarding portal","desc":"credentialing docs submitted once, tracked automatically"},{"title":"Compliance dashboard","desc":"certifications, expirations, and audit trails in one view"},{"title":"AI assistant on your site","desc":"handles patient intake questions and appointment routing 24/7"}]'),
  ('Construction', 'project bids, subcontractor scheduling, change orders', '[{"title":"Project intake portal","desc":"bid requests and scope docs submitted once, organized automatically"},{"title":"Operations dashboard","desc":"active jobs, crew schedules, and budgets in one view"},{"title":"AI assistant on your site","desc":"captures project inquiries and qualifies leads 24/7"}]'),
  ('Restaurant', 'scheduling, inventory tracking, vendor orders', '[{"title":"Staff scheduling portal","desc":"shifts, availability, and swaps handled in one place"},{"title":"Operations dashboard","desc":"inventory, vendor orders, and labor costs in one view"},{"title":"AI assistant on your site","desc":"handles reservations and answers menu questions 24/7"}]'),
  ('Retail', 'inventory tracking, vendor orders, customer follow-ups', '[{"title":"Inventory management portal","desc":"stock levels, reorders, and vendor POs in one workflow"},{"title":"Sales dashboard","desc":"daily revenue, top products, and customer trends in one view"},{"title":"AI assistant on your site","desc":"answers product questions and captures leads 24/7"}]'),
  ('Professional Services', 'client intake, project tracking, invoicing', '[{"title":"Client onboarding portal","desc":"intake forms, contracts, and payments in one flow"},{"title":"Operations dashboard","desc":"projects, billing, and team utilization in one view"},{"title":"AI assistant on your site","desc":"qualifies leads and books consultations 24/7"}]'),
  ('Technology', 'onboarding, support tickets, usage reporting', '[{"title":"Customer onboarding portal","desc":"setup steps, integrations, and training tracked automatically"},{"title":"Operations dashboard","desc":"support tickets, usage metrics, and churn signals in one view"},{"title":"AI assistant on your site","desc":"handles support questions and captures demo requests 24/7"}]'),
  ('Finance', 'client onboarding, document collection, compliance reporting', '[{"title":"Client intake portal","desc":"KYC docs, applications, and agreements collected in one flow"},{"title":"Operations dashboard","desc":"accounts, compliance deadlines, and team workload in one view"},{"title":"AI assistant on your site","desc":"answers client questions and pre-qualifies leads 24/7"}]')
on conflict (industry) do nothing;
