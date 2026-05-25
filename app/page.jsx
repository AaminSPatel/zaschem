

import StatsSection from '../components/sections/StatsSection';
import ServicesSection from '../components/sections/ServiceSection';
import ProductsSection from '../components/sections/ProductsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ClientsSection from '../components/sections/TrustSection';
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTABanner from '../components/sections/CTABanner';
import HeroSection from '../components/sections/Herosection';
import { OrganizationSchema, LocalBusinessSchema, FAQSchema } from '../lib/Schemamarkup';
import { faqs } from './data/siteData';
export const metadata = {
  title: 'ZAS Chem India Pvt. Ltd. | Industrial Waterproofing & Infrastructure Protection',
  description: "India's trusted specialist in industrial waterproofing, power plant protection, tunnel rehabilitation, acid resistant lining and structural strengthening. 12+ years. 100+ projects.",
  keywords: 'industrial waterproofing India, waterproofing contractors, power plant waterproofing, tunnel rehabilitation, acid resistant lining, structural strengthening, ZAS Chem India',
  alternates: { canonical: 'https://www.zaschem.in' },
  openGraph: {
    title: 'ZAS Chem India | Industrial Waterproofing & Infrastructure Protection',
    description: "India's trusted industrial waterproofing specialists. Power plants, tunnels, dams, chemical plants.",
    url: 'https://www.zaschem.in',
    images: [{ url: '/og-home.jpg', width: 1200, height: 630 }],
  },
};
export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <FAQSchema faqs={faqs} />

      <HeroSection />
      <ClientsSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProductsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}




