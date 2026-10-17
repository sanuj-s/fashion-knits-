import { Hero } from '@/components/hero/Hero';
import { Products } from '@/components/sections/Products';
import { ManufacturingProcess } from '@/components/sections/ManufacturingProcess';
import { Capabilities } from '@/components/sections/Capabilities';
import { MaterialInnovation } from '@/components/sections/MaterialInnovation';
import { BrandStandards } from '@/components/sections/BrandStandards';
import { CertificateShowcase } from '@/components/sections/CertificateShowcase';
import { About } from '@/components/sections/About';
import { GlobalExport } from '@/components/sections/GlobalExport';
import { Sustainability } from '@/components/sections/Sustainability';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <ManufacturingProcess />
      <Capabilities />
      <MaterialInnovation />
      <BrandStandards context="home" />
      <CertificateShowcase />
      <About />
      <GlobalExport />
      <Sustainability />
      <Contact />
      <Footer />
    </>
  );
}
