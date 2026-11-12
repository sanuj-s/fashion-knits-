import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  FileText,
  Globe2,
  Plane,
  Route,
  ShieldCheck,
  Warehouse,
} from 'lucide-react';
import { GlobalHero } from './GlobalHero';
import { GlobalMarkets } from './GlobalMarkets';
import { GlobalReveal } from './GlobalReveal';
import { GlobalTradeDetails } from './GlobalTradeDetails';
import styles from './GlobalExperience.module.css';

const CAPABILITIES = [
  {
    title: 'Export team & shipment coordination',
    copy: 'An export team can align order details, shipment preparation and responsibilities agreed for each order.',
    Icon: Globe2,
  },
  {
    title: 'Customs clearance',
    copy: 'Support through customs procedures and the related documentation, with responsibilities confirmed for each shipment.',
    Icon: ShieldCheck,
  },
  {
    title: 'Warehousing & storage',
    copy: 'Storage and cargo coordination can support organized inventory handling and export readiness where arranged.',
    Icon: Warehouse,
  },
  {
    title: 'International freight coordination',
    copy: 'Freight options can be coordinated around the cargo, destination and requirements agreed for an order.',
    Icon: Plane,
  },
  {
    title: 'Export documentation',
    copy: 'Documentation support follows the requirements agreed for each order, destination and delivery term.',
    Icon: FileText,
  },
  {
    title: 'Shipment communication',
    copy: 'Shipment updates can be shared with buyers and logistics parties according to the agreed communication plan.',
    Icon: Route,
  },
];

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={[styles.eyebrow, light ? styles.eyebrowLight : ''].filter(Boolean).join(' ')}>
      <span aria-hidden="true" className={styles.eyebrowLine} />
      {children}
    </p>
  );
}

export function ExportClient() {
  return (
    <div className={styles.page}>
      <GlobalHero />
      <GlobalMarkets />

      <section
        id="export-capabilities"
        aria-labelledby="export-capabilities-title"
        className={styles.capabilities}
      >
        <div className={styles.container}>
          <GlobalReveal className={styles.sectionHeading}>
            <div>
              <Eyebrow>02 / Export capabilities</Eyebrow>
              <h2 id="export-capabilities-title" className={styles.sectionTitle}>
                An export team <span className={styles.titleSoft}>that keeps orders moving.</span>
              </h2>
              <p className={styles.exportHouseStatus}>
                <ShieldCheck aria-hidden="true" />
                Government-certified Two-Star Export House <span>· Tiruppur, India</span>
              </p>
            </div>
            <p className={styles.sectionIntro}>
              A coordinated team can support apparel orders across the practical work of moving goods internationally.
            </p>
          </GlobalReveal>

          <div className={styles.capabilityLayout}>
            <div className={styles.capabilityList}>
              {CAPABILITIES.map(({ title, copy, Icon }, index) => (
                <GlobalReveal key={title} delay={index * 0.045}>
                  <article className={styles.capabilityRow}>
                    <Icon aria-hidden="true" className={styles.capabilityIcon} strokeWidth={1.45} />
                    <div>
                      <h3>{title}</h3>
                      <p>{copy}</p>
                    </div>
                    <ArrowUpRight aria-hidden="true" className={styles.capabilityArrow} />
                  </article>
                </GlobalReveal>
              ))}
            </div>

            <GlobalReveal className={styles.capabilityPhotoWrap} delay={0.12}>
              <figure className={styles.capabilityPhoto}>
                <Image
                  src="/assets/export/redesign/export-coordination.webp"
                  alt="Representative stock photograph of a logistics worker reviewing shipment paperwork; the person shown is not Fashion Knits staff."
                  fill
                  sizes="(max-width: 900px) 100vw, 42vw"
                  className={styles.coverImage}
                  quality={80}
                />
                <figcaption className={styles.photoTag}>
                  <ClipboardList aria-hidden="true" />
                  <span>Export coordination</span>
                  <small>Representative image</small>
                </figcaption>
              </figure>
              <p className={styles.photoNote}>
                Shipment scope, responsibilities and arrangements are agreed for each order.
              </p>
            </GlobalReveal>
          </div>
        </div>
      </section>

      <GlobalTradeDetails />

      <section aria-labelledby="global-cta-title" className={styles.finalCta}>
        <Image
          src="/assets/export/redesign/sea-freight.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className={styles.ctaImage}
          quality={82}
        />
        <div aria-hidden="true" className={styles.ctaShade} />
        <div className={[styles.container, styles.ctaContent].join(' ')}>
          <GlobalReveal>
            <Eyebrow light>Take business beyond borders</Eyebrow>
            <h2 id="global-cta-title" className={styles.ctaTitle}>
              YOUR NEXT MARKET <span>STARTS HERE.</span>
            </h2>
            <p className={styles.ctaCopy}>
              Every market opens a different conversation. Share the destination and order you have in mind, and our team can discuss what may be needed next.
            </p>
            <div className={styles.ctaActions}>
              <Link href="#contact" className={styles.buttonPrimary}>
                Contact Our Export Team <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="#export-capabilities" className={styles.buttonText}>
                Explore Our Capabilities <ArrowDownRight aria-hidden="true" />
              </Link>
            </div>
            <p className={styles.ctaFootnote}>
              Representative shipping image · shipment arrangements are confirmed order by order.
            </p>
          </GlobalReveal>
        </div>
      </section>
    </div>
  );
}
