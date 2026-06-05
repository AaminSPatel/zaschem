'use client';
import { motion } from 'framer-motion';
import { Award, Users, CheckCircle, Clock, Shield, MapPin } from 'lucide-react';
import { whyChooseUs, clients } from '@/data/siteData';
import SectionHeader from '../layout/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const iconMap = { Award, Users, CheckCircle, Clock, Shield, MapPin };
const C = {
  bgDeep:  'var(--zas-bg-deep, #010e1f)',
  bgCard:  'var(--zas-card, #031a38)',
  blue:    'var(--zas-blue, #0082FB)',
  orange:  'var(--zas-orange, #FF8800)',
  white:   'var(--zas-text, #FFFFFF)',
  muted:   'var(--zas-muted, rgba(255,255,255,0.65))',
  border:  'var(--zas-border, rgba(255,255,255,0.15))',
};

export default function WhyChooseUsSection() {
  return (
    <section className="py-24 relative bg-gradient-to-br from-[#002147] via-[#002f6c] to-[#003366] relative overflow-hidden text-white">
     {/*  <div className="absolute inset-0 grid-lines opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(100,223,223,0.05),transparent_40%)]" />
       */}
       <motion.div 
       initial={{scale:0.9,opacity:0.2}}
       whileInView={{scale:1.8,opacity:0.4}}
       transition={{ duration: 27.7 }}
       className=' scale-130' style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize:'60px 80px', opacity:0.25, pointerEvents:'none' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Image & Experience Badge */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative overflow-hidden border border-white/10 rounded-sm">
              <img
                src="/p4.avif"
                alt="Industrial waterproofing experts"
                className="w-full h-[500px] object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/60 to-transparent" />
              <div className="absolute top-0 left-0 w-10 h-10 border-t-[3px] border-l-[3px] border-[#64dfdf]" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-[3px] border-r-[3px] border-[#f77f00]" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#002147] border border-white/10 p-6 shadow-2xl rounded-sm">
              <p className="font-display font-black text-4xl text-[#f77f00] drop-shadow-sm">12+</p>
              <p className="font-mono text-[10px] text-white tracking-widest mt-1">YEARS OF EXCELLENCE</p>
            </div>
          </motion.div>

          {/* Right Column: Text & Features Grid */}
          <div className="order-1 lg:order-2">
            <SectionHeader
              label="WHY CHOOSE US"
              title="ENGINEERING TRUST. DELIVERING EXCELLENCE."
              subtitle="Certified engineers, proven materials, and rigorous QC — every project, every time."
              centered={false}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {whyChooseUs.map((item, i) => {
                const Icon = iconMap[item.icon] || Award;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-4 p-5 bg-[#004080]/30 border border-white/5 hover:border-[#f77f00] transition-all duration-300 group rounded-sm backdrop-blur-sm"
                  >
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#f77f00]/20 transition-colors border border-white/5">
                      <Icon size={20} className="text-[#64dfdf] group-hover:text-[#f77f00] transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-white mb-1 tracking-wide group-hover:text-[#fcbf49] transition-colors">{item.title}</h4>
                      <p className="text-gray-300 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Client Logos Carousel */}
        {clients && clients.length > 0 && (
          <div className="mt-24 pt-12 border-t border-white/10">
            <p className="font-mono text-[10px] tracking-[0.3em] text-gray-300 uppercase text-center mb-8">TRUSTED BY LEADING ENTERPRISES</p>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={2}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
              }}
              className="w-full"
            >
              {clients.map((client, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex items-center justify-center h-20 px-6 bg-[#002147]/80 border border-white/5 group hover:border-[#f77f00] transition-all duration-300 rounded-sm">
                    <div className="text-center">
                      <div className="w-6 h-0.5 bg-[#64dfdf]/40 mx-auto mb-2 group-hover:bg-[#f77f00] transition-colors" />
                      <span className="font-display font-bold text-xs text-gray-300 group-hover:text-white transition-colors tracking-widest uppercase whitespace-nowrap">
                        {client.name || client}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}