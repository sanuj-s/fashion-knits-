import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const BUYER_REQUIREMENTS = [
  { title: 'Product specifications', detail: 'Bring style details, materials and construction together in the approved product brief.' },
  { title: 'Workmanship & inspection', detail: 'Define the reference sample, checkpoints and acceptance criteria for the order.' },
  { title: 'Packing & documentation', detail: 'Align labels, presentation, carton details and shipment paperwork before dispatch.' },
];

export function BrandStandards({ context }: { context: 'quality' }) {
  void context;
  return (
    <section id="brand-standards-quality" aria-labelledby="brand-standards-quality-title" className="border-y border-white/10 bg-[#1b1a18] text-[#faf8f5]">
      <div className="mx-auto max-w-[100rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="grid gap-9 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d1b373] sm:text-xs"><span aria-hidden="true" className="h-px w-9 bg-[#d1b373]" />Buyer requirements</p>
            <h2 id="brand-standards-quality-title" className="max-w-3xl text-[clamp(2.5rem,5.6vw,5.1rem)] font-semibold leading-[0.94] tracking-[-0.065em]">Clear details. <span className="block text-white/45">A shared standard.</span></h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">Product and quality expectations are set with the buyer, then carried through the approved sample and order plan.</p>
            <Link href="/#contact" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#cfad70] px-6 text-[10px] font-bold uppercase tracking-[0.13em] text-[#201d17] transition-colors hover:bg-[#e1c58e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfad70]">Discuss your requirements <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
          <ol aria-label="Buyer requirements for each order" className="lg:col-span-5 lg:col-start-8">
            {BUYER_REQUIREMENTS.map((item, index) => <li key={item.title} className="border-t border-white/15 py-4 sm:py-5"><div className="flex items-baseline gap-3"><span className="font-mono text-[9px] text-[#d1b373]">0{index + 1}</span><h3 className="text-base font-medium tracking-[-0.035em] sm:text-lg">{item.title}</h3></div><p className="mt-1.5 pl-7 text-xs leading-5 text-white/65 sm:text-sm">{item.detail}</p></li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}
