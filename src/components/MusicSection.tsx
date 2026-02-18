/**
 * MusicSection Component
 * 
 * Displays music in two sections: Tracks (singles) and Mixes (DJ sets).
 * Each section has a responsive grid layout with hover overlays.
 * Mobile-first design with proper responsive breakpoints.
 * 
 * @component
 * @param {Track[]} tracks - Array of track objects (type: 'track')
 * @param {Track[]} mixes - Array of mix objects (type: 'mix')
 */

import Image from 'next/image';
import { Track } from '@/lib/types';
import { PlayCircle, ExternalLink, Music, Disc3 } from 'lucide-react';

interface MusicSectionProps {
    tracks: Track[];
    mixes: Track[];
}

const TrackCard = ({ track }: { track: Track }) => (
    <div className="group relative bg-[#1a1a1a] overflow-hidden border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-300">
        {/* Image */}
        <div className="aspect-square overflow-hidden relative">
            <Image
                src={track.coverImage}
                alt={track.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <a
                    href={track.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#D4AF37] text-black rounded-full hover:bg-white transition-colors"
                    aria-label={`Play ${track.title}`}
                >
                    <PlayCircle size={32} />
                </a>
            </div>
        </div>

        {/* Info */}
        <div className="p-4 sm:p-6">
            <p className="text-[#D4AF37] text-xs tracking-widest uppercase mb-1 sm:mb-2">{track.genre}</p>
            <h3 className="text-white text-base sm:text-xl font-bold mb-3 sm:mb-4 line-clamp-2">{track.title}</h3>

            <div className="flex justify-between items-center border-t border-white/10 pt-3 sm:pt-4">
                <span className="text-gray-400 text-xs sm:text-sm">{track.platform}</span>
                <a href={track.link} className="text-white hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-xs sm:text-sm">
                    Stream <ExternalLink size={12} />
                </a>
            </div>
        </div>
    </div>
);

const MusicSection = ({ tracks, mixes }: MusicSectionProps) => {

    return (
        <div className="py-12 sm:py-20 px-4 max-w-7xl mx-auto space-y-16 sm:space-y-24">
            {/* Tracks Section */}
            {tracks.length > 0 && (
                <section>
                    <div className="flex items-center gap-3 mb-8 sm:mb-12 border-l-4 border-[#D4AF37] pl-4 sm:pl-6">
                        <Music className="text-[#D4AF37] hidden sm:block" size={28} />
                        <div>
                            <h2 className="font-display text-2xl sm:text-4xl text-white">
                                TRACKS
                            </h2>
                            <p className="text-gray-400 text-sm sm:text-base mt-1">Original releases & singles</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {tracks.map((track) => (
                            <TrackCard key={track.id} track={track} />
                        ))}
                    </div>
                </section>
            )}

            {/* Mixes Section */}
            {mixes.length > 0 && (
                <section>
                    <div className="flex items-center gap-3 mb-8 sm:mb-12 border-l-4 border-[#D4AF37] pl-4 sm:pl-6">
                        <Disc3 className="text-[#D4AF37] hidden sm:block" size={28} />
                        <div>
                            <h2 className="font-display text-2xl sm:text-4xl text-white">
                                MIXES
                            </h2>
                            <p className="text-gray-400 text-sm sm:text-base mt-1">DJ sets & compilations</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {mixes.map((mix) => (
                            <TrackCard key={mix.id} track={mix} />
                        ))}
                    </div>
                </section>
            )}

            {/* Empty State */}
            {tracks.length === 0 && mixes.length === 0 && (
                <div className="text-center py-20">
                    <Music className="mx-auto text-gray-600 mb-4" size={48} />
                    <p className="text-gray-400 text-lg">No music available at the moment.</p>
                    <p className="text-gray-500 text-sm mt-2">Check back soon for new releases!</p>
                </div>
            )}
        </div>
    );
};

export default MusicSection;
