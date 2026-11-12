import Link from 'next/link';
import { ArrowUpRight, Droplets, Leaf, Sun } from 'lucide-react';

const INITIATIVES = [
  { icon: Sun, title: 'Rooftop solar', detail: 'A 200 kWp solar power system is installed at the Netaji Apparel Park factory.' },
  { icon: Droplets, title: 'Water reuse', detail: 'Treated water is used for gardening and landscaping.' },
  { icon: Leaf, title: 'Tree planting', detail: 'Fashion Knits took part in the Vanathukkul Tiruppur campaign, planting nearly 125,000 trees over two years.' },
];

export function Sustainability() {
  return (
    <section id="sustainability" className="border-y border-white/10 bg-[#171614] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[100rem]">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#dfbd7d] sm:text-xs"><span aria-hidden="true" className="h-px w-9 bg-[#dfbd7d]" />Environment &amp; responsibility</p>
            <h2 className="max-w-4xl text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.065em]">A practical focus on <span className="text-white/45">energy, water and community.</span></h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/65 sm:text-base lg:col-span-5">Material direction, resource use and community initiatives are part of Fashion Knits’ approach to responsible manufacturing.</p>
        </div>
        <ul className="mt-9 grid gap-3 md:grid-cols-3">
          {INITIATIVES.map(({ icon: Icon, title, detail }) => <li key={title} className="min-h-48 rounded-[1rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6"><Icon aria-hidden="true" className="h-5 w-5 text-[#d1b373]" /><h3 className="mt-5 text-lg font-medium tracking-[-0.025em]">{title}</h3><p className="mt-2 text-sm leading-6 text-white/65">{detail}</p></li>)}
        </ul>
        <div className="mt-7 flex flex-col justify-between gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center"><p className="text-sm font-medium">Explore environmental and material initiatives.</p><Link href="/sustainability" className="group inline-flex min-h-11 w-fit items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#dfbd7d] hover:text-white">See sustainability details <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div>
      </div>
    </section>
  );
}
