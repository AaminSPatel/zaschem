import Link from 'next/link';
import { ArrowRight, Home, Phone } from 'lucide-react';

export const metadata = { title: '404 — Page Not Found | ZAS Chem India' };

export default function NotFoundPage() {
  return (
    <div className="bg-brand-dark min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-3xl" />

      <div className="relative text-center px-6 max-w-xl">
        <p className="font-mono text-brand-blue text-sm tracking-[0.3em] mb-4">ERROR CODE</p>
        <h1 className="font-display font-black text-[10rem] leading-none text-on-bg/5 select-none mb-0">404</h1>
        <div className="-mt-16 mb-6">
          <p className="font-display font-black text-4xl text-on-bg tracking-tight">PAGE NOT FOUND</p>
        </div>
        <p className="text-brand-muted mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Navigate back to our main sections or contact us directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary flex items-center gap-2 justify-center">
            <Home size={16} /> GO HOME
          </Link>
          <Link href="/services" className="btn-secondary flex items-center gap-2 justify-center">
            OUR SERVICES <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-10 pt-8 border-t border-brand-border">
          <p className="text-brand-muted text-sm">Need help? <a href="/contact" className="text-brand-blue hover:underline">Contact our team</a></p>
        </div>
      </div>
    </div>
  );
}