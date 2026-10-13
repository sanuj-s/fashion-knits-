import type { Metadata } from 'next';
import { AboutClient } from './AboutClient';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'About Us | Fashion Knits Leadership & Manufacturing History',
  description:
    'Learn about Fashion Knits: company history, executive leadership, Tiruppur knitwear heritage across Angeripalayam Road and Netaji Apparel Park, ethical labor standards, and certified manufacturing milestones.',
  keywords: [
    'About Fashion Knits',
    'Tiruppur knitwear manufacturer',
    'garment factory leadership',
    'Netaji Apparel Park unit 1',
    'ethical apparel manufacturer India',
  ],
};

export default function AboutPage() {
  return (
    <>
      <AboutClient />
      <Contact />
      <Footer />
    </>
  );
}
