import { useState } from 'react';
import {
  Search,
  Shield,
  Zap,
  Lock,
  ArrowRight,
  Landmark,
  Receipt,
  ShoppingBag,
  Coins,
  Scale,
  Scissors,
  Binary,
  HeartPulse,
  Sparkles,
  Calculator,
  Activity,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { categories } from '../data/categories';
import { toolsConfig } from '../data/toolsConfig';
import { siteConfig } from '../data/siteConfig';
import { SEOMetaManager } from '../components/seo/SEOMetaManager';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

const categoryIcons: Record<string, any> = {
  Landmark,
  Receipt,
  ShoppingBag,
  Coins,
  Scale,
  Scissors,
  Binary,
  HeartPulse
};

const toolIconMap: Record<string, any> = {
  'simple-mortgage-calculator': Landmark,
  'lcm-calculator': Binary,
  'take-home-pay-calculator': Receipt,
  'scientific-calculator': Zap,
  'mean-calculator': Activity,
  'fraction-calculator': Layers,
  'ebay-fee-calculator': ShoppingBag,
  'credit-card-payoff-calculator': Scale
};

const toolHighlightMap: Record<string, string> = {
  'simple-mortgage-calculator': '30-Yr Fixed & Amortization',
  'lcm-calculator': 'Prime Factor Decomposition',
  'take-home-pay-calculator': '2026 IRS Tax Tables & FICA',
  'scientific-calculator': 'Trig, Roots & Logarithms',
  'mean-calculator': 'Descriptive Statistics & Mode',
  'fraction-calculator': 'Mixed Numbers & Steps',
  'ebay-fee-calculator': 'Category Tiered Margins',
  'credit-card-payoff-calculator': 'Avalanche & Snowball Payoff'
};

const categoryBadgeStyles: Record<string, string> = {
  financial: 'text-emerald-800 dark:text-emerald-300 bg-emerald-500/15 dark:bg-emerald-950/60 border-emerald-300/80 dark:border-emerald-700/60 shadow-2xs',
  math: 'text-indigo-800 dark:text-indigo-300 bg-indigo-500/15 dark:bg-indigo-950/60 border-indigo-300/80 dark:border-indigo-700/60 shadow-2xs',
  'tax-and-income': 'text-amber-800 dark:text-amber-300 bg-amber-500/15 dark:bg-amber-950/60 border-amber-300/80 dark:border-amber-700/60 shadow-2xs',
  'business-and-ecommerce': 'text-cyan-800 dark:text-cyan-300 bg-cyan-500/15 dark:bg-cyan-950/60 border-cyan-300/80 dark:border-cyan-700/60 shadow-2xs'
};

export function HomePage({ onNavigate }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPopularCategory, setSelectedPopularCategory] = useState<string>('all');

  const popularSlugs = [
    'simple-mortgage-calculator',
    'lcm-calculator',
    'take-home-pay-calculator',
    'scientific-calculator',
    'mean-calculator',
    'fraction-calculator',
    'ebay-fee-calculator',
    'credit-card-payoff-calculator'
  ];

  const popularTools = popularSlugs.map((s) => toolsConfig[s]).filter(Boolean);

  const filteredPopularTools =
    selectedPopularCategory === 'all'
      ? popularTools
      : popularTools.filter((t) => t.categoryId === selectedPopularCategory);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    const match = Object.values(toolsConfig).find(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.h1.toLowerCase().includes(q) ||
        t.primaryKeyword.toLowerCase().includes(q) ||
        t.supportingKeywords.some((k) => k.toLowerCase().includes(q))
    );
    if (match) {
      onNavigate(`/${match.categoryId}/${match.slug}/`);
    } else {
      onNavigate(`/financial/simple-mortgage-calculator/`);
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 py-6 md:py-10">
      <SEOMetaManager isHome />
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4 pt-4 sm:pt-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Precision Calculators for Real Decisions
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Free, mathematically audited online calculators for American mortgages, taxes, freelance rates, seller fees, and daily unit conversions.
        </p>

        {/* Hero Search Box */}
        <form onSubmit={handleSearchSubmit} className="mt-8 max-w-2xl mx-auto relative">
          <div className="relative flex items-center shadow-sm rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1422] p-1.5 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
            <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 ml-3.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 40+ precision tools: mortgage, taxes, LCM, mean, scientific..."
              className="w-full px-3 py-3 text-sm text-slate-900 dark:text-slate-100 bg-transparent placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs active:scale-[0.98] shrink-0"
            >
              Calculate
            </button>
          </div>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="text-slate-400 dark:text-slate-500 font-medium">Popular:</span>
          <button
            onClick={() => onNavigate('/financial/simple-mortgage-calculator/')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 underline decoration-slate-300 dark:decoration-slate-700 font-medium"
          >
            Mortgage
          </button>
          <span>&bull;</span>
          <button
            onClick={() => onNavigate('/math/lcm-calculator/')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 underline decoration-slate-300 dark:decoration-slate-700 font-medium"
          >
            LCM
          </button>
          <span>&bull;</span>
          <button
            onClick={() => onNavigate('/math/scientific-calculator/')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 underline decoration-slate-300 dark:decoration-slate-700 font-medium"
          >
            Scientific
          </button>
          <span>&bull;</span>
          <button
            onClick={() => onNavigate('/math/fraction-calculator/')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 underline decoration-slate-300 dark:decoration-slate-700 font-medium"
          >
            Fractions
          </button>
          <span>&bull;</span>
          <button
            onClick={() => onNavigate('/math/mean-calculator/')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 underline decoration-slate-300 dark:decoration-slate-700 font-medium"
          >
            Mean
          </button>
          <span>&bull;</span>
          <button
            onClick={() => onNavigate('/financial/take-home-pay-calculator/')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 underline decoration-slate-300 dark:decoration-slate-700 font-medium"
          >
            Paycheck
          </button>
          <span>&bull;</span>
          <button
            onClick={() => onNavigate('/conversions/km-to-miles/')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 underline decoration-slate-300 dark:decoration-slate-700 font-medium"
          >
            Km to Miles
          </button>
        </div>
      </section>

      {/* Live Currency Rates Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1422] p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
            <span className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Currency Rates Today (1 USD Reference)
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px] mt-1 sm:mt-0">
              Rates as of {siteConfig.lastUpdated} &bull; ECB Mid-Market Benchmarks
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { code: 'EUR', symbol: '€', rate: '0.9245', name: 'Euro', path: '/currency/' },
              { code: 'GBP', symbol: '£', rate: '0.7715', name: 'Pound', path: '/currency/gbp-to-usd/' },
              { code: 'CAD', symbol: 'CA$', rate: '1.3820', name: 'Canadian Dollar', path: '/currency/usd-to-cad/' },
              { code: 'MXN', symbol: 'Mex$', rate: '19.35', name: 'Mexican Peso', path: '/currency/usd-to-mxn/' },
              { code: 'PHP', symbol: '₱', rate: '57.80', name: 'Philippine Peso', path: '/currency/usd-to-php/' },
              { code: 'INR', symbol: '₹', rate: '84.05', name: 'Indian Rupee', path: '/currency/inr-to-usd/' }
            ].map((c) => (
              <a
                key={c.code}
                href={c.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(c.path);
                }}
                className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-[#141C2E] hover:border-emerald-500/50 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 transition-all text-xs group"
              >
                <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium">
                  <span>{c.code}</span>
                  <span className="text-[10px]">{c.name}</span>
                </div>
                <div className="text-base font-bold font-mono text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 mt-1">
                  {c.symbol}{c.rate}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Most Popular Calculators Area - Unified, Simple & Professional */}
      {/* Most Popular Calculators Area - Unified, Open & Professional */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Showcase Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 mb-2.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Flagship Calculation Suite</span>
              <span className="w-1 h-1 rounded-full bg-indigo-400" />
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Audited Math</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Most Popular Calculators
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
              Authoritative, client-side calculation engines verified against 2026 statutory schedules (IRS, CFPB, NIST) with instant formulas and zero data tracking.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-[#0E1422] border border-slate-200 dark:border-slate-800 text-xs shrink-0 self-start lg:self-end">
            {[
              { id: 'all', label: 'All Tools' },
              { id: 'math', label: 'Math' },
              { id: 'financial', label: 'Financial' },
              { id: 'tax-and-income', label: 'Tax & Income' },
              { id: 'business-and-ecommerce', label: 'Business' }
            ].map((tab) => {
              const isActive = selectedPopularCategory === tab.id;
              const count =
                tab.id === 'all'
                  ? popularTools.length
                  : popularTools.filter((t) => t.categoryId === tab.id).length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedPopularCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-slate-100 dark:bg-white/20 text-slate-700 dark:text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {filteredPopularTools.map((tool) => {
            const ToolIcon = toolIconMap[tool.slug] || Calculator;
            const highlight = toolHighlightMap[tool.slug] || 'Verified Calculation';
            const badgeStyle =
              categoryBadgeStyles[tool.categoryId] ||
              'text-indigo-800 dark:text-indigo-300 bg-indigo-500/15 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700/60 shadow-2xs';

            return (
              <a
                key={tool.slug}
                href={`/${tool.categoryId}/${tool.slug}/`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/${tool.categoryId}/${tool.slug}/`);
                }}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0E1422] hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Card Top */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span
                      className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md border-2 ${badgeStyle}`}
                    >
                      {categories.find((c) => c.id === tool.categoryId)?.name || tool.categoryId.replace(/-/g, ' ')}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-[#141C2E] border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shadow-2xs">
                      <ToolIcon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {tool.h1}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {tool.metaDescription}
                  </p>

                  {/* Key highlight */}
                  <div className="mt-4 text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <span className="truncate">{highlight}</span>
                  </div>
                </div>

                {/* Card Bottom CTA Bar - Highlighted aesthetic action bar with distinct unified violet styling */}
                <div className="mt-6 px-4 py-2.5 rounded-xl bg-violet-500/15 dark:bg-violet-950/60 border-2 border-violet-400/90 dark:border-violet-600/80 group-hover:bg-violet-600 group-hover:border-violet-600 dark:group-hover:bg-violet-600 dark:group-hover:border-violet-500 flex items-center justify-between text-xs sm:text-sm font-black text-violet-900 dark:text-violet-200 group-hover:text-white transition-all duration-200 shadow-2xs group-hover:shadow-md">
                  <span className="tracking-tight font-black uppercase text-[11px] sm:text-xs">Launch Calculator</span>
                  <div className="w-7 h-7 rounded-lg bg-violet-500/25 dark:bg-violet-900/60 group-hover:bg-white/20 border border-violet-400/60 dark:border-violet-600/60 group-hover:border-transparent flex items-center justify-center transition-all duration-150">
                    <ArrowRight className="w-4 h-4 text-violet-900 dark:text-violet-200 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom Trust Ribbon */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Zero Storage &bull; 100% Client-Side Privacy</span>
            </span>
            <span className="hidden sm:inline-block text-slate-300 dark:text-slate-700">&bull;</span>
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Instant Sub-Millisecond Compute</span>
            </span>
          </div>

          <div className="text-slate-500 dark:text-slate-400 text-xs">
            Showing {filteredPopularTools.length} flagship tools
          </div>
        </div>
      </section>

      {/* Category Hubs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          Explore by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.iconName] || Landmark;
            const categoryToolCount = Object.values(toolsConfig).filter((t) => t.categoryId === cat.id).length;

            return (
              <a
                key={cat.id}
                href={`/${cat.slug}/`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/${cat.slug}/`);
                }}
                className="p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1422] hover:border-indigo-500/50 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                    style={{ backgroundColor: cat.accentColor }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {categoryToolCount} interactive {categoryToolCount === 1 ? 'tool' : 'tools'}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {cat.shortDesc}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      {/* Why Trust LapTools Block (E-E-A-T) - Unified with theme */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white dark:bg-[#0E1422] text-slate-900 dark:text-white p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-2">
              Our Quantitative Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Why Trust {siteConfig.siteName}?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              In an internet flooded with unverified AI summaries and loan marketing traps, {siteConfig.siteName} is built differently: zero guesswork, 100% transparent math, client-side privacy, and rigorous adherence to official US government schedules.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#141C2E] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                  <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Authoritative Sources</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Grounded in official IRS Revenue Procedures, CFPB Truth in Lending standards, and NIST physical metrics.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#141C2E] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                  <Lock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Client-Side Privacy</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Calculations run in your local web browser. Your private wages, debts, and balances never touch a server.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#141C2E] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Unit-Tested Code</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Formulas and rate schedules are verified against real-world test cases and regularly updated.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
              <a
                href="/editorial-policy/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/editorial-policy/');
                }}
                className="hover:text-indigo-600 dark:hover:text-white underline font-medium"
              >
                Read our Editorial Methodology &rarr;
              </a>
              <a
                href="/about/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/about/');
                }}
                className="hover:text-indigo-600 dark:hover:text-white underline font-medium"
              >
                About {siteConfig.ownerName} &rarr;
              </a>
              <span className="text-slate-500 dark:text-slate-400">
                Last reviewed: {siteConfig.lastUpdated} by {siteConfig.reviewedBy}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
