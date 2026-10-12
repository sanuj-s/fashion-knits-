'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Video, ShieldCheck, Factory } from 'lucide-react';

export function FactoryVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // In production, when the client uploads their official factory video:
  // Place it in /public/assets/videos/factory-cinematic.mp4
  const videoSource = ''; // Currently empty until authentic video is supplied

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full bg-charcoal text-off-white py-28 md:py-36 px-6 md:px-16 lg:px-24 border-y border-white/10 overflow-hidden">
      {/* Background Subtle Weave Texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-accent mb-3">
              <Factory className="w-3.5 h-3.5 text-accent" />
              <span>Avinashi Facility // Production Scope</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-off-white">
              WHERE MANUFACTURING<br />
              <span className="text-accent">MEETS PRECISION.</span>
            </h2>
          </div>

          <div className="text-right sm:text-right">
            <span className="text-xs font-mono text-muted-gray uppercase tracking-widest block">
              FACILITY LOCATION
            </span>
            <span className="text-sm font-mono text-off-white font-medium">
              Tirupur, Tamil Nadu, India
            </span>
          </div>
        </div>

        {/* Video Player or Editorial Facility Showcase Frame */}
        <div className="relative aspect-[16/9] w-full bg-[#141312] border border-white/15 overflow-hidden flex flex-col items-center justify-center p-8 text-center group">
          {videoSource ? (
            <>
              <video
                ref={videoRef}
                src={videoSource}
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Media Controls Bar */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-3 bg-charcoal/90 backdrop-blur-md border border-white/10">
                <button
                  onClick={togglePlay}
                  className="p-2 text-off-white hover:text-accent transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 text-off-white hover:text-accent transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </>
          ) : (
            /* Clean Authentic Showcase Frame */
            <div className="relative z-10 max-w-xl flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-accent mb-6">
                <Video className="w-7 h-7" strokeWidth={1.5} />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-off-white mb-2">
                Factory Tour &amp; Manufacturing Reel
              </h3>

              <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed max-w-md mb-6">
                Direct visual access to our circular knitting machinery, soft-flow dyeing vessels, automated cutting rooms, and lean assembly lines in Avinashi, Tirupur.
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal border border-accent/40 text-[11px] font-mono uppercase tracking-widest text-accent">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Video Asset Upload Ready // Contact Export Desk for Live Factory Tour</span>
              </div>
            </div>
          )}

          {/* Corner Framing Marks */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-accent/50 pointer-events-none" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-accent/50 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-accent/50 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-accent/50 pointer-events-none" />
        </div>

        {/* Technical Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10 text-xs font-mono">
          <div>
            <span className="text-muted-gray block uppercase text-[10px]">Knitting Array:</span>
            <span className="text-off-white font-medium">Circular High-Gauge Single &amp; Double Jersey</span>
          </div>
          <div>
            <span className="text-muted-gray block uppercase text-[10px]">Dyeing Vessels:</span>
            <span className="text-off-white font-medium">Soft-Flow Low Liquor Eco Vessels</span>
          </div>
          <div>
            <span className="text-muted-gray block uppercase text-[10px]">Cutting System:</span>
            <span className="text-off-white font-medium">CAD Multi-Ply Vacuum Clamped Tables</span>
          </div>
          <div>
            <span className="text-muted-gray block uppercase text-[10px]">Safety Scan:</span>
            <span className="text-accent font-medium">100% Calibrated 9-Point Metal Detection</span>
          </div>
        </div>
      </div>
    </section>
  );
}
