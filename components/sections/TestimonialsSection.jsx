'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/data/siteData';
import SectionHeader from '../layout/Header';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#002147] relative overflow-hidden text-white">
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="CLIENT TESTIMONIALS"
          title="WHAT INDUSTRY LEADERS SAY"
          subtitle="Trusted by chief engineers, project directors, and facility managers across India's leading industrial organizations."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-12"
        >
          {/* Custom Navigation Controllers */}
          <div className="testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden xl:flex w-10 h-10 bg-[#003366] border border-white/10 text-white items-center justify-center cursor-pointer hover:bg-[#f77f00] hover:border-[#f77f00] transition-all rounded-sm">
            <ChevronLeft size={18} />
          </div>
          <div className="testimonial-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden xl:flex w-10 h-10 bg-[#003366] border border-white/10 text-white items-center justify-center cursor-pointer hover:bg-[#f77f00] hover:border-[#f77f00] transition-all rounded-sm">
            <ChevronRight size={18} />
          </div>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.testimonial-dots' }}
            navigation={{ prevEl: '.testimonial-prev', nextEl: '.testimonial-next' }}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-4"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="bg-[#003366]/60 border border-white/10 p-6 md:p-8 rounded-sm h-full flex flex-col hover:border-[#f77f00] transition-all duration-300 relative overflow-hidden group shadow-lg">
                  
                  {/* Decorative Big Back Quote watermark */}
                  <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
                    <Quote size={60} className="text-[#fcbf49]" />
                  </div>

                  {/* Bright Orange Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={13} className="text-[#f77f00] fill-[#f77f00]" />
                    ))}
                  </div>

                  {/* Quote Body text */}
                  <p className="text-gray-100 text-sm md:text-base leading-relaxed italic flex-1 mb-6 relative z-10">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Author Meta Info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <img 
                      src={t.image} 
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/20 group-hover:border-[#f77f00] transition-colors" 
                    />
                    <div>
                      <p className="font-display font-bold text-sm text-white tracking-wide">{t.name}</p>
                      <p className="text-xs text-gray-300">{t.designation}</p>
                      <p className="text-xs text-[#fcbf49] font-mono font-bold uppercase mt-0.5">{t.company}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="testimonial-dots flex justify-center gap-2 mt-8" />
        </motion.div>
      </div>

      <style jsx global>{`
        .testimonial-dots .swiper-pagination-bullet { background: #ffffff !important; opacity: 0.3; }
        .testimonial-dots .swiper-pagination-bullet-active { background: #f77f00 !important; opacity: 1 !important; }
      `}</style>
    </section>
  );
}