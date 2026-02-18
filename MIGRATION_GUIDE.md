# Migration Guide: Initial Data to Database

## Overview
This guide will help you migrate the current music and events from the codebase into your Supabase database, ensuring all content is stored in the database and follows the current theme/design.

## Step 1: Update Email Addresses

✅ **COMPLETED** - All email addresses have been updated to `soundafrique@krishkenya.com`:
- Contact form submissions
- Email forwarding
- Webhook notifications
- Booking page display

## Step 2: Run Database Migration

1. **Open Supabase SQL Editor**
   - Go to your [Supabase Dashboard](https://app.supabase.com)
   - Select your project
   - Navigate to **SQL Editor** in the left sidebar

2. **Run the Migration Script**
   - Open the file `migrate_initial_data.sql`
   - Copy the entire contents
   - Paste into the Supabase SQL Editor
   - Click **Run** or press `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)

3. **Verify the Data**
   - Go to **Table Editor** in Supabase
   - Check the `events` table - you should see 2 events
   - Check the `tracks` table - you should see 4 tracks
   - **Note on `cover_image` path**: Ensure the `cover_image` column in the `tracks` table contains the full path to the image in the Supabase storage bucket (e.g., `/images/tracks/track-name.jpg`).

## Step 3: Verify Site Display

After running the migration:

1. **Refresh your website**
   - The homepage should display events and tracks from the database
   - The design and theme should remain consistent

2. **Check Admin Dashboard**
   - Log in at `/dashboard`
   - You should see the migrated events and tracks
   - You can add, edit, or delete items

## Step 4: Design Consistency

The admin components (`EventsManager` and `TracksManager`) already follow the site's design theme:

- **Color Scheme**: Dark background (`#0a0a0a`, `#1a1a1a`) with gold accents (`#D4AF37`)
- **Typography**: Bold, uppercase labels with proper tracking
- **UI Elements**: 
  - Gold buttons with hover effects
  - Dark input fields with white borders
  - Consistent spacing and layout
  - Smooth transitions and hover states

All new events and tracks added through the dashboard will automatically follow this design theme.

## Current Data Being Migrated

### Events (2 items)
1. **SOUNDAFRIQUE** - December 20, 2025
2. **AM BEATS** - December 13, 2025

### Tracks (4 items)
1. **Amapiano Mix 2025** - YouTube
2. **Rave Cave Mix** - YouTube
3. **Keep Going** - Spotify
4. **Safina Beach Mix** - YouTube

## Troubleshooting

### Data Not Showing
- Verify the migration script ran successfully
- Check that RLS policies allow public read access
- Ensure your `.env.local` has correct Supabase credentials

### Duplicate Entries
- The migration script uses `ON CONFLICT DO NOTHING` to prevent duplicates
- If you see duplicates, you may need to clean the database first

### Design Issues
- The admin components use the same color scheme and styling as the public site
- All new entries will automatically match the design theme
- If styling looks off, check browser cache and refresh

## Next Steps

After migration:
1. ✅ All email addresses updated to `soundafrique@krishkenya.com`
2. ✅ Initial events and tracks stored in database
3. ✅ Admin dashboard ready for content management
4. ✅ All new content will follow the current theme/design

You can now manage all events and tracks through the admin dashboard at `/dashboard`!


