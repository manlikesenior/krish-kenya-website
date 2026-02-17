import { Metadata } from 'next';
import Bookings from '@/components/Bookings';

export const metadata: Metadata = {
  title: 'Book KRISH-KENYA',
  description: 'Book KRISH-KENYA for DJ performances, festivals, private events, and club nights. Contact for availability and pricing.',
  openGraph: {
    title: 'Book KRISH-KENYA',
    description: 'Book KRISH-KENYA for DJ performances, festivals, and events.',
    type: 'website',
  },
  alternates: {
    canonical: '/bookings',
  },
};

export default function BookingsPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#0a0a0a]">
      <Bookings />
    </div>
  );
}
