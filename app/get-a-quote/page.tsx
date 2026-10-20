import type { Metadata } from 'next';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Get a Quote | Fashion Knits',
  description:
    'Share your knitwear product, quantity, destination and manufacturing requirements with Fashion Knits in Tiruppur, India.',
};

export default async function GetAQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string | string[] }>;
}) {
  const { product } = await searchParams;

  return (
    <>
      <Contact initialProductInterest={Array.isArray(product) ? product[0] : product} />
      <Footer />
    </>
  );
}
