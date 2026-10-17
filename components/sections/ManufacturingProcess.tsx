'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface Stage {
  number: string;
  name: string;
  image: string;
  alt: string;
  description: string;
}

const PRODUCTION_STAGES: Stage[] = [
  {
    number: '01',
    name: 'Product Development & Sampling',
    image: '/assets/images/contact_sampling_studio.webp',
    alt: 'Illustrative scene of a buyer and product developer reviewing knitwear samples and colour references',
    description:
      'A tech pack or reference garment anchors the discussion. Fit, measurements, construction, colour and material needs are agreed; samples are developed and reviewed when included in the program.',
  },
  {
    number: '02',
    name: 'Materials & Fabric',
    image: '/assets/images/yarn_process.webp',
    alt: 'Illustrative view of yarn cones and textile materials',
    description:
      'Yarn, fabric construction, shade references and processing needs are aligned with the buyer. Knitting and wet processing may use in-house or external operations; the route is confirmed for each order.',
  },
  {
    number: '03',
    name: 'Garment Manufacturing & Finishing',
    image: '/assets/images/process-garment-assembly.webp',
    alt: 'Illustrative view of knit garment panels being stitched and assembled',
    description:
      'The approved production plan guides cutting, sewing or assembly, trimming and pressing as required. The location of each operation, including any external supplier involvement, is agreed for the order.',
  },
  {
    number: '04',
    name: 'Quality, Packing & Dispatch',
    image: '/assets/images/process-export-packing.webp',
    alt: 'Illustrative view of finished knitwear being folded and prepared for packing',
    description:
      'Finished garments are checked against the approved sample and specifications. Labels, packing details and order documents follow the agreed instructions before shipment handoff.',
  },
];

export function ManufacturingProcess() {
  return (
    <section
      id="manufacturing"
      className="process-story grain relative isolate overflow-hidden border-b border-white/10 bg-[#121110] text-off-white"
    >
      <div className="mx-auto max-w-[100rem] px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-16 lg:pb-24 lg:pt-32">
        <div className="grid items-end gap-7 border-b border-white/10 pb-8 lg:grid-cols-12 lg:gap-10 lg:pb-10">
          <div className="lg:col-span-7">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent sm:text-xs">
              <span aria-hidden="true" className="h-px w-9 bg-accent" />
              A buyer-led production route
            </p>
            <h2 className="max-w-5xl text-[clamp(2.65rem,5.9vw,6rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-white">
              From Buyer Brief <span className="text-white/45">to Finished Order.</span>
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8 lg:col-span-5 lg:justify-self-end">
            Fashion Knits works with buyers to define product requirements, coordinate materials and production, review quality against approved specifications, and prepare finished orders for dispatch.
          </p>
        </div>

        <ol aria-label="Manufacturing journey" className="mt-8 grid gap-x-6 gap-y-9 sm:grid-cols-2 sm:gap-y-11 xl:mt-10 xl:grid-cols-4 xl:gap-x-0">
          {PRODUCTION_STAGES.map((stage) => (
            <li
              key={stage.number}
              className="group border-t border-white/15 pt-4 sm:pt-5 xl:border-l xl:px-6 xl:first:border-l-0 xl:first:pl-0 xl:last:pr-0"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.12em] text-accent">
                  {stage.number}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
              </div>

              <figure className="relative aspect-[1.35/1] overflow-hidden rounded-[0.35rem] bg-[#24221f] sm:aspect-[1.42/1] xl:aspect-[1.08/1]">
                <Image
                  src={stage.image}
                  alt={stage.alt}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 25vw"
                  className="process-card-image object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <figcaption className="absolute bottom-3 left-3 rounded-sm bg-[#121110]/75 px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/85 backdrop-blur-sm sm:text-[9px]">
                  Illustrative process visual
                </figcaption>
              </figure>

              <h3 className="mt-5 max-w-[18rem] text-xl font-medium leading-[1.08] tracking-[-0.04em] text-white sm:text-[1.35rem]">
                {stage.name}
              </h3>
              <p className="mt-3 max-w-[27rem] text-xs leading-6 text-white/65 sm:text-[13px]">
                {stage.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-9 flex justify-end border-t border-white/10 pt-5 sm:mt-11 sm:pt-6">
          <Link
            href="/manufacturing"
            className="group inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[#121110] sm:text-xs"
          >
            Explore Our Manufacturing Capabilities
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </Link>
        </div>
      </div>
    </section>
  );
}
