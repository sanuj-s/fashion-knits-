'use client';

import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

export type BrandLogo = {
  name: string;
  src: string;
  lightBacking?: boolean;
};

const LOGOS_PER_SLIDE = 6;

function chunkLogos(brands: BrandLogo[]) {
  return Array.from({ length: Math.ceil(brands.length / LOGOS_PER_SLIDE) }, (_, index) =>
    brands.slice(index * LOGOS_PER_SLIDE, (index + 1) * LOGOS_PER_SLIDE),
  );
}

export function BrandLogoCarousel({ brands }: { brands: BrandLogo[] }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = chunkLogos(brands);
  const slideCount = slides.length;
  const start = activeSlide * LOGOS_PER_SLIDE + 1;
  const end = Math.min(start + LOGOS_PER_SLIDE - 1, brands.length);

  const showPrevious = () => setActiveSlide((slide) => Math.max(0, slide - 1));
  const showNext = () => setActiveSlide((slide) => Math.min(slideCount - 1, slide + 1));

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevious();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    }
  };

  return (
    <div
      role="region"
      aria-label="Brand logos"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="outline-none focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfad70]"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 sm:mb-6">
        <p aria-live="polite" aria-atomic="true" className="text-xs font-medium tracking-[0.04em] text-white/65 sm:text-sm">
          <span className="font-semibold text-[#d1b373]">{start}–{end}</span> of {brands.length} brands
        </p>

        <div className="flex items-center gap-2" role="group" aria-label="Carousel controls">
          <button
            type="button"
            onClick={showPrevious}
            disabled={activeSlide === 0}
            aria-label="Show previous brands"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#cfad70] hover:text-[#e1c58e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#cfad70] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:text-white"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={showNext}
            disabled={activeSlide >= slideCount - 1}
            aria-label="Show next brands"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#cfad70] hover:text-[#e1c58e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#cfad70] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:text-white"
          >
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{
            width: `${slideCount * 100}%`,
            transform: `translateX(-${slideCount ? (activeSlide * 100) / slideCount : 0}%)`,
          }}
        >
          {slides.map((slide, slideIndex) => {
            const slideStart = slideIndex * LOGOS_PER_SLIDE + 1;
            const slideEnd = Math.min(slideStart + slide.length - 1, brands.length);

            return (
              <ul
                key={slideIndex}
                role="group"
                aria-roledescription="slide"
                aria-label={`Brands ${slideStart}–${slideEnd} of ${brands.length}`}
                aria-hidden={slideIndex !== activeSlide}
                className="grid flex-none grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-8 sm:gap-y-7 md:grid-cols-3 md:gap-x-10"
                style={{ width: `${100 / slideCount}%` }}
              >
                {slide.map((brand) => (
                  <li key={brand.name} className="flex min-h-[6.25rem] flex-col items-center justify-center gap-2.5 px-1 py-2 sm:min-h-[7.25rem] sm:gap-3">
                    <span
                      className={`inline-flex w-fit max-w-full items-center justify-center ${
                        brand.lightBacking ? 'bg-[#f1eee8] px-2 py-1' : ''
                      }`}
                      style={{ maxWidth: 'min(11rem, 100%)' }}
                    >
                      <Image
                        src={brand.src}
                        alt=""
                        aria-hidden="true"
                        width={240}
                        height={80}
                        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 24vw, 16vw"
                        className="h-8 w-auto object-contain sm:h-9"
                        style={{ maxWidth: '100%' }}
                      />
                    </span>
                    <span className="max-w-full text-center text-[8px] font-semibold uppercase leading-tight tracking-[0.14em] text-white/55 sm:text-[9px]">
                      {brand.name}
                    </span>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-1.5 sm:mt-6" role="group" aria-label="Choose a brand slide">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveSlide(index)}
            aria-label={`Show brand slide ${index + 1}`}
            aria-current={index === activeSlide ? 'page' : undefined}
            className="group inline-flex h-9 w-9 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#cfad70]"
          >
            <span
              aria-hidden="true"
              className={`h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                index === activeSlide ? 'w-6 bg-[#d1b373]' : 'w-1.5 bg-white/30 group-hover:bg-white/60'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
