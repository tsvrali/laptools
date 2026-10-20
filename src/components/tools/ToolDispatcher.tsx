import { MortgageCalculator } from './MortgageCalculator';
import { CreditCardPayoffCalculator } from './CreditCardPayoffCalculator';
import { DebtStrategyCalculator } from './DebtStrategyCalculator';
import { PaycheckCalculator } from './PaycheckCalculator';
import {
  SelfEmploymentTaxCalculator,
  W2Vs1099Calculator,
  FreelanceRateCalculator
} from './TaxAndIncomeCalculators';
import {
  EbayFeeCalculator,
  ProcessorFeeCalculator,
  BreakEvenCalculator,
  MarkupMarginCalculator,
  ProfitMarginCalculator
} from './BusinessCalculators';
import { CurrencyCalculator } from './CurrencyCalculator';
import { KmToMilesCalculator, GramsToCupsCalculator } from './ConversionCalculators';
import {
  FabricYardageCalculator,
  PercentageCalculator,
  AverageCalculator,
  TDEECalculator,
  ProteinIntakeCalculator,
  BodyFatCalculator
} from './OtherCalculators';
import {
  LCMCalculator,
  GCFCalculator,
  MeanCalculator,
  ScientificCalculator,
  ComplexNumberCalculator,
  AspectRatioCalculator,
  RatioCalculator,
  FractionCalculator
} from './MathTools';

interface ToolDispatcherProps {
  slug: string;
  onNavigate?: (path: string) => void;
}

export function ToolDispatcher({ slug, onNavigate }: ToolDispatcherProps) {
  switch (slug) {
    case 'simple-mortgage-calculator':
      return <MortgageCalculator />;
    case 'credit-card-payoff-calculator':
      return <CreditCardPayoffCalculator />;
    case 'debt-avalanche-calculator':
      return <DebtStrategyCalculator initialStrategy="avalanche" onNavigate={onNavigate} />;
    case 'debt-snowball-calculator':
      return <DebtStrategyCalculator initialStrategy="snowball" onNavigate={onNavigate} />;
    case 'take-home-pay-calculator':
      return <PaycheckCalculator />;
    case 'self-employment-tax-calculator':
      return <SelfEmploymentTaxCalculator />;
    case '1099-vs-w2-calculator':
      return <W2Vs1099Calculator />;
    case 'freelance-rate-calculator':
      return <FreelanceRateCalculator />;
    case 'ebay-fee-calculator':
      return <EbayFeeCalculator />;
    case 'stripe-fee-calculator':
      return <ProcessorFeeCalculator platform="stripe" />;
    case 'paypal-fee-calculator':
      return <ProcessorFeeCalculator platform="paypal" />;
    case 'break-even-calculator':
      return <BreakEvenCalculator />;
    case 'markup-vs-margin-calculator':
      return <MarkupMarginCalculator />;
    case 'profit-margin-calculator':
      return <ProfitMarginCalculator />;
    case 'usd-to-php':
    case 'usd-to-rmb':
    case 'usd-to-mxn':
    case 'inr-to-usd':
    case 'gbp-to-usd':
    case 'usd-to-cad':
      return <CurrencyCalculator dedicatedSlug={slug} />;
    case 'km-to-miles':
      return <KmToMilesCalculator />;
    case 'grams-to-cups-converter':
      return <GramsToCupsCalculator />;
    case 'fabric-yardage-calculator':
      return <FabricYardageCalculator />;
    case 'percentage-calculator':
      return <PercentageCalculator />;
    case 'average-calculator':
      return <AverageCalculator />;
    case 'mean-calculator':
      return <MeanCalculator />;
    case 'lcm-calculator':
      return <LCMCalculator />;
    case 'gcf-calculator':
      return <GCFCalculator />;
    case 'scientific-calculator':
    case 'most-advanced-scientific-calculator':
      return <ScientificCalculator />;
    case 'complex-number-calculator':
    case 'complex-number-calculator-with-steps':
      return <ComplexNumberCalculator />;
    case 'aspect-ratio-calculator':
      return <AspectRatioCalculator />;
    case 'ratio-calculator':
      return <RatioCalculator />;
    case 'fraction-calculator':
      return <FractionCalculator initialTab="arithmetic" />;
    case 'decimal-to-fraction-calculator':
      return <FractionCalculator initialTab="decimal" />;
    case 'mixed-fraction-calculator':
      return <FractionCalculator initialTab="mixed" />;
    case 'improper-fraction-calculator':
      return <FractionCalculator initialTab="improper" />;
    case 'casio-fx-55-plus-fraction-calculator':
      return <FractionCalculator initialTab="casio" />;
    case 'tdee-calculator':
      return <TDEECalculator />;
    case 'protein-intake-calculator':
      return <ProteinIntakeCalculator />;
    case 'body-fat-calculator':
      return <BodyFatCalculator />;
    default:
      return (
        <div className="p-8 text-center bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500">Calculator widget is loading...</p>
        </div>
      );
  }
}
