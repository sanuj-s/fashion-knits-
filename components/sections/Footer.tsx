'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="grain relative bg-[#121110] border-t border-white/10 text-off-white overflow-hidden">
      <div className="pt-24 pb-16 px-6 md:px-16 lg:px-24 max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Column 1: Company Profile (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 font-bold tracking-[0.25em] text-sm uppercase text-off-white mb-2">
              <span className="w-2 h-2 bg-accent rotate-45" />
              <span>FASHION KNITS</span>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-accent mt-1 font-semibold">
              Precision Knitwear &amp; Garment Manufacturing
            </p>
            <p className="text-xs sm:text-sm text-off-white/70 mt-5 leading-relaxed max-w-md font-normal">
              Specialized circular knitting, CAD multi-ply cutting, modular lean garment assembly, enzyme finishing, and bonded export packing across two dedicated facilities in Tiruppur, India.
            </p>

            <div className="mt-8 space-y-3 text-xs text-off-white/70 font-mono">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>Angeripalayam Main Road, Tiruppur – 641 603, Tamil Nadu, India (HQ)</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>Shed No: 29, Netaji Apparel Park, New Tirupur – 641 666 (Unit-1 Plant)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation (2 Cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-6 font-semibold">
              Explore
            </h3>
            <ul className="flex flex-col space-y-3 text-xs font-mono">
              <li>
                <Link href="/products" className="text-off-white/70 hover:text-accent transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/manufacturing" className="text-off-white/70 hover:text-accent transition-colors">
                  Manufacturing
                </Link>
              </li>
              <li>
                <Link href="/quality" className="text-off-white/70 hover:text-accent transition-colors">
                  Quality Assurance
                </Link>
              </li>
              <li>
                <Link href="/export" className="text-off-white/70 hover:text-accent transition-colors">
                  Global Export
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-off-white/70 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Compliance & Standards (2 Cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-6 font-semibold">
              Governance
            </h3>
            <ul className="flex flex-col space-y-3 text-xs font-mono text-off-white/70">
              <li className="hover:text-accent transition-colors">GOTS Organic v7.0</li>
              <li className="hover:text-accent transition-colors">OEKO-TEX® Class I</li>
              <li className="hover:text-accent transition-colors">amfori BSCI #9322</li>
              <li className="hover:text-accent transition-colors">Sedex SMETA Audited</li>
              <li className="hover:text-accent transition-colors">Disney FAMA &amp; LEGO</li>
            </ul>
          </div>

          {/* Column 4: Merchandising Contact (3 Cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-6 font-semibold">
              Export Desk
            </h3>
            <ul className="flex flex-col space-y-3.5 text-xs font-mono">
              <li>
                <a
                  href="#contact"
                  className="btn-shine inline-block px-5 py-2.5 bg-accent text-charcoal font-bold uppercase tracking-wider transition-colors"
                >
                  Start an Inquiry
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-off-white/80 pt-2">
                <Mail className="w-3.5 h-3.5 text-accent" />
                <a href="mailto:export@fashionknits.com" className="hover:text-accent transition-colors">
                  export@fashionknits.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-off-white/80">
                <Phone className="w-3.5 h-3.5 text-accent" />
                <a href="tel:+914212370000" className="hover:text-accent transition-colors">
                  +91 421 237 0000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Colossal "FASHION KNITS" 2026 Award-Level Wordmark */}
        <div className="mt-20 pt-16 border-t border-white/10 relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-accent font-semibold">
              Tiruppur, India // Export Knitwear Manufacturer
            </span>
            <button
              onClick={scrollToTop}
              className="text-[11px] font-mono uppercase tracking-widest text-off-white/60 hover:text-accent flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Back To Top</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="w-full overflow-hidden select-none">
            <h2 className="text-[clamp(2.8rem,13vw,12.5rem)] font-bold tracking-tighter uppercase leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-white/35 via-white/15 to-white/5 whitespace-nowrap">
              FASHION KNITS
            </h2>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-off-white/50">
          <div>
            &copy; {new Date().getFullYear()} Fashion Knits. All rights reserved. Tiruppur, Tamil Nadu, India.
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span>GOTS Certified</span>
            <span>•</span>
            <span>OEKO-TEX® Standard 100</span>
            <span>•</span>
            <span>amfori BSCI #9322</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
