import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function EventsPage() {
  return (
    <div className="bg-black text-white">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Events</h1>
        <div className="max-w-2xl mx-auto text-center">
          <p className="mb-4">
            Stay updated with upcoming events and performances by KRISH-KENYA.
          </p>
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-3xl font-semibold text-[#D4AF37] mb-4">SOUND AFRIQUE</h2>
            <p className="text-xl mb-4">Coming soon...</p>
            <p className="text-gray-400">
              Get ready for an unforgettable experience with SOUND AFRIQUE. More details will be announced shortly.
            </p>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
            <p className="text-gray-500">No other upcoming events currently scheduled. Please check back soon!</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
