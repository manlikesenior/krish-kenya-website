import { createClient } from '@/lib/supabase/server';
import { BlogPost } from '@/lib/types';

function sortByNewest(posts: BlogPost[]) {
    return posts.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
}

export async function getPublishedBlogs() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Failed to fetch published blogs', error);
        return [];
    }

    return sortByNewest((data || []) as BlogPost[]);
}

export async function getPublishedBlogBySlug(slug: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

    if (error) {
        console.error(`Failed to fetch blog with slug "${slug}"`, error);
        return null;
    }

    return (data as BlogPost | null) || null;
}

export function formatBlogDate(date: string) {
    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(date));
}
