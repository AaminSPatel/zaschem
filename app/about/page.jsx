// app/about/page.js (Server Component layout template for solid layout execution)
import AboutPage from './aboutClient';

export const metadata = {
  title: 'ZASCHEM INDIA PVT. LTD. | Industrial Waterproofing & Concrete Repair Specialists Since 2013',
  description: 'ZASCHEM INDIA PVT. LTD. is India\'s leading specialized contractor executing turnkey industrial waterproofing (ASTM C-836), structural strengthening, carbon fiber wrapping, acid resistant lining, and chemical-resistant protection for power plants, infrastructure, and industrial buildings. 100+ projects, 25+ power plants, 150+ civil engineers trusted.',
  alternates: { canonical: 'https://www.zaschem.in/about' },
};

export default function Page() {
  return <AboutPage />;
}