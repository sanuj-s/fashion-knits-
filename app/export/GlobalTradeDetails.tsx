'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  Boxes,
  FileText,
  Plane,
  ScanLine,
  ShieldCheck,
  Ship,
  Warehouse,
} from 'lucide-react';
import { GlobalReveal } from './GlobalReveal';
import styles from './GlobalExperience.module.css';

const TOPICS = [
  {
    id: 'documents',
    title: 'Export documentation',
    heading: 'Documents give a shipment its paper trail.',
    description:
      'A commercial invoice describes the transaction and declared goods value; a packing list shows how items are grouped; shipping instructions provide details used to prepare transport documents. Certificates or permits may also apply. The document set depends on the shipment and destination.',
    label: 'DOCUMENT ROLES',
    facts: [
      { name: 'Commercial invoice', detail: 'Transaction and goods details' },
      { name: 'Packing list', detail: 'Package contents and quantities' },
      { name: 'Shipping instructions', detail: 'Details for transport paperwork' },
    ],
    visualLabel: 'Layered trade documents',
    Icon: FileText,
  },
  {
    id: 'customs',
    title: 'Customs and compliance',
    heading: 'The destination shapes the requirements.',
    description:
      'Customs procedures and paperwork vary by destination, commodity and applicable regulations. Classification, declared value, origin and permits can affect what authorities request. Confirm requirements for the specific goods and route.',
    label: 'FACTORS THAT MAY MATTER',
    facts: [
      { name: 'Commodity', detail: 'Description and classification' },
      { name: 'Destination', detail: 'Local customs procedures' },
      { name: 'Regulations', detail: 'Applicable declarations or permits' },
    ],
    visualLabel: 'Illustrative cargo inspection bay',
    Icon: ShieldCheck,
  },
  {
    id: 'warehousing',
    title: 'Warehousing and cargo handling',
    heading: 'Cargo readiness starts before dispatch.',
    description:
      'Where storage and handling are provided, organized inventory, suitable packaging and clear dispatch planning can help prepare cargo. Storage windows, handling arrangements and readiness should align with the order and carrier handoff.',
    label: 'PLANNING CONSIDERATIONS',
    facts: [
      { name: 'Storage', detail: 'Space and timing before dispatch' },
      { name: 'Inventory', detail: 'Organized goods and records' },
      { name: 'Readiness', detail: 'Packaging, labels and handoff' },
    ],
    visualLabel: 'Illustrative warehouse staging',
    Icon: Warehouse,
  },
  {
    id: 'freight',
    title: 'Freight and delivery terms',
    heading: 'The route follows the shipment.',
    description:
      'Sea and air freight are planned around shipment dimensions, destination, schedules and agreed delivery terms. Cargo handling needs, route options, booking availability and responsibility for each leg also shape the plan.',
    label: 'PLAN AROUND THE CARGO',
    facts: [],
    visualLabel: 'Sea and air freight comparison',
    Icon: Ship,
  },
] as const;

type TopicId = (typeof TOPICS)[number]['id'];
type FreightMode = 'sea' | 'air';

const FREIGHT_MODES: Record<FreightMode, { capacity: string; use: string; planning: string }> = {
  sea: {
    capacity: 'Higher volume per movement',
    use: 'Larger or consolidated consignments',
    planning: 'Container needs, port access, vessel schedules and inland legs.',
  },
  air: {
    capacity: 'More constrained by size and chargeable weight',
    use: 'Smaller consignments or when schedule matters',
    planning: 'Size limits, airport cut-offs, security checks and onward delivery.',
  },
};

function DocumentIllustration() {
  return (
    <div className={styles.documentScene} aria-hidden="true">
      <div className={[styles.documentSheet, styles.documentSheetBack].join(' ')}>
        <span>SHIPPING INSTRUCTIONS</span>
        <div className={styles.documentLines}><i /><i /><i /><i /></div>
      </div>
      <div className={[styles.documentSheet, styles.documentSheetMiddle].join(' ')}>
        <span>PACKING LIST</span>
        <div className={styles.documentTable}><i /><i /><i /><i /><i /><i /></div>
      </div>
      <div className={[styles.documentSheet, styles.documentSheetFront].join(' ')}>
        <span className={styles.documentHeading}><FileText aria-hidden="true" /> COMMERCIAL INVOICE</span>
        <div className={styles.documentRule} />
        <div className={styles.documentLines}><i /><i /><i /></div>
        <div className={styles.documentStamp}>TRADE FILE</div>
      </div>
      <span className={styles.documentFoot}>Illustrative document roles · as applicable</span>
    </div>
  );
}

function CustomsIllustration() {
  return (
    <div className={styles.customsScene} aria-hidden="true">
      <div className={styles.customsHeader}><ScanLine aria-hidden="true" /><span>CARGO REVIEW</span></div>
      <div className={styles.customsBay}>
        <span className={styles.customsPostLeft} />
        <span className={styles.customsPostRight} />
        <span className={styles.customsScanBeam} />
        <div className={styles.customsCargo}>
          <i /><i /><i /><i /><i /><i />
        </div>
        <div className={styles.customsCargoSmall}>
          <i /><i /><i /><i />
        </div>
      </div>
      <div className={styles.customsLegend}>
        <span><i /> DESTINATION RULES</span>
        <span><i /> SHIPMENT DETAILS</span>
      </div>
    </div>
  );
}

function WarehouseIllustration() {
  return (
    <div className={styles.warehouseScene} aria-hidden="true">
      <div className={styles.warehouseHeader}><Boxes aria-hidden="true" /><span>STORAGE & STAGING</span></div>
      <div className={styles.warehouseRoof} />
      <div className={styles.warehouseRacks}>
        {[0, 1, 2].map((row) => (
          <div className={styles.warehouseShelf} key={row}>
            <span className={styles.warehouseBeam} />
            {[0, 1, 2, 3].map((box) => (
              <i className={[styles.warehouseBox, (row + box) % 3 === 0 ? styles.warehouseBoxGold : ''].filter(Boolean).join(' ')} key={box} />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.warehouseFloor}><span /></div>
      <div className={styles.warehouseFoot}><Warehouse aria-hidden="true" /><span>ORGANIZED INVENTORY · DISPATCH READINESS</span></div>
    </div>
  );
}

function FreightIllustration({ mode }: { mode: FreightMode }) {
  const Icon = mode === 'sea' ? Ship : Plane;
  return (
    <div className={[styles.freightScene, mode === 'sea' ? styles.freightSceneSea : styles.freightSceneAir].join(' ')} aria-hidden="true">
      <div className={styles.freightSceneHeader}>
        <span>{mode === 'sea' ? 'SEA FREIGHT' : 'AIR FREIGHT'}</span>
        <span>{mode === 'sea' ? 'PORT CONNECTIONS' : 'AIRPORT CONNECTIONS'}</span>
      </div>
      <div className={styles.freightHorizon} />
      <Icon className={styles.freightModeIcon} strokeWidth={1.05} />
      {mode === 'sea' ? (
        <div className={styles.freightContainers}><i /><i /><i /><i /><i /></div>
      ) : (
        <div className={styles.freightFlightLine}><span /><i /></div>
      )}
      <div className={styles.freightSceneFoot}>
        <span>{mode === 'sea' ? 'VOLUME & PORT PLANNING' : 'WEIGHT & AIRPORT PLANNING'}</span>
        <span aria-hidden="true">{mode === 'sea' ? '01' : '02'}</span>
      </div>
    </div>
  );
}

function TopicIllustration({ topic, freightMode }: { topic: TopicId; freightMode: FreightMode }) {
  switch (topic) {
    case 'documents':
      return <DocumentIllustration />;
    case 'customs':
      return <CustomsIllustration />;
    case 'warehousing':
      return <WarehouseIllustration />;
    case 'freight':
      return <FreightIllustration mode={freightMode} />;
  }
}

export function GlobalTradeDetails() {
  const [activeTopicId, setActiveTopicId] = useState<TopicId>('documents');
  const [freightMode, setFreightMode] = useState<FreightMode>('sea');
  const reduceMotion = useReducedMotion();
  const activeTopic = TOPICS.find((topic) => topic.id === activeTopicId) ?? TOPICS[0];
  const ActiveIcon = activeTopic.Icon;

  return (
    <section id="trade-details" aria-labelledby="trade-details-title" className={styles.tradeDetails}>
      <div className={styles.container}>
        <GlobalReveal className={styles.tradeDetailsHeading}>
          <div>
            <h2 id="trade-details-title" className={styles.tradeDetailsTitle}>
              THE DETAILS THAT MOVE <span>GLOBAL TRADE</span>
            </h2>
          </div>
          <p className={styles.tradeDetailsIntro}>
            Every international shipment involves decisions about documentation, cargo handling, customs requirements, transportation, and delivery terms. The details depend on the destination and the shipment.
          </p>
        </GlobalReveal>

        <div className={styles.tradeDetailsLayout}>
          <div className={styles.topicChoices} role="group" aria-label="Choose an export topic">
            {TOPICS.map((topic) => {
              const selected = activeTopicId === topic.id;
              const TopicIcon = topic.Icon;
              return (
                <button
                  key={topic.id}
                  type="button"
                  aria-pressed={selected}
                  aria-controls="export-topic-panel"
                  onClick={() => setActiveTopicId(topic.id)}
                  className={[styles.topicChoice, selected ? styles.topicChoiceActive : ''].filter(Boolean).join(' ')}
                >
                  <TopicIcon aria-hidden="true" className={styles.topicChoiceIcon} strokeWidth={1.45} />
                  <span className={styles.topicChoiceTitle}>{topic.title}</span>
                  <ArrowUpRight aria-hidden="true" className={styles.topicChoiceArrow} />
                  <span aria-hidden="true" className={styles.topicChoiceIndicator} />
                </button>
              );
            })}
          </div>

          <div
            id="export-topic-panel"
            className={styles.topicPanel}
            role="region"
            aria-labelledby="export-topic-heading"
            aria-live="polite"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeTopic.id}
                className={styles.topicPanelInner}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
                transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.topicMain}>
                  <div className={styles.topicNarrative}>
                    <p className={styles.topicKicker}><ActiveIcon aria-hidden="true" />{activeTopic.label}</p>
                    <h3 id="export-topic-heading">{activeTopic.heading}</h3>
                    <p className={styles.topicDescription}>{activeTopic.description}</p>

                    {activeTopic.id !== 'freight' && (
                      <ul className={styles.topicFacts}>
                        {activeTopic.facts.map((fact) => (
                          <li key={fact.name}>
                            <span>{fact.name}</span>
                            <span>{fact.detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={activeTopic.id + '-' + (activeTopic.id === 'freight' ? freightMode : 'view')}
                      className={styles.topicVisual}
                      role="img"
                      aria-label={activeTopic.visualLabel}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.99 }}
                      transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <TopicIllustration topic={activeTopic.id} freightMode={freightMode} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {activeTopic.id === 'freight' && (
                  <div className={styles.freightComparison}>
                    <div className={styles.freightComparisonHeading}>
                      <div>
                        <p>Mode comparison</p>
                        <span>Choose a mode to see what shapes the plan.</span>
                      </div>
                      <div className={styles.freightModeSwitch} role="group" aria-label="Compare sea and air freight">
                        <button
                          type="button"
                          aria-pressed={freightMode === 'sea'}
                          onClick={() => setFreightMode('sea')}
                          className={freightMode === 'sea' ? styles.freightModeActive : ''}
                        >
                          <Ship aria-hidden="true" /> Sea
                        </button>
                        <button
                          type="button"
                          aria-pressed={freightMode === 'air'}
                          onClick={() => setFreightMode('air')}
                          className={freightMode === 'air' ? styles.freightModeActive : ''}
                        >
                          <Plane aria-hidden="true" /> Air
                        </button>
                      </div>
                    </div>

                    <motion.div
                      key={freightMode}
                      className={styles.freightComparisonDetails}
                      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      <p><span>Capacity</span><strong>{FREIGHT_MODES[freightMode].capacity}</strong></p>
                      <p><span>Often considered for</span><strong>{FREIGHT_MODES[freightMode].use}</strong></p>
                      <p><span>Planning considerations</span><strong>{FREIGHT_MODES[freightMode].planning}</strong></p>
                    </motion.div>
                    <p className={styles.freightNote}>
                      The suitable mode depends on the cargo, destination, schedule and agreed delivery terms.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
