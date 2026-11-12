'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { BadgeCheck, ClipboardList, PackageCheck } from 'lucide-react';

const EXPORT_STEPS = [
  {
    number: '01',
    eyebrow: 'Export status',
    title: 'Two-Star Export House',
    description: 'Export-house documentation and buyer shipment instructions support an orderly dispatch process.',
    Icon: BadgeCheck,
  },
  {
    number: '02',
    eyebrow: 'Order details',
    title: 'Packing instructions',
    description: 'Labels, carton details and the required shipment documents are aligned to each order.',
    Icon: ClipboardList,
  },
  {
    number: '03',
    eyebrow: 'Final preparation',
    title: 'Export-carton packing',
    description: 'Final garment checks and metal detection lead into secure packing in export cartons.',
    Icon: PackageCheck,
  },
];

function WorkflowPath({ reducedMotion, progress }: { reducedMotion: boolean; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const pathLength = reducedMotion ? 1 : progress;

  return (
    <svg className="export-workflow-path" viewBox="0 0 1200 560" preserveAspectRatio="none" aria-hidden="true">
      <g className="export-workflow-path-desktop">
        <path className="export-workflow-path-base" d="M 115 280 C 270 280 330 280 450 280 S 570 280 600 280 S 750 280 850 280 S 950 280 1085 280" />
        <motion.path className="export-workflow-path-glow" d="M 115 280 C 270 280 330 280 450 280 S 570 280 600 280 S 750 280 850 280 S 950 280 1085 280" style={{ pathLength }} />
        <motion.path className="export-workflow-path-line" d="M 115 280 C 270 280 330 280 450 280 S 570 280 600 280 S 750 280 850 280 S 950 280 1085 280" style={{ pathLength }} />
      </g>
      <g className="export-workflow-path-mobile">
        <path className="export-workflow-path-base" d="M 36 0 V 560" />
        <motion.path className="export-workflow-path-glow" d="M 36 0 V 560" style={{ pathLength }} />
        <motion.path className="export-workflow-path-line" d="M 36 0 V 560" style={{ pathLength }} />
      </g>
    </svg>
  );
}

export function ExportWorkflow() {
  const workflowRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: workflowRef,
    offset: ['start 82%', 'end 26%'],
  });

  return (
    <div className="export-workflow-shell" ref={workflowRef}>
      <WorkflowPath reducedMotion={Boolean(shouldReduceMotion)} progress={scrollYProgress} />
      <ol className="export-workflow-grid">
        {EXPORT_STEPS.map(({ number, eyebrow, title, description, Icon }, index) => (
          <motion.li
            key={number}
            className={`export-workflow-card export-workflow-card--${number}`}
            whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
            whileFocus={shouldReduceMotion ? undefined : { y: -3, transition: { duration: 0.25 } }}
          >
            {index === 0 && (
              <div className="export-status-watermark" aria-hidden="true">
                <span className="export-status-watermark-ring" />
                <span className="export-status-watermark-overline">Export recognition</span>
                <span className="export-status-watermark-title">Two-Star</span>
                <span className="export-status-watermark-caption">Export House</span>
                <span className="export-status-watermark-star">✦ &nbsp; ✦</span>
              </div>
            )}

            {index === 2 && (
              <div className="export-packing-motion" aria-hidden="true">
                <div className="export-packing-motion-label">FINAL CHECK</div>
                <div className="export-packing-box">
                  <span className="export-packing-box-fold export-packing-box-fold--left" />
                  <span className="export-packing-box-fold export-packing-box-fold--right" />
                  <span className="export-packing-box-tape" />
                  <PackageCheck className="export-packing-box-check" strokeWidth={1.1} />
                </div>
                <span className="export-packing-scan-line" />
                <span className="export-packing-motion-caption">CHECK · SEAL · DISPATCH</span>
              </div>
            )}

            <div className="export-workflow-card-top">
              <span className="export-workflow-number">{number}</span>
              <Icon className="export-workflow-icon" aria-hidden="true" strokeWidth={1.4} />
            </div>
            <div className="export-workflow-card-copy">
              <p className="export-workflow-eyebrow">{eyebrow}</p>
              <h3>{title}</h3>
              <p className="export-workflow-description">{description}</p>
            </div>
            <span className="export-workflow-card-foot" aria-hidden="true">ORDER FLOW <span>—</span> {number}</span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
