import { useState, useMemo } from 'react';
import { calculateCreditCardPayoff, CreditCardInput } from '../../utils/calculatorLogic';
import { CalculatorHeaderActions } from './CalculatorHeaderActions';
import { AlertCircle, TrendingDown } from 'lucide-react';

const defaultInput: CreditCardInput = {
  balance: 6000,
  apr: 24.99,
  fixedMonthlyPayment: 250,
  minimumPaymentPercent: 2.5
};

export function CreditCardPayoffCalculator() {
  const [input, setInput] = useState<CreditCardInput>(defaultInput);

  const result = useMemo(() => calculateCreditCardPayoff(input), [input]);

  const resultSummaryText = `Credit Card Payoff: Balance $${input.balance.toLocaleString()} at ${input.apr}% APR. Fixed $${input.fixedMonthlyPayment}/mo clears debt in ${result.monthsToPayoffFixed} months ($${result.totalInterestFixed.toLocaleString()} interest). Compared to minimum payments, you save $${result.interestSaved.toLocaleString()} in interest and escape debt ${Math.round(result.timeSavedMonths/12 * 10)/10} years faster!`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Current Credit Card Balance ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
              <input
                type="number"
                inputMode="decimal"
                min="100"
                step="250"
                value={input.balance}
                onChange={(e) => setInput({ ...input, balance: Number(e.target.value) || 0 })}
                className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Annual Percentage Rate (APR %)
            </label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                min="0.9"
                max="39.99"
                step="0.1"
                value={input.apr}
                onChange={(e) => setInput({ ...input, apr: Number(e.target.value) || 0 })}
                className="w-full pl-3 pr-8 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 focus:outline-none"
              />
              <span className="absolute right-3 top-2.5 text-slate-400 text-sm">%</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Average US credit card APR is approximately 22% - 25%.</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Planned Fixed Monthly Payment ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
              <input
                type="number"
                inputMode="decimal"
                min="10"
                step="25"
                value={input.fixedMonthlyPayment}
                onChange={(e) => setInput({ ...input, fixedMonthlyPayment: Number(e.target.value) || 0 })}
                className={`w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border bg-slate-50/50 dark:bg-slate-900/50 focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 focus:outline-none ${
                  result.isPaymentTooLow ? 'border-rose-400 text-rose-600' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
            </div>

            {/* Warning if payment is below interest */}
            {result.isPaymentTooLow && (
              <div className="mt-2 p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-2 text-xs text-rose-700 dark:text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Payment too low!</strong> Your monthly payment (${input.fixedMonthlyPayment}) does not cover the initial monthly interest charge (${Math.round(input.balance * (input.apr / 100) / 12)}). You must pay at least <strong>${result.minRecommendedPayment}/mo</strong> to ever pay off this card.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Comparison Box */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 lg:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Payoff Strategy Comparison
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" />
                Save ${result.interestSaved.toLocaleString()}
              </span>
            </div>

            {/* Side-by-Side Comparison Cards */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {/* Fixed Strategy */}
              <div className="p-3.5 rounded-lg bg-white dark:bg-[#0E1422] border-2 border-blue-500/40 dark:border-blue-500/30">
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 block mb-1">
                  Fixed ${input.fixedMonthlyPayment}/mo
                </span>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                  {result.isPaymentTooLow ? 'Never' : `${result.monthsToPayoffFixed} mos`}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  ({Math.round((result.monthsToPayoffFixed / 12) * 10) / 10} years)
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="text-slate-500">Total Interest:</div>
                  <div className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                    ${result.totalInterestFixed.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Minimum Strategy */}
              <div className="p-3.5 rounded-lg bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-700/60 opacity-90">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Minimum Payments
                </span>
                <div className="text-xl font-bold font-mono text-slate-700 dark:text-slate-300">
                  {result.monthsToPayoffMin} mos
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  ({Math.round((result.monthsToPayoffMin / 12) * 10) / 10} years)
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="text-slate-500">Total Interest:</div>
                  <div className="font-mono font-semibold text-rose-600 dark:text-rose-400">
                    ${result.totalInterestMin.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Callout */}
            {!result.isPaymentTooLow && (
              <div className="mt-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-800 dark:text-emerald-300">
                <strong>Why fixed payments win:</strong> By maintaining a steady ${input.fixedMonthlyPayment}/mo payment, you avoid the minimum payment trap, save <strong>${result.interestSaved.toLocaleString()}</strong> in compounding interest, and eliminate this balance <strong>{Math.round(result.timeSavedMonths / 12 * 10) / 10} years</strong> sooner.
              </div>
            )}
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => setInput(defaultInput)} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}
