'use client';

import React, { useState, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MapPin, Mail, Phone, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

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
    <section id="contact" className="bg-charcoal text-off-white py-28 md:py-36 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <SectionHeading
          title={"LET'S BUILD\nWHAT'S NEXT."}
          subtitle="Connect with Fashion Knits for manufacturing partnerships, OEM garment production, sample requests, and global export sourcing."
          light={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 md:mt-20">
          {/* Left Column: Direct Commercial & Merchandising Contacts */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent block mb-3">
                Export Merchandising Division
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-off-white mb-6">
                Direct Buyer Inquiries &amp; Factory Visits
              </h3>
              <p className="text-sm text-off-white/70 leading-relaxed mb-8">
                Our technical merchandising team handles tech pack reviews, lab dips, Proto &amp; SMS sample development, cost breakdowns, and production scheduling for international brands.
              </p>

              {/* Contact Details List */}
              <div className="space-y-6 pt-6 border-t border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-gray block">
                      Manufacturing Facility &amp; Head Office
                    </span>
                    <p className="text-xs sm:text-sm text-off-white leading-relaxed mt-0.5">
                      Fashion Knits, Apparel Park, Eettiveerampalayam,<br />
                      Avinashi, Tirupur – 641 666, Tamil Nadu, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-gray block">
                      Export Desk Email
                    </span>
                    <a
                      href="mailto:export@fashionknits.com"
                      className="text-xs sm:text-sm text-accent hover:underline font-mono"
                    >
                      export@fashionknits.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-gray block">
                      Telephone &amp; WhatsApp
                    </span>
                    <a
                      href="tel:+914212370000"
                      className="text-xs sm:text-sm text-off-white hover:text-accent font-mono"
                    >
                      +91 421 237 0000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-gray block">
                      Operating Hours
                    </span>
                    <p className="text-xs sm:text-sm text-off-white/80 font-mono">
                      Monday – Saturday: 09:00 – 18:00 IST (UTC +5:30)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/5 border border-white/10 text-xs font-mono text-muted-gray">
              <span className="text-accent font-bold">COMPLIANCE NOTICE:</span> Non-Disclosure Agreements (NDAs) and customer confidentiality strictly respected for proprietary tech packs and artworks.
            </div>
          </div>

          {/* Right Column: Functional Inquiry Form */}
          <div className="lg:col-span-7 bg-[#171514] border border-white/10 p-8 sm:p-10 md:p-12">
            <h4 className="text-lg font-bold uppercase tracking-wider text-off-white mb-2">
              Manufacturing &amp; Sourcing Inquiry
            </h4>
            <p className="text-xs text-off-white/60 mb-8 font-mono">
              Fill out this form to connect with our export merchandising team.
            </p>

            {status === 'success' ? (
              <div className="p-8 bg-charcoal border border-accent/40 text-center space-y-4">
                <div className="w-12 h-12 bg-accent/10 border border-accent rounded-full flex items-center justify-center text-accent mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h5 className="text-xl font-bold uppercase tracking-tight text-off-white">
                  Inquiry Successfully Transmitted
                </h5>
                <p className="text-xs sm:text-sm text-off-white/70 max-w-md mx-auto leading-relaxed">
                  {responseMsg}
                </p>
                <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 text-xs font-mono text-accent">
                  Reference: {referenceId}
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        country: '',
                        productInterest: 'T-Shirts',
                        targetQuantity: '',
                        message: '',
                      });
                    }}
                    className="px-6 py-2 border border-white/20 text-xs font-mono uppercase tracking-wider text-off-white hover:border-accent hover:text-accent transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="p-4 bg-red-950/50 border border-red-500/40 text-red-200 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                    <span>{responseMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="text-xs uppercase font-mono tracking-widest text-off-white/60 mb-2 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Jenkins"
                      className="bg-transparent border-b border-off-white/20 text-off-white py-2.5 w-full focus:border-accent focus:outline-none transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="text-xs uppercase font-mono tracking-widest text-off-white/60 mb-2 block">
                      Company / Brand Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Apex Apparel Ltd"
                      className="bg-transparent border-b border-off-white/20 text-off-white py-2.5 w-full focus:border-accent focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="text-xs uppercase font-mono tracking-widest text-off-white/60 mb-2 block">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="s.jenkins@brand.com"
                      className="bg-transparent border-b border-off-white/20 text-off-white py-2.5 w-full focus:border-accent focus:outline-none transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="text-xs uppercase font-mono tracking-widest text-off-white/60 mb-2 block">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="bg-transparent border-b border-off-white/20 text-off-white py-2.5 w-full focus:border-accent focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="country" className="text-xs uppercase font-mono tracking-widest text-off-white/60 mb-2 block">
                      Destination Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="e.g. United Kingdom"
                      className="bg-transparent border-b border-off-white/20 text-off-white py-2.5 w-full focus:border-accent focus:outline-none transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="productInterest" className="text-xs uppercase font-mono tracking-widest text-off-white/60 mb-2 block">
                      Product Category Interest
                    </label>
                    <select
                      id="productInterest"
                      name="productInterest"
                      value={formData.productInterest}
                      onChange={handleChange}
                      className="bg-charcoal border-b border-off-white/20 text-off-white py-2.5 w-full focus:border-accent focus:outline-none transition-colors text-sm cursor-pointer"
                    >
                      <option value="T-Shirts">T-Shirts (160–220 GSM)</option>
                      <option value="Polos">Polos (Pique / Honeycomb)</option>
                      <option value="Sweatshirts">Sweatshirts (French Terry)</option>
                      <option value="Hoodies">Hoodies (Fleece / Brushed)</option>
                      <option value="Sportswear">Sportswear &amp; Active</option>
                      <option value="Casualwear">Casualwear &amp; Loungewear</option>
                      <option value="Kidswear">Kidswear (Baby-Safe Organic)</option>
                      <option value="Custom OEM">Custom Bespoke Tech Pack</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="targetQuantity" className="text-xs uppercase font-mono tracking-widest text-off-white/60 mb-2 block">
                    Estimated Order Volume (Pcs)
                  </label>
                  <input
                    type="text"
                    id="targetQuantity"
                    name="targetQuantity"
                    value={formData.targetQuantity}
                    onChange={handleChange}
                    placeholder="e.g. 1,000 – 5,000 pcs per style"
                    className="bg-transparent border-b border-off-white/20 text-off-white py-2.5 w-full focus:border-accent focus:outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-xs uppercase font-mono tracking-widest text-off-white/60 mb-2 block">
                    Project Scope / Specifications
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide fabric details, target delivery window, certifications required, or tech pack notes..."
                    className="bg-transparent border border-off-white/20 p-3 text-off-white w-full focus:border-accent focus:outline-none transition-colors text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-accent text-charcoal text-xs font-mono uppercase tracking-[0.2em] font-bold hover:bg-pure-white transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <span>Transmit Manufacturing Inquiry →</span>
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
