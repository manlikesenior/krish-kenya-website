/**
 * Gallery Component
 * 
 * Interactive image gallery carousel with lightbox modal.
 * Supports infinite scroll navigation and responsive grid display.
 * 
 * @component
 * @param {GalleryImage[]} images - Array of gallery images to display
 * @example
 * <Gallery images={galleryImages} />
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/** Image data structure for gallery items */
interface GalleryImage {
    id?: string;
    src: string;
    alt: string;
    caption: string;
}

interface GalleryProps {
    images?: GalleryImage[];
}

const Gallery = ({ images = [] }: GalleryProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const visibleCount = 6; // Number of images visible at once

    // If no images, show placeholder
    if (images.length === 0) {
        return (
            <div className="py-20 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-12 text-center tracking-widest">
                        GALLERY
                    </h2>
                    <p className="text-gray-500 text-center">No gallery images yet. Check back soon!</p>
                </div>
            </div>
        );
    }

    // Duplicate images for infinite scroll effect
    const extendedImages = [...images, ...images, ...images];

    const handlePrev = () => {
        setCurrentIndex((prev) => {
            if (prev <= 0) {
                return images.length * 2 - 1; // Loop to end
            }
            return prev - 1;
        });
    };

    const handleNext = () => {
        setCurrentIndex((prev) => {
            if (prev >= images.length * 2) {
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
                                key={`${image.id || image.src}-${currentIndex}-${i}`}
                                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 transition-transform duration-300 cursor-pointer"
                                onClick={() => setSelectedImage(image)}
                            >
                                <div className="relative aspect-[4/3] border border-white/10 overflow-hidden bg-[#1a1a1a] hover:border-[#D4AF37] transition-colors">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                        unoptimized
                                    />
                                </div>
                                {image.caption && (
                                    <p className="text-white text-sm mt-2 text-center uppercase tracking-wider">
                                        {image.caption}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white/70 hover:text-white text-4xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        ×
                    </button>
                    <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
                        <Image
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                    {selectedImage.caption && (
                        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg tracking-wider">
                            {selectedImage.caption}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Gallery;

