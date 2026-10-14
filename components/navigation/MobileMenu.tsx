'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from '@/lib/animations';
import { useReducedMotion } from '@/lib/hooks';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: 'Products', href: '/products' },
  { name: 'Manufacturing', href: '/manufacturing' },
  { name: 'Quality', href: '/quality' },
  { name: 'Sustainability', href: '#sustainability' },
  { name: 'Global Export', href: '/export' },
  { name: 'About Us', href: '/about' },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const previousOverflow = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = 'hidden';

    const links = linksRef.current.filter((link): link is HTMLAnchorElement => Boolean(link));
    const animatedItems: (HTMLAnchorElement | HTMLButtonElement)[] = [
      ...links,
      ...(buttonRef.current ? [buttonRef.current] : []),
    ];
    let timeline: gsap.core.Timeline | null = null;

    if (prefersReducedMotion) {
      gsap.set(overlay, { clipPath: isOpen ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' });
      gsap.set(animatedItems, { opacity: isOpen ? 1 : 0, y: 0 });
    } else if (isOpen) {
      timeline = gsap.timeline();
      timeline
        .fromTo(overlay, { clipPath: 'inset(0 0 100% 0)' }, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.48,
          ease: 'power3.inOut',
        })
        .fromTo(links, { y: 18, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.34,
          stagger: 0.045,
          ease: 'power2.out',
        }, '-=0.16')
        .fromTo(buttonRef.current, { y: 14, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        }, '-=0.16');
    } else {
      timeline = gsap.timeline();
      timeline
        .to(animatedItems, { y: -12, opacity: 0, duration: 0.18, stagger: -0.02, ease: 'power2.in' })
        .to(overlay, { clipPath: 'inset(0 0 100% 0)', duration: 0.42, ease: 'power3.inOut' }, '-=0.06');
    }

    return () => {
      timeline?.kill();
      gsap.killTweensOf([overlay, ...animatedItems]);
      if (isOpen) document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, prefersReducedMotion]);

  useEffect(() => {
    if (!isOpen) return;

    linksRef.current.find((link) => link)?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !overlayRef.current) return;
      const focusableItems = Array.from(
        overlayRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      );
      const first = focusableItems[0];
      const last = focusableItems[focusableItems.length - 1];

      if (!overlayRef.current.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first)?.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleHashClick = (event: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();
    onClose();
    if (isHomePage) {
      window.setTimeout(() => {
        const target = document.querySelector(hash);
        const behavior = prefersReducedMotion ? 'auto' : 'smooth';
        target?.scrollIntoView({ behavior });
      }, prefersReducedMotion ? 0 : 420);
    } else {
      router.push(`/${hash}`);
    }
  };

  const handleInquiryClick = () => {
    const contact = document.getElementById('contact');
    onClose();
    if (contact) {
      window.setTimeout(() => {
        const behavior = prefersReducedMotion ? 'auto' : 'smooth';
        contact.scrollIntoView({ behavior });
      }, prefersReducedMotion ? 0 : 420);
    } else {
      router.push('/#contact');
    }
  };

  return (
    <div
      id="mobile-navigation"
      ref={overlayRef}
      role="dialog"
      aria-modal={isOpen ? true : undefined}
      aria-label="Site navigation"
      className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#11100f] px-6 text-off-white ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{ clipPath: 'inset(0 0 100% 0)' }}
      aria-hidden={!isOpen}
      inert={!isOpen}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mx-auto flex min-h-full w-full max-w-xl flex-col justify-center py-24">
        <div className="mb-8 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
          <span className="h-px w-8 bg-accent" />
          Fashion Knits · Tiruppur
        </div>
        <nav aria-label="Mobile navigation" className="flex flex-col">
          {navLinks.map((link, index) => {
            const className = 'group flex items-center justify-between border-b border-white/10 py-4 text-2xl font-medium tracking-[-0.035em] text-off-white/85 transition-colors hover:text-white sm:text-3xl';
            const content = (
              <>
                <span>{link.name}</span>
                <ArrowUpRight className="h-5 w-5 text-accent opacity-0 transition-[opacity,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </>
            );

            return link.href.startsWith('/') ? (
              <Link
                key={link.name}
                href={link.href}
                ref={(element) => { linksRef.current[index] = element; }}
                onClick={onClose}
                className={className}
              >
                {content}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                ref={(element) => { linksRef.current[index] = element; }}
                onClick={(event) => handleHashClick(event, link.href)}
                className={className}
              >
                {content}
              </a>
            );
          })}
        </nav>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-white/45">Knitwear development · Manufacturing · Export</span>
          <button
            ref={buttonRef}
            type="button"
            onClick={handleInquiryClick}
            className="btn-shine inline-flex items-center justify-center gap-3 rounded-full bg-accent px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-charcoal transition-colors hover:bg-[#e0c38d]"
          >
            Start an inquiry
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
