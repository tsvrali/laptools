import { useState, useEffect, useRef } from 'react';
import { Search, Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { categories } from '../../data/categories';
import { toolsConfig } from '../../data/toolsConfig';
import { Logo } from '../common/Logo';

interface HeaderProps {
  onNavigate?: (path: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize theme from localStorage (defaulting to dark for technical precision aesthetic)
  useEffect(() => {
    const savedTheme = localStorage.getItem('laptools_theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('laptools_theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('laptools_theme', 'dark');
      setIsDark(true);
    }
  };

  // Keyboard shortcut Ctrl+K / Cmd+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setMoreDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
      setMobileMenuOpen(false);
      setSearchOpen(false);
      setMoreDropdownOpen(false);
    }
  };

  // Filter tools for instant search
  const toolsList = Object.values(toolsConfig);
  const filteredTools = searchQuery.trim()
    ? toolsList.filter((t) => {
        const q = searchQuery.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.h1.toLowerCase().includes(q) ||
          t.primaryKeyword.toLowerCase().includes(q) ||
          t.supportingKeywords.some((k) => k.toLowerCase().includes(q))
        );
      })
    : toolsList.slice(0, 8); // Top popular tools as suggestions

  const primaryCategoryIds = ['financial', 'math', 'tax-and-income', 'conversions', 'business-and-ecommerce'];
  const mainCategories = categories
    .filter((c) => primaryCategoryIds.includes(c.id))
    .sort((a, b) => primaryCategoryIds.indexOf(a.id) - primaryCategoryIds.indexOf(b.id));
  const remainingCategories = categories.filter((c) => !primaryCategoryIds.includes(c.id));

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#080C15]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Professional & Creative Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="whitespace-nowrap shrink-0 hover:opacity-95 transition-opacity"
          >
            <Logo size="md" />
          </a>

          {/* Zone 2: 4-5 Clean Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700 dark:text-slate-200">
            {mainCategories.map((cat) => (
              <a
                key={cat.id}
                href={`/${cat.slug}/`}
                onClick={(e) => handleLinkClick(e, `/${cat.slug}/`)}
                className="whitespace-nowrap hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {cat.name}
              </a>
            ))}

            {/* More dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1 whitespace-nowrap hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                aria-expanded={moreDropdownOpen}
              >
                <span>More</span>
                <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-150" />
              </button>

              {moreDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-56 rounded-xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50">
                  {remainingCategories.map((cat) => (
                    <a
                      key={cat.id}
                      href={`/${cat.slug}/`}
                      onClick={(e) => handleLinkClick(e, `/${cat.slug}/`)}
                      className="block px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {cat.name}
                    </a>
                  ))}
                  <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                  <a
                    href="/editorial-policy/"
                    onClick={(e) => handleLinkClick(e, '/editorial-policy/')}
                    className="block px-4 py-2 text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Methodology & Sources
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Search button & Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Launcher */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 rounded-lg transition-colors border border-transparent dark:border-slate-700"
              aria-label="Search calculators"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search calculators...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-[#0E1422] border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-lg text-slate-900 dark:text-white">{siteConfig.siteName}</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 dark:text-slate-500">
                  Tool Categories
                </span>
                {categories.map((cat) => (
                  <a
                    key={cat.id}
                    href={`/${cat.slug}/`}
                    onClick={(e) => handleLinkClick(e, `/${cat.slug}/`)}
                    className="py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {cat.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2 text-xs text-slate-500">
              <a href="/about/" onClick={(e) => handleLinkClick(e, '/about/')} className="hover:underline">
                About Us
              </a>
              <a href="/contact/" onClick={(e) => handleLinkClick(e, '/contact/')} className="hover:underline">
                Contact & Feedback
              </a>
              <a href="/editorial-policy/" onClick={(e) => handleLinkClick(e, '/editorial-policy/')} className="hover:underline">
                Methodology & Testing
              </a>
              <a href="/privacy-policy/" onClick={(e) => handleLinkClick(e, '/privacy-policy/')} className="hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Client-Side Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 p-4 sm:p-6 md:p-20 overflow-y-auto flex items-start justify-center">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSearchOpen(false)}
          />

          <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 transition-all">
            <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
              <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mortgage, taxes, eBay fees, running pace..."
                className="w-full py-4 text-sm text-slate-900 dark:text-slate-100 bg-transparent placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filteredTools.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {searchQuery ? 'Matching Calculators' : 'Popular Tools'}
                  </div>
                  {filteredTools.map((t) => (
                    <a
                      key={t.slug}
                      href={`/${t.categoryId}/${t.slug}/`}
                      onClick={(e) => handleLinkClick(e, `/${t.categoryId}/${t.slug}/`)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                    >
                      <div>
                        <div className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {t.h1}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {t.metaDescription}
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 shrink-0 ml-4 capitalize font-sans">
                        {t.categoryId.replace(/-/g, ' ')}
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-sm text-slate-500">
                  No calculators found for &ldquo;{searchQuery}&rdquo;. Try &ldquo;mortgage&rdquo;, &ldquo;tax&rdquo;, or &ldquo;fees&rdquo;.
                </div>
              )}
            </div>

            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Press ESC to close</span>
              <span>28 Tested US Calculators</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
