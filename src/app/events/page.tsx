import { Metadata } from 'next';
import EventsSection from '@/components/EventsSection';
import InstagramEmbed from '@/components/InstagramEmbed';
import { createClient } from '@/lib/supabase/server';
import { INITIAL_EVENTS } from '@/lib/constants';
import { Event } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming performances and past events by KRISH-KENYA. Get tickets for SOUNDAFRIQUE, AM BEATS, and more live DJ sets across East Africa.',
  openGraph: {
    title: 'Events | KRISH-KENYA',
    description: 'Upcoming performances and past events by KRISH-KENYA. Live DJ sets across East Africa.',
    type: 'website',
  },
  alternates: {
    canonical: '/events',
  },
};

export default async function EventsPage() {
  const supabase = await createClient();

  // Fetch all Events from database
  const { data: eventsData } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false });

  // Map DB fields to Component Props
  const dbEvents = eventsData?.map((e: any) => {
    return {
      ...e,
      ticketLink: e.ticket_link,
    } as Event;
  }) || [];

  // Combine database events with initial past events (no duplicates by id)
  const dbEventIds = new Set(dbEvents.map(e => e.id));
  const uniqueInitialEvents = INITIAL_EVENTS.filter(e => !dbEventIds.has(e.id));
  const events = [...dbEvents, ...uniqueInitialEvents];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h1 className="font-display text-5xl md:text-6xl text-white mb-4 border-l-4 border-[#D4AF37] pl-6">
          EVENTS
        </h1>
        <p className="text-gray-400 text-lg mb-12 pl-6 max-w-3xl">
          Stay updated with upcoming events and performances by KRISH-KENYA. Get your tickets and join us for an unforgettable experience.
        </p>
      </div>
      <EventsSection events={events} />
      <InstagramEmbed 
        username="sound.afrique" 
        url="https://www.instagram.com/sound.afrique?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
      />
    </div>
  );
}
