'use client';

/**
 * Minimal scroll-down indicator displayed at the bottom center of the hero.
 * Uses pure CSS animation for the bouncing dot — no GSAP needed.
 */
export function ScrollIndicator() {
  return (
    <div className="absolute bottom-[5.25rem] left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
      {/* Label */}
      <span className="select-none text-[10px] uppercase tracking-[0.24em] text-white/65">
        Scroll to explore
      </span>

      {/* Line + animated dot */}
      <div className="hero-scroll-line relative h-6 w-px bg-white/40">
        <span
          className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent animate-scroll-dot"
          aria-hidden="true"
        />
      </div>

      {/* Keyframe animation */}
      <style jsx>{`
        @keyframes scrollDot {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateX(-50%) translateY(16px);
            opacity: 0.3;
          }
        }

        .hero-scroll-line {
          animation: scrollLine 2.4s ease-in-out infinite;
          transform-origin: top;
        }

        .animate-scroll-dot {
          animation: scrollDot 2.4s ease-in-out infinite;
        }

        @keyframes scrollLine {
          0%, 100% { opacity: 0.45; transform: scaleY(0.65); }
          50% { opacity: 1; transform: scaleY(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-dot,
          .hero-scroll-line {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
