import { CurrencyPair } from '../types';

export interface CurrencyItem {
  code: string;
  name: string;
  symbol: string;
  rateAgainstUSD: number; // 1 USD = X Currency
}

export const majorCurrencies: CurrencyItem[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rateAgainstUSD: 1.0000 },
  { code: 'EUR', name: 'Euro', symbol: '€', rateAgainstUSD: 0.9245 },
  { code: 'GBP', name: 'British Pound Sterling', symbol: '£', rateAgainstUSD: 0.7715 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', rateAgainstUSD: 1.3820 },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', rateAgainstUSD: 19.350 },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', rateAgainstUSD: 57.800 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rateAgainstUSD: 84.050 },
  { code: 'CNY', name: 'Chinese Yuan (RMB)', symbol: '¥', rateAgainstUSD: 7.1250 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rateAgainstUSD: 149.80 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rateAgainstUSD: 1.4920 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rateAgainstUSD: 0.8650 },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', rateAgainstUSD: 5.650 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', rateAgainstUSD: 1.3150 },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', rateAgainstUSD: 7.7710 },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', rateAgainstUSD: 1.6520 },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', rateAgainstUSD: 10.450 },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', rateAgainstUSD: 10.820 },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', rateAgainstUSD: 1358.00 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', rateAgainstUSD: 17.650 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', rateAgainstUSD: 3.6725 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', rateAgainstUSD: 3.7510 },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', rateAgainstUSD: 3.9850 },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', rateAgainstUSD: 33.250 },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', rateAgainstUSD: 15580.00 },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', rateAgainstUSD: 34.250 },
  { code: 'TWD', name: 'New Taiwan Dollar', symbol: 'NT$', rateAgainstUSD: 32.150 },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', rateAgainstUSD: 6.8920 },
  { code: 'ILS', name: 'Israeli New Shekel', symbol: '₪', rateAgainstUSD: 3.7420 },
  { code: 'CLP', name: 'Chilean Peso', symbol: 'CLP$', rateAgainstUSD: 938.50 },
  { code: 'COP', name: 'Colombian Peso', symbol: 'COL$', rateAgainstUSD: 4225.00 }
];

export const dedicatedPairs: Record<string, CurrencyPair> = {
  'usd-to-php': {
    slug: 'usd-to-php',
    base: 'USD',
    quote: 'PHP',
    baseName: 'US Dollar',
    quoteName: 'Philippine Peso',
    rate: 57.80,
    inverseRate: 1 / 57.80,
    symbol: '₱',
    historical30Days: [57.10, 57.18, 57.25, 57.32, 57.28, 57.35, 57.42, 57.50, 57.48, 57.55, 57.62, 57.58, 57.65, 57.70, 57.68, 57.75, 57.82, 57.78, 57.85, 57.90, 57.84, 57.80, 57.76, 57.82, 57.85, 57.79, 57.83, 57.78, 57.81, 57.80],
    notes: 'The Philippine Peso (PHP) is issued by the Bangko Sentral ng Pilipinas (BSP). Remittance inflows from Overseas Filipino Workers (OFWs) represent approximately 9% of the national GDP, making USD to PHP one of the highest-volume personal remittance corridors globally.',
    feeComparison: [
      { provider: 'Mid-Market Rate (LapTools Benchmark)', fee: '$0.00', exchangeRateMargin: '0.00%', recipientGets: '₱57,800' },
      { provider: 'Specialized Remittance (Wise / Remitly)', fee: '$3.50 - $4.99', exchangeRateMargin: '0.40% - 0.80%', recipientGets: '₱57,350' },
      { provider: 'Traditional US Bank Wire (Chase, BofA)', fee: '$35.00 - $45.00', exchangeRateMargin: '3.00% - 4.50%', recipientGets: '₱53,200' },
      { provider: 'Retail Cash Pickup Counter', fee: '$5.00 - $12.00', exchangeRateMargin: '2.50% - 3.80%', recipientGets: '₱55,400' }
    ]
  },
  'usd-to-rmb': {
    slug: 'usd-to-rmb',
    base: 'USD',
    quote: 'CNY',
    baseName: 'US Dollar',
    quoteName: 'Chinese Yuan (RMB)',
    rate: 7.1250,
    inverseRate: 1 / 7.1250,
    symbol: '¥',
    historical30Days: [7.092, 7.098, 7.105, 7.112, 7.108, 7.115, 7.120, 7.128, 7.122, 7.118, 7.124, 7.130, 7.126, 7.132, 7.138, 7.130, 7.125, 7.120, 7.128, 7.135, 7.129, 7.122, 7.118, 7.124, 7.128, 7.122, 7.126, 7.120, 7.123, 7.125],
    notes: 'In foreign exchange markets, Renminbi (RMB) translates as "the people\'s currency", while the Yuan (CNY) is the primary unit of account. Crucially, Chinese currency trades in two distinct tiers: Onshore Yuan (CNY), strictly bounded within a 2% daily fluctuation band by the People\'s Bank of China (PBOC), and Offshore Yuan (CNH), traded internationally in Hong Kong, Singapore, and London with floating market liquidity.',
    feeComparison: [
      { provider: 'Mid-Market Rate (LapTools Benchmark)', fee: '$0.00', exchangeRateMargin: '0.00%', recipientGets: '¥7,125.00' },
      { provider: 'Business Trade Remittance Specialist', fee: '$15.00', exchangeRateMargin: '0.50% - 0.90%', recipientGets: '¥7,025.00' },
      { provider: 'Commercial Bank SWIFT Transfer', fee: '$40.00 - $50.00', exchangeRateMargin: '2.80% - 4.20%', recipientGets: '¥6,680.00' }
    ]
  },
  'usd-to-mxn': {
    slug: 'usd-to-mxn',
    base: 'USD',
    quote: 'MXN',
    baseName: 'US Dollar',
    quoteName: 'Mexican Peso',
    rate: 19.350,
    inverseRate: 1 / 19.350,
    symbol: 'Mex$',
    historical30Days: [19.12, 19.18, 19.24, 19.30, 19.26, 19.32, 19.38, 19.45, 19.40, 19.35, 19.42, 19.48, 19.43, 19.50, 19.55, 19.48, 19.42, 19.38, 19.44, 19.50, 19.45, 19.39, 19.34, 19.40, 19.44, 19.38, 19.41, 19.36, 19.38, 19.35],
    notes: 'The Mexican Peso (MXN) represents the most actively traded emerging-market currency in the Americas. Overseen by Banco de México (Banxico), the currency is heavily influenced by cross-border trade, nearshoring manufacturing investments, and bilateral US-Mexico remittance flows.',
    feeComparison: [
      { provider: 'Mid-Market Rate (LapTools Benchmark)', fee: '$0.00', exchangeRateMargin: '0.00%', recipientGets: 'Mex$19,350' },
      { provider: 'Digital Remittance App (Wise / Felix)', fee: '$2.99', exchangeRateMargin: '0.50% - 1.00%', recipientGets: 'Mex$19,100' },
      { provider: 'Supermarket Wire (MoneyGram/Western Union)', fee: '$6.00', exchangeRateMargin: '2.00% - 3.50%', recipientGets: 'Mex$18,550' },
      { provider: 'US Retail Bank International Wire', fee: '$35.00', exchangeRateMargin: '3.50% - 5.00%', recipientGets: 'Mex$17,800' }
    ]
  },
  'inr-to-usd': {
    slug: 'inr-to-usd',
    base: 'INR',
    quote: 'USD',
    baseName: 'Indian Rupee',
    quoteName: 'US Dollar',
    rate: 1 / 84.05,
    inverseRate: 84.05,
    symbol: '$',
    historical30Days: [0.01192, 0.01191, 0.01190, 0.01189, 0.01190, 0.01189, 0.01188, 0.01187, 0.01188, 0.01189, 0.01188, 0.01187, 0.01188, 0.01187, 0.01186, 0.01187, 0.01188, 0.01189, 0.01188, 0.01187, 0.01188, 0.01189, 0.01190, 0.01189, 0.01188, 0.01189, 0.01188, 0.01189, 0.01189, 0.01190],
    notes: 'The Indian Rupee (INR) is governed by the Reserve Bank of India (RBI). In Indian numbering nomenclature, large numbers follow the South Asian numbering format: 1 Lakh = 100,000 INR (~$1,190 USD) and 1 Crore = 10,000,000 INR (100 Lakhs, ~$118,976 USD).',
    feeComparison: [
      { provider: 'Mid-Market Rate (LapTools Benchmark)', fee: '₹0', exchangeRateMargin: '0.00%', recipientGets: '$1,189.77 per 1 Lakh' },
      { provider: 'Digital FX Remittance Service', fee: '₹450', exchangeRateMargin: '0.65%', recipientGets: '$1,175.50' },
      { provider: 'Indian Authorized Dealer Bank (LRS Remittance)', fee: '₹1,500 + GST', exchangeRateMargin: '2.50% - 3.80%', recipientGets: '$1,130.00' }
    ]
  },
  'gbp-to-usd': {
    slug: 'gbp-to-usd',
    base: 'GBP',
    quote: 'USD',
    baseName: 'British Pound Sterling',
    quoteName: 'US Dollar',
    rate: 1.2962,
    inverseRate: 1 / 1.2962,
    symbol: '$',
    historical30Days: [1.305, 1.302, 1.298, 1.295, 1.297, 1.294, 1.292, 1.289, 1.291, 1.293, 1.292, 1.290, 1.292, 1.291, 1.288, 1.290, 1.293, 1.295, 1.294, 1.292, 1.294, 1.296, 1.298, 1.296, 1.295, 1.296, 1.295, 1.297, 1.296, 1.2962],
    notes: 'Commonly known among international currency traders as "Cable" (commemorating the first transatlantic telegraph cable connecting the London and New York financial exchanges in 1866). The British Pound Sterling is issued by the Bank of England (BoE) and remains the world\'s fourth most reserved global currency.',
    feeComparison: [
      { provider: 'Mid-Market Rate (LapTools Benchmark)', fee: '£0.00', exchangeRateMargin: '0.00%', recipientGets: '$1,296.20' },
      { provider: 'Low-Cost International Fintech', fee: '£3.80', exchangeRateMargin: '0.35%', recipientGets: '$1,288.40' },
      { provider: 'High Street UK Bank Wire', fee: '£25.00', exchangeRateMargin: '2.75% - 4.00%', recipientGets: '$1,220.00' }
    ]
  },
  'usd-to-cad': {
    slug: 'usd-to-cad',
    base: 'USD',
    quote: 'CAD',
    baseName: 'US Dollar',
    quoteName: 'Canadian Dollar',
    rate: 1.3820,
    inverseRate: 1 / 1.3820,
    symbol: 'CA$',
    historical30Days: [1.365, 1.368, 1.372, 1.375, 1.372, 1.376, 1.379, 1.383, 1.380, 1.377, 1.381, 1.385, 1.382, 1.386, 1.389, 1.385, 1.381, 1.379, 1.382, 1.385, 1.383, 1.380, 1.378, 1.381, 1.384, 1.381, 1.383, 1.380, 1.381, 1.382],
    notes: 'Colloquially known as the "Loonie" after the aquatic bird depicted on the Canadian one-dollar coin. Overseen by the Bank of Canada (BoC), the USD to CAD exchange rate reflects profound cross-border supply chain integration, North American free trade agreements, and energy commodities pricing.',
    feeComparison: [
      { provider: 'Mid-Market Rate (LapTools Benchmark)', fee: '$0.00', exchangeRateMargin: '0.00%', recipientGets: 'CA$1,382.00' },
      { provider: 'Cross-Border FX Specialist (OFX / Wise)', fee: '$2.50', exchangeRateMargin: '0.45%', recipientGets: 'CA$1,372.50' },
      { provider: 'Standard US/Canadian Bank Transfer', fee: '$30.00', exchangeRateMargin: '2.50% - 3.50%', recipientGets: 'CA$1,305.00' }
    ]
  }
};
