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
  cover_image text not null, -- Should be the full path to the image in the Supabase storage bucket e.g. /images/tracks/track-name.jpg
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Security
alter table events enable row level security;
alter table tracks enable row level security;

-- Create Policies (Allow public read, admin write)
create policy "Public read events" on events for select using (true);
create policy "Admin all events" on events for all using (auth.role() = 'authenticated');
create policy "Public read tracks" on tracks for select using (true);
create policy "Admin all tracks" on tracks for all using (auth.role() = 'authenticated');

-- Storage for Images
insert into storage.buckets (id, name, public) values ('images', 'images', true)
on conflict (id) do nothing;
create policy "Public read images" on storage.objects for select using ( bucket_id = 'images' );
create policy "Admin upload images" on storage.objects for insert with check ( bucket_id = 'images' and auth.role() = 'authenticated' );

-- Received Emails Table
create table if not exists received_emails (
  id uuid default gen_random_uuid() primary key,
  from_email text not null,
  from_name text,
  subject text not null,
  text_content text not null,
  html_content text,
  email_id text not null unique,
  headers jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Email Attachments Table
create table if not exists email_attachments (
  id uuid default gen_random_uuid() primary key,
  email_id uuid not null references received_emails(id) on delete cascade,
  attachment_id text not null,
  filename text not null,
  content_type text not null,
  size integer not null,
  storage_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security for received_emails
alter table received_emails enable row level security;
alter table email_attachments enable row level security;

-- Policies for received_emails
create policy "Allow public read access on received_emails" 
on received_emails for select 
using (true);

create policy "Allow full access to authenticated users on received_emails" 
on received_emails for all 
using (auth.role() = 'authenticated');

-- Policies for email_attachments
create policy "Allow public read access on email_attachments" 
on email_attachments for select 
using (true);

create policy "Allow full access to authenticated users on email_attachments" 
on email_attachments for all 
using (auth.role() = 'authenticated');

-- Create index on email_id for faster lookups
create index if not exists idx_received_emails_email_id on received_emails(email_id);
create index if not exists idx_received_emails_from_email on received_emails(from_email);
create index if not exists idx_received_emails_created_at on received_emails(created_at desc);
create index if not exists idx_email_attachments_email_id on email_attachments(email_id);

-- Create Storage Bucket for Email Attachments if not exists
insert into storage.buckets (id, name, public) 
values ('email-attachments', 'email-attachments', false)
on conflict (id) do nothing;

create policy "Public Access for Email Attachments" 
on storage.objects for select 
using ( bucket_id = 'email-attachments' );

create policy "Authenticated Upload for Email Attachments" 
on storage.objects for insert 
with check ( bucket_id = 'email-attachments' and auth.role() = 'authenticated' );