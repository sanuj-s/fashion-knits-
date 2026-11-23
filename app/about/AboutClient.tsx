import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronDown, MapPin } from 'lucide-react';
import { COMPANY_LOCATIONS, EQUIPMENT_ITEMS } from '@/src/data/company-content';
import { ABOUT_FACTS, ABOUT_LOCATION_DETAILS, ABOUT_SITE_CONTACT } from './about-data';
import { leadership, MD_NOTE, PUBLIC_APPOINTMENTS } from './leadership-content';
import {
  AboutDrawLine,
  AboutHeroDot,
  AboutHeroEntry,
  AboutHeroWord,
  AboutListItemReveal,
  AboutMagneticLink,
  AboutNameWord,
  AboutPortraitReveal,
  AboutReveal,
  AboutSectionSeam,
  AboutStoryYear,
} from './AboutMotion';
import { AboutProofStrip } from './AboutProofStrip';
import {
  AboutBuyersSection,
  AboutContinueExploring,
  AboutQualitySection,
  AboutTimeline,
  aboutBuyersAreReady,
  aboutQualityIsReady,
} from './AboutSupplementalSections';
import styles from './about.module.css';

const SHOW_REVIEW = true;

const HERO_IMAGE = {
  src: '/assets/facilities/angeripalayam-hq-exterior-enhanced.webp',
  aiEnhanced: true,
};

const LEADERSHIP_IMAGE = {
  src: '/assets/images/leadership/ramu-raj.jpeg',
  alt: 'Ramu, Managing Director of Fashion Knits',
  aiEnhanced: false,
};

const LOCATION_MEDIA: Record<string, { src: string; alt: string; aiEnhanced: boolean }> = {
  'Head Office & Unit 2': {
    src: '/assets/facilities/angeripalayam-hq-exterior-enhanced.webp',
    alt: 'AI-enhanced visual reference of the Fashion Knits Head Office and Unit 2 exterior in Angeripalayam, Tiruppur',
    aiEnhanced: true,
  },
  'Unit 1': {
    src: '/assets/facilities/netaji-factory-exterior-enhanced.webp',
    alt: 'AI-enhanced visual reference of the Fashion Knits Unit 1 exterior at Netaji Apparel Park',
    aiEnhanced: true,
  },
};

const FEATURED_EQUIPMENT = [
  {
    number: '01',
    title: 'Pattern & cutting',
    item: EQUIPMENT_ITEMS[0],
    detail: 'The company equipment list includes Lectra and Bullmer E80 fully automatic cutting machines.',
    aiEnhanced: false,
    cutout: false,
  },
  {
    number: '02',
    title: 'Printing',
    item: EQUIPMENT_ITEMS[2],
    detail: 'The equipment list includes Kornit, M&R and Sportsman printing machines.',
    aiEnhanced: false,
    cutout: true,
  },
  {
    number: '03',
    title: 'Embroidery',
    item: EQUIPMENT_ITEMS[6],
    detail: 'Barudan and Tajima embroidery machines are listed among the company’s equipment.',
    aiEnhanced: false,
    cutout: true,
  },
] as const;

function ReviewTag() {
  return <span className={styles.reviewTag}>REVIEW</span>;
}

const contactItems = [
  {
    label: 'Phone',
    item: leadership.contact.phone,
    href: leadership.contact.phone.value
      ? `tel:${leadership.contact.phone.value.replace(/[^\d+]/g, '')}`
      : undefined,
  },
  {
    label: 'WhatsApp',
    item: leadership.contact.whatsapp,
    href: leadership.contact.whatsapp.value.replace(/\D/g, '')
      ? `https://wa.me/${leadership.contact.whatsapp.value.replace(/\D/g, '')}`
      : undefined,
  },
  {
    label: 'Email',
    item: leadership.contact.email,
    href: leadership.contact.email.value
      ? `mailto:${leadership.contact.email.value}`
      : undefined,
  },
  {
    label: 'Visit',
    item: leadership.contact.visitNote,
    href: undefined,
  },
].filter(({ item, href }) => item.value.trim() && item.consentToPublish && (href || item === leadership.contact.visitNote));

const siteContactItems = [
  {
    label: 'Phone',
    value: ABOUT_SITE_CONTACT.phone,
    href: ABOUT_SITE_CONTACT.phone
      ? `tel:${ABOUT_SITE_CONTACT.phone.replace(/[^\d+]/g, '')}`
      : undefined,
  },
  {
    label: 'Email',
    value: ABOUT_SITE_CONTACT.email,
    href: ABOUT_SITE_CONTACT.email
      ? `mailto:${ABOUT_SITE_CONTACT.email}`
      : undefined,
  },
].filter((item) => item.value);

const visibleAppointments = PUBLIC_APPOINTMENTS.filter((appointment) => SHOW_REVIEW || appointment.verified);
const showRolesStrip = SHOW_REVIEW || visibleAppointments.length > 0;
const showMdNote = SHOW_REVIEW || MD_NOTE.reviewStatus === 'approved';
const showCtaSeam = aboutBuyersAreReady || !aboutQualityIsReady;

export function AboutClient() {
  return (
    <div className="bg-warm-white text-charcoal">
      <section id="hero" className={`relative isolate overflow-hidden bg-charcoal px-5 pb-6 pt-8 text-off-white sm:px-8 sm:pb-8 sm:pt-10 lg:px-16 lg:pb-10 lg:pt-12 ${styles.heroSection}`}>
        <div aria-hidden="true" className={styles.heroImage}>
          <Image
            src={HERO_IMAGE.src}
            alt=""
            fill
            loading="eager"
            sizes="100vw"
            className="object-cover object-[64%_center]"
          />
        </div>
        <div aria-hidden="true" className={styles.heroScrim} />
        <div aria-hidden="true" className={styles.heroGrid} />
        <div className={styles.heroInner}>
          <div className={styles.heroTopline}>
            <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-accent sm:text-xs">
              <Link href="/" className="hover:text-white">Home</Link>
              <span aria-hidden="true" className="text-white/50">/</span>
              <span aria-current="page" className="text-white/90">About</span>
            </nav>
            {HERO_IMAGE.aiEnhanced && (
              <span className={styles.aiTag}>AI-enhanced visual reference</span>
            )}
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroCopy}>
              <div>
                <AboutHeroEntry>
                  <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent sm:text-xs">
                    <span aria-hidden="true" className="h-px w-8 bg-accent" />
                    Apparel manufacturing · Tiruppur, India
                  </p>
                </AboutHeroEntry>
                <h1 className="mt-6 max-w-2xl text-[clamp(3.8rem,9.5vw,8.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
                  <span className="block overflow-hidden"><AboutHeroWord delay={0.08}>Fashion</AboutHeroWord></span>
                  <span className="block overflow-hidden"><AboutHeroWord delay={0.16}>Knits</AboutHeroWord><span className="text-accent"><AboutHeroDot /></span></span>
                </h1>
                <p className="mt-7 max-w-xl font-serif text-[clamp(1.5rem,3vw,2.5rem)] leading-tight text-[#d8c18f]">
                  Garment making, grounded in Tiruppur.
                </p>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
                  Since 1990, Fashion Knits has made knitted and woven garments for men, women, children, toddlers and newborns.
                </p>
                <Link href="#manufacturing" className={`${styles.heroCta} mt-8 inline-flex min-h-12 items-center gap-3 border border-white/45 px-5 text-[10px] font-bold uppercase tracking-[0.13em] text-white hover:border-accent hover:bg-accent hover:text-charcoal`}>
                  Explore our capabilities <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.heroFooter}>
            <span>Head Office &amp; Unit 2 · Angeripalayam</span>
            <span>{HERO_IMAGE.aiEnhanced ? 'Exterior visualization, not documentary photography · ' : ''}Tiruppur · Tamil Nadu</span>
          </div>
        </div>
      </section>

      <AboutProofStrip facts={ABOUT_FACTS} />

      <section id="story" aria-labelledby="company-story-title" className="overflow-hidden bg-warm-white px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-[90rem] items-center gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
          <AboutReveal amount={0.3} className="relative md:col-span-6">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#907348]">Company story · Tiruppur</p>
            <AboutStoryYear className="font-serif text-[clamp(6rem,15vw,13rem)] font-medium leading-[1.04] tracking-[-0.03em] text-[#d1c8b8]">1990</AboutStoryYear>
            <h2 id="company-story-title" className="mt-9 max-w-xl text-[clamp(2.25rem,4.8vw,4.3rem)] font-semibold leading-[1.04] tracking-[-0.03em]">Fashion Knits, rooted in Tiruppur.</h2>
            <div aria-hidden="true" className={`${styles.storyRule} mt-8 h-px w-full max-w-md bg-charcoal/18`} />
          </AboutReveal>
          <AboutReveal delay={0.1} amount={0.3} className="md:col-span-6 md:pt-10">
            <p className="max-w-2xl text-base leading-7 text-charcoal/75 sm:text-lg sm:leading-8">
              Fashion Knits is a Tiruppur-based maker of knitted and woven garments for men, women, children, toddlers and newborns. The company dates its presence in Tiruppur to 1990.
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-charcoal/60 sm:text-base sm:leading-8">
              Its published locations include the Head Office &amp; Unit 2 in Angeripalayam, Unit 1 at Netaji Apparel Park, and Unit 3 on P.N. Road.
            </p>
            <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#907348]">Knitted &amp; woven apparel · Tiruppur, Tamil Nadu</p>
          </AboutReveal>
        </div>
      </section>

      <AboutTimeline />

      <section id="leadership" aria-labelledby="md-profile-title" className="relative bg-charcoal px-5 py-16 text-off-white sm:px-8 sm:py-20 lg:px-16 lg:py-28">
        <AboutSectionSeam />
        <div className="mx-auto max-w-[90rem]">
          <div className="grid items-start gap-9 md:grid-cols-12 md:gap-12 lg:gap-16">
            <AboutPortraitReveal className="md:col-span-5 lg:col-span-4">
              <figure>
                <div className="relative mx-auto aspect-[4/5] max-w-[25rem] overflow-hidden bg-[#ded8ce] md:max-w-none">
                  <Image
                    src={LEADERSHIP_IMAGE.src}
                    alt={LEADERSHIP_IMAGE.alt}
                    fill
                    sizes="(max-width: 767px) 88vw, (max-width: 1023px) 42vw, 34vw"
                    className="object-cover object-[50%_12%] mix-blend-multiply"
                  />
                  <span aria-hidden="true" className={styles.portraitLine} />
                </div>
                <figcaption className={`${styles.portraitCaption} flex items-center justify-between border-b border-white/20 py-3 text-[9px] font-mono uppercase tracking-[0.15em] text-white/48 sm:text-[10px]`}>
                  <span>Fashion Knits</span>
                  <span>Tiruppur, India</span>
                  <AboutDrawLine className={styles.portraitCaptionRule} />
                </figcaption>
              </figure>
            </AboutPortraitReveal>

            <div className="md:col-span-7 lg:col-span-8">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Leadership · Fashion Knits</p>
              <h2 id="md-profile-title" className="flex flex-wrap gap-x-[0.22em] text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
                <AboutNameWord>Ramu</AboutNameWord>
              </h2>
              <p className="mt-5 text-sm font-medium tracking-[0.02em] text-[#d8c18f] sm:text-base">Managing Director, Fashion Knits</p>
              {leadership.buyerRole.trim() && (
                <p className="mt-6 max-w-3xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">{leadership.buyerRole}</p>
              )}

              {showMdNote && (
                <AboutReveal className={`${styles.mdNote} mt-8 border-t border-white/15 pt-6`}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">From Fashion Knits</p>
                  <h3 className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
                    A Note from the Managing Director
                  </h3>
                  {SHOW_REVIEW && (
                    <p role="note" className="mt-4 inline-flex flex-wrap items-center gap-2 border border-[#907348]/55 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#d8c18f] sm:text-[10px]">
                      {MD_NOTE.approvalStatus}<ReviewTag />
                    </p>
                  )}
                  <div className="mt-5 space-y-4 text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
                    {MD_NOTE.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  <div className="mt-6 flex items-end gap-4 border-t border-white/15 pt-5">
                    <span aria-hidden="true" className="mb-2 h-px w-10 bg-[#907348]" />
                    <div>
                      {SHOW_REVIEW && <p className="mb-1 flex flex-wrap items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/55">Proposed sign-off <ReviewTag /></p>}
                      <p className="text-lg font-semibold tracking-[-0.03em]">Ramu</p>
                      <p className="text-sm text-white/55">Managing Director, Fashion Knits</p>
                    </div>
                  </div>
                </AboutReveal>
              )}

              {contactItems.length > 0 && (
                <AboutReveal delay={0.1} className="mt-7">
                  <div aria-label="Managing Director contact details" className="flex flex-wrap gap-x-5 gap-y-3 border-t border-white/15 pt-5 text-xs text-white/70">
                    {contactItems.map(({ label, item, href }) => (
                      href ? (
                        <a key={label} href={href}>
                          <span className="mr-2 font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">{label}</span>{item.value}
                        </a>
                      ) : (
                        <span key={label}>
                          <span className="mr-2 font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">{label}</span>{item.value}
                        </span>
                      )
                    ))}
                  </div>
                </AboutReveal>
              )}

              <AboutReveal delay={contactItems.length > 0 ? 0.2 : 0.1} className="mt-7">
                <Link href="/get-a-quote" className="inline-flex min-h-12 items-center gap-3 border border-accent bg-accent px-5 text-[10px] font-bold uppercase tracking-[0.13em] text-charcoal">
                  Start a conversation <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </AboutReveal>
            </div>
          </div>

          {showRolesStrip && (
            <div className={styles.rolesStrip}>
              <p className="max-w-[62ch] text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                Alongside his responsibilities at Fashion Knits, public organisation records list Ramu or R. Ramu in roles connected to exporter representation, apparel skills and industrial infrastructure. The records and their confirmation notes appear below.
              </p>
              <h3 id="leadership-appointments-title" className="mt-8 text-[clamp(1.75rem,3vw,2rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
                Industry Leadership &amp; Appointments
              </h3>

              <ol className={`${styles.appointmentsList} mt-5 border-y border-white/15`}>
                {visibleAppointments.map((appointment, index) => (
                  <AboutListItemReveal key={appointment.number} delay={index * 0.06} className={styles.appointmentListItem}>
                    <details className={styles.appointmentDetails}>
                      <summary className={styles.appointmentSummary}>
                        <span className={styles.appointmentNumber} aria-hidden="true">{appointment.number}</span>
                        <span className={styles.appointmentRole}>{appointment.role}</span>
                        <span className={styles.appointmentOrganization}>{appointment.organization}</span>
                        <span className={styles.appointmentRecordName}>{appointment.recordName}</span>
                        <ChevronDown aria-hidden="true" className={styles.appointmentChevron} />
                      </summary>
                      <div className={styles.appointmentContent}>
                        <div>
                          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">Organisation context</p>
                          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">{appointment.organizationContext}</p>
                          {appointment.ecosystemContext && (
                            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">{appointment.ecosystemContext}</p>
                          )}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs leading-5 text-white/50">
                          <span>{appointment.recordDate}</span>
                          <span>{appointment.currentStatus}</span>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.1em]">
                          <a href={appointment.appointmentSource} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:text-white">
                            Appointment record <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                          </a>
                          <a href={appointment.contextSource} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-white/55 hover:text-white">
                            Organisation remit <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </details>
                  </AboutListItemReveal>
                ))}
              </ol>

              <p className="mt-4 max-w-4xl text-xs leading-6 text-white/45">
                The organisations have distinct roles in Tiruppur’s apparel sector. These notes describe their published remits, not individual achievements.
              </p>
              <p className="mt-6 max-w-4xl text-xs leading-6 text-white/45">
                The linked records use the names “Ramu” or “R. Ramu”; they do not consistently expand the name or specify service periods.{' '}
                {SHOW_REVIEW && <span className="inline-flex flex-wrap items-center gap-2"><ReviewTag />Confirm the identity match and current status with Fashion Knits.</span>}{' '}
                These records do not imply endorsement or authority beyond each listed role.
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="capabilities" aria-labelledby="manufacturing-title" className={`${styles.manufacturingSection} relative overflow-hidden bg-[#eae6de] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-28`}>
        <AboutSectionSeam />
        <span id="manufacturing" aria-hidden="true" className={styles.anchorAlias} />
        <div aria-hidden="true" className={styles.capabilityBackdrop} />
        <div className="relative mx-auto max-w-[90rem]">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <AboutReveal className="md:col-span-7">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#907348]">Manufacturing capabilities</p>
              <h2 id="manufacturing-title" className="max-w-3xl text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">Tools for precise garment making.</h2>
            </AboutReveal>
            <AboutReveal delay={0.1} className="md:col-span-5 md:pb-1">
              <p className="text-sm leading-6 text-charcoal/65 sm:text-base sm:leading-7">
                A selection from Fashion Knits’ published equipment list, spanning pattern and cutting work, printing and embroidery.
              </p>
            </AboutReveal>
          </div>

          <ol className="mt-11 grid items-stretch gap-5 md:grid-cols-3 md:gap-4 lg:gap-6">
            {FEATURED_EQUIPMENT.map(({ number, title, item, detail, aiEnhanced, cutout }, index) => (
              <AboutListItemReveal key={item.name} delay={index * 0.09} className={`${styles.equipmentPanel} group relative border-t border-charcoal/25 pt-4`}>
                <span aria-hidden="true" className={styles.equipmentAccentLine} />
                <div className={`${styles.equipmentMedia} ${cutout ? styles.equipmentMediaCutout : ''}`}>
                  {cutout ? (
                    <div className={styles.equipmentPlate}>
                      <Image src={item.image} alt={item.name} fill sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 30vw" className={`${styles.equipmentImage} ${styles.equipmentCutoutImage}`} />
                    </div>
                  ) : (
                    <Image src={item.image} alt={item.name} fill sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 30vw" className={styles.equipmentImage} />
                  )}
                  <span className={styles.equipmentNumber}>{number} / EQUIPMENT</span>
                  {aiEnhanced && <span className={styles.equipmentVisualTag}>AI-enhanced visual reference</span>}
                </div>
                <div className="flex items-start justify-between gap-3 pt-4">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#907348]">{title}</p>
                    <h3 className="mt-2 text-lg font-semibold leading-[1.04] tracking-[-0.03em] sm:text-xl">{item.name}</h3>
                  </div>
                  <span aria-hidden="true" className={styles.equipmentTitleRule} />
                </div>
                <p className="mt-3 max-w-md text-sm leading-6 text-charcoal/60">{detail}</p>
              </AboutListItemReveal>
            ))}
          </ol>

          {SHOW_REVIEW && (
            <div className={`${styles.photoRequest} mt-9 grid gap-3 border border-charcoal/15 bg-white/45 p-4 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-5 sm:p-5`}>
              <span className="inline-flex w-fit flex-wrap items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#806844]">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#b79860]" />
                Authentic photography requested <ReviewTag />
              </span>
              <p className="text-xs leading-5 text-charcoal/60 sm:text-sm">
                A current, wide photograph of a Fashion Knits production floor is needed to replace equipment reference imagery with an on-site view.
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="locations" aria-labelledby="locations-title" className="bg-warm-white px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[90rem]">
          <div className="mb-9 grid gap-5 md:grid-cols-12 md:items-end">
            <AboutReveal className="md:col-span-7">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#907348]">Tiruppur · Tamil Nadu · India</p>
              <h2 id="locations-title" className="text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">Three listed locations.</h2>
            </AboutReveal>
            <AboutReveal delay={0.08} className="md:col-span-5">
              <p className="text-sm leading-6 text-charcoal/60 sm:text-base">
                The site list includes the Head Office &amp; Unit 2, Unit 1 and Unit 3. Each address is shown as recorded in Fashion Knits’ company information.
              </p>
            </AboutReveal>
          </div>

          <ul className={`${styles.locationGrid} grid items-stretch gap-4 md:grid-cols-3`}>
            {COMPANY_LOCATIONS.map((location, index) => {
              const locationDetails = ABOUT_LOCATION_DETAILS[location.name] ?? { role: '', photo: '' };
              const visual = locationDetails.photo.trim()
                ? { src: locationDetails.photo, alt: location.name, aiEnhanced: false }
                : LOCATION_MEDIA[location.name];
              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;
              return (
                <AboutListItemReveal key={location.name} delay={index * 0.07} hoverLift className={`${styles.locationCard} overflow-hidden border border-charcoal/10 bg-[#f8f6f1]`}>
                  {visual ? (
                    <figure>
                      <div className="relative aspect-[16/10] bg-[#e7e3dc]">
                        <Image src={visual.src} alt={visual.alt} fill loading={visual.src === HERO_IMAGE.src ? 'eager' : 'lazy'} sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" />
                        {visual.aiEnhanced && (
                          <span className={`${styles.aiTag} absolute bottom-3 left-3`}>
                            AI-enhanced visual reference
                          </span>
                        )}
                      </div>
                      {visual.aiEnhanced && <figcaption className={styles.locationImageCaption}>Exterior visualization, not documentary photography</figcaption>}
                    </figure>
                  ) : (
                    <div aria-hidden="true" className={`${styles.locationFallback} relative flex aspect-[16/10] flex-col justify-between overflow-hidden bg-charcoal p-5 text-off-white sm:p-6`}>
                      <div className="relative z-10 flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.14em] text-white/55">
                        <span>Fashion Knits</span><span>0{index + 1} / Tiruppur</span>
                      </div>
                      <div className="relative z-10 flex items-center gap-3">
                        <MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />
                        <div>
                          <p className="font-serif text-3xl tracking-[-0.03em]">Unit 3</p>
                          <p className="mt-1 text-xs text-white/60">P.N. Road · Tiruppur</p>
                        </div>
                      </div>
                      <span aria-hidden="true" className="relative z-10 h-px w-12 bg-accent/80" />
                    </div>
                  )}
                  <div className={`${styles.locationCardBody} p-5 sm:p-6`}>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#907348]">0{index + 1} / Location</span>
                    <h3 className="mt-4 text-xl font-medium leading-[1.04] tracking-[-0.03em]">{location.name}</h3>
                    {locationDetails.role.trim() && <p className={styles.locationRole}>{locationDetails.role}</p>}
                    <address className="mt-3 not-italic text-sm leading-6 text-charcoal/60">{location.address}</address>
                    <a href={mapsUrl} target="_blank" rel="noreferrer" className={styles.mapsLink}>
                      Open in Maps <ArrowUpRight aria-hidden="true" className={styles.mapsArrow} />
                    </a>
                  </div>
                </AboutListItemReveal>
              );
            })}
          </ul>
        </div>
      </section>

      <AboutQualitySection />
      <AboutBuyersSection />

      <section id="cta" aria-labelledby="about-cta-title" className="relative bg-charcoal px-5 py-14 text-off-white sm:px-8 sm:py-16 lg:px-16">
        {showCtaSeam && <AboutSectionSeam />}
        <div className="mx-auto grid max-w-[90rem] gap-7 border-t border-white/15 pt-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">Working together</p>
            <AboutReveal amount={0.3} className="mt-2">
              <h2 id="about-cta-title" className="text-[clamp(1.5rem,3vw,2rem)] font-medium leading-[1.04] tracking-[-0.03em]">Bring a product brief or reference sample.</h2>
            </AboutReveal>
          </div>
          <div className="flex flex-col items-start gap-5 lg:items-end">
            {(siteContactItems.length > 0 || contactItems.length > 0) && (
              <div aria-label="Fashion Knits contact details" className={styles.ctaContacts}>
                {siteContactItems.map(({ label, value, href }) => (
                  <a key={`site-${label}`} href={href}>
                    <span className={styles.ctaContactLabel}>{label}</span>{value}
                  </a>
                ))}
                {contactItems.map(({ label, item, href }) => (
                  href ? (
                    <a key={`md-${label}`} href={href}>
                      <span className={styles.ctaContactLabel}>Managing Director · {label}</span>{item.value}
                    </a>
                  ) : (
                    <span key={`md-${label}`}>
                      <span className={styles.ctaContactLabel}>Managing Director · {label}</span>{item.value}
                    </span>
                  )
                ))}
              </div>
            )}
            <AboutMagneticLink href="/get-a-quote" className="w-fit shrink-0">
              Start a conversation <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </AboutMagneticLink>
          </div>
        </div>
        <div className="mx-auto max-w-[90rem]">
          <AboutContinueExploring />
        </div>
      </section>
    </div>
  );
}
