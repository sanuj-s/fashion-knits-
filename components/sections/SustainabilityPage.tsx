import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowRight, Droplets, Leaf, ShieldCheck, Sun } from 'lucide-react';
import { SustainabilityPageMotion } from './SustainabilityPageMotion';
import styles from './SustainabilityPage.module.css';

const MATERIAL_GUIDANCE = [
  {
    icon: ShieldCheck,
    label: 'Established options',
    title: 'Cotton & cotton blends',
    detail:
      'Established choices for knitwear programs, with fibre content and construction set for each product.',
  },
  {
    icon: Leaf,
    label: 'Under exploration',
    title: 'Polyester, nylon, viscose & blends',
    detail:
      'Man-made fibres and blended knitwear are being evaluated for evolving apparel requirements.',
  },
];

export function SustainabilityPage() {
  return (
    <div data-sustainability-page className={`${styles.page} bg-[#f2efe9] text-[#201f1c]`}>
      <section
        data-motion-section="hero"
        className={`${styles.hero} relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden border-b border-white/10 bg-[#171614] px-5 pb-14 pt-28 text-white sm:px-8 sm:pb-20 sm:pt-32 lg:min-h-[min(58rem,calc(100svh-4rem))] lg:px-16 lg:pb-20`}
      >
        <div className={styles.heroMedia} data-sustainability-hero-media>
          <div className={styles.heroImageReveal}>
            <Image
              src="/assets/sustainability/provided-circular-knitwear.webp"
              alt="Circular textile lifecycle arranged with cotton, a reusable bag, sweater and garment repair materials"
              fill
              sizes="100vw"
              preload
              className={`${styles.heroImage} object-cover object-[52%_52%] sm:object-[62%_54%] lg:object-[66%_54%]`}
            />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#171614]/15"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#171614]/90 via-[#171614]/78 to-[#171614]/32 sm:bg-gradient-to-r sm:from-[#171614]/95 sm:via-[#171614]/75 sm:to-[#171614]/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#171614]/55 via-transparent to-transparent"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-1 flex-col">
          <nav
            aria-label="Breadcrumb"
            className={`${styles.heroBreadcrumb} mb-8 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-accent sm:text-xs`}
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span aria-hidden="true" className="text-white/35">
              /
            </span>
            <span aria-current="page" className="text-white/75">
              Sustainability
            </span>
          </nav>

          <div className="my-auto max-w-[54rem] pb-6">
            <p className={`${styles.heroEyebrow} mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent sm:text-xs`}>
              <span aria-hidden="true" className="h-px w-9 bg-accent" />
              Materials · Energy · Community
            </p>
            <h1 className={`${styles.heroTitle} max-w-[12ch] text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[0.9] tracking-[-0.065em]`}>
              <span className={styles.heroTitleMask}>
                <span className={styles.heroTitleLine} style={{ '--hero-delay': '0.72s' } as CSSProperties}>Better choices</span>
              </span>
              <span className={styles.heroTitleMask}>
                <span className={`${styles.heroTitleLine} text-white/45`} style={{ '--hero-delay': '0.92s' } as CSSProperties}>for what comes next.</span>
              </span>
            </h1>
            <p className={`${styles.heroDescription} mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base`}>
              From material exploration to solar energy and local environmental
              initiatives, Fashion Knits is working across the choices that
              shape responsible apparel manufacturing.
            </p>
          </div>
          <div className={styles.scrollCue} aria-hidden="true">
            <span className={styles.scrollCueLine} />
            <span className={styles.scrollCueDot} />
          </div>
        </div>
      </section>

      <section
        data-motion-section="materials"
        aria-labelledby="material-guidance-title"
        className={`${styles.materialSection} px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24`}
      >
        <div className="mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
          <figure data-motion-image className={`${styles.imageReveal} relative mx-auto w-full max-w-[30rem] overflow-hidden rounded-[1rem] border border-charcoal/10 bg-[#e3ded5] lg:col-span-5`}>
            <div className="relative aspect-[2/3]">
              <Image
                src="/assets/sustainability/provided-textile-reuse.webp"
                alt="Textile offcuts beside a patchwork garment made from joined fabric panels"
                fill
                sizes="(max-width: 1023px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
          </figure>
          <div className="lg:col-span-7">
            <p data-motion-reveal="left" className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#907348]" style={{ '--motion-order': 0 } as CSSProperties}>
              Material direction
            </p>
            <h2
              id="material-guidance-title"
              data-motion-reveal="left"
              style={{ '--motion-order': 1 } as CSSProperties}
              className="text-[clamp(2.4rem,5vw,4.6rem)] font-semibold leading-[0.94] tracking-[-0.06em]"
            >
              Beyond cotton.{' '}
              <span className="text-[#8d8980]">Into man-made fibres.</span>
            </h2>
            <p data-motion-reveal="left" style={{ '--motion-order': 2 } as CSSProperties} className="mt-4 text-sm leading-6 text-[#201f1c]/65">
              Exploring polyester, nylon, viscose and blended knitwear solutions
              to meet evolving apparel requirements.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {MATERIAL_GUIDANCE.map(({ icon: Icon, label, title, detail }, index) => (
                <li
                  key={title}
                  data-motion-reveal="rise"
                  style={{ '--motion-order': 3 + index } as CSSProperties}
                  className="rounded-[0.9rem] border border-[#201f1c]/10 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#907348]">
                      {label}
                    </span>
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-[#907348]"
                    />
                  </div>
                  <h3 className="mt-5 text-xl font-medium leading-tight tracking-[-0.04em]">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[#201f1c]/65">
                    {detail}
                  </p>
                </li>
              ))}
            </ul>
            <p data-motion-reveal="rise" style={{ '--motion-order': 5 } as CSSProperties} className="mt-4 text-xs leading-5 text-[#201f1c]/55">
              Performance-related requirements remain subject to buyer
              specifications and supporting evidence.
            </p>
          </div>
        </div>
      </section>

      <section
        data-motion-section="energy"
        aria-labelledby="energy-title"
        className={`${styles.energySection} border-y border-white/10 bg-[#171614] px-5 py-14 text-white sm:px-8 sm:py-20 lg:px-16 lg:py-24`}
      >
        <div className="mx-auto max-w-[90rem]">
          <div className="mb-8 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p data-motion-reveal="left" style={{ '--motion-order': 0 } as CSSProperties} className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d1b373]">
                <Sun aria-hidden="true" className="h-4 w-4" />
                Energy &amp; infrastructure
              </p>
              <h2
                id="energy-title"
                data-motion-reveal="left"
                style={{ '--motion-order': 1 } as CSSProperties}
                className="text-[clamp(2.4rem,5vw,4.6rem)] font-semibold leading-[0.94] tracking-[-0.06em]"
              >
                Solar at Fashion Knits{' '}
                <span className="text-white/45">and Netaji Apparel Park.</span>
              </h2>
            </div>
            <p data-motion-reveal="right" style={{ '--motion-order': 2 } as CSSProperties} className="text-sm leading-6 text-white/65 lg:col-span-5">
              The Fashion Knits factory at Netaji Apparel Park has a rooftop
              solar power system, alongside shared park infrastructure.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <article data-motion-reveal="rise" style={{ '--motion-order': 0 } as CSSProperties} className="overflow-hidden rounded-[1rem] border border-white/10 bg-white/[0.035]">
              <div data-motion-image className={`${styles.imageReveal} relative aspect-[16/10]`}>
                <Image
                  src="/assets/environment/fashion-knits-rooftop-solar.webp"
                  alt="Rooftop solar panels at the Netaji Apparel Park factory"
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#d1b373]">
                  Fashion Knits factory
                </p>
                <h3 className="mt-2 text-2xl font-medium tracking-[-0.04em]">
                  200 kWp rooftop solar
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  A 200 kWp rooftop solar power system is installed at the
                  Netaji Apparel Park factory.
                </p>
              </div>
            </article>
            <article data-motion-reveal="rise" style={{ '--motion-order': 1 } as CSSProperties} className="overflow-hidden rounded-[1rem] border border-white/10 bg-white/[0.035]">
              <div data-motion-image className={`${styles.imageReveal} relative aspect-[16/10]`}>
                <Image
                  src="/assets/environment/netaji-apparel-park-aerial.webp"
                  alt="Solar and shared infrastructure at Netaji Apparel Park"
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#d1b373]">
                  Shared park infrastructure
                </p>
                <h3 className="mt-2 text-2xl font-medium tracking-[-0.04em]">
                  3.4 MW solar plant
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  The Netaji Apparel Park solar plant generates approximately
                  3.4 MW for factories across the park. The shared electrical
                  infrastructure also includes a TNEB 110/11 kV substation
                  serving surrounding consumers and supporting wind generation
                  transmission.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        data-motion-section="water"
        aria-labelledby="water-title"
        className={`${styles.waterSection} px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24`}
      >
        <div className="mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <p data-motion-reveal="left" style={{ '--motion-order': 0 } as CSSProperties} className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#907348]">
              <Droplets aria-hidden="true" className="h-4 w-4" />
              Water treatment
            </p>
            <h2
              id="water-title"
              data-motion-reveal="left"
              style={{ '--motion-order': 1 } as CSSProperties}
              className="text-[clamp(2.4rem,5vw,4.6rem)] font-semibold leading-[0.94] tracking-[-0.06em]"
            >
              Treat water for{' '}
              <span className="text-[#8d8980]">landscape reuse.</span>
            </h2>
            <p data-motion-reveal="left" style={{ '--motion-order': 2 } as CSSProperties} className="mt-5 text-sm leading-7 text-[#201f1c]/65">
              The sewage treatment process uses Fluidized Attached Growth
              Process. Treated water is reused for gardening, landscaping and
              maintaining green spaces.
            </p>
          </div>
          <figure data-motion-image className={`${styles.imageReveal} overflow-hidden rounded-[1rem] border border-charcoal/10 bg-[#e3ded5] lg:col-span-7`}>
            <div className="relative aspect-[16/10]">
              <Image
                src="/assets/environment/wastewater-treatment.webp"
                alt="Sewage treatment plant and water treatment tanks"
                fill
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </figure>
        </div>
      </section>

      <section
        data-motion-section="community"
        aria-labelledby="community-title"
        className={`${styles.communitySection} border-y border-charcoal/10 bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24`}
      >
        <div className="mx-auto max-w-[90rem]">
          <div className="mb-8 grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p data-motion-reveal="left" style={{ '--motion-order': 0 } as CSSProperties} className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#907348]">
                <Leaf aria-hidden="true" className="h-4 w-4" />
                Afforestation &amp; community
              </p>
              <h2
                id="community-title"
                data-motion-reveal="left"
                style={{ '--motion-order': 1 } as CSSProperties}
                className="text-[clamp(2.4rem,5vw,4.6rem)] font-semibold leading-[0.94] tracking-[-0.06em]"
              >
                Growing a greener{' '}
                <span className="text-[#8d8980]">Tiruppur.</span>
              </h2>
              <p data-motion-reveal="left" style={{ '--motion-order': 2 } as CSSProperties} className="mt-5 text-sm leading-6 text-[#201f1c]/65">
                Fashion Knits took part in regional tree-planting work and
                supports a community shaped by long-running environmental
                projects.
              </p>
            </div>
            <div className="grid w-full max-w-[39rem] grid-cols-2 gap-3 sm:gap-4 lg:col-span-7 lg:justify-self-end">
              <figure data-motion-image className={`${styles.imageReveal} relative aspect-[9/14] overflow-hidden rounded-[1rem] border border-charcoal/10 bg-[#e3ded5]`}>
                <Image
                  src="/assets/sustainability/provided-seedling.webp"
                  alt="Hands holding rich soil around a young green seedling"
                  fill
                  sizes="(max-width: 639px) 44vw, (max-width: 1023px) 43vw, 22vw"
                  className="object-cover"
                />
              </figure>
              <figure data-motion-image className={`${styles.imageReveal} relative aspect-[9/14] overflow-hidden rounded-[1rem] border border-charcoal/10 bg-[#e3ded5]`}>
                <Image
                  src="/assets/sustainability/provided-foliage-cycle.webp"
                  alt="Dense green foliage arranged in the shape of a circular recycling symbol"
                  fill
                  sizes="(max-width: 639px) 44vw, (max-width: 1023px) 43vw, 22vw"
                  className="object-cover"
                />
              </figure>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <figure data-motion-reveal="rise" style={{ '--motion-order': 0 } as CSSProperties} className="overflow-hidden rounded-[1rem] border border-charcoal/10 bg-[#e3ded5]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/assets/environment/tree-planting-campaign.webp"
                  alt="Community participants in a tree-planting campaign in Tiruppur"
                  fill
                  sizes="(max-width: 1023px) 100vw, 40vw"
                  className={`${styles.communityPhoto} object-cover`}
                />
              </div>
              <figcaption className="p-5">
                <h3 className="text-xl font-medium">Vanathukkul Tiruppur</h3>
                <p className="mt-2 text-sm leading-6 text-charcoal/65">
                  Fashion Knits initiated and took part in the campaign,
                  planting nearly 125,000 trees over a two-year period.
                </p>
              </figcaption>
            </figure>
            <article data-motion-reveal="right" style={{ '--motion-order': 1 } as CSSProperties} className="rounded-[1rem] border border-charcoal/10 bg-[#f7f5f1] p-5 sm:p-7">
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#907348]">
                VETRY · Tiruppur community work
              </p>
              <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em]">
                Environmental projects with a long local history.
              </h3>
              <p className="mt-3 text-sm leading-6 text-charcoal/65">
                VETRY is a Tiruppur NGO formed by local business leaders in
                2004. Its work includes constructing a check dam across the
                Noyyal River in 2006, reviving the Andipalayam PWD Tank after 30
                years, and developing the Iduvampalayam Government Higher
                Secondary School campus in 2008, which serves 3,000 students.
              </p>
              <dl className="mt-6 grid gap-3 border-t border-charcoal/10 pt-5 sm:grid-cols-2">
                <div>
                  <dt className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#907348]">
                    Trees planted
                  </dt>
                  <dd className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                    1,585,000
                  </dd>
                  <dd className="text-xs text-charcoal/60">
                    Across Tiruppur District, 2015–2024
                  </dd>
                </div>
                <div>
                  <dt className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#907348]">
                    Ongoing program
                  </dt>
                  <dd className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                    200,000 trees
                  </dd>
                  <dd className="text-xs text-charcoal/60">
                    Annual planting target
                  </dd>
                </div>
              </dl>
            </article>
          </div>

          <div className="mt-9 flex flex-col justify-between gap-4 border-t border-charcoal/10 pt-6 sm:flex-row sm:items-center">
            <p className="text-sm font-medium">
              Have a material or responsibility brief to discuss?
            </p>
            <Link
              href="/#contact"
              className={`${styles.ctaLink} inline-flex min-h-11 w-fit items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#856c42] hover:text-charcoal`}
            >
              Talk with our team{' '}
              <ArrowRight aria-hidden="true" className={`${styles.ctaArrow} h-4 w-4`} />
            </Link>
          </div>
        </div>
      </section>
      <SustainabilityPageMotion />
    </div>
  );
}
