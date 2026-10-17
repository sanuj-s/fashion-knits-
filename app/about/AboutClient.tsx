import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, Factory, MapPin } from 'lucide-react';

const LOCATIONS = [
  {
    title: 'Factory reference',
    name: 'Netaji Apparel Park · Unit 01',
    address: 'Shed 29, Netaji Apparel Park, New Tiruppur, India',
    image: '/assets/facilities/factory_netaji_park_exterior.webp',
    alt: 'Illustrative factory exterior concept based on a Fashion Knits reference photo',
    icon: Factory,
  },
  {
    title: 'Office reference',
    name: 'Angeripalayam',
    address: 'Angeripalayam, Tiruppur, Tamil Nadu, India',
    image: '/assets/facilities/office_angeripalayam_exterior.webp',
    alt: 'Illustrative office exterior concept based on a Fashion Knits reference photo',
    icon: Building2,
  },
];

export function AboutClient() {
  return (
    <div className="bg-warm-white text-charcoal">
      <section className="border-b border-white/10 bg-charcoal px-5 pb-16 pt-28 text-off-white sm:px-8 sm:pb-20 sm:pt-32 lg:px-16 lg:pb-24">
        <div className="mx-auto max-w-[90rem]">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-accent sm:text-xs"><Link href="/" className="hover:text-white">Home</Link><span aria-hidden="true" className="text-white/35">/</span><span aria-current="page" className="text-white/75">About</span></nav>
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Company profile · Tiruppur, India</p>
          <h1 className="max-w-5xl text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">Fashion Knits, <span className="text-white/45">for apparel buyers.</span></h1>
          <div className="mt-6 grid gap-5 md:grid-cols-12 md:items-end">
            <p className="max-w-3xl text-sm leading-7 text-white/70 sm:text-base md:col-span-8">Fashion Knits is a knitwear development and garment manufacturing business based in Tiruppur, India. It works with apparel buyers on product briefs, samples and order-specific production plans.</p>
            <Link href="/#contact" className="inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-accent px-5 text-[10px] font-bold uppercase tracking-[0.13em] text-charcoal transition-colors hover:bg-[#e5c78e] md:col-span-4 md:justify-self-end">Discuss your requirements <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[90rem]">
          <div className="mb-8 max-w-3xl"><p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#907348]">Locations</p><h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.06em]">The office and factory.</h2><p className="mt-4 text-sm leading-6 text-charcoal/65">For each buyer program, confirm the active site address, production scope and any specialist supplier involvement.</p></div>
          <div className="grid gap-5 lg:grid-cols-2">
            {LOCATIONS.map(({ title, name, address, image, alt, icon: Icon }) => (
              <article key={title} className="overflow-hidden rounded-[1rem] border border-charcoal/10 bg-white">
                <figure className="relative aspect-[1.55/1] overflow-hidden bg-[#e8e4dc]">
                  <Image src={image} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/65 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-white"><Icon aria-hidden="true" className="h-3.5 w-3.5 text-[#dfbd7d]" />{title}</span>
                </figure>
                <div className="p-5 sm:p-6"><h3 className="text-xl font-medium tracking-[-0.03em] sm:text-2xl">{name}</h3><p className="mt-2 flex items-start gap-2 text-sm leading-6 text-charcoal/60"><MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#907348]" />{address}</p></div>
              </article>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-[11px] leading-5 text-charcoal/55">Buyer checklist: verify the current site address, in-house operations, and external suppliers against the route for your product.</p>
        </div>
      </section>

      <section className="border-t border-charcoal/10 bg-[#f2efe9] px-5 py-12 sm:px-8 sm:py-16 lg:px-16">
        <div className="mx-auto flex max-w-[90rem] flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#907348]">Working together</p><h2 className="mt-2 text-2xl font-medium tracking-[-0.04em]">Bring a product brief or reference sample.</h2></div><Link href="/#contact" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-charcoal px-5 text-[10px] font-bold uppercase tracking-[0.13em] text-white transition-colors hover:bg-[#907348]">Start a conversation <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div>
      </section>
    </div>
  );
}
