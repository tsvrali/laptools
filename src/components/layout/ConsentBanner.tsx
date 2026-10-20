import { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export function ConsentBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [adsConsent, setAdsConsent] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('laptools_consent_decision');
    if (!saved) {
      // Delay showing by 600ms to avoid intrusive immediate pop
      const timer = setTimeout(() => setIsOpen(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'laptools_consent_decision',
      JSON.stringify({ necessary: true, analytics: true, advertising: true, timestamp: Date.now() })
    );
    setIsOpen(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem(
      'laptools_consent_decision',
      JSON.stringify({ necessary: true, analytics: false, advertising: false, timestamp: Date.now() })
    );
    setIsOpen(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem(
      'laptools_consent_decision',
      JSON.stringify({
        necessary: true,
        analytics: analyticsConsent,
        advertising: adsConsent,
        timestamp: Date.now()
      })
    );
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
      className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 bg-white dark:bg-[#0E1422] border-t border-slate-200 dark:border-slate-800 shadow-2xl transition-all"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Privacy and Cookie Preferences
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            We value your privacy. All calculator calculations run locally in your web browser and are never stored on our servers.
            We and our partners use cookies to deliver technical functionality, analyze traffic, and support advertising. Review our{' '}
            <a href="/privacy-policy/" className="underline hover:text-indigo-600 dark:hover:text-indigo-400">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/cookie-policy/" className="underline hover:text-indigo-600 dark:hover:text-indigo-400">
              Cookie Policy
            </a>
            .
          </p>

          {showPreferences && (
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 text-xs">
              <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-not-allowed">
                <input type="checkbox" checked disabled className="rounded text-indigo-600" />
                <span>Strictly Necessary (Always Active)</span>
              </label>
              <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsConsent}
                  onChange={(e) => setAnalyticsConsent(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                <span>Anonymous Performance Analytics</span>
              </label>
              <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={adsConsent}
                  onChange={(e) => setAdsConsent(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                <span>Personalized Advertising Cookies</span>
              </label>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0 self-end md:self-center">
          {showPreferences ? (
            <button
              onClick={handleSaveCustom}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-lg transition-all shadow-sm"
            >
              Save Custom Choices
            </button>
          ) : (
            <button
              onClick={() => setShowPreferences(true)}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Customize
            </button>
          )}

          <button
            onClick={handleRejectNonEssential}
            className="px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Essential Only
          </button>

          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-lg transition-all shadow-sm shadow-indigo-500/20"
          >
            Accept All
          </button>

          <button
            onClick={handleRejectNonEssential}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
