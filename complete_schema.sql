-- ============================================
-- KRISH-KENYA Complete Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- ==========================================
-- 1. BLOGS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Public can read published blogs
CREATE POLICY "Public can read published blogs" ON blogs
    FOR SELECT USING (published = true);

-- Authenticated users have full access
CREATE POLICY "Authenticated users can manage blogs" ON blogs
    FOR ALL USING (auth.role() = 'authenticated');

-- Create index for slug lookups
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);

-- ==========================================
-- 2. GALLERY IMAGES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    image_url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Public can read all gallery images
CREATE POLICY "Public can read gallery images" ON gallery_images
    FOR SELECT USING (true);

-- Authenticated users have full access
CREATE POLICY "Authenticated users can manage gallery images" ON gallery_images
    FOR ALL USING (auth.role() = 'authenticated');

-- Create index for sorting
CREATE INDEX IF NOT EXISTS idx_gallery_sort ON gallery_images(sort_order);

-- ==========================================
-- 3. DOWNLOADS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT DEFAULT 0,
    download_count INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

-- Public can read public downloads
CREATE POLICY "Public can read public downloads" ON downloads
    FOR SELECT USING (is_public = true);

-- Authenticated users have full access
CREATE POLICY "Authenticated users can manage downloads" ON downloads
    FOR ALL USING (auth.role() = 'authenticated');

-- ==========================================
-- 4. EVENTS TABLE (if not exists)
-- ==========================================
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    date DATE NOT NULL,
    venue TEXT NOT NULL,
    city TEXT NOT NULL,
    description TEXT,
    ticket_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Public can read all events
CREATE POLICY "Public can read events" ON events
    FOR SELECT USING (true);

-- Authenticated users have full access
CREATE POLICY "Authenticated users can manage events" ON events
    FOR ALL USING (auth.role() = 'authenticated');

-- ==========================================
-- 5. TRACKS TABLE (if not exists)
-- ==========================================
CREATE TABLE IF NOT EXISTS tracks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    genre TEXT,
    release_year INTEGER,
    cover_url TEXT,
    youtube_url TEXT,
    spotify_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;

-- Public can read all tracks
CREATE POLICY "Public can read tracks" ON tracks
    FOR SELECT USING (true);

-- Authenticated users have full access
CREATE POLICY "Authenticated users can manage tracks" ON tracks
    FOR ALL USING (auth.role() = 'authenticated');

-- ==========================================
-- 6. EMAIL SUBSCRIBERS TABLE (if not exists)
-- ==========================================
CREATE TABLE IF NOT EXISTS emails (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;

-- Authenticated users can manage emails
CREATE POLICY "Authenticated users can manage emails" ON emails
    FOR ALL USING (auth.role() = 'authenticated');

-- ==========================================
-- STORAGE BUCKET SETUP
-- ==========================================
-- Note: Run these in Supabase Dashboard > Storage or via API
-- The 'images' bucket should already exist

-- Create storage bucket (if using SQL)
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('images', 'images', true)
-- ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage policies for public read access
-- These allow anyone to read files, but only authenticated users can upload/delete

-- For the images bucket, go to Supabase Dashboard > Storage > Policies and add:
-- 1. SELECT policy: Allow public read (anon, authenticated)
-- 2. INSERT policy: Allow authenticated users to upload
-- 3. UPDATE policy: Allow authenticated users to update
-- 4. DELETE policy: Allow authenticated users to delete

-- ==========================================
-- STORAGE FOLDER STRUCTURE
-- ==========================================
-- The following folders should be used in the 'images' bucket:
-- - bio/          (artist bio images)
-- - gallery/      (gallery images)
-- - tracks/       (track cover images)
-- - blogs/        (blog cover images)
-- - downloads/    (downloadable files)

-- ==========================================
-- OPTIONAL: Function to increment download count
-- ==========================================
CREATE OR REPLACE FUNCTION increment_download_count(download_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE downloads
    SET download_count = download_count + 1
    WHERE id = download_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to public so it can be called via API
GRANT EXECUTE ON FUNCTION increment_download_count TO public;

-- ==========================================
-- OPTIONAL: Auto-update updated_at for blogs
-- ==========================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blogs_updated_at
    BEFORE UPDATE ON blogs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
