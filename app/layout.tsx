import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/navigation/Navbar';
import { SmoothScroll } from '@/components/providers/SmoothScroll';

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Fashion Knits | Integrated Textile & Garment Manufacturing',
  description:
    'Integrated textile and garment manufacturing built for global brands. From yarn spinning, circular knitting, precision dyeing, and fabric finishing to export-grade apparel production.',
  keywords: [
    'Fashion Knits',
    'garment manufacturing',
    'textile exporter',
    'circular knitting',
    'fabric dyeing',
    'apparel OEM',
    'global export',
    'sustainable textiles',
  ],
  authors: [{ name: 'Fashion Knits' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Fashion Knits | From Yarn to Global',
    description:
      'Integrated textile and garment manufacturing ecosystem for international apparel brands.',
    url: 'https://fashionknits.com',
    siteName: 'Fashion Knits',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fashion Knits | From Yarn to Global',
    description:
      'Integrated textile and garment manufacturing ecosystem for international apparel brands.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-off-white text-charcoal font-sans selection:bg-accent selection:text-charcoal antialiased overflow-x-hidden">
        <SmoothScroll>
          <Navbar />
          <main className="relative flex flex-col w-full">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
