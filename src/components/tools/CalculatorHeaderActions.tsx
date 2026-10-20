import { useState } from 'react';
import { Copy, Check, RotateCcw, Printer } from 'lucide-react';

interface CalculatorHeaderActionsProps {
  onReset: () => void;
  resultSummaryText?: string;
}

export function CalculatorHeaderActions({ onReset, resultSummaryText }: CalculatorHeaderActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (resultSummaryText) {
      navigator.clipboard.writeText(resultSummaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-4 mt-6 border-t border-slate-200/80 dark:border-slate-800 text-xs">
      {resultSummaryText && (
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/80 dark:border-slate-700/80 rounded-lg shadow-2xs transition-colors"
          title="Copy results summary to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Result'}</span>
        </button>
      )}

      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80 rounded-lg shadow-2xs transition-colors"
        title="Print this calculation or save as PDF"
      >
        <Printer className="w-3.5 h-3.5" />
        <span>Print</span>
      </button>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors ml-auto"
        title="Reset calculator to default values"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Defaults</span>
      </button>
    </div>
  );
}
