'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './about-motion.module.css';

export function AboutMaskWord({ children, muted = false }: { children: string; muted?: boolean }) {
  return (
    <span
      data-about-mask="true"
      data-about-mask-group="heading"
      data-about-muted={muted ? 'true' : undefined}
      className={`${styles.maskWord}${muted ? ` ${styles.mutedWord}` : ''}`}
    >
      <span className={muted ? 'text-charcoal/45' : undefined}>{children}</span>
    </span>
  );
}

export function AboutMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>(
      '[data-about-reveal], [data-about-fade], [data-about-mask], [data-about-line]',
    ));
    const heading = root.querySelector<HTMLElement>('[data-about-parallax]');
    const headingWords = Array.from(root.querySelectorAll<HTMLElement>('[data-about-mask-group="heading"]'));
    if (targets.length === 0) return;

    const measureHeadingLines = () => {
      let currentTop: number | null = null;
      let lineIndex = -1;

      headingWords.forEach((word) => {
        const top = Math.round(word.getBoundingClientRect().top);
        if (currentTop === null || Math.abs(top - currentTop) > 1) {
          currentTop = top;
          lineIndex += 1;
        }

        const mutedDelay = word.dataset.aboutMuted === 'true' ? 120 : 0;
        word.style.setProperty('--about-delay', `${lineIndex * 100 + mutedDelay}ms`);
      });

      if (lineIndex >= 0) {
        const bodyDelay = lineIndex * 100 + 120 + 650 + 200;
        root.style.setProperty('--about-body-delay', `${bodyDelay}ms`);
      }
    };

    measureHeadingLines();
    const resizeObserver = heading && typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(measureHeadingLines)
      : null;
    if (heading) resizeObserver?.observe(heading);

    root.dataset.motionReady = 'true';

    const transitionSubscriptions = targets.flatMap((target) => {
      const transitionTarget = target.hasAttribute('data-about-mask')
        ? target.firstElementChild
        : target;
      if (!(transitionTarget instanceof HTMLElement)) return [];

      const markAnimated = (event: Event) => {
        const transitionEvent = event as TransitionEvent;
        if (transitionEvent.target !== transitionTarget) return;
        if (transitionEvent.propertyName !== 'opacity' && transitionEvent.propertyName !== 'transform') return;
        target.dataset.aboutAnimated = 'true';
      };

      transitionTarget.addEventListener('transitionend', markAnimated);
      return [{ transitionTarget, markAnimated }];
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isSmallScreen = window.matchMedia('(max-width: 767px)');
    let parallaxFrame = 0;

    const updateParallax = () => {
      parallaxFrame = 0;
      if (!heading) return;
      if (prefersReducedMotion.matches || isSmallScreen.matches) {
        heading.style.setProperty('--about-parallax', '0px');
        return;
      }

      const rect = heading.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const offset = Math.max(0, Math.min(24, progress * 24));
      heading.style.setProperty('--about-parallax', `${offset.toFixed(2)}px`);
    };

    const scheduleParallax = () => {
      if (!parallaxFrame) parallaxFrame = window.requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', scheduleParallax, { passive: true });
    window.addEventListener('resize', scheduleParallax, { passive: true });
    prefersReducedMotion.addEventListener('change', scheduleParallax);
    isSmallScreen.addEventListener('change', scheduleParallax);
    scheduleParallax();

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((target) => { target.dataset.aboutIn = 'true'; });
    } else {
      const currentObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.2) return;
          const target = entry.target as HTMLElement;
          target.dataset.aboutIn = 'true';
          currentObserver.unobserve(target);
        });
      }, { threshold: 0.2 });
      observer = currentObserver;

      targets.forEach((target) => {
        if (target.dataset.aboutIn === 'true') return;
        currentObserver.observe(target);
      });

    }

    return () => {
      observer?.disconnect();
      resizeObserver?.disconnect();
      transitionSubscriptions.forEach(({ transitionTarget, markAnimated }) => {
        transitionTarget.removeEventListener('transitionend', markAnimated);
      });
      window.removeEventListener('scroll', scheduleParallax);
      window.removeEventListener('resize', scheduleParallax);
      prefersReducedMotion.removeEventListener('change', scheduleParallax);
      isSmallScreen.removeEventListener('change', scheduleParallax);
      if (parallaxFrame) window.cancelAnimationFrame(parallaxFrame);
    };
  }, []);

  return <div ref={rootRef} className={`mx-auto max-w-[86rem] ${styles.motionRoot}`}>{children}</div>;
}

