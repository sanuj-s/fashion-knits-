import type { Metadata } from 'next';
import { AboutClient } from './AboutClient';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'About Us | Fashion Knits Heritage & Production',
  description:
    'Learn about Fashion Knits: Tiruppur knitwear heritage, our Angeripalayam office and Netaji Apparel Park production facility, responsible workplace standards, and manufacturing milestones.',
  keywords: [
    'About Fashion Knits',
    'Tiruppur knitwear manufacturer',
    'knitwear production Tiruppur',
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
