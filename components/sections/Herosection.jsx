'use client';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Phone, Shield } from 'lucide-react';
import { heroSlides } from '@/data/siteData';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const slide = heroSlides[activeIdx];

  return (
    <section className="relative min-h-[500px] h-[60vh] md:h-[100svh] overflow-hidden bg-gradient-to-br from-[#003049] via-[#005f73] to-[#0a9396]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        onSlideChange={(swiper) => setActiveIdx(swiper.realIndex % heroSlides.length)}
        className="w-full h-full "
      >
        {heroSlides.map((s) => (
          <SwiperSlide key={s.id}>
            <div className="absolute inset-0 z-0">
              <img 
                src={s.image} 
                alt={s.title} 
                className="w-full h-full object-cover opacity-60 blend-multiply" 
                loading={s.id === 1 ? '' : 'lazy'}
                decoding={s.id === 1 ? '' : 'async'}
              
                fetchPriority={s.id === 1 ? 'high' : 'auto'} 
              />
              {/* Premium Bright Royal Blue Gradients */}
             
              <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/90 via-[#003366]/60 to-[#004080]/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/95 via-[#003366]/40 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,127,0,0.15),transparent_45%)]" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* CONTENT Overlay */}
      <div className="absolute inset-0 z-20 flex items-center md:items-center pointer-events-none">
      
         <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#64dfdf_1px,transparent_1px)] [background-size:24px_24px]" />
          <div 
            style={{ background: 'radial-gradient(circle at 80% 40%, rgba(100,223,223,0.15) 0%, transparent 70%)' }} 
            className="absolute inset-0" 
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pb-15 md:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-3xl pt-14"
            >
              {/* Section Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fcbf49] text-[#003049] font-mono text-xs font-black tracking-widest uppercase mb-6 rounded-sm shadow-md">
                <Shield size={12} className="fill-[#003049]" />
                ZasChem INDIA PVT. LTD.
              </div>

              {/* Title with Balanced Blue, White, and Vivid Orange */}
              <h1 className="font-display text-3xl font-black sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-tight mb-4 drop-shadow-md">
                {slide.title.split(' ').map((word, i) => (
                  <span
                    key={i}
                    className={
                      i % 3 === 1
                        ? 'text-[#f77f00] drop-shadow-[0_2px_8px_rgba(247,127,0,0.4)]'
                        : i % 3 === 2
                          ? 'text-[#64dfdf]'
                          : 'text-white'
                    }
                  >
                    {word}{' '}
                  </span>
                ))}
              </h1>

              {/* Subtitle */}
              <p className="font-display font-bold text-lg sm:text-xl text-white tracking-wide mb-4 opacity-95">
                {slide.subtitle}
              </p>

              {/* Description */}
              <p className="hidden sm:block text-gray-100 text-sm md:text-base leading-relaxed mb-8 max-w-xl opacity-90">
                {slide.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
                <Link 
                  href={slide.cta.href} 
                  className="group inline-flex items-center gap-2 justify-center bg-[#f77f00] hover:bg-[#fcbf49] text-white hover:text-[#003049] font-bold text-sm sm:text-base py-3.5 px-8 transition-all duration-300 shadow-lg shadow-orange-600/30"
                >
                  {slide.cta.label} 
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <a 
                  href="tel:+91-7004298988" 
                  className="group inline-flex items-center gap-2 justify-center bg-white hover:bg-[#f77f00] text-[#003049] hover:text-white font-bold text-sm sm:text-base py-3.5 px-8 transition-all duration-300 shadow-md border border-white/20"
                >
                  <Phone size={15} className="text-[#f77f00] group-hover:text-white transition-colors" /> 
                  CALL NOW
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet { background: #ffffff !important; opacity: 0.5; }
        .swiper-pagination-bullet-active { background: #f77f00 !important; opacity: 1 !important; width: 20px !important; border-radius: 4px !important; }
        .swiper-pagination { bottom: 35px !important; left: 24px !important; text-align: left !important; }
        .swiper-button-next, .swiper-button-prev { display: none !important; }
      `}</style>

      {/* Scroll Down Vertical Trigger */}
      <div className="absolute right-8 bottom-12 z-30 hidden lg:flex flex-col items-center gap-2">
        <span className="font-mono text-xs text-white/80 tracking-widest" style={{ writingMode: 'vertical-rl' }}>SCROLL DOWN</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={16} className="text-[#f77f00]" />
        </motion.div>
      </div>

      {/* Bottom active status bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
        <motion.div
          key={activeIdx}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5.5, ease: 'linear' }}
          className="h-full bg-gradient-to-r from-[#f77f00] to-[#fcbf49]"
        />
      </div>
    </section>
  );
}