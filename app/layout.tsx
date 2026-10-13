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
  title: 'Fashion Knits | Export Knitwear & Garment Manufacturer · Tiruppur',
  description:
    'Premier knitwear and garment manufacturer in Tiruppur, India. Operating across our Angeripalayam Road corporate headquarters and Netaji Apparel Park manufacturing facility (Unit-1).',
  keywords: [
    'Fashion Knits',
    'garment manufacturing',
    'knitwear exporter Tiruppur',
    'circular knitting',
    'apparel OEM India',
    'Netaji Apparel Park',
    'GOTS certified knitwear',
    'sustainable textiles',
  ],
  authors: [{ name: 'Fashion Knits' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Fashion Knits | Export Knitwear & Garment Manufacturer · Tiruppur',
    description:
      'Knitwear and garment manufacturing for international apparel brands across two specialized facilities in Tiruppur, India.',
    url: 'https://fashionknits.com',
    siteName: 'Fashion Knits',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fashion Knits | Export Knitwear & Garment Manufacturer · Tiruppur',
    description:
      'Knitwear and garment manufacturing for international apparel brands across two specialized facilities in Tiruppur, India.',
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
