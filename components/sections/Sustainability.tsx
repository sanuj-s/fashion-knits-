import Link from 'next/link';
import { ArrowUpRight, Droplets, Leaf, Sun } from 'lucide-react';
import { Fragment, type CSSProperties } from 'react';
import styles from './Sustainability.module.css';
import { SustainabilityMotion } from './SustainabilityMotion';

const INITIATIVES = [
  { icon: Sun, kind: 'sun', title: 'Rooftop solar', detail: 'A 200 kWp solar power system is installed at the Netaji Apparel Park factory.' },
  { icon: Droplets, kind: 'water', title: 'Water reuse', detail: 'Treated water is used for gardening and landscaping.' },
  { icon: Leaf, kind: 'leaf', title: 'Tree planting', detail: 'Fashion Knits took part in the Vanathukkul Tiruppur campaign, planting nearly 125,000 trees over two years.' },
];

const TITLE_LEAD = ['A', 'practical', 'focus', 'on'];
const TITLE_ACCENT = ['energy,', 'water', 'and', 'community.'];

function revealWords(words: string[], startIndex: number) {
  return words.map((word, index) => (
    <Fragment key={word}>
      {index > 0 ? ' ' : null}
      <span className={styles.wordMask}>
        <span className={styles.word} style={{ '--word-delay': `${300 + (startIndex + index) * 60}ms` } as CSSProperties}>
          {word}
        </span>
      </span>
    </Fragment>
  ));
}

export function Sustainability() {
  return (
    <section
      id="sustainability"
      aria-labelledby="sustainability-title"
      className={styles.section}
    >
      <div aria-hidden="true" className={styles.ambient} />

      <div className={styles.container}>
        <header className={styles.intro}>
          <div className={styles.headingBlock}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>Environment &amp; responsibility</span>
            </p>
            <h2 id="sustainability-title" className={styles.heading}>
              {revealWords(TITLE_LEAD, 0)}{' '}
              <span className={styles.accentPhrase}>{revealWords(TITLE_ACCENT, TITLE_LEAD.length)}</span>
            </h2>
          </div>

          <p className={styles.description}>
            Material direction, resource use and community initiatives are part of Fashion Knits’ approach to responsible manufacturing.
          </p>
        </header>

        <ul className={styles.cards}>
          {INITIATIVES.map(({ icon: Icon, kind, title, detail }, index) => (
            <li
              key={title}
              data-sustainability-card
              className={styles.card}
              data-icon-kind={kind}
              style={{ '--card-delay': `${1450 + index * 120}ms` } as CSSProperties}
            >
              <span className={styles.cardTopline} aria-hidden="true" />
              <span className={styles.spotlight} aria-hidden="true" />
              <span className={styles.iconCircle}>
                <Icon aria-hidden="true" className={styles.icon} strokeWidth={1.7} />
              </span>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDetail}>{detail}</p>
            </li>
          ))}
        </ul>

        <footer className={styles.footer}>
          <span className={styles.footerDivider} aria-hidden="true" />
          <div className={styles.footerContent}>
            <p className={styles.footerNote}>Explore environmental and material initiatives.</p>
            <Link href="/sustainability" className={styles.link}>
              <span className={styles.linkLabel}>See sustainability details</span>
              <ArrowUpRight aria-hidden="true" className={styles.linkArrow} />
            </Link>
          </div>
        </footer>
      </div>

      <SustainabilityMotion />
    </section>
  );
}
