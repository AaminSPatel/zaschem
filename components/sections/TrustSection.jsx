'use client';
import { motion } from 'framer-motion';
import { Award, Users, CheckCircle, Clock, Shield, MapPin } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { whyChooseUs, clients } from '@/data/siteData';
import 'swiper/css';

const iconMap = { Award, Users, CheckCircle, Clock, Shield, MapPin };

const ClientLogo = ({ name, logo }) => (
  <div className="flex items-center justify-center h-16 px-2 min-w-[180px]  border border-brand-border group hover:border-brand-blue/40 transition-all duration-300">
    <div className="text-center">
      {/* <div className="w-6 h-0 bg-brand-blue/40 mx-auto group-hover:bg-brand-blue transition-colors" />
       */}<img 
        src={logo} 
        alt={`${name} - Client of Zaschem India Pvt Ltd`} 
        className='h-16 object-contain'
      />
    </div>
  </div>
);

export default function ClientsSection() {
  // Array ko double kar rahe hain taaki infinite loop smooth dikhe
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-16 bg-brand-card border-y border-brand-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <div className="section-label justify-center mb-3">TRUSTED BY INDIA'S BEST</div>
        <h2 className="font-display font-black text-2xl md:text-3xl text-on-bg tracking-tight">
          SERVING CRITICAL INFRASTRUCTURE SINCE 2012
        </h2>
      </div>

      {/* Top row marquee (Left to Right / Normal) */}
      <div className="relative overflow-hidden mb-6 w-full">
        <motion.div 
          className="flex gap-3 w-max"
          animate={{ x: [0, '-50%'] }}
          transition={{
            ease: "linear",
            duration: 45,
            repeat: Infinity,
          }}
        >
          {duplicatedClients.map((c, i) => (
            <ClientLogo key={`top-${i}`} name={c.name} logo={c.logo}/>
          ))}
        </motion.div>
      </div>

      {/* Bottom row reverse marquee (Right to Left) */}
      <div className="relative overflow-hidden w-full">
        <motion.div 
          className="flex gap-3 w-max"
          animate={{ x: ['-50%', 0] }} // Isko ulta kar diya taaki reverse chale
          transition={{
            ease: "linear",
            duration: 45,
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