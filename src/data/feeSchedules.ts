export interface EbayCategoryFee {
  id: string;
  name: string;
  standardPercent: number;
  standardOverThresholdPercent: number;
  threshold: number;
  storePercent: number;
  perOrderFeeLow: number;
  perOrderFeeHigh: number;
}

export const ebayCategoryFees: EbayCategoryFee[] = [
  {
    id: 'most_categories',
    name: 'Most Categories (Clothing, Electronics, Home & Garden, Toys)',
    standardPercent: 13.25,
    standardOverThresholdPercent: 2.35,
    threshold: 7500,
    storePercent: 12.35,
    perOrderFeeLow: 0.30,
    perOrderFeeHigh: 0.40
  },
  {
    id: 'books_movies_music',
    name: 'Books, DVDs & Movies, Music (except Vinyl)',
    standardPercent: 14.95,
    standardOverThresholdPercent: 2.35,
    threshold: 7500,
    storePercent: 14.35,
    perOrderFeeLow: 0.30,
    perOrderFeeHigh: 0.40
  },
  {
    id: 'musical_instruments',
    name: 'Guitars & Musical Instruments',
    standardPercent: 6.35,
    standardOverThresholdPercent: 2.35,
    threshold: 7500,
    storePercent: 6.00,
    perOrderFeeLow: 0.30,
    perOrderFeeHigh: 0.40
  },
  {
    id: 'jewelry_watches',
    name: 'Jewelry & Watches',
    standardPercent: 15.00,
    standardOverThresholdPercent: 9.00,
    threshold: 1000,
    storePercent: 12.50,
    perOrderFeeLow: 0.30,
    perOrderFeeHigh: 0.40
  },
  {
    id: 'athletic_shoes',
    name: 'Athletic Shoes ($150 and above)',
    standardPercent: 8.00,
    standardOverThresholdPercent: 8.00,
    threshold: 999999,
    storePercent: 7.00,
    perOrderFeeLow: 0.00,
    perOrderFeeHigh: 0.00
  },
  {
    id: 'heavy_equipment',
    name: 'Heavy Equipment & Commercial Printing',
    standardPercent: 3.00,
    standardOverThresholdPercent: 3.00,
    threshold: 15000,
    storePercent: 2.50,
    perOrderFeeLow: 0.30,
    perOrderFeeHigh: 0.40
  }
];

export const stripeFeeTiers = [
  { id: 'standard_online', name: 'Standard Online Cards (2.9% + $0.30)', percent: 2.9, fixed: 0.30 },
  { id: 'in_person', name: 'Stripe Terminal / In-Person (2.7% + $0.05)', percent: 2.7, fixed: 0.05 },
  { id: 'international_online', name: 'International Cards (4.4% + $0.30)', percent: 4.4, fixed: 0.30 }
];

export const paypalFeeTiers = [
  { id: 'standard_checkout', name: 'PayPal Standard Checkout & Goods (2.99% + $0.49)', percent: 2.99, fixed: 0.49 },
  { id: 'invoicing', name: 'PayPal Invoicing & Payment Requests (3.49% + $0.49)', percent: 3.49, fixed: 0.49 },
  { id: 'qr_above_10', name: 'PayPal QR Code Transactions > $10.00 (1.90% + $0.10)', percent: 1.90, fixed: 0.10 },
  { id: 'international_checkout', name: 'International Commercial Transactions (4.49% + $0.49)', percent: 4.49, fixed: 0.49 }
];
