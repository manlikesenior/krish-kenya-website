-- Run this in your Supabase SQL Editor

create table if not exists events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  date timestamp with time zone not null,
  venue text not null,
  city text not null,
  description text,
  ticket_link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists tracks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  genre text not null,
  platform text not null,
  link text not null,
  cover_image text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table events enable row level security;
alter table tracks enable row level security;

-- Policies for Events
create policy "Allow public read access on events" 
on events for select 
using (true);

create policy "Allow full access to authenticated users on events" 
on events for all 
using (auth.role() = 'authenticated');

-- Policies for Tracks
create policy "Allow public read access on tracks" 
on tracks for select 
using (true);

create policy "Allow full access to authenticated users on tracks" 
on tracks for all 
using (auth.role() = 'authenticated');

create table if not exists mixes (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    platform text not null,
    link text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table mixes enable row level security;

create policy "Allow public read access on mixes"
on mixes for select
using (true);

create policy "Allow full access to authenticated users on mixes"
on mixes for all
using (auth.role() = 'authenticated');

-- Create Storage Bucket for Images if not exists
insert into storage.buckets (id, name, public) 
values ('images', 'images', true)
on conflict (id) do nothing;

create policy "Public Access" 
on storage.objects for select 
using ( bucket_id = 'images' );

create policy "Authenticated Upload" 
on storage.objects for insert 
with check ( bucket_id = 'images' and auth.role() = 'authenticated' );
