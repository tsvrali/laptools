import { useState } from 'react';
import { categories } from '../data/categories';
import { toolsConfig } from '../data/toolsConfig';
import { siteConfig } from '../data/siteConfig';
import { SEOHead } from '../components/layout/SEOHead';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { FileCode, ExternalLink, Copy, Check, ChevronDown, CheckCircle2 } from 'lucide-react';

interface SitemapPageProps {
  onNavigate: (path: string) => void;
}

export function SitemapPage({ onNavigate }: SitemapPageProps) {
  const [copied, setCopied] = useState(false);
  const [showXmlPreview, setShowXmlPreview] = useState(false);

  const trustLinks = [
    { title: 'About Us', path: '/about/' },
    { title: 'Contact Us', path: '/contact/' },
    { title: 'Privacy Policy', path: '/privacy-policy/' },
    { title: 'Terms and Conditions', path: '/terms-and-conditions/' },
    { title: 'Legal & Financial Disclaimer', path: '/disclaimer/' },
    { title: 'Cookie Policy', path: '/cookie-policy/' },
    { title: 'Editorial Policy & Methodology', path: '/editorial-policy/' },
    { title: 'XML Sitemap (Raw Machine Feed)', path: '/sitemap.xml' }
  ];

  const totalTools = Object.keys(toolsConfig).length;
  const totalCategories = categories.length;
  const totalUrls = 1 + totalCategories + totalTools + trustLinks.length - 1; // excluding sitemap.xml duplicate entry

  const sitemapUrl = `${siteConfig.domain}/sitemap.xml`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(sitemapUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Home Page -->
  <url>
    <loc>${siteConfig.domain}/</loc>
    <lastmod>${siteConfig.lastUpdated}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- 8 Category Hubs (0.9 Priority) -->
  <!-- 40 Calculation Engines & SoftwareApplication Schema (0.8 Priority) -->
  <!-- 8 Trust, Transparency & Editorial Standards (0.3-0.5 Priority) -->
</urlset>`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      <SEOHead
        title={`HTML & XML Sitemap - All Calculators & Software Tools | ${siteConfig.siteName}`}
        description={`Complete index and machine-readable XML sitemap of all free calculators, converters, and trust pages on ${siteConfig.siteName}.`}
        canonicalPath="/sitemap/"
      />

      <Breadcrumbs toolName="Sitemap & Machine Feed" />

      {/* Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Sitemap &amp; Machine-Readable Directory
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Comprehensive dual-layer indexing: Human-readable directory for instant navigation across all {totalTools} tools, and standard XML protocol feed for search engine indexers.
        </p>
      </div>

      {/* XML Sitemap Machine Feed Banner */}
      <section className="p-6 sm:p-7 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800/80 bg-gradient-to-br from-indigo-50/60 via-white to-slate-50 dark:from-[#0F172A] dark:via-[#111A2E] dark:to-[#0B0F19] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 mb-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                Standard Sitemaps.org 0.9 Protocol
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Machine-Readable XML Sitemap (/sitemap.xml)
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Automatically submitted via robots.txt for Google Search Console, Bing Webmaster, and search bots.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#141C2E] hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-all shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy URL</span>
                </>
              )}
            </button>

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              <span>View Raw XML</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Sitemap Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 text-xs">
          <div className="p-3 rounded-lg bg-white/80 dark:bg-[#141C2E] border border-slate-200/60 dark:border-slate-800">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Indexable Endpoints</span>
            <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">{totalUrls} URLs</span>
          </div>
          <div className="p-3 rounded-lg bg-white/80 dark:bg-[#141C2E] border border-slate-200/60 dark:border-slate-800">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Calculation Tools</span>
            <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">{totalTools} Engines</span>
          </div>
          <div className="p-3 rounded-lg bg-white/80 dark:bg-[#141C2E] border border-slate-200/60 dark:border-slate-800">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Category Hubs</span>
            <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">{totalCategories} Silos</span>
          </div>
          <div className="p-3 rounded-lg bg-white/80 dark:bg-[#141C2E] border border-slate-200/60 dark:border-slate-800">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Click Depth</span>
            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">&le; 3 Clicks Max</span>
          </div>
        </div>

        {/* XML Preview Toggle */}
        <div className="pt-1">
          <button
            onClick={() => setShowXmlPreview(!showXmlPreview)}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
          >
            <span>{showXmlPreview ? 'Hide XML Structure Preview' : 'Show XML Structure Preview'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showXmlPreview ? 'rotate-180' : ''}`} />
          </button>

          {showXmlPreview && (
            <pre className="mt-3 p-4 rounded-xl bg-slate-900 text-slate-200 text-[11px] font-mono overflow-x-auto border border-slate-800 leading-relaxed">
              {sampleXml}
            </pre>
          )}
        </div>
      </section>

      {/* Human-Readable Category Hubs & Tools Directory */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          All Interactive Calculators by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const tools = Object.values(toolsConfig).filter((t) => t.categoryId === cat.id);
            return (
              <div
                key={cat.id}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-sm space-y-3.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100 dark:border-slate-800">
                    <a
                      href={`/${cat.slug}/`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/${cat.slug}/`);
                      }}
                      className="text-base font-bold text-indigo-600 dark:text-indigo-400 hover:underline block"
                    >
                      {cat.name}
                    </a>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {tools.length} tools
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {tools.map((t) => (
                      <li key={t.slug}>
                        <a
                          href={`/${t.categoryId}/${t.slug}/`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(`/${t.categoryId}/${t.slug}/`);
                          }}
                          className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline block truncate"
                        >
                          &bull; {t.h1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`/${cat.slug}/`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/${cat.slug}/`);
                  }}
                  className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-between group"
                >
                  <span>Explore {cat.name} Hub</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust & Policy Pages */}
      <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] space-y-4 shadow-sm">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          Transparency, Auditing &amp; Legal Documentation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {trustLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={(e) => {
                if (!link.path.endsWith('.xml')) {
                  e.preventDefault();
                  onNavigate(link.path);
                }
              }}
              className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center justify-between"
            >
              <span>{link.title}</span>
              {link.path.endsWith('.xml') && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                  XML
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
