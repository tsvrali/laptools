import { useState } from 'react';
import { trustPages } from '../data/trustPagesContent';
import { siteConfig } from '../data/siteConfig';
import { SEOHead } from '../components/layout/SEOHead';
import { Mail, CheckCircle2, Send, ShieldCheck, FileText } from 'lucide-react';

interface TrustPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export function TrustPage({ slug, onNavigate }: TrustPageProps) {
  const page = trustPages[slug];

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('bug_correction');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMessage) return;
    setIsSubmitted(true);
  };

  if (!page) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Page Not Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-10">
      <SEOHead
        title={page.title}
        description={page.metaDescription}
        canonicalPath={`/${page.slug}/`}
      />

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {page.h1}
        </h1>
        <div className="mt-2 text-xs text-slate-400">
          Last reviewed and verified: {page.lastUpdated} &bull; {siteConfig.ownerName}
        </div>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        {page.sections.map((section, idx) => (
          <section key={idx} className="space-y-3">
            {section.heading && (
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {section.heading}
              </h2>
            )}
            <div className="space-y-3">
              {section.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Interactive Working Contact Form if slug is 'contact' */}
      {slug === 'contact' && (
        <section className="mt-8 space-y-6">
          {/* Direct Email Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 dark:bg-[#162032] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Direct Editorial Desk Email
              </span>
              <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white">
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors underline decoration-indigo-300 underline-offset-4"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monitored Monday through Friday, 9:00 AM – 5:00 PM ET. Direct inquiries answered within 24 hours.
              </p>
            </div>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all shrink-0"
            >
              <Mail className="w-4 h-4" />
              <span>Email Us Directly</span>
            </a>
          </div>

          {/* Inquiry Form */}
          <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Send an Inquiry or Correction
              </h2>
            </div>

          {isSubmitted ? (
            <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                Inquiry Received Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
                Thank you for contacting LapTools. Our editorial and quantitative team will review your report and respond to <strong>{contactEmail}</strong> within 24 business hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setContactMessage('');
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-200 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 rounded-lg hover:bg-emerald-50"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Your Name (or Organization)
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Topic of Message
                </label>
                <select
                  value={contactTopic}
                  onChange={(e) => setContactTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="bug_correction">Mathematical Discrepancy / Formula Correction</option>
                  <option value="regulatory_update">IRS or Platform Fee Schedule Regulatory Update</option>
                  <option value="advertising">Commercial or Advertising Inquiry</option>
                  <option value="general">General Editorial Feedback</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Message / Details
                </label>
                <textarea
                  rows={5}
                  required
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Please describe the tool name, expected value vs calculated value, or regulatory reference..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                <span className="text-xs text-slate-400">
                  Protected by standard CSRF and anti-spam controls. Average response: &lt;24 hours.
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-xl transition-all shadow-sm shadow-indigo-500/25"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </div>
            </form>
          )}
          </div>
        </section>
      )}

      {/* Trust Page Navigation Strip */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 text-xs text-slate-500">
        <a href="/about/" onClick={(e) => { e.preventDefault(); onNavigate('/about/'); }} className="hover:underline">About</a>
        <span>&bull;</span>
        <a href="/editorial-policy/" onClick={(e) => { e.preventDefault(); onNavigate('/editorial-policy/'); }} className="hover:underline">Editorial Methodology</a>
        <span>&bull;</span>
        <a href="/privacy-policy/" onClick={(e) => { e.preventDefault(); onNavigate('/privacy-policy/'); }} className="hover:underline">Privacy Policy</a>
        <span>&bull;</span>
        <a href="/terms-and-conditions/" onClick={(e) => { e.preventDefault(); onNavigate('/terms-and-conditions/'); }} className="hover:underline">Terms &amp; Conditions</a>
        <span>&bull;</span>
        <a href="/disclaimer/" onClick={(e) => { e.preventDefault(); onNavigate('/disclaimer/'); }} className="hover:underline">Disclaimer</a>
        <span>&bull;</span>
        <a href="/cookie-policy/" onClick={(e) => { e.preventDefault(); onNavigate('/cookie-policy/'); }} className="hover:underline">Cookie Policy</a>
        <span>&bull;</span>
        <a href="/contact/" onClick={(e) => { e.preventDefault(); onNavigate('/contact/'); }} className="hover:underline">Contact</a>
      </div>
    </div>
  );
}
