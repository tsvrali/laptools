import { ToolConfig } from '../../types';

export const lcmTool: ToolConfig = {
  slug: 'least-common-multiple-lcm',
  categoryId: 'math',
  title: 'Least Common Multiple (LCM) Calculator - Step-by-Step Prime Factorization',
  metaDescription: 'Free Least Common Multiple (LCM) calculator. Compute the lowest common multiple of 2 or more numbers with step-by-step prime factor trees, Venn matching, and GCD duality.',
  h1: 'Least Common Multiple (LCM) Calculator',
  primaryKeyword: 'least common multiple calculator',
  supportingKeywords: [
    'lcm calculator',
    'least common multiple lcm',
    'find lcm',
    'lowest common multiple',
    'lcd calculator',
    'lcm of two numbers',
    'least common denominator',
    'prime factorization lcm'
  ],
  introParagraph: 'Calculate the Least Common Multiple (LCM)—also known as the Lowest Common Multiple or Least Common Denominator (LCD)—for any list of two or more positive integers. Featuring instant prime factor decomposition and step-by-step mathematical proofs, discover the smallest positive integer divisible by all input numbers.',
  howToSteps: [
    'Enter two or more positive integers separated by commas or spaces.',
    'The calculator analyzes the dataset and decomposes each integer into its prime factors.',
    'Review the Least Common Multiple (LCM) in the bold results card.',
    'Examine the prime factor breakdown table illustrating maximum exponent matching.'
  ],
  formulaTitle: 'Prime Factorization & GCD Duality',
  formulaDisplay: 'LCM(a, b) = (|a · b|) / GCD(a, b) | LCM(a, b, c) = ∏ pᵢ^(max(kᵢ))',
  formulaExplanation: 'The least common multiple is obtained by taking the highest power of each prime factor present in any of the numbers. For two numbers, LCM equals their product divided by their greatest common divisor (GCD).',
  assumptions: ['Positive non-zero integers (natural numbers).'],
  workedExample: {
    scenario: 'Find the Least Common Multiple (LCM) of 12, 18, and 24.',
    steps: [
      { step: 'Prime Factorize 12', detail: '12 = 2² × 3¹' },
      { step: 'Prime Factorize 18', detail: '18 = 2¹ × 3²' },
      { step: 'Prime Factorize 24', detail: '24 = 2³ × 3¹' },
      { step: 'Identify Highest Powers of Prime Factors', detail: 'Max power of 2 is 2³ (8); Max power of 3 is 3² (9).' },
      { step: 'Multiply Highest Powers Together', detail: 'LCM = 2³ × 3² = 8 × 9 = 72.' }
    ],
    resultSummary: 'LCM(12, 18, 24) = 72. 72 is the smallest integer divisible by 12, 18, and 24.'
  },
  quickRefTable: {
    headers: ['Integer Set', 'Prime Factorization', 'LCM Result', 'Common Practical Use'],
    rows: [
      ['4, 6', '4 = 2², 6 = 2×3', '12', 'Adding 1/4 + 1/6 (LCD = 12)'],
      ['8, 12', '8 = 2³, 12 = 2²×3', '24', 'Adding 1/8 + 1/12 (LCD = 24)'],
      ['12, 18, 24', '2³ × 3²', '72', 'Gear rotation synchronization'],
      ['15, 20, 30', '2² × 3 × 5', '60', 'Event scheduling overlap'],
      ['16, 24, 40', '2⁴ × 3 × 5', '240', 'Manufacturing lot sizing']
    ]
  },
  practicalTips: [
    'When adding or subtracting fractions with different denominators, the Least Common Denominator (LCD) is identical to the LCM of the denominators.',
    'If two numbers are prime (e.g. 7 and 13) or coprime (GCD = 1), their LCM is simply their product (7 × 13 = 91).'
  ],
  commonMistakes: [
    'Simply multiplying all numbers together. While the product is a common multiple, it is rarely the *least* common multiple (e.g., 12 × 18 × 24 = 5,184, whereas the true LCM is only 72!).',
    'Entering zero or negative numbers. LCM is conventionally defined on positive natural numbers.'
  ],
  faqs: [
    { question: 'What is the difference between LCM and GCD?', answer: 'GCD (Greatest Common Divisor) is the largest integer that divides evenly into all numbers in the set. LCM (Least Common Multiple) is the smallest integer that is a multiple of all numbers in the set. GCD is always smaller than or equal to the numbers, whereas LCM is always greater than or equal to them.' },
    { question: 'What is the relationship between LCM and GCD?', answer: 'For any two positive integers a and b: a × b = LCM(a, b) × GCD(a, b). This means LCM(a, b) = (a × b) / GCD(a, b).' },
    { question: 'Why is LCM important in everyday math?', answer: 'LCM is essential for finding the lowest common denominator when adding or subtracting fractions, calculating periodic synchronization in astronomy and mechanical gears, and scheduling recurring cycles.' }
  ],
  relatedToolSlugs: ['greatest-common-divisor-gcd', 'mean-median-mode-calculator', 'fraction-calculator', 'ratio-calculator'],
  sources: [
    { title: 'NIST Digital Library of Mathematical Functions - Elementary Number Theory', url: 'https://dlmf.nist.gov', org: 'NIST' },
    { title: 'Khan Academy - Least Common Multiple', url: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-factors-and-multiples', org: 'Khan Academy' }
  ],
  schemaCategory: 'UtilitiesApplication',
  lastUpdated: 'October 15, 2026',
  reviewedBy: 'LapTools Quantitative Review Board'
};
