import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Droplets, Leaf, ShieldCheck } from 'lucide-react';

const RESPONSIBILITY_MARKERS = [
  { number: '01', label: 'Fiber sourcing', standard: 'GOTS · OCS', icon: Leaf },
  { number: '02', label: 'Product safety', standard: 'OEKO-TEX® Standard 100 · Class I', icon: ShieldCheck },
  { number: '03', label: 'Dyeing process', standard: 'Lower-water dyeing', icon: Droplets },
];

export function Sustainability() {
  return (
    <section id="sustainability" className="relative overflow-hidden border-b border-white/10 bg-[#171614] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[100rem] items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative z-10 lg:col-span-5">
          <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#dfbd7d] sm:text-xs">
            <span className="h-px w-9 bg-accent" />
            Responsible materials
          </p>
          <h2 className="max-w-[12ch] text-[clamp(2.8rem,5.2vw,5.4rem)] font-medium leading-[0.94] tracking-[-0.065em]">
            Considered materials. <span className="text-white/48">Clear standards.</span>
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
            We develop knitwear with fiber traceability, product safety and resource-aware processing in mind. Buyers can review the standards and scope certificates behind our material program.
          </p>

          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {RESPONSIBILITY_MARKERS.map(({ number, label, standard, icon: Icon }) => (
              <div key={number} className="flex min-h-[4.5rem] items-center gap-4 py-4">
                <span className="font-mono text-[10px] tracking-[0.12em] text-accent/75">{number}</span>
                <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                <span className="flex-1 text-xs font-medium tracking-wide text-white/90 sm:text-sm">{label}</span>
                <span className="max-w-[48%] text-right text-[9px] uppercase leading-relaxed tracking-[0.1em] text-white/50 sm:text-[10px]">{standard}</span>
              </div>
            ))}
          </div>

          <Link
            href="/quality#certificates"
            className="group mt-7 inline-flex min-h-12 items-center gap-3 rounded-full border border-accent/45 px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white/90 transition-colors hover:border-accent hover:bg-accent hover:text-[#171614] sm:text-xs"
          >
            View standards &amp; certificates
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <figure className="motion-photo relative isolate aspect-[4/3] overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#27241f] lg:col-span-7 lg:aspect-[1.06/1]">
          <Image
            src="/assets/images/sustainability_materials.webp"
            alt="Hands comparing knit fabric swatches beside cotton yarn and a color card"
            fill
            sizes="(max-width: 1024px) 92vw, 56vw"
            className="motion-photo-image object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13120f]/80 via-transparent to-[#13120f]/10" />
          <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 sm:p-7">
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#dfbd7d]">Representative image · Material development</span>
            <span className="text-sm font-medium tracking-wide text-white sm:text-base">Yarn, knit and color selection</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
