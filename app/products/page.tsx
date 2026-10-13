import type { Metadata } from 'next';
import { ProductsClient } from './ProductsClient';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Export Knitwear Product Catalogue | Fashion Knits Tiruppur',
  description:
    'Explore Fashion Knits commercial product catalogue: T-shirts, pique polos, heavyweight sweatshirts, hoodies, performance activewear, certified organic kidswear, and custom OEM garment development.',
  keywords: [
    'knitwear catalogue',
    'Tiruppur garment exporter',
    'custom polo manufacturer',
    'organic babywear supplier',
    'fleece hoodie OEM',
    'activewear manufacturer India',
  ],
};

export default function ProductsPage() {
  return (
    <>
      <ProductsClient />
      <Contact />
      <Footer />
    </>
  );
}
