'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Detects if the user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Detects if an element is in the viewport.
 * Supports both:
 * 1. const isInView = useInView(ref, { once: true, amount: 0.1 })
 * 2. const [ref, isInView] = useInView(0.1, true)
 */
export function useInView(
  targetRef: React.RefObject<HTMLElement | null>,
  options?: { once?: boolean; amount?: number }
): boolean;
export function useInView(
  threshold?: number,
  triggerOnce?: boolean
): [React.RefObject<HTMLElement | null>, boolean];
export function useInView(
  arg1?: React.RefObject<HTMLElement | null> | number,
  arg2?: { once?: boolean; amount?: number } | boolean
): boolean | [React.RefObject<HTMLElement | null>, boolean] {
  const internalRef = useRef<HTMLElement | null>(null);
  const isRefPassed = arg1 && typeof arg1 === 'object' && 'current' in arg1;

  const targetRef = isRefPassed
    ? (arg1 as React.RefObject<HTMLElement | null>)
    : internalRef;

  let threshold = 0.1;
  let triggerOnce = true;

  if (isRefPassed) {
    if (arg2 && typeof arg2 === 'object') {
      if (arg2.amount !== undefined) threshold = arg2.amount;
      if (arg2.once !== undefined) triggerOnce = arg2.once;
    }
  } else {
    if (typeof arg1 === 'number') threshold = arg1;
    if (typeof arg2 === 'boolean') triggerOnce = arg2;
  }

  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.unobserve(element);
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [targetRef, threshold, triggerOnce]);

  if (isRefPassed) {
    return isInView;
  }

  return [internalRef, isInView];
}

/**
 * Detects if the device is mobile
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}

/**
 * Window dimensions hook
 */
export function useWindowSize(): { width: number; height: number } {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return size;
}

/**
 * Scroll progress (0 to 1) for an element
 */
export function useScrollProgress(
  ref: React.RefObject<HTMLElement | null>
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = element.offsetHeight;
      const totalDistance = windowHeight + elementHeight;
      const traveled = windowHeight - rect.top;
      const p = Math.max(0, Math.min(1, traveled / totalDistance));
      setProgress(p);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);

  return progress;
}

/**
 * Debounced callback
 */
export function useDebounce<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return debouncedCallback;
}
