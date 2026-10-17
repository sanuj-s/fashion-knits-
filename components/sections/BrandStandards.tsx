import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BrandLogoCarousel, type BrandLogo } from './BrandLogoCarousel';

const BUYER_REQUIREMENTS = [
  {
    title: 'Product specifications',
    detail: 'Style details, materials and construction are set out for each program.',
  },
  {
    title: 'Workmanship & inspection',
    detail: 'Checks follow the approved sample and the criteria agreed for the order.',
  },
  {
    title: 'Packing & documentation',
    detail: 'Labels, packing instructions and required order records are confirmed before dispatch.',
  },
];

const BRAND_LOGOS: BrandLogo[] = [
  { name: 'BOSS', src: '/assets/brands/boss.svg', lightBacking: true },
  { name: 'Timberland', src: '/assets/brands/timberland.svg', lightBacking: true },
  { name: 'Zadig & Voltaire', src: '/assets/brands/zadig-voltaire.svg', lightBacking: true },
  { name: 'Teddy Group', src: '/assets/brands/teddy-group.png' },
  { name: 'Armani', src: '/assets/brands/armani.svg', lightBacking: true },
  { name: 'Ralph Lauren', src: '/assets/brands/ralph-lauren.svg', lightBacking: true },
  { name: 'Tommy Hilfiger', src: '/assets/brands/tommy-hilfiger.png', lightBacking: true },
  { name: 'Calvin Klein', src: '/assets/brands/calvin-klein.svg', lightBacking: true },
  { name: 'GANT', src: '/assets/brands/gant.svg', lightBacking: true },
  { name: 'Lacoste', src: '/assets/brands/lacoste.svg', lightBacking: true },
  { name: 'Superdry', src: '/assets/brands/superdry.svg', lightBacking: true },
  { name: 'Mango', src: '/assets/brands/mango.svg', lightBacking: true },
  { name: 'Jack & Jones', src: '/assets/brands/jack-jones.svg', lightBacking: true },
  { name: 'Adidas', src: '/assets/brands/adidas.svg', lightBacking: true },
  { name: 'Puma', src: '/assets/brands/puma.svg', lightBacking: true },
  { name: 'Nike', src: '/assets/brands/nike.svg', lightBacking: true },
  { name: 'Uniqlo', src: '/assets/brands/uniqlo.svg' },
  { name: 'Next', src: '/assets/brands/next.svg', lightBacking: true },
  { name: 'Gap', src: '/assets/brands/gap.svg', lightBacking: true },
  { name: 'Levi’s', src: '/assets/brands/levis.svg' },
  { name: 'Esprit', src: '/assets/brands/esprit.svg', lightBacking: true },
  { name: 'Guess', src: '/assets/brands/guess.svg', lightBacking: true },
  { name: 'Abercrombie & Fitch', src: '/assets/brands/abercrombie-fitch.svg', lightBacking: true },
  { name: 'Massimo Dutti', src: '/assets/brands/massimo-dutti.svg', lightBacking: true },
];

export function BrandStandards({ context }: { context: 'home' | 'quality' }) {
  const isQualityPage = context === 'quality';
  const heading = isQualityPage
    ? 'Brand Standards. Manufacturing Discipline.'
    : 'Trusted Manufacturing Relationships';
  const description = isQualityPage
    ? 'Buyer requirements vary by brand, style and order. Approved specifications guide product details, workmanship checks, inspection criteria and records for each program.'
    : 'Manufacturing experience shaped by the requirements of international apparel brands.';
  const secondaryHref = isQualityPage ? '#quality-process' : '/quality#quality-process';
  const secondaryLabel = isQualityPage ? 'Review the quality process' : 'Explore quality assurance';
  const enquiryHref = isQualityPage ? '/#contact' : '#contact';
  const tone = {
    section: 'border-y border-white/10 bg-[#1b1a18] text-[#faf8f5]',
    eyebrow: 'text-[#d1b373]',
    rule: 'bg-[#d1b373]',
    row: 'border-white/15',
    detail: 'text-white/65',
    link: 'text-white hover:text-[#e1c58e] border-white/30 hover:border-[#e1c58e]',
  };

  return (
    <section
      id={isQualityPage ? 'brand-standards-quality' : 'brand-standards-home'}
      aria-labelledby={isQualityPage ? 'brand-standards-quality-title' : 'brand-standards-home-title'}
      className={`${tone.section} px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24`}
    >
      <div className="mx-auto max-w-[100rem]">
        <div className="grid gap-9 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className={`mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs ${tone.eyebrow}`}>
              <span aria-hidden="true" className={`h-px w-9 ${tone.rule}`} />
              Brand collaborations · Manufacturing experience
            </p>
            <h2
              id={isQualityPage ? 'brand-standards-quality-title' : 'brand-standards-home-title'}
              className="max-w-3xl text-[clamp(2.5rem,5.6vw,5.1rem)] font-semibold leading-[0.94] tracking-[-0.065em]"
            >
              {isQualityPage ? (
                <>Brand Standards.<span className="block text-white/45">Manufacturing Discipline.</span></>
              ) : heading}
            </h2>
            <p className={`mt-5 max-w-2xl text-sm leading-7 sm:text-base ${tone.detail}`}>
              {description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                href={enquiryHref}
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#cfad70] px-6 text-[10px] font-bold uppercase tracking-[0.13em] text-[#201d17] transition-colors hover:bg-[#e1c58e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfad70]"
              >
                Discuss Your Manufacturing Requirements
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href={secondaryHref}
                className={`inline-flex min-h-10 items-center gap-2 border-b pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfad70] ${tone.link}`}
              >
                {secondaryLabel}
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <ol aria-label="How buyer requirements shape each order" className="lg:col-span-5 lg:col-start-8">
            {BUYER_REQUIREMENTS.map((item) => (
              <li key={item.title} className={`border-t py-4 sm:py-5 ${tone.row}`}>
                <h3 className="text-base font-medium tracking-[-0.035em] sm:text-lg">{item.title}</h3>
                <p className={`mt-1.5 text-xs leading-5 sm:text-sm ${tone.detail}`}>{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 border-t border-current/15 pt-5 sm:mt-14 sm:pt-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className={`text-[9px] font-semibold uppercase tracking-[0.2em] ${tone.eyebrow}`}>
              Manufacturing relationships
            </h3>
            <p className={`text-[9px] font-medium uppercase tracking-[0.16em] ${tone.detail}`}>
              International apparel brands
            </p>
          </div>
          <BrandLogoCarousel brands={BRAND_LOGOS} />
        </div>
      </div>
    </section>
  );
}
