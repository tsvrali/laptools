import { useState, useMemo } from 'react';
import { convertKmToMiles, convertPace, convertGramsToCups } from '../../utils/calculatorLogic';
import { bakingIngredients } from '../../data/bakingIngredients';
import { CalculatorHeaderActions } from './CalculatorHeaderActions';
import { ArrowLeftRight, Timer, Scale } from 'lucide-react';

// 1. Km to Miles & Running Pace Calculator
export function KmToMilesCalculator() {
  const [val, setVal] = useState<number>(5);
  const [isKmToMiles, setIsKmToMiles] = useState<boolean>(true);
  const [precision, setPrecision] = useState<number>(2);

  // Secondary running pace state
  const [paceMin, setPaceMin] = useState<number>(5);
  const [paceSec, setPaceSec] = useState<number>(0);

  const convertedDistance = useMemo(
    () => convertKmToMiles(val, isKmToMiles, precision),
    [val, isKmToMiles, precision]
  );

  const convertedPace = useMemo(
    () => convertPace(paceMin, paceSec, isKmToMiles),
    [paceMin, paceSec, isKmToMiles]
  );

  const resultSummaryText = `Distance Conversion: ${val} ${isKmToMiles ? 'km' : 'miles'} = ${convertedDistance} ${isKmToMiles ? 'miles' : 'km'}. Running Pace: ${paceMin}:${paceSec < 10 ? '0' : ''}${paceSec} ${isKmToMiles ? '/km' : '/mile'} = ${convertedPace}.`;

  const raceDistances = [
    { label: '5K', km: 5 },
    { label: '10K', km: 10 },
    { label: 'Half Marathon', km: 21.0975 },
    { label: 'Marathon', km: 42.195 },
    { label: '50K Ultra', km: 50 },
    { label: '100K Ultra', km: 100 }
  ];

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Enter Distance to Convert
            </label>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-400">Decimals:</span>
              {[1, 2, 4, 6].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPrecision(p)}
                  className={`px-2 py-0.5 rounded text-xs font-mono ${
                    precision === p
                      ? 'bg-orange-500 text-white font-semibold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={val}
                onChange={(e) => setVal(Number(e.target.value) || 0)}
                className="w-full px-3 py-2.5 text-lg font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              <span className="absolute right-3 top-3 text-xs font-semibold text-slate-400 uppercase">
                {isKmToMiles ? 'km' : 'miles'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsKmToMiles(!isKmToMiles)}
              className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium shrink-0"
              title="Swap conversion direction"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Swap</span>
            </button>
          </div>

          {/* Quick Race Distance Presets */}
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              Popular Running Race Distances
            </span>
            <div className="flex flex-wrap gap-1.5">
              {raceDistances.map((race) => (
                <button
                  key={race.label}
                  type="button"
                  onClick={() => {
                    setIsKmToMiles(true);
                    setVal(race.km);
                  }}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 dark:hover:text-orange-400 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                >
                  {race.label} ({race.km} km)
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Running Pace Converter */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
              <Timer className="w-4 h-4 text-orange-500" />
              Running Pace Converter ({isKmToMiles ? 'min/km to min/mile' : 'min/mile to min/km'})
            </span>
            <div className="flex items-center gap-2 max-w-xs text-xs">
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  inputMode="decimal"
                  min="2"
                  max="30"
                  value={paceMin}
                  onChange={(e) => setPaceMin(Number(e.target.value) || 0)}
                  className="w-14 px-2 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 font-mono text-center"
                />
                <span className="text-slate-400">min</span>
              </div>
              <span className="text-slate-400">:</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="59"
                  value={paceSec}
                  onChange={(e) => setPaceSec(Number(e.target.value) || 0)}
                  className="w-14 px-2 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 font-mono text-center"
                />
                <span className="text-slate-400">sec</span>
              </div>
              <span className="text-slate-400 font-mono">{isKmToMiles ? '/km' : '/mile'} =</span>
              <span className="font-mono font-bold text-orange-600 dark:text-orange-400">{convertedPace}</span>
            </div>
          </div>
        </div>

        {/* Right Results Panel */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Converted Distance
            </span>
            <div className="mt-2 text-3xl md:text-4xl font-bold font-mono text-orange-600 dark:text-orange-400">
              {convertedDistance} {isKmToMiles ? 'miles' : 'km'}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              Formula: {isKmToMiles ? `${val} × 0.621371` : `${val} × 1.609344`}
            </div>

            <div className="mt-5 space-y-2 text-xs border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>International Exact Ratio:</span>
                <span className="font-mono">1 mi = 1.609344 km</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Speed Equivalent:</span>
                <span className="font-mono">{val} {isKmToMiles ? 'km/h' : 'mph'} = {convertedDistance} {isKmToMiles ? 'mph' : 'km/h'}</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => setVal(5)} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Grams to Cups Converter (Baking Density Table)
export function GramsToCupsCalculator() {
  const [grams, setGrams] = useState<number>(250);
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>('all_purpose_flour');

  const selectedIngredient = useMemo(
    () => bakingIngredients.find((i) => i.id === selectedIngredientId) || bakingIngredients[0],
    [selectedIngredientId]
  );

  const result = useMemo(
    () => convertGramsToCups(grams, selectedIngredient.gramsPerCup),
    [grams, selectedIngredient]
  );

  const resultSummaryText = `Baking Conversion: ${grams}g of ${selectedIngredient.name} = ${result.cups} US Cups (${result.tablespoons} Tbsp / ${result.ounces} oz). Density: ${selectedIngredient.gramsPerCup}g per 1 US Cup (236.59 ml).`;

  return (
    <div className="bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Select Baking Ingredient (40+ Density Standards)
            </label>
            <select
              value={selectedIngredientId}
              onChange={(e) => setSelectedIngredientId(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              {bakingIngredients.map((ing) => (
                <option key={ing.id} value={ing.id}>
                  {ing.name} ({ing.gramsPerCup}g/cup) - {ing.category}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 mt-1">{selectedIngredient.description}</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Weight in Grams (g)
            </label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                min="1"
                step="10"
                value={grams}
                onChange={(e) => setGrams(Number(e.target.value) || 0)}
                className="w-full pl-3 pr-8 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              <span className="absolute right-3 top-2.5 text-slate-400 text-sm">g</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-orange-50/60 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40 text-xs text-orange-900 dark:text-orange-300 flex items-start gap-2">
            <Scale className="w-4 h-4 shrink-0 mt-0.5 text-orange-600 dark:text-orange-400" />
            <div>
              <strong>Why Ingredient Density Matters:</strong> 1 cup of all-purpose flour weighs 120 grams, but 1 cup of granulated sugar weighs 200 grams and 1 cup of honey weighs 340 grams. Measuring by weight (grams) ensures consistent baking results.
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141C2E] rounded-xl p-6 sm:p-7 md:p-8 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Volumetric Measurement
            </span>
            <div className="mt-2 text-3xl md:text-4xl font-bold font-mono text-orange-600 dark:text-orange-400">
              {result.cups} US Cups
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              {result.tablespoons} Tablespoons &bull; {result.ounces} Ounces (weight)
            </div>

            <div className="mt-5 space-y-2 text-xs border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Density Standard:</span>
                <span className="font-mono font-medium">{selectedIngredient.gramsPerCup} g per 1 US Cup</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>US Standard Cup Volume:</span>
                <span className="font-mono">236.588 mL</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <CalculatorHeaderActions onReset={() => setGrams(250)} resultSummaryText={resultSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
}
