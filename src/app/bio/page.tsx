import { Metadata } from 'next';
import Bio from '@/components/Bio';

export const metadata: Metadata = {
  title: 'Bio',
  description: 'Meet Mazden Ibrahim aka KRISH-KENYA - DJ and Music Producer from Kilifi, Kenya. Journey from Shinyanga, Tanzania to East Africa\'s underground electronic scene.',
  openGraph: {
    title: 'Bio | KRISH-KENYA',
    description: 'Meet KRISH-KENYA - DJ and Music Producer from Kilifi, Kenya.',
    type: 'profile',
  },
  alternates: {
    canonical: '/bio',
  },
};

export default function BioPage() {
    return <Bio />;
}
