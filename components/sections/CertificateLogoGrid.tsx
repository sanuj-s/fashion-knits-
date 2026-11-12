'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useSpring, type Variants } from 'motion/react';
import type { PointerEvent as ReactPointerEvent } from 'react';

const CERTIFICATE_MARKS = [
  {
    name: 'GOTS',
    image: '/assets/certificates/logos/display/gots.png',
    alt: 'Global Organic Textile Standard logo',
  },
  {
    name: 'OEKO-TEX® STANDARD 100',
    image: '/assets/certificates/logos/display/oekotex.png',
    alt: 'OEKO-TEX STANDARD 100 logo',
  },
  {
    name: 'Sedex · SMETA',
    image: '/assets/certificates/logos/display/sedex-smeta.png',
    alt: 'Sedex and SMETA logos with the four-pillar audit mark',
  },
  {
    name: 'Disney FAMA',
    image: '/assets/certificates/logos/display/disney-fama.png',
    alt: 'Disney FAMA logo',
  },
  {
    name: 'amfori BSCI',
    image: '/assets/certificates/logos/display/amfori-bsci.png',
    alt: 'amfori BSCI logo',
  },
  {
    name: 'Better Cotton',
    image: '/assets/certificates/logos/display/better-cotton.png',
    alt: 'Better Cotton logo',
  },
  {
    name: 'ICS',
    image: '/assets/certificates/logos/display/ics.png',
    alt: 'ICS logo',
  },
  {
    name: 'OCS 100',
    image: '/assets/certificates/logos/display/ocs-100.png',
    alt: 'Organic Content Standard 100 logo',
  },
  {
    name: 'OCS Blended',
    image: '/assets/certificates/logos/display/ocs-blended.png',
    alt: 'Organic Content Standard blended logo',
  },
  {
    name: 'WRAP',
    image: '/assets/certificates/logos/display/wrap.png',
    alt: 'WRAP logo',
  },
];

function CertificateLogoTile({ mark, index }: { mark: (typeof CERTIFICATE_MARKS)[number]; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 260, damping: 22, mass: 0.45 });
  const rotateY = useSpring(0, { stiffness: 260, damping: 22, mass: 0.45 });
  const tileVariants: Variants = {
    hidden: { opacity: 0, y: 22, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: index * 0.055, duration: 0.62, ease: [0.22, 1, 0.36, 1] as const },
    },
    hover: { y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 320, damping: 24 } },
  };
  function handlePointerMove(event: ReactPointerEvent<HTMLLIElement>) {
    if (prefersReducedMotion || event.pointerType === 'touch') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    rotateX.set((0.5 - y) * 8);
    rotateY.set((x - 0.5) * 10);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.li
      className="group relative flex min-h-[9.5rem] items-center justify-center overflow-hidden rounded-[1rem] border border-charcoal/10 bg-white/90 p-3 [transform-style:preserve-3d] sm:min-h-[11rem] sm:p-5"
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      variants={tileVariants}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      whileHover={prefersReducedMotion ? undefined : 'hover'}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_at_50%_0%,rgba(198,167,107,0.17),transparent_68%)]"
        variants={{ visible: { opacity: 0 }, hover: { opacity: prefersReducedMotion ? 0 : 1, transition: { duration: 0.32, ease: 'easeOut' } } }}
        initial="visible"
      />
      <motion.div
        className="relative z-[1] h-[7rem] w-full sm:h-[8rem]"
        variants={{
          hidden: { clipPath: prefersReducedMotion ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' },
          visible: {
            clipPath: 'inset(0 0% 0 0)',
            transition: prefersReducedMotion
              ? { duration: 0 }
              : { delay: 0.12 + index * 0.055, duration: 0.72, ease: [0.76, 0, 0.24, 1] },
          },
          hover: prefersReducedMotion
            ? {}
            : { scale: 1.045, transition: { type: 'spring', stiffness: 280, damping: 22 } },
        }}
      >
        <Image
          fill
          src={mark.image}
          alt={mark.alt}
          className="object-contain"
          sizes="(max-width: 639px) 43vw, (max-width: 1023px) 28vw, 22vw"
        />
      </motion.div>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-[#b18b4a]/50"
        variants={{ visible: { opacity: 0 }, hover: { opacity: prefersReducedMotion ? 0 : 1, transition: { duration: 0.22, ease: 'easeOut' } } }}
        initial="visible"
      />
    </motion.li>
  );
}

export function CertificateLogoGrid() {
  return (
    <ul aria-label="Certificate and program logos" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
      {CERTIFICATE_MARKS.map((mark, index) => <CertificateLogoTile key={mark.name} mark={mark} index={index} />)}
    </ul>
  );
}
