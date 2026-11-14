import { Hero } from '@/components/hero/Hero';
import { Products } from '@/components/sections/Products';
import { BuyerProjectExperience } from '@/components/sections/BuyerProjectExperience';
import { Capabilities } from '@/components/sections/Capabilities';
import { WorkforceScale } from '@/components/sections/WorkforceScale';
import { MaterialInnovation } from '@/components/sections/MaterialInnovation';
import { BrandRail } from '@/components/sections/BrandRail';
import { CertificateShowcase } from '@/components/sections/CertificateShowcase';
import { About } from '@/components/sections/About';
import { GlobalExport } from '@/components/sections/GlobalExport';
import { Sustainability } from '@/components/sections/Sustainability';
import { EnquiryCTA } from '@/components/sections/EnquiryCTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <BuyerProjectExperience />
      <Capabilities />
      <WorkforceScale />
      <MaterialInnovation showImageLabel={false} />
      <CertificateShowcase />
      <BrandRail />
      <About />
      <GlobalExport />
      <Sustainability />
      <EnquiryCTA />
      <Footer />
    </>
  );
}
