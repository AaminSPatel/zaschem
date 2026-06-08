"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
const SERVICE_CATEGORIES = [
  {
    id: "waterproofing",
    label: "Waterproofing",
    color: "#0ea5e9",
    issues: [
      // Naye waterproofing services (image 1 se)
      {
        id: "w1",
        title: "Foundation Waterproofing",
        description:
          "Protecting building foundations from groundwater and moisture ingress.",
        image: "./issues/w6.avif",
      },
      {
        id: "w2",
        title: "Underground Structure Waterproofing",
        description:
          "Waterproofing of underground structures, basements and parking areas.",
        image: "./issues/w7.avif",
      },
      {
        id: "w3",
        title: "Water Tanks Waterproofing",
        description:
          "Leak-proofing of overhead and underground water storage tanks.",
        image: "./issues/w8.avif",
      },
      {
        id: "w4",
        title: "Sunken Area Waterproofing",
        description:
          "Waterproofing of sunken areas in bathrooms, kitchens and utility spaces.",
        image: "./issues/w9.avif",
      },
      {
        id: "w5",
        title: "Cable Trench Waterproofing",
        description:
          "Sealing cable trenches to protect electrical infrastructure from water damage.",
        image: "./issues/w10.avif",
      },
      {
        id: "w6",
        title: "Construction Joint Treatments",
        description:
          "Treatment of construction joints to prevent water seepage and leakage.",
        image: "./issues/w11.avif",
      },
      /*  { id: 'w7', title: 'Arresting Heavy Underground Leakages', description: 'Stopping active heavy water leakages in underground structures using injection systems.', image: './issues/w12.avif' },
       */
    ],
  },
  {
    id: "repair",
    label: "Repair & Rehabilitation",
    color: "#f97316",
    issues: [
      // Pehle se the (6 issues)
      {
        id: "r1",
        title: "Damaged Beam Soffit",
        description:
          "Spalled beams repaired using carbon fibre wrapping and high-strength mortar.",
        image: "./issues/r1.avif",
      },
      {
        id: "r2",
        title: "Column Deterioration",
        description:
          "Corroded and crumbling columns restored to full load-bearing capacity.",
        image: "./issues/r2.avif",
      },
      {
        id: "r3",
        title: "Slab Crack Injection",
        description:
          "Structural cracks sealed with low-viscosity epoxy injection.",
        image: "./issues/r3.avif",
      },
      {
        id: "r4",
        title: "Old Building Restoration",
        description:
          "Complete restoration and rehabilitation of aging buildings.",
        image: "./issues/r4.avif",
      },

      {
        id: "r5",
        title: "Concrete Spall Repair",
        description:
          "Delaminated concrete rebuilt with polymer-modified mortars.",
        image: "./issues/r5.avif",
      },

      // Naye repair services (image 2 se)
      {
        id: "r6",
        title: "Concrete & Bitumen Road Repair",
        description:
          "Repair of damaged concrete and bitumen roads for smooth surface.",
        image: "./issues/r6.avif",
      },
      /*  { id: 'r7', title: 'Concrete Strengthening', description: 'Strengthening weak concrete structures using advanced techniques.', image: './issues/r7.avif' },
       */
    ],
  },
  {
    id: "strengthening",
    label: "Structural Strengthening",
    color: "#ffffff",
    issues: [
      {
        id: "s1",
        title: "Column Jacketing",
        description:
          "RC jacketing of under-designed columns to enhance load capacity.",
        image: "./issues/s1.avif",
      },
      {
        id: "s2",
        title: "Beam Strengthening",
        description:
          "Carbon fibre laminates for flexural reinforcement of beams.",
        image: "./issues/s2.avif",
      },
      {
        id: "s3",
        title: "Slab Load Enhancement",
        description:
          "Slabs upgraded using FRP overlays for additional live loads.",
        image: "./issues/s3.avif",
      },
      {
        id: "s4",
        title: "Foundation Underpinning",
        description:
          "Inadequate foundations underpinned with grouting for safety.",
        image: "./issues/w6.avif",
      },
      {
        id: "s5",
        title: "Seismic Retrofitting",
        description: "Buildings retrofitted with shear walls and CFRP wraps.",
        image: "./issues/s5.avif",
      },
      {
        id: "s6",
        title: "Rebar Fixing",
        description:
          "Fixing reinforcement bars in existing concrete structures.",
        image: "./s6.avif",
      },
    ],
  },
  {
    id: "dam-tunnel",
    label: "Dam & Tunnel Repair",
    color: "#10b981",
    issues: [
      {
        id: "d1",
        title: "Penstock Liner Leakage",
        description:
          "Polyurethane injection seals active leaks in penstock steel liners.",
        image: "./issues/d1.avif",
      },
      {
        id: "d2",
        title: "Spillway Restoration",
        description:
          "Cavitation-damaged spillway surfaces restored with polymer concrete.",
        image: "./issues/d2.avif",
      },
      {
        id: "d3",
        title: "Tunnel Water Ingress",
        description: "Injection stops active water inflows in tunnel linings.",
        image: "./issues/d3.avif",
      },
      {
        id: "d4",
        title: "Inspection Gallery Leaks",
        description: "Crystalline waterproofing applied inside dam galleries.",
        image: "./issues/d4.avif",
      },
      {
        id: "d5",
        title: "Soil Stabilisation in Tunnels",
        description:
          "Silt and soil stabilised around tunnel linings with grouting.",
        image: "./issues/d8.avif",
      },
      {
        id: "d6",
        title: "HRT/TRT Lining Cracks",
        description:
          "Cracks in head race and tail race tunnels repaired by grouting.",
        image: "./issues/d6.avif",
      },
      /*  { id: 'd7', title: 'Surge Shaft Leakage', description: 'Shafts sealed against high-pressure water ingress.', image: './issues/d7.avif' },
       */
    ],
  },
  {
    id: "flooring",
    label: "Flooring & Joints",
    color: "#f59e0b",
    issues: [
      // Pehle se the (6 issues)
      {
        id: "e1",
        title: "Expansion Joint Failure",
        description:
          "Failed expansion joints replaced with flexible polyurea sealants.",
        image: "./issues/e1.avif",
      },
      {
        id: "e2",
        title: "Trimix Flooring Issues",
        description:
          "Dusty industrial floors vacuum-dewatered for maximum hardness.",
        image: "./issues/e2.avif",
      },
      {
        id: "e3",
        title: "Epoxy Floor Delamination",
        description: "Debonded epoxy coatings repaired and reapplied.",
        image: "./issues/e3.avif",
      },
      {
        id: "e4",
        title: "Acid Resistant Flooring",
        description:
          "Chemical plant flooring relaid with acid-resistant tiles.",
        image: "./issues/e4.avif",
      },
      {
        id: "e5",
        title: "Vertical Joint Failure",
        description:
          "Open vertical joints sealed with pre-compressed foam systems.",
        image: "./issues/e5.avif",
      },
      {
        id: "e6",
        title: "Overhead Joint Leakage",
        description: "Overhead joints repaired with self-levelling sealants.",
        image: "./issues/e6.avif",
      },
    ],
  },
  {
    id: "coating",
    label: "Protective Coating",
    color: "#ec4899",
    issues: [
      // Naye coating services (image 2 se)
      {
        id: "c1",
        title: "Chimney Protective Coatings",
        description:
          "High-temperature resistant coatings for industrial chimneys.",
        image: "./issues/c1.avif",
      },
      {
        id: "c2",
        title: "Anticorrosive Protection for Underground Pipelines",
        description: "Corrosion protection coatings for buried pipelines.",
        image: "./issues/c2.avif",
      },
      {
        id: "c3",
        title: "Anticorrosive Protection for Cooling Tower",
        description: "Protective coatings for cooling tower structures.",
        image: "./issues/c3.avif",
      },
      {
        id: "c4",
        title: "Thermal Insulation for RCC Buildings",
        description: "Heat reflective and thermal insulation for RCC roofs.",
        image: "./issues/c4.avif",
      },
      {
        id: "c5",
        title: "Thermal Insulation for PEB Sheds",
        description:
          "Thermal insulation coatings for pre-engineered buildings.",
        image: "./issues/c5.avif",
      },
      {
        id: "c6",
        title: "STP/ETP Tank Waterproofing",
        description:
          "Waterproofing and lining for sewage and effluent treatment plants.",
        image: "./issues/c6.avif",
      },
    ],
  },
];

export default function CommonIssuesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);

  const activeCategory = SERVICE_CATEGORIES[activeTab];

  return (
    <section className="py-16 bg-[#002147]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[#f77f00] text-xs font-mono font-bold tracking-wider uppercase bg-[#f77f00]/10 px-3 py-1 rounded-full">
            COMMON ISSUES IN POWER PLANTS
          </span>
          <h2 className="text-white text-2xl md:text-3xl font-bold mt-4">
            Issues We Regularly Solve
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {SERVICE_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === idx
                  ? "bg-white text-[#002147] shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6  gap-3">
          {activeCategory.issues.map((issue, idx) => (
            <div
              key={issue.id}
              className="bg-white/5 group  rounded-xl p-3 text-center transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor:
                  hoveredId === issue.id
                    ? `${activeCategory.color}15`
                    : "rgba(255,255,255,0.05)",
                border:
                  hoveredId === issue.id
                    ? `1px solid ${activeCategory.color}40`
                    : "1px solid rgba(255,255,255,0.08)",
                transform:
                  hoveredId === issue.id ? "translateY(-2px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHoveredId(issue.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="w-18 h-18 mx-auto mb-2 transition-all group-hover:border-4 group-hover:border-amber-600   duration-300 group-hover:h-16 group-hover:w-16  group-hover:-translate-y-4 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="min-w-18 min-h-18 scale-110  transition-all duration-300 text-[8px] text-amber-300 flex items-center  hover:scale-100 object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "./power_plant.avif";
                  }}
                />
              </div>

              {/* Title */}
              <h3 className="text-white  transition-all duration-300 group-hover:text-sm text-xs font-medium mb-1 ">
                {issue.title}
              </h3>

              {/* Description - shows on hover */}
              {/* Description - Mobile pe hamesha dikhega, Desktop pe hover pe */}
              <p
                className={`
  text-gray-300 mt-2 leading-tight  transition-all duration-300
  ${hoveredId === issue.id ? " text-[12px]" : "text-[10px]"}
  block
`}
              >
                {issue.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Hint with Internal Links */}
        {/* Footer Hint with Natural Internal Links */}
        <div className="text-center mt-8 space-y-3">
          {/* Main SEO Line - ZASCHEM INDIA keyword naturally embedded */}
          <p className="text-gray-400 text-xs leading-relaxed max-w-2xl mx-auto">
            <span className="font-semibold text-white/80">ZASCHEM INDIA</span>{" "}
            specializes in
            <Link
              href="/services/waterproofing-systems"
              className="text-[#e8eaea] hover:underline mx-1 transition-colors"
            >
              waterproofing systems
            </Link>
            ,
            <Link
              href="/services/structural-strengthening"
              className="text-[#e8eaea] hover:underline mx-1 transition-colors"
            >
              structural strengthening
            </Link>
            ,
            <Link
              href="/services/repair-rehabilitation"
              className="text-[#e8eaea] hover:text-white mx-1 transition-colors"
            >
              repair & rehabilitation
            </Link>
            and
            <Link
              href="/services/heat-reflective-coating"
              className="text-[#e8eaea] hover:underline ml-1 transition-colors"
            >
              heat reflective coating{" "}
            </Link>
            for power plants, infrastructure, and industrial buildings across
            India.
          </p>

          {/* Second SEO Line - Services mention */}
          <p className="text-gray-500 text-[11px] leading-relaxed max-w-2xl mx-auto">
            Explore our
            <Link
              href="/services"
              className="text-gray-400 hover:text-white mx-1 transition-colors"
            >
              complete range of services
            </Link>
            or see how we've
            <Link
              href="/projects"
              className="text-gray-400 hover:text-white mx-1 transition-colors"
            >
              executed 100+ projects
            </Link>
            for clients like NTPC, L&T, and Tata Motors.
            <span className="hidden md:inline">
              {" "}
              Hover any card above to see detailed issue description.
            </span>
          </p>

          {/* CTA Line */}
          <p className="text-gray-600 text-[10px]">
            Need a solution?
            <Link
              href="/contact"
              className="text-[#f77f00] hover:underline ml-1 transition-colors"
            >
              Request a site inspection →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
