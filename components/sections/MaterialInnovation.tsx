import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const MATERIAL_DIRECTIONS = [
  {
    number: '01',
    title: 'Cotton & cotton blends',
    description:
      'May suit everyday jersey, sweat and casual knit programs. Agree fibre content, hand feel, weight and construction for the specific product.',
  },
  {
    number: '02',
    title: 'Polyester & blends',
    description:
      'Can be evaluated against the buyer’s colour, weight, construction and care brief. Blend availability and processing route require confirmation.',
  },
  {
    number: '03',
    title: 'Other man-made fibres',
    description:
      'Nylon, viscose and other fibres are directions to investigate when a suitable source, product fit and processing route can be confirmed.',
  },
  {
    number: '04',
    title: 'Performance-oriented knits',
    description:
      'Start with intended use and defined requirements. Stretch, recovery, durability and care claims need agreed specifications and supporting evidence.',
  },
];

const BUYER_CONSIDERATIONS = [
  'Hand feel & appearance',
  'Weight & construction',
  'Stretch & recovery, if required',
  'Durability & care requirements',
];

export function MaterialInnovation() {
  return (
    <section id="materials" className="relative isolate overflow-hidden border-y border-white/10 bg-[#171614] px-5 pb-16 pt-24 text-white sm:px-8 sm:pb-20 sm:pt-28 lg:px-16 lg:pb-24 lg:pt-28">
      <div className="mx-auto max-w-[100rem]">
        <header className="grid gap-6 border-b border-white/10 pb-7 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-9">
          <div className="lg:col-span-7">
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#dfbd7d] sm:text-xs">
              <span aria-hidden="true" className="h-px w-9 bg-accent" />
              Material evolution
            </p>
            <h2 className="max-w-4xl text-[clamp(2.65rem,5.8vw,5.7rem)] font-semibold leading-[0.94] tracking-[-0.065em]">
              Beyond Cotton. <span className="text-white/45">Ready for What’s Next.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8 lg:col-span-5 lg:justify-self-end">
            As apparel requirements evolve, material selection matters more than ever. Fashion Knits works with buyers to align product requirements, material choices and manufacturing plans with the needs of each order.
          </p>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
          <figure className="relative isolate aspect-[1.2/1] overflow-hidden bg-[#24221f] sm:aspect-[1.55/1] lg:col-span-5 lg:aspect-[0.94/1]">
            <Image
              src="/assets/images/material-study-editorial.jpg"
              alt="Illustrative close-up of knit swatches in contrasting structures and colors"
              fill
              sizes="(max-width: 1023px) 100vw, 42vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
            <figcaption className="absolute bottom-4 left-4 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/85 sm:bottom-5 sm:left-5">
              Illustrative material study
            </figcaption>
          </figure>

          <div className="lg:col-span-7">
            <div className="border-l border-accent/70 pl-4 sm:pl-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#dfbd7d] sm:text-[10px]">Established approach</p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                Material planning starts with the buyer brief. Fibre availability, source, specifications and the in-house or partner production route are confirmed for each order.
              </p>
            </div>

            <div className="mt-7 flex items-end justify-between gap-4 border-b border-white/10 pb-3">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">Material directions to evaluate</h3>
              <span className="hidden font-mono text-[9px] tracking-[0.12em] text-white/35 sm:block">ORDER SPECIFIC</span>
            </div>
            <div className="grid sm:grid-cols-2 sm:gap-x-7">
              {MATERIAL_DIRECTIONS.map((item) => (
                <article key={item.number} className="border-b border-white/10 py-4 sm:py-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[9px] tracking-[0.12em] text-accent">{item.number}</span>
                    <h4 className="text-sm font-medium tracking-[-0.02em] sm:text-base">{item.title}</h4>
                  </div>
                  <p className="mt-2 pl-7 text-xs leading-5 text-white/60">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 border-t border-white/10 pt-6 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#dfbd7d]">What the material needs to do</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4">
              {BUYER_CONSIDERATIONS.map((item) => (
                <li key={item} className="border-l border-white/15 pl-3 text-xs leading-5 text-white/70">{item}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <Link
              href="/#contact"
              className="group inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-full bg-accent px-5 text-left text-[10px] font-bold uppercase leading-4 tracking-[0.12em] text-charcoal transition-colors hover:bg-[#e5c78e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[#171614] sm:w-auto sm:justify-start sm:px-6 sm:text-xs"
            >
              Discuss Your Material Requirements
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
