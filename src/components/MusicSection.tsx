import Image from 'next/image';
import { Track } from '@/lib/types';
import { PlayCircle, ExternalLink } from 'lucide-react';

interface MusicSectionProps {
    tracks: Track[];
}

const MusicSection = ({ tracks }: MusicSectionProps) => {
    return (
        <div className="py-20 px-4 max-w-7xl mx-auto">
            <h2 className="font-display text-4xl text-white mb-12 border-l-4 border-[#D4AF37] pl-6">
                LATEST RELEASES
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tracks.map((track) => (
                    <div key={track.id} className="group relative bg-[#1a1a1a] overflow-hidden border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-300">
                        {/* Image */}
                        <div className="aspect-square overflow-hidden relative">
                            <Image
                                src={track.coverImage}
                                alt={track.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                <a href={track.link} className="p-3 bg-[#D4AF37] text-black rounded-full hover:bg-white transition-colors">
                                    <PlayCircle size={32} />
                                </a>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-6">
                            <p className="text-[#D4AF37] text-xs tracking-widest uppercase mb-2">{track.genre}</p>
                            <h3 className="text-white text-xl font-bold mb-4">{track.title}</h3>

                            <div className="flex justify-between items-center border-t border-white/10 pt-4">
                                <span className="text-gray-400 text-sm">{track.platform}</span>
                                <a href={track.link} className="text-white hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-sm">
                                    Stream <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MusicSection;
