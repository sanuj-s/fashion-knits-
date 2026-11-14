'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import { flushSync } from 'react-dom';
import { ArrowLeft, ArrowRight, FileText, Map as MapIcon, Maximize2, Minimize2, Plane, Ship, Truck, X } from 'lucide-react';
import { CONTINENTS, CONTINENT_CENTERS, FEATURED_MARKET_CODES, getMarketContinent, MARKETS, TIRUPPUR, type Continent, type Market } from './GlobalMarketsData';
import { EXPORT_DOCUMENTS, getLogisticsProfile, MANUFACTURING_STAGES, ORIGIN_GATEWAYS, ORIGIN_GATEWAY_POINTS, SHIPMENT_STAGES, type ShipmentStageId } from './LogisticsProfiles';
import { MarketShaderCanvas, type MarketShaderPointer } from './MarketShaderCanvas';
import { InteractiveCountryMap } from './InteractiveCountryMap';
import { createRoutePaths, projectCoordinates, regionFromGeography, type CountryFeature } from './marketGeography';
import styles from './GlobalExperience.module.css';

const PAGE_SIZE = 8;

type SelectedMarket = Omit<Market, 'region'> & { region: string; continent: string };
type RouteMode = 'sea' | 'air' | 'all';
type ViewMode = 'split' | 'details' | 'map';

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

function getShipmentStageDescription(stage: ShipmentStageId, countryName: string, destinationGateway: string, mode: RouteMode) {
  switch (stage) {
    case 'manufacturing':
      return 'Garment orders move through CAD pattern support, cutting, print or embroidery, sewing and finishing, quality checks, and export-carton packing in Tiruppur.';
    case 'export-gateway':
      return 'Possible origin gateways are shown for planning only. The port, airport, inland leg and carrier are selected for each confirmed order.';
    case 'export-customs':
      return 'Export paperwork and customs declarations are prepared against the confirmed goods, buyer instructions and delivery terms.';
    case 'international-transport':
      return (mode === 'sea' ? 'Sea freight' : mode === 'air' ? 'Air freight' : 'Sea and air') + ' is selected as a comparison. No carrier itinerary or intermediate transit stop has been supplied, so the drawn path is schematic.';
    case 'destination-gateway':
      return destinationGateway === 'Not available'
        ? 'No destination gateway example is available for ' + countryName + '. Confirm a gateway with the appointed freight forwarder.'
        : destinationGateway + ' is a destination gateway example for ' + countryName + ', not a confirmed port or airport on a Fashion Knits booking.';
    case 'import-customs':
      return 'Import clearance depends on the destination, product classification, buyer and agreed delivery terms. Confirm the document set with the consignee or customs broker.';
    case 'final-delivery':
      return 'The final leg runs from the destination gateway to the consignee address. No consignee address or live delivery arrangement is available here.';
  }
}

function getMapCamera(continent: Continent, selectedPoint: { x: number; y: number }, focusPoint?: { x: number; y: number }) {
  const regionPoint = focusPoint ?? projectCoordinates(CONTINENT_CENTERS[continent].lat, CONTINENT_CENTERS[continent].lon);
  const horizontal = (600 - regionPoint.x) * 0.009 + (regionPoint.x - selectedPoint.x) * 0.004;
  const vertical = (300 - regionPoint.y) * 0.009 + (regionPoint.y - selectedPoint.y) * 0.004;
  return { x: horizontal.toFixed(2) + '%', y: vertical.toFixed(2) + '%', scale: 1.12 };
}

export function GlobalMarkets() {
  const [activeContinent, setActiveContinent] = useState<Continent>('Europe');
  const [selectedCode, setSelectedCode] = useState('FR');
  const [selectedMarketOverride, setSelectedMarketOverride] = useState<SelectedMarket | null>(null);
  const [routeMode, setRouteMode] = useState<RouteMode>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [selectedStage, setSelectedStage] = useState<ShipmentStageId>('destination-gateway');
  const [page, setPage] = useState(0);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const expandedStageRef = useRef<HTMLDivElement>(null);
  const expandDetailsButtonRef = useRef<HTMLButtonElement>(null);
  const closeDetailsButtonRef = useRef<HTMLButtonElement>(null);
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

  useEffect(() => {
    if (viewMode !== 'details') return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeDetailsButtonRef.current?.focus();

    function handleDialogKeys(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setViewMode('split');
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = expandedStageRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
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

    document.addEventListener('keydown', handleDialogKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleDialogKeys);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [viewMode]);

  const listedSelection = MARKETS.find((market) => market.code === selectedCode) ?? MARKETS[0];
  const selectedMarket: SelectedMarket = selectedMarketOverride ?? {
    ...listedSelection,
    continent: getMarketContinent(listedSelection),
  };
  const continentMarkets = useMemo(
    () => MARKETS.filter((market) => getMarketContinent(market) === activeContinent),
    [activeContinent],
  );
  const pageCount = Math.max(1, Math.ceil(continentMarkets.length / PAGE_SIZE));
  const pageMarkets = continentMarkets.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const featuredIndex = FEATURED_MARKET_CODES.indexOf(selectedMarket.code as (typeof FEATURED_MARKET_CODES)[number]);
  const tiruppurPoint = projectCoordinates(TIRUPPUR.lat, TIRUPPUR.lon);
  const selectedPoint = selectedMarket.code === 'IN' ? tiruppurPoint : projectCoordinates(selectedMarket.lat, selectedMarket.lon);
  const selectedContinent = CONTINENTS.includes(selectedMarket.continent as Continent)
    ? selectedMarket.continent as Continent
    : activeContinent;
  const mapRegionName = selectedContinent;
  const regionPoint = projectCoordinates(CONTINENT_CENTERS[selectedContinent].lat, CONTINENT_CENTERS[selectedContinent].lon);
  const originGatewayCoordinate = routeMode === 'air' ? ORIGIN_GATEWAY_POINTS.air : ORIGIN_GATEWAY_POINTS.sea;
  const originGatewayPoint = projectCoordinates(originGatewayCoordinate.lat, originGatewayCoordinate.lon);
  const internationalMidpoint = projectCoordinates((TIRUPPUR.lat + selectedMarket.lat) / 2, (TIRUPPUR.lon + selectedMarket.lon) / 2);
  const focusedStagePoint = selectedStage === 'manufacturing'
    ? tiruppurPoint
    : selectedStage === 'export-gateway' || selectedStage === 'export-customs'
      ? originGatewayPoint
      : selectedStage === 'international-transport'
        ? internationalMidpoint
        : selectedPoint;
  const mapCamera = getMapCamera(selectedContinent, focusedStagePoint);
  const routePaths = selectedMarket.code === 'IN'
    ? []
    : createRoutePaths([TIRUPPUR.lon, TIRUPPUR.lat], [selectedMarket.lon, selectedMarket.lat]);
  const arcPath = routePaths.join(' ');
  const logisticsProfile = getLogisticsProfile(selectedMarket.code);
  const destinationGatewayLabel = !logisticsProfile
    ? 'Not available'
    : logisticsProfile.isOrigin
      ? 'Choose a country destination'
      : routeMode === 'air'
        ? logisticsProfile.air ?? 'Not available'
        : routeMode === 'sea'
          ? logisticsProfile.sea ?? 'Not available'
          : 'Sea: ' + (logisticsProfile.sea ?? 'Not available') + ' · Air: ' + (logisticsProfile.air ?? 'Not available');
  const selectedStageCopy = getShipmentStageDescription(selectedStage, selectedMarket.name, destinationGatewayLabel, routeMode);
  const pageStart = page * PAGE_SIZE + 1;
  const pageEnd = Math.min((page + 1) * PAGE_SIZE, continentMarkets.length);

  const mapStatus = selectedMarket.code === 'IN'
    ? 'Map focus: Tiruppur, India · manufacturing origin reference.'
    : 'Map focus: ' + selectedMarket.name + ' (' + selectedMarket.code + ') · schematic route preview · ' + formatCoordinate(selectedMarket.lat, selectedMarket.lon) + '.';

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
    const continent = getMarketContinent(market);
    const marketIndex = MARKETS.filter((item) => getMarketContinent(item) === continent).findIndex((item) => item.code === market.code);
    updateMarketScene(() => {
      setActiveContinent(continent);
      setPage(Math.floor(marketIndex / PAGE_SIZE));
      setSelectedCode(market.code);
      setSelectedMarketOverride(null);
    });
  }

  function selectContinent(continent: Continent) {
    const continentMarkets = MARKETS.filter((market) => getMarketContinent(market) === continent);
    const firstFeatured = FEATURED_MARKET_CODES
      .map((code) => MARKETS.find((market) => market.code === code))
      .find((market) => market && getMarketContinent(market) === continent);
    const firstMarket = continentMarkets[0];
    const nextMarket = firstFeatured ?? firstMarket;

    if (!nextMarket) return;
    updateMarketScene(() => {
      setActiveContinent(continent);
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
    const firstMarket = continentMarkets[nextPage * PAGE_SIZE];
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
    const continent = CONTINENTS.find((item) => item === feature.properties.continent) ?? activeContinent;
    const nextMarket: SelectedMarket = {
      code: alpha2 || '—',
      name: feature.properties.name,
      region,
      continent,
      lat: feature.properties.label[1],
      lon: feature.properties.label[0],
    };
    updateMarketScene(() => {
      setSelectedCode(selectionKey);
      setSelectedMarketOverride(nextMarket);
      setPage(0);
      setActiveContinent(continent);
    });
  }

  function handleStageMarkerKeyDown(event: ReactKeyboardEvent<SVGGElement>, stage: ShipmentStageId) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setSelectedStage(stage);
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
                Choose a continent or select a country on the map to explore its export route profile.
              </p>
            </div>
            <p className={styles.countryKey}><span aria-hidden="true" /> Potential market</p>
          </div>

          <motion.div
            className={styles.regionFilters}
            role="group"
            aria-label="Select a continent"
            initial={reduceMotion ? false : { y: 8, opacity: 1 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduceMotion ? 0 : 0.48, delay: reduceMotion ? 0 : 0.08 }}
          >
            {CONTINENTS.map((continent) => {
              const active = activeContinent === continent;
              const count = MARKETS.filter((market) => getMarketContinent(market) === continent).length;
              return (
                <motion.button
                  key={continent}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectContinent(continent)}
                  onPointerMove={trackHighlight}
                  className={[styles.regionFilter, active ? styles.regionFilterActive : ''].filter(Boolean).join(' ')}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                >
                  {active && <motion.span layoutId="active-market-filter" className={styles.regionFilterHighlight} transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }} />}
                  <span className={styles.regionFilterLabel}>{continent}</span>
                  <span className={styles.regionCount}>{count}</span>
                </motion.button>
              );
            })}
          </motion.div>

          <div
            ref={expandedStageRef}
            className={[
              styles.explorerStage,
              viewMode === 'details' ? styles.explorerStageExpanded : '',
              viewMode === 'map' ? styles.explorerStageMapFocus : '',
            ].filter(Boolean).join(' ')}
            role={viewMode === 'details' ? 'dialog' : undefined}
            aria-modal={viewMode === 'details' ? true : undefined}
            aria-labelledby={viewMode === 'details' ? 'market-profile-title' : undefined}
            tabIndex={viewMode === 'details' ? -1 : undefined}
          >
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
                <div className={styles.mapHeaderActions}>
                  <span className={styles.mapLiveTag}><i aria-hidden="true" /><AnimatePresence mode="wait" initial={false}><motion.span key={mapRegionName} initial={reduceMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -4 }} transition={{ duration: reduceMotion ? 0 : 0.25 }}>{mapRegionName}</motion.span></AnimatePresence></span>
                  {viewMode === 'map' && <button type="button" className={styles.mapViewButton} onClick={() => setViewMode('split')}><Minimize2 aria-hidden="true" /> Country details</button>}
                  {viewMode === 'split' && <button type="button" className={styles.mapViewButton} onClick={() => setViewMode('map')}><Maximize2 aria-hidden="true" /> Map focus</button>}
                  <div className={styles.routeModeSwitcher} role="group" aria-label="Choose transportation routes">
                    <button type="button" aria-pressed={routeMode === 'sea'} onClick={() => setRouteMode('sea')} className={[styles.routeModeButton, routeMode === 'sea' ? styles.routeModeButtonActive : ''].filter(Boolean).join(' ')}><Ship aria-hidden="true" /><span>Sea Freight</span></button>
                    <button type="button" aria-pressed={routeMode === 'air'} onClick={() => setRouteMode('air')} className={[styles.routeModeButton, routeMode === 'air' ? styles.routeModeButtonActive : ''].filter(Boolean).join(' ')}><Plane aria-hidden="true" /><span>Air Freight</span></button>
                    <button type="button" aria-pressed={routeMode === 'all'} onClick={() => setRouteMode('all')} className={[styles.routeModeButton, routeMode === 'all' ? styles.routeModeButtonActive : ''].filter(Boolean).join(' ')}><MapIcon aria-hidden="true" /><span>All Routes</span></button>
                  </div>
                </div>
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

                  <motion.svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet" className={styles.mapOverlay} style={{ x: foregroundShiftX, y: foregroundShiftY }} role="group" aria-label="Illustrative export route. Select the origin or destination marker to focus the shipment journey.">
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

                    {arcPath && (
                      <AnimatePresence initial={false}>
                        {routeMode !== 'air' && <motion.path key={selectedCode + '-sea'} d={arcPath} fill="none" pathLength={1} transform={routeMode === 'all' ? 'translate(0 4)' : undefined} className={[styles.mapRoute, styles.mapRouteSea].join(' ')} initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.74 }} exit={reduceMotion ? undefined : { opacity: 0, pathLength: 0.86 }} transition={{ duration: reduceMotion ? 0 : 1.05, ease: [0.22, 1, 0.36, 1] }} />}
                        {routeMode !== 'sea' && <motion.path key={selectedCode + '-air'} d={arcPath} fill="none" pathLength={1} transform={routeMode === 'all' ? 'translate(0 -4)' : undefined} className={[styles.mapRoute, styles.mapRouteAir].join(' ')} initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.78 }} exit={reduceMotion ? undefined : { opacity: 0, pathLength: 0.86 }} transition={{ duration: reduceMotion ? 0 : 1.05, ease: [0.22, 1, 0.36, 1] }} />}
                      </AnimatePresence>
                    )}

                    <g
                      role="button"
                      tabIndex={0}
                      aria-label="Focus manufacturing origin: Tiruppur, India"
                      onClick={() => setSelectedStage('manufacturing')}
                      onKeyDown={(event) => handleStageMarkerKeyDown(event, 'manufacturing')}
                      className={styles.mapStageMarker}
                    >
                      <rect x={tiruppurPoint.x - 10} y={tiruppurPoint.y - 20} width="116" height="38" fill="transparent" />
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
                    </g>

                    {selectedMarket.code !== 'IN' && (
                      <g
                        role="button"
                        tabIndex={0}
                        aria-label={'Focus destination gateway planning example for ' + selectedMarket.name}
                        onClick={() => setSelectedStage('destination-gateway')}
                        onKeyDown={(event) => handleStageMarkerKeyDown(event, 'destination-gateway')}
                        className={styles.mapStageMarker}
                      >
                        <rect x={selectedPoint.x - 18} y={selectedPoint.y - 18} width="36" height="36" fill="transparent" />
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
                      </g>
                    )}

                    <motion.circle
                      cx={focusedStagePoint.x}
                      cy={focusedStagePoint.y}
                      r="9"
                      className={styles.mapStageFocusHalo}
                      animate={{ cx: focusedStagePoint.x, cy: focusedStagePoint.y, opacity: 0.8, scale: 1 }}
                      transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
                    />

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
                    {reduceMotion && routePaths.length > 0 && <circle cx={(tiruppurPoint.x + selectedPoint.x) / 2} cy={(tiruppurPoint.y + selectedPoint.y) / 2 - 26} r="2.1" className={styles.mapRouteParticle} />}
                  </motion.svg>
                </motion.div>
                </motion.div>
              </div>

              <figcaption className={styles.mapCaption}>
                <p aria-live="polite" className={styles.mapStatus}>{mapStatus}</p>
                <p className={styles.mapDisclaimer}>
                  Country boundaries: <a href="https://www.naturalearthdata.com/downloads/50m-cultural-vectors/" target="_blank" rel="noreferrer">Natural Earth 1:50m</a>. Route lines and gateway examples are illustrative; no carrier itinerary, transit quote or Fashion Knits shipment history is supplied.
                </p>
              </figcaption>
            </motion.figure>

            <motion.aside
              className={styles.marketSpotlight}
              aria-label={'Illustrative export logistics for ' + selectedMarket.name}
              onPointerMove={trackHighlight}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.spotlightTopline}>
                <span>Country profile</span>
                <div className={styles.profileViewActions}>
                  {featuredIndex >= 0 && <span>{String(featuredIndex + 1).padStart(2, '0')} / {String(FEATURED_MARKET_CODES.length).padStart(2, '0')}</span>}
                  {viewMode === 'split' && <button ref={expandDetailsButtonRef} type="button" className={styles.profileViewButton} onClick={() => setViewMode('details')} aria-label={'Expand ' + selectedMarket.name + ' country details'}><Maximize2 aria-hidden="true" /><span>Expand</span></button>}
                  {viewMode === 'details' && <button ref={closeDetailsButtonRef} type="button" className={styles.profileViewButton} onClick={() => setViewMode('split')} aria-label="Close expanded country details"><X aria-hidden="true" /><span>Close</span></button>}
                </div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selectedMarket.code}
                  className={[styles.spotlightContent, styles.logisticsContent].join(' ')}
                  initial={reduceMotion ? false : { opacity: 0, y: 14, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10, filter: 'blur(2px)' }}
                  transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={styles.logisticsIdentity}>
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
                    <div className={styles.logisticsIdentityCopy}>
                      <span className={styles.spotlightEyebrow}>{logisticsProfile?.isOrigin ? 'Manufacturing origin' : 'Market reference'}</span>
                      <h3 id="market-profile-title" aria-live="polite" className={[styles.spotlightName, styles.logisticsCountryName].join(' ')}>{selectedMarket.name}</h3>
                      <p className={styles.spotlightMeta}>{selectedMarket.code} <i aria-hidden="true">·</i> {selectedContinent}</p>
                    </div>
                  </div>

                  <div className={styles.marketOverview}>
                    <span className={styles.profileSectionKicker}>Market overview</span>
                    <p>{logisticsProfile?.isOrigin ? 'Tiruppur, Tamil Nadu, is the manufacturing origin shown for route planning.' : 'Country and flag identify the selected market. No market-specific Fashion Knits order or customer data is connected here.'}</p>
                  </div>

                  <div className={styles.logisticsSection}>
                    <div className={styles.logisticsSectionHeading}>
                      <h4>International freight options</h4>
                      <span>Planning only</span>
                    </div>
                    <div className={styles.freightOptions} aria-label="International freight options">
                      <span><Ship aria-hidden="true" />Sea freight</span>
                      <span><Plane aria-hidden="true" />Air freight</span>
                      <span><Truck aria-hidden="true" />Road feeder where available</span>
                      <span><MapIcon aria-hidden="true" />Multimodal</span>
                    </div>
                  </div>

                  <div className={styles.logisticsSection}>
                    <div className={styles.logisticsSectionHeading}>
                      <h4>Shipment journey</h4>
                      <span>{routeMode === 'sea' ? 'Sea freight' : routeMode === 'air' ? 'Air freight' : 'All routes'}</span>
                    </div>
                    <ol className={styles.shipmentRouteSteps}>
                      {SHIPMENT_STAGES.map((stage) => (
                        <li key={stage.id}>
                          <button type="button" aria-pressed={selectedStage === stage.id} onClick={() => setSelectedStage(stage.id)} className={[styles.shipmentStageButton, selectedStage === stage.id ? styles.shipmentStageButtonActive : ''].filter(Boolean).join(' ')}>
                            <span>{stage.number}</span>
                            <strong>{stage.label}</strong>
                          </button>
                        </li>
                      ))}
                    </ol>
                    <div className={styles.shipmentStageDetail} aria-live="polite">
                      <span>{SHIPMENT_STAGES.find((stage) => stage.id === selectedStage)?.label}</span>
                      <p>{selectedStageCopy}</p>
                    </div>
                  </div>

                  <div className={styles.logisticsSection}>
                    <div className={styles.logisticsSectionHeading}>
                      <h4>Shipment information</h4>
                      <FileText aria-hidden="true" />
                    </div>
                    <div className={styles.transitCards}>
                      {routeMode !== 'air' && <div className={styles.transitCard}><span><Ship aria-hidden="true" />Sea freight</span><strong>{logisticsProfile?.seaTransitDays ? logisticsProfile.seaTransitDays + ' days' : 'Estimate unavailable'}</strong><small>Origin example: {ORIGIN_GATEWAYS.sea}</small><small>Destination example: {logisticsProfile && !logisticsProfile.isOrigin ? logisticsProfile.sea ?? 'Not available' : 'Confirm with forwarder'}</small></div>}
                      {routeMode !== 'sea' && <div className={styles.transitCard}><span><Plane aria-hidden="true" />Air freight</span><strong>{logisticsProfile?.airTransitDays ? logisticsProfile.airTransitDays + ' days' : 'Estimate unavailable'}</strong><small>Origin example: {ORIGIN_GATEWAYS.air}</small><small>Destination example: {logisticsProfile && !logisticsProfile.isOrigin ? logisticsProfile.air ?? 'Not available' : 'Confirm with forwarder'}</small></div>}
                    </div>
                    <dl className={styles.shipmentFacts}>
                      <div><dt>Transportation</dt><dd>{routeMode === 'sea' ? 'Sea freight' : routeMode === 'air' ? 'Air freight' : 'Sea / air comparison'}</dd></div>
                      <div><dt>Shipment process</dt><dd>Order-specific; confirm booking, incoterms and consignee details with the buyer and forwarder.</dd></div>
                      <div><dt>Tracking status</dt><dd>{logisticsProfile?.liveTrackingAvailable ? 'Connected' : 'No live tracking data connected.'}</dd></div>
                    </dl>
                    <div className={styles.documentList}>
                      <span className={styles.profileSectionKicker}>Export documentation</span>
                      {EXPORT_DOCUMENTS.map((document) => <article key={document.title}><strong>{document.title}</strong><p>{document.detail}</p></article>)}
                    </div>
                  </div>

                  <div className={styles.logisticsSection}>
                    <div className={styles.logisticsSectionHeading}>
                      <h4>Manufacturing in Tiruppur</h4>
                      <span>Production overview</span>
                    </div>
                    <div className={styles.manufacturingCards}>
                      {MANUFACTURING_STAGES.map((stage) => <article key={stage.title}><strong>{stage.title}</strong><p>{stage.detail}</p></article>)}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {viewMode !== 'details' && <div className={styles.spotlightNavigation}>
                <span className={styles.spotlightNavLabel}>{featuredIndex >= 0 ? 'Featured selection' : 'Browse featured markets'}</span>
                <div className={styles.spotlightNavButtons}>
                  <motion.button type="button" aria-label="Previous featured market" onClick={() => navigateFeatured(-1)} className={styles.spotlightNavButton} whileHover={reduceMotion ? undefined : { x: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.96 }}>
                    <ArrowLeft aria-hidden="true" />
                  </motion.button>
                  <motion.button type="button" aria-label="Next featured market" onClick={() => navigateFeatured(1)} className={styles.spotlightNavButton} whileHover={reduceMotion ? undefined : { x: 2 }} whileTap={reduceMotion ? undefined : { scale: 0.96 }}>
                    <ArrowRight aria-hidden="true" />
                  </motion.button>
                </div>
              </div>}
            </motion.aside>
          </div>

          <div className={styles.countryListHeader}>
            <div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={activeContinent}
                  className={styles.countryListTitle}
                  initial={reduceMotion ? false : { opacity: 0, y: 6, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3 }}
                >Countries in {activeContinent}</motion.p>
              </AnimatePresence>
              <p className={styles.countryListMeta}>Select a flag to move the map marker</p>
            </div>
            <span className={styles.countryRange}>{String(pageStart).padStart(2, '0')}–{String(pageEnd).padStart(2, '0')} <i aria-hidden="true">/</i> {continentMarkets.length}</span>
          </div>

          <motion.ul layout className={styles.countryGrid} aria-label={'Potential markets in ' + activeContinent}>
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
