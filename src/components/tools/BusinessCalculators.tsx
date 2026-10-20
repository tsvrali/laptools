import { useState, useMemo } from 'react';
import {
  calculateEbayFees,
  calculatePaymentProcessing,
  calculateBreakEven,
  calculateMarkupMargin,
  calculateProfitMargins,
  EbayInput
} from '../../utils/calculatorLogic';
import { ebayCategoryFees, stripeFeeTiers, paypalFeeTiers } from '../../data/feeSchedules';
import { CalculatorHeaderActions } from './CalculatorHeaderActions';

// 1. eBay Fee Calculator
const defaultEbayInput: EbayInput = {
  itemPrice: 65,
  shippingChargedToBuyer: 8,
  itemCost: 22,
  shippingCostToSeller: 6.5,
  categoryStandardPercent: 13.25,
  isStoreSubscriber: false,
  storePercent: 12.35,
  promotedListingPercent: 0
};

export function EbayFeeCalculator() {
  const [input, setInput] = useState<EbayInput>(defaultEbayInput);
  const [selectedCategory, setSelectedCategory] = useState<string>('most_categories');

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    const cat = ebayCategoryFees.find((c) => c.id === catId);
    if (cat) {
      setInput({
        ...input,
        categoryStandardPercent: cat.standardPercent,
        storePercent: cat.storePercent
      });
    }
  };

  const result = useMemo(() => calculateEbayFees(input), [input]);

  const resultSummaryText = `US eBay Fee Summary: Sold for $${input.itemPrice} + $${input.shippingChargedToBuyer} shipping ($${result.totalBuyerPaid} total). eBay Fees: $${result.totalEbayFee} (${result.effectiveFeeRate}%). Net Profit: $${result.netProfit} (${result.profitMarginPercent}% margin). Break-even Price: $${result.breakEvenPrice}.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Item Sold Price ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  step="1"
                  value={input.itemPrice}
                  onChange={(e) => setInput({ ...input, itemPrice: Number(e.target.value) || 0 })}
                  className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Shipping Charged to Buyer ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.5"
                  value={input.shippingChargedToBuyer}
                  onChange={(e) => setInput({ ...input, shippingChargedToBuyer: Number(e.target.value) || 0 })}
                  className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Item Wholesale Cost (COGS) ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  step="1"
                  value={input.itemCost}
                  onChange={(e) => setInput({ ...input, itemCost: Number(e.target.value) || 0 })}
                  className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Actual Shipping Label Cost ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.5"
                  value={input.shippingCostToSeller}
                  onChange={(e) => setInput({ ...input, shippingCostToSeller: Number(e.target.value) || 0 })}
                  className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              eBay Category (Final Value Fee Rate)
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              {ebayCategoryFees.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({input.isStoreSubscriber ? cat.storePercent : cat.standardPercent}%)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="ebay-store"
                checked={input.isStoreSubscriber}
                onChange={(e) => setInput({ ...input, isStoreSubscriber: e.target.checked })}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <label htmlFor="ebay-store" className="text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                eBay Store Subscriber (Discounted Fee)
              </label>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Promoted Listings Ad Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="25"
                  step="0.5"
                  value={input.promotedListingPercent}
                  onChange={(e) => setInput({ ...input, promotedListingPercent: Number(e.target.value) || 0 })}
                  className="w-full pl-3 pr-8 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
                />
                <span className="absolute right-3 top-2.5 text-slate-400 text-sm">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Net Profit in Pocket
            </span>
            <div className="mt-2 text-3xl md:text-4xl font-bold font-mono text-teal-600 dark:text-teal-400">
              ${result.netProfit}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              Margin: {result.profitMarginPercent}% &bull; ROI: {result.roiPercent}%
            </div>

            <div className="mt-5 space-y-2 text-xs border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Total Buyer Paid:</span>
                <span className="font-mono font-medium">${result.totalBuyerPaid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Total eBay Platform Fees:</span>
                <span className="font-mono text-rose-600 dark:text-rose-400 font-semibold">-${result.totalEbayFee} ({result.effectiveFeeRate}%)</span>
              </div>
              <div className="flex justify-between pl-2 text-slate-500">
                <span>&bull; Final Value Fee:</span>
                <span className="font-mono">${result.finalValueFee}</span>
              </div>
              {input.promotedListingPercent > 0 && (
                <div className="flex justify-between pl-2 text-slate-500">
                  <span>&bull; Promoted Listing Ad:</span>
                  <span className="font-mono">${result.promotedFee}</span>
                </div>
              )}
            </div>

            <div className="mt-4 p-3 rounded-lg bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-700/60 text-xs flex justify-between items-center">
              <div>
                <span className="text-slate-500 block">Break-Even Sale Price</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">${result.breakEvenPrice}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">Fixed Per-Order Fee</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">${result.totalBuyerPaid <= 10 ? '0.30' : '0.40'}</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => setInput(defaultEbayInput)} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Stripe & PayPal Processor Fee Component
interface ProcessorFeeCalculatorProps {
  platform: 'stripe' | 'paypal';
}

export function ProcessorFeeCalculator({ platform }: ProcessorFeeCalculatorProps) {
  const [mode, setMode] = useState<'forward' | 'reverse'>('reverse');
  const [amount, setAmount] = useState<number>(1000);
  const tiers = platform === 'stripe' ? stripeFeeTiers : paypalFeeTiers;
  const [selectedTierId, setSelectedTierId] = useState<string>(tiers[0].id);

  const activeTier = tiers.find((t) => t.id === selectedTierId) || tiers[0];
  const result = useMemo(
    () => calculatePaymentProcessing(amount, activeTier.percent, activeTier.fixed, mode === 'reverse'),
    [amount, activeTier, mode]
  );

  const brandName = platform === 'stripe' ? 'Stripe' : 'PayPal';
  const resultSummaryText = `${brandName} Processing: To clear $${amount} net via ${activeTier.name}, charge $${result.chargeAmount} ($${result.fee} in fees).`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg max-w-xs mb-6">
        <button
          type="button"
          onClick={() => setMode('reverse')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
            mode === 'reverse'
              ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Reverse (I want to receive...)
        </button>
        <button
          type="button"
          onClick={() => setMode('forward')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
            mode === 'forward'
              ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Forward (Deduct fee...)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {mode === 'reverse' ? 'Target Amount You Want to Receive ($)' : 'Gross Invoice Charge Amount ($)'}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
              <input
                type="number"
                inputMode="decimal"
                step="25"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {brandName} Processing Fee Tier
            </label>
            <select
              value={selectedTierId}
              onChange={(e) => setSelectedTierId(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              {tiers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="p-3.5 rounded-lg bg-teal-50/60 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 text-xs text-teal-900 dark:text-teal-300">
            <strong>Why reverse math matters:</strong> You cannot simply add {activeTier.percent}% to your bill. Because {brandName} deducts {activeTier.percent}% from the whole elevated total, you must use the algebraic formula: <span className="font-mono">Charge = (Target + ${activeTier.fixed}) / (1 - {activeTier.percent/100})</span>.
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              {mode === 'reverse' ? 'Amount to Bill Customer' : 'Net Payout Received'}
            </span>
            <div className="mt-2 text-3xl md:text-4xl font-bold font-mono text-teal-600 dark:text-teal-400">
              ${mode === 'reverse' ? result.chargeAmount : result.netPayout}
            </div>

            <div className="mt-5 space-y-2 text-xs border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Total Billed:</span>
                <span className="font-mono font-medium">${result.chargeAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">{brandName} Processing Fee:</span>
                <span className="font-mono text-rose-600 dark:text-rose-400 font-semibold">-${result.fee}</span>
              </div>
              <div className="flex justify-between text-slate-800 dark:text-slate-200 font-medium pt-1 border-t border-slate-100 dark:border-slate-800">
                <span>Net Bank Deposit:</span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">${result.netPayout}</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => setAmount(1000)} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Break-Even Calculator
export function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState<number>(10000);
  const [price, setPrice] = useState<number>(45);
  const [variableCost, setVariableCost] = useState<number>(18);
  const [expectedUnits, setExpectedUnits] = useState<number>(500);

  const result = useMemo(
    () => calculateBreakEven(fixedCosts, price, variableCost, expectedUnits),
    [fixedCosts, price, variableCost, expectedUnits]
  );

  const resultSummaryText = `Break-Even Analysis: Fixed Costs $${fixedCosts.toLocaleString()}, Price $${price}, Variable Cost $${variableCost}. Unit Contribution Margin: $${result.contributionMargin} (${result.contributionMarginRatio}%). Break-Even: ${result.breakEvenUnits.toLocaleString()} units ($${result.breakEvenRevenue.toLocaleString()} revenue). Margin of Safety: ${result.marginOfSafetyPercent}%.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Total Fixed Operating Costs ($/mo)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  step="500"
                  value={fixedCosts}
                  onChange={(e) => setFixedCosts(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Selling Price per Unit ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  step="1"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Variable Cost per Unit ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  step="1"
                  value={variableCost}
                  onChange={(e) => setVariableCost(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Expected Monthly Sales Volume (Units)
              </label>
              <input
                type="number"
                inputMode="decimal"
                step="50"
                value={expectedUnits}
                onChange={(e) => setExpectedUnits(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
          </div>

          {/* SVG Cost vs Revenue Crossover Chart */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">
              Visual Break-Even Crossover (Revenue vs Total Cost)
            </span>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-100 dark:border-slate-800">
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 400 90">
                {/* Fixed Costs Baseline */}
                <line x1="30" y1="65" x2="380" y2="65" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
                <text x="35" y="60" fontSize="9" fill="#94A3B8" fontFamily="monospace">Fixed: ${fixedCosts.toLocaleString()}</text>
                
                {/* Total Cost Line (Fixed + Variable) */}
                <line x1="30" y1="65" x2="380" y2="25" stroke="#E11D48" strokeWidth="2" />
                <text x="320" y="22" fontSize="9" fill="#E11D48" fontFamily="monospace">Total Cost</text>

                {/* Revenue Line */}
                <line x1="30" y1="85" x2="380" y2="10" stroke="#0D9488" strokeWidth="2.5" />
                <text x="330" y="8" fontSize="9" fill="#0D9488" fontFamily="monospace">Revenue</text>

                {/* Crossover Dot */}
                <circle cx="210" cy="45" r="4.5" fill="#2563EB" />
                <text x="180" y="40" fontSize="10" fill="#2563EB" fontWeight="bold" fontFamily="monospace">Break-Even ({result.breakEvenUnits} units)</text>
              </svg>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Units to Break Even
            </span>
            <div className="mt-2 text-3xl md:text-4xl font-bold font-mono text-teal-600 dark:text-teal-400">
              {result.breakEvenUnits.toLocaleString()} units
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              Break-Even Sales Revenue: ${result.breakEvenRevenue.toLocaleString()}
            </div>

            <div className="mt-5 space-y-2 text-xs border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Unit Contribution Margin:</span>
                <span className="font-mono font-medium">${result.contributionMargin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Contribution Margin Ratio:</span>
                <span className="font-mono">{result.contributionMarginRatio}%</span>
              </div>
              {expectedUnits > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span>Margin of Safety:</span>
                  <span className="font-mono font-semibold">{result.marginOfSafetyUnits} units ({result.marginOfSafetyPercent}%)</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => { setFixedCosts(10000); setPrice(45); setVariableCost(18); }} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Markup vs Margin Calculator
export function MarkupMarginCalculator() {
  const [cost, setCost] = useState<number>(50);
  const [mode, setMode] = useState<'markup' | 'margin'>('margin');
  const [percentageValue, setPercentageValue] = useState<number>(40);

  const result = useMemo(
    () => calculateMarkupMargin(cost, percentageValue, mode),
    [cost, percentageValue, mode]
  );

  const resultSummaryText = `Markup vs Margin: Cost $${cost}. A ${percentageValue}% ${mode} yields Selling Price: $${result.price}, Profit: $${result.profit} (${result.marginPercent}% Margin / ${result.markupPercent}% Markup).`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Wholesale Product Cost ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
              <input
                type="number"
                inputMode="decimal"
                step="5"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value) || 0)}
                className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Pricing Method
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              >
                <option value="margin">Target Profit Margin (%)</option>
                <option value="markup">Target Markup on Cost (%)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Target {mode === 'margin' ? 'Margin' : 'Markup'} (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0.1"
                  max={mode === 'margin' ? '99.9' : '1000'}
                  step="5"
                  value={percentageValue}
                  onChange={(e) => setPercentageValue(Number(e.target.value) || 0)}
                  className="w-full pl-3 pr-8 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
                />
                <span className="absolute right-3 top-2.5 text-slate-400 text-sm">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Recommended Selling Price
            </span>
            <div className="mt-2 text-3xl md:text-4xl font-bold font-mono text-teal-600 dark:text-teal-400">
              ${result.price}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              Dollar Profit: ${result.profit} per unit
            </div>

            <div className="mt-5 space-y-2 text-xs border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Profit Margin:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{result.marginPercent}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Cost Markup:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{result.markupPercent}%</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => { setCost(50); setPercentageValue(40); }} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Profit Margin Calculator
export function ProfitMarginCalculator() {
  const [revenue, setRevenue] = useState<number>(250000);
  const [cogs, setCogs] = useState<number>(100000);
  const [opex, setOpex] = useState<number>(75000);
  const [taxes, setTaxes] = useState<number>(15000);

  const result = useMemo(
    () => calculateProfitMargins(revenue, cogs, opex, taxes),
    [revenue, cogs, opex, taxes]
  );

  const resultSummaryText = `Profit Margin Hierarchy: Revenue $${revenue.toLocaleString()}. Gross Profit: $${result.grossProfit.toLocaleString()} (${result.grossMarginPercent}%). Operating Profit: $${result.operatingProfit.toLocaleString()} (${result.operatingMarginPercent}%). Net Profit: $${result.netProfit.toLocaleString()} (${result.netMarginPercent}%).`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Total Revenue ($)
              </label>
              <input
                type="number"
                inputMode="decimal"
                step="5000"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Cost of Goods Sold (COGS) ($)
              </label>
              <input
                type="number"
                inputMode="decimal"
                step="5000"
                value={cogs}
                onChange={(e) => setCogs(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Operating Expenses (OPEX) ($)
              </label>
              <input
                type="number"
                inputMode="decimal"
                step="2500"
                value={opex}
                onChange={(e) => setOpex(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Taxes &amp; Interest ($)
              </label>
              <input
                type="number"
                inputMode="decimal"
                step="1000"
                value={taxes}
                onChange={(e) => setTaxes(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Net Profit Margin
            </span>
            <div className="mt-2 text-3xl md:text-4xl font-bold font-mono text-teal-600 dark:text-teal-400">
              {result.netMarginPercent}%
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              Net Dollar Income: ${result.netProfit.toLocaleString()}
            </div>

            <div className="mt-5 space-y-2 text-xs border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Gross Margin:</span>
                <span className="font-mono font-semibold">{result.grossMarginPercent}% (${result.grossProfit.toLocaleString()})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Operating Margin (EBIT):</span>
                <span className="font-mono font-semibold">{result.operatingMarginPercent}% (${result.operatingProfit.toLocaleString()})</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => { setRevenue(250000); setCogs(100000); setOpex(75000); setTaxes(15000); }} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}
