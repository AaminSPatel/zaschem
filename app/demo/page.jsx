'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Phone, MapPin, ChevronDown, ChevronLeft, ChevronRight,
  Zap, Award, Users, CheckCircle, ThumbsUp, Shield, Clock, Star, Quote,
  Droplets, Building2, Wrench, FlaskConical, Layers, Waves, Sun, Mail,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
const heroSlides = [
  { id:1, badge:'POWER SECTOR', title:'POWER PLANT WATERPROOFING', subtitle:'Industrial-Grade Protection for Critical Energy Infrastructure', desc:'Specialized crystalline and polyurethane waterproofing solutions for cooling towers, turbine halls, transformer bunds, and underground pump houses. Zero-downtime execution during planned shutdowns. Trusted by NTPC, BHEL, and 25+ power plants across India.', cta:{ label:'Explore Service', href:'/services/waterproofing-systems' }, image:'/nuclear_power_plant.avif', stat:'25+ Power Plants Protected' },
  { id:2, badge:'TUNNEL & METRO', title:'TUNNEL REHABILITATION', subtitle:'Advanced Underground Infrastructure Repair & Waterproofing', desc:'Comprehensive tunnel lining repair using polyurethane foam injection for active leaks, epoxy crack injection for structural cracks, and crystalline membrane for metro, highway, and railway tunnels across India.', cta:{ label:'View Projects', href:'/services/repair-rehabilitation' }, image:'/tunnel_rehabilation.avif', stat:'60-Hour Shutdown Delivery' },
  { id:3, badge:'CHEMICAL PLANTS', title:'ACID RESISTANT LINING', subtitle:'Chemical Plant & ETP Tank Protection Systems', desc:'Furan resin, epoxy phenolic, and vinyl ester-based acid and alkali resistant lining systems for chemical reactors, ETP tanks, and industrial process floors. Full pH 0–14 resistance. 20+ year life extension guaranteed.', cta:{ label:'Learn More', href:'/services/acid-resistant-lining' }, image:'/p1.avif', stat:'pH 0–14 Full Resistance' },
  { id:4, badge:'INDUSTRIAL FLOORING', title:'EPOXY FLOORING SYSTEMS', subtitle:'High-Performance Flooring for Factories & Pharma Plants', desc:'Anti-static, chemical resistant, GMP-compliant epoxy and polyurethane flooring systems for automotive, pharmaceutical, food processing, and logistics facilities. FDA compliant options available.', cta:{ label:'Get Quote', href:'/services/industrial-flooring' }, image:'/epoxy.avif', stat:'GMP & FDA Compliant' },
  { id:5, badge:'STRUCTURAL', title:'STRUCTURAL REHABILITATION', subtitle:'Restoring Integrity to Ageing Concrete Structures', desc:'Carbon fiber (CFRP) wrapping, rebar corrosion treatment, hydrodemolition repair, and polymer-modified mortar systems to restore and enhance load-bearing capacity of deteriorated bridges, dams, and industrial structures.', cta:{ label:'Explore Solutions', href:'/services/structural-strengthening' }, image:'/structural_rehabilation.avif', stat:'Decades of Life Extension' },
];

const stats = [
  { value:'150+', label:'Civil Engineers Served',   Icon: Users },
  { value:'25+',  label:'Power Plants Protected',   Icon: Zap },
  { value:'14+',  label:'Years of Excellence',      Icon: Award },
  { value:'100+', label:'Projects Delivered',       Icon: CheckCircle },
  { value:'15+',  label:'States Covered',           Icon: MapPin },
  { value:'98%',  label:'Client Satisfaction',      Icon: ThumbsUp },
];

const services = [
  { id:1, slug:'waterproofing-systems',    Icon:Droplets,    title:'Waterproofing Systems',          desc:'Crystalline, cementitious and membrane waterproofing for roofs, basements, tunnels, power plants, and water-retaining structures. Positive and negative side application with 10-year warranty.',                                       tags:['Crystalline','Cementitious','HDPE Membrane','Injection Grouting'] },
  { id:2, slug:'structural-strengthening', Icon:Building2,   title:'Structural Strengthening',       desc:'Carbon fiber (CFRP) wrapping, FRP laminates, column jacketing, and structural bonding systems to restore and upgrade load-bearing capacity of deteriorated bridges, buildings, and industrial structures.',                            tags:['CFRP Wrapping','Column Jacketing','FRP Laminates','Structural Adhesives'] },
  { id:3, slug:'repair-rehabilitation',    Icon:Wrench,      title:'Concrete Repair & Rehabilitation', desc:'Comprehensive concrete repair for carbonation, chloride attack, rebar corrosion, and impact damage. Hydrodemolition, polymer-modified mortars, and protective overlays for critical infrastructure assets.',                           tags:['Crack Injection','Hydrodemolition','Polymer Mortars','Rebar Treatment'] },
  { id:4, slug:'acid-resistant-lining',    Icon:FlaskConical, title:'Acid Resistant Lining',         desc:'Furan resin, epoxy phenolic, and vinyl ester-based chemical resistant linings for ETP tanks, chemical reactors, and industrial floors exposed to aggressive acids, alkalis, and solvents at high temperatures.',                      tags:['Furan Resin','Epoxy Phenolic','Vinyl Ester','pH 0-14'] },
  { id:5, slug:'industrial-flooring',      Icon:Layers,      title:'Industrial Epoxy Flooring',      desc:'Self-levelling epoxy, PU screed, MMA rapid-cure, and polished concrete flooring for automotive, pharmaceutical, food processing, and logistics. GMP, FDA, and OSHA compliant systems available.',                                    tags:['Self-Levelling Epoxy','PU Screed','Anti-Static','GMP Compliant'] },
  { id:6, slug:'polyurea-waterproofing',   Icon:Waves,       title:'Polyurea Waterproofing',         desc:'Rapid-cure seamless polyurea spray membrane with >300% elongation for rooftops, secondary containment, tunnel linings, bridge decks, and water reservoirs. Cures in under 60 seconds with full chemical resistance.',                 tags:['Rapid Cure','Seamless','300% Elongation','Chemical Resistant'] },
  { id:7, slug:'heat-reflective-coating',  Icon:Sun,         title:'Heat Reflective Coating',        desc:'Solar reflective cool roof coatings reducing surface temperature by 15–20°C. Saves up to 25% on air conditioning energy. Suitable for RCC, metal, and asbestos roofs. GRIHA compatible and eco-friendly.',                            tags:['Solar Reflectance >85%','Energy Saving','UV Resistant','GRIHA Compatible'] },
  { id:8, slug:'pu-waterproofing',         Icon:Shield,      title:'PU Waterproofing',               desc:'Polyurethane liquid-applied membranes with >200% elongation for exposed terraces, podium slabs, planter boxes, green roofs, and parking decks. UV stable and available in multiple architectural colors.',                              tags:['High Elongation','UV Stable','Traffic Bearing','Multiple Colors'] },
];

const projects = [
  { id:1, slug:'ntpc-power-plant-waterproofing',    title:'NTPC Cooling Tower Waterproofing',       client:'NTPC Limited',                  location:'Singrauli, M.P.',    year:'2022', category:'Power Plant',       image:'/power_plant.avif',       problem:'Severe leakage in 8 cooling tower cells causing water loss and structural deterioration.', outcome:'100% leakage control achieved. 15-year warranty. Zero downtime impact on operations.',       tags:['Waterproofing','Power Plant','PU Membrane'] },
  { id:2, slug:'metro-tunnel-rehabilitation-delhi',  title:'Delhi Metro Tunnel Crack Repair',        client:'Delhi Metro Rail Corporation',   location:'Delhi, NCR',         year:'2023', category:'Tunnel',            image:'/tunnel.avif',            problem:'Water ingress through cracks in 2.5km metro tunnel causing service disruption risk.',        outcome:'Complete waterproofing in 60-hour shutdown window. Zero re-occurrence in 18 months.',         tags:['Tunnel','Crack Injection','Metro'] },
  { id:3, slug:'chemical-plant-acid-lining-ranchi',  title:'ETP Tank Acid Resistant Lining',         client:'Chemical Manufacturer',          location:'Ranchi, Jharkhand',  year:'2023', category:'Chemical Plant',    image:'/industries.avif',        problem:'pH 2–3 effluent destroying ETP tank concrete within 2 years of construction.',              outcome:'Tank life extended 20+ years. Full pH 0–14 chemical resistance achieved.',                    tags:['Acid Lining','ETP','Chemical Resistance'] },
  { id:4, slug:'dam-rehabilitation-odisha',          title:'Irrigation Dam Structural Rehabilitation', client:'Odisha Water Resources Dept.',  location:'Cuttack, Odisha',    year:'2022', category:'Dam & Reservoir',   image:'/dam_rehabilation.avif',  problem:'Severe carbonation, rebar corrosion, and honeycombing in 40-year-old dam spillway.',         outcome:'Structural integrity restored. 25-year life extension with full safety compliance.',          tags:['Dam Repair','CFRP','Rehabilitation'] },
];

const testimonials = [
  { id:1, name:'Rajiv Sharma',   designation:'Chief Engineer',     company:'NTPC Limited',                  rating:5, image:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', quote:"ZasChem India's waterproofing solution for our cooling towers exceeded all expectations. Their technical team demonstrated exceptional knowledge of power plant environments and delivered a lasting solution within our tight shutdown schedule." },
  { id:2, name:'Priya Nair',     designation:'Project Director',   company:'Delhi Metro Rail Corporation',   rating:5, image:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', quote:"Working with ZasChem on our metro tunnel waterproofing was a seamless experience. Their team mobilized rapidly and completed the repair within our 60-hour maintenance window. Highly recommended for any critical infrastructure project." },
  { id:3, name:'Amit Agarwal',   designation:'VP – Projects',      company:'Chemical Industries Ltd',        rating:5, image:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', quote:"The acid resistant lining installed by ZasChem in our ETP tanks has been performing without any issues for over 2 years. Their understanding of chemical environments and material selection saved us significant long-term costs." },
  { id:4, name:'Suresh Kumar',   designation:'Maintenance Head',   company:'Steel Authority of India',       rating:5, image:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', quote:"ZasChem's concrete repair methodology is thorough and systematic. They diagnose the root cause and provide comprehensive solutions. Our plant structures have never been in better condition after their intervention." },
  { id:5, name:'Dr. Meera Pillai', designation:'Facility Manager', company:'Sun Pharma',                    rating:5, image:'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80', quote:"Our pharmaceutical facility's flooring upgrade by ZasChem helped us sail through FDA audit. The PU screed system is exactly what GMP compliance demands — seamless, hygienic, and chemically resistant." },
];

const clients = [
  { name:'NTPC Limited',       logo:'/ntpc.avif' },
  { name:'DMRC',               logo:'/dmrc.avif' },
  { name:'SAIL',               logo:'/sail.avif' },
  { name:'ONGC',               logo:'/ongc.avif' },
  { name:'Sun Pharma',         logo:'/sun_pharma.avif' },
  { name:'Reliance Industries', logo:'/reliance.avif' },
  { name:'L&T Construction',   logo:'/lt.avif' },
  { name:'Tata Steel',         logo:'/tata_steel.avif' },
  { name:'NHAI',               logo:'/nhai.avif' },
  { name:'BHEL',               logo:'/bhel.avif' },
  { name:'Indian Oil',         logo:'/indian_oil.avif' },
];

const whyUs = [
  { Icon:Award,        title:'14+ Years Industrial Experience',    desc:'Deep domain expertise in power plant, tunnel, dam, and chemical plant waterproofing and rehabilitation — serving India\'s most critical infrastructure since 2010.' },
  { Icon:Users,        title:'50+ Certified Engineers & Applicators', desc:'ISO-trained applicators, structural engineers, and QC specialists deployed on-site for every project with rigorous quality documentation.' },
  { Icon:CheckCircle,  title:'Turnkey Project Execution',          desc:'From site survey and system design to material supply, skilled application, quality testing, and warranty documentation — complete end-to-end delivery.' },
  { Icon:Clock,        title:'Critical Shutdown Specialists',      desc:'Specialized in high-quality repair work within tight plant shutdown windows. We delivered a 60-hour metro tunnel job and multiple emergency power plant repairs.' },
  { Icon:Shield,       title:'International Grade Materials',      desc:'Using globally certified materials from leading manufacturers, tested and proven for India\'s extreme climate — high humidity, UV, thermal cycling, and chemical aggression.' },
  { Icon:MapPin,       title:'Pan-India Coverage – 15+ States',   desc:'Active teams across Delhi, Noida, Ranchi, Cuttack, Hyderabad, Mumbai, and all major industrial hubs. 24–48 hour emergency mobilization anywhere in India.' },
];

const faqs = [
  { q:'What areas of India does ZasChem India serve?',                         a:'ZasChem India serves pan-India with active operations across 15+ states including Delhi NCR, Noida, Ranchi, Cuttack, Hyderabad, Mumbai, Pune, Chennai, Kolkata, and all major industrial hubs. We can mobilize a team to any location within 24–48 hours for emergency situations.' },
  { q:'Do you work on live industrial plant shutdowns?',                        a:'Yes. We specialize in executing critical repair and waterproofing work during planned and emergency plant shutdowns. We have experience at NTPC, BHEL, SAIL, and steel plant environments with strict HSE compliance and zero-incident track records.' },
  { q:'What warranty do you offer on waterproofing work?',                      a:'We offer 5–15 year material and application warranties depending on the system and site conditions. Polyurethane and polyurea waterproofing systems typically carry 10-year guarantees, backed by our ISO 9001:2015 certified quality assurance process.' },
  { q:'Can you handle both material supply and application?',                   a:'Yes. ZasChem India provides complete turnkey solutions including material procurement, surface preparation, skilled application by certified applicators, quality testing (pull-off, thickness), and full documentation including QC reports and warranty certificates.' },
  { q:'How soon can your team mobilize for emergency repair?',                  a:'For emergency situations like active leakage in power plants, dam seepage, or critical infrastructure failure, we can mobilize a technical team within 24–48 hours to any location in India. We maintain rapid-response material stocks at regional offices.' },
  { q:'Are you ISO certified and compliant with industry standards?',           a:'Yes. ZasChem India is ISO 9001:2015 certified and OHSAS 18001 compliant. We work as approved contractors for PSU companies including NTPC, DMRC, SAIL, and government infrastructure departments. All applications follow IS, ASTM, and EN standards.' },
  { q:'What is the difference between crystalline and membrane waterproofing?', a:'Crystalline waterproofing uses a chemical reaction to form insoluble crystals within concrete pores, providing integral protection that self-seals cracks up to 0.4mm. Membrane waterproofing (PU, polyurea, HDPE) creates a physical surface barrier. Our engineers recommend the right system based on structure type, water pressure, and accessibility.' },
  { q:'Do you serve residential and commercial buildings too?',                 a:'While our primary expertise is industrial and infrastructure waterproofing (power plants, tunnels, dams), we also serve large commercial buildings, hospitals, IT parks, and institutional facilities for basement waterproofing, terrace waterproofing, and structural rehabilitation.' },
];

/* ─────────────────────────────────────────────────────────────────────────────
   GLOBAL STYLES injected once
───────────────────────────────────────────────────────────────────────────── */
/* const GLOBAL_CSS = `
  :root {
    --blue:#0082FB; --orange:#FF6600; --deep:#021124; --dark:#031a38; --card:#052349;
    --muted:rgba(255,255,255,0.72); --border:rgba(255,255,255,0.12);
  }
  .zc-btn-primary {
    display:inline-flex; align-items:center; gap:8px; padding:13px 28px;
    background:var(--orange); color:#fff; border:1px solid var(--orange);
    font-weight:700; font-size:13px; letter-spacing:.09em; text-transform:uppercase;
    text-decoration:none; cursor:pointer; transition:background .2s,transform .2s;
    white-space:nowrap;
  }
  .zc-btn-primary:hover { background:#e55a00; transform:translateY(-1px); }
  .zc-btn-secondary {
    display:inline-flex; align-items:center; gap:8px; padding:13px 28px;
    background:transparent; color:#fff; border:1px solid rgba(255,255,255,0.22);
    font-weight:600; font-size:13px; letter-spacing:.09em; text-transform:uppercase;
    text-decoration:none; cursor:pointer; transition:border-color .2s,background .2s;
    white-space:nowrap;
  }
  .zc-btn-secondary:hover { border-color:var(--blue); background:rgba(0,130,251,0.08); }
  .zc-grid-bg {
    background-image:linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),
                     linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px);
    background-size:60px 60px;
  }
  .zc-card {
    background:var(--card); border:1px solid var(--border);
    transition:border-color .3s;
  }
  .zc-card:hover { border-color:rgba(0,130,251,.5); }
  .zc-label {
    display:inline-flex; align-items:center; gap:6px;
    font-size:11px; font-weight:700; letter-spacing:.22em; color:var(--orange);
    text-transform:uppercase; border-left:3px solid var(--orange); padding-left:10px;
    margin-bottom:16px;
  }
  .zc-tag {
    background:rgba(0,130,251,.12); border:1px solid rgba(0,130,251,.25);
    color:rgba(255,255,255,.7); font-size:11px; padding:3px 9px; letter-spacing:.04em;
  }
  @keyframes zcPulse { 0%,100%{opacity:1} 50%{opacity:.4} }
  .zc-pulse { animation:zcPulse 2s infinite; }
  @keyframes marqLeft  { from{transform:translateX(0)}  to{transform:translateX(-50%)} }
  @keyframes marqRight { from{transform:translateX(-50%)} to{transform:translateX(0)} }
  .marq-left  { animation:marqLeft  40s linear infinite; }
  .marq-right { animation:marqRight 40s linear infinite; }
`; */

/* function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />;
}
 */
/* ─────────────────────────────────────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────────────────────────────────────── */
function SectionHeader({ label, title, subtitle, centered = true }) {
  return (
    <motion.div
      initial={{ opacity:0, y:24 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:.6 }}
      className={`mb-10 md:mb-14 ${centered ? 'text-center' : ''}`}
    >
      {label && <div className="zc-label">{label}</div>}
      <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 text-white ${centered ? 'mx-auto' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''}`}
           style={{ color:'rgba(255,255,255,.72)' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────────────────────── */
function HeroSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = heroSlides.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(i => (i + 1) % total), 5500);
    return () => clearInterval(t);
  }, [paused]);

  const slide = heroSlides[active];

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight:'100svh', background:'#021124' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background */}
      <AnimatePresence mode="sync">
        <motion.div key={slide.id} className="absolute inset-0"
          initial={{ opacity:0, scale:1.04 }} animate={{ opacity:1, scale:1 }}
          exit={{ opacity:0 }} transition={{ duration:1.1 }}>
          <img src={slide.image} alt={slide.title}
            className="w-full h-full object-cover" fetchPriority={active===0?'high':'auto'} />
          <div className="absolute inset-0"
            style={{ background:'linear-gradient(to top,#021124 0%,rgba(2,17,36,.82) 40%,rgba(2,17,36,.35) 70%,transparent 100%)' }} />
          <div className="absolute inset-0"
            style={{ background:'linear-gradient(to right,rgba(2,17,36,.85) 0%,rgba(2,17,36,.45) 55%,transparent 100%)' }} />
          <div className="absolute inset-0 zc-grid-bg" style={{ opacity:.15 }} />
        </motion.div>
      </AnimatePresence>

      {/* Left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] hidden md:block"
        style={{ background:'linear-gradient(to bottom,transparent,#0082FB,transparent)' }} />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-end md:items-center">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-16 pb-20 md:pb-0">
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-16 }} transition={{ duration:.7 }}
              className="max-w-xl lg:max-w-2xl">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-5 px-3 py-1.5"
                style={{ background:'rgba(0,130,251,.15)', border:'1px solid rgba(0,130,251,.35)' }}>
                <span className="zc-pulse w-1.5 h-1.5 rounded-full" style={{ background:'#FF6600' }} />
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[.22em] uppercase"
                  style={{ color:'#FF6600' }}>{slide.badge}</span>
              </div>

              {/* Title */}
              <h1 className="font-black tracking-tight leading-none mb-3"
                style={{ fontSize:'clamp(30px,6vw,72px)', lineHeight:1.0 }}>
                {slide.title.split(' ').map((w,i) => (
                  <span key={i} style={{ color: i%3===1 ? '#0082FB' : '#ffffff' }}>{w} </span>
                ))}
              </h1>

              {/* Subtitle */}
              <p className="font-bold mb-2 sm:mb-3" style={{ color:'#FF6600', fontSize:'clamp(13px,2vw,18px)', letterSpacing:'.03em' }}>
                {slide.subtitle}
              </p>

              {/* Description */}
              <p className="hidden sm:block leading-relaxed mb-5 sm:mb-7"
                style={{ color:'rgba(255,255,255,.83)', fontSize:'clamp(13px,1.4vw,15px)', maxWidth:580 }}>
                {slide.desc}
              </p>

              {/* Stat */}
              <div className="inline-flex items-center gap-2 mb-5 sm:mb-7 px-3 py-2"
                style={{ background:'rgba(255,102,0,.1)', border:'1px solid rgba(255,102,0,.3)' }}>
                <Zap size={13} color="#FF6600" />
                <span className="text-[11px] font-bold tracking-[.12em] uppercase" style={{ color:'#FF6600' }}>
                  {slide.stat}
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col xs:flex-row gap-3 flex-wrap">
                <Link href={slide.cta.href} className="zc-btn-primary">
                  {slide.cta.label} <ArrowRight size={15} />
                </Link>
                <a href="tel:+917004298988" className="zc-btn-secondary">
                  <Phone size={14} /> CALL NOW
                </a>
              </div>

              <p className="sm:hidden mt-4 text-[11px] tracking-[.18em] uppercase"
                style={{ color:'rgba(255,255,255,.38)' }}>SWIPE TO EXPLORE →</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Nav arrows – desktop */}
      {[['left-4', ChevronLeft, () => setActive(i => (i-1+total)%total)],
        ['right-4', ChevronRight, () => setActive(i => (i+1)%total)]].map(([pos, Icon, fn], k) => (
        <button key={k} onClick={fn}
          className={`hidden md:flex absolute ${pos} top-1/2 -translate-y-1/2 z-30 w-11 h-11 items-center justify-center cursor-pointer transition-all`}
          style={{ background:'rgba(2,17,36,.75)', border:'1px solid rgba(255,255,255,.14)' }}
          onMouseOver={e => e.currentTarget.style.borderColor='#0082FB'}
          onMouseOut={e => e.currentTarget.style.borderColor='rgba(255,255,255,.14)'}>
          <Icon size={20} color="#fff" />
        </button>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 z-30 flex gap-2 items-center">
        {heroSlides.map((_,i) => (
          <button key={i} onClick={() => setActive(i)}
            className="rounded-sm transition-all duration-400 border-0 cursor-pointer"
            style={{ width:i===active?28:8, height:8, background:i===active?'#FF6600':'rgba(255,255,255,.35)' }} />
        ))}
      </div>

      {/* Slide counter – desktop */}
      <div className="hidden md:block absolute bottom-6 right-8 z-30">
        <span style={{ color:'rgba(255,255,255,.45)', fontFamily:'monospace', fontSize:12, letterSpacing:'.1em' }}>
          {String(active+1).padStart(2,'0')} / {String(total).padStart(2,'0')}
        </span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-30" style={{ background:'rgba(255,255,255,.08)' }}>
        <motion.div key={active}
          initial={{ width:'0%' }} animate={{ width:'100%' }}
          transition={{ duration:paused?0:5.5, ease:'linear' }}
          style={{ height:'100%', background:'#0082FB' }} />
      </div>

      {/* Inline schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org","@type":"WebPage",
        "name":"ZasChem India – Industrial Waterproofing & Infrastructure Protection",
        "description":"India's trusted specialist in industrial waterproofing, power plant protection, tunnel rehabilitation, acid resistant lining, structural strengthening.",
        "url":"https://www.zaschem.in",
        "provider":{"@type":"Organization","name":"ZasChem India Pvt. Ltd.","url":"https://www.zaschem.in","telephone":"+91-7004298988"}
      })}} />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   STATS SECTION
───────────────────────────────────────────────────────────────────────────── */
function StatsSection() {
  return (
    <section className="relative py-16 md:py-20 zc-grid-bg"
      style={{ background:'#031a38', borderTop:'1px solid rgba(255,255,255,.1)', borderBottom:'1px solid rgba(255,255,255,.1)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="text-center mb-10 md:mb-12">
          <div className="zc-label mx-auto" style={{ display:'inline-flex' }}>OUR TRACK RECORD</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
            NUMBERS THAT SPEAK FOR THEMSELVES
          </h2>
          <p className="mt-3 text-sm md:text-base max-w-xl mx-auto" style={{ color:'rgba(255,255,255,.68)' }}>
            14 years of industrial waterproofing and structural rehabilitation across India's most critical power, chemical, tunnel, and infrastructure sectors.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-1"
          style={{ background:'rgba(255,255,255,.1)' }}>
          {stats.map(({ value, label, Icon }, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*.08 }}
              className="flex flex-col items-center py-8 px-4 text-center group cursor-default transition-colors"
              style={{ background:'#052349' }}
              onMouseOver={e => e.currentTarget.style.background='#063868'}
              onMouseOut={e => e.currentTarget.style.background='#052349'}>
              <Icon size={26} color="#FF6600" className="mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl md:text-4xl font-black text-white leading-none mb-2">{value}</div>
              <p className="text-[11px] font-semibold tracking-wide uppercase leading-snug"
                style={{ color:'rgba(255,255,255,.65)' }}>{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CLIENTS MARQUEE
───────────────────────────────────────────────────────────────────────────── */
function ClientsSection() {
  const double = [...clients, ...clients];
  return (
    <section className="py-14 md:py-16" style={{ background:'#021124', borderBottom:'1px solid rgba(255,255,255,.1)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center mb-10">
        <div className="zc-label" style={{ display:'inline-flex', justifyContent:'center' }}>TRUSTED BY INDIA'S BEST</div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
          SERVING CRITICAL INFRASTRUCTURE SINCE 2010
        </h2>
        <p className="mt-3 text-sm md:text-base max-w-lg mx-auto" style={{ color:'rgba(255,255,255,.65)' }}>
          Trusted by PSUs, government departments, and India's leading private sector companies across power, chemical, infrastructure, and industrial sectors.
        </p>
      </div>

      {/* Row 1 */}
      <div className="overflow-hidden mb-3">
        <div className="flex gap-3 marq-left" style={{ width:'max-content' }}>
          {double.map((c,i) => (
            <div key={i} className="flex items-center justify-center px-5 flex-shrink-0 zc-card"
              style={{ minWidth:168, height:68 }}>
              <img src={c.logo} alt={`${c.name} – ZasChem India client`}
                className="h-10 object-contain" style={{ filter:'brightness(.9)' }}
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
              <span style={{ display:'none', color:'rgba(255,255,255,.6)', fontSize:11, fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase' }}>{c.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Row 2 reverse */}
      <div className="overflow-hidden">
        <div className="flex gap-3 marq-right" style={{ width:'max-content' }}>
          {double.map((c,i) => (
            <div key={i} className="flex items-center justify-center px-5 flex-shrink-0 zc-card"
              style={{ minWidth:168, height:68 }}>
              <img src={c.logo} alt={`${c.name} – industrial waterproofing`}
                className="h-10 object-contain" style={{ filter:'brightness(.9)' }}
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
              <span style={{ display:'none', color:'rgba(255,255,255,.6)', fontSize:11, fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase' }}>{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SERVICES SECTION
───────────────────────────────────────────────────────────────────────────── */
function ServiceCard({ svc, index }) {
  const { Icon } = svc;
  return (
    <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }} transition={{ duration:.5, delay:index*.07 }}>
      <Link href={`/services/${svc.slug}`}
        title={`ZasChem India ${svc.title} – Expert industrial services`}
        className="zc-card block overflow-hidden group h-full"
        style={{ textDecoration:'none' }}>
        {/* Icon header */}
        <div className="p-6 border-b transition-colors group-hover:bg-[rgba(0,130,251,0.06)]"
          style={{ borderColor:'rgba(255,255,255,.1)' }}>
          <div className="w-12 h-12 flex items-center justify-center mb-4 transition-colors group-hover:bg-[rgba(0,130,251,0.2)]"
            style={{ background:'rgba(0,130,251,.1)', border:'1px solid rgba(0,130,251,.22)' }}>
            <Icon size={22} color="#0082FB" className="group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-extrabold text-base md:text-lg text-white group-hover:text-[#0082FB] transition-colors leading-snug">
            {svc.title}
          </h3>
        </div>
        {/* Body */}
        <div className="p-6">
          <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color:'rgba(255,255,255,.68)' }}>
            {svc.desc}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {svc.tags.map(t => <span key={t} className="zc-tag">{t}</span>)}
          </div>
          <div className="flex items-center gap-1.5 text-[13px] font-bold tracking-wide text-[#0082FB] group-hover:text-[#FF6600] group-hover:gap-3 transition-all">
            LEARN MORE <ArrowRight size={13} />
          </div>
        </div>
        <div className="h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background:'linear-gradient(to right,transparent,#0082FB,transparent)' }} />
      </Link>
    </motion.div>
  );
}

function ServicesSection() {
  return (
    <section className="py-16 md:py-24 relative zc-grid-bg" style={{ background:'#021124' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          label="WHAT WE DO"
          title="INDUSTRIAL PROTECTION SERVICES"
          subtitle="Comprehensive waterproofing, structural rehabilitation, and chemical-resistant coating solutions engineered for India's most demanding industrial environments."
        />
        <p className="text-center text-[13px] sm:text-sm leading-relaxed max-w-3xl mx-auto mb-10 md:mb-14"
          style={{ color:'rgba(255,255,255,.65)' }}>
          As India's trusted <strong className="text-white">industrial waterproofing contractors</strong>, ZasChem India delivers end-to-end protection for critical infrastructure. Whether you need{' '}
          <Link href="/services/waterproofing-systems" style={{ color:'#0082FB' }}>power plant waterproofing</Link>,{' '}
          <Link href="/services/acid-resistant-lining" style={{ color:'#0082FB' }}>acid resistant lining for ETP tanks</Link>, or{' '}
          <Link href="/services/structural-strengthening" style={{ color:'#0082FB' }}>CFRP structural strengthening</Link>, our ISO 9001:2015 certified team guarantees results.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc,i) => <ServiceCard key={svc.id} svc={svc} index={i} />)}
        </div>

        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          className="text-center mt-10 md:mt-12">
          <Link href="/services" className="zc-btn-secondary"
            title="View all industrial waterproofing services by ZasChem India">
            VIEW ALL SERVICES <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   WHY CHOOSE US
───────────────────────────────────────────────────────────────────────────── */
function WhyChooseSection() {
  return (
    <section className="py-16 md:py-24 relative zc-grid-bg overflow-hidden" style={{ background:'#031a38' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Image */}
          <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:.7 }}
            className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden">
              <img src="/p4.avif"
                alt="ZasChem India certified engineers performing industrial waterproofing site inspection"
                className="w-full object-cover"
                style={{ height:'clamp(300px,45vw,520px)' }} />
              <div className="absolute inset-0" style={{ background:'linear-gradient(to right,rgba(3,26,56,.5),transparent)' }} />
              <div className="absolute top-0 left-0 w-10 h-10" style={{ borderTop:'3px solid #0082FB', borderLeft:'3px solid #0082FB' }} />
              <div className="absolute bottom-0 right-0 w-10 h-10" style={{ borderBottom:'3px solid #FF6600', borderRight:'3px solid #FF6600' }} />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-6 -right-2 sm:-right-6 p-5 sm:p-6 shadow-2xl zc-card">
              <div className="text-white font-black" style={{ fontSize:'clamp(32px,5vw,44px)', lineHeight:1 }}>14+</div>
              <div className="font-bold tracking-widest mt-1" style={{ color:'#FF6600', fontSize:10 }}>YEARS OF EXCELLENCE</div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2 pb-8 lg:pb-0">
            <SectionHeader
              label="WHY CHOOSE US"
              title="ENGINEERING TRUST. DELIVERING EXCELLENCE."
              subtitle="ISO 9001:2015 certified processes, internationally proven materials, and a 14-year track record across India's most critical industrial sites."
              centered={false}
            />
            <p className="text-sm leading-relaxed mb-8 -mt-4" style={{ color:'rgba(255,255,255,.68)' }}>
              From{' '}
              <Link href="/projects/ntpc-power-plant-waterproofing" style={{ color:'#0082FB' }}>NTPC power plant cooling towers</Link>
              {' '}to{' '}
              <Link href="/projects/metro-tunnel-rehabilitation-delhi" style={{ color:'#0082FB' }}>Delhi Metro tunnel repairs</Link>
              , our zero-defect delivery philosophy ensures every project is completed on schedule, within budget, and with full warranty documentation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {whyUs.map(({ Icon, title, desc }, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ delay:i*.08 }}
                  className="flex gap-4 p-4 zc-card group">
                  <div className="w-11 h-11 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[rgba(0,130,251,0.2)]"
                    style={{ background:'rgba(0,130,251,.1)' }}>
                    <Icon size={17} color="#0082FB" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[13px] text-white mb-1 leading-snug">{title}</h4>
                    <p className="text-[12px] leading-relaxed" style={{ color:'rgba(255,255,255,.62)' }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECTS SECTION
───────────────────────────────────────────────────────────────────────────── */
function ProjectCard({ proj, i }) {
  return (
    <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }} transition={{ duration:.5, delay:i*.1 }}>
      <Link href={`/projects/${proj.slug}`}
        title={`${proj.title} – Industrial waterproofing case study`}
        className="zc-card block overflow-hidden group h-full" style={{ textDecoration:'none' }}>
        <div className="relative overflow-hidden" style={{ height:'clamp(180px,24vw,240px)' }}>
          <img src={proj.image} alt={proj.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
          <div className="absolute inset-0" style={{ background:'linear-gradient(to top,#052349 15%,transparent 70%)' }} />
          <div className="absolute top-3 left-3">
            <span className="zc-tag" style={{ background:'rgba(255,102,0,.15)', borderColor:'rgba(255,102,0,.35)', color:'#FF6600' }}>
              {proj.category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span style={{ color:'rgba(255,255,255,.5)', fontSize:11, fontFamily:'monospace' }}>{proj.year}</span>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <h3 className="font-extrabold text-base md:text-lg text-white group-hover:text-[#0082FB] transition-colors mb-2 leading-snug">
            {proj.title}
          </h3>
          <div className="flex flex-wrap gap-3 mb-3">
            <span className="flex items-center gap-1.5 text-xs" style={{ color:'rgba(255,255,255,.6)' }}>
              <Building2 size={12} color="#FF6600" /> {proj.client}
            </span>
            <span className="flex items-center gap-1.5 text-xs" style={{ color:'rgba(255,255,255,.6)' }}>
              <MapPin size={12} color="#0082FB" /> {proj.location}
            </span>
          </div>
          <p className="text-[12px] leading-relaxed mb-2" style={{ color:'rgba(255,255,255,.62)' }}>
            <span className="font-bold tracking-wider" style={{ color:'#FF6600', fontFamily:'monospace', fontSize:10 }}>CHALLENGE: </span>
            {proj.problem}
          </p>
          <p className="text-[12px] leading-relaxed mb-4" style={{ color:'rgba(255,255,255,.62)' }}>
            <span className="font-bold tracking-wider" style={{ color:'#0082FB', fontFamily:'monospace', fontSize:10 }}>OUTCOME: </span>
            {proj.outcome}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {proj.tags.map(t => <span key={t} className="zc-tag">{t}</span>)}
          </div>
          <div className="flex items-center gap-1.5 text-[13px] font-bold tracking-wide text-[#0082FB] group-hover:text-[#FF6600] group-hover:gap-3 transition-all">
            VIEW CASE STUDY <ArrowRight size={13} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ProjectsSection() {
  return (
    <section className="py-16 md:py-24 relative zc-grid-bg" style={{ background:'#021124' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          label="OUR PORTFOLIO"
          title="INDUSTRIAL PROJECT CASE STUDIES"
          subtitle="Real-world waterproofing and structural rehabilitation solutions delivered for India's most critical infrastructure — NTPC power plants, Delhi Metro tunnels, Odisha irrigation dams, and chemical plants."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((p,i) => <ProjectCard key={p.id} proj={p} i={i} />)}
        </div>
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          className="text-center mt-10 md:mt-12">
          <Link href="/projects" className="zc-btn-secondary"
            title="View all industrial waterproofing project case studies">
            VIEW ALL PROJECTS <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TESTIMONIALS SECTION
───────────────────────────────────────────────────────────────────────────── */
function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" style={{ background:'#031a38' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background:'rgba(0,130,251,.04)', filter:'blur(80px)' }} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <SectionHeader
          label="CLIENT TESTIMONIALS"
          title="WHAT INDUSTRY LEADERS SAY"
          subtitle="Trusted by chief engineers, project directors, and facility managers at NTPC, DMRC, Steel Authority, Sun Pharma, and other leading Indian industrial organisations."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {testimonials.slice(0,3).map((t,i) => (
            <motion.div key={t.id}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*.1 }}
              className="zc-card p-6 sm:p-7 flex flex-col relative overflow-hidden group h-full">
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background:'linear-gradient(to right,transparent,#0082FB,transparent)' }} />
              <Quote size={60} color="#0082FB" className="absolute top-4 right-4 pointer-events-none" style={{ opacity:.05 }} />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_,j) => <Star key={j} size={13} fill="#FF6600" color="#FF6600" />)}
              </div>
              <p className="text-sm leading-relaxed flex-1 mb-6 relative z-10 italic"
                style={{ color:'rgba(255,255,255,.8)' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-5" style={{ borderTop:'1px solid rgba(255,255,255,.1)' }}>
                <img src={t.image} alt={t.name}
                  className="w-12 h-12 rounded-full object-cover" style={{ border:'2px solid rgba(255,255,255,.15)' }} />
                <div>
                  <div className="font-bold text-[14px] text-white">{t.name}</div>
                  <div className="text-[12px]" style={{ color:'rgba(255,255,255,.6)' }}>{t.designation}</div>
                  <div className="text-[11px] font-bold tracking-wide mt-0.5" style={{ color:'#FF6600', fontFamily:'monospace' }}>{t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[['ISO 9001:2015','Certified Quality Management'],['OHSAS 18001','Safety Management'],['98%','Client Satisfaction Rate'],['10yr','Average Warranty Period']].map(([v,l],i) => (
            <motion.div key={i}
              initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
              transition={{ delay:i*.1 }}
              className="text-center p-5 zc-card">
              <div className="text-white font-black text-xl sm:text-2xl mb-1">{v}</div>
              <div className="text-[11px] tracking-wider uppercase" style={{ color:'rgba(255,255,255,.6)' }}>{l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FAQ SECTION
───────────────────────────────────────────────────────────────────────────── */
function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-16 md:py-24 relative zc-grid-bg" style={{ background:'#021124' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          label="FREQUENTLY ASKED QUESTIONS"
          title="EXPERT ANSWERS TO YOUR WATERPROOFING QUESTIONS"
          subtitle="Clear, expert answers on our industrial waterproofing, structural rehabilitation, and protective coating services across India."
        />
        <div className="max-w-5xl mx-auto flex flex-col gap-1">
          {faqs.map((f,i) => (
            <div key={i} className="overflow-hidden transition-all duration-300"
              style={{ background:'#052349', border:`1px solid ${open===i?'rgba(0,130,251,.55)':'rgba(255,255,255,.12)'}` }}>
              <button onClick={() => setOpen(open===i?null:i)}
                className="w-full flex items-center justify-between gap-4 text-left cursor-pointer border-0"
                style={{ padding:'18px 22px', background:'none' }}>
                <span className="font-bold text-sm sm:text-[15px] text-white leading-snug">{f.q}</span>
                <ChevronDown size={18}
                  style={{ color:open===i?'#FF6600':'rgba(255,255,255,.55)', transform:open===i?'rotate(180deg)':'none', transition:'transform .3s,color .3s', flexShrink:0 }} />
              </button>
              <AnimatePresence>
                {open===i && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
                    exit={{ height:0, opacity:0 }} transition={{ duration:.3 }}
                    className="overflow-hidden">
                    <div className="px-6 pb-5" style={{ borderTop:'1px solid rgba(255,255,255,.1)' }}>
                      <p className="pt-4 text-sm leading-relaxed" style={{ color:'rgba(255,255,255,.7)' }}>{f.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org","@type":"FAQPage",
        "mainEntity":faqs.map(f=>({ "@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a} }))
      })}} />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <img src="/industry.avif" alt="Industrial infrastructure" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background:'linear-gradient(to right,rgba(2,17,36,.97),rgba(2,17,36,.8) 60%,rgba(2,17,36,.5))' }} />
      <div className="absolute inset-0 zc-grid-bg" style={{ opacity:.14 }} />
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background:'#0082FB' }} />
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background:'linear-gradient(to right,#0082FB,transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="max-w-2xl">
          <div className="zc-label">READY TO START YOUR PROJECT?</div>
          <h2 className="font-black tracking-tight leading-none mb-5 text-white"
            style={{ fontSize:'clamp(30px,6vw,62px)' }}>
            PROTECT YOUR<br />
            <span style={{ color:'#0082FB' }}>INFRASTRUCTURE</span><br />
            TODAY.
          </h2>
          <p className="text-sm sm:text-base leading-relaxed mb-8 max-w-lg"
            style={{ color:'rgba(255,255,255,.75)' }}>
            Get a free technical consultation from our ISO 9001:2015 certified engineering team. We assess your waterproofing or structural rehabilitation problem, propose the optimal system, and deliver results that protect your assets for decades.
          </p>
          <div className="flex flex-col xs:flex-row flex-wrap gap-4">
            <Link href="/contact" className="zc-btn-primary"
              title="Get a free industrial waterproofing consultation from ZasChem India">
              GET FREE CONSULTATION <ArrowRight size={17} />
            </Link>
            <a href="tel:+917004298988" className="zc-btn-secondary"
              title="Call ZasChem India for emergency waterproofing or structural repair">
              <Phone size={15} /> +91-7004298988
            </a>
          </div>
          <div className="flex flex-wrap gap-5 sm:gap-8 mt-8 pt-7"
            style={{ borderTop:'1px solid rgba(255,255,255,.12)' }}>
            {['24hr Emergency Response','Free Site Survey','Pan-India Coverage','10yr Warranty'].map(b => (
              <div key={b} className="flex items-center gap-2 text-[13px]" style={{ color:'rgba(255,255,255,.68)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background:'#FF6600' }} />
                {b}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
     {/*  <GlobalStyles /> */}
      {/* SEO hidden content */}
      <div className="sr-only">
        <h1>ZasChem India Pvt. Ltd. – Industrial Waterproofing &amp; Infrastructure Protection India</h1>
        <p>ZasChem India is a specialized industrial waterproofing and structural rehabilitation contractor serving power plants, tunnels, dams, chemical plants, and manufacturing facilities across India since 2010. ISO 9001:2015 certified. 14+ years experience. 100+ projects. Pan-India service across 15+ states.</p>
      </div>
      <HeroSection />
      <ClientsSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseSection />
      <ProjectsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTABanner />
    </>
  );
}