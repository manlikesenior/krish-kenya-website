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
    type: 'track' | 'mix'; // Type of music: track (single release) or mix (DJ set/compilation)
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string;
    published: boolean;
    created_at: string;
    updated_at: string;
}
