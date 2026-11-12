'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Printer, Scissors, Shirt, Users } from 'lucide-react';

const CAPABILITY_STAGES = [
  {
    number: '01',
    label: 'Pattern & Cut',
    heading: 'In-house CAD. Automatic cutting.',
    description: 'CAD supports pattern making and cutting planning, alongside fully automatic Lectra and Bullmer E80 cutting machines.',
    Icon: Scissors,
    image: '/assets/manufacturing-equipment/lectra-automatic-cutting.webp',
    alt: 'Lectra automatic cutting machine',
    details: ['In-house CAD for patterns', 'Lectra automatic cutter', 'Bullmer E80 automatic cutter'],
  },
  {
    number: '02',
    label: 'Print & Embroider',
    heading: 'Decoration equipment in-house.',
    description: 'Five automatic printing machines and five embroidery machines support garment decoration and embellishment.',
    Icon: Printer,
    image: '/assets/manufacturing-equipment/kornit-storm-931-digital-printing.webp',
    alt: 'Kornit Storm 931 digital printing machine',
    details: ['Kornit Storm 931 digital printing', 'M&R and Sportsman printing equipment', 'Barudan and Tajima embroidery'],
  },
  {
    number: '03',
    label: 'Sew & Finish',
    heading: 'Product-focused lines through finish.',
    description: 'Dedicated lines and product-trained operators move garments through sewing, trimming, checking, ironing and packaging.',
    Icon: Shirt,
    image: '/assets/images/process-garment-finishing.webp',
    alt: 'Garment finishing work in a production setting',
    details: ['Sewing across production lines', 'Trimming and final checking', 'Ironing and packaging'],
  },
  {
    number: '04',
    label: 'Workforce & Facilities',
    heading: 'People and production, planned together.',
    description: 'Tiruppur manufacturing locations are supported by hostel, catering and transport facilities for workers.',
    Icon: Users,
    image: '/assets/facilities/netaji-factory-exterior-enhanced.webp',
    alt: 'Exterior of the Unit 1 site at Netaji Apparel Park',
    details: ['Skilled category-trained operators', 'Hostel accommodation', 'Catering and transport'],
  },
];

export function Capabilities() {
  const [activeStage, setActiveStage] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const active = CAPABILITY_STAGES[activeStage];
  const ActiveIcon = active.Icon;
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section id="capabilities" aria-labelledby="capabilities-heading" className="relative isolate overflow-hidden border-b border-charcoal/10 bg-[#f2efe9] px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 h-[30rem] w-[30rem] rounded-full bg-[#c9a96e]/10 blur-3xl" />
      <div className="relative mx-auto max-w-[100rem]">
        <div className="mb-9 grid gap-7 lg:mb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#907348] sm:text-xs"><span aria-hidden="true" className="h-px w-9 bg-accent" />Manufacturing capabilities</p>
            <h2 id="capabilities-heading" className="max-w-5xl text-[clamp(2.7rem,6vw,6rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-charcoal">From CAD patterns <span className="text-charcoal/40">to finished garments.</span></h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-charcoal/65 sm:text-base">Explore the equipment, processes and facilities behind Fashion Knits production.</p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end"><Link href="/manufacturing" className="group inline-flex min-h-11 items-center gap-2 border-b border-charcoal/25 pb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-charcoal transition-colors hover:border-[#907348] hover:text-[#907348] sm:text-xs">Explore manufacturing <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div>
        </div>

        <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
          <div role="group" aria-label="Manufacturing process" className="grid gap-2 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            {CAPABILITY_STAGES.map((stage, index) => {
              const selected = activeStage === index;
              return <button key={stage.number} type="button" aria-pressed={selected} onClick={() => setActiveStage(index)} className={'group flex min-h-[4.75rem] items-center gap-4 rounded-xl border px-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#907348] focus-visible:ring-offset-2 ' + (selected ? 'border-charcoal bg-charcoal text-white shadow-lg' : 'border-charcoal/10 bg-white/65 text-charcoal hover:border-charcoal/25 hover:bg-white')}>
                <span className={'font-mono text-[10px] tracking-[0.12em] ' + (selected ? 'text-[#d6bd8b]' : 'text-[#907348]')}>{stage.number}</span><span className="flex-1 text-sm font-medium tracking-[-0.02em] sm:text-base">{stage.label}</span><ArrowRight aria-hidden="true" className={'h-4 w-4 transition-transform duration-300 ' + (selected ? 'text-[#d6bd8b]' : '-translate-x-1 text-charcoal/30 group-hover:translate-x-0')} />
              </button>;
            })}
          </div>

          <div className="min-w-0 lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article key={active.number} initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={transition} aria-live="polite" className="grid min-h-[25rem] overflow-hidden rounded-[1.25rem] border border-charcoal/10 bg-white md:grid-cols-[minmax(0,1fr)_minmax(15rem,0.78fr)]">
                <div className="relative flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                  <span aria-hidden="true" className="absolute -right-8 -top-10 text-[12rem] font-semibold leading-none tracking-[-0.12em] text-charcoal/[0.035]">{active.number}</span>
                  <div className="relative max-w-3xl">
                    <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#907348]"><ActiveIcon aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />Process {active.number}</p>
                    <h3 className="mt-5 max-w-2xl text-[clamp(1.8rem,3.4vw,3.2rem)] font-medium leading-[0.98] tracking-[-0.06em] text-charcoal">{active.heading}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-charcoal/65 sm:text-base">{active.description}</p>
                  </div>
                  <ul className="relative mt-8 grid gap-2 border-t border-charcoal/10 pt-5">
                    {active.details.map((detail) => <li key={detail} className="flex items-center gap-2 text-xs font-medium leading-5 text-charcoal/70"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#b18b4a]" />{detail}</li>)}
                  </ul>
                </div>
                <div className="relative min-h-56 bg-[#e8e4dc] md:min-h-full">
                  {active.image ? <Image src={active.image} alt={active.alt || ''} fill sizes="(max-width: 767px) 100vw, 38vw" className="object-cover" /> : <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(145deg,#e7e2d8_0%,#d9d2c6_48%,#c8bdac_100%)]"><div className="absolute inset-x-[14%] top-[16%] h-px bg-white/75" /><div className="absolute inset-y-[16%] left-[50%] w-px bg-white/70" /><div className="absolute inset-x-[14%] bottom-[16%] h-px bg-white/60" /></div>}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <p className="rounded-xl border border-charcoal/10 bg-white/75 p-4"><span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#907348]">Machine capacity</span><strong className="mt-2 block text-xl font-semibold tracking-[-0.04em]">~2,000 machines</strong><span className="mt-1 block text-[10px] text-charcoal/55">2026 figure</span></p>
          <p className="rounded-xl border border-charcoal/10 bg-white/75 p-4"><span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#907348]">Monthly production capacity</span><strong className="mt-2 block text-xl font-semibold tracking-[-0.04em]">~350,000 pieces</strong><span className="mt-1 block text-[10px] text-charcoal/55">2026 figure</span></p>
          <p className="rounded-xl border border-charcoal/10 bg-white/75 p-4"><span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#907348]">In-house decoration machines</span><strong className="mt-2 block text-xl font-semibold tracking-[-0.04em]">5 printing · 5 embroidery</strong><span className="mt-1 block text-[10px] text-charcoal/55">2026 figure</span></p>
        </div>
      </div>
    </section>
  );
}
