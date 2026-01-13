'use client';

import Image from 'next/image';
import { BIO_TEXT } from '@/lib/constants';


const Bio = () => {

    return (
        <div className="pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">

                {/* Main Bio Image */}
                <div className="mb-12 relative group">
                    <Image
                        src="/images/bio/bio-main.jpg"
                        alt="Krish Kenya Studio Portrait"
                        width={1200}
                        height={800}
                        className="w-full h-auto rounded-sm border border-white/10 shadow-2xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-700"
                        unoptimized
                    />
                    <div className="absolute bottom-4 right-4 text-xs text-white/30 uppercase tracking-widest">
                        Press Shot 2024
                    </div>
                </div>

                {/* Bio Text */}
                <div className="mb-20">
                    <h2 className="font-display text-5xl md:text-6xl text-white mb-8 border-b border-[#D4AF37]/30 pb-4 inline-block">
                        BIOGRAPHY
                    </h2>
                    <div className="prose prose-invert prose-lg text-gray-300 max-w-none">
                        {BIO_TEXT.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="mb-6 leading-relaxed font-light text-xl">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Gallery Section */}
                <div className="mb-20">
                    <h2 className="font-display text-5xl md:text-6xl text-white mb-8 border-b border-[#D4AF37]/30 pb-4 inline-block">
                        GALLERY
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {[
                            { src: "/images/gallery/bio-dj-booth.jpg", alt: "KRISH-KENYA at the DJ booth" },
                            { src: "/images/gallery/bio-green-hoodie.jpg", alt: "KRISH-KENYA in a green hoodie" },
                            { src: "/images/gallery/bio-outdoor.jpg", alt: "KRISH-KENYA outdoors" },
                            { src: "/images/gallery/bio-smile.jpg", alt: "KRISH-KENYA smiling" },
                        ].map((image, i) => (
                            <div 
                                key={i} 
                                className="group relative bg-[#1a1a1a] overflow-hidden border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-300"
                            >
                                <div className="aspect-square overflow-hidden relative">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-4 border-t border-white/5">
                                    <p className="text-sm text-gray-400 uppercase tracking-wider">{image.alt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Bio;
