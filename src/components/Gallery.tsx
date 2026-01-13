'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
    { src: "/images/gallery/bio-dj-booth.jpg", alt: "KRISH-KENYA at the DJ booth", caption: "KRISH-KENYA" },
    { src: "/images/gallery/bio-green-hoodie.jpg", alt: "KRISH-KENYA in a green hoodie", caption: "KRISH-KENYA" },
    { src: "/images/gallery/bio-outdoor.jpg", alt: "KRISH-KENYA outdoors", caption: "KRISH-KENYA" },
    { src: "/images/gallery/bio-smile.jpg", alt: "KRISH-KENYA smiling", caption: "KRISH-KENYA" },
];

const Gallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCount = 6; // Number of images visible at once

    // Duplicate images for infinite scroll effect
    const extendedImages = [...galleryImages, ...galleryImages, ...galleryImages];

    const handlePrev = () => {
        setCurrentIndex((prev) => {
            if (prev <= 0) {
                return galleryImages.length * 2 - 1; // Loop to end
            }
            return prev - 1;
        });
    };

    const handleNext = () => {
        setCurrentIndex((prev) => {
            if (prev >= galleryImages.length * 2) {
                return 0; // Loop to start
            }
            return prev + 1;
        });
    };

    const displayImages = extendedImages.slice(currentIndex, currentIndex + visibleCount);

    return (
        <div className="py-20 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="font-display text-4xl md:text-5xl text-white mb-12 text-center tracking-widest">
                    GALLERY
                </h2>
                
                <div className="relative">
                    {/* Navigation Arrows - Always visible */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
                        aria-label="Previous images"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
                        aria-label="Next images"
                    >
                        <ChevronRight size={20} />
                    </button>

                    {/* Image Carousel */}
                    <div className="flex gap-4 overflow-hidden px-12">
                        {displayImages.map((image, i) => (
                            <div 
                                key={`${image.src}-${currentIndex}-${i}`}
                                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 transition-transform duration-300"
                            >
                                <div className="relative aspect-[4/3] border border-white/10 overflow-hidden bg-[#1a1a1a]">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <p className="text-white text-sm mt-2 text-center uppercase tracking-wider">
                                    {image.caption}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;

