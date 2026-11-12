import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CUSTOMER_BRANDS } from '@/src/data/company-content';
import generatedBrandAssets from '@/src/data/brands.generated.json';
import { getLogoSize } from '@/src/lib/brand-logo-size';
import {
  ABOUT_MILESTONES,
  ABOUT_ROUTES,
  BUYER_SELECTIONS,
  QUALITY_HIGHLIGHTS,
} from './about-data';
import { AboutFadeItemReveal, AboutListItemReveal, AboutReveal, AboutSectionSeam } from './AboutMotion';
import styles from './about.module.css';

export const aboutQualityIsReady = QUALITY_HIGHLIGHTS.length >= 3
  && QUALITY_HIGHLIGHTS.length <= 4
  && QUALITY_HIGHLIGHTS.every((item) => item.verified);

const brandAssetBySlug = new Map(generatedBrandAssets.map((asset) => [asset.slug, asset]));
export const aboutBuyersAreReady = BUYER_SELECTIONS.length > 0
  && BUYER_SELECTIONS.every((selection) => selection.verified
    && CUSTOMER_BRANDS.some((brand) => brand.slug === selection.slug)
    && brandAssetBySlug.has(selection.slug));
const buyerSelectionSlugs = new Set(BUYER_SELECTIONS.map((selection) => selection.slug));
const selectedBuyerBrands = aboutBuyersAreReady
  ? CUSTOMER_BRANDS.flatMap((brand) => {
    if (!buyerSelectionSlugs.has(brand.slug)) return [];
    const asset = brandAssetBySlug.get(brand.slug);
    return asset ? [{ ...brand, ...asset }] : [];
  })
  : [];

const timelineIsReady = ABOUT_MILESTONES.length >= 3 && ABOUT_MILESTONES.every((item) => item.verified);

export function AboutTimeline() {
  if (!timelineIsReady) return null;

  return (
    <section id="timeline" aria-labelledby="about-timeline-title" className="bg-[#f2efe9] px-5 py-14 sm:px-8 sm:py-16 lg:px-16">
      <div className="mx-auto max-w-[90rem]">
        <AboutReveal>
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#907348]">Company timeline</p>
          <h2 id="about-timeline-title" className="text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">Company timeline.</h2>
        </AboutReveal>
        <ol className={`${styles.timelineList} mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3`}>
          {ABOUT_MILESTONES.map((milestone, index) => (
            <AboutListItemReveal key={`${milestone.year}-${index}`} delay={index * 0.05} className={styles.timelineItem}>
              <p className="font-serif text-3xl text-[#907348]">{milestone.year}</p>
              <p className="mt-3 text-sm leading-6 text-charcoal/70">{milestone.text}</p>
            </AboutListItemReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AboutQualitySection() {
  if (!aboutQualityIsReady) return null;

  return (
    <section id="quality" aria-labelledby="about-quality-title" className="relative bg-charcoal px-5 py-16 text-off-white sm:px-8 sm:py-20 lg:px-16 lg:py-24">
      <AboutSectionSeam />
      <div className="mx-auto max-w-[90rem]">
        <AboutReveal>
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Quality</p>
          <h2 id="about-quality-title" className="text-[clamp(2.3rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">Quality &amp; compliance</h2>
        </AboutReveal>
        <ul className={`${styles.qualityGrid} mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4`}>
          {QUALITY_HIGHLIGHTS.map((highlight, index) => (
            <AboutListItemReveal key={highlight.title} delay={index * 0.06} className={styles.qualityItem}>
              <h3 className="text-lg font-semibold leading-[1.04] tracking-[-0.02em]">{highlight.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">{highlight.body}</p>
            </AboutListItemReveal>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/15 pt-5">
          <Link href={ABOUT_ROUTES.quality} className="inline-flex min-h-10 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-accent hover:text-white">
            Quality <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link href={ABOUT_ROUTES.sustainability} className="inline-flex min-h-10 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-white/70 hover:text-white">
            Sustainability <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function AboutBuyersSection() {
  if (!aboutBuyersAreReady || selectedBuyerBrands.length === 0) return null;

  return (
    <section id="buyers" aria-labelledby="about-buyers-title" className="relative bg-[#f2efe9] px-5 py-14 sm:px-8 sm:py-16 lg:px-16">
      {aboutQualityIsReady && <AboutSectionSeam />}
      <div className="mx-auto max-w-[90rem]">
        <header className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#907348]">
              <span aria-hidden="true" className="h-px w-8 bg-[#c9a96e]" />
              Selected names
            </p>
            <h2 id="about-buyers-title" className="font-serif text-4xl leading-[1.04] tracking-[-0.03em] text-charcoal sm:text-5xl">
              {selectedBuyerBrands.length} <span className="font-sans text-xl font-medium tracking-[-0.02em] sm:text-2xl">brands</span>
            </h2>
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal/55">Apparel brands</p>
        </header>

        <ul className={`${styles.buyerGrid} mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 xl:grid-cols-6`}>
          {selectedBuyerBrands.map((brand, index) => {
            const logoSize = getLogoSize(brand.aspect, true);
            return (
              <AboutFadeItemReveal key={brand.slug} delay={index * 0.04} className={styles.buyerTile}>
                <div className={styles.buyerLogoArea}>
                  <Image
                    src={`/brands/_processed/${brand.slug}.color.webp`}
                    alt=""
                    aria-hidden="true"
                    width={brand.w}
                    height={brand.h}
                    unoptimized
                    sizes={`${logoSize.width}px`}
                    style={{ width: logoSize.width, height: 'auto' }}
                  />
                </div>
                <span className={styles.buyerLabel}>{brand.name}</span>
              </AboutFadeItemReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

const continueLinks = [
  { label: 'Products', href: ABOUT_ROUTES.products },
  { label: 'Manufacturing', href: ABOUT_ROUTES.manufacturing },
  { label: 'Quality', href: ABOUT_ROUTES.quality },
  { label: 'Sustainability', href: ABOUT_ROUTES.sustainability },
  { label: 'Global Export', href: ABOUT_ROUTES.globalExport },
];

export function AboutContinueExploring() {
  return (
    <nav aria-label="Continue exploring" className={styles.continueExploring}>
      <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.17em] text-white/50">Continue exploring</p>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:gap-x-7">
        {continueLinks.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={styles.continueLink}>
              {item.label} <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
