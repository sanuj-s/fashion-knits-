import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, CircleHelp, Factory } from 'lucide-react';
import { MaterialInnovation } from '@/components/sections/MaterialInnovation';

const LISTED_OPERATIONS = ['Cutting', 'Sewing', 'Trimming', 'Checking', 'Ironing', 'Packing'];
const PROGRAM_STAGES = [
  ['Product review', 'Review a tech pack, reference garment or product brief and agree the next development step.'],
  ['Material and sample planning', 'Confirm the requested fiber, fabric construction, color and sample requirements for the specific product.'],
  ['Production plan', 'Confirm the work locations, external supplier involvement, inspection plan and packing instructions before order approval.'],
  ['Garment and dispatch preparation', 'Prepare finished garments and order documents according to the confirmed buyer and destination requirements.'],
];

export function ManufacturingClient() {
  return (
    <div className="bg-warm-white text-charcoal">
      <section className="border-b border-white/10 bg-charcoal px-5 pb-16 pt-28 text-off-white sm:px-8 sm:pb-20 sm:pt-32 lg:px-16 lg:pb-24">
        <div className="mx-auto max-w-[90rem]">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-accent sm:text-xs"><Link href="/" className="hover:text-white">Home</Link><span aria-hidden="true" className="text-white/35">/</span><span aria-current="page" className="text-white/75">Manufacturing</span></nav>
          <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent"><Factory aria-hidden="true" className="h-4 w-4" /> Manufacturing · Tiruppur, India</p>
          <h1 className="max-w-5xl text-[clamp(2.9rem,7vw,6.4rem)] font-semibold leading-[0.9] tracking-[-0.065em]">From buyer brief <span className="text-accent">to finished knitwear.</span></h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">Fashion Knits develops knitwear with apparel buyers and coordinates garment production in Tiruppur. The exact production route, work locations and supplier involvement are confirmed for each product and order.</p>
          <Link href="#contact" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-5 text-[10px] font-bold uppercase tracking-[0.13em] text-charcoal transition-colors hover:bg-[#e5c78e]">Discuss a production brief <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="border-b border-charcoal/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <figure className="overflow-hidden rounded-[1rem] border border-charcoal/10 bg-[#e8e4dc] lg:col-span-7">
            <div className="relative aspect-[1.3/1]">
              <Image src="/assets/facilities/factory_netaji_park_exterior.webp" alt="Illustrative exterior concept for the factory, based on a Fashion Knits reference photo" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
              <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-[#191815]/75 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">Factory reference · Unit 01</span>
            </div>
            <figcaption className="px-4 py-3 text-[10px] leading-5 text-charcoal/55 sm:px-5">Buyer check: confirm the current site scope and any external processing for your order.</figcaption>
          </figure>
          <div className="lg:col-span-5">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#907348]">Facility scope · document copy</p>
            <h2 className="text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[0.96] tracking-[-0.055em]">Netaji Apparel Park, Unit 01</h2>
            <p className="mt-4 text-sm leading-6 text-charcoal/65">The Fashion Knits branch audit copy on this site is dated June 2026 and lists the following operations at the Netaji Apparel Park address:</p>
            <ul className="mt-5 grid grid-cols-2 gap-2">
              {LISTED_OPERATIONS.map((operation) => <li key={operation} className="flex min-h-10 items-center gap-2 rounded-lg border border-charcoal/10 bg-white px-3 text-xs text-charcoal/75"><Check aria-hidden="true" className="h-3.5 w-3.5 text-[#907348]" />{operation}</li>)}
            </ul>
            <p className="mt-5 flex items-start gap-2 text-[11px] leading-5 text-charcoal/55"><CircleHelp aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#907348]" />The audit document has not been independently authenticated here. Confirm its current validity, site identity and present operations with Fashion Knits before relying on it.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-charcoal/10 bg-[#f2efe9] px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[90rem]">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#907348]">Order workflow</p>
          <h2 className="max-w-3xl text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.06em]">What buyers can expect to agree.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-charcoal/65">These are planning steps rather than promised timings. Scope, approvals and dates are recorded in the product quotation and order confirmation.</p>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {PROGRAM_STAGES.map(([title, detail], index) => <li key={title} className="rounded-[1rem] border border-charcoal/10 bg-white p-5 sm:p-6"><span className="font-mono text-[10px] tracking-[0.13em] text-[#907348]">0{index + 1} / STEP</span><h3 className="mt-4 text-lg font-medium">{title}</h3><p className="mt-2 text-xs leading-5 text-charcoal/60">{detail}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[90rem] gap-7 lg:grid-cols-12">
          <div className="lg:col-span-5"><p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#907348]">Production route</p><h2 className="text-[clamp(2rem,4.5vw,3.8rem)] font-semibold leading-[0.96] tracking-[-0.055em]">Know where each step happens.</h2><p className="mt-4 text-sm leading-6 text-charcoal/65">Knit construction, dyeing and other specialist work may involve external suppliers. The route and locations should be agreed for your program before production begins.</p></div>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            <article className="rounded-[1rem] border border-charcoal/10 bg-white p-5 sm:p-6"><h3 className="text-lg font-medium">Operations listed at Unit 01</h3><p className="mt-2 text-xs leading-5 text-charcoal/60">The June 2026 audit copy lists cutting, sewing, trimming, checking, ironing and packing at the Netaji Apparel Park branch.</p></article>
            <article className="rounded-[1rem] border border-charcoal/10 bg-white p-5 sm:p-6"><h3 className="text-lg font-medium">Specialist processes</h3><p className="mt-2 text-xs leading-5 text-charcoal/60">Confirm whether knitting, dyeing, finishing or testing will be carried out in-house or by an external supplier for the requested product.</p></article>
            <article className="rounded-[1rem] border border-charcoal/10 bg-white p-5 sm:p-6 sm:col-span-2"><h3 className="text-lg font-medium">Buyer-specific quality plan</h3><p className="mt-2 text-xs leading-5 text-charcoal/60">Inspection points, test methods, acceptance criteria and evidence are confirmed against the buyer’s requirements. No test equipment or result is claimed here without current records.</p><Link href="/quality" className="mt-4 inline-flex min-h-10 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#856c42] hover:text-charcoal">See quality information <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></article>
          </div>
        </div>
      </section>
      <MaterialInnovation />
    </div>
  );
}
