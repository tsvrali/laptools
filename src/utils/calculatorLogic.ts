import { federalBrackets2026, standardDeductions2026, ficaParameters2026 } from '../data/taxData2026';

// 1. Simple Mortgage Calculator
export interface MortgageInput {
  homePrice: number;
  downPayment: number;
  interestRate: number; // e.g. 6.5 for 6.5%
  loanTermYears: number; // e.g. 30
  propertyTaxAnnual: number;
  homeInsuranceAnnual: number;
  hoaMonthly: number;
  pmiMonthly: number;
  extraMonthlyPayment: number;
}

export interface MortgageResult {
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyHOA: number;
  monthlyPMI: number;
  totalMonthlyPayment: number;
  totalLoanAmount: number;
  totalInterestPaid: number;
  totalPaid: number;
  yearsToPayoff: number;
  interestSavedWithExtra: number;
  amortizationSummary: { year: number; balance: number; interestPaidToDate: number; principalPaidToDate: number }[];
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const principal = Math.max(0, input.homePrice - input.downPayment);
  const monthlyRate = (input.interestRate / 100) / 12;
  const totalMonths = input.loanTermYears * 12;

  let baseMonthlyPI = 0;
  if (monthlyRate === 0) {
    baseMonthlyPI = totalMonths > 0 ? principal / totalMonths : 0;
  } else {
    baseMonthlyPI = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  const monthlyTax = input.propertyTaxAnnual / 12;
  const monthlyInsurance = input.homeInsuranceAnnual / 12;
  const monthlyHOA = input.hoaMonthly;
  const monthlyPMI = input.pmiMonthly;

  const totalMonthlyPayment = baseMonthlyPI + monthlyTax + monthlyInsurance + monthlyHOA + monthlyPMI + input.extraMonthlyPayment;

  // Run amortization schedule with extra payment
  let balance = principal;
  let totalInterest = 0;
  let totalPrincipal = 0;
  let monthsPaid = 0;
  const amortizationSummary: { year: number; balance: number; interestPaidToDate: number; principalPaidToDate: number }[] = [];

  while (balance > 0.01 && monthsPaid < 600) {
    monthsPaid++;
    const interestPayment = balance * monthlyRate;
    let principalPayment = (baseMonthlyPI - interestPayment) + input.extraMonthlyPayment;
    if (principalPayment > balance) {
      principalPayment = balance;
    }
    balance -= principalPayment;
    totalInterest += interestPayment;
    totalPrincipal += principalPayment;

    if (monthsPaid % 12 === 0 || balance <= 0.01) {
      amortizationSummary.push({
        year: Math.ceil(monthsPaid / 12),
        balance: Math.max(0, Math.round(balance)),
        interestPaidToDate: Math.round(totalInterest),
        principalPaidToDate: Math.round(totalPrincipal)
      });
    }
  }

  // Base interest without extra payment
  const baselineTotalInterest = (baseMonthlyPI * totalMonths) - principal;
  const interestSaved = Math.max(0, baselineTotalInterest - totalInterest);

  return {
    monthlyPrincipalAndInterest: Math.round(baseMonthlyPI * 100) / 100,
    monthlyPropertyTax: Math.round(monthlyTax * 100) / 100,
    monthlyInsurance: Math.round(monthlyInsurance * 100) / 100,
    monthlyHOA: Math.round(monthlyHOA * 100) / 100,
    monthlyPMI: Math.round(monthlyPMI * 100) / 100,
    totalMonthlyPayment: Math.round(totalMonthlyPayment * 100) / 100,
    totalLoanAmount: Math.round(principal),
    totalInterestPaid: Math.round(totalInterest),
    totalPaid: Math.round(principal + totalInterest),
    yearsToPayoff: Math.round((monthsPaid / 12) * 10) / 10,
    interestSavedWithExtra: Math.round(interestSaved),
    amortizationSummary: amortizationSummary.slice(0, 30)
  };
}

// 2. Credit Card Payoff Calculator
export interface CreditCardInput {
  balance: number;
  apr: number;
  fixedMonthlyPayment: number;
  minimumPaymentPercent: number; // e.g. 2.5%
}

export interface CreditCardResult {
  monthsToPayoffFixed: number;
  totalInterestFixed: number;
  totalPaidFixed: number;
  monthsToPayoffMin: number;
  totalInterestMin: number;
  totalPaidMin: number;
  interestSaved: number;
  timeSavedMonths: number;
  isPaymentTooLow: boolean;
  minRecommendedPayment: number;
}

export function calculateCreditCardPayoff(input: CreditCardInput): CreditCardResult {
  const monthlyRate = (input.apr / 100) / 12;
  const firstMonthInterest = input.balance * monthlyRate;
  const isPaymentTooLow = input.fixedMonthlyPayment <= firstMonthInterest;

  // Fixed payment simulation
  let fixedMonths = 0;
  let fixedInterest = 0;
  let balanceFixed = input.balance;

  if (!isPaymentTooLow) {
    while (balanceFixed > 0.01 && fixedMonths < 600) {
      fixedMonths++;
      const interest = balanceFixed * monthlyRate;
      const principalPayment = Math.min(balanceFixed, input.fixedMonthlyPayment - interest);
      balanceFixed -= principalPayment;
      fixedInterest += interest;
    }
  }

  // Minimum payment simulation (e.g. higher of 2.5% of balance or $25)
  let minMonths = 0;
  let minInterest = 0;
  let balanceMin = input.balance;
  const minFloor = 25;

  while (balanceMin > 0.01 && minMonths < 720) {
    minMonths++;
    const interest = balanceMin * monthlyRate;
    const computedMin = Math.max(minFloor, balanceMin * (input.minimumPaymentPercent / 100));
    const payment = Math.min(balanceMin + interest, computedMin);
    const principalPayment = Math.max(0, payment - interest);
    balanceMin -= principalPayment;
    minInterest += interest;
    if (balanceMin < 0.5) balanceMin = 0;
  }

  return {
    monthsToPayoffFixed: isPaymentTooLow ? Infinity : fixedMonths,
    totalInterestFixed: Math.round(fixedInterest),
    totalPaidFixed: Math.round(input.balance + fixedInterest),
    monthsToPayoffMin: minMonths,
    totalInterestMin: Math.round(minInterest),
    totalPaidMin: Math.round(input.balance + minInterest),
    interestSaved: isPaymentTooLow ? 0 : Math.max(0, Math.round(minInterest - fixedInterest)),
    timeSavedMonths: isPaymentTooLow ? 0 : Math.max(0, minMonths - fixedMonths),
    isPaymentTooLow,
    minRecommendedPayment: Math.round(firstMonthInterest + 20)
  };
}

// 3. Debt Avalanche vs Debt Snowball
export interface DebtItem {
  id: string;
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

export interface DebtPayoffResult {
  totalMonths: number;
  totalInterestPaid: number;
  totalPaid: number;
  payoffOrder: { name: string; payoffMonth: number }[];
}

export function calculateDebtStrategy(debts: DebtItem[], extraMonthlyPayment: number, strategy: 'avalanche' | 'snowball'): DebtPayoffResult {
  if (debts.length === 0) {
    return { totalMonths: 0, totalInterestPaid: 0, totalPaid: 0, payoffOrder: [] };
  }

  // Clone debts
  const workingDebts = debts.map(d => ({ ...d }));

  // Sort order
  if (strategy === 'avalanche') {
    workingDebts.sort((a, b) => b.rate - a.rate); // Highest interest first
  } else {
    workingDebts.sort((a, b) => a.balance - b.balance); // Smallest balance first
  }

  let month = 0;
  let totalInterest = 0;
  const payoffOrder: { name: string; payoffMonth: number }[] = [];
  let availableRollover = extraMonthlyPayment;

  while (workingDebts.some(d => d.balance > 0.01) && month < 360) {
    month++;
    let monthlyRolloverBuffer = availableRollover;

    // 1. Accrue interest & pay minimums
    for (const debt of workingDebts) {
      if (debt.balance <= 0.01) continue;
      const monthlyRate = (debt.rate / 100) / 12;
      const interest = debt.balance * monthlyRate;
      totalInterest += interest;
      debt.balance += interest;

      const minToPay = Math.min(debt.balance, debt.minPayment);
      debt.balance -= minToPay;

      if (debt.balance <= 0.01) {
        debt.balance = 0;
        payoffOrder.push({ name: debt.name, payoffMonth: month });
        availableRollover += debt.minPayment;
      }
    }

    // 2. Direct extra rollover to target debt (first active in sorted list)
    for (const debt of workingDebts) {
      if (debt.balance > 0.01 && monthlyRolloverBuffer > 0) {
        const extraPayment = Math.min(debt.balance, monthlyRolloverBuffer);
        debt.balance -= extraPayment;
        monthlyRolloverBuffer -= extraPayment;

        if (debt.balance <= 0.01) {
          debt.balance = 0;
          if (!payoffOrder.some(p => p.name === debt.name)) {
            payoffOrder.push({ name: debt.name, payoffMonth: month });
          }
          availableRollover += debt.minPayment;
        }
      }
    }
  }

  const initialTotalBalance = debts.reduce((sum, d) => sum + d.balance, 0);

  return {
    totalMonths: month,
    totalInterestPaid: Math.round(totalInterest),
    totalPaid: Math.round(initialTotalBalance + totalInterest),
    payoffOrder
  };
}

// 4. Take-Home Pay (Paycheck) Calculator
export interface PaycheckInput {
  grossPayAnnual: number;
  filingStatus: 'single' | 'married' | 'headOfHousehold';
  payFrequency: 'weekly' | 'bi-weekly' | 'semi-monthly' | 'monthly' | 'annually';
  stateEffectiveRate: number; // e.g. 0.045 for 4.5%
  preTaxDeductionsAnnual: number; // 401k, health insurance
  postTaxDeductionsAnnual: number;
}

export function calculateTakeHomePay(input: PaycheckInput) {
  const periodsMap = {
    weekly: 52,
    'bi-weekly': 26,
    'semi-monthly': 24,
    monthly: 12,
    annually: 1
  };
  const periods = periodsMap[input.payFrequency];

  const taxableGross = Math.max(0, input.grossPayAnnual - input.preTaxDeductionsAnnual);
  const standardDeduction = standardDeductions2026[input.filingStatus];
  const federalTaxableIncome = Math.max(0, taxableGross - standardDeduction);

  // Federal income tax calculation
  const brackets = federalBrackets2026[input.filingStatus];
  let federalTaxAnnual = 0;
  for (const b of brackets) {
    if (federalTaxableIncome > b.min) {
      const taxableInBracket = Math.min(federalTaxableIncome, b.max) - b.min;
      federalTaxAnnual += taxableInBracket * b.rate;
    }
  }

  // FICA calculation (FICA applies to gross wage before 401k, but after Section 125 health insurance. For standard simplicity, apply to gross)
  const ssWageSubject = Math.min(input.grossPayAnnual, ficaParameters2026.socialSecurityWageBase);
  const socialSecurityTaxAnnual = ssWageSubject * ficaParameters2026.socialSecurityEmployeeRate;
  
  let medicareTaxAnnual = input.grossPayAnnual * ficaParameters2026.medicareRate;
  const threshold = input.filingStatus === 'married' ? ficaParameters2026.additionalMedicareThresholdMarried : ficaParameters2026.additionalMedicareThresholdSingle;
  if (input.grossPayAnnual > threshold) {
    medicareTaxAnnual += (input.grossPayAnnual - threshold) * ficaParameters2026.additionalMedicareRate;
  }

  // State Tax
  const stateTaxAnnual = taxableGross * input.stateEffectiveRate;

  const totalDeductionsAnnual = federalTaxAnnual + socialSecurityTaxAnnual + medicareTaxAnnual + stateTaxAnnual + input.preTaxDeductionsAnnual + input.postTaxDeductionsAnnual;
  const netTakeHomeAnnual = Math.max(0, input.grossPayAnnual - totalDeductionsAnnual);

  return {
    netPayPerPeriod: Math.round((netTakeHomeAnnual / periods) * 100) / 100,
    grossPayPerPeriod: Math.round((input.grossPayAnnual / periods) * 100) / 100,
    federalTaxPerPeriod: Math.round((federalTaxAnnual / periods) * 100) / 100,
    stateTaxPerPeriod: Math.round((stateTaxAnnual / periods) * 100) / 100,
    socialSecurityPerPeriod: Math.round((socialSecurityTaxAnnual / periods) * 100) / 100,
    medicarePerPeriod: Math.round((medicareTaxAnnual / periods) * 100) / 100,
    totalTaxAnnual: Math.round(federalTaxAnnual + stateTaxAnnual + socialSecurityTaxAnnual + medicareTaxAnnual),
    netTakeHomeAnnual: Math.round(netTakeHomeAnnual),
    effectiveTaxRate: Math.round(((federalTaxAnnual + stateTaxAnnual + socialSecurityTaxAnnual + medicareTaxAnnual) / input.grossPayAnnual) * 1000) / 10
  };
}

// 5. Self-Employment Tax Calculator
export function calculateSelfEmploymentTax(netBusinessProfit: number, filingStatus: 'single' | 'married' = 'single') {
  // 92.35% of net profit is subject to SE tax
  const subjectEarnings = Math.max(0, netBusinessProfit * ficaParameters2026.seEarningsDeductionMultiplier);
  
  // 12.4% Social Security up to wage base
  const ssSubject = Math.min(subjectEarnings, ficaParameters2026.socialSecurityWageBase);
  const socialSecurityTax = ssSubject * ficaParameters2026.socialSecuritySelfEmployedRate;

  // 2.9% Medicare
  let medicareTax = subjectEarnings * ficaParameters2026.medicareSelfEmployedRate;

  // Additional Medicare 0.9%
  const threshold = filingStatus === 'married' ? ficaParameters2026.additionalMedicareThresholdMarried : ficaParameters2026.additionalMedicareThresholdSingle;
  if (subjectEarnings > threshold) {
    medicareTax += (subjectEarnings - threshold) * ficaParameters2026.additionalMedicareRate;
  }

  const totalSETax = socialSecurityTax + medicareTax;
  const halfDeductible = totalSETax / 2; // Above the line deduction on Form 1040 Schedule 1
  const quarterlyEstimatedSetAside = (totalSETax + (netBusinessProfit * 0.12)) / 4; // SE tax + estimated federal income tax installment

  return {
    subjectEarnings: Math.round(subjectEarnings),
    socialSecurityTax: Math.round(socialSecurityTax),
    medicareTax: Math.round(medicareTax),
    totalSETax: Math.round(totalSETax),
    deductibleHalf: Math.round(halfDeductible),
    quarterlyEstimatedSetAside: Math.round(quarterlyEstimatedSetAside),
    effectiveSERate: subjectEarnings > 0 ? Math.round((totalSETax / netBusinessProfit) * 1000) / 10 : 0
  };
}

// 6. 1099 vs W-2 Pay Parity
export interface W2ComparisonInput {
  w2AnnualSalary: number;
  employerHealthSubsidyAnnual: number; // e.g. $6,000/yr
  employer401kMatchAnnual: number; // e.g. $3,000/yr
  paidTimeOffDays: number; // e.g. 15 days PTO + 10 holidays = 25 days
  businessExpensesAnnual: number; // equipment, software, insurance e.g. $4,000
}

export function calculate1099vsW2(input: W2ComparisonInput) {
  // 1. W2 Baseline
  const employerFicaSaved = input.w2AnnualSalary * 0.0765; // Employer pays half of FICA
  const totalW2Compensation = input.w2AnnualSalary + employerFicaSaved + input.employerHealthSubsidyAnnual + input.employer401kMatchAnnual;

  // 2. Working days in a year = 260 standard days (52 * 5)
  const billableDays = Math.max(150, 260 - input.paidTimeOffDays);
  const billableHours = billableDays * 7.5; // Average 7.5 billable hours/day

  // 3. 1099 Contractor additional taxes:
  // Must pay additional 7.65% self-employment portion, plus self-funded benefits and overhead
  const required1099Gross = totalW2Compensation + input.businessExpensesAnnual + (input.w2AnnualSalary * 0.0765);
  const equivalent1099Hourly = required1099Gross / billableHours;
  const standardW2Hourly = input.w2AnnualSalary / 2080;

  const markupMultiplier = Math.round((equivalent1099Hourly / standardW2Hourly) * 100) / 100;

  return {
    standardW2Hourly: Math.round(standardW2Hourly * 100) / 100,
    equivalent1099Hourly: Math.round(equivalent1099Hourly * 100) / 100,
    required1099Gross: Math.round(required1099Gross),
    totalW2Compensation: Math.round(totalW2Compensation),
    markupMultiplier,
    billableHoursPerYear: Math.round(billableHours)
  };
}

// 7. Freelance Rate Calculator
export interface FreelanceRateInput {
  desiredNetIncome: number;
  annualBusinessExpenses: number;
  taxReservePercent: number; // typically 25-30%
  weeksVacationPerYear: number;
  billableHoursPerWeek: number; // e.g. 25 billable hours out of 40
}

export function calculateFreelanceRate(input: FreelanceRateInput) {
  // Gross revenue needed: Desired Net = Gross * (1 - taxRate) - expenses
  // Gross * (1 - taxRate) = Desired Net + expenses
  // Gross = (Desired Net + expenses) / (1 - taxRate)
  const taxRateDec = input.taxReservePercent / 100;
  const targetGrossRevenue = (input.desiredNetIncome + input.annualBusinessExpenses) / (1 - taxRateDec);
  
  const workingWeeks = Math.max(1, 52 - input.weeksVacationPerYear);
  const annualBillableHours = workingWeeks * input.billableHoursPerWeek;

  const hourlyRate = targetGrossRevenue / annualBillableHours;
  const dayRate = hourlyRate * 8;
  const monthlyRetainer = targetGrossRevenue / 12;

  return {
    targetGrossRevenue: Math.round(targetGrossRevenue),
    annualBillableHours: Math.round(annualBillableHours),
    minimumHourlyRate: Math.round(hourlyRate * 100) / 100,
    dayRate: Math.round(dayRate),
    monthlyRetainer: Math.round(monthlyRetainer)
  };
}

// 8. eBay Fee Calculator
export interface EbayInput {
  itemPrice: number;
  shippingChargedToBuyer: number;
  itemCost: number;
  shippingCostToSeller: number;
  categoryStandardPercent: number;
  isStoreSubscriber: boolean;
  storePercent: number;
  promotedListingPercent: number;
}

export function calculateEbayFees(input: EbayInput) {
  const totalBuyerPaid = input.itemPrice + input.shippingChargedToBuyer;
  const categoryRate = input.isStoreSubscriber ? input.storePercent : input.categoryStandardPercent;
  
  // Per-order fixed fee
  const fixedPerOrderFee = totalBuyerPaid <= 10.0 ? 0.30 : 0.40;
  const finalValueFee = (totalBuyerPaid * (categoryRate / 100)) + fixedPerOrderFee;
  const promotedFee = totalBuyerPaid * (input.promotedListingPercent / 100);

  const totalEbayFee = finalValueFee + promotedFee;
  const totalCost = input.itemCost + input.shippingCostToSeller + totalEbayFee;
  const netProfit = totalBuyerPaid - totalCost;
  const profitMarginPercent = totalBuyerPaid > 0 ? (netProfit / totalBuyerPaid) * 100 : 0;
  const roiPercent = input.itemCost > 0 ? (netProfit / input.itemCost) * 100 : 0;

  // Break-even price
  // Buyer pays P. Total fees = P * (rate/100) + fixed + P * (promo/100)
  // Profit = 0 => P - totalCost - fees = 0
  const rateTotal = (categoryRate + input.promotedListingPercent) / 100;
  const baseCost = input.itemCost + input.shippingCostToSeller + fixedPerOrderFee;
  const breakEvenPrice = baseCost / (1 - rateTotal);

  return {
    totalBuyerPaid: Math.round(totalBuyerPaid * 100) / 100,
    finalValueFee: Math.round(finalValueFee * 100) / 100,
    promotedFee: Math.round(promotedFee * 100) / 100,
    totalEbayFee: Math.round(totalEbayFee * 100) / 100,
    netProfit: Math.round(netProfit * 100) / 100,
    profitMarginPercent: Math.round(profitMarginPercent * 10) / 10,
    roiPercent: Math.round(roiPercent * 10) / 10,
    breakEvenPrice: Math.round(breakEvenPrice * 100) / 100,
    effectiveFeeRate: totalBuyerPaid > 0 ? Math.round((totalEbayFee / totalBuyerPaid) * 1000) / 10 : 0
  };
}

// 9. Stripe & PayPal Processors
export function calculatePaymentProcessing(amount: number, feePercent: number, feeFixed: number, isReverse: boolean = false) {
  if (isReverse) {
    // We want to receive target 'amount'
    // Charge = (Target + Fixed) / (1 - percent)
    const rate = feePercent / 100;
    const chargeNeeded = (amount + feeFixed) / (1 - rate);
    const fee = chargeNeeded - amount;
    return {
      chargeAmount: Math.round(chargeNeeded * 100) / 100,
      fee: Math.round(fee * 100) / 100,
      netPayout: Math.round(amount * 100) / 100
    };
  } else {
    // Normal forward calculation
    const fee = (amount * (feePercent / 100)) + feeFixed;
    const net = Math.max(0, amount - fee);
    return {
      chargeAmount: Math.round(amount * 100) / 100,
      fee: Math.round(fee * 100) / 100,
      netPayout: Math.round(net * 100) / 100
    };
  }
}

// 10. Break-Even Calculator
export function calculateBreakEven(fixedCosts: number, unitSellingPrice: number, unitVariableCost: number, expectedUnitsSold: number = 0) {
  const contributionMargin = Math.max(0.001, unitSellingPrice - unitVariableCost);
  const contributionMarginRatio = unitSellingPrice > 0 ? contributionMargin / unitSellingPrice : 0;
  
  const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
  const breakEvenRevenue = breakEvenUnits * unitSellingPrice;

  let marginOfSafetyUnits = 0;
  let marginOfSafetyPercent = 0;
  if (expectedUnitsSold > 0) {
    marginOfSafetyUnits = expectedUnitsSold - breakEvenUnits;
    marginOfSafetyPercent = Math.round((marginOfSafetyUnits / expectedUnitsSold) * 1000) / 10;
  }

  return {
    contributionMargin: Math.round(contributionMargin * 100) / 100,
    contributionMarginRatio: Math.round(contributionMarginRatio * 1000) / 10,
    breakEvenUnits,
    breakEvenRevenue: Math.round(breakEvenRevenue),
    marginOfSafetyUnits,
    marginOfSafetyPercent
  };
}

// 11. Markup vs Margin
export function calculateMarkupMargin(cost: number, value: number, mode: 'markup' | 'margin') {
  if (mode === 'markup') {
    // value is markup percentage (e.g. 50%)
    const markupDec = value / 100;
    const price = cost * (1 + markupDec);
    const profit = price - cost;
    const margin = price > 0 ? (profit / price) * 100 : 0;
    return {
      price: Math.round(price * 100) / 100,
      profit: Math.round(profit * 100) / 100,
      markupPercent: value,
      marginPercent: Math.round(margin * 10) / 10
    };
  } else {
    // value is margin percentage (e.g. 33.3%)
    const marginDec = Math.min(0.999, value / 100);
    const price = cost / (1 - marginDec);
    const profit = price - cost;
    const markup = cost > 0 ? (profit / cost) * 100 : 0;
    return {
      price: Math.round(price * 100) / 100,
      profit: Math.round(profit * 100) / 100,
      markupPercent: Math.round(markup * 10) / 10,
      marginPercent: value
    };
  }
}

// 12. Profit Margin Calculator
export function calculateProfitMargins(revenue: number, cogs: number, operatingExpenses: number, otherTaxes: number) {
  const grossProfit = revenue - cogs;
  const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;

  const operatingProfit = grossProfit - operatingExpenses;
  const operatingMargin = revenue > 0 ? (operatingProfit / revenue) * 100 : 0;

  const netProfit = operatingProfit - otherTaxes;
  const netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

  return {
    grossProfit: Math.round(grossProfit * 100) / 100,
    grossMarginPercent: Math.round(grossMargin * 10) / 10,
    operatingProfit: Math.round(operatingProfit * 100) / 100,
    operatingMarginPercent: Math.round(operatingMargin * 10) / 10,
    netProfit: Math.round(netProfit * 100) / 100,
    netMarginPercent: Math.round(netMargin * 10) / 10
  };
}

// 13. Conversions: Km to Miles
export const KM_TO_MILE_FACTOR = 0.62137119223733;
export const MILE_TO_KM_FACTOR = 1.609344;

export function convertKmToMiles(val: number, isKmToMiles: boolean, precision: number = 2) {
  if (isKmToMiles) {
    const miles = val * KM_TO_MILE_FACTOR;
    return parseFloat(miles.toFixed(precision));
  } else {
    const km = val * MILE_TO_KM_FACTOR;
    return parseFloat(km.toFixed(precision));
  }
}

// Pace conversions
export function convertPace(minutes: number, seconds: number, isKmToMiles: boolean) {
  const totalSeconds = (minutes * 60) + seconds;
  if (isKmToMiles) {
    // min/km to min/mile: 1 mile = 1.609344 km
    const secPerMile = totalSeconds * MILE_TO_KM_FACTOR;
    const m = Math.floor(secPerMile / 60);
    const s = Math.round(secPerMile % 60);
    return `${m}:${s < 10 ? '0' : ''}${s} /mile`;
  } else {
    // min/mile to min/km
    const secPerKm = totalSeconds * KM_TO_MILE_FACTOR;
    const m = Math.floor(secPerKm / 60);
    const s = Math.round(secPerKm % 60);
    return `${m}:${s < 10 ? '0' : ''}${s} /km`;
  }
}

// 14. Grams to Cups
export function convertGramsToCups(grams: number, gramsPerCup: number) {
  const cups = grams / gramsPerCup;
  const tablespoons = cups * 16;
  const ounces = grams / 28.3495;
  return {
    cups: Math.round(cups * 1000) / 1000,
    tablespoons: Math.round(tablespoons * 10) / 10,
    ounces: Math.round(ounces * 100) / 100
  };
}

// 15. Fabric Yardage Calculator
export interface FabricInput {
  projectType: 'curtains' | 'throw_pillow' | 'box_cushion' | 'tablecloth' | 'quilt_backing';
  lengthInches: number;
  widthInches: number;
  fabricWidthInches: number; // 44, 54, 60
  verticalRepeatInches: number; // 0 for solid
  quantity: number;
  wasteMarginPercent: number; // typically 10-15%
}

export function calculateFabricYardage(input: FabricInput) {
  // Add hem and seam allowance based on project
  let hemAllowance = 0;
  if (input.projectType === 'curtains') hemAllowance = 8; // 4" top + 4" bottom hem
  else if (input.projectType === 'throw_pillow') hemAllowance = 1; // 1/2" seams
  else if (input.projectType === 'tablecloth') hemAllowance = 2;
  else hemAllowance = 1;

  let cutLength = input.lengthInches + hemAllowance;
  if (input.verticalRepeatInches > 0) {
    // Round cut length up to nearest whole repeat
    cutLength = Math.ceil(cutLength / input.verticalRepeatInches) * input.verticalRepeatInches;
  }

  // Width panels needed
  const cutsPerWidth = Math.max(1, Math.floor(input.fabricWidthInches / (input.widthInches + hemAllowance)));
  const totalCutsNeeded = input.quantity;
  const rowsNeeded = Math.ceil(totalCutsNeeded / cutsPerWidth);

  const totalInchesNeeded = (rowsNeeded * cutLength) * (1 + (input.wasteMarginPercent / 100));
  const yardsNeeded = Math.ceil((totalInchesNeeded / 36) * 10) / 10;

  return {
    cutLengthInches: cutLength,
    cutsPerWidth,
    totalCutsNeeded,
    totalInchesNeeded: Math.round(totalInchesNeeded),
    yardsNeeded: Math.max(0.5, yardsNeeded)
  };
}

// 16. Percentage Calculator
export function calculatePercentages(mode: 'is_percent_of' | 'percent_of' | 'increase_decrease' | 'difference', val1: number, val2: number) {
  switch (mode) {
    case 'percent_of': {
      // What is val1% of val2?
      const result = (val1 / 100) * val2;
      return { result: Math.round(result * 1000) / 1000, explanation: `${val1}% of ${val2} = ${result}` };
    }
    case 'is_percent_of': {
      // val1 is what % of val2?
      const result = val2 !== 0 ? (val1 / val2) * 100 : 0;
      return { result: Math.round(result * 100) / 100, explanation: `${val1} is ${Math.round(result * 100) / 100}% of ${val2}` };
    }
    case 'increase_decrease': {
      // % change from val1 to val2
      const diff = val2 - val1;
      const pct = val1 !== 0 ? (diff / Math.abs(val1)) * 100 : 0;
      return { result: Math.round(pct * 100) / 100, explanation: `${pct >= 0 ? '+' : ''}${Math.round(pct * 100) / 100}% change` };
    }
    case 'difference': {
      // % difference between val1 and val2
      const avg = (Math.abs(val1) + Math.abs(val2)) / 2;
      const diff = Math.abs(val1 - val2);
      const pct = avg !== 0 ? (diff / avg) * 100 : 0;
      return { result: Math.round(pct * 100) / 100, explanation: `${Math.round(pct * 100) / 100}% difference` };
    }
  }
}

// 17. Average Calculator
export function calculateAverages(numbers: number[]) {
  if (numbers.length === 0) {
    return { mean: 0, median: 0, mode: [], range: 0, min: 0, max: 0, count: 0, sum: 0, variance: 0, standardDeviation: 0 };
  }

  const count = numbers.length;
  const sum = numbers.reduce((a, b) => a + b, 0);
  const mean = sum / count;

  const sorted = [...numbers].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const range = max - min;

  // Median
  let median = 0;
  const mid = Math.floor(count / 2);
  if (count % 2 === 0) {
    median = (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    median = sorted[mid];
  }

  // Mode
  const frequency: Record<number, number> = {};
  let maxFreq = 0;
  for (const n of numbers) {
    frequency[n] = (frequency[n] || 0) + 1;
    if (frequency[n] > maxFreq) maxFreq = frequency[n];
  }
  const modes: number[] = [];
  if (maxFreq > 1) {
    for (const [k, v] of Object.entries(frequency)) {
      if (v === maxFreq) modes.push(Number(k));
    }
  }

  // Sample variance & standard deviation
  let variance = 0;
  if (count > 1) {
    const squaredDiffs = numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    variance = squaredDiffs / (count - 1);
  }
  const standardDeviation = Math.sqrt(variance);

  return {
    mean: Math.round(mean * 1000) / 1000,
    median: Math.round(median * 1000) / 1000,
    mode: modes,
    range: Math.round(range * 1000) / 1000,
    min,
    max,
    count,
    sum: Math.round(sum * 100) / 100,
    variance: Math.round(variance * 1000) / 1000,
    standardDeviation: Math.round(standardDeviation * 1000) / 1000
  };
}

// 18. TDEE Calculator
export function calculateTDEE(weightKg: number, heightCm: number, age: number, gender: 'male' | 'female', activityMultiplier: number) {
  // Mifflin-St Jeor formula
  let bmr = 0;
  if (gender === 'male') {
    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
  } else {
    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
  }

  const tdee = Math.round(bmr * activityMultiplier);

  return {
    bmr: Math.round(bmr),
    tdee,
    mildLoss: tdee - 250, // ~0.5 lb/week
    weightLoss: tdee - 500, // ~1.0 lb/week
    extremeLoss: tdee - 750, // ~1.5 lb/week
    mildGain: tdee + 250,
    weightGain: tdee + 500
  };
}

// 19. Protein Intake Calculator
export function calculateProteinIntake(weightLbs: number, activityLevel: 'sedentary' | 'moderate' | 'hypertrophy' | 'fat_loss') {
  const weightKg = weightLbs / 2.20462;
  let factorMin = 0.8;
  let factorMax = 1.0;

  switch (activityLevel) {
    case 'sedentary':
      factorMin = 0.8;
      factorMax = 1.0;
      break;
    case 'moderate':
      factorMin = 1.2;
      factorMax = 1.6;
      break;
    case 'hypertrophy':
      factorMin = 1.6;
      factorMax = 2.2;
      break;
    case 'fat_loss':
      factorMin = 1.8;
      factorMax = 2.4;
      break;
  }

  const minGrams = Math.round(weightKg * factorMin);
  const maxGrams = Math.round(weightKg * factorMax);
  const perMealMin = Math.round(minGrams / 4);
  const perMealMax = Math.round(maxGrams / 4);

  return {
    minGrams,
    maxGrams,
    perMealMin,
    perMealMax,
    weightKg: Math.round(weightKg * 10) / 10
  };
}

// 20. Body Fat Calculator (US Navy Tape Method)
export function calculateBodyFat(gender: 'male' | 'female', heightInches: number, neckInches: number, waistInches: number, hipInches: number = 0) {
  let bodyFatPercent = 0;

  if (gender === 'male') {
    // 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
    const diff = Math.max(0.1, waistInches - neckInches);
    bodyFatPercent = (86.010 * Math.log10(diff)) - (70.041 * Math.log10(heightInches)) + 36.76;
  } else {
    // 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387
    const sum = Math.max(0.1, waistInches + hipInches - neckInches);
    bodyFatPercent = (163.205 * Math.log10(sum)) - (97.684 * Math.log10(heightInches)) - 78.387;
  }

  bodyFatPercent = Math.max(2, Math.min(65, Math.round(bodyFatPercent * 10) / 10));

  let category = '';
  if (gender === 'male') {
    if (bodyFatPercent < 6) category = 'Essential Fat';
    else if (bodyFatPercent <= 13) category = 'Athletes';
    else if (bodyFatPercent <= 17) category = 'Fitness';
    else if (bodyFatPercent <= 24) category = 'Average';
    else category = 'Obese';
  } else {
    if (bodyFatPercent < 14) category = 'Essential Fat';
    else if (bodyFatPercent <= 20) category = 'Athletes';
    else if (bodyFatPercent <= 24) category = 'Fitness';
    else if (bodyFatPercent <= 31) category = 'Average';
    else category = 'Obese';
  }

  return {
    bodyFatPercent,
    category
  };
}

// 21. Helper Math Functions: GCD & LCM
export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(Math.round((a * b) / gcd(a, b)));
}

export function getPrimeFactors(n: number): number[] {
  n = Math.abs(Math.round(n));
  const factors: number[] = [];
  let d = 2;
  while (d * d <= n) {
    while (n % d === 0) {
      factors.push(d);
      n = Math.floor(n / d);
    }
    d++;
  }
  if (n > 1) factors.push(n);
  return factors;
}

// 22. LCM Calculator
export function calculateLCM(numbers: number[]) {
  const valid = numbers.filter((n) => !isNaN(n) && n > 0).map((n) => Math.round(n));
  if (valid.length === 0) {
    return { lcm: 0, primeFactors: {}, steps: 'Please enter positive integers.' };
  }

  let resultLcm = valid[0];
  for (let i = 1; i < valid.length; i++) {
    resultLcm = lcm(resultLcm, valid[i]);
  }

  const factorMap: Record<number, string> = {};
  for (const n of valid) {
    const factors = getPrimeFactors(n);
    factorMap[n] = factors.length > 0 ? factors.join(' × ') : `${n}`;
  }

  const steps = `LCM(${valid.join(', ')}) = ${resultLcm}. Evaluated via prime factor decomposition.`;

  return {
    lcm: resultLcm,
    primeFactors: factorMap,
    steps,
    count: valid.length
  };
}

// 23. GCF / GCD Calculator
export function calculateGCF(numbers: number[]) {
  const valid = numbers.filter((n) => !isNaN(n) && n > 0).map((n) => Math.round(n));
  if (valid.length === 0) {
    return { gcf: 0, divisors: {}, commonDivisors: [], steps: 'Please enter positive integers.' };
  }

  let resultGcf = valid[0];
  for (let i = 1; i < valid.length; i++) {
    resultGcf = gcd(resultGcf, valid[i]);
  }

  // Find all divisors for each
  const divisorsMap: Record<number, number[]> = {};
  for (const n of valid) {
    const divs: number[] = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) divs.push(i);
    }
    divisorsMap[n] = divs;
  }

  // Common divisors
  const common = divisorsMap[valid[0]].filter((d) =>
    valid.every((n) => divisorsMap[n].includes(d))
  );

  return {
    gcf: resultGcf,
    divisors: divisorsMap,
    commonDivisors: common,
    steps: `GCF of ${valid.join(', ')} is ${resultGcf}. Common factors: ${common.join(', ')}.`
  };
}

// 24. Complex Number Calculator
export function calculateComplexNumber(
  r1: number,
  i1: number,
  r2: number,
  i2: number,
  operation: 'add' | 'subtract' | 'multiply' | 'divide'
) {
  let real = 0;
  let imag = 0;
  let steps: string[] = [];

  switch (operation) {
    case 'add':
      real = r1 + r2;
      imag = i1 + i2;
      steps = [
        `(${r1} + ${i1}i) + (${r2} + ${i2}i)`,
        `Group real and imaginary parts: (${r1} + ${r2}) + (${i1} + ${i2})i`,
        `= ${real} + ${imag}i`
      ];
      break;
    case 'subtract':
      real = r1 - r2;
      imag = i1 - i2;
      steps = [
        `(${r1} + ${i1}i) - (${r2} + ${i2}i)`,
        `Subtract components: (${r1} - ${r2}) + (${i1} - ${i2})i`,
        `= ${real} ${imag >= 0 ? '+' : '-'} ${Math.abs(imag)}i`
      ];
      break;
    case 'multiply':
      // (a + bi)(c + di) = (ac - bd) + (ad + bc)i
      real = (r1 * r2) - (i1 * i2);
      imag = (r1 * i2) + (i1 * r2);
      steps = [
        `(${r1} + ${i1}i) × (${r2} + ${i2}i)`,
        `FOIL expansion: (${r1}×${r2}) + (${r1}×${i2}i) + (${i1}i×${r2}) + (${i1}×${i2}i²)`,
        `Since i² = -1: (${r1 * r2} - ${i1 * i2}) + (${r1 * i2} + ${i1 * r2})i`,
        `= ${real} ${imag >= 0 ? '+' : '-'} ${Math.abs(imag)}i`
      ];
      break;
    case 'divide': {
      const denom = (r2 * r2) + (i2 * i2);
      if (denom === 0) {
        return {
          real: 0,
          imag: 0,
          display: 'Undefined (Division by 0)',
          modulus1: 0,
          modulus2: 0,
          arg1Deg: 0,
          arg2Deg: 0,
          polar1: '',
          polar2: '',
          steps: ['Division by zero complex number is undefined.']
        };
      }
      real = ((r1 * r2) + (i1 * i2)) / denom;
      imag = ((i1 * r2) - (r1 * i2)) / denom;
      steps = [
        `(${r1} + ${i1}i) / (${r2} + ${i2}i)`,
        `Multiply numerator & denominator by complex conjugate (${r2} - ${i2}i):`,
        `Numerator: (${r1} + ${i1}i)(${r2} - ${i2}i) = ${(r1 * r2) + (i1 * i2)} + ${(i1 * r2) - (r1 * i2)}i`,
        `Denominator: ${r2}² + ${i2}² = ${denom}`,
        `= ${Math.round(real * 1000) / 1000} ${imag >= 0 ? '+' : '-'} ${Math.abs(Math.round(imag * 1000) / 1000)}i`
      ];
      break;
    }
  }

  // Modulus & Argument for z1 and z2
  const mod1 = Math.sqrt((r1 * r1) + (i1 * i1));
  const mod2 = Math.sqrt((r2 * r2) + (i2 * i2));
  const arg1 = Math.atan2(i1, r1);
  const arg2 = Math.atan2(i2, r2);
  const arg1Deg = Math.round((arg1 * (180 / Math.PI)) * 10) / 10;
  const arg2Deg = Math.round((arg2 * (180 / Math.PI)) * 10) / 10;

  const polar1 = `${Math.round(mod1 * 100) / 100}(cos(${arg1Deg}°) + i·sin(${arg1Deg}°))`;
  const polar2 = `${Math.round(mod2 * 100) / 100}(cos(${arg2Deg}°) + i·sin(${arg2Deg}°))`;

  const roundedReal = Math.round(real * 1000) / 1000;
  const roundedImag = Math.round(imag * 1000) / 1000;

  return {
    real: roundedReal,
    imag: roundedImag,
    display: `${roundedReal} ${roundedImag >= 0 ? '+' : '-'} ${Math.abs(roundedImag)}i`,
    modulus1: Math.round(mod1 * 100) / 100,
    modulus2: Math.round(mod2 * 100) / 100,
    arg1Deg,
    arg2Deg,
    polar1,
    polar2,
    steps
  };
}

// 25. Aspect Ratio & Ratio Reducer Calculator
export function calculateAspectRatio(
  width: number,
  height: number,
  targetWidth?: number,
  targetHeight?: number
) {
  const w = Math.max(1, Math.round(width || 1920));
  const h = Math.max(1, Math.round(height || 1080));
  const divisor = gcd(w, h);
  const simpleW = w / divisor;
  const simpleH = h / divisor;
  const decimalRatio = Math.round((w / h) * 1000) / 1000;

  let scaledWidth = targetWidth;
  let scaledHeight = targetHeight;

  if (targetWidth && !targetHeight) {
    scaledHeight = Math.round((targetWidth * h) / w);
  } else if (targetHeight && !targetWidth) {
    scaledWidth = Math.round((targetHeight * w) / h);
  }

  return {
    originalWidth: w,
    originalHeight: h,
    simplifiedRatio: `${simpleW}:${simpleH}`,
    decimalRatio,
    scaledWidth: scaledWidth || w,
    scaledHeight: scaledHeight || h,
    percentage: Math.round((h / w) * 1000) / 10
  };
}

// 26. Fraction Calculator
export function calculateFractions(
  whole1: number,
  num1: number,
  den1: number,
  whole2: number,
  num2: number,
  den2: number,
  op: '+' | '-' | '×' | '÷'
) {
  den1 = den1 === 0 ? 1 : den1;
  den2 = den2 === 0 ? 1 : den2;

  // Convert mixed to improper
  const sign1 = whole1 < 0 ? -1 : 1;
  const impNum1 = (Math.abs(whole1) * den1 + num1) * sign1;
  const sign2 = whole2 < 0 ? -1 : 1;
  const impNum2 = (Math.abs(whole2) * den2 + num2) * sign2;

  let resNum = 0;
  let resDen = 1;
  const steps: string[] = [];

  steps.push(`Fraction 1: ${whole1 ? `${whole1} ` : ''}${num1}/${den1} = ${impNum1}/${den1}`);
  steps.push(`Fraction 2: ${whole2 ? `${whole2} ` : ''}${num2}/${den2} = ${impNum2}/${den2}`);

  switch (op) {
    case '+': {
      const commonDen = lcm(den1, den2);
      const m1 = commonDen / den1;
      const m2 = commonDen / den2;
      resNum = (impNum1 * m1) + (impNum2 * m2);
      resDen = commonDen;
      steps.push(`Least Common Denominator (LCD) = ${commonDen}`);
      steps.push(`(${impNum1} × ${m1}) / ${commonDen} + (${impNum2} × ${m2}) / ${commonDen} = ${resNum}/${resDen}`);
      break;
    }
    case '-': {
      const commonDen = lcm(den1, den2);
      const m1 = commonDen / den1;
      const m2 = commonDen / den2;
      resNum = (impNum1 * m1) - (impNum2 * m2);
      resDen = commonDen;
      steps.push(`Least Common Denominator (LCD) = ${commonDen}`);
      steps.push(`(${impNum1} × ${m1}) / ${commonDen} - (${impNum2} × ${m2}) / ${commonDen} = ${resNum}/${resDen}`);
      break;
    }
    case '×':
      resNum = impNum1 * impNum2;
      resDen = den1 * den2;
      steps.push(`Multiply numerators and denominators: (${impNum1} × ${impNum2}) / (${den1} × ${den2}) = ${resNum}/${resDen}`);
      break;
    case '÷':
      if (impNum2 === 0) {
        return {
          improperFraction: 'Undefined',
          simplifiedFraction: 'Undefined',
          mixedFraction: 'Undefined',
          decimalValue: 0,
          steps: ['Cannot divide by zero.']
        };
      }
      resNum = impNum1 * den2;
      resDen = den1 * impNum2;
      steps.push(`Invert divisor and multiply: (${impNum1}/${den1}) × (${den2}/${impNum2}) = ${resNum}/${resDen}`);
      break;
  }

  if (resDen < 0) {
    resNum = -resNum;
    resDen = -resDen;
  }

  // Simplify
  const commonDiv = gcd(resNum, resDen);
  const simpNum = resNum / commonDiv;
  const simpDen = resDen / commonDiv;

  steps.push(`Simplify by dividing by GCF (${commonDiv}): ${simpNum}/${simpDen}`);

  // Mixed representation
  const mixedWhole = Math.trunc(simpNum / simpDen);
  const mixedRem = Math.abs(simpNum % simpDen);
  let mixedDisplay = `${simpNum}/${simpDen}`;
  if (Math.abs(simpNum) >= simpDen && simpDen !== 1 && mixedRem !== 0) {
    mixedDisplay = `${mixedWhole} ${mixedRem}/${simpDen}`;
  } else if (simpDen === 1) {
    mixedDisplay = `${simpNum}`;
  }

  const decimalVal = Math.round((simpNum / simpDen) * 100000) / 100000;

  return {
    improperFraction: `${simpNum}/${simpDen}`,
    simplifiedFraction: simpDen === 1 ? `${simpNum}` : `${simpNum}/${simpDen}`,
    mixedFraction: mixedDisplay,
    decimalValue: decimalVal,
    steps
  };
}

// Factorial helper
export function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity; // JS max float limit
  let res = 1;
  for (let i = 2; i <= Math.floor(n); i++) {
    res *= i;
  }
  return res;
}

// Permutation nPr
export function nPr(n: number, r: number): number {
  if (n < 0 || r < 0 || r > n) return 0;
  return factorial(n) / factorial(n - r);
}

// Combination nCr
export function nCr(n: number, r: number): number {
  if (n < 0 || r < 0 || r > n) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
}

// 27. Scientific Calculator Evaluator (Enhanced with Advanced Scientific Functions)
export function evaluateScientificExpression(expr: string, angleMode: 'deg' | 'rad' = 'deg'): { result: number; error?: string } {
  try {
    let clean = expr.trim();
    if (!clean) return { result: 0 };

    // Substitute constants
    clean = clean.replace(/π/g, `(${Math.PI})`).replace(/e(?![a-zA-Z])/g, `(${Math.E})`);

    // Handle factorial syntax: e.g. 5! or (3+2)!
    clean = clean.replace(/(\d+)!/g, (_, num) => `calcFact(${num})`);

    // Handle trigonometric functions considering angleMode
    if (angleMode === 'deg') {
      clean = clean.replace(/sin\(([^)]+)\)/g, (_, val) => `Math.sin((${val}) * Math.PI / 180)`);
      clean = clean.replace(/cos\(([^)]+)\)/g, (_, val) => `Math.cos((${val}) * Math.PI / 180)`);
      clean = clean.replace(/tan\(([^)]+)\)/g, (_, val) => `Math.tan((${val}) * Math.PI / 180)`);
      clean = clean.replace(/asin\(([^)]+)\)/g, (_, val) => `(Math.asin(${val}) * 180 / Math.PI)`);
      clean = clean.replace(/acos\(([^)]+)\)/g, (_, val) => `(Math.acos(${val}) * 180 / Math.PI)`);
      clean = clean.replace(/atan\(([^)]+)\)/g, (_, val) => `(Math.atan(${val}) * 180 / Math.PI)`);
    } else {
      clean = clean.replace(/sin\(/g, 'Math.sin(');
      clean = clean.replace(/cos\(/g, 'Math.cos(');
      clean = clean.replace(/tan\(/g, 'Math.tan(');
      clean = clean.replace(/asin\(/g, 'Math.asin(');
      clean = clean.replace(/acos\(/g, 'Math.acos(');
      clean = clean.replace(/atan\(/g, 'Math.atan(');
    }

    // Hyperbolic
    clean = clean.replace(/sinh\(/g, 'Math.sinh(');
    clean = clean.replace(/cosh\(/g, 'Math.cosh(');
    clean = clean.replace(/tanh\(/g, 'Math.tanh(');

    // Powers, roots, logs
    clean = clean.replace(/sqrt\(/g, 'Math.sqrt(');
    clean = clean.replace(/cbrt\(/g, 'Math.cbrt(');
    clean = clean.replace(/log\(/g, 'Math.log10(');
    clean = clean.replace(/ln\(/g, 'Math.log(');
    clean = clean.replace(/abs\(/g, 'Math.abs(');
    clean = clean.replace(/\^/g, '**');

    // Safe mathematical evaluation (strictly allow numbers, operators, Math.*, calcFact)
    if (!/^[0-9+\-*/().\s,Mathsincoqrtlgbp**PIEcalcFactd]+$/.test(clean)) {
      return { result: 0, error: 'Invalid characters in expression' };
    }

    // Evaluate
    const evalScope = {
      Math,
      calcFact: factorial
    };
    // eslint-disable-next-line no-new-func
    const fn = new Function('Math', 'calcFact', `"use strict"; return (${clean});`);
    const res = fn(evalScope.Math, evalScope.calcFact);

    if (typeof res !== 'number' || isNaN(res) || !isFinite(res)) {
      return { result: 0, error: 'Math error' };
    }
    return { result: Math.round(res * 100000000) / 100000000 };
  } catch (err: any) {
    return { result: 0, error: 'Syntax error' };
  }
}

// 28. Comprehensive Mean Calculator Engine
export function calculateMean(numbers: number[], weights?: number[], trimmedPercent: number = 0) {
  const valid = numbers.filter((n) => !isNaN(n));
  if (valid.length === 0) {
    return {
      arithmeticMean: 0,
      geometricMean: null,
      harmonicMean: null,
      weightedMean: null,
      trimmedMean: 0,
      median: 0,
      mode: [] as number[],
      sum: 0,
      count: 0,
      min: 0,
      max: 0,
      range: 0,
      sampleVariance: 0,
      sampleStdDev: 0,
      steps: ['Please enter at least one number.']
    };
  }

  const count = valid.length;
  const sum = valid.reduce((a, b) => a + b, 0);
  const arithmeticMean = Math.round((sum / count) * 100000) / 100000;

  // Geometric Mean: nth root of product (only for strictly positive numbers)
  let geometricMean: number | null = null;
  const allPositive = valid.every((n) => n > 0);
  if (allPositive) {
    // Use sum of logs for numerical stability
    const logSum = valid.reduce((acc, val) => acc + Math.log(val), 0);
    geometricMean = Math.round(Math.exp(logSum / count) * 100000) / 100000;
  }

  // Harmonic Mean: n / sum(1/x) (only if no zeros)
  let harmonicMean: number | null = null;
  const hasZero = valid.some((n) => n === 0);
  if (!hasZero && allPositive) {
    const reciprocalSum = valid.reduce((acc, val) => acc + (1 / val), 0);
    harmonicMean = Math.round((count / reciprocalSum) * 100000) / 100000;
  }

  // Weighted Mean
  let weightedMean: number | null = null;
  if (weights && weights.length === count) {
    let weightSum = 0;
    let weightedValueSum = 0;
    for (let i = 0; i < count; i++) {
      weightSum += weights[i];
      weightedValueSum += valid[i] * weights[i];
    }
    if (weightSum > 0) {
      weightedMean = Math.round((weightedValueSum / weightSum) * 100000) / 100000;
    }
  }

  // Sorted for median and trimmed mean
  const sorted = [...valid].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const range = Math.round((max - min) * 100000) / 100000;

  // Median
  const mid = Math.floor(count / 2);
  const median = count % 2 === 0
    ? Math.round(((sorted[mid - 1] + sorted[mid]) / 2) * 100000) / 100000
    : sorted[mid];

  // Mode
  const freqMap: Record<number, number> = {};
  let maxFreq = 0;
  for (const n of valid) {
    freqMap[n] = (freqMap[n] || 0) + 1;
    if (freqMap[n] > maxFreq) maxFreq = freqMap[n];
  }
  const mode: number[] = [];
  if (maxFreq > 1) {
    for (const [k, v] of Object.entries(freqMap)) {
      if (v === maxFreq) mode.push(Number(k));
    }
  }

  // Trimmed Mean (e.g. 10% trimmed from both ends)
  let trimmedMean = arithmeticMean;
  if (trimmedPercent > 0 && trimmedPercent < 50 && count >= 4) {
    const trimCount = Math.floor((count * trimmedPercent) / 100);
    const trimmedArr = sorted.slice(trimCount, count - trimCount);
    if (trimmedArr.length > 0) {
      const trimSum = trimmedArr.reduce((a, b) => a + b, 0);
      trimmedMean = Math.round((trimSum / trimmedArr.length) * 100000) / 100000;
    }
  }

  // Sample Variance & Standard Deviation
  let sampleVariance = 0;
  let sampleStdDev = 0;
  if (count > 1) {
    const sqDiffSum = valid.reduce((acc, val) => acc + Math.pow(val - arithmeticMean, 2), 0);
    sampleVariance = Math.round((sqDiffSum / (count - 1)) * 100000) / 100000;
    sampleStdDev = Math.round(Math.sqrt(sampleVariance) * 100000) / 100000;
  }

  const steps = [
    `1. Count of observations (n) = ${count}`,
    `2. Sum of all values (Σx) = ${valid.join(' + ')} = ${sum}`,
    `3. Arithmetic Mean (x̄) = Σx / n = ${sum} / ${count} = ${arithmeticMean}`,
    `4. Sorted data set = [${sorted.join(', ')}]`,
    `5. Median = ${median}${mode.length > 0 ? `, Mode = [${mode.join(', ')}] (frequency: ${maxFreq})` : ', Mode: No unique mode'}`
  ];

  return {
    arithmeticMean,
    geometricMean,
    harmonicMean,
    weightedMean,
    trimmedMean,
    median,
    mode,
    sum,
    count,
    min,
    max,
    range,
    sampleVariance,
    sampleStdDev,
    steps
  };
}

// 29. Ratio Calculator & Proportion Solver (A : B = C : D)
export function solveRatioProportion(
  a: number | null,
  b: number | null,
  c: number | null,
  d: number | null
) {
  let solvedKey: 'A' | 'B' | 'C' | 'D' | null = null;
  let resultValue = 0;
  let steps = '';

  if (a === null && b !== null && c !== null && d !== null && d !== 0) {
    solvedKey = 'A';
    resultValue = (b * c) / d;
    steps = `A = (B × C) / D = (${b} × ${c}) / ${d} = ${Math.round(resultValue * 10000) / 10000}`;
  } else if (b === null && a !== null && c !== null && d !== null && c !== 0) {
    solvedKey = 'B';
    resultValue = (a * d) / c;
    steps = `B = (A × D) / C = (${a} × ${d}) / ${c} = ${Math.round(resultValue * 10000) / 10000}`;
  } else if (c === null && a !== null && b !== null && d !== null && b !== 0) {
    solvedKey = 'C';
    resultValue = (a * d) / b;
    steps = `C = (A × D) / B = (${a} × ${d}) / ${b} = ${Math.round(resultValue * 10000) / 10000}`;
  } else if (d === null && a !== null && b !== null && c !== null && a !== 0) {
    solvedKey = 'D';
    resultValue = (b * c) / a;
    steps = `D = (B × C) / A = (${b} × ${c}) / ${a} = ${Math.round(resultValue * 10000) / 10000}`;
  }

  return {
    solvedKey,
    resultValue: Math.round(resultValue * 10000) / 10000,
    steps
  };
}

// Simplify Multi-term Ratio (e.g. 24 : 36 : 60 => 2 : 3 : 5)
export function simplifyRatioTerms(terms: number[]) {
  const valid = terms.filter((t) => !isNaN(t) && t > 0).map((t) => Math.round(t));
  if (valid.length === 0) return { simplified: '', gcf: 1, decimalRatio: 0 };

  let commonGcf = valid[0];
  for (let i = 1; i < valid.length; i++) {
    commonGcf = gcd(commonGcf, valid[i]);
  }

  const simplified = valid.map((t) => t / commonGcf).join(' : ');
  const decimalRatio = valid.length === 2 && valid[1] !== 0 ? Math.round((valid[0] / valid[1]) * 10000) / 10000 : 0;

  return {
    simplified,
    gcf: commonGcf,
    decimalRatio
  };
}

// 30. Decimal to Fraction Converter
export function convertDecimalToFraction(decimalVal: number, tolerance: number = 1.0e-6) {
  if (isNaN(decimalVal)) {
    return {
      simplifiedFraction: '0/1',
      mixedFraction: '0',
      numerator: 0,
      denominator: 1,
      whole: 0,
      steps: ['Please enter a valid decimal number.']
    };
  }

  const sign = decimalVal < 0 ? -1 : 1;
  const absVal = Math.abs(decimalVal);
  const whole = Math.floor(absVal);
  const fracPart = absVal - whole;

  if (fracPart < tolerance) {
    return {
      simplifiedFraction: `${sign * whole}/1`,
      mixedFraction: `${sign * whole}`,
      numerator: sign * whole,
      denominator: 1,
      whole: sign * whole,
      steps: [`${decimalVal} is already an integer (${whole}).`]
    };
  }

  // Continued fraction approximation for exact rational reproduction
  let h1 = 1, h2 = 0;
  let k1 = 0, k2 = 1;
  let b = fracPart;

  do {
    const a = Math.floor(b);
    let aux = h1;
    h1 = a * h1 + h2;
    h2 = aux;
    aux = k1;
    k1 = a * k1 + k2;
    k2 = aux;
    b = 1 / (b - a);
  } while (Math.abs(fracPart - h1 / k1) > fracPart * tolerance && k1 < 1000000);

  const fracNum = h1;
  const fracDen = k1;
  const totalNum = sign * (whole * fracDen + fracNum);

  const commonDiv = gcd(fracNum, fracDen);
  const simpFracNum = fracNum / commonDiv;
  const simpFracDen = fracDen / commonDiv;
  const simpTotalNum = totalNum / commonDiv;

  const steps = [
    `1. Identify whole number component: ${whole}`,
    `2. Isolate fractional decimal component: ${fracPart.toFixed(6)}`,
    `3. Rationalize fractional part: ${simpFracNum} / ${simpFracDen}`,
    whole > 0
      ? `4. Combine whole with fraction: ${whole} ${simpFracNum}/${simpFracDen}`
      : `4. Simplified fraction: ${simpFracNum}/${simpFracDen}`,
    `5. Improper fraction: ${simpTotalNum}/${simpFracDen}`
  ];

  return {
    simplifiedFraction: `${simpTotalNum}/${simpFracDen}`,
    mixedFraction: whole > 0 ? `${sign < 0 ? '-' : ''}${whole} ${simpFracNum}/${simpFracDen}` : `${sign < 0 ? '-' : ''}${simpFracNum}/${simpFracDen}`,
    numerator: simpTotalNum,
    denominator: simpFracDen,
    whole: sign * whole,
    fracNumerator: simpFracNum,
    fracDenominator: simpFracDen,
    steps
  };
}

