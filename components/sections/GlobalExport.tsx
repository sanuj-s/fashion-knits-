import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ExportWorkflow } from '@/components/sections/ExportWorkflow';

const EXPORT_CHECKPOINTS = [
  'Buyer instructions',
  'Labels & carton details',
  'Final garment checks',
  'Metal detection',
  'Export-carton packing',
  'Shipment documentation',
];

export function GlobalExport() {
  return (
    <section id="global-reach" className="border-b border-white/10 bg-charcoal px-5 py-20 text-off-white sm:px-8 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[100rem]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent sm:text-xs">
              <span aria-hidden="true" className="h-px w-9 bg-accent" />
              Export preparation
            </p>
            <h2 className="max-w-4xl text-[clamp(2.7rem,6vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
              From order details <span className="text-white/45">to export-ready cartons.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              Buyer instructions, final garment checks and packing details stay aligned through shipment preparation.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Link href="/export" className="group inline-flex min-h-11 items-center gap-2 border-b border-white/25 pb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:border-accent hover:text-accent sm:text-xs">
              Export details <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="export-checkpoint-ticker mt-10" role="group" aria-label="Export workflow checkpoints">
          <div className="export-checkpoint-track">
            <div className="export-checkpoint-list">
              {EXPORT_CHECKPOINTS.map((checkpoint) => (
                <span className="export-checkpoint" key={checkpoint}>
                  {checkpoint}<span aria-hidden="true" className="export-checkpoint-separator" />
                </span>
              ))}
            </div>
            <div className="export-checkpoint-list" aria-hidden="true">
              {EXPORT_CHECKPOINTS.map((checkpoint) => (
                <span className="export-checkpoint" key={`repeat-${checkpoint}`}>
                  {checkpoint}<span aria-hidden="true" className="export-checkpoint-separator" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <ExportWorkflow />
      </div>
    </section>
  );
}
