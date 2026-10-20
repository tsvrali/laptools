import { useState, useMemo } from 'react';
import {
  calculateLCM,
  calculateGCF,
  calculateMean,
  calculateComplexNumber,
  calculateAspectRatio,
  solveRatioProportion,
  simplifyRatioTerms,
  calculateFractions,
  convertDecimalToFraction,
  evaluateScientificExpression
} from '../../utils/calculatorLogic';
import { CalculatorHeaderActions } from './CalculatorHeaderActions';
import {
  BookOpen,
  ArrowRight,
  Layers,
  Sparkles,
  Calculator,
  Sliders,
  Check,
  RotateCcw
} from 'lucide-react';

// ==========================================
// 1. LCM CALCULATOR (Least Common Multiple)
// ==========================================
export function LCMCalculator() {
  const [inputVal, setInputVal] = useState<string>('12, 18, 24');

  const numbers = useMemo(() => {
    return inputVal
      .split(/[\s,]+/)
      .map((s) => parseFloat(s))
      .filter((n) => !isNaN(n) && n > 0);
  }, [inputVal]);

  const result = useMemo(() => calculateLCM(numbers), [numbers]);
  const resultSummaryText = `LCM of [${numbers.join(', ')}] = ${result.lcm}.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input Section */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Enter Positive Integers
            </label>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full px-4 py-3 text-base font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/60 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 focus:outline-none transition-all"
              placeholder="e.g. 12, 18, 24"
            />
            <p className="mt-1.5 text-xs text-slate-400">Separate numbers with commas or spaces.</p>
          </div>

          <div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-2">Quick Presets:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              {['12, 18, 24', '8, 14, 20', '15, 25, 30', '9, 12, 15, 18'].map((p) => (
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
                <div key={num} className="flex justify-between py-2 px-3 rounded-lg bg-slate-50/70 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60">
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
              Least Common Multiple
            </span>
            <div className="mt-3 text-4xl sm:text-5xl font-black font-mono tracking-tight text-indigo-600 dark:text-indigo-400">
              {result.lcm}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
              Smallest positive integer evenly divisible by all {result.count} numbers in your set without remainder.
            </p>
          </div>

          <div className="mt-8">
            <CalculatorHeaderActions onReset={() => setInputVal('12, 18, 24')} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. GCF / GCD CALCULATOR (Greatest Common Factor)
// ==========================================
export function GCFCalculator() {
  const [inputVal, setInputVal] = useState<string>('24, 36, 60');

  const numbers = useMemo(() => {
    return inputVal
      .split(/[\s,]+/)
      .map((s) => parseFloat(s))
      .filter((n) => !isNaN(n) && n > 0);
  }, [inputVal]);

  const result = useMemo(() => calculateGCF(numbers), [numbers]);
  const resultSummaryText = `GCF of [${numbers.join(', ')}] = ${result.gcf}. Shared common divisors: ${result.commonDivisors.join(', ')}.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Enter Positive Integers
            </label>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full px-4 py-3 text-base font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/60 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 focus:outline-none transition-all"
              placeholder="e.g. 24, 36, 60"
            />
            <p className="mt-1.5 text-xs text-slate-400">Separate numbers with commas or spaces.</p>
          </div>

          <div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-2">Quick Presets:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              {['24, 36, 60', '48, 72', '16, 24, 40', '100, 150, 250'].map((p) => (
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
              All Integer Divisors per Number
            </span>
            <div className="space-y-1.5 text-xs font-mono max-h-40 overflow-y-auto pr-1">
              {Object.entries(result.divisors).map(([num, divs]) => (
                <div key={num} className="p-2.5 rounded-lg bg-slate-50/70 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60">
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
              Greatest Common Factor (GCF / GCD)
            </span>
            <div className="mt-3 text-4xl sm:text-5xl font-black font-mono tracking-tight text-indigo-600 dark:text-indigo-400">
              {result.gcf}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-700/60 text-xs space-y-2 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 font-medium block">All Shared Common Divisors:</span>
              <div className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                {result.commonDivisors.join(', ') || 'None'}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CalculatorHeaderActions onReset={() => setInputVal('24, 36, 60')} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. MEAN CALCULATOR (Arithmetic, Geometric, Harmonic, Weighted & Trimmed Mean)
// ==========================================
export function MeanCalculator() {
  const [datasetStr, setDatasetStr] = useState<string>('12, 19, 24, 28, 35, 42, 50');
  const [weightsStr, setWeightsStr] = useState<string>('');
  const [showWeighted, setShowWeighted] = useState<boolean>(false);
  const [trimmedPercent, setTrimmedPercent] = useState<number>(10);

  const numbers = useMemo(() => {
    return datasetStr
      .split(/[\s,]+/)
      .map((s) => parseFloat(s))
      .filter((n) => !isNaN(n));
  }, [datasetStr]);

  const weights = useMemo(() => {
    if (!showWeighted || !weightsStr.trim()) return undefined;
    const w = weightsStr
      .split(/[\s,]+/)
      .map((s) => parseFloat(s))
      .filter((n) => !isNaN(n));
    return w.length === numbers.length ? w : undefined;
  }, [weightsStr, showWeighted, numbers.length]);

  const result = useMemo(
    () => calculateMean(numbers, weights, trimmedPercent),
    [numbers, weights, trimmedPercent]
  );

  const resultSummaryText = `Mean Calculation: Sample Size n=${result.count}, Arithmetic Mean x̄=${result.arithmeticMean}${result.geometricMean ? `, Geometric Mean=${result.geometricMean}` : ''}, Median=${result.median}, Std Dev=${result.sampleStdDev}.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Enter Numbers (Dataset)
            </label>
            <textarea
              rows={3}
              value={datasetStr}
              onChange={(e) => setDatasetStr(e.target.value)}
              className="w-full px-4 py-3 text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/60 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 focus:outline-none transition-all"
              placeholder="e.g. 15, 22.5, 30, 45, 60"
            />
            <p className="mt-1 text-xs text-slate-400">Separate values with commas, spaces, or line breaks.</p>
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-2">Sample Datasets:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { label: 'Exam Scores (0-100)', val: '78, 85, 92, 88, 64, 95, 82' },
                { label: 'Weekly Hours', val: '38, 42, 40, 45, 39, 41' },
                { label: 'Growth Multipliers', val: '1.05, 1.12, 1.08, 1.20, 1.15' }
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setDatasetStr(p.val)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Weighted Mean Toggle */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowWeighted(!showWeighted)}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
            >
              <span>{showWeighted ? 'Hide Weighted Mean Mode' : '+ Enable Weighted Mean Mode'}</span>
            </button>

            {showWeighted && (
              <div className="mt-3 p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Weights (must match {numbers.length} values)
                </label>
                <input
                  type="text"
                  value={weightsStr}
                  onChange={(e) => setWeightsStr(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  placeholder="e.g. 1, 2, 1, 3, 2, 1, 2"
                />
              </div>
            )}
          </div>

          {/* Step-by-Step Arithmetic */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-500" />
              Step-by-Step Calculation
            </span>
            <div className="space-y-1.5 text-xs font-mono bg-slate-50/70 dark:bg-slate-900/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/60">
              {result.steps.map((st, idx) => (
                <div key={idx} className="text-slate-700 dark:text-slate-300">
                  {st}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Result Card */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 lg:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Arithmetic Mean (x̄)
            </span>
            <div className="mt-3 text-4xl sm:text-5xl font-black font-mono tracking-tight text-indigo-600 dark:text-indigo-400">
              {result.arithmeticMean}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Sum: {result.sum} &bull; Count (n): {result.count}
            </div>

            {/* Comprehensive Metrics List */}
            <div className="mt-6 space-y-2 text-xs border-t border-slate-200/80 dark:border-slate-800 pt-4">
              {result.geometricMean !== null && (
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 dark:text-slate-400">Geometric Mean:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{result.geometricMean}</span>
                </div>
              )}
              {result.harmonicMean !== null && (
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 dark:text-slate-400">Harmonic Mean:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{result.harmonicMean}</span>
                </div>
              )}
              {result.weightedMean !== null && (
                <div className="flex justify-between py-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                  <span>Weighted Mean:</span>
                  <span className="font-mono">{result.weightedMean}</span>
                </div>
              )}
              <div className="flex justify-between py-1">
                <span className="text-slate-500 dark:text-slate-400">Median:</span>
                <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{result.median}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 dark:text-slate-400">Sample Std Dev (s):</span>
                <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{result.sampleStdDev}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 dark:text-slate-400">Range:</span>
                <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{result.range} (Min: {result.min}, Max: {result.max})</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CalculatorHeaderActions
              onReset={() => {
                setDatasetStr('12, 19, 24, 28, 35, 42, 50');
                setWeightsStr('');
                setShowWeighted(false);
              }}
              resultSummaryText={resultSummaryText}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. SCIENTIFIC CALCULATOR & MOST ADVANCED SCIENTIFIC
// ==========================================
export function ScientificCalculator() {
  const [expression, setExpression] = useState<string>('sin(30) + sqrt(16)');
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');
  const [advancedMode, setAdvancedMode] = useState<boolean>(false);
  const [history, setHistory] = useState<{ expr: string; res: number }[]>([
    { expr: 'cos(45) * 2', res: 1.41421356 },
    { expr: 'sqrt(144) + 5^2', res: 37 }
  ]);

  const evaluated = useMemo(
    () => evaluateScientificExpression(expression, angleMode),
    [expression, angleMode]
  );

  const appendToken = (token: string) => {
    setExpression((prev) => prev + token);
  };

  const handleClear = () => {
    setExpression('');
  };

  const handleBackspace = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    if (expression.trim() && evaluated.error === undefined) {
      setHistory((prev) => [{ expr: expression, res: evaluated.result }, ...prev.slice(0, 5)]);
    }
  };

  const basicButtons = [
    { label: 'sin', action: () => appendToken('sin(') },
    { label: 'cos', action: () => appendToken('cos(') },
    { label: 'tan', action: () => appendToken('tan(') },
    { label: 'π', action: () => appendToken('π') },
    { label: 'e', action: () => appendToken('e') },
    { label: 'sqrt', action: () => appendToken('sqrt(') },
    { label: 'log', action: () => appendToken('log(') },
    { label: 'ln', action: () => appendToken('ln(') },
    { label: 'x^y', action: () => appendToken('^') },
    { label: '(', action: () => appendToken('(') },
    { label: ')', action: () => appendToken(')') },
    { label: 'C', action: handleClear, isSpecial: true },
    { label: '7', action: () => appendToken('7') },
    { label: '8', action: () => appendToken('8') },
    { label: '9', action: () => appendToken('9') },
    { label: '÷', action: () => appendToken('/') },
    { label: '⌫', action: handleBackspace },
    { label: '4', action: () => appendToken('4') },
    { label: '5', action: () => appendToken('5') },
    { label: '6', action: () => appendToken('6') },
    { label: '×', action: () => appendToken('*') },
    { label: '%', action: () => appendToken('/100') },
    { label: '1', action: () => appendToken('1') },
    { label: '2', action: () => appendToken('2') },
    { label: '3', action: () => appendToken('3') },
    { label: '-', action: () => appendToken('-') },
    { label: 'ans', action: () => appendToken(`${history[0]?.res || 0}`) },
    { label: '0', action: () => appendToken('0') },
    { label: '.', action: () => appendToken('.') },
    { label: '+', action: () => appendToken('+') },
    { label: '=', action: handleCalculate, isPrimary: true }
  ];

  const advancedButtons = [
    { label: 'asin', action: () => appendToken('asin(') },
    { label: 'acos', action: () => appendToken('acos(') },
    { label: 'atan', action: () => appendToken('atan(') },
    { label: 'sinh', action: () => appendToken('sinh(') },
    { label: 'cosh', action: () => appendToken('cosh(') },
    { label: 'tanh', action: () => appendToken('tanh(') },
    { label: 'n!', action: () => appendToken('!') },
    { label: 'cbrt', action: () => appendToken('cbrt(') },
    { label: '|x|', action: () => appendToken('abs(') },
    { label: '1/x', action: () => appendToken('1/') },
    { label: '10^x', action: () => appendToken('10^(') },
    { label: 'e^x', action: () => appendToken('e^(') }
  ];

  const resultSummaryText = `Scientific Calculation: ${expression} = ${evaluated.result} (${angleMode.toUpperCase()} mode).`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_10px_28px_-4px_rgba(15,23,42,0.06),0_20px_48px_-8px_rgba(15,23,42,0.04)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_8px_32px_-4px_rgba(0,0,0,0.65),0_24px_64px_-12px_rgba(0,0,0,0.85)] p-6 sm:p-8 lg:p-10 xl:p-11 max-w-3xl mx-auto transition-all">
      {/* Mode Controls Bar */}
      <div className="flex items-center justify-between gap-4 mb-4 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAngleMode(angleMode === 'deg' ? 'rad' : 'deg')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            Angle: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{angleMode.toUpperCase()}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setAdvancedMode(!advancedMode)}
          className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
            advancedMode
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900/60'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{advancedMode ? 'Advanced Mode Active' : 'Switch to Advanced (fx-991)'}</span>
        </button>
      </div>

      {/* Screen Display */}
      <div className="rounded-2xl bg-slate-900 text-white p-5 font-mono mb-5 shadow-inner">
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
          <span>{angleMode.toUpperCase()} | {advancedMode ? 'Extended Scientific' : 'Standard'}</span>
          <span className="text-slate-400">{evaluated.error ? evaluated.error : 'Live Evaluation'}</span>
        </div>

        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          className="w-full bg-transparent text-xl sm:text-2xl font-bold text-white tracking-wider focus:outline-none"
          placeholder="0"
        />

        <div className="mt-3 text-right text-3xl font-black text-indigo-400 tabular-nums">
          = {evaluated.error ? '—' : evaluated.result}
        </div>
      </div>

      {/* Advanced keys strip when active */}
      {advancedMode && (
        <div className="mb-3 grid grid-cols-6 gap-2 text-xs font-semibold">
          {advancedButtons.map((btn, i) => (
            <button
              key={i}
              type="button"
              onClick={btn.action}
              className="py-2.5 rounded-lg bg-indigo-50/80 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-mono text-xs transition-colors"
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Scientific Keypad */}
      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 text-xs sm:text-sm font-semibold">
        {basicButtons.map((btn, i) => (
          <button
            key={i}
            type="button"
            onClick={btn.action}
            className={`py-3 rounded-xl font-mono transition-all active:scale-95 ${
              btn.isPrimary
                ? 'col-span-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-sm hover:shadow-md hover:shadow-indigo-500/20'
                : btn.isSpecial
                ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Calculation History */}
      {history.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Recent Calculations
          </span>
          <div className="space-y-1.5 text-xs font-mono">
            {history.map((h, idx) => (
              <div
                key={idx}
                onClick={() => setExpression(h.expr)}
                className="flex justify-between py-1.5 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer text-slate-600 dark:text-slate-400 transition-colors"
              >
                <span>{h.expr}</span>
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">= {h.res}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4">
        <CalculatorHeaderActions onReset={handleClear} resultSummaryText={resultSummaryText} />
      </div>
    </div>
  );
}

// ==========================================
// 5. COMPLEX NUMBER CALCULATOR WITH STEPS
// ==========================================
export function ComplexNumberCalculator() {
  const [r1, setR1] = useState<number>(3);
  const [i1, setI1] = useState<number>(4);
  const [r2, setR2] = useState<number>(1);
  const [i2, setI2] = useState<number>(-2);
  const [op, setOp] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('multiply');

  const result = useMemo(
    () => calculateComplexNumber(r1, i1, r2, i2, op),
    [r1, i1, r2, i2, op]
  );

  const resultSummaryText = `Complex Number (${op}): (${r1} + ${i1}i) and (${r2} + ${i2}i) = ${result.display}. Modulus |z1| = ${result.modulus1}, |z2| = ${result.modulus2}.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* z1 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2.5">
                First Complex Number (z₁)
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  value={r1}
                  onChange={(e) => setR1(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-center text-xs"
                  placeholder="Real"
                />
                <span className="text-slate-400 font-bold">+</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={i1}
                  onChange={(e) => setI1(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-center text-xs"
                  placeholder="Imag"
                />
                <span className="font-mono font-bold text-slate-500">i</span>
              </div>
            </div>

            {/* z2 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2.5">
                Second Complex Number (z₂)
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  value={r2}
                  onChange={(e) => setR2(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-center text-xs"
                  placeholder="Real"
                />
                <span className="text-slate-400 font-bold">+</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={i2}
                  onChange={(e) => setI2(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-center text-xs"
                  placeholder="Imag"
                />
                <span className="font-mono font-bold text-slate-500">i</span>
              </div>
            </div>
          </div>

          {/* Operation Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Select Operation
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs font-semibold">
              {[
                { id: 'add', label: 'Add (+)' },
                { id: 'subtract', label: 'Subtract (-)' },
                { id: 'multiply', label: 'Multiply (×)' },
                { id: 'divide', label: 'Divide (÷)' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setOp(btn.id as any)}
                  className={`py-2.5 rounded-xl border transition-colors ${
                    op === btn.id
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-sm border-blue-600 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step-by-Step Solution */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-500" />
              Step-by-Step Solution
            </span>
            <div className="space-y-1.5 text-xs font-mono bg-slate-50/70 dark:bg-slate-900/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/60">
              {result.steps.map((st, idx) => (
                <div key={idx} className="text-slate-700 dark:text-slate-300">
                  {st}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Result Card */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 lg:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Resulting Complex Number
            </span>
            <div className="mt-3 text-3xl sm:text-4xl font-black font-mono tracking-tight text-indigo-600 dark:text-indigo-400">
              {result.display}
            </div>

            <div className="mt-6 space-y-2 text-xs border-t border-slate-200/80 dark:border-slate-800 pt-4">
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Modulus |z₁|:</span>
                <span className="font-mono font-medium">{result.modulus1}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Argument θ₁:</span>
                <span className="font-mono font-medium">{result.arg1Deg}°</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Polar Form:</span>
                <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300">{result.polar1}</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CalculatorHeaderActions
              onReset={() => {
                setR1(3);
                setI1(4);
                setR2(1);
                setI2(-2);
              }}
              resultSummaryText={resultSummaryText}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. ASPECT RATIO CALCULATOR
// ==========================================
export function AspectRatioCalculator() {
  const [w, setW] = useState<number>(1920);
  const [h, setH] = useState<number>(1080);
  const [newW, setNewW] = useState<number>(1280);

  const result = useMemo(
    () => calculateAspectRatio(w, h, newW, undefined),
    [w, h, newW]
  );

  const presets = [
    { label: '16:9 (HD / 4K)', w: 16, h: 9 },
    { label: '4:3 (Classic)', w: 4, h: 3 },
    { label: '21:9 (Ultrawide)', w: 21, h: 9 },
    { label: '1:1 (Square)', w: 1, h: 1 },
    { label: '9:16 (Story/TikTok)', w: 9, h: 16 }
  ];

  const resultSummaryText = `Aspect Ratio: ${w} × ${h} simplified is ${result.simplifiedRatio} (${result.decimalRatio}). Scaled from width ${newW}px gives height ${result.scaledHeight}px.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Original Width (px)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={w}
                onChange={(e) => setW(Number(e.target.value) || 0)}
                className="w-full px-4 py-2.5 text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/60 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Original Height (px)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={h}
                onChange={(e) => setH(Number(e.target.value) || 0)}
                className="w-full px-4 py-2.5 text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/60 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-2">Presets:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setW(p.w * 100);
                    setH(p.h * 100);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scaling Calculator */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              Resize & Scale Dimensions
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">New Width</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={newW}
                  onChange={(e) => setNewW(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Calculated Height</label>
                <div className="w-full px-3 py-2 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 rounded-lg bg-slate-100 dark:bg-slate-800">
                  {result.scaledHeight} px
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Result Card */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 lg:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Simplified Ratio
            </span>
            <div className="mt-3 text-4xl sm:text-5xl font-black font-mono tracking-tight text-indigo-600 dark:text-indigo-400">
              {result.simplifiedRatio}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              Decimal: {result.decimalRatio} &bull; {result.percentage}% height
            </div>

            {/* Visual preview frame */}
            <div className="mt-6 flex justify-center items-center py-4">
              <div
                className="rounded-xl border-2 border-blue-500/40 bg-blue-50/30 dark:bg-blue-950/20 flex items-center justify-center text-xs font-mono font-bold text-blue-700 dark:text-blue-300 shadow-sm"
                style={{
                  width: '160px',
                  height: `${Math.min(120, Math.max(30, Math.round(160 * (h / w))))}px`
                }}
              >
                {result.simplifiedRatio}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CalculatorHeaderActions
              onReset={() => {
                setW(1920);
                setH(1080);
                setNewW(1280);
              }}
              resultSummaryText={resultSummaryText}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. RATIO CALCULATOR (A:B = C:D Solver & Simplify Ratios)
// ==========================================
export function RatioCalculator() {
  const [valA, setValA] = useState<string>('4');
  const [valB, setValB] = useState<string>('8');
  const [valC, setValC] = useState<string>('12');
  const [valD, setValD] = useState<string>(''); // Solve for D

  const [multiRatioStr, setMultiRatioStr] = useState<string>('24 : 36 : 60');

  // Proportion solver
  const solvedProportion = useMemo(() => {
    const a = valA === '' ? null : parseFloat(valA);
    const b = valB === '' ? null : parseFloat(valB);
    const c = valC === '' ? null : parseFloat(valC);
    const d = valD === '' ? null : parseFloat(valD);
    return solveRatioProportion(a, b, c, d);
  }, [valA, valB, valC, valD]);

  // Simplify ratio
  const simplifiedMulti = useMemo(() => {
    const terms = multiRatioStr
      .split(/[:,\s]+/)
      .map((s) => parseFloat(s))
      .filter((n) => !isNaN(n));
    return simplifyRatioTerms(terms);
  }, [multiRatioStr]);

  const resultSummaryText = solvedProportion.solvedKey
    ? `Ratio Proportion: Solved for ${solvedProportion.solvedKey} = ${solvedProportion.resultValue}. (${solvedProportion.steps})`
    : `Ratio Simplification: ${multiRatioStr} simplified is ${simplifiedMulti.simplified}.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_10px_28px_-4px_rgba(15,23,42,0.06),0_20px_48px_-8px_rgba(15,23,42,0.04)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_8px_32px_-4px_rgba(0,0,0,0.65),0_24px_64px_-12px_rgba(0,0,0,0.85)] p-6 sm:p-8 lg:p-10 xl:p-11 space-y-8 transition-all">
      {/* Part 1: Solve Proportion A : B = C : D */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          1. Solve Missing Value in Proportion (A : B = C : D)
        </h3>
        <p className="text-xs text-slate-500">Leave exactly one field blank to solve for it.</p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={valA}
              onChange={(e) => setValA(e.target.value)}
              placeholder="A"
              className={`w-16 px-3 py-2 text-center font-mono rounded-lg border text-sm ${
                valA === '' ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-950/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            />
            <span className="font-bold text-slate-400">:</span>
            <input
              type="number"
              value={valB}
              onChange={(e) => setValB(e.target.value)}
              placeholder="B"
              className={`w-16 px-3 py-2 text-center font-mono rounded-lg border text-sm ${
                valB === '' ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-950/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            />
          </div>

          <span className="font-bold text-slate-600 dark:text-slate-400 text-lg">=</span>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={valC}
              onChange={(e) => setValC(e.target.value)}
              placeholder="C"
              className={`w-16 px-3 py-2 text-center font-mono rounded-lg border text-sm ${
                valC === '' ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-950/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            />
            <span className="font-bold text-slate-400">:</span>
            <input
              type="number"
              value={valD}
              onChange={(e) => setValD(e.target.value)}
              placeholder="D"
              className={`w-16 px-3 py-2 text-center font-mono rounded-lg border text-sm ${
                valD === '' ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-950/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            />
          </div>
        </div>

        {solvedProportion.solvedKey && (
          <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-300 font-medium">
            <strong>Solved:</strong> {solvedProportion.steps}
          </div>
        )}
      </div>

      {/* Part 2: Simplify Ratio Terms */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          2. Simplify Ratio to Lowest Terms
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          <div className="sm:col-span-7">
            <label className="block text-xs text-slate-500 mb-1">Enter 2 or 3 Terms (separated by colons or spaces)</label>
            <input
              type="text"
              value={multiRatioStr}
              onChange={(e) => setMultiRatioStr(e.target.value)}
              className="w-full px-4 py-2 text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
              placeholder="e.g. 24 : 36 : 60"
            />
          </div>
          <div className="sm:col-span-5 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Simplified Form</span>
            <span className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
              {simplifiedMulti.simplified}
            </span>
          </div>
        </div>
      </div>

      <div>
        <CalculatorHeaderActions
          onReset={() => {
            setValA('4');
            setValB('8');
            setValC('12');
            setValD('');
            setMultiRatioStr('24 : 36 : 60');
          }}
          resultSummaryText={resultSummaryText}
        />
      </div>
    </div>
  );
}

// ==========================================
// 8. MASTER FRACTION CALCULATOR
// (Includes: Basic Arithmetic, Mixed Numbers, Decimal to Fraction, Improper Fraction & Casio fx-55 Plus Simulation)
// ==========================================
interface FractionCalculatorProps {
  initialTab?: 'arithmetic' | 'mixed' | 'decimal' | 'improper' | 'casio';
}

export function FractionCalculator({ initialTab = 'arithmetic' }: FractionCalculatorProps) {
  const [activeTab, setActiveTab] = useState<'arithmetic' | 'mixed' | 'decimal' | 'improper' | 'casio'>(initialTab);

  // Standard fraction state
  const [whole1, setWhole1] = useState<number>(0);
  const [num1, setNum1] = useState<number>(3);
  const [den1, setDen1] = useState<number>(4);

  const [whole2, setWhole2] = useState<number>(0);
  const [num2, setNum2] = useState<number>(2);
  const [den2, setDen2] = useState<number>(5);

  const [op, setOp] = useState<'+' | '-' | '×' | '÷'>('+');

  // Decimal to Fraction state
  const [decimalInput, setDecimalInput] = useState<string>('0.625');

  // Casio fx-55 state
  const [casioWhole, setCasioWhole] = useState<number>(2);
  const [casioNum, setCasioNum] = useState<number>(4);
  const [casioDen, setCasioDen] = useState<number>(8);
  const [casioSimpFactor, setCasioSimpFactor] = useState<number | null>(null);

  // Fraction arithmetic computation
  const fractionResult = useMemo(
    () => calculateFractions(whole1, num1, den1, whole2, num2, den2, op),
    [whole1, num1, den1, whole2, num2, den2, op]
  );

  // Decimal to fraction computation
  const decimalResult = useMemo(() => {
    const val = parseFloat(decimalInput);
    return convertDecimalToFraction(val);
  }, [decimalInput]);

  // Casio fx-55 step simplification
  const handleCasioSimp = () => {
    // Find smallest prime factor shared between num and den
    for (let factor of [2, 3, 5, 7, 11, 13]) {
      if (casioNum % factor === 0 && casioDen % factor === 0) {
        setCasioNum(casioNum / factor);
        setCasioDen(casioDen / factor);
        setCasioSimpFactor(factor);
        return;
      }
    }
    setCasioSimpFactor(null); // Fully simplified
  };

  const handleCasioToggleFormat = () => {
    if (casioWhole !== 0) {
      // Convert mixed to improper
      const imp = casioWhole * casioDen + casioNum;
      setCasioWhole(0);
      setCasioNum(imp);
    } else if (casioNum >= casioDen) {
      // Convert improper to mixed
      const w = Math.floor(casioNum / casioDen);
      const rem = casioNum % casioDen;
      setCasioWhole(w);
      setCasioNum(rem);
    }
  };

  const resultSummaryText = `Fraction Tool (${activeTab}): ${fractionResult.simplifiedFraction} (Mixed: ${fractionResult.mixedFraction}, Decimal: ${fractionResult.decimalValue}).`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      {/* Mode Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'arithmetic', label: 'Fraction Arithmetic' },
          { id: 'mixed', label: 'Mixed Numbers' },
          { id: 'decimal', label: 'Decimal to Fraction' },
          { id: 'improper', label: 'Improper Fractions' },
          { id: 'casio', label: 'Casio fx-55 Plus Mode' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mode 1 & 2 & 4: Standard, Mixed, or Improper Arithmetic */}
      {(activeTab === 'arithmetic' || activeTab === 'mixed' || activeTab === 'improper') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
              {/* Fraction 1 */}
              <div className="flex items-center gap-2">
                {(activeTab === 'mixed' || whole1 > 0) && (
                  <input
                    type="number"
                    value={whole1}
                    onChange={(e) => setWhole1(Number(e.target.value) || 0)}
                    className="w-14 px-2 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-center text-xs"
                    placeholder="Whole"
                    title="Whole number (e.g. 2 for 2 3/4)"
                  />
                )}
                <div className="flex flex-col gap-1 w-16">
                  <input
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(Number(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-center text-xs font-bold"
                    placeholder="Numerator"
                  />
                  <div className="h-0.5 bg-slate-300 dark:bg-slate-700 rounded-full" />
                  <input
                    type="number"
                    value={den1}
                    onChange={(e) => setDen1(Number(e.target.value) || 1)}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-center text-xs font-bold"
                    placeholder="Denominator"
                  />
                </div>
              </div>

              {/* Operator */}
              <div className="flex gap-1">
                {(['+', '-', '×', '÷'] as const).map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setOp(o)}
                    className={`w-9 h-9 rounded-lg font-bold text-sm transition-colors ${
                      op === o
                        ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-sm shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>

              {/* Fraction 2 */}
              <div className="flex items-center gap-2">
                {(activeTab === 'mixed' || whole2 > 0) && (
                  <input
                    type="number"
                    value={whole2}
                    onChange={(e) => setWhole2(Number(e.target.value) || 0)}
                    className="w-14 px-2 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-center text-xs"
                    placeholder="Whole"
                    title="Whole number"
                  />
                )}
                <div className="flex flex-col gap-1 w-16">
                  <input
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(Number(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-center text-xs font-bold"
                    placeholder="Numerator"
                  />
                  <div className="h-0.5 bg-slate-300 dark:bg-slate-700 rounded-full" />
                  <input
                    type="number"
                    value={den2}
                    onChange={(e) => setDen2(Number(e.target.value) || 1)}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-center text-xs font-bold"
                    placeholder="Denominator"
                  />
                </div>
              </div>
            </div>

            {/* Step-by-Step Breakdown */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                Step-by-Step Arithmetic (LCD &amp; Simplification)
              </span>
              <div className="space-y-1.5 text-xs font-mono bg-slate-50/70 dark:bg-slate-900/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/60">
                {fractionResult.steps.map((st, i) => (
                  <div key={i} className="text-slate-700 dark:text-slate-300">
                    {st}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Output Panel */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 lg:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Simplified Result
              </span>
              <div className="mt-3 text-4xl font-black font-mono tracking-tight text-indigo-600 dark:text-indigo-400">
                {fractionResult.simplifiedFraction}
              </div>

              <div className="mt-6 space-y-2 text-xs border-t border-slate-200/80 dark:border-slate-800 pt-4">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Mixed Number:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{fractionResult.mixedFraction}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Decimal Value:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{fractionResult.decimalValue}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Improper Fraction:</span>
                  <span className="font-mono">{fractionResult.improperFraction}</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <CalculatorHeaderActions
                onReset={() => {
                  setWhole1(0);
                  setNum1(3);
                  setDen1(4);
                  setWhole2(0);
                  setNum2(2);
                  setDen2(5);
                }}
                resultSummaryText={resultSummaryText}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Decimal to Fraction */}
      {activeTab === 'decimal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Enter Any Decimal Number
              </label>
              <input
                type="text"
                value={decimalInput}
                onChange={(e) => setDecimalInput(e.target.value)}
                className="w-full px-4 py-3 text-base font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/60 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:outline-none"
                placeholder="e.g. 0.375 or 2.625"
              />
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-slate-400 self-center">Presets:</span>
              {['0.125 (1/8)', '0.333333 (1/3)', '0.375 (3/8)', '0.625 (5/8)', '2.75 (2 3/4)'].map((p) => {
                const dec = p.split(' ')[0];
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setDecimalInput(dec)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs"
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                Rationalization Steps
              </span>
              <div className="space-y-1.5 text-xs font-mono bg-slate-50/70 dark:bg-slate-900/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                {decimalResult.steps.map((st, i) => (
                  <div key={i} className="text-slate-700 dark:text-slate-300">
                    {st}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 lg:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Exact Fraction Equivalent
              </span>
              <div className="mt-3 text-4xl sm:text-5xl font-black font-mono tracking-tight text-indigo-600 dark:text-indigo-400">
                {decimalResult.simplifiedFraction}
              </div>

              <div className="mt-6 space-y-2 text-xs border-t border-slate-200/80 dark:border-slate-800 pt-4">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Mixed Number:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{decimalResult.mixedFraction}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Numerator / Denominator:</span>
                  <span className="font-mono">{decimalResult.numerator} / {decimalResult.denominator}</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <CalculatorHeaderActions
                onReset={() => setDecimalInput('0.625')}
                resultSummaryText={`Decimal ${decimalInput} equals ${decimalResult.simplifiedFraction} (${decimalResult.mixedFraction}).`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mode 5: Casio fx-55 Plus Simulation */}
      {activeTab === 'casio' && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200">
            <strong>Casio fx-55 Plus Simulator:</strong> Emulates the famous elementary/middle-school fraction calculator. Use the <code>a b/c</code> toggle, <code>Simp</code> step-by-step reducer, and format convert buttons just like the handheld device!
          </div>

          {/* Calculator Chassis */}
          <div className="rounded-3xl bg-slate-800 p-6 shadow-2xl border-4 border-slate-700 text-white">
            {/* Casio LCD display */}
            <div className="rounded-xl bg-[#9EA792] text-slate-900 p-4 font-mono shadow-inner mb-6 border-2 border-slate-900/40">
              <div className="flex justify-between text-[10px] uppercase font-bold text-slate-700 mb-1">
                <span>CASIO fx-55 PLUS</span>
                <span>{casioWhole > 0 ? 'MIXED' : 'FRAC'}</span>
              </div>
              <div className="text-right text-2xl sm:text-3xl font-black tracking-widest py-2">
                {casioWhole !== 0 ? `${casioWhole} ` : ''}{casioNum} ⌟ {casioDen}
              </div>
              <div className="text-[11px] text-slate-700 text-right">
                {casioSimpFactor ? `SIMP by ${casioSimpFactor}` : 'READY / SIMPLEST'}
              </div>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-3 text-xs font-bold">
              <button
                type="button"
                onClick={handleCasioSimp}
                className="py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black tracking-wider transition-colors shadow-sm"
              >
                Simp (Reduce)
              </button>
              <button
                type="button"
                onClick={handleCasioToggleFormat}
                className="py-3 rounded-xl bg-blue-500 hover:bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-sm font-black tracking-wider transition-colors shadow-sm"
              >
                d/c ↔ a b/c
              </button>
              <button
                type="button"
                onClick={() => {
                  setCasioWhole(2);
                  setCasioNum(4);
                  setCasioDen(8);
                  setCasioSimpFactor(null);
                }}
                className="py-3 rounded-xl bg-slate-600 hover:bg-slate-500 text-white font-black transition-colors"
              >
                Reset fx-55
              </button>
            </div>

            {/* Input fields to test values */}
            <div className="mt-5 pt-4 border-t border-slate-700/80 grid grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Whole (a)</label>
                <input
                  type="number"
                  value={casioWhole}
                  onChange={(e) => setCasioWhole(Number(e.target.value) || 0)}
                  className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-center"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Numerator (b)</label>
                <input
                  type="number"
                  value={casioNum}
                  onChange={(e) => setCasioNum(Number(e.target.value) || 0)}
                  className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-center"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Denominator (c)</label>
                <input
                  type="number"
                  value={casioDen}
                  onChange={(e) => setCasioDen(Number(e.target.value) || 1)}
                  className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-center"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
