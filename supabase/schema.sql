-- SentiQ 21 - run this once in the Supabase SQL editor
-- (Dashboard -> SQL Editor -> New query -> paste -> Run).

create table if not exists public.dass_results (
  id               text primary key,
  device_id        text        not null,
  taken_at         timestamptz not null default now(),
  answers          jsonb       not null,
  depression       int         not null,
  depression_level text        not null,
  anxiety          int         not null,
  anxiety_level    text        not null,
  stress           int         not null,
  stress_level     text        not null,
  created_at       timestamptz not null default now()
);

create index if not exists dass_results_device_taken_idx
  on public.dass_results (device_id, taken_at desc);

alter table public.dass_results enable row level security;

-- The app runs on the public anon key, so the policies below are the only
-- thing protecting the rows. A device may write its own results, and read
-- back only the rows carrying its own device id, which the app sends as the
-- x-device-id request header.

drop policy if exists "device can insert own results" on public.dass_results;
create policy "device can insert own results"
  on public.dass_results
  for insert
  to anon
  with check (
    device_id = current_setting('request.headers', true)::json ->> 'x-device-id'
  );

drop policy if exists "device can read own results" on public.dass_results;
create policy "device can read own results"
  on public.dass_results
  for select
  to anon
  using (
    device_id = current_setting('request.headers', true)::json ->> 'x-device-id'
  );

drop policy if exists "device can update own results" on public.dass_results;
create policy "device can update own results"
  on public.dass_results
  for update
  to anon
  using (
    device_id = current_setting('request.headers', true)::json ->> 'x-device-id'
  )
  with check (
    device_id = current_setting('request.headers', true)::json ->> 'x-device-id'
  );

-- No delete policy on purpose: the anon key cannot remove rows.

-- Counsellors and researchers should read the data with a Supabase account
-- rather than the anon key. Grant that separately, for example:
--
--   create policy "staff can read everything"
--     on public.dass_results for select to authenticated using (true);
