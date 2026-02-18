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

  // Fetch all Events from database
  const { data: eventsData } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false });

  // Fetch Tracks
  const { data: tracksData } = await supabase
    .from('tracks')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  // Fetch Gallery Images
  const { data: galleryData } = await supabase
    .from('gallery_images')
    .select('*')
    .order('sort_order', { ascending: true });

  // Map DB fields to Component Props
  const dbEvents = eventsData?.map((e: any) => {
    return {
      ...e,
      ticketLink: e.ticket_link,
    } as Event;
  }) || [];

  const allMusic = tracksData?.map((t: any) => {
    return {
      id: t.id,
      title: t.title,
      genre: t.genre || '',
      platform: t.platform || 'Spotify',
      link: t.link || '',
      coverImage: t.cover_image, // Full URL from storage
      type: t.type || 'track', // Default to 'track' if not set
    } as Track;
  }) || [];

  // Combine database events with initial past events (no duplicates by id)
  const dbEventIds = new Set(dbEvents.map(e => e.id));
  const uniqueInitialEvents = INITIAL_EVENTS.filter(e => !dbEventIds.has(e.id));
  const events = [...dbEvents, ...uniqueInitialEvents];

  const musicData = allMusic.length > 0 ? allMusic : INITIAL_TRACKS;
  
  // Separate tracks and mixes
  const tracks = musicData.filter(item => item.type === 'track');
  const mixes = musicData.filter(item => item.type === 'mix');

  // Map gallery images
  const galleryImages = galleryData?.map((img: any) => ({
    id: img.id,
    src: img.image_url,
    alt: img.title || 'Gallery image',
    caption: img.title || '',
  })) || [];

  return (
    <>
      <Hero />
      <div id="latest-music">
        <MusicSection tracks={tracks} mixes={mixes} />
      </div>
      <div id="tour-dates">
        <EventsSection events={events} />
      </div>
      <Gallery images={galleryImages} />
      <Bookings />
    </>
  );
}
