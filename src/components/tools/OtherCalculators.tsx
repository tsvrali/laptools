import { useState, useMemo } from 'react';
import {
  calculateFabricYardage,
  calculatePercentages,
  calculateAverages,
  calculateTDEE,
  calculateProteinIntake,
  calculateBodyFat,
  FabricInput
} from '../../utils/calculatorLogic';
import { CalculatorHeaderActions } from './CalculatorHeaderActions';

// 1. Fabric Yardage Calculator
const defaultFabricInput: FabricInput = {
  projectType: 'curtains',
  lengthInches: 84,
  widthInches: 48,
  fabricWidthInches: 54,
  verticalRepeatInches: 0,
  quantity: 2,
  wasteMarginPercent: 10
};

export function FabricYardageCalculator() {
  const [input, setInput] = useState<FabricInput>(defaultFabricInput);

  const result = useMemo(() => calculateFabricYardage(input), [input]);

  const handlePreset = (preset: FabricInput['projectType']) => {
    switch (preset) {
      case 'curtains':
        setInput({ ...input, projectType: preset, lengthInches: 84, widthInches: 48, quantity: 2 });
        break;
      case 'throw_pillow':
        setInput({ ...input, projectType: preset, lengthInches: 18, widthInches: 18, quantity: 2 });
        break;
      case 'tablecloth':
        setInput({ ...input, projectType: preset, lengthInches: 72, widthInches: 54, quantity: 1 });
        break;
      case 'quilt_backing':
        setInput({ ...input, projectType: preset, lengthInches: 70, widthInches: 60, quantity: 1 });
        break;
      default:
        setInput({ ...input, projectType: preset });
    }
  };

  const resultSummaryText = `Fabric Yardage: Need ${result.yardsNeeded} yards of ${input.fabricWidthInches}" wide fabric for ${input.quantity} × ${input.projectType} (${input.lengthInches}" × ${input.widthInches}"). Cut length: ${result.cutLengthInches}" per cut.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Project Preset
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(['curtains', 'throw_pillow', 'tablecloth', 'quilt_backing'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePreset(p)}
                  className={`px-3 py-1.5 text-xs rounded-lg capitalize font-medium transition-colors ${
                    input.projectType === p
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {p.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Finished Length (in)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={input.lengthInches}
                onChange={(e) => setInput({ ...input, lengthInches: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Finished Width (in)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={input.widthInches}
                onChange={(e) => setInput({ ...input, widthInches: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Fabric Bolt Width
              </label>
              <select
                value={input.fabricWidthInches}
                onChange={(e) => setInput({ ...input, fabricWidthInches: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              >
                <option value={44}>44&quot; (Quilting)</option>
                <option value={54}>54&quot; (Home Decor)</option>
                <option value={60}>60&quot; (Drapery)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Vertical Repeat (in)
              </label>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={input.verticalRepeatInches}
                onChange={(e) => setInput({ ...input, verticalRepeatInches: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Quantity
              </label>
              <input
                type="number"
                inputMode="decimal"
                min="1"
                value={input.quantity}
                onChange={(e) => setInput({ ...input, quantity: Number(e.target.value) || 1 })}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Required Fabric Yardage
            </span>
            <div className="mt-2 text-3xl md:text-4xl font-bold font-mono text-rose-600 dark:text-rose-400">
              {result.yardsNeeded} Yards
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              Total Linear Inches: {result.totalInchesNeeded}&quot; (includes 10% cutting waste)
            </div>

            <div className="mt-5 space-y-2 text-xs border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Cut Length per Panel:</span>
                <span className="font-mono">{result.cutLengthInches}&quot;</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Cuts per Bolt Width:</span>
                <span className="font-mono">{result.cutsPerWidth} cut(s)</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => setInput(defaultFabricInput)} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Percentage Calculator
export function PercentageCalculator() {
  const [mode, setMode] = useState<'percent_of' | 'is_percent_of' | 'increase_decrease' | 'difference'>('percent_of');
  const [val1, setVal1] = useState<number>(20);
  const [val2, setVal2] = useState<number>(150);

  const result = useMemo(() => calculatePercentages(mode, val1, val2), [mode, val1, val2]);

  const resultSummaryText = `Percentage Calculation (${mode}): ${result.explanation}`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg max-w-xl mb-6">
        <button
          type="button"
          onClick={() => { setMode('percent_of'); setVal1(20); setVal2(150); }}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            mode === 'percent_of'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          What is X% of Y?
        </button>
        <button
          type="button"
          onClick={() => { setMode('is_percent_of'); setVal1(30); setVal2(120); }}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            mode === 'is_percent_of'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          X is what % of Y?
        </button>
        <button
          type="button"
          onClick={() => { setMode('increase_decrease'); setVal1(80); setVal2(100); }}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            mode === 'increase_decrease'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          % Change (Increase / Decrease)
        </button>
        <button
          type="button"
          onClick={() => { setMode('difference'); setVal1(100); setVal2(120); }}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            mode === 'difference'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          % Difference
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {mode === 'percent_of' ? 'Percentage (%)' : mode === 'increase_decrease' ? 'Initial Starting Value (X)' : 'Value X'}
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={val1}
                onChange={(e) => setVal1(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {mode === 'percent_of' ? 'Base Total (Y)' : mode === 'increase_decrease' ? 'New Final Value (Y)' : 'Value Y'}
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={val2}
                onChange={(e) => setVal2(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Result
            </span>
            <div className="mt-2 text-3xl md:text-4xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
              {result.result}{mode !== 'percent_of' ? '%' : ''}
            </div>
            <div className="text-xs text-slate-500 mt-2 font-mono">
              {result.explanation}
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => { setVal1(20); setVal2(150); }} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Average Calculator
export function AverageCalculator() {
  const [rawText, setRawText] = useState<string>('82, 90, 76, 90, 85, 95, 88');

  const numbers = useMemo(() => {
    return rawText
      .split(/[\s,]+/)
      .map((s) => parseFloat(s))
      .filter((n) => !isNaN(n));
  }, [rawText]);

  const result = useMemo(() => calculateAverages(numbers), [numbers]);

  const resultSummaryText = `Dataset Analysis (${result.count} numbers): Mean: ${result.mean}, Median: ${result.median}, Mode: [${result.mode.join(', ')}], Range: ${result.range}, Std Dev: ${result.standardDeviation}.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Enter Numbers (separated by commas, spaces, or lines)
            </label>
            <textarea
              rows={4}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              className="w-full p-3 text-sm font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <span className="text-[11px] text-slate-400">Parsed {numbers.length} valid numbers.</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="text-xs text-slate-400 mr-1 self-center">Presets:</span>
            <button
              type="button"
              onClick={() => setRawText('10, 20, 30, 40, 50')}
              className="px-2 py-1 text-xs rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              Sequential
            </button>
            <button
              type="button"
              onClick={() => setRawText('75, 88, 92, 92, 85, 79, 95, 100')}
              className="px-2 py-1 text-xs rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              Test Grades
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Arithmetic Mean (Average)
            </span>
            <div className="mt-2 text-3xl md:text-4xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
              {result.mean}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-700/60">
                <span className="text-slate-500 block">Median:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{result.median}</span>
              </div>
              <div className="p-2.5 rounded bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-700/60">
                <span className="text-slate-500 block">Mode:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">
                  {result.mode.length > 0 ? result.mode.join(', ') : 'None'}
                </span>
              </div>
              <div className="p-2.5 rounded bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-700/60">
                <span className="text-slate-500 block">Sample Std Dev:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{result.standardDeviation}</span>
              </div>
              <div className="p-2.5 rounded bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-700/60">
                <span className="text-slate-500 block">Range (Max - Min):</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{result.range}</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => setRawText('82, 90, 76, 90, 85, 95, 88')} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Health Calculators (TDEE, Protein Intake, Body Fat)
export function TDEECalculator() {
  const [weightKg, setWeightKg] = useState<number>(80);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<number>(1.55);

  const result = useMemo(
    () => calculateTDEE(weightKg, heightCm, age, gender, activity),
    [weightKg, heightCm, age, gender, activity]
  );

  const resultSummaryText = `TDEE Daily Energy: Maintenance = ${result.tdee} kcal/day (BMR: ${result.bmr} kcal). Weight loss (-1 lb/wk): ${result.weightLoss} kcal/day.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              >
                <option value="male">Male (+5 kcal)</option>
                <option value="female">Female (-161 kcal)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Age (years)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={age}
                onChange={(e) => setAge(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Activity Level
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
            >
              <option value={1.2}>Sedentary (Little or no exercise)</option>
              <option value={1.375}>Lightly Active (1-3 days/week)</option>
              <option value={1.55}>Moderately Active (3-5 days/week)</option>
              <option value={1.725}>Very Active (6-7 days/week)</option>
              <option value={1.9}>Extremely Active (Athletic training)</option>
            </select>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Daily Maintenance Calories (TDEE)
            </span>
            <div className="mt-2 text-3xl md:text-4xl font-bold font-mono text-pink-600 dark:text-pink-400">
              {result.tdee.toLocaleString()} kcal
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              Basal Metabolic Rate (BMR): {result.bmr} kcal/day
            </div>

            <div className="mt-5 space-y-2 text-xs border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Weight Loss (-1 lb/wk):</span>
                <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">{result.weightLoss} kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Mild Deficit (-0.5 lb/wk):</span>
                <span className="font-mono">{result.mildLoss} kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Muscle Gain (+0.5 lb/wk):</span>
                <span className="font-mono">{result.mildGain} kcal</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => { setWeightKg(80); setHeightCm(178); setAge(30); }} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProteinIntakeCalculator() {
  const [weightLbs, setWeightLbs] = useState<number>(175);
  const [goal, setGoal] = useState<'sedentary' | 'moderate' | 'hypertrophy' | 'fat_loss'>('hypertrophy');

  const result = useMemo(() => calculateProteinIntake(weightLbs, goal), [weightLbs, goal]);

  const resultSummaryText = `Protein Target: ${result.minGrams}g - ${result.maxGrams}g per day for ${weightLbs} lbs (${result.weightKg} kg) adult (~${result.perMealMin}g - ${result.perMealMax}g per meal across 4 meals).`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Body Weight (lbs)
            </label>
            <input
              type="number"
              inputMode="decimal"
              value={weightLbs}
              onChange={(e) => setWeightLbs(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Activity &amp; Muscle Goal
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as any)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
            >
              <option value="sedentary">Sedentary RDA Baseline (0.8 - 1.0 g/kg)</option>
              <option value="moderate">Active / Endurance (1.2 - 1.6 g/kg)</option>
              <option value="hypertrophy">Muscle Building &amp; Strength (1.6 - 2.2 g/kg)</option>
              <option value="fat_loss">Calorie Deficit Muscle Retention (1.8 - 2.4 g/kg)</option>
            </select>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Optimal Daily Protein Target
            </span>
            <div className="mt-2 text-3xl md:text-4xl font-bold font-mono text-pink-600 dark:text-pink-400">
              {result.minGrams}g - {result.maxGrams}g
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              ~{result.perMealMin}g to {result.perMealMax}g across 4 daily meals
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => setWeightLbs(175)} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BodyFatCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<number>(70); // inches
  const [neck, setNeck] = useState<number>(15.5);
  const [waist, setWaist] = useState<number>(33);
  const [hip, setHip] = useState<number>(38);

  const result = useMemo(
    () => calculateBodyFat(gender, height, neck, waist, hip),
    [gender, height, neck, waist, hip]
  );

  const resultSummaryText = `US Navy Body Fat: ${result.bodyFatPercent}% (${result.category} tier) based on tape measurements.`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Biological Sex
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Height (inches)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Neck Circumference (in)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={neck}
                onChange={(e) => setNeck(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Waist at Navel (in)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={waist}
                onChange={(e) => setWaist(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
          </div>

          {gender === 'female' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Hip at Widest Point (in)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={hip}
                onChange={(e) => setHip(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              />
            </div>
          )}
        </div>

        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Estimated Body Fat Percentage
            </span>
            <div className="mt-2 text-3xl md:text-4xl font-bold font-mono text-pink-600 dark:text-pink-400">
              {result.bodyFatPercent}%
            </div>
            <div className="mt-2 inline-block px-2.5 py-1 text-xs font-semibold rounded bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
              Category: {result.category}
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => { setHeight(70); setNeck(15.5); setWaist(33); }} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}
