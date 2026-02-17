import { ARTIST_NAME, SOCIAL_LINKS, BIO_TEXT } from '@/lib/constants';

export default function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krishkenya.com';
  
  // Person/Artist schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    "name": ARTIST_NAME,
    "alternateName": "Mazden Ibrahim",
    "jobTitle": "DJ and Music Producer",
    "url": siteUrl,
    "sameAs": [
      SOCIAL_LINKS.INSTAGRAM,
      SOCIAL_LINKS.SPOTIFY,
      SOCIAL_LINKS.YOUTUBE,
      SOCIAL_LINKS.SOUNDCLOUD,
      SOCIAL_LINKS.FACEBOOK,
      SOCIAL_LINKS.TWITTER,
      SOCIAL_LINKS.APPLE_MUSIC,
      SOCIAL_LINKS.BEATPORT,
    ],
    "image": `${siteUrl}/images/bio/bio-main.jpg`,
    "description": BIO_TEXT.substring(0, 200) + "...",
    "knowsAbout": ["Amapiano", "Afro House", "Afro Tech", "Electronic Music", "DJing", "Music Production"],
    "birthPlace": {
      "@type": "Place",
      "name": "Shinyanga, Mwanza, Tanzania"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kilifi",
      "addressRegion": "Coast",
      "addressCountry": "KE"
    },
    "brand": {
      "@type": "Brand",
      "name": "SOUNDAFRIQUE",
      "description": "Curated music experiences celebrating African electronic music culture"
    }
  };

  // MusicGroup schema for artist discography
  const musicGroupSchema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "@id": `${siteUrl}/#musicgroup`,
    "name": ARTIST_NAME,
    "url": siteUrl,
    "genre": ["Amapiano", "Afro House", "Afro Tech", "Electronic"],
    "foundingLocation": {
      "@type": "Place",
      "name": "Kilifi, Kenya"
    },
    "member": {
      "@type": "Person",
      "@id": `${siteUrl}/#person`
    }
  };

  // WebSite schema with search action
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "name": ARTIST_NAME,
    "url": siteUrl,
    "description": "Official website of KRISH-KENYA - East Africa's Underground Electronic Pulse",
    "publisher": {
      "@id": `${siteUrl}/#person`
    },
    "inLanguage": "en"
  };

  // BreadcrumbList for navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Music",
        "item": `${siteUrl}/music`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Events",
        "item": `${siteUrl}/events`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Bio",
        "item": `${siteUrl}/bio`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Bookings",
        "item": `${siteUrl}/bookings`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroupSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}


