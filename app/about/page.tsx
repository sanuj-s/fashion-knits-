import type { Metadata } from 'next';
import { AboutClient } from './AboutClient';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'About Fashion Knits | Knitwear Manufacturing in Tiruppur',
  description:
    "Fashion Knits has made knitted and woven garments in Tiruppur since 1990, serving apparel brands across men's, women's, children's and babywear categories.",
  keywords: [
    'About Fashion Knits',
    'Tiruppur knitwear manufacturer',
    'knitwear production Tiruppur',
    'Netaji Apparel Park unit 1',
    'apparel manufacturing Tiruppur',
  ],
};

export default function AboutPage() {
  return (
    <>
      <AboutClient />
      <Footer />
    </>
  );
}
