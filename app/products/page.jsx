import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { products } from '@/data/siteData';
import CTABanner from '@/components/sections/CTABanner';

export const metadata = {
  title: 'Industrial Waterproofing & Coating Products | ZAS Chem India',
  description: 'Browse ZAS Chem India\'s range of industrial waterproofing membranes, heat reflective coatings, acid resistant systems, and protective coating products. Engineered for India.',
  keywords: 'waterproofing products India, PU membrane, heat reflective coating, acid resistant lining products, industrial coatings',
  alternates: { canonical: 'https://www.zaschem.in/products' },
};

const categories = [...new Set(products.map((p) => p.category))];

export default function ProductsPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-orange" />
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs text-brand-muted mb-6 font-mono">
            <Link href="/" className="hover:text-brand-blue">HOME</Link>
            <ChevronRight size={12} />
            <span className="text-brand-orange">PRODUCTS</span>
          </nav>
          <div className="section-label mb-4">OUR PRODUCTS</div>
          <h1 className="font-display font-black text-5xl md:text-6xl text-on-bg tracking-tight leading-none mb-4">
            INDUSTRIAL-GRADE<br /><span className="text-brand-orange">PROTECTION SYSTEMS</span>
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl">
            High-performance chemical systems engineered for India's most demanding infrastructure protection requirements. Each product is rigorously tested and backed by technical support.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 mb-10">
            <span className="px-4 py-2 bg-brand-blue text-on-bg text-sm font-mono tracking-wider">ALL PRODUCTS</span>
            {categories.map((cat) => (
              <span key={cat} className="px-4 py-2 bg-brand-card border border-brand-border text-brand-muted text-sm font-mono tracking-wider hover:border-brand-blue hover:text-on-bg transition-all cursor-pointer">
                {cat.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}
                className="group card-industrial overflow-hidden hover:border-brand-orange/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-orange/10">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-brand-orange text-on-bg text-xs font-mono tracking-wider">{product.category}</span>
                  </div>
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="font-mono text-brand-orange text-xs tracking-[0.2em] mb-2">{product.name}</p>
                  <h2 className="font-display font-black text-xl text-on-bg mb-2 tracking-wide group-hover:text-brand-orange transition-colors">
                    {product.tagline}
                  </h2>
                  <p className="text-brand-muted text-sm leading-relaxed mb-5 line-clamp-2">{product.shortDesc}</p>

                  {/* Specs preview */}
                  <div className="grid grid-cols-2 gap-2 mb-5 p-3 bg-brand-darker border border-brand-border">
                    {Object.entries(product.specifications).slice(0, 2).map(([k, v]) => (
                      <div key={k}>
                        <p className="text-brand-muted text-[10px] font-mono uppercase tracking-wider">{k}</p>
                        <p className="text-on-bg text-xs font-semibold mt-0.5">{v}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-brand-orange text-sm font-display font-bold tracking-wide group-hover:gap-4 transition-all">
                    VIEW DATASHEET <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}