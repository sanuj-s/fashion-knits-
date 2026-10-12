import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/sections/About';
import { ManufacturingProcess } from '@/components/sections/ManufacturingProcess';
import { Capabilities } from '@/components/sections/Capabilities';
import { Products } from '@/components/sections/Products';
import { Quality } from '@/components/sections/Quality';
import { Certifications } from '@/components/sections/Certifications';
import { Sustainability } from '@/components/sections/Sustainability';
import { GlobalExport } from '@/components/sections/GlobalExport';
import { FactoryVideo } from '@/components/sections/FactoryVideo';
import { CompanyStory } from '@/components/sections/CompanyStory';
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
      <Quality />
      <Certifications />
      <Sustainability />
      <GlobalExport />
      <FactoryVideo />
      <CompanyStory />
      <Contact />
      <Footer />
    </>
  );
}
