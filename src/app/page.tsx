import Hero from '@/components/Hero';
import MusicSection from '@/components/MusicSection';
import EventsSection from '@/components/EventsSection';
import Newsletter from '@/components/Newsletter';
import { createClient } from '@/lib/supabase/server';
import { INITIAL_TRACKS, INITIAL_EVENTS } from '@/lib/constants';

export default async function Home() {
  const supabase = await createClient();

  // Fetch Events
  const { data: eventsData } = await supabase
    .from('events')
    .select('*')
    .gte('date', new Date().toISOString().split('T')[0]) // Simple date check
    .order('date', { ascending: true });

  // Fetch Tracks
  const { data: tracksData } = await supabase
    .from('tracks')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  // Map DB fields to Component Props
  const dbEvents = eventsData?.map((e: any) => ({
    ...e,
    ticketLink: e.ticket_link
  })) || [];

  const dbTracks = tracksData?.map((t: any) => ({
    ...t,
    coverImage: t.cover_image
  })) || [];

  // Combine Static and Dynamic Data
  // We prioritize DB items, but include static items effectively as 'legacy' or 'featured'
  // You might want to sort the combined array if order matters strictly by date
  const events = [...dbEvents, ...INITIAL_EVENTS].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const tracks = [...dbTracks, ...INITIAL_TRACKS];

  return (
    <>
      <Hero />
      <div id="latest-music">
        <MusicSection tracks={tracks} />
      </div>
      <div id="tour-dates">
        <EventsSection events={events} />
      </div>
      <Newsletter />
    </>
  );
}
