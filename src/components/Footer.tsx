import Link from 'next/link';
import { SOCIAL_LINKS } from '@/lib/constants';

const Footer = () => {
    return (
        <footer className="bg-black py-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} KRISH-KENYA. All rights reserved.
                </p>
                <div className="flex flex-wrap justify-center items-center gap-6">
                    <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-sm">INSTAGRAM</a>
                    <a href={SOCIAL_LINKS.SPOTIFY} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-sm">SPOTIFY</a>
                    <a href={SOCIAL_LINKS.YOUTUBE} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-sm">YOUTUBE</a>
                    <a href={SOCIAL_LINKS.WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-sm">WHATSAPP</a>
                </div>
                <Link
                    href="/admin"
                    className="text-gray-800 hover:text-[#D4AF37] transition-colors p-2"
                    title="Admin Access"
                >
                    Admin
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
