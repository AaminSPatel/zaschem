import { Barlow_Condensed, Barlow, Share_Tech_Mono } from 'next/font/google';
import './globals.css';
//import { THEMES } from '../components/theme/useTheme';
//import Navbar from '';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import Script from "next/script"; // Import Script component

//import '@/styles/admin.css'; 
const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});
const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
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
//<script src="https://cdn.counter.dev/script.js" data-id="d928e81c-295b-43a0-8a1e-29c2538a8422" data-utcoffset="6"></script>
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${barlow.variable} ${shareTechMono.variable}`}>
      <body className="bg-[#005FcA] text-white font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
         <Script 
          src="https://cdn.counter.dev/script.js" 
          data-id="d928e81c-295b-43a0-8a1e-29c2538a8422" 
          data-utcoffset="6"
          strategy="afterInteractive" // Isse page load hone ke baad script chalegi
        />
      </body>
    </html>
  );
}