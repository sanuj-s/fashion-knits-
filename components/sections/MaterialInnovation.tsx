import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export function MaterialInnovation({ showImageLabel = true }: { showImageLabel?: boolean }) {
  return (
    <section
      id="materials"
      className="relative isolate overflow-hidden border-y border-white/10 bg-[#171614] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-16 lg:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-[#c9a96e]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[100rem]">
        <header>
          <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#dfbd7d] sm:text-xs">
            <span aria-hidden="true" className="h-px w-9 bg-accent" />
            Material evolution
          </p>
          <h2 className="max-w-[90rem] text-[clamp(2.15rem,7.1vw,7rem)] font-semibold leading-[0.91] tracking-[-0.07em]">
            <span className="block text-white/85">BEYOND COTTON.</span>
            <span className="mt-1 block text-accent sm:mt-0">
              <span className="block whitespace-nowrap sm:inline">INTO MAN-MADE</span>{' '}
              <span className="block sm:inline">FIBRES.</span>
            </span>
          </h2>
        </header>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-4">
            <p className="max-w-md text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
              Exploring <span className="font-semibold text-white">polyester</span>, nylon, viscose and <span className="font-semibold text-white">blended</span> knitwear solutions to meet evolving apparel requirements.
            </p>

            <p className="mt-5 text-xs leading-5 text-white/55 sm:text-sm">
              Cotton and cotton blends remain established options.
            </p>

            <p className="mt-2 max-w-sm text-[10px] leading-5 text-white/40 sm:text-[11px]">
              Performance-related requirements are considered against buyer specifications.
            </p>

            <Link
              href="/#contact"
              className="group mt-7 inline-flex min-h-12 w-full items-center justify-between gap-4 rounded-full bg-accent px-5 text-left text-[10px] font-bold uppercase leading-4 tracking-[0.12em] text-charcoal transition-colors hover:bg-[#e5c78e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[#171614] sm:w-auto sm:justify-start sm:px-6 sm:text-xs"
            >
              Discuss Your Material Requirements
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </Link>
          </div>

          <figure className="lg:col-span-8">
            <div
              className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-[#22211f] sm:aspect-[16/10]"
            >
              <Image
                src="/assets/images/material-study-editorial.jpg"
                alt="A material study of knitted fabrics in contrasting textures and colours"
                fill
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            {showImageLabel && (
              <figcaption className="mt-2 text-[9px] font-medium uppercase tracking-[0.13em] text-white/35">
                Material study
              </figcaption>
            )}
          </figure>
        </div>
      </div>
    </section>
  );
}
