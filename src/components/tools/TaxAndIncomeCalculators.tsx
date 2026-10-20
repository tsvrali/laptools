import { useState, useMemo } from 'react';
import {
  calculateSelfEmploymentTax,
  calculate1099vsW2,
  calculateFreelanceRate,
  W2ComparisonInput,
  FreelanceRateInput
} from '../../utils/calculatorLogic';
import { CalculatorHeaderActions } from './CalculatorHeaderActions';

// 1. Self-Employment Tax Calculator Component
export function SelfEmploymentTaxCalculator() {
  const [netProfit, setNetProfit] = useState<number>(80000);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');

  const result = useMemo(
    () => calculateSelfEmploymentTax(netProfit, filingStatus),
    [netProfit, filingStatus]
  );

  const resultSummaryText = `2026 Self-Employment Tax: $${netProfit.toLocaleString()} Net 1099 Profit. Total SE Tax: $${result.totalSETax.toLocaleString()} (${result.effectiveSERate}% effective). Social Security: $${result.socialSecurityTax.toLocaleString()}, Medicare: $${result.medicareTax.toLocaleString()}. 50% Above-the-Line Deduction: $${result.deductibleHalf.toLocaleString()}. Recommended Quarterly Set-Aside: $${result.quarterlyEstimatedSetAside.toLocaleString()}/qtr.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Net 1099 Business Profit ($) (Gross Revenue - Expenses)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="5000"
                value={netProfit}
                onChange={(e) => setNetProfit(Number(e.target.value) || 0)}
                className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Filing Status (For Additional 0.9% Medicare Threshold)
            </label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value as any)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="single">Single (Threshold: $200,000)</option>
              <option value="married">Married Filing Jointly (Threshold: $250,000)</option>
            </select>
          </div>

          <div className="p-3.5 rounded-lg bg-purple-50/60 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 text-xs text-purple-900 dark:text-purple-300 space-y-1">
            <span className="font-semibold block">Schedule SE Rules (IRS Code):</span>
            <p>1. Only 92.35% of your net business profit is subject to self-employment tax ($<strong>{result.subjectEarnings.toLocaleString()}</strong>).</p>
            <p>2. Social Security applies 12.4% on earnings up to $176,100 (2026 cap).</p>
            <p>3. Medicare applies 2.9% on all earnings with zero cap.</p>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Total Self-Employment Tax (15.3%)
            </span>
            <div className="mt-2 text-3xl font-bold font-mono text-purple-600 dark:text-purple-400">
              ${result.totalSETax.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              Effective SE Tax Rate: {result.effectiveSERate}%
            </div>

            <div className="mt-5 space-y-2 text-xs border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Social Security (12.4%):</span>
                <span className="font-mono font-medium">${result.socialSecurityTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Medicare (2.9%):</span>
                <span className="font-mono font-medium">${result.medicareTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium pt-1 border-t border-slate-100 dark:border-slate-800">
                <span>50% Above-the-Line Deduction:</span>
                <span className="font-mono font-semibold">${result.deductibleHalf.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-700/60 text-xs">
              <span className="text-slate-500 block mb-1">Recommended Quarterly Set-Aside</span>
              <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                ${result.quarterlyEstimatedSetAside.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">per quarter (covers SE tax + est. income tax)</span>
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => setNetProfit(80000)} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. 1099 vs W-2 Pay Parity Calculator Component
const defaultW2Input: W2ComparisonInput = {
  w2AnnualSalary: 100000,
  employerHealthSubsidyAnnual: 6000,
  employer401kMatchAnnual: 4000,
  paidTimeOffDays: 25,
  businessExpensesAnnual: 5000
};

export function W2Vs1099Calculator() {
  const [input, setInput] = useState<W2ComparisonInput>(defaultW2Input);

  const result = useMemo(() => calculate1099vsW2(input), [input]);

  const resultSummaryText = `1099 vs W-2 Parity: A $${input.w2AnnualSalary.toLocaleString()} W-2 salary ($${result.standardW2Hourly}/hr) requires a 1099 billable rate of $${result.equivalent1099Hourly}/hr (${result.markupMultiplier}x multiplier) and $${result.required1099Gross.toLocaleString()} in gross annual billings to break even after taxes, self-funded health insurance, unpaid PTO, and business overhead.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              W-2 Annual Salary ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
              <input
                type="number"
                inputMode="decimal"
                min="10000"
                step="5000"
                value={input.w2AnnualSalary}
                onChange={(e) => setInput({ ...input, w2AnnualSalary: Number(e.target.value) || 0 })}
                className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Employer Health Subsidy ($/yr)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={input.employerHealthSubsidyAnnual}
                onChange={(e) => setInput({ ...input, employerHealthSubsidyAnnual: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Employer 401(k) Match ($/yr)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={input.employer401kMatchAnnual}
                onChange={(e) => setInput({ ...input, employer401kMatchAnnual: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Paid Time Off + Holidays (Days/yr)
              </label>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                max="60"
                value={input.paidTimeOffDays}
                onChange={(e) => setInput({ ...input, paidTimeOffDays: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Contractor Business Expenses ($/yr)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={input.businessExpensesAnnual}
                onChange={(e) => setInput({ ...input, businessExpensesAnnual: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Required 1099 Equivalent Rate
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold font-mono text-purple-600 dark:text-purple-400">
                ${result.equivalent1099Hourly}
              </span>
              <span className="text-xs text-slate-500">/ hour</span>
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              vs W-2 Baseline: ${result.standardW2Hourly}/hr ({result.markupMultiplier}x multiplier)
            </div>

            <div className="mt-5 space-y-2 text-xs border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Total W-2 Compensation Value:</span>
                <span className="font-mono font-medium">${result.totalW2Compensation.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Required 1099 Gross Billings:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">${result.required1099Gross.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Annual Billable Hours:</span>
                <span className="font-mono">{result.billableHoursPerYear} hrs</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300">
              <strong>Rule of Thumb:</strong> Never transition to 1099 without at least a <strong>45% to 60%</strong> rate premium to absorb self-employment taxes, health insurance, and unpaid sick/vacation time.
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => setInput(defaultW2Input)} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Freelance Rate Calculator Component
const defaultFreelanceInput: FreelanceRateInput = {
  desiredNetIncome: 75000,
  annualBusinessExpenses: 6000,
  taxReservePercent: 28,
  weeksVacationPerYear: 4,
  billableHoursPerWeek: 25
};

export function FreelanceRateCalculator() {
  const [input, setInput] = useState<FreelanceRateInput>(defaultFreelanceInput);

  const result = useMemo(() => calculateFreelanceRate(input), [input]);

  const resultSummaryText = `Freelance Rate: For a $${input.desiredNetIncome.toLocaleString()} net salary with $${input.annualBusinessExpenses.toLocaleString()} expenses and ${input.taxReservePercent}% taxes, you must bill at least $${result.minimumHourlyRate}/hr ($${result.dayRate}/day) across ${result.annualBillableHours} billable hours/yr to generate $${result.targetGrossRevenue.toLocaleString()} gross revenue.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Desired Net Annual Income ($) (Personal Take-Home)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
              <input
                type="number"
                inputMode="decimal"
                min="10000"
                step="5000"
                value={input.desiredNetIncome}
                onChange={(e) => setInput({ ...input, desiredNetIncome: Number(e.target.value) || 0 })}
                className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Annual Business Expenses ($)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={input.annualBusinessExpenses}
                onChange={(e) => setInput({ ...input, annualBusinessExpenses: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Tax Reserve Percentage (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="15"
                  max="45"
                  value={input.taxReservePercent}
                  onChange={(e) => setInput({ ...input, taxReservePercent: Number(e.target.value) || 0 })}
                  className="w-full pl-3 pr-8 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
                />
                <span className="absolute right-3 top-2.5 text-slate-400 text-sm">%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Weeks of Vacation / Off (wks/yr)
              </label>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                max="20"
                value={input.weeksVacationPerYear}
                onChange={(e) => setInput({ ...input, weeksVacationPerYear: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Billable Hours per Week (hrs/wk)
              </label>
              <input
                type="number"
                inputMode="decimal"
                min="5"
                max="45"
                value={input.billableHoursPerWeek}
                onChange={(e) => setInput({ ...input, billableHoursPerWeek: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
              <span className="text-[10px] text-slate-400">Full-time freelancers average 20-28 billable hours.</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Recommended Minimum Hourly Rate
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold font-mono text-purple-600 dark:text-purple-400">
                ${result.minimumHourlyRate}
              </span>
              <span className="text-xs text-slate-500">/ hour</span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-700/60">
                <span className="text-slate-500 block">Day Rate (8 hrs):</span>
                <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">${result.dayRate}</span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-700/60">
                <span className="text-slate-500 block">Monthly Retainer:</span>
                <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">${result.monthlyRetainer.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-700/60 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Target Gross Revenue:</span>
                <span className="font-mono font-semibold">${result.targetGrossRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Annual Billable Hours:</span>
                <span className="font-mono">{result.annualBillableHours} hrs/yr</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => setInput(defaultFreelanceInput)} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}
