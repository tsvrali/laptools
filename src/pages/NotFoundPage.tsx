import { Search, Home } from 'lucide-react';
import { toolsConfig } from '../data/toolsConfig';
import { SEOHead } from '../components/layout/SEOHead';

import { siteConfig } from '../data/siteConfig';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  const topTools = [
    toolsConfig['simple-mortgage-calculator'],
    toolsConfig['take-home-pay-calculator'],
    toolsConfig['ebay-fee-calculator'],
    toolsConfig['km-to-miles']
  ].filter(Boolean);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 md:py-24 text-center space-y-6">
      <SEOHead
        title={`404 - Page Not Found | ${siteConfig.siteName}`}
        description="The page you requested could not be found."
        noindex={true}
      />

      <span className="text-6xl font-extrabold font-mono text-blue-600 dark:text-blue-400">404</span>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
        Calculator Page Not Found
      </h1>
      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
        The link you followed may be broken or the calculator may have been relocated.
      </p>

      <div className="pt-4 flex justify-center gap-3">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return to Home</span>
        </a>
      </div>

      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-left">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3 text-center">
          Or Try One of Our Most Popular Tools:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {topTools.map((t) => (
            <a
              key={t.slug}
              href={`/${t.categoryId}/${t.slug}/`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/${t.categoryId}/${t.slug}/`);
              }}
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-indigo-500 font-medium text-slate-800 dark:text-slate-200"
            >
              {t.h1} &rarr;
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
