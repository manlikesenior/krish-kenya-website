/**
 * Constants Configuration
 * 
 * Central location for all site-wide constants including:
 * - Artist information (name, tagline)
 * - Social media links
 * - Biography text
 * - Initial/fallback data for events and tracks
 * 
 * @module constants
 */

import { Event, Track } from './types';

/** Artist display name */
export const ARTIST_NAME = "KRISH-KENYA";

/** Artist tagline shown in hero section */
export const TAGLINE = "EAST AFRICA'S UNDERGROUND ELECTRONIC MUSIC DEEJAY";

/** Social media profile URLs */
export const SOCIAL_LINKS = {
    INSTAGRAM: 'https://www.instagram.com/official_krishkenya?igsh=MWZhcjdvejNyc2J2',
    SPOTIFY: 'https://open.spotify.com/artist/34pp43gQnruZW1oduhQlFv?si=J64b_ZndQ4uMSf3EkHsDLw',
    YOUTUBE: 'https://www.youtube.com/@krish-kenya',
    WHATSAPP: 'https://api.whatsapp.com/send/?phone=254794633685',
    SOUNDCLOUD: 'https://soundcloud.com/krishkenya',
    FACEBOOK: 'https://www.facebook.com/share/14W9xDEyeNk/',
    TWITTER: 'https://x.com/krishkenya1',
    APPLE_MUSIC: 'https://music.apple.com/us/artist/krish-kenya/1793782981',
    LINKEDIN: 'https://www.linkedin.com/in/krish-kenya',
    BEATPORT: 'https://www.beatport.com/artist/krish-kenya/1295831'
};

export const BIO_TEXT = `Mazden Ibrahim, popularly known by his stage name KRISH-KENYA, is a dynamic DJ and Producer known for his electrifying sound rooted in African rhythms. Born in Shinyanga, Mwanza, Tanzania, and raised in Kilifi, Kenya, KRISH-KENYA's musical journey reflects a rich blend of East African culture and modern electronic influence.

In 2017, he enrolled at a professional DJ Academy where he became a certified DJ, sharpening his technical skills and performance craft. Driven by his passion for music creation, he later advanced his artistry in 2024 by joining SEMA (Santuri East Africa) for Music Production classes, expanding his sound and creative direction.

In 2025, KRISH-KENYA released his debut track titled "FIK'IRI" under SOSHA Records, marking a major milestone in his production career and establishing his presence in the Afro-electronic music scene.

Over the years, KRISH-KENYA has performed at major festivals across Kenya, captivating audiences with his high-energy sets and deep, soulful selections. His sound blends Amapiano, 3 Step, Afro House, and Afro Tech, creating an immersive musical experience that connects dance floors to authentic African vibrations.

In 2025, he launched his own brand, SOUNDAFRIQUE, hosting curated music experiences at The Terrace Art Space, Kilifi. The brand represents his vision of celebrating African electronic music culture while creating platforms for connection, creativity, and community.

KRISH-KENYA continues to rise as one of East Africa's promising DJs and Producers, pushing boundaries and delivering powerful sonic journeys wherever he performs.`;

export const INITIAL_EVENTS: Event[] = [
    {
        id: '1',
        title: 'SOUNDAFRIQUE',
        date: '2025-12-20', // Placeholder date
        venue: 'The Terrace Art Space, Bandari, Mnarani', // Extracted from general knowledge of SoundAfrique Kilifi or placeholder
        city: 'Kilifi, Kenya',
        description: 'A dynamic music event celebrating African rhythms and global sounds. Showcasing eclectic DJs blending traditional beats with modern electronic elements. Founded by Krish-Kenya.',
        ticketLink: 'https://soundafrique.hustlesasa.shop/'
    },
    {
        id: '2',
        title: 'AM BEATS',
        date: '2025-12-13', // Placeholder date
        venue: 'Cafe Cassia', // Placeholder or inferred
        city: 'Nairobi, Kenya',
        description: 'Nairobi\'s Freshest Sober Party. Bringing sunshine, rhythm and a set guaranteed to keep you dancing all afternoon.',
        ticketLink: 'https://ambeats.hustlesasa.shop/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn7T7uk1bQpHOm2Tjzo-GEOSyeCiDY54onxaoJy9IeheMzMr1W-paxJj45ZfE_aem_TlaV4shPXXhgxOMmn0uyWA'
    }
];

export const INITIAL_TRACKS: Track[] = [
    {
        id: '4',
        title: 'Amapiano Mix 2025',
        genre: 'Amapiano',
        platform: 'YouTube',
        link: 'https://www.youtube.com/watch?v=3BWnsWWlfSs',
        coverImage: 'https://qlbpliuyqlguhwhmfyxq.supabase.co/storage/v1/object/public/images/tracks/amapiano-mix-2025.jpg'
    },
    {
        id: '5',
        title: 'Rave Cave Mix',
        genre: 'Amapiano',
        platform: 'YouTube',
        link: 'https://www.youtube.com/watch?v=-XYeFb12570',
        coverImage: 'https://qlbpliuyqlguhwhmfyxq.supabase.co/storage/v1/object/public/images/tracks/rave-cave-mix.png'
    },
    {
        id: '6',
        title: 'Keep Going',
        genre: 'Afro House',
        platform: 'Spotify',
        link: 'https://open.spotify.com/track/5NNGz4T3uj8dk0epvxyciI?si=977943aae2474082',
        coverImage: 'https://qlbpliuyqlguhwhmfyxq.supabase.co/storage/v1/object/public/images/tracks/keep-going.png'
    },
    {
        id: '7',
        title: 'Safina Beach Mix',
        genre: 'Afro House',
        platform: 'YouTube',
        link: 'https://www.youtube.com/watch?v=h-xZ9SP3CGw',
        coverImage: 'https://qlbpliuyqlguhwhmfyxq.supabase.co/storage/v1/object/public/images/tracks/safina-beach-mix.jpg'
    }
];


