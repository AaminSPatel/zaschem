import Link from 'next/link';
import { ChevronRight, Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | ZasChem India Pvt. Ltd.',
  description: 'Privacy policy governing how ZasChem India collects, uses, and protects your personal information.',
  alternates: { canonical: 'https://www.zaschem.in/privacy-policy' },
  robots: { index: false },
};

const sections = [
  {
    id: '01', title: 'Information We Collect',
    content: 'We collect information you provide directly — name, company, phone number, email, and project details through our contact forms and enquiries. We also collect standard web analytics data including pages visited, time spent, and geographic region through cookies and analytics tools. We do not collect sensitive personal or financial data through our website.'
  },
  {
    id: '02', title: 'How We Use Your Information',
    content: 'Your contact information is used solely to respond to your enquiries, provide quotations, and communicate about ongoing projects. We may use aggregated, anonymized analytics data to improve our website. We do not sell, rent, or trade your personal information to any third party for marketing purposes.'
  },
  {
    id: '03', title: 'Information Sharing',
    content: 'We share your information only with internal team members who need it to respond to your enquiry or execute your project. We may share information with legal authorities if required by law. We use reputable third-party services (analytics, email) that have their own privacy policies.'
  },
  {
    id: '04', title: 'Cookies',
    content: 'Our website uses necessary cookies for functionality and analytics cookies to understand website usage. You may disable cookies in your browser settings; however, some website features may not function correctly. We use Google Analytics with IP anonymization enabled.'
  },
  {
    id: '05', title: 'Data Security',
    content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our website uses HTTPS encryption for all data transmission.'
  },
  {
    id: '06', title: 'Your Rights',
    content: 'You have the right to access the personal data we hold about you, request corrections, and request deletion of your data (subject to legal obligations). To exercise these rights, contact us at privacy@zaschem.in. We will respond within 30 days.'
  },
  {
    id: '07', title: 'Data Retention',
    content: 'We retain contact enquiry data for 3 years for business purposes. Project-related data is retained for 10 years as required by construction industry standards and warranty obligations. Analytics data is retained for 26 months.'
  },
  {
    id: '08', title: 'Changes to This Policy',
    content: 'We may update this privacy policy from time to time. Material changes will be communicated via our website with an updated effective date. Continued use of our services after changes constitutes acceptance of the updated policy.'
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <section className="relative py-20 overflow-hidden border-b border-brand-border">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="max-w-4xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs text-brand-muted mb-6 font-mono">
            <Link href="/" className="hover:text-brand-blue">HOME</Link>
            <ChevronRight size={12} />
            <span className="text-brand-orange">PRIVACY POLICY</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <Shield size={20} className="text-brand-blue" />
            <div className="section-label">YOUR DATA IS PROTECTED</div>
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl text-on-bg tracking-tight mb-4">PRIVACY POLICY</h1>
          <p className="text-brand-muted">Last updated: January 2026 &nbsp;|&nbsp; ZasChem India Pvt. Ltd.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="card-industrial p-8 mb-8 border-l-4 border-l-brand-blue">
            <p className="text-brand-muted leading-relaxed">
              ZasChem India Pvt. Ltd. is committed to protecting your privacy. This policy explains how we collect, use, store, and protect information about you when you use our website or engage our services. We process your data in accordance with applicable Indian data protection laws.
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
            <h3 className="font-display font-bold text-lg text-on-bg mb-3">Contact Our Privacy Team</h3>
            <p className="text-brand-muted text-sm leading-relaxed mb-2">
              For any privacy-related concerns or data requests, contact:
            </p>
            <p className="text-brand-muted text-sm">
              Email: <a href="mailto:privacy@zaschem.in" className="text-brand-blue hover:underline">privacy@zaschem.in</a><br />
              Address: {`ZasChem India Pvt. Ltd., Industrial Area, India`}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}