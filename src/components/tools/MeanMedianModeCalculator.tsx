import { useState, useMemo } from 'react';
import { calculateMean } from '../../utils/calculatorLogic';
import { CalculatorHeaderActions } from './CalculatorHeaderActions';
import { BookOpen, BarChart3, HelpCircle } from 'lucide-react';

export function MeanMedianModeCalculator() {
  const [datasetStr, setDatasetStr] = useState<string>('3, 7, 5, 13, 20, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29');

  const numbers = useMemo(() => {
    return datasetStr
      .split(/[\s,]+/)
      .map((s) => parseFloat(s))
      .filter((n) => !isNaN(n));
  }, [datasetStr]);

  const result = useMemo(() => calculateMean(numbers), [numbers]);

  const modeDisplay = result.mode.length > 0 ? result.mode.join(', ') : 'No Mode (all values appear once)';

  const resultSummaryText = `Mean, Median, Mode Summary: n = ${result.count}. Mean (Average) = ${result.arithmeticMean}, Median = ${result.median}, Mode = ${modeDisplay}. Range = ${result.range}, Sample Std Dev = ${result.sampleStdDev}.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_10px_28px_-4px_rgba(15,23,42,0.06),0_20px_48px_-8px_rgba(15,23,42,0.04)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_8px_32px_-4px_rgba(0,0,0,0.65),0_24px_64px_-12px_rgba(0,0,0,0.85)] p-6 sm:p-8 lg:p-10 xl:p-11 space-y-8 transition-all">
      {/* 3 Prominent Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Mean */}
        <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/30 dark:from-[#111A2E] dark:via-[#0E1422] dark:to-[#0A101D] border border-indigo-200/80 dark:border-indigo-900/50 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
              Mean (Average)
            </span>
            <div className="mt-2 text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
              {result.arithmeticMean}
            </div>
          </div>
          <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
            Sum ({result.sum}) divided by count ({result.count}).
          </p>
        </div>

        {/* Median */}
        <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-indigo-50/50 via-white to-indigo-50/20 dark:from-[#111A2E] dark:via-[#0E1422] dark:to-[#0A101D] border border-indigo-200/70 dark:border-indigo-900/50 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
              Median (Middle Value)
            </span>
            <div className="mt-2 text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
              {result.median}
            </div>
          </div>
          <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
            50th percentile of the sorted dataset.
          </p>
        </div>

        {/* Mode */}
        <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-cyan-50/50 via-white to-teal-50/20 dark:from-[#111A2E] dark:via-[#0E1422] dark:to-[#0A101D] border border-cyan-200/70 dark:border-cyan-900/50 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
              Mode (Most Frequent)
            </span>
            <div className="mt-2 text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white tabular-nums truncate">
              {modeDisplay}
            </div>
          </div>
          <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
            Value(s) with highest occurrence count.
          </p>
        </div>
      </div>

      {/* Input Field & Presets */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Enter Numbers (Dataset separated by commas, spaces, or lines)
          </label>
          <textarea
            rows={3}
            value={datasetStr}
            onChange={(e) => setDatasetStr(e.target.value)}
            className="w-full px-4 py-3 text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/60 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 focus:outline-none transition-all"
            placeholder="e.g. 15, 22.5, 30, 45, 60"
          />
        </div>

        <div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-2">Sample Datasets:</span>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { label: 'Sample Test Scores', val: '78, 85, 92, 88, 64, 95, 82, 88, 91' },
              { label: 'Weekly Temperatures (°F)', val: '68, 72, 75, 71, 72, 69, 74' },
              { label: 'Symmetrical Normal', val: '10, 20, 30, 40, 50, 60, 70' },
              { label: 'Bimodal Example', val: '2, 3, 3, 5, 7, 8, 8, 10' }
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setDatasetStr(p.val)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-xs transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Step-by-Step Educational Solution Card */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-blue-500" />
          Step-by-Step Calculations &amp; Distribution Profile
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* Steps */}
          <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 space-y-2">
            <span className="font-sans font-bold text-slate-900 dark:text-white block mb-1">Calculation Steps:</span>
            {result.steps.map((st, i) => (
              <div key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {st}
              </div>
            ))}
          </div>

          {/* Secondary Statistical Measures */}
          <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 space-y-2.5">
            <span className="font-sans font-bold text-slate-900 dark:text-white block mb-1">
              Descriptive Dispersion Metrics:
            </span>
            <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-500">Sample Count (n):</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{result.count}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-500">Minimum Value:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{result.min}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-500">Maximum Value:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{result.max}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-500">Range (Max - Min):</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{result.range}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-500">Sample Variance (s²):</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{result.sampleVariance}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Sample Standard Deviation (s):</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{result.sampleStdDev}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <CalculatorHeaderActions
          onReset={() => setDatasetStr('3, 7, 5, 13, 20, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29')}
          resultSummaryText={resultSummaryText}
        />
      </div>
    </div>
  );
}
