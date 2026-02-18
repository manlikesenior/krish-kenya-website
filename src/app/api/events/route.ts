import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch all events
export async function GET(req: NextRequest) {
    try {
        const supabase = await createClient();
        const { searchParams } = new URL(req.url);
        
        // Optional query parameters
        const upcoming = searchParams.get('upcoming') === 'true';
        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : null;

        let query = supabase
            .from('events')
            .select('*')
            .order('date', { ascending: true });

        // Filter for upcoming events only
        if (upcoming) {
            query = query.gte('date', new Date().toISOString());
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

        return NextResponse.json({ events: data || [] }, { status: 200 });
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST - Create a new event (requires authentication)
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
        const { title, date, venue, city, description, ticket_link } = body;

        // Validate required fields
        if (!title || !date || !venue || !city) {
            return NextResponse.json(
                { error: 'Missing required fields: title, date, venue, city' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('events')
            .insert([
                {
                    title,
                    date,
                    venue,
                    city,
                    description: description || null,
                    ticket_link: ticket_link || null,
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

        return NextResponse.json({ event: data }, { status: 201 });
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}


