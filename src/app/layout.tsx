import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RemoveGrammarly from "@/components/RemoveGrammarly";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KRISH-KENYA | Official Site",
  description: "East Africa's Underground Electronic Pulse - DJ and Music Producer from Kilifi, Kenya",
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
        <RemoveGrammarly />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
