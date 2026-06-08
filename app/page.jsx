import StatsSection from '../components/sections/StatsSection';
import ServicesSection from '../components/sections/ServiceSection';

import ProjectsSection from '../components/sections/ProjectsSection';
import ClientsSection from '../components/sections/TrustSection';
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTABanner from '../components/sections/CTABanner';
import HeroSection from '../components/sections/Herosection';
import CommonIssuesPowerPlantsSection from '../components/sections/CommonIssuesPowerPlantsSection';

import { OrganizationSchema, LocalBusinessSchema, FAQSchema } from '../lib/Schemamarkup';

import { faqs } from './data/siteData';

export const metadata = {
  title: 'ZasChem India Pvt. Ltd. | Industrial Waterproofing & Infrastructure Protection',
  description:
    "India's trusted specialist in industrial waterproofing, power plant protection, tunnel rehabilitation, acid resistant lining and structural strengthening. 12+ years. 100+ projects.",
  keywords:
    'industrial waterproofing India, waterproofing contractors, power plant waterproofing, tunnel rehabilitation, acid resistant lining, structural strengthening, ZasChem India',
  alternates: { canonical: 'https://www.zaschem.in' },
  openGraph: {
    title: 'ZasChem India | Industrial Waterproofing & Infrastructure Protection',
    description:
      'India\'s trusted industrial waterproofing specialists. Power plants, tunnels, dams, chemical plants.',
    url: 'https://www.zaschem.in',
    images: [
      { url: '/og-home.avif', width: 1200, height: 630, alt: 'ZasChem India' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZasChem India | Industrial Waterproofing & Infrastructure Protection',
    description:
      'India\'s trusted industrial waterproofing specialists. Power plants, tunnels, dams, chemical plants.',
    images: ['/og-about.avif'],
  },
};

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <FAQSchema faqs={faqs} />

      <HeroSection />
      <CommonIssuesPowerPlantsSection />
      <ClientsSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUsSection />

      <ProjectsSection />

      <TestimonialsSection />
      <CTABanner />
    </>
  );
}

