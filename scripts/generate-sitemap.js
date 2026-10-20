// Node.js script to generate standard XML sitemap for LapTools
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://laptools.com';
const TODAY = '2026-10-15';

// All categories
const categories = [
  'financial',
  'tax-and-income',
  'business-and-ecommerce',
  'currency',
  'conversions',
  'home-and-diy',
  'math',
  'health-and-fitness'
];

// All 40 tools with category mappings
const tools = [
  // Financial
  { cat: 'financial', slug: 'simple-mortgage-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'financial', slug: 'credit-card-payoff-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'financial', slug: 'debt-avalanche-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'financial', slug: 'debt-snowball-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'financial', slug: 'take-home-pay-calculator', priority: '0.8', changefreq: 'monthly' },

  // Tax & Income
  { cat: 'tax-and-income', slug: 'self-employment-tax-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'tax-and-income', slug: '1099-vs-w2-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'tax-and-income', slug: 'freelance-rate-calculator', priority: '0.8', changefreq: 'monthly' },

  // Business & E-commerce
  { cat: 'business-and-ecommerce', slug: 'ebay-fee-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'business-and-ecommerce', slug: 'stripe-fee-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'business-and-ecommerce', slug: 'paypal-fee-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'business-and-ecommerce', slug: 'break-even-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'business-and-ecommerce', slug: 'markup-vs-margin-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'business-and-ecommerce', slug: 'profit-margin-calculator', priority: '0.8', changefreq: 'monthly' },

  // Currency
  { cat: 'currency', slug: 'usd-to-php', priority: '0.8', changefreq: 'daily' },
  { cat: 'currency', slug: 'usd-to-rmb', priority: '0.8', changefreq: 'daily' },
  { cat: 'currency', slug: 'usd-to-mxn', priority: '0.8', changefreq: 'daily' },
  { cat: 'currency', slug: 'inr-to-usd', priority: '0.8', changefreq: 'daily' },
  { cat: 'currency', slug: 'gbp-to-usd', priority: '0.8', changefreq: 'daily' },
  { cat: 'currency', slug: 'usd-to-cad', priority: '0.8', changefreq: 'daily' },

  // Conversions & DIY
  { cat: 'conversions', slug: 'km-to-miles', priority: '0.8', changefreq: 'monthly' },
  { cat: 'conversions', slug: 'grams-to-cups-converter', priority: '0.8', changefreq: 'monthly' },
  { cat: 'home-and-diy', slug: 'fabric-yardage-calculator', priority: '0.8', changefreq: 'monthly' },

  // Math
  { cat: 'math', slug: 'lcm-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'math', slug: 'gcf-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'math', slug: 'percentage-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'math', slug: 'average-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'math', slug: 'mean-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'math', slug: 'scientific-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'math', slug: 'complex-number-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'math', slug: 'aspect-ratio-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'math', slug: 'ratio-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'math', slug: 'fraction-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'math', slug: 'decimal-to-fraction-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'math', slug: 'mixed-fraction-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'math', slug: 'improper-fraction-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'math', slug: 'casio-fx-55-plus-fraction-calculator', priority: '0.8', changefreq: 'monthly' },

  // Health & Fitness
  { cat: 'health-and-fitness', slug: 'tdee-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'health-and-fitness', slug: 'protein-intake-calculator', priority: '0.8', changefreq: 'monthly' },
  { cat: 'health-and-fitness', slug: 'body-fat-calculator', priority: '0.8', changefreq: 'monthly' }
];

// Trust and Legal Pages
const trustPages = [
  { path: '/about/', priority: '0.5', changefreq: 'monthly' },
  { path: '/contact/', priority: '0.5', changefreq: 'monthly' },
  { path: '/privacy-policy/', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-and-conditions/', priority: '0.3', changefreq: 'yearly' },
  { path: '/disclaimer/', priority: '0.3', changefreq: 'yearly' },
  { path: '/cookie-policy/', priority: '0.3', changefreq: 'yearly' },
  { path: '/editorial-policy/', priority: '0.4', changefreq: 'yearly' },
  { path: '/sitemap/', priority: '0.4', changefreq: 'weekly' }
];

function generateXmlSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Homepage
  xml += `  <!-- Core Home Page -->\n`;
  xml += `  <url>\n`;
  xml += `    <loc>${DOMAIN}/</loc>\n`;
  xml += `    <lastmod>${TODAY}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n\n`;

  // 2. Categories
  xml += `  <!-- Category Hubs -->\n`;
  for (const cat of categories) {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/${cat}/</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${cat === 'currency' ? 'daily' : 'weekly'}</changefreq>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += `  </url>\n`;
  }
  xml += `\n`;

  // 3. Tools
  xml += `  <!-- Calculation Engines & Converters (SoftwareApplication) -->\n`;
  for (const t of tools) {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/${t.cat}/${t.slug}/</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${t.changefreq}</changefreq>\n`;
    xml += `    <priority>${t.priority}</priority>\n`;
    xml += `  </url>\n`;
  }
  xml += `\n`;

  // 4. Trust Pages
  xml += `  <!-- Methodologies, Disclosures & Trust Pages -->\n`;
  for (const p of trustPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}${p.path}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
    xml += `    <priority>${p.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
const sitemapContent = generateXmlSitemap();
fs.writeFileSync(outputPath, sitemapContent, 'utf8');
console.log(`Successfully generated public/sitemap.xml with ${1 + categories.length + tools.length + trustPages.length} indexable URLs.`);
