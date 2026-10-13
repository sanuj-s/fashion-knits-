'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ScrollTrigger } from '@/lib/animations';
import MobileMenu from './MobileMenu';

const navLinks = [
  { name: 'Products', href: '/products' },
  { name: 'Manufacturing', href: '/manufacturing' },
  { name: 'Quality', href: '/quality' },
  { name: 'Sustainability', href: '#sustainability' },
  { name: 'Global Export', href: '/export' },
  { name: 'About Us', href: '/about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: '80px top',
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (isHomePage) {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/' + hash);
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || isOpen
            ? 'py-3.5 bg-charcoal/95 backdrop-blur-md text-off-white border-b border-white/10 shadow-lg'
            : 'py-6 bg-transparent text-off-white'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="font-bold tracking-[0.2em] text-sm uppercase text-off-white hover:text-accent transition-colors"
            >
              Fashion Knits
            </Link>
          </div>

          <div className="hidden xl:flex items-center space-x-6 text-sm">
            {navLinks.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-off-white/80 hover:text-accent transition-colors duration-200 text-xs uppercase tracking-widest font-medium"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleHashClick(e, link.href)}
                  className="text-off-white/80 hover:text-accent transition-colors duration-200 text-xs uppercase tracking-widest font-medium"
                >
                  {link.name}
                </a>
              )
            )}
            <button
              onClick={() => {
                if (isHomePage) {
                  const target = document.querySelector('#contact');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                } else {
                  router.push('/#contact');
                }
              }}
              className="border border-off-white/40 px-5 py-2 uppercase text-xs tracking-widest text-off-white hover:bg-accent hover:border-accent hover:text-charcoal transition-all duration-300 font-medium cursor-pointer"
            >
              Inquire
            </button>
          </div>

          <button
            className="xl:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50 cursor-pointer"
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
