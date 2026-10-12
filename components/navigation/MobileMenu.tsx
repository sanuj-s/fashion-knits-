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
  { name: 'Products', href: '#products' },
  { name: 'Quality', href: '#quality' },
  { name: 'Certifications', href: '#certifications' },
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
        duration: 0.5,
        ease: 'power3.inOut',
      })
        .fromTo(
          linksRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.04,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .fromTo(
          buttonRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: 'power2.out',
          },
          '-=0.2'
        );
    } else {
      document.body.style.overflow = '';

      const tl = gsap.timeline();
      tl.to(buttonRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      })
        .to(
          linksRef.current,
          {
            y: -20,
            opacity: 0,
            duration: 0.25,
            stagger: -0.03,
            ease: 'power2.in',
          },
          '-=0.1'
        )
        .to(
          overlayRef.current,
          {
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.5,
            ease: 'power3.inOut',
          },
          '-=0.1'
        );
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
    }, 550);
  };

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-40 bg-[#121110] flex flex-col items-center justify-center px-6 overflow-y-auto ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{ clipPath: 'inset(0 0 100% 0)' }}
    >
      <nav className="flex flex-col items-center space-y-4 my-auto py-12">
        {navLinks.map((link, index) => (
          <a
            key={link.name}
            href={link.href}
            ref={(el) => {
              linksRef.current[index] = el;
            }}
            onClick={(e) => handleLinkClick(e, link.href)}
            className="text-2xl sm:text-3xl font-bold text-off-white uppercase tracking-wider hover:text-accent transition-colors duration-200"
            style={{ opacity: 0 }}
          >
            {link.name}
          </a>
        ))}

        <div className="pt-6">
          <button
            ref={buttonRef}
            onClick={() => {
              onClose();
              setTimeout(() => {
                const target = document.querySelector('#contact');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }, 550);
            }}
            className="border border-accent text-accent px-8 py-3 uppercase text-xs tracking-widest hover:bg-accent hover:text-charcoal transition-all duration-300 font-bold"
            style={{ opacity: 0 }}
          >
            Start an Inquiry
          </button>
        </div>
      </nav>
    </div>
  );
}
