-- Migration script to insert initial events and tracks into the database
-- Run this in your Supabase SQL Editor after creating the tables

-- Insert Initial Events
INSERT INTO events (title, date, venue, city, description, ticket_link)
VALUES 
    (
        'SOUNDAFRIQUE',
        '2025-12-20T20:00:00Z',
        'The Terrace Art Space, Bandari, Mnarani',
        'Kilifi, Kenya',
        'A dynamic music event celebrating African rhythms and global sounds. Showcasing eclectic DJs blending traditional beats with modern electronic elements. Founded by Krish-Kenya.',
        'https://soundafrique.hustlesasa.shop/'
    ),
    (
        'AM BEATS',
        '2025-12-13T14:00:00Z',
        'Cafe Cassia',
        'Nairobi, Kenya',
        'Nairobi''s Freshest Sober Party. Bringing sunshine, rhythm and a set guaranteed to keep you dancing all afternoon.',
        'https://ambeats.hustlesasa.shop/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn7T7uk1bQpHOm2Tjzo-GEOSyeCiDY54onxaoJy9IeheMzMr1W-paxJj45ZfE_aem_TlaV4shPXXhgxOMmn0uyWA'
    )
ON CONFLICT DO NOTHING;

-- Insert Initial Tracks
INSERT INTO tracks (title, genre, platform, link, cover_image)
VALUES 
    (
        'Amapiano Mix 2025',
        'Amapiano',
        'YouTube',
        'https://www.youtube.com/watch?v=3BWnsWWlfSs',
        '/images/amapiano-mix-2025.jpg'
    ),
    (
        'Rave Cave Mix',
        'Amapiano',
        'YouTube',
        'https://www.youtube.com/watch?v=-XYeFb12570',
        '/images/rave-cave-mix.png'
    ),
    (
        'Keep Going',
        'Afro House',
        'Spotify',
        'https://open.spotify.com/track/5NNGz4T3uj8dk0epvxyciI?si=977943aae2474082',
        '/images/keep-going.png'
    ),
    (
        'Safina Beach Mix',
        'Afro House',
        'YouTube',
        'https://www.youtube.com/watch?v=h-xZ9SP3CGw',
        '/images/safina-beach-mix.jpg'
    )
ON CONFLICT DO NOTHING;

-- Note: The ON CONFLICT DO NOTHING prevents duplicate entries if you run this script multiple times
-- If you want to update existing records, you can modify the script to use ON CONFLICT ... DO UPDATE

