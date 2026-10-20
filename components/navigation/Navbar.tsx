'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 32);
        frame = 0;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (isHomePage) scrollTo(hash.slice(1));
    else router.push(`/${hash}`);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,padding,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          !isHomePage || isScrolled || isOpen
            ? 'border-white/10 bg-[#141312]/85 py-3.5 text-off-white shadow-[0_10px_35px_rgba(0,0,0,0.28)] backdrop-blur-2xl'
            : 'border-transparent bg-transparent py-5 text-off-white md:py-7'
        }`}
      >
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-16 xl:px-24">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.22em] text-off-white transition-colors hover:text-white"
            aria-label="Fashion Knits home"
          >
            <span className="h-2 w-2 rotate-45 bg-accent transition-transform duration-300 group-hover:rotate-90" />
            Fashion Knits
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-7 xl:flex 2xl:gap-8">
            {navLinks.map((link) => {
              const isActive = link.href.startsWith('/') &&
                (pathname === link.href || pathname.startsWith(`${link.href}/`));
              const linkClass = `group relative py-2 text-[10px] font-medium uppercase tracking-[0.17em] transition-colors duration-200 ${
                isActive ? 'text-accent' : 'text-off-white/75 hover:text-white'
              }`;
              const underline = (
                <span
                  className={`absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                  aria-hidden="true"
                />
              );

              return link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className={linkClass}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                  {underline}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(event) => handleHashClick(event, link.href)}
                  className={linkClass}
                >
                  {link.name}
                  {underline}
                </a>
              );
            })}

            <Link
              href="/get-a-quote"
              className="btn-shine rounded-full border border-accent/65 bg-accent px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-charcoal transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#e0c38d] hover:shadow-[0_8px_24px_rgba(201,169,110,0.22)]"
            >
              Inquire
            </Link>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            className="z-50 inline-flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-white/20 bg-white/5 transition-colors hover:bg-white/10 xl:hidden"
            onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <span className={`block h-px w-4 bg-off-white transition-transform duration-300 ${isOpen ? 'translate-y-[3px] rotate-45' : ''}`} />
            <span className={`block h-px w-4 bg-off-white transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block h-px w-4 bg-off-white transition-transform duration-300 ${isOpen ? '-translate-y-[3px] -rotate-45' : ''}`} />
          </button>
        </div>
      </header>
      <MobileMenu isOpen={isOpen} onClose={closeMenu} />
    </>
  );
}
