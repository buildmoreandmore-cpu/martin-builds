-- Email queue for scheduled sends spread across days/windows
create table if not exists email_queue (
  id uuid default gen_random_uuid() primary key,
  lead_id uuid not null,
  template_id text,
  custom_subject text,
  custom_message text,
  type text,
  sequence_step integer,
  scheduled_for timestamptz not null,
  sent_at timestamptz,
  error text,
  status text not null default 'queued',
  created_at timestamptz default now()
);

create index if not exists email_queue_due_idx on email_queue (status, scheduled_for) where status = 'queued';
create index if not exists email_queue_lead_idx on email_queue (lead_id);
