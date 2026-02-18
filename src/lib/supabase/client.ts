import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

// Helper to get Supabase Storage public URL
export function getStorageUrl(path: string): string {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${supabaseUrl}/storage/v1/object/public/images/${cleanPath}`
}

// Storage paths for different image types
export const STORAGE_PATHS = {
    bio: 'bio',
    gallery: 'gallery',
    tracks: 'tracks',
} as const
