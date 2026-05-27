import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | ZasChem India Pvt. Ltd.',
  description: 'Terms and conditions governing the use of ZasChem India services, website, and business engagements.',
  alternates: { canonical: 'https://www.zaschem.in/terms-conditions' },
  robots: { index: false },
};

const sections = [
  {
    id: '01', title: 'Acceptance of Terms',
    content: 'By accessing our website or engaging ZasChem India Pvt. Ltd. for any service, you agree to these terms in full. If you disagree with any part, please do not use our services or website.'
  },
  {
    id: '02', title: 'Services & Scope of Work',
    content: 'All services provided by ZasChem India are subject to a formal written agreement or purchase order. Verbal commitments are not binding. Scope of work, materials, timeline, and pricing must be confirmed in writing before work commences.'
  },
  {
    id: '03', title: 'Payment Terms',
    content: 'Payment terms are as specified in the individual contract or invoice. Standard terms are 30% advance, 50% on material delivery, and 20% on completion. Late payments may attract interest at 18% per annum. We reserve the right to suspend work for delayed payments.'
  },
  {
    id: '04', title: 'Warranty',
    content: 'Warranties are product and system specific and are detailed in the respective project completion certificates. Warranties are void if the application area is subjected to modifications, improper use, or damage not arising from our workmanship. Warranty claims must be submitted in writing within 30 days of discovering the defect.'
  },
  {
    id: '05', title: 'Liability',
    content: 'ZasChem India\'s liability is limited to the value of the specific contract under which any claim arises. We are not liable for indirect, consequential, or business interruption losses. Any claims must be made within 12 months of project completion.'
  },
  {
    id: '06', title: 'Intellectual Property',
    content: 'All technical documents, method statements, specifications, and drawings provided by ZasChem India remain our intellectual property and may not be reproduced, shared, or used for other projects without written consent.'
  },
  {
    id: '07', title: 'Health & Safety',
    content: 'ZasChem India follows strict HSE protocols on all project sites. Clients must ensure safe site access, isolate work areas as required, and provide necessary permits. We reserve the right to stop work if site conditions pose unacceptable safety risks.'
  },
  {
    id: '08', title: 'Governing Law',
    content: 'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in the city where our registered office is located.'
  },
];

export default function TermsPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <section className="relative py-20 overflow-hidden border-b border-brand-border">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="max-w-4xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs text-brand-muted mb-6 font-mono">
            <Link href="/" className="hover:text-brand-blue">HOME</Link>
            <ChevronRight size={12} />
            <span className="text-brand-orange">TERMS & CONDITIONS</span>
          </nav>
          <div className="section-label mb-4">LEGAL</div>
          <h1 className="font-display font-black text-4xl md:text-5xl text-on-bg tracking-tight mb-4">TERMS & CONDITIONS</h1>
          <p className="text-brand-muted">Last updated: January 2024 &nbsp;|&nbsp; ZasChem India Pvt. Ltd.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="card-industrial p-8 mb-8 border-l-4 border-l-brand-orange">
            <p className="text-brand-muted leading-relaxed">
              These Terms & Conditions govern your use of ZasChem India Pvt. Ltd.&apos;s website, services, and business engagements. Please read them carefully. By engaging our services, you agree to be bound by these terms.
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((sec) => (
              <div key={sec.id} className="card-industrial p-8">
                <div className="flex items-start gap-5">
                  <span className="font-mono text-brand-blue text-sm font-bold flex-shrink-0 mt-1">{sec.id}</span>
                  <div>
                    <h2 className="font-display font-black text-xl text-on-bg mb-3">{sec.title}</h2>
                    <p className="text-brand-muted leading-relaxed">{sec.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-8 bg-brand-card border border-brand-border border-t-2 border-t-brand-blue">
            <p className="text-brand-muted text-sm leading-relaxed">
              For questions about these terms, please contact us at{' '}
              <a href="mailto:legal@zaschem.in" className="text-brand-blue hover:underline">legal@zaschem.in</a>{' '}
              or call our office. We aim to respond to all legal queries within 5 business days.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}