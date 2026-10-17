import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/navigation/Navbar';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Fashion Knits | Export Knitwear & Garment Manufacturer · Tiruppur',
  description:
    'Knitwear manufacturing and export enquiries for apparel brands. Fashion Knits is based in Tiruppur, India.',
  keywords: [
    'Fashion Knits',
    'knitwear manufacturer Tiruppur',
    'apparel manufacturing India',
    'knitwear export enquiries',
    'custom knitwear for brands',
  ],
  authors: [{ name: 'Fashion Knits' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Fashion Knits | Export Knitwear & Garment Manufacturer · Tiruppur',
    description:
      'Knitwear manufacturing and export enquiries for apparel brands. Based in Tiruppur, India.',
    siteName: 'Fashion Knits',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fashion Knits | Export Knitwear & Garment Manufacturer · Tiruppur',
    description:
      'Knitwear manufacturing and export enquiries for apparel brands. Based in Tiruppur, India.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-off-white text-charcoal font-sans selection:bg-accent selection:text-charcoal antialiased overflow-x-hidden">
        <ScrollProgress />
        <Navbar />
        <main className="relative flex flex-col w-full">{children}</main>
      </body>
    </html>
  );
}
