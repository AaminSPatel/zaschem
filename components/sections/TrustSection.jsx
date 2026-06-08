'use client';
import { clients } from '@/data/siteData';

const ClientLogo = ({ name, logo }) => (
  <div className="flex items-center justify-center h-16 px-5 min-w-[170px] bg-white border border-[#002147]/10 rounded-sm group hover:border-[#f77f00] transition-all duration-200 shadow-sm">
    <img 
      src={logo} 
      alt={`${name} - Client of ZASCHEM India`} 
      className="h-8 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-200"
      loading="lazy"
    />
  </div>
);

export default function ClientsSection() {
  // Pure CSS marquee - no framer-motion animation
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 border-y border-[#002147]/10 overflow-hidden relative">
      <div className="absolute inset-0 grid-lines opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <div className="inline-flex text-xs font-mono font-bold tracking-widest text-[#f77f00] bg-[#f77f00]/10 px-3 py-1 mb-3 rounded-sm">
          TRUSTED BY INDIA'S BEST
        </div>
        <h2 className="font-display font-black text-xl md:text-2xl text-[#002147] tracking-tight">
          SERVING CRITICAL INFRASTRUCTURE SINCE 2013
        </h2>
      </div>

      {/* Pure CSS Marquee - No JavaScript animation */}
      <div className="relative overflow-hidden w-full">
        <div className="animate-marquee flex gap-4 w-max">
          {[...clients, ...clients].map((c, i) => (
            <ClientLogo key={`top-${i}`} name={c.name} logo={c.logo} />
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden w-full mt-3">
        <div className="animate-marquee-reverse flex gap-4 w-max">
          {[...clients, ...clients].reverse().map((c, i) => (
            <ClientLogo key={`bot-${i}`} name={c.name} logo={c.logo} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
      `}</style>
    </section>
  );
}