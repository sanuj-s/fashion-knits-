'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const WORKER_COUNT = 1000;
const hiddenCopy = { opacity: 0, y: 14 };
const visibleCopy = { opacity: 1, y: 0 };
const editorialEase = [0.22, 1, 0.36, 1] as const;

export function WorkforceScale() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.24 });
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion ?? false;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageParallax = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const [count, setCount] = useState(WORKER_COUNT);
  const [countComplete, setCountComplete] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const updateLayout = () => setIsDesktop(desktopQuery.matches);

    updateLayout();
    desktopQuery.addEventListener('change', updateLayout);
    return () => desktopQuery.removeEventListener('change', updateLayout);
  }, []);

  useEffect(() => {
    if (!isInView || reduceMotion) return;

    let frame = 0;
    let startTime = 0;
    setCount(0);
    setCountComplete(false);

    const animateCount = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / 1700, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(WORKER_COUNT * easedProgress));

      if (progress < 1) {
        frame = requestAnimationFrame(animateCount);
      } else {
        setCount(WORKER_COUNT);
        setCountComplete(true);
      }
    };

    frame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(frame);
  }, [isInView, reduceMotion]);

  const displayedCount = reduceMotion ? WORKER_COUNT : count;

  return (
    <section
      ref={sectionRef}
      id="workforce-scale"
      aria-labelledby="workforce-scale-title"
      className="relative isolate overflow-hidden bg-[#191816] px-5 py-12 text-[#f7f5f0] sm:py-16 lg:py-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_44%,rgba(201,169,110,0.09),transparent_48%)]" />

      <div className="relative mx-auto max-w-[100rem] md:grid md:min-h-[37rem] md:grid-cols-12 md:items-center lg:min-h-[39rem]">
        <motion.figure
          className="relative -mx-5 mb-9 aspect-[16/10] overflow-hidden bg-[#25231f] sm:-mx-8 md:absolute md:inset-y-0 md:left-0 md:mb-0 md:aspect-auto md:w-[72%]"
          initial={reduceMotion ? false : { clipPath: 'ellipse(0% 92% at 22% 50%)', opacity: 0.72 }}
          animate={reduceMotion || isInView
            ? { clipPath: 'ellipse(78% 96% at 22% 50%)', opacity: 1 }
            : { clipPath: 'ellipse(0% 92% at 22% 50%)', opacity: 0.72 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 1.2, ease: editorialEase }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ y: isDesktop && !reduceMotion ? imageParallax : 0 }}
            animate={reduceMotion || !isDesktop ? { scale: 1.025 } : { scale: [1.025, 1.055] }}
            transition={reduceMotion || !isDesktop
              ? { duration: 0 }
              : { duration: 26, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
          >
            <Image
              src="/assets/images/workforce-production-illustrative.webp"
              alt="AI-generated illustrative garment production scene with several workers at sewing stations"
              fill
              sizes="(max-width: 767px) 100vw, 72vw"
              className="object-cover"
            />
          </motion.div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10 md:bg-gradient-to-r md:from-transparent md:via-black/5 md:to-black/30" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_38%,rgba(232,204,151,0.14),transparent_55%)] mix-blend-screen" />

          <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block">
            <path d="M 89 0 C 97 18 100 36 100 50 C 100 64 97 82 89 100" fill="none" stroke="rgba(201,169,110,0.24)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
            <motion.path
              d="M 89 0 C 97 18 100 36 100 50 C 100 64 97 82 89 100"
              fill="none"
              stroke="rgba(225,195,134,0.9)"
              strokeWidth="0.65"
              strokeDasharray="13 190"
              vectorEffect="non-scaling-stroke"
              initial={{ strokeDashoffset: 0, opacity: 0 }}
              animate={reduceMotion ? { opacity: 0 } : { strokeDashoffset: [0, -203], opacity: [0, 0.75, 0] }}
              transition={reduceMotion ? { duration: 0 } : { delay: 2.6, duration: 7.5, ease: 'linear', repeat: Infinity, repeatDelay: 2.5 }}
            />
          </svg>

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-y-1/4 left-0 hidden w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#f3d9a4]/10 to-transparent blur-md md:block"
            initial={{ x: '-160%', opacity: 0 }}
            animate={reduceMotion || !isDesktop ? { x: '-160%', opacity: 0 } : { x: ['-160%', '420%'], opacity: [0, 0.7, 0] }}
            transition={reduceMotion || !isDesktop
              ? { duration: 0 }
              : { delay: 3.8, duration: 1.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 10 }}
          />

          <figcaption className="absolute bottom-4 left-7 max-w-[82%] text-[7px] font-medium uppercase leading-[1.35] tracking-[0.1em] text-white/90 sm:left-10 sm:text-[9px] sm:tracking-[0.14em] md:bottom-6 md:left-8">
            AI-generated illustration · not a facility photo
          </figcaption>
        </motion.figure>

        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[-1.25rem] z-[1] hidden w-[74%] bg-gradient-to-r from-transparent via-[#191816]/80 to-[#191816] md:block" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-[52%] opacity-35 md:block"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 8px), radial-gradient(ellipse at 80% 16%, rgba(201,169,110,0.1), transparent 48%)',
          }}
        />

        <div className="relative z-10 flex flex-col justify-center md:col-span-6 md:col-start-7 md:min-h-[37rem] md:pl-16 md:pr-4 lg:min-h-[39rem] lg:pl-20 xl:pl-24 xl:pr-8">
          <motion.p
            initial={reduceMotion ? false : hiddenCopy}
            animate={reduceMotion || isInView ? visibleCopy : hiddenCopy}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.08, ease: editorialEase }}
            className="relative mb-3 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d6bd8b] sm:text-[10px]"
          >
            <span aria-hidden="true" className="h-px w-7 bg-[#c9a96e]" />
            People behind production
          </motion.p>

          <div className="relative flex flex-wrap items-end gap-x-2.5 gap-y-0 sm:gap-x-3">
            <div className="relative overflow-hidden text-[clamp(3.15rem,13.5vw,6.8rem)] font-semibold leading-[0.83] tracking-[-0.08em] text-[#e1c386] md:text-[clamp(4.2rem,6.6vw,6.8rem)]">
              <motion.span
                className="block"
                initial={reduceMotion ? false : { y: '110%' }}
                animate={reduceMotion || isInView ? { y: '0%' } : { y: '110%' }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.9, delay: 0.18, ease: editorialEase }}
                aria-hidden="true"
              >
                {displayedCount.toLocaleString('en-IN')}+
              </motion.span>
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent mix-blend-screen"
                initial={{ x: '-120%', opacity: 0 }}
                animate={countComplete && !reduceMotion ? { x: '120%', opacity: [0, 0.42, 0] } : { x: '-120%', opacity: 0 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 1.1, ease: 'easeOut' }}
              />
            </div>
            <motion.span
              aria-hidden="true"
              className="mb-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-white/70 sm:mb-2.5 sm:text-xs sm:tracking-[0.18em]"
              initial={reduceMotion ? false : { opacity: 0, x: 8 }}
              animate={reduceMotion || isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.52, ease: editorialEase }}
            >
              Workers
            </motion.span>
            <span className="sr-only">1,000+ workers</span>
          </div>

          <h2 id="workforce-scale-title" className="relative mt-5 max-w-[37rem] text-[clamp(1.85rem,3.3vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.055em] text-[#f7f5f0]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduceMotion ? false : { y: '110%' }}
                animate={reduceMotion || isInView ? { y: '0%' } : { y: '110%' }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.82, delay: 0.42, ease: editorialEase }}
              >
                A thousand hands.
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduceMotion ? false : { y: '110%' }}
                animate={reduceMotion || isInView ? { y: '0%' } : { y: '110%' }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.82, delay: 0.54, ease: editorialEase }}
              >
                One manufacturing vision.
              </motion.span>
            </span>
          </h2>

          <motion.p
            className="relative mt-4 max-w-[37rem] text-[13px] leading-[1.75] text-white/70 sm:text-[15px]"
            initial={reduceMotion ? false : hiddenCopy}
            animate={reduceMotion || isInView ? visibleCopy : hiddenCopy}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.72, delay: 0.72, ease: editorialEase }}
          >
            Behind Fashion Knits&apos; garment manufacturing operations is a wider team of workers, staff, executives and supporting personnel working together to support apparel production.
          </motion.p>

          <motion.div
            className="relative mt-6 w-fit max-w-full"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.72, delay: 0.94, ease: editorialEase }}
          >
            <Link
              href="/manufacturing"
              className="group relative inline-flex min-h-11 max-w-full items-center gap-2.5 overflow-hidden rounded-full border border-[#c9a96e]/75 bg-white/[0.025] px-4 py-2.5 text-[8px] font-semibold uppercase leading-4 tracking-[0.12em] text-[#f0d7a1] transition-colors duration-300 hover:border-[#e1c386] hover:bg-[#e1c386]/[0.08] hover:text-[#ffe9bc] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6bd8b] focus-visible:ring-offset-4 focus-visible:ring-offset-[#191816] sm:gap-3 sm:px-5 sm:text-[10px] sm:tracking-[0.14em] motion-reduce:transition-none"
            >
              <span aria-hidden="true" className="absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 bg-[#e1c386] transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100 sm:inset-x-5 motion-reduce:transition-none" />
              <span aria-hidden="true" className="absolute inset-0 bg-[#e1c386]/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none" />
              <span className="relative">Explore our manufacturing operations</span>
              <ArrowRight aria-hidden="true" className="relative h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
