import type { Metadata } from 'next';
import { ProductsClient } from './ProductsClient';
import { EnquiryCTA } from '@/components/sections/EnquiryCTA';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Knitwear Products for Apparel Brands | Fashion Knits',
  description:
    'Explore knitwear categories presented by Fashion Knits in Tiruppur, India. Discuss garment development and order requirements with the team.',
  keywords: [
    'knitwear catalogue',
    'Tiruppur garment exporter',
    'custom polo manufacturer',
    'kidswear knitwear development',
    'fleece hoodie OEM',
    'activewear manufacturer India',
  ],
};

export default function ProductsPage() {
  return (
    <>
      <ProductsClient />
      <EnquiryCTA context="products" />
      <Footer />
    </>
  );
}
