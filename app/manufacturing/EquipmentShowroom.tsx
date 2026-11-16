'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Layers,
  Ruler,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';
import {
  PROCESS_STAGES,
  SHOWROOM_MACHINES,
  type MachineHotspot,
  type ProcessId,
  type ShowroomMachine,
} from './equipment-showroom-data';
import styles from './equipment-showroom.module.css';

const machineTransition = {
  duration: 0.26,
  ease: [0.22, 1, 0.36, 1] as const,
};

const indexText = (index: number) => String(index + 1).padStart(2, '0');
const countText = (count: number) => String(count).padStart(2, '0');

const DETAIL_TABS = [
  { id: 'overview', label: 'Overview', Icon: Eye },
  { id: 'capabilities', label: 'Capabilities', Icon: Sparkles },
  { id: 'how-it-works', label: 'How it works', Icon: Workflow },
  { id: 'technical', label: 'Technical details', Icon: Ruler },
] as const;

type DetailTab = (typeof DETAIL_TABS)[number]['id'];

function getCoverFocus(points: number[], visibleFraction: number) {
  const cropRange = 1 - visibleFraction;
  if (cropRange <= 0 || points.length === 0) return { offset: 0, position: 50 };

  const midpoint = (Math.min(...points) + Math.max(...points)) / 2;
  const offset = Math.max(0, Math.min(cropRange, midpoint - visibleFraction / 2));

  return { offset, position: (offset / cropRange) * 100 };
}

function EquipmentVisual({
  machine,
  onSelectHotspot,
  selectedHotspot,
  reduceMotion,
}: {
  machine: ShowroomMachine;
  onSelectHotspot: (hotspot: MachineHotspot) => void;
  selectedHotspot: string | null;
  reduceMotion: boolean;
}) {
  const frameAspect = 4 / 3;
  const imageAspect = machine.imageWidth / machine.imageHeight;
  const visibleWidth = Math.min(1, frameAspect / imageAspect);
  const visibleHeight = Math.min(1, imageAspect / frameAspect);
  const horizontalFocus = getCoverFocus(machine.hotspots.map((hotspot) => hotspot.x / 100), visibleWidth);
  const verticalFocus = getCoverFocus(machine.hotspots.map((hotspot) => hotspot.y / 100), visibleHeight);

  return (
    <div
      className={styles.visualStage}
      aria-label={`${machine.name} equipment view`}
    >
      <div className={styles.visualMeta}>
        <span>{machine.manufacturer}</span>
        <span>{machine.process.toUpperCase().replace('-', ' / ')}</span>
      </div>

      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={machine.id}
          className={styles.machineCanvas}
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.975, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.005, y: reduceMotion ? 0 : -4 }}
          transition={reduceMotion ? { duration: 0 } : machineTransition}
        >
          <Image
            src={machine.image}
            alt={`Representative ${machine.manufacturer} equipment image: ${machine.name}`}
            fill
            sizes="(max-width: 767px) 92vw, (max-width: 1279px) 90vw, 62vw"
            className={styles.machineImage}
            style={{ objectPosition: `${horizontalFocus.position}% ${verticalFocus.position}%` }}
            priority={machine.id === 'lectra'}
          />

          <div className={styles.hotspotLayer} role="group" aria-label={`Inspectable machine features for ${machine.name}`}>
            {machine.hotspots.map((hotspot, index) => {
              const x = ((hotspot.x / 100 - horizontalFocus.offset) / visibleWidth) * 100;
              const y = ((hotspot.y / 100 - verticalFocus.offset) / visibleHeight) * 100;

              return (
                <button
                  key={hotspot.id}
                  type="button"
                  className={`${styles.hotspot} ${selectedHotspot === hotspot.id ? styles.hotspotSelected : ''}`}
                  data-label-side={x >= 46 ? 'left' : 'right'}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  aria-label={`Inspect ${hotspot.label} on ${machine.name}`}
                  aria-describedby={`machine-hotspot-tooltip-${machine.id}-${hotspot.id}`}
                  aria-pressed={selectedHotspot === hotspot.id}
                  onClick={() => onSelectHotspot(hotspot)}
                >
                  <span aria-hidden="true" className={styles.hotspotMarker}>{index + 1}</span>
                  <span id={`machine-hotspot-tooltip-${machine.id}-${hotspot.id}`} role="tooltip" className={styles.hotspotLabel}>{hotspot.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className={styles.imageCaption}>
        <span className={styles.captionRule} aria-hidden="true" />
        <span>Representative equipment image</span>
      </div>
    </div>
  );
}

export function EquipmentShowroom() {
  const [selectedMachineIndex, setSelectedMachineIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const selectorButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const stageButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const detailTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion ?? false;
  const activeMachine = SHOWROOM_MACHINES[selectedMachineIndex];
  const activeStageIndex = PROCESS_STAGES.findIndex((stage) => stage.id === activeMachine.process);
  const activeStage = PROCESS_STAGES[activeStageIndex];
  const stageMachines = SHOWROOM_MACHINES.filter((machine) => machine.process === activeStage.id);
  const activeHotspot = activeMachine.hotspots.find((hotspot) => hotspot.id === selectedHotspot) ?? null;
  const nextStage = PROCESS_STAGES[(activeStageIndex + 1) % PROCESS_STAGES.length];
  const machineProgress = ((selectedMachineIndex + 1) / SHOWROOM_MACHINES.length) * 100;
  const overviewSpecs = [
    { label: 'Manufacturer', value: activeMachine.manufacturer },
    ...(activeMachine.model ? [{ label: 'Model', value: activeMachine.model }] : []),
    ...activeMachine.technicalFacts
      .slice(0, activeMachine.model ? 2 : 3)
      .map((fact) => ({ label: fact.label, value: fact.value })),
  ].slice(0, 4);

  useEffect(() => {
    const activeStageButton = stageButtonRefs.current[activeStageIndex];
    if (!activeStageButton) return;

    requestAnimationFrame(() => {
      activeStageButton.scrollIntoView({
        block: 'nearest',
        inline: 'center',
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    });
  }, [activeStageIndex, reduceMotion]);

  const selectMachine = (index: number) => {
    const boundedIndex = Math.max(0, Math.min(index, SHOWROOM_MACHINES.length - 1));
    setSelectedMachineIndex(boundedIndex);
    setSelectedHotspot(null);
    requestAnimationFrame(() => {
      selectorButtonRefs.current[boundedIndex]?.scrollIntoView({
        block: 'nearest',
        inline: 'center',
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    });
  };

  const selectProcess = (process: ProcessId) => {
    const firstMachine = SHOWROOM_MACHINES.findIndex((machine) => machine.process === process);
    if (firstMachine >= 0) {
      setActiveTab('overview');
      setSelectedHotspot(null);
      selectMachine(firstMachine);
    }
  };

  const handleMachineKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    visibleMachineIndex: number,
  ) => {
    let targetIndex: number | null = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') targetIndex = (visibleMachineIndex + 1) % stageMachines.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') targetIndex = (visibleMachineIndex - 1 + stageMachines.length) % stageMachines.length;
    if (event.key === 'Home') targetIndex = 0;
    if (event.key === 'End') targetIndex = stageMachines.length - 1;

    if (targetIndex !== null) {
      event.preventDefault();
      const targetMachine = stageMachines[targetIndex];
      const globalIndex = SHOWROOM_MACHINES.findIndex((machine) => machine.id === targetMachine.id);
      selectMachine(globalIndex);
      requestAnimationFrame(() => selectorButtonRefs.current[globalIndex]?.focus());
    }
  };

  const selectHotspot = (hotspot: MachineHotspot) => {
    setSelectedHotspot(hotspot.id);
    setActiveTab('how-it-works');
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = DETAIL_TABS.findIndex((tab) => tab.id === activeTab);
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % DETAIL_TABS.length;
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + DETAIL_TABS.length) % DETAIL_TABS.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = DETAIL_TABS.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      const nextTab = DETAIL_TABS[nextIndex];
      setActiveTab(nextTab.id);
      requestAnimationFrame(() => detailTabRefs.current[nextIndex]?.focus());
    }
  };

  return (
    <motion.section
      id="equipment"
      aria-labelledby="equipment-title"
      className={`${styles.section} border-b border-charcoal/10 bg-[#f7f5f1] px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24`}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-[90rem]">
        <div className={styles.sectionHeading}>
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#907348]">Fashion Knits · manufacturing equipment</p>
            <h2 id="equipment-title" className="max-w-4xl text-[clamp(2.3rem,5vw,4.7rem)] font-semibold leading-[0.94] tracking-[-0.035em]">Inside the production floor.</h2>
          </div>
          <p className={styles.sectionIntro}>Explore the equipment behind pattern cutting and garment decoration. Each route is planned around the garment and buyer brief.</p>
        </div>

        <div className={styles.processNavigator}>
          <div className={styles.navigatorHeading}>
            <div>
              <p className={styles.navigatorEyebrow}>Production process</p>
              <p className={styles.navigatorNote}>Select a station to see the machines used in that process.</p>
            </div>
            <span className={styles.routeNote}>Decoration is included when the style calls for it</span>
          </div>

          <div className={styles.processTrack} role="group" aria-label="Explore manufacturing processes">
            {PROCESS_STAGES.map((stage, stageIndex) => {
              const count = SHOWROOM_MACHINES.filter((machine) => machine.process === stage.id).length;
              const selected = activeStage.id === stage.id;
              return (
                <button
                  key={stage.id}
                  ref={(element) => { stageButtonRefs.current[stageIndex] = element; }}
                  type="button"
                  aria-pressed={selected}
                  aria-label={`${stage.title}, ${count} listed ${count === 1 ? 'machine' : 'machines'}`}
                  onClick={() => selectProcess(stage.id)}
                  className={`${styles.stageButton} ${selected ? styles.stageButtonSelected : ''}`}
                >
                  {stageIndex < PROCESS_STAGES.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={styles.stageConnector}
                      style={{ '--progress': stageIndex < activeStageIndex ? '100%' : '0%' } as React.CSSProperties}
                    />
                  )}
                  <span aria-hidden="true" className={styles.stageMarker}>{selected ? <Check className="h-3.5 w-3.5" /> : stage.number}</span>
                  <span className={styles.stageCopy}>
                    <span className={styles.stageLabel}>{stage.title}</span>
                    <span className={styles.stageCount}>{count} listed {count === 1 ? 'machine' : 'machines'}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className={styles.mobileSwipeHint}>Swipe to see all process stages <ArrowRight aria-hidden="true" /></p>
        </div>

        <div className={styles.machineRail}>
          <div className={styles.machineRailHeading}>
            <span className={styles.machineRailEyebrow}>Machines in this process</span>
            <span className={styles.machineRailStage}>{activeStage.title}</span>
          </div>
          <div
            className={styles.machineList}
            role="group"
            aria-label={`Select a ${activeStage.title} machine`}
            onKeyDown={(event) => {
              const currentVisibleIndex = stageMachines.findIndex((machine) => machine.id === activeMachine.id);
              handleMachineKeyDown(event, currentVisibleIndex);
            }}
          >
            {stageMachines.map((machine) => {
              const machineIndex = SHOWROOM_MACHINES.findIndex((item) => item.id === machine.id);
              const selected = activeMachine.id === machine.id;
              return (
                <button
                  key={machine.id}
                  ref={(element) => { selectorButtonRefs.current[machineIndex] = element; }}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectMachine(machineIndex)}
                  className={`${styles.machineOption} ${selected ? styles.machineOptionSelected : ''}`}
                >
                  <span className={styles.machineOptionNumber}>{indexText(machineIndex)}</span>
                  <span className={styles.machineOptionThumb} aria-hidden="true">
                    <Image src={machine.image} alt="" fill sizes="48px" />
                  </span>
                  <span className={styles.machineOptionCopy}>
                    <span className={styles.machineOptionName}>{machine.name}</span>
                    <span className={styles.machineOptionMeta}>{machine.manufacturer}{machine.model ? ` · ${machine.model}` : ''}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className={styles.machineOptionArrow} />
                </button>
              );
            })}
          </div>
          <p className={styles.keyboardHint}>Use arrow keys, Home or End to move between machines.</p>
          <p className={styles.mobileMachineSwipeHint}>Swipe to browse the machines <ArrowRight aria-hidden="true" /></p>
        </div>

        <div className={styles.showroomGrid}>
          <figure className={styles.visualColumn} aria-label={`${activeMachine.name} visual and component controls`}>
            <EquipmentVisual
              machine={activeMachine}
              onSelectHotspot={selectHotspot}
              selectedHotspot={selectedHotspot}
              reduceMotion={reduceMotion}
            />
            <figcaption className={styles.visualControls}>
              <button type="button" onClick={() => selectMachine(selectedMachineIndex - 1)} disabled={selectedMachineIndex === 0} aria-label="Previous machine" className={styles.stepControl}>
                <ChevronLeft aria-hidden="true" className="h-4 w-4" /> Previous
              </button>
              <div className={styles.selectionProgress}>
                <div className={styles.selectionCount}>
                <strong>{indexText(selectedMachineIndex)}</strong><span>/ {countText(SHOWROOM_MACHINES.length)}</span>
                </div>
                <div
                  className={styles.selectionTrack}
                  role="progressbar"
                  aria-label="Selected machine"
                  aria-valuemin={1}
                  aria-valuemax={SHOWROOM_MACHINES.length}
                  aria-valuenow={selectedMachineIndex + 1}
                  aria-valuetext={`Machine ${selectedMachineIndex + 1} of ${SHOWROOM_MACHINES.length}`}
                >
                  <motion.span
                    animate={{ width: `${machineProgress}%` }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
              <button type="button" onClick={() => selectMachine(selectedMachineIndex + 1)} disabled={selectedMachineIndex === SHOWROOM_MACHINES.length - 1} aria-label="Next machine" className={styles.stepControl}>
                Next <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </figcaption>
            <p className="sr-only" role="status" aria-live="polite">
              Selected {activeMachine.name}, machine {selectedMachineIndex + 1} of {SHOWROOM_MACHINES.length}. Process: {activeStage.title}.
            </p>
          </figure>

          <aside className={styles.detailPanel} aria-label={`${activeMachine.name} information`}>
            <div className={styles.detailPanelHeader}>
              <div className={styles.detailTopline}>
                <span className={styles.detailProcess}>PROCESS {activeStage.number} · {activeStage.title}</span>
                <span className={styles.detailNumber}>{indexText(selectedMachineIndex)} / {countText(SHOWROOM_MACHINES.length)}</span>
              </div>
              <h3 className={styles.machineTitle}>{activeMachine.name}</h3>
              <p className={styles.machineFunction}>{activeMachine.primaryFunction}</p>
            </div>

            <div className={styles.detailTabs} role="tablist" aria-label="Machine information views" onKeyDown={handleTabKeyDown}>
              {DETAIL_TABS.map(({ id, label, Icon }, index) => (
                <button
                  key={id}
                  ref={(element) => { detailTabRefs.current[index] = element; }}
                  id={`equipment-tab-${id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === id}
                  aria-controls="equipment-tab-panel"
                  tabIndex={activeTab === id ? 0 : -1}
                  onClick={() => setActiveTab(id)}
                  className={`${styles.detailTab} ${activeTab === id ? styles.detailTabSelected : ''}`}
                >
                  <Icon aria-hidden="true" className={styles.detailTabIcon} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <div
              id="equipment-tab-panel"
              role="tabpanel"
              aria-labelledby={`equipment-tab-${activeTab}`}
              tabIndex={0}
              className={styles.tabPanel}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${activeMachine.id}-${activeTab}`}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: 'easeOut' }}
                >
                  {activeTab === 'overview' && (
                    <div className={styles.overviewView}>
                      <p className={styles.tabEyebrow}>At a glance</p>
                      <div className={styles.overviewSpecs} aria-label="Machine specifications">
                        {overviewSpecs.map((spec, index) => (
                          <div className={styles.overviewSpec} key={`${spec.label}-${index}`}>
                            <span>{spec.label}</span>
                            <strong>{spec.value}</strong>
                          </div>
                        ))}
                      </div>
                      <p className={styles.overviewLead}>{activeMachine.overview}</p>
                      <div className={styles.outcomeCard}>
                        <span className={styles.outcomeLabel}>GARMENT OUTCOME</span>
                        <p>{activeMachine.garmentOutcome}</p>
                      </div>
                      <div className={styles.buyerPrompt}>
                        <span className={styles.tabEyebrow}>For your production brief</span>
                        <p>{activeMachine.buyerPrompt}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'capabilities' && (
                    <div className={styles.capabilitiesView}>
                      <p className={styles.tabEyebrow}>Documented machine-family capabilities</p>
                      <div className={styles.capabilityList}>
                        {activeMachine.capabilities.map((capability, index) => (
                          <article className={styles.capabilityItem} key={capability.title}>
                            <span className={styles.capabilityNumber}>{indexText(index)}</span>
                            <div>
                              <h4>{capability.title}</h4>
                              <p>{capability.detail}</p>
                              <span className={styles.capabilityScope}>{capability.sourceLabel}</span>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'how-it-works' && (
                    <div className={styles.howView}>
                      <p className={styles.tabEyebrow}>The process in three steps</p>
                      <ol className={styles.howSteps}>
                        {activeMachine.howSteps.map((step, index) => (
                          <li key={step.title} className={styles.howStep}>
                            <span className={styles.howStepNumber}>{indexText(index)}</span>
                            <div>
                              <h4>{step.title}</h4>
                              <p>{step.detail}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                      {activeHotspot && (
                        <div className={styles.hotspotCallout} aria-live="polite">
                          <div className={styles.hotspotCalloutHeader}>
                            <span className={styles.calloutIcon}><Layers aria-hidden="true" /></span>
                            <div>
                              <span className={styles.tabEyebrow}>Machine feature</span>
                              <h4>{activeHotspot.label}</h4>
                            </div>
                            <button type="button" aria-label="Close machine feature details" onClick={() => setSelectedHotspot(null)} className={styles.dismissHotspot}>
                              <X aria-hidden="true" className="h-4 w-4" />
                            </button>
                          </div>
                          <p>{activeHotspot.detail}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'technical' && (
                    <div className={styles.technicalView}>
                      <p className={styles.tabEyebrow}>Equipment details &amp; manufacturer data</p>
                      <dl className={styles.technicalFacts}>
                        {activeMachine.technicalFacts.map((fact) => (
                          <div className={styles.technicalFact} key={fact.label}>
                            <dt>{fact.label}<span>{fact.scope === 'company inventory' ? 'Fashion Knits inventory' : 'Manufacturer range'}</span></dt>
                            <dd>{fact.value}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className={styles.configurationContext}>
                        <span className={styles.contextMark}><Ruler aria-hidden="true" /></span>
                        <p>{activeMachine.configurationContext}</p>
                      </div>
                      <div className={styles.sourceList}>
                        <span className={styles.tabEyebrow}>Manufacturer documentation</span>
                        {activeMachine.sources.map((source) => (
                          <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className={styles.sourceLink}>
                            <span>
                              <strong>{source.label}</strong>
                              <small>{source.context}</small>
                            </span>
                            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className={styles.detailPanelFooter}>
              <Link href="/get-a-quote" className={styles.discussLink}>
                <span><small>Have a style in mind?</small><strong>Discuss a production requirement</strong></span>
                <ArrowRight aria-hidden="true" className={`${styles.discussArrow} h-5 w-5`} />
              </Link>
              <button type="button" onClick={() => selectProcess(nextStage.id)} className={styles.nextProcessButton}>
                <span>Next process</span><strong>{nextStage.title}</strong><ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </aside>
        </div>

        <div className={styles.productionJourney}>
          <div className={styles.journeyIntro}>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#907348]">How the steps connect</p>
              <h3 className="mt-2 text-xl font-semibold leading-tight tracking-[-0.04em] sm:text-2xl">A production route shaped around the garment.</h3>
            </div>
            <p>Print and embroidery are options selected for a style; a garment does not necessarily pass through every process shown.</p>
          </div>

          <ol className={styles.journeySteps}>
            <li className={`${styles.journeyStep} ${activeMachine.process === 'pattern-cut' ? styles.journeyStepActive : ''}`}>
              <span className={styles.journeyNumber}>01</span>
              <div><h4>Pattern preparation &amp; cutting</h4><p>Prepare pattern data and cut fabric components for construction.</p></div>
            </li>
            <li className={`${styles.journeyStep} ${activeMachine.process !== 'pattern-cut' ? styles.journeyStepActive : ''}`}>
              <span className={styles.journeyNumber}>02</span>
              <div><h4>Decoration, when specified</h4><p>Digital print, screen print or embroidery, according to the garment program.</p></div>
            </li>
            <li className={styles.journeyStep}>
              <span className={styles.journeyNumber}>03</span>
              <div><h4>Sew &amp; finish</h4><p>Garment assembly followed by checking, ironing and packing.</p></div>
            </li>
          </ol>
        </div>

        <div className={styles.operationalNotes}>
          <p><strong>In-house decoration:</strong> five automatic printing machines and five embroidery machines.</p>
          <p><strong>Production flow:</strong> cutting, sewing, trimming, checking, ironing and packing.</p>
        </div>
      </div>
    </motion.section>
  );
}
