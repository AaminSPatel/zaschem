import Link from 'next/link';
import { Shield, Target, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import CTABanner from '@/components/sections/CTABanner';
import StatsSection from '@/components/sections/StatsSection';

export const metadata = {
  title: 'About ZasChem India | Industrial Infrastructure Protection Specialists',
  description: 'ZasChem India is India\'s premier specialized contractor executing turnkey industrial waterproofing, structural strengthening solutions, carbon fiber wrapping, and heavy chemical-resistant lining.',
  alternates: { canonical: 'https://www.zaschem.in/about' },
};

const milestones = [
  { year: '2012', title: 'Corporate Foundation', event: 'ZasChem India was incorporated with a core focus on heavy industrial waterproofing contractors workflows, optimizing deep basement slabs in the critical infrastructure sector.' },
  { year: '2015', title: 'Mega Civil Assets Milestone', event: 'Awarded first major public sector cooling tower asset rehabilitation contract for NTPC, implementing advanced elastomeric crystalline matrix engineering formulations.' },
  { year: '2017', title: 'ISO 9001 Integration', event: 'Achieved complete ISO 9001:2015 engineering compliance for implementing strict high-performance polymer applications and non-destructive moisture structural evaluation testing.' },
  { year: '2019', title: 'Sub-Surface Expansion', event: 'Expanded engineering capabilities to comprehensive sub-surface civil assets, deploying complex waterproofing systems inside underground tunnels, hydro dams, and deep structural sumps.' },
  { year: '2021', title: 'National Network Expansion', event: 'Established fully robust mobile operational task forces expanding corporate presence across 15+ highly active industrial corridors and manufacturing zones across India.' },
  { year: '2023', title: '100+ Turnkey Projects Deliverance', event: 'Crossed the benchmark milestone of executing 100+ complex industrial scale infrastructural structural strengthening solutions, serving 25+ major thermal and chemical power units.' },
];

const team = [
  {
    name: 'Er. Rajesh Ranjan',
    role: 'Chief Technical Officer',
    desc: 'B.Tech in Civil Engineering with 15+ years of master-level authority overseeing micro-concrete structural jackets, dynamic carbon fiber wrapping configurations, and premium polyurea waterproofing matrix designs.',
  },
  {
    name: 'Amit Kumar Mishra',
    role: 'VP - Operations',
    desc: 'Manages pan-India cross-functional supply logistics, high-volume polymer sourcing channels, and localized on-site asset engineering divisions spanning major manufacturing plants.',
  },
  {
    name: 'Sanjay Thapa',
    role: 'Head of Quality Assurance',
    desc: 'NACE Certified protective coating inspector implementing zero-tolerance structural compliance metrics, electronic matrix pinhole checks, and non-destructive destructive concrete profiling audits.',
  },
];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#002147' }} className="min-h-screen text-gray-200 font-sans overflow-x-hidden">
      
      {/* Premium Royal Blue Hero Block */}
      <section style={{ backgroundColor: '#001a38' }} className="relative py-28 lg:py-36 border-b border-blue-950">
       <div className="absolute inset-0 z-0">
          <img 
            src="./industry.avif" 
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
            <span style={{ color: '#f77f00' }} className="font-bold">ABOUT</span>
          </nav>
          
         
          <div 
            style={{ backgroundColor: 'rgba(100,223,223,0.08)', borderColor: 'rgba(100,223,223,0.2)', color: '#64dfdf' }} 
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] uppercase px-3 py-1.5 border rounded-sm mb-6"
          >
            <Shield size={12} style={{ color: '#64dfdf' }} /> OVER A DECADE OF TRUST
          </div>
          <h1 
            style={{ color: '#ffffff' }} 
            className="font-display font-black text-4xl md:text-6xl tracking-tight leading-none mb-6"
          >
            SAFEGUARDING INDIA&apos;S<br />
            <span style={{ color: '#f77f00' }}>INDUSTRIAL BACKBONE</span><br />
            SINCE 2012
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl leading-relaxed">
            ZasChem India Private Limited stands at the apex of specialized engineering, serving as dominant <strong>industrial waterproofing contractors</strong> and heavy asset protection architects across India. We deliver custom formulation systems designed to withstand critical thermal, dynamic, and severe chemical stresses.
          </p>
        </div>
      </section>

      {/* Corporate History with Neon Custom Gradients */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div style={{ color: '#64dfdf' }} className="font-mono text-xs font-bold tracking-widest uppercase">ENGINEERING DOMAIN AUTHORITY</div>
            <h2 style={{ color: '#ffffff' }} className="font-display font-black text-3xl md:text-4xl tracking-tight">
              ADVANCED COATING TECHNOLOGY & STRUCTURAL REHABILITATION
            </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Founded with a strong technical blueprint to introduce world-class protection systems, ZasChem India has evolved from an infrastructure troubleshooting squad into one of the country&apos;s most reliable <strong>premium polyurea coating providers India</strong>. We address core structural failures resulting from aggressive substrate water ingress, chemical dynamic spalling, and foundational concrete settling.
              </p>
              <p>
                Our structural methodology shifts away from standard patch applications. By utilizing non-destructive digital core profiling, moisture radar testing, and advanced depth measurements, our engineers formulate custom solutions utilizing carbon fiber composites and high-build epoxy structural lining layouts.
              </p>
              <p>
                From complex corporate basements to industrial warehouses and chemical storage tanks, we customize every deployment matrix. This approach ensures your long-term civil defense remains active under severe high-pressure conditions.
              </p>
            </div>
          </div>
          <div className="relative group">
            <div 
              style={{ background: 'linear-gradient(135deg, #64dfdf 0%, #f77f00 100%)' }} 
              className="absolute -inset-1.5 opacity-30 rounded-sm blur-lg group-hover:opacity-50 transition duration-500" 
            />
            <div style={{ backgroundColor: '#001a38', borderColor: 'rgba(255,255,255,0.05)' }} className="relative border p-2 rounded-sm shadow-2xl">
              <img 
                src="./about-zaschem-2.avif" 
                alt="ZasChem India structural strengthening solutions installation site" 
                className="w-full h-96 object-cover grayscale contrast-125 opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500" 
              />
              <div style={{ borderTopColor: '#64dfdf', borderLeftColor: '#64dfdf' }} className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2" />
              <div style={{ borderBottomColor: '#f77f00', borderRightColor: '#f77f00' }} className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2" />
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Blue Deep Matrix Timeline Section */}
      <section style={{ backgroundColor: '#001a38' }} className="py-24 border-y border-blue-950 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div style={{ color: '#f77f00' }} className="font-mono text-xs font-bold tracking-widest uppercase mb-3">HISTORICAL TRACE</div>
            <h2 style={{ color: '#ffffff' }} className="font-display font-black text-3xl md:text-4xl tracking-tight">DEVELOPMENT JOURNEY & MILESTONES</h2>
          </div>
          
          <div className="space-y-8 relative">
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)' }} className="absolute left-[23px] sm:left-24 top-2 bottom-2 w-0.5" />
            
            {milestones.map((m) => (
              <div key={m.year} className="flex flex-col sm:flex-row gap-4 sm:gap-12 items-start relative group">
                <div style={{ color: '#fcbf49' }} className="w-24 text-left sm:text-right font-mono font-black text-xl tracking-wider sm:pt-4 pl-12 sm:pl-0">
                  {m.year}
                </div>
                
                <div style={{ borderColor: '#64dfdf', backgroundColor: '#002147' }} className="absolute left-[18px] sm:left-[91px] w-3 h-3 border-2 rounded-full z-10" />
                
                <div style={{ backgroundColor: '#002147', borderColor: 'rgba(255,255,255,0.05)' }} className="border p-6 flex-1 rounded-sm shadow-md hover:border-blue-900 transition-colors pl-12 sm:pl-6">
                  <h4 style={{ color: '#ffffff' }} className="font-display font-bold text-base mb-1 tracking-wide uppercase">{m.title}</h4>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Profile Blocks */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div style={{ color: '#64dfdf' }} className="font-mono text-xs font-bold tracking-widest uppercase mb-3">EXECUTIVE COMMAND</div>
            <h2 style={{ color: '#ffffff' }} className="font-display font-black text-4xl tracking-tight">
              THE ENGINEERS BEHIND <span style={{ color: '#f77f00' }}>ZASCHEM INDIA</span>
            </h2>
          </div>

          {/* Founder Executive Card Block */}
          <div 
            style={{ borderColor: 'rgba(255,255,255,0.05)', backgroundColor: '#001a38' }} 
            className="relative max-w-5xl mx-auto mb-24 border rounded-sm p-8 md:p-12 shadow-2xl group transition-all duration-500"
          >
            <div style={{ borderTopColor: '#64dfdf', borderLeftColor: '#64dfdf' }} className="absolute top-0 left-0 w-10 h-10 border-t border-l" />
            <div style={{ borderBottomColor: '#f77f00', borderRightColor: '#f77f00' }} className="absolute bottom-0 right-0 w-10 h-10 border-b border-r" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-4 relative">
                <div style={{ borderColor: 'rgba(255,255,255,0.1)' }} className="relative w-full aspect-square md:max-w-[260px] mx-auto lg:max-w-none border overflow-hidden bg-[#002147]">
                  <img 
                    src="/founder_of_zaschem.png" 
                    alt="Mohammad Miraj Siddiquee - Managing Director of ZasChem India" 
                    className="w-full h-full object-cover contrast-110 filter grayscale opacity-90 hover:opacity-100 hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
                <div>
                  <span 
                    style={{ color: '#fcbf49', backgroundColor: 'rgba(252,191,73,0.05)', borderColor: 'rgba(252,191,73,0.2)' }} 
                    className="inline-block font-mono text-[10px] tracking-widest font-bold uppercase px-3 py-1 border rounded-sm mb-2"
                  >
                    FOUNDER & MANAGING DIRECTOR
                  </span>
                  <h3 style={{ color: '#ffffff' }} className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight">
                    Mohammad Miraj <span style={{ color: '#f77f00' }}>Siddiquee</span>
                  </h3>
                </div>
                
                <p className="text-gray-200 text-base md:text-lg leading-relaxed italic font-medium">
                  &quot;We don&apos;t simply coat concrete surfaces; we engineer structural defense matrices to shield India&apos;s asset lifelines. Our benchmark is execution that never tolerates a secondary attempt.&quot;
                </p>

                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  As an industrial asset protection expert with over a decade of operational command, Mohammad Miraj Siddiquee established ZasChem India to target structural degradation in high-risk zones. Under his leadership, the enterprise transitioned from regional deep core repairs to managing massive infrastructure scopes for corporate conglomerates like NTPC.
                </p>

                <div style={{ borderTopColor: 'rgba(255,255,255,0.05)' }} className="grid grid-cols-3 gap-4 pt-4 border-t text-left">
                  <div>
                    <div style={{ color: '#64dfdf' }} className="font-mono font-black text-lg md:text-xl">12+ Yrs</div>
                    <div className="text-gray-500 text-[9px] font-mono uppercase tracking-wider">Domain Authority</div>
                  </div>
                  <div>
                    <div style={{ color: '#f77f00' }} className="font-mono font-black text-lg md:text-xl">100+ Proj</div>
                    <div className="text-gray-500 text-[9px] font-mono uppercase tracking-wider">Active Executions</div>
                  </div>
                  <div>
                    <div style={{ color: '#fcbf49' }} className="font-mono font-black text-lg md:text-xl">Pan-India</div>
                    <div className="text-gray-500 text-[9px] font-mono uppercase tracking-wider">Task Forces</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Specialists Grid Layout */}
          <div>
            <h4 style={{ color: '#ffffff' }} className="font-mono text-xs font-bold text-center uppercase tracking-widest mb-10">
              CORE CIVIL EXECUTION COMMANDERS
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((member) => (
                <div 
                  key={member.name} 
                  style={{ borderTopColor: '#64dfdf', backgroundColor: '#001a38', borderColor: 'rgba(255,255,255,0.05)' }}
                  className="p-6 border border-t-2 rounded-sm hover:shadow-xl transition-all duration-300"
                >
                  <div style={{ color: '#f77f00' }} className="font-mono text-[10px] font-bold tracking-wider uppercase mb-1">{member.role}</div>
                  <h5 style={{ color: '#ffffff' }} className="font-display font-black text-lg mb-3">{member.name}</h5>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Operational Core Tenets */}
      <section style={{ backgroundColor: '#001a38' }} className="py-24 border-t border-blue-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div style={{ color: '#64dfdf' }} className="font-mono text-xs font-bold tracking-widest uppercase mb-3">OPERATIONAL TENETS</div>
            <h2 style={{ color: '#ffffff' }} className="font-display font-black text-3xl md:text-4xl tracking-tight">ENGINEERING CORE VALUES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Technical Material Excellence', desc: 'Continuous systemic investment in chemical science research, specialist applicator training, and advanced non-destructive moisture analytics instruments guarantees high-tier outcomes.', accent: '#64dfdf' },
              { title: 'Absolute Diagnostic Integrity', desc: 'We isolate and recommend only what your asset profile demands. Transparent assessment logs, exact chemical dosing formulations, and zero shortcut protocols define our work.', accent: '#f77f00' },
              { title: 'Asset Lifecyle Extensions', desc: 'Our customer relationship extends far beyond site handover. Post-application inspections, thermal scans, and decade-long warranty parameters remain standard on all operations.', accent: '#fcbf49' },
            ].map((v) => (
              <div key={v.title} style={{ borderTopColor: v.accent, backgroundColor: '#002147', borderColor: 'rgba(255,255,255,0.05)' }} className="border border-t-2 p-8 rounded-sm shadow-md hover:shadow-xl transition-shadow">
                <h3 style={{ color: '#ffffff' }} className="font-display font-black text-lg md:text-xl mb-3 tracking-wide">{v.title}</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}