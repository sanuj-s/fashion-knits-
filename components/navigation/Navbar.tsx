'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import MobileMenu from './MobileMenu';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Manufacturing', href: '#manufacturing' },
  { name: 'Capabilities', href: '#capabilities' },
  { name: 'Quality', href: '#quality' },
  { name: 'Sustainability', href: '#sustainability' },
  { name: 'Global Reach', href: '#global-reach' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: '100px top',
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || isOpen
            ? 'py-4 bg-charcoal/95 backdrop-blur-md text-off-white border-b border-white/10 shadow-lg'
            : 'py-6 bg-transparent text-off-white'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="font-bold tracking-[0.2em] text-sm uppercase text-off-white hover:text-accent transition-colors">
              Fashion Knits
            </a>
          </div>

          <div className="hidden lg:flex items-center space-x-8 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-off-white/80 hover:text-accent transition-colors duration-300 text-xs uppercase tracking-widest font-medium"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                const target = document.querySelector('#contact');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border border-off-white/40 px-6 py-2 uppercase text-xs tracking-widest text-off-white hover:bg-accent hover:border-accent hover:text-charcoal transition-all duration-300 font-medium"
            >
              Start a Conversation
            </button>
          </div>

          <button
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-current transition-transform duration-300 ease-in-out ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ease-in-out ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-transform duration-300 ease-in-out ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </header>
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
