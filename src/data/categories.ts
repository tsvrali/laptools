import { CategoryMeta } from '../types';

export const categories: CategoryMeta[] = [
  {
    id: 'financial',
    name: 'Financial',
    slug: 'financial',
    shortDesc: 'Mortgage payments, credit card payoffs, debt snowball/avalanche, and net pay analysis.',
    intro: 'Explore accurate, reliable personal finance calculators designed to help American households evaluate home loans, eliminate high-interest debt, plan amortizations, and budget real take-home pay with transparent mathematical formulas and IRS-backed parameters.',
    accentColor: '#2563EB',
    iconName: 'Landmark'
  },
  {
    id: 'tax-and-income',
    name: 'Tax and Income',
    slug: 'tax-and-income',
    shortDesc: 'Self-employment tax estimates, 1099 vs W2 take-home parity, and freelance hourly rates.',
    intro: 'Navigate United States federal tax obligations with confidence. Calculate estimated Schedule SE self-employment taxes, compare true W2 employee total compensation with 1099 contractor billable rates, and establish sustainable freelance day and project rates based on updated 2026 IRS schedules.',
    accentColor: '#7C3AED',
    iconName: 'Receipt'
  },
  {
    id: 'business-and-ecommerce',
    name: 'Business and E-Commerce',
    slug: 'business-and-ecommerce',
    shortDesc: 'eBay seller fees, Stripe/PayPal payment processing margins, break-even units, and profits.',
    intro: 'Optimize your sales channels and preserve unit margins. Calculate net payouts after seller fees for eBay, Stripe, and PayPal, determine break-even sales volume, and seamlessly convert between markup percentages and gross profit margins.',
    accentColor: '#0D9488',
    iconName: 'ShoppingBag'
  },
  {
    id: 'currency',
    name: 'Currency',
    slug: 'currency',
    shortDesc: 'Live mid-market reference foreign exchange rates, 30-day historical trends, and fee breakdowns.',
    intro: 'Convert between major world currencies using European Central Bank (ECB) reference rates. Review 30-day historical trends, analyze international remittance and bank markup fees, and access transparent currency insights without hidden spreads.',
    accentColor: '#059669',
    iconName: 'Coins'
  },
  {
    id: 'conversions',
    name: 'Conversions',
    slug: 'conversions',
    shortDesc: 'Distance conversions, running pace tables, and density-accurate baking ingredients to cups.',
    intro: 'Convert between imperial and metric units with scientific precision. Convert kilometers to miles with standard race splits, and translate baking ingredients from weight in grams to US volumetric cups using food-specific density tables.',
    accentColor: '#EA580C',
    iconName: 'Scale'
  },
  {
    id: 'home-and-diy',
    name: 'Home and DIY',
    slug: 'home-and-diy',
    shortDesc: 'Fabric yardage requirements for curtains, throw pillows, box cushions, and quilts.',
    intro: 'Plan sewing, upholstery, and home improvement crafts accurately. Determine required yardage for curtains, cushion covers, tablecloths, and quilts accounting for fabric bolt widths, vertical pattern repeats, and cutting allowances.',
    accentColor: '#E11D48',
    iconName: 'Scissors'
  },
  {
    id: 'math',
    name: 'Math',
    slug: 'math',
    shortDesc: 'Least Common Multiple (LCM), Greatest Common Divisor (GCD), Mean, Median, Mode, and scientific math.',
    intro: 'Solve fundamental and advanced mathematical calculations with step-by-step arithmetic. Calculate Least Common Multiple (LCM), Greatest Common Divisor (GCD), descriptive central tendency (Mean, Median, Mode), scientific expressions, fractions, and proportions.',
    accentColor: '#4F46E5',
    iconName: 'Binary'
  },
  {
    id: 'health-and-fitness',
    name: 'Health and Fitness',
    slug: 'health-and-fitness',
    shortDesc: 'Daily calorie burn (TDEE), optimal dietary protein targets, and US Navy body fat percentage.',
    intro: 'Calculate baseline physiological targets using peer-reviewed metabolic equations. Estimate Total Daily Energy Expenditure (TDEE) via Mifflin-St Jeor, determine optimal daily protein targets for activity levels, and compute body fat percentage using the US Navy tape method.',
    accentColor: '#DB2777',
    iconName: 'HeartPulse'
  }
];
