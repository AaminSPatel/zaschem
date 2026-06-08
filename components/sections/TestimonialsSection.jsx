'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials as localTestimonials } from '@/data/siteData';
import { fetchTestimonials } from '@/lib/apiClient';
import SectionHeader from '../layout/Header';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(localTestimonials);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetchTestimonials({ page: 1, limit: 10 });
        const data = res?.data ?? res;
        if (!mounted) return;
        if (Array.isArray(data) && data.length) setTestimonials(data);
      } catch (e) {
        // Keep local fallback
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-16 md:py-20 bg-[#002147] relative overflow-hidden text-white">
      <div className="absolute inset-0 grid-lines opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="CLIENT TESTIMONIALS"
          title="WHAT INDUSTRY LEADERS SAY"
          subtitle="Trusted by chief engineers, project directors, and facility managers across India's leading industrial organizations."
        />

        <div className="flex items-center justify-between gap-4 flex-wrap mt-8">
          <div className="text-xs text-[#64dfdf] font-mono font-bold tracking-widest uppercase">
            Want to share your experience?
          </div>
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 bg-[#f77f00]/90 hover:bg-[#fcbf49] text-[#002147] font-mono font-bold text-xs tracking-widest py-3 px-6 transition-all duration-300 rounded-sm shadow-md"
          >
            Submit Testimonial
            <span aria-hidden>→</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative mt-10"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id || t._id}>
                <div className="bg-[#003366]/60 border border-white/10 p-5 rounded-sm h-full flex flex-col hover:border-[#f77f00] transition-all duration-200 shadow-md">
                  <div className="absolute top-3 right-3 opacity-5 pointer-events-none">
                    <Quote size={50} className="text-[#fcbf49]" />
                  </div>

                  <div className="flex gap-0.5 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={11} className="text-[#f77f00] fill-[#f77f00]" />
                    ))}
                  </div>

                  <p className="text-gray-200 text-sm leading-relaxed italic flex-1 mb-4 relative z-10 line-clamp-4">
                    &ldquo;{t.review}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                    <img
                      src={t.image?.url || './user.png'}
                      alt={t.clientName}
                      className="w-10 h-10 rounded-full object-cover border border-white/20"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-display font-bold text-sm text-white">{t.clientName}</p>
                      <p className="text-[10px] text-gray-300">{t.designation}</p>
                      <p className="text-[9px] text-[#fcbf49] font-mono font-bold mt-0.5">{t.company}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet { background: #ffffff !important; opacity: 0.3; }
        .swiper-pagination-bullet-active { background: #f77f00 !important; opacity: 1 !important; }
        .swiper-pagination { bottom: 0 !important; }
      `}</style>
    </section>
  );
}

