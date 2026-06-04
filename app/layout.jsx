import { Barlow_Condensed, Barlow, Share_Tech_Mono } from 'next/font/google';
import './globals.css';
import './tailwind-colors.css';
import { THEMES } from '../components/theme/useTheme';
//import Navbar from '';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
//import '@/styles/admin.css'; 
const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-display',
});
const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
});
const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
});

export const metadata = {
  title: {
    default: 'ZasChem India Pvt. Ltd. | Industrial Waterproofing & Infrastructure Protection',
    template: '%s | ZasChem India',
  },
  description: "India's trusted specialist in industrial waterproofing, power plant protection, tunnel rehabilitation, acid resistant lining, and structural strengthening. 12+ years. 100+ projects.",
  keywords: ['industrial waterproofing India', 'power plant waterproofing', 'tunnel rehabilitation', 'acid resistant lining', 'structural strengthening'],
  metadataBase: new URL('https://www.zaschem.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'ZasChem India Pvt. Ltd.',
    images: [{ url: '/logo.avif', width: 1200, height: 630, alt: 'ZasChem India' }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${barlow.variable} ${shareTechMono.variable}`}>
      <body className="bg-brand-dark text-brand-light font-body antialiased">
        <div id="theme-root" aria-hidden="true" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}