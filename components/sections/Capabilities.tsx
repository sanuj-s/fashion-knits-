import Link from 'next/link';
import { ArrowUpRight, Check, CircleHelp } from 'lucide-react';

const CAPABILITY_GROUPS = [
  {
    title: 'Garment production',
    note: 'Operations listed for the Netaji Apparel Park unit in the June 2026 audit copy',
    items: ['Cutting', 'Sewing', 'Trimming', 'Checking', 'Ironing', 'Packing'],
  },
  {
    title: 'Materials & fabric',
    note: 'Confirm the production location and scope for each program',
    items: ['Yarn selection', 'Knit fabric development', 'Color and finish approval'],
  },
  {
    title: 'Buyer requirements',
    note: 'Agreed before a quote or purchase order is confirmed',
    items: ['Tech pack and sample review', 'Inspection plan', 'Labels and packing instructions'],
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="border-b border-charcoal/10 bg-[#f2efe9] px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[100rem]">
        <div className="mb-10 grid gap-7 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#907348] sm:text-xs">
              <span className="h-px w-9 bg-accent" />
              Manufacturing capabilities
            </p>
            <h2 className="max-w-4xl text-[clamp(2.6rem,6vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-charcoal">
              Clear steps. <span className="text-charcoal/45">One buyer brief.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-charcoal/65 sm:text-base">
              Production is planned around your product, approved sample and order requirements. The scope below separates the operations listed in the facility audit copy from program stages that need confirmation.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Link href="/manufacturing" className="group inline-flex items-center gap-2 border-b border-charcoal/25 pb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-charcoal transition-colors hover:border-[#907348] hover:text-[#907348] sm:text-xs">
              Review production details
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {CAPABILITY_GROUPS.map((group, index) => (
            <article key={group.title} className="rounded-[1rem] border border-charcoal/10 bg-white p-5 sm:p-7">
              <p className="font-mono text-[10px] tracking-[0.15em] text-[#907348]">0{index + 1} / CAPABILITY</p>
              <h3 className="mt-4 text-xl font-medium tracking-[-0.035em] text-charcoal sm:text-2xl">{group.title}</h3>
              <p className="mt-2 min-h-12 text-xs leading-5 text-charcoal/55">{group.note}</p>
              <ul className="mt-5 space-y-3 border-t border-charcoal/10 pt-5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-5 text-charcoal/75">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#a38454]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-5 flex items-start gap-2.5 text-[11px] leading-5 text-charcoal/55">
          <CircleHelp aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#907348]" />
          The audit copy is dated June 2026 and has not been independently authenticated here. Knit construction, dyeing, testing and other specialist work may be arranged with external suppliers; confirm the exact scope and production location for your order.
        </p>
      </div>
    </section>
  );
}
