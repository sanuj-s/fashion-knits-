import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CertificateLogoGrid } from './CertificateLogoGrid';

export function CertificateShowcase() {
  return (
    <section id="home-certifications" className="relative overflow-hidden border-y border-charcoal/10 bg-[#f1efe9] px-5 py-16 text-charcoal sm:px-8 sm:py-20 lg:px-16 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,169,110,0.13),transparent_55%)]" />
      <div className="relative mx-auto max-w-[100rem]">
        <div className="mb-9 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b7840] sm:text-xs"><span aria-hidden="true" className="h-px w-9 bg-[#b18b4a]" />Certification &amp; social compliance</p>
            <h2 className="text-[clamp(2.6rem,6vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.065em]">Standards <span className="text-charcoal/42">&amp; programs.</span></h2>
          </div>
          <Link href="/quality#certificates" className="group inline-flex w-fit items-center gap-2 border-b border-charcoal/25 pb-2 text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors hover:border-[#9b7840] hover:text-[#9b7840] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#907348] sm:text-xs">All certification records <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" /></Link>
        </div>
        <CertificateLogoGrid />
      </div>
    </section>
  );
}
