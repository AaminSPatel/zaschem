'use client';
import { motion } from 'framer-motion';
import { clients } from '@/data/siteData';

const ClientLogo = ({ name, logo }) => (
  <div className="flex items-center justify-center h-20 px-6 min-w-[190px] bg-white border border-[#002147]/10 rounded-sm group hover:border-[#f77f00] transition-all duration-300 shadow-sm hover:shadow-md">
    <img 
      src={logo} 
      alt={`${name} - Client of Zaschem India Pvt Ltd`} 
      className="h-10 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
    />
  </div>
);

export default function ClientsSection() {
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 border-y border-[#002147]/10 overflow-hidden relative">
      <div className="absolute inset-0 grid-lines opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <div className="inline-flex text-xs font-mono font-bold tracking-widest text-[#f77f00] bg-[#f77f00]/10 px-3 py-1 mb-3 rounded-sm">
          TRUSTED BY INDIA'S BEST
        </div>
        <h2 className="font-display font-black text-2xl md:text-3xl text-[#002147] tracking-tight">
          SERVING CRITICAL INFRASTRUCTURE SINCE 2012
        </h2>
      </div>

      {/* Slide Marquee Top row */}
      <div className="relative overflow-hidden mb-4 w-full flex">
        <motion.div 
          className="flex gap-4 w-max"
          animate={{ x: [0, '-50%'] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
        >
          {duplicatedClients.map((c, i) => (
            <ClientLogo key={`top-${i}`} name={c.name} logo={c.logo}/>
          ))}
        </motion.div>
      </div>

      {/* Slide Marquee Bottom Reverse row */}
      <div className="relative overflow-hidden w-full flex">
        <motion.div 
          className="flex gap-4 w-max"
          animate={{ x: ['-50%', 0] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
        >
          {duplicatedClients.map((c, i) => (
            <ClientLogo key={`bot-${i}`} name={c.name} logo={c.logo}/>
          ))}
        </motion.div>
      </div>
    </section>
  );
}