-- SentiQ 21 - run this in the Supabase SQL editor
-- (Dashboard -> SQL Editor -> New query -> paste -> Run).
--
-- Safe to run again after an update: everything below is idempotent.

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

-- Added later, for the counselling follow-up. full_name and phone are only
-- ever written when the student ticked the consent box in the app.
alter table public.dass_results
  add column if not exists full_name      text,
  add column if not exists phone          text,
  add column if not exists consent        boolean not null default false,
  add column if not exists needs_followup boolean not null default false;

create index if not exists dass_results_device_taken_idx
  on public.dass_results (device_id, taken_at desc);

-- Partial index: the follow-up queue is tiny next to the whole table.
create index if not exists dass_results_followup_idx
  on public.dass_results (taken_at desc)
  where needs_followup;

alter table public.dass_results enable row level security;


-- ---------------------------------------------------------------------
-- Row-level security
--
-- The app runs on the public anon key, which is published in the app's
-- source, so the policies below are the only thing protecting these rows.
-- A device may write its own results and read back only the rows carrying
-- its own device id, which the app sends as the x-device-id header.
-- ---------------------------------------------------------------------

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


-- ---------------------------------------------------------------------
-- Column privileges
--
-- Row-level security alone is not enough once real names are in the table.
-- Anyone can read the anon key out of the app's source, so the key is
-- granted the right to WRITE a name and phone number, and no right to READ
-- one back - not even its own. The app never needs to: the student's own
-- details live on their phone.
--
-- This is what stops a published key from being turned into a list of
-- students and their mental health scores.
-- ---------------------------------------------------------------------

revoke select on public.dass_results from anon;

grant select (
  id, device_id, taken_at, answers,
  depression, depression_level,
  anxiety,    anxiety_level,
  stress,     stress_level,
  consent, needs_followup, created_at
) on public.dass_results to anon;

grant insert, update on public.dass_results to anon;


-- ---------------------------------------------------------------------
-- Reading the follow-up queue
--
-- Counsellors should read this through the Supabase dashboard, or with a
-- real Supabase account - never with the anon key. To let signed-in staff
-- read everything, uncomment:
--
--   grant select on public.dass_results to authenticated;
--
--   drop policy if exists "staff can read everything" on public.dass_results;
--   create policy "staff can read everything"
--     on public.dass_results for select to authenticated using (true);
--
-- The queue itself:
--
--   select taken_at, full_name, phone,
--          depression, depression_level,
--          anxiety,    anxiety_level,
--          stress,     stress_level
--   from public.dass_results
--   where needs_followup and consent
--   order by taken_at desc;
-- ---------------------------------------------------------------------
