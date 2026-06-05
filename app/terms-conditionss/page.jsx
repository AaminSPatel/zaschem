import Link from 'next/link';
import { ChevronRight, Scale, AlertTriangle, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | ZasChem India Pvt. Ltd.',
  description: 'Legal conditions, contractual agreements, dynamic structural survey provisions, and operational liabilities governing ZasChem India engagements.',
  alternates: { canonical: 'https://www.zaschem.in/terms-conditions' },
  robots: { index: true, follow: true },
};

const sections = [
  {
    id: '01', title: 'Acceptance of Contract Conditions',
    content: 'Accessing this digital domain or authorizing purchase agreements with ZasChem India Private Limited confirms absolute compliance with these terms. If an enterprise or client representative objects to any point outlined here, they must halt any direct site usage and suspend operations immediately.'
  },
  {
    id: '02', title: 'Operational Scopes & Material Standards',
    content: 'Engineering operations executed by ZasChem India are governed strictly by physical written agreements, technical estimation parameters, or official corporate purchase orders. Verbal arrangements hold no commercial validity. Layout metrics, material compositions, chemical volume indices, and operational target milestones must be verified through written documentation before team mobilization.'
  },
  {
    id: '03', title: 'Commercial Settlement Allocations',
    content: 'Financial payment conditions are determined by separate client invoices. Our standard corporate allocation framework requires an initial 30% technical advance, 50% upon chemistry and equipment arrival, and a final 20% release following completion verification. Overdue bills are subject to interest penalties of 18% per annum, and we reserve the right to halt site operations for non-payment.'
  },
  {
    id: '04', title: 'Engineering System Warranty Terms',
    content: 'Warranty structures vary by material type and are explicitly certified upon project conclusion. Structural warranties become void if application areas are modified by third parties, subjected to mechanical loading beyond specified limits, or damaged by external impact. Technical claims must be filed in writing within 30 days of discovering a defect.'
  },
  {
    id: '05', title: 'Commercial Liability Boundary',
    content: 'ZasChem India\'s financial accountability remains strictly limited to the direct contract value under which a specific claim is made. We accept no liability for indirect commercial down-times, plant stoppages, or production losses. Legal notifications must be filed within 12 months of project completion.'
  },
  {
    id: '06', title: 'Intellectual System Documentation',
    content: 'All method statements, polymer formulation records, structural drawing calculations, and custom chemical layout designs remain the intellectual property of ZasChem India. These documents may not be replicated, shared with competitors, or used for external projects without written authorization.'
  },
  {
    id: '07', title: 'Health, Safety, and Site Clearance',
    content: 'ZasChem India maintains strict HSE regulations on every project site. Clients must ensure clear access paths, isolate high-voltage vectors, clear deep sumps, and issue required hot-work permits. Our engineers reserve the right to suspend operations instantly if conditions pose safety risks.'
  },
  {
    id: '08', title: 'Jurisdiction and Arbitration Rules',
    content: 'These corporate guidelines are governed by Indian legal frameworks. Disputes arising from chemical field performance or contract milestones will be addressed through formal arbitration processes under the exclusive jurisdiction of regional courts where our corporate office is based.'
  },
];

export default function TermsPage() {
  return (
    <div className="bg-[#010e1f] min-h-screen text-gray-100 font-sans">
      
      {/* Header Summary */}
      <section className="relative py-20 border-b border-white/5 bg-[#001428]/40">
        <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-6 tracking-wider">
            <Link href="/" className="hover:text-[#64dfdf] transition-colors">HOME</Link>
            <ChevronRight size={12} className="text-gray-600" />
            <span className="text-[#f77f00]">LEGAL BOUNDARIES</span>
          </nav>
          
          <div className="flex items-center gap-2.5 text-[#f77f00] mb-4">
            <Scale size={18} />
            <span className="font-mono text-xs font-bold tracking-widest uppercase">REGULATORY BINDINGS</span>
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl text-white tracking-tight mb-3">TERMS & CONDITIONS</h1>
          <p className="text-gray-400 text-xs md:text-sm font-mono">Last Synchronized Update: January 2026 &nbsp;|&nbsp; ZasChem India Private Limited</p>
        </div>
      </section>

      {/* Main Documentation Block */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#031a38]/40 border border-white/5 border-l-4 border-l-[#f77f00] p-6 md:p-8 mb-10 rounded-sm">
            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-sans">
              These comprehensive business and site regulations govern all commercial interactions, technical site surveys, physical material applications, and digital consultations provided by ZasChem India Private Limited. Engaging our execution groups implies formal consent to these clauses.
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((sec) => (
              <div key={sec.id} className="bg-[#031a38]/20 border border-white/5 p-6 md:p-8 rounded-sm hover:bg-[#031a38]/40 transition-colors duration-300">
                <div className="flex items-start gap-4 md:gap-6">
                  <span className="font-mono text-[#f77f00] text-xs md:text-sm font-black bg-[#f77f00]/10 px-2 py-1 border border-[#f77f00]/20 rounded-sm">{sec.id}</span>
                  <div>
                    <h2 className="font-display font-bold text-lg md:text-xl text-white mb-3 tracking-wide">{sec.title}</h2>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-sans">{sec.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legal Advisory Callout */}
          <div className="mt-12 p-6 md:p-8 bg-gradient-to-r from-[#031a38] to-[#010e1f] border border-white/10 border-t-2 border-t-[#f77f00] rounded-sm">
            <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-3">LEGAL CLARIFICATION DESK</h3>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-2 font-sans">
              For commercial contract modifications, clarification of project liabilities, or specific arbitration clauses, please address your queries directly to our compliance team:
            </p>
            <p className="font-mono text-xs text-gray-400">
              Corporate Legal Channel: <a href="mailto:legal@zaschem.in" className="text-[#64dfdf] hover:underline">legal@zaschem.in</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}