import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ConsentBanner } from './components/layout/ConsentBanner';
import { HomePage } from './pages/HomePage';
import { CategoryHubPage } from './pages/CategoryHubPage';
import { ToolPage } from './pages/ToolPage';
import { TrustPage } from './pages/TrustPage';
import { SitemapPage } from './pages/SitemapPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { categories } from './data/categories';
import { toolsConfig } from './data/toolsConfig';
import { trustPages } from './data/trustPagesContent';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentPath]);

  const navigate = (path: string) => {
    // Ensure trailing slash for clean crawlable URLs
    let cleanPath = path;
    if (!cleanPath.endsWith('/') && !cleanPath.includes('.') && !cleanPath.includes('?')) {
      cleanPath = `${cleanPath}/`;
    }
    window.history.pushState({}, '', cleanPath);
    setCurrentPath(cleanPath);
  };

  // Intercept standard <a href="..."> clicks to allow instant SPA routing while keeping crawlable HTML links
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      // If internal link and not a hash or mailto or download or xml
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !href.endsWith('.xml') &&
        !href.endsWith('.txt') &&
        !target.getAttribute('target') &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey
      ) {
        e.preventDefault();
        navigate(href);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  // Determine which page to render based on path
  const renderCurrentView = () => {
    // Normalize path: strip trailing slash for regex analysis except root
    const normalized = currentPath === '/' ? '/' : currentPath.replace(/\/+$/, '');

    // 1. Home
    if (normalized === '' || normalized === '/') {
      return <HomePage onNavigate={navigate} />;
    }

    // 2. HTML Sitemap
    if (normalized === '/sitemap') {
      return <SitemapPage onNavigate={navigate} />;
    }

    // 3. Trust Pages
    const trustSlug = normalized.replace(/^\//, '');
    if (trustPages[trustSlug]) {
      return <TrustPage slug={trustSlug} onNavigate={navigate} />;
    }

    // 4. Category Hubs or Tool Pages
    // Format: /{category}/ or /{category}/{tool-slug}/
    const segments = normalized.split('/').filter(Boolean);
    if (segments.length === 1) {
      // Category Hub: e.g. /financial
      const categoryId = segments[0];
      const category = categories.find((c) => c.slug === categoryId || c.id === categoryId);
      if (category) {
        return <CategoryHubPage category={category} onNavigate={navigate} />;
      }
    } else if (segments.length === 2) {
      // Tool Page: e.g. /financial/simple-mortgage-calculator
      const toolSlug = segments[1];
      const tool = toolsConfig[toolSlug];
      if (tool) {
        return <ToolPage tool={tool} onNavigate={navigate} />;
      }
    }

    // 5. Fallback 404
    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#080C15] text-[#0F172A] dark:text-[#F8FAFC] transition-colors duration-150">
      <Header onNavigate={navigate} />
      <div className="flex-1">
        {renderCurrentView()}
      </div>
      <Footer onNavigate={navigate} />
      <ConsentBanner />
    </div>
  );
}
