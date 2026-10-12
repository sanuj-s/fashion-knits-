'use client';

import React from 'react';
import { Play } from 'lucide-react';

interface VideoPlaceholderProps {
  label: string;
  aspectRatio?: string;
  className?: string;
  overlay?: boolean;
  overlayText?: string;
}

export function VideoPlaceholder({
  label,
  aspectRatio = '16/9',
  className = '',
  overlay = false,
  overlayText = '',
}: VideoPlaceholderProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-charcoal border border-white/10 overflow-hidden placeholder-pattern group ${className}`}
      style={{ aspectRatio }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 transition-opacity duration-300">
        <Play 
          className="w-10 h-10 text-muted-gray/60 mb-3 group-hover:text-muted-gray transition-colors motion-safe:animate-pulse" 
          strokeWidth={1.5} 
        />
        <span className="text-muted-gray uppercase tracking-widest text-xs font-medium">
          [ {label} ]
        </span>
      </div>
      
      {overlay && overlayText && (
        <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center z-20">
          <h3 className="text-off-white text-3xl md:text-5xl font-bold tracking-tight px-6 text-center">
            {overlayText}
          </h3>
        </div>
      )}
    </div>
  );
}
