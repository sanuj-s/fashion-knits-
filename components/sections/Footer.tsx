'use client';

import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

export function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (id.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#121110] border-t border-white/10 text-off-white">
      <div className="py-16 md:py-20 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-4">
            <h2 className="text-base font-bold tracking-[0.2em] uppercase text-off-white">
              FASHION KNITS
            </h2>
            <p className="text-xs font-mono uppercase tracking-widest text-accent mt-1">
              Integrated Textile &amp; Garment Manufacturing
            </p>
            <p className="text-xs sm:text-sm text-off-white/60 mt-4 leading-relaxed max-w-sm">
              Vertically integrated circular knitting, eco-friendly dyeing, fabric finishing, and export apparel production headquartered in Tirupur, India.
            </p>
            <div className="mt-6 flex items-start gap-2.5 text-xs text-off-white/60 font-mono">
              <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>Apparel Park, Eettiveerampalayam, Avinashi, Tirupur – 641 666, Tamil Nadu, India</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
              Manufacturing Navigation
            </h3>
            <ul className="flex flex-col space-y-2.5 text-xs font-mono">
              <li>
                <a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="text-off-white/70 hover:text-accent transition-colors">
                  About Facility
                </a>
              </li>
              <li>
                <a href="#manufacturing" onClick={(e) => scrollToSection(e, '#manufacturing')} className="text-off-white/70 hover:text-accent transition-colors">
                  10-Stage Manufacturing Process
                </a>
              </li>
              <li>
                <a href="#capabilities" onClick={(e) => scrollToSection(e, '#capabilities')} className="text-off-white/70 hover:text-accent transition-colors">
                  Production Capabilities
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => scrollToSection(e, '#products')} className="text-off-white/70 hover:text-accent transition-colors">
                  Knitted Product Range
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Compliance & Corporate */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
              Governance
            </h3>
            <ul className="flex flex-col space-y-2.5 text-xs font-mono">
              <li>
                <a href="#quality" onClick={(e) => scrollToSection(e, '#quality')} className="text-off-white/70 hover:text-accent transition-colors">
                  Quality Assurance
                </a>
              </li>
              <li>
                <a href="#certifications" onClick={(e) => scrollToSection(e, '#certifications')} className="text-off-white/70 hover:text-accent transition-colors">
                  Certifications (17)
                </a>
              </li>
              <li>
                <a href="#sustainability" onClick={(e) => scrollToSection(e, '#sustainability')} className="text-off-white/70 hover:text-accent transition-colors">
                  ESG &amp; Sustainability
                </a>
              </li>
              <li>
                <a href="#global-reach" onClick={(e) => scrollToSection(e, '#global-reach')} className="text-off-white/70 hover:text-accent transition-colors">
                  Global Logistics
                </a>
              </li>
              <li>
                <a href="#story" onClick={(e) => scrollToSection(e, '#story')} className="text-off-white/70 hover:text-accent transition-colors">
                  Manufacturing Story
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Merchandising Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
              Export Desk
            </h3>
            <ul className="flex flex-col space-y-3 text-xs font-mono">
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="inline-block px-4 py-2 bg-accent text-charcoal font-bold uppercase tracking-wider hover:bg-pure-white transition-colors"
                >
                  Start an Inquiry
                </a>
              </li>
              <li className="flex items-center gap-2 text-off-white/80 pt-2">
                <Mail className="w-3.5 h-3.5 text-accent" />
                <a href="mailto:export@fashionknits.com" className="hover:text-accent transition-colors">
                  export@fashionknits.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-off-white/80">
                <Phone className="w-3.5 h-3.5 text-accent" />
                <a href="tel:+914212370000" className="hover:text-accent transition-colors">
                  +91 421 237 0000
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-white/10 py-6 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-off-white/40">
          <div>
            &copy; {new Date().getFullYear()} Fashion Knits. All rights reserved. Tirupur, Tamil Nadu, India.
          </div>
          <div className="flex items-center space-x-4">
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
