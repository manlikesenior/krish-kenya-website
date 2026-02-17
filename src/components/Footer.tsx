import { SOCIAL_LINKS } from '@/lib/constants';
import SocialIcons from './SocialIcons';

/**
 * Footer Component
 * 
 * Displays site footer with social media links and copyright information.
 * Credits: Built with ❤️ by Noon Studio Africa (noonstudio.africa)
 */
const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-black py-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-8">
                {/* Social Media Icons */}
                <SocialIcons variant="circle-outline" size="md" />
                
                {/* Social Platform Text Links */}
                <div className="flex flex-wrap justify-center items-center gap-6">
                    <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-sm transition-colors">INSTAGRAM</a>
                    <a href={SOCIAL_LINKS.SPOTIFY} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-sm transition-colors">SPOTIFY</a>
                    <a href={SOCIAL_LINKS.YOUTUBE} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-sm transition-colors">YOUTUBE</a>
                    <a href={SOCIAL_LINKS.SOUNDCLOUD} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-sm transition-colors">SOUNDCLOUD</a>
                    <a href={SOCIAL_LINKS.BEATPORT} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-sm transition-colors">BEATPORT</a>
                </div>
                
                {/* Copyright Notice */}
                <div className="text-center space-y-2">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} KRISH-KENYA. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-xs">
                        Built with ❤️ by{' '}
                        <a 
                            href="https://noonstudio.africa" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#D4AF37] hover:text-[#f4cf57] transition-colors"
                        >
                            Noon Studio Africa
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
