export interface TaxBracket {
  rate: number;
  min: number;
  max: number;
}

export const federalBrackets2026: Record<'single' | 'married' | 'headOfHousehold', TaxBracket[]> = {
  single: [
    { rate: 0.10, min: 0, max: 11925 },
    { rate: 0.12, min: 11925, max: 48475 },
    { rate: 0.22, min: 48475, max: 103350 },
    { rate: 0.24, min: 103350, max: 197300 },
    { rate: 0.32, min: 197300, max: 250525 },
    { rate: 0.35, min: 250525, max: 626350 },
    { rate: 0.37, min: 626350, max: Infinity }
  ],
  married: [
    { rate: 0.10, min: 0, max: 23850 },
    { rate: 0.12, min: 23850, max: 96950 },
    { rate: 0.22, min: 96950, max: 206700 },
    { rate: 0.24, min: 206700, max: 394600 },
    { rate: 0.32, min: 394600, max: 501050 },
    { rate: 0.35, min: 501050, max: 751600 },
    { rate: 0.37, min: 751600, max: Infinity }
  ],
  headOfHousehold: [
    { rate: 0.10, min: 0, max: 17000 },
    { rate: 0.12, min: 17000, max: 64850 },
    { rate: 0.22, min: 64850, max: 103350 },
    { rate: 0.24, min: 103350, max: 197300 },
    { rate: 0.32, min: 197300, max: 250500 },
    { rate: 0.35, min: 250500, max: 626350 },
    { rate: 0.37, min: 626350, max: Infinity }
  ]
};

export const standardDeductions2026 = {
  single: 15000,
  married: 30000,
  headOfHousehold: 22500
};

export const ficaParameters2026 = {
  socialSecurityWageBase: 176100, // Projected 2026 wage base
  socialSecurityEmployeeRate: 0.062,
  socialSecurityEmployerRate: 0.062,
  socialSecuritySelfEmployedRate: 0.124,
  medicareRate: 0.0145,
  medicareSelfEmployedRate: 0.029,
  additionalMedicareRate: 0.009,
  additionalMedicareThresholdSingle: 200000,
  additionalMedicareThresholdMarried: 250000,
  seEarningsDeductionMultiplier: 0.9235 // Schedule SE Net earnings factor
};

export const stateTaxRates: { code: string; name: string; effectiveRate: number }[] = [
  { code: 'NONE', name: 'No State Income Tax (AK, FL, NV, NH, SD, TN, TX, WA, WY)', effectiveRate: 0.0 },
  { code: 'US_AVG', name: 'US National Average (~4.5%)', effectiveRate: 0.045 },
  { code: 'CA', name: 'California (Avg ~6.5%)', effectiveRate: 0.065 },
  { code: 'NY', name: 'New York (Avg ~5.85%)', effectiveRate: 0.0585 },
  { code: 'IL', name: 'Illinois (Flat 4.95%)', effectiveRate: 0.0495 },
  { code: 'PA', name: 'Pennsylvania (Flat 3.07%)', effectiveRate: 0.0307 },
  { code: 'MA', name: 'Massachusetts (Flat 5.0%)', effectiveRate: 0.050 },
  { code: 'NC', name: 'North Carolina (Flat 4.5%)', effectiveRate: 0.045 },
  { code: 'GA', name: 'Georgia (Flat 5.39%)', effectiveRate: 0.0539 },
  { code: 'OH', name: 'Ohio (Avg ~3.2%)', effectiveRate: 0.032 },
  { code: 'MI', name: 'Michigan (Flat 4.25%)', effectiveRate: 0.0425 },
  { code: 'CO', name: 'Colorado (Flat 4.40%)', effectiveRate: 0.044 },
  { code: 'AZ', name: 'Arizona (Flat 2.50%)', effectiveRate: 0.025 }
];
