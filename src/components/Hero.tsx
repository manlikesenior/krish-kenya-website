/**
 * Hero Component
 * 
 * Full-screen hero section displayed on the homepage.
 * Features a background image with gradient overlay and call-to-action.
 * 
 * @component
 * @example
 * <Hero />
 */

import Image from 'next/image';
import Link from 'next/link';
import { TAGLINE } from '@/lib/constants';

const Hero = () => {
    return (
        <div className="relative min-h-[110vh] w-full overflow-hidden flex items-center justify-center bg-black">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.jpg"
                    alt="Krish Kenya"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
            </div>
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

            {/* Content */}
            <div className="relative z-30 text-center px-4">
                <h1 className="font-display text-6xl md:text-9xl text-white tracking-widest mb-4 drop-shadow-2xl">
                    KRISH-KENYA
                </h1>
                <p className="font-sans text-[#D4AF37] text-lg md:text-2xl tracking-[0.3em] uppercase mb-12">
                    {TAGLINE}
                </p>
                <Link
                    href="/bookings"
                    className="inline-block border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold py-4 px-10 text-sm md:text-base tracking-widest transition-all duration-300 uppercase"
                >
                    Book Now
                </Link>
            </div>
        </div>
    );
};

export default Hero;
