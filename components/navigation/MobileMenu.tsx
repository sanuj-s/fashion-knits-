'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Manufacturing', href: '#manufacturing' },
  { name: 'Capabilities', href: '#capabilities' },
  { name: 'Quality', href: '#quality' },
  { name: 'Sustainability', href: '#sustainability' },
  { name: 'Global Reach', href: '#global-reach' },
  { name: 'Contact', href: '#contact' },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.6,
        ease: 'power3.inOut'
      })
      .fromTo(linksRef.current, {
        y: 20,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out'
      }, '-=0.2')
      .fromTo(buttonRef.current, {
        y: 20,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.2');
    } else {
      document.body.style.overflow = '';
      
      const tl = gsap.timeline();
      tl.to(buttonRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      })
      .to(linksRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        stagger: -0.05,
        ease: 'power2.in'
      }, '-=0.1')
      .to(overlayRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.6,
        ease: 'power3.inOut'
      }, '-=0.1');
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600); // Wait for close animation
  };

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{ clipPath: 'inset(0 0 100% 0)' }}
    >
      <nav className="flex flex-col items-center space-y-6">
        {navLinks.map((link, index) => (
          <a
            key={link.name}
            href={link.href}
            ref={(el) => {
              linksRef.current[index] = el;
            }}
            onClick={(e) => handleLinkClick(e, link.href)}
            className="text-3xl md:text-4xl font-bold text-off-white uppercase tracking-wider hover:text-accent transition-colors duration-300"
            style={{ opacity: 0 }}
          >
            {link.name}
          </a>
        ))}
      </nav>
      
      <div className="mt-12">
        <button 
          ref={buttonRef}
          className="border border-off-white text-off-white px-6 py-2 uppercase text-xs tracking-widest hover:bg-accent hover:border-accent hover:text-charcoal transition-all duration-300"
          style={{ opacity: 0 }}
        >
          Start a Conversation
        </button>
      </div>
    </div>
  );
}
