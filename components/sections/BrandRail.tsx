"use client";

import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'motion/react';
import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { CUSTOMER_BRANDS } from '@/src/data/company-content';
import generatedBrandAssets from '@/src/data/brands.generated.json';
import { getLogoSize } from '@/src/lib/brand-logo-size';

const assetBySlug = new Map(generatedBrandAssets.map((asset) => [asset.slug, asset]));
const brands = CUSTOMER_BRANDS.map((brand) => {
  const asset = assetBySlug.get(brand.slug);
  if (!asset) throw new Error(`Missing generated logo metadata for ${brand.slug}`);
  return {
    ...brand,
    aspect: asset.aspect,
    intrinsicWidth: asset.w,
    intrinsicHeight: asset.h,
  };
});

const rows = [
  brands.filter((_, index) => index % 2 === 0),
  brands.filter((_, index) => index % 2 === 1),
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const sineEase = (progress: number) => 0.5 - Math.cos(Math.PI * progress) / 2;
const wrapPercent = (value: number) => ((value % 50 + 50) % 50) - 50;
const subscribeHydration = () => () => {};
const getHydratedSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

function useHydrated() {
  return useSyncExternalStore(subscribeHydration, getHydratedSnapshot, getServerHydrationSnapshot);
}

function useMediaQuery(query: string) {
  const subscribe = useCallback((onChange: () => void) => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, [query]);
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function useDocumentHidden() {
  const subscribe = useCallback((onChange: () => void) => {
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);
  const getSnapshot = useCallback(() => document.visibilityState === 'hidden', []);
  const getServerSnapshot = useCallback(() => false, []);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

type Brand = (typeof brands)[number];

function BrandTile({
  brand,
  tileId,
  hovered,
  isReducedMotion,
}: {
  brand: Brand;
  tileId: string;
  hovered: boolean;
  isReducedMotion: boolean;
}) {
  const size = getLogoSize(brand.aspect);

  return (
    <motion.li
      className="brand-rail-tile-wrap"
      data-brand-tile-id={tileId}
      data-brand-slug={brand.slug}
      data-hovered={hovered ? 'true' : undefined}
      animate={
        hovered && !isReducedMotion
          ? { y: -6, scale: 1.03 }
          : { y: 0, scale: 1 }
      }
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <div className="brand-rail-tile">
        <div className="brand-rail-logo-zone">
          <Image
            src={`/brands/_processed/${brand.slug}.color.webp`}
            alt=""
            aria-hidden="true"
            width={brand.intrinsicWidth}
            height={brand.intrinsicHeight}
            unoptimized
            className="brand-rail-logo-img"
            style={{ width: size.width, height: 'auto' }}
            sizes={`${size.width}px`}
          />
        </div>
        <span className="brand-rail-label">{brand.name}</span>
      </div>
    </motion.li>
  );
}

function MarqueeFrameRunner({
  active,
  mobile,
  rowOneX,
  rowTwoX,
  setWidths,
  speedFactor,
  scrollVelocity,
}: {
  active: boolean;
  mobile: boolean;
  rowOneX: MotionValue<number>;
  rowTwoX: MotionValue<number>;
  setWidths: [number, number];
  speedFactor: MotionValue<number>;
  scrollVelocity: MotionValue<number>;
}) {
  useAnimationFrame((_, delta) => {
    if (!active || delta <= 0 || setWidths[0] <= 0 || setWidths[1] <= 0) return;

    const scrollBoost = 1 + Math.min(Math.abs(scrollVelocity.get()) / 1200, 2.2);
    const factor = speedFactor.get() * scrollBoost;
    const scale = mobile ? 0.8 : 1;
    const deltaSeconds = delta / 1000;
    // The animated percentage is relative to the doubled track; half its width is one set.
    const rowOneDelta = ((40 * scale * factor * deltaSeconds) / (setWidths[0] * 2)) * 100;
    const rowTwoDelta = ((34 * scale * factor * deltaSeconds) / (setWidths[1] * 2)) * 100;

    const nextOne = rowOneX.get() - rowOneDelta;
    rowOneX.set(nextOne < -50 ? wrapPercent(nextOne) : nextOne);

    const nextTwo = rowTwoX.get() + rowTwoDelta;
    rowTwoX.set(nextTwo > 0 ? wrapPercent(nextTwo) : nextTwo);
  });

  return null;
}

export function BrandRail() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const ambientControlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const ambientVisibilityRef = useRef({ inView: false, hidden: false });
  const preloadStarted = useRef(false);
  const entranceStarted = useRef(false);
  const scrollIdleTimer = useRef<number | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.05 });
  const entered = useInView(sectionRef, { amount: 0.35, once: true });
  const hasHydrated = useHydrated();
  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const largeFinePointer = useMediaQuery('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
  const mobile = useMediaQuery('(max-width: 767px)');
  const documentHidden = useDocumentHidden();
  const { scrollY } = useScroll();
  const rawScrollVelocity = useVelocity(scrollY);
  const scrollVelocityTarget = useMotionValue(0);
  const smoothScrollVelocity = useSpring(scrollVelocityTarget, { stiffness: 400, damping: 50 });

  const rowOneX = useMotionValue(0);
  const rowTwoX = useMotionValue(-25);
  const rowOneTransform = useTransform(rowOneX, (value) => `${value}%`);
  const rowTwoTransform = useTransform(rowTwoX, (value) => `${value}%`);
  const speedFactor = useSpring(0, { stiffness: 60, damping: 20 });
  const lightXRaw = useMotionValue(0);
  const lightYRaw = useMotionValue(0);
  const lightX = useSpring(lightXRaw, { stiffness: 140, damping: 22 });
  const lightY = useSpring(lightYRaw, { stiffness: 140, damping: 22 });
  const lightOpacity = useMotionValue(0);
  const pauseXRaw = useMotionValue(0);
  const pauseYRaw = useMotionValue(0);
  const pauseX = useSpring(pauseXRaw, { stiffness: 300, damping: 24 });
  const pauseY = useSpring(pauseYRaw, { stiffness: 300, damping: 24 });

  const [count, setCount] = useState(brands.length);
  const [countAnimationComplete, setCountAnimationComplete] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [hoveredTileId, setHoveredTileId] = useState<string | null>(null);
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);
  const [setWidths, setSetWidths] = useState<[number, number]>([0, 0]);
  const [setElements, setSetElements] = useState<[HTMLUListElement | null, HTMLUListElement | null]>([null, null]);
  const [marqueeStarted, setMarqueeStarted] = useState(false);
  const [frameActive, setFrameActive] = useState(false);

  const motionAllowed = hasHydrated && !isReducedMotion;
  const pointerHoverEnabled = largeFinePointer;

  useEffect(() => {
    ambientVisibilityRef.current = { inView: isInView, hidden: documentHidden };
  }, [documentHidden, isInView]);

  useMotionValueEvent(rawScrollVelocity, 'change', (velocity) => {
    scrollVelocityTarget.set(velocity);
    if (scrollIdleTimer.current !== null) window.clearTimeout(scrollIdleTimer.current);
    scrollIdleTimer.current = window.setTimeout(() => {
      scrollVelocityTarget.set(0);
      scrollIdleTimer.current = null;
    }, 120);
  });

  useEffect(() => () => {
    if (scrollIdleTimer.current !== null) window.clearTimeout(scrollIdleTimer.current);
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rowIndex = Number((entry.target as HTMLElement).dataset.rowIndex);
        const nextWidth = entry.contentRect.width;
        if (rowIndex !== 0 && rowIndex !== 1) continue;
        setSetWidths((current) => {
          if (current[rowIndex] === nextWidth) return current;
          const next: [number, number] = [...current] as [number, number];
          next[rowIndex] = nextWidth;
          return next;
        });
      }
    });

    setElements.forEach((set) => {
      if (set) observer.observe(set);
    });

    return () => observer.disconnect();
  }, [setElements]);

  useEffect(() => {
    if (!isInView || preloadStarted.current) return;
    preloadStarted.current = true;

    const preloadImages: HTMLImageElement[] = [];
    const preload = () => {
      for (const brand of brands) {
        const image = new window.Image();
        image.fetchPriority = 'low';
        image.src = `/brands/_processed/${brand.slug}.color.webp`;
        preloadImages.push(image);
      }
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    if (idleWindow.requestIdleCallback) {
      idleWindow.requestIdleCallback(preload, { timeout: 1200 });
      return;
    }

    window.setTimeout(preload, 0);
  }, [isInView]);

  useEffect(() => {
    if (isReducedMotion) {
      speedFactor.jump(0);
      const resetFrame = window.requestAnimationFrame(() => {
        setCount(brands.length);
        setCountAnimationComplete(true);
      });
      return () => window.cancelAnimationFrame(resetFrame);
    }
    if (!motionAllowed || !entered || entranceStarted.current) return;

    entranceStarted.current = true;
    let countControls: ReturnType<typeof animate> | null = null;
    const countFrame = window.requestAnimationFrame(() => {
      setCountAnimationComplete(false);
      setCount(0);
      countControls = animate(0, brands.length, {
        duration: 1.4,
        ease: 'easeOut',
        onUpdate: (value) => setCount(Math.round(value)),
        onComplete: () => setCountAnimationComplete(true),
      });
    });
    const marqueeTimer = window.setTimeout(() => setMarqueeStarted(true), 1400);

    return () => {
      window.cancelAnimationFrame(countFrame);
      countControls?.stop();
      window.clearTimeout(marqueeTimer);
      entranceStarted.current = false;
    };
  }, [entered, isReducedMotion, motionAllowed, speedFactor]);

  const speedTarget = useMemo(() => {
    if (!motionAllowed || !marqueeStarted || !isInView || paused || documentHidden) return 0;
    return hoveredTrack === null ? 1 : 0.12;
  }, [documentHidden, hoveredTrack, isInView, marqueeStarted, motionAllowed, paused]);

  useEffect(() => {
    speedFactor.set(speedTarget);
  }, [speedFactor, speedTarget]);

  useEffect(() => {
    const shouldKeepRunning = motionAllowed && marqueeStarted && isInView && !documentHidden;
    if (shouldKeepRunning) {
      const activateFrame = window.requestAnimationFrame(() => setFrameActive(true));
      return () => window.cancelAnimationFrame(activateFrame);
    }
    if (!frameActive) return;
    if (isReducedMotion || speedFactor.get() <= 0.005) {
      const deactivateFrame = window.requestAnimationFrame(() => setFrameActive(false));
      return () => window.cancelAnimationFrame(deactivateFrame);
    }

    const unsubscribe = speedFactor.on('change', (value) => {
      if (value <= 0.005) {
        unsubscribe();
        setFrameActive(false);
      }
    });
    return unsubscribe;
  }, [documentHidden, frameActive, isInView, isReducedMotion, marqueeStarted, motionAllowed, speedFactor]);

  useEffect(() => {
    if (!motionAllowed || isReducedMotion || !ambientRef.current) return;
    const controls = animate(
      ambientRef.current,
      { x: ['-3%', '3%'], y: ['2%', '-2%'] },
      { duration: 24, ease: sineEase, repeat: Infinity, repeatType: 'reverse' },
    );
    ambientControlsRef.current = controls;
    if (ambientVisibilityRef.current.hidden || !ambientVisibilityRef.current.inView) controls.pause();
    return () => {
      controls.stop();
      ambientControlsRef.current = null;
    };
  }, [isReducedMotion, motionAllowed]);

  useEffect(() => {
    const controls = ambientControlsRef.current;
    if (!controls) return;
    if (documentHidden || !isInView) controls.pause();
    else controls.play();
  }, [documentHidden, isInView]);

  const lightOpacityAnimation = useRef<ReturnType<typeof animate> | null>(null);
  const handleRowsPointerEnter = useCallback(() => {
    if (!largeFinePointer || isReducedMotion) return;
    lightOpacityAnimation.current?.stop();
    lightOpacityAnimation.current = animate(lightOpacity, 1, { duration: 0.3, ease: 'easeOut' });
  }, [isReducedMotion, lightOpacity, largeFinePointer]);

  const handleRowsPointerLeave = useCallback(() => {
    setHoveredTrack(null);
    setHoveredSlug(null);
    setHoveredTileId(null);
    pauseXRaw.set(0);
    pauseYRaw.set(0);
    lightOpacityAnimation.current?.stop();
    lightOpacityAnimation.current = animate(lightOpacity, 0, { duration: 0.3, ease: 'easeOut' });
  }, [lightOpacity, pauseXRaw, pauseYRaw]);

  const handleRowsPointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!largeFinePointer || event.pointerType !== 'mouse' || !rowsRef.current) return;
    const bounds = rowsRef.current.getBoundingClientRect();
    lightXRaw.set(event.clientX - bounds.left);
    lightYRaw.set(event.clientY - bounds.top);
  }, [largeFinePointer, lightXRaw, lightYRaw]);

  const handleTrackPointerOver = useCallback((event: ReactPointerEvent<HTMLElement>, rowIndex: number) => {
    if (!pointerHoverEnabled || event.pointerType !== 'mouse') return;
    setHoveredTrack(rowIndex);
    const tile = event.target instanceof Element
      ? event.target.closest<HTMLElement>('[data-brand-tile-id]')
      : null;
    const tileId = tile?.dataset.brandTileId ?? null;
    setHoveredTileId(tileId);
    setHoveredSlug(tile?.dataset.brandSlug ?? null);
  }, [pointerHoverEnabled]);

  const handleTrackPointerLeave = useCallback(() => {
    setHoveredTrack(null);
    setHoveredSlug(null);
    setHoveredTileId(null);
  }, []);

  const handlePausePointerMove = useCallback((event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!largeFinePointer || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left - bounds.width / 2) * 0.2;
    const offsetY = (event.clientY - bounds.top - bounds.height / 2) * 0.2;
    pauseXRaw.set(Math.max(-6, Math.min(6, offsetX)));
    pauseYRaw.set(Math.max(-6, Math.min(6, offsetY)));
  }, [largeFinePointer, pauseXRaw, pauseYRaw]);

  const setRowOneRef = useCallback((node: HTMLUListElement | null) => {
    setSetElements((current) => current[0] === node ? current : [node, current[1]]);
  }, []);
  const setRowTwoRef = useCallback((node: HTMLUListElement | null) => {
    setSetElements((current) => current[1] === node ? current : [current[0], node]);
  }, []);
  const firstSetRefs = [setRowOneRef, setRowTwoRef];

  const renderSet = (row: Brand[], rowIndex: number, copyIndex: number, ref?: (node: HTMLUListElement | null) => void) => (
    <ul
      ref={ref}
      data-row-index={rowIndex}
      className="brand-rail-set"
      aria-label={copyIndex === 0 ? `Brand row ${rowIndex + 1}` : undefined}
      aria-hidden={copyIndex === 1 ? 'true' : undefined}
      inert={copyIndex === 1 ? true : undefined}
      tabIndex={copyIndex === 1 ? -1 : undefined}
    >
      {row.map((brand, index) => {
        const tileId = `${brand.slug}-${rowIndex}-${copyIndex}-${index}`;
        const isHovered = hoveredTileId === tileId;
        return (
          <BrandTile
            key={tileId}
            brand={brand}
            tileId={tileId}
            hovered={isHovered}
            isReducedMotion={isReducedMotion}
          />
        );
      })}
    </ul>
  );

  const renderReducedMotionGrid = () => (
    <ul
      className="brand-rail-static-grid"
      aria-label="Apparel brands"
      data-hover={hoveredTrack === 0 ? 'true' : undefined}
      onPointerOver={(event) => handleTrackPointerOver(event, 0)}
      onPointerLeave={handleTrackPointerLeave}
    >
      {brands.map((brand, index) => {
        const tileId = `${brand.slug}-reduced-${index}`;
        return (
          <BrandTile
            key={tileId}
            brand={brand}
            tileId={tileId}
            hovered={hoveredTileId === tileId}
            isReducedMotion
          />
        );
      })}
    </ul>
  );

  return (
    <section
      id="brand-rail"
      ref={sectionRef}
      aria-labelledby="brand-rail-title"
      className="brand-rail-block relative isolate overflow-hidden border-y border-white/10 bg-[#1b1a18] text-[#faf8f5]"
    >
      <motion.div
        ref={ambientRef}
        aria-hidden="true"
        className="brand-rail-glow pointer-events-none absolute inset-0"
      />
      <div aria-hidden="true" className="brand-rail-grain pointer-events-none absolute inset-0" />

      <div className="brand-rail-content relative z-10">
        <header className="brand-rail-header mx-auto w-full max-w-[100rem] px-5 sm:px-8 lg:px-16">
          <motion.div
            className="flex items-center justify-between gap-6"
            initial={{ y: 16, opacity: 0 }}
            animate={isReducedMotion || entered ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <p className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent sm:text-xs">
              <span aria-hidden="true" className="h-px w-12 bg-accent" />
              SELECTED NAMES
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60 sm:text-xs">
              APPAREL BRANDS
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex items-end justify-between gap-8 sm:mt-10"
            initial={{ y: 16, opacity: 0 }}
            animate={isReducedMotion || entered ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.08 }}
          >
            <div className="flex items-baseline gap-4 sm:gap-6">
              <h2 id="brand-rail-title" className="brand-rail-count">
                {countAnimationComplete || isReducedMotion ? brands.length : count}
              </h2>
              <span className="brand-rail-count-label">brands</span>
            </div>
            <motion.button
              type="button"
              className="brand-rail-pause"
              aria-label={paused ? 'Play brand scrolling' : 'Pause brand scrolling'}
              aria-pressed={paused}
              onClick={() => setPaused((value) => !value)}
              onPointerMove={handlePausePointerMove}
              onPointerLeave={() => {
                pauseXRaw.set(0);
                pauseYRaw.set(0);
              }}
              style={{ x: pauseX, y: pauseY }}
              hidden={isReducedMotion}
            >
              {paused ? <Play aria-hidden="true" className="brand-rail-pause-icon" /> : <Pause aria-hidden="true" className="brand-rail-pause-icon" />}
            </motion.button>
          </motion.div>
        </header>

        <div
          ref={rowsRef}
          className="brand-rail-rows relative"
          role="group"
          aria-label="Selected apparel brands"
          data-hovered-slug={hoveredSlug ?? undefined}
          onPointerEnter={handleRowsPointerEnter}
          onPointerMove={handleRowsPointerMove}
          onPointerLeave={handleRowsPointerLeave}
        >
          <motion.div
            aria-hidden="true"
            className="brand-rail-cursor-light pointer-events-none absolute"
            style={{ x: lightX, y: lightY, opacity: lightOpacity }}
          />

          {isReducedMotion ? renderReducedMotionGrid() : rows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className={`brand-rail-row-wrapper brand-rail-mask${rowIndex === 1 ? ' brand-rail-row-2' : ''}`}
              initial={{ clipPath: 'inset(0 100% 0 0)', y: 20, opacity: 0 }}
              animate={isReducedMotion || entered
                ? { clipPath: 'inset(0 0% 0 0)', y: 0, opacity: 1 }
                : { clipPath: 'inset(0 100% 0 0)', y: 20, opacity: 0 }}
              transition={{ duration: 1.1, ease: EASE_OUT, delay: rowIndex === 1 ? 0.15 : 0 }}
            >
              <motion.div
                className="brand-rail-track"
                data-hover={hoveredTrack === rowIndex ? 'true' : undefined}
                style={{ x: rowIndex === 0 ? rowOneTransform : rowTwoTransform }}
                onPointerOver={(event) => handleTrackPointerOver(event, rowIndex)}
                onPointerLeave={handleTrackPointerLeave}
              >
                {renderSet(row, rowIndex, 0, firstSetRefs[rowIndex])}
                {!isReducedMotion && renderSet(row, rowIndex, 1)}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {frameActive && (
        <MarqueeFrameRunner
          active={frameActive}
          mobile={mobile}
          rowOneX={rowOneX}
          rowTwoX={rowTwoX}
          setWidths={setWidths}
          speedFactor={speedFactor}
          scrollVelocity={smoothScrollVelocity}
        />
      )}
    </section>
  );
}
