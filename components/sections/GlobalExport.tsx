import Link from 'next/link';
import { ArrowRight, FileCheck2, Globe2, PackageCheck } from 'lucide-react';

const EXPORT_STEPS = [
  { icon: Globe2, title: 'Share the destination', copy: 'Tell us the destination market and the delivery term you want to use.' },
  { icon: FileCheck2, title: 'Confirm buyer requirements', copy: 'Agree on labels, packing, documents and any market-specific requirements before the order is confirmed.' },
  { icon: PackageCheck, title: 'Plan the handoff', copy: 'Shipment method, freight arrangements, responsibilities and dates are confirmed for the specific order.' },
];

export function GlobalExport() {
  return (
    <section id="global-reach" className="border-b border-white/10 bg-charcoal px-5 py-20 text-off-white sm:px-8 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[100rem]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent sm:text-xs">
              <span className="h-px w-9 bg-accent" />
              International orders
            </p>
            <h2 className="max-w-4xl text-[clamp(2.7rem,6vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
              Export details, <span className="text-white/45">agreed per order.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              International requirements vary by market and buyer. Destination, delivery terms, packing, paperwork and freight responsibilities are confirmed during quotation and order planning.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Link href="/export" className="group inline-flex items-center gap-2 border-b border-white/25 pb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:border-accent hover:text-accent sm:text-xs">
              Export planning details <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        <ol className="mt-10 grid gap-3 md:grid-cols-3">
          {EXPORT_STEPS.map(({ icon: Icon, title, copy }, index) => (
            <li key={title} className="rounded-[1rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.14em] text-accent">0{index + 1}</span>
                <Icon aria-hidden="true" className="h-4 w-4 text-accent" />
              </div>
              <h3 className="mt-5 text-lg font-medium tracking-[-0.025em]">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-white/60 sm:text-sm">{copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
