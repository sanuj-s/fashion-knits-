'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from '@/lib/animations';

const CAPABILITIES = [
  {
    number: '01',
    name: 'Circular & flat knitting',
    category: 'Textile construction',
    image: '/assets/images/capability_knitting_detail.webp',
    alt: 'Knitwear operator checking a circular knitting machine and ivory cotton jersey',
    detail: 'Yarn is knitted into jersey, rib, pique and fleece fabrics to the required gauge and weight.',
  },
  {
    number: '02',
    name: 'Color & dyeing',
    category: 'Responsible processing',
    image: '/assets/images/capability_color_lab.webp',
    alt: 'Textile technician comparing indigo knit swatches in a color laboratory',
    detail: 'Lab dips and shade checks help match bulk fabric to the approved color standard.',
  },
  {
    number: '03',
    name: 'CAD cutting',
    category: 'Precision engineering',
    image: '/assets/images/capability_cutting.webp',
    alt: 'Specialist inspecting cotton knit layers on an automated cutting table',
    detail: 'Digital markers guide accurate cutting and help control unused fabric.',
  },
  {
    number: '04',
    name: 'Assembly & finishing',
    category: 'Garment production',
    image: '/assets/images/capability_assembly.webp',
    alt: 'Garment maker sewing a charcoal cotton knit top on a modular production line',
    detail: 'Sewn panels are pressed, inspected and prepared to the buyer’s packing requirements.',
  },
];

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      if (!gridRef.current) return;
      gsap.fromTo(
        gridRef.current.children,
        { y: 42, opacity: 0.6 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.11,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 83%', once: true },
        }
      );
    }, sectionRef);
    return () => context.revert();
  }, []);

  return (
    <section id="capabilities" ref={sectionRef} className="relative overflow-hidden border-b border-charcoal/10 bg-[#f2efe9] px-5 py-24 sm:px-8 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[100rem]">
        <div className="mb-10 flex flex-col justify-between gap-7 md:mb-14 md:flex-row md:items-end">
          <div className="max-w-4xl">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#907348] sm:text-xs">
              <span className="h-px w-9 bg-accent" />
              The craft behind every piece
            </p>
            <h2 className="max-w-4xl text-[clamp(2.6rem,6vw,6rem)] font-semibold leading-[0.91] tracking-[-0.065em] text-charcoal">
              Built from the <span className="text-charcoal/42">inside out.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-charcoal/65 sm:text-base">
              From fabric creation to export-ready garments, each capability shapes the next step in production.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <Link href="/manufacturing" className="group inline-flex items-center gap-2 border-b border-charcoal/25 pb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-charcoal transition-colors hover:border-[#907348] hover:text-[#907348] sm:text-xs">
              See the full process
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-charcoal/45">Representative production imagery</span>
          </div>
        </div>

        <div ref={gridRef} className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4 2xl:gap-4">
          {CAPABILITIES.map((capability) => (
            <article
              key={capability.number}
              className="group flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-charcoal/10 bg-white shadow-[0_10px_30px_rgba(26,24,20,0.035)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_20px_46px_rgba(26,24,20,0.11)] motion-reduce:transform-none motion-reduce:hover:translate-y-0 motion-reduce:transition-none"
            >
              <figure className="relative aspect-[4/3] w-full overflow-hidden bg-[#e6e1d8]">
                <Image
                  src={capability.image}
                  alt={capability.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="visual-tile-image object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:group-hover:scale-100 motion-reduce:transition-none"
                />
                <span aria-hidden="true" className="absolute left-4 top-4 rounded-full border border-white/25 bg-charcoal/75 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-white backdrop-blur-sm">
                  {capability.number} / 04
                </span>
              </figure>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#907348] sm:text-[10px]">
                  {capability.category}
                </p>
                <h3 className="mt-2 min-h-[2.9rem] text-xl font-medium leading-tight tracking-[-0.035em] text-charcoal sm:text-[1.35rem]">
                  {capability.name}
                </h3>
                <p className="mt-2.5 text-xs leading-6 text-charcoal/65 sm:text-[13px]">
                  {capability.detail}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-charcoal/15 pt-5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-charcoal/45 sm:text-[10px]">
            Yarn <span className="mx-2 text-accent">→</span> Fabric <span className="mx-2 text-accent">→</span> Cut panels <span className="mx-2 text-accent">→</span> Finished garments
          </p>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-charcoal/40 sm:text-[10px]">End-to-end knitwear development</span>
        </div>
      </div>
    </section>
  );
}
