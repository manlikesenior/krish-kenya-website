import { Metadata } from 'next';
import MusicSection from '@/components/MusicSection';
import { createClient } from '@/lib/supabase/server';
import { INITIAL_TRACKS } from '@/lib/constants';
import { Track } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Music',
  description: 'Stream KRISH-KENYA\'s latest Amapiano, Afro House, and Afro Tech tracks. Listen to mixes and releases on Spotify, YouTube, and more.',
  openGraph: {
    title: 'Music | KRISH-KENYA',
    description: 'Stream KRISH-KENYA\'s latest Amapiano, Afro House, and Afro Tech tracks.',
    type: 'music.playlist',
  },
  alternates: {
    canonical: '/music',
  },
};

export default async function MusicPage() {
  const supabase = await createClient();

  // Fetch Tracks from Supabase
  const { data: tracksData } = await supabase
    .from('tracks')
    .select('*')
    .order('created_at', { ascending: false });

  // Map DB fields to Component Props
  // cover_image is stored as full URL from TracksManager
  const allMusic = tracksData?.map((t: any) => {
    return {
      id: t.id,
      title: t.title,
      genre: t.genre || '',
      platform: t.platform || 'Spotify',
      link: t.link || '',
      coverImage: t.cover_image, // Already a full URL
      type: t.type || 'track', // Default to 'track' if not set
    } as Track;
  }) || [];

  // Use database tracks, fallback to initial if empty
  const musicData = allMusic.length > 0 ? allMusic : INITIAL_TRACKS;

  // Separate tracks and mixes
  const tracks = musicData.filter(item => item.type === 'track');
  const mixes = musicData.filter(item => item.type === 'mix');

  return (
    <div className="pt-24 sm:pt-32 pb-12 sm:pb-20 min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 mb-8 sm:mb-12">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-3 sm:mb-4 border-l-4 border-[#D4AF37] pl-4 sm:pl-6">
          MUSIC
        </h1>
        <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-12 pl-4 sm:pl-6 max-w-3xl">
          Explore the latest tracks, releases, and DJ mixes from KRISH-KENYA. Stream on your favorite platform.
        </p>
      </div>
      <MusicSection tracks={tracks} mixes={mixes} />
    </div>
  );
}
