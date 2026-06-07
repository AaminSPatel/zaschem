'use client';

import Head from "next/head";
import Link from "next/link";
import {
  MapPin,
  Building2,
  ArrowRight,
  ChevronRight,
  Calendar,
  Shield,
  Layers,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CTABanner from "@/components/sections/CTABanner";
import { fetchProjects } from "@/lib/apiClient";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetchProjects();
        const data = res?.data ?? res;
        if (!mounted) return;
        setProjects(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!mounted) return;
        setError(e?.message || 'Failed to load industrial projects');
        setProjects([]);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const categories = useMemo(() => {
    const catList = Array.isArray(projects) ? projects.map((p) => p.category).filter(Boolean) : [];
    return ["All", ...new Set(catList)];
  }, [projects]);

  return (
    <div style={{ backgroundColor: '#002147' }} className="min-h-screen text-gray-200 font-sans overflow-x-hidden">
      <Head>
        <title>Industrial Project Portfolio | ZasChem India</title>
        <meta name="description" content="Explore ZasChem India's dynamic portfolio of completed turnkey industrial waterproofing, sub-surface tunnel lining repair, thermal power plant protection, and carbon fiber structural strengthening projects across major national corridors." />
        <meta name="keywords" content="industrial waterproofing projects India, power plant waterproofing portfolio, tunnel repair case studies, carbon fiber wrapping deployments, heavy crystalline civil asset waterproofing" />
        <link rel="canonical" href="https://www.zaschem.in/projects" />
        <meta property="og:title" content="Industrial Project Portfolio | ZasChem India" />
        <meta property="og:description" content="Explore ZasChem India's dynamic portfolio of completed turnkey industrial waterproofing, sub-surface tunnel lining repair, thermal power plant protection, and carbon fiber structural strengthening projects across major national corridors." />
        <meta property="og:url" content="https://www.zaschem.in/projects" />
        <meta property="og:image" content="/logo.avif" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Industrial Project Portfolio | ZasChem India" />
        <meta name="twitter:description" content="Explore ZasChem India's dynamic portfolio of completed turnkey industrial waterproofing, sub-surface tunnel lining repair, thermal power plant protection, and carbon fiber structural strengthening projects across major national corridors." />
        <meta name="twitter:image" content="/logo.avif" />
      </Head>

      {/* Premium Royal Blue Hero Block */}
      <section style={{ backgroundColor: '#001a38' }} className="relative py-28 lg:py-36 border-b border-blue-950">
  <div className="absolute inset-0 z-0">
          <img 
            src="./a1.avif" 
            alt="Industrial building infrastructure and concrete structural engineering site" 
            className="w-full h-full object-cover opacity-85 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#002147]/65 via-[#002255]/80 to-[#002147]" />
          <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
        </div>
        
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#64dfdf] z-10" />

         <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#64dfdf_1px,transparent_1px)] [background-size:24px_24px]" />
          <div 
            style={{ background: 'radial-gradient(circle at 80% 40%, rgba(100,223,223,0.15) 0%, transparent 70%)' }} 
            className="absolute inset-0" 
          />
        </div>



        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-mono">
            <Link href="/" className="hover:text-[#64dfdf] transition-colors">HOME</Link>
            <ChevronRight size={12} className="text-gray-600" />
            <span style={{ color: '#f77f00' }} className="font-bold">PROJECTS</span>
          </nav>
          
          <div style={{ backgroundColor: 'rgba(100,223,223,0.08)', borderColor: 'rgba(100,223,223,0.2)', color: '#64dfdf' }} className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] uppercase px-3 py-1.5 border rounded-sm mb-4">
            <Layers size={12} /> PROVEN CIVIL ENGINEERING TRACK RECORD
          </div>
          
          <h1 style={{ color: '#ffffff' }} className="font-display font-black text-4xl md:text-6xl tracking-tight leading-none mb-6">
            INDUSTRIAL<br />
            <span style={{ color: '#f77f00' }}>CASE STUDIES</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl leading-relaxed">
            Explore over 100+ high-risk civil execution layouts successfully handled across India&apos;s heavy structural assets. From public sector thermal power units to aggressive dynamic chemical retention sumps, our detailed case logs highlight complex substrate diagnostics, material configuration designs, and long-term durability metrics.
          </p>
        </div>
      </section>

      {/* Stats Counter Strip */}
      <section style={{ backgroundColor: '#001a38' }} className="border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-x divide-blue-950/50">
          {[
            ["100+", "Turnkey Executions"],
            ["25+", "Power & Energy Plants"],
            ["15+", "Industrial Corridors"],
            ["12+", "Years of Blueprint Trust"],
          ].map(([val, label]) => (
            <div key={label} className="px-6 text-center md:text-left">
              <p style={{ color: '#ffffff' }} className="font-display font-black text-3xl md:text-4xl">{val}</p>
              <p style={{ color: '#64dfdf' }} className="font-mono text-[11px] uppercase tracking-wider mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deep Filter System */}
      <section className="py-10 bg-[#002147]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 text-xs font-mono tracking-widest transition-all cursor-pointer border rounded-sm uppercase"
                style={{
                  backgroundColor: cat === "All" ? '#64dfdf' : '#001a38',
                  color: cat === "All" ? '#001a38' : '#gray-300',
                  borderColor: cat === "All" ? '#64dfdf' : 'rgba(255,255,255,0.05)',
                  fontWeight: cat === "All" ? 'bold' : 'normal'
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Projects Matrix */}
      <section className="pb-16 bg-[#002147]">
        <div className="max-w-7xl mx-auto px-6">
          {loading && (
            <div className="py-20 font-mono text-sm tracking-widest text-gray-400 animate-pulse">RETRIEVING SECURE DATABASE SHEETS...</div>
          )}
          {!loading && error && (
            <div className="py-20 text-red-400 font-mono text-sm border border-red-950/50 p-6 bg-red-950/10">{error}</div>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug}`}
                  style={{ backgroundColor: '#001a38', borderColor: 'rgba(255,255,255,0.05)' }}
                  className="group relative border rounded-sm overflow-hidden hover:border-blue-900 transition-all duration-300 shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden bg-[#002147]">
                    <img
                      src={project.image?.url || '/fallback-panel.jpg'}
                      alt={project.title}
                      className="w-full h-full object-cover filter grayscale contrast-115 opacity-80 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001a38] via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                      <span style={{ backgroundColor: '#002147', color: '#64dfdf', borderColor: 'rgba(100,223,223,0.3)' }} className="px-2.5 py-1 text-[10px] font-mono border tracking-wider uppercase font-bold">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span style={{ backgroundColor: '#f77f00', color: '#ffffff' }} className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase font-bold">
                          CRITICAL ASSET
                        </span>
                      )}
                    </div>
                    
                    <div style={{ backgroundColor: 'rgba(0,26,56,0.85)', borderColor: 'rgba(255,255,255,0.05)' }} className="absolute bottom-4 right-4 flex items-center gap-1.5 px-2.5 py-1 border rounded-sm">
                      <Calendar size={11} style={{ color: '#fcbf49' }} />
                      <span style={{ color: '#fcbf49' }} className="font-mono text-xs font-bold">{project.year}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h2 style={{ color: '#ffffff' }} className="font-display font-black text-xl group-hover:text-[#64dfdf] transition-colors leading-tight uppercase tracking-tight">
                      {project.title}
                    </h2>
                    
                    <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-400">
                      <span className="flex items-center gap-1">
                        <Building2 size={12} style={{ color: '#f77f00' }} />
                        {project.client}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} style={{ color: '#64dfdf' }} />
                        {project.location}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-400 leading-relaxed border-t border-blue-950/60 pt-3">
                      <span style={{ color: '#f77f00' }} className="font-mono font-bold tracking-wider uppercase block mb-1">Substrate Leakage Diagnosis:</span>
                      {project.problem?.substring(0, 110)}...
                    </p>

                    <div className="flex flex-wrap gap-1 pt-2">
                      {(project.tags || []).map((tag) => (
                        <span key={tag} style={{ backgroundColor: '#002147', borderColor: 'rgba(255,255,255,0.05)' }} className="px-2 py-0.5 border text-[10px] font-mono text-gray-400 rounded-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div style={{ color: '#64dfdf' }} className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest pt-2 group-hover:text-white transition-colors">
                      EVALUATE ANALYSIS PACKET <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Informational Rich Content Block for Technical SEO (400+ Words) */}
      <section style={{ backgroundColor: '#001a38' }} className="py-20 border-t border-blue-950">
        <div className="max-w-4xl mx-auto px-6 space-y-6 text-sm md:text-base text-gray-400 leading-relaxed">
          <h3 style={{ color: '#ffffff' }} className="font-display font-black text-2xl tracking-tight uppercase">
            Rigorous Methodology in Industrial Civil Asset Rehabilitation
          </h3>
          <p>
            Industrial complexes across India face catastrophic structural hazards due to dynamic environmental stresses, constant vibration, chemical storage seepage, and high hydrostatic pressure setup inside deep basements. Standard commercial waterproofing methods fail almost immediately when exposed to these manufacturing environments. As specialized <strong>industrial waterproofing contractors</strong>, ZasChem India utilizes diagnostic engineering procedures to treat asset decay at its fundamental core. Every case study listed inside this repository represents an exhaustive breakdown of concrete core evaluation matrices, electronic leak mapping, and surface profiling.
          </p>
          <p>
            Our structural reinforcement workflows specialize in integrating advanced polymer chemistry formulations. When treating thermal power plants or petrochemical storage assets, our technical divisions employ high-build <strong>premium polyurea coating providers India</strong> technologies. Polyurea coatings form an ultra-durable elastomeric barrier that provides up to 400% elongation flexibility, ensuring structural containment even when subjected to active micro-cracking and massive thermal expansions. This prevents moisture ingress from reaching internal steel rebar matrix foundations, thereby stopping oxidation and spatial concrete spalling.
          </p>
          <p>
            Furthermore, for underground assets like logistics tunnels, deep civil sumps, and hydro dam galleries, standard external membrane access remains impossible. ZasChem India implements negative-side high-pressure crystalline injection technologies that chemically react with un-hydrated cement particles to form an internal crystalline network deep within concrete pores. This method permanently seals passages against high-velocity sub-surface water channels. For structures suffering from severe structural stress cracks due to heavy machinery loads, our engineering crews apply high-tensile carbon fiber wrap configurations (CFRP). This structural jackets system wraps around compromised beams and columns to absorb lateral loads, extending the working lifespan of the asset by decades without necessitating complete rebuilding.
          </p>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}