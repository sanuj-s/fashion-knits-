'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Video, Eye, Activity } from 'lucide-react';

interface FactoryCinematicVideoProps {
  label?: string;
  className?: string;
  videoSrc?: string;
  overlayText?: string;
  showHud?: boolean;
}

const FACTORY_FEEDS = [
  {
    id: 'CAM 01',
    name: 'CIRCULAR KNITTING DEPT',
    src: '/assets/images/knitting_process.jpg',
    specs: 'Gauge: 28GG | Speed: 32 RPM | Tension: Auto-Calibrated',
  },
  {
    id: 'CAM 02',
    name: 'SOFT-FLOW JET DYEING',
    src: '/assets/images/dyeing_process.jpg',
    specs: 'Temp: 130°C | Dispense: Automated | Liquor Ratio: 1:4',
  },
  {
    id: 'CAM 03',
    name: 'CNC LASER MULTI-PLY CUTTING',
    src: '/assets/images/cutting_process.jpg',
    specs: 'Precision: ±0.2mm | Ply: 48 layers | CAD Synchronized',
  },
  {
    id: 'CAM 04',
    name: 'YARN SPINNING & CONING',
    src: '/assets/images/yarn_process.jpg',
    specs: 'Count: 30s/1 Combed | Twist: 820 TPM | Zero Slub',
  },
  {
    id: 'CAM 05',
    name: 'INNOVATION & QA LAB',
    src: '/assets/images/team_about.jpg',
    specs: 'AQL 2.5/4.0 | Color Delta E < 0.5 | Tensile Verified',
  },
];

export function FactoryCinematicVideo({
  label = 'FASHION KNITS LIVE FACTORY FEED',
  className = '',
  videoSrc,
  overlayText,
  showHud = true,
}: FactoryCinematicVideoProps) {
  const [currentFeedIndex, setCurrentFeedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timecode, setTimecode] = useState('00:04:12:08');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-switch camera feeds every 5.5 seconds to simulate a live factory multi-cam surveillance / broadcast reel
  useEffect(() => {
    if (!isPlaying || videoSrc) return;

    timerRef.current = setInterval(() => {
      setCurrentFeedIndex((prev) => (prev + 1) % FACTORY_FEEDS.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, videoSrc]);

  // Live running timecode counter
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 40);
      const frames = (elapsed % 25).toString().padStart(2, '0');
      const seconds = (Math.floor(elapsed / 25) % 60).toString().padStart(2, '0');
      const minutes = (Math.floor(elapsed / 1500) % 60).toString().padStart(2, '0');
      setTimecode(`00:${minutes}:${seconds}:${frames}`);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const activeFeed = FACTORY_FEEDS[currentFeedIndex];

  return (
    <div className={`relative w-full h-full overflow-hidden bg-charcoal select-none group ${className}`}>
      {/* 1. Real MP4 Video if available */}
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        /* 2. Cinematic High-Speed Factory Feed Layer */
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {FACTORY_FEEDS.map((feed, idx) => {
            const isActive = idx === currentFeedIndex;
            return (
              <div
                key={feed.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={feed.src}
                  alt={feed.name}
                  className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                    isActive ? 'scale-110 translate-x-1 translate-y-1' : 'scale-100'
                  }`}
                />
              </div>
            );
          })}

          {/* Filmic scanlines & dark cinema vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/50 z-20 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-charcoal/30 to-charcoal/80 z-20 pointer-events-none" />
        </div>
      )}

      {/* Center Overlay Text (if provided) */}
      {overlayText && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none px-6 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-off-white uppercase max-w-4xl drop-shadow-2xl">
            {overlayText}
          </h2>
        </div>
      )}

      {/* 3. Professional Broadcast Factory HUD Overlay */}
      {showHud && (
        <div className="absolute inset-0 z-30 flex flex-col justify-between p-4 sm:p-6 pointer-events-none">
          {/* Top HUD: Status Bar */}
          <div className="flex items-center justify-between gap-3 text-[11px] font-mono tracking-widest text-off-white/80">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-off-white font-bold">REC</span>
              <span className="text-white/40">|</span>
              <span className="text-accent">{timecode}</span>
              <span className="hidden sm:inline text-white/40">|</span>
              <span className="hidden sm:inline text-white/70">4K UHD 60FPS</span>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 text-off-white/70">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>{label}</span>
            </div>

            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 text-off-white/90">
              <Video className="w-3 h-3 text-accent" />
              <span>{activeFeed.id}</span>
            </div>
          </div>

          {/* Bottom HUD: Multi-Cam Selector & Feed Telemetry */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-4 pointer-events-auto">
            {/* Feed Name & Live Specs */}
            <div className="bg-black/75 backdrop-blur-md p-3 sm:p-4 border border-white/10 max-w-md">
              <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-widest font-bold">
                <Eye className="w-3.5 h-3.5" />
                <span>{activeFeed.name}</span>
              </div>
              <p className="text-[11px] font-mono text-off-white/70 mt-1">
                {activeFeed.specs}
              </p>
            </div>

            {/* Camera Switcher Buttons & Play/Pause */}
            <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1.5 border border-white/10">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 text-off-white hover:text-accent transition-colors"
                title={isPlaying ? 'Pause Feed' : 'Resume Feed'}
                aria-label={isPlaying ? 'Pause Feed' : 'Resume Feed'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <div className="h-4 w-px bg-white/20 mx-1" />

              {FACTORY_FEEDS.map((feed, idx) => (
                <button
                  key={feed.id}
                  onClick={() => {
                    setCurrentFeedIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`px-2.5 py-1 text-[10px] font-mono transition-all ${
                    idx === currentFeedIndex
                      ? 'bg-accent text-charcoal font-bold'
                      : 'text-off-white/60 hover:text-off-white hover:bg-white/10'
                  }`}
                  aria-label={`Switch to ${feed.id}`}
                >
                  {feed.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
