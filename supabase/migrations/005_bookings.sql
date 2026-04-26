-- Custom 15-minute discovery call bookings
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  start_at timestamptz not null,
  end_at timestamptz not null,
  name text not null,
  email text not null,
  business text,
  message text,
  timezone text,
  status text not null default 'confirmed',
  cancel_token uuid not null default gen_random_uuid(),
  created_at timestamptz default now()
);

create index if not exists bookings_start_idx on bookings (start_at) where status = 'confirmed';
create index if not exists bookings_email_idx on bookings (email);
