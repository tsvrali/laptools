import { ToolConfig } from '../../types';

export const meanMedianModeTool: ToolConfig = {
  slug: 'mean-median-mode-calculator',
  categoryId: 'math',
  title: 'Mean, Median, Mode Calculator - Complete Central Tendency & Dispersion',
  metaDescription: 'Free Mean, Median, Mode calculator. Calculate arithmetic mean (x̄), median, mode, range, and standard deviation with step-by-step descriptive statistics.',
  h1: 'Mean, Median, Mode Calculator',
  primaryKeyword: 'mean median mode calculator',
  supportingKeywords: [
    'find mean median mode',
    'mean calculator',
    'median calculator',
    'mode calculator',
    'average mean median mode',
    'descriptive statistics calculator',
    'standard deviation calculator',
    'range calculator'
  ],
  introParagraph: 'Calculate the three fundamental measures of central tendency—Mean, Median, and Mode—along with essential measures of dispersion (Range, Sample Variance, and Standard Deviation). Featuring full sorted distribution lists and step-by-step arithmetic, explore how data points cluster and spread.',
  howToSteps: [
    'Enter your data set into the text area separated by commas, spaces, or line breaks.',
    'The calculator automatically parses numbers, sorts the distribution, and counts frequencies.',
    'Review the three highlighted headline cards: Mean, Median, and Mode.',
    'Examine the step-by-step calculation breakdown for each measure below.'
  ],
  formulaTitle: 'Formulas for Central Tendency & Spread',
  formulaDisplay: 'Mean: x̄ = (∑xᵢ) / n | Median: Midpoint of sorted x | Mode: argmax(Frequency)',
  formulaExplanation: 'Mean is the sum of all values divided by count n. Median is the middle observation in a sorted dataset (or the average of two middle values if n is even). Mode is the value(s) appearing with the greatest frequency.',
  assumptions: ['Standard real numbers.'],
  workedExample: {
    scenario: 'Calculate the Mean, Median, and Mode for the dataset: 3, 7, 5, 13, 20, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29.',
    steps: [
      { step: 'Count Observations (n)', detail: 'n = 15 numbers in the dataset.' },
      { step: 'Sort the Dataset', detail: 'Sorted: [3, 5, 7, 12, 13, 14, 20, 23, 23, 23, 23, 29, 39, 40, 56].' },
      { step: 'Calculate Mean (x̄)', detail: 'Sum = 330. Mean = 330 / 15 = 22.0.' },
      { step: 'Determine Median', detail: 'Middle 8th item of 15 sorted numbers is 23.' },
      { step: 'Identify Mode', detail: '23 occurs 4 times (more than any other number). Mode = 23.' }
    ],
    resultSummary: 'Mean = 22.0, Median = 23, Mode = 23. Range = 53 (56 - 3).'
  },
  quickRefTable: {
    headers: ['Statistical Measure', 'Mathematical Meaning', 'Best Used When', 'Sensitivity to Outliers'],
    rows: [
      ['Mean (Average)', 'Balance center point of all values', 'Data is symmetrical / normal', 'High (pulled by extreme outliers)'],
      ['Median', '50th percentile (exact middle)', 'Data is skewed (income, housing)', 'Low (resistant to outliers)'],
      ['Mode', 'Most frequently occurring value', 'Categorical or discrete data', 'None (unaffected by other numbers)'],
      ['Range', 'Spread between max and min', 'Quick measure of data span', 'Extremely high (based on extremes)'],
      ['Standard Deviation', 'Average distance from mean', 'Measuring consistency / volatility', 'Moderate to High']
    ]
  },
  practicalTips: [
    'For skewed data like home prices and household salaries, the Median is a much more realistic representation of "typical" than the Mean, because billionaire salaries distort the arithmetic mean upward.',
    'A dataset can be unimodal (one mode), bimodal (two modes), multimodal (three or more modes), or have no mode (if all values occur with equal frequency).'
  ],
  commonMistakes: [
    'Forgetting to sort the numbers in ascending order before finding the median.',
    'When n is even, failing to take the average of the two middle numbers for the median.'
  ],
  faqs: [
    { question: 'When are Mean, Median, and Mode equal?', answer: 'In a perfectly symmetrical, bell-shaped normal distribution, the Mean, Median, and Mode are exactly identical and sit at the center peak.' },
    { question: 'Can a dataset have more than one mode?', answer: 'Yes. If two different numbers tie for the highest frequency, the dataset is bimodal. If three or more tie, it is multimodal.' },
    { question: 'Why is standard deviation important alongside the mean?', answer: 'Two datasets can have the exact same mean (e.g. 50) while one has values clustered tightly [49, 50, 51] (low standard deviation) and the other has extreme dispersion [0, 50, 100] (high standard deviation).' }
  ],
  relatedToolSlugs: ['least-common-multiple-lcm', 'greatest-common-divisor-gcd', 'fraction-calculator', 'percentage-calculator'],
  sources: [
    { title: 'NIST/SEMATECH e-Handbook of Statistical Methods - Measures of Central Tendency', url: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda35b.htm', org: 'NIST' },
    { title: 'Khan Academy - Mean, Median, and Mode', url: 'https://www.khanacademy.org/math/statistics-probability/summarizing-quantitative-data', org: 'Khan Academy' }
  ],
  schemaCategory: 'UtilitiesApplication',
  lastUpdated: 'October 15, 2026',
  reviewedBy: 'LapTools Quantitative Review Board'
};
