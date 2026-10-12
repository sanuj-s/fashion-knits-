'use client';

import React from 'react';

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
    <footer className="bg-charcoal border-t border-off-white/10">
      <div className="py-16 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 */}
          <div>
            <h2 className="text-sm font-bold tracking-[0.2em] text-off-white">FASHION KNITS</h2>
            <p className="text-sm text-off-white/40 mt-4">
              Integrated textile and garment manufacturing.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-off-white/30 mb-4">NAVIGATION</h3>
            <ul className="flex flex-col space-y-2">
              <li>
                <a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="text-sm text-off-white/60 hover:text-off-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#manufacturing" onClick={(e) => scrollToSection(e, '#manufacturing')} className="text-sm text-off-white/60 hover:text-off-white transition-colors">
                  Manufacturing
                </a>
              </li>
              <li>
                <a href="#capabilities" onClick={(e) => scrollToSection(e, '#capabilities')} className="text-sm text-off-white/60 hover:text-off-white transition-colors">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => scrollToSection(e, '#products')} className="text-sm text-off-white/60 hover:text-off-white transition-colors">
                  Products
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-off-white/30 mb-4">COMPANY</h3>
            <ul className="flex flex-col space-y-2">
              <li>
                <a href="#quality" onClick={(e) => scrollToSection(e, '#quality')} className="text-sm text-off-white/60 hover:text-off-white transition-colors">
                  Quality
                </a>
              </li>
              <li>
                <a href="#certifications" onClick={(e) => scrollToSection(e, '#certifications')} className="text-sm text-off-white/60 hover:text-off-white transition-colors">
                  Certifications
                </a>
              </li>
              <li>
                <a href="#sustainability" onClick={(e) => scrollToSection(e, '#sustainability')} className="text-sm text-off-white/60 hover:text-off-white transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#global-reach" onClick={(e) => scrollToSection(e, '#global-reach')} className="text-sm text-off-white/60 hover:text-off-white transition-colors">
                  Global Reach
                </a>
              </li>
              <li>
                <a href="#story" onClick={(e) => scrollToSection(e, '#story')} className="text-sm text-off-white/60 hover:text-off-white transition-colors">
                  Our Story
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-off-white/30 mb-4">CONNECT</h3>
            <ul className="flex flex-col space-y-2">
              <li>
                <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="text-sm text-off-white/60 hover:text-off-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="mailto:info@fashionknits.com" className="text-sm text-off-white/60 hover:text-off-white transition-colors">
                  [Email Placeholder]
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-sm text-off-white/60 hover:text-off-white transition-colors">
                  [Phone Placeholder]
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-off-white/60 hover:text-off-white transition-colors">
                  [LinkedIn]
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-off-white/60 hover:text-off-white transition-colors">
                  [Instagram]
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-off-white/10 py-6 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-off-white/30">
            © 2024 Fashion Knits. All rights reserved.
          </div>
          <div className="flex items-center space-x-2 text-xs text-off-white/30">
            <a href="#" className="hover:text-off-white/60 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-off-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
