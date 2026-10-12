'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Fade-in and slide-up animation
 */
export function fadeInUp(
  element: gsap.TweenTarget,
  options: {
    delay?: number;
    duration?: number;
    y?: number;
    stagger?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
): gsap.core.Tween {
  const { delay = 0, duration = 1, y = 40, stagger, scrollTrigger } = options;

  if (prefersReducedMotion()) {
    return gsap.set(element, { opacity: 1, y: 0 });
  }

  return gsap.fromTo(
    element,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: scrollTrigger
        ? {
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none none',
            ...scrollTrigger,
          }
        : undefined,
    }
  );
}

/**
 * Text reveal animation with clip-path
 */
export function textReveal(
  element: gsap.TweenTarget,
  options: {
    delay?: number;
    duration?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
): gsap.core.Tween {
  const { delay = 0, duration = 1.2, scrollTrigger } = options;

  if (prefersReducedMotion()) {
    return gsap.set(element, { clipPath: 'inset(0 0 0% 0)' });
  }

  return gsap.fromTo(
    element,
    { clipPath: 'inset(0 0 100% 0)' },
    {
      clipPath: 'inset(0 0 0% 0)',
      duration,
      delay,
      ease: 'power4.out',
      scrollTrigger: scrollTrigger
        ? {
            start: 'top 80%',
            toggleActions: 'play none none none',
            ...scrollTrigger,
          }
        : undefined,
    }
  );
}

/**
 * Staggered children animation
 */
export function staggerReveal(
  elements: gsap.TweenTarget,
  options: {
    stagger?: number;
    delay?: number;
    duration?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
): gsap.core.Tween {
  const { stagger = 0.1, delay = 0, duration = 0.8, scrollTrigger } = options;

  if (prefersReducedMotion()) {
    return gsap.set(elements, { opacity: 1, y: 0 });
  }

  return gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: scrollTrigger
        ? {
            start: 'top 80%',
            toggleActions: 'play none none none',
            ...scrollTrigger,
          }
        : undefined,
    }
  );
}

/**
 * Counter animation for statistics
 */
export function animateCounter(
  element: HTMLElement,
  endValue: number,
  options: {
    duration?: number;
    suffix?: string;
    prefix?: string;
  } = {}
): gsap.core.Tween {
  const { duration = 2, suffix = '', prefix = '' } = options;
  const obj = { value: 0 };

  if (prefersReducedMotion()) {
    element.textContent = `${prefix}${endValue}${suffix}`;
    return gsap.set(element, {});
  }

  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
    },
  });
}

/**
 * Parallax scroll effect
 */
export function parallax(
  element: gsap.TweenTarget,
  options: {
    speed?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
): gsap.core.Tween {
  const { speed = 0.3, scrollTrigger } = options;

  if (prefersReducedMotion()) {
    return gsap.set(element, {});
  }

  return gsap.to(element, {
    y: () => speed * 100,
    ease: 'none',
    scrollTrigger: {
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      ...scrollTrigger,
    },
  });
}

/**
 * Image reveal from a direction
 */
export function imageReveal(
  element: gsap.TweenTarget,
  direction: 'left' | 'right' | 'bottom' = 'bottom',
  options: {
    duration?: number;
    delay?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
): gsap.core.Tween {
  const { duration = 1.2, delay = 0, scrollTrigger } = options;

  const clipPaths = {
    left: { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
    right: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
    bottom: { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },
  };

  if (prefersReducedMotion()) {
    return gsap.set(element, { clipPath: clipPaths[direction].to });
  }

  return gsap.fromTo(
    element,
    { clipPath: clipPaths[direction].from },
    {
      clipPath: clipPaths[direction].to,
      duration,
      delay,
      ease: 'power4.inOut',
      scrollTrigger: scrollTrigger
        ? {
            start: 'top 80%',
            toggleActions: 'play none none none',
            ...scrollTrigger,
          }
        : undefined,
    }
  );
}

/**
 * Horizontal scroll setup for a container
 */
export function setupHorizontalScroll(
  container: HTMLElement,
  scrollContainer: HTMLElement,
  options: {
    ease?: string;
  } = {}
): ScrollTrigger {
  const { ease = 'none' } = options;
  const scrollWidth = scrollContainer.scrollWidth - container.offsetWidth;

  if (prefersReducedMotion()) {
    return ScrollTrigger.create({ trigger: container });
  }

  const tween = gsap.to(scrollContainer, {
    x: -scrollWidth,
    ease,
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${scrollWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  return tween.scrollTrigger!;
}

export { gsap, ScrollTrigger };
