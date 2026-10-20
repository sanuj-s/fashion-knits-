import type { Metadata } from 'next';
import { AboutClient } from './AboutClient';
import { EnquiryCTA } from '@/components/sections/EnquiryCTA';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'About Fashion Knits | Knitwear Manufacturing in Tiruppur',
  description:
    'Learn about Fashion Knits, a knitwear development and garment manufacturing business based in Tiruppur, India, and see company-supplied facility photographs.',
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
      <EnquiryCTA context="about" />
      <Footer />
    </>
  );
}
