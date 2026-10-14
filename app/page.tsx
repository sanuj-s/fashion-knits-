import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/sections/About';
import { ManufacturingProcess } from '@/components/sections/ManufacturingProcess';
import { Capabilities } from '@/components/sections/Capabilities';
import { Products } from '@/components/sections/Products';
import { Sustainability } from '@/components/sections/Sustainability';
import { CertificateShowcase } from '@/components/sections/CertificateShowcase';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ManufacturingProcess />
      <Capabilities />
      <Products />
      <Sustainability />
      <CertificateShowcase />
      <Contact />
      <Footer />
    </>
  );
}
