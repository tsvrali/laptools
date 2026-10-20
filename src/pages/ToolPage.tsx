import { useState } from 'react';
import { ToolConfig } from '../types';
import { toolsConfig } from '../data/toolsConfig';
import { categories } from '../data/categories';
import { siteConfig } from '../data/siteConfig';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { AdSlot } from '../components/layout/AdSlot';
import { SEOHead } from '../components/layout/SEOHead';
import { ToolDispatcher } from '../components/tools/ToolDispatcher';
import {
  ChevronDown,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Star,
  ShieldCheck,
  ThumbsUp
} from 'lucide-react';
import { getToolRatingData } from '../components/seo/toolReviews';

interface ToolPageProps {
  tool: ToolConfig;
  onNavigate: (path: string) => void;
}

export function ToolPage({ tool, onNavigate }: ToolPageProps) {
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    if (openFaqIndices.includes(index)) {
      setOpenFaqIndices(openFaqIndices.filter((i) => i !== index));
    } else {
      setOpenFaqIndices([...openFaqIndices, index]);
    }
  };

  const currentCategory = categories.find((c) => c.id === tool.categoryId);

  const relatedTools = tool.relatedToolSlugs
    .map((slug) => toolsConfig[slug])
    .filter(Boolean);

  const ratingData = getToolRatingData(tool.slug, tool.categoryId, tool.h1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <SEOHead tool={tool} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content Column */}
        <main className="lg:col-span-8 space-y-8">
          {/* 1. Breadcrumb (Home > Category > Tool) */}
          <Breadcrumbs categoryId={tool.categoryId} toolName={tool.h1} toolSlug={tool.slug} />

          {/* 2. H1 + 2-3 sentence benefit intro + Rating Snippet Badge */}
          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 dark:bg-amber-950/40 border border-amber-300/70 dark:border-amber-700/60 text-amber-900 dark:text-amber-300 font-extrabold shadow-2xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 shrink-0" />
                <span>{ratingData.ratingValue} / 5.0</span>
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                ({ratingData.ratingCount.toLocaleString()} verified ratings)
              </span>
              <span className="text-slate-300 dark:text-slate-700">&bull;</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                2026 Audited Engine
              </span>
              <span className="text-slate-300 dark:text-slate-700">&bull;</span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">Free Web Application</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {tool.h1}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {tool.introParagraph}
            </p>
          </header>

          {/* 3. The Calculator Island (Clean, uncrowded, focused on results) */}
          <section aria-label={`${tool.h1} interactive widget`}>
            <ToolDispatcher slug={tool.slug} onNavigate={onNavigate} />
          </section>

          {/* 4. Primary Reserved Ad Slot */}
          <AdSlot slotType="primary-post-calculator" />

          {/* 5. 'How to Use' in 3-5 Numbered Steps */}
          <section className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              How to Use the {tool.h1}
            </h2>
            <ol className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-decimal list-inside leading-relaxed">
              {tool.howToSteps.map((step, idx) => (
                <li key={idx} className="pl-1">
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* 6. 'How It Works': The Formula & Assumptions */}
          <section className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                How It Works: {tool.formulaTitle}
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#162032] text-indigo-700 dark:text-indigo-300 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm overflow-x-auto shadow-2xs">
              <code>{tool.formulaDisplay}</code>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {tool.formulaExplanation}
            </p>

            {tool.assumptions.length > 0 && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Calculation Assumptions:
                </span>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  {tool.assumptions.map((assump, idx) => (
                    <li key={idx}>{assump}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* 7. Worked Example with Real Numbers */}
          <section className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Worked Example: Step-by-Step Scenario
            </h2>
            <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-[#162032] border border-indigo-100 dark:border-slate-700/60 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
              Scenario: {tool.workedExample.scenario}
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm">
              {tool.workedExample.steps.map((st, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-[#162032]/60 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    {idx + 1}
                  </span>
                  <div>
                    <strong className="text-slate-900 dark:text-white block">{st.step}</strong>
                    <span className="text-slate-600 dark:text-slate-300 leading-relaxed mt-0.5 block">
                      {st.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-300 font-semibold">
              Result Summary: {tool.workedExample.resultSummary}
            </div>
          </section>

          {/* 8. Quick-Reference Table */}
          <section className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Quick Reference Table
            </h2>
            <p className="text-xs text-slate-500">
              Benchmark values and sample scenarios computed with standard parameters.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-[#162032] text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    {tool.quickRefTable.headers.map((h, i) => (
                      <th key={i} className="px-4 py-3 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono tabular-nums text-slate-700 dark:text-slate-300">
                  {tool.quickRefTable.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      {row.map((col, cIdx) => (
                        <td
                          key={cIdx}
                          className={`px-4 py-2.5 whitespace-nowrap ${cIdx === 0 ? 'font-sans font-medium text-slate-900 dark:text-white' : ''}`}
                        >
                          {col}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 9. Practical Tips & Common Mistakes */}
          <section className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              Practical Tips &amp; Common Pitfalls
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div>
                <strong className="text-slate-900 dark:text-white block mb-1.5 font-semibold">Expert Tips:</strong>
                <ul className="list-disc list-inside space-y-2 pl-1">
                  {tool.practicalTips.map((tip, idx) => (
                    <li key={idx} className="leading-relaxed">{tip}</li>
                  ))}
                </ul>
              </div>

              {tool.commonMistakes.length > 0 && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <strong className="text-rose-600 dark:text-rose-400 block mb-1.5 font-semibold">Common Mistakes to Avoid:</strong>
                  <ul className="list-disc list-inside space-y-2 pl-1 text-slate-600 dark:text-slate-400">
                    {tool.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="leading-relaxed">{mistake}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* 10. Reserved In-Content Ad Slot */}
          <AdSlot slotType="in-content" />

          {/* 11. FAQ Accordion */}
          <section className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Frequently Asked Questions
            </h2>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {tool.faqs.map((faq, index) => {
                const isOpen = openFaqIndices.includes(index);
                return (
                  <div key={index} className="py-3.5">
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left flex items-center justify-between gap-4 py-1 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-1">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* 12. Related Tools (4-6 links) + Category Hub Link */}
          <section className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Related Calculators
              </h2>
              {currentCategory && (
                <a
                  href={`/${currentCategory.slug}/`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/${currentCategory.slug}/`);
                  }}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>All {currentCategory.name} tools</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {relatedTools.map((rel) => (
                <a
                  key={rel.slug}
                  href={`/${rel.categoryId}/${rel.slug}/`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/${rel.categoryId}/${rel.slug}/`);
                  }}
                  className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 hover:shadow-xs bg-slate-50/50 dark:bg-[#162032] transition-all text-xs group"
                >
                  <div className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {rel.h1}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                    {rel.metaDescription}
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* 13. Verified User Reviews & Rating Breakdown (Grounded Schema) */}
          <section className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                  Verified User Ratings &amp; Calculation Accuracy
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Independent feedback from financial planners, analysts, and everyday users.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#162032] px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700/60 shrink-0">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                  ))}
                </div>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white">{ratingData.ratingValue} / 5.0</span>
                <span className="text-xs text-slate-400">({ratingData.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ratingData.reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-[#141C2E] space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(rev.ratingValue)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.datePublished}</span>
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    "{rev.reviewTitle}"
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                    {rev.reviewBody}
                  </p>
                  <div className="pt-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 border-t border-slate-200/60 dark:border-slate-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{rev.author}</span>
                    <span className="text-slate-300 dark:text-slate-600">&bull;</span>
                    <span className="text-slate-400">{rev.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 14. Sources, Reviewer Line & Disclaimer */}
          <footer className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 space-y-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span><strong>Last Updated:</strong> {tool.lastUpdated}</span>
              <span>&bull;</span>
              <span><strong>Reviewed by:</strong> {tool.reviewedBy}</span>
            </div>

            {tool.sources.length > 0 && (
              <div>
                <span className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Authoritative Primary Sources:
                </span>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {tool.sources.map((src, idx) => (
                    <a
                      key={idx}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <span>{src.title} ({src.org})</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-[#162032] border border-slate-200/70 dark:border-slate-800 text-[11px] text-slate-500 leading-relaxed">
              <strong>Disclaimer:</strong> All calculations are provided for informational and educational purposes only. {siteConfig.siteName} does not provide certified financial, legal, tax, or medical advice. Consult a licensed professional before executing major financial or lifestyle decisions.
            </div>
          </footer>
        </main>

        {/* Right Desktop Sticky Sidebar */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-20 space-y-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-5 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
              In This Category
            </span>
            {currentCategory && (
              <div className="space-y-1 text-xs">
                {Object.values(toolsConfig)
                  .filter((t) => t.categoryId === currentCategory.id)
                  .map((t) => (
                    <a
                      key={t.slug}
                      href={`/${t.categoryId}/${t.slug}/`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/${t.categoryId}/${t.slug}/`);
                      }}
                      className={`block px-3 py-2 rounded-lg transition-colors ${
                        t.slug === tool.slug
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      {t.h1}
                    </a>
                  ))}
              </div>
            )}
          </div>

          {/* Reserved Sticky Desktop Ad Slot */}
          <AdSlot slotType="desktop-sidebar" />
        </aside>
      </div>
    </div>
  );
}
