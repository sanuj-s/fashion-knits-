import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowUpRight, HeartHandshake, PackageCheck, ShieldCheck } from 'lucide-react';
import { AboutMaskWord, AboutMotion } from './about/AboutMotion';
import styles from './about/about-motion.module.css';

const COMPANY_PILLARS = [
  { icon: ShieldCheck, title: 'Quality', text: 'Care across every thread, stitch and garment.' },
  { icon: HeartHandshake, title: 'Partnership', text: 'Long-term relationships with international apparel brands.' },
  { icon: PackageCheck, title: 'Service', text: 'A practical focus on order requirements and on-time delivery.' },
];

export function About() {
  return (
    <section id="about" className="border-b border-charcoal/10 bg-[#f6f4ef] px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28 xl:px-20">
      <AboutMotion>
        <div className="grid items-end gap-7 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#907348] sm:text-xs"><span aria-hidden="true" data-about-line="true" className={`h-px w-9 bg-accent ${styles.eyebrowLine}`} /><span data-about-fade="true" style={{ '--about-delay': '500ms' } as CSSProperties} className={styles.eyebrowText}>Fashion Knits · Tiruppur, India</span></p>
            <h2 data-about-parallax="true" className={`max-w-4xl text-[clamp(2.8rem,6vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-charcoal ${styles.parallaxHeading}`}><AboutMaskWord>Designing</AboutMaskWord>{' '}<AboutMaskWord>your</AboutMaskWord>{' '}<AboutMaskWord>dreams</AboutMaskWord>{' '}<AboutMaskWord muted>since</AboutMaskWord>{' '}<AboutMaskWord muted>1990.</AboutMaskWord></h2>
          </div>
          <div className="lg:col-span-5 lg:pb-1">
            <p data-about-reveal="true" style={{ '--about-delay': 'var(--about-body-delay, 1070ms)' } as CSSProperties} className="max-w-xl text-sm leading-7 text-charcoal/70 sm:text-base">A manufacturer of knitted and woven garments for men, women, children, toddlers and newborns. Fashion Knits is a Government-certified Two-Star Export House.</p>
            <Link href="/about" data-about-reveal="true" style={{ '--about-delay': 'calc(var(--about-body-delay, 1070ms) + 80ms)' } as CSSProperties} className={`group mt-5 inline-flex items-center gap-2 border-b border-charcoal/25 pb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-charcoal transition-colors hover:border-[#907348] hover:text-[#907348] sm:text-xs ${styles.aboutLink}`}><span>About Fashion Knits</span><ArrowUpRight aria-hidden="true" className={`h-4 w-4 ${styles.aboutLinkArrow}`} /></Link>
          </div>
        </div>
        <div data-about-reveal="true" className="mt-9 grid gap-3 rounded-[1rem] bg-charcoal p-5 text-white sm:grid-cols-3 sm:p-7">
          <div data-about-reveal="true" style={{ '--about-delay': '0ms' } as CSSProperties}><span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-accent">Established</span><div data-about-mask="true" data-about-mask-group="stats" style={{ '--about-delay': '0ms' } as CSSProperties} className={styles.valueMask}><strong className="mt-2 block text-3xl font-semibold tracking-[-0.05em]">1990</strong></div></div>
          <div data-about-reveal="true" style={{ '--about-delay': '80ms' } as CSSProperties}><span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-accent">Export status</span><div data-about-mask="true" data-about-mask-group="stats" style={{ '--about-delay': '80ms' } as CSSProperties} className={styles.valueMask}><strong className="mt-2 block text-2xl font-semibold tracking-[-0.05em]">Two-Star Export House</strong></div></div>
          <div data-about-reveal="true" style={{ '--about-delay': '160ms' } as CSSProperties}><span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-accent">Head office</span><div data-about-mask="true" data-about-mask-group="stats" style={{ '--about-delay': '160ms' } as CSSProperties} className={styles.valueMask}><strong className="mt-2 block text-2xl font-semibold tracking-[-0.05em]">Tiruppur, India</strong></div></div>
        </div>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {COMPANY_PILLARS.map(({ icon: Icon, title, text }, index) => <li key={title} tabIndex={0} data-about-reveal="true" style={{ '--about-delay': `${index * 80}ms` } as CSSProperties} className={`rounded-[1rem] border border-charcoal/10 bg-white p-5 sm:p-6 ${styles.pillarCard}`}><div className="flex items-center justify-between"><span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#907348]">{title}</span><Icon aria-hidden="true" className={`h-4 w-4 text-[#907348] ${styles.pillarIcon}`} /></div><p className="mt-4 text-sm leading-6 text-charcoal/65">{text}</p></li>)}
        </ul>
      </AboutMotion>
    </section>
  );
}
