-- Migration: Add type column to tracks table
-- Run this in your Supabase SQL Editor

-- Add the type column with default value 'track'
ALTER TABLE tracks ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'track';

-- Add a check constraint to ensure only valid values
ALTER TABLE tracks ADD CONSTRAINT tracks_type_check CHECK (type IN ('track', 'mix'));

-- Update existing records based on title pattern (optional - adjust as needed)
-- This assumes mixes typically have "Mix" in their title
UPDATE tracks SET type = 'mix' WHERE LOWER(title) LIKE '%mix%';
UPDATE tracks SET type = 'track' WHERE type IS NULL OR (type != 'mix' AND LOWER(title) NOT LIKE '%mix%');

-- Create an index for faster filtering by type
CREATE INDEX IF NOT EXISTS idx_tracks_type ON tracks(type);
