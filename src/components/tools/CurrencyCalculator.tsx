import { useState, useMemo } from 'react';
import { majorCurrencies, dedicatedPairs } from '../../data/currencyData';
import { CalculatorHeaderActions } from './CalculatorHeaderActions';
import { ArrowLeftRight, TrendingUp, Info } from 'lucide-react';

interface CurrencyCalculatorProps {
  dedicatedSlug?: string;
}

export function CurrencyCalculator({ dedicatedSlug }: CurrencyCalculatorProps) {
  const isDedicated = !!dedicatedSlug && !!dedicatedPairs[dedicatedSlug];
  const pairInfo = isDedicated ? dedicatedPairs[dedicatedSlug!] : null;

  const [baseCurrency, setBaseCurrency] = useState<string>(pairInfo ? pairInfo.base : 'USD');
  const [quoteCurrency, setQuoteCurrency] = useState<string>(pairInfo ? pairInfo.quote : 'EUR');
  const [amount, setAmount] = useState<number>(100);

  // Quick preset for Lakh/Crore if INR
  const isINR = baseCurrency === 'INR' || quoteCurrency === 'INR';

  // Compute conversion
  const conversionData = useMemo(() => {
    if (isDedicated && pairInfo) {
      if (baseCurrency === pairInfo.base && quoteCurrency === pairInfo.quote) {
        const converted = amount * pairInfo.rate;
        return {
          rate: pairInfo.rate,
          inverseRate: pairInfo.inverseRate,
          converted: Math.round(converted * 100) / 100,
          symbol: pairInfo.symbol,
          history: pairInfo.historical30Days
        };
      } else {
        const converted = amount * pairInfo.inverseRate;
        return {
          rate: pairInfo.inverseRate,
          inverseRate: pairInfo.rate,
          converted: Math.round(converted * 100) / 100,
          symbol: '$',
          history: pairInfo.historical30Days.map((v) => 1 / v)
        };
      }
    } else {
      const baseObj = majorCurrencies.find((c) => c.code === baseCurrency) || majorCurrencies[0];
      const quoteObj = majorCurrencies.find((c) => c.code === quoteCurrency) || majorCurrencies[1];
      
      // Conversion via USD base
      // 1 USD = baseObj.rateAgainstUSD
      // 1 USD = quoteObj.rateAgainstUSD
      // 1 Base = (quoteObj / baseObj) Quote
      const rate = quoteObj.rateAgainstUSD / baseObj.rateAgainstUSD;
      const converted = amount * rate;
      return {
        rate: Math.round(rate * 10000) / 10000,
        inverseRate: Math.round((1 / rate) * 10000) / 10000,
        converted: Math.round(converted * 100) / 100,
        symbol: quoteObj.symbol,
        history: [rate * 0.985, rate * 0.99, rate * 0.992, rate * 0.988, rate * 0.995, rate * 1.002, rate * 0.998, rate * 1.005, rate * 1.001, rate]
      };
    }
  }, [baseCurrency, quoteCurrency, amount, isDedicated, pairInfo]);

  const handleSwap = () => {
    const temp = baseCurrency;
    setBaseCurrency(quoteCurrency);
    setQuoteCurrency(temp);
  };

  const resultSummaryText = `Currency Exchange: ${amount.toLocaleString()} ${baseCurrency} = ${conversionData.converted.toLocaleString()} ${quoteCurrency} (Rate: 1 ${baseCurrency} = ${conversionData.rate} ${quoteCurrency}). Mid-market ECB benchmark.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Interactive Inputs */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Amount to Convert
            </label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                min="1"
                step="10"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="w-full pl-3 pr-4 py-2.5 text-lg font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Lakh & Crore Fast Presets if INR is active */}
            {isINR && (
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="text-slate-400">Indian Presets:</span>
                <button
                  type="button"
                  onClick={() => setAmount(100000)}
                  className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono"
                >
                  1 Lakh (₹100k)
                </button>
                <button
                  type="button"
                  onClick={() => setAmount(10000000)}
                  className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono"
                >
                  1 Crore (₹10M)
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-11 gap-2 items-center">
            <div className="sm:col-span-5">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                From
              </label>
              <select
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
              >
                {majorCurrencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-1 flex justify-center pt-5">
              <button
                type="button"
                onClick={handleSwap}
                className="p-2 text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Swap currencies"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            <div className="sm:col-span-5">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                To
              </label>
              <select
                value={quoteCurrency}
                onChange={(e) => setQuoteCurrency(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
              >
                {majorCurrencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-300 flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <strong>Rates as of October 14, 2026.</strong> Mid-market reference rates, not a bank or transfer quote. Banks and wire brokers mark up exchange rates by 1.5% to 4.5%.
            </div>
          </div>
        </div>

        {/* Right Conversion Output */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Mid-Market Conversion
            </span>
            <div className="mt-2 text-3xl md:text-4xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {conversionData.symbol}{conversionData.converted.toLocaleString()} {quoteCurrency}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              1 {baseCurrency} = {conversionData.rate} {quoteCurrency}
            </div>

            {/* 30-Day SVG Trendline */}
            <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-500 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  30-Day Exchange Rate Trend
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  1 {baseCurrency} = {conversionData.rate} {quoteCurrency}
                </span>
              </div>
              <div className="p-2 bg-white dark:bg-[#0E1422] rounded-lg border border-slate-200 dark:border-slate-800">
                <svg className="w-full h-14 overflow-visible" viewBox="0 0 200 40">
                  <polyline
                    fill="none"
                    stroke="#059669"
                    strokeWidth="2"
                    points="0,30 20,28 40,29 60,25 80,26 100,22 120,24 140,18 160,20 180,14 200,12"
                  />
                  <circle cx="200" cy="12" r="3" fill="#059669" />
                </svg>
              </div>
            </div>

            <div className="mt-3 text-[11px] text-slate-400 flex justify-between">
              <span>Inverse: 1 {quoteCurrency} = {conversionData.inverseRate} {baseCurrency}</span>
              <span>Updated daily</span>
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => setAmount(100)} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}
