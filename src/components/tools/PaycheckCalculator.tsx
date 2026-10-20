import { useState, useMemo } from 'react';
import { calculateTakeHomePay, PaycheckInput } from '../../utils/calculatorLogic';
import { stateTaxRates } from '../../data/taxData2026';
import { CalculatorHeaderActions } from './CalculatorHeaderActions';

const defaultInput: PaycheckInput = {
  grossPayAnnual: 75000,
  filingStatus: 'single',
  payFrequency: 'bi-weekly',
  stateEffectiveRate: 0.045,
  preTaxDeductionsAnnual: 3000, // 401k or health insurance
  postTaxDeductionsAnnual: 0
};

export function PaycheckCalculator() {
  const [input, setInput] = useState<PaycheckInput>(defaultInput);
  const [wageMode, setWageMode] = useState<'salary' | 'hourly'>('salary');
  const [hourlyRate, setHourlyRate] = useState<number>(36.06); // ~$75k @ 2080 hrs
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);

  const handleHourlyChange = (rate: number, hours: number) => {
    setHourlyRate(rate);
    setHoursPerWeek(hours);
    const annual = rate * hours * 52;
    setInput({ ...input, grossPayAnnual: Math.round(annual) });
  };

  const result = useMemo(() => calculateTakeHomePay(input), [input]);

  const resultSummaryText = `2026 Take-Home Paycheck: $${input.grossPayAnnual.toLocaleString()} Annual Gross (${input.payFrequency}). Net Pay: $${result.netPayPerPeriod.toLocaleString()} per paycheck ($${result.netTakeHomeAnnual.toLocaleString()}/yr). Deductions: Federal Tax $${result.federalTaxPerPeriod}, State Tax $${result.stateTaxPerPeriod}, Social Security $${result.socialSecurityPerPeriod}, Medicare $${result.medicarePerPeriod}. Effective Tax Rate: ${result.effectiveTaxRate}%.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-4">
          {/* Salary vs Hourly Toggle */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg max-w-xs">
            <button
              type="button"
              onClick={() => setWageMode('salary')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                wageMode === 'salary'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Annual Salary
            </button>
            <button
              type="button"
              onClick={() => {
                setWageMode('hourly');
                handleHourlyChange(hourlyRate, hoursPerWeek);
              }}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                wageMode === 'hourly'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Hourly Wage
            </button>
          </div>

          {wageMode === 'salary' ? (
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Gross Annual Salary ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="5000"
                  step="2500"
                  value={input.grossPayAnnual}
                  onChange={(e) => setInput({ ...input, grossPayAnnual: Number(e.target.value) || 0 })}
                  className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Hourly Wage ($/hr)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.5"
                    value={hourlyRate}
                    onChange={(e) => handleHourlyChange(Number(e.target.value) || 0, hoursPerWeek)}
                    className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Hours per Week
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={hoursPerWeek}
                  onChange={(e) => handleHourlyChange(hourlyRate, Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Paycheck Frequency
              </label>
              <select
                value={input.payFrequency}
                onChange={(e) => setInput({ ...input, payFrequency: e.target.value as any })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 focus:outline-none"
              >
                <option value="weekly">Weekly (52 paychecks/yr)</option>
                <option value="bi-weekly">Bi-Weekly (26 paychecks/yr)</option>
                <option value="semi-monthly">Semi-Monthly (24 paychecks/yr)</option>
                <option value="monthly">Monthly (12 paychecks/yr)</option>
                <option value="annually">Annually (1 pay period)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Federal Tax Filing Status
              </label>
              <select
                value={input.filingStatus}
                onChange={(e) => setInput({ ...input, filingStatus: e.target.value as any })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 focus:outline-none"
              >
                <option value="single">Single (Std Deduction: $15,000)</option>
                <option value="married">Married Filing Jointly ($30,000)</option>
                <option value="headOfHousehold">Head of Household ($22,500)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                State Income Tax Rate
              </label>
              <select
                value={input.stateEffectiveRate}
                onChange={(e) => setInput({ ...input, stateEffectiveRate: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 focus:outline-none"
              >
                {stateTaxRates.map((s) => (
                  <option key={s.code} value={s.effectiveRate}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Pre-Tax Deductions (401k, Health) ($/yr)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="500"
                  value={input.preTaxDeductionsAnnual}
                  onChange={(e) => setInput({ ...input, preTaxDeductionsAnnual: Number(e.target.value) || 0 })}
                  className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Results Panel */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 lg:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Estimated Net Take-Home Pay
            </span>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                ${result.netPayPerPeriod.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-slate-500">/ paycheck</span>
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              ${result.netTakeHomeAnnual.toLocaleString()} / year take-home
            </div>

            {/* Deductions Breakdown */}
            <div className="mt-5 space-y-2 text-xs border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Gross Pay per Paycheck:</span>
                <span className="font-mono font-semibold">${result.grossPayPerPeriod.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Federal Income Tax:</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-${result.federalTaxPerPeriod.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Social Security (6.2% FICA):</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-${result.socialSecurityPerPeriod.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Medicare (1.45% FICA):</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-${result.medicarePerPeriod.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>State Income Tax:</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-${result.stateTaxPerPeriod.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-700/60 text-xs flex justify-between items-center">
              <div>
                <span className="text-slate-500 block">Total Annual Taxes</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">${result.totalTaxAnnual.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">Effective Tax Rate</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{result.effectiveTaxRate}%</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => setInput(defaultInput)} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}
