'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MapPin, Mail, Phone, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setReferenceId(data.referenceId || '');
        setResponseMsg(data.message || 'Inquiry successfully received.');
      } else {
        setStatus('error');
        setResponseMsg(data.error || 'Failed to submit inquiry. Please reach out via email directly.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setResponseMsg('Network connection error. Please contact export@fashionknits.com directly.');
    }
  };

  return (
    <section id="contact" className="bg-off-white text-charcoal py-32 md:py-40 px-6 md:px-16 lg:px-24 border-b border-charcoal/10 relative">
      <div className="max-w-[90rem] mx-auto">
        {/* Editorial Eyebrow with numbering */}
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-10 bg-accent" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
            11 // Technical Inquiries
          </span>
        </div>

        {/* Section Heading with Masked Line Reveal */}
        <SectionHeading
          title={"LET'S BUILD\nWHAT'S NEXT."}
          subtitle="Connect with Fashion Knits for manufacturing partnerships, OEM garment production, sample requests, and global export sourcing."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-16 md:mt-24">
          {/* Left Column: Direct Commercial & Merchandising Contacts */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent block mb-3 font-semibold">
                Export Merchandising Division
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-charcoal mb-6">
                Direct Buyer Inquiries &amp; Factory Visits
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed mb-8">
                Our technical merchandising team handles tech pack reviews, lab dips, Proto &amp; SMS sample development, cost breakdowns, and production scheduling for international brands.
              </p>

              {/* Contact Details List */}
              <div className="space-y-6 pt-6 border-t border-charcoal/10">
                {/* Unit 1: Corporate Head Office */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-charcoal text-accent flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent block font-semibold">
                      Primary Corporate Office &amp; Sampling
                    </span>
                    <p className="text-xs sm:text-sm font-mono text-charcoal/80 mt-1">
                      Angeripalayam Main Road, Tiruppur – 641 603, Tamil Nadu, India
                    </p>
                  </div>
                </div>

                {/* Unit 2: Production Facility */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-charcoal text-accent flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent block font-semibold">
                      Unit-1 Main Manufacturing Plant
                    </span>
                    <p className="text-xs sm:text-sm font-mono text-charcoal/80 mt-1">
                      Shed No: 29, Netaji Apparel Park, New Tirupur – 641 666, India
                    </p>
                  </div>
                </div>

                {/* Email Direct Desk */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-charcoal text-accent flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent block font-semibold">
                      Export Inquiries &amp; Tech Packs
                    </span>
                    <a
                      href="mailto:export@fashionknits.com"
                      className="text-xs sm:text-sm font-mono text-charcoal/80 hover:text-accent transition-colors block mt-1"
                    >
                      export@fashionknits.com
                    </a>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-charcoal text-accent flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent block font-semibold">
                      Telephone &amp; Switchboard
                    </span>
                    <a
                      href="tel:+914212370000"
                      className="text-xs sm:text-sm font-mono text-charcoal/80 hover:text-accent transition-colors block mt-1"
                    >
                      +91 421 237 0000
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-charcoal text-accent flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent block font-semibold">
                      Manufacturing Hours (IST)
                    </span>
                    <p className="text-xs sm:text-sm font-mono text-charcoal/80 mt-1">
                      Mon – Sat: 09:00 – 19:00 IST (UTC +5:30)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-charcoal/10 text-xs font-mono text-muted-gray">
              <span>RESPONSE TIME: WITHIN 24 BUSINESS HOURS</span>
            </div>
          </div>

          {/* Right Column: Technical Inquiry Form */}
          <div className="lg:col-span-7 bg-pure-white p-8 md:p-12 border border-charcoal/10 shadow-sm">
            <h4 className="text-xl font-bold uppercase tracking-wider text-charcoal mb-2">
              Request Production Quotation or Prototype
            </h4>
            <p className="text-xs text-charcoal/70 mb-8 leading-relaxed">
              Submit your inquiry details. Our technical merchandising desk will review your requirements and respond with initial costing, MOQ parameters, and sampling timelines.
            </p>

            {status === 'success' ? (
              <div className="p-8 bg-charcoal text-off-white border border-accent/40 space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="text-sm font-mono font-bold uppercase tracking-wider">
                    Inquiry Successfully Received
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-off-white/80 leading-relaxed">
                  {responseMsg}
                </p>
                {referenceId && (
                  <div className="p-3 bg-white/5 border border-white/10 font-mono text-xs text-accent">
                    Inquiry Reference ID: {referenceId}
                  </div>
                )}
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2.5 bg-accent text-charcoal text-xs font-mono uppercase tracking-widest font-bold cursor-pointer hover:bg-pure-white transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-charcoal/80 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 bg-off-white border border-charcoal/15 text-charcoal text-xs font-mono focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-charcoal/80 mb-2">
                      Company / Brand *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Acme Apparel Ltd"
                      className="w-full px-4 py-3 bg-off-white border border-charcoal/15 text-charcoal text-xs font-mono focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-charcoal/80 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="buyer@brand.com"
                      className="w-full px-4 py-3 bg-off-white border border-charcoal/15 text-charcoal text-xs font-mono focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-charcoal/80 mb-2">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-off-white border border-charcoal/15 text-charcoal text-xs font-mono focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-charcoal/80 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="e.g. United Kingdom"
                      className="w-full px-4 py-3 bg-off-white border border-charcoal/15 text-charcoal text-xs font-mono focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-charcoal/80 mb-2">
                      Product Interest
                    </label>
                    <select
                      id="productInterest"
                      name="productInterest"
                      value={formData.productInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-off-white border border-charcoal/15 text-charcoal text-xs font-mono focus:border-accent focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="T-Shirts">T-Shirts</option>
                      <option value="Polos">Polo Shirts</option>
                      <option value="Sweatshirts">Sweatshirts</option>
                      <option value="Hoodies">Hoodies</option>
                      <option value="Sportswear">Sportswear &amp; Active</option>
                      <option value="Casualwear">Casualwear / Loungewear</option>
                      <option value="Kidswear">Kidswear &amp; Babywear</option>
                      <option value="Custom OEM">Custom Programs / OEM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-charcoal/80 mb-2">
                      Target Qty (Pieces)
                    </label>
                    <input
                      type="text"
                      name="targetQuantity"
                      value={formData.targetQuantity}
                      onChange={handleChange}
                      placeholder="e.g. 1,000 - 5,000"
                      className="w-full px-4 py-3 bg-off-white border border-charcoal/15 text-charcoal text-xs font-mono focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-charcoal/80 mb-2">
                    Project Requirements / Tech Pack Specs *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Specify fabric composition, target GSM, pantone shades, trims, delivery timeline, or sample requirements..."
                    className="w-full px-4 py-3 bg-off-white border border-charcoal/15 text-charcoal text-xs font-mono focus:border-accent focus:outline-none transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="p-4 bg-red-900/10 border border-red-500/30 text-red-600 flex items-center gap-2 text-xs font-mono">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{responseMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-shine w-full py-4 bg-accent text-charcoal text-xs font-mono uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <span>Submit Manufacturing Inquiry</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
