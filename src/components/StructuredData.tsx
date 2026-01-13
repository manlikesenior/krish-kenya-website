import { ARTIST_NAME, SOCIAL_LINKS } from '@/lib/constants';

export default function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krishkenya.com';
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": ARTIST_NAME,
    "jobTitle": "DJ and Music Producer",
    "url": siteUrl,
    "sameAs": [
      SOCIAL_LINKS.INSTAGRAM,
      SOCIAL_LINKS.SPOTIFY,
      SOCIAL_LINKS.YOUTUBE,
    ],
    "image": `${siteUrl}/images/hero-bg.jpg`,
    "description": "East Africa's Underground Electronic Pulse - DJ and Music Producer from Kilifi, Kenya",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kilifi",
      "addressCountry": "KE"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": ARTIST_NAME,
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

