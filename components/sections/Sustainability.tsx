import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, FileCheck2 } from 'lucide-react';

const ORDER_CHECKS = [
  { title: 'Material claims', detail: 'Agree fiber content and any certification claim against current scope and transaction documents.' },
  { title: 'Process location', detail: 'Confirm which operations are in-house and which are handled by external suppliers for the program.' },
  { title: 'Buyer standards', detail: 'Review applicable restricted-substance, safety, testing and traceability requirements before production.' },
];

export function Sustainability() {
  return (
    <section id="sustainability" className="border-b border-white/10 bg-[#171614] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[100rem] items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#dfbd7d] sm:text-xs">
            <span className="h-px w-9 bg-accent" />
            Materials &amp; responsibility
          </p>
          <h2 className="max-w-[13ch] text-[clamp(2.7rem,5.2vw,5.2rem)] font-semibold leading-[0.94] tracking-[-0.065em]">
            Make the standard <span className="text-white/45">specific.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
            Fiber origin, processing, testing and certification coverage depend on the requested material and production route. We confirm these details against current supplier scope and order documents before they are used as claims.
          </p>
          <ul className="mt-7 divide-y divide-white/10 border-y border-white/10">
            {ORDER_CHECKS.map((item, index) => (
              <li key={item.title} className="flex gap-4 py-4">
                <span className="mt-0.5 font-mono text-[10px] text-accent">0{index + 1}</span>
                <div>
                  <h3 className="text-sm font-medium text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-white/55">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/quality#certificates" className="group mt-7 inline-flex min-h-11 items-center gap-2 border-b border-white/25 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-accent hover:text-accent sm:text-xs">
            Review available documents <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <figure className="relative isolate aspect-[4/3] overflow-hidden rounded-[1.1rem] border border-white/10 bg-[#27241f] lg:col-span-6">
          <Image
            src="/assets/images/sustainability_materials.webp"
            alt="Illustrative close-up of knit fabric swatches and yarn used to represent material selection"
            fill
            sizes="(max-width: 1024px) 92vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13120f]/75 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-5 text-[9px] font-semibold uppercase tracking-[0.13em] text-white/85 sm:p-7 sm:text-[10px]">
            <FileCheck2 aria-hidden="true" className="h-4 w-4 text-accent" />
            Illustrative image · material review
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
