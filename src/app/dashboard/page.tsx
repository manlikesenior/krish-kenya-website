import { createClient } from '@/lib/supabase/server';
import EventsManager from '@/components/admin/EventsManager';
import TracksManager from '@/components/admin/TracksManager';
import BlogsManager from '@/components/admin/BlogsManager';
import GalleryManager from '@/components/admin/GalleryManager';
import DownloadsManager from '@/components/admin/DownloadsManager';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/login');
    }

    // Fetch all content types
    const [eventsRes, tracksRes, blogsRes, galleryRes, downloadsRes] = await Promise.all([
        supabase.from('events').select('*').order('date', { ascending: true }),
        supabase.from('tracks').select('*').order('created_at', { ascending: false }),
        supabase.from('blogs').select('*').order('created_at', { ascending: false }),
        supabase.from('gallery_images').select('*').order('sort_order', { ascending: true }),
        supabase.from('downloads').select('*').order('created_at', { ascending: false })
    ]);

    return (
        <div className="space-y-12">
            <header className="mb-8">
                <h1 className="text-4xl font-display text-white">Welcome, {user.email}</h1>
                <p className="text-gray-400 mt-2">Manage your website content here.</p>
            </header>

            <section>
                <h2 className="text-2xl font-display mb-6 text-[#D4AF37] border-b border-white/10 pb-4">📅 Tours & Events</h2>
                <EventsManager initialEvents={eventsRes.data || []} />
            </section>

            <section>
                <h2 className="text-2xl font-display mb-6 text-[#D4AF37] border-b border-white/10 pb-4">🎵 Music & Tracks</h2>
                <TracksManager initialTracks={tracksRes.data || []} />
            </section>

            <section>
                <h2 className="text-2xl font-display mb-6 text-[#D4AF37] border-b border-white/10 pb-4">📝 Blog Posts</h2>
                <BlogsManager initialBlogs={blogsRes.data || []} />
            </section>

            <section>
                <h2 className="text-2xl font-display mb-6 text-[#D4AF37] border-b border-white/10 pb-4">🖼️ Gallery</h2>
                <GalleryManager initialImages={galleryRes.data || []} />
            </section>

            <section>
                <h2 className="text-2xl font-display mb-6 text-[#D4AF37] border-b border-white/10 pb-4">📥 Downloadable Assets</h2>
                <DownloadsManager initialAssets={downloadsRes.data || []} />
            </section>
        </div>
    );
}
