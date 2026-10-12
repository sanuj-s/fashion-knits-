'use client';

import React, { useRef, useEffect } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { fadeInUp, gsap, ScrollTrigger } from '@/lib/animations';
import { useReducedMotion } from '@/lib/hooks';

export function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!prefersReducedMotion && sectionRef.current) {
      fadeInUp(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }
  }, [prefersReducedMotion]);

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* TODO: Connect to backend email service (e.g., SendGrid, Nodemailer, or API route) */
    alert('Form submitted - connect backend service');
  };

  return (
    <section id="contact" ref={sectionRef} className="bg-charcoal py-32 md:py-40 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title={"LET'S BUILD\nWHAT'S NEXT."} 
          subtitle="Connect with Fashion Knits for manufacturing and sourcing partnerships." 
          light={true} 
        />
        
        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <button 
            onClick={scrollToForm}
            className="bg-accent text-charcoal px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-accent/90 transition-colors cursor-pointer"
          >
            Send an Inquiry
          </button>
          <button 
            onClick={scrollToForm}
            className="border border-off-white/30 text-off-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-off-white/10 transition-colors cursor-pointer"
          >
            Contact Us
          </button>
        </div>

        <form 
          id="inquiry-form" 
          ref={formRef} 
          onSubmit={handleSubmit}
          className="mt-20 max-w-4xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label htmlFor="name" className="text-xs uppercase tracking-widest text-off-white/50 mb-2 block">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                required 
                className="bg-transparent border-b border-off-white/20 text-off-white py-3 w-full focus:border-accent focus:outline-none transition-colors text-sm"
              />
            </div>
            <div>
              <label htmlFor="company" className="text-xs uppercase tracking-widest text-off-white/50 mb-2 block">Company</label>
              <input 
                type="text" 
                id="company" 
                name="company"
                className="bg-transparent border-b border-off-white/20 text-off-white py-3 w-full focus:border-accent focus:outline-none transition-colors text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xs uppercase tracking-widest text-off-white/50 mb-2 block">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                required 
                className="bg-transparent border-b border-off-white/20 text-off-white py-3 w-full focus:border-accent focus:outline-none transition-colors text-sm"
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-xs uppercase tracking-widest text-off-white/50 mb-2 block">Phone</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone"
                className="bg-transparent border-b border-off-white/20 text-off-white py-3 w-full focus:border-accent focus:outline-none transition-colors text-sm"
              />
            </div>
            <div>
              <label htmlFor="country" className="text-xs uppercase tracking-widest text-off-white/50 mb-2 block">Country</label>
              <input 
                type="text" 
                id="country" 
                name="country"
                className="bg-transparent border-b border-off-white/20 text-off-white py-3 w-full focus:border-accent focus:outline-none transition-colors text-sm"
              />
            </div>
            <div>
              <label htmlFor="productInterest" className="text-xs uppercase tracking-widest text-off-white/50 mb-2 block">Product Interest</label>
              <select 
                id="productInterest" 
                name="productInterest"
                className="bg-charcoal border-b border-off-white/20 text-off-white py-3 w-full focus:border-accent focus:outline-none transition-colors text-sm"
              >
                <option value="T-Shirts">T-Shirts</option>
                <option value="Polos">Polos</option>
                <option value="Sweatshirts">Sweatshirts</option>
                <option value="Hoodies">Hoodies</option>
                <option value="Sportswear">Sportswear</option>
                <option value="Casualwear">Casualwear</option>
                <option value="Kidswear">Kidswear</option>
                <option value="Custom Garments">Custom Garments</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="mb-8">
            <label htmlFor="message" className="text-xs uppercase tracking-widest text-off-white/50 mb-2 block">Message</label>
            <textarea 
              id="message" 
              name="message"
              rows={4}
              className="bg-transparent border border-off-white/20 p-3 text-off-white w-full focus:border-accent focus:outline-none transition-colors text-sm"
            />
          </div>
          <button 
            type="submit" 
            className="bg-accent text-charcoal w-full py-4 text-sm uppercase tracking-widest font-bold mt-8 hover:bg-accent/90 transition-colors cursor-pointer"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </section>
  );
}
