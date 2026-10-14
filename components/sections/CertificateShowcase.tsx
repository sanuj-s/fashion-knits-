import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const CERTIFICATES = [
  {
    name: 'GOTS',
    detail: 'Organic textile standard',
    image: '/assets/certificates/previews/preview_gots.webp',
    href: '/assets/certificates/gots-organic-textile.pdf',
  },
  {
    name: 'OCS 100',
    detail: 'Organic content standard',
    image: '/assets/certificates/previews/preview_ocs.webp',
    href: '/assets/certificates/ocs-organic-content.pdf',
  },
  {
    name: 'OEKO-TEX®',
    detail: 'STANDARD 100 · Class I',
    image: '/assets/certificates/previews/preview_oekotex.png',
    href: '/assets/certificates/oeko-tex-standard-100.pdf',
  },
  {
    name: 'amfori BSCI',
    detail: 'Social compliance audit',
    image: '/assets/certificates/previews/preview_bsci.webp',
    href: '/assets/certificates/bsci-social-compliance.pdf',
  },
];

const ACCREDITATION_LOGOS = [
  { name: 'GOTS', image: '/assets/certificates/logos/cert_gots.png' },
  { name: 'OEKO-TEX®', image: '/assets/certificates/logos/cert_oekotex.png' },
  { name: 'amfori BSCI', image: '/assets/certificates/logos/cert_amfori_bsci.svg' },
  { name: 'OCS 100', image: '/assets/certificates/logos/cert_ocs_100.png' },
  { name: 'OCS Blended', image: '/assets/certificates/logos/cert_ocs_blended.png' },
  { name: 'Sedex SMETA', image: '/assets/certificates/logos/cert_smeta.png' },
  { name: 'WRAP', image: '/assets/certificates/logos/cert_wrap.png' },
  { name: 'Better Cotton (BCI)', image: '/assets/certificates/logos/cert_bci.png' },
  { name: 'GRS', image: '/assets/certificates/logos/cert_grs.png' },
  { name: 'Higg Index', image: '/assets/certificates/logos/cert_higg_index.png' },
  { name: 'ISO 9001', image: '/assets/certificates/logos/cert_intertek_iso.png' },
  { name: 'ISO 14001', image: '/assets/certificates/logos/cert_ias_iso.png' },
  { name: 'Disney FAMA', image: '/assets/certificates/logos/cert_disney_fama.png' },
  { name: 'LEGO Licensee', image: '/assets/certificates/logos/cert_lego.png' },
  { name: 'IGBC Green', image: '/assets/certificates/logos/cert_igbc_green.png' },
  { name: 'Nordic Swan', image: '/assets/certificates/logos/cert_nordic_swan.png' },
];

export function CertificateShowcase() {
  return (
    <section id="home-certifications" className="relative overflow-hidden border-y border-[#26231e]/10 bg-[#f1efe9] px-5 py-20 text-[#201f1c] sm:px-8 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#d8c49b]/20 blur-3xl" />
      <div className="relative mx-auto max-w-[100rem]">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b7840] sm:text-xs">
              <span className="h-px w-9 bg-[#b18b4a]" />
              Standards &amp; certifications
            </p>
            <h2 className="max-w-3xl text-[clamp(2.7rem,6vw,5.8rem)] font-medium leading-[0.9] tracking-[-0.075em]">
              Standards buyers <span className="text-[#201f1c]/40">recognize.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#201f1c]/60 sm:text-base">
              A quick view of our certification, audit and buyer-program portfolio. Open the scope documents below to review the details.
            </p>
          </div>
          <Link
            href="/quality#certificates"
            className="group inline-flex w-fit items-center gap-2 border-b border-[#201f1c]/25 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors hover:border-[#9b7840] hover:text-[#9b7840] sm:text-xs"
          >
            Explore all certificates
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="mb-12 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3 xl:grid-cols-6 2xl:grid-cols-8" aria-label="Standards, audits and buyer-program logos">
          {ACCREDITATION_LOGOS.map((accreditation) => (
            <li
              key={accreditation.name}
              className="flex min-h-[4.5rem] items-center gap-2.5 rounded-xl border border-[#201f1c]/10 bg-white/80 px-3 py-2.5 shadow-[0_6px_18px_rgba(36,32,24,.035)] sm:gap-3 sm:px-3.5"
            >
              <span className="relative grid h-9 w-11 shrink-0 place-items-center">
                <Image
                  src={accreditation.image}
                  alt=""
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </span>
              <span className="text-[9px] font-semibold uppercase leading-tight tracking-[0.045em] text-[#201f1c]/75 sm:text-[10px]">
                {accreditation.name}
              </span>
            </li>
          ))}
        </ul>

        <div className="mb-5 flex flex-col gap-2 border-t border-[#201f1c]/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b7840]">Certificates available to review</p>
            <p className="mt-1 text-xs text-[#201f1c]/55 sm:text-sm">Open a document to view its scope and issuing details.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {CERTIFICATES.map((certificate, index) => (
            <a
              key={certificate.name}
              href={certificate.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${certificate.name} certificate PDF`}
              className="group relative block overflow-hidden rounded-[1rem] border border-[#201f1c]/10 bg-white p-2.5 shadow-[0_12px_36px_rgba(36,32,24,.06)] transition duration-500 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_24px_60px_rgba(36,32,24,.14)] sm:rounded-[1.25rem] sm:p-3"
            >
              <div className="relative aspect-[0.94] overflow-hidden rounded-[0.65rem] bg-[#e7e4dc] sm:aspect-[1.05]">
                <Image
                  src={certificate.image}
                  alt={`${certificate.name} certificate preview`}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 44vw, 22vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/5" />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/40 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md sm:bottom-4 sm:left-4 sm:px-3 sm:text-[9px]">
                  View document <ArrowDownRight className="h-3 w-3" />
                </span>
                <span className="absolute right-3 top-3 font-mono text-[9px] text-white/80 sm:right-4 sm:top-4">
                  0{index + 1}
                </span>
              </div>
              <div className="flex items-end justify-between gap-2 px-1 pb-1 pt-3 sm:px-2 sm:pt-4">
                <div className="min-w-0">
                  <h3 className="truncate text-[11px] font-semibold uppercase tracking-[0.08em] sm:text-sm sm:tracking-[0.1em]">
                    {certificate.name}
                  </h3>
                  <p className="mt-1 truncate text-[9px] tracking-wide text-[#201f1c]/55 sm:text-[10px]">
                    {certificate.detail}
                  </p>
                </div>
                <ArrowUpRight className="mb-0.5 h-4 w-4 shrink-0 text-[#9b7840] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
