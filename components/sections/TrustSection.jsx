'use client';
import { motion } from 'framer-motion';
import { Award, Users, CheckCircle, Clock, Shield, MapPin } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { whyChooseUs, clients } from '@/data/siteData';
import 'swiper/css';

const iconMap = { Award, Users, CheckCircle, Clock, Shield, MapPin };

// Placeholder SVG logos since we don't have real client logos
const ClientLogo = ({ name }) => (
  <div className="flex items-center justify-center h-16 px-8 min-w-[180px] bg-brand-darker border border-brand-border group hover:border-brand-blue/40 transition-all duration-300">
    <div className="text-center">
      <div className="w-6 h-0.5 bg-brand-blue/40 mx-auto mb-2 group-hover:bg-brand-blue transition-colors" />
      <span className="font-display font-bold text-xs text-brand-muted group-hover:text-on-bg transition-colors tracking-widest uppercase whitespace-nowrap">
        {name}
      </span>
    </div>
  </div>
);


export default function ClientsSection() {
  return (
    <section className="py-16 bg-brand-card border-y border-brand-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <div className="section-label justify-center mb-3">TRUSTED BY INDIA'S BEST</div>
        <h2 className="font-display font-black text-2xl md:text-3xl text-on-bg tracking-tight">
          SERVING CRITICAL INFRASTRUCTURE SINCE 2012
        </h2>
      </div>

      {/* Top row marquee */}
      <div className="relative overflow-hidden mb-3">
        <div className="flex gap-3 w-max animate-marquee">
          {[...clients, ...clients].map((c, i) => (
            <ClientLogo key={`top-${i}`} name={c.name} />
          ))}
        </div>
      </div>

      {/* Bottom row reverse */}
      <div className="relative overflow-hidden" style={{ direction: 'rtl' }}>
        <div className="flex gap-3 w-max animate-marquee" style={{ direction: 'ltr' }}>
          {[...clients.slice().reverse(), ...clients.slice().reverse()].map((c, i) => (
            <ClientLogo key={`bot-${i}`} name={c.name} />
          ))}
        </div>
      </div>
    </section>
  );
}