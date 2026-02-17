/**
 * Bio Component
 * 
 * Artist biography section with photo gallery.
 * Fetches gallery images from Supabase and displays in a grid.
 * Includes lightbox modal for viewing full-size images.
 * 
 * @component
 */

'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { BIO_TEXT } from '@/lib/constants';
import { createClient } from '@/lib/supabase/client';
import SocialIcons from './SocialIcons';

/** Gallery image data structure */
interface GalleryImage {
    id: string;
    title: string;
    image_url: string;
}

const Bio = () => {
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const fetchGallery = async () => {
            const { data } = await supabase
                .from('gallery_images')
                .select('*')
                .order('sort_order', { ascending: true })
                .limit(6);
            
            if (data) setGalleryImages(data);
        };
        fetchGallery();
    }, [supabase]);

    return (
        <div className="pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">

                {/* Main Bio Image - DJ Smiling */}
                <div className="mb-12 relative group">
                    <Image
                        src="/images/bio/bio-main.jpg"
                        alt="Krish Kenya - DJ Portrait"
                        width={1200}
                        height={800}
                        className="w-full h-auto rounded-sm border border-white/10 shadow-2xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-700"
                        priority
                    />
                    <div className="absolute bottom-4 right-4 text-xs text-white/30 uppercase tracking-widest">
                        Press Shot 2025
                    </div>
                </div>

                {/* Bio Text */}
                <div className="mb-20">
                    <h2 className="font-display text-5xl md:text-6xl text-white mb-8 border-b border-[#D4AF37]/30 pb-4 inline-block">
                        ABOUT KRISH-KENYA
                    </h2>
                    <div className="prose prose-invert prose-lg text-gray-300 max-w-none">
                        {BIO_TEXT.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="mb-6 leading-relaxed font-light text-xl">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Social Links Section */}
                <div className="mb-20">
                    <h2 className="font-display text-5xl md:text-6xl text-white mb-8 border-b border-[#D4AF37]/30 pb-4 inline-block">
                        CONNECT
                    </h2>
                    <div className="bg-black py-12 rounded-sm">
                        <SocialIcons variant="circle-outline" size="lg" />
                    </div>
                </div>

                {/* Gallery Section */}
                <div className="mb-20">
                    <h2 className="font-display text-5xl md:text-6xl text-white mb-8 border-b border-[#D4AF37]/30 pb-4 inline-block">
                        GALLERY
                    </h2>
                    {galleryImages.length === 0 ? (
                        <p className="text-gray-500">No gallery images yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {galleryImages.map((image) => (
                                <div 
                                    key={image.id} 
                                    className="group relative bg-[#1a1a1a] overflow-hidden border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-300 cursor-pointer"
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <div className="aspect-square overflow-hidden relative">
                                        <Image
                                            src={image.image_url}
                                            alt={image.title || 'Gallery image'}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="p-4 border-t border-white/5">
                                        <p className="text-sm text-gray-400 uppercase tracking-wider">{image.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
                                src={selectedImage.image_url}
                                alt={selectedImage.title}
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                        {selectedImage.title && (
                            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg tracking-wider">
                                {selectedImage.title}
                            </p>
                        )}
                    </div>
                )}


            </div>
        </div>
    );
};

export default Bio;
