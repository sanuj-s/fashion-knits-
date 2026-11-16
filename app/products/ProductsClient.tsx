'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useMotionValue, useScroll } from 'motion/react';
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Search,
  X,
} from 'lucide-react';
import {
  AUDIENCE_COLLECTIONS,
  type GarmentReference,
} from '@/lib/products-data';
import {
  DEVELOPMENT_STEPS,
  PALETTE_DIRECTIONS,
  STYLE_INSPIRATION,
} from './products-experience-data';
import { ColourLibraryBuilder } from './ColourLibraryBuilder';
import { FabricLibrary, type MaterialImages } from './fabric-library/FabricLibrary';
import styles from './products.module.css';

type AudienceId = (typeof AUDIENCE_COLLECTIONS)[number]['id'];
type ProductEntry = GarmentReference & { audienceId: AudienceId; audienceLabel: string };

const CATALOGUE_AUDIENCE_TABS = [
  { id: 'mens', label: "Men's" },
  { id: 'womens', label: "Women's" },
  { id: 'kids', label: "Kids'" },
  { id: 'babies-toddler', label: 'Babies & toddler' },
] as const;

const PRODUCT_ENTRIES: ProductEntry[] = AUDIENCE_COLLECTIONS.flatMap((collection) =>
  collection.garments.map((garment) => ({
    ...garment,
    audienceId: collection.id,
    audienceLabel: collection.label,
  })),
);

function productTypeFor(garment: GarmentReference) {
  const name = garment.name.toLocaleLowerCase();
  if (/set|coordinat/.test(name)) return 'Co-ord sets';
  if (/romper|onesie/.test(name)) return 'Rompers & onesies';
  if (/sleep|pajama|lounge/.test(name)) return 'Sleepwear & loungewear';
  if (/jogger|shorts/.test(name)) return 'Joggers & shorts';
  if (/polo|rugby/.test(name)) return 'Polos & rugby tops';
  if (/hoodie|sweatshirt/.test(name)) return 'Sweatshirts & hoodies';
  if (/cardigan|sweater|knit/.test(name)) return 'Knitwear';
  if (/dress/.test(name)) return 'Dresses';
  if (/jacket/.test(name)) return 'Jackets';
  if (/top|t-shirt|tee/.test(name)) return 'T-shirts & tops';
  return 'Other apparel';
}

const PRODUCT_TYPES = [...new Set(PRODUCT_ENTRIES.map(productTypeFor))].sort((a, b) => a.localeCompare(b));
const PRODUCT_COLOURS = [...new Set(PRODUCT_ENTRIES.flatMap((garment) => garment.colorways.map((colour) => colour.name)))].sort((a, b) => a.localeCompare(b));

function makeQuoteHref(
  garment: GarmentReference,
  category: string,
  options?: { fabric?: string; color?: string; customizations?: string[] },
) {
  const params = new URLSearchParams({
    product: category,
    productId: garment.id,
    productName: garment.name,
    productCategory: garment.category,
  });
  if (options?.fabric) params.set('fabric', options.fabric);
  if (options?.color) params.set('color', options.color);
  if (options?.customizations?.length) params.set('customizations', options.customizations.join(' · '));
  return `/get-a-quote?${params.toString()}`;
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={'mb-4 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.22em] sm:text-[10px] ' + (light ? 'text-[#d3b476]' : 'text-[#80643b]')}>
      <span className={'h-px w-8 ' + (light ? 'bg-[#b18b4a]' : 'bg-[#b18b4a]')} />
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  dark?: boolean;
}) {
  return (
    <div className={'grid gap-5 border-b pb-7 sm:gap-7 lg:grid-cols-12 lg:items-end ' + (dark ? 'border-white/15' : 'border-[#25231f]/15')}>
      <div className="lg:col-span-7">
        <Eyebrow light={dark}>{eyebrow}</Eyebrow>
        <h2 className={'max-w-4xl text-[clamp(2.2rem,5vw,4.8rem)] font-medium leading-[0.96] tracking-[-0.065em] ' + (dark ? 'text-[#faf8f5]' : 'text-[#25231f]')}>
          {title}
        </h2>
      </div>
      <p className={'max-w-xl text-sm leading-6 lg:col-span-5 lg:justify-self-end lg:text-base lg:leading-7 ' + (dark ? 'text-white/65' : 'text-[#25231f]/65')}>
        {description}
      </p>
    </div>
  );
}

function ImagePanel({
  src,
  alt,
  className = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return <Image src={src} alt={alt} fill sizes={sizes} className={className} />;
}

function ConceptBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#907348]/25 bg-[#faf8f5]/90 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#6d5734]">
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#b18b4a]" />
      Style concept
    </span>
  );
}

const HERO_EASE = [0.22, 1, 0.36, 1] as const;

function useProductsHeroMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function ProductsHeroReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useProductsHeroMedia('(prefers-reduced-motion: reduce)');

  return (
    <motion.div
      className={`${styles.heroMotionReveal} ${className}`}
      initial={{ opacity: 0, ...(reducedMotion ? {} : { y: 24 }) }}
      animate={{ opacity: 1, ...(reducedMotion ? {} : { y: 0 }) }}
      transition={reducedMotion ? { duration: 0.15 } : { duration: 0.8, ease: HERO_EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function ProductsHeroWord({ children, delay }: { children: ReactNode; delay: number }) {
  const reducedMotion = useProductsHeroMedia('(prefers-reduced-motion: reduce)');

  return (
    <motion.span
      className={`inline-block ${styles.heroMotionWord}`}
      initial={{ opacity: 0, ...(reducedMotion ? {} : { y: 24 }) }}
      animate={{ opacity: 1, ...(reducedMotion ? {} : { y: 0 }) }}
      transition={reducedMotion ? { duration: 0.15 } : { duration: 0.8, ease: HERO_EASE, delay }}
    >
      {children}
    </motion.span>
  );
}

function ProductsHeroImage() {
  const imageZoneRef = useRef<HTMLDivElement>(null);
  const imageIsInView = useInView(imageZoneRef, { margin: '0px', once: false });
  const reducedMotion = useProductsHeroMedia('(prefers-reduced-motion: reduce)');
  const desktopFinePointer = useProductsHeroMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
  const [documentVisible, setDocumentVisible] = useState(true);
  const { scrollYProgress } = useScroll({
    target: imageZoneRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useMotionValue(0);
  const active = imageIsInView && documentVisible && !reducedMotion;

  useEffect(() => {
    const updateVisibility = () => setDocumentVisible(document.visibilityState === 'visible');
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (!imageIsInView || !desktopFinePointer || reducedMotion || !documentVisible) {
      parallaxY.set(0);
      return;
    }

    const updateParallax = (progress: number) => parallaxY.set((progress - 0.5) * 24);
    updateParallax(scrollYProgress.get());
    return scrollYProgress.on('change', updateParallax);
  }, [desktopFinePointer, documentVisible, imageIsInView, parallaxY, reducedMotion, scrollYProgress]);

  return (
    <div ref={imageZoneRef} className={styles.heroImageZone}>
      <motion.div className={styles.heroImageParallax} style={desktopFinePointer && !reducedMotion ? { y: parallaxY } : undefined}>
        <motion.div
          className={styles.heroImageEntrance}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={reducedMotion ? { duration: 0.15 } : { duration: 1.6, ease: HERO_EASE }}
        >
          <div className={`${styles.heroImageIdle} ${!reducedMotion ? styles.heroImageDrifting : ''} ${active ? styles.heroImageRunning : styles.heroImagePaused}`}>
            <Image
              src="/assets/images/hero_campaign.webp"
              alt="Fashion models wearing neutral knitwear and relaxed apparel"
              fill
              quality={85}
              sizes="(min-width: 1024px) 66vw, 100vw"
              priority
              className={styles.heroImage}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function ProductsClient({ materialImages = {} }: { materialImages?: MaterialImages }) {
  const [activeAudience, setActiveAudience] = useState<'all' | AudienceId>('mens');
  const [searchTerm, setSearchTerm] = useState('');
  const [materialFilter, setMaterialFilter] = useState('all');
  const [productTypeFilter, setProductTypeFilter] = useState('all');
  const [productColourFilter, setProductColourFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('featured');
  const [selectedGarment, setSelectedGarment] = useState<ProductEntry | null>(null);
  const [selectedColour, setSelectedColour] = useState(PALETTE_DIRECTIONS[8].name);
  const [studioAudience, setStudioAudience] = useState<AudienceId>('mens');
  const [studioStyleId, setStudioStyleId] = useState(AUDIENCE_COLLECTIONS[0].garments[0].id);
  const [studioFabric, setStudioFabric] = useState(AUDIENCE_COLLECTIONS[0].garments[0].fabricOptions[0]);
  const [studioColour, setStudioColour] = useState(AUDIENCE_COLLECTIONS[0].garments[0].colorways[0].name);
  const [studioFit, setStudioFit] = useState('Relaxed');
  const [studioPrint, setStudioPrint] = useState('Not selected');
  const [studioEmbroidery, setStudioEmbroidery] = useState('Discuss during development');
  const [studioNeckSleeve, setStudioNeckSleeve] = useState('As shown in concept');
  const [studioLabel, setStudioLabel] = useState('Buyer label direction to discuss');
  const [studioPackaging, setStudioPackaging] = useState('To be agreed');

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();
    const filtered = PRODUCT_ENTRIES.filter((garment) => {
      const matchesAudience = activeAudience === 'all' || garment.audienceId === activeAudience;
      const matchesMaterial = materialFilter === 'all' || garment.fabricOptions.some((option) => option === materialFilter);
      const matchesType = productTypeFilter === 'all' || productTypeFor(garment) === productTypeFilter;
      const matchesColour = productColourFilter === 'all' || garment.colorways.some((colour) => colour.name === productColourFilter);
      const searchable = [garment.name, garment.category, garment.description, garment.construction, ...garment.fabricOptions, ...garment.customizationOptions].join(' ').toLocaleLowerCase();
      return matchesAudience && matchesMaterial && matchesType && matchesColour && (!query || searchable.includes(query));
    });

    if (sortOrder === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sortOrder === 'category') filtered.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    return filtered;
  }, [activeAudience, materialFilter, productTypeFilter, productColourFilter, searchTerm, sortOrder]);

  const availableMaterials = useMemo(
    () => [...new Set(PRODUCT_ENTRIES.flatMap((garment) => garment.fabricOptions))].sort((a, b) => a.localeCompare(b)),
    [],
  );
  const studioCollection = AUDIENCE_COLLECTIONS.find((collection) => collection.id === studioAudience) ?? AUDIENCE_COLLECTIONS[0];
  const studioGarment = studioCollection.garments.find((garment) => garment.id === studioStyleId) ?? studioCollection.garments[0];

  useEffect(() => {
    if (!selectedGarment) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = document.querySelector<HTMLElement>('[role="dialog"][aria-modal="true"]');
    const focusable = dialog ? [...dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')] : [];
    focusable[0]?.focus({ preventScroll: true });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedGarment(null);
      }
      if (event.key === 'Tab' && focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [selectedGarment]);

  function clearCatalogueFilters() {
    setActiveAudience('all');
    setSearchTerm('');
    setMaterialFilter('all');
    setProductTypeFilter('all');
    setProductColourFilter('all');
    setSortOrder('featured');
  }

  function updateStudioAudience(value: AudienceId) {
    const nextCollection = AUDIENCE_COLLECTIONS.find((collection) => collection.id === value) ?? AUDIENCE_COLLECTIONS[0];
    const firstGarment = nextCollection.garments[0];
    setStudioAudience(value);
    setStudioStyleId(firstGarment.id);
    setStudioFabric(firstGarment.fabricOptions[0]);
    setStudioColour(firstGarment.colorways[0].name);
  }

  const studioCustomizations = [
    `Fit direction: ${studioFit}`,
    `Print: ${studioPrint}`,
    `Embroidery: ${studioEmbroidery}`,
    `Neck / sleeve: ${studioNeckSleeve}`,
    `Label: ${studioLabel}`,
    `Packaging: ${studioPackaging}`,
    `Colour-library direction: ${selectedColour}`,
  ];

  return (
    <div className="bg-[#f5f2ee] text-[#25231f]">
      <section className={styles.productsHero}>
        <ProductsHeroImage />
        <div aria-hidden="true" className={`${styles.heroLeftScrim} pointer-events-none`} />
        <div aria-hidden="true" className={`${styles.heroTopScrim} pointer-events-none`} />
        <div aria-hidden="true" className={`${styles.heroBottomScrim} pointer-events-none`} />
        <div className={styles.heroContent}>
          <ProductsHeroReveal delay={0} className={styles.heroBreadcrumb}>
            <nav aria-label="Breadcrumb" className="flex items-center gap-3 font-mono uppercase text-white/70">
              <Link href="/" className="hover:text-white">Home</Link>
              <span aria-hidden="true" className="text-white/35">/</span>
              <span aria-current="page" className="text-white/85">Products</span>
            </nav>
          </ProductsHeroReveal>

          <div className={styles.heroCopy}>
            <ProductsHeroReveal delay={0.08}>
              <Eyebrow light>Knitted &amp; woven apparel · Tiruppur, India</Eyebrow>
            </ProductsHeroReveal>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleLine}>
                <ProductsHeroWord delay={0.16}>Apparel</ProductsHeroWord>{' '}
                <ProductsHeroWord delay={0.24}>crafted</ProductsHeroWord>
              </span>
              <span className={`${styles.heroTitleLine} ${styles.heroTitleGold}`}>
                <ProductsHeroWord delay={0.32}>for</ProductsHeroWord>{' '}
                <ProductsHeroWord delay={0.4}>every</ProductsHeroWord>
              </span>
              <span className={styles.heroTitleLine}>
                <ProductsHeroWord delay={0.48}>generation.</ProductsHeroWord>
              </span>
            </h1>
            <ProductsHeroReveal delay={0.56} className={styles.heroDescription}>
              <p>
                From everyday essentials to trend-led collections, explore knitwear and apparel concepts for brands building their next range.
              </p>
            </ProductsHeroReveal>
            <ProductsHeroReveal delay={0.64} className={styles.heroCtaRow}>
              <a href="#collections" className={styles.heroPrimaryCta}>
                Explore collections <ArrowDown aria-hidden="true" className="h-4 w-4" />
              </a>
              <a href="#collection-studio" className={styles.heroSecondaryCta}>
                Develop your collection <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </ProductsHeroReveal>
          </div>

          <ProductsHeroReveal delay={0.72} className={styles.heroFooterRow}>
            <span className={styles.heroFooterLeft}>Tiruppur · India</span>
            <a href="#collections" className={styles.heroFooterCenter}>Scroll to explore <ArrowDown aria-hidden="true" className="h-3 w-3" /></a>
            <span className={styles.heroFooterRight}>A buyer-led product showroom</span>
          </ProductsHeroReveal>
        </div>
      </section>

      <section id="collections" aria-labelledby="collections-title" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[100rem]">
          <SectionHeading
            eyebrow="Product categories · four collections"
            title={<>A wardrobe of <span className="text-[#80643b]/70">possibilities.</span></>}
            description="Browse product directions across men's, women's, kids' and babywear. Each image is a visual concept to start a buyer-led development conversation."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {AUDIENCE_COLLECTIONS.map((collection, index) => {
              const coverImages = [
                '/assets/products/trend-edit/mens-half-zip-knit-pullover.webp',
                '/assets/products/trend-edit/womens-striped-knit-polo.webp',
                '/assets/products/trend-edit/kids-modern-rugby-top.webp',
                '/assets/products/trend-edit/baby-striped-rib-romper.webp',
              ];
              const coverAlts = ['Olive half-zip knit concept', 'Striped knit polo concept', 'Colour-block rugby top concept', 'Striped infant romper concept'];
              return (
                <article key={collection.id} className={styles.collectionCard}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveAudience(collection.id);
                      document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    aria-label={`Explore ${collection.label} apparel collection`}
                    className="group block w-full text-left"
                  >
                    <div className="relative flex aspect-[4/4.35] items-center justify-center overflow-hidden bg-[#e7e3db] p-4">
                      <span className="absolute left-4 top-4 z-10 font-mono text-[9px] uppercase tracking-[0.18em] text-[#25231f]/45">0{index + 1} / COLLECTION</span>
                      <ImagePanel src={coverImages[index]} alt={coverAlts[index]} className={styles.collectionImage} sizes="(max-width: 640px) 50vw, (max-width: 1280px) 50vw, 25vw" />
                      <span aria-hidden="true" className="absolute bottom-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-[#25231f]/15 bg-[#f5f2ee]/75 text-[#25231f] transition-all group-hover:bg-[#d3b476] group-hover:border-[#d3b476]">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-4 border-b border-[#25231f]/15 py-4">
                      <div>
                        <h3 className="text-xl font-medium tracking-[-0.04em]">{collection.label} apparel</h3>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#25231f]/55">{collection.garments.length} style directions</p>
                      </div>
                      <span className="mt-1 font-mono text-[9px] text-[#80643b]">0{index + 1}</span>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
          <p className="mt-5 max-w-3xl text-[10px] leading-5 text-[#25231f]/55">Style counts reflect the concepts shown in this digital catalogue; they are not a complete or confirmed production range.</p>
        </div>
      </section>

      <section id="catalogue" aria-labelledby="catalogue-title" className="scroll-mt-20 bg-[#ebe8e1] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[100rem]">
          <SectionHeading
            eyebrow="The catalogue · concept-led"
            title={<>Find a starting <span className="text-[#80643b]/70">point.</span></>}
            description="Search the current style concepts or narrow the range by audience and proposed fabric direction. Confirm composition, fit, weight and construction against an approved development brief."
          />
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by apparel collection">
              {CATALOGUE_AUDIENCE_TABS.map((tab) => (
                <button key={tab.id} type="button" aria-pressed={activeAudience === tab.id} onClick={() => setActiveAudience(tab.id)} className={'min-h-10 shrink-0 rounded-full px-4 text-[9px] font-semibold uppercase tracking-[0.1em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#907348] ' + (activeAudience === tab.id ? 'bg-[#25231f] text-white' : 'border border-[#25231f]/15 bg-[#f5f2ee] text-[#25231f]/70 hover:border-[#25231f]/40 hover:text-[#25231f]')}>
                  {tab.label}
                </button>
              ))}
            </div>
            <p aria-live="polite" className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#25231f]/55">{filteredProducts.length} style concepts</p>
          </div>

          <div className="mt-4 grid gap-3 rounded-[0.9rem] border border-[#25231f]/10 bg-[#f5f2ee]/70 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[minmax(14rem,1.35fr)_minmax(11rem,1fr)_minmax(9rem,.8fr)_minmax(9rem,.8fr)_minmax(9rem,.8fr)_auto] xl:items-center lg:p-4">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <Search aria-hidden="true" className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#25231f]/45" />
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search styles, garments or details" className="h-11 w-full rounded-full border border-[#25231f]/15 bg-[#faf8f5] pl-10 pr-4 text-xs outline-none transition focus:border-[#907348] focus:ring-2 focus:ring-[#907348]/15" />
            </label>
            <label className="relative block">
              <span className="sr-only">Filter by proposed material</span>
              <select value={materialFilter} onChange={(event) => setMaterialFilter(event.target.value)} className="h-11 w-full appearance-none rounded-full border border-[#25231f]/15 bg-[#faf8f5] px-4 pr-10 text-xs text-[#25231f]/80 outline-none focus:border-[#907348] focus:ring-2 focus:ring-[#907348]/15">
                <option value="all">All proposed materials</option>
                {availableMaterials.map((material) => <option key={material} value={material}>{material}</option>)}
              </select>
              <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#25231f]/45" />
            </label>
            <label className="relative block">
              <span className="sr-only">Filter by garment type</span>
              <select value={productTypeFilter} onChange={(event) => setProductTypeFilter(event.target.value)} className="h-11 w-full appearance-none rounded-full border border-[#25231f]/15 bg-[#faf8f5] px-4 pr-10 text-xs text-[#25231f]/80 outline-none focus:border-[#907348] focus:ring-2 focus:ring-[#907348]/15">
                <option value="all">All garment types</option>
                {PRODUCT_TYPES.map((type) => <option key={type}>{type}</option>)}
              </select>
              <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#25231f]/45" />
            </label>
            <label className="relative block">
              <span className="sr-only">Filter by colour direction</span>
              <select value={productColourFilter} onChange={(event) => setProductColourFilter(event.target.value)} className="h-11 w-full appearance-none rounded-full border border-[#25231f]/15 bg-[#faf8f5] px-4 pr-10 text-xs text-[#25231f]/80 outline-none focus:border-[#907348] focus:ring-2 focus:ring-[#907348]/15">
                <option value="all">All colour directions</option>
                {PRODUCT_COLOURS.map((colour) => <option key={colour}>{colour}</option>)}
              </select>
              <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#25231f]/45" />
            </label>
            <label className="relative block">
              <span className="sr-only">Sort style concepts</span>
              <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className="h-11 w-full appearance-none rounded-full border border-[#25231f]/15 bg-[#faf8f5] px-4 pr-10 text-xs text-[#25231f]/80 outline-none focus:border-[#907348] focus:ring-2 focus:ring-[#907348]/15">
                <option value="featured">Featured order</option>
                <option value="name">Name A–Z</option>
                <option value="category">Category</option>
              </select>
              <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#25231f]/45" />
            </label>
            <button type="button" onClick={clearCatalogueFilters} className="min-h-11 rounded-full px-4 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#80643b] transition-colors hover:bg-[#25231f]/5 hover:text-[#25231f]">Clear filters</button>
          </div>

          {filteredProducts.length ? (
            <div className="mt-5 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((garment, index) => (
                <article key={garment.id} className={styles.productCard} style={{ animationDelay: `${Math.min(index % 8, 7) * 45}ms` }}>
                  <button type="button" onClick={() => setSelectedGarment(garment)} className="group block w-full text-left" aria-label={`View details for ${garment.name}`}>
                    <div className="relative flex aspect-[4/4.65] items-center justify-center overflow-hidden bg-[#f6f4ef] px-5 py-7">
                      <span className="absolute left-3 top-3 z-10"><ConceptBadge /></span>
                      <ImagePanel src={garment.views.front} alt={`${garment.name} style concept, front view`} className={styles.productImage} sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw" />
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#25231f]/[0.035] to-transparent" />
                      <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 rounded-full border border-[#25231f]/15 bg-[#faf8f5]/90 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#25231f] transition-colors group-hover:bg-[#d3b476]">
                        View concept <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <div className="pt-3">
                      <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-[#80643b]">{garment.category}</p>
                      <h3 className="mt-1.5 text-lg font-medium leading-tight tracking-[-0.035em]">{garment.name}</h3>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {garment.fabricOptions.slice(0, 2).map((fabric) => <span key={fabric} className="rounded-full border border-[#25231f]/10 px-2.5 py-1 text-[8px] text-[#25231f]/60">{fabric}</span>)}
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-[#25231f]/10 pt-3 text-[8px] font-semibold uppercase tracking-[0.13em] text-[#25231f]/60">
                        <span>{garment.colorways.length} palette directions</span>
                        <span className="inline-flex items-center gap-2 text-[#80643b]">Details <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></span>
                      </div>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 border border-dashed border-[#25231f]/20 bg-[#f5f2ee]/65 px-5 py-14 text-center">
              <p className="text-lg font-medium tracking-[-0.03em]">No style concepts match those filters.</p>
              <p className="mt-2 text-sm text-[#25231f]/60">Try another material or clear the catalogue filters.</p>
              <button type="button" onClick={clearCatalogueFilters} className="mt-5 min-h-10 rounded-full bg-[#25231f] px-4 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">Clear filters</button>
            </div>
          )}
          <p className="mt-7 max-w-4xl text-[10px] leading-5 text-[#25231f]/55">These are illustrative style concepts. Fabric names are proposed directions only. Composition, GSM, yarn, fit, size range, performance, construction and finishing are confirmed against the buyer&apos;s brief and approved sample.</p>
        </div>
      </section>

      <FabricLibrary materialImages={materialImages} />

      <section id="colour-studio" aria-labelledby="colour-studio-title" className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[100rem]">
          <SectionHeading
            eyebrow="Colour library · visual references"
            title={<>A considered <span className="text-[#80643b]/70">palette.</span></>}
            description="Build a buyer-ready colourway direction from screen references, then share the fabric and shade details needed for development."
          />
          <ColourLibraryBuilder
            initialColour={selectedColour}
            onPrimaryColourChange={(colour) => {
              setSelectedColour(colour);
              setStudioColour(colour);
            }}
          />
        </div>
      </section>

      <section id="inspiration" aria-labelledby="inspiration-title" className="bg-[#ebe8e1] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[100rem]">
          <SectionHeading
            eyebrow="Style & market inspiration"
            title={<>Visual directions, <span className="text-[#80643b]/70">open-ended.</span></>}
            description="An editorial reference wall for discussing product language, texture and customer use. The concepts below do not represent brand partnerships, clients or endorsements."
          />
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {STYLE_INSPIRATION.map((item, index) => (
              <article key={item.title} className="group bg-[#f5f2ee]">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f8f6f1]">
                  <ImagePanel src={item.image} alt={item.alt} className={styles.inspirationImage} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" />
                  <span className="absolute left-3 top-3 border border-[#25231f]/12 bg-[#faf8f5]/85 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.13em] text-[#25231f]/60">0{index + 1}</span>
                </div>
                <div className="border-b border-[#25231f]/15 py-3">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#80643b]">{item.label}</p>
                  <h3 className="mt-1 text-base font-medium tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-1.5 text-[10px] leading-5 text-[#25231f]/60">{item.note}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-[9px] leading-5 text-[#25231f]/50">All imagery on this page presents product or style concepts. No third-party brand marks are used to imply a commercial relationship.</p>
        </div>
      </section>

      <section id="collection-studio" aria-labelledby="collection-studio-title" className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[100rem]">
          <SectionHeading
            eyebrow="Product customisation · buyer brief"
            title={<>Build your own <span className="text-[#80643b]/70">apparel collection.</span></>}
            description="Shape a development brief from the available style concepts. Your selections are carried into the existing quote form as editable project notes."
          />
          <div className="mt-7 grid gap-3 lg:grid-cols-12">
            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
              <label className="block"><span className="mb-1.5 block text-[8px] font-semibold uppercase tracking-[0.14em] text-[#25231f]/55">Collection</span><select value={studioAudience} onChange={(event) => updateStudioAudience(event.target.value as AudienceId)} className={styles.field}><option value="mens">Men&apos;s apparel</option><option value="womens">Women&apos;s apparel</option><option value="kids">Kids&apos; apparel</option><option value="babies-toddler">Babies &amp; toddler</option></select></label>
              <label className="block"><span className="mb-1.5 block text-[8px] font-semibold uppercase tracking-[0.14em] text-[#25231f]/55">Style direction</span><select value={studioStyleId} onChange={(event) => { const garment = studioCollection.garments.find((item) => item.id === event.target.value) ?? studioCollection.garments[0]; setStudioStyleId(garment.id); setStudioFabric(garment.fabricOptions[0]); setStudioColour(garment.colorways[0].name); }} className={styles.field}>{studioCollection.garments.map((garment) => <option key={garment.id} value={garment.id}>{garment.name}</option>)}</select></label>
              <label className="block"><span className="mb-1.5 block text-[8px] font-semibold uppercase tracking-[0.14em] text-[#25231f]/55">Fabric direction</span><select value={studioFabric} onChange={(event) => setStudioFabric(event.target.value)} className={styles.field}>{studioGarment.fabricOptions.map((fabric) => <option key={fabric}>{fabric}</option>)}</select></label>
              <label className="block"><span className="mb-1.5 block text-[8px] font-semibold uppercase tracking-[0.14em] text-[#25231f]/55">Colour direction</span><select value={studioColour} onChange={(event) => setStudioColour(event.target.value)} className={styles.field}>{studioGarment.colorways.map((colour) => <option key={colour.name}>{colour.name}</option>)}{!studioGarment.colorways.some((colour) => colour.name === selectedColour) && <option>{selectedColour} · palette studio</option>}</select></label>
              <label className="block"><span className="mb-1.5 block text-[8px] font-semibold uppercase tracking-[0.14em] text-[#25231f]/55">Fit direction</span><select value={studioFit} onChange={(event) => setStudioFit(event.target.value)} className={styles.field}><option>Relaxed</option><option>Regular</option><option>Close fit</option><option>To buyer size specification</option><option>To be discussed</option></select></label>
              <label className="block"><span className="mb-1.5 block text-[8px] font-semibold uppercase tracking-[0.14em] text-[#25231f]/55">Print method</span><select value={studioPrint} onChange={(event) => setStudioPrint(event.target.value)} className={styles.field}><option>Not selected</option><option>Screen print · to be reviewed</option><option>Digital print · to be reviewed</option><option>Buyer artwork · method to be confirmed</option><option>No print direction</option></select></label>
              <label className="block"><span className="mb-1.5 block text-[8px] font-semibold uppercase tracking-[0.14em] text-[#25231f]/55">Embroidery</span><select value={studioEmbroidery} onChange={(event) => setStudioEmbroidery(event.target.value)} className={styles.field}><option>Discuss during development</option><option>Explore embroidery placement</option><option>No embroidery direction</option><option>Buyer artwork to review</option></select></label>
              <label className="block"><span className="mb-1.5 block text-[8px] font-semibold uppercase tracking-[0.14em] text-[#25231f]/55">Neck &amp; sleeve details</span><select value={studioNeckSleeve} onChange={(event) => setStudioNeckSleeve(event.target.value)} className={styles.field}><option>As shown in concept</option><option>Explore alternate neckline</option><option>Explore alternate sleeve</option><option>To buyer specification</option></select></label>
              <label className="block"><span className="mb-1.5 block text-[8px] font-semibold uppercase tracking-[0.14em] text-[#25231f]/55">Labels</span><select value={studioLabel} onChange={(event) => setStudioLabel(event.target.value)} className={styles.field}><option>Buyer label direction to discuss</option><option>Explore printed label</option><option>Explore woven label</option><option>To buyer specification</option></select></label>
              <label className="block"><span className="mb-1.5 block text-[8px] font-semibold uppercase tracking-[0.14em] text-[#25231f]/55">Packaging</span><select value={studioPackaging} onChange={(event) => setStudioPackaging(event.target.value)} className={styles.field}><option>To be agreed</option><option>Buyer packaging brief to review</option><option>Retail-ready packaging direction</option><option>To buyer specification</option></select></label>
            </div>

            <aside className="flex flex-col border border-[#25231f]/12 bg-[#ebe8e1] p-4 sm:p-5 lg:col-span-5">
              <div className="relative flex min-h-[17rem] flex-1 items-center justify-center overflow-hidden bg-[#f6f4ef] p-5">
                <ImagePanel src={studioGarment.views.front} alt={`${studioGarment.name} concept preview`} className={styles.studioImage} sizes="(max-width: 1024px) 100vw, 42vw" />
                <span className="absolute bottom-3 left-3 border border-[#25231f]/10 bg-[#faf8f5]/85 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.12em] text-[#25231f]/55">Silhouette concept · front view</span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div><p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#80643b]">Live brief summary</p><h3 className="mt-1 text-lg font-medium tracking-[-0.03em]">{studioGarment.name}</h3><p className="mt-1 text-[9px] text-[#25231f]/55">{studioGarment.category}</p></div>
                <span className="mt-1 h-7 w-7 shrink-0 rounded-full border border-[#25231f]/15" style={{ backgroundColor: studioGarment.colorways.find((colour) => colour.name === studioColour)?.swatch ?? PALETTE_DIRECTIONS.find((colour) => studioColour.startsWith(colour.name))?.hex ?? '#e9e3d8' }} aria-label={`Selected colour: ${studioColour}`} />
              </div>
              <div className="mt-3 grid gap-x-4 gap-y-2 border-t border-[#25231f]/12 pt-3 text-[9px] sm:grid-cols-2">
                <p><span className="text-[#25231f]/45">Fabric</span><span className="mt-0.5 block">{studioFabric}</span></p>
                <p><span className="text-[#25231f]/45">Colour</span><span className="mt-0.5 block">{studioColour}</span></p>
                <p><span className="text-[#25231f]/45">Fit</span><span className="mt-0.5 block">{studioFit}</span></p>
                <p><span className="text-[#25231f]/45">Finish details</span><span className="mt-0.5 block">{studioPrint}; {studioEmbroidery}</span></p>
              </div>
              <Link href={makeQuoteHref(studioGarment, studioGarment.category, { fabric: studioFabric, color: studioColour, customizations: studioCustomizations })} className="mt-5 inline-flex min-h-12 items-center justify-between gap-3 rounded-full bg-[#25231f] px-5 text-[9px] font-bold uppercase tracking-[0.13em] text-white transition-colors hover:bg-[#80643b]">
                Send this specification <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-[8px] leading-4 text-[#25231f]/50">Preview shows the concept silhouette only. It is not a colour-accurate or production-ready technical design. Your selections open in the editable inquiry form.</p>
            </aside>
          </div>
        </div>
      </section>

      <section id="development-path" aria-labelledby="development-path-title" className="bg-[#ebe8e1] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[100rem]">
          <SectionHeading
            eyebrow="Development pathway · from brief to dispatch"
            title={<>From fabric choice to <span className="text-[#80643b]/70">finished apparel.</span></>}
            description="A typical buyer-led pathway, with scope and approvals agreed for each programme. The sequence below describes development stages, not a promise of timing or production capacity."
          />
          <ol className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {DEVELOPMENT_STEPS.map((step, index) => (
              <li key={step.title} className="relative min-h-36 border border-[#25231f]/12 bg-[#f5f2ee] p-4 sm:min-h-40 sm:p-5">
                <span aria-hidden="true" className="font-mono text-[9px] tracking-[0.14em] text-[#80643b]">0{index + 1}</span>
                <h3 className="mt-5 text-lg font-medium tracking-[-0.035em]">{step.title}</h3>
                <p className="mt-1.5 max-w-xs text-[10px] leading-5 text-[#25231f]/60">{step.detail}</p>
                {index < DEVELOPMENT_STEPS.length - 1 && <span aria-hidden="true" className="absolute right-3 top-4 hidden text-[#80643b]/55 lg:block">→</span>}
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/manufacturing" className="inline-flex min-h-10 items-center gap-2 border-b border-[#25231f]/20 pr-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#80643b] transition-colors hover:border-[#80643b] hover:text-[#25231f]">Explore manufacturing <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
            <Link href="/quality" className="inline-flex min-h-10 items-center gap-2 border-b border-[#25231f]/20 pr-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#80643b] transition-colors hover:border-[#80643b] hover:text-[#25231f]">Explore quality <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
          </div>
        </div>
      </section>

      {selectedGarment && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#171614]/70 p-0 backdrop-blur-[2px] sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedGarment(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="product-detail-title" className={styles.detailDialog}>
            <button type="button" onClick={() => setSelectedGarment(null)} aria-label="Close product concept details" className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-[#25231f]/15 bg-[#faf8f5]/90 text-[#25231f] transition-colors hover:bg-[#d3b476] sm:right-4 sm:top-4"><X aria-hidden="true" className="h-4 w-4" /></button>
            <div className="grid min-h-0 lg:grid-cols-2">
              <div className="relative flex min-h-[20rem] items-center justify-center overflow-hidden bg-[#ebe8e1] p-7 sm:min-h-[34rem]">
                <ImagePanel src={selectedGarment.views.front} alt={`${selectedGarment.name} concept, front view`} className={styles.detailImage} sizes="(max-width: 1024px) 100vw, 50vw" />
                <span className="absolute bottom-4 left-4 border border-[#25231f]/10 bg-[#faf8f5]/85 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#25231f]/60">Front concept view</span>
              </div>
              <div className="min-h-0 overflow-y-auto p-5 sm:p-8 lg:p-10">
                <Eyebrow>{selectedGarment.category} · buyer-led concept</Eyebrow>
                <h2 id="product-detail-title" className="max-w-xl text-3xl font-medium leading-[0.97] tracking-[-0.055em] sm:text-4xl">{selectedGarment.name}</h2>
                <ConceptBadge />
                <p className="mt-5 text-sm leading-6 text-[#25231f]/70">{selectedGarment.description}</p>
                <div className="mt-6 border-t border-[#25231f]/12 pt-5">
                  <h3 className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#80643b]">Construction direction</h3>
                  <p className="mt-2 text-xs leading-6 text-[#25231f]/65">{selectedGarment.construction}</p>
                </div>
                <div className="mt-5 grid gap-5 border-t border-[#25231f]/12 pt-5 sm:grid-cols-2">
                  <div><h3 className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#80643b]">Proposed fabric options</h3><ul className="mt-2 space-y-1.5 text-[10px] leading-5 text-[#25231f]/65">{selectedGarment.fabricOptions.map((option) => <li key={option}>· {option}</li>)}</ul></div>
                  <div><h3 className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#80643b]">Palette directions</h3><ul className="mt-2 space-y-2 text-[10px] text-[#25231f]/65">{selectedGarment.colorways.map((colour) => <li key={colour.name} className="flex items-center gap-2"><span aria-hidden="true" className="h-3.5 w-3.5 rounded-full border border-[#25231f]/15" style={{ backgroundColor: colour.swatch }} />{colour.name}</li>)}</ul></div>
                </div>
                <div className="mt-5 border-t border-[#25231f]/12 pt-5">
                  <h3 className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#80643b]">Customisation topics</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">{selectedGarment.customizationOptions.map((option) => <span key={option} className="border border-[#25231f]/12 bg-[#ebe8e1] px-2.5 py-1.5 text-[8px] text-[#25231f]/65">{option}</span>)}</div>
                </div>
                <p className="mt-5 border-l-2 border-[#b18b4a] pl-3 text-[10px] leading-5 text-[#25231f]/55">One supplied concept view is shown. Back, side and detail photography, fibre composition, GSM, fit, yarn, size range, care and performance data are not specified; agree them against the buyer&apos;s approved brief and sample.</p>
                {selectedGarment.designReference && <p className="mt-4 text-[9px] leading-5 text-[#25231f]/50">Style research only · <a href={selectedGarment.designReference.url} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-[#25231f]">{selectedGarment.designReference.label}</a> · no client or partnership claim.</p>}
                <Link href={makeQuoteHref(selectedGarment, selectedGarment.category, { fabric: selectedGarment.fabricOptions[0], color: selectedGarment.colorways[0].name, customizations: selectedGarment.customizationOptions })} className="mt-6 inline-flex min-h-12 w-full items-center justify-between rounded-full bg-[#25231f] px-5 text-[9px] font-bold uppercase tracking-[0.13em] text-white transition-colors hover:bg-[#80643b] sm:w-auto sm:min-w-64">
                  Request custom development <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}


    </div>
  );
}
