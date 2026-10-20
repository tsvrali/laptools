import { CategoryMeta } from '../types';
import { toolsConfig } from '../data/toolsConfig';
import { categories } from '../data/categories';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SEOHead } from '../components/layout/SEOHead';
import { CurrencyCalculator } from '../components/tools/CurrencyCalculator';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface CategoryHubPageProps {
  category: CategoryMeta;
  onNavigate: (path: string) => void;
}

export function CategoryHubPage({ category, onNavigate }: CategoryHubPageProps) {
  const categoryTools = Object.values(toolsConfig).filter((t) => t.categoryId === category.id);
  const siblingCategories = categories.filter((c) => c.id !== category.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-12">
      <SEOHead
        title={`${category.name} Calculators - Free Online Tools (2026)`}
        description={`${category.shortDesc} Mathematically audited calculations with clear formulas and worked examples.`}
        canonicalPath={`/${category.slug}/`}
        category={category}
        categoryTools={categoryTools}
      />

      {/* Breadcrumb */}
      <Breadcrumbs categoryId={category.id} />

      {/* Header Banner */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="w-3 h-8 rounded-full"
            style={{ backgroundColor: category.accentColor }}
          />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {category.name} Calculators
          </h1>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          {category.intro}
        </p>
      </div>

      {/* If Currency Hub, render Any-to-Any interactive converter hero */}
      {category.id === 'currency' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Live Global Currency Converter
          </h2>
          <CurrencyCalculator />
        </div>
      )}

      {/* Tool Grid */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          All {category.name} Tools ({categoryTools.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryTools.map((tool) => (
            <a
              key={tool.slug}
              href={`/${tool.categoryId}/${tool.slug}/`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/${tool.categoryId}/${tool.slug}/`);
              }}
              className="p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1422] hover:border-indigo-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tool.h1}
                </h3>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {tool.metaDescription}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>Open Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Sibling Categories Nav */}
      <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          Explore Other Calculator Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {siblingCategories.map((sib) => (
            <a
              key={sib.id}
              href={`/${sib.slug}/`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/${sib.slug}/`);
              }}
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1422] hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center justify-between transition-colors"
            >
              <span>{sib.name}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
