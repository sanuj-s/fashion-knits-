'use client';

import Link from 'next/link';
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
} from 'motion/react';
import type { PointerEvent, ReactNode } from 'react';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import styles from './about.module.css';

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
const REDUCED_FADE = { duration: 0.15, ease: 'easeOut' as const };

type MotionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
};

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function AboutReveal({ children, className, delay = 0, amount = 0.16 }: MotionProps) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <motion.div
      className={[styles.motionReveal, className].filter(Boolean).join(' ')}
      initial={{ opacity: 0, ...(reduced ? {} : { y: 20 }) }}
      whileInView={{ opacity: 1, ...(reduced ? {} : { y: 0 }) }}
      viewport={{ once: true, amount, margin: '0px 0px -40px 0px' }}
      transition={reduced ? REDUCED_FADE : { duration: 0.8, ease: REVEAL_EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function AboutListItemReveal({ children, className, delay = 0, amount = 0.16, hoverLift = false }: MotionProps & { hoverLift?: boolean }) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');

  return (
    <motion.li
      className={[styles.motionReveal, className].filter(Boolean).join(' ')}
      initial={{ opacity: 0, ...(reduced ? {} : { y: 20 }) }}
      whileInView={{ opacity: 1, ...(reduced ? {} : { y: 0 }) }}
      whileHover={hoverLift && finePointer && !reduced ? {
        y: -6,
        transition: { type: 'spring', stiffness: 300, damping: 24 },
      } : undefined}
      viewport={{ once: true, amount, margin: '0px 0px -40px 0px' }}
      transition={reduced ? REDUCED_FADE : { duration: 0.8, ease: REVEAL_EASE, delay }}
    >
      {children}
    </motion.li>
  );
}

export function AboutFadeItemReveal({ children, className, delay = 0 }: MotionProps) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <motion.li
      className={[styles.motionReveal, className].filter(Boolean).join(' ')}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.16, margin: '0px 0px -40px 0px' }}
      transition={reduced ? REDUCED_FADE : { duration: 0.8, ease: REVEAL_EASE, delay }}
    >
      {children}
    </motion.li>
  );
}

export function AboutHeroEntry({ children, className, delay = 0 }: MotionProps) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <motion.div
      className={[styles.motionReveal, className].filter(Boolean).join(' ')}
      initial={{ opacity: 0, ...(reduced ? {} : { y: 24 }) }}
      animate={{ opacity: 1, ...(reduced ? {} : { y: 0 }) }}
      transition={reduced ? REDUCED_FADE : { duration: 0.8, ease: REVEAL_EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function AboutHeroWord({ children, delay = 0 }: Pick<MotionProps, 'children' | 'delay'>) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, ...(reduced ? {} : { y: 24 }) }}
      animate={{ opacity: 1, ...(reduced ? {} : { y: 0 }) }}
      transition={reduced ? REDUCED_FADE : { duration: 0.8, ease: REVEAL_EASE, delay }}
    >
      {children}
    </motion.span>
  );
}

export function AboutNameWord({ children, delay = 0 }: Pick<MotionProps, 'children' | 'delay'>) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, ...(reduced ? {} : { y: 24 }) }}
      whileInView={{ opacity: 1, ...(reduced ? {} : { y: 0 }) }}
      viewport={{ once: true, amount: 0.7 }}
      transition={reduced ? REDUCED_FADE : { duration: 0.8, ease: REVEAL_EASE, delay }}
    >
      {children}
    </motion.span>
  );
}

export function AboutHeroDot() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <motion.span
      className="inline-block origin-center"
      initial={reduced ? { opacity: 0 } : { scale: 0 }}
      animate={reduced ? { opacity: 1 } : { scale: 1 }}
      transition={reduced ? REDUCED_FADE : { duration: 0.42, ease: REVEAL_EASE, delay: 0.96 }}
    >
      .
    </motion.span>
  );
}

export function AboutHeroImageReveal({ children, className }: Pick<MotionProps, 'children' | 'className'>) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <motion.div
      className={[styles.motionImageReveal, className].filter(Boolean).join(' ')}
      initial={reduced ? { opacity: 0 } : { opacity: 1, clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
      transition={reduced ? REDUCED_FADE : { duration: 1.1, ease: REVEAL_EASE }}
    >
      {children}
    </motion.div>
  );
}

export function AboutHeroImageParallax({ children, className }: Pick<MotionProps, 'children' | 'className'>) {
  const targetRef = useRef<HTMLDivElement>(null);
  const inView = useInView(targetRef, { margin: '100px', once: false });
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const desktopFinePointer = useMediaQuery('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
  const parallaxY = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    if (!inView || !desktopFinePointer || reduced) {
      parallaxY.set(0);
      return;
    }

    const updateParallax = (progress: number) => parallaxY.set((progress - 0.5) * 32);
    updateParallax(scrollYProgress.get());
    return scrollYProgress.on('change', updateParallax);
  }, [desktopFinePointer, inView, parallaxY, reduced, scrollYProgress]);

  return (
    <motion.div
      ref={targetRef}
      className={className}
      style={desktopFinePointer && !reduced ? { y: parallaxY } : undefined}
      initial={reduced ? false : { scale: 1.12 }}
      animate={reduced ? undefined : { scale: 1 }}
      transition={reduced ? undefined : { duration: 1.6, ease: REVEAL_EASE }}
    >
      {children}
    </motion.div>
  );
}

export function AboutPortraitReveal({ children, className, delay = 0 }: MotionProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const inView = useInView(targetRef, { once: true, amount: 0.14 });
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const hiddenState = reduced ? { opacity: 0 } : { opacity: 1, clipPath: 'inset(100% 0% 0% 0%)' };
  const visibleState = reduced ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' };

  return (
    <div ref={targetRef} className={className}>
      <motion.div
        className={styles.motionImageReveal}
        initial={hiddenState}
        animate={inView ? visibleState : hiddenState}
        transition={reduced ? REDUCED_FADE : { duration: 1.1, ease: REVEAL_EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function AboutDrawLine({
  className,
  orientation = 'horizontal',
}: {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}) {
  const targetRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(targetRef, { once: true, amount: 0.2 });
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <span ref={targetRef} aria-hidden="true" className={className}>
      <motion.span
        className={styles.drawnLine}
        initial={reduced ? { opacity: 0 } : orientation === 'vertical' ? { scaleY: 0 } : { scaleX: 0 }}
        animate={inView ? (reduced ? { opacity: 1 } : orientation === 'vertical' ? { scaleY: 1 } : { scaleX: 1 }) : undefined}
        style={orientation === 'vertical' ? { transformOrigin: 'center top' } : undefined}
        transition={reduced ? REDUCED_FADE : { duration: 0.8, ease: REVEAL_EASE }}
      />
    </span>
  );
}

export function AboutStoryYear({ children, className }: MotionProps) {
  const yearRef = useRef<HTMLParagraphElement>(null);
  const inView = useInView(yearRef, { margin: '40px 0px', once: false });
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const opacity = useMotionValue(reduced ? 1 : 0.35);
  const y = useMotionValue(reduced ? 0 : 10);
  const { scrollYProgress } = useScroll({
    target: yearRef,
    offset: ['start 85%', 'end 15%'],
  });

  useEffect(() => {
    if (reduced) {
      opacity.set(1);
      y.set(0);
      return;
    }
    if (!inView) return;

    const updateYear = (progress: number) => {
      opacity.set(0.35 + progress * 0.65);
      y.set(10 * (1 - progress));
    };
    updateYear(scrollYProgress.get());
    return scrollYProgress.on('change', updateYear);
  }, [inView, opacity, reduced, scrollYProgress, y]);

  return (
    <motion.p ref={yearRef} aria-hidden="true" className={`${styles.storyYear} ${className ?? ''}`} style={reduced ? undefined : { opacity, y }}>
      {children}
    </motion.p>
  );
}

export function AboutSectionSeam() {
  const targetRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(targetRef, { once: true, amount: 0.1 });
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <span ref={targetRef} aria-hidden="true" className={styles.sectionSeamTrack}>
      <motion.span
        className={styles.sectionSeam}
        initial={reduced ? { opacity: 0 } : { scaleX: 0 }}
        animate={inView ? (reduced ? { opacity: 1 } : { scaleX: 1 }) : undefined}
        transition={reduced ? REDUCED_FADE : { duration: 1, ease: REVEAL_EASE }}
      />
    </span>
  );
}

export function AboutMagneticLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 24 });
  const springY = useSpring(y, { stiffness: 300, damping: 24 });
  const enabled = finePointer && !reduced;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - (bounds.left + bounds.width / 2)) * 0.16;
    const dy = (event.clientY - (bounds.top + bounds.height / 2)) * 0.16;
    x.set(Math.max(-8, Math.min(8, dx)));
    y.set(Math.max(-8, Math.min(8, dy)));
  };

  return (
    <motion.div
      className={className}
      style={enabled ? { x: springX, y: springY } : undefined}
      onPointerMove={enabled ? handlePointerMove : undefined}
      onPointerLeave={enabled ? () => { x.set(0); y.set(0); } : undefined}
    >
      <Link href={href} className="inline-flex min-h-12 w-fit shrink-0 items-center gap-3 bg-accent px-5 text-[10px] font-bold uppercase tracking-[0.13em] text-charcoal">
        {children}
      </Link>
    </motion.div>
  );
}
