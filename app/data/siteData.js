export const siteConfig = {
  name: "ZasChem INDIA PVT. LTD.",
  tagline: "BUILDING THE FUTURE TOGETHER",
  description: "India's trusted industrial waterproofing, infrastructure protection, and structural rehabilitation specialists. Serving power plants, tunnels, dams, and industrial facilities across India.",
  email: "info@zaschem.in",
  // Displayed in footer/header as a single phone line.
  phone: "+91-120-4349606 (Tel) / +91-7004298988 (Mob)",
  address:
    "Regd. Office: G-72, Kalindi Kunj Road, Sarita Vihar Road, New Delhi-110025\n\nZasChem INDIA PVT. LTD.\nAn ISO 9001:2008 Certified Company\n\nCorp Off: 529, Floor PS, Block B, Urbtech NPX, Sector 152, Noida, U.P. 201310",
  social: {
    linkedin: "#",
    twitter: "#",
    facebook: "#",
    youtube: "#",
  },
};

export const heroSlides = [
  {
    id: 1,
    slug: "waterproofing-systems",
    title: "POWER PLANT WATERPROOFING",
    subtitle: "Industrial-Grade Protection for Critical Infrastructure",
    description: "Specialized waterproofing solutions for cooling towers, turbine halls, and transformer bunds. Zero downtime. Maximum protection.",
    cta: { label: "Explore Service", href: "/services/waterproofing-systems" },
    image: "/nuclear_power_plant.avif",
    accent: "#0F5EFF",
  },
  {
    id: 2,
    slug: "tunnel-rehabilitation",
    title: "TUNNEL REHABILITATION",
    subtitle: "Structural Repair & Waterproofing for Underground Infrastructure",
    description: "Advanced tunnel lining repair, crack injection, and waterproof membrane application for metro, highway, and railway tunnels.",
    cta: { label: "View Projects", href: "/services/repair-rehabilitation" },
    image: "/tunnel_rehabilation.avif",
    accent: "#F97316",
  },
  {
    id: 3,
    slug: "acid-resistant-lining",
    title: "ACID RESISTANT LINING",
    subtitle: "Chemical Plant & Effluent Treatment Protection",
    description: "Furan resin-based acid and alkali resistant lining systems for chemical reactors, ETP tanks, and industrial floors.",
    cta: { label: "Learn More", href: "/services/acid-resistant-lining" },
    image: "/p1.avif",
    accent: "#0F5EFF",
  },
  {
    id: 4,
    slug: "industrial-epoxy-flooring",
    title: "INDUSTRIAL EPOXY FLOORING",
    subtitle: "High-Performance Flooring for Factories & Warehouses",
    description: "Anti-static, chemical resistant, and heavy-duty epoxy & PU flooring systems designed for harsh industrial environments.",
    cta: { label: "Get Quote", href: "/services/industrial-flooring" },
    image: "/epoxy.avif",
    accent: "#F97316",
  },
  {
    id: 5,
    slug: "structural-rehabilitation",
    title: "STRUCTURAL REHABILITATION",
    subtitle: "Restoring Strength to Ageing Concrete Structures",
    description: "Carbon fiber wrapping, rebar treatment, crack injection, and polymer-modified repair mortars for complete structural restoration.",
    cta: { label: "Explore Solutions", href: "/services/structural-rehabilitation" },
    image: "/structural_rehabilation.avif",
    accent: "#0F5EFF",
  },
];

export const stats = [
  { id: 1, value: '25+', label: 'Power Plants Served', icon: 'Zap' },
  { id: 2, value: '150+', label: 'Civil Engineers Trust Us', icon: 'Users' },
  { id: 3, value: '40+', label: 'In-House Experts', icon: 'Award' },
  { id: 4, value: '13+', label: 'Years of Excellence', icon: 'CheckCircle' },  // 2013 se 2026 = 13+ years
  { id: 5, value: '100%', label: 'Execution Audit', icon: 'ThumbsUp' },
  { id: 6, value: '8+', label: 'International Partners', icon: 'Globe' },  // NEW - Dubai Adhesive, Seal Boss, SIKA, BASF, FOSROC, etc.
];

export const services = [
  {
    id: 1,
    slug: "waterproofing-systems",
    title: "Waterproofing Systems",
    shortDesc: "Comprehensive waterproofing solutions for roofs, basements, terraces, water tanks, and industrial structures using crystalline, cementitious, and membrane-based systems.",
    description: `ZasChem India delivers comprehensive waterproofing systems engineered for India's diverse climate and infrastructure needs. Our waterproofing solutions combine crystalline technology, cementitious coatings, and high-performance membrane systems to provide lasting protection for rooftops, basements, water-retaining structures, and industrial facilities.

    We specialize in positive-side and negative-side waterproofing, ensuring complete moisture control from both directions. Our systems are compatible with new construction and retrofitting of existing structures, minimizing disruption while maximizing protection.

    From residential terraces to large-scale industrial roof waterproofing, our certified applicators ensure precise surface preparation, application, and quality control at every stage.`,
    features: ["Crystalline Waterproofing", "Cementitious Coating", "HDPE/TPO Membrane", "Liquid Applied Systems", "Injection Grouting", "Positive & Negative Side"],
    applications: ["Rooftops & Terraces", "Basements & Foundations", "Water Tanks & Sumps", "Retaining Walls", "Swimming Pools", "Underground Structures"],
    icon: "Droplets",
    image: "/power_plant.avif",
    metaTitle: "Industrial Waterproofing Systems | ZasChem India",
    metaDesc: "Expert waterproofing contractors in India. Crystalline, cementitious & membrane waterproofing for industrial, power plant, and infrastructure projects.",
    keywords: ["industrial waterproofing India", "waterproofing contractors India", "roof waterproofing", "basement waterproofing"],
  },
  {
    id: 2,
    slug: "structural-strengthening",
    title: "Structural Strengthening",
    shortDesc: "Carbon fiber reinforcement, FRP wrapping, and structural bonding systems to restore and enhance load-bearing capacity of deteriorated structures.",
    description: `Our structural strengthening services combine cutting-edge carbon fiber reinforced polymer (CFRP) technology with proven engineering principles to restore and enhance the structural integrity of aging infrastructure.

    We provide column jacketing, beam strengthening, slab reinforcement, and shear wall upgrades using internationally certified materials. Our structural engineers conduct thorough assessment before designing a customized rehabilitation program.

    ZasChem India has strengthened structures across power plants, bridges, industrial facilities, and heritage buildings — extending service life by decades while meeting current load requirements.`,
    features: ["CFRP Wrapping", "FRP Laminates", "Column Jacketing", "Beam Strengthening", "Structural Adhesives", "Load Capacity Enhancement"],
    applications: ["Bridges & Flyovers", "Power Plant Structures", "Industrial Buildings", "Parking Decks", "Historical Structures", "Marine Structures"],
    icon: "Building2",
    image: "/structural_rehabilation.avif",
    metaTitle: "Structural Strengthening & Carbon Fiber Wrapping | ZasChem India",
    metaDesc: "CFRP structural strengthening services for bridges, power plants and industrial structures. Certified structural rehabilitation contractors across India.",
    keywords: ["structural strengthening India", "carbon fiber wrapping", "CFRP strengthening", "structural rehabilitation"],
  },
  {
    id: 3,
    slug: "repair-rehabilitation",
    title: "Repair & Rehabilitation",
    shortDesc: "Concrete repair, crack injection, spall repair, and complete structural rehabilitation for deteriorated infrastructure assets.",
    description: `Concrete deterioration is inevitable, but with ZasChem India's repair and rehabilitation services, your infrastructure can regain its original strength and serve for decades more. We tackle every form of concrete distress — carbonation, chloride attack, alkali-silica reaction, freeze-thaw damage, and mechanical impact.

    Our repair methodology follows a systematic process: damage assessment, cause analysis, surface preparation (hydrodemolition or mechanical), primer application, polymer-modified repair mortar placement, and protective coating. Every repair is designed to be durable, bonded, and compatible with the existing substrate.

    We carry out both emergency repairs and planned rehabilitation programs for power plants, industrial facilities, bridges, dams, and coastal structures.`,
    features: ["Crack Injection", "Spall Repair", "Carbonation Treatment", "Hydrodemolition", "Polymer Mortars", "Protective Overlays"],
    applications: ["Industrial Plants", "Bridges & Viaducts", "Dams & Reservoirs", "Chimneys & Silos", "Marine Structures", "Airports & Ports"],
    icon: "Wrench",
    image: "/tunnel.avif",
    metaTitle: "Concrete Repair & Rehabilitation Services India | ZasChem India",
    metaDesc: "Professional concrete repair and structural rehabilitation across India. Crack injection, spall repair, and complete infrastructure restoration services.",
    keywords: ["concrete repair India", "structural rehabilitation", "crack injection", "concrete restoration"],
  },
  {
    id: 4,
    slug: "acid-resistant-lining",
    title: "Acid Resistant Lining",
    shortDesc: "Furan resin, epoxy phenolic, and vinyl ester-based chemical resistant lining for ETP tanks, reactors, and industrial floors exposed to aggressive chemicals.",
    description: `Industrial chemical environments demand protective linings that can withstand constant exposure to acids, alkalis, solvents, and high-temperature conditions. ZasChem India provides engineering-grade acid and alkali resistant lining systems using furan resin, epoxy phenolic, and vinyl ester binders with chemical-resistant tiles, bricks, or monolithic membranes.

    Our certified applicators prepare surfaces to near-white blasting standards, ensuring maximum adhesion and barrier effectiveness. We provide complete turnkey solutions including design, material supply, surface preparation, application, and QA/QC documentation.

    Industries served include fertilizers, pharmaceuticals, petrochemicals, steel plants, paper mills, and effluent treatment plants — wherever chemical aggression threatens the structural asset.`,
    features: ["Furan Resin Systems", "Epoxy Phenolic Coatings", "Vinyl Ester Linings", "Acid-Proof Brick Lining", "Chemical Resistant Tiles", "High-Temp Resistant"],
    applications: ["ETP & STP Plants", "Chemical Reactors", "Fertilizer Plants", "Pharma Facilities", "Steel Plants", "Paper Mills"],
    icon: "FlaskConical",
    image: "/acid_lining.avif",
    metaTitle: "Acid Resistant Lining Contractors India | ZasChem India",
    metaDesc: "Furan resin & epoxy-based acid resistant lining for chemical plants, ETP tanks & industrial floors. Expert chemical resistant coating services across India.",
    keywords: ["acid resistant lining India", "chemical resistant coating", "furan resin lining", "ETP tank lining"],
  },
  {
    id: 5,
    slug: "industrial-flooring",
    title: "Industrial Flooring",
    shortDesc: "Epoxy, polyurethane, and polished concrete flooring systems for factories, warehouses, pharmaceutical plants, and food processing facilities.",
    description: `Industrial floors endure constant mechanical stress, chemical spills, thermal cycling, and hygiene demands that conventional flooring cannot handle. ZasChem India engineers and installs high-performance industrial flooring systems tailored to the specific operational requirements of each facility.

    Our flooring range includes self-levelling epoxy coatings, heavy-duty epoxy toppings, polyurethane screed for thermal cycling environments, methyl methacrylate (MMA) floors for rapid return to service, and decorative polished concrete.

    We conduct comprehensive substrate assessment, including pull-off tests, before recommending the optimal system. All installations follow strict quality protocols ensuring flatness, adhesion strength, and resistance properties meet or exceed specifications.`,
    features: ["Self-Levelling Epoxy", "Anti-Static Flooring", "PU Screed", "MMA Flooring", "Polished Concrete", "Conductive Flooring"],
    applications: ["Automotive Plants", "Food & Beverage", "Pharmaceutical", "Warehouses & Logistics", "Electronics Manufacturing", "Power Plants"],
    icon: "Layers",
    image: "/epoxy.avif",
    metaTitle: "Industrial Epoxy Flooring Contractors India | ZasChem India",
    metaDesc: "Anti-static, chemical resistant epoxy & PU industrial flooring. Expert installation for factories, pharma, and power plants across India.",
    keywords: ["industrial epoxy flooring India", "anti-static flooring", "PU flooring India", "factory floor coating"],
  },
  {
    id: 6,
    slug: "polyurea-waterproofing",
    title: "Polyurea Waterproofing",
    shortDesc: "Rapid-cure, seamless polyurea spray coating for roofs, secondary containment, tunnels, and water tanks requiring flexible, high-elongation waterproofing.",
    description: `Polyurea is the most advanced spray-applied waterproofing technology available today, offering unmatched speed, flexibility, chemical resistance, and durability. ZasChem India operates professional plural-component heated spray equipment to apply polyurea systems across large areas rapidly, with minimal downtime.

    Polyurea cures within seconds of application, reaches full strength within hours, and forms a completely seamless membrane with excellent elongation (>300%) and tensile strength. It adheres to concrete, steel, wood, and foam, making it ideal for complex geometric surfaces.

    Our polyurea systems are used for water containment, secondary containment for hazardous chemicals, tunnel linings, roof waterproofing, and protective coatings for marine and offshore structures.`,
    features: ["Rapid Cure (<60 sec)", ">300% Elongation", "Seamless Application", "Chemical Resistant", "UV Stable Grades", "Temperature Resistant"],
    applications: ["Roof Waterproofing", "Secondary Containment", "Tunnel Lining", "Water Reservoirs", "Bridge Decks", "Marine Structures"],
    icon: "Waves",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
    metaTitle: "Polyurea Waterproofing Services India | ZasChem India",
    metaDesc: "Professional polyurea spray waterproofing for roofs, tunnels, and containment structures. Fast-cure seamless membrane application across India.",
    keywords: ["polyurea waterproofing India", "spray polyurea coating", "seamless waterproofing", "polyurea contractors India"],
  },
  {
    id: 7,
    slug: "heat-reflective-coating",
    title: "Heat Reflective Coating",
    shortDesc: "Solar reflective and cool roof coating systems that reduce building surface temperature by 10-20°C, lowering cooling loads and improving occupant comfort.",
    description: `India's intense solar radiation causes roof and wall surfaces to absorb massive heat, dramatically increasing air conditioning loads and shortening structural life. ZasChem India's heat reflective coating systems use advanced reflective pigments and IR-blocking technology to reflect up to 90% of solar radiation.

    Our cool roof coatings reduce roof surface temperatures by 15-20°C, translating to energy savings of 15-25% in air conditioning costs. They also provide waterproofing benefits, UV protection, and thermal expansion relief — extending roof life significantly.

    Suitable for RCC roofs, metal sheets, asbestos sheets, and pre-engineered buildings, our heat reflective coatings are formulated for India's climate and carry GRIHA/green building compatibility.`,
    features: ["Solar Reflectance >85%", "Waterproofing Benefit", "UV Resistant", "Energy Saving", "Reduces Heat Islands", "GRIHA Compatible"],
    applications: ["Commercial Buildings", "Industrial Sheds", "Cold Storage", "Pre-Engineered Buildings", "Warehouses", "Residential Rooftops"],
    icon: "Sun",
    image: "/industries.avif",
    metaTitle: "Heat Reflective Coating for Roofs India | ZasChem India",
    metaDesc: "Cool roof & heat reflective coatings reducing roof temperature by 15-20°C. Energy-saving waterproofing solutions for industrial and commercial buildings.",
    keywords: ["heat reflective coating India", "cool roof coating", "solar reflective paint", "roof insulation coating"],
  },
  {
    id: 8,
    slug: "pu-waterproofing",
    title: "PU Waterproofing",
    shortDesc: "Polyurethane-based liquid applied waterproofing membranes offering excellent flexibility, UV resistance, and adhesion for exposed roofs and terraces.",
    description: `Polyurethane waterproofing represents the gold standard for exposed application areas where flexibility, UV resistance, and aesthetic finish are equally important. ZasChem India provides single and two-component PU waterproofing systems in various grades including traffic-bearing, UV-stable, and chemical-resistant formulations.

    PU membranes bond seamlessly to concrete, masonry, metal, and existing substrates, forming an elastic membrane that accommodates structural movement without cracking. They are applied at 1-2mm thickness and can be reinforced with fiberglass mesh for added tear resistance.

    Our PU systems are ideal for exposed terraces, podium slabs, planter boxes, green roofs, and areas where the membrane serves as a wearing surface. Available in multiple colors to complement architectural aesthetics.`,
    features: ["High Elongation (>200%)", "UV Stable", "Traffic Bearing Grade", "Single & Two-Component", "Fiberglass Reinforced", "Multiple Colors"],
    applications: ["Exposed Terraces", "Podium Slabs", "Planter Boxes", "Green Roofs", "Parking Decks", "Balconies"],
    icon: "Shield",
    image: "water_proofing.avif",
    metaTitle: "PU Waterproofing Contractors India | ZasChem India",
    metaDesc: "Polyurethane liquid applied waterproofing for terraces, roofs & parking decks. UV stable, flexible PU membrane systems applied by certified applicators.",
    keywords: ["PU waterproofing India", "polyurethane waterproofing", "liquid waterproofing membrane", "terrace waterproofing"],
  },
];



export const projects = [
  {
    id: 1,
    slug: "ntpc-power-plant-waterproofing",
    title: "NTPC Cooling Tower Waterproofing",
    client: "NTPC Limited",
    location: "Singrauli, Madhya Pradesh",
    year: "2022",
    category: "Power Plant",
    problem: "Severe leakage and concrete deterioration in 8 cooling tower cells causing water loss and structural damage.",
    solution: "Applied ZAS PU FLEX 500 polyurethane waterproofing with crystalline treatment to internal surfaces. Structural cracks injected with epoxy resins.",
    outcome: "100% leakage control achieved. Structural integrity restored. 15-year protection warranty.",
     image: "power_plant.avif",
    tags: ["Waterproofing", "Power Plant", "PU Membrane"],
    featured: true,
  },
  {
    id: 2,
    slug: "metro-tunnel-rehabilitation-delhi",
    title: "Delhi Metro Tunnel Crack Repair",
    client: "Delhi Metro Rail Corporation",
    location: "Delhi, NCR",
    year: "2023",
    category: "Tunnel",
    problem: "Water ingress through cracks and construction joints in 2.5km metro tunnel section causing service disruption risk.",
    solution: "Polyurethane foam injection for active leaks, epoxy resin injection for structural cracks, crystalline coating on tunnel lining.",
    outcome: "Complete waterproofing achieved within 60-hour maintenance window. Zero re-occurrence in 18 months.",
     image: "tunnel.avif",
     tags: ["Tunnel Repair", "Crack Injection", "Metro"],
    featured: true,
  },
  {
    id: 3,
    slug: "chemical-plant-acid-lining-ranchi",
    title: "ETP Tank Acid Resistant Lining",
    client: "Confidential Chemical Manufacturer",
    location: "Ranchi, Jharkhand",
    year: "2023",
    category: "Chemical Plant",
    problem: "Chemical attack destroying ETP tank concrete within 2 years of construction due to pH 2-3 effluent.",
    solution: "ZAS FURAN ARF-100 acid brick lining with furan resin joints on tank floor and walls. Carbon steel subframe for elevated areas.",
    outcome: "Tank life extended by 20+ years. Complete chemical resistance to pH 0-14.",
     image: "industries.avif",
     tags: ["Acid Lining", "ETP", "Chemical Resistance"],
    featured: true,
  },
  {
    id: 4,
    slug: "warehouse-epoxy-flooring-noida",
    title: "Logistics Warehouse Epoxy Flooring",
    client: "Major E-Commerce Fulfillment Center",
    location: "Noida, Uttar Pradesh",
    year: "2023",
    category: "Industrial Flooring",
    problem: "Worn concrete floor causing dust generation, forklift damage, and hygiene compliance issues in 50,000 sq.ft. warehouse.",
    solution: "Shot-blasted substrate, 3mm heavy-duty epoxy broadcast system with anti-static properties, line marking and safety zones.",
    outcome: "Dust-free, ESD-compliant floor completed in 7 days. Meets OSHA and warehouse safety standards.",
    image: "epoxy.avif",
     tags: ["Epoxy Flooring", "Anti-Static", "Warehouse"],
    featured: false,
  },
  {
    id: 5,
    slug: "dam-rehabilitation-odisha",
    title: "Irrigation Dam Structural Rehabilitation",
    client: "Odisha Water Resources Department",
    location: "Cuttack, Odisha",
    year: "2022",
    category: "Dam & Reservoir",
    problem: "Deteriorated spillway and dam face with severe carbonation, rebar corrosion, and honeycombing over 40-year-old structure.",
    solution: "Hydrodemolition, rebar treatment with migrating inhibitor, polymer-modified repair mortar, crystalline waterproofing, CFRP strengthening at critical sections.",
    outcome: "Structural integrity restored to original design. 25-year life extension achieved.",
    image: "dam_rehabilation.avif",
     tags: ["Dam Repair", "Structural", "Rehabilitation"],
    featured: true,
  },
  {
    id: 6,
    slug: "pharmaceutical-flooring-hyderabad",
    title: "Pharma Plant Hygienic Flooring",
    client: "Leading Pharmaceutical Manufacturer",
    location: "Hyderabad, Telangana",
    year: "2021",
    category: "Industrial Flooring",
    problem: "Existing floor failed GMP audit due to joints, coating failure, and chemical permeation in production blocks.",
    solution: "Coved PU screed flooring system with integral cove base, chemical resistant and FDA-compliant grade for production areas.",
    outcome: "GMP compliance achieved. Passed FDA audit. Seamless, hygienic floor with 10-year guarantee.",
     image: "epoxy.avif",
     tags: ["PU Flooring", "Pharma", "GMP Compliant"],
    featured: false,
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Rajiv Sharma",
    designation: "Chief Engineer",
    company: "NTPC Limited",
    quote: "ZasChem India's waterproofing solution for our cooling towers exceeded all expectations. The technical team demonstrated exceptional knowledge of power plant environments and delivered a lasting solution within our tight shutdown schedule.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: 2,
    name: "Priya Nair",
    designation: "Project Director",
    company: "Delhi Metro Rail Corporation",
    quote: "Working with ZasChem on our metro tunnel waterproofing was a seamless experience. Their team understood the criticality of the work, mobilized rapidly, and completed the repair within our 60-hour maintenance window. Highly recommended.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    id: 3,
    name: "Amit Agarwal",
    designation: "VP - Projects",
    company: "Chemical Industries Ltd",
    quote: "The acid resistant lining installed by ZasChem in our ETP tanks has been performing without any issues for over 2 years now. Their understanding of chemical environments and appropriate material selection saved us significant costs.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    id: 4,
    name: "Suresh Kumar",
    designation: "Maintenance Head",
    company: "Steel Authority of India",
    quote: "ZasChem's concrete repair methodology is thorough and systematic. They don't just patch problems — they diagnose the root cause and provide comprehensive solutions. Our plant structures have never been in better condition.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    id: 5,
    name: "Dr. Meera Pillai",
    designation: "Facility Manager",
    company: "Sun Pharma",
    quote: "Our pharmaceutical facility's flooring upgrade by ZasChem helped us sail through FDA audit. The PU screed system is exactly what GMP compliance demands — seamless, hygienic, and chemically resistant.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80",
  },
];

export const clients = [
  { id: 1, name: "NTPC Limited", logo: "./ntpc.avif" },
  { id: 2, name: "DMRC", logo: "./dmrc.avif" },
  { id: 3, name: "Steel Authority of India", logo: './sail.avif' },
  { id: 4, name: "ONGC", logo: './ongc.avif' },
  { id: 5, name: "Sun Pharma", logo: ' ./sun_pharma.avif' },
  { id: 6, name: "Reliance Industries", logo: ' ./reliance.avif' },
  { id: 7, name: "L&T Construction", logo: ' ./l&t.avif' },
  { id: 8, name: "Tata Steel", logo: ' ./tata_steel.avif' },
  { id: 9, name: "NHAI", logo: ' ./nhai.avif' },
  { id: 10, name: "SAIL", logo: ' ./sail.avif' },
  { id: 11, name: "BHEL", logo: ' ./bhel.avif' },
  { id: 12, name: "Indian Oil", logo: ' ./indian_oil.avif' },
];

export const whyChooseUs = [
  { id: 1, title: "14+ Years Industrial Experience", desc: "Deep domain expertise in power plant, tunnel, dam, and industrial facility waterproofing and rehabilitation.", icon: "Award" },
  { id: 2, title: "Certified Engineering Team", desc: "Team of 50+ certified applicators, engineers, and QC specialists trained on international standards.", icon: "Users" },
  { id: 3, title: "Turnkey Project Execution", desc: "From survey and design to material supply, application, testing, and warranty — complete project delivery.", icon: "CheckCircle" },
  { id: 4, title: "Critical Shutdown Work", desc: "Specialized in executing high-quality work within tight plant shutdown windows with zero rework.", icon: "Clock" },
  { id: 5, title: "International Grade Materials", desc: "Using globally certified materials from leading manufacturers — tested and proven for Indian conditions.", icon: "Shield" },
  { id: 6, title: "Pan-India Coverage", desc: "Active projects across 15+ states with regional teams in Delhi, Ranchi, Cuttack, and other industrial hubs.", icon: "MapPin" },
];

// ============================================
// SEO DATA
// ============================================
export const seoData = {
  home: {
    title: "ZasChem India Pvt. Ltd. | Industrial Waterproofing & Infrastructure Protection",
    description: "India's trusted specialist in industrial waterproofing, power plant protection, tunnel rehabilitation, acid resistant lining, and structural strengthening. 12+ years. 100+ projects.",
    keywords: "industrial waterproofing India, waterproofing contractors India, power plant waterproofing, tunnel rehabilitation India, acid resistant lining, structural strengthening India, ZasChem India",
    ogImage: "/og-home.avif",
  },
  about: {
    title: "About ZasChem India | Industrial Infrastructure Protection Specialists",
    description: "ZasChem India is a specialized contractor for industrial waterproofing, structural rehabilitation, and protective coating. 12+ years, 100+ completed projects, ISO certified.",
    keywords: "about ZasChem India, industrial waterproofing company India, infrastructure protection specialists",
    ogImage: "/og-about.avif",
  },
  services: {
    title: "Industrial Waterproofing & Protection Services | ZasChem India",
    description: "Comprehensive industrial waterproofing, structural strengthening, acid resistant lining, polyurea coating, PU waterproofing, and industrial flooring services across India.",
    keywords: "industrial waterproofing services India, structural repair services, acid resistant coating, polyurea waterproofing, industrial flooring contractors",
    ogImage: "/og-services.avif",
  },
  products: {
    title: "Industrial Waterproofing & Coating Products | ZasChem India",
    description: "Browse ZasChem India's range of industrial waterproofing membranes, heat reflective coatings, acid resistant systems, and protective coating products.",
    keywords: "waterproofing products India, PU membrane, heat reflective coating, acid resistant lining products",
    ogImage: "/og-products.avif",
  },
  projects: {
    title: "Industrial Project Portfolio | ZasChem India",
    description: "Explore ZasChem India's portfolio of completed industrial waterproofing, tunnel repair, power plant protection, and structural rehabilitation projects.",
    keywords: "industrial waterproofing projects India, power plant projects, tunnel repair portfolio",
    ogImage: "/og-projects.avif",
  },
  contact: {
    title: "Contact ZasChem India | Get a Project Quote",
    description: "Contact ZasChem India for industrial waterproofing, structural repair, and protective coating services. Get a technical consultation and project quote.",
    keywords: "contact ZasChem India, waterproofing contractor quote, industrial repair consultation India",
    ogImage: "/og-contact.avif",
  },
};


export const faqs = [
  {
    q: "What areas of India does ZasChem India serve?",
    a: "ZasChem India serves pan-India with active operations across 15+ states including Delhi, Noida, Ranchi, Cuttack, Hyderabad, Mumbai, and all major industrial hubs.",
  },
  {
    q: "Do you work on live industrial plant shutdowns?",
    a: "Yes. We specialize in executing critical repair and waterproofing work during planned and emergency plant shutdowns, with experience working in NTPC, BHEL, and steel plant environments.",
  },
  {
    q: "What warranty do you offer on waterproofing work?",
    a: "We offer 5-15 year material and application warranties depending on the system used and the conditions. Waterproofing systems typically carry 10-year guarantees.",
  },
  {
    q: "Can you handle both material supply and application?",
    a: "Yes. ZasChem India provides complete turnkey solutions including material procurement, surface preparation, skilled application, quality testing, and documentation.",
  },
  {
    q: "How soon can your team mobilize for emergency repair?",
    a: "For emergency situations like active leakage in power plants or critical infrastructure, we can mobilize a technical team within 24-48 hours to any location in India.",
  },
];