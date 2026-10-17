import Link from 'next/link';
import { ArrowUpRight, FileText } from 'lucide-react';

const DOCUMENTS = [
  {
    name: 'GOTS scope certificate',
    scope: 'Fashion Knits · textile processing and manufacturing scope',
    status: 'Copy expired 27 Sep 2026',
    href: '/assets/certificates/gots-organic-textile.pdf',
  },
  {
    name: 'OCS scope certificate',
    scope: 'Fashion Knits · organic content processing and manufacturing scope',
    status: 'Copy expired 13 Oct 2026',
    href: '/assets/certificates/ocs-organic-content.pdf',
  },
  {
    name: 'OEKO-TEX® STANDARD 100',
    scope: 'Printing Division only · Product Class I',
    status: 'Local copy states 30 Nov 2026 · issuer status unverified',
    href: '/assets/certificates/oeko-tex-standard-100.pdf',
  },
  {
    name: 'WRAP Certificate of Compliance',
    scope: 'Fashion Knits Branch · Apparel Park · listed operations include cutting, sewing, trimming, checking, ironing and packing',
    status: 'Local copy states 1 Jun 2026–1 Jun 2027 · issuer status unverified',
    href: '/assets/certificates/bsci-social-compliance.pdf',
  },
];

export function CertificateShowcase() {
  return (
    <section id="home-certifications" className="border-y border-charcoal/10 bg-[#f1efe9] px-5 py-20 text-charcoal sm:px-8 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[100rem]">
        <div className="mb-9 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b7840] sm:text-xs">
              <span className="h-px w-9 bg-[#b18b4a]" />
              Quality &amp; documented scope
            </p>
            <h2 className="text-[clamp(2.6rem,6vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
              Review the <span className="text-charcoal/42">current documents.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-charcoal/65 sm:text-base">
              Quality checks are agreed for each order. These are the dates and scopes shown on the document copies available on this site; Fashion Knits should confirm current status and transaction coverage with the issuer before buyers rely on a certification claim.
            </p>
          </div>
          <Link href="/quality#certificates" className="group inline-flex w-fit items-center gap-2 border-b border-charcoal/25 pb-2 text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors hover:border-[#9b7840] hover:text-[#9b7840] sm:text-xs">
            Quality and document details
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {DOCUMENTS.map((document) => (
            <li key={document.name} className="flex min-h-48 flex-col rounded-[1rem] border border-charcoal/10 bg-white p-5 sm:p-6">
              <FileText aria-hidden="true" className="h-5 w-5 text-[#a38454]" />
              <h3 className="mt-5 text-lg font-medium tracking-[-0.025em]">{document.name}</h3>
              <p className="mt-2 flex-1 text-xs leading-5 text-charcoal/60">{document.scope}</p>
              <p className="mt-4 border-t border-charcoal/10 pt-3 text-[10px] font-semibold uppercase leading-4 tracking-[0.08em] text-[#795f39]">{document.status}</p>
              <a href={document.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-10 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-charcoal hover:text-[#907348] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#907348]">
                Open document <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
