import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch all tracks
export async function GET(req: NextRequest) {
    try {
        const supabase = await createClient();
        const { searchParams } = new URL(req.url);
        
        // Optional query parameters
        const genre = searchParams.get('genre');
        const platform = searchParams.get('platform');
        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : null;

        let query = supabase
            .from('tracks')
            .select('*')
            .order('created_at', { ascending: false });

        // Filter by genre if provided
        if (genre) {
            query = query.eq('genre', genre);
        }

        // Filter by platform if provided
        if (platform) {
            query = query.eq('platform', platform);
        }

        // Apply limit if provided
        if (limit) {
            query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ tracks: data || [] }, { status: 200 });
    } catch (error) {
        console.error('Error fetching tracks:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST - Create a new track (requires authentication)
export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();
        
        // Check authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { title, genre, platform, link, cover_image } = body;

        // Validate required fields
        if (!title || !genre || !platform || !link || !cover_image) {
            return NextResponse.json(
                { error: 'Missing required fields: title, genre, platform, link, cover_image' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('tracks')
            .insert([
                {
                    title,
                    genre,
                    platform,
                    link,
                    cover_image,
                }
            ])
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ track: data }, { status: 201 });
    } catch (error) {
        console.error('Error creating track:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

