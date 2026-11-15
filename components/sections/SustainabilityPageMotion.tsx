'use client';

import { useEffect } from 'react';

export function SustainabilityPageMotion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>('[data-sustainability-page]');
    if (!page) return;

    const sections = Array.from(
      page.querySelectorAll<HTMLElement>('[data-motion-section]'),
    );
    const hero = page.querySelector<HTMLElement>('[data-motion-section="hero"]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    page.dataset.motionReady = 'true';
    hero?.setAttribute('data-revealed', 'true');

    if (reducedMotion.matches) {
      sections.forEach((section) => section.setAttribute('data-revealed', 'true'));
      return;
    }

    const revealTargets = sections.filter((section) => section !== hero);
    let observer: IntersectionObserver | undefined;

    if (typeof window.IntersectionObserver === 'function') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const section = entry.target as HTMLElement;
            section.setAttribute('data-revealed', 'true');
            observer?.unobserve(section);
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      );
      revealTargets.forEach((section) => observer?.observe(section));
    } else {
      revealTargets.forEach((section) => section.setAttribute('data-revealed', 'true'));
    }

    const heroMedia = page.querySelector<HTMLElement>('[data-sustainability-hero-media]');
    let frame = 0;

    const updateParallax = () => {
      frame = 0;
      if (!heroMedia || reducedMotion.matches) return;

      const bounds = hero?.getBoundingClientRect();
      if (!bounds || bounds.bottom < 0 || bounds.top > window.innerHeight) {
        heroMedia.style.setProperty('--hero-parallax-y', '0px');
        return;
      }

      const mobile = window.matchMedia('(max-width: 767px)').matches;
      const limit = mobile ? 12 : 32;
      const amount = mobile ? 0.035 : 0.065;
      const offset = Math.max(-limit, Math.min(limit, -bounds.top * amount));
      heroMedia.style.setProperty('--hero-parallax-y', `${offset.toFixed(1)}px`);
    };

    const requestParallaxUpdate = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateParallax);
    };

    requestParallaxUpdate();
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    window.addEventListener('resize', requestParallaxUpdate, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', requestParallaxUpdate);
      window.removeEventListener('resize', requestParallaxUpdate);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
