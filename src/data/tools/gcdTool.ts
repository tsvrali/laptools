import { ToolConfig } from '../../types';

export const gcdTool: ToolConfig = {
  slug: 'greatest-common-divisor-gcd',
  categoryId: 'math',
  title: 'Greatest Common Divisor (GCD) Calculator - Euclidean Algorithm Steps',
  metaDescription: 'Free Greatest Common Divisor (GCD) calculator. Calculate the greatest common divisor or greatest common factor (GCF/HCF) with step-by-step Euclidean division.',
  h1: 'Greatest Common Divisor (GCD) Calculator',
  primaryKeyword: 'greatest common divisor calculator',
  supportingKeywords: [
    'gcd calculator',
    'greatest common divisor gcd',
    'greatest common factor',
    'gcf calculator',
    'highest common factor',
    'hcf calculator',
    'euclidean algorithm calculator',
    'find gcd of numbers'
  ],
  introParagraph: 'Calculate the Greatest Common Divisor (GCD)—also known as the Greatest Common Factor (GCF) or Highest Common Factor (HCF)—for any list of two or more integers. Featuring Euclidean remainder division and complete divisor lists, discover the largest positive integer that divides all input values without remainder.',
  howToSteps: [
    'Enter two or more positive integers separated by commas or spaces.',
    'The calculator calculates the greatest common divisor using the Euclidean algorithm.',
    'Review the calculated GCD and list of all shared common divisors.',
    'Examine the step-by-step Euclidean quotient and remainder table.'
  ],
  formulaTitle: 'Euclidean Remainder Division Algorithm',
  formulaDisplay: 'GCD(a, b) = GCD(b, a mod b) until (a mod b) = 0',
  formulaExplanation: 'The Euclidean algorithm computes the greatest common divisor of two integers by repeatedly replacing the larger number by the remainder of dividing the larger by the smaller until the remainder reaches zero. The last non-zero remainder is the GCD.',
  assumptions: ['Positive non-zero integers.'],
  workedExample: {
    scenario: 'Find the Greatest Common Divisor (GCD) of 48 and 72.',
    steps: [
      { step: 'Step 1: Divide 72 by 48', detail: '72 = 48 × 1 + 24 (remainder = 24)' },
      { step: 'Step 2: Divide 48 by 24', detail: '48 = 24 × 2 + 0 (remainder = 0)' },
      { step: 'Identify Last Non-Zero Remainder', detail: 'The last non-zero remainder is 24.' }
    ],
    resultSummary: 'GCD(48, 72) = 24. Shared divisors: 1, 2, 3, 4, 6, 8, 12, 24.'
  },
  quickRefTable: {
    headers: ['Integer Pair', 'All Common Factors', 'GCD Result', 'Reduced Ratio Form'],
    rows: [
      ['12, 18', '1, 2, 3, 6', '6', '2 : 3'],
      ['24, 36', '1, 2, 3, 4, 6, 12', '12', '2 : 3'],
      ['48, 72', '1, 2, 3, 4, 6, 8, 12, 24', '24', '2 : 3'],
      ['60, 90', '1, 2, 3, 5, 6, 10, 15, 30', '30', '2 : 3'],
      ['100, 250', '1, 2, 5, 10, 25, 50', '50', '2 : 5']
    ]
  },
  practicalTips: [
    'To reduce any fraction to simplest terms, divide both the numerator and the denominator by their GCD.',
    'If GCD(a, b) = 1, the integers are considered coprime (mutually prime).'
  ],
  commonMistakes: [
    'Stopping factorization prematurely before finding the greatest divisor.',
    'Confusing GCD with LCM. GCD is always less than or equal to the smallest number in the input list.'
  ],
  faqs: [
    { question: 'What is the difference between GCD and GCF?', answer: 'They are two names for the exact same mathematical concept. "Greatest Common Divisor" (GCD) is the standard terminology in mathematics and computer science, while "Greatest Common Factor" (GCF) is common in school algebra.' },
    { question: 'How does the Euclidean algorithm work?', answer: 'It is based on the theorem that the GCD of two numbers divides their difference. By repeatedly taking remainders (modulo operation), it rapidly reduces the numbers to their greatest common factor in logarithmic time.' },
    { question: 'Can GCD be calculated for negative numbers?', answer: 'Yes, divisors are considered positive by convention, so GCD(-48, 72) = 24.' }
  ],
  relatedToolSlugs: ['least-common-multiple-lcm', 'mean-median-mode-calculator', 'fraction-calculator', 'ratio-calculator'],
  sources: [
    { title: 'Wolfram MathWorld - Greatest Common Divisor', url: 'https://mathworld.wolfram.com/GreatestCommonDivisor.html', org: 'Wolfram' }
  ],
  schemaCategory: 'UtilitiesApplication',
  lastUpdated: 'October 15, 2026',
  reviewedBy: 'LapTools Quantitative Review Board'
};
