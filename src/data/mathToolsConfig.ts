import { ToolConfig } from '../types';

export const mathToolsConfig: Record<string, ToolConfig> = {
  // 1. LCM Calculator
  'lcm-calculator': {
    slug: 'lcm-calculator',
    categoryId: 'math',
    title: 'LCM Calculator - Least Common Multiple with Prime Factorization',
    metaDescription: 'Free online LCM calculator. Find the least common multiple of two or more numbers with prime factorization steps, Venn diagrams, and division methods.',
    h1: 'LCM Calculator (Least Common Multiple)',
    primaryKeyword: 'lcm calculator',
    supportingKeywords: [
      'least common multiple calculator',
      'lcm of two numbers',
      'lcm finder',
      'lcd calculator',
      'lowest common multiple',
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
      scenario: 'Find the LCM of 12, 18, and 24.',
      steps: [
        { step: 'Prime Factorize 12', detail: '12 = 2² × 3¹' },
        { step: 'Prime Factorize 18', detail: '18 = 2¹ × 3²' },
        { step: 'Prime Factorize 24', detail: '24 = 2³ × 3¹' },
        { step: 'Take Highest Exponent for Each Prime', detail: 'Max power of 2 is 2³ (8); Max power of 3 is 3² (9).' },
        { step: 'Multiply Highest Powers', detail: 'LCM = 2³ × 3² = 8 × 9 = 72.' }
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
      { question: 'What is the difference between LCM and GCF?', answer: 'GCF (Greatest Common Factor) is the largest integer that divides evenly into all numbers in the set. LCM (Least Common Multiple) is the smallest integer that is a multiple of all numbers in the set. GCF is always smaller than or equal to the numbers, whereas LCM is always greater than or equal to them.' },
      { question: 'What is the relationship between LCM and GCD?', answer: 'For any two positive integers a and b: a × b = LCM(a, b) × GCD(a, b). This means LCM(a, b) = (a × b) / GCD(a, b).' },
      { question: 'Why is LCM important in everyday math?', answer: 'LCM is essential for finding the lowest common denominator when adding or subtracting fractions, calculating periodic synchronization in astronomy and mechanical gears, and scheduling recurring cycles.' }
    ],
    relatedToolSlugs: ['gcf-calculator', 'fraction-calculator', 'ratio-calculator', 'average-calculator'],
    sources: [
      { title: 'NIST Digital Library of Mathematical Functions - Elementary Number Theory', url: 'https://dlmf.nist.gov', org: 'NIST' },
      { title: 'Khan Academy - Least Common Multiple', url: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-factors-and-multiples', org: 'Khan Academy' }
    ],
    schemaCategory: 'UtilitiesApplication',
    lastUpdated: 'October 15, 2026',
    reviewedBy: 'LapTools Quantitative Review Board'
  },

  // 2. GCF Calculator
  'gcf-calculator': {
    slug: 'gcf-calculator',
    categoryId: 'math',
    title: 'GCF Calculator - Greatest Common Factor & Divisor (Euclidean Method)',
    metaDescription: 'Free online GCF calculator. Find the greatest common factor (GCF/GCD/HCF) of two or more numbers with step-by-step Euclidean division and factoring.',
    h1: 'GCF Calculator (Greatest Common Factor)',
    primaryKeyword: 'gcf calculator',
    supportingKeywords: [
      'greatest common factor calculator',
      'gcd calculator',
      'greatest common divisor',
      'highest common factor',
      'hcf calculator',
      'euclidean algorithm calculator',
      'factor tree calculator'
    ],
    introParagraph: 'Find the Greatest Common Factor (GCF)—also referred to as the Greatest Common Divisor (GCD) or Highest Common Factor (HCF)—for any set of numbers. Utilizing Euclidean remainder division and complete divisor indexing, discover the largest integer that divides every number evenly without a remainder.',
    howToSteps: [
      'Enter two or more positive integers separated by commas or spaces.',
      'The calculator computes all individual integer factors and applies the Euclidean algorithm.',
      'Review the greatest common factor and the complete list of shared divisors.',
      'Copy the result or use it to reduce algebraic fractions.'
    ],
    formulaTitle: 'Euclidean Division Algorithm',
    formulaDisplay: 'GCD(a, b) = GCD(b, a mod b) until (a mod b) = 0',
    formulaExplanation: 'The Euclidean algorithm computes the greatest common divisor of two integers by repeatedly replacing the larger number by the remainder of dividing the larger by the smaller until the remainder reaches zero.',
    assumptions: ['Positive integers.'],
    workedExample: {
      scenario: 'Find the GCF of 48 and 72.',
      steps: [
        { step: 'Step 1: Divide 72 by 48', detail: '72 = 48 × 1 + 24 (remainder = 24)' },
        { step: 'Step 2: Divide 48 by 24', detail: '48 = 24 × 2 + 0 (remainder = 0)' },
        { step: 'Identify Last Non-Zero Remainder', detail: 'The last non-zero remainder is 24.' }
      ],
      resultSummary: 'GCF(48, 72) = 24. Shared divisors: 1, 2, 3, 4, 6, 8, 12, 24.'
    },
    quickRefTable: {
      headers: ['Integer Pair', 'All Common Factors', 'GCF Result', 'Reduced Ratio Form'],
      rows: [
        ['12, 18', '1, 2, 3, 6', '6', '2 : 3'],
        ['24, 36', '1, 2, 3, 4, 6, 12', '12', '2 : 3'],
        ['48, 72', '1, 2, 3, 4, 6, 8, 12, 24', '24', '2 : 3'],
        ['60, 90', '1, 2, 3, 5, 6, 10, 15, 30', '30', '2 : 3'],
        ['100, 250', '1, 2, 5, 10, 25, 50', '50', '2 : 5']
      ]
    },
    practicalTips: [
      'To simplify any fraction to lowest terms, divide both the numerator and denominator by their GCF in one single step.',
      'If the GCF of two numbers is 1, they are called "coprime" or "relatively prime" (e.g., 9 and 25).'
    ],
    commonMistakes: [
      'Confusing GCF with LCM. GCF is always less than or equal to the smallest number in the input list.',
      'Stopping factorization before finding the *greatest* divisor (e.g. noting that 48 and 72 both divide by 6, but missing the larger factor 24).'
    ],
    faqs: [
      { question: 'What is the Euclidean algorithm?', answer: 'The Euclidean algorithm is an ancient, highly efficient method for computing the greatest common divisor of two integers. It is based on the principle that the greatest common divisor of two numbers does not change if the larger number is replaced by its difference with the smaller number.' },
      { question: 'Can GCF be calculated for three or more numbers?', answer: 'Yes. GCF(a, b, c) is calculated associatively as GCF(GCF(a, b), c).' },
      { question: 'How is GCF used in real life?', answer: 'GCF is used when tiling floors evenly without cutting tiles, dividing group supplies equally without leftovers, and factoring polynomials in algebra.' }
    ],
    relatedToolSlugs: ['lcm-calculator', 'fraction-calculator', 'ratio-calculator', 'percentage-calculator'],
    sources: [
      { title: 'Wolfram MathWorld - Greatest Common Divisor', url: 'https://mathworld.wolfram.com/GreatestCommonDivisor.html', org: 'Wolfram' }
    ],
    schemaCategory: 'UtilitiesApplication',
    lastUpdated: 'October 15, 2026',
    reviewedBy: 'LapTools Quantitative Review Board'
  },

  // 3. Mean Calculator
  'mean-calculator': {
    slug: 'mean-calculator',
    categoryId: 'math',
    title: 'Mean Calculator - Arithmetic, Geometric, Harmonic & Weighted Mean',
    metaDescription: 'Free online mean calculator. Calculate arithmetic mean (x̄), geometric mean, harmonic mean, weighted mean, and trimmed mean with step-by-step arithmetic.',
    h1: 'Mean Calculator',
    primaryKeyword: 'mean calculator',
    supportingKeywords: [
      'calculate mean',
      'arithmetic mean calculator',
      'geometric mean calculator',
      'harmonic mean calculator',
      'weighted mean calculator',
      'mean median mode calculator',
      'average calculator',
      'sample mean'
    ],
    introParagraph: 'Calculate all standard statistical measures of central tendency with our comprehensive Mean Calculator. Compute the arithmetic mean (x̄), geometric mean for compounding growth rates, harmonic mean for rates and ratios, weighted mean for course grades, and trimmed mean for outlier removal with step-by-step arithmetic.',
    howToSteps: [
      'Enter your dataset separated by commas, spaces, or line breaks.',
      'Optionally enable "Weighted Mean Mode" to enter matching weights.',
      'Review the Arithmetic Mean prominently displayed in the summary card.',
      'Analyze the secondary metrics including Geometric Mean, Harmonic Mean, Median, and Sample Standard Deviation.'
    ],
    formulaTitle: 'Formulas for Statistical Means',
    formulaDisplay: 'Arithmetic: x̄ = (∑xᵢ) / n | Geometric: G = (∏xᵢ)^(1/n) | Harmonic: H = n / ∑(1/xᵢ)',
    formulaExplanation: 'The arithmetic mean sums all observations and divides by count n. The geometric mean computes the nth root of the product. The harmonic mean computes the reciprocal of the arithmetic mean of reciprocals.',
    assumptions: ['Standard base-10 real numbers.'],
    workedExample: {
      scenario: 'Find the arithmetic, geometric, and harmonic mean of 4, 8, and 16.',
      steps: [
        { step: 'Count Observations (n)', detail: 'n = 3 values.' },
        { step: 'Compute Arithmetic Mean', detail: '(4 + 8 + 16) / 3 = 28 / 3 = 9.3333' },
        { step: 'Compute Geometric Mean', detail: '∛(4 × 8 × 16) = ∛512 = 8.0000' },
        { step: 'Compute Harmonic Mean', detail: '3 / (1/4 + 1/8 + 1/16) = 3 / (4/16 + 2/16 + 1/16) = 3 / (7/16) = 48/7 = 6.8571' }
      ],
      resultSummary: 'Arithmetic Mean = 9.33, Geometric Mean = 8.00, Harmonic Mean = 6.86. Notice that Harmonic ≤ Geometric ≤ Arithmetic (AM-GM-HM inequality).'
    },
    quickRefTable: {
      headers: ['Type of Mean', 'Mathematical Formula', 'Best Use Case', 'Key Property'],
      rows: [
        ['Arithmetic Mean', '∑x / n', 'Standard data without heavy skew', 'Most widely used average'],
        ['Geometric Mean', '(∏x)^(1/n)', 'Investment returns, biological growth', 'Never distorted by extreme high values'],
        ['Harmonic Mean', 'n / ∑(1/x)', 'Speeds (mph), price-to-earnings (P/E)', 'Mitigates large outliers in rates'],
        ['Weighted Mean', '∑(w·x) / ∑w', 'Course GPAs, portfolio asset weights', 'Accounts for varying importance'],
        ['Trimmed Mean', 'Trim top & bottom k%', 'Judged sports, economic indexes', 'Robust against rogue outliers']
      ]
    },
    practicalTips: [
      'AM-GM-HM Inequality: For any set of positive numbers, Harmonic Mean ≤ Geometric Mean ≤ Arithmetic Mean, with equality holding if and only if all numbers in the set are identical.',
      'Use Geometric Mean rather than Arithmetic Mean when calculating multi-year stock market returns or inflation rates.'
    ],
    commonMistakes: [
      'Using the arithmetic mean to average speeds over the same distance. For example, driving 60 mph out and 30 mph back averages 40 mph (harmonic mean), NOT 45 mph!',
      'Trying to compute geometric mean on data containing negative numbers.'
    ],
    faqs: [
      { question: 'What is the difference between mean and median?', answer: 'The mean is the mathematical average obtained by summing all values and dividing by the count. The median is the middle value when the data is sorted. The median is resistant to extreme outliers, while the mean is pulled towards outliers.' },
      { question: 'When should I use weighted mean?', answer: 'Use weighted mean whenever different observations carry different significance—such as college courses where a 4-credit course counts twice as much as a 2-credit course.' },
      { question: 'Why does the arithmetic average fail for average speed?', answer: 'Because speed is distance divided by time. Driving the same distance at a slower speed takes more time, weighting the slower speed more heavily.' }
    ],
    relatedToolSlugs: ['average-calculator', 'percentage-calculator', 'ratio-calculator', 'scientific-calculator'],
    sources: [
      { title: 'NIST/SEMATECH e-Handbook of Statistical Methods - Measures of Location', url: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda35b.htm', org: 'NIST' }
    ],
    schemaCategory: 'UtilitiesApplication',
    lastUpdated: 'October 15, 2026',
    reviewedBy: 'LapTools Quantitative Review Board'
  },

  // 4. Scientific Calculator & Most Advanced Scientific
  'scientific-calculator': {
    slug: 'scientific-calculator',
    categoryId: 'math',
    title: 'Scientific Calculator - Online Advanced Engineering & Math Solver',
    metaDescription: 'Free online scientific calculator with advanced engineering functions: trigonometry (sin, cos, tan), logarithms (log, ln), hyperbolic, factorials, roots, and history.',
    h1: 'Scientific Calculator (Advanced Engineering & Math)',
    primaryKeyword: 'scientific calculator',
    supportingKeywords: [
      'most advanced scientific calculator',
      'online scientific calculator',
      'scientific notation calculator',
      'engineering calculator',
      'trigonometry calculator',
      'logarithm calculator',
      'math calculator online'
    ],
    introParagraph: 'An online scientific calculator engineered for students, engineers, and scientists. Features standard arithmetic, trigonometric and inverse functions (in Degrees and Radians), hyperbolic functions, natural and base-10 logarithms, arbitrary exponents, factorials (n!), roots, and an interactive calculation history tape.',
    howToSteps: [
      'Type or click buttons to formulate your mathematical expression.',
      'Toggle between DEG (Degrees) and RAD (Radians) for trigonometric functions.',
      'Click "Switch to Advanced" to access hyperbolic, inverse trigonometric, and reciprocal functions.',
      'Press "=" or enter to evaluate and save calculations to your live history tape.'
    ],
    formulaTitle: 'Order of Operations & Function Library',
    formulaDisplay: 'PEMDAS: Parentheses → Exponents → Multiplication/Division → Addition/Subtraction',
    formulaExplanation: 'All calculations evaluate with strict mathematical operator precedence (PEMDAS) and IEEE-754 double precision floating point floating point arithmetic.',
    assumptions: ['Standard real mathematical evaluation.'],
    workedExample: {
      scenario: 'Calculate sin(30°) + √(16) × 2³.',
      steps: [
        { step: 'Evaluate sin(30°)', detail: 'sin(30°) in degrees = 0.5' },
        { step: 'Evaluate √(16)', detail: '√(16) = 4' },
        { step: 'Evaluate Exponent 2³', detail: '2³ = 8' },
        { step: 'Multiply', detail: '4 × 8 = 32' },
        { step: 'Add', detail: '0.5 + 32 = 32.5' }
      ],
      resultSummary: 'Result = 32.5.'
    },
    quickRefTable: {
      headers: ['Function', 'Syntax', 'Example', 'Evaluated Output'],
      rows: [
        ['Sine (Degrees)', 'sin(x)', 'sin(30)', '0.5'],
        ['Cosine (Radians)', 'cos(x)', 'cos(π)', '-1'],
        ['Natural Logarithm', 'ln(x)', 'ln(e)', '1'],
        ['Factorial', 'n!', '5!', '120'],
        ['Square Root', 'sqrt(x)', 'sqrt(144)', '12']
      ]
    },
    practicalTips: [
      'Always verify whether your angle mode is set to DEG (Degrees) or RAD (Radians) before performing trigonometric calculations in physics or calculus.',
      'Click any previous calculation in the History list to instantly recall and edit it in the display.'
    ],
    commonMistakes: [
      'Forgetting to close parentheses in compound expressions like sqrt(4 + 5 * 2).',
      'Entering angles in degrees while the calculator is in radian mode.'
    ],
    faqs: [
      { question: 'What is the difference between Degrees and Radians?', answer: 'A full circle contains 360 degrees, which is equivalent to 2π radians (~6.28318 rad). Calculus and advanced physics formulas require radian measure.' },
      { question: 'What is Euler’s number e?', answer: 'e is an irrational mathematical constant approximately equal to 2.71828, representing the natural base of continuous compounding growth and logarithms.' },
      { question: 'How do factorials work?', answer: 'The factorial of a non-negative integer n, denoted by n!, is the product of all positive integers less than or equal to n. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120. By convention, 0! = 1.' }
    ],
    relatedToolSlugs: ['complex-number-calculator', 'mean-calculator', 'fraction-calculator', 'percentage-calculator'],
    sources: [
      { title: 'Wolfram MathWorld - Trigonometric Functions', url: 'https://mathworld.wolfram.com/TrigonometricFunctions.html', org: 'Wolfram' }
    ],
    schemaCategory: 'UtilitiesApplication',
    lastUpdated: 'October 15, 2026',
    reviewedBy: 'LapTools Quantitative Review Board'
  },

  // 5. Complex Number Calculator with Steps
  'complex-number-calculator': {
    slug: 'complex-number-calculator',
    categoryId: 'math',
    title: 'Complex Number Calculator with Steps - Rectangular & Polar Form',
    metaDescription: 'Free complex number calculator with step-by-step solutions. Add, subtract, multiply, and divide imaginary numbers (a + bi), find modulus |z|, argument, and polar form.',
    h1: 'Complex Number Calculator with Steps',
    primaryKeyword: 'complex number calculator',
    supportingKeywords: [
      'complex number calculator with steps',
      'imaginary number calculator',
      'complex numbers polar form',
      'complex division with steps',
      'modulus of complex number',
      'complex number conjugate'
    ],
    introParagraph: 'Solve complex number arithmetic with transparent step-by-step mathematical proofs. Add, subtract, multiply, and divide complex numbers of the form (a + bi), compute complex conjugates, evaluate absolute value (modulus |z|), determine the phase angle (argument θ in degrees), and convert between rectangular and polar trigonometric coordinates.',
    howToSteps: [
      'Enter the real (a) and imaginary (b) parts for the first complex number z₁.',
      'Enter the real (c) and imaginary (d) parts for the second complex number z₂.',
      'Choose your desired operation: Addition, Subtraction, Multiplication, or Division.',
      'Review the step-by-step solution, complex conjugate multiplication, modulus, and polar forms.'
    ],
    formulaTitle: 'Algebra of Complex Numbers',
    formulaDisplay: 'Multiplication: (a+bi)(c+di) = (ac-bd) + (ad+bc)i | Division: (z₁·z̄₂) / |z₂|²',
    formulaExplanation: 'Since i² = -1, multiplying two complex numbers combines FOIL expansion with real sign inversion. Division is evaluated by multiplying the numerator and denominator by the complex conjugate of the denominator.',
    assumptions: ['Real components a, b, c, d; i = √(-1).'],
    workedExample: {
      scenario: 'Multiply (3 + 4i) by (1 - 2i).',
      steps: [
        { step: 'FOIL Expansion', detail: '(3 × 1) + (3 × -2i) + (4i × 1) + (4i × -2i) = 3 - 6i + 4i - 8i²' },
        { step: 'Substitute i² = -1', detail: '3 - 2i - 8(-1) = 3 - 2i + 8' },
        { step: 'Combine Real and Imaginary', detail: '(3 + 8) - 2i = 11 - 2i' }
      ],
      resultSummary: '(3 + 4i) × (1 - 2i) = 11 - 2i. Modulus |z₁| = 5.0, |z₂| = 2.24.'
    },
    quickRefTable: {
      headers: ['Operation', 'Formula Rule', 'Example', 'Result'],
      rows: [
        ['Addition', '(a+c) + (b+d)i', '(3+4i) + (1-2i)', '4 + 2i'],
        ['Subtraction', '(a-c) + (b-d)i', '(3+4i) - (1-2i)', '2 + 6i'],
        ['Multiplication', '(ac-bd) + (ad+bc)i', '(3+4i) × (1-2i)', '11 - 2i'],
        ['Division', 'Multiply by conjugate', '(3+4i) / (1-2i)', '-1 + 2i'],
        ['Modulus |z|', '√(a² + b²)', '|3 + 4i|', '5.00']
      ]
    },
    practicalTips: [
      'In electrical engineering, the imaginary unit is commonly written as j rather than i to avoid confusion with electric current i(t).',
      'The complex conjugate of (a + bi) is (a - bi). Multiplying any complex number by its conjugate always produces a purely real positive number: a² + b².'
    ],
    commonMistakes: [
      'Forgetting that i² = -1. When multiplying terms, (bi)(di) = bd(i²) = -bd, not +bd.',
      'Dividing by zero when the denominator complex number z₂ = 0 + 0i.'
    ],
    faqs: [
      { question: 'What is an imaginary number?', answer: 'An imaginary number is a real number multiplied by the imaginary unit i, which is defined by the property i² = -1. They allow solutions to equations like x² + 1 = 0 that have no real solutions.' },
      { question: 'What is the polar form of a complex number?', answer: 'Polar form expresses a complex number by its distance from the origin (modulus r = √(a² + b²)) and its angle with the positive real axis (argument θ = atan2(b, a)): z = r(cos θ + i·sin θ) = r·e^(iθ).' },
      { question: 'Why are complex numbers used in engineering?', answer: 'Complex numbers model alternating current (AC) circuits, electromagnetic waves, quantum wave functions, signal processing, and fluid dynamics.' }
    ],
    relatedToolSlugs: ['scientific-calculator', 'ratio-calculator', 'lcm-calculator', 'fraction-calculator'],
    sources: [
      { title: 'MIT OpenCourseWare - Complex Variables with Applications', url: 'https://ocw.mit.edu', org: 'MIT' }
    ],
    schemaCategory: 'UtilitiesApplication',
    lastUpdated: 'October 15, 2026',
    reviewedBy: 'LapTools Quantitative Review Board'
  },

  // 6. Aspect Ratio Calculator
  'aspect-ratio-calculator': {
    slug: 'aspect-ratio-calculator',
    categoryId: 'math',
    title: 'Aspect Ratio Calculator - 16:9, 4:3, 21:9 Screen & Image Scaler',
    metaDescription: 'Free online aspect ratio calculator. Calculate simplified aspect ratios (16:9, 4:3, 1:1, 9:16), resize pixel dimensions, and preview scaled heights and widths.',
    h1: 'Aspect Ratio Calculator',
    primaryKeyword: 'aspect ratio calculator',
    supportingKeywords: [
      'screen aspect ratio',
      'image aspect ratio calculator',
      '16 9 ratio calculator',
      'video aspect ratio',
      'pixel dimensions calculator',
      'scale dimensions calculator',
      'photo aspect ratio'
    ],
    introParagraph: 'Calculate, simplify, and resize aspect ratios for videos, monitors, web graphics, and photography. Quickly convert arbitrary pixel resolutions (such as 1920×1080 or 3840×2160) into standard reduced ratios (16:9, 4:3, 21:9, 1:1, 9:16) and calculate scaled dimensions preserving original proportional geometry.',
    howToSteps: [
      'Enter the original width and original height in pixels, inches, or centimeters.',
      'The calculator computes the greatest common divisor and displays the simplified ratio.',
      'Enter a new target width to instantly solve for the required proportional height.',
      'View the live responsive visual aspect preview box.'
    ],
    formulaTitle: 'Aspect Ratio Proportional Scaling',
    formulaDisplay: 'Simplified: (W / GCD) : (H / GCD) | Scaled Height = (Target Width × H) / W',
    formulaExplanation: 'The aspect ratio represents the proportional relationship between width and height. Scaling preserves the decimal ratio W/H to prevent image distortion or letterboxing.',
    assumptions: ['Square pixel aspect ratio (PAR = 1.0).'],
    workedExample: {
      scenario: 'Scale an image measuring 1920 × 1080 to a width of 1280 pixels.',
      steps: [
        { step: 'Find GCD of 1920 and 1080', detail: 'GCD(1920, 1080) = 120.' },
        { step: 'Simplify Ratio', detail: '1920 / 120 = 16; 1080 / 120 = 9 → 16:9 ratio.' },
        { step: 'Scale to New Width (1280)', detail: '(1280 × 1080) / 1920 = 720 pixels height.' }
      ],
      resultSummary: '1920×1080 simplifies to 16:9. Scaled to 1280px width produces 720px height (720p HD).'
    },
    quickRefTable: {
      headers: ['Standard Ratio', 'Common Resolution', 'Primary Industry Use', 'Decimal Value'],
      rows: [
        ['16:9', '1920 × 1080 (FHD), 3840 × 2160 (4K)', 'YouTube, HDTV, monitors, laptops', '1.778'],
        ['9:16', '1080 × 1920 (Vertical)', 'TikTok, Instagram Reels, YouTube Shorts', '0.563'],
        ['4:3', '1024 × 768, iPad displays', 'Classic television, iPads, photography', '1.333'],
        ['21:9', '3440 × 1440 (Ultrawide)', 'Cinematic movies, gaming monitors', '2.333'],
        ['1:1', '1080 × 1080 (Square)', 'Instagram feed posts, profile avatars', '1.000']
      ]
    },
    practicalTips: [
      'When preparing video for mobile viewers on TikTok or Reels, export in 9:16 (1080×1920) to utilize full vertical screen real estate without black pillarbox bars.',
      'Check if your target platform compresses or crops images: Instagram feed squares are 1:1, but vertical portrait posts allow 4:5 (1080×1350).'
    ],
    commonMistakes: [
      'Stretching an image by altering only width or height without proportional scaling, causing distorted circles and distorted faces.',
      'Confusing aspect ratio with physical screen size. A 27-inch 16:9 monitor has the same aspect ratio as a 65-inch 16:9 television.'
    ],
    faqs: [
      { question: 'What is the most common screen aspect ratio in 2026?', answer: '16:9 remains the dominant global standard for computer monitors, laptops, televisions, and streaming video.' },
      { question: 'What is letterboxing vs pillarboxing?', answer: 'Letterboxing adds horizontal black bars to the top and bottom when a widescreen video is shown on a taller screen. Pillarboxing adds vertical black bars to the left and right when narrower content is shown on a wider display.' },
      { question: 'How do you calculate aspect ratio from two numbers?', answer: 'Divide both width and height by their greatest common divisor (GCD). For example, with 1920 and 1080, dividing both by 120 yields 16 and 9.' }
    ],
    relatedToolSlugs: ['ratio-calculator', 'percentage-calculator', 'lcm-calculator', 'gcf-calculator'],
    sources: [
      { title: 'SMPTE (Society of Motion Picture and Television Engineers) - Standard Formats', url: 'https://www.smpte.org', org: 'SMPTE' }
    ],
    schemaCategory: 'UtilitiesApplication',
    lastUpdated: 'October 15, 2026',
    reviewedBy: 'LapTools Quantitative Review Board'
  },

  // 7. Ratio Calculator
  'ratio-calculator': {
    slug: 'ratio-calculator',
    categoryId: 'math',
    title: 'Ratio Calculator - Solve Proportions (A:B = C:D) & Simplify Ratios',
    metaDescription: 'Free online ratio calculator. Solve for missing values in proportions (A:B = C:D), simplify 2-part and 3-part ratios, and scale proportional recipes.',
    h1: 'Ratio Calculator',
    primaryKeyword: 'ratio calculator',
    supportingKeywords: [
      'proportion calculator',
      'solve ratio',
      'ratio simplifier',
      'simplify ratio',
      'solve for x ratio',
      'golden ratio calculator',
      'equivalent ratio calculator'
    ],
    introParagraph: 'Solve proportions, simplify ratios to lowest terms, and scale multi-part proportional recipes with our comprehensive Ratio Calculator. Solve for any missing fourth value in the proportion A : B = C : D using cross-multiplication, and reduce complex 2-part and 3-part ratios (A : B : C) to their simplest integer form.',
    howToSteps: [
      'To solve a proportion A : B = C : D, enter three known values and leave the target field blank.',
      'To simplify a ratio, enter 2 or 3 integers into the Simplification section.',
      'Review the step-by-step cross-multiplication solution.',
      'Check the decimal ratio and percentage proportion.'
    ],
    formulaTitle: 'Cross-Multiplication & Common Factor Reduction',
    formulaDisplay: 'A / B = C / D  ⟹  A · D = B · C  ⟹  A = (B · C) / D',
    formulaExplanation: 'In any true proportion, the product of the extremes (A × D) equals the product of the means (B × C). Ratios are simplified by dividing all terms by their mutual greatest common factor (GCF).',
    assumptions: ['Non-zero denominators.'],
    workedExample: {
      scenario: 'Solve 4 : 8 = 12 : x.',
      steps: [
        { step: 'Set Up Equality of Fractions', detail: '4 / 8 = 12 / x' },
        { step: 'Cross-Multiply', detail: '4 × x = 8 × 12' },
        { step: 'Solve for x', detail: '4x = 96  ⟹  x = 96 / 4 = 24' }
      ],
      resultSummary: 'x = 24. The completed proportion is 4 : 8 = 12 : 24.'
    },
    quickRefTable: {
      headers: ['Initial Ratio', 'Greatest Common Divisor', 'Simplified Ratio', 'Decimal Form'],
      rows: [
        ['8 : 12', '4', '2 : 3', '0.6667'],
        ['15 : 25', '5', '3 : 5', '0.6000'],
        ['24 : 36 : 60', '12', '2 : 3 : 5', 'Multi-part'],
        ['50 : 200', '50', '1 : 4', '0.2500'],
        ['100 : 150 : 250', '50', '2 : 3 : 5', 'Multi-part']
      ]
    },
    practicalTips: [
      'In cooking, standard baking ratios are expressed by weight rather than volume (e.g. standard bread dough ratio is 5 parts flour to 3 parts water: 5:3).',
      'When scaling recipes up or down, multiply each term in the ratio by the exact same scaling multiplier.'
    ],
    commonMistakes: [
      'Cross-multiplying when adding fractions instead of when solving an equality between two ratios.',
      'Reversing the order of terms. A ratio of 2:3 is not equivalent to 3:2.'
    ],
    faqs: [
      { question: 'What is a proportion?', answer: 'A proportion is an equation stating that two ratios are equal, written as a/b = c/d or a:b = c:d.' },
      { question: 'How do you simplify a 3-part ratio?', answer: 'Find the greatest common factor (GCF) of all three numbers simultaneously, then divide each term by that GCF.' },
      { question: 'What is the Golden Ratio?', answer: 'The Golden Ratio (represented by the Greek letter φ, phi) is an irrational mathematical constant approximately equal to 1.6180339887... where (a+b)/a = a/b.' }
    ],
    relatedToolSlugs: ['aspect-ratio-calculator', 'percentage-calculator', 'fraction-calculator', 'gcf-calculator'],
    sources: [
      { title: 'Khan Academy - Understanding and Solving Ratios and Proportions', url: 'https://www.khanacademy.org', org: 'Khan Academy' }
    ],
    schemaCategory: 'UtilitiesApplication',
    lastUpdated: 'October 15, 2026',
    reviewedBy: 'LapTools Quantitative Review Board'
  },

  // 8. Fraction Calculator
  'fraction-calculator': {
    slug: 'fraction-calculator',
    categoryId: 'math',
    title: 'Fraction Calculator - Add, Subtract, Multiply & Divide Fractions',
    metaDescription: 'Free online fraction calculator. Add, subtract, multiply, and divide fractions and mixed numbers with step-by-step LCD solutions, mixed and improper answers.',
    h1: 'Fraction Calculator',
    primaryKeyword: 'fraction calculator',
    supportingKeywords: [
      'fraction solver',
      'adding fractions calculator',
      'multiplying fractions calculator',
      'dividing fractions calculator',
      'subtracting fractions',
      'fraction simplifier',
      'lcd fraction calculator'
    ],
    introParagraph: 'Perform arithmetic on standard, mixed, and improper fractions with step-by-step mathematical solutions. Add, subtract, multiply, and divide fractions with automated Least Common Denominator (LCD) calculation, cross-multiplication, and reduction to simplest mixed and decimal equivalents.',
    howToSteps: [
      'Enter the numerators and denominators for both fractions (and optional whole numbers for mixed numbers).',
      'Select your operation: Addition (+), Subtraction (-), Multiplication (×), or Division (÷).',
      'Review the step-by-step solution showing the common denominator and simplification.',
      'Check the final answer in simplified fraction, mixed number, and decimal forms.'
    ],
    formulaTitle: 'Fraction Arithmetic Rules',
    formulaDisplay: 'Add: a/b + c/d = (ad + bc)/bd | Multiply: (a·c)/(b·d) | Divide: (a·d)/(b·c)',
    formulaExplanation: 'Addition and subtraction require converting fractions to equivalent fractions with a Least Common Denominator (LCD). Division inverts the divisor and multiplies (reciprocal rule).',
    assumptions: ['Non-zero denominators.'],
    workedExample: {
      scenario: 'Add 3/4 + 2/5.',
      steps: [
        { step: 'Find LCD of 4 and 5', detail: 'LCM(4, 5) = 20.' },
        { step: 'Convert to Equivalent Fractions', detail: '3/4 = (3 × 5)/20 = 15/20 | 2/5 = (2 × 4)/20 = 8/20' },
        { step: 'Add Numerators', detail: '15/20 + 8/20 = (15 + 8)/20 = 23/20' },
        { step: 'Convert to Mixed Number', detail: '23/20 = 1 3/20 (decimal: 1.15).' }
      ],
      resultSummary: '3/4 + 2/5 = 23/20 = 1 3/20 (1.15).'
    },
    quickRefTable: {
      headers: ['Problem', 'LCD', 'Improper Answer', 'Mixed Answer', 'Decimal'],
      rows: [
        ['1/2 + 1/3', '6', '5/6', '5/6', '0.8333'],
        ['3/4 - 1/3', '12', '5/12', '5/12', '0.4167'],
        ['2/3 × 3/4', '—', '6/12 = 1/2', '1/2', '0.5000'],
        ['3/4 ÷ 2/5', '—', '15/8', '1 7/8', '1.8750'],
        ['1 1/2 + 2 1/4', '4', '15/4', '3 3/4', '3.7500']
      ]
    },
    practicalTips: [
      'To divide fractions: "Keep, Change, Flip"—keep the first fraction, change division to multiplication, and flip the second fraction upside down.',
      'Always cancel common factors before multiplying numerators and denominators to keep numbers manageable.'
    ],
    commonMistakes: [
      'Adding denominators together (e.g. incorrectly writing 1/2 + 1/3 = 2/5 instead of 5/6). Denominators must never be added.',
      'Forgetting that dividing by a fraction smaller than 1 yields a result *larger* than the original number.'
    ],
    faqs: [
      { question: 'What is a proper vs improper fraction?', answer: 'A proper fraction has a numerator strictly smaller than its denominator (e.g. 3/4). An improper fraction has a numerator equal to or greater than its denominator (e.g. 7/4).' },
      { question: 'How do you find the Least Common Denominator (LCD)?', answer: 'The LCD is simply the Least Common Multiple (LCM) of the denominators.' },
      { question: 'Can fractions be negative?', answer: 'Yes. -3/4, 3/(-4), and -(3/4) all represent the exact same negative rational number.' }
    ],
    relatedToolSlugs: ['decimal-to-fraction-calculator', 'mixed-fraction-calculator', 'casio-fx-55-plus-fraction-calculator', 'lcm-calculator'],
    sources: [
      { title: 'National Council of Teachers of Mathematics (NCTM) - Fractions Resources', url: 'https://www.nctm.org', org: 'NCTM' }
    ],
    schemaCategory: 'UtilitiesApplication',
    lastUpdated: 'October 15, 2026',
    reviewedBy: 'LapTools Quantitative Review Board'
  },

  // 9. Decimal to Fraction Calculator
  'decimal-to-fraction-calculator': {
    slug: 'decimal-to-fraction-calculator',
    categoryId: 'math',
    title: 'Decimal to Fraction Calculator - Convert Decimals to Exact Fractions',
    metaDescription: 'Free decimal to fraction calculator. Convert terminating and repeating decimals into exact simplified fractions and mixed numbers with step-by-step proofs.',
    h1: 'Decimal to Fraction Calculator',
    primaryKeyword: 'decimal to fraction calculator',
    supportingKeywords: [
      'convert decimal to fraction',
      'decimal to mixed number',
      'fraction to decimal',
      'repeating decimal to fraction',
      'convert decimals',
      'exact fraction converter'
    ],
    introParagraph: 'Convert any terminating or repeating decimal into its exact mathematical simplified fraction and mixed number equivalent. Featuring continuous fraction rationalization, find the exact numerator, denominator, and reduced ratio representation for any decimal number.',
    howToSteps: [
      'Enter any decimal value (e.g., 0.375, 1.25, or 2.625).',
      'The calculator isolates the whole number component and rationalizes the fractional decimal part.',
      'Review the step-by-step reduction dividing by greatest common divisors.',
      'Copy the simplified proper, improper, or mixed number.'
    ],
    formulaTitle: 'Rational Fraction Conversion Algorithm',
    formulaDisplay: 'Decimal D = W + (F / 10^k)  ⟹  Reduce (F / 10^k) via GCF',
    formulaExplanation: 'Terminating decimals are expressed as integers over powers of 10 and reduced by dividing both numerator and denominator by their greatest common factor.',
    assumptions: ['Terminating or repeating rational decimal inputs.'],
    workedExample: {
      scenario: 'Convert 0.625 into a simplified fraction.',
      steps: [
        { step: 'Count Decimal Places', detail: '0.625 has 3 decimal places → denominator is 10³ = 1,000.' },
        { step: 'Form Initial Fraction', detail: '625 / 1000.' },
        { step: 'Find GCF(625, 1000)', detail: 'GCF is 125.' },
        { step: 'Divide by GCF', detail: '625 ÷ 125 = 5; 1000 ÷ 125 = 8 → 5/8.' }
      ],
      resultSummary: '0.625 = 5/8.'
    },
    quickRefTable: {
      headers: ['Common Decimal', 'Fraction Equivalent', 'Mixed Number', 'Percentage'],
      rows: [
        ['0.125', '1/8', '1/8', '12.5%'],
        ['0.25', '1/4', '1/4', '25.0%'],
        ['0.3333...', '1/3', '1/3', '33.33%'],
        ['0.375', '3/8', '3/8', '37.5%'],
        ['0.5', '1/2', '1/2', '50.0%'],
        ['0.625', '5/8', '5/8', '62.5%'],
        ['0.75', '3/4', '3/4', '75.0%'],
        ['1.25', '5/4', '1 1/4', '125.0%'],
        ['2.5', '5/2', '2 1/2', '250.0%']
      ]
    },
    practicalTips: [
      'In construction, woodworking, and machining, measurement tapes use standard eighths and sixteenths of an inch (0.0625 = 1/16", 0.125 = 1/8", 0.1875 = 3/16").',
      'To convert a fraction back to decimal, simply divide numerator by denominator on any standard calculator.'
    ],
    commonMistakes: [
      'Rounding repeating decimals prematurely (e.g. entering 0.33 instead of 0.333333), which produces 33/100 instead of 1/3.'
    ],
    faqs: [
      { question: 'How do you convert repeating decimals into fractions?', answer: 'Set x equal to the decimal, multiply by a power of 10 to shift the repeating block past the decimal point, subtract the original equation to eliminate the repeating tail, and solve for x.' },
      { question: 'Can all decimals be turned into fractions?', answer: 'No. Only rational numbers (terminating or repeating decimals) can be expressed as fractions. Irrational numbers like π (3.14159...) or √2 cannot be represented as exact fractions.' }
    ],
    relatedToolSlugs: ['fraction-calculator', 'mixed-fraction-calculator', 'casio-fx-55-plus-fraction-calculator', 'percentage-calculator'],
    sources: [
      { title: 'Khan Academy - Converting Decimals to Fractions', url: 'https://www.khanacademy.org', org: 'Khan Academy' }
    ],
    schemaCategory: 'UtilitiesApplication',
    lastUpdated: 'October 15, 2026',
    reviewedBy: 'LapTools Quantitative Review Board'
  },

  // 10. Mixed Fraction Calculator
  'mixed-fraction-calculator': {
    slug: 'mixed-fraction-calculator',
    categoryId: 'math',
    title: 'Mixed Fraction Calculator - Mixed Numbers Arithmetic & Conversion',
    metaDescription: 'Free mixed fraction calculator. Add, subtract, multiply, and divide mixed numbers (e.g. 2 3/4 + 1 1/2) with step-by-step conversion to improper fractions.',
    h1: 'Mixed Fraction Calculator',
    primaryKeyword: 'mixed fraction calculator',
    supportingKeywords: [
      'mixed number calculator',
      'mixed to improper fraction',
      'add mixed numbers',
      'multiply mixed fractions',
      'subtract mixed fractions',
      'mixed fractions with steps'
    ],
    introParagraph: 'Calculate arithmetic on mixed numbers with full mathematical transparency. Convert mixed numbers into improper fractions, find common denominators, execute operations, and simplify the result back into clean mixed numbers with step-by-step solutions.',
    howToSteps: [
      'Enter the whole number, numerator, and denominator for both mixed fractions.',
      'Select the arithmetic operation: +, -, ×, or ÷.',
      'The calculator converts mixed numbers into improper fractions automatically.',
      'Review the final simplified mixed fraction and improper fraction results.'
    ],
    formulaTitle: 'Mixed to Improper Conversion Rule',
    formulaDisplay: 'W (N / D) = (W · D + N) / D',
    formulaExplanation: 'Multiply the whole number by the denominator, add the numerator, and place the result over the original denominator.',
    assumptions: ['Positive non-zero denominators.'],
    workedExample: {
      scenario: 'Calculate 2 1/3 + 1 3/4.',
      steps: [
        { step: 'Convert 2 1/3 to Improper', detail: '(2 × 3 + 1)/3 = 7/3' },
        { step: 'Convert 1 3/4 to Improper', detail: '(1 × 4 + 3)/4 = 7/4' },
        { step: 'Find LCD of 3 and 4', detail: 'LCD = 12 → (7×4)/12 + (7×3)/12 = 28/12 + 21/12 = 49/12' },
        { step: 'Convert Back to Mixed', detail: '49 ÷ 12 = 4 with remainder 1 → 4 1/12' }
      ],
      resultSummary: '2 1/3 + 1 3/4 = 4 1/12 (improper: 49/12).'
    },
    quickRefTable: {
      headers: ['Mixed Number', 'Improper Equivalent', 'Decimal Equivalent', 'Double Value'],
      rows: [
        ['1 1/2', '3/2', '1.50', '3.00'],
        ['2 3/4', '11/4', '2.75', '5.50'],
        ['3 1/8', '25/8', '3.125', '6.25'],
        ['4 2/3', '14/3', '4.667', '9.333'],
        ['5 5/6', '35/6', '5.833', '11.667']
      ]
    },
    practicalTips: [
      'When multiplying or dividing mixed numbers, always convert them to improper fractions first. Never attempt to multiply whole numbers and fractional parts separately.',
      'When subtracting mixed numbers, if the second fractional part is larger than the first, borrow 1 from the first whole number.'
    ],
    commonMistakes: [
      'Writing 2 3/4 as (2 × 3)/4 = 6/4. Remember: the whole number is multiplied by the denominator, not the numerator!'
    ],
    faqs: [
      { question: 'What is a mixed fraction?', answer: 'A mixed fraction (or mixed number) is a number consisting of an integer whole number and a proper fraction combined, such as 2 1/2.' },
      { question: 'How do you convert an improper fraction back into a mixed number?', answer: 'Divide the numerator by the denominator. The quotient becomes the whole number, and the remainder becomes the new numerator over the original denominator.' }
    ],
    relatedToolSlugs: ['fraction-calculator', 'improper-fraction-calculator', 'decimal-to-fraction-calculator', 'casio-fx-55-plus-fraction-calculator'],
    sources: [
      { title: 'Khan Academy - Mixed Numbers and Improper Fractions', url: 'https://www.khanacademy.org', org: 'Khan Academy' }
    ],
    schemaCategory: 'UtilitiesApplication',
    lastUpdated: 'October 15, 2026',
    reviewedBy: 'LapTools Quantitative Review Board'
  },

  // 11. Improper Fraction Calculator
  'improper-fraction-calculator': {
    slug: 'improper-fraction-calculator',
    categoryId: 'math',
    title: 'Improper Fraction Calculator - Convert & Simplify Top-Heavy Fractions',
    metaDescription: 'Free improper fraction calculator. Convert improper fractions to mixed numbers, reduce to simplest terms, and calculate operations with step-by-step arithmetic.',
    h1: 'Improper Fraction Calculator',
    primaryKeyword: 'improper fraction calculator',
    supportingKeywords: [
      'convert improper fraction',
      'improper to mixed fraction calculator',
      'top heavy fractions',
      'simplify improper fractions',
      'improper fraction to decimal'
    ],
    introParagraph: 'Simplify top-heavy improper fractions into clean mixed numbers and reduced lowest terms. Features division with remainder decomposition to instantly convert any improper fraction into an exact whole number and remainder proper fraction.',
    howToSteps: [
      'Enter the numerator and denominator of your improper fraction.',
      'The calculator performs integer division with remainder.',
      'Review the quotient (whole number) and remainder (new numerator).',
      'Copy the simplified mixed number and decimal equivalent.'
    ],
    formulaTitle: 'Improper Fraction Decomposition',
    formulaDisplay: 'Numerator ÷ Denominator = Quotient (Whole) + Remainder / Denominator',
    formulaExplanation: 'Divide the numerator by the denominator using integer division to isolate the whole number and residual fractional parts.',
    assumptions: ['Numerator ≥ Denominator > 0.'],
    workedExample: {
      scenario: 'Convert 17/5 into a mixed number.',
      steps: [
        { step: 'Divide 17 by 5', detail: '17 ÷ 5 = 3 with a remainder of 2.' },
        { step: 'Set Quotient as Whole Number', detail: 'Whole number = 3.' },
        { step: 'Set Remainder as Numerator', detail: 'Fractional part = 2/5.' }
      ],
      resultSummary: '17/5 = 3 2/5 (decimal: 3.4).'
    },
    quickRefTable: {
      headers: ['Improper Fraction', 'Division Steps', 'Mixed Number', 'Decimal Value'],
      rows: [
        ['7/4', '7 ÷ 4 = 1 R 3', '1 3/4', '1.75'],
        ['11/3', '11 ÷ 3 = 3 R 2', '3 2/3', '3.67'],
        ['17/5', '17 ÷ 5 = 3 R 2', '3 2/5', '3.40'],
        ['25/8', '25 ÷ 8 = 3 R 1', '3 1/8', '3.125'],
        ['31/6', '31 ÷ 6 = 5 R 1', '5 1/6', '5.167']
      ]
    },
    practicalTips: [
      'If the remainder of the division is zero, the improper fraction simplifies to a clean whole integer (e.g., 24/6 = 4).'
    ],
    commonMistakes: [
      'Leaving improper fractions unreduced before converting to mixed numbers.'
    ],
    faqs: [
      { question: 'Why are they called "improper" fractions?', answer: 'The historical term "improper" simply meant that the fraction was "more than one whole," not that it is mathematically incorrect. In high school and college algebra, improper fractions are preferred over mixed numbers.' }
    ],
    relatedToolSlugs: ['mixed-fraction-calculator', 'fraction-calculator', 'decimal-to-fraction-calculator', 'casio-fx-55-plus-fraction-calculator'],
    sources: [
      { title: 'Math is Fun - Improper Fractions', url: 'https://www.mathsisfun.com/improper-fractions.html', org: 'Math is Fun' }
    ],
    schemaCategory: 'UtilitiesApplication',
    lastUpdated: 'October 15, 2026',
    reviewedBy: 'LapTools Quantitative Review Board'
  },

  // 12. Casio fx-55 Plus Fraction Calculator Simulator
  'casio-fx-55-plus-fraction-calculator': {
    slug: 'casio-fx-55-plus-fraction-calculator',
    categoryId: 'math',
    title: 'Casio fx-55 Plus Fraction Calculator - Interactive Classroom Simulator',
    metaDescription: 'Interactive online simulator of the Casio fx-55 Plus fraction calculator. Learn fraction simplification with the Simp button, a b/c mixed toggle, and LCD display.',
    h1: 'Casio fx-55 Plus Fraction Calculator (Interactive Simulator)',
    primaryKeyword: 'casio fx-55 plus fraction calculator',
    supportingKeywords: [
      'casio fraction calculator',
      'casio fx-55 plus',
      'fx 55 plus fraction simulator',
      'simp button calculator',
      'a b/c calculator',
      'classroom fraction calculator'
    ],
    introParagraph: 'Experience the official classroom fraction learning tool online: the Casio fx-55 Plus calculator. Emulating the famous educational handheld device used in American elementary and middle schools, explore the iconic "a b/c" mixed key, the "d/c" improper fraction converter, and the step-by-step "Simp" button that guides students through discovering common prime factors.',
    howToSteps: [
      'Enter your initial whole number, numerator, and denominator into the Casio display.',
      'Press the amber "Simp (Reduce)" button to reduce by one common prime factor at a time (e.g. ÷2, then ÷3).',
      'Press the blue "d/c ↔ a b/c" button to toggle between mixed numbers and improper fractions.',
      'Follow the LCD indicator showing which factor was used in each step.'
    ],
    formulaTitle: 'Casio Stepwise Prime Reduction Method',
    formulaDisplay: 'Simp: (a ÷ p) / (b ÷ p)  where p is the smallest shared prime factor',
    formulaExplanation: 'Unlike calculators that instantly simplify fractions in one invisible step, the Casio fx-55 Plus pedagogical engine reduces fractions step-by-step so learners understand factoring concepts.',
    assumptions: ['Casio fx-55 Plus educational emulation.'],
    workedExample: {
      scenario: 'Reduce 2 4/8 on the Casio fx-55 Plus.',
      steps: [
        { step: 'Initial Display', detail: '2 4 ⌟ 8' },
        { step: 'Press Simp Once', detail: 'Calculator detects shared factor of 2: 4÷2 = 2, 8÷2 = 4 → displays "SIMP by 2: 2 2 ⌟ 4"' },
        { step: 'Press Simp Second Time', detail: 'Calculator detects shared factor of 2: 2÷2 = 1, 4÷2 = 2 → displays "SIMP by 2: 2 1 ⌟ 2"' },
        { step: 'Final Status', detail: 'No further common factors exist; displays "READY / SIMPLEST".' }
      ],
      resultSummary: '2 4/8 simplifies step-by-step to 2 1/2.'
    },
    quickRefTable: {
      headers: ['Casio Key', 'Full Function Name', 'Classroom Purpose', 'Display Symbol'],
      rows: [
        ['a b/c', 'Mixed Fraction Key', 'Enters mixed number with whole part', 'Whole ⌟ Num ⌟ Den'],
        ['d/c', 'Improper Toggle', 'Converts between mixed and improper', 'Num ⌟ Den'],
        ['Simp', 'Simplify Key', 'Reduces by smallest shared factor', 'SIMP by n'],
        ['F ↔ D', 'Fraction to Decimal', 'Toggles between fraction and decimal', 'Decimal value']
      ]
    },
    practicalTips: [
      'Teachers use the Casio fx-55 Plus specifically because the "Simp" key forces students to actively see the prime factorization rather than magically outputting an unverified answer.',
      'In state standardized testing where fraction calculators are allowed, the fx-55 Plus is widely approved by state boards of education.'
    ],
    commonMistakes: [
      'Assuming the fraction is fully reduced after pressing Simp only once. If a fraction shares composite factors like 4 or 6, you must press Simp multiple times until the "SIMPLEST" indicator appears.'
    ],
    faqs: [
      { question: 'What does the "Simp" button do on the Casio fx-55 Plus?', answer: 'The Simp button divides both the numerator and denominator by a single common prime factor. It prompts students to determine what factor was used and whether further reduction is possible.' },
      { question: 'What is the "a b/c" key?', answer: 'The "a b/c" key allows direct entry of mixed numbers. The "a" represents the whole number, "b" represents the numerator, and "c" represents the denominator.' }
    ],
    relatedToolSlugs: ['fraction-calculator', 'mixed-fraction-calculator', 'improper-fraction-calculator', 'decimal-to-fraction-calculator'],
    sources: [
      { title: 'Casio Worldwide - fx-55 PLUS User Guide and Educational Standards', url: 'https://www.casio.com', org: 'Casio' }
    ],
    schemaCategory: 'EducationalApplication',
    lastUpdated: 'October 15, 2026',
    reviewedBy: 'LapTools Quantitative Review Board'
  }
};
