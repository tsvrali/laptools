import { categories } from '../../data/categories';
import { siteConfig } from '../../data/siteConfig';
import { Logo } from '../common/Logo';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <footer className="w-full bg-slate-50 dark:bg-[#080C15] text-slate-600 dark:text-slate-400 pt-16 pb-12 mt-20 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
          {/* Brand & Editorial Mission */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="hover:opacity-95 transition-opacity inline-block"
            >
              <Logo size="md" />
            </a>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Free, accurate calculation tools and unit converters engineered for the United States. Powered by 2026 IRS schedules, CFPB lending models, and NIST conversion constants.
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <div>Publisher: {siteConfig.ownerName} ({siteConfig.ownerCountry})</div>
              <div>Editorial Inquiries: {siteConfig.contactEmail}</div>
            </div>
          </div>

          {/* Calculator Categories Column 1 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Financial & Tax
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="/financial/" onClick={(e) => handleLinkClick(e, '/financial/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Financial Calculators
                </a>
              </li>
              <li>
                <a href="/financial/simple-mortgage-calculator/" onClick={(e) => handleLinkClick(e, '/financial/simple-mortgage-calculator/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Mortgage Payment
                </a>
              </li>
              <li>
                <a href="/financial/credit-card-payoff-calculator/" onClick={(e) => handleLinkClick(e, '/financial/credit-card-payoff-calculator/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Credit Card Payoff
                </a>
              </li>
              <li>
                <a href="/tax-and-income/" onClick={(e) => handleLinkClick(e, '/tax-and-income/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Tax and Income Hub
                </a>
              </li>
              <li>
                <a href="/tax-and-income/self-employment-tax-calculator/" onClick={(e) => handleLinkClick(e, '/tax-and-income/self-employment-tax-calculator/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Self-Employment Tax
                </a>
              </li>
              <li>
                <a href="/tax-and-income/1099-vs-w2-calculator/" onClick={(e) => handleLinkClick(e, '/tax-and-income/1099-vs-w2-calculator/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  1099 vs W-2 Pay Parity
                </a>
              </li>
            </ul>
          </div>

          {/* Calculator Categories Column 2 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Commerce & Rates
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="/business-and-ecommerce/" onClick={(e) => handleLinkClick(e, '/business-and-ecommerce/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Business & E-Commerce
                </a>
              </li>
              <li>
                <a href="/business-and-ecommerce/ebay-fee-calculator/" onClick={(e) => handleLinkClick(e, '/business-and-ecommerce/ebay-fee-calculator/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  eBay Seller Fees
                </a>
              </li>
              <li>
                <a href="/business-and-ecommerce/stripe-fee-calculator/" onClick={(e) => handleLinkClick(e, '/business-and-ecommerce/stripe-fee-calculator/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Stripe Processing Fees
                </a>
              </li>
              <li>
                <a href="/currency/" onClick={(e) => handleLinkClick(e, '/currency/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Currency Reference Hub
                </a>
              </li>
              <li>
                <a href="/conversions/km-to-miles/" onClick={(e) => handleLinkClick(e, '/conversions/km-to-miles/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Km to Miles (Race Pace)
                </a>
              </li>
              <li>
                <a href="/conversions/grams-to-cups-converter/" onClick={(e) => handleLinkClick(e, '/conversions/grams-to-cups-converter/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Grams to Cups (Baking)
                </a>
              </li>
            </ul>
          </div>

          {/* Trust & Legal Column */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Trust & Transparency
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="/about/" onClick={(e) => handleLinkClick(e, '/about/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  About LapTools
                </a>
              </li>
              <li>
                <a href="/editorial-policy/" onClick={(e) => handleLinkClick(e, '/editorial-policy/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Editorial Methodology
                </a>
              </li>
              <li>
                <a href="/contact/" onClick={(e) => handleLinkClick(e, '/contact/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Contact & Feedback
                </a>
              </li>
              <li>
                <a href="/privacy-policy/" onClick={(e) => handleLinkClick(e, '/privacy-policy/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-and-conditions/" onClick={(e) => handleLinkClick(e, '/terms-and-conditions/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="/disclaimer/" onClick={(e) => handleLinkClick(e, '/disclaimer/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Legal & Financial Disclaimer
                </a>
              </li>
              <li>
                <a href="/cookie-policy/" onClick={(e) => handleLinkClick(e, '/cookie-policy/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="/sitemap/" onClick={(e) => handleLinkClick(e, '/sitemap/')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  HTML Sitemap
                </a>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <span>XML Sitemap Feed</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                    XML
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Non-Advice Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p className="max-w-3xl leading-relaxed">
            <strong className="text-slate-700 dark:text-slate-300">Disclaimer:</strong> LapTools tools, formulas, and estimates are provided for informational and educational purposes only and do not constitute certified tax, legal, medical, or financial advice. Consult a licensed professional (CPA, CFP®, attorney, or physician) regarding your specific situation.
          </p>
          <div className="shrink-0 text-slate-500 dark:text-slate-400 whitespace-nowrap">
            © {siteConfig.year} {siteConfig.ownerName}.
          </div>
        </div>
      </div>
    </footer>
  );
}
