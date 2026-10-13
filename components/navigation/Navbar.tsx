'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Glass blur threshold
      setIsScrolled(currentScrollY > 60);

      // Scroll direction check: hide on scroll down, show on scroll up
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY.current + 8) {
          // Scrolling down
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current - 8) {
          // Scrolling up
          setIsVisible(true);
        }
      } else {
        // Near the top of the page
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled || isOpen
            ? 'py-4 bg-[#141312]/85 backdrop-blur-xl text-off-white border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'py-6 md:py-8 bg-transparent text-off-white'
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-6 md:px-16 lg:px-24 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="group flex items-center gap-2.5 font-bold tracking-[0.25em] text-sm uppercase text-off-white transition-colors"
            >
              <span className="w-2 h-2 bg-accent rotate-45 transition-transform duration-300 group-hover:rotate-90" />
              <span>Fashion Knits</span>
            </Link>
          </div>

          <div className="hidden xl:flex items-center space-x-8 text-sm">
            {navLinks.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-off-white/80 hover:text-accent transition-colors duration-200 text-xs uppercase tracking-[0.2em] font-medium py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleHashClick(e, link.href)}
                  className="relative text-off-white/80 hover:text-accent transition-colors duration-200 text-xs uppercase tracking-[0.2em] font-medium py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-full" />
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
              className="btn-shine border border-accent/60 bg-accent/10 px-6 py-2.5 uppercase text-xs tracking-[0.2em] text-off-white hover:text-charcoal transition-all duration-300 font-semibold cursor-pointer"
            >
              Inquire
            </button>
          </div>

          <button
            className="xl:hidden flex flex-col justify-center items-center w-9 h-9 space-y-1.5 focus:outline-none z-50 cursor-pointer p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-off-white transition-transform duration-300 ease-in-out ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-off-white transition-opacity duration-300 ease-in-out ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-off-white transition-transform duration-300 ease-in-out ${
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
