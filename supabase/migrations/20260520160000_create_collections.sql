create table if not exists public.collections (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  brand text not null,
  description text,
  image_url text,
  is_active boolean default false,
  created_at timestamptz default now()
);

alter table public.collections enable row level security;

create policy "Public can view active collections"
  on public.collections for select
  using (is_active = true);

create policy "Admin can do everything"
  on public.collections for all
  using (true)
  with check (true);
