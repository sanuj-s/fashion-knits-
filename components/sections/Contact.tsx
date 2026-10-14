'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  Phone,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    productInterest: 'T-Shirts',
    targetQuantity: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');
  const [referenceId, setReferenceId] = useState('');

  useEffect(() => {
    const handleProductInterest = (event: Event) => {
      const productInterest = (event as CustomEvent<string>).detail;
      if (!productInterest) return;
      setFormData((prev) => ({ ...prev, productInterest }));
    };

    window.addEventListener('fashion-knits:product-interest', handleProductInterest);
    return () => window.removeEventListener('fashion-knits:product-interest', handleProductInterest);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setReferenceId(data.referenceId || '');
        setResponseMsg(data.message || 'Inquiry successfully received.');
      } else {
        setStatus('error');
        setResponseMsg(data.error || 'Please try again or contact our export desk directly.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setResponseMsg('Connection issue. Please email export@fashionknits.com directly.');
    }
  };

  const inputClassName = 'h-14 w-full rounded-[0.8rem] border border-[#27241f]/12 bg-[#faf9f6] px-4 text-base text-[#25231f] outline-none transition placeholder:text-[#25231f]/35 focus:border-[#aa8953] focus:ring-2 focus:ring-[#aa8953]/15';
  const labelClassName = 'mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#25231f]/65';

  return (
    <section id="contact" className="relative overflow-hidden border-b border-black/10 bg-[#f1efe9] px-5 py-20 text-[#25231f] sm:px-8 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute -left-36 top-10 h-96 w-96 rounded-full bg-[#d6c39f]/20 blur-3xl" />
      <div className="relative mx-auto max-w-[100rem]">
        <header className="mb-10 grid gap-5 sm:mb-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#967644] sm:text-xs">
              <span className="h-px w-9 bg-[#b18b4a]" />
              Export partnerships · Tiruppur, India
            </p>
            <h2 className="max-w-4xl text-[clamp(2.8rem,6.4vw,6.3rem)] font-medium leading-[0.9] tracking-[-0.075em]">
              Let’s make <span className="text-[#25231f]/42">what’s next.</span>
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-[#25231f]/62 sm:text-base lg:col-span-4 lg:pb-1">
            Share a few project details. Our knitwear team will help you find the right next step.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-5">
            <figure className="group relative min-h-[18rem] overflow-hidden rounded-[1.25rem] bg-[#302c25] sm:min-h-[23rem]">
              <Image
                src="/assets/images/contact_sampling_studio.webp"
                alt="Apparel designers reviewing knitwear swatches in a sampling studio"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-700 motion-safe:group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171612]/90 via-[#171612]/15 to-[#171612]/15" />
              <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/85 backdrop-blur-md sm:right-5 sm:top-5">
                Representative studio image
              </span>
              <figcaption className="absolute bottom-5 left-5 right-5 text-white sm:bottom-7 sm:left-7 sm:right-7">
                <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#dfbd7d]">
                  From first swatch to finished garment
                </span>
                <span className="block max-w-[15ch] text-3xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-4xl">
                  Thoughtful work, made together.
                </span>
              </figcaption>
            </figure>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a href="mailto:export@fashionknits.com" className="group flex min-h-[5.5rem] items-center gap-3 rounded-[1rem] border border-black/8 bg-white/75 px-4 py-3 transition-colors hover:border-[#aa8953]/50 hover:bg-white">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25231f] text-[#dfbd7d]">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.13em] text-[#25231f]/50">Email our team</span>
                  <span className="mt-1 block truncate text-xs font-medium tracking-wide sm:text-[13px]">export@fashionknits.com</span>
                </span>
              </a>
              <a href="tel:+914212370000" className="group flex min-h-[5.5rem] items-center gap-3 rounded-[1rem] border border-black/8 bg-white/75 px-4 py-3 transition-colors hover:border-[#aa8953]/50 hover:bg-white">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25231f] text-[#dfbd7d]">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.13em] text-[#25231f]/50">Call the export desk</span>
                  <span className="mt-1 block text-xs font-medium tracking-wide sm:text-[13px]">+91 421 237 0000</span>
                </span>
              </a>
            </div>

            <details className="group mt-4 rounded-[1rem] border border-black/8 bg-white/55 px-4 sm:px-5">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#25231f]/75 [&::-webkit-details-marker]:hidden">
                Office, factory &amp; hours
                <ChevronDown className="h-4 w-4 shrink-0 text-[#967644] transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="grid gap-4 border-t border-black/8 py-4 text-xs leading-relaxed text-[#25231f]/68 sm:grid-cols-2">
                <address className="not-italic">
                  <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#967644]">Office &amp; sampling</span>
                  Angeripalayam Main Road, Tiruppur – 641 603, Tamil Nadu, India
                </address>
                <address className="not-italic">
                  <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#967644]">Production plant</span>
                  Shed No. 29, Netaji Apparel Park, New Tirupur – 641 666, India
                </address>
                <p className="flex items-center gap-2 text-[10px] font-medium text-[#25231f]/50 sm:col-span-2">
                  <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                  Mon–Sat · 09:00–19:00 IST · Typical reply within one business day
                </p>
              </div>
            </details>
          </aside>

          <div className="rounded-[1.25rem] border border-black/8 bg-white p-5 shadow-[0_18px_60px_rgba(42,36,27,.07)] sm:p-7 lg:col-span-7 lg:p-9">
            <div className="mb-7 flex flex-wrap items-start justify-between gap-4 border-b border-black/8 pb-6">
              <div>
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#967644]">Production inquiry</p>
                <h3 id="contact-form-title" className="text-2xl font-medium leading-tight tracking-[-0.04em] sm:text-3xl">
                  Tell us what you’re making.
                </h3>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f3f0e9] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#25231f]/58">
                <MapPin className="h-3.5 w-3.5 text-[#aa8953]" aria-hidden="true" />
                Tiruppur, India
              </span>
            </div>

            {status === 'success' ? (
              <div role="status" className="rounded-[1rem] bg-[#25231f] p-6 text-white sm:p-8">
                <div className="flex items-center gap-3 text-[#dfbd7d]">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  <span className="text-sm font-semibold">Inquiry received</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/75">{responseMsg}</p>
                {referenceId && <p className="mt-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-mono text-xs text-[#dfbd7d]">Reference {referenceId}</p>}
                <button type="button" onClick={() => setStatus('idle')} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-xs font-semibold transition-colors hover:bg-white hover:text-[#25231f]">
                  Send another inquiry <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} aria-labelledby="contact-form-title" className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label htmlFor="contact-name" className={labelClassName}>Your name *</label>
                    <input type="text" id="contact-name" name="name" required autoComplete="name" value={formData.name} onChange={handleChange} placeholder="Name" className={inputClassName} />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className={labelClassName}>Company / brand *</label>
                    <input type="text" id="contact-company" name="company" required autoComplete="organization" value={formData.company} onChange={handleChange} placeholder="Brand or company" className={inputClassName} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label htmlFor="contact-email" className={labelClassName}>Work email *</label>
                    <input type="email" id="contact-email" name="email" required autoComplete="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" className={inputClassName} />
                  </div>
                  <div>
                    <label htmlFor="contact-country" className={labelClassName}>Country *</label>
                    <input type="text" id="contact-country" name="country" required autoComplete="country-name" value={formData.country} onChange={handleChange} placeholder="Your country" className={inputClassName} />
                  </div>
                </div>

                <div>
                  <label htmlFor="productInterest" className={labelClassName}>What are you looking to make?</label>
                  <select id="productInterest" name="productInterest" value={formData.productInterest} onChange={handleChange} className={inputClassName}>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Polos">Polo shirts</option>
                    <option value="Sweatshirts">Sweatshirts</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Sportswear">Sportswear &amp; active</option>
                    <option value="Casualwear">Casualwear / loungewear</option>
                    <option value="Kidswear">Kidswear &amp; babywear</option>
                    <option value="Custom OEM">Custom programs / OEM</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className={labelClassName}>A little about your project *</label>
                  <textarea id="contact-message" name="message" required rows={3} value={formData.message} onChange={handleChange} placeholder="Product, fabric, quantity or timeline — whatever you know so far." className="min-h-28 w-full resize-y rounded-[0.8rem] border border-[#27241f]/12 bg-[#faf9f6] px-4 py-3 text-base text-[#25231f] outline-none transition placeholder:text-[#25231f]/35 focus:border-[#aa8953] focus:ring-2 focus:ring-[#aa8953]/15" />
                </div>

                <details className="group rounded-[0.8rem] border border-black/8 px-4">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#25231f]/60 [&::-webkit-details-marker]:hidden">
                    Add optional details
                    <ChevronDown className="h-4 w-4 shrink-0 text-[#967644] transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="grid gap-4 border-t border-black/8 py-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-phone" className={labelClassName}>Phone / WhatsApp</label>
                      <input type="tel" id="contact-phone" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} placeholder="Include country code" className={inputClassName} />
                    </div>
                    <div>
                      <label htmlFor="contact-quantity" className={labelClassName}>Estimated quantity</label>
                      <input type="text" id="contact-quantity" name="targetQuantity" value={formData.targetQuantity} onChange={handleChange} placeholder="e.g. 1,000–5,000 pieces" className={inputClassName} />
                    </div>
                  </div>
                </details>

                {status === 'error' && (
                  <div role="alert" className="flex items-start gap-2 rounded-[0.8rem] border border-red-500/25 bg-red-900/5 p-4 text-sm text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{responseMsg}</span>
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'} className="group flex min-h-14 w-full items-center justify-between rounded-full bg-[#25231f] px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#aa8953] hover:text-[#25231f] disabled:cursor-wait disabled:opacity-60 sm:px-7">
                  <span>{status === 'loading' ? 'Sending inquiry…' : 'Send inquiry'}</span>
                  {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />}
                </button>
                <p className="text-center text-[10px] text-[#25231f]/45">We usually reply within one business day.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
