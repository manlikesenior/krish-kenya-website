import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Image from "next/image";

const galleryImages = [
  { src: "/images/gallery/bio-dj-booth.jpg", alt: "KRISH-KENYA at the DJ booth" },
  { src: "/images/gallery/bio-green-hoodie.jpg", alt: "KRISH-KENYA in a green hoodie" },
  { src: "/images/gallery/bio-outdoor.jpg", alt: "KRISH-KENYA outdoors" },
  { src: "/images/gallery/bio-smile.jpg", alt: "KRISH-KENYA smiling" },
];

export default function GalleryPage() {
  return (
    <div className="bg-black text-white">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Gallery</h1>
        <div className="max-w-4xl mx-auto">
          <p className="mb-8 text-center">
            A collection of photos from KRISH-KENYA's events and performances.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, i) => (
              <div key={i} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="w-full h-48 relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-400">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-gray-500">More photos coming soon!</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
