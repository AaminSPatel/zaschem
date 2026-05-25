import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/app/data/siteData';
import { CheckCircle, ArrowRight, Phone, Download, ChevronRight, Package } from 'lucide-react';
import CTABanner from '@/components/sections/CTABanner';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}



export function generateMetadata({ params }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return { title: 'Product Not Found' };


  return {
    title: product.metaTitle,
    description: product.metaDesc,
    keywords: product.keywords?.join(', '),
    alternates: { canonical: `https://www.zaschem.in/products/${product.slug}` },
    openGraph: { title: product.metaTitle, description: product.metaDesc, images: [{ url: product.image }] },
  };
}

export default async function ProductDetailPage({ params }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);


  return (
    <div className="bg-brand-dark min-h-screen">
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[420px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/75 to-brand-dark/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 to-transparent" />
          <div className="absolute inset-0 grid-lines opacity-20" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-14">
          <nav className="flex items-center gap-2 text-xs text-brand-muted mb-6 font-mono">
            <Link href="/" className="hover:text-brand-blue transition-colors">HOME</Link>
            <ChevronRight size={12} />
            <Link href="/products" className="hover:text-brand-blue transition-colors">PRODUCTS</Link>
            <ChevronRight size={12} />
            <span className="text-brand-orange">{product.name}</span>
          </nav>
          <span className="inline-block px-3 py-1 bg-brand-orange text-on-bg text-xs font-mono tracking-wider mb-4">{product.category}</span>
          <p className="font-mono text-brand-blue text-sm tracking-[0.2em] mb-2">{product.name}</p>
          <h1 className="font-display font-black text-4xl md:text-6xl text-on-bg tracking-tight leading-tight mb-3">
            {product.tagline}
          </h1>
          <p className="text-brand-muted text-base max-w-xl">{product.shortDesc}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div>
              <h2 className="font-display font-black text-3xl text-on-bg mb-5">PRODUCT OVERVIEW</h2>
              <div className="space-y-4 text-brand-muted leading-relaxed">
                {product.description.split('\n\n').map((para, i) => <p key={i}>{para.trim()}</p>)}
              </div>
            </div>

            {/* Specifications Table */}
            <div>
              <h2 className="font-display font-black text-2xl text-on-bg mb-5">TECHNICAL SPECIFICATIONS</h2>
              <div className="bg-brand-card border border-brand-border overflow-hidden">
                <div className="bg-brand-darker px-5 py-3 border-b border-brand-border">
                  <p className="font-mono text-xs text-brand-blue tracking-wider">PRODUCT DATA SHEET — {product.name}</p>
                </div>
                {Object.entries(product.specifications).map(([key, value], i) => (
                  <div key={key} className={`flex ${i % 2 === 0 ? 'bg-brand-card' : 'bg-brand-darker/50'}`}>
                    <div className="w-48 flex-shrink-0 px-5 py-4 border-r border-brand-border">
                      <p className="font-mono text-xs text-brand-muted uppercase tracking-wider">{key}</p>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-on-bg text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="font-display font-black text-2xl text-on-bg mb-5">KEY FEATURES & BENEFITS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 p-4 bg-brand-card border border-brand-border group hover:border-brand-blue/40 transition-colors">
                    <CheckCircle size={16} className="text-brand-blue flex-shrink-0" />
                    <span className="text-brand-light text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO block */}
            <div className="p-8 bg-brand-card border border-brand-border border-l-4 border-l-brand-orange">
              <h3 className="font-display font-bold text-xl text-on-bg mb-3">
                Technical Support & Application Guidance
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                ZAS Chem India provides complete technical support for all our products — from substrate assessment and system selection to application training, QC testing, and post-application inspections. Our application teams are trained and certified on each product system, ensuring optimal performance and warranty compliance. Contact our technical helpdesk for product-specific guidance and project-specific recommendations.
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="card-industrial p-6 border-t-2 border-t-brand-orange sticky top-24">
              <h3 className="font-display font-bold text-lg text-on-bg mb-2">ENQUIRE ABOUT THIS PRODUCT</h3>
              <p className="text-brand-muted text-sm mb-5">Get pricing, availability, and technical datasheet.</p>
              <Link href="/contact" className="btn-primary w-full flex items-center justify-center gap-2 mb-3">
                SEND ENQUIRY <ArrowRight size={15} />
              </Link>
              <a href="tel:+91-XXXXXXXXXX" className="btn-secondary w-full flex items-center justify-center gap-2 mb-3">
                <Phone size={15} /> CALL TECHNICAL TEAM
              </a>
              <button className="w-full flex items-center justify-center gap-2 py-3 border border-brand-border text-brand-muted hover:text-on-bg hover:border-brand-border/80 transition-colors text-sm font-mono tracking-wider">
                <Download size={14} /> DOWNLOAD TDS
              </button>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="card-industrial p-6">
                <h3 className="font-display font-bold text-base text-on-bg mb-4">RELATED PRODUCTS</h3>
                <div className="space-y-3">
                  {related.map((p) => (
                    <Link key={p.slug} href={`/products/${p.slug}`}
                      className="flex items-center gap-3 p-3 hover:bg-brand-darker transition-all group">
                      <Package size={14} className="text-brand-orange flex-shrink-0" />
                      <div>
                        <p className="text-on-bg text-xs font-display font-bold group-hover:text-brand-orange transition-colors">{p.name}</p>
                        <p className="text-brand-muted text-xs">{p.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}