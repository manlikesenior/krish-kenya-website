-- ===========================================
-- SUPABASE STORAGE SETUP FOR KRISH-KENYA
-- ===========================================
-- Run this in Supabase SQL Editor:
-- https://app.supabase.com/project/bkmrnqqkpsnibmbtgljr/sql

-- 1. Create the 'images' bucket (if not exists)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'images',
    'images',
    true,
    52428800, -- 50MB limit
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 52428800,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

-- 2. Drop existing policies (to avoid conflicts)
DROP POLICY IF EXISTS "Public read images" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload images" ON storage.objects;
DROP POLICY IF EXISTS "Admin update images" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete images" ON storage.objects;

-- 3. Create RLS policies for the images bucket

-- Allow public read access to all images
CREATE POLICY "Public read images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Allow authenticated users to upload images
CREATE POLICY "Admin upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update images
CREATE POLICY "Admin update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete images
CREATE POLICY "Admin delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- ===========================================
-- FOLDER STRUCTURE (Created by uploading files)
-- ===========================================
-- Folders in Supabase Storage are virtual - they're created
-- automatically when you upload files with folder paths.
--
-- Required folders:
--   images/
--   ├── bio/           -> Press shots (bio-main.jpg)
--   ├── gallery/       -> Gallery images (bio-dj-booth.jpg, etc.)
--   ├── tracks/        -> Track cover art (uploaded via admin)
--   └── hero-bg.jpg    -> Hero background
--
-- To create folders, upload files with paths like:
--   - bio/bio-main.jpg
--   - gallery/bio-dj-booth.jpg
--   - tracks/my-track-cover.jpg
--   - hero-bg.jpg
-- ===========================================
