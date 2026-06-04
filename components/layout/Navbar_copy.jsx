'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Phone, Mail, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  bgDeep:   '#021124',
  bgDark:   '#031a38',
  bgCard:   '#052349',
  blue:     '#0082FB',
  orange:   '#FF6600',
  white:    '#FFFFFF',
  muted:    'rgba(255,255,255,0.72)',
  border:   'rgba(255,255,255,0.12)',
};

const siteConfig = {
  phone: '+91-120-4349606 / +91-7004298988',
  phoneTel: '+917004298988',
  email: 'info@zaschem.in',
};

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Waterproofing Systems',     href: '/services/waterproofing-systems',     desc: 'Crystalline, cementitious & membrane' },
      { label: 'Structural Strengthening',  href: '/services/structural-strengthening',  desc: 'CFRP, FRP & column jacketing' },
      { label: 'Repair & Rehabilitation',   href: '/services/repair-rehabilitation',      desc: 'Crack injection, polymer mortars' },
      { label: 'Acid Resistant Lining',     href: '/services/acid-resistant-lining',      desc: 'Furan resin, epoxy phenolic' },
      { label: 'Industrial Flooring',       href: '/services/industrial-flooring',        desc: 'Epoxy, PU screed, MMA' },
      { label: 'Polyurea Waterproofing',    href: '/services/polyurea-waterproofing',     desc: 'Rapid-cure seamless membrane' },
      { label: 'Heat Reflective Coating',   href: '/services/heat-reflective-coating',    desc: 'Cool roof, solar reflective' },
      { label: 'PU Waterproofing',          href: '/services/pu-waterproofing',           desc: 'UV stable, high elongation' },
    ],
  },
  { label: 'Projects',  href: '/projects' },
  { label: 'About',     href: '/about' },
  { label: 'Contact',   href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const dropTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleDropEnter = (label) => {
    clearTimeout(dropTimer.current);
    setDropdown(label);
  };
  const handleDropLeave = () => {
    dropTimer.current = setTimeout(() => setDropdown(null), 150);
  };

  const headerBg = scrolled
    ? `rgba(2,17,36,0.96)`
    : `rgba(3,26,56,0.92)`;

  return (
    <>
      {/* ── Top bar (desktop only) ── */}
      <div style={{ background: C.bgDeep, borderBottom:`1px solid ${C.border}`, padding:'6px 0' }} className="hidden lg:block">
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', gap:24 }}>
            <a href={`tel:${siteConfig.phoneTel}`}
              style={{ display:'flex', alignItems:'center', gap:6, color:C.muted, fontSize:12, textDecoration:'none', transition:'color 0.2s' }}
              onMouseOver={e => e.currentTarget.style.color = C.orange}
              onMouseOut={e => e.currentTarget.style.color = C.muted}
              title="Call ZasChem India for industrial waterproofing inquiry">
              <Phone size={11} style={{ color:C.orange }} /> {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`}
              style={{ display:'flex', alignItems:'center', gap:6, color:C.muted, fontSize:12, textDecoration:'none', transition:'color 0.2s' }}
              onMouseOver={e => e.currentTarget.style.color = C.blue}
              onMouseOut={e => e.currentTarget.style.color = C.muted}
              title="Email ZasChem India for industrial waterproofing quotation">
              <Mail size={11} style={{ color:C.blue }} /> {siteConfig.email}
            </a>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, color:C.blue, fontSize:11, fontFamily:'monospace', letterSpacing:'0.15em' }}>
            <span style={{ display:'inline-block', width:6, height:6, borderRadius:'50%', background:'#22c55e', animation:'pulse 2s infinite' }} />
            AVAILABLE FOR NEW PROJECTS — PAN INDIA
          </div>
        </div>
      </div>

      {/* ── Main header ── */}
      <header style={{
        position:'sticky', top:0, zIndex:50,
        background: headerBg,
        backdropFilter:'blur(16px)',
        WebkitBackdropFilter:'blur(16px)',
        borderBottom:`1px solid ${scrolled ? C.border : 'transparent'}`,
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.5)' : 'none',
        transition:'all 0.3s',
      }}>
        <nav style={{ maxWidth:1280, margin:'0 auto', padding:'0 20px', display:'flex', alignItems:'center', justifyContent:'space-between', height:68 }}>

          {/* Logo */}
          <Link href="/" onClick={() => setMobileOpen(false)}
            style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none', zIndex:10 }}
            title="ZasChem India Pvt. Ltd. – Industrial Waterproofing Home">
            <img src="/logo_1.avif" alt="ZasChem India Pvt. Ltd. – Industrial Waterproofing Specialists"
              style={{ height:44, width:'auto' }} />
          </Link>

          {/* Desktop nav */}
          <ul style={{ display:'none', alignItems:'center', margin:0, padding:0, listStyle:'none', gap:0 }} className="lg:flex">
            {navLinks.map(link => (
              <li key={link.href} style={{ position:'relative' }}
                onMouseEnter={() => link.children && handleDropEnter(link.label)}
                onMouseLeave={() => link.children && handleDropLeave()}>
                <Link href={link.href}
                  title={link.label === 'Services' ? 'Industrial waterproofing and protection services by ZasChem India' : `ZasChem India – ${link.label}`}
                  style={{ display:'flex', alignItems:'center', gap:4, padding:'0 16px', height:68, color:C.white, fontWeight:700, fontSize:13, letterSpacing:'0.1em', textTransform:'uppercase', textDecoration:'none', position:'relative', transition:'color 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.color = C.blue; }}
                  onMouseOut={e => { e.currentTarget.style.color = C.white; }}>
                  {link.label}
                  {link.children && (
                    <ChevronDown size={13} style={{ transition:'transform 0.2s', transform: dropdown === link.label ? 'rotate(180deg)' : 'rotate(0)' }} />
                  )}
                  {/* Underline indicator */}
                  <span style={{ position:'absolute', bottom:0, left:16, right:16, height:2, background:C.orange, transform: dropdown === link.label ? 'scaleX(1)' : 'scaleX(0)', transition:'transform 0.2s', transformOrigin:'left' }} />
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && dropdown === link.label && (
                    <motion.div
                      initial={{ opacity:0, y:8, scale:0.97 }}
                      animate={{ opacity:1, y:0, scale:1 }}
                      exit={{ opacity:0, y:8, scale:0.97 }}
                      transition={{ duration:0.18 }}
                      onMouseEnter={() => handleDropEnter(link.label)}
                      onMouseLeave={handleDropLeave}
                      style={{ position:'absolute', top:'100%', left:0, width:300, background:C.bgCard, border:`1px solid ${C.border}`, boxShadow:`0 24px 60px rgba(0,0,0,0.7)`, zIndex:60, padding:'8px 0' }}>
                      {/* Top accent */}
                      <div style={{ height:2, background:`linear-gradient(to right, transparent, ${C.blue}, transparent)`, marginBottom:4 }} />

                      {link.children.map(child => (
                        <Link key={child.href} href={child.href}
                          title={`ZasChem India ${child.label} – ${child.desc}`}
                          onClick={() => setDropdown(null)}
                          style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'10px 20px', textDecoration:'none', transition:'background 0.2s, padding-left 0.2s' }}
                          onMouseOver={e => { e.currentTarget.style.background = 'rgba(0,130,251,0.08)'; e.currentTarget.style.paddingLeft='28px'; }}
                          onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft='20px'; }}>
                          <span style={{ width:4, height:4, borderRadius:'50%', background:C.orange, marginTop:7, flexShrink:0 }} />
                          <div>
                            <div style={{ color:C.white, fontWeight:600, fontSize:13, marginBottom:2 }}>{child.label}</div>
                            <div style={{ color:C.muted, fontSize:11 }}>{child.desc}</div>
                          </div>
                        </Link>
                      ))}

                      <div style={{ borderTop:`1px solid ${C.border}`, margin:'8px 0 4px' }} />
                      <Link href="/services"
                        style={{ display:'flex', alignItems:'center', gap:6, padding:'10px 20px', color:C.blue, fontSize:12, fontWeight:700, letterSpacing:'0.08em', textDecoration:'none', transition:'color 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.color = C.orange}
                        onMouseOut={e => e.currentTarget.style.color = C.blue}>
                        VIEW ALL SERVICES <ArrowRight size={12} />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* Desktop CTA + Mobile toggle */}
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <Link href="/contact"
              title="Get a free industrial waterproofing quote from ZasChem India"
              style={{ display:'none', background:C.orange, color:C.white, border:`1px solid ${C.orange}`, padding:'10px 22px', fontWeight:700, fontSize:12, letterSpacing:'0.1em', textDecoration:'none', transition:'background 0.2s, transform 0.2s', gap:6 }}
              className="lg:inline-flex items-center"
              onMouseOver={e => { e.currentTarget.style.background='#e55a00'; e.currentTarget.style.transform='translateY(-1px)'; }}
              onMouseOut={e => { e.currentTarget.style.background=C.orange; e.currentTarget.style.transform='none'; }}>
              GET QUOTE
            </Link>

            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              style={{ display:'flex', alignItems:'center', justifyContent:'center', width:44, height:44, background:C.bgCard, border:`1px solid ${C.border}`, color:C.white, cursor:'pointer', transition:'border-color 0.2s' }}
              className="lg:hidden"
              onMouseOver={e => e.currentTarget.style.borderColor = C.blue}
              onMouseOut={e => e.currentTarget.style.borderColor = C.border}
              aria-label="Toggle navigation menu"
              title="Open navigation menu">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              style={{ position:'fixed', inset:0, background:'rgba(2,17,36,0.85)', backdropFilter:'blur(8px)', zIndex:55 }}
              className="lg:hidden" onClick={() => setMobileOpen(false)} />

            <motion.div initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }}
              transition={{ type:'tween', duration:0.3 }}
              style={{ position:'fixed', top:0, right:0, bottom:0, width:'min(360px, 90vw)', background:C.bgDeep, borderLeft:`1px solid ${C.border}`, zIndex:60, display:'flex', flexDirection:'column', overflowY:'auto' }}
              className="lg:hidden">

              {/* Mobile header */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
                <div style={{ display:'flex', flexDirection:'column' }}>
                  <span style={{ color:C.white, fontWeight:900, fontSize:18, letterSpacing:'0.1em' }}>ZasChem</span>
                  <span style={{ color:C.orange, fontSize:9, fontFamily:'monospace', letterSpacing:'0.3em' }}>INDIA PVT. LTD.</span>
                </div>
                <button onClick={() => setMobileOpen(false)}
                  style={{ width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', background:'transparent', border:`1px solid ${C.border}`, color:C.muted, cursor:'pointer' }}
                  title="Close navigation menu">
                  <X size={18} />
                </button>
              </div>

              {/* Contact strip */}
              <div style={{ padding:'12px 20px', background:C.bgCard, borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
                <a href={`tel:${siteConfig.phoneTel}`}
                  style={{ display:'flex', alignItems:'center', gap:8, color:C.muted, fontSize:12, textDecoration:'none', marginBottom:8 }}>
                  <Phone size={12} style={{ color:C.orange }} /> {siteConfig.phone}
                </a>
                <a href={`mailto:${siteConfig.email}`}
                  style={{ display:'flex', alignItems:'center', gap:8, color:C.muted, fontSize:12, textDecoration:'none' }}>
                  <Mail size={12} style={{ color:C.blue }} /> {siteConfig.email}
                </a>
              </div>

              {/* Nav links */}
              <div style={{ flex:1, padding:'12px 8px' }}>
                {navLinks.map((link, i) => (
                  <div key={link.href}>
                    <div style={{ display:'flex', alignItems:'center' }}>
                      <Link href={link.href}
                        onClick={() => { if (!link.children) setMobileOpen(false); }}
                        style={{ flex:1, display:'flex', alignItems:'center', padding:'14px 16px', color:C.muted, fontWeight:700, fontSize:13, letterSpacing:'0.1em', textTransform:'uppercase', textDecoration:'none', borderRadius:4, transition:'color 0.2s, background 0.2s' }}
                        onMouseOver={e => { e.currentTarget.style.color = C.white; e.currentTarget.style.background = C.bgCard; }}
                        onMouseOut={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.background = 'transparent'; }}>
                        {link.label}
                      </Link>
                      {link.children && (
                        <button onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                          style={{ width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', background:'transparent', border:'none', color:C.muted, cursor:'pointer' }}
                          title={`Toggle ${link.label} submenu`}>
                          <ChevronDown size={16} style={{ transform: mobileExpanded === link.label ? 'rotate(180deg)' : 'none', color: mobileExpanded === link.label ? C.blue : C.muted, transition:'transform 0.3s, color 0.3s' }} />
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {link.children && mobileExpanded === link.label && (
                        <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
                          exit={{ height:0, opacity:0 }} transition={{ duration:0.25 }}
                          style={{ overflow:'hidden' }}>
                          <div style={{ marginLeft:16, paddingLeft:16, borderLeft:`2px solid rgba(0,130,251,0.4)`, marginBottom:8 }}>
                            {link.children.map(child => (
                              <Link key={child.href} href={child.href}
                                onClick={() => setMobileOpen(false)}
                                style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 12px', color:C.muted, fontSize:13, textDecoration:'none', borderRadius:4, transition:'color 0.2s, background 0.2s' }}
                                onMouseOver={e => { e.currentTarget.style.color = C.blue; e.currentTarget.style.background = C.bgCard; }}
                                onMouseOut={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.background = 'transparent'; }}>
                                <span style={{ width:5, height:5, borderRadius:'50%', background:C.orange, flexShrink:0 }} />
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {i < navLinks.length - 1 && (
                      <div style={{ height:1, background:C.border, margin:'0 16px' }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom CTAs */}
              <div style={{ padding:'20px', borderTop:`1px solid ${C.border}`, flexShrink:0, display:'flex', flexDirection:'column', gap:10 }}>
                <Link href="/contact" onClick={() => setMobileOpen(false)}
                  style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'14px', background:C.orange, color:C.white, fontWeight:700, fontSize:13, letterSpacing:'0.1em', textDecoration:'none' }}
                  title="Get a free industrial waterproofing quotation">
                  GET FREE QUOTE <ArrowRight size={15} />
                </Link>
                <a href={`tel:${siteConfig.phoneTel}`}
                  style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'14px', background:'transparent', color:C.white, fontWeight:600, fontSize:13, letterSpacing:'0.08em', border:`1px solid ${C.border}`, textDecoration:'none' }}
                  title="Call ZasChem India now">
                  <Phone size={14} /> CALL NOW
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}