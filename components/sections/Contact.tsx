'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Globe2, Loader2, Mail } from 'lucide-react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const INITIAL_FORM = {
  name: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  productInterest: 'T-Shirts',
  targetQuantity: '',
  message: '',
};

export function Contact({ context = 'general' }: { context?: 'general' | 'export' }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [deliveryReady, setDeliveryReady] = useState<boolean | null>(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');

  useEffect(() => {
    let active = true;
    fetch('/api/contact', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data: { deliveryConfigured?: boolean }) => {
        if (active) setDeliveryReady(data.deliveryConfigured === true);
      })
      .catch(() => {
        if (active) setDeliveryReady(false);
      });

    const handleProductInterest = (event: Event) => {
      const productInterest = (event as CustomEvent<string>).detail;
      if (productInterest) setFormData((previous) => ({ ...previous, productInterest }));
    };
    window.addEventListener('fashion-knits:product-interest', handleProductInterest);
    return () => {
      active = false;
      window.removeEventListener('fashion-knits:product-interest', handleProductInterest);
    };
  }, []);

  const emailDraft = useMemo(() => {
    const enquiryType = context === 'export' ? 'International export enquiry' : 'Knitwear production enquiry';
    const subject = `${enquiryType}${formData.company ? ` · ${formData.company}` : ''}`;
    const body = [
      `Name: ${formData.name}`,
      `Company: ${formData.company}`,
      `Email: ${formData.email}`,
      `${context === 'export' ? 'Destination country' : 'Country'}: ${formData.country}`,
      `Phone: ${formData.phone}`,
      `Product: ${formData.productInterest}`,
      `Estimated quantity: ${formData.targetQuantity}`,
      '',
      'Project details:',
      formData.message,
    ].join('\n');
    return `mailto:export@fashionknits.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [context, formData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setResponseMessage('');
    setReferenceId('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data: { success?: boolean; error?: string; message?: string; referenceId?: string; deliveryConfigured?: boolean } = await response.json();
      if (!response.ok || data.success !== true) {
        setDeliveryReady(data.deliveryConfigured === true);
        setStatus('error');
        setResponseMessage(data.error || 'The online form could not send your enquiry. Please use the email option below.');
        return;
      }
      setStatus('success');
      setResponseMessage(data.message || 'The email provider accepted this enquiry for delivery. This does not confirm that it has been read.');
      setReferenceId(data.referenceId || '');
    } catch {
      setStatus('error');
      setResponseMessage('The online form could not reach the delivery service. Open the prepared email to send your enquiry directly.');
    }
  };

  const inputClassName = 'h-12 w-full rounded-[0.7rem] border border-[#27241f]/15 bg-[#faf9f6] px-4 text-sm text-[#25231f] outline-none transition placeholder:text-[#25231f]/40 focus:border-[#aa8953] focus:ring-2 focus:ring-[#aa8953]/20';
  const labelClassName = 'mb-2 block text-[10px] font-semibold uppercase tracking-[0.13em] text-[#25231f]/70';

  return (
    <section id="contact" className="border-b border-black/10 bg-[#f1efe9] px-5 py-20 text-[#25231f] sm:px-8 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[100rem]">
        <header className="mb-9 grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#967644] sm:text-xs">
              <span className="h-px w-9 bg-[#b18b4a]" />
              Get a quote · Tiruppur, India
            </p>
            <h2 className="max-w-4xl text-[clamp(2.8rem,6.4vw,6rem)] font-semibold leading-[0.92] tracking-[-0.07em]">
              {context === 'export' ? <>Discuss your <span className="text-[#25231f]/45">export requirements.</span></> : <>Discuss your <span className="text-[#25231f]/45">knitwear brief.</span></>}
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-[#25231f]/65 sm:text-base lg:col-span-4 lg:pb-1">
            {context === 'export' ? 'Tell us your destination, order details and shipping requirements. Include any delivery terms or timing preferences you already have.' : 'Tell us the product, destination and approximate order quantity. A reference sample or tech pack helps us understand your requirements.'}
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-12 lg:gap-7">
          <aside className="lg:col-span-4">
            {context === 'export' ? (
              <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-[1rem] bg-[#25231f] p-6 text-white sm:p-8 lg:aspect-[0.94/1]">
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(201,169,110,.22),transparent_58%)]" />
                <div className="relative flex items-center justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Export coordination</span>
                  <Globe2 aria-hidden="true" className="h-5 w-5 text-[#d3b476]" />
                </div>
                <div className="relative max-w-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#d3b476]">Tiruppur, India</p>
                  <h3 className="mt-3 text-3xl font-medium leading-tight tracking-[-0.05em] sm:text-4xl">Start with the destination.</h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-white/65">Share your market and order details. The team can review the freight and documentation steps with you.</p>
                </div>
                <p className="relative border-t border-white/15 pt-4 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/55">Storage <span className="mx-2 text-[#d3b476]">/</span> Customs coordination <span className="mx-2 text-[#d3b476]">/</span> Freight</p>
              </div>
            ) : (
              <figure className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-[#302c25] lg:aspect-[0.94/1]">
                <Image src="/assets/images/contact_sampling_studio.webp" alt="Illustrative studio scene representing a knitwear sampling discussion" fill sizes="(max-width: 1024px) 100vw, 34vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171612]/75 via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm">Illustrative studio image</figcaption>
              </figure>
            )}
            <a href="mailto:export@fashionknits.com" className="mt-3 flex min-h-14 items-center gap-3 rounded-[0.8rem] border border-black/10 bg-white/75 px-4 text-sm transition-colors hover:border-[#aa8953]/50 hover:bg-white">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#25231f] text-[#dfbd7d]"><Mail aria-hidden="true" className="h-4 w-4" /></span>
              <span><span className="block text-[9px] font-semibold uppercase tracking-[0.13em] text-[#25231f]/50">Email</span><span className="font-medium">export@fashionknits.com</span></span>
            </a>
            <p className="mt-3 text-[11px] leading-5 text-[#25231f]/55">The email address and phone number displayed on this site should be confirmed by Fashion Knits before launch.</p>
          </aside>

          <div className="rounded-[1rem] border border-black/10 bg-white p-5 shadow-[0_18px_60px_rgba(42,36,27,.06)] sm:p-7 lg:col-span-8 lg:p-8">
            <h3 id="contact-form-title" className="text-xl font-medium tracking-[-0.035em] sm:text-2xl">{context === 'export' ? 'Tell us about your export order' : 'Tell us about your project'}</h3>
            <p className="mt-2 text-xs leading-5 text-[#25231f]/55">{context === 'export' ? 'Name, company, work email, destination country and a short shipment description are required.' : 'Name, company, work email, country and a short project description are required.'}</p>

            {status === 'success' ? (
              <div role="status" className="mt-6 rounded-[0.9rem] bg-[#25231f] p-5 text-white sm:p-7">
                <div className="flex items-center gap-2 text-[#dfbd7d]"><CheckCircle2 aria-hidden="true" className="h-5 w-5" /><span className="text-sm font-semibold">Accepted for email delivery</span></div>
                <p className="mt-3 text-sm leading-6 text-white/75">{responseMessage}</p>
                {referenceId && <p className="mt-3 break-all font-mono text-[10px] text-[#dfbd7d]">Provider reference: {referenceId}</p>}
                <p className="mt-3 text-xs leading-5 text-white/55">For time-sensitive requests, contact the export desk directly.</p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 px-4 text-xs font-semibold transition-colors hover:bg-white hover:text-[#25231f]">Send another enquiry <ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} aria-labelledby="contact-form-title" aria-busy={status === 'loading'} className="mt-6 space-y-4">
                {deliveryReady === false && (
                  <p className="rounded-[0.7rem] border border-[#aa8953]/30 bg-[#f7f3e9] p-4 text-xs leading-5 text-[#51442e]">
                    Online enquiry delivery is not configured at this site. Fill in the details, then use “Prepare email enquiry” to open your email app with this information.
                  </p>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><label htmlFor="contact-name" className={labelClassName}>Your name *</label><input id="contact-name" name="name" required autoComplete="name" maxLength={120} value={formData.name} onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))} className={inputClassName} placeholder="Name" /></div>
                  <div><label htmlFor="contact-company" className={labelClassName}>Company / brand *</label><input id="contact-company" name="company" required autoComplete="organization" maxLength={160} value={formData.company} onChange={(event) => setFormData((prev) => ({ ...prev, company: event.target.value }))} className={inputClassName} placeholder="Company or brand" /></div>
                  <div><label htmlFor="contact-email" className={labelClassName}>Work email *</label><input id="contact-email" name="email" type="email" required autoComplete="email" maxLength={254} value={formData.email} onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))} className={inputClassName} placeholder="you@company.com" /></div>
                  <div><label htmlFor="contact-country" className={labelClassName}>{context === 'export' ? 'Destination country *' : 'Country *'}</label><input id="contact-country" name="country" required autoComplete="country-name" maxLength={100} value={formData.country} onChange={(event) => setFormData((prev) => ({ ...prev, country: event.target.value }))} className={inputClassName} placeholder={context === 'export' ? 'Destination country' : 'Country'} /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><label htmlFor="contact-product" className={labelClassName}>Product interest</label><select id="contact-product" name="productInterest" value={formData.productInterest} onChange={(event) => setFormData((prev) => ({ ...prev, productInterest: event.target.value }))} className={inputClassName}><option>T-Shirts</option><option>Polos</option><option>Sweatshirts</option><option>Hoodies</option><option>Sportswear &amp; active</option><option>Casualwear / loungewear</option><option>Kidswear &amp; babywear</option><option>Custom programs / OEM</option></select></div>
                  <div><label htmlFor="contact-quantity" className={labelClassName}>Estimated quantity</label><input id="contact-quantity" name="targetQuantity" value={formData.targetQuantity} onChange={(event) => setFormData((prev) => ({ ...prev, targetQuantity: event.target.value }))} maxLength={100} className={inputClassName} placeholder="If known" /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><label htmlFor="contact-phone" className={labelClassName}>Phone (optional)</label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={50} value={formData.phone} onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))} className={inputClassName} placeholder="Include country code" /></div>
                  <div className="hidden sm:block" aria-hidden="true" />
                </div>
                <div><label htmlFor="contact-message" className={labelClassName}>{context === 'export' ? 'Shipment and project details *' : 'Project details *'}</label><textarea id="contact-message" name="message" required rows={4} maxLength={3000} value={formData.message} onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))} placeholder={context === 'export' ? 'Order details, freight needs, delivery terms or timeline — share what you know so far.' : 'Product, fabric, destination, quantity or timeline — share what you know so far.'} className="min-h-28 w-full resize-y rounded-[0.7rem] border border-[#27241f]/15 bg-[#faf9f6] px-4 py-3 text-sm leading-6 text-[#25231f] outline-none transition placeholder:text-[#25231f]/40 focus:border-[#aa8953] focus:ring-2 focus:ring-[#aa8953]/20" /></div>

                {status === 'error' && (
                  <div role="alert" className="rounded-[0.7rem] border border-red-500/25 bg-red-900/5 p-4 text-sm leading-5 text-red-800">
                    {responseMessage}{' '}
                    <a href={emailDraft} className="font-semibold underline underline-offset-2">Prepare the enquiry email.</a>
                  </div>
                )}
                {deliveryReady === false ? (
                  <a href={emailDraft} className="group flex min-h-12 w-full items-center justify-between rounded-full bg-[#25231f] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#aa8953] hover:text-[#25231f] sm:px-6">
                    <span>Prepare email enquiry</span><Mail aria-hidden="true" className="h-4 w-4" />
                  </a>
                ) : (
                  <button type="submit" disabled={status === 'loading' || deliveryReady === null} className="group flex min-h-12 w-full items-center justify-between rounded-full bg-[#25231f] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#aa8953] hover:text-[#25231f] disabled:cursor-wait disabled:opacity-55 sm:px-6">
                    <span>{deliveryReady === null ? 'Checking enquiry delivery…' : status === 'loading' ? 'Sending enquiry…' : 'Send enquiry'}</span>
                    {status === 'loading' || deliveryReady === null ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                  </button>
                )}
                <p className="text-[10px] leading-5 text-[#25231f]/48">A successful submission means the configured email provider accepted the message for delivery. It does not confirm that a person has read it.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
