'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Blocks, Printer, Scissors, Shirt, Users } from 'lucide-react';
import { COMPANY_LOCATIONS } from '@/src/data/company-content';
import { MaterialInnovation } from '@/components/sections/MaterialInnovation';
import { ManufacturingHero } from './ManufacturingHero';
import { EquipmentShowroom } from './EquipmentShowroom';

const PROCESS_AREAS = [
  {
    number: '01',
    title: 'Pattern & Cut',
    Icon: Scissors,
    intro: 'In-house CAD supports pattern making and cutting as the garment moves from buyer specification to production.',
    details: ['In-house CAD for pattern making', 'Lectra fully automatic cutting machine', 'Bullmer E80 fully automatic cutting machine'],
  },
  {
    number: '02',
    title: 'Print & Embroider',
    Icon: Printer,
    intro: 'Print and embroidery operations support artwork placement and garment decoration across the production program.',
    details: ['5 in-house automatic printing machines', '5 embroidery machines', 'Digital, screen-printing and embroidery equipment'],
  },
  {
    number: '03',
    title: 'Sew & Finish',
    Icon: Shirt,
    intro: 'Product-focused production lines and trained operators carry styles through sewing, checking, ironing and packing.',
    details: ['Dedicated production lines across plants', 'Operators trained for product categories', 'Final checking, ironing and packaging'],
  },
  {
    number: '04',
    title: 'Workforce & Facilities',
    Icon: Users,
    intro: 'Production sites in Tiruppur are supported by worker accommodation and services listed for the manufacturing facilities.',
    details: ['Hostel facility', 'Catering facility', 'Transport facility for workers'],
  },
];

const LOCATION_IMAGES: Record<string, { src: string; alt: string }> = {
  'Head Office & Unit 2': {
    src: '/assets/facilities/angeripalayam-hq-exterior-enhanced.webp',
    alt: 'Exterior of Fashion Knits Head Office and Unit 2 in Angeripalayam',
  },
  'Unit 1': {
    src: '/assets/facilities/netaji-factory-exterior-enhanced.webp',
    alt: 'Exterior of Fashion Knits Unit 1 at Netaji Apparel Park',
  },
};

export function ManufacturingClient() {
  const [activeArea, setActiveArea] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const active = PROCESS_AREAS[activeArea];
  const ActiveIcon = active.Icon;
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="bg-warm-white text-charcoal">
      {/* ── Cinematic Manufacturing Hero ── */}
      <ManufacturingHero />

      <section aria-labelledby="manufacturing-capabilities-title" className="border-b border-charcoal/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[90rem]">
          <div className="mb-8 grid gap-5 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#907348]">Manufacturing capabilities</p>
              <h2 id="manufacturing-capabilities-title" className="text-[clamp(2.3rem,5vw,4.7rem)] font-semibold leading-[0.94] tracking-[-0.06em]">Pattern, decoration, <span className="text-charcoal/40">construction and finish.</span></h2>
            </div>
            <p className="text-sm leading-6 text-charcoal/65 lg:col-span-5">Explore the equipment and processes that shape a Fashion Knits garment program.</p>
          </div>

          <div className="grid gap-3 lg:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.28fr)]">
            <div role="group" aria-label="Manufacturing process areas" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {PROCESS_AREAS.map((area, index) => (
                <button key={area.number} type="button" aria-pressed={activeArea === index} onClick={() => setActiveArea(index)} className={'flex min-h-[4.5rem] items-center gap-4 rounded-xl border px-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#907348] focus-visible:ring-offset-2 ' + (activeArea === index ? 'border-charcoal bg-charcoal text-white' : 'border-charcoal/10 bg-white text-charcoal hover:border-charcoal/25')}>
                  <span className={'font-mono text-[10px] ' + (activeArea === index ? 'text-[#d6bd8b]' : 'text-[#907348]')}>{area.number}</span>
                  <span className="flex-1 text-sm font-medium sm:text-base">{area.title}</span>
                  <ArrowRight aria-hidden="true" className={'h-4 w-4 ' + (activeArea === index ? 'text-[#d6bd8b]' : 'text-charcoal/35')} />
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.article key={active.number} initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={transition} aria-live="polite" className="relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-[1.1rem] bg-[#171614] p-6 text-white sm:p-8 lg:p-10">
                <span aria-hidden="true" className="absolute -right-5 -top-12 font-mono text-[12rem] leading-none tracking-[-0.1em] text-white/[0.035]">{active.number}</span>
                <div className="relative">
                  <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.17em] text-[#dfbd7d]"><ActiveIcon aria-hidden="true" className="h-4 w-4" /> Process {active.number}</p>
                  <h3 className="mt-5 text-[clamp(1.8rem,3vw,3rem)] font-medium leading-[0.98] tracking-[-0.055em]">{active.title}</h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">{active.intro}</p>
                </div>
                <ul className="relative mt-8 grid gap-2 border-t border-white/15 pt-5 sm:grid-cols-3">
                  {active.details.map((detail) => <li key={detail} className="flex items-start gap-2 text-xs leading-5 text-white/75"><span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d6bd8b]" />{detail}</li>)}
                </ul>
              </motion.article>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex flex-col gap-4 border-t border-charcoal/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-xs leading-5 text-charcoal/60"><Blocks aria-hidden="true" className="h-4 w-4 shrink-0 text-[#907348]" />Each production route is organized around the garment and buyer requirements.</p>
            <Link href="/quality" className="inline-flex min-h-10 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#856c42] hover:text-charcoal">Explore quality &amp; testing <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <EquipmentShowroom />

      <section aria-labelledby="facilities-title" className="border-b border-charcoal/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5"><p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#907348]">Workforce &amp; locations</p><h2 id="facilities-title" className="text-[clamp(2.3rem,4.8vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.065em]">Built around people and production.</h2><p className="mt-5 text-sm leading-7 text-charcoal/65">Skilled operators are trained for specific product categories. Worker facilities include hostel accommodation, catering and transport.</p></div>
          <div className="lg:col-span-7">
            <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#907348]">Fashion Knits locations</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {COMPANY_LOCATIONS.map((location) => {
                const visual = LOCATION_IMAGES[location.name];
                return (
                  <li key={location.name} className="overflow-hidden rounded-[0.9rem] border border-charcoal/10 bg-white">
                    {visual && (
                      <div className="relative aspect-[16/10] bg-[#e7e3dc]">
                        <Image src={visual.src} alt={visual.alt} fill sizes="(max-width: 639px) 100vw, 50vw" className="object-cover" />
                      </div>
                    )}
                    <div className="p-5">
                      <h4 className="text-base font-medium">{location.name}</h4>
                      <address className="mt-2 not-italic text-xs leading-5 text-charcoal/65">{location.address}</address>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="monthly-production-title" className="bg-[#1b1a18] px-5 py-14 text-white sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-6"><p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d1b373]">Sewing facilities</p><h2 id="monthly-production-title" className="text-[clamp(2.4rem,5vw,4.7rem)] font-semibold leading-[0.94] tracking-[-0.06em]">A production plan built for each product.</h2><p className="mt-5 text-sm leading-7 text-white/65">Dedicated, product-focused lines across the plants convert customer designs into garments in a range of sizes, shapes and colours. Each garment moves through final checking, ironing and packaging to match customer requirements.</p></div>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-6">
            <article className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6"><p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#d1b373]">Monthly capacity</p><p className="mt-3 text-4xl font-semibold leading-none tracking-[-0.06em]">~350,000</p><p className="mt-2 text-sm text-white/65">pieces per month · 2026 figure</p></article>
            <article className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6"><p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#d1b373]">Machine capacity</p><p className="mt-3 text-4xl font-semibold leading-none tracking-[-0.06em]">~2,000</p><p className="mt-2 text-sm text-white/65">machines · 2026 figure</p></article>
            <div className="sm:col-span-2"><Link href="/quality" className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#cfad70] px-5 text-[10px] font-bold uppercase tracking-[0.13em] text-[#201d17] transition-colors hover:bg-[#e1c58e]">See quality, testing &amp; compliance <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div>
          </div>
        </div>
      </section>

      <MaterialInnovation />
    </div>
  );
}
