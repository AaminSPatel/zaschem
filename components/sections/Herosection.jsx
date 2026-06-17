'use client';
import Link from 'next/link';
import Image from 'next/image'; // 1. Next.js Image इम्पोर्ट करें
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Phone, Shield, CheckCircle2 } from 'lucide-react';
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
    <section className="relative min-h-[500px] h-[70vh] md:h-[100svh] overflow-hidden bg-gradient-to-br from-[#003049] via-[#005f73] to-[#0a9396]">
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
        {heroSlides.map((s, idx) => ( // यहाँ s.id === 1 की जगह index का उपयोग करना ज़्यादा सुरक्षित है
          <SwiperSlide key={s.id}>
            <div className="absolute inset-0 z-0">
              {/* 2. साधारण <img> की जगह Next.js Image का इस्तेमाल */}
              <Image 
                src={s.image} 
                alt={s.title} 
                fill // absolute parent को कवर करने के लिए object-cover के साथ fill ज़रूरी है
                sizes="(max-w-768px) 100vw, 100vw" // मोबाइल पर सिर्फ मोबाइल की चौड़ाई जितनी इमेज डाउनलोड होगी
                className="object-cover opacity-60 blend-multiply" 
                priority={idx === 0} // पहली स्लाइड की इमेज को सबसे पहले लोड और रेंडर करेगा (बिना JS का वेट किए)
                loading={idx === 0 ? undefined : 'lazy'}
                decoding={idx === 0 ? 'sync' : 'async'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/90 via-[#003366]/60 to-[#004080]/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/95 via-[#003366]/40 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,127,0,0.15),transparent_45%)]" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* CONTENT Overlay (बाकी का कोड पहले जैसा ही रहेगा) */}
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full max-w-3xl pt-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fcbf49] text-[#003049] font-mono text-xs font-black tracking-widest uppercase mb-6 rounded-sm shadow-md">
                <Shield size={12} className="fill-[#003049]" />
                ZasChem INDIA PVT. LTD.
              </div>

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

              <p className="font-display font-bold text-lg sm:text-xl text-white tracking-wide mb-4 opacity-95">
                {slide.subtitle}
              </p>

              <p className="hidden sm:block text-gray-100 text-sm md:text-base leading-relaxed mb-4 max-w-xl opacity-90">
                {slide.description}
              </p>

              <div className="flex flex-col gap-2 mb-6 text-white max-w-2xl">
                <div className="flex items-start gap-2 text-xs sm:text-sm font-semibold tracking-wide bg-black/30 backdrop-blur-sm px-3 py-2 rounded border-l-2 border-[#fcbf49]">
                  <CheckCircle2 size={16} className="text-[#fcbf49] shrink-0 mt-0.5" />
                  <span>Equal responsibility of manufacturer and applicator.</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm font-semibold tracking-wide bg-black/30 backdrop-blur-sm px-3 py-2 rounded border-l-2 border-[#64dfdf]">
                  <CheckCircle2 size={16} className="text-[#64dfdf] shrink-0 mt-0.5" />
                  <span>End to End support (Diagnosis &rarr; Rectification &rarr; Warranty).</span>
                </div>
              </div>

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
        .swiper-pagination { bottom: 20px !important;margin-bottom: 4px !important; left: 24px !important; text-align: left !important; }
        .swiper-button-next, .swiper-button-prev { display: none !important; }
      `}</style>

      <div className="absolute right-8 bottom-12 z-30 hidden lg:flex flex-col items-center gap-2">
        <span className="font-mono text-xs text-white/80 tracking-widest" style={{ writingMode: 'vertical-rl' }}>SCROLL DOWN</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={16} className="text-[#f77f00]" />
        </motion.div>
      </div>

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