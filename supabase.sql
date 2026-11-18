-- Run once in Supabase > SQL Editor
create table public.links(
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  slug text unique not null check (slug ~ '^[a-z0-9-]{2,60}$' and slug not in ('app','go','api','config')),
  artist text not null, title text not null,
  kind text not null default 'Single', release_date date,
  art_url text, color text default '#5b3df5', pixel_id text,
  platforms jsonb not null default '{}',
  published boolean not null default true,
  created_at timestamptz default now());
alter table public.links enable row level security;
create policy "read live or own" on public.links for select using (published or user_id=auth.uid());
create policy "own insert" on public.links for insert to authenticated with check (user_id=auth.uid());
create policy "own update" on public.links for update to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "own delete" on public.links for delete to authenticated using (user_id=auth.uid());

create table public.events(
  id bigint generated always as identity primary key,
  link_id uuid not null references public.links on delete cascade,
  type text not null check (type in ('view','click')),
  platform text, country text, device text, referrer text,
  created_at timestamptz default now());
create index on public.events(link_id, created_at desc);
alter table public.events enable row level security;
create policy "anyone logs" on public.events for insert to anon, authenticated with check (true);
create policy "owner reads" on public.events for select to authenticated
  using (exists(select 1 from public.links l where l.id=link_id and l.user_id=auth.uid()));

insert into storage.buckets(id,name,public) values('art','art',true) on conflict do nothing;
create policy "art upload" on storage.objects for insert to authenticated
  with check (bucket_id='art' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "art read" on storage.objects for select using (bucket_id='art');
