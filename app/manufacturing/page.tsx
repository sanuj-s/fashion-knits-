import type { Metadata } from 'next';
import { ManufacturingClient } from './ManufacturingClient';
import { EnquiryCTA } from '@/components/sections/EnquiryCTA';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Manufacturing & Production Planning | Fashion Knits',
  description:
    'Understand the buyer workflow, production scope and supplier involvement to confirm for knitwear orders with Fashion Knits in Tiruppur, India.',
  keywords: [
    'garment manufacturing Tiruppur',
    'Netaji Apparel Park factory',
    'knitwear manufacturing India',
    'OEM textile factory',
  ],
};

export default function ManufacturingPage() {
  return (
    <>
      <ManufacturingClient />
      <EnquiryCTA context="manufacturing" />
      <Footer />
    </>
  );
}
