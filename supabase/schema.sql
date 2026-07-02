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
  prediction_type text not null check (prediction_type in ('outcome', 'score', 'combo')),
  outcome text check (outcome in ('home', 'draw', 'away')),
  home_score integer check (home_score >= 0),
  away_score integer check (away_score >= 0),
  combo_legs jsonb,
  model_probability numeric,
  model_probability_label text,
  model_snapshot_at timestamptz,
  stake_points numeric,
  payout_points numeric not null default 0,
  is_correct boolean,
  settled_at timestamptz,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint predictions_model_probability_check check (
    model_probability is null or (model_probability >= 0 and model_probability <= 1)
  ),
  constraint predictions_stake_points_check check (
    stake_points is null or stake_points >= 1
  ),
  constraint predictions_payout_points_check check (payout_points >= 0),
  constraint predictions_combo_legs_check check (
    combo_legs is null or jsonb_typeof(combo_legs) = 'array'
  ),
  constraint predictions_score_shape check (
    (prediction_type = 'outcome' and outcome is not null and home_score is null and away_score is null and combo_legs is null)
    or
    (prediction_type = 'score' and outcome is null and home_score is not null and away_score is not null and combo_legs is null)
    or
    (
      prediction_type = 'combo'
      and outcome is null
      and home_score is null
      and away_score is null
      and jsonb_typeof(combo_legs) = 'array'
      and jsonb_array_length(combo_legs) between 2 and 8
    )
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
  add column if not exists combo_legs jsonb;

alter table public.predictions
  add column if not exists stake_points numeric;

alter table public.predictions
  add column if not exists payout_points numeric not null default 0;

alter table public.predictions
  add column if not exists is_correct boolean;

alter table public.predictions
  add column if not exists settled_at timestamptz;

alter table public.predictions
  drop constraint if exists predictions_model_probability_check;

alter table public.predictions
  add constraint predictions_model_probability_check
  check (model_probability is null or (model_probability >= 0 and model_probability <= 1));

alter table public.predictions
  drop constraint if exists predictions_stake_points_check;

alter table public.predictions
  add constraint predictions_stake_points_check
  check (stake_points is null or stake_points >= 1);

alter table public.predictions
  drop constraint if exists predictions_payout_points_check;

alter table public.predictions
  add constraint predictions_payout_points_check
  check (payout_points >= 0);

alter table public.predictions
  drop constraint if exists predictions_prediction_type_check;

alter table public.predictions
  add constraint predictions_prediction_type_check
  check (prediction_type in ('outcome', 'score', 'combo'));

alter table public.predictions
  drop constraint if exists predictions_combo_legs_check;

alter table public.predictions
  add constraint predictions_combo_legs_check
  check (combo_legs is null or jsonb_typeof(combo_legs) = 'array');

alter table public.predictions
  drop constraint if exists predictions_score_shape;

alter table public.predictions
  add constraint predictions_score_shape
  check (
    (prediction_type = 'outcome' and outcome is not null and home_score is null and away_score is null and combo_legs is null)
    or
    (prediction_type = 'score' and outcome is null and home_score is not null and away_score is not null and combo_legs is null)
    or
    (
      prediction_type = 'combo'
      and outcome is null
      and home_score is null
      and away_score is null
      and jsonb_typeof(combo_legs) = 'array'
      and jsonb_array_length(combo_legs) between 2 and 8
    )
  );

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
drop policy if exists "Users can update own predictions" on public.predictions;
drop policy if exists "Users can delete own predictions" on public.predictions;

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

create table if not exists public.award_predictions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  award_type text not null check (award_type in ('golden_ball', 'golden_boot', 'golden_glove')),
  display_name text,
  candidate_name text not null,
  candidate_team text,
  model_probability numeric,
  model_snapshot_at timestamptz,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint award_predictions_model_probability_check check (
    model_probability is null or (model_probability >= 0 and model_probability <= 1)
  ),
  constraint award_predictions_public_only_check check (is_public = true),
  constraint award_predictions_one_per_user_award unique (user_id, award_type)
);

alter table public.award_predictions
  add column if not exists display_name text;

alter table public.award_predictions
  add column if not exists model_probability numeric;

alter table public.award_predictions
  add column if not exists model_snapshot_at timestamptz;

update public.award_predictions
  set is_public = true
  where is_public = false;

alter table public.award_predictions
  alter column is_public set default true;

create index if not exists award_predictions_user_created_idx
  on public.award_predictions (user_id, created_at desc);

create index if not exists award_predictions_public_created_idx
  on public.award_predictions (is_public, created_at desc);

alter table public.award_predictions enable row level security;

drop policy if exists "Users can read public award predictions" on public.award_predictions;
create policy "Users can read public award predictions"
  on public.award_predictions
  for select
  to authenticated
  using (is_public = true or auth.uid() = user_id);

drop policy if exists "Users can insert own award predictions" on public.award_predictions;
create policy "Users can insert own award predictions"
  on public.award_predictions
  for insert
  to authenticated
  with check (auth.uid() = user_id and is_public = true);

drop policy if exists "Users can update own award predictions" on public.award_predictions;
create policy "Users can update own award predictions"
  on public.award_predictions
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id and is_public = true);

drop policy if exists "Users can delete own award predictions" on public.award_predictions;
create policy "Users can delete own award predictions"
  on public.award_predictions
  for delete
  to authenticated
  using (auth.uid() = user_id);

drop trigger if exists award_predictions_set_updated_at on public.award_predictions;
create trigger award_predictions_set_updated_at
  before update on public.award_predictions
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

create table if not exists public.champion_picks (
  user_id uuid primary key references auth.users(id) on delete cascade,
  team_code text not null,
  created_at timestamptz not null default now()
);

alter table public.champion_picks
  drop constraint if exists champion_picks_team_code_check;

alter table public.champion_picks
  add constraint champion_picks_team_code_check check (
    team_code in (
      'ALG', 'ARG', 'AUS', 'AUT', 'BEL', 'BIH', 'BRA', 'CAN',
      'CIV', 'COD', 'COL', 'CPV', 'CRO', 'CUW', 'CZE', 'ECU',
      'EGY', 'ENG', 'ESP', 'FRA', 'GER', 'GHA', 'HAI', 'IRN',
      'IRQ', 'JOR', 'JPN', 'KOR', 'KSA', 'MAR', 'MEX', 'NED',
      'NOR', 'NZL', 'PAN', 'PAR', 'POR', 'QAT', 'RSA', 'SCO',
      'SEN', 'SUI', 'SWE', 'TUN', 'TUR', 'URU', 'USA', 'UZB'
    )
  );

alter table public.champion_picks enable row level security;

drop policy if exists "Users can read own champion pick" on public.champion_picks;
create policy "Users can read own champion pick"
  on public.champion_picks
  for select
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.select_champion_pick(team_code_value text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  normalized_team_code text := upper(trim(coalesce(team_code_value, '')));
  existing_team_code text;
begin
  if current_user_id is null then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  if normalized_team_code not in (
    'ALG', 'ARG', 'AUS', 'AUT', 'BEL', 'BIH', 'BRA', 'CAN',
    'CIV', 'COD', 'COL', 'CPV', 'CRO', 'CUW', 'CZE', 'ECU',
    'EGY', 'ENG', 'ESP', 'FRA', 'GER', 'GHA', 'HAI', 'IRN',
    'IRQ', 'JOR', 'JPN', 'KOR', 'KSA', 'MAR', 'MEX', 'NED',
    'NOR', 'NZL', 'PAN', 'PAR', 'POR', 'QAT', 'RSA', 'SCO',
    'SEN', 'SUI', 'SWE', 'TUN', 'TUR', 'URU', 'USA', 'UZB'
  ) then
    raise exception 'invalid champion team' using errcode = '22023';
  end if;

  insert into public.champion_picks (user_id, team_code)
  values (current_user_id, normalized_team_code)
  on conflict (user_id) do nothing;

  select picks.team_code into existing_team_code
  from public.champion_picks picks
  where picks.user_id = current_user_id;

  if existing_team_code is distinct from normalized_team_code then
    raise exception 'champion pick already locked' using errcode = '22023';
  end if;

  return existing_team_code;
end;
$$;

revoke all on function public.select_champion_pick(text) from public;
grant execute on function public.select_champion_pick(text) to authenticated;

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
    ('00f003bb-b3e1-4e4f-a1a7-8d767e534604'::uuid, 'wc-admin-7kq4')
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

create or replace function public.can_manage_match_results()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(auth.role(), '') = 'service_role' or public.is_admin();
$$;

revoke all on function public.can_manage_match_results() from public;
grant execute on function public.can_manage_match_results() to authenticated, service_role;

create table if not exists public.prediction_markets (
  match_id text primary key,
  match_label text not null,
  match_kickoff_utc timestamptz not null,
  home_team text not null,
  away_team text not null,
  lambda_home numeric not null check (lambda_home > 0),
  lambda_away numeric not null check (lambda_away > 0),
  home_win_probability numeric not null check (home_win_probability > 0 and home_win_probability <= 1),
  draw_probability numeric not null check (draw_probability > 0 and draw_probability <= 1),
  away_win_probability numeric not null check (away_win_probability > 0 and away_win_probability <= 1),
  exact_scores jsonb not null default '[]'::jsonb check (jsonb_typeof(exact_scores) = 'array'),
  exact_other_probability numeric check (
    exact_other_probability is null or (exact_other_probability >= 0 and exact_other_probability <= 1)
  ),
  source text,
  snapshot_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists prediction_markets_kickoff_idx
  on public.prediction_markets (match_kickoff_utc);

alter table public.prediction_markets enable row level security;

drop policy if exists "Authenticated users can read prediction markets" on public.prediction_markets;
create policy "Authenticated users can read prediction markets"
  on public.prediction_markets
  for select
  to authenticated
  using (true);

drop trigger if exists prediction_markets_set_updated_at on public.prediction_markets;
create trigger prediction_markets_set_updated_at
  before update on public.prediction_markets
  for each row
  execute function public.set_updated_at();

create table if not exists public.point_accounts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  balance numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.point_accounts enable row level security;

drop policy if exists "Users can read own point account" on public.point_accounts;
create policy "Users can read own point account"
  on public.point_accounts
  for select
  to authenticated
  using (auth.uid() = user_id);

drop trigger if exists point_accounts_set_updated_at on public.point_accounts;
create trigger point_accounts_set_updated_at
  before update on public.point_accounts
  for each row
  execute function public.set_updated_at();

create table if not exists public.point_transactions (
  id bigint generated by default as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  prediction_id uuid references public.predictions(id) on delete set null,
  kind text not null check (
    kind in ('admin_adjustment', 'prediction_stake', 'prediction_refund', 'prediction_settlement', 'admin_refund')
  ),
  amount numeric not null check (amount <> 0),
  balance_after numeric not null,
  note text,
  metadata jsonb not null default '{}'::jsonb,
  actor_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists point_transactions_user_created_idx
  on public.point_transactions (user_id, created_at desc);

create index if not exists point_transactions_prediction_idx
  on public.point_transactions (prediction_id);

alter table public.point_transactions enable row level security;

drop policy if exists "Users can read own point transactions" on public.point_transactions;
create policy "Users can read own point transactions"
  on public.point_transactions
  for select
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.ensure_user_point_account()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.point_accounts (user_id, balance)
  values (new.id, 0)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists auth_user_create_point_account on auth.users;
create trigger auth_user_create_point_account
  after insert on auth.users
  for each row
  execute function public.ensure_user_point_account();

insert into public.point_accounts (user_id, balance)
select users.id, 0
from auth.users users
on conflict (user_id) do nothing;

create or replace function public.record_point_transaction(
  target_user_id uuid,
  target_prediction_id uuid,
  transaction_kind text,
  transaction_amount numeric,
  resulting_balance numeric,
  transaction_note text default null,
  transaction_metadata jsonb default '{}'::jsonb
)
returns void
language plpgsql
set search_path = public
as $$
begin
  insert into public.point_transactions (
    user_id,
    prediction_id,
    kind,
    amount,
    balance_after,
    note,
    metadata,
    actor_id
  )
  values (
    target_user_id,
    target_prediction_id,
    transaction_kind,
    transaction_amount,
    resulting_balance,
    nullif(trim(transaction_note), ''),
    coalesce(transaction_metadata, '{}'::jsonb),
    auth.uid()
  );
end;
$$;

revoke all on function public.record_point_transaction(uuid, uuid, text, numeric, numeric, text, jsonb) from public;

create or replace function public.get_user_achievement_ids(target_user_id uuid)
returns text[]
language sql
stable
security definer
set search_path = public
as $$
  with prediction_stats as (
    select
      count(*)::integer as total_predictions,
      count(*) filter (where predictions.settled_at is not null)::integer as settled_predictions,
      count(*) filter (where predictions.is_correct is true)::integer as correct_predictions,
      coalesce(bool_or(predictions.prediction_type = 'score' and predictions.is_correct is true), false) as has_exact_score_hit,
      coalesce(bool_or(predictions.prediction_type = 'combo' and predictions.is_correct is true), false) as has_combo_hit,
      coalesce(bool_or(
        predictions.prediction_type = 'outcome'
        and predictions.is_correct is true
        and predictions.model_probability <= 0.25
      ), false) as has_underdog_hit,
      coalesce(bool_or(predictions.prediction_type = 'outcome'), false) as has_outcome_prediction,
      coalesce(bool_or(predictions.prediction_type = 'score'), false) as has_score_prediction,
      coalesce(bool_or(predictions.prediction_type = 'combo'), false) as has_combo_prediction
    from public.predictions predictions
    where predictions.user_id = target_user_id
  ),
  multiplier_stats as (
    select coalesce(
      sum(1 / nullif(predictions.model_probability, 0)) filter (where predictions.is_correct is true),
      0
    ) as cumulative_return_multiplier
    from public.predictions predictions
    where predictions.user_id = target_user_id
  ),
  settled_sequence as (
    select
      predictions.is_correct,
      sum(case when predictions.is_correct is true then 0 else 1 end) over (
        order by predictions.match_kickoff_utc, predictions.created_at, predictions.id
      ) as miss_group
    from public.predictions predictions
    where predictions.user_id = target_user_id
      and predictions.settled_at is not null
  ),
  streak_stats as (
    select coalesce(max(streak_length), 0)::integer as longest_streak
    from (
      select count(*)::integer as streak_length
      from settled_sequence
      where is_correct is true
      group by miss_group
    ) streaks
  )
  select array_remove(array[
    case when stats.total_predictions >= 1 then 'first_prediction' end,
    case when stats.correct_predictions >= 3 then 'triple_hit' end,
    case when stats.correct_predictions >= 10 then 'ten_hits' end,
    case when stats.has_exact_score_hit then 'score_oracle' end,
    case when stats.has_combo_hit then 'combo_master' end,
    case when stats.has_underdog_hit then 'underdog_hunter' end,
    case when multipliers.cumulative_return_multiplier >= 20 then 'century_return' end,
    case when stats.settled_predictions >= 5
      and stats.correct_predictions::numeric / nullif(stats.settled_predictions, 0) >= 0.4
      then 'precision_player' end,
    case when stats.has_outcome_prediction and stats.has_score_prediction and stats.has_combo_prediction
      then 'all_rounder' end,
    case when streaks.longest_streak >= 3 then 'hot_streak' end
  ]::text[], null)
  from prediction_stats stats
  cross join multiplier_stats multipliers
  cross join streak_stats streaks;
$$;

revoke all on function public.get_user_achievement_ids(uuid) from public;

create or replace function public.get_my_prediction_profile()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  champion_team_code_value text;
  achievement_ids text[];
begin
  if current_user_id is null then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  select picks.team_code into champion_team_code_value
  from public.champion_picks picks
  where picks.user_id = current_user_id;

  achievement_ids := public.get_user_achievement_ids(current_user_id);

  return jsonb_build_object(
    'champion_team_code', champion_team_code_value,
    'achievements', to_jsonb(achievement_ids),
    'achievement_count', cardinality(achievement_ids)
  );
end;
$$;

revoke all on function public.get_my_prediction_profile() from public;
grant execute on function public.get_my_prediction_profile() to authenticated;

create or replace function public.poisson_probability(lambda_value numeric, goals integer)
returns numeric
language plpgsql
immutable
strict
as $$
declare
  result_value double precision;
  goal_index integer;
begin
  if lambda_value <= 0 or goals < 0 then
    return 0;
  end if;

  result_value := exp(-lambda_value::double precision);
  if goals > 0 then
    for goal_index in 1..goals loop
      result_value := result_value * lambda_value::double precision / goal_index;
    end loop;
  end if;
  return result_value::numeric;
end;
$$;

create or replace function public.resolve_prediction_probability(
  market public.prediction_markets,
  prediction_type_value text,
  outcome_value text,
  home_score_value integer,
  away_score_value integer
)
returns numeric
language plpgsql
stable
set search_path = public
as $$
declare
  listed_probability numeric;
  listed_model_mass numeric;
  model_probability numeric;
  unlisted_model_mass numeric;
begin
  if prediction_type_value = 'outcome' then
    return case outcome_value
      when 'home' then market.home_win_probability
      when 'draw' then market.draw_probability
      when 'away' then market.away_win_probability
      else null
    end;
  end if;

  if prediction_type_value <> 'score'
    or home_score_value is null
    or away_score_value is null
    or home_score_value < 0
    or away_score_value < 0
    or home_score_value > 20
    or away_score_value > 20 then
    return null;
  end if;

  select (score_item ->> 'probability')::numeric
  into listed_probability
  from jsonb_array_elements(coalesce(market.exact_scores, '[]'::jsonb)) score_item
  where (score_item ->> 'home')::integer = home_score_value
    and (score_item ->> 'away')::integer = away_score_value
  limit 1;

  if listed_probability is not null then
    return listed_probability;
  end if;

  model_probability :=
    public.poisson_probability(market.lambda_home, home_score_value) *
    public.poisson_probability(market.lambda_away, away_score_value);

  if market.exact_other_probability is null or jsonb_array_length(market.exact_scores) = 0 then
    return model_probability;
  end if;

  select coalesce(sum(
    public.poisson_probability(market.lambda_home, (score_item ->> 'home')::integer) *
    public.poisson_probability(market.lambda_away, (score_item ->> 'away')::integer)
  ), 0)
  into listed_model_mass
  from jsonb_array_elements(market.exact_scores) score_item;

  unlisted_model_mass := greatest(0.000001, 1 - listed_model_mass);
  return market.exact_other_probability * model_probability / unlisted_model_mass;
end;
$$;

revoke all on function public.resolve_prediction_probability(public.prediction_markets, text, text, integer, integer) from public;

create or replace function public.admin_upsert_prediction_markets(markets jsonb)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  upserted_count integer;
begin
  if not public.can_manage_match_results() then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  if markets is null or jsonb_typeof(markets) <> 'array' then
    raise exception 'markets must be a json array' using errcode = '22023';
  end if;

  with input as (
    select *
    from jsonb_to_recordset(markets) as item(
      match_id text,
      match_label text,
      match_kickoff_utc timestamptz,
      home_team text,
      away_team text,
      lambda_home numeric,
      lambda_away numeric,
      home_win_probability numeric,
      draw_probability numeric,
      away_win_probability numeric,
      exact_scores jsonb,
      exact_other_probability numeric,
      source text,
      snapshot_at timestamptz
    )
  ),
  valid as (
    select
      trim(match_id) as match_id,
      coalesce(nullif(trim(match_label), ''), trim(match_id)) as match_label,
      match_kickoff_utc,
      coalesce(nullif(trim(home_team), ''), 'Home') as home_team,
      coalesce(nullif(trim(away_team), ''), 'Away') as away_team,
      lambda_home,
      lambda_away,
      home_win_probability,
      draw_probability,
      away_win_probability,
      case
        when jsonb_typeof(exact_scores) = 'array' then exact_scores
        else '[]'::jsonb
      end as exact_scores,
      exact_other_probability,
      nullif(trim(source), '') as source,
      coalesce(snapshot_at, now()) as snapshot_at
    from input
    where nullif(trim(match_id), '') is not null
      and match_kickoff_utc is not null
      and lambda_home > 0
      and lambda_away > 0
      and home_win_probability > 0 and home_win_probability <= 1
      and draw_probability > 0 and draw_probability <= 1
      and away_win_probability > 0 and away_win_probability <= 1
      and home_win_probability + draw_probability + away_win_probability between 0.98 and 1.02
      and (exact_other_probability is null or exact_other_probability between 0 and 1)
  ),
  upserted as (
    insert into public.prediction_markets (
      match_id,
      match_label,
      match_kickoff_utc,
      home_team,
      away_team,
      lambda_home,
      lambda_away,
      home_win_probability,
      draw_probability,
      away_win_probability,
      exact_scores,
      exact_other_probability,
      source,
      snapshot_at
    )
    select
      valid.match_id,
      valid.match_label,
      valid.match_kickoff_utc,
      valid.home_team,
      valid.away_team,
      valid.lambda_home,
      valid.lambda_away,
      valid.home_win_probability,
      valid.draw_probability,
      valid.away_win_probability,
      valid.exact_scores,
      valid.exact_other_probability,
      valid.source,
      valid.snapshot_at
    from valid
    on conflict (match_id) do update
    set
      match_label = excluded.match_label,
      match_kickoff_utc = excluded.match_kickoff_utc,
      home_team = excluded.home_team,
      away_team = excluded.away_team,
      lambda_home = excluded.lambda_home,
      lambda_away = excluded.lambda_away,
      home_win_probability = excluded.home_win_probability,
      draw_probability = excluded.draw_probability,
      away_win_probability = excluded.away_win_probability,
      exact_scores = excluded.exact_scores,
      exact_other_probability = excluded.exact_other_probability,
      source = excluded.source,
      snapshot_at = excluded.snapshot_at,
      updated_at = now()
    returning 1
  )
  select count(*)::integer into upserted_count
  from upserted;

  return coalesce(upserted_count, 0);
end;
$$;

revoke all on function public.admin_upsert_prediction_markets(jsonb) from public;
grant execute on function public.admin_upsert_prediction_markets(jsonb) to authenticated, service_role;

create or replace function public.get_my_point_balance()
returns numeric
language plpgsql
security definer
set search_path = public
as $$
declare
  current_balance numeric;
begin
  if auth.uid() is null then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  insert into public.point_accounts (user_id, balance)
  values (auth.uid(), 0)
  on conflict (user_id) do nothing;

  select accounts.balance into current_balance
  from public.point_accounts accounts
  where accounts.user_id = auth.uid();

  return coalesce(current_balance, 0);
end;
$$;

revoke all on function public.get_my_point_balance() from public;
grant execute on function public.get_my_point_balance() to authenticated;

create or replace function public.submit_prediction(prediction_payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  market_row public.prediction_markets%rowtype;
  existing_prediction public.predictions%rowtype;
  saved_prediction public.predictions%rowtype;
  has_existing boolean := false;
  prediction_type_value text;
  outcome_value text;
  home_score_value integer;
  away_score_value integer;
  stake_value numeric;
  probability_value numeric;
  probability_label text;
  display_name_value text;
  current_balance numeric;
begin
  if current_user_id is null then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  if not exists (
    select 1 from public.champion_picks picks where picks.user_id = current_user_id
  ) then
    raise exception 'champion pick required' using errcode = '22023';
  end if;

  if prediction_payload is null or jsonb_typeof(prediction_payload) <> 'object' then
    raise exception 'invalid prediction payload' using errcode = '22023';
  end if;

  prediction_type_value := trim(coalesce(prediction_payload ->> 'prediction_type', ''));
  outcome_value := nullif(trim(coalesce(prediction_payload ->> 'outcome', '')), '');
  home_score_value := nullif(prediction_payload ->> 'home_score', '')::integer;
  away_score_value := nullif(prediction_payload ->> 'away_score', '')::integer;
  stake_value := round((prediction_payload ->> 'stake_points')::numeric, 2);

  if stake_value is null or stake_value < 1 or stake_value > 1000000 then
    raise exception 'stake must be at least 1 point' using errcode = '22023';
  end if;

  select markets.* into market_row
  from public.prediction_markets markets
  where markets.match_id = trim(coalesce(prediction_payload ->> 'match_id', ''));

  if not found then
    raise exception 'prediction market unavailable' using errcode = '22023';
  end if;

  if market_row.match_kickoff_utc <= now()
    or exists (
      select 1 from public.match_results results
      where results.match_id = market_row.match_id
        and results.status = 'finished'
    ) then
    raise exception 'match already started' using errcode = '22023';
  end if;

  probability_value := public.resolve_prediction_probability(
    market_row,
    prediction_type_value,
    outcome_value,
    home_score_value,
    away_score_value
  );

  if probability_value is null or probability_value <= 0 or probability_value > 1 then
    raise exception 'invalid prediction choice' using errcode = '22023';
  end if;

  if prediction_type_value = 'outcome' then
    probability_label := case outcome_value
      when 'home' then market_row.home_team || ' 胜'
      when 'draw' then '平局'
      when 'away' then market_row.away_team || ' 胜'
    end;
    home_score_value := null;
    away_score_value := null;
  elsif prediction_type_value = 'score' then
    outcome_value := null;
    probability_label := home_score_value::text || '-' || away_score_value::text;
  else
    raise exception 'invalid prediction choice' using errcode = '22023';
  end if;

  select coalesce(
    nullif(profiles.username, ''),
    nullif(trim(prediction_payload ->> 'display_name'), ''),
    '用户 ' || left(current_user_id::text, 8)
  )
  into display_name_value
  from (select 1) seed
  left join public.user_profiles profiles on profiles.user_id = current_user_id;

  insert into public.point_accounts (user_id, balance)
  values (current_user_id, 0)
  on conflict (user_id) do nothing;

  select accounts.balance into current_balance
  from public.point_accounts accounts
  where accounts.user_id = current_user_id
  for update;

  select predictions.* into existing_prediction
  from public.predictions predictions
  where predictions.user_id = current_user_id
    and predictions.match_id = market_row.match_id
  for update;
  has_existing := found;

  if has_existing then
    if existing_prediction.settled_at is not null or existing_prediction.match_kickoff_utc <= now() then
      raise exception 'prediction can no longer be changed' using errcode = '22023';
    end if;

    if existing_prediction.stake_points is not null then
      current_balance := current_balance + existing_prediction.stake_points;
      update public.point_accounts
      set balance = current_balance
      where user_id = current_user_id;
      perform public.record_point_transaction(
        current_user_id,
        existing_prediction.id,
        'prediction_refund',
        existing_prediction.stake_points,
        current_balance,
        '更新预测时退回原投入',
        jsonb_build_object('match_id', market_row.match_id)
      );
    end if;
  end if;

  if current_balance < stake_value then
    raise exception 'insufficient points' using errcode = '22023';
  end if;

  if has_existing then
    update public.predictions
    set
      match_kickoff_utc = market_row.match_kickoff_utc,
      match_label = market_row.match_label,
      home_team = market_row.home_team,
      away_team = market_row.away_team,
      display_name = display_name_value,
      prediction_type = prediction_type_value,
      outcome = outcome_value,
      home_score = home_score_value,
      away_score = away_score_value,
      combo_legs = null,
      model_probability = probability_value,
      model_probability_label = probability_label,
      model_snapshot_at = market_row.snapshot_at,
      stake_points = stake_value,
      payout_points = 0,
      is_correct = null,
      settled_at = null,
      is_public = true,
      updated_at = now()
    where id = existing_prediction.id
    returning * into saved_prediction;
  else
    insert into public.predictions (
      user_id,
      match_id,
      match_kickoff_utc,
      match_label,
      home_team,
      away_team,
      display_name,
      prediction_type,
      outcome,
      home_score,
      away_score,
      model_probability,
      model_probability_label,
      model_snapshot_at,
      stake_points,
      payout_points,
      is_public
    )
    values (
      current_user_id,
      market_row.match_id,
      market_row.match_kickoff_utc,
      market_row.match_label,
      market_row.home_team,
      market_row.away_team,
      display_name_value,
      prediction_type_value,
      outcome_value,
      home_score_value,
      away_score_value,
      probability_value,
      probability_label,
      market_row.snapshot_at,
      stake_value,
      0,
      true
    )
    returning * into saved_prediction;
  end if;

  current_balance := current_balance - stake_value;
  update public.point_accounts
  set balance = current_balance
  where user_id = current_user_id;

  perform public.record_point_transaction(
    current_user_id,
    saved_prediction.id,
    'prediction_stake',
    -stake_value,
    current_balance,
    '提交比赛预测',
    jsonb_build_object(
      'match_id', market_row.match_id,
      'probability', probability_value
    )
  );

  return jsonb_build_object(
    'balance', current_balance,
    'prediction', to_jsonb(saved_prediction)
  );
end;
$$;

revoke all on function public.submit_prediction(jsonb) from public;
grant execute on function public.submit_prediction(jsonb) to authenticated;

create or replace function public.submit_combo_prediction(combo_payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  market_row public.prediction_markets%rowtype;
  saved_prediction public.predictions%rowtype;
  legs_value jsonb;
  leg_input jsonb;
  canonical_legs jsonb := '[]'::jsonb;
  seen_match_ids text[] := array[]::text[];
  selection_labels text[] := array[]::text[];
  match_id_value text;
  outcome_value text;
  selection_label text;
  stake_value numeric;
  leg_probability numeric;
  combined_probability numeric := 1;
  current_balance numeric;
  earliest_kickoff timestamptz;
  latest_snapshot timestamptz;
  display_name_value text;
  leg_count integer;
begin
  if current_user_id is null then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  if not exists (
    select 1 from public.champion_picks picks where picks.user_id = current_user_id
  ) then
    raise exception 'champion pick required' using errcode = '22023';
  end if;

  if combo_payload is null or jsonb_typeof(combo_payload) <> 'object' then
    raise exception 'invalid combo payload' using errcode = '22023';
  end if;

  legs_value := combo_payload -> 'legs';
  if legs_value is null or jsonb_typeof(legs_value) <> 'array' then
    raise exception 'combo requires 2 to 8 matches' using errcode = '22023';
  end if;

  leg_count := jsonb_array_length(legs_value);
  if leg_count < 2 or leg_count > 8 then
    raise exception 'combo requires 2 to 8 matches' using errcode = '22023';
  end if;

  stake_value := round((combo_payload ->> 'stake_points')::numeric, 2);
  if stake_value is null or stake_value < 1 or stake_value > 1000000 then
    raise exception 'stake must be at least 1 point' using errcode = '22023';
  end if;

  for leg_input in
    select value from jsonb_array_elements(legs_value)
  loop
    match_id_value := trim(coalesce(leg_input ->> 'match_id', ''));
    outcome_value := trim(coalesce(leg_input ->> 'outcome', ''));

    if match_id_value = '' or outcome_value not in ('home', 'draw', 'away') then
      raise exception 'invalid combo choice' using errcode = '22023';
    end if;
    if match_id_value = any(seen_match_ids) then
      raise exception 'duplicate combo match' using errcode = '22023';
    end if;

    select markets.* into market_row
    from public.prediction_markets markets
    where markets.match_id = match_id_value;

    if not found then
      raise exception 'prediction market unavailable' using errcode = '22023';
    end if;
    if market_row.match_kickoff_utc <= now()
      or exists (
        select 1 from public.match_results results
        where results.match_id = market_row.match_id
          and results.status = 'finished'
      ) then
      raise exception 'combo match already started' using errcode = '22023';
    end if;

    leg_probability := public.resolve_prediction_probability(
      market_row,
      'outcome',
      outcome_value,
      null,
      null
    );
    if leg_probability is null or leg_probability <= 0 or leg_probability > 1 then
      raise exception 'invalid combo choice' using errcode = '22023';
    end if;

    selection_label := case outcome_value
      when 'home' then market_row.home_team || ' 胜'
      when 'draw' then '平局'
      when 'away' then market_row.away_team || ' 胜'
    end;
    combined_probability := combined_probability * leg_probability;
    seen_match_ids := array_append(seen_match_ids, match_id_value);
    selection_labels := array_append(selection_labels, selection_label);
    earliest_kickoff := case
      when earliest_kickoff is null then market_row.match_kickoff_utc
      else least(earliest_kickoff, market_row.match_kickoff_utc)
    end;
    latest_snapshot := case
      when latest_snapshot is null then market_row.snapshot_at
      else greatest(latest_snapshot, market_row.snapshot_at)
    end;
    canonical_legs := canonical_legs || jsonb_build_array(jsonb_build_object(
      'match_id', market_row.match_id,
      'match_label', market_row.match_label,
      'kickoff_utc', market_row.match_kickoff_utc,
      'home_team', market_row.home_team,
      'away_team', market_row.away_team,
      'outcome', outcome_value,
      'selection_label', selection_label,
      'probability', leg_probability
    ));
  end loop;

  if combined_probability <= 0 or combined_probability > 1 then
    raise exception 'invalid combo probability' using errcode = '22023';
  end if;

  select coalesce(
    nullif(profiles.username, ''),
    nullif(trim(combo_payload ->> 'display_name'), ''),
    '用户 ' || left(current_user_id::text, 8)
  )
  into display_name_value
  from (select 1) seed
  left join public.user_profiles profiles on profiles.user_id = current_user_id;

  insert into public.point_accounts (user_id, balance)
  values (current_user_id, 0)
  on conflict (user_id) do nothing;

  select accounts.balance into current_balance
  from public.point_accounts accounts
  where accounts.user_id = current_user_id
  for update;

  if current_balance < stake_value then
    raise exception 'insufficient points' using errcode = '22023';
  end if;

  insert into public.predictions (
    user_id,
    match_id,
    match_kickoff_utc,
    match_label,
    home_team,
    away_team,
    display_name,
    prediction_type,
    outcome,
    home_score,
    away_score,
    combo_legs,
    model_probability,
    model_probability_label,
    model_snapshot_at,
    stake_points,
    payout_points,
    is_public
  )
  values (
    current_user_id,
    'combo-' || gen_random_uuid()::text,
    earliest_kickoff,
    leg_count::text || '场组合预测',
    '组合预测',
    '胜平负',
    display_name_value,
    'combo',
    null,
    null,
    null,
    canonical_legs,
    combined_probability,
    array_to_string(selection_labels, ' × '),
    coalesce(latest_snapshot, now()),
    stake_value,
    0,
    true
  )
  returning * into saved_prediction;

  current_balance := current_balance - stake_value;
  update public.point_accounts
  set balance = current_balance
  where user_id = current_user_id;

  perform public.record_point_transaction(
    current_user_id,
    saved_prediction.id,
    'prediction_stake',
    -stake_value,
    current_balance,
    '提交组合预测',
    jsonb_build_object(
      'match_id', saved_prediction.match_id,
      'leg_count', leg_count,
      'probability', combined_probability
    )
  );

  return jsonb_build_object(
    'balance', current_balance,
    'prediction', to_jsonb(saved_prediction)
  );
end;
$$;

revoke all on function public.submit_combo_prediction(jsonb) from public;
grant execute on function public.submit_combo_prediction(jsonb) to authenticated;

create or replace function public.reconcile_prediction_points()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  assessed record;
  locked_prediction public.predictions%rowtype;
  correct_value boolean;
  desired_payout numeric;
  payout_delta numeric;
  current_balance numeric;
  reconciled_count integer := 0;
begin
  if not public.can_manage_match_results() then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  for assessed in
    with single_assessed as (
      select
        predictions.id as prediction_id,
        case
          when predictions.prediction_type = 'score' then
            predictions.home_score = results.home_score
            and predictions.away_score = results.away_score
          when predictions.prediction_type = 'outcome' then
            predictions.outcome = case
              when results.home_score > results.away_score then 'home'
              when results.home_score < results.away_score then 'away'
              else 'draw'
            end
          else false
        end as correct_value,
        results.home_score::text || '-' || results.away_score::text as result_label,
        results.home_score as result_home_score,
        results.away_score as result_away_score
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
      ) results on true
      where predictions.prediction_type in ('outcome', 'score')
    ),
    combo_assessed as (
      select
        predictions.id as prediction_id,
        coalesce(bool_and(
          (legs.leg ->> 'outcome') = case
            when results.home_score > results.away_score then 'home'
            when results.home_score < results.away_score then 'away'
            else 'draw'
          end
        ), false) as correct_value,
        string_agg(
          results.home_score::text || '-' || results.away_score::text,
          ', ' order by legs.leg_order
        ) as result_label,
        null::integer as result_home_score,
        null::integer as result_away_score
      from public.predictions predictions
      cross join lateral jsonb_array_elements(predictions.combo_legs)
        with ordinality as legs(leg, leg_order)
      left join lateral (
        select match_results.*
        from public.match_results match_results
        where match_results.status = 'finished'
          and (
            match_results.match_id = legs.leg ->> 'match_id'
            or (
              nullif(legs.leg ->> 'kickoff_utc', '') is not null
              and match_results.match_kickoff_utc is not null
              and abs(extract(epoch from (
                match_results.match_kickoff_utc - (legs.leg ->> 'kickoff_utc')::timestamptz
              ))) <= 15 * 60
              and 1 = (
                select count(*)
                from public.match_results unique_result
                where unique_result.status = 'finished'
                  and unique_result.match_kickoff_utc is not null
                  and abs(extract(epoch from (
                    unique_result.match_kickoff_utc - (legs.leg ->> 'kickoff_utc')::timestamptz
                  ))) <= 15 * 60
              )
            )
          )
        order by
          case when match_results.match_id = legs.leg ->> 'match_id' then 0 else 1 end,
          abs(extract(epoch from (
            match_results.match_kickoff_utc - (legs.leg ->> 'kickoff_utc')::timestamptz
          ))) nulls last
        limit 1
      ) results on true
      where predictions.prediction_type = 'combo'
      group by predictions.id
      having count(*) between 2 and 8
        and count(results.match_id) = count(*)
    ),
    all_assessed as (
      select * from single_assessed
      union all
      select * from combo_assessed
    )
    select
      predictions.*,
      all_assessed.correct_value,
      all_assessed.result_label,
      all_assessed.result_home_score,
      all_assessed.result_away_score
    from public.predictions predictions
    join all_assessed on all_assessed.prediction_id = predictions.id
    where predictions.stake_points is not null
      and predictions.model_probability is not null
      and predictions.model_probability > 0
    order by predictions.user_id, predictions.id
  loop
    correct_value := assessed.correct_value;

    desired_payout := case
      when correct_value then round(assessed.stake_points / assessed.model_probability, 4)
      else 0
    end;

    if assessed.settled_at is null
      or assessed.is_correct is distinct from correct_value
      or coalesce(assessed.payout_points, 0) is distinct from desired_payout then
      insert into public.point_accounts (user_id, balance)
      values (assessed.user_id, 0)
      on conflict (user_id) do nothing;

      select accounts.balance into current_balance
      from public.point_accounts accounts
      where accounts.user_id = assessed.user_id
      for update;

      select predictions.* into locked_prediction
      from public.predictions predictions
      where predictions.id = assessed.id
      for update;

      if found then
        correct_value := case
          when locked_prediction.prediction_type = 'score' then
            locked_prediction.home_score = assessed.result_home_score
            and locked_prediction.away_score = assessed.result_away_score
          when locked_prediction.prediction_type = 'outcome' then
            locked_prediction.outcome = case
              when assessed.result_home_score > assessed.result_away_score then 'home'
              when assessed.result_home_score < assessed.result_away_score then 'away'
              else 'draw'
            end
          else assessed.correct_value
        end;

        desired_payout := case
          when correct_value then round(locked_prediction.stake_points / locked_prediction.model_probability, 4)
          else 0
        end;

        if locked_prediction.settled_at is null
          or locked_prediction.is_correct is distinct from correct_value
          or coalesce(locked_prediction.payout_points, 0) is distinct from desired_payout then
          payout_delta := desired_payout - coalesce(locked_prediction.payout_points, 0);
          if payout_delta <> 0 then
            current_balance := current_balance + payout_delta;
            update public.point_accounts
            set balance = current_balance
            where user_id = locked_prediction.user_id;

            perform public.record_point_transaction(
              locked_prediction.user_id,
              locked_prediction.id,
              'prediction_settlement',
              payout_delta,
              current_balance,
              case when correct_value then '预测命中返还' else '赛果更正结算调整' end,
              jsonb_build_object(
                'match_id', locked_prediction.match_id,
                'correct', correct_value,
                'payout', desired_payout,
                'result', assessed.result_label
              )
            );
          end if;

          update public.predictions
          set
            is_correct = correct_value,
            payout_points = desired_payout,
            settled_at = now(),
            updated_at = now()
          where id = locked_prediction.id;

          reconciled_count := reconciled_count + 1;
        end if;
      end if;
    end if;
  end loop;

  return reconciled_count;
end;
$$;

revoke all on function public.reconcile_prediction_points() from public;
grant execute on function public.reconcile_prediction_points() to authenticated, service_role;

create or replace function public.admin_adjust_user_points(
  target_user_id uuid,
  adjustment numeric,
  note text default null
)
returns numeric
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  adjustment_value numeric;
  current_balance numeric;
  next_balance numeric;
begin
  if not public.is_admin() then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  adjustment_value := round(adjustment, 2);
  if adjustment_value is null or adjustment_value = 0 or abs(adjustment_value) > 1000000 then
    raise exception 'invalid point adjustment' using errcode = '22023';
  end if;

  if not exists (select 1 from auth.users users where users.id = target_user_id) then
    raise exception 'user not found' using errcode = '22023';
  end if;

  insert into public.point_accounts (user_id, balance)
  values (target_user_id, 0)
  on conflict (user_id) do nothing;

  select accounts.balance into current_balance
  from public.point_accounts accounts
  where accounts.user_id = target_user_id
  for update;

  next_balance := current_balance + adjustment_value;
  if adjustment_value < 0 and next_balance < 0 then
    raise exception 'insufficient points' using errcode = '22023';
  end if;

  update public.point_accounts
  set balance = next_balance
  where user_id = target_user_id;

  perform public.record_point_transaction(
    target_user_id,
    null,
    'admin_adjustment',
    adjustment_value,
    next_balance,
    coalesce(nullif(trim(note), ''), '管理员分配点数'),
    '{}'::jsonb
  );

  return next_balance;
end;
$$;

revoke all on function public.admin_adjust_user_points(uuid, numeric, text) from public;
grant execute on function public.admin_adjust_user_points(uuid, numeric, text) to authenticated;

drop policy if exists "Admins can manage match results" on public.match_results;
create policy "Admins can manage match results"
  on public.match_results
  for all
  to authenticated
  using (public.can_manage_match_results())
  with check (public.can_manage_match_results());

create or replace function public.admin_upsert_match_results(results jsonb)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  upserted_count integer;
begin
  if not public.can_manage_match_results() then
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

  perform public.reconcile_prediction_points();

  return coalesce(upserted_count, 0);
end;
$$;

revoke all on function public.admin_upsert_match_results(jsonb) from public;
grant execute on function public.admin_upsert_match_results(jsonb) to authenticated, service_role;

drop function if exists public.get_public_leaderboard(integer);

create or replace function public.get_public_leaderboard(min_predictions integer default 0)
returns table (
  user_id uuid,
  display_name text,
  cumulative_return_points numeric,
  latest_return_at timestamptz,
  champion_team_code text,
  achievements jsonb,
  achievement_count integer
)
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if auth.uid() is null then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  return query
  with returned_points as (
    select
      transactions.user_id,
      sum(transactions.amount) as cumulative_return_points,
      max(transactions.created_at) as latest_return_at
    from public.point_transactions transactions
    where transactions.kind = 'prediction_settlement'
    group by transactions.user_id
    having sum(transactions.amount) > 0
  )
  select
    returned.user_id,
    coalesce(
      nullif(profiles.username, ''),
      nullif(users.raw_user_meta_data ->> 'display_name', ''),
      nullif(users.raw_user_meta_data ->> 'username', ''),
      '用户 ' || left(returned.user_id::text, 8)
    ) as display_name,
    returned.cumulative_return_points,
    returned.latest_return_at,
    champion.team_code as champion_team_code,
    to_jsonb(achievement.ids) as achievements,
    cardinality(achievement.ids) as achievement_count
  from returned_points returned
  join auth.users users on users.id = returned.user_id
  left join public.user_profiles profiles on profiles.user_id = returned.user_id
  left join public.champion_picks champion on champion.user_id = returned.user_id
  cross join lateral (
    select coalesce(public.get_user_achievement_ids(returned.user_id), array[]::text[]) as ids
  ) achievement
  where users.email like '%@users.worldcup-lookup.app'
  order by
    returned.cumulative_return_points desc,
    returned.latest_return_at asc,
    returned.user_id
  limit 50;
end;
$$;

revoke all on function public.get_public_leaderboard(integer) from public;
grant execute on function public.get_public_leaderboard(integer) to authenticated;

drop function if exists public.admin_list_users();

create or replace function public.admin_list_users()
returns table (
  user_id uuid,
  username text,
  auth_created_at timestamptz,
  last_sign_in_at timestamptz,
  point_balance numeric,
  pending_stake_points numeric,
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
    coalesce(accounts.balance, 0) as point_balance,
    coalesce(sum(predictions.stake_points) filter (
      where predictions.stake_points is not null
        and predictions.settled_at is null
    ), 0) as pending_stake_points,
    count(predictions.id) as prediction_count,
    count(predictions.id) filter (where predictions.is_public) as public_prediction_count,
    count(predictions.id) filter (where not predictions.is_public) as private_prediction_count,
    max(predictions.created_at) as latest_prediction_at
  from auth.users users
  left join public.user_profiles profiles on profiles.user_id = users.id
  left join public.point_accounts accounts on accounts.user_id = users.id
  left join public.predictions predictions on predictions.user_id = users.id
  where users.email like '%@users.worldcup-lookup.app'
  group by users.id, profiles.username, accounts.balance, users.raw_user_meta_data, users.created_at, users.last_sign_in_at
  order by coalesce(accounts.balance, 0) desc, count(predictions.id) desc, users.created_at desc;
end;
$$;

revoke all on function public.admin_list_users() from public;
grant execute on function public.admin_list_users() to authenticated;

drop function if exists public.admin_list_user_predictions(uuid);

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
  combo_legs jsonb,
  model_probability numeric,
  model_probability_label text,
  model_snapshot_at timestamptz,
  stake_points numeric,
  payout_points numeric,
  is_correct boolean,
  settled_at timestamptz,
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
    predictions.combo_legs,
    predictions.model_probability,
    predictions.model_probability_label,
    predictions.model_snapshot_at,
    predictions.stake_points,
    predictions.payout_points,
    predictions.is_correct,
    predictions.settled_at,
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
  deleted_award_count integer;
  refunded_points numeric;
  current_balance numeric;
begin
  if not public.is_admin() then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  select coalesce(sum(predictions.stake_points), 0)
  into refunded_points
  from public.predictions predictions
  where predictions.user_id = target_user_id
    and predictions.stake_points is not null
    and predictions.settled_at is null;

  if refunded_points > 0 then
    insert into public.point_accounts (user_id, balance)
    values (target_user_id, 0)
    on conflict (user_id) do nothing;

    select accounts.balance into current_balance
    from public.point_accounts accounts
    where accounts.user_id = target_user_id
    for update;

    current_balance := current_balance + refunded_points;
    update public.point_accounts
    set balance = current_balance
    where user_id = target_user_id;

    perform public.record_point_transaction(
      target_user_id,
      null,
      'admin_refund',
      refunded_points,
      current_balance,
      '清空预测时退回未结算投入',
      '{}'::jsonb
    );
  end if;

  delete from public.predictions predictions
  where predictions.user_id = target_user_id;

  get diagnostics deleted_count = row_count;

  delete from public.award_predictions award_predictions
  where award_predictions.user_id = target_user_id;

  get diagnostics deleted_award_count = row_count;
  return deleted_count + deleted_award_count;
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
