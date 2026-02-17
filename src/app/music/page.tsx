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
  const dbTracks = tracksData?.map((t: any) => {
    return {
      id: t.id,
      title: t.title,
      genre: t.genre || '',
      platform: t.platform || 'Spotify',
      link: t.link || '',
      coverImage: t.cover_image, // Already a full URL
    } as Track;
  }) || [];

  // Use database tracks, fallback to initial if empty
  const tracks = dbTracks.length > 0 ? dbTracks : INITIAL_TRACKS;

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h1 className="font-display text-5xl md:text-6xl text-white mb-4 border-l-4 border-[#D4AF37] pl-6">
          MUSIC
        </h1>
        <p className="text-gray-400 text-lg mb-12 pl-6 max-w-3xl">
          Explore the latest tracks and releases from KRISH-KENYA. Stream on your favorite platform.
        </p>
      </div>
      <MusicSection tracks={tracks} />
    </div>
  );
}
