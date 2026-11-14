'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import styles from './BuyerProjectExperience.module.css';

interface BuyerChapter {
  number: string;
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
  caption: string;
}

const CHAPTERS: BuyerChapter[] = [
  {
    number: '01',
    title: 'The Brief',
    copy: 'A product starts with the buyer’s brief: silhouette, measurements, construction, quantity and the expectations that will guide each decision.',
    image: '/assets/images/buyer-project/brief-sketch.jpg',
    imageAlt: 'Technical garment pattern sketch and drafting tools on a work surface',
    caption: 'FORM / MEASURE / DETAIL',
  },
  {
    number: '02',
    title: 'Product Direction',
    copy: 'Fabric weight, surface, colour and trim give a design its character. Swatches make those choices tangible as a product direction takes shape.',
    image: '/assets/images/buyer-project/product-direction-swatches.jpg',
    imageAlt: 'Hands reviewing woven fabric samples in muted colours',
    caption: 'MATERIAL / COLOUR / HAND-FEEL',
  },
  {
    number: '03',
    title: 'Sample Development',
    copy: 'The agreed direction moves into a garment sample: a physical reference for proportion, construction and finish, ready for review against the brief.',
    image: '/assets/images/buyer-project/sample-development.jpg',
    imageAlt: 'A garment prototype being measured on a dress form in a design studio',
    caption: 'PROTOTYPE / FIT / FINISH',
  },
  {
    number: '04',
    title: 'Quality Review',
    copy: 'Finished garments are checked against the approved specifications, with measurements, workmanship and presentation considered within the agreed criteria.',
    image: '/assets/images/buyer-project/quality-review.jpg',
    imageAlt: 'A textile worker checking layered fabric during a quality review',
    caption: 'MEASURE / WORKMANSHIP / PRESENTATION',
  },
  {
    number: '05',
    title: 'Order Dispatch',
    copy: 'With the order complete, folded garments are prepared for packing and dispatch according to the shipment plan agreed with the buyer.',
    image: '/assets/images/buyer-project/order-dispatch.jpg',
    imageAlt: 'Folded knitwear arranged inside a protective carton',
    caption: 'FOLDED KNITWEAR / PACKING REFERENCE',
  },
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function BuyerProjectExperience() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const articleRefs = useRef<Array<HTMLElement | null>>([]);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const railRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndexRef = useRef(0);
  const preloadIndexRef = useRef(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [preloadIndex, setPreloadIndex] = useState(1);

  useEffect(() => {
    const runway = runwayRef.current;
    const stage = stageRef.current;
    if (!runway || !stage) return;
    const stitchSeam = stage.querySelector<HTMLElement>('[data-stitch]');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileViewport = window.matchMedia('(max-width: 767px)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let scrollFrame = 0;
    let parallaxFrame = 0;
    let observer: IntersectionObserver | null = null;
    let currentParallaxX = 0;
    let currentParallaxY = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;

    const updateChapterState = (current: number, nextToLoad: number) => {
      if (activeIndexRef.current !== current) {
        activeIndexRef.current = current;
        setActiveIndex(current);
      }
      if (preloadIndexRef.current !== nextToLoad) {
        preloadIndexRef.current = nextToLoad;
        setPreloadIndex(nextToLoad);
      }
    };

    const resetEnhancement = () => {
      runway.classList.remove(styles.desktopEnhanced, styles.mobileEnhanced);
      articleRefs.current.forEach((article) => {
        article?.removeAttribute('aria-hidden');
        if (article) {
          delete article.dataset.motionPhase;
          delete article.dataset.captionVisible;
          delete article.dataset.revealed;
        }
      });
      imageRefs.current.forEach((image) => {
        if (!image) return;
        delete image.dataset.layer;
        image.style.clipPath = '';
        image.style.zIndex = '';
        image.style.transform = '';
      });
      copyRefs.current.forEach((copy) => {
        if (!copy) return;
        copy.style.opacity = '';
        copy.style.transform = '';
        copy.querySelectorAll<HTMLElement>('[data-scroll-piece]').forEach((piece) => {
          piece.style.opacity = '';
          piece.style.transform = '';
        });
        copy.querySelectorAll<HTMLElement>('[data-title-line] > span').forEach((line) => {
          line.style.clipPath = '';
          line.style.transform = '';
        });
      });
      railRefs.current.forEach((button) => {
        if (!button) return;
        delete button.dataset.active;
        delete button.dataset.complete;
        const fill = button.querySelector<HTMLElement>('[data-rail-fill]');
        if (fill) fill.style.transform = 'scaleX(0)';
        button.removeAttribute('aria-current');
      });
      stage.removeAttribute('data-active-index');
      stage.removeAttribute('data-transitioning');
      if (stitchSeam) {
        delete stitchSeam.dataset.visible;
        stitchSeam.style.transform = '';
      }
    };

    const setImageLayer = (index: number, layer: 'current' | 'next' | 'off', reveal = 0) => {
      const image = imageRefs.current[index];
      if (!image) return;
      image.dataset.layer = layer;
      image.style.zIndex = layer === 'next' ? '1' : layer === 'current' ? '0' : '-1';
      image.style.clipPath = layer === 'next'
        ? `inset(0 ${100 - reveal * 100}% 0 0)`
        : layer === 'off'
          ? 'inset(0 100% 0 0)'
          : 'inset(0)';
      image.style.transform = `translate3d(${currentParallaxX}px, ${currentParallaxY}px, 0) scale(1.06)`;
    };

    const setCopyState = (
      index: number,
      phase: 'active' | 'outgoing' | 'incoming' | 'off',
      opacity: number,
      offset: number,
      revealProgress = 1,
    ) => {
      const article = articleRefs.current[index];
      const copy = copyRefs.current[index];
      if (!article || !copy) return;
      article.dataset.motionPhase = phase;
      copy.style.opacity = String(opacity);
      copy.style.transform = `translate3d(0, ${offset}px, 0)`;

      const pieces = Array.from(copy.querySelectorAll<HTMLElement>('[data-scroll-piece]'));
      pieces.forEach((piece, pieceIndex) => {
        if (phase === 'active' || phase === 'outgoing') {
          piece.style.opacity = '1';
          piece.style.transform = 'translate3d(0, 0, 0)';
          piece.querySelectorAll<HTMLElement>('[data-title-line] > span').forEach((line) => {
            line.style.clipPath = 'inset(0 0 0 0)';
            line.style.transform = 'translate3d(0, 0, 0)';
          });
          return;
        }

        const delay = pieceIndex * 0.12;
        const pieceProgress = phase === 'incoming'
          ? clamp((revealProgress - delay) / Math.max(1 - delay, 0.01))
          : 0;
        piece.style.opacity = String(pieceProgress);
        piece.style.transform = `translate3d(0, ${(1 - pieceProgress) * 24}px, 0)`;

        if (piece.dataset.scrollPiece === 'title') {
          const lines = piece.querySelectorAll<HTMLElement>('[data-title-line] > span');
          lines.forEach((line, lineIndex) => {
            const lineDelay = delay + lineIndex * 0.12;
            const lineProgress = phase === 'incoming'
              ? clamp((revealProgress - lineDelay) / Math.max(1 - lineDelay, 0.01))
              : 0;
            line.style.clipPath = `inset(0 0 ${(1 - lineProgress) * 100}% 0)`;
            line.style.transform = `translate3d(0, ${(1 - lineProgress) * 100}%, 0)`;
          });
        }
      });
    };

    const updateDesktopProgress = () => {
      const viewportHeight = window.innerHeight;
      const runwayBounds = runway.getBoundingClientRect();
      const scrollDistance = Math.max(1, runwayBounds.height - viewportHeight);
      const progress = clamp(-runwayBounds.top / scrollDistance);
      const scaledProgress = progress * CHAPTERS.length;
      const chapterIndex = Math.min(CHAPTERS.length - 1, Math.floor(scaledProgress));
      const chapterProgress = chapterIndex === CHAPTERS.length - 1
        ? 0
        : scaledProgress - chapterIndex;
      const transitioning = chapterIndex < CHAPTERS.length - 1 && chapterProgress >= 0.7;
      const transitionProgress = transitioning ? clamp((chapterProgress - 0.7) / 0.3) : 0;
      const nextIndex = Math.min(CHAPTERS.length - 1, chapterIndex + 1);
      const displayedIndex = transitioning && transitionProgress >= 0.5 ? nextIndex : chapterIndex;

      stage.dataset.activeIndex = String(displayedIndex);
      if (transitioning) stage.dataset.transitioning = 'true';
      else stage.removeAttribute('data-transitioning');
      if (stitchSeam) {
        const seamVisible = transitioning && transitionProgress > 0 && transitionProgress < 1;
        if (seamVisible) {
          stitchSeam.dataset.visible = 'true';
          stitchSeam.style.transform = `translate3d(${transitionProgress * 100}vw, 0, 0)`;
        } else {
          delete stitchSeam.dataset.visible;
          stitchSeam.style.transform = '';
        }
      }
      updateChapterState(displayedIndex, nextIndex);

      for (let index = 0; index < CHAPTERS.length; index += 1) {
        if (!transitioning) {
          setImageLayer(index, index === chapterIndex ? 'current' : 'off');
          setCopyState(index, index === chapterIndex ? 'active' : 'off', index === chapterIndex ? 1 : 0, 0);
          articleRefs.current[index]?.setAttribute('aria-hidden', index === chapterIndex ? 'false' : 'true');
          continue;
        }

        if (index === chapterIndex) {
          setImageLayer(index, 'current');
          const outgoingProgress = clamp(transitionProgress / 0.5);
          setCopyState(index, 'outgoing', 1 - outgoingProgress, -24 * outgoingProgress);
          articleRefs.current[index]?.setAttribute('aria-hidden', transitionProgress < 0.5 ? 'false' : 'true');
        } else if (index === nextIndex) {
          setImageLayer(index, 'next', transitionProgress);
          const incomingProgress = clamp((transitionProgress - 0.5) / 0.5);
          setCopyState(index, 'incoming', 1, 24 * (1 - incomingProgress), incomingProgress);
          articleRefs.current[index]?.setAttribute('aria-hidden', transitionProgress >= 0.5 ? 'false' : 'true');
        } else {
          setImageLayer(index, 'off');
          setCopyState(index, 'off', 0, 24);
          articleRefs.current[index]?.setAttribute('aria-hidden', 'true');
        }
      }

      articleRefs.current.forEach((article, index) => {
        if (!article) return;
        if (index === displayedIndex) article.dataset.captionVisible = 'true';
        else delete article.dataset.captionVisible;
      });

      railRefs.current.forEach((button, index) => {
        if (!button) return;
        button.dataset.active = String(index === displayedIndex);
        button.dataset.complete = String(index < chapterIndex || (index === chapterIndex && chapterProgress >= 1));
        if (index === displayedIndex) button.setAttribute('aria-current', 'step');
        else button.removeAttribute('aria-current');
        const fill = button.querySelector<HTMLElement>('[data-rail-fill]');
        const fillProgress = index < chapterIndex ? 1 : index === chapterIndex ? chapterProgress : 0;
        if (fill) fill.style.transform = `scaleX(${clamp(fillProgress)})`;
      });
    };

    const scheduleDesktopProgress = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        updateDesktopProgress();
      });
    };

    const animateParallax = () => {
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.12;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.12;
      imageRefs.current.forEach((image) => {
        if (image?.dataset.layer === 'current' || image?.dataset.layer === 'next') {
          image.style.transform = `translate3d(${currentParallaxX}px, ${currentParallaxY}px, 0) scale(1.06)`;
        }
      });
      if (Math.abs(targetParallaxX - currentParallaxX) > 0.08 || Math.abs(targetParallaxY - currentParallaxY) > 0.08) {
        parallaxFrame = window.requestAnimationFrame(animateParallax);
      } else {
        parallaxFrame = 0;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches) return;
      const bounds = stage.getBoundingClientRect();
      const horizontal = (event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2);
      const vertical = (event.clientY - (bounds.top + bounds.height / 2)) / (bounds.height / 2);
      targetParallaxX = clamp(horizontal, -1, 1) * -10;
      targetParallaxY = clamp(vertical, -1, 1) * -10;
      if (!parallaxFrame) parallaxFrame = window.requestAnimationFrame(animateParallax);
    };

    const resetPointer = () => {
      targetParallaxX = 0;
      targetParallaxY = 0;
      if (!parallaxFrame) parallaxFrame = window.requestAnimationFrame(animateParallax);
    };

    const setupMode = () => {
      observer?.disconnect();
      observer = null;
      window.removeEventListener('scroll', scheduleDesktopProgress);
      window.removeEventListener('resize', scheduleDesktopProgress);
      stage.removeEventListener('pointermove', handlePointerMove);
      stage.removeEventListener('pointerleave', resetPointer);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (parallaxFrame) window.cancelAnimationFrame(parallaxFrame);
      scrollFrame = 0;
      parallaxFrame = 0;
      currentParallaxX = 0;
      currentParallaxY = 0;
      targetParallaxX = 0;
      targetParallaxY = 0;
      resetEnhancement();

      if (reducedMotion.matches) return;

      if (mobileViewport.matches) {
        if (!('IntersectionObserver' in window)) return;
        const articles = articleRefs.current.filter((article): article is HTMLElement => article !== null);
        const initialArticle = articles.find((article) => {
          const bounds = article.getBoundingClientRect();
          return bounds.top < window.innerHeight * 0.82 && bounds.bottom > window.innerHeight * 0.18;
        });
        if (initialArticle) {
          initialArticle.dataset.revealed = 'true';
          const initialIndex = Number(initialArticle.dataset.chapterIndex);
          if (Number.isInteger(initialIndex)) updateChapterState(initialIndex, Math.min(initialIndex + 1, CHAPTERS.length - 1));
        }
        runway.classList.add(styles.mobileEnhanced);
        observer = new IntersectionObserver((entries) => {
          let nearest: { index: number; distance: number } | null = null;
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const article = entry.target as HTMLElement;
            article.dataset.revealed = 'true';
            const index = Number(article.dataset.chapterIndex);
            const bounds = entry.boundingClientRect;
            const distance = Math.abs((bounds.top + bounds.bottom) / 2 - window.innerHeight / 2);
            if (Number.isInteger(index) && (!nearest || distance < nearest.distance)) nearest = { index, distance };
          }
          if (nearest) updateChapterState(nearest.index, Math.min(nearest.index + 1, CHAPTERS.length - 1));
        }, { rootMargin: '-15% 0px -15% 0px', threshold: 0.25 });
        articles.forEach((article) => observer?.observe(article));
        return;
      }

      runway.classList.add(styles.desktopEnhanced);
      updateDesktopProgress();
      window.addEventListener('scroll', scheduleDesktopProgress, { passive: true });
      window.addEventListener('resize', scheduleDesktopProgress, { passive: true });
      if (finePointer.matches) {
        stage.addEventListener('pointermove', handlePointerMove, { passive: true });
        stage.addEventListener('pointerleave', resetPointer, { passive: true });
      }
    };

    setupMode();
    reducedMotion.addEventListener('change', setupMode);
    mobileViewport.addEventListener('change', setupMode);
    finePointer.addEventListener('change', setupMode);

    return () => {
      reducedMotion.removeEventListener('change', setupMode);
      mobileViewport.removeEventListener('change', setupMode);
      finePointer.removeEventListener('change', setupMode);
      observer?.disconnect();
      window.removeEventListener('scroll', scheduleDesktopProgress);
      window.removeEventListener('resize', scheduleDesktopProgress);
      stage.removeEventListener('pointermove', handlePointerMove);
      stage.removeEventListener('pointerleave', resetPointer);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (parallaxFrame) window.cancelAnimationFrame(parallaxFrame);
    };
  }, []);

  const scrollToChapter = (index: number) => {
    const runway = runwayRef.current;
    if (!runway) return;
    const scrollDistance = Math.max(0, runway.offsetHeight - window.innerHeight);
    const runwayTop = window.scrollY + runway.getBoundingClientRect().top;
    const target = runwayTop + scrollDistance * (index / CHAPTERS.length);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: target, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const handleCtaPointerMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = clamp((event.clientX - (bounds.left + bounds.width / 2)) / bounds.width, -0.5, 0.5) * 16;
    const y = clamp((event.clientY - (bounds.top + bounds.height / 2)) / bounds.height, -0.5, 0.5) * 16;
    event.currentTarget.style.setProperty('--magnet-x', `${x}px`);
    event.currentTarget.style.setProperty('--magnet-y', `${y}px`);
  };

  const resetCtaPointer = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty('--magnet-x', '0px');
    event.currentTarget.style.setProperty('--magnet-y', '0px');
  };

  const activeChapter = CHAPTERS[activeIndex];

  return (
    <section id="manufacturing" className={styles.experience} aria-labelledby="buyer-experience-title">
      <div className={styles.intro}>
        <div className={styles.introMain}>
          <p className={styles.eyebrow}><span aria-hidden="true" />A buyer-led production route</p>
          <h2 id="buyer-experience-title">A project, shaped <em>together.</em></h2>
          <p className={styles.introCopy}>
            From the first product brief to a finished order prepared for dispatch, each project is shaped around its agreed specifications.
          </p>
        </div>
        <div className={styles.introAside}>
          <span className={styles.asideIndex}>A PROJECT STORY <i>—</i> TIRUPPUR, INDIA</span>
          <p>Product decisions, made visible at every stage.</p>
          <span className={styles.illustrativeNote}>Illustrative editorial imagery</span>
        </div>
      </div>

      <div ref={runwayRef} className={styles.runway}>
        <div ref={stageRef} className={styles.stage} data-active-index={activeIndex}>
          <div className={styles.rollingNumber} aria-hidden="true">
            <div className={styles.numberTrack} style={{ transform: `translateY(-${activeIndex * 20}%)` }}>
              {CHAPTERS.map((chapter) => <span className={styles.numberCell} key={chapter.number}>{chapter.number}</span>)}
            </div>
          </div>

          <div className={styles.mobileCounter} aria-live="polite" aria-atomic="true">
            <span>{activeChapter.number}</span><i>/</i>05
          </div>

          {CHAPTERS.map((chapter, index) => {
            const shouldPreload = index === 0 || index === preloadIndex;
            return (
              <article
                key={chapter.number}
                ref={(element) => { articleRefs.current[index] = element; }}
                className={styles.chapterArticle}
                data-chapter-index={index}
                aria-labelledby={`buyer-chapter-${chapter.number}`}
              >
                <div
                  ref={(element) => { imageRefs.current[index] = element; }}
                  className={styles.chapterImageLayer}
                  data-layer={index === 0 ? 'current' : 'off'}
                >
                  <Image
                    src={chapter.image}
                    alt={chapter.imageAlt}
                    fill
                    sizes="100vw"
                    quality={75}
                    className={styles.chapterImage}
                    {...(shouldPreload ? { preload: true } : { loading: 'lazy' as const })}
                  />
                  <span className={styles.mobileStitch} aria-hidden="true" />
                </div>

                <span className={styles.staticNumber} aria-hidden="true">{chapter.number}</span>

                <div
                  ref={(element) => { copyRefs.current[index] = element; }}
                  className={styles.chapterCopy}
                >
                  <div className={styles.chapterCopyMotion}>
                    <p className={styles.chapterEyebrow} data-scroll-piece="eyebrow">
                      <span>CHAPTER {chapter.number}</span><i>—</i><span>BUYER PROJECT</span>
                    </p>
                    <div className={styles.titlePiece} data-scroll-piece="title">
                      <h3 id={`buyer-chapter-${chapter.number}`} className={styles.chapterTitle}>
                        {chapter.title.split(' ').map((word) => (
                          <span className={styles.titleLine} data-title-line key={`${chapter.number}-${word}`}>
                            <span>{word}</span>
                          </span>
                        ))}
                      </h3>
                    </div>
                    <p className={styles.chapterDescription} data-scroll-piece="paragraph">{chapter.copy}</p>
                    <p className={styles.chapterFootnote} data-scroll-piece="tagline">
                      <span aria-hidden="true" />A considered conversation, from Tiruppur to delivery.
                    </p>
                    {index === CHAPTERS.length - 1 && (
                      <Link
                        href="/manufacturing"
                        className={styles.mobileFinalCta}
                        onPointerMove={handleCtaPointerMove}
                        onPointerLeave={resetCtaPointer}
                      >
                        Explore manufacturing capabilities <ArrowUpRight aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </div>

                <p className={styles.chapterCaption} aria-label={chapter.caption}>
                  {Array.from(chapter.caption).map((character, characterIndex) => (
                    <span
                      className={styles.captionCharacter}
                      style={{ transitionDelay: `${characterIndex * 60}ms` }}
                      aria-hidden="true"
                      key={`${chapter.number}-caption-${characterIndex}`}
                    >
                      {character === ' ' ? '\u00a0' : character}
                    </span>
                  ))}
                </p>

              </article>
            );
          })}

          <span className={styles.weaveTexture} aria-hidden="true" />
          <span className={styles.stitchSeam} data-stitch aria-hidden="true">
            <i />
          </span>

          <nav className={styles.progressRail} aria-label="Buyer project chapters">
            {CHAPTERS.map((chapter, index) => (
              <button
                ref={(element) => { railRefs.current[index] = element; }}
                type="button"
                className={styles.railButton}
                aria-label={`Go to chapter ${chapter.number}: ${chapter.title}`}
                aria-current={index === activeIndex ? 'step' : undefined}
                onClick={() => scrollToChapter(index)}
                key={chapter.number}
              >
                <span className={styles.railTrack} aria-hidden="true">
                  <span className={styles.railFill} data-rail-fill />
                </span>
                <span className={styles.railLabel} aria-hidden="true">{chapter.title}</span>
              </button>
            ))}
          </nav>

          <div className={styles.stageFooter}>
            <p className={styles.currentChapter} aria-live="polite" aria-atomic="true">
              <span className={styles.counterWindow} aria-hidden="true">
                <span className={styles.counterTrack} style={{ transform: `translateY(-${activeIndex * 20}%)` }}>
                  {CHAPTERS.map((chapter) => <span key={chapter.number}>{chapter.number}</span>)}
                </span>
              </span>
              <i>/</i>05 <b>{activeChapter.title}</b>
            </p>
            <Link
              href="/manufacturing"
              className={styles.capabilitiesLink}
              onPointerMove={handleCtaPointerMove}
              onPointerLeave={resetCtaPointer}
            >
              Explore manufacturing capabilities <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
