import Hero from '@/components/Hero';
import MusicSection from '@/components/MusicSection';
import EventsSection from '@/components/EventsSection';
import Newsletter from '@/components/Newsletter';
import { INITIAL_TRACKS, INITIAL_EVENTS } from '@/lib/constants';

export default function Home() {
  return (
    <>
      <Hero />
      <div id="latest-music">
        <MusicSection tracks={INITIAL_TRACKS} />
      </div>
      <div id="tour-dates">
        <EventsSection events={INITIAL_EVENTS} />
      </div>
      <Newsletter />
    </>
  );
}
