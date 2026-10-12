'use client';

import React from 'react';
import { Box } from 'lucide-react';

interface ModelPlaceholderProps {
  label: string;
  className?: string;
}

export function ModelPlaceholder({
  label,
  className = '',
}: ModelPlaceholderProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-charcoal border border-white/10 overflow-hidden w-full h-full min-h-[300px] placeholder-pattern ${className}`}
    >
      <Box 
        className="w-10 h-10 text-muted-gray/60 mb-4 motion-safe:animate-[spin_6s_linear_infinite]" 
        strokeWidth={1.5} 
      />
      <span className="text-muted-gray uppercase tracking-widest text-xs font-medium z-10">
        [ {label} ]
      </span>
    </div>
  );
}
