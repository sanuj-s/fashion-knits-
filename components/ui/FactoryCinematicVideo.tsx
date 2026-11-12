'use client';

import { Play, Video } from 'lucide-react';

interface FactoryCinematicVideoProps {
  label?: string;
  className?: string;
  videoSrc?: string;
  overlayText?: string;
  showHud?: boolean;
}

export function FactoryCinematicVideo({
  label = 'Production preview',
  className = '',
  videoSrc,
  overlayText,
  showHud = true,
}: FactoryCinematicVideoProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#1b1a18] ${className}`}>
      {videoSrc ? (
        <video src={videoSrc} autoPlay loop muted playsInline className="h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(ellipse_at_50%_25%,rgba(201,169,110,.18),transparent_55%),linear-gradient(135deg,#24221e,#151413)]">
          <div aria-hidden="true" className="absolute inset-6 border border-dashed border-white/15 sm:inset-10" />
          <div className="relative flex flex-col items-center gap-3 text-center">
            <Video aria-hidden="true" className="h-8 w-8 text-[#d1b373]" strokeWidth={1.2} />
            <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/55">Production footage</span>
          </div>
        </div>
      )}
      {overlayText && <div className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center"><h2 className="max-w-4xl text-4xl font-semibold uppercase tracking-tight text-white drop-shadow-2xl sm:text-5xl md:text-7xl">{overlayText}</h2></div>}
      {showHud && <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 sm:inset-x-6 sm:bottom-6"><span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-white/75 backdrop-blur-sm"><Play aria-hidden="true" className="h-3.5 w-3.5 text-[#d1b373]" />{label}</span><span className="rounded-full border border-white/15 bg-black/55 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-white/55 backdrop-blur-sm">{videoSrc ? 'Video' : 'Media area'}</span></div>}
    </div>
  );
}
