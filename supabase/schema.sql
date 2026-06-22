create extension if not exists pgcrypto;

create table if not exists public.predictions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  match_id text not null,
  match_kickoff_utc timestamptz not null,
  match_label text not null,
  home_team text not null,
  away_team text not null,
  display_name text,
  prediction_type text not null check (prediction_type in ('outcome', 'score')),
  outcome text check (outcome in ('home', 'draw', 'away')),
  home_score integer check (home_score >= 0),
  away_score integer check (away_score >= 0),
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint predictions_score_shape check (
    (prediction_type = 'outcome' and outcome is not null and home_score is null and away_score is null)
    or
    (prediction_type = 'score' and outcome is null and home_score is not null and away_score is not null)
  ),
  constraint predictions_one_per_user_match unique (user_id, match_id)
);

alter table public.predictions
  add column if not exists display_name text;

create index if not exists predictions_user_created_idx
  on public.predictions (user_id, created_at desc);

create index if not exists predictions_public_created_idx
  on public.predictions (is_public, created_at desc);

alter table public.predictions enable row level security;

drop policy if exists "Users can read own predictions and public predictions" on public.predictions;
create policy "Users can read own predictions and public predictions"
  on public.predictions
  for select
  using (is_public = true or auth.uid() = user_id);

drop policy if exists "Users can insert own predictions" on public.predictions;
create policy "Users can insert own predictions"
  on public.predictions
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own predictions" on public.predictions;
create policy "Users can update own predictions"
  on public.predictions
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own predictions" on public.predictions;
create policy "Users can delete own predictions"
  on public.predictions
  for delete
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists predictions_set_updated_at on public.predictions;
create trigger predictions_set_updated_at
  before update on public.predictions
  for each row
  execute function public.set_updated_at();
