'use client';

/**
 * Minimal scroll-down indicator displayed at the bottom center of the hero.
 * Uses pure CSS animation for the bouncing dot — no GSAP needed.
 */
export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
      {/* Label */}
      <span className="text-[10px] tracking-[0.3em] uppercase text-off-white/40 select-none">
        Scroll to explore
      </span>

      {/* Line + animated dot */}
      <div className="relative w-px h-12 bg-off-white/20">
        <span
          className="absolute left-1/2 -translate-x-1/2 top-0 w-1.5 h-1.5 rounded-full bg-accent animate-scroll-dot"
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
            transform: translateX(-50%) translateY(36px);
            opacity: 0.3;
          }
        }

        .animate-scroll-dot {
          animation: scrollDot 2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-dot {
            animation: none;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
