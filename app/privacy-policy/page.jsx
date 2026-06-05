import Link from 'next/link';
import { ChevronRight, ShieldCheck, Lock, EyeOff, FileText } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | ZasChem India Pvt. Ltd.',
  description: 'Corporate privacy regulations and encryption methodologies governing site user records, technical RFQ logs, and industrial asset communication frameworks.',
  alternates: { canonical: 'https://www.zaschem.in/privacy-policy' },
  robots: { index: true, follow: true },
};

const sections = [
  {
    id: '01', title: 'Data Collection Framework',
    content: 'ZasChem India Private Limited collects core identity logs provided directly through our Technical RFQ portals. This includes individual user names, company associations, active mobile channels, business email strings, and specific structural challenge descriptions. We record background parameters like standard browser configurations, active geographical locations, and page dwell times to analyze interface responsiveness.'
  },
  {
    id: '02', title: 'Strategic Records Deployment',
    content: 'Collected logs are used to formulate industrial engineering proposals, verify substrate site parameters, generate commercial estimations, and manage communications. We do not distribute, rent, trade, or lease information databases to external marketing groups or unauthorized third parties.'
  },
  {
    id: '03', title: 'Data Access Boundaries',
    content: 'Access to data records remains locked behind encrypted directories. Information is restricted to certified project managers, estimating engineers, and on-field execution commanders who require specific project scopes to build structural solutions.'
  },
  {
    id: '04', title: 'Technical Cookie Integration',
    content: 'We employ technical cookies and tracking tokens to verify analytical movements across our digital platforms. Users can adjust browser options to disable these trackers, though doing so may limit interactive capabilities on our form submission pages.'
  },
  {
    id: '05', title: 'Industrial Encryption Measures',
    content: 'We use secure HTTPS data transmission networks to shield communication records from unauthorized interception. Our internal servers enforce modern firewall parameters and automated protection frameworks to protect stored site documentation.'
  },
  {
    id: '06', title: 'Corporate Data Entitlements',
    content: 'Authorized business representatives retain full privileges to review, adjust, or request the erasure of recorded company data strings, provided these requests do not conflict with active legal constraints. Contact privacy@zaschem.in to initiate data verification workflows.'
  },
  {
    id: '07', title: 'Retention Lifecycle Rules',
    content: 'General contact logs are retained for a standard 3-year commercial lifecycle. Detailed infrastructural site evaluation blueprints, chemical calculation sheets, and project parameters are retained for 10 years to fulfill engineering warranty terms.'
  },
  {
    id: '08', title: 'Policy Governance Updates',
    content: 'ZasChem India reserves the absolute authority to modify these parameters to meet changing industrial data regulations. Changes become active immediately upon site publication, with clear indicators detailing revision updates.'
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-[#010e1f] min-h-screen text-gray-100 font-sans">
      
      {/* Header Panel */}
      <section className="relative py-20 border-b border-white/5 bg-[#001428]/40">
        <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-6 tracking-wider">
            <Link href="/" className="hover:text-[#64dfdf] transition-colors">HOME</Link>
            <ChevronRight size={12} className="text-gray-600" />
            <span className="text-[#f77f00]">PRIVACY COMPLIANCE</span>
          </nav>
          
          <div className="flex items-center gap-2.5 text-[#64dfdf] mb-4">
            <ShieldCheck size={18} />
            <span className="font-mono text-xs font-bold tracking-widest uppercase">DATA PROTECTION SYSTEM</span>
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl text-white tracking-tight mb-3">PRIVACY POLICY</h1>
          <p className="text-gray-400 text-xs md:text-sm font-mono">Last Synchronized Update: January 2026 &nbsp;|&nbsp; ZasChem India Private Limited</p>
        </div>
      </section>

      {/* Main Analysis Block */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#031a38]/40 border border-white/5 border-l-4 border-l-[#64dfdf] p-6 md:p-8 mb-10 rounded-sm">
            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-sans">
              ZasChem India Private Limited operates strict regulatory guidelines to govern the collection, processing, and retention of industrial client profiles. This data collection statement governs information gathered through user interactions on our digital web platforms in accordance with Indian information technology acts and modern cybersecurity compliance matrices.
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((sec) => (
              <div key={sec.id} className="bg-[#031a38]/20 border border-white/5 p-6 md:p-8 rounded-sm hover:bg-[#031a38]/40 transition-colors duration-300">
                <div className="flex items-start gap-4 md:gap-6">
                  <span className="font-mono text-[#64dfdf] text-xs md:text-sm font-black bg-[#64dfdf]/10 px-2 py-1 border border-[#64dfdf]/20 rounded-sm">{sec.id}</span>
                  <div>
                    <h2 className="font-display font-bold text-lg md:text-xl text-white mb-3 tracking-wide">{sec.title}</h2>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-sans">{sec.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Privacy Team Contact Hub */}
          <div className="mt-12 p-6 md:p-8 bg-gradient-to-r from-[#031a38] to-[#010e1f] border border-white/10 border-t-2 border-t-[#64dfdf] rounded-sm">
            <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-3">CONTACT CHANNELS FOR RECORD VERIFICATION</h3>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4 font-sans">
              For security compliance verifications, data access authorization requests, or data extraction logs, please contact our data management division:
            </p>
            <div className="font-mono text-xs text-gray-400 space-y-1.5">
              <p>Email Link: <a href="mailto:privacy@zaschem.in" className="text-[#64dfdf] hover:underline">privacy@zaschem.in</a></p>
              <p>Corporate Hub: ZasChem India Private Limited, Specialized Infrastructure Security Zone, India</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}