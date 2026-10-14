'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface Stage {
  number: string;
  name: string;
  image: string;
  standard: string;
  alt: string;
  description: string;
}

const PRODUCTION_STAGES: Stage[] = [
  {
    number: '01',
    name: 'Yarn sourcing',
    image: '/assets/images/process-yarn-sourcing.webp',
    standard: 'Fiber & yarn selection',
    alt: 'Cotton yarn cones feeding winding equipment on a textile factory floor',
    description: 'Yarn is selected to meet the buyer’s fiber, weight, and hand-feel targets, giving the fabric the right starting point.',
  },
  {
    number: '02',
    name: 'Circular knitting',
    image: '/assets/images/process-circular-knitting.webp',
    standard: 'Fabric construction',
    alt: 'Circular knitting machine forming a continuous tube of cotton jersey fabric',
    description: 'We knit the yarn into jersey, rib, pique, or fleece. Gauge and weight define the fabric’s surface, stretch, and body.',
  },
  {
    number: '03',
    name: 'Color & dyeing',
    image: '/assets/images/process-color-dyeing.webp',
    standard: 'Approved shade',
    alt: 'Worker checking deep navy fabric beside a stainless-steel dyeing vessel',
    description: 'Color samples are approved before dyeing. In-process checks help keep the shade consistent across the order.',
  },
  {
    number: '04',
    name: 'CAD cutting',
    image: '/assets/images/process-cad-cutting.webp',
    standard: 'Pattern accuracy',
    alt: 'Automated cutting head following garment pattern shapes across layered knit fabric',
    description: 'Digital patterns are arranged across fabric layers before cutting. Accurate markers keep panels on spec and reduce unused fabric.',
  },
  {
    number: '05',
    name: 'Garment assembly',
    image: '/assets/images/process-garment-assembly.webp',
    standard: 'Seam construction',
    alt: 'Garment operator sewing cotton knit panels together on an assembly line',
    description: 'Cut panels are joined with the specified seams and stitches, shaping each garment and helping it hold up through wear.',
  },
  {
    number: '06',
    name: 'Garment finishing',
    image: '/assets/images/process-garment-finishing.webp',
    standard: 'Steam pressing',
    alt: 'Worker steam-pressing a finished knit T-shirt at an industrial vacuum ironing table',
    description: 'Garments are steam-pressed, trimmed, and shaped, with moisture checked before final inspection and packing.',
  },
  {
    number: '07',
    name: 'Quality control',
    image: '/assets/images/process-quality-control.webp',
    standard: 'Final inspection',
    alt: 'Inspector measuring a finished knit top and comparing its fabric with an approved swatch',
    description: 'Measurements, seams, workmanship, and appearance are checked to spec. Final sampling follows the agreed acceptable quality level (AQL).',
  },
  {
    number: '08',
    name: 'Ready for export',
    image: '/assets/images/process-export-packing.webp',
    standard: 'Export packing',
    alt: 'Worker placing folded knit garments into unbranded cartons for export packing',
    description: 'Garments are folded, labeled, assorted, and packed to buyer instructions, keeping each size and color ready for shipment.',
  },
];

export function ManufacturingProcess() {
  return (
    <section
      id="manufacturing"
      className="process-story grain relative isolate overflow-hidden border-b border-white/10 bg-[#121110] text-off-white"
    >
      <div className="mx-auto max-w-[100rem] px-5 pb-8 pt-28 sm:px-8 lg:px-16 lg:pb-7 lg:pt-24">
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-7 lg:flex-row lg:items-end">
          <div>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent sm:text-xs">
              <span className="h-px w-9 bg-accent" />
              Made in Tiruppur · 01—08
            </p>
            <h2 className="max-w-4xl text-[clamp(2.8rem,6.6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-white">
              From yarn <span className="text-white/45">to world.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8 lg:w-[30rem] lg:shrink-0">
            <div className="max-w-[22rem]">
              <p className="text-xs leading-relaxed text-white/65 sm:text-sm">
                Eight connected stages take an order from selected yarn to packed garments. Each one shapes the fit, color, quality, and finish of the final piece.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3 border-t border-white/10 pt-3 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
              <span className="font-mono text-2xl font-light tracking-[-0.06em] text-accent sm:text-3xl">08</span>
              <span className="max-w-[8rem] text-[9px] font-semibold uppercase leading-relaxed tracking-[0.13em] text-white/45 sm:text-[10px]">
                stages from yarn selection to export packing
              </span>
            </div>
          </div>
        </div>

        <p className="mb-4 mt-6 text-[9px] font-medium uppercase tracking-[0.13em] text-white/35 sm:text-[10px]">
          Representative production imagery
        </p>

        <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4 2xl:gap-5">
          {PRODUCTION_STAGES.map((stage) => (
            <article
              key={stage.number}
              className="group flex h-full flex-col overflow-hidden rounded-[1.1rem] border border-white/10 bg-[#1a1917] transition-[border-color,box-shadow] duration-300 hover:border-accent/50 hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
            >
              <figure className="relative aspect-[16/10] overflow-hidden bg-[#24221f]">
                <Image
                  src={stage.image}
                  alt={stage.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="process-card-image object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:group-hover:scale-100 motion-reduce:transition-none"
                />
              </figure>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <span className="font-mono text-[9px] font-medium uppercase tracking-[0.15em] text-accent sm:text-[10px]">
                    Stage {stage.number}
                  </span>
                  <span className="text-right text-[8px] font-semibold uppercase tracking-[0.12em] text-white/45 sm:text-[9px]">
                    {stage.standard}
                  </span>
                </div>
                <h3 className="text-xl font-medium leading-tight tracking-[-0.035em] text-white sm:text-[1.35rem]">
                  {stage.name}
                </h3>
                <p className="mt-2.5 text-xs leading-6 text-white/65 sm:text-[13px]">
                  {stage.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-5">
          <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/40 sm:text-[10px]">
            Yarn <span className="mx-2 text-accent">→</span> Fabric <span className="mx-2 text-accent">→</span> Garment <span className="mx-2 text-accent">→</span> Shipment
          </span>
          <Link
            href="/manufacturing"
            className="group inline-flex shrink-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-accent sm:text-xs"
          >
            Explore production
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
