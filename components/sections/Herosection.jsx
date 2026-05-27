'use client';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Phone } from 'lucide-react';
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
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        onSlideChange={(swiper) => setActiveIdx(swiper.realIndex % heroSlides.length)}
        className="w-full h-full"
      >
        {heroSlides.map((s) => (
          <SwiperSlide key={s.id}>
            <div className="absolute inset-0 z-0">
<img src={s.image} alt={s.title} className="w-full h-full object-cover" fetchPriority={s.id === 1 ? 'high' : 'auto'} />
              {/* Strong dark gradient — bottom 70% very dark for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-[#060810]/30 to-[#060810]/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#060810]/60 via-[#060810]/30 to-transparent" />
              {/* Additional top dark for logo area */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#060810]/10 to-transparent" />
              <div className="absolute inset-0 grid-lines opacity-15" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* CONTENT — fixed overlay on top of swiper */}
      <div className="absolute inset-0 z-20 flex items-end md:items-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-5 md:px-8 w-full pb-24 md:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl md:ml-12"
            >
              {/* Label */}
              <div className="section-label mb-4 md:mb-5">
                ZasChem INDIA PVT. LTD.
              </div>

              {/* Title */}
              <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-none mb-3 md:mb-4">
                {slide.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 3 === 1 ? 'text-brand-blue' : 'text-white'}>
                    {word}{' '}
                  </span>
                ))}
              </h1>

              {/* Subtitle */}
              <p className="font-display font-semibold text-base sm:text-lg md:text-xl text-brand-orange tracking-wide mb-3 md:mb-4">
                {slide.subtitle}
              </p>

              {/* Description — hidden on very small screens */}
              <p className="hidden sm:block text-white text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-xl opacity-90">
                {slide.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pointer-events-auto">
                <Link href={slide.cta.href} className="btn-primary flex items-center gap-2 justify-center text-sm sm:text-base py-3 sm:py-4 px-6 sm:px-8">
                  {slide.cta.label} <ArrowRight size={16} />
                </Link>
                <a href="tel:+91-7004298988" className="btn-secondary flex items-center gap-2 justify-center text-sm sm:text-base py-3 sm:py-4 px-6 sm:px-8">
                  <Phone size={15} /> CALL NOW
                </a>
              </div>

              {/* Mobile swipe hint */}
              <p className="sm:hidden mt-5 font-mono text-xs text-white  tracking-wider opacity-70">SWIPE TO EXPLORE →</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide dots — repositioned above nav */}
      <style jsx global>{`
        .swiper-pagination { bottom: 80px !important;color:white  !important; left: 24px !important; text-align: left !important; }
        @media(min-width:640px){ .swiper-pagination { bottom: 48px !important;color:white !important; left: 32px !important; } }
        .swiper-button-next, .swiper-button-prev { display: none !important; }
        @media(min-width:1024px){ .swiper-button-next, .swiper-button-prev { display: flex !important; } }
      `}</style>

      {/* Slide counter vertical — desktop */}
      <div className="absolute right-6 bottom-24 z-30 hidden lg:flex flex-col items-center gap-1">
        <span className="font-mono text-xs text-white  tracking-widest" style={{ writingMode: 'vertical-rl' }}>SCROLL DOWN</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={16} className="text-white " />
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-border z-30">
        <motion.div
          key={activeIdx}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5.5, ease: 'linear' }}
          className="h-full bg-brand-blue"
        />
      </div>
    </section>
  );
}