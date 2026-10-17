import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Building2, Factory, MapPin } from 'lucide-react';

const FACILITIES = [
  {
    label: 'Factory reference · Unit 01',
    title: 'Netaji Apparel Park',
    location: 'New Tiruppur, India',
    image: '/assets/facilities/factory_netaji_park_exterior.webp',
    alt: 'AI-generated illustrative exterior concept for the factory, based on a low-resolution photo supplied by Fashion Knits; not a photograph of the facility',
    imagePosition: 'object-center',
    icon: Factory,
  },
  {
    label: 'Office reference · Tiruppur',
    title: 'Angeripalayam',
    location: 'Tiruppur, India',
    image: '/assets/facilities/office_angeripalayam_exterior.webp',
    alt: 'AI-generated illustrative exterior concept for the office, based on a low-resolution photo supplied by Fashion Knits; not a photograph of the facility',
    imagePosition: 'object-center',
    icon: Building2,
  },
];

export function About() {
  return (
    <section id="about" className="border-b border-charcoal/10 bg-[#f6f4ef] px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28 xl:px-20">
      <div className="mx-auto max-w-[86rem]">
        <div className="grid items-end gap-7 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#907348] sm:text-xs">
              <span className="h-px w-9 bg-accent" />
              About Fashion Knits
            </p>
            <h2 className="max-w-4xl text-[clamp(2.8rem,6vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-charcoal">
              Knitwear made in <span className="text-charcoal/45">Tiruppur, India.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-1">
            <p className="max-w-xl text-sm leading-7 text-charcoal/70 sm:text-base">
              Fashion Knits works with apparel buyers on knitwear development and garment production. The locations below are presented as part of a buyer’s site and production-route review.
            </p>
            <Link href="/about" className="group mt-5 inline-flex items-center gap-2 border-b border-charcoal/25 pb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-charcoal transition-colors hover:border-[#907348] hover:text-[#907348] sm:text-xs">
              Company and facilities
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          {FACILITIES.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <article key={facility.label} className={`${index === 0 ? 'lg:col-span-7' : 'lg:col-span-5 lg:mt-14'} overflow-hidden rounded-[1rem] border border-charcoal/10 bg-white`}>
                <figure>
                  <div className={`relative aspect-[1.4/1] overflow-hidden bg-[#e8e4dc] ${index === 0 ? 'lg:aspect-[1.32/1]' : ''}`}>
                    <Image src={facility.image} alt={facility.alt} fill sizes={index === 0 ? '(max-width: 1024px) 100vw, 58vw' : '(max-width: 1024px) 100vw, 42vw'} className={`object-cover ${facility.imagePosition}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171612]/55 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#191815]/70 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm sm:left-5 sm:top-5 sm:text-[10px]">
                      <Icon aria-hidden="true" className="h-3.5 w-3.5 text-[#dfbd7d]" />
                      {facility.label}
                    </span>
                  </div>
                </figure>
                <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6">
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.03em] text-charcoal sm:text-2xl">{facility.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-charcoal/55"><MapPin aria-hidden="true" className="h-3.5 w-3.5" />{facility.location}</p>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-charcoal/40">0{index + 1} / 02</span>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-5 max-w-3xl text-[11px] leading-5 text-charcoal/55">
          Buyer checklist: confirm each site’s current address, which processes happen in-house, and where specialist suppliers are involved for your order.
        </p>
      </div>
    </section>
  );
}
