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
  model_probability numeric,
  model_probability_label text,
  model_snapshot_at timestamptz,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint predictions_model_probability_check check (
    model_probability is null or (model_probability >= 0 and model_probability <= 1)
  ),
  constraint predictions_score_shape check (
    (prediction_type = 'outcome' and outcome is not null and home_score is null and away_score is null)
    or
    (prediction_type = 'score' and outcome is null and home_score is not null and away_score is not null)
  ),
  constraint predictions_one_per_user_match unique (user_id, match_id)
);

alter table public.predictions
  add column if not exists display_name text;

alter table public.predictions
  add column if not exists model_probability numeric;

alter table public.predictions
  add column if not exists model_probability_label text;

alter table public.predictions
  add column if not exists model_snapshot_at timestamptz;

alter table public.predictions
  drop constraint if exists predictions_model_probability_check;

alter table public.predictions
  add constraint predictions_model_probability_check
  check (model_probability is null or (model_probability >= 0 and model_probability <= 1));

alter table public.predictions
  drop constraint if exists predictions_public_only_check;

update public.predictions
  set is_public = true
  where is_public = false;

alter table public.predictions
  alter column is_public set default true;

alter table public.predictions
  add constraint predictions_public_only_check
  check (is_public = true);

create index if not exists predictions_user_created_idx
  on public.predictions (user_id, created_at desc);

create index if not exists predictions_public_created_idx
  on public.predictions (is_public, created_at desc);

alter table public.predictions enable row level security;

drop policy if exists "Users can read own predictions and public predictions" on public.predictions;
create policy "Users can read own predictions and public predictions"
  on public.predictions
  for select
  to authenticated
  using (is_public = true or auth.uid() = user_id);

drop policy if exists "Users can insert own predictions" on public.predictions;
create policy "Users can insert own predictions"
  on public.predictions
  for insert
  to authenticated
  with check (auth.uid() = user_id and is_public = true);

drop policy if exists "Users can update own predictions" on public.predictions;
create policy "Users can update own predictions"
  on public.predictions
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id and is_public = true);

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

create table if not exists public.match_results (
  match_id text primary key,
  match_label text not null,
  match_kickoff_utc timestamptz,
  home_team text,
  away_team text,
  home_score integer not null check (home_score >= 0),
  away_score integer not null check (away_score >= 0),
  status text not null default 'finished' check (status = 'finished'),
  source text,
  settled_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists match_results_updated_idx
  on public.match_results (updated_at desc);

alter table public.match_results enable row level security;

drop policy if exists "Authenticated users can read match results" on public.match_results;
create policy "Authenticated users can read match results"
  on public.match_results
  for select
  to authenticated
  using (true);

drop trigger if exists match_results_set_updated_at on public.match_results;
create trigger match_results_set_updated_at
  before update on public.match_results
  for each row
  execute function public.set_updated_at();

create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_profiles_username_check check (char_length(trim(username)) between 1 and 64)
);

alter table public.user_profiles enable row level security;

drop policy if exists "Users can read own profile" on public.user_profiles;
create policy "Users can read own profile"
  on public.user_profiles
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own profile" on public.user_profiles;
create policy "Users can insert own profile"
  on public.user_profiles
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own profile" on public.user_profiles;
create policy "Users can update own profile"
  on public.user_profiles
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop trigger if exists user_profiles_set_updated_at on public.user_profiles;
create trigger user_profiles_set_updated_at
  before update on public.user_profiles
  for each row
  execute function public.set_updated_at();

insert into public.user_profiles (user_id, username)
select
  users.id,
  coalesce(
    nullif(users.raw_user_meta_data ->> 'display_name', ''),
    nullif(users.raw_user_meta_data ->> 'username', '')
  ) as username
from auth.users users
where users.email like '%@users.worldcup-lookup.app'
  and coalesce(
    nullif(users.raw_user_meta_data ->> 'display_name', ''),
    nullif(users.raw_user_meta_data ->> 'username', '')
  ) is not null
on conflict (user_id) do nothing;

insert into public.user_profiles (user_id, username)
select
  predictions.user_id,
  max(nullif(predictions.display_name, '')) as username
from public.predictions predictions
where predictions.display_name is not null
  and nullif(predictions.display_name, '') is not null
  and predictions.display_name not ilike '%@users.worldcup-lookup.app'
group by predictions.user_id
on conflict (user_id) do nothing;

insert into public.user_profiles (user_id, username)
select users.id, seed_profiles.username
from (
  values
    ('00f003bb-b3e1-4e4f-a1a7-8d767e534604'::uuid, 'wc-admin-7kq4'),
    ('d06f7d2e-e954-4a57-b2c3-d2464ac2b071'::uuid, '艹公公')
) as seed_profiles(user_id, username)
join auth.users users on users.id = seed_profiles.user_id
on conflict (user_id) do update
set username = excluded.username,
    updated_at = now();

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

insert into public.admin_users (user_id)
values ('00f003bb-b3e1-4e4f-a1a7-8d767e534604')
on conflict (user_id) do nothing;

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users admin
    where admin.user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "Admins can manage match results" on public.match_results;
create policy "Admins can manage match results"
  on public.match_results
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create or replace function public.admin_upsert_match_results(results jsonb)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  upserted_count integer;
begin
  if not public.is_admin() then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  if results is null or jsonb_typeof(results) <> 'array' then
    raise exception 'results must be a json array' using errcode = '22023';
  end if;

  with input as (
    select *
    from jsonb_to_recordset(results) as item(
      match_id text,
      match_label text,
      match_kickoff_utc timestamptz,
      home_team text,
      away_team text,
      home_score integer,
      away_score integer,
      status text,
      source text
    )
  ),
  valid as (
    select
      trim(match_id) as match_id,
      coalesce(nullif(trim(match_label), ''), trim(match_id)) as match_label,
      match_kickoff_utc,
      nullif(trim(home_team), '') as home_team,
      nullif(trim(away_team), '') as away_team,
      home_score,
      away_score,
      'finished'::text as status,
      nullif(trim(source), '') as source
    from input
    where nullif(trim(match_id), '') is not null
      and home_score is not null
      and away_score is not null
      and home_score >= 0
      and away_score >= 0
      and coalesce(nullif(trim(status), ''), 'finished') = 'finished'
  ),
  upserted as (
    insert into public.match_results (
      match_id,
      match_label,
      match_kickoff_utc,
      home_team,
      away_team,
      home_score,
      away_score,
      status,
      source,
      settled_at
    )
    select
      valid.match_id,
      valid.match_label,
      valid.match_kickoff_utc,
      valid.home_team,
      valid.away_team,
      valid.home_score,
      valid.away_score,
      valid.status,
      valid.source,
      now()
    from valid
    on conflict (match_id) do update
    set
      match_label = excluded.match_label,
      match_kickoff_utc = excluded.match_kickoff_utc,
      home_team = excluded.home_team,
      away_team = excluded.away_team,
      settled_at = case
        when public.match_results.home_score is distinct from excluded.home_score
          or public.match_results.away_score is distinct from excluded.away_score
          or public.match_results.status is distinct from excluded.status
        then now()
        else public.match_results.settled_at
      end,
      home_score = excluded.home_score,
      away_score = excluded.away_score,
      status = excluded.status,
      source = excluded.source,
      updated_at = now()
    returning 1
  )
  select count(*)::integer into upserted_count
  from upserted;

  return coalesce(upserted_count, 0);
end;
$$;

revoke all on function public.admin_upsert_match_results(jsonb) from public;
grant execute on function public.admin_upsert_match_results(jsonb) to authenticated;

create or replace function public.get_public_leaderboard(min_predictions integer default 1)
returns table (
  user_id uuid,
  display_name text,
  correct_count bigint,
  settled_count bigint,
  accuracy numeric,
  latest_prediction_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  return query
  with assessed as (
    select
      predictions.user_id,
      coalesce(
        nullif(profiles.username, ''),
        nullif(predictions.display_name, ''),
        'user ' || left(predictions.user_id::text, 8)
      ) as display_name,
      predictions.created_at,
      case
        when predictions.prediction_type = 'score' then
          predictions.home_score = match_results.home_score
          and predictions.away_score = match_results.away_score
        when predictions.prediction_type = 'outcome' then
          predictions.outcome = case
            when match_results.home_score > match_results.away_score then 'home'
            when match_results.home_score < match_results.away_score then 'away'
            else 'draw'
          end
        else false
      end as correct
    from public.predictions predictions
    join lateral (
      select match_results.*
      from public.match_results match_results
      where match_results.status = 'finished'
        and (
          match_results.match_id = predictions.match_id
          or (
            match_results.match_kickoff_utc is not null
            and predictions.match_kickoff_utc is not null
            and abs(extract(epoch from (match_results.match_kickoff_utc - predictions.match_kickoff_utc))) <= 18 * 60 * 60
            and lower(regexp_replace(coalesce(match_results.home_team, ''), '\s+', '', 'g')) =
              lower(regexp_replace(coalesce(predictions.home_team, ''), '\s+', '', 'g'))
            and lower(regexp_replace(coalesce(match_results.away_team, ''), '\s+', '', 'g')) =
              lower(regexp_replace(coalesce(predictions.away_team, ''), '\s+', '', 'g'))
          )
        )
      order by
        case when match_results.match_id = predictions.match_id then 0 else 1 end,
        abs(extract(epoch from (match_results.match_kickoff_utc - predictions.match_kickoff_utc))) nulls last
      limit 1
    ) match_results on true
    left join public.user_profiles profiles
      on profiles.user_id = predictions.user_id
    where predictions.is_public = true
      and predictions.created_at < predictions.match_kickoff_utc
  )
  select
    assessed.user_id,
    max(assessed.display_name) as display_name,
    count(*) filter (where assessed.correct) as correct_count,
    count(*) as settled_count,
    (count(*) filter (where assessed.correct))::numeric / nullif(count(*), 0)::numeric as accuracy,
    max(assessed.created_at) as latest_prediction_at
  from assessed
  group by assessed.user_id
  having count(*) >= greatest(1, coalesce(min_predictions, 1))
  order by
    ((count(*) filter (where assessed.correct))::numeric / nullif(count(*), 0)::numeric) desc,
    count(*) filter (where assessed.correct) desc,
    count(*) desc,
    max(assessed.created_at) desc
  limit 50;
end;
$$;

revoke all on function public.get_public_leaderboard(integer) from public;
grant execute on function public.get_public_leaderboard(integer) to authenticated;

create or replace function public.admin_list_users()
returns table (
  user_id uuid,
  username text,
  auth_created_at timestamptz,
  last_sign_in_at timestamptz,
  prediction_count bigint,
  public_prediction_count bigint,
  private_prediction_count bigint,
  latest_prediction_at timestamptz
)
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.is_admin() then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  return query
  select
    users.id,
    coalesce(
      nullif(profiles.username, ''),
      nullif(users.raw_user_meta_data ->> 'display_name', ''),
      nullif(users.raw_user_meta_data ->> 'username', ''),
      nullif(max(nullif(predictions.display_name, '')) filter (
        where predictions.display_name not ilike '%@users.worldcup-lookup.app'
      ), ''),
      '用户 ' || left(users.id::text, 8)
    ) as username,
    users.created_at,
    users.last_sign_in_at,
    count(predictions.id) as prediction_count,
    count(predictions.id) filter (where predictions.is_public) as public_prediction_count,
    count(predictions.id) filter (where not predictions.is_public) as private_prediction_count,
    max(predictions.created_at) as latest_prediction_at
  from auth.users users
  left join public.user_profiles profiles on profiles.user_id = users.id
  left join public.predictions predictions on predictions.user_id = users.id
  where users.email like '%@users.worldcup-lookup.app'
  group by users.id, profiles.username, users.raw_user_meta_data, users.created_at, users.last_sign_in_at
  order by count(predictions.id) desc, max(predictions.created_at) desc nulls last, users.created_at desc;
end;
$$;

revoke all on function public.admin_list_users() from public;
grant execute on function public.admin_list_users() to authenticated;

create or replace function public.admin_list_user_predictions(target_user_id uuid)
returns table (
  id uuid,
  user_id uuid,
  match_id text,
  match_kickoff_utc timestamptz,
  match_label text,
  home_team text,
  away_team text,
  display_name text,
  prediction_type text,
  outcome text,
  home_score integer,
  away_score integer,
  model_probability numeric,
  model_probability_label text,
  model_snapshot_at timestamptz,
  is_public boolean,
  created_at timestamptz,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  return query
  select
    predictions.id,
    predictions.user_id,
    predictions.match_id,
    predictions.match_kickoff_utc,
    predictions.match_label,
    predictions.home_team,
    predictions.away_team,
    predictions.display_name,
    predictions.prediction_type,
    predictions.outcome,
    predictions.home_score,
    predictions.away_score,
    predictions.model_probability,
    predictions.model_probability_label,
    predictions.model_snapshot_at,
    predictions.is_public,
    predictions.created_at,
    predictions.updated_at
  from public.predictions predictions
  where predictions.user_id = target_user_id
  order by predictions.created_at desc;
end;
$$;

revoke all on function public.admin_list_user_predictions(uuid) from public;
grant execute on function public.admin_list_user_predictions(uuid) to authenticated;

create or replace function public.admin_delete_user_predictions(target_user_id uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted_count integer;
begin
  if not public.is_admin() then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  delete from public.predictions predictions
  where predictions.user_id = target_user_id;

  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

revoke all on function public.admin_delete_user_predictions(uuid) from public;
grant execute on function public.admin_delete_user_predictions(uuid) to authenticated;

create or replace function public.admin_delete_user(target_user_id uuid)
returns integer
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  deleted_count integer;
begin
  if not public.is_admin() then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  if target_user_id = auth.uid() then
    raise exception 'cannot delete current admin user' using errcode = '42501';
  end if;

  delete from auth.users users
  where users.id = target_user_id
    and users.email like '%@users.worldcup-lookup.app';

  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

revoke all on function public.admin_delete_user(uuid) from public;
grant execute on function public.admin_delete_user(uuid) to authenticated;
