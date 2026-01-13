import { Event, Track } from './types';

export const ARTIST_NAME = "KRISH-KENYA";
export const TAGLINE = "EAST AFRICA'S UNDERGROUND ELECTRONIC MUSIC DEEJAY";

export const SOCIAL_LINKS = {
    INSTAGRAM: 'https://www.instagram.com/official_krishkenya/',
    SPOTIFY: 'https://open.spotify.com/artist/34pp43gQnruZW1oduhQlFv?si=MgJ-zM2oRJWlABgwpyiudQ&nd=1&dlsi=f4236b45769c4b65',
    YOUTUBE: 'https://www.youtube.com/@krish-kenya',
    WHATSAPP: 'https://api.whatsapp.com/send/?phone=254794633685',
    SOUNDCLOUD: '#'
};

export const BIO_TEXT = `Mazden Ibrahim Safari, professionally known as KRISH-KENYA, is a Kenyan DJ and music producer. Born in Mbeya, Tanzania, and raised in Kilifi, Kenya, his passion for music was nurtured by the diverse sounds of the coast.

With over nine years of experience, KRISH-KENYA has established himself as a prominent figure in East Africa's underground electronic music scene. His unique sound blends Amapiano, 3step, Afro House, and Afro Tech.

His performances are characterized by an ability to read the crowd and craft dynamic dance floor journeys, commanding emotional depth and technical skill whether on a beach stage or a packed club in Nairobi.`;

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


