import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

const NAVIGATION = [
  ['Products', '/products'],
  ['Manufacturing', '/manufacturing'],
  ['Quality', '/quality'],
  ['Export', '/export'],
  ['About', '/about'],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#121110] text-off-white">
      <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8 md:px-16 lg:px-24 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 font-bold tracking-[0.25em] text-sm uppercase">
              <span className="h-2 w-2 rotate-45 bg-accent" />
              <span>FASHION KNITS</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/60">
              Knitwear development and garment manufacturing for apparel buyers, based in Tiruppur, India.
            </p>
            <div className="mt-6 space-y-3 text-xs text-white/60">
              <p className="flex items-start gap-2.5"><MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> Angeripalayam, Tiruppur, Tamil Nadu, India</p>
              <p className="flex items-start gap-2.5"><MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> Netaji Apparel Park, New Tiruppur, India</p>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="lg:col-span-2">
            <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Explore</h2>
            <ul className="space-y-3 text-sm text-white/65">
              {NAVIGATION.map(([label, href]) => <li key={href}><Link href={href} className="transition-colors hover:text-white">{label}</Link></li>)}
            </ul>
          </nav>

          <div className="lg:col-span-5">
            <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Discuss a production brief</h2>
            <p className="max-w-md text-sm leading-6 text-white/60">Send a reference, tech pack or a short description of your knitwear requirements.</p>
            <Link href="/get-a-quote" className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-5 text-[10px] font-bold uppercase tracking-[0.13em] text-charcoal transition-colors hover:bg-[#e5c78e]">
              Get a quote <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <div className="mt-6 flex flex-col gap-3 text-xs text-white/65 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <a href="mailto:export@fashionknits.com" className="inline-flex items-center gap-2 hover:text-white"><Mail aria-hidden="true" className="h-3.5 w-3.5 text-accent" />export@fashionknits.com</a>
              <a href="tel:+914212370000" className="inline-flex items-center gap-2 hover:text-white"><Phone aria-hidden="true" className="h-3.5 w-3.5 text-accent" />+91 421 237 0000</a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[10px] text-white/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Fashion Knits · Tiruppur, India</p>
          <Link href="/#hero" className="inline-flex min-h-10 items-center gap-2 uppercase tracking-[0.12em] hover:text-white">Back to top <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
        </div>
      </div>
    </footer>
  );
}
