'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight, Shield, Award, CheckCircle } from 'lucide-react';

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  bgDeep:  'var(--zas-bg-deep, #010e1f)',
  bgCard:  'var(--zas-card, #031a38)',
  blue:    'var(--zas-blue, #0082FB)',
  orange:  'var(--zas-orange, #FF8800)',
  white:   'var(--zas-text, #FFFFFF)',
  muted:   'var(--zas-muted, rgba(255,255,255,0.65))',
  border:  'var(--zas-border, rgba(255,255,255,0.15))',
};

const siteConfig = {
  phone:   '+91-120-4349606 / +91-7004298988',
  phoneTel:'+917004298988',
  email:   'info@zaschem.in',
  address: {
    regd:  'G-72, Kalindi Kunj Road, Sarita Vihar, New Delhi – 110025',
    corp:  '529, Floor PS, Block B, Urbtech NPX, Sector 152, Noida, U.P. 201310',
  },
};

const serviceLinks = [
  { label:'Waterproofing Systems',     href:'/services/waterproofing-systems' },
  { label:'Structural Strengthening', href:'/services/structural-strengthening' },
  { label:'Repair & Rehabilitation',  href:'/services/repair-rehabilitation' },
  { label:'Acid Resistant Lining',    href:'/services/acid-resistant-lining' },
  { label:'Industrial Flooring',      href:'/services/industrial-flooring' },
  { label:'Polyurea Waterproofing',   href:'/services/polyurea-waterproofing' },
  { label:'Heat Reflective Coating',  href:'/services/heat-reflective-coating' },
  { label:'PU Waterproofing',         href:'/services/pu-waterproofing' },
];

const quickLinks = [
  { label:'About ZasChem India',  href:'/about' },
  { label:'Project Portfolio',    href:'/projects' },
  { label:'Contact Us',           href:'/contact' },
  { label:'Terms & Conditions',   href:'/terms-conditions' },
  { label:'Privacy Policy',       href:'/privacy-policy' },
  { label:'Sitemap',              href:'/admin/login' },
];

const sectors = [
  'Power Plants', 'Metro & Tunnels', 'Dams & Reservoirs', 'Chemical Plants',
  'Pharmaceuticals', 'Steel Plants', 'Airports & Ports', 'Industrial Sheds',
];

const cities = [
  'Delhi NCR', 'Noida', 'Ranchi', 'Cuttack', 'Hyderabad',
  'Mumbai', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad',
];

const certs = [
  { icon: Shield,    label:'ISO 9001:2015 Certified' },
  { icon: Award,     label:'OHSAS 18001 Compliant' },
  { icon: CheckCircle,  label:'PSU Approved Contractor' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background:C.bgDeep, borderTop:`1px solid ${C.border}`, position:'relative', overflow:'hidden' }}>

      {/* Grid overlay */}
      <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize:'60px 60px', opacity:0.25, pointerEvents:'none' }} />

      {/* ── CTA strip ── */}
      <div style={{ background:`linear-gradient(to right, rgba(0,130,251,0.15), rgba(0,130,251,0.06), transparent)`, borderBottom:`1px solid ${C.border}`, position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'28px 24px', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:20 }}>
          <div>
            <p style={{ color:C.white, fontWeight:900, fontSize:'clamp(17px,2.5vw,22px)', letterSpacing:'-0.01em', marginBottom:4 }}>
              READY TO PROTECT YOUR INFRASTRUCTURE?
            </p>
            <p style={{ color:C.muted, fontSize:13 }}>
              Free technical consultation from our ISO-certified engineering team. Pan-India coverage. 24hr emergency response.
            </p>
          </div>
          <Link href="/contact"
            title="Get a free industrial waterproofing consultation from ZasChem India"
            style={{ display:'inline-flex', alignItems:'center', gap:8, background:C.orange, color:C.white, border:`1px solid ${C.orange}`, padding:'12px 28px', fontWeight:700, fontSize:13, letterSpacing:'0.1em', textDecoration:'none', flexShrink:0, whiteSpace:'nowrap', transition:'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background='#e55a00'}
            onMouseOut={e => e.currentTarget.style.background=C.orange}>
            GET FREE CONSULTATION <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'60px 24px', position:'relative', zIndex:1 }}>
        {/* FIX: Removed gridTemplateColumns from inline style, added grid-cols-1 className */}
        <div style={{ display:'grid', gap:40 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/" title="ZasChem India Pvt. Ltd. – Home">
              <img src="/logo_1.avif" alt="ZasChem India Pvt. Ltd. – Industrial Waterproofing Specialists"
                style={{ height:48, width:'auto', marginBottom:20, display:'block' }} />
            </Link>

            <p style={{ color:C.muted, fontSize:13, lineHeight:1.8, marginBottom:24 }}>
              India's trusted specialist in industrial waterproofing, structural rehabilitation, and protective coating. Serving power plants, tunnels, dams, and industrial facilities across 15+ states for 14+ years.
            </p>

            {/* Certifications */}
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {certs.map(({ icon: Icon, label }) => (
                <div key={label} style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <Icon size={13} style={{ color:C.blue, flexShrink:0 }} />
                  <span style={{ color:C.muted, fontSize:12 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 style={{ color:C.white, fontWeight:800, fontSize:13, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ width:16, height:2, background:C.orange, display:'inline-block' }} /> Our Services
            </h3>
            <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:8 }}>
              {serviceLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href}
                    title={`ZasChem India – ${l.label} services across India`}
                    style={{ display:'flex', alignItems:'center', gap:8, color:C.muted, fontSize:13, textDecoration:'none', transition:'color 0.2s, padding-left 0.2s', paddingLeft:0 }}
                    onMouseOver={e => { e.currentTarget.style.color = C.white; e.currentTarget.style.paddingLeft='6px'; }}
                    onMouseOut={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.paddingLeft='0'; }}>
                    <ArrowRight size={11} style={{ color:C.blue, opacity:0.7, flexShrink:0 }} />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick links + Sectors */}
          <div>
            <h3 style={{ color:C.white, fontWeight:800, fontSize:13, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ width:16, height:2, background:C.orange, display:'inline-block' }} /> Quick Links
            </h3>
            <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:8, marginBottom:28 }}>
              {quickLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href}
                    title={`ZasChem India – ${l.label}`}
                    style={{ display:'flex', alignItems:'center', gap:8, color:C.muted, fontSize:13, textDecoration:'none', transition:'color 0.2s, padding-left 0.2s', paddingLeft:0 }}
                    onMouseOver={e => { e.currentTarget.style.color = C.white; e.currentTarget.style.paddingLeft='6px'; }}
                    onMouseOut={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.paddingLeft='0'; }}>
                    <ArrowRight size={11} style={{ color:C.blue, opacity:0.7, flexShrink:0 }} />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 style={{ color:C.muted, fontWeight:700, fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:12, fontFamily:'monospace' }}>
              SECTORS WE SERVE
            </h4>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {sectors.map(s => (
                <span key={s} style={{ background:`rgba(0,130,251,0.1)`, border:`1px solid rgba(0,130,251,0.2)`, color:C.muted, fontSize:11, padding:'3px 8px' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 style={{ color:C.white, fontWeight:800, fontSize:13, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ width:16, height:2, background:C.orange, display:'inline-block' }} /> Contact Us
            </h3>

            <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:24 }}>
              <a href={`tel:${siteConfig.phoneTel}`}
                title="Call ZasChem India for industrial waterproofing services"
                style={{ display:'flex', alignItems:'flex-start', gap:10, color:C.muted, fontSize:13, textDecoration:'none', transition:'color 0.2s' }}
                onMouseOver={e => e.currentTarget.style.color = C.white}
                onMouseOut={e => e.currentTarget.style.color = C.muted}>
                <Phone size={14} style={{ color:C.orange, marginTop:1, flexShrink:0 }} />
                <span>{siteConfig.phone}</span>
              </a>
              <a href={`mailto:${siteConfig.email}`}
                title="Email ZasChem India for waterproofing quotation or technical query"
                style={{ display:'flex', alignItems:'flex-start', gap:10, color:C.muted, fontSize:13, textDecoration:'none', transition:'color 0.2s' }}
                onMouseOver={e => e.currentTarget.style.color = C.white}
                onMouseOut={e => e.currentTarget.style.color = C.muted}>
                <Mail size={14} style={{ color:C.blue, marginTop:1, flexShrink:0 }} />
                <span>{siteConfig.email}</span>
              </a>
              <div style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                <MapPin size={14} style={{ color:C.orange, marginTop:1, flexShrink:0 }} />
                <div style={{ color:C.muted, fontSize:12, lineHeight:1.6 }}>
                  <strong style={{ color:C.white, display:'block', marginBottom:2 }}>Registered Office:</strong>
                  {siteConfig.address.regd}
                  <br /><br />
                  <strong style={{ color:C.white, display:'block', marginBottom:2 }}>Corporate Office:</strong>
                  {siteConfig.address.corp}
                </div>
              </div>
            </div>

            {/* Service cities */}
            <h4 style={{ color:C.muted, fontWeight:700, fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:10, fontFamily:'monospace' }}>
              SERVICE LOCATIONS
            </h4>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {cities.map(c => (
                <span key={c} style={{ background:C.bgCard, border:`1px solid ${C.border}`, color:C.muted, fontSize:11, padding:'3px 8px' }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ borderTop:`1px solid ${C.border}`, position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'20px 24px', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:12 }}>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:12 }}>
            © {year} ZasChem India Pvt. Ltd. All rights reserved. | ISO 9001:2015 Certified Industrial Waterproofing Contractors
          </p>
          <p style={{ color:'rgba(255,255,255,0.3)', fontSize:11, fontFamily:'monospace', letterSpacing:'0.15em' }}>
            BUILDING THE FUTURE TOGETHER
          </p>
        </div>
      </div>

      {/* LocalBusiness schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "ZasChem India Pvt. Ltd.",
        "description": "India's trusted specialist in industrial waterproofing, structural rehabilitation, acid resistant lining, and protective coating for power plants, tunnels, dams, and chemical plants.",
        "url": "https://www.zaschem.in",
        "telephone": "+91-7004298988",
        "email": "info@zaschem.in",
        "image": "https://www.zaschem.in/og-home.avif",
        "priceRange": "₹₹₹",
        "foundingDate": "2010",
        "numberOfEmployees": "50+",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "G-72, Kalindi Kunj Road, Sarita Vihar",
          "addressLocality": "New Delhi",
          "postalCode": "110025",
          "addressCountry": "IN"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": 28.5355, "longitude": 77.2910 },
        "areaServed": {
          "@type": "Country",
          "name": "India",
          "description": "Pan-India industrial waterproofing and structural rehabilitation services across 15+ states"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Industrial Waterproofing Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Industrial Waterproofing Systems" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Structural Strengthening & CFRP" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Acid Resistant Lining" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Concrete Repair & Rehabilitation" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Industrial Epoxy Flooring" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Polyurea Waterproofing" } }
          ]
        },
        "sameAs": [
          "https://www.linkedin.com/company/zaschem-india",
          "https://www.facebook.com/zaschemIndia"
        ]
      })}} />
    </footer>
  );
}