import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RemoveGrammarly from "@/components/RemoveGrammarly";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krishkenya.com';
const siteName = "KRISH-KENYA";
const siteDescription = "East Africa's Underground Electronic Pulse - DJ and Music Producer from Kilifi, Kenya. Explore latest tracks, events, and book performances.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Official Site`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "KRISH-KENYA",
    "DJ Kenya",
    "Electronic Music Kenya",
    "Amapiano",
    "Afro House",
    "Afro Tech",
    "Kilifi DJ",
    "East Africa DJ",
    "Kenyan Music Producer",
    "Sound Afrique",
    "Underground Electronic Music",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} | Official Site`,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/images/hero-bg.jpg`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Official Site`,
    description: siteDescription,
    images: [`${siteUrl}/images/hero-bg.jpg`],
    creator: "@official_krishkenya",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${anton.variable} bg-[#0a0a0a] text-gray-200 antialiased`}
        suppressHydrationWarning
      >
        <StructuredData />
        <RemoveGrammarly />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
