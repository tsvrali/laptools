import { useState, useMemo } from 'react';
import { calculateDebtStrategy, DebtItem } from '../../utils/calculatorLogic';
import { CalculatorHeaderActions } from './CalculatorHeaderActions';
import { Plus, Trash2, ArrowRight } from 'lucide-react';

interface DebtStrategyCalculatorProps {
  initialStrategy?: 'avalanche' | 'snowball';
  onNavigate?: (path: string) => void;
}

const sampleDebts: DebtItem[] = [
  { id: '1', name: 'Store Credit Card', balance: 1500, rate: 26.99, minPayment: 45 },
  { id: '2', name: 'Visa Platinum Card', balance: 4500, rate: 21.50, minPayment: 110 },
  { id: '3', name: 'Personal Consolidation Loan', balance: 8000, rate: 12.00, minPayment: 190 }
];

export function DebtStrategyCalculator({ initialStrategy = 'avalanche', onNavigate }: DebtStrategyCalculatorProps) {
  const [strategy, setStrategy] = useState<'avalanche' | 'snowball'>(initialStrategy);
  const [debts, setDebts] = useState<DebtItem[]>(sampleDebts);
  const [extraPayment, setExtraPayment] = useState<number>(200);

  const avalancheResult = useMemo(() => calculateDebtStrategy(debts, extraPayment, 'avalanche'), [debts, extraPayment]);
  const snowballResult = useMemo(() => calculateDebtStrategy(debts, extraPayment, 'snowball'), [debts, extraPayment]);

  const activeResult = strategy === 'avalanche' ? avalancheResult : snowballResult;
  const totalBalance = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalMinPayment = debts.reduce((sum, d) => sum + d.minPayment, 0);

  const addDebt = () => {
    const newDebt: DebtItem = {
      id: Date.now().toString(),
      name: `Debt #${debts.length + 1}`,
      balance: 2000,
      rate: 18.0,
      minPayment: 60
    };
    setDebts([...debts, newDebt]);
  };

  const removeDebt = (id: string) => {
    if (debts.length > 1) {
      setDebts(debts.filter((d) => d.id !== id));
    }
  };

  const updateDebt = (id: string, field: keyof DebtItem, value: any) => {
    setDebts(debts.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const resultSummaryText = `${strategy === 'avalanche' ? 'Debt Avalanche' : 'Debt Snowball'} Payoff: ${debts.length} debts totaling $${totalBalance.toLocaleString()}. With $${extraPayment}/mo extra ($${totalMinPayment + extraPayment}/mo total), you will be completely debt-free in ${activeResult.totalMonths} months (${Math.round(activeResult.totalMonths/12 * 10)/10} yrs) paying $${activeResult.totalInterestPaid.toLocaleString()} in interest.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      {/* Strategy Toggle Tab */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Payoff Ordering Methodology
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {strategy === 'avalanche' ? 'Highest interest rate first (Mathematically optimal)' : 'Smallest dollar balance first (Psychological quick wins)'}
          </p>
        </div>

        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
          <button
            type="button"
            onClick={() => setStrategy('avalanche')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              strategy === 'avalanche'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Debt Avalanche (Lowest Interest)
          </button>
          <button
            type="button"
            onClick={() => setStrategy('snowball')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              strategy === 'snowball'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Debt Snowball (Fastest Wins)
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Debt Input Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Your Current Debts &amp; Loans ({debts.length})
            </h4>
            <button
              type="button"
              onClick={addDebt}
              className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Debt</span>
            </button>
          </div>

          <div className="space-y-3">
            {debts.map((debt, idx) => (
              <div
                key={debt.id}
                className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 grid grid-cols-12 gap-2.5 items-center text-xs"
              >
                <div className="col-span-12 sm:col-span-4">
                  <label className="text-[10px] text-slate-400 block mb-0.5">Debt Name</label>
                  <input
                    type="text"
                    value={debt.name}
                    onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
                  />
                </div>

                <div className="col-span-4 sm:col-span-3">
                  <label className="text-[10px] text-slate-400 block mb-0.5">Balance ($)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={debt.balance}
                    onChange={(e) => updateDebt(debt.id, 'balance', Number(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono tabular-nums text-xs"
                  />
                </div>

                <div className="col-span-3 sm:col-span-2">
                  <label className="text-[10px] text-slate-400 block mb-0.5">APR (%)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    value={debt.rate}
                    onChange={(e) => updateDebt(debt.id, 'rate', Number(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono tabular-nums text-xs"
                  />
                </div>

                <div className="col-span-4 sm:col-span-2">
                  <label className="text-[10px] text-slate-400 block mb-0.5">Min Pay ($)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={debt.minPayment}
                    onChange={(e) => updateDebt(debt.id, 'minPayment', Number(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono tabular-nums text-xs"
                  />
                </div>

                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeDebt(debt.id)}
                    disabled={debts.length <= 1}
                    className="p-1 text-slate-400 hover:text-rose-500 disabled:opacity-30"
                    title="Remove this debt"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Extra Monthly Payment Allocated to Debt Rollover ($)
            </label>
            <div className="relative max-w-xs">
              <span className="absolute left-3 top-2 text-slate-400 text-xs">$</span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="25"
                value={extraPayment}
                onChange={(e) => setExtraPayment(Number(e.target.value) || 0)}
                className="w-full pl-7 pr-3 py-1.5 text-xs font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400 font-semibold"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Combined Monthly Budget: ${(totalMinPayment + extraPayment).toLocaleString()} (${totalMinPayment.toLocaleString()} minimums + ${extraPayment.toLocaleString()} extra).
            </p>
          </div>
        </div>

        {/* Right: Results & Elimination Timeline */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Freedom Timeline
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {activeResult.totalMonths} months
              </span>
            </div>

            <div className="mt-2 text-3xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              {Math.floor(activeResult.totalMonths / 12)} yrs {activeResult.totalMonths % 12} mos
            </div>

            <div className="mt-4 p-3 rounded-lg bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-700/60 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Starting Debt Balance:</span>
                <span className="font-mono font-medium">${totalBalance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Interest to Pay:</span>
                <span className="font-mono font-medium text-slate-900 dark:text-white">${activeResult.totalInterestPaid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Capital Paid:</span>
                <span className="font-mono font-medium">${activeResult.totalPaid.toLocaleString()}</span>
              </div>
            </div>

            {/* Side-by-side strategy comparison banner */}
            <div className="mt-4 p-3 rounded-lg bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs">
              <div className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                Strategy Comparison:
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                <div>
                  <span className="text-slate-400 block">Avalanche:</span>
                  <span className="font-mono font-semibold">{avalancheResult.totalMonths} mos (${avalancheResult.totalInterestPaid.toLocaleString()} int)</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Snowball:</span>
                  <span className="font-mono font-semibold">{snowballResult.totalMonths} mos (${snowballResult.totalInterestPaid.toLocaleString()} int)</span>
                </div>
              </div>
              {snowballResult.totalInterestPaid > avalancheResult.totalInterestPaid && (
                <div className="mt-2 text-[11px] text-slate-500">
                  Avalanche saves <strong>${(snowballResult.totalInterestPaid - avalancheResult.totalInterestPaid).toLocaleString()}</strong> in interest over Snowball.
                </div>
              )}
            </div>

            {/* Payoff Order Milestones */}
            <div className="mt-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Projected Payoff Sequence
              </span>
              <div className="space-y-1.5 text-xs">
                {activeResult.payoffOrder.map((item, i) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-2 rounded bg-white dark:bg-[#0E1422] border border-slate-100 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center text-[10px] font-bold">
                        {i + 1}
                      </span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{item.name}</span>
                    </div>
                    <span className="font-mono text-slate-500">Month {item.payoffMonth}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => setDebts(sampleDebts)} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}
