'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Shield, ChevronRight, Users, Building2, Calendar, Server } from 'lucide-react';
import CTABanner from '@/components/sections/CTABanner';
import StatsSection from '@/components/sections/StatsSection';

const milestones = [
  { year: '2013', title: 'Corporate Foundation', event: 'ZASCHEM INDIA PVT. LTD. was incorporated with a core focus on industrial waterproofing, concrete repair, and structural strengthening solutions for the critical infrastructure sector.' },
  { year: '2015', title: 'First Major Power Sector Project', event: 'Awarded first major public sector cooling tower rehabilitation contract, implementing advanced elastomeric and polyurethane waterproofing matrix engineering formulations.' },
  { year: '2017', title: 'ISO & Quality Integration', event: 'Achieved complete quality compliance for implementing strict high-performance polymer applications and non-destructive moisture structural evaluation testing across all projects.' },
  { year: '2019', title: 'Sub-Surface & Tunnel Expansion', event: 'Expanded engineering capabilities to comprehensive sub-surface civil assets, deploying complex waterproofing systems inside underground tunnels, hydro dams, and deep structural sumps.' },
  { year: '2021', title: 'Pan-India Network Expansion', event: 'Established fully robust mobile operational task forces expanding corporate presence across 15+ highly active industrial corridors, with Branch Offices in Ranchi and Cuttack.' },
  { year: '2023', title: '100+ Projects & 25+ Power Plants', event: 'Crossed the benchmark milestone of executing 100+ complex industrial scale infrastructural projects, serving 25+ major thermal, hydro, and nuclear power units across India.' },
  { year: '2025', title: '150+ Civil Engineers Trusted', event: 'Eased the life of over 150+ civil engineers who trusted ZASCHEM for their most critical projects, with end-to-end support from diagnosis to rectification to warranty.' },
];

const team = [
  {
    name: 'Er. Rajesh Ranjan',
    role: 'Chief Technical Officer',
    desc: 'B.Tech in Civil Engineering with 15+ years of expertise overseeing concrete repair, carbon fiber wrapping, structural strengthening, and premium polyurethane waterproofing matrix designs.',
  },
  {
    name: 'Amit Kumar Mishra',
    role: 'VP - Operations',
    desc: 'Manages pan-India cross-functional project logistics, supply chain operations, and on-site engineering divisions spanning major power plants and industrial manufacturing facilities.',
  },
  {
    name: 'Sanjay Thapa',
    role: 'Head of Quality Assurance',
    desc: 'Certified protective coating inspector implementing zero-tolerance quality metrics, material testing protocols, and comprehensive execution audits for all projects.',
  },
];

const categorizedClients = {
  power: [
    { name: 'BGR Energy System Ltd (Jharsuguda OPGC Project)', project: 'Power Plant Infrastructure' },
    { name: 'BGR Energy NUPPL Ghatampur', project: 'Thermal Unit Remedial' },
    { name: 'BGR Energy TRN Raigarh', project: 'Specialized Protective Coating' },
    { name: 'GE POWER INDIA LTD (Ghatampur)', project: 'Cable Trench Sealing & Waterproofing' },
    { name: 'NTPC UNCHAHAR', project: 'Cooling Tower Protection & Structural Repair' },
    { name: 'NTPC SIMADHARI', project: 'Terrace Waterproofing Failure Rectification' },
    { name: 'NTPC TANDA', project: 'Acid Resistant Tile Lining & Pits Coating' },
    { name: 'KUBER GROUP (GE POWER)', project: 'Flawless Execution Audit Project' },
    { name: 'Essar Project NLC Neyeli Lignite Corporation', project: 'Heavy Industrial Waterproofing' },
    { name: 'Bhilangna Hydroelectric Project, Polyplex Group', project: 'Dam & Tunnel Repair Systems' },
    { name: 'Everest Power Pvt. Ltd., Gurgaon', project: 'Sub-surface Structure Sealing' }
  ],
  infrastructure: [
    { name: 'Larsen & Toubro Limited, Bathinda, Punjab', project: 'Concrete Repair & Core Cutting' },
    { name: 'Larsen and Toubro, New Delhi', project: 'Structural Strengthening' },
    { name: 'HCC Construction, Badarpur Elevated', project: 'Expansion Joint System Installations' },
    { name: 'Alpine HCC Samsung, Delhi Metro', project: 'Underground Tunnel Silt & Leakage Control' },
    { name: 'Delhi Airport Metro Express Pvt. Ltd., Delhi', project: 'Heavy Water Flow Arresting' },
    { name: 'GMR, New Delhi', project: 'Runway/Surface Trimix Flooring Foundations' },
    { name: 'Continental Engineering Corporation, New Delhi', project: 'Civil Engineering Infrastructure Assets' },
    { name: 'Valecha Engineering, New Delhi', project: 'Rebar Fixing & Structural Rehabilitation' },
    { name: 'Irrigation Division - Water Resources Department (Jharkhand)', project: 'Dam Spillway & Gallery Restoration' }
  ],
  industrial: [
    { name: 'TATA Motors, Rudrapur', project: 'Anti-static / Epoxy / PU Flooring' },
    { name: 'Hindustan Coca Cola Brewages Pvt. Ltd., Ghaziabad', project: 'Acid Alkali Resistance Lining IS Code 4457' },
    { name: 'J K Paper Mill, Orissa', project: 'Chemical Tanks Protective Coatings' },
    { name: 'Dalmia Cement Tamilnadu', project: 'Heavy Duty Vacuum Dewatered Flooring' },
    { name: 'SAB Miller India, Paradeep, Orissa', project: 'ETP Tank Polyurea Protection' },
    { name: 'JUBLIANT BIOSYS LIMITED GREATER NOIDA', project: 'Furan Resin Acid Resistant Lining' },
    { name: 'JUBLIANT INGREVIA NOIDA', project: 'Alkali Resistance Lining IS 4860' },
    { name: 'ITC Limited, Gurgaon', project: 'Solar & Heat Reflecting Elastomeric Coating' },
    { name: 'Rivieria Home Furnishing Pvt. Ltd., Panipat', project: 'Roof Insulation Framework' }
  ],
  commercial: [
    { name: 'RASHTRAPATI BHAVAN MUSEUM', project: 'Historic Restoration & Low Viscous Epoxy Injection' },
    { name: 'Election Commission Of India, New Delhi', project: 'Terrace Waterproofing Upgradation' },
    { name: 'Max Hospital, Saket New Delhi', project: 'Basement Waterlogging Control' },
    { name: 'Max Hospital, Patpandganj, New Delhi', project: 'Underground Sump Rehabilitation' },
    { name: 'Taj Hotel, Delhi', project: 'Seamless Polyurethane Insulation' },
    { name: 'Fraser Suites, New Delhi', project: 'Expansion Joint Waterproof Treatment' },
    { name: 'Emaar MGF, Gurgaon', project: 'Residential RCC Protection Architecture' },
    { name: 'Baani, Gurgaon', project: 'Commercial Concrete Profile Enhancement' },
    { name: 'Manav Rachna University, Faridabad', project: 'Institutional Roof Stabilization' },
    { name: 'BIT Mesra Ranchi', project: 'Structural Crack Remediation & Anchor Grouting' },
    { name: 'Birsa Agriculture University Ranchi', project: 'Civil Labs Fluid Applied Barriers' },
    { name: 'Omaxe Amritsar', project: 'Real Estate Mass Scale Protection Architecture' }
  ]
};

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('power');

  return (
    <div style={{ backgroundColor: '#002147' }} className="min-h-screen text-gray-200 font-sans overflow-x-hidden">
      
      {/* Premium Royal Blue Hero Block */}
      <section style={{ backgroundColor: '#001a38' }} className="relative py-28 lg:py-36 border-b border-blue-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="./about-zaschem-4.avif" 
            alt="ZASCHEM industrial waterproofing and concrete repair experts at power plant site" 
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
            <Shield size={12} style={{ color: '#64dfdf' }} /> OVER A DECADE OF INDUSTRIAL AUTHORITY
          </div>
          <h1 
            style={{ color: '#ffffff' }} 
            className="font-display font-black text-4xl md:text-6xl tracking-tight leading-none mb-6"
          >
            PROTECTING INDIA&apos;S<br />
            <span style={{ color: '#f77f00' }}>CRITICAL ASSETS</span><br />
            SINCE 2013
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl leading-relaxed">
            ZASCHEM INDIA PVT. LTD. stands at the pinnacle of engineering defense matrices, serving as one of India&apos;s largest providers for concrete improvement, structural protection, and repair. We resolve high-risk challenges from **terrace waterproofing failure, basement waterlogging, to falling off acid resistant tiles** in intense environments.
          </p>
        </div>
      </section>

      {/* Corporate History & Domain SEO Insertion */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div style={{ color: '#64dfdf' }} className="font-mono text-xs font-bold tracking-widest uppercase">ENGINEERING DOMAIN AUTHORITY</div>
            <h2 style={{ color: '#ffffff' }} className="font-display font-black text-3xl md:text-4xl tracking-tight">
              ADVANCED APPLICATORS CONFORMING TO ASTM & IS CODES
            </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Established in 2013, ZASCHEM INDIA PVT. LTD. is entirely dedicated to raising standards in the Construction Industry. Today, we are a premier turnkey engine for **PU Waterproofing as per ASTM C-836, C-898**, industrial **Roof Insulation (IS Code: 12432)**, and specialized **Acid Alkali Resistance Furan Lining (IS Code 4860 / 4457)**.
              </p>
              <p>
                Backed by a core force of 40+ engineering professionals, we control registered divisions in Delhi alongside active branches in Ranchi and Cuttack. Our cross-functional deployment models leverage powerful international partnerships with Dubai Adhesive Material Factory LLC-UAE, Seal Boss Corporation-USA, MYK Arment, STP Ltd, SIKA INDIA, BASF, and FOSROC to tackle structural threats.
              </p>
              <p>
                Whether managing deep **soil stabilization** for infrastructure assets, setting heavy **Vacuum Dewatered Trimix Flooring**, or neutralizing **cable trench leakages** inside thermal power blocks, ZASCHEM handles everything. Our workflow tracks a rigid audit framework: Diagnosis &rarr; Rectification &rarr; Clear Warranty.
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
                alt="ZASCHEM structural strengthening and carbon fiber wrapping installation at industrial site" 
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
                    alt="Mohammad Miraj Siddiquee - Founder and Managing Director of ZASCHEM INDIA PVT. LTD." 
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
                  &quot;We don&apos;t simply apply coatings; we engineer structural defense matrices to protect India&apos;s industrial assets. Our benchmark is zero-rework execution with complete accountability from diagnosis to warranty.&quot;
                </p>

                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  Under his leadership, ZASCHEM has engineered robust systems to target critical issues including **spalling of concrete, basement waterlogging, and thermal leakages in PEB sheds**. Every project is executed with a 100% rigid methodology protocol.
                </p>

                <div style={{ borderTopColor: 'rgba(255,255,255,0.05)' }} className="grid grid-cols-3 gap-4 pt-4 border-t text-left">
                  <div>
                    <div style={{ color: '#64dfdf' }} className="font-mono font-black text-lg md:text-xl">12+ Yrs</div>
                    <div className="text-gray-500 text-[9px] font-mono uppercase tracking-wider">Domain Authority</div>
                  </div>
                  <div>
                    <div style={{ color: '#f77f00' }} className="font-mono font-black text-lg md:text-xl">25+ Plants</div>
                    <div className="text-gray-500 text-[9px] font-mono uppercase tracking-wider">Power Portfolio</div>
                  </div>
                  <div>
                    <div style={{ color: '#fcbf49' }} className="font-mono font-black text-lg md:text-xl">150+ Trusted</div>
                    <div className="text-gray-500 text-[9px] font-mono uppercase tracking-wider">Civil Engineers</div>
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

      {/* ==================== PRESTIGIOUS CLIENTS SECTOR TABS ==================== */}
      <section style={{ backgroundColor: '#001a38' }} className="py-24 border-t border-blue-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div style={{ color: '#f77f00' }} className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase bg-[#f77f00]/10 px-3 py-1 rounded-sm mb-3">
              <Users size={14} /> BRAND TRUST MATRIX
            </div>
            <h2 style={{ color: '#ffffff' }} className="font-display font-black text-3xl md:text-4xl tracking-tight">
              COMMERCIAL EXPERTISE BY INDUSTRY SECTOR
            </h2>
            <p className="text-gray-400 text-sm mt-3 max-w-2xl mx-auto">
              We separate our 100+ prestigious clients by operational matrix. Click through tabs to explore verified defense records.
            </p>
          </div>

          {/* Segment/Tab Control Row */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-4xl mx-auto">
            {[
              { id: 'power', label: 'Power & Energy (25+ Plants)', icon: Server },
              { id: 'infrastructure', label: 'Heavy Infrastructure', icon: Building2 },
              { id: 'industrial', label: 'Industrial / Manufacturing', icon: Shield },
              { id: 'commercial', label: 'Commercial & Hospitality', icon: Users },
            ].map((tab) => {
              const IconComponent = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    backgroundColor: isSelected ? '#f77f00' : '#002147',
                    color: isSelected ? '#ffffff' : '#a0aec0',
                    borderColor: isSelected ? '#f77f00' : 'rgba(255,255,255,0.05)'
                  }}
                  className="flex items-center gap-2 font-mono text-xs font-bold px-4 py-2.5 border rounded-sm shadow-md transition-all duration-150 cursor-pointer"
                >
                  <IconComponent size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Render Tab Panel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {categorizedClients[activeTab].map((client, idx) => (
              <div 
                key={idx} 
                style={{ backgroundColor: '#002147', borderColor: 'rgba(100,223,223,0.1)' }}
                className="p-4 border-l-4 border-l-[#64dfdf] rounded-sm flex flex-col justify-between hover:bg-[#002855] transition-all duration-150 shadow-md"
              >
                <div style={{ color: '#ffffff' }} className="text-sm font-bold tracking-wide uppercase line-clamp-2">
                  {client.name}
                </div>
                <div style={{ color: '#fcbf49' }} className="text-[11px] font-mono uppercase font-semibold mt-2 tracking-wider">
                  {client.project}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-500 text-xs">
              <Building2 size={12} className="inline mr-1" /> 
              100+ Strategic National Contractual Roles Completed Safely.
            </p>
          </div>
        </div>
      </section>

      {/* Operational Core Tenets */}
      <section style={{ backgroundColor: '#001a38' }} className="py-24 border-t border-blue-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div style={{ color: '#64dfdf' }} className="font-mono text-xs font-bold tracking-widest uppercase mb-3">OPERATIONAL TENETS</div>
            <h2 style={{ color: '#ffffff' }} className="font-display font-black text-3xl md:text-4xl tracking-tight">OUR ENGINEERING CORE VALUES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Technical Material Excellence', desc: 'Continuous investment in chemical science, specialist applicator training, and advanced non-destructive analytics guarantees world-class outcomes. We follow 100% methodology with execution audit on every project.', accent: '#64dfdf' },
              { title: 'Absolute Diagnostic Integrity', desc: 'We isolate and recommend only what your asset demands. Transparent assessment, exact material specifications, and zero-compromise protocols define our work. Equal responsibility of manufacturer and applicator.', accent: '#f77f00' },
              { title: 'Asset Lifecycle Extension', desc: 'Our relationship extends beyond site handover. Post-application inspections, thermal scans, and end-to-end support (Diagnosis → Rectification → Warranty) remain standard on all operations.', accent: '#fcbf49' },
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