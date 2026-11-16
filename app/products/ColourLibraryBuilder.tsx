'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import {
  COLOUR_BUYER_DETAILS,
  COLOUR_DEVELOPMENT_STEPS,
  PALETTE_DIRECTIONS,
  type PaletteDirection,
} from './products-experience-data';
import styles from './colour-library.module.css';

const MAX_COLOURS = 5;

export function ColourLibraryBuilder({
  initialColour,
  onPrimaryColourChange,
}: {
  initialColour: string;
  onPrimaryColourChange: (colour: string) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [selectedNames, setSelectedNames] = useState<string[]>([initialColour]);
  const selectedNamesRef = useRef(selectedNames);
  const [ownReference, setOwnReference] = useState('');
  const router = useRouter();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const swatches = Array.from(root.querySelectorAll<HTMLElement>('[data-swatch-reveal]'));
    root.dataset.swatchReady = 'true';

    if (typeof IntersectionObserver === 'undefined') {
      swatches.forEach((swatch) => { swatch.dataset.swatchIn = 'true'; });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.2) return;
        const swatch = entry.target as HTMLElement;
        swatch.dataset.swatchIn = 'true';
        observer.unobserve(swatch);
      });
    }, { threshold: 0.2 });

    const transitionSubscriptions = swatches.map((swatch) => {
      const markAnimated = (event: TransitionEvent) => {
        if (event.target !== swatch || (event.propertyName !== 'opacity' && event.propertyName !== 'transform')) return;
        swatch.dataset.swatchAnimated = 'true';
      };
      swatch.addEventListener('transitionend', markAnimated);
      if (swatch.dataset.swatchIn !== 'true') observer.observe(swatch);
      return { swatch, markAnimated };
    });

    return () => {
      observer.disconnect();
      transitionSubscriptions.forEach(({ swatch, markAnimated }) => {
        swatch.removeEventListener('transitionend', markAnimated);
      });
    };
  }, []);

  const selectedColours = selectedNames
    .map((name) => PALETTE_DIRECTIONS.find((colour) => colour.name === name))
    .filter((colour): colour is PaletteDirection => Boolean(colour));
  const buyerDetails = [
    { label: 'Lead time', value: COLOUR_BUYER_DETAILS.leadTime },
    { label: 'MOQ', value: COLOUR_BUYER_DETAILS.moq },
    { label: 'Fastness grade', value: COLOUR_BUYER_DETAILS.fastnessGrade },
    { label: 'Certifications', value: COLOUR_BUYER_DETAILS.certifications?.join(', ') },
  ].filter((detail): detail is { label: string; value: string } => Boolean(detail.value));

  const toggleColour = (colour: PaletteDirection) => {
    const currentSelection = selectedNamesRef.current;
    if (!currentSelection.includes(colour.name) && currentSelection.length >= MAX_COLOURS) return;

    const nextSelection = currentSelection.includes(colour.name)
      ? currentSelection.filter((name) => name !== colour.name)
      : [...currentSelection, colour.name];

    selectedNamesRef.current = nextSelection;
    setSelectedNames(nextSelection);
    if (nextSelection[0]) onPrimaryColourChange(nextSelection[0]);
  };

  const addToEnquiry = () => {
    const params = new URLSearchParams({
      product: 'Custom programs / OEM',
      productId: 'colour-library',
      productName: 'Colourway development',
      productCategory: 'Custom programs / OEM',
    });
    if (selectedColours.length) {
      params.set('color', selectedColours.map((colour) => `${colour.name} (${colour.hex})`).join('; '));
    }
    if (ownReference.trim()) {
      params.set('customizations', `Buyer colour reference: ${ownReference.trim()}`);
    }
    router.push(`/get-a-quote?${params.toString()}`);
  };

  return (
    <div ref={rootRef} className={styles.builder}>
      <div className={styles.processPanel}>
        <div className={styles.processHeading}>
          <p className={styles.eyebrow}>Colour development</p>
          <p className={styles.processNote}>A clear reference keeps each review focused.</p>
        </div>
        <ol aria-label="Colour development steps" className={styles.stepGrid}>
          {COLOUR_DEVELOPMENT_STEPS.map((step, index) => (
            <li key={step.title} className={styles.stepCard}>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p className={styles.stepDetail}>{step.detail}</p>
              {(step.turnaround || step.rounds || step.notes) && (
                <dl className={styles.stepMeta}>
                  {step.turnaround && <div><dt>Turnaround</dt><dd>{step.turnaround}</dd></div>}
                  {step.rounds && <div><dt>Rounds</dt><dd>{step.rounds}</dd></div>}
                  {step.notes && <div><dt>Notes</dt><dd>{step.notes}</dd></div>}
                </dl>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.swatchArea}>
          <div className={styles.swatchHeading}>
            <h3>Choose colourways</h3>
            <p aria-live="polite" className={styles.selectionCount}>{selectedNames.length}/{MAX_COLOURS} selected</p>
          </div>
          <div className={styles.swatchGrid}>
            {PALETTE_DIRECTIONS.map((colour, index) => {
              const selected = selectedNames.includes(colour.name);
              const atLimit = selectedNames.length >= MAX_COLOURS && !selected;
              return (
                <button
                  key={colour.name}
                  type="button"
                  aria-pressed={selected}
                  aria-label={`${selected ? 'Remove' : 'Add'} ${colour.name}, ${colour.hex}${atLimit ? ', five colourways already selected' : ''}`}
                  disabled={atLimit}
                  onClick={() => toggleColour(colour)}
                  style={{ '--swatch-delay': `${index * 80}ms` } as CSSProperties}
                  data-swatch-reveal="true"
                  className={`${styles.swatchButton}${selected ? ` ${styles.swatchSelected}` : ''}`}
                >
                  <span className={styles.swatchVisual} style={{ backgroundColor: colour.image ? undefined : colour.hex }}>
                    {colour.image && <Image src={colour.image.src} alt={colour.image.alt} fill sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw" className={styles.swatchImage} />}
                    {selected && <span aria-hidden="true" className={styles.swatchCheck}><Check size={14} strokeWidth={2.5} /></span>}
                  </span>
                  <span className={styles.swatchName}>{colour.name}</span>
                  <span className={styles.swatchPairing}>Pairs with {colour.pairing}</span>
                  <span className={styles.swatchHex}>Screen reference · {colour.hex}</span>
                </button>
              );
            })}
          </div>
          <p className={styles.selectionHint}>Choose up to five shades. Remove a selected shade to make room for another.</p>
        </div>

        <aside className={styles.buyerPanel} aria-label="Colourway enquiry details">
          <div className={styles.panelSection}>
            <div className={styles.panelTitleRow}>
              <h3>Colourway strip</h3>
              <span className={styles.panelCount}>{selectedNames.length}/{MAX_COLOURS}</span>
            </div>
            {selectedColours.length > 0 ? (
              <ul aria-label="Selected colourways" tabIndex={0} className={styles.colourStrip}>
                {selectedColours.map((colour) => (
                  <li key={colour.name} className={styles.colourStripItem}>
                    <span aria-hidden="true" className={styles.colourDot} style={{ backgroundColor: colour.hex }} />
                    <span className={styles.colourStripName}>{colour.name}</span>
                    <span className={styles.colourStripHex}>{colour.hex}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptySelection}>Choose a shade or enter your own reference.</p>
            )}
          </div>

          <div className={styles.panelSection}>
            <h3>What to send us</h3>
            <ul className={styles.buyerChecklist}>
              <li><Check aria-hidden="true" size={14} />Colour reference (Pantone code or physical swatch)</li>
              <li><Check aria-hidden="true" size={14} />Fabric and GSM</li>
              <li><Check aria-hidden="true" size={14} />Quantity per colour</li>
              <li><Check aria-hidden="true" size={14} />Target ex-factory date</li>
            </ul>
          </div>

          {buyerDetails.length > 0 && (
            <div className={styles.panelSection}>
              <h3>Programme details</h3>
              <dl className={styles.buyerDetails}>
                {buyerDetails.map((detail) => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}
              </dl>
            </div>
          )}

          <div className={styles.referenceField}>
            <label htmlFor="colour-own-reference">Have your own reference? Enter Pantone TCX/TPX code or shade name.</label>
            <input
              id="colour-own-reference"
              type="text"
              value={ownReference}
              onChange={(event) => setOwnReference(event.target.value)}
              maxLength={160}
              placeholder="Pantone TCX/TPX code or shade name"
              autoComplete="off"
            />
          </div>

          <p className={styles.disclaimer}>On-screen references only. Final shade is confirmed through lab dip approval.</p>

          <button type="button" onClick={addToEnquiry} disabled={!selectedNames.length && !ownReference.trim()} className={styles.enquiryButton}>
            <span>Add this colourway to enquiry</span><ArrowRight aria-hidden="true" size={16} />
          </button>
        </aside>
      </div>
    </div>
  );
}
