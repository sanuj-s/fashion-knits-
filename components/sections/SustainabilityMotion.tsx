'use client';

import { useEffect } from 'react';
import styles from './Sustainability.module.css';

export function SustainabilityMotion() {
  useEffect(() => {
    const section = document.getElementById('sustainability');
    const ambient = section?.querySelector<HTMLElement>(`.${styles.ambient}`);

    if (!section || !ambient || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let observer: IntersectionObserver | undefined;
    let visibilityFrame = 0;
    const revealIfVisible = () => {
      visibilityFrame = 0;
      if (section.dataset.revealed === 'true') return;

      const bounds = section.getBoundingClientRect();
      const visibleHeight = Math.max(0, Math.min(window.innerHeight, bounds.bottom) - Math.max(0, bounds.top));
      if (bounds.height > 0 && visibleHeight / bounds.height >= 0.3) {
        section.dataset.revealed = 'true';
        window.removeEventListener('scroll', scheduleVisibilityCheck);
        window.removeEventListener('resize', scheduleVisibilityCheck);
      }
    };
    const scheduleVisibilityCheck = () => {
      if (visibilityFrame === 0) visibilityFrame = window.requestAnimationFrame(revealIfVisible);
    };

    if (typeof window.IntersectionObserver === 'function') {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting && entry.intersectionRatio >= 0.3) {
            section.dataset.revealed = 'true';
            observer?.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      observer.observe(section);
    } else {
      window.addEventListener('scroll', scheduleVisibilityCheck, { passive: true });
      window.addEventListener('resize', scheduleVisibilityCheck, { passive: true });
      scheduleVisibilityCheck();
    }

    const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-sustainability-card]'));
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;

      const card = event.currentTarget as HTMLElement;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--my', `${event.clientY - bounds.top}px`);
    };
    const onPointerLeave = (event: PointerEvent) => {
      const card = event.currentTarget as HTMLElement;
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
    };

    cards.forEach((card) => {
      card.addEventListener('pointermove', onPointerMove);
      card.addEventListener('pointerleave', onPointerLeave);
    });

    let frame = 0;
    const updateAmbient = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const sectionCenter = bounds.top + bounds.height / 2;
      const offset = (window.innerHeight / 2 - sectionCenter) * 0.035;
      const boundedOffset = Math.max(-20, Math.min(20, offset));
      ambient.style.setProperty('--ambient-shift', `${boundedOffset}px`);
    };
    const requestAmbientUpdate = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateAmbient);
    };

    requestAmbientUpdate();
    window.addEventListener('scroll', requestAmbientUpdate, { passive: true });
    window.addEventListener('resize', requestAmbientUpdate, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', scheduleVisibilityCheck);
      window.removeEventListener('resize', scheduleVisibilityCheck);
      cards.forEach((card) => {
        card.removeEventListener('pointermove', onPointerMove);
        card.removeEventListener('pointerleave', onPointerLeave);
      });
      window.removeEventListener('scroll', requestAmbientUpdate);
      window.removeEventListener('resize', requestAmbientUpdate);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      if (visibilityFrame !== 0) window.cancelAnimationFrame(visibilityFrame);
    };
  }, []);

  return null;
}
