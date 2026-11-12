'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { flushSync } from 'react-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FEATURED_MARKET_CODES, getMarketContinent, MARKETS, REGIONS, REGION_CENTERS, TIRUPPUR, type Market, type MarketRegion } from './GlobalMarketsData';
import { MarketShaderCanvas, type MarketShaderPointer } from './MarketShaderCanvas';
import { InteractiveCountryMap } from './InteractiveCountryMap';
import { createRoutePaths, projectCoordinates, regionFromGeography, type CountryFeature } from './marketGeography';
import styles from './GlobalExperience.module.css';

const PAGE_SIZE = 8;

type SelectedMarket = Omit<Market, 'region'> & { region: string; continent: string };

function formatCoordinate(latitude: number, longitude: number) {
  const latDirection = latitude >= 0 ? 'N' : 'S';
  const lonDirection = longitude >= 0 ? 'E' : 'W';
  return Math.abs(latitude).toFixed(1) + '° ' + latDirection + ' / ' + Math.abs(longitude).toFixed(1) + '° ' + lonDirection;
}

function getFlagPath(code: string) {
  return '/assets/export/flags/' + code.toLowerCase() + '.svg';
}

function flagEmoji(code: string) {
  if (code.length !== 2) return '';
  const point = (letter: string) => 127397 + letter.toUpperCase().charCodeAt(0);
  return String.fromCodePoint(point(code[0]), point(code[1]));
}

function getMapCamera(region: MarketRegion, selectedPoint: { x: number; y: number }, focusPoint?: { x: number; y: number }) {
  const regionPoint = focusPoint ?? projectCoordinates(REGION_CENTERS[region].lat, REGION_CENTERS[region].lon);
  const horizontal = (600 - regionPoint.x) * 0.009 + (regionPoint.x - selectedPoint.x) * 0.004;
  const vertical = (300 - regionPoint.y) * 0.009 + (regionPoint.y - selectedPoint.y) * 0.004;
  return { x: horizontal.toFixed(2) + '%', y: vertical.toFixed(2) + '%', scale: 1.065 };
}

export function GlobalMarkets() {
  const [activeRegion, setActiveRegion] = useState<MarketRegion>('Europe');
  const [selectedCode, setSelectedCode] = useState('FR');
  const [selectedMarketOverride, setSelectedMarketOverride] = useState<SelectedMarket | null>(null);
  const [page, setPage] = useState(0);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const shaderPointerRef = useRef<MarketShaderPointer>({ x: 0.5, y: 0.5, active: false });
  const isMarketsInView = useInView(sectionRef, { amount: 0.12 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const sectionProgress = useSpring(scrollYProgress, { stiffness: 76, damping: 26, mass: 0.32 });
  const scrollMapY = useTransform(sectionProgress, [0, 1], [reduceMotion ? 0 : 8, reduceMotion ? 0 : -8]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { stiffness: 68, damping: 22, mass: 0.3 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 68, damping: 22, mass: 0.3 });
  const backgroundShiftX = useTransform(smoothPointerX, [-1, 1], [-3, 3]);
  const backgroundShiftY = useTransform(smoothPointerY, [-1, 1], [-2, 2]);
  const foregroundShiftX = useTransform(smoothPointerX, [-1, 1], [-6, 6]);
  const foregroundShiftY = useTransform(smoothPointerY, [-1, 1], [-4, 4]);

  const listedSelection = MARKETS.find((market) => market.code === selectedCode) ?? MARKETS[0];
  const selectedMarket: SelectedMarket = selectedMarketOverride ?? {
    ...listedSelection,
    continent: getMarketContinent(listedSelection),
  };
  const regionMarkets = useMemo(
    () => MARKETS.filter((market) => market.region === activeRegion),
    [activeRegion],
  );
  const pageCount = Math.max(1, Math.ceil(regionMarkets.length / PAGE_SIZE));
  const pageMarkets = regionMarkets.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const featuredIndex = FEATURED_MARKET_CODES.indexOf(selectedMarket.code as (typeof FEATURED_MARKET_CODES)[number]);
  const selectedPoint = projectCoordinates(selectedMarket.lat, selectedMarket.lon);
  const tiruppurPoint = projectCoordinates(TIRUPPUR.lat, TIRUPPUR.lon);
  const geographyRegion = REGIONS.includes(selectedMarket.region as MarketRegion)
    ? selectedMarket.region as MarketRegion
    : null;
  const mapRegionName = geographyRegion ?? selectedMarket.region;
  const regionPoint = geographyRegion
    ? projectCoordinates(REGION_CENTERS[geographyRegion].lat, REGION_CENTERS[geographyRegion].lon)
    : selectedPoint;
  const mapCamera = getMapCamera(geographyRegion ?? activeRegion, selectedPoint, geographyRegion ? undefined : selectedPoint);
  const routePaths = createRoutePaths([TIRUPPUR.lon, TIRUPPUR.lat], [selectedMarket.lon, selectedMarket.lat]);
  const arcPath = routePaths.join(' ');
  const pageStart = page * PAGE_SIZE + 1;
  const pageEnd = Math.min((page + 1) * PAGE_SIZE, regionMarkets.length);

  const mapStatus = 'Map focus: ' + selectedMarket.name + ' (' + selectedMarket.code + ') · ' + selectedMarket.continent + ' · illustrative point ' + formatCoordinate(selectedMarket.lat, selectedMarket.lon) + '.';

  function handleMapPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    pointerX.set((x - 0.5) * 2);
    pointerY.set((y - 0.5) * 2);
    shaderPointerRef.current = { x, y, active: true };
    event.currentTarget.style.setProperty('--market-pointer-x', x * 100 + '%');
    event.currentTarget.style.setProperty('--market-pointer-y', y * 100 + '%');
  }

  function trackHighlight(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--pointer-x', ((event.clientX - bounds.left) / bounds.width) * 100 + '%');
    event.currentTarget.style.setProperty('--pointer-y', ((event.clientY - bounds.top) / bounds.height) * 100 + '%');
  }

  function selectMarket(market: Market) {
    const marketIndex = MARKETS.filter((item) => item.region === market.region).findIndex((item) => item.code === market.code);
    updateMarketScene(() => {
      setActiveRegion(market.region);
      setPage(Math.floor(marketIndex / PAGE_SIZE));
      setSelectedCode(market.code);
      setSelectedMarketOverride(null);
    });
  }

  function selectRegion(region: MarketRegion) {
    const firstFeatured = FEATURED_MARKET_CODES
      .map((code) => MARKETS.find((market) => market.code === code))
      .find((market) => market?.region === region);
    const firstMarket = MARKETS.find((market) => market.region === region);
    const nextMarket = firstFeatured ?? firstMarket;

    if (!nextMarket) return;
    updateMarketScene(() => {
      setActiveRegion(region);
      setPage(0);
      setSelectedCode(nextMarket.code);
      setSelectedMarketOverride(null);
    });
  }

  function navigateFeatured(direction: -1 | 1) {
    const startIndex = featuredIndex < 0
      ? (direction === 1 ? -1 : 0)
      : featuredIndex;
    const nextIndex = (startIndex + direction + FEATURED_MARKET_CODES.length) % FEATURED_MARKET_CODES.length;
    const nextMarket = MARKETS.find((market) => market.code === FEATURED_MARKET_CODES[nextIndex]);
    if (nextMarket) selectMarket(nextMarket);
  }

  function changePage(direction: -1 | 1) {
    const nextPage = Math.min(pageCount - 1, Math.max(0, page + direction));
    const firstMarket = regionMarkets[nextPage * PAGE_SIZE];
    updateMarketScene(() => {
      setPage(nextPage);
      if (firstMarket) {
        setSelectedCode(firstMarket.code);
        setSelectedMarketOverride(null);
      }
    });
  }

  function selectMapCountry(feature: CountryFeature) {
    const alpha2 = feature.properties.alpha2;
    const selectionKey = alpha2 || feature.id;
    const listedMarket = MARKETS.find((market) => market.code === alpha2);
    if (listedMarket) {
      selectMarket(listedMarket);
      return;
    }

    const region = regionFromGeography(feature.properties.continent, feature.properties.subregion);
    const nextMarket: SelectedMarket = {
      code: alpha2 || '—',
      name: feature.properties.name,
      region,
      continent: feature.properties.continent,
      lat: feature.properties.label[1],
      lon: feature.properties.label[0],
    };
    updateMarketScene(() => {
      setSelectedCode(selectionKey);
      setSelectedMarketOverride(nextMarket);
      setPage(0);
      if (REGIONS.includes(region as MarketRegion)) setActiveRegion(region as MarketRegion);
    });
  }

  function updateMarketScene(update: () => void) {
    if (reduceMotion || typeof document === 'undefined') {
      update();
      return;
    }
    const transitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => unknown;
    };
    if (!transitionDocument.startViewTransition) {
      update();
      return;
    }
    transitionDocument.startViewTransition(() => flushSync(update));
  }

  const countryVariants = {
    hidden: (index: number = 0) => ({
      opacity: 0,
      y: reduceMotion ? 0 : 12,
      filter: reduceMotion ? 'blur(0px)' : 'blur(1px)',
      transition: { duration: reduceMotion ? 0 : 0.24 },
      transitionEnd: { x: index % 2 === 0 ? -3 : 3 },
    }),
    visible: (index: number = 0) => ({
      opacity: 1,
      y: 0,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: reduceMotion ? 0 : 0.42,
        delay: reduceMotion ? 0 : index * 0.045,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : -8,
      transition: { duration: reduceMotion ? 0 : 0.18 },
    },
  };

  return (
    <section ref={sectionRef} id="markets" aria-labelledby="markets-title" className={styles.markets}>
      <div className={styles.container}>
        <motion.div
          className={styles.marketsHeading}
          initial={reduceMotion ? false : { y: 10, opacity: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className={styles.sectionIndex}>01 / INTERNATIONAL MARKETS</p>
            <h2 id="markets-title" className={styles.sectionTitle}>
              <span className={styles.marketTitleLine}>A WORLD OF</span>
              <span className={[styles.marketTitleLine, styles.titleSoft].join(' ')}>OPPORTUNITY.</span>
            </h2>
          </div>
          <p className={styles.sectionIntro}>
            Explore potential international markets for apparel and knitwear.
          </p>
        </motion.div>
        <div className={styles.sectionProgress} aria-hidden="true">
          <motion.div className={styles.sectionProgressValue} style={{ scaleX: reduceMotion ? 0.45 : sectionProgress }} />
        </div>

        <div className={styles.countrySection}>
          <div className={styles.countryToolbar}>
            <div>
              <p className={styles.countryHeading}>Explore the market landscape</p>
              <p className={styles.countrySubheading}>
                Choose a region or select any country on the map to explore its illustrative geography.
              </p>
            </div>
            <p className={styles.countryKey}><span aria-hidden="true" /> Potential market</p>
          </div>

          <motion.div
            className={styles.regionFilters}
            role="group"
            aria-label="Select a market region"
            initial={reduceMotion ? false : { y: 8, opacity: 1 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduceMotion ? 0 : 0.48, delay: reduceMotion ? 0 : 0.08 }}
          >
            {REGIONS.map((region) => {
              const active = activeRegion === region;
              const count = MARKETS.filter((market) => market.region === region).length;
              return (
                <motion.button
                  key={region}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectRegion(region)}
                  onPointerMove={trackHighlight}
                  className={[styles.regionFilter, active ? styles.regionFilterActive : ''].filter(Boolean).join(' ')}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                >
                  {active && <motion.span layoutId="active-market-filter" className={styles.regionFilterHighlight} transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }} />}
                  <span className={styles.regionFilterLabel}>{region}</span>
                  <span className={styles.regionCount}>{count}</span>
                </motion.button>
              );
            })}
          </motion.div>

          <div className={styles.explorerStage}>
            <motion.figure
              className={styles.mapPanel}
              initial={false}
              whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: reduceMotion ? 0 : 0.78, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.mapHeader}>
                <div>
                  <span className={styles.mapEyebrow}>Geographic view</span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={mapRegionName}
                      className={styles.mapTitle}
                      initial={reduceMotion ? false : { opacity: 0, y: 7, filter: 'blur(2px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
                      transition={{ duration: reduceMotion ? 0 : 0.32 }}
                    >{mapRegionName} market geography</motion.p>
                  </AnimatePresence>
                </div>
                <span className={styles.mapLiveTag}><i aria-hidden="true" /><AnimatePresence mode="wait" initial={false}><motion.span key={mapRegionName} initial={reduceMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -4 }} transition={{ duration: reduceMotion ? 0 : 0.25 }}>{mapRegionName}</motion.span></AnimatePresence></span>
              </div>

              <div
                className={[styles.mapCanvas, isMarketsInView ? styles.mapCanvasActive : ''].filter(Boolean).join(' ')}
                onPointerMove={handleMapPointerMove}
                onPointerLeave={(event) => {
                  pointerX.set(0);
                  pointerY.set(0);
                  shaderPointerRef.current = { ...shaderPointerRef.current, active: false };
                  event.currentTarget.style.setProperty('--market-pointer-x', '50%');
                  event.currentTarget.style.setProperty('--market-pointer-y', '50%');
                }}
              >
                <MarketShaderCanvas active={isMarketsInView} reducedMotion={Boolean(reduceMotion)} pointerRef={shaderPointerRef} />
                <motion.div className={styles.mapScrollLayer} style={{ y: scrollMapY }}>
                <motion.div className={styles.mapScene} animate={mapCamera} transition={{ duration: reduceMotion ? 0 : 1.15, ease: [0.22, 1, 0.36, 1] }}>
                  <motion.div className={styles.mapImageLayer} style={{ x: backgroundShiftX, y: backgroundShiftY }}>
                    <InteractiveCountryMap selectedCode={selectedCode} reducedMotion={Boolean(reduceMotion)} onSelect={selectMapCountry} />
                  </motion.div>

                  <motion.div
                    key={mapRegionName}
                    className={styles.mapLightSweep}
                    initial={reduceMotion ? false : { x: '-125%', opacity: 0 }}
                    animate={reduceMotion ? { opacity: 0 } : { x: '125%', opacity: [0, 0.42, 0] }}
                    transition={{ duration: reduceMotion ? 0 : 1.5, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden="true"
                  />

                  <motion.svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet" className={styles.mapOverlay} style={{ x: foregroundShiftX, y: foregroundShiftY }} aria-hidden="true">
                    <defs>
                      <radialGradient id="market-dot" r="1">
                        <stop offset="0" stopColor="#ffffff" />
                        <stop offset="1" stopColor="#c5a46d" />
                      </radialGradient>
                      <radialGradient id="region-glow" r="0.72">
                        <stop offset="0" stopColor="#c5a46d" stopOpacity="0.18" />
                        <stop offset="1" stopColor="#c5a46d" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    <motion.circle
                      key={'region-' + mapRegionName}
                      cx={regionPoint.x}
                      cy={regionPoint.y}
                      r="82"
                      fill="url(#region-glow)"
                      className={styles.mapRegionGlow}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.74 }}
                      animate={{ cx: regionPoint.x, cy: regionPoint.y, opacity: 1, scale: 1 }}
                      transition={{ duration: reduceMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.circle
                      key={'region-ring-' + mapRegionName}
                      cx={regionPoint.x}
                      cy={regionPoint.y}
                      r="51"
                      fill="none"
                      className={styles.mapRegionRing}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.68 }}
                      animate={{ cx: regionPoint.x, cy: regionPoint.y, opacity: [0, 0.7, 0.38], scale: [0.68, 1.04, 1] }}
                      transition={{ duration: reduceMotion ? 0 : 0.95, ease: [0.22, 1, 0.36, 1] }}
                    />

                    <AnimatePresence initial={false} mode="wait">
                      <motion.path
                        key={selectedCode}
                        d={arcPath}
                        fill="none"
                        pathLength={1}
                        className={styles.mapRoute}
                        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.74 }}
                        exit={reduceMotion ? undefined : { opacity: 0, pathLength: 0.86 }}
                        transition={{ duration: reduceMotion ? 0 : 1.25, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </AnimatePresence>

                    <motion.circle
                      cx={selectedPoint.x}
                      cy={selectedPoint.y}
                      r="13"
                      className={styles.mapSelectedHalo}
                      animate={reduceMotion || !isMarketsInView ? { opacity: 0.2, scale: 1 } : { cx: selectedPoint.x, cy: selectedPoint.y, opacity: [0.46, 0.08, 0.46], scale: [0.72, 1.34, 0.72] }}
                      transition={reduceMotion || !isMarketsInView ? { duration: 0 } : { duration: 2.7, ease: 'easeInOut', repeat: Infinity }}
                    />
                    <motion.circle
                      cx={selectedPoint.x}
                      cy={selectedPoint.y}
                      r="21"
                      className={styles.mapSelectedHaloOuter}
                      animate={reduceMotion || !isMarketsInView ? { opacity: 0.12, scale: 1 } : { opacity: [0.22, 0.04, 0.22], scale: [0.72, 1.16, 0.72] }}
                      transition={reduceMotion || !isMarketsInView ? { duration: 0 } : { duration: 3.2, delay: 0.8, ease: 'easeInOut', repeat: Infinity }}
                    />
                    <motion.circle
                      cx={selectedPoint.x}
                      cy={selectedPoint.y}
                      r="5.5"
                      className={styles.mapSelectedDot}
                      animate={{ cx: selectedPoint.x, cy: selectedPoint.y }}
                      transition={{ duration: reduceMotion ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.circle
                      cx={tiruppurPoint.x}
                      cy={tiruppurPoint.y}
                      r="12"
                      className={styles.mapOriginHalo}
                      animate={reduceMotion || !isMarketsInView ? { opacity: 0.16, scale: 1 } : { opacity: [0.34, 0.06, 0.34], scale: [0.78, 1.28, 0.78] }}
                      transition={reduceMotion || !isMarketsInView ? { duration: 0 } : { duration: 3.1, ease: 'easeInOut', repeat: Infinity }}
                    />
                    <circle cx={tiruppurPoint.x} cy={tiruppurPoint.y} r="5" fill="url(#market-dot)" className={styles.mapOrigin} />
                    <text x={tiruppurPoint.x + 12} y={tiruppurPoint.y - 9} className={styles.mapOriginName}>TIRUPPUR · INDIA</text>
                    <text x={tiruppurPoint.x + 12} y={tiruppurPoint.y + 7} className={styles.mapOriginCoordinates}>11.1° N · 77.3° E</text>

                    {!reduceMotion && isMarketsInView && routePaths.map((routePath, index) => (
                      <g key={'route-particles-' + index}>
                        <circle r="3.1" className={styles.mapRouteParticle}>
                          <animateMotion path={routePath} dur="4.8s" begin={index === 0 ? '0s' : '-' + index * 2.4 + 's'} repeatCount="indefinite" rotate="auto" />
                        </circle>
                        <circle r="2.1" className={styles.mapRouteParticleSecondary}>
                          <animateMotion path={routePath} dur="4.8s" begin={index === 0 ? '-2.4s' : '-' + (index * 2.4 + 2.4) + 's'} repeatCount="indefinite" rotate="auto" />
                        </circle>
                      </g>
                    ))}
                    {reduceMotion && <circle cx={(tiruppurPoint.x + selectedPoint.x) / 2} cy={(tiruppurPoint.y + selectedPoint.y) / 2 - 26} r="2.1" className={styles.mapRouteParticle} />}
                  </motion.svg>
                </motion.div>
                </motion.div>
              </div>

              <figcaption className={styles.mapCaption}>
                <p aria-live="polite" className={styles.mapStatus}>{mapStatus}</p>
                <p className={styles.mapDisclaimer}>
                  Country boundaries: <a href="https://www.naturalearthdata.com/downloads/50m-cultural-vectors/" target="_blank" rel="noreferrer">Natural Earth 1:50m</a>. The Tiruppur-to-market arc is illustrative and does not depict verified shipments, customers or active trade routes.
                </p>
              </figcaption>
            </motion.figure>

            <motion.aside
              className={styles.marketSpotlight}
              aria-label="Selected potential market"
              onPointerMove={trackHighlight}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.spotlightTopline}>
                <span>{featuredIndex >= 0 ? 'Featured markets' : 'Regional selection'}</span>
                {featuredIndex >= 0 && <span>{String(featuredIndex + 1).padStart(2, '0')} / {String(FEATURED_MARKET_CODES.length).padStart(2, '0')}</span>}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selectedMarket.code}
                  className={styles.spotlightContent}
                  initial={reduceMotion ? false : { opacity: 0, y: 14, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10, filter: 'blur(2px)' }}
                  transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.span
                    className={styles.spotlightFlagFrame}
                    initial={reduceMotion ? false : { rotateY: -12, rotateX: 5, scale: 0.9 }}
                    animate={{ rotateY: 0, rotateX: 0, scale: 1 }}
                    whileHover={reduceMotion ? undefined : { rotateY: 7, rotateX: -3, scale: 1.04 }}
                    transition={{ duration: reduceMotion ? 0 : 0.46, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformPerspective: 700 }}
                  >
                    {MARKETS.some((market) => market.code === selectedMarket.code)
                      ? <Image src={getFlagPath(selectedMarket.code)} width={96} height={72} alt="" aria-hidden="true" unoptimized className={styles.spotlightFlag} />
                      : <span className={styles.spotlightFlagEmoji} aria-hidden="true">{flagEmoji(selectedMarket.code)}</span>}
                  </motion.span>
                  <span className={styles.spotlightEyebrow}>Potential international market</span>
                  <h3 className={styles.spotlightName}>{selectedMarket.name}</h3>
                  <p className={styles.spotlightMeta}>
                    {selectedMarket.code} <i aria-hidden="true">·</i> {selectedMarket.continent}
                    {selectedMarket.region !== selectedMarket.continent && <> <i aria-hidden="true">·</i> {selectedMarket.region}</>}
                  </p>
                  <p className={styles.spotlightCoordinates}>{formatCoordinate(selectedMarket.lat, selectedMarket.lon)}</p>
                  <div className={styles.spotlightRouteStatus}>
                    <motion.i
                      className={styles.spotlightRoutePulse}
                      animate={reduceMotion ? { opacity: 0.62, scale: 1 } : { opacity: [0.42, 1, 0.42], scale: [0.82, 1.22, 0.82] }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 2.1, ease: 'easeInOut', repeat: Infinity }}
                      aria-hidden="true"
                    />
                    <span>Illustrative route preview</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className={styles.spotlightNavigation}>
                <span className={styles.spotlightNavLabel}>{featuredIndex >= 0 ? 'Featured selection' : 'Browse featured markets'}</span>
                <div className={styles.spotlightNavButtons}>
                  <motion.button type="button" aria-label="Previous featured market" onClick={() => navigateFeatured(-1)} className={styles.spotlightNavButton} whileHover={reduceMotion ? undefined : { x: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.96 }}>
                    <ArrowLeft aria-hidden="true" />
                  </motion.button>
                  <motion.button type="button" aria-label="Next featured market" onClick={() => navigateFeatured(1)} className={styles.spotlightNavButton} whileHover={reduceMotion ? undefined : { x: 2 }} whileTap={reduceMotion ? undefined : { scale: 0.96 }}>
                    <ArrowRight aria-hidden="true" />
                  </motion.button>
                </div>
              </div>
            </motion.aside>
          </div>

          <div className={styles.countryListHeader}>
            <div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={activeRegion}
                  className={styles.countryListTitle}
                  initial={reduceMotion ? false : { opacity: 0, y: 6, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3 }}
                >Countries in {activeRegion}</motion.p>
              </AnimatePresence>
              <p className={styles.countryListMeta}>Select a flag to move the map marker</p>
            </div>
            <span className={styles.countryRange}>{String(pageStart).padStart(2, '0')}–{String(pageEnd).padStart(2, '0')} <i aria-hidden="true">/</i> {regionMarkets.length}</span>
          </div>

          <motion.ul layout className={styles.countryGrid} aria-label={'Potential markets in ' + activeRegion}>
            <AnimatePresence initial={false} mode="popLayout">
              {pageMarkets.map((market, index) => {
                const active = market.code === selectedMarket.code;
                return (
                  <motion.li
                    key={market.code}
                    layout
                    custom={index}
                    variants={countryVariants}
                    initial={reduceMotion ? false : 'hidden'}
                    animate="visible"
                    exit="exit"
                    transition={{ layout: { duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] } }}
                    className={styles.countryItem}
                  >
                    <button
                      type="button"
                      aria-pressed={active}
                      aria-label={'Show ' + market.name + ' (' + market.code + ') on the illustrative map'}
                      onClick={() => selectMarket(market)}
                      onPointerMove={trackHighlight}
                      className={[styles.countryButton, active ? styles.countryButtonActive : ''].filter(Boolean).join(' ')}
                    >
                      <motion.span
                        className={styles.flagFrame}
                        whileHover={reduceMotion ? undefined : { rotateY: 8, rotateX: -4, scale: 1.06 }}
                        transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Image src={getFlagPath(market.code)} width={48} height={36} alt="" aria-hidden="true" unoptimized className={styles.flag} />
                      </motion.span>
                      <span className={styles.countryWords}>
                        <span className={styles.countryName}>{market.name}</span>
                        <span className={styles.countryMeta}>{market.code}</span>
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>

          {pageCount > 1 && (
            <div className={styles.countryPagination} aria-label="Country pages">
              <button type="button" onClick={() => changePage(-1)} disabled={page === 0} className={styles.pageButton} aria-label="Previous countries">
                <ArrowLeft aria-hidden="true" /> <span>Previous</span>
              </button>
              <span className={styles.pageStatus} aria-live="polite">{page + 1} <i aria-hidden="true">/</i> {pageCount}</span>
              <button type="button" onClick={() => changePage(1)} disabled={page === pageCount - 1} className={styles.pageButton} aria-label="Next countries">
                <span>Next</span> <ArrowRight aria-hidden="true" />
              </button>
            </div>
          )}

          <p className={styles.marketDisclaimer}>
            Markets are presented for exploration. This selection does not represent confirmed Fashion Knits customers, active shipping routes, offices or export destinations.
          </p>
        </div>
      </div>
    </section>
  );
}
