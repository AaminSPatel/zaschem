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
    <section className="py-24 bg-brand-darker relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-blue/4 rounded-full blur-3xl pointer-events-none" />

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
          className="relative"
        >
          {/* Custom nav buttons */}
          <div className="testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden lg:flex w-10 h-10 bg-brand-card border border-brand-border items-center justify-center cursor-pointer hover:border-brand-blue hover:text-brand-blue transition-all text-brand-muted">
            <ChevronLeft size={18} />
          </div>
          <div className="testimonial-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden lg:flex w-10 h-10 bg-brand-card border border-brand-border items-center justify-center cursor-pointer hover:border-brand-blue hover:text-brand-blue transition-all text-brand-muted">
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
                <div className="card-industrial p-7 h-full flex flex-col hover:border-brand-blue/40 transition-all duration-300 relative overflow-hidden group">
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Background quote watermark */}
                  <div className="absolute top-4 right-4 opacity-5 pointer-events-none">
                    <Quote size={80} className="text-brand-blue" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={13} className="text-brand-orange fill-brand-orange" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-brand-light text-sm leading-relaxed italic flex-1 mb-6 relative z-10">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-5 border-t border-brand-border">
                    <img src={t.image} alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-brand-border group-hover:border-brand-blue transition-colors" />
                    <div>
                      <p className="font-display font-bold text-sm text-on-bg tracking-wide">{t.name}</p>
                      <p className="text-xs text-brand-muted">{t.designation}</p>
                      <p className="text-xs text-brand-orange font-mono mt-0.5">{t.company}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="testimonial-dots flex justify-center gap-2 mt-8" />
        </motion.div>
      </div>
    </section>
  );
}