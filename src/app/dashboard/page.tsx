import { createClient } from '@/lib/supabase/server';
import EventsManager from '@/components/admin/EventsManager';
import TracksManager from '@/components/admin/TracksManager';
import MixesManager from '@/components/admin/MixesManager';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/login');
    }

    const { data: events } = await supabase.from('events').select('*').order('date', { ascending: true });
    const { data: tracks } = await supabase.from('tracks').select('*').order('created_at', { ascending: false });
    const { data: mixes } = await supabase.from('mixes').select('*').order('created_at', { ascending: false });

    return (
        <div className="space-y-12">
            <header className="mb-8">
                <h1 className="text-4xl font-display text-white">Welcome, {user.email}</h1>
                <p className="text-gray-400 mt-2">Manage your website content here.</p>
            </header>

            <section>
                <h2 className="text-2xl font-display mb-6 text-[#D4AF37] border-b border-white/10 pb-4">Manage Events</h2>
                <EventsManager initialEvents={events || []} />
            </section>

            <section>
                <h2 className="text-2xl font-display mb-6 text-[#D4AF37] border-b border-white/10 pb-4">Manage Music</h2>
                <TracksManager initialTracks={tracks || []} />
            </section>

            <section>
                <h2 className="text-2xl font-display mb-6 text-[#D4AF37] border-b border-white/10 pb-4">Manage Mixes</h2>
                <MixesManager initialMixes={mixes || []} />
            </section>
        </div>
    );
}
