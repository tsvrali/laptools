import { ChevronRight, Home } from 'lucide-react';
import { categories } from '../../data/categories';
import { CategoryId } from '../../types';

interface BreadcrumbsProps {
  categoryId?: CategoryId;
  toolName?: string;
  toolSlug?: string;
}

export function Breadcrumbs({ categoryId, toolName }: BreadcrumbsProps) {
  const currentCategory = categoryId ? categories.find((c) => c.id === categoryId) : null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4"
    >
      <a
        href="/"
        className="inline-flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </a>

      {currentCategory && (
        <>
          <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600" />
          <a
            href={`/${currentCategory.slug}/`}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {currentCategory.name}
          </a>
        </>
      )}

      {toolName && (
        <>
          <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600" />
          <span className="text-slate-800 dark:text-slate-200 font-medium" aria-current="page">
            {toolName}
          </span>
        </>
      )}
    </nav>
  );
}
