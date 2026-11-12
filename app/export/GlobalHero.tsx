'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import styles from './GlobalExperience.module.css';

export function GlobalHero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 46]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.075, 1.02]);

  return (
    <section ref={heroRef} aria-labelledby="global-hero-title" className={styles.hero}>
      <motion.div
        className={styles.heroImageFrame}
        initial={reduceMotion ? false : { clipPath: 'inset(0 0 8% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.76, 0, 0.24, 1] }}
        style={{ y: reduceMotion ? 0 : imageY, scale: reduceMotion ? 1 : imageScale }}
      >
        <Image
          src="/assets/export/redesign/hero-global-port.webp"
          alt=""
          aria-hidden="true"
          fill
          preload
          sizes="100vw"
          className={styles.heroImage}
          quality={84}
        />
      </motion.div>
      <div aria-hidden="true" className={styles.heroShade} />
      <div aria-hidden="true" className={styles.heroMapFrame}>
        <Image
          src="/assets/export/world-map.svg"
          alt=""
          fill
          unoptimized
          sizes="(max-width: 760px) 100vw, 84vw"
          className={styles.heroMap}
        />
      </div>
      <div aria-hidden="true" className={styles.heroGrid} />

      <div className={[styles.container, styles.heroContent].join(' ')}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Global export</span>
        </nav>

        <p className={styles.heroEyebrow}>
          <span aria-hidden="true" />
          GLOBAL APPAREL EXPORT
        </p>

        <h1 id="global-hero-title" className={styles.heroTitle}>
          <motion.span
            className={styles.heroTitleLine}
            initial={reduceMotion ? false : { opacity: 1, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.76, delay: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            APPAREL,
          </motion.span>
          <motion.span
            className={styles.heroTitleLine}
            initial={reduceMotion ? false : { opacity: 1, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.76, delay: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            CONNECTED TO THE
          </motion.span>
          <motion.span
            className={[styles.heroTitleLine, styles.heroTitleItalic].join(' ')}
            initial={reduceMotion ? false : { opacity: 1, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.76, delay: reduceMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            WORLD.
          </motion.span>
        </h1>

        <div className={styles.heroLower}>
          <p className={styles.heroCopy}>
            A clear starting point for exploring markets and preparing to discuss your next export order.
          </p>
          <div className={styles.heroActions}>
            <Link href="#markets" className={styles.buttonPrimary}>
              Explore Global Markets <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="#export-capabilities" className={styles.buttonGhost}>
              Our Export Capabilities <ArrowDown aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className={styles.heroFoot}>
          <span>From Tiruppur, India</span>
          <span>Export coordination · freight · global markets</span>
          <span className={styles.heroCoordinates}>11° N&nbsp; 77° E</span>
        </div>
      </div>

      <a className={styles.scrollCue} href="#markets" aria-label="Scroll to global markets">
        <span>Scroll to explore</span>
        <span aria-hidden="true" className={styles.scrollCueLine}><i /></span>
      </a>
      <span className={styles.heroImageNote}>Representative port image · illustrative routes only</span>
    </section>
  );
}
