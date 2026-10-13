import type { Metadata } from 'next';
import { ManufacturingClient } from './ManufacturingClient';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Manufacturing & Capabilities | Fashion Knits Tiruppur Facilities',
  description:
    'Explore Fashion Knits manufacturing infrastructure across Netaji Apparel Park (Unit-1) and Angeripalayam Road. High-gauge circular knitting, CAD multi-ply cutting, modular sewing lines, and quality assurance.',
  keywords: [
    'garment manufacturing Tiruppur',
    'Netaji Apparel Park factory',
    'circular knitting factory India',
    'CAD cutting apparel',
    'knitwear sewing lines',
    'OEM textile factory',
  ],
};

export default function ManufacturingPage() {
  return (
    <>
      <ManufacturingClient />
      <Contact />
      <Footer />
    </>
  );
}
