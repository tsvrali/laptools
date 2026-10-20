import { useState, useMemo } from 'react';
import { calculateLCM } from '../../utils/calculatorLogic';
import { CalculatorHeaderActions } from './CalculatorHeaderActions';
import { Layers, Sparkles } from 'lucide-react';

export function LeastCommonMultipleCalculator() {
  const [inputVal, setInputVal] = useState<string>('12, 18, 24');

  const numbers = useMemo(() => {
    return inputVal
      .split(/[\s,]+/)
      .map((s) => parseFloat(s))
      .filter((n) => !isNaN(n) && n > 0);
  }, [inputVal]);

  const result = useMemo(() => calculateLCM(numbers), [numbers]);
  const resultSummaryText = `Least Common Multiple (LCM) of [${numbers.join(', ')}] = ${result.lcm}.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input Section */}
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
              placeholder="e.g. 12, 18, 24"
            />
            <p className="mt-1.5 text-xs text-slate-400">
              Input 2 or more positive integers. Negative numbers and decimals will be converted to positive integers.
            </p>
          </div>

          <div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-2">Quick Presets:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                '12, 18, 24',
                '8, 14, 20',
                '15, 25, 30',
                '9, 12, 15, 18',
                '16, 24, 40'
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

          {/* Prime Factorization Breakdown */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              Prime Factorization Breakdown
            </span>
            <div className="space-y-1.5 text-xs font-mono">
              {Object.entries(result.primeFactors).map(([num, factors]) => (
                <div
                  key={num}
                  className="flex justify-between py-2 px-3 rounded-lg bg-slate-50/70 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60"
                >
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{num} =</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">{factors}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Result Card */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 lg:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Least Common Multiple (LCM)
            </span>
            <div className="mt-3 text-4xl sm:text-5xl font-black font-mono tracking-tight text-indigo-600 dark:text-indigo-400">
              {result.lcm}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
              The smallest positive integer that is divisible by all {result.count} numbers in your set without remainder.
            </p>

            <div className="mt-6 p-4 rounded-xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-700/60 text-xs space-y-1.5 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 font-medium block">Evaluation Steps:</span>
              <div className="font-mono text-slate-700 dark:text-slate-300 leading-relaxed">
                {result.steps}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CalculatorHeaderActions
              onReset={() => setInputVal('12, 18, 24')}
              resultSummaryText={resultSummaryText}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
