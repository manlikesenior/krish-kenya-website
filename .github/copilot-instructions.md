# Copilot Instructions for KRISH-KENYA Codebase

This guide helps AI coding agents work productively in the KRISH-KENYA website project. It covers architecture, workflows, conventions, and integration points unique to this codebase.

## Architecture Overview
- **Framework:** Next.js (App Router, TypeScript)
- **Database & Storage:** Supabase (PostgreSQL, public storage bucket)
- **Styling:** Tailwind CSS, custom dark/gold theme
- **Deployment:** Vercel
- **Major Features:**
  - Music player, events calendar, gallery
  - Admin dashboard for managing events/tracks at `/dashboard`
  - Dynamic image URLs from Supabase Storage

## Key Directories & Files
- `src/app/` — Main app pages and API routes
- `src/components/` — UI components (including admin tools)
- `src/lib/supabase/` — Supabase client, server helpers, middleware
- `migrate_initial_data.sql` — Initial DB migration script
- `MIGRATION_GUIDE.md` — Step-by-step DB/data migration instructions
- `next.config.ts` — Next.js config, remote image patterns

## Developer Workflows
- **Start Dev Server:** `npm run dev` (Next.js)
- **DB Migration:** Run `migrate_initial_data.sql` in Supabase SQL Editor (see MIGRATION_GUIDE.md)
- **Content Management:** Use `/dashboard` (admin UI) to add/edit/delete events/tracks
- **Image Handling:** Store images in Supabase Storage; URLs generated via Supabase client
- **Image Optimization:** Next.js Image component with remotePatterns configured

## Project-Specific Conventions
- **Design Theme:** Dark backgrounds (`#0a0a0a`, `#1a1a1a`), gold accents (`#D4AF37`), bold uppercase typography
- **Admin UI:** Components (`EventsManager`, `TracksManager`) match public site styling
- **Data Flow:** Events/tracks loaded from Supabase DB; images from Supabase Storage
- **Email:** All notifications/forms use `soundafrique@krishkenya.com`
- **Migration:** Uses `ON CONFLICT DO NOTHING` to avoid duplicate DB entries

## Integration Points
- **Supabase:** Used for DB, storage, and authentication
- **Next.js API Routes:** Custom endpoints under `src/app/api/`
- **External Music Links:** Tracks reference YouTube/Spotify URLs

## Troubleshooting
- If data doesn't show, check DB migration, public folder RLS policies, and `.env.local` credentials
- For duplicate DB entries, clean DB before re-running migration
- For design issues, verify admin components match theme and refresh browser cache

## Example Patterns
- Dynamic image URL generation: see `src/lib/supabase/client.ts`
- Admin dashboard logic: see `src/components/admin/EventsManager.tsx`, `TracksManager.tsx`
- API route structure: see `src/app/api/events/route.ts`, `src/app/api/tracks/route.ts`

---
For more details, see `README.md` and `MIGRATION_GUIDE.md`. Update this file as project conventions evolve.