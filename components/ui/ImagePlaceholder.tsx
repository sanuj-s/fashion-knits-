'use client';

import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';

interface ImagePlaceholderProps {
  label: string;
  src?: string;
  alt?: string;
  aspectRatio?: string;
  className?: string;
  showBadge?: boolean;
}

export function ImagePlaceholder({
  label,
  src,
  alt,
  aspectRatio = '16/9',
  className = '',
  showBadge = true,
}: ImagePlaceholderProps) {
  const [hasError, setHasError] = useState(false);

  if (src && !hasError) {
    return (
      <div
        className={`relative overflow-hidden bg-charcoal border border-white/10 group ${className}`}
        style={{ aspectRatio }}
      >
        {/* Real Factory / Textile Image */}
        <img
          src={src}
          alt={alt || label}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Subtle Vignette Overlay for Editorial Feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-black/20 pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Technical Process Badge */}
        {showBadge && (
          <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
            <span className="px-2.5 py-1 bg-charcoal/80 backdrop-blur-md border border-white/15 text-[10px] uppercase font-mono tracking-widest text-off-white/90">
              {label}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Graceful fallback to wireframe placeholder
  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-charcoal border border-white/10 overflow-hidden placeholder-pattern group ${className}`}
      style={{ aspectRatio }}
    >
      <ImageIcon className="w-8 h-8 text-muted-gray/50 mb-3 group-hover:text-accent transition-colors" strokeWidth={1.5} />
      <span className="text-muted-gray uppercase tracking-widest text-xs font-medium z-10 px-4 text-center">
        [ {label} ]
      </span>
    </div>
  );
}
