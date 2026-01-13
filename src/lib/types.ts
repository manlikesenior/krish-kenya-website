export interface Event {
    id: string;
    title: string;
    date: string;
    venue: string;
    city: string;
    description?: string;
    ticketLink?: string;
}

export interface Track {
    id: string;
    title: string;
    genre: string;
    platform: string;
    link: string;
    coverImage: string;
    audio_url?: string; // Direct audio file URL for playing on the site
}

