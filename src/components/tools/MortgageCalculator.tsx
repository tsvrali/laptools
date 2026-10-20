import { useState, useMemo } from 'react';
import { calculateMortgage, MortgageInput } from '../../utils/calculatorLogic';
import { CalculatorHeaderActions } from './CalculatorHeaderActions';

const defaultInput: MortgageInput = {
  homePrice: 400000,
  downPayment: 80000,
  interestRate: 6.5,
  loanTermYears: 30,
  propertyTaxAnnual: 4200,
  homeInsuranceAnnual: 1200,
  hoaMonthly: 0,
  pmiMonthly: 0,
  extraMonthlyPayment: 0
};

export function MortgageCalculator() {
  const [input, setInput] = useState<MortgageInput>(defaultInput);
  const [showAmortization, setShowAmortization] = useState(false);

  const result = useMemo(() => calculateMortgage(input), [input]);

  const downPaymentPercent = input.homePrice > 0 ? Math.round((input.downPayment / input.homePrice) * 100) : 0;

  const resultSummaryText = `Mortgage Summary: Total Monthly Payment: $${result.totalMonthlyPayment.toLocaleString()} (P&I: $${result.monthlyPrincipalAndInterest.toLocaleString()}, Tax: $${result.monthlyPropertyTax.toLocaleString()}, Insurance: $${result.monthlyInsurance.toLocaleString()}). Total Loan: $${result.totalLoanAmount.toLocaleString()}, Total Interest: $${result.totalInterestPaid.toLocaleString()} over ${result.yearsToPayoff} years.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Panel */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Home Purchase Price ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="10000"
                  step="5000"
                  value={input.homePrice}
                  onChange={(e) => setInput({ ...input, homePrice: Number(e.target.value) || 0 })}
                  className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Down Payment ($ &bull; {downPaymentPercent}%)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="5000"
                  value={input.downPayment}
                  onChange={(e) => setInput({ ...input, downPayment: Number(e.target.value) || 0 })}
                  className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Interest Rate (APR %)
              </label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0.1"
                  max="20"
                  step="0.125"
                  value={input.interestRate}
                  onChange={(e) => setInput({ ...input, interestRate: Number(e.target.value) || 0 })}
                  className="w-full pl-3 pr-8 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2.5 text-slate-400 text-sm">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Loan Term (Years)
              </label>
              <select
                value={input.loanTermYears}
                onChange={(e) => setInput({ ...input, loanTermYears: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 focus:outline-none"
              >
                <option value={30}>30 Years Fixed</option>
                <option value={20}>20 Years Fixed</option>
                <option value={15}>15 Years Fixed</option>
                <option value={10}>10 Years Fixed</option>
              </select>
            </div>
          </div>

          {/* Escrow & Extra Options */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              Taxes, Insurance & Extra Payments (Optional)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Property Tax ($/yr)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="200"
                  value={input.propertyTaxAnnual}
                  onChange={(e) => setInput({ ...input, propertyTaxAnnual: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 text-xs font-mono tabular-nums rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Hazard Insurance ($/yr)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="100"
                  value={input.homeInsuranceAnnual}
                  onChange={(e) => setInput({ ...input, homeInsuranceAnnual: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 text-xs font-mono tabular-nums rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Extra Payment ($/mo)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="50"
                  value={input.extraMonthlyPayment}
                  onChange={(e) => setInput({ ...input, extraMonthlyPayment: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 text-xs font-mono tabular-nums rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400 font-semibold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Results Panel */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 lg:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Estimated Monthly Payment
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                ${result.totalMonthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-slate-500">/ month</span>
            </div>

            {/* Breakdown Stack */}
            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Principal &amp; Interest:</span>
                <span className="font-mono tabular-nums font-semibold">${result.monthlyPrincipalAndInterest.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Property Taxes:</span>
                <span className="font-mono tabular-nums">${result.monthlyPropertyTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Homeowner Insurance:</span>
                <span className="font-mono tabular-nums">${result.monthlyInsurance.toLocaleString()}</span>
              </div>
              {input.extraMonthlyPayment > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Extra Principal Payment:</span>
                  <span className="font-mono tabular-nums">+${input.extraMonthlyPayment.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Key Totals Box */}
            <div className="mt-5 p-3 rounded-lg bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-700/60 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Loan Principal:</span>
                <span className="font-mono tabular-nums font-medium text-slate-800 dark:text-slate-200">${result.totalLoanAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Interest Paid:</span>
                <span className="font-mono tabular-nums font-medium text-slate-800 dark:text-slate-200">${result.totalInterestPaid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Years to Payoff:</span>
                <span className="font-mono tabular-nums font-medium text-slate-800 dark:text-slate-200">{result.yearsToPayoff} yrs</span>
              </div>
              {result.interestSavedWithExtra > 0 && (
                <div className="flex justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Interest Saved with Extra:</span>
                  <span className="font-mono tabular-nums">${result.interestSavedWithExtra.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Loan Balance SVG Trendline */}
            <div className="mt-4">
              <span className="text-[11px] text-slate-400 block mb-1">Amortization Trajectory (Balance over time)</span>
              <svg className="w-full h-16 overflow-visible" viewBox="0 0 300 60">
                <path
                  d={`M 0,10 Q 150,${input.extraMonthlyPayment > 0 ? 45 : 35} 300,55`}
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2.5"
                />
                <circle cx="0" cy="10" r="3.5" fill="#2563EB" />
                <circle cx="300" cy="55" r="3.5" fill="#14B8A6" />
                <text x="5" y="24" fontSize="9" fill="#94A3B8" fontFamily="monospace">${(result.totalLoanAmount/1000).toFixed(0)}k</text>
                <text x="260" y="50" fontSize="9" fill="#14B8A6" fontFamily="monospace">$0</text>
              </svg>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <button
              type="button"
              onClick={() => setShowAmortization(!showAmortization)}
              className="w-full py-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
            >
              {showAmortization ? 'Hide Amortization Schedule' : 'View Full Amortization Schedule'}
            </button>
            <CalculatorHeaderActions onReset={() => setInput(defaultInput)} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>

      {/* Amortization Schedule Drawer */}
      {showAmortization && (
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
            Annual Loan Balance &amp; Cumulative Interest Breakdown
          </h4>
          <div className="max-h-64 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-900 sticky top-0 text-slate-500">
                <tr>
                  <th className="px-3 py-2">Year</th>
                  <th className="px-3 py-2">Ending Balance</th>
                  <th className="px-3 py-2">Principal Paid</th>
                  <th className="px-3 py-2">Interest Paid to Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono tabular-nums text-slate-700 dark:text-slate-300">
                {result.amortizationSummary.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="px-3 py-1.5 font-sans">Year {row.year}</td>
                    <td className="px-3 py-1.5 font-semibold">${row.balance.toLocaleString()}</td>
                    <td className="px-3 py-1.5">${row.principalPaidToDate.toLocaleString()}</td>
                    <td className="px-3 py-1.5 text-slate-500">${row.interestPaidToDate.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
