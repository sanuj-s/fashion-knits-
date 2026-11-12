'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import type { PointerEvent } from 'react';
import { gsap } from '@/lib/animations';
import { resetPointerTilt, updatePointerTilt } from '@/components/ui/pointerTilt';

interface Stage {
  number: string;
  name: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

const PRODUCTION_STAGES: Stage[] = [
  {
    number: '01',
    name: 'CAD Pattern & Cutting',
    description:
      'In-house CAD supports pattern making and cutting. The listed cutting equipment includes Lectra and Bullmer E80 fully automatic machines.',
    image: '/assets/manufacturing-equipment/lectra-automatic-cutting.webp',
    imageAlt: 'Lectra fully automatic cutting machine',
  },
  {
    number: '02',
    name: 'Print & Embroider',
    description:
      'The facilities list five automatic printing machines and five embroidery machines, including Kornit, M&R, Sportsman, Barudan and Tajima equipment.',
    image: '/assets/manufacturing-equipment/kornit-storm-931-digital-printing.webp',
    imageAlt: 'Kornit Storm 931 digital printing machine',
  },
  {
    number: '03',
    name: 'Sewing & Finishing',
    description:
      'Product-focused lines and trained operators carry garments through sewing, trimming, checking, ironing and packaging. The stated monthly production capacity is approximately 350,000 pieces.',
    image: '/assets/images/process-garment-finishing.webp',
    imageAlt: 'Garment finishing work in a production setting',
  },
  {
    number: '04',
    name: 'Quality, Packing & Dispatch',
    description:
      'Fabric inspection, in-house testing and final garment checks lead into metal detection and secure packing in export cartons ready for shipment.',
    image: '/assets/images/process-export-packing.webp',
    imageAlt: 'Garments being prepared for packing and dispatch',
  },
];

const STAGE_DURATION = 6200;

function InteractiveImagePreview({ image, imageAlt }: { image: string; imageAlt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragRef = useRef({ x: 0, y: 0, angleX: 0, angleY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl', { alpha: true, antialias: false });
    if (!canvas || !gl) return;

    const paintBlankScene = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(bounds.width * pixelRatio));
      canvas.height = Math.max(1, Math.round(bounds.height * pixelRatio));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0.145, 0.137, 0.125, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    };

    const resizeObserver = new ResizeObserver(paintBlankScene);
    resizeObserver.observe(canvas);
    paintBlankScene();

    return () => resizeObserver.disconnect();
  }, []);

  const handleDragStart = (event: PointerEvent<HTMLCanvasElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragRef.current.x = event.clientX;
    dragRef.current.y = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = 'true';
  };

  const handleDrag = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const drag = dragRef.current;
    const deltaX = event.clientX - drag.x;
    const deltaY = event.clientY - drag.y;
    drag.x = event.clientX;
    drag.y = event.clientY;
    drag.angleY = Math.max(-18, Math.min(18, drag.angleY + deltaX * 0.18));
    drag.angleX = Math.max(-14, Math.min(14, drag.angleX - deltaY * 0.18));
    const preview = event.currentTarget.parentElement;
    preview?.style.setProperty('--drag-x', `${drag.angleX}deg`);
    preview?.style.setProperty('--drag-y', `${drag.angleY}deg`);
  };

  const handleDragEnd = (event: PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.dataset.dragging = 'false';
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="process-media process-media--webgl pointer-tilt">
      <Image src={image} alt={imageAlt} fill sizes="(max-width: 1199px) 70vw, 38vw" className="object-cover" />
      <video
        className="process-empty-video"
        aria-hidden="true"
        preload="none"
        tabIndex={-1}
      />
      <canvas
        ref={canvasRef}
        className="process-webgl-canvas"
        aria-label="Interactive process image preview. Drag to tilt the image."
        onPointerDown={handleDragStart}
        onPointerMove={handleDrag}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragEnd}
      />
      <span aria-hidden="true" className="process-canvas-axis process-canvas-axis--horizontal" />
      <span aria-hidden="true" className="process-canvas-axis process-canvas-axis--vertical" />
      <span aria-hidden="true" className="process-canvas-mark">+</span>
      <span className="process-canvas-drag">DRAG TO ROTATE</span>
    </div>
  );
}

export function ManufacturingProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const railViewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const headingWordsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const borderLinesRef = useRef<Array<SVGLineElement | null>>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState('01');
  const [scrambledNumbers, setScrambledNumbers] = useState<Record<string, string>>({});
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorExpanded, setCursorExpanded] = useState(false);
  const [isDesktopCarousel, setIsDesktopCarousel] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const [isRailFocused, setIsRailFocused] = useState(false);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const carouselEnabled = isDesktopCarousel && !prefersReducedMotion;

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1200px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreferences = () => {
      setIsDesktopCarousel(desktopQuery.matches);
      setPrefersReducedMotion(reducedMotionQuery.matches);
    };

    updateMotionPreferences();
    desktopQuery.addEventListener('change', updateMotionPreferences);
    reducedMotionQuery.addEventListener('change', updateMotionPreferences);
    return () => {
      desktopQuery.removeEventListener('change', updateMotionPreferences);
      reducedMotionQuery.removeEventListener('change', updateMotionPreferences);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!carouselEnabled || !isSectionInView || isRailFocused || autoplayPaused) return;

    const timer = window.setInterval(() => {
      setActiveStep((current) => {
        const currentIndex = PRODUCTION_STAGES.findIndex((stage) => stage.number === current);
        return PRODUCTION_STAGES[(currentIndex + 1) % PRODUCTION_STAGES.length].number;
      });
    }, STAGE_DURATION);

    return () => window.clearInterval(timer);
  }, [autoplayPaused, carouselEnabled, isRailFocused, isSectionInView]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const borderLines = borderLinesRef.current.filter((line): line is SVGLineElement => Boolean(line));

    if (reducedMotion) {
      borderLines.forEach((line) => line.style.setProperty('stroke-dashoffset', '0'));
      return;
    }

    const context = gsap.context(() => {
      const headingWords = headingWordsRef.current.filter(Boolean);
      if (headingWords.length) {
        gsap.fromTo(
          headingWords,
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.82,
            stagger: 0.075,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              once: true,
            },
          }
        );
      }

      if (borderLines.length) {
        gsap.to(borderLines, {
          strokeDashoffset: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true,
          },
        });
      }
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || !carouselEnabled) return;

    const activeIndex = PRODUCTION_STAGES.findIndex((stage) => stage.number === activeStep);
    gsap.to(track, {
      xPercent: activeIndex * -25,
      duration: 1.05,
      ease: 'power3.inOut',
      overwrite: 'auto',
    });

    return () => gsap.killTweensOf(track);
  }, [activeStep, carouselEnabled]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) return;

    const timers = new Set<number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          const number = element.dataset.scramble;
          if (!number) return;

          observer.unobserve(element);
          setScrambledNumbers((current) => ({ ...current, [number]: '00' }));
          let ticks = 0;
          const timer = window.setInterval(() => {
            ticks += 1;
            if (ticks >= 18) {
              window.clearInterval(timer);
              timers.delete(timer);
              setScrambledNumbers((current) => ({ ...current, [number]: number }));
              return;
            }

            const randomDigits = Math.floor(Math.random() * 100).toString().padStart(2, '0');
            setScrambledNumbers((current) => ({ ...current, [number]: randomDigits }));
          }, 38);
          timers.add(timer);
        });
      },
      { threshold: 0.55 }
    );

    section.querySelectorAll<HTMLElement>('[data-scramble]').forEach((number) => observer.observe(number));

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearInterval(timer));
      timers.clear();
    };
  }, []);

  const handleSectionPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || !cursorRef.current) return;
    cursorRef.current.style.left = `${event.clientX}px`;
    cursorRef.current.style.top = `${event.clientY}px`;
  };

  const handleSectionPointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') setCursorVisible(true);
  };

  const handleMediaPointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setCursorExpanded(true);
  };

  const handleMediaPointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    resetPointerTilt(event);
    setCursorExpanded(false);
  };

  const heading = ['From', 'Buyer', 'Brief', 'to', 'Finished', 'Order'];

  return (
    <section
      id="manufacturing"
      ref={sectionRef}
      className="process-story grain relative isolate border-b border-white/10 bg-[#121110] text-off-white"
      onPointerEnter={handleSectionPointerEnter}
      onPointerMove={handleSectionPointerMove}
      onPointerLeave={() => {
        setCursorVisible(false);
        setCursorExpanded(false);
      }}
    >
      <div className="process-stage-area">
        <div className="process-layout">
          <div className="process-intro">
            <p className="process-eyebrow">
              <span aria-hidden="true" className="process-eyebrow-line" />
              A buyer-led production route
            </p>

            <h2 className="process-heading">
              {heading.map((word, index) => (
                <span
                  key={word}
                  className="process-heading-word-clip"
                >
                  <span
                    ref={(element) => {
                      headingWordsRef.current[index] = element;
                    }}
                    className={`process-heading-word ${index > 2 ? 'process-heading-word--muted' : ''}`}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            <p className="process-intro-copy">
              Fashion Knits works with buyers to define product requirements, coordinate materials and production, review quality against approved specifications, and prepare finished orders for dispatch.
            </p>

            <div
              className="process-carousel-controls"
              hidden={!carouselEnabled}
              onFocusCapture={() => setIsRailFocused(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsRailFocused(false);
              }}
            >
              <div className="process-carousel-step-buttons" role="group" aria-label="Choose a manufacturing stage">
                {PRODUCTION_STAGES.map((stage) => {
                  const isActive = activeStep === stage.number;
                  return (
                    <button
                      key={stage.number}
                      type="button"
                      className={`process-carousel-step-button${isActive ? ' is-active' : ''}`}
                      aria-label={`Show step ${stage.number}: ${stage.name}`}
                      aria-pressed={isActive}
                      onClick={() => {
                        setActiveStep(stage.number);
                        setAutoplayPaused(true);
                      }}
                    >
                      <span className="process-carousel-indicator" aria-hidden="true">
                        {isActive && (
                          <span
                            key={`${activeStep}-${autoplayPaused}-${isRailFocused}-${isSectionInView}`}
                            className="process-carousel-progress"
                            style={{ animationPlayState: isSectionInView && !autoplayPaused && !isRailFocused && !prefersReducedMotion ? 'running' : 'paused' }}
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                className="process-carousel-toggle"
                aria-label={autoplayPaused ? 'Play process animation' : 'Pause process animation'}
                aria-pressed={autoplayPaused}
                onClick={() => setAutoplayPaused((paused) => !paused)}
              >
                {autoplayPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
                <span>{autoplayPaused ? 'Play' : 'Pause'}</span>
              </button>
            </div>

            <Link href="/manufacturing" className="process-capabilities-link">
              Explore Our Manufacturing Capabilities
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div
            ref={railViewportRef}
            className="process-rail-window"
            onFocusCapture={() => setIsRailFocused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsRailFocused(false);
            }}
          >
            <ol ref={trackRef} aria-label="Manufacturing journey" className="process-track">
              {PRODUCTION_STAGES.map((stage, index) => {
                const isActive = activeStep === stage.number;
                const isInactiveCarouselSlide = carouselEnabled && !isActive;

                return (
                  <li
                    key={stage.number}
                    className={`process-step ${isActive ? 'is-active' : ''}`}
                    aria-hidden={isInactiveCarouselSlide}
                    inert={isInactiveCarouselSlide}
                    onPointerEnter={(event) => {
                      if (event.pointerType === 'mouse' && !carouselEnabled) setActiveStep(stage.number);
                    }}
                  >
                    <svg className="process-step-border" viewBox="0 0 100 1" preserveAspectRatio="none" aria-hidden="true">
                      <line
                        ref={(element) => {
                          borderLinesRef.current[index] = element;
                        }}
                        x1="0"
                        y1="0.5"
                        x2="100"
                        y2="0.5"
                        pathLength="1"
                        strokeDasharray="1"
                        strokeDashoffset="1"
                      />
                    </svg>

                    <div className="process-step-header">
                      <span className="process-step-number" data-scramble={stage.number} aria-hidden="true">
                        {scrambledNumbers[stage.number] ?? stage.number}
                      </span>
                      <span className="sr-only">Step {stage.number}</span>
                      <span aria-hidden="true" className="process-step-rule" />
                    </div>

                    <div
                      className="process-step-content"
                      onPointerEnter={handleMediaPointerEnter}
                      onPointerMove={updatePointerTilt}
                      onPointerLeave={handleMediaPointerLeave}
                    >
                      {stage.number === '03' ? (
                        <InteractiveImagePreview
                          image={stage.image ?? '/assets/images/process-garment-finishing.webp'}
                          imageAlt={stage.imageAlt ?? 'Garment finishing work in a production setting'}
                        />
                      ) : stage.image ? (
                        <div className="process-media pointer-tilt">
                          <Image src={stage.image} alt={stage.imageAlt || ''} fill sizes="(max-width: 1199px) 70vw, 38vw" className="object-cover" />
                        </div>
                      ) : (
                        <div
                          className="process-media process-media--blank pointer-tilt"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <h3 className="process-step-title">
                      <button
                        type="button"
                        aria-expanded={isActive}
                        aria-controls={`process-step-description-${stage.number}`}
                        onFocus={() => setActiveStep(stage.number)}
                        onClick={() => {
                          setActiveStep(stage.number);
                          setAutoplayPaused(true);
                        }}
                      >
                        {stage.name}
                      </button>
                    </h3>
                    <p id={`process-step-description-${stage.number}`} className="process-step-description">
                      {stage.description}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      <div
        ref={cursorRef}
        className={`process-cursor ${cursorVisible ? 'is-visible' : ''} ${cursorExpanded ? 'is-expanded' : ''}`}
        aria-hidden="true"
      >
        <span>View</span>
      </div>
    </section>
  );
}
