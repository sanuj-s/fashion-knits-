'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Camera, ChevronDown, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useInView,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  AUDIENCE_COLLECTIONS,
  GARMENT_ANGLE_LABELS,
  GARMENT_VIEW_ORDER,
  type GarmentAngle,
  type GarmentReference,
} from '@/lib/products-data';

/* ------------------------------------------------------------------ */
/*  Tab-palette CSS variable sets                                     */
/* ------------------------------------------------------------------ */
interface Palette {
  hi: string;
  mid: string;
  lo: string;
}

const TAB_PALETTES: Record<string, Palette> = {
  mens:             { hi: '#F1EEE8', mid: '#E3DED4', lo: '#D3CCBF' },
  womens:           { hi: '#F5EEE8', mid: '#E8DDD3', lo: '#D8CABD' },
  kids:             { hi: '#F3F1E4', mid: '#E5E3D0', lo: '#D3D0BB' },
  'babies-toddler': { hi: '#F1F2F4', mid: '#E2E4E8', lo: '#D0D3D9' },
};

/* Grain noise as data-URI (feTurbulence SVG) */
const GRAIN_BG = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
const easeSineInOut = (progress: number) => -(Math.cos(Math.PI * progress) - 1) / 2;

/* Standard garment image container height */
const GARMENT_WRAP_HEIGHT_DESKTOP = 360;

const subscribeToHydration = () => () => {};
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

function garmentView(garment: GarmentReference, angle: GarmentAngle) {
  if (angle === 'detail') return garment.views.detail;
  if (angle === 'front') return garment.detailFrontImage ?? garment.views.front;
  return garment.views[angle];
}

function garmentTypeFor(name: string) {
  const value = name.toLowerCase();
  if (/coordinated|\bset\b/.test(value)) return 'Co-ord set';
  if (/romper|onesie|sleepsuit/.test(value)) return 'Romper';
  if (/sleep|lounge/.test(value)) return 'Sleepwear';
  if (/half.?zip/.test(value)) return 'Half-zip knit';
  if (/polo/.test(value)) return 'Polo shirt';
  if (/rugby/.test(value)) return 'Rugby top';
  if (/jogger/.test(value)) return 'Joggers';
  if (/short/.test(value)) return 'Shorts';
  if (/hoodie/.test(value)) return 'Hoodie';
  if (/sweatshirt/.test(value)) return 'Sweatshirt';
  if (/cardigan/.test(value)) return 'Cardigan';
  if (/dress/.test(value)) return 'Dress';
  if (/jacket/.test(value)) return 'Jacket';
  if (/sweater|jumper/.test(value)) return 'Sweater';
  if (/t-shirt|\btee\b/.test(value)) return 'T-shirt';
  if (/shirt/.test(value)) return 'Shirt';
  if (/top/.test(value)) return 'Top';
  return 'Knitwear';
}

function BuyerPreferenceSelect({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="block min-w-0">
      <span className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.13em] text-[#746b5d]">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-md border border-[#514936]/15 bg-white/65 px-3 text-[11px] text-[#3f3b33] outline-none transition-colors hover:border-[#8f6f3d]/40 focus-visible:border-[#8f6f3d]/70 focus-visible:ring-2 focus-visible:ring-[#8f6f3d]/15"
      >
        <option value="">To be discussed</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

const FABRIC_WEIGHT_PREFERENCES = ['Lightweight', 'Midweight', 'Heavier weight'];
const FIT_PREFERENCES = ['Close-fitting', 'Regular', 'Relaxed'];
const BRANDING_PREFERENCES = ['Small logo or motif', 'Larger artwork', 'No branding'];
const LABEL_TRIM_PREFERENCES = ['Brand label direction', 'Care label focus', 'Buttons or trims', 'No added trims'];

export function Products() {
  const [audienceIndex, setAudienceIndex] = useState(0);
  const [prevAudienceIndex, setPrevAudienceIndex] = useState(0);
  const [isCrossfadingBg, setIsCrossfadingBg] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pointerHoveredGarment, setPointerHoveredGarment] = useState<{ index: number; dir: number } | null>(null);
  const [focusedGarment, setFocusedGarment] = useState<{ index: number; dir: number } | null>(null);
  const [shineKey, setShineKey] = useState(0);
  const [supportsFineHover, setSupportsFineHover] = useState(false);
  const [supportsParallax, setSupportsParallax] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [selectedView, setSelectedView] = useState<GarmentAngle>('front');
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedFabric, setSelectedFabric] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);
  const [selectedFabricWeight, setSelectedFabricWeight] = useState('');
  const [selectedFitPreference, setSelectedFitPreference] = useState('');
  const [selectedBrandingPreference, setSelectedBrandingPreference] = useState('');
  const [selectedLabelTrimPreference, setSelectedLabelTrimPreference] = useState('');
  const [isDesignDetailsOpen, setIsDesignDetailsOpen] = useState(false);
  const [isCustomiseDesignOpen, setIsCustomiseDesignOpen] = useState(false);

  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const garmentRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelBoundsRef = useRef<{ left: number; width: number } | null>(null);
  const backgroundFadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rotationPointerRef = useRef<{ pointerId: number; startX: number; startIndex: number } | null>(null);

  const audience = AUDIENCE_COLLECTIONS[audienceIndex];
  const prevAudience = AUDIENCE_COLLECTIONS[prevAudienceIndex];
  const showcaseGarments = audience.garments.filter((garment) => garment.showInHomepageShowcase !== false);
  const selectedGarment = showcaseGarments[selectedIndex];
  const rackWindowStart = Math.max(0, Math.min(selectedIndex - 2, showcaseGarments.length - 5));
  const rackGarments = showcaseGarments
    .slice(rackWindowStart, rackWindowStart + 5)
    .map((garment, offset) => ({ garment, index: rackWindowStart + offset }));
  const currentPalette = TAB_PALETTES[audience.id] ?? TAB_PALETTES.mens;
  const prevPalette = TAB_PALETTES[prevAudience.id] ?? TAB_PALETTES.mens;

  /* Check reduced motion */
  const prefersReduced = useReducedMotion();
  const hasHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot
  );
  const reducedMotion = hasHydrated && !!prefersReduced;
  const hoveredGarment = pointerHoveredGarment ?? focusedGarment;
  const availableViews = GARMENT_VIEW_ORDER.filter((angle) => garmentView(selectedGarment, angle));
  const selectedViewImage = garmentView(selectedGarment, selectedView);
  const buyerCustomizations = [
    ...selectedCustomizations,
    selectedFabricWeight && `Fabric weight preference: ${selectedFabricWeight}`,
    selectedFitPreference && `Fit preference: ${selectedFitPreference}`,
    selectedBrandingPreference && `Branding preference: ${selectedBrandingPreference}`,
    selectedLabelTrimPreference && `Labels and trims preference: ${selectedLabelTrimPreference}`,
  ].filter((value): value is string => Boolean(value));
  const selectedPreferenceCount = buyerCustomizations.length + (selectedColor ? 1 : 0) + (selectedFabric ? 1 : 0);

  const revealSelectedDetails = () => {
    requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'nearest',
      });
    });
  };

  useEffect(() => {
    const stage = stageRef.current;
    const garmentButton = garmentRefs.current[selectedIndex];
    if (!stage || !garmentButton || stage.scrollWidth <= stage.clientWidth) return;
    const stageBounds = stage.getBoundingClientRect();
    const garmentBounds = garmentButton.getBoundingClientRect();
    const offset = garmentBounds.left + garmentBounds.width / 2 - (stageBounds.left + stageBounds.width / 2);
    stage.scrollTo({
      left: stage.scrollLeft + offset,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  }, [audience.id, selectedIndex, reducedMotion]);

  useEffect(() => {
    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const parallaxQuery = window.matchMedia(
      '(min-width: 1024px) and (hover: hover) and (pointer: fine)'
    );
    const syncPointerCapabilities = () => {
      setSupportsFineHover(hoverQuery.matches);
      setSupportsParallax(parallaxQuery.matches);
    };

    syncPointerCapabilities();
    hoverQuery.addEventListener('change', syncPointerCapabilities);
    parallaxQuery.addEventListener('change', syncPointerCapabilities);
    return () => {
      hoverQuery.removeEventListener('change', syncPointerCapabilities);
      parallaxQuery.removeEventListener('change', syncPointerCapabilities);
    };
  }, []);

  useEffect(() => {
    const syncPageVisibility = () => setIsPageVisible(!document.hidden);
    syncPageVisibility();
    document.addEventListener('visibilitychange', syncPageVisibility);
    return () => document.removeEventListener('visibilitychange', syncPageVisibility);
  }, []);

  useEffect(() => () => {
    if (backgroundFadeTimerRef.current) clearTimeout(backgroundFadeTimerRef.current);
  }, []);

  /* In-view triggers */
  const isInView = useInView(panelRef, { once: true, amount: 0.35 });
  const isSectionVisible = useInView(panelRef, { amount: 0.1 });

  /* Parallax (G) */
  const mouseX = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const garmentShiftX = useTransform(springX, [-1, 1], reducedMotion ? [0, 0] : [-5, 5]);
  const spotlightShiftX = useTransform(springX, [-1, 1], reducedMotion ? [0, 0] : [-10, 10]);

  const handlePanelPointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!supportsParallax || reducedMotion || e.pointerType === 'touch') return;
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    panelBoundsRef.current = { left: rect.left, width: rect.width };
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseX.set(Math.max(-1, Math.min(1, normX)));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const bounds = panelBoundsRef.current;
    if (reducedMotion || !supportsParallax || e.pointerType === 'touch' || !bounds || bounds.width === 0) return;
    const normX = ((e.clientX - bounds.left) / bounds.width) * 2 - 1; // -1 to +1
    mouseX.set(Math.max(-1, Math.min(1, normX)));
  };

  const handlePointerLeave = () => {
    panelBoundsRef.current = null;
    mouseX.set(0);
  };

  /* Garment selection */
  const selectGarment = (index: number, moveFocus = false) => {
    const nextIndex = (index + showcaseGarments.length) % showcaseGarments.length;
    setSelectedIndex(nextIndex);
    setSelectedView('front');
    setIsZoomed(false);
    setSelectedFabric('');
    setSelectedColor('');
    setSelectedCustomizations([]);
    setSelectedFabricWeight('');
    setSelectedFitPreference('');
    setSelectedBrandingPreference('');
    setSelectedLabelTrimPreference('');
    setIsDesignDetailsOpen(false);
    setIsCustomiseDesignOpen(false);
    revealSelectedDetails();
    if (moveFocus) {
      requestAnimationFrame(() => {
        garmentRefs.current[nextIndex]?.focus({ preventScroll: true });
      });
    }
  };

  const stepGarment = (step: number) => {
    selectGarment(selectedIndex + step);
  };

  /* Tab selection */
  const selectAudience = (index: number, moveFocus = false) => {
    if (index === audienceIndex) return;
    const nextIndex = (index + AUDIENCE_COLLECTIONS.length) % AUDIENCE_COLLECTIONS.length;
    setPrevAudienceIndex(audienceIndex);
    setAudienceIndex(nextIndex);
    setIsCrossfadingBg(true);
    setSelectedIndex(0);
    setSelectedView('front');
    setIsZoomed(false);
    setSelectedFabric('');
    setSelectedColor('');
    setSelectedCustomizations([]);
    setSelectedFabricWeight('');
    setSelectedFitPreference('');
    setSelectedBrandingPreference('');
    setSelectedLabelTrimPreference('');
    setIsDesignDetailsOpen(false);
    setIsCustomiseDesignOpen(false);
    revealSelectedDetails();
    setPointerHoveredGarment(null);
    setFocusedGarment(null);
    setShineKey((k) => k + 1);
    garmentRefs.current = [];

    if (backgroundFadeTimerRef.current) clearTimeout(backgroundFadeTimerRef.current);
    const backgroundFadeDuration = reducedMotion ? 0.15 : 0.7;
    backgroundFadeTimerRef.current = setTimeout(() => {
      setIsCrossfadingBg(false);
      backgroundFadeTimerRef.current = null;
    }, backgroundFadeDuration * 1000);

    if (moveFocus) {
      requestAnimationFrame(() => {
        document.getElementById(`audience-tab-${AUDIENCE_COLLECTIONS[nextIndex].id}`)?.focus();
      });
    }
  };

  /* Keyboard handlers */
  const handleAudienceKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = index + 1;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = index - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = AUDIENCE_COLLECTIONS.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    selectAudience(nextIndex, true);
  };

  const handleGarmentKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;
    if (event.key === 'ArrowRight') nextIndex = index + 1;
    if (event.key === 'ArrowLeft') nextIndex = index - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = showcaseGarments.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    selectGarment(nextIndex, true);
  };

  const enquireAboutStyle = () => {
    window.dispatchEvent(
      new CustomEvent('fashion-knits:product-interest', { detail: selectedGarment.category })
    );
    const params = new URLSearchParams({
      product: selectedGarment.category,
      productId: selectedGarment.id,
      productName: selectedGarment.name,
      productCategory: selectedGarment.category,
    });
    if (selectedFabric) params.set('fabric', selectedFabric);
    if (selectedColor) params.set('color', selectedColor);
    if (buyerCustomizations.length) params.set('customizations', buyerCustomizations.join(', '));
    router.push(`/get-a-quote?${params.toString()}`);
  };

  const handleViewerPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (availableViews.length < 2) return;
    const activeIndex = availableViews.indexOf(selectedView);
    rotationPointerRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startIndex: activeIndex >= 0 ? activeIndex : 0,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleViewerPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = rotationPointerRef.current;
    if (!drag || drag.pointerId !== event.pointerId || availableViews.length < 2) return;
    const steps = Math.trunc((drag.startX - event.clientX) / 44);
    if (!steps) return;
    const nextIndex = ((drag.startIndex + steps) % availableViews.length + availableViews.length) % availableViews.length;
    setSelectedView(availableViews[nextIndex]);
    setIsZoomed(false);
  };

  const handleViewerPointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (rotationPointerRef.current?.pointerId === event.pointerId) rotationPointerRef.current = null;
  };

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative bg-[#f5f4f1] px-4 py-14 text-[#252522] sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-[100rem]">
        <h2 id="products-heading" className="sr-only">Knitwear for your collection</h2>

        {/* Section header */}
        <div className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#615f59] sm:text-[11px]">
            Product categories <span aria-hidden="true" className="px-2 text-[#aaa8a2]">|</span> Men, women, children &amp; babies
          </p>
        </div>

        {/* ======================== GALLERY PANEL ======================== */}
        <div
          ref={panelRef}
          onPointerEnter={handlePanelPointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="products-panel relative mx-auto mt-6 w-full max-w-[1280px] overflow-hidden rounded-3xl"
          style={{
            width: 'min(1280px, 92vw)',
            '--rail-color-mode': 'brass',
          } as React.CSSProperties}
        >
          <motion.div
            aria-hidden="true"
            className="products-showroom-backdrop pointer-events-none absolute inset-0 z-0"
            style={{ x: spotlightShiftX }}
          />
          <div aria-hidden="true" className="products-light-wash pointer-events-none absolute inset-0 z-0" />

          {/* --- Background layer A: Cross-fading radial wall palettes (700ms) --- */}
          {/* Previous palette layer (fading out) */}
          {isCrossfadingBg && (
            <motion.div
              key={`prev-bg-${prevAudience.id}`}
              className="pointer-events-none absolute inset-0 z-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0.15 : 0.7, ease: 'easeInOut' }}
              style={{
                background: `radial-gradient(120% 85% at 50% 0%, color-mix(in srgb, ${prevPalette.hi} 12%, transparent) 0%, color-mix(in srgb, ${prevPalette.mid} 9%, transparent) 55%, color-mix(in srgb, ${prevPalette.lo} 13%, transparent) 100%)`,
              }}
            />
          )}

          {/* Current palette layer (fading in) */}
          <motion.div
            key={`curr-bg-${audience.id}`}
            className="pointer-events-none absolute inset-0 z-0"
            initial={isCrossfadingBg ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.7, ease: 'easeInOut' }}
            style={{
              background: `radial-gradient(120% 85% at 50% 0%, color-mix(in srgb, ${currentPalette.hi} 12%, transparent) 0%, color-mix(in srgb, ${currentPalette.mid} 9%, transparent) 55%, color-mix(in srgb, ${currentPalette.lo} 13%, transparent) 100%)`,
            }}
          />

          {/* --- Background layer B: Grain noise --- */}
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              backgroundImage: GRAIN_BG,
              opacity: 0.05,
              mixBlendMode: 'multiply',
            }}
          />

          {/* --- Background layer C: Vignette --- */}
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 55%, rgba(30,20,5,.10) 100%)',
            }}
          />

          {/* Panel content */}
          <div className="relative z-10 px-4 pb-10 pt-12 sm:px-8 sm:pb-12 sm:pt-14 lg:px-12 lg:pb-14 lg:pt-[72px]">
            {/* --- Tabs + Counter row --- */}
            <div className="relative flex items-center justify-center">
              <div
                role="tablist"
                aria-label="Shop product ranges"
                className="flex items-center justify-center gap-2 sm:gap-10 lg:gap-14"
              >
                {AUDIENCE_COLLECTIONS.map((collection, index) => {
                  const isSelected = audienceIndex === index;
                  return (
                    <button
                      key={collection.id}
                      id={`audience-tab-${collection.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls="audience-rack"
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => selectAudience(index)}
                      onKeyDown={(event) => handleAudienceKeyDown(event, index)}
                      className="products-tab group relative pb-3 pt-1"
                      data-active={isSelected || undefined}
                    >
                      <span
                        className={`text-[10px] font-medium uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.2em] ${
                          reducedMotion ? '' : 'transition-colors duration-200'
                        } ${
                          isSelected ? 'text-[#1a1814]' : 'text-[#7a7064] group-hover:text-[#1a1814]'
                        }`}
                      >
                        {collection.label}
                      </span>
                      {/* Shared sliding gold underline (spring: stiffness 380, damping 32) */}
                      {reducedMotion ? (
                        <motion.span
                          className="absolute inset-x-0 bottom-0 h-px"
                          initial={false}
                          animate={{ opacity: isSelected ? 1 : 0 }}
                          style={{ backgroundColor: 'var(--accent)' }}
                          transition={{ opacity: { duration: 0.15 } }}
                        />
                      ) : isSelected ? (
                        <motion.span
                          layoutId="active-tab-underline"
                          className="absolute inset-x-0 bottom-0 h-px"
                          initial={false}
                          animate={{ opacity: 1 }}
                          style={{ backgroundColor: 'var(--accent)' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {/* Counter "01 / 05" on right */}
              <span
                aria-live="polite"
                className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#7a7064] lg:block"
              >
                {String(selectedIndex + 1).padStart(2, '0')} / {String(showcaseGarments.length).padStart(2, '0')}
              </span>
            </div>

            {/* --- Stage (rail + garments) --- */}
            <div
              id="audience-rack"
              ref={stageRef}
              role="tabpanel"
              aria-labelledby={`audience-tab-${audience.id}`}
              className="products-stage relative mt-8 overflow-x-auto overflow-y-hidden overscroll-x-contain sm:mt-10 lg:overflow-visible"
            >
              {/* Keep the freestanding rack uprights visible while the garment row scrolls on narrow screens. */}
              <div aria-hidden="true" className="products-rack-sticky-frame pointer-events-none z-[1]">
                <div className="products-rack-floor-shadow absolute" />
                <div className="products-rack-upright products-rack-upright-left absolute" />
                <div className="products-rack-upright products-rack-upright-right absolute" />
                <div className="products-rack-foot products-rack-foot-left absolute" />
                <div className="products-rack-foot products-rack-foot-right absolute" />
              </div>

              {/* Inner wrapper ensures min-width for mobile scroll */}
              <div className="products-stage-inner relative mx-auto" style={{ minWidth: '600px' }}>
                {/* --- Background layer D: Spotlights with parallax (±10px) --- */}
                <motion.div
                  className="pointer-events-none absolute -top-6 bottom-0 left-0 right-0 z-0"
                  style={{
                    x: spotlightShiftX,
                    maskImage:
                      'linear-gradient(to bottom, transparent 0%, #000 20%, #000 70%, transparent 100%)',
                    WebkitMaskImage:
                      'linear-gradient(to bottom, transparent 0%, #000 20%, #000 70%, transparent 100%)',
                  }}
                >
                  <div
                    className="h-full px-[6%]"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {showcaseGarments.map((garment, i) => {
                      const isHovered = hoveredGarment?.index === i;
                      const isItemSel = selectedIndex === i;

                      // Hovered item gets full spotlight (1.0), others dim (0.3).
                      // When not hovered, selected item gets 1.0, others 0.45.
                      let targetOpacity = 0.45;
                      if (hoveredGarment !== null) {
                        targetOpacity = isHovered ? 1.0 : 0.25;
                      } else if (isItemSel) {
                        targetOpacity = 1.0;
                      }

                      return (
                        <div
                          key={`spotlight-${garment.id}`}
                          className="relative h-full"
                          style={{
                            width: 'calc(100% / 5)',
                            flex: '0 0 calc(100% / 5)',
                          }}
                        >
                          <motion.div
                            className="absolute inset-x-0 top-0 h-[88%]"
                            initial={{ opacity: targetOpacity }}
                            animate={{ opacity: targetOpacity }}
                            transition={{ duration: reducedMotion ? 0.15 : 0.3, ease: 'easeOut' }}
                            style={{
                              background:
                                'radial-gradient(ellipse 55% 75% at 50% 10%, rgba(255,246,222,.55), transparent 70%)',
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* --- Rail Shadow on wall (behind rail, offset 14px down, 25% opacity) --- */}
                <div
                  className="products-rail-shadow pointer-events-none absolute z-[1]"
                  style={{
                    left: 0,
                    right: 0,
                    top: 'var(--hook-offset, 18px)',
                    height: '14px',
                    borderRadius: '999px',
                    transform: 'translateY(14px)',
                    filter: 'blur(8px)',
                    opacity: 0.25,
                    background: 'rgba(60,40,10,.5)',
                  }}
                />

                {/* --- THE RAIL (Spans full panel content width, z-index 2) --- */}
                <motion.div
                  className="products-rail pointer-events-none absolute z-[2]"
                  style={{
                    left: 0,
                    right: 0,
                    top: 'var(--hook-offset, 18px)',
                    height: '14px',
                    borderRadius: '999px',
                  }}
                  initial={
                    reducedMotion
                      ? { opacity: 0, clipPath: 'inset(0 0% 0 0)' }
                      : { clipPath: 'inset(0 100% 0 0)' }
                  }
                  animate={
                    reducedMotion
                      ? isInView
                        ? { opacity: 1, clipPath: 'inset(0 0% 0 0)' }
                        : { opacity: 0, clipPath: 'inset(0 0% 0 0)' }
                      : isInView
                      ? { clipPath: 'inset(0 0% 0 0)' }
                      : { clipPath: 'inset(0 100% 0 0)' }
                  }
                  transition={
                    reducedMotion
                      ? { opacity: { duration: 0.15 }, clipPath: { duration: 0 } }
                      : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
                  }
                >
                  {/* Brass rail body */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-full"
                    style={{
                      background:
                        'linear-gradient(180deg,#f3e4bf 0%,#d6b97a 28%,#a98a4a 55%,#7a6232 78%,#c9aa68 100%)',
                      boxShadow:
                        'inset 0 1px 0 rgba(255,255,255,.55), 0 10px 14px -6px rgba(60,40,10,.35), 0 1px 0 rgba(0,0,0,.15)',
                    }}
                  >
                    {/* Brushed texture overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'repeating-linear-gradient(90deg, rgba(255,255,255,.06) 0 1px, transparent 1px 3px)',
                      }}
                    />

                    {/* Rail shine sweep (A & B): 120px wide highlight moving left to right */}
                    {!reducedMotion && (
                      <motion.div
                        key={`rail-shine-${shineKey}`}
                        className="pointer-events-none absolute bottom-0 top-0 w-[120px]"
                        style={{
                          background:
                            'linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent)',
                        }}
                        initial={{ x: '-120px' }}
                        animate={isInView ? { x: '1300px' } : { x: '-120px' }}
                        transition={{
                          duration: shineKey === 0 ? 1.1 : 0.9,
                          ease: 'easeInOut',
                          delay: shineKey === 0 ? 0.3 : 0,
                        }}
                      />
                    )}
                  </div>
                </motion.div>

                {/* --- TWO WALL FLANGES (Left and Right end caps, z-index 2) --- */}
                {/* Left wall flange */}
                <motion.div
                  className="pointer-events-none absolute z-[2]"
                  style={{
                    left: 0,
                    top: 'calc(var(--hook-offset, 18px) + 5px)',
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={reducedMotion ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : reducedMotion ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 0.8 }
                  }
                  transition={
                    reducedMotion
                      ? { opacity: { duration: 0.15 }, scale: { duration: 0 } }
                      : { delay: 0.3, duration: 0.3, ease: 'easeOut' }
                  }
                >
                  <RailFlangeCircle />
                </motion.div>

                {/* Right wall flange */}
                <motion.div
                  className="pointer-events-none absolute z-[2]"
                  style={{
                    left: '100%',
                    top: 'calc(var(--hook-offset, 18px) + 5px)',
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={reducedMotion ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : reducedMotion ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 0.8 }
                  }
                  transition={
                    reducedMotion
                      ? { opacity: { duration: 0.15 }, scale: { duration: 0 } }
                      : { delay: 0.3, duration: 0.3, ease: 'easeOut' }
                  }
                >
                  <RailFlangeCircle />
                </motion.div>

                {/* --- GARMENTS ROW (z-index 3, in FRONT of rail, with parallax shift) --- */}
                <motion.div
                  style={{ x: garmentShiftX }}
                  className="relative z-[3] w-full"
                >
                  {/* AnimatePresence for Tab Switch (B) */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`audience-grid-${audience.id}`}
                      role="listbox"
                      aria-label={`Select a ${audience.label} garment category`}
                      aria-activedescendant={selectedGarment.id}
                      className="products-garments-row relative flex justify-center px-[6%]"
                      style={{ '--item-count': rackGarments.length } as React.CSSProperties}
                    >
                      {rackGarments.map(({ garment, index: garmentIdx }) => {
                        const isSelected = selectedIndex === garmentIdx;
                        const isHovered = hoveredGarment?.index === garmentIdx;
                        const hasHover = hoveredGarment !== null;

                        return (
                          <GarmentItem
                            key={garment.id}
                            garment={garment}
                            index={garmentIdx}
                            isSelected={isSelected}
                            isHovered={isHovered}
                            hasHover={hasHover}
                            hoverDir={hoveredGarment?.dir ?? 1}
                            prefersReduced={reducedMotion}
                            isSectionVisible={isSectionVisible}
                            isPageVisible={isPageVisible}
                            isInView={isInView}
                            btnRef={(node) => {
                              garmentRefs.current[garmentIdx] = node;
                            }}
                            onSelect={() => selectGarment(garmentIdx)}
                            onKeyDown={(e) => handleGarmentKeyDown(e, garmentIdx)}
                            onPointerEnter={(e) => {
                              if (!supportsFineHover || e.pointerType === 'touch') return;
                              const rect = e.currentTarget.getBoundingClientRect();
                              const enterX = e.clientX - rect.left;
                              const dir = enterX < rect.width / 2 ? 1 : -1;
                              setPointerHoveredGarment({ index: garmentIdx, dir });
                            }}
                            onPointerLeave={() => setPointerHoveredGarment(null)}
                            onFocus={(e) => {
                              if (supportsFineHover && e.currentTarget.matches(':focus-visible')) {
                                setFocusedGarment({ index: garmentIdx, dir: 1 });
                              }
                            }}
                            onBlur={() => setFocusedGarment(null)}
                          />
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>

            {/* Mobile swipe hint */}
            <p className="mt-2 text-center text-[9px] text-[#88867f] sm:hidden">
              Swipe the rack, or explore all {showcaseGarments.length} styles below
            </p>

            <div className="products-selector-wrap mt-4 border-t border-charcoal/10 pt-3 sm:mt-5 sm:pt-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6e6456]">Explore this range</p>
                <span className="font-mono text-[9px] tracking-[0.1em] text-[#52483a]">{String(selectedIndex + 1).padStart(2, '0')} / {String(showcaseGarments.length).padStart(2, '0')}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous garment"
                  onClick={() => stepGarment(-1)}
                  className="products-stepper hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#5b4a34]/25 bg-white/65 text-[#544630] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#907348] sm:flex"
                >
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                </button>
                <div className="products-selector flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1" role="group" aria-label={`Choose a ${audience.label} garment`}>
                  {showcaseGarments.map((garment, index) => {
                    const selected = selectedIndex === index;
                    return (
                      <button
                        key={garment.id}
                        type="button"
                        aria-pressed={selected}
                        aria-label={`Show ${garment.name}`}
                        onClick={() => selectGarment(index)}
                        className="products-selector-item group flex min-w-[132px] flex-1 items-center gap-2 rounded-lg border px-2 py-1.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#907348] sm:min-w-[148px]"
                        data-active={selected || undefined}
                      >
                        <span className="relative h-12 w-10 shrink-0 overflow-hidden rounded-md bg-[#eee9df]">
                          <Image src={garment.views.front} alt="" fill sizes="40px" className="object-contain" />
                        </span>
                        <span className="line-clamp-2 text-[9px] font-medium leading-[1.35] text-[#514a40]">{garment.name}</span>
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  aria-label="Next garment"
                  onClick={() => stepGarment(1)}
                  className="products-stepper hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#5b4a34]/25 bg-white/65 text-[#544630] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#907348] sm:flex"
                >
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ======================== PRODUCT DETAIL ======================== */}
        <AnimatePresence mode="wait">
          <motion.article
            ref={detailRef}
            key={selectedGarment.id}
            id="selected-garment-details"
            aria-live="polite"
            aria-atomic="true"
            tabIndex={-1}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={reducedMotion ? { duration: 0.15 } : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="products-detail mt-5 grid overflow-hidden sm:mt-7 lg:grid-cols-[minmax(300px,0.88fr)_1.12fr]"
          >
            <div className="products-detail-gallery p-3 sm:p-5">
              <div className="products-detail-visual relative min-h-[280px] overflow-hidden sm:min-h-[370px]">
                <div className="products-detail-light" aria-hidden="true" />
                {selectedViewImage ? (
                  <div
                    className="products-viewer-frame relative mx-auto h-[280px] w-full max-w-[420px] select-none sm:h-[370px]"
                    onPointerDown={handleViewerPointerDown}
                    onPointerMove={handleViewerPointerMove}
                    onPointerUp={handleViewerPointerEnd}
                    onPointerCancel={handleViewerPointerEnd}
                    style={{ touchAction: availableViews.length > 1 ? 'pan-y' : 'auto' }}
                  >
                    <div className={"relative h-full w-full transition-transform duration-300 " + (isZoomed ? "scale-[1.28]" : "scale-100")}>
                      <BrandingGarmentArtwork
                        garment={selectedGarment}
                        imageSource={selectedViewImage}
                        alt={selectedGarment.name + " — " + GARMENT_ANGLE_LABELS[selectedView] + " view"}
                        sizes="(max-width: 1023px) 88vw, 420px"
                        imageClassName="products-detail-image"
                      />
                    </div>
                  </div>
                ) : (
                  <div role="status" className="products-angle-placeholder absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-[#8c7858]/25 bg-white/50 text-[#78684d]">
                      <Camera aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <span className="mt-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6d5d44]">
                      {GARMENT_ANGLE_LABELS[selectedView]} image needed
                    </span>
                    <span className="mt-2 max-w-[260px] text-xs leading-5 text-[#62594c]">
                      Supply a real view of this same style to enable inspection from this angle.
                    </span>
                  </div>
                )}

                <span className="absolute bottom-3 left-3 rounded-full border border-[#746247]/20 bg-[#f7f2e8]/85 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#514735]">
                  {GARMENT_ANGLE_LABELS[selectedView]} view
                </span>
                <button
                  type="button"
                  onClick={() => setIsZoomed((value) => !value)}
                  disabled={!selectedViewImage}
                  aria-label={isZoomed ? "Zoom out of garment image" : "Zoom in on garment image"}
                  className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-[#746247]/20 bg-[#f7f2e8]/90 text-[#514735] shadow-sm transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#907348]"
                >
                  {isZoomed ? <ZoomOut aria-hidden="true" className="h-4 w-4" /> : <ZoomIn aria-hidden="true" className="h-4 w-4" />}
                </button>
              </div>

              <div role="group" aria-label="Choose a garment view" className="products-angle-controls mt-3 grid grid-cols-5 gap-1.5">
                {GARMENT_VIEW_ORDER.map((angle) => {
                  const isAvailable = !!garmentView(selectedGarment, angle);
                  const isActive = selectedView === angle;
                  return (
                    <button
                      key={angle}
                      type="button"
                      aria-pressed={isActive}
                      aria-label={isAvailable ? "Show " + GARMENT_ANGLE_LABELS[angle] + " view" : GARMENT_ANGLE_LABELS[angle] + " image not supplied"}
                      onClick={() => {
                        setSelectedView(angle);
                        setIsZoomed(false);
                      }}
                      className="products-angle-button min-h-10 rounded-md border px-1 py-2 text-[8px] font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#907348]"
                      data-active={isActive || undefined}
                      data-available={isAvailable || undefined}
                    >
                      {GARMENT_ANGLE_LABELS[angle]}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 flex items-start gap-2 text-[9px] leading-4 text-[#70685b]">
                <RotateCw aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {availableViews.length > 1
                  ? "Drag the image to inspect supplied angles."
                  : "Only the front image is supplied. Back, side and close-up views require real matching garment photos; no 2D rotation is used."}
              </p>
            </div>

            <div className="products-detail-info flex flex-col bg-[#f8f6f1] px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#806942]">
                {selectedGarment.category}
              </p>
              <h3 className="mt-2 max-w-2xl font-serif text-[clamp(1.75rem,2.6vw,2.55rem)] font-medium leading-[1.05] tracking-[-0.035em] text-[#26241f]">
                {selectedGarment.name}
              </h3>
              <p className="mt-3 max-w-2xl text-[13px] leading-6 text-[#514d45] sm:text-sm">
                {selectedGarment.description}
              </p>

              <section aria-label="Product overview" className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-[#31291e]/10 py-4">
                <div className="min-w-0">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#82745e]">Garment type</p>
                  <p className="mt-1 text-[11px] font-medium leading-4 text-[#36332c]">{garmentTypeFor(selectedGarment.name)}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#82745e]">Silhouette</p>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-[#514d45]">
                    {selectedGarment.construction.split(';')[0]?.replace(/[.]$/, '') || 'To be discussed with buyer'}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#82745e]">Material preference</p>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-[#514d45]">{selectedFabric || 'To be discussed'}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#82745e]">Customisation</p>
                  <p className="mt-1 text-[11px] leading-4 text-[#514d45]">
                    {selectedPreferenceCount ? `${selectedPreferenceCount} buyer preferences selected` : 'Buyer-led'}
                  </p>
                </div>
              </section>

              <div className="mt-1 divide-y divide-[#31291e]/10 border-b border-[#31291e]/10">
                <section>
                  <button
                    type="button"
                    aria-expanded={isDesignDetailsOpen}
                    aria-controls="product-design-details"
                    onClick={() => setIsDesignDetailsOpen((open) => !open)}
                    className="flex min-h-12 w-full items-center justify-between gap-4 py-3 text-left text-[12px] font-medium text-[#302d27] transition-colors hover:text-[#806942] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#907348]"
                  >
                    <span>Design Details</span>
                    <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-[#8f7449] transition-transform duration-200 ${isDesignDetailsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <motion.div
                    id="product-design-details"
                    aria-hidden={!isDesignDetailsOpen}
                    inert={!isDesignDetailsOpen}
                    initial={false}
                    animate={{ height: isDesignDetailsOpen ? 'auto' : 0, opacity: isDesignDetailsOpen ? 1 : 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.22, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 pr-2">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#82745e]">Construction &amp; finish</p>
                      <p className="mt-1.5 max-w-2xl text-[11px] leading-5 text-[#514d45]">{selectedGarment.construction}</p>
                    </div>
                  </motion.div>
                </section>

                <section>
                  <button
                    type="button"
                    aria-expanded={isCustomiseDesignOpen}
                    aria-controls="product-customise-design"
                    onClick={() => setIsCustomiseDesignOpen((open) => !open)}
                    className="flex min-h-12 w-full items-center justify-between gap-4 py-3 text-left text-[12px] font-medium text-[#302d27] transition-colors hover:text-[#806942] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#907348]"
                  >
                    <span>Customise This Design</span>
                    <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-[#8f7449] transition-transform duration-200 ${isCustomiseDesignOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <motion.div
                    id="product-customise-design"
                    aria-hidden={!isCustomiseDesignOpen}
                    inert={!isCustomiseDesignOpen}
                    initial={false}
                    animate={{ height: isCustomiseDesignOpen ? 'auto' : 0, opacity: isCustomiseDesignOpen ? 1 : 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.22, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 pt-1">
                      <div className="grid gap-x-3 gap-y-3 sm:grid-cols-2">
                        <BuyerPreferenceSelect
                          id="garment-material-preference"
                          label="Material preference"
                          value={selectedFabric}
                          options={selectedGarment.fabricOptions}
                          onChange={setSelectedFabric}
                        />
                        <BuyerPreferenceSelect
                          id="garment-weight-preference"
                          label="Fabric weight preference"
                          value={selectedFabricWeight}
                          options={FABRIC_WEIGHT_PREFERENCES}
                          onChange={setSelectedFabricWeight}
                        />
                        <BuyerPreferenceSelect
                          id="garment-fit-preference"
                          label="Fit preference"
                          value={selectedFitPreference}
                          options={FIT_PREFERENCES}
                          onChange={setSelectedFitPreference}
                        />
                        <BuyerPreferenceSelect
                          id="garment-branding-preference"
                          label="Branding preference"
                          value={selectedBrandingPreference}
                          options={BRANDING_PREFERENCES}
                          onChange={setSelectedBrandingPreference}
                        />
                        <BuyerPreferenceSelect
                          id="garment-label-trim-preference"
                          label="Labels & trims"
                          value={selectedLabelTrimPreference}
                          options={LABEL_TRIM_PREFERENCES}
                          onChange={setSelectedLabelTrimPreference}
                        />
                      </div>

                      <fieldset className="mt-4">
                        <legend className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#746b5d]">Colour preference</legend>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {selectedGarment.colorways.map((color) => {
                            const isActive = selectedColor === color.name;
                            return (
                              <button
                                key={color.name}
                                type="button"
                                aria-pressed={isActive}
                                aria-label={`Choose ${color.name} colourway`}
                                onClick={() => setSelectedColor(isActive ? '' : color.name)}
                                className="products-colorway inline-flex min-h-9 items-center gap-2 rounded-full border px-2.5 py-1 text-left text-[9px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#907348]"
                                data-active={isActive || undefined}
                              >
                                <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-black/10" style={{ backgroundColor: color.swatch }} />
                                <span>{color.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>

                      <fieldset className="mt-4">
                        <legend className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#746b5d]">Design details to discuss</legend>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {selectedGarment.customizationOptions.map((option) => {
                            const isActive = selectedCustomizations.includes(option);
                            return (
                              <button
                                key={option}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => setSelectedCustomizations((current) => isActive ? current.filter((value) => value !== option) : [...current, option])}
                                className="products-customization min-h-8 rounded-full border px-2.5 py-1 text-[9px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#907348]"
                                data-active={isActive || undefined}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>
                      <p className="mt-3 text-[9px] leading-4 text-[#777064]">Selections are preferences for discussion; material, weight, fit, branding and trim details are agreed with the buyer.</p>
                    </div>
                  </motion.div>
                </section>
              </div>

              <p className="mt-4 text-[10px] leading-4 text-[#756b5a]">
                <span className="font-semibold uppercase tracking-[0.11em] text-[#82745e]">Design inspiration</span>
                <span aria-hidden="true"> · </span>
                {selectedGarment.designReference?.url ? (
                  <a href={selectedGarment.designReference.url} target="_blank" rel="noreferrer" className="underline decoration-[#b2986d]/50 underline-offset-2 transition-colors hover:text-[#806942]">
                    {selectedGarment.designReference.label}
                  </a>
                ) : (
                  <span>{selectedGarment.designReference?.label ?? 'To be discussed with buyer'}</span>
                )}
                <span> · editorial reference, independent concept</span>
              </p>

              <div className="mt-auto pt-5">
                <p className="text-[9px] leading-4 text-[#777064]">Your selections will travel with the enquiry. Final specifications remain buyer-confirmed.</p>
                <button
                  type="button"
                  onClick={enquireAboutStyle}
                  className="group mt-3 flex min-h-12 w-full items-center justify-between gap-4 bg-[#292720] px-5 text-[9px] font-semibold uppercase tracking-[0.17em] text-white transition-colors hover:bg-[#514532] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#907348] motion-reduce:transition-none"
                >
                  <span>Request a quote</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
                </button>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        <p className="mt-4 text-center text-[9px] leading-relaxed text-[#88867f] sm:text-[10px]">
          Knit and woven apparel categories for men, women, children, toddlers and newborns.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Garment Item Component (Handles Entrance, Exit, Pendulum, Hover)  */
/* ------------------------------------------------------------------ */
interface GarmentItemProps {
  garment: GarmentReference;
  index: number;
  isSelected: boolean;
  isHovered: boolean;
  hasHover: boolean;
  hoverDir: number;
  prefersReduced: boolean;
  isSectionVisible: boolean;
  isPageVisible: boolean;
  isInView: boolean;
  btnRef: (node: HTMLButtonElement | null) => void;
  onSelect: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  onPointerEnter: (e: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerLeave: () => void;
  onFocus: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur: () => void;
}

interface BrandingGarmentArtworkProps {
  garment: GarmentReference;
  imageSource: string;
  alt: string;
  sizes: string;
  imageClassName?: string;
  priority?: boolean;
}

function BrandingGarmentArtwork({
  garment,
  imageSource,
  alt,
  sizes,
  imageClassName,
  priority,
}: BrandingGarmentArtworkProps) {
  const hasDetailImageHanger = imageSource === garment.detailFrontImage;

  return (
    <div className="relative h-full w-full">
      {garment.hasHanger === false && !hasDetailImageHanger && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-[19%] top-0 z-0 h-[45%] w-[62%] overflow-visible"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M50 18c-4-3-5-6-3-9 1.5-3 6-2 6 1s-3 5-3 8L15 42v5h70v-5L50 18Z"
            stroke="#786a54"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity=".9"
          />
        </svg>
      )}
      <div className={`absolute inset-x-0 bottom-0 ${garment.hasHanger === false && !hasDetailImageHanger ? 'top-[12%]' : 'top-0'}`}>
        <Image
          src={imageSource}
          alt={alt}
          fill
          sizes={sizes}
          className={`${imageClassName ?? ''} relative z-10 object-contain`}
          priority={priority}
        />
      </div>
    </div>
  );
}

function ShowcaseGarmentArtwork({ garment, priority }: { garment: GarmentReference; priority: boolean }) {
  const fit = garment.showcaseFit;
  const hasCompleteShowcaseImage = Boolean(garment.showcaseImage);

  return (
    <div className="relative h-full w-full">
      <div
        className="absolute bottom-0 z-10"
        style={{
          top: `${hasCompleteShowcaseImage ? fit?.showcaseImageTop ?? 0 : fit?.imageTop ?? 32}%`,
          left: '50%',
          width: `${hasCompleteShowcaseImage ? fit?.showcaseImageWidth ?? 100 : fit?.imageWidth ?? 100}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <Image
          src={garment.showcaseImage ?? garment.views.front}
          alt=""
          fill
          sizes="(max-width: 767px) 22vw, 16rem"
          className="products-garment-img relative z-10 object-contain"
          priority={priority}
        />
      </div>
    </div>
  );
}

function GarmentItem({
  garment,
  index,
  isSelected,
  isHovered,
  hasHover,
  hoverDir,
  prefersReduced,
  isSectionVisible,
  isPageVisible,
  isInView,
  btnRef,
  onSelect,
  onKeyDown,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
}: GarmentItemProps) {
  const [entranceSettled, setEntranceSettled] = useState(false);
  const [dropSettled, setDropSettled] = useState(false);
  const [cellAnimating, setCellAnimating] = useState(false);
  const [imageAnimating, setImageAnimating] = useState(false);
  const swingControls = useAnimationControls();

  // Alternating initial swing angle: ±6deg
  const initialRotate = index % 2 === 0 ? 6 : -6;

  // Neighbor state: when another garment is hovered
  const isNeighbor = hasHover && !isHovered;

  // Keep the active garment forward while leaving the rest of the rack readable.
  let itemOpacity = 0.76;
  if (isHovered || isSelected) {
    itemOpacity = 1.0;
  } else if (isNeighbor) {
    itemOpacity = 0.68;
  }

  // Keep the selected item's requested scale if it is also hovered.
  const garmentScale = garment.showcaseFit?.scale ?? garment.scale ?? 1;
  const currentScale = prefersReduced
    ? garmentScale
    : isSelected
      ? garmentScale * 1.1
      : isHovered
        ? garmentScale * 1.04
        : garmentScale;

  // Hover y displacement: -8px
  const targetY = prefersReduced || !entranceSettled ? 0 : isHovered ? -8 : 0;

  // Hover drop shadow: 0 26px 24px rgba(40,30,15,.28)
  const shadowFilter = (isHovered || isSelected) && !prefersReduced
    ? 'drop-shadow(0 0 1px rgba(173,135,68,.62)) drop-shadow(0 24px 22px rgba(40,30,15,.28))'
    : 'drop-shadow(0 14px 14px rgba(40,30,15,.22))';

  // Neighbor saturation: saturate(.92)

  const hiddenState = prefersReduced
    ? { opacity: 0, y: 0, rotate: 0 }
    : { opacity: 0, y: -28, rotate: initialRotate };
  const entranceOpacity = isInView && !dropSettled ? 1 : itemOpacity;
  const animateTarget = !isInView
    ? hiddenState
    : prefersReduced
      ? { opacity: entranceOpacity, y: 0, rotate: 0 }
      : { opacity: entranceOpacity, y: targetY, rotate: 0 };
  const shouldRunIdleOrHoverSwing =
    !prefersReduced && isInView && isSectionVisible && isPageVisible && entranceSettled;

  useEffect(() => {
    if (!isInView || dropSettled) return;
    const dropDurationMs = prefersReduced ? 150 : 400 + index * 70;
    const timer = setTimeout(() => setDropSettled(true), dropDurationMs);
    return () => clearTimeout(timer);
  }, [isInView, dropSettled, prefersReduced, index]);

  useEffect(() => {
    if (prefersReduced) {
      swingControls.stop();
      swingControls.set({ rotate: 0 });
      return;
    }

    if (!shouldRunIdleOrHoverSwing) {
      // Stop at the current angle so off-screen or hidden time does not advance the sway.
      swingControls.stop();
      return;
    }

    if (isHovered) {
      swingControls.start(
        { rotate: [0, hoverDir * 3, hoverDir * -2, 0] },
        { duration: 0.9, ease: 'easeInOut' }
      );
      return;
    }

    swingControls.start(
      { rotate: [-0.5, 0.5] },
      {
        duration: 5.5 + index * 0.4,
        delay: index * 0.3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: easeSineInOut,
      }
    );
  }, [
    prefersReduced,
    shouldRunIdleOrHoverSwing,
    isHovered,
    hoverDir,
    index,
    swingControls,
  ]);

  return (
    <motion.div
      className="products-garment-cell relative flex flex-col items-center"
      style={{
        width: 'calc(100% / 5)',
        flex: '0 0 calc(100% / 5)',
        transformOrigin: '50% 0%',
        transformStyle: 'preserve-3d',
        zIndex: isSelected ? 8 : isHovered ? 6 : 1,
        willChange: cellAnimating && !prefersReduced ? 'transform' : undefined,
      }}
      // Entrance & Exit animations (A & B)
      initial={hiddenState}
      animate={animateTarget}
      exit={
        prefersReduced
          ? { opacity: 0, y: 0, rotate: 0, transition: { opacity: { duration: 0.15 }, y: { duration: 0 }, rotate: { duration: 0 } } }
          : {
              opacity: 0,
              y: -12,
              rotate: 2,
              transition: {
                duration: 0.22,
                delay: index * 0.03,
                ease: 'easeInOut',
              },
            }
      }
      transition={
        prefersReduced
          ? {
              opacity: { duration: dropSettled ? 0 : 0.15 },
              y: { duration: 0 },
              rotate: { duration: 0 },
            }
          : {
              y: {
                duration: entranceSettled ? 0.24 : 0.4,
                delay: entranceSettled ? 0 : index * 0.07,
                ease: entranceSettled ? 'easeOut' : [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: dropSettled ? 0.12 : 0.35,
                delay: dropSettled ? 0 : index * 0.07,
                ease: 'easeOut',
              },
              // Pendulum Physics (C): underdamped spring: stiffness 38, damping 5.5, mass 1
              rotate: {
                type: 'spring',
                stiffness: 38,
                damping: 5.5,
                mass: 1,
                delay: entranceSettled ? 0 : index * 0.07 + 0.4,
              },
            }
      }
      onAnimationStart={() => {
        if (!prefersReduced) setCellAnimating(true);
      }}
      onAnimationComplete={() => {
        setCellAnimating(false);
        if (isInView) setEntranceSettled(true);
      }}
    >
      {/* Garment button with transform-origin at hook apex (50% 0%) */}
      <button
        id={garment.id}
        ref={btnRef}
        type="button"
        role="option"
        aria-selected={isSelected}
        aria-label={`Select ${garment.category}: ${garment.name}`}
        tabIndex={isSelected ? 0 : -1}
        onClick={onSelect}
        onKeyDown={onKeyDown}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        className="products-garment-btn group flex w-full flex-col items-center"
        data-active={isSelected || undefined}
        style={{
          transformOrigin: '50% 0%',
        }}
      >
        {/* Subtle Idle Sway (F) & Single Gentle Hover Swing (D) */}
        <motion.div
          className="w-full"
          style={{
            transformOrigin: '50% 0%',
            willChange: shouldRunIdleOrHoverSwing && !isHovered
              ? 'transform'
              : undefined,
          }}
          animate={swingControls}
        >
          {/* Garment image wrapper */}
          <div
            className="products-garment-image-wrap relative w-full"
            style={{
              height: `${GARMENT_WRAP_HEIGHT_DESKTOP}px`,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            {garment.showcaseArtOnly ? (
              <div className="relative h-[min(300px,34vh)] min-h-[190px] w-[min(88%,16rem)]">
                <motion.div
                  className="absolute inset-0 w-full"
                  initial={false}
                  animate={{
                    scale: currentScale,
                    filter: shadowFilter,
                    z: prefersReduced ? 0 : isSelected ? 38 : isHovered ? 14 : 0,
                  }}
                  style={{
                    transformOrigin: '50% 0%',
                    transformStyle: 'preserve-3d',
                    willChange: imageAnimating && !prefersReduced ? 'transform' : undefined,
                  }}
                  transition={
                    prefersReduced
                      ? { scale: { duration: 0 }, filter: { duration: 0 } }
                      : {
                          scale: { duration: 0.25, ease: 'easeOut' },
                          filter: { duration: 0.25, ease: 'easeOut' },
                        }
                  }
                  onAnimationStart={() => {
                    if (!prefersReduced) setImageAnimating(true);
                  }}
                  onAnimationComplete={() => setImageAnimating(false)}
                >
                  <ShowcaseGarmentArtwork garment={garment} priority={index === 0} />
                </motion.div>
              </div>
            ) : (
              <motion.div
                className="w-full"
                initial={false}
                animate={{
                  scale: currentScale,
                  filter: shadowFilter,
                  z: prefersReduced ? 0 : isSelected ? 38 : isHovered ? 14 : 0,
                }}
                style={{
                  transformOrigin: '50% 0%',
                  transformStyle: 'preserve-3d',
                  willChange: imageAnimating && !prefersReduced ? 'transform' : undefined,
                }}
                transition={
                  prefersReduced
                    ? { scale: { duration: 0 }, filter: { duration: 0 } }
                    : {
                        scale: { duration: 0.25, ease: 'easeOut' },
                        filter: { duration: 0.25, ease: 'easeOut' },
                      }
                }
                onAnimationStart={() => {
                  if (!prefersReduced) setImageAnimating(true);
                }}
                onAnimationComplete={() => setImageAnimating(false)}
              >
                <div className="relative h-[min(300px,34vh)] min-h-[190px] w-[min(78%,16rem)]">
                  <BrandingGarmentArtwork
                    garment={garment}
                    imageSource={garment.views.front}
                    alt=""
                    sizes="(max-width: 767px) 50vw, 16rem"
                    imageClassName="products-garment-img"
                    priority={index === 0}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </button>

      {/* --- LABEL ROW (Fixed height keeps garment titles aligned) --- */}
      <div
        className="products-garment-label-container"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%', // max-width 90% of cell
          height: '44px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="products-garment-label text-center"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textWrap: 'balance',
            textTransform: 'uppercase',
            fontSize: '11px',
            lineHeight: '1.25',
            letterSpacing: '0.16em',
            fontFamily: 'var(--font-inter)',
            fontWeight: isSelected || isHovered ? 600 : 500,
            color: isSelected || isHovered ? '#1a1814' : '#6b6256',
            transition: prefersReduced ? 'none' : 'color 200ms ease',
          }}
        >
          {garment.name}
        </span>

        {garment.isStyleConcept && (
          <span className="mt-0.5 text-[7px] font-semibold uppercase tracking-[0.14em] text-[#8a704b]">New edit</span>
        )}

        {/* Selected item gold line: shared layoutId so it slides between items (E) */}
        {prefersReduced ? (
          <motion.span
            className="absolute -bottom-1 h-px w-6"
            style={{ backgroundColor: 'var(--accent)' }}
            initial={false}
            animate={{ opacity: isSelected ? 1 : 0 }}
            transition={{ opacity: { duration: 0.15 } }}
          />
        ) : isSelected ? (
          <motion.span
            layoutId="active-garment-line"
            className="absolute -bottom-1 h-px w-6"
            style={{ backgroundColor: 'var(--accent)' }}
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          />
        ) : null}

        {/* Hovered non-selected line: grows from center scaleX 0->1 in 0.35s (D) */}
        {!isSelected && (
          <motion.span
            className="absolute -bottom-1 h-px w-6"
            style={{
              backgroundColor: 'var(--accent)',
              transformOrigin: 'center',
            }}
            initial={prefersReduced ? { opacity: 0 } : { scaleX: 0 }}
            animate={prefersReduced ? { opacity: isHovered ? 1 : 0 } : { scaleX: isHovered ? 1 : 0 }}
            transition={
              prefersReduced
                ? { opacity: { duration: 0.15 } }
                : { scaleX: { duration: 0.35, ease: 'easeOut' } }
            }
          />
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Rail Wall Flange (28px brass circle with inner highlight)          */
/* ------------------------------------------------------------------ */
function RailFlangeCircle() {
  return (
    <div
      style={{
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background:
          'linear-gradient(180deg,#f3e4bf 0%,#d6b97a 28%,#a98a4a 55%,#7a6232 78%,#c9aa68 100%)',
        boxShadow:
          'inset 0 2px 4px rgba(255,255,255,.4), inset 0 -1px 2px rgba(0,0,0,.15), 0 2px 4px rgba(60,40,10,.25)',
        position: 'relative',
      }}
    >
      {/* Inner highlight ring */}
      <div
        style={{
          position: 'absolute',
          inset: '4px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,.3)',
        }}
      />
    </div>
  );
}
