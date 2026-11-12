'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState, type KeyboardEvent } from 'react';
import { MARKETS } from './GlobalMarketsData';
import { getFeaturePath, projectCoordinates, regionFromGeography, type CountryFeature } from './marketGeography';
import styles from './GlobalExperience.module.css';

type InteractiveCountryMapProps = {
  selectedCode: string;
  reducedMotion: boolean;
  onSelect: (feature: CountryFeature) => void;
};

type CountryCollection = { features: CountryFeature[] };

function coordinateLabel(latitude: number, longitude: number) {
  const latDirection = latitude >= 0 ? 'N' : 'S';
  const lonDirection = longitude >= 0 ? 'E' : 'W';
  return Math.abs(latitude).toFixed(1) + '° ' + latDirection + ' / ' + Math.abs(longitude).toFixed(1) + '° ' + lonDirection;
}

function flagEmoji(code: string) {
  if (code.length !== 2) return '';
  const point = (letter: string) => 127397 + letter.toUpperCase().charCodeAt(0);
  return String.fromCodePoint(point(code[0]), point(code[1]));
}

function getFlag(code: string, className: string) {
  if (MARKETS.some((market) => market.code === code)) {
    return <Image src={'/assets/export/flags/' + code.toLowerCase() + '.svg'} width={32} height={24} alt="" aria-hidden="true" unoptimized className={className} />;
  }
  const emoji = flagEmoji(code);
  return emoji
    ? <span className={styles.countryFlagEmoji} aria-hidden="true">{emoji}</span>
    : <span className={styles.countryFlagFallback} aria-hidden="true">{code.slice(0, 2) || '—'}</span>;
}

function pathForFeature(feature: CountryFeature) {
  return { feature, d: getFeaturePath(feature) };
}

export function InteractiveCountryMap({ selectedCode, reducedMotion, onSelect }: InteractiveCountryMapProps) {
  const [features, setFeatures] = useState<CountryFeature[]>([]);
  const [hovered, setHovered] = useState<CountryFeature | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch('/assets/export/countries-50m.json', { cache: 'force-cache' })
      .then((response) => {
        if (!response.ok) throw new Error('Country geometry could not be loaded');
        return response.json() as Promise<CountryCollection>;
      })
      .then((collection) => {
        if (mounted) setFeatures(collection.features.map((feature, index) => ({ ...feature, id: feature.id + '-' + index })));
      })
      .catch(() => {
        // The existing world map image stays visible as a non-interactive fallback.
      });
    return () => { mounted = false; };
  }, []);

  const projectedFeatures = useMemo(() => features.map(pathForFeature), [features]);
  const selectedIndex = projectedFeatures.findIndex(({ feature }) => (
    feature.properties.alpha2 ? feature.properties.alpha2 === selectedCode : feature.id === selectedCode
  ));
  const tooltipPoint = hovered
    ? projectCoordinates(
      MARKETS.find((market) => market.code === hovered.properties.alpha2)?.lat ?? hovered.properties.label[1],
      MARKETS.find((market) => market.code === hovered.properties.alpha2)?.lon ?? hovered.properties.label[0],
    )
    : null;
  const tooltipRegion = hovered
    ? MARKETS.find((market) => market.code === hovered.properties.alpha2)?.region
      ?? regionFromGeography(hovered.properties.continent, hovered.properties.subregion)
    : '';
  const tooltipLatitude = hovered
    ? MARKETS.find((market) => market.code === hovered.properties.alpha2)?.lat ?? hovered.properties.label[1]
    : 0;
  const tooltipLongitude = hovered
    ? MARKETS.find((market) => market.code === hovered.properties.alpha2)?.lon ?? hovered.properties.label[0]
    : 0;

  function handleShapeKeyDown(event: KeyboardEvent<SVGPathElement>, index: number, feature: CountryFeature) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(feature);
      return;
    }

    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? projectedFeatures.length - 1
        : (index + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1) + projectedFeatures.length) % projectedFeatures.length;
    const nextFeature = projectedFeatures[nextIndex]?.feature;
    if (nextFeature) document.getElementById('market-country-' + nextFeature.id)?.focus();
  }

  return (
    <div className={styles.interactiveMap}>
      <Image
        src="/assets/export/world-map.svg"
        alt=""
        aria-hidden="true"
        fill
        unoptimized
        sizes="(max-width: 900px) 100vw, 64vw"
        className={[styles.worldMap, features.length ? styles.worldMapFallbackHidden : ''].filter(Boolean).join(' ')}
      />

      {features.length > 0 && (
        <svg
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid meet"
          className={[styles.worldMap, styles.countryMapSvg, styles.countryMapReady].join(' ')}
          role="group"
          aria-label="Interactive world map. Focus a country and use the arrow keys to browse, then press Enter to select it."
        >
          {projectedFeatures.map(({ feature, d }, index) => {
            const active = feature.properties.alpha2
              ? feature.properties.alpha2 === selectedCode
              : feature.id === selectedCode;
            const label = feature.properties.name + (feature.properties.alpha2 ? ' (' + feature.properties.alpha2 + ')' : '');
            return (
              <path
                key={feature.id}
                id={'market-country-' + feature.id}
                d={d}
                pathLength={1}
                className={[styles.countryShape, active ? styles.countryShapeSelected : ''].filter(Boolean).join(' ')}
                role="button"
                tabIndex={index === selectedIndex ? 0 : -1}
                aria-label={'Select ' + label + ', ' + (MARKETS.find((market) => market.code === feature.properties.alpha2)?.region ?? regionFromGeography(feature.properties.continent, feature.properties.subregion))}
                aria-pressed={active}
                onPointerEnter={() => setHovered(feature)}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setHovered(feature)}
                onBlur={() => setHovered(null)}
                onClick={() => onSelect(feature)}
                onKeyDown={(event) => handleShapeKeyDown(event, index, feature)}
              />
            );
          })}
        </svg>
      )}

      <AnimatePresence mode="wait">
        {hovered && tooltipPoint && (
          <motion.div
            key={hovered.id}
            className={styles.countryMapTooltip}
            style={{
              left: 'clamp(7.5rem, ' + Math.max(8, Math.min(92, tooltipPoint.x / 12)) + '%, calc(100% - 7.5rem))',
              top: Math.max(24, Math.min(92, tooltipPoint.y / 6)) + '%',
            }}
            initial={reducedMotion ? false : { opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -4, scale: 0.99 }}
            transition={{ duration: reducedMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="status"
          >
            <span className={styles.countryTooltipFlag}>{getFlag(hovered.properties.alpha2, styles.countryTooltipFlagImage)}</span>
            <span className={styles.countryTooltipCopy}>
              <strong>{hovered.properties.name}</strong>
              <span>{tooltipRegion} <i aria-hidden="true">·</i> {hovered.properties.alpha2 || 'No ISO code'}</span>
              <span>{coordinateLabel(tooltipLatitude, tooltipLongitude)}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
