import Hero from '@/components/Hero';
import MusicSection from '@/components/MusicSection';
import EventsSection from '@/components/EventsSection';
import Gallery from '@/components/Gallery';
import Bookings from '@/components/Bookings';
import { createClient } from '@/lib/supabase/server';
import { INITIAL_TRACKS, INITIAL_EVENTS } from '@/lib/constants';
import { Event, Track } from '@/lib/types';

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
  const dbEvents = eventsData?.map((e: any) => {
    return {
      ...e,
      ticketLink: e.ticket_link,
    } as Event;
  }) || [];

  const dbTracks = tracksData?.map((t: any) => {
    return {
      ...t,
      coverImage: t.cover_image,
    } as Track;
  }) || [];

  // Use database data, fallback to initial data if database is empty
  // After running migrate_initial_data.sql, database will have all the data
  const events = dbEvents.length > 0 
    ? dbEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    : INITIAL_EVENTS.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const tracks = dbTracks.length > 0 ? dbTracks : INITIAL_TRACKS;

  return (
    <>
      <Hero />
      <div id="latest-music">
        <MusicSection tracks={tracks} />
      </div>
      <div id="tour-dates">
        <EventsSection events={events} />
      </div>
      <Gallery />
      <Bookings />
    </>
  );
}
