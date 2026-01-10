import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function MusicPage() {
  return (
    <div className="bg-black text-white">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Music</h1>
        <div className="max-w-2xl mx-auto text-center">
          <p className="mb-4">
            Explore the latest tracks and releases from KRISH-KENYA.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Placeholder for a music track */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">Track Title 1</h2>
              <p className="text-gray-400 mb-4">Genre | Release Date</p>
              <div className="aspect-w-16 aspect-h-9 bg-gray-800 flex items-center justify-center rounded-md mb-4">
                <p className="text-gray-500">Album Art / Player Placeholder</p>
              </div>
              <a href="#" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Listen Now</a>
            </div>
            {/* Placeholder for another music track */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">Track Title 2</h2>
              <p className="text-gray-400 mb-4">Genre | Release Date</p>
              <div className="aspect-w-16 aspect-h-9 bg-gray-800 flex items-center justify-center rounded-md mb-4">
                <p className="text-gray-500">Album Art / Player Placeholder</p>
              </div>
              <a href="#" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Listen Now</a>
            </div>
          </div>
          <p className="mt-8 text-gray-500">More tracks coming soon!</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
