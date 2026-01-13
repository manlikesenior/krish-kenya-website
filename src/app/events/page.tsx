import EventsSection from '@/components/EventsSection';
import InstagramEmbed from '@/components/InstagramEmbed';
import { createClient } from '@/lib/supabase/server';
import { INITIAL_EVENTS } from '@/lib/constants';
import { Event } from '@/lib/types';

export default async function EventsPage() {
  const supabase = await createClient();

  // Fetch Events
  const { data: eventsData } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  // Map DB fields to Component Props
  const dbEvents = eventsData?.map((e: any) => {
    return {
      ...e,
      ticketLink: e.ticket_link,
    } as Event;
  }) || [];

  // Combine Static and Dynamic Data
  const events = [...dbEvents, ...INITIAL_EVENTS].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

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
