import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

type EnquiryCTAContext = 'general' | 'about' | 'export' | 'manufacturing' | 'products' | 'quality';

const COPY: Record<EnquiryCTAContext, { eyebrow: string; heading: string; description: string }> = {
  general: {
    eyebrow: 'Start a conversation',
    heading: 'Planning Your Next Knitwear Project?',
    description: 'Share your requirements with our team to discuss your manufacturing brief.',
  },
  about: {
    eyebrow: 'Work with Fashion Knits',
    heading: 'Planning Your Next Knitwear Project?',
    description: 'Share your requirements with our team to discuss your manufacturing brief.',
  },
  export: {
    eyebrow: 'International enquiry',
    heading: 'Planning Your Next Export Order?',
    description: 'Share your destination, order details and delivery requirements with our team.',
  },
  manufacturing: {
    eyebrow: 'Production planning',
    heading: 'Planning Your Next Production Run?',
    description: 'Share your product scope and order requirements with our manufacturing team.',
  },
  products: {
    eyebrow: 'Product development',
    heading: 'Planning Your Next Knitwear Collection?',
    description: 'Tell us which product categories and specifications you are developing.',
  },
  quality: {
    eyebrow: 'Quality planning',
    heading: 'Planning Your Next Knitwear Project?',
    description: 'Share your quality requirements and approval process with our team.',
  },
};

export function EnquiryCTA({ context = 'general' }: { context?: EnquiryCTAContext }) {
  const copy = COPY[context];

  return (
    <section
      id="contact"
      aria-labelledby="enquiry-cta-title"
      className="relative isolate overflow-hidden border-y border-white/10 bg-[#1b1a17] px-5 py-20 text-[#faf9f6] sm:px-8 sm:py-24 lg:px-16 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_82%_45%,rgba(201,169,110,.16),transparent_42%),linear-gradient(110deg,rgba(255,255,255,.025),transparent_52%)]"
      />
      <div className="mx-auto grid max-w-[100rem] gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-8">
          <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d3b476] sm:text-xs">
            <span className="h-px w-9 bg-[#b18b4a]" />
            {copy.eyebrow}
          </p>
          <h2
            id="enquiry-cta-title"
            className="max-w-4xl text-[clamp(2.4rem,5.5vw,5.4rem)] font-semibold leading-[0.96] tracking-[-0.065em]"
          >
            {copy.heading}
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/65 sm:text-base sm:leading-7">
            {copy.description}
          </p>
        </div>
        <div className="lg:col-span-4 lg:flex lg:justify-end">
          <Link
            href="/get-a-quote"
            className="btn-shine inline-flex min-h-14 w-full items-center justify-between gap-5 rounded-full bg-[#d3b476] px-6 text-[10px] font-bold uppercase tracking-[0.14em] text-[#25231f] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#e5c991] hover:shadow-[0_12px_32px_rgba(201,169,110,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d3b476] sm:w-fit sm:min-w-64"
          >
            <span>Discuss Your Project</span>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
