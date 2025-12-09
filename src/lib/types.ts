export enum ViewState {
    HOME = 'HOME',
    MUSIC = 'MUSIC',
    EVENTS = 'EVENTS',
    BIO = 'BIO',
    ADMIN = 'ADMIN',
}

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
}

export interface Subscriber {
    id: string;
    email: string;
    date: string;
}

export interface PressAsset {
    id: string;
    title: string;
    type: string;
    size: string;
    thumbnail: string;
}
