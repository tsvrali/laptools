export type CategoryId =
  | 'financial'
  | 'tax-and-income'
  | 'business-and-ecommerce'
  | 'currency'
  | 'conversions'
  | 'home-and-diy'
  | 'math'
  | 'health-and-fitness';

export interface CategoryMeta {
  id: CategoryId;
  name: string;
  slug: string;
  shortDesc: string;
  intro: string;
  accentColor: string;
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface QuickRefRow {
  label: string;
  value: string;
  note?: string;
}

export interface WorkedStep {
  step: string;
  detail: string;
}

export interface ToolConfig {
  slug: string;
  categoryId: CategoryId;
  title: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  introParagraph: string;
  howToSteps: string[];
  formulaTitle: string;
  formulaDisplay: string;
  formulaExplanation: string;
  assumptions: string[];
  workedExample: {
    scenario: string;
    steps: WorkedStep[];
    resultSummary: string;
  };
  quickRefTable: {
    headers: string[];
    rows: string[][];
  };
  practicalTips: string[];
  commonMistakes: string[];
  faqs: FAQItem[];
  relatedToolSlugs: string[];
  sources: { title: string; url: string; org: string }[];
  schemaCategory: 'FinanceApplication' | 'UtilitiesApplication' | 'HealthApplication' | 'EducationalApplication';
  lastUpdated: string;
  reviewedBy: string;
}

export interface CurrencyPair {
  slug: string;
  base: string;
  quote: string;
  baseName: string;
  quoteName: string;
  rate: number;
  inverseRate: number;
  symbol: string;
  historical30Days: number[];
  notes: string;
  feeComparison: {
    provider: string;
    fee: string;
    exchangeRateMargin: string;
    recipientGets: string;
  }[];
}
