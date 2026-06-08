'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Building2, Calendar } from 'lucide-react';
import { projects as localProjects } from '@/data/siteData';
import { fetchProjects } from '@/lib/apiClient';
import { useEffect, useMemo, useState } from 'react';
import SectionHeader from '../layout/Header';


export default function ProjectsSection({ limit = 6, showAll = false }) {
  const [projectsList, setProjectsList] = useState(localProjects);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetchProjects();
        const data = res?.data ?? res;
        if (!mounted) return;
        if (Array.isArray(data) && data.length) setProjectsList(data);
      } catch (e) {
        // Keep local fallback
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const displayed = useMemo(() => {
    const list = Array.isArray(projectsList) ? projectsList : [];
    const base = showAll ? list : list.filter((p) => p.featured);
    return base.slice(0, limit);
  }, [projectsList, showAll, limit]);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-[#002147] to-[#003366] relative overflow-hidden text-white">

      <div className="absolute inset-0 grid-lines opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="OUR PORTFOLIO"
          title="INDUSTRIAL PROJECTS"
          subtitle="Real-world solutions delivered for India's most critical infrastructure — from power plants to tunnels to chemical facilities."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {displayed.map((project, i) => (
            <motion.div
              key={i} 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}  // Reduced delay
            >
              <Link 
                href={`/projects/${project.slug}`} 
                className="group block bg-[#004080]/40 border border-white/10 hover:border-[#f77f00] rounded-sm overflow-hidden transition-all duration-200 shadow-lg"
              >
                <div className="relative h-48 overflow-hidden"> 
                  <img
                    src={project.image?.url  ? project?.image?.url  :project?.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"  // Reduced duration
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 bg-[#f77f00] text-white text-[10px] font-mono font-bold tracking-wider rounded-sm">
                      {project.category}
                    </span>
                  </div>
                  
                  <div className="absolute top-3 right-3">
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-[#002147]/90 border border-white/10 text-white text-[10px] font-mono font-bold">
                      <Calendar size={10} className="text-[#fcbf49]" /> {project.year}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-white tracking-wide mb-2 group-hover:text-[#fcbf49] transition-colors duration-200">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mb-3 text-[11px] font-semibold text-gray-300">
                    <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-sm">
                      <Building2 size={11} className="text-[#f77f00]" /> {project.client}
                    </span>
                    <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-sm">
                      <MapPin size={11} className="text-[#64dfdf]" /> {project.location}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4 bg-[#002147]/80 p-3 border border-white/5 rounded-sm">
                    <p className="text-[11px] leading-relaxed text-gray-300">
                      <strong className="text-[#f77f00] text-[10px]">CHALLENGE:</strong> {project.problem}
                    </p>
                    <p className="text-[11px] leading-relaxed text-gray-200 border-t border-white/5 pt-1">
                      <strong className="text-[#64dfdf] text-[10px]">SOLUTION:</strong> {project.solution.substring(0, 100)}...
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-white/5 text-gray-400 text-[9px] font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1 text-[#fcbf49] text-xs font-bold group-hover:text-[#f77f00] transition-colors duration-200">
                    VIEW CASE STUDY <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-10">
            <Link 
              href="/projects" 
              className="group inline-flex items-center gap-2 bg-[#f77f00] hover:bg-white text-white hover:text-[#002147] font-bold py-2.5 px-6 rounded-sm transition-all duration-200 shadow-md text-sm"
            >
              VIEW ALL PROJECTS 
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}