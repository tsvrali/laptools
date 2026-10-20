import { useState, useMemo } from 'react';
import { calculateGCF } from '../../utils/calculatorLogic';
import { CalculatorHeaderActions } from './CalculatorHeaderActions';
import { BookOpen, CheckCircle2 } from 'lucide-react';

export function GreatestCommonDivisorCalculator() {
  const [inputVal, setInputVal] = useState<string>('48, 72');

  const numbers = useMemo(() => {
    return inputVal
      .split(/[\s,]+/)
      .map((s) => parseFloat(s))
      .filter((n) => !isNaN(n) && n > 0);
  }, [inputVal]);

  const result = useMemo(() => calculateGCF(numbers), [numbers]);
  const resultSummaryText = `Greatest Common Divisor (GCD) of [${numbers.join(', ')}] = ${result.gcf}. Shared common divisors: ${result.commonDivisors.join(', ')}.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Enter Positive Integers (separated by commas or spaces)
            </label>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full px-4 py-3 text-base font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/60 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 focus:outline-none transition-all"
              placeholder="e.g. 48, 72"
            />
            <p className="mt-1.5 text-xs text-slate-400">
              Input 2 or more numbers. Finds the highest integer that divides each without remainder.
            </p>
          </div>

          <div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-2">Quick Presets:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                '48, 72',
                '24, 36, 60',
                '16, 24, 40',
                '100, 150, 250',
                '54, 81'
              ].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setInputVal(p)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-xs transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Divisors List */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2.5">
              All Integer Factors per Number
            </span>
            <div className="space-y-1.5 text-xs font-mono max-h-40 overflow-y-auto pr-1">
              {Object.entries(result.divisors).map(([num, divs]) => (
                <div
                  key={num}
                  className="p-2.5 rounded-lg bg-slate-50/70 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60"
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{num}: </span>
                  <span className="text-slate-600 dark:text-slate-400">{divs.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Result Card */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 lg:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Greatest Common Divisor (GCD / GCF)
            </span>
            <div className="mt-3 text-4xl sm:text-5xl font-black font-mono tracking-tight text-indigo-600 dark:text-indigo-400">
              {result.gcf}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-700/60 text-xs space-y-2 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 font-medium block">
                All Shared Common Factors:
              </span>
              <div className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                {result.commonDivisors.join(', ') || 'None'}
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                {result.steps}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CalculatorHeaderActions
              onReset={() => setInputVal('48, 72')}
              resultSummaryText={resultSummaryText}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
