'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Instagram, Music, Youtube, MessageCircle } from 'lucide-react';
import { ARTIST_NAME, SOCIAL_LINKS } from '@/lib/constants';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { label: 'HOME', href: '/' },
        { label: 'MUSIC', href: '/music' },
        { label: 'EVENTS', href: '/events' },
        { label: 'BIO', href: '/bio' },
        { label: 'BOOKINGS', href: '/bookings' },
    ];

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        if (href.startsWith('/#')) return pathname === '/' && href !== '/'; // Consider section links active purely based on if we are home for simplicity
        return pathname.startsWith(href);
    };

    return (
        <nav className="fixed w-full z-50 top-0 left-0 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <h1 className="font-display text-2xl tracking-widest text-white hover:text-[#D4AF37] transition-colors duration-300">
                            {ARTIST_NAME}
                        </h1>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`px-3 py-2 text-sm tracking-widest transition-all duration-300 border-b-2 ${isActive(item.href)
                                        ? 'text-[#D4AF37] border-[#D4AF37]'
                                        : 'text-gray-300 border-transparent hover:text-white hover:border-gray-500'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href={SOCIAL_LINKS.SPOTIFY} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <Music size={20} />
                        </a>
                        <a href={SOCIAL_LINKS.YOUTUBE} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <Youtube size={20} />
                        </a>
                        <a href={SOCIAL_LINKS.WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <MessageCircle size={20} />
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-black border-t border-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`block w-full text-left px-3 py-4 text-base font-medium tracking-widest ${isActive(item.href) ? 'text-[#D4AF37]' : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        {/* Mobile Social Links */}
                        <div className="flex space-x-6 px-3 py-4 border-t border-gray-900 mt-2">
                            <a href={SOCIAL_LINKS.INSTAGRAM} className="text-gray-400 hover:text-white"><Instagram size={20} /></a>
                            <a href={SOCIAL_LINKS.SPOTIFY} className="text-gray-400 hover:text-white"><Music size={20} /></a>
                            <a href={SOCIAL_LINKS.YOUTUBE} className="text-gray-400 hover:text-white"><Youtube size={20} /></a>
                            <a href={SOCIAL_LINKS.WHATSAPP} className="text-gray-400 hover:text-white"><MessageCircle size={20} /></a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;
