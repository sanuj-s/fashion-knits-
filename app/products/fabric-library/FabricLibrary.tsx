'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Scan,
  Search,
  X,
} from 'lucide-react';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { MATERIAL_DIRECTIONS, type MaterialDirection, type MaterialFilter } from '../products-experience-data';
import { getMaterialTint, MaterialTexture } from './material-texture';
import styles from './fabric-library.module.css';

export type MaterialImages = Record<string, { src: string; alt: string }>;
type LibraryView = 'stage' | 'wall';

const FILTERS: { id: MaterialFilter; label: string }[] = [
  { id: 'natural', label: 'Natural' },
  { id: 'recycled', label: 'Recycled' },
  { id: 'blended', label: 'Blended' },
  { id: 'lightweight', label: 'Lightweight' },
  { id: 'heavier', label: 'Heavier' },
  { id: 'stretch', label: 'Stretch' },
  { id: 'soft-touch', label: 'Soft touch' },
];

const MATERIAL_GROUPS = ['Fibre direction', 'Fabric construction'] as const;
const FIBRES = MATERIAL_DIRECTIONS.filter((material) => material.kind === 'Fibre direction');
const CONSTRUCTIONS = MATERIAL_DIRECTIONS.filter((material) => material.kind === 'Fabric construction');

function quoteHref(materials: MaterialDirection[], customizations: string[] = []) {
  const names = materials.map((material) => material.name);
  const params = new URLSearchParams({
    product: 'Custom programs / OEM',
    productId: materials.length === 1 ? `material-${materials[0].id}` : 'material-library',
    productName: materials.length === 1 ? materials[0].name : 'Material development brief',
    productCategory: 'Custom programs / OEM',
  });
  if (names.length) params.set('fabric', names.join(' · '));
  if (customizations.length) params.set('customizations', customizations.join(' · '));
  return `/get-a-quote?${params.toString()}`;
}

function Artwork({
  material,
  image,
  className,
  alt,
  tint,
}: {
  material: MaterialDirection;
  image?: MaterialImages[string];
  className?: string;
  alt?: string;
  tint?: string;
}) {
  const photo = image ?? (material.image ? { src: material.image, alt: material.imageAlt ?? `${material.name} fabric texture` } : undefined);
  return (
    <div className={`${styles.artwork} ${className ?? ''}`}>
      {photo ? (
        <Image src={photo.src} alt={alt ?? photo.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 60vw, 45vw" className={styles.photo} loading="lazy" />
      ) : (
        <MaterialTexture materialId={material.id} tint={tint} className={styles.texture} />
      )}
    </div>
  );
}

function optionalSpecs(material: MaterialDirection) {
  return [
    material.gsm ? ['GSM', material.gsm] : null,
    material.moq ? ['MOQ', material.moq] : null,
    material.leadTime ? ['Lead time', material.leadTime] : null,
    material.certifications?.length ? ['Certifications', material.certifications.join(', ')] : null,
  ].filter((entry): entry is [string, string] => Boolean(entry));
}

function useDialogAccess(
  open: boolean,
  onClose: () => void,
  dialogRef: React.RefObject<HTMLElement | null>,
  returnFocusRef: React.MutableRefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const returnFocus = returnFocusRef.current ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusable = [...dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')];
    focusable[0]?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocus?.focus({ preventScroll: true });
      returnFocusRef.current = null;
    };
  }, [dialogRef, onClose, open, returnFocusRef]);
}

function LoupeArtwork({
  material,
  image,
  enabled,
  className,
}: {
  material: MaterialDirection;
  image?: MaterialImages[string];
  enabled: boolean;
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const latestPointerRef = useRef<{ clientX: number; clientY: number } | null>(null);
  const [touching, setTouching] = useState(false);

  const updateLens = useCallback((clientX: number, clientY: number) => {
    latestPointerRef.current = { clientX, clientY };
    if (pointerFrameRef.current !== null) return;
    pointerFrameRef.current = window.requestAnimationFrame(() => {
      pointerFrameRef.current = null;
      const point = latestPointerRef.current;
      const frame = frameRef.current;
      const lens = lensRef.current;
      const zoom = zoomRef.current;
      if (!point || !frame || !lens || !zoom) return;
      const bounds = frame.getBoundingClientRect();
      const x = Math.max(0, Math.min(bounds.width, point.clientX - bounds.left));
      const y = Math.max(0, Math.min(bounds.height, point.clientY - bounds.top));
      const radius = 85;
      lens.style.left = `${Math.max(0, Math.min(bounds.width - 170, x - radius))}px`;
      lens.style.top = `${Math.max(0, Math.min(bounds.height - 170, y - radius))}px`;
      zoom.style.left = `${radius - x * 2.5}px`;
      zoom.style.top = `${radius - y * 2.5}px`;
    });
  }, []);

  useEffect(() => () => {
    if (pointerFrameRef.current !== null) window.cancelAnimationFrame(pointerFrameRef.current);
  }, []);

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch' && !enabled) return;
    updateLens(event.clientX, event.clientY);
    if (event.pointerType === 'touch') setTouching(true);
  };

  return (
    <div ref={frameRef} className={`${styles.loupeFrame} ${className ?? ''}`} onPointerMove={onPointerMove} onPointerDown={(event) => { if (event.pointerType === 'touch') { event.currentTarget.setPointerCapture(event.pointerId); updateLens(event.clientX, event.clientY); setTouching(true); } }} onPointerUp={(event) => { if (event.pointerType === 'touch') setTouching(false); }} onPointerCancel={() => setTouching(false)}>
      <Artwork material={material} image={image} />
      <div ref={lensRef} aria-hidden="true" className={`${styles.loupeLens}${(enabled || touching) ? ` ${styles.loupeVisible}` : ''}`}>
        <div ref={zoomRef} className={styles.loupeZoom}><Artwork material={material} image={image} /></div>
      </div>
    </div>
  );
}

function SpecReadout({ label, value }: { label: string; value: string }) {
  return <div className={styles.specReadout}><dt>{label}</dt><dd>{value}</dd></div>;
}

export function FabricLibrary({ materialImages = {} }: { materialImages?: MaterialImages }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const indexButtonsRef = useRef(new Map<string, HTMLButtonElement>());
  const detailsRef = useRef<HTMLElement>(null);
  const compareRef = useRef<HTMLElement>(null);
  const detailsReturnRef = useRef<HTMLElement | null>(null);
  const compareReturnRef = useRef<HTMLElement | null>(null);
  const previewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spotlightFrame = useRef<number | null>(null);
  const spotlightPending = useRef<{ tile: HTMLButtonElement; x: number; y: number } | null>(null);
  const [query, setQuery] = useState('');
  const [selectedKinds, setSelectedKinds] = useState<Set<string>>(() => new Set(MATERIAL_GROUPS));
  const [selectedFilters, setSelectedFilters] = useState<Set<MaterialFilter>>(() => new Set());
  const [selectedId, setSelectedId] = useState(MATERIAL_DIRECTIONS[0].id);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [view, setView] = useState<LibraryView>('stage');
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const [loupeEnabled, setLoupeEnabled] = useState(false);
  const [detailLoupeEnabled, setDetailLoupeEnabled] = useState(false);
  const [compareNotice, setCompareNotice] = useState('');
  const [targetGsm, setTargetGsm] = useState('');
  const [endUse, setEndUse] = useState('');
  const [selectedFibreId, setSelectedFibreId] = useState(FIBRES[0].id);
  const [selectedConstructionId, setSelectedConstructionId] = useState(CONSTRUCTIONS[0].id);

  const filteredMaterials = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return MATERIAL_DIRECTIONS.filter((material) => {
      const inKind = selectedKinds.has(material.kind);
      const inFilters = selectedFilters.size === 0 || [...selectedFilters].some((filter) => material.filters.includes(filter));
      const searchable = [material.name, material.kind, material.composition, material.feel, material.breathability, material.stretch, material.applications, material.care, ...material.filters].join(' ').toLocaleLowerCase();
      return inKind && inFilters && (!needle || searchable.includes(needle));
    });
  }, [query, selectedFilters, selectedKinds]);

  const activeMaterial = MATERIAL_DIRECTIONS.find((material) => material.id === (previewId ?? selectedId)) ?? MATERIAL_DIRECTIONS[0];
  const activeImage = materialImages[activeMaterial.id];
  const activeDetail = detailsId ? MATERIAL_DIRECTIONS.find((material) => material.id === detailsId) ?? null : null;
  const selectedForCompare = compareIds.map((id) => MATERIAL_DIRECTIONS.find((material) => material.id === id)).filter((material): material is MaterialDirection => Boolean(material));
  const selectedFibre = FIBRES.find((material) => material.id === selectedFibreId) ?? FIBRES[0];
  const selectedConstruction = CONSTRUCTIONS.find((material) => material.id === selectedConstructionId) ?? CONSTRUCTIONS[0];
  const globalIndex = MATERIAL_DIRECTIONS.findIndex((material) => material.id === activeMaterial.id) + 1;
  const groupedMaterials = MATERIAL_GROUPS.map((group) => ({
    label: group === 'Fibre direction' ? 'Fibres' : 'Constructions',
    kind: group,
    items: filteredMaterials.filter((material) => material.kind === group),
    total: MATERIAL_DIRECTIONS.filter((material) => material.kind === group).length,
  }));

  const closeDetails = useCallback(() => setDetailsId(null), []);
  const closeCompare = useCallback(() => setCompareOpen(false), []);
  useDialogAccess(Boolean(activeDetail), closeDetails, detailsRef, detailsReturnRef);
  useDialogAccess(compareOpen, closeCompare, compareRef, compareReturnRef);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.08) {
          entry.target.setAttribute('data-entered', 'true');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: [0.08] });
    section.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    if (previewTimer.current) clearTimeout(previewTimer.current);
    if (spotlightFrame.current !== null) window.cancelAnimationFrame(spotlightFrame.current);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      const isTextEntry = target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
      if (isTextEntry || activeDetail || compareOpen) return;
      if (event.key.toLowerCase() === 'l') setLoupeEnabled((enabled) => !enabled);
      if (event.key === 'Escape' && query) setQuery('');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeDetail, compareOpen, query]);

  const clearPreviewTimer = () => {
    if (previewTimer.current) clearTimeout(previewTimer.current);
    previewTimer.current = null;
  };

  const previewMaterial = (id: string) => {
    clearPreviewTimer();
    previewTimer.current = setTimeout(() => setPreviewId(id), 80);
  };

  const clearPreview = () => {
    clearPreviewTimer();
    setPreviewId(null);
  };

  const selectMaterial = (material: MaterialDirection, shouldScroll = false) => {
    clearPreview();
    setSelectedId(material.id);
    if (shouldScroll && window.matchMedia('(max-width: 767px)').matches) {
      window.requestAnimationFrame(() => stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  };

  const openDetails = (id: string) => {
    detailsReturnRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setDetailsId(id);
  };

  const toggleKind = (kind: string) => {
    setSelectedKinds((current) => {
      const next = new Set(current);
      if (next.has(kind)) next.delete(kind); else next.add(kind);
      return next;
    });
  };

  const toggleFilter = (filter: MaterialFilter) => {
    setSelectedFilters((current) => {
      const next = new Set(current);
      if (next.has(filter)) next.delete(filter); else next.add(filter);
      return next;
    });
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedKinds(new Set(MATERIAL_GROUPS));
    setSelectedFilters(new Set());
  };

  const toggleCompare = (id: string) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((item) => item !== id));
      setCompareNotice('');
      return;
    }
    if (compareIds.length >= 3) {
      setCompareNotice('Compare up to three material directions at a time. Remove one to add another.');
      return;
    }
    setCompareIds([...compareIds, id]);
    setCompareNotice('');
  };

  const navigateRow = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowDown') nextIndex = Math.min(filteredMaterials.length - 1, index + 1);
    if (event.key === 'ArrowUp') nextIndex = Math.max(0, index - 1);
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = filteredMaterials.length - 1;
    if (event.key === ' ') {
      event.preventDefault();
      toggleCompare(filteredMaterials[index].id);
      return;
    }
    if (nextIndex !== null) {
      event.preventDefault();
      const next = filteredMaterials[nextIndex];
      selectMaterial(next);
      indexButtonsRef.current.get(next.id)?.focus();
    }
  };

  const openCompare = () => {
    compareReturnRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setCompareOpen(true);
  };

  const enquiryCustomizations = [
    `Fibre direction: ${selectedFibre.name}`,
    `Construction direction: ${selectedConstruction.name}`,
    targetGsm.trim() ? `Target GSM: ${targetGsm.trim()}` : '',
    endUse.trim() ? `End use: ${endUse.trim()}` : '',
  ].filter(Boolean);
  const buildHref = quoteHref([selectedFibre, selectedConstruction], enquiryCustomizations);

  const openNextDetail = (direction: -1 | 1) => {
    if (!activeDetail) return;
    const current = MATERIAL_DIRECTIONS.findIndex((material) => material.id === activeDetail.id);
    const next = MATERIAL_DIRECTIONS[(current + direction + MATERIAL_DIRECTIONS.length) % MATERIAL_DIRECTIONS.length];
    setDetailsId(next.id);
  };

  const currentSpecRows: [string, string][] = [
    ['Composition', activeMaterial.composition],
    ['Feel & texture', activeMaterial.feel],
    ['Breathability', activeMaterial.breathability],
  ];

  return (
    <section ref={sectionRef} id="materials" aria-labelledby="materials-title" className={`${styles.library}${activeDetail || compareOpen ? ` ${styles.libraryOverlayOpen}` : ''}`}>
      <svg className={styles.grain} aria-hidden="true" focusable="false">
        <filter id="fabric-library-grain"><feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="2" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#fabric-library-grain)" />
      </svg>

      <div className={styles.inner}>
        <header className={styles.headingBlock}>
          <div data-reveal className={styles.eyebrow}><span aria-hidden="true" />Materials · fibres &amp; constructions</div>
          <div className={styles.headingGrid}>
            <h2 id="materials-title" data-reveal className={styles.heading}>Explore our fabric &amp; <span>material library.</span></h2>
            <p data-reveal className={styles.intro}>Compare fibre and fabric construction directions. Availability, content, weight and performance depend on sourcing and development confirmation for each programme.</p>
          </div>
          <p data-reveal className={styles.headingNote}>A fabric decision starts with the intended hand, use and finish.</p>
        </header>

        <div className={styles.ribbonWrap} aria-label="Material texture references">
          <div className={styles.ribbonLabel}><span>Texture references</span><span>16 directions</span></div>
          <div className={styles.ribbonViewport}>
            <div className={styles.ribbonTrack}>
              {[0, 1].map((copy) => (
                <div key={copy} className={styles.ribbonSet} aria-hidden={copy === 1}>
                  {MATERIAL_DIRECTIONS.map((material, index) => (
                    <button key={`${copy}-${material.id}`} type="button" className={styles.ribbonTile} tabIndex={copy ? -1 : 0} aria-label={`Select ${material.name} in the stage`} onClick={() => selectMaterial(material, true)}>
                      <Artwork material={material} image={materialImages[material.id]} />
                      <span className={styles.ribbonShade} />
                      <span className={styles.ribbonTileMeta}><span>{String(index + 1).padStart(2, '0')}</span><span>{material.name}</span></span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${styles.workspace}${view === 'wall' ? ` ${styles.workspaceWall}` : ''}`}>
          {view === 'stage' && <div ref={stageRef} className={styles.stageColumn}>
            <div className={styles.stage}>
              <div className={styles.stageArt} key={activeMaterial.id}>
                <LoupeArtwork material={activeMaterial} image={activeImage} enabled={loupeEnabled} className={styles.stageArtwork} />
              </div>
              <div aria-hidden="true" className={styles.stageVeil} />
              <div className={styles.stageTopline}>
                <span className={styles.indexWatermark}>{String(globalIndex).padStart(2, '0')}</span>
                <span className={styles.kindBadge}>{activeMaterial.kind === 'Fibre direction' ? 'Fibre' : 'Construction'}</span>
              </div>
              <div className={styles.stageContent}>
                <div className={styles.stageMaterialMeta}><span>Material direction</span><span aria-hidden="true" /></div>
                <h3>{activeMaterial.name}</h3>
                <dl className={styles.stageSpecs}>{currentSpecRows.slice(0, 3).map(([label, value]) => <SpecReadout key={label} label={label} value={value} />)}</dl>
                {optionalSpecs(activeMaterial).length > 0 && <dl className={styles.stageOptional}>{optionalSpecs(activeMaterial).slice(0, 3).map(([label, value]) => <SpecReadout key={label} label={label} value={value} />)}</dl>}
              </div>
              <span className={styles.textureCaption}>{activeImage || activeMaterial.image ? '' : 'Illustrative texture'}</span>
              <button type="button" className={`${styles.loupeToggle}${loupeEnabled ? ` ${styles.loupeToggleOn}` : ''}`} aria-pressed={loupeEnabled} onClick={() => setLoupeEnabled((enabled) => !enabled)}><Scan aria-hidden="true" size={14} />Loupe <kbd>L</kbd></button>
            </div>
            <div className={styles.stageFooter}><span>From fibre to construction</span><span>{String(globalIndex).padStart(2, '0')} / 16</span></div>
          </div>}

          <aside className={`${styles.indexPanel}${view === 'wall' ? ` ${styles.indexPanelWall}` : ''}`} aria-label="Material index">
            <div className={styles.indexTop}>
              <div><p className={styles.indexEyebrow}>The index</p><h3>Find a direction.</h3></div>
              <div className={styles.viewToggle} role="group" aria-label="Material display">
                <button type="button" aria-pressed={view === 'stage'} onClick={() => setView('stage')}>Stage</button>
                <button type="button" aria-pressed={view === 'wall'} onClick={() => setView('wall')}>Wall</button>
              </div>
            </div>

            <div className={styles.searchBox}>
              <Search aria-hidden="true" size={16} />
              <label className={styles.visuallyHidden} htmlFor="material-library-search">Search material directions</label>
              <input id="material-library-search" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') setQuery(''); }} placeholder="Search fibre, texture or use" />
              {query && <button type="button" aria-label="Clear search" onClick={() => setQuery('')}><X aria-hidden="true" size={15} /></button>}
            </div>

            <div className={styles.filterGroup}>
              <div className={styles.filterGroupLabel}>Material group</div>
              <div className={styles.filterChips}>
                {MATERIAL_GROUPS.map((kind) => (
                  <button key={kind} type="button" className={styles.filterChip} aria-pressed={selectedKinds.has(kind)} onClick={() => toggleKind(kind)}>{kind === 'Fibre direction' ? 'Fibres' : 'Constructions'}<span>{MATERIAL_DIRECTIONS.filter((material) => material.kind === kind).length}</span></button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <div className={styles.filterGroupLabel}>Properties</div>
              <div className={styles.filterChips}>
                {FILTERS.map((filter) => <button key={filter.id} type="button" className={styles.filterChip} aria-pressed={selectedFilters.has(filter.id)} onClick={() => toggleFilter(filter.id)}>{filter.label}</button>)}
              </div>
            </div>

            <div className={styles.resultLine}>
              <span>{filteredMaterials.length} of 16 directions</span>
              <button type="button" onClick={clearFilters} disabled={!query && selectedKinds.size === MATERIAL_GROUPS.length && selectedFilters.size === 0}>Clear filters</button>
            </div>

            {view === 'stage' && (filteredMaterials.length ? (
              <div className={styles.materialGroups}>
                {groupedMaterials.filter((group) => selectedKinds.has(group.kind) || selectedKinds.size === 0).map((group) => (
                  group.items.length > 0 && <section key={group.kind} className={styles.materialGroup} aria-label={`${group.label} ${group.items.length} of ${group.total}`}>
                    <div className={styles.groupHeading}><h4>{group.label}</h4><span>{String(group.items.length).padStart(2, '0')} <i>/ {String(group.total).padStart(2, '0')}</i></span></div>
                    <div className={styles.rowList}>
                      {group.items.map((material) => {
                        const globalRowIndex = filteredMaterials.findIndex((item) => item.id === material.id);
                        const active = material.id === selectedId;
                        const compared = compareIds.includes(material.id);
                        return <article key={material.id} className={`${styles.materialRow}${active ? ` ${styles.materialRowActive}` : ''}`} onMouseEnter={() => previewMaterial(material.id)} onMouseLeave={clearPreview} onFocus={() => previewMaterial(material.id)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) clearPreview(); }}>
                          <button ref={(node) => { if (node) indexButtonsRef.current.set(material.id, node); else indexButtonsRef.current.delete(material.id); }} type="button" className={styles.rowSelect} aria-label={`${String(MATERIAL_DIRECTIONS.indexOf(material) + 1).padStart(2, '0')}, ${material.name}, ${material.kind}. Press Enter to select, Space to compare.`} aria-current={active ? 'true' : undefined} onClick={() => selectMaterial(material, true)} onKeyDown={(event) => navigateRow(event, globalRowIndex)}>
                            <span className={styles.rowNumber}>{String(MATERIAL_DIRECTIONS.indexOf(material) + 1).padStart(2, '0')}</span>
                            <span className={styles.rowThumb}><Artwork material={material} image={materialImages[material.id]} /></span>
                            <span className={styles.rowCopy}><span className={styles.rowName}>{material.name}</span><span className={styles.rowDescriptor}>{material.feel}</span></span>
                            <span aria-hidden="true" className={styles.rowArrow}><ArrowUpRight size={15} /></span>
                          </button>
                          {active && <div className={styles.rowExpanded}>
                            <span className={styles.rowExpandedLabel}>Development possibility</span>
                            <p>{material.composition}</p>
                            <div className={styles.rowActions}>
                              <button type="button" onClick={() => openDetails(material.id)}>Details <ArrowUpRight aria-hidden="true" size={13} /></button>
                              <Link href={quoteHref([material], [`Material direction: ${material.name}`])}>Enquire <ArrowRight aria-hidden="true" size={13} /></Link>
                              <button type="button" className={styles.rowCompare} aria-pressed={compared} onClick={() => toggleCompare(material.id)}>{compared ? <Check aria-hidden="true" size={13} /> : <Plus aria-hidden="true" size={13} />}{compared ? 'In compare' : 'Compare'}</button>
                            </div>
                          </div>}
                        </article>;
                      })}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}><span>00</span><h4>No directions found.</h4><p>Try a different word or clear your filters to see all materials.</p><button type="button" onClick={clearFilters}>Reset the index <ArrowRight aria-hidden="true" size={14} /></button></div>
            ))}
            {view === 'stage' && <p className={styles.keyboardHint}>Use ↑ ↓ to move · Enter to select · Space to compare · Esc to clear search</p>}
          </aside>
        </div>

        {view === 'wall' && <div className={styles.wallSection} aria-label="Material swatch wall">
          <div className={styles.wallHeader}><div><p className={styles.indexEyebrow}>Material wall</p><h3>Surface, considered.</h3></div><p>Hover a swatch to reveal its fibre and construction notes.</p></div>
          {filteredMaterials.length ? <div className={styles.wallGrid}>{filteredMaterials.map((material) => {
            const image = materialImages[material.id];
            const number = String(MATERIAL_DIRECTIONS.indexOf(material) + 1).padStart(2, '0');
            return <button key={material.id} type="button" className={styles.wallTile} aria-label={`Open details for ${material.name}`} onClick={() => openDetails(material.id)} onPointerMove={(event) => {
              const tile = event.currentTarget;
              const bounds = tile.getBoundingClientRect();
              spotlightPending.current = { tile, x: event.clientX - bounds.left, y: event.clientY - bounds.top };
              if (spotlightFrame.current !== null) return;
              spotlightFrame.current = window.requestAnimationFrame(() => {
                spotlightFrame.current = null;
                const point = spotlightPending.current;
                if (!point?.tile.isConnected) return;
                point.tile.style.setProperty('--spot-x', `${point.x}px`);
                point.tile.style.setProperty('--spot-y', `${point.y}px`);
              });
            }}>
              <Artwork material={material} image={image} />
              <span className={styles.wallSpotlight} />
              <span className={styles.pinkedEdge} aria-hidden="true" />
              <span className={styles.wallCorner}><span>{material.kind === 'Fibre direction' ? 'Fibre' : 'Construction'}</span><span>{material.feel}</span></span>
              <span className={styles.wallCaption}><span>{number}</span><strong>{material.name}</strong><ArrowUpRight aria-hidden="true" size={16} /></span>
            </button>;
          })}</div> : <p className={styles.wallEmpty}>No material directions match the current filters.</p>}
        </div>}

        <div className={styles.buildSection}>
          <div className={styles.buildHeading}><p className={styles.eyebrow}><span aria-hidden="true" />Build your fabric</p><h3>A starting point, <span>made yours.</span></h3><p>Pair a fibre direction with a construction to begin a conversation around your fabric brief.</p></div>
          <div className={styles.buildGrid}>
            <div className={styles.buildControls}>
              <div className={styles.buildControlGroup}><div className={styles.buildLabel}><span>01</span><h4>Choose a fibre</h4><span>{FIBRES.length} directions</span></div><div className={styles.choicePills}>{FIBRES.map((material) => <button key={material.id} type="button" aria-pressed={selectedFibre.id === material.id} onClick={() => setSelectedFibreId(material.id)}>{material.name}</button>)}</div></div>
              <div className={styles.buildControlGroup}><div className={styles.buildLabel}><span>02</span><h4>Choose a construction</h4><span>{CONSTRUCTIONS.length} directions</span></div><div className={styles.choicePills}>{CONSTRUCTIONS.map((material) => <button key={material.id} type="button" aria-pressed={selectedConstruction.id === material.id} onClick={() => setSelectedConstructionId(material.id)}>{material.name}</button>)}</div></div>
              <div className={styles.buildInputs}>
                <label><span>Target GSM <i>optional</i></span><input value={targetGsm} onChange={(event) => setTargetGsm(event.target.value)} placeholder="Enter your target" inputMode="decimal" /></label>
                <label><span>End use <i>optional</i></span><input value={endUse} onChange={(event) => setEndUse(event.target.value)} placeholder="Describe the intended garment" /></label>
              </div>
              <Link href={buildHref} className={styles.buildCta}>Start an enquiry with this brief <ArrowRight aria-hidden="true" size={17} /></Link>
            </div>
            <div className={styles.compositeCard}>
              <div className={styles.compositePreview}>
                <MaterialTexture materialId={selectedFibre.id} className={styles.compositeBase} />
                <MaterialTexture materialId={selectedConstruction.id} tint={getMaterialTint(selectedFibre.id)} className={styles.compositeTop} />
                <span className={styles.compositeLabel}>Composite direction · visual reference</span>
              </div>
              <div className={styles.compositeFooter}><span>Fibre · construction</span><h4>{selectedFibre.name} <i>·</i> {selectedConstruction.name}</h4><span className={styles.compositeCounter}>16 directions</span></div>
            </div>
          </div>
          <p className={styles.libraryDisclaimer}>Material directions are a starting library, not a statement of current inventory or guaranteed availability. Fibre content, yarn, GSM, care and performance values are not specified here; they must be agreed and verified for each approved sample.</p>
        </div>

        {selectedForCompare.length > 0 && <div className={styles.compareTray} aria-live="polite">
          <div className={styles.trayDescription}><strong>Material comparison · {selectedForCompare.length} of 3</strong><span>Select two or three directions to compare the development considerations.</span></div>
          <div className={styles.trayItems}>{selectedForCompare.map((material) => <div key={material.id} className={styles.trayItem}><span className={styles.trayThumb}><Artwork material={material} image={materialImages[material.id]} /></span><span>{material.name}</span><button type="button" aria-label={`Remove ${material.name} from comparison`} onClick={() => toggleCompare(material.id)}><X aria-hidden="true" size={13} /></button></div>)}</div>
          <div className={styles.trayActions}><button type="button" onClick={() => setCompareIds([])}>Clear</button><button type="button" onClick={openCompare} disabled={selectedForCompare.length < 2}>Compare <span>{selectedForCompare.length}</span><ArrowRight aria-hidden="true" size={15} /></button></div>
        </div>}
        {compareNotice && <p className={styles.compareNotice} role="status">{compareNotice}</p>}
      </div>

      {activeDetail && <div className={styles.overlay} onMouseDown={(event) => { if (event.target === event.currentTarget) closeDetails(); }}>
        <section ref={detailsRef} role="dialog" aria-modal="true" aria-labelledby="fabric-detail-title" className={styles.detailSheet}>
          <button type="button" className={styles.closeButton} aria-label="Close material details" onClick={closeDetails}><X aria-hidden="true" size={17} /></button>
          <div className={styles.detailArtWrap}>
            <div key={activeDetail.id} className={styles.detailArtwork}><LoupeArtwork material={activeDetail} image={materialImages[activeDetail.id]} enabled={detailLoupeEnabled} /></div>
            <span className={styles.detailArtworkShade} />
            <span className={styles.detailIndex}>{String(MATERIAL_DIRECTIONS.indexOf(activeDetail) + 1).padStart(2, '0')}</span>
            <p className={styles.textureCaption}>{materialImages[activeDetail.id] || activeDetail.image ? '' : 'Illustrative texture'}</p>
            <button type="button" className={`${styles.loupeToggle} ${styles.detailLoupeToggle}${detailLoupeEnabled ? ` ${styles.loupeToggleOn}` : ''}`} aria-pressed={detailLoupeEnabled} onClick={() => setDetailLoupeEnabled((enabled) => !enabled)}><Scan aria-hidden="true" size={14} />Loupe</button>
            <button type="button" className={styles.detailNavPrev} aria-label="Previous material direction" onClick={() => openNextDetail(-1)}><ChevronLeft aria-hidden="true" size={19} /></button>
            <button type="button" className={styles.detailNavNext} aria-label="Next material direction" onClick={() => openNextDetail(1)}><ChevronRight aria-hidden="true" size={19} /></button>
          </div>
          <div className={styles.detailContent}>
            <p className={styles.eyebrow}><span aria-hidden="true" />{activeDetail.kind} · development possibility</p>
            <h2 id="fabric-detail-title">{activeDetail.name}</h2>
            <p className={styles.detailIntro}>{activeDetail.feel}</p>
            <dl className={styles.detailSpecs}>
              {[
                ['Composition', activeDetail.composition],
                ['Feel & texture', activeDetail.feel],
                ['Breathability', activeDetail.breathability],
                ['Stretch', activeDetail.stretch],
                ['Typical applications', activeDetail.applications],
                ['Care', activeDetail.care],
                ['Weight & GSM', 'Not specified in this catalogue; agree against the buyer brief and approved sample.'],
                ['Customisation', 'Colour, finish, print, embroidery, trims and labels can be discussed for each confirmed material direction.'],
                ...optionalSpecs(activeDetail),
              ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <p className={styles.detailDisclaimer}>Availability, sourcing, fibre content, certification and performance claims require programme-specific confirmation.</p>
            <div className={styles.detailActions}>
              <button type="button" className={styles.detailCompare} aria-pressed={compareIds.includes(activeDetail.id)} onClick={() => toggleCompare(activeDetail.id)}>{compareIds.includes(activeDetail.id) ? <Check aria-hidden="true" size={15} /> : <Plus aria-hidden="true" size={15} />}{compareIds.includes(activeDetail.id) ? 'Remove from comparison' : 'Add to compare'}</button>
              <Link href={quoteHref([activeDetail], [`Material direction: ${activeDetail.name}`])} className={styles.detailEnquire}>Enquire with this material <ArrowRight aria-hidden="true" size={16} /></Link>
            </div>
          </div>
        </section>
      </div>}

      {compareOpen && <div className={styles.overlay} onMouseDown={(event) => { if (event.target === event.currentTarget) closeCompare(); }}>
        <section ref={compareRef} role="dialog" aria-modal="true" aria-labelledby="fabric-compare-title" className={styles.compareDialog}>
          <div className={styles.compareHeader}><div><p className={styles.eyebrow}><span aria-hidden="true" />Side by side · {selectedForCompare.length} directions</p><h2 id="fabric-compare-title">Compare materials.</h2></div><button type="button" className={styles.closeButton} aria-label="Close comparison" onClick={closeCompare}><X aria-hidden="true" size={17} /></button></div>
          <div className={styles.compareScroll}>
            <div className={styles.compareColumns}>
              {selectedForCompare.map((material) => <article key={material.id} className={styles.compareColumn}>
                <div className={styles.compareArt}><Artwork material={material} image={materialImages[material.id]} /><span>{String(MATERIAL_DIRECTIONS.indexOf(material) + 1).padStart(2, '0')}</span></div>
                <p className={styles.compareKind}>{material.kind}</p><h3>{material.name}</h3>
              </article>)}
            </div>
            {([
              ['Composition', (material: MaterialDirection) => material.composition],
              ['Feel & texture', (material: MaterialDirection) => material.feel],
              ['Breathability', (material: MaterialDirection) => material.breathability],
              ['Stretch', (material: MaterialDirection) => material.stretch],
              ['Typical applications', (material: MaterialDirection) => material.applications],
              ['Care', (material: MaterialDirection) => material.care],
              ['GSM', (material: MaterialDirection) => material.gsm],
              ['MOQ', (material: MaterialDirection) => material.moq],
              ['Lead time', (material: MaterialDirection) => material.leadTime],
              ['Certifications', (material: MaterialDirection) => material.certifications?.join(', ')],
            ] as [string, (material: MaterialDirection) => string | undefined][]).filter(([, getValue]) => selectedForCompare.some((material) => Boolean(getValue(material)))).map(([label, getValue]) => <div key={label} className={styles.compareRow}><strong>{label}</strong>{selectedForCompare.map((material) => <span key={material.id}>{getValue(material) || '—'}</span>)}</div>)}
          </div>
          <div className={styles.compareFooter}><p>Availability, composition and performance are confirmed for each programme.</p><Link href={quoteHref(selectedForCompare, ['Compared material directions: ' + selectedForCompare.map((material) => material.name).join(', ')])}>Enquire about these <ArrowRight aria-hidden="true" size={16} /></Link></div>
        </section>
      </div>}
    </section>
  );
}
