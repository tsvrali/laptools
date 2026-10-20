import { siteConfig } from '../../data/siteConfig';

interface AdSlotProps {
  slotType: 'primary-post-calculator' | 'in-content' | 'desktop-sidebar';
  className?: string;
}

export function AdSlot({ slotType, className = '' }: AdSlotProps) {
  // If ads are disabled, render an unobtrusive, accessible container with reserved dimensions to eliminate Cumulative Layout Shift (CLS)
  return (
    <div
      className={`my-8 select-none ${className}`}
      aria-hidden="true"
      role="region"
      aria-label="Advertisement Placeholder"
    >
      <div className="flex flex-col items-center justify-center">
        <span className="text-[11px] tracking-wider uppercase font-medium text-slate-400 dark:text-slate-600 mb-1.5">
          Advertisement
        </span>
        <div
          className={`w-full max-w-3xl rounded-lg border border-dashed border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 flex flex-col items-center justify-center text-center p-4 transition-colors ${
            slotType === 'desktop-sidebar'
              ? 'min-h-[250px] w-[300px]'
              : 'min-h-[120px] md:min-h-[140px]'
          }`}
        >
          {siteConfig.adsEnabled ? (
            <div id={`ad-unit-${slotType}`} className="w-full flex justify-center">
              {/* Google AdSense script unit will render here when enabled */}
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-0000000000000000"
                data-ad-slot="1234567890"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>
          ) : (
            <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              <span className="block text-[11px] font-sans text-slate-400 dark:text-slate-500">Reserved Ad Space</span>
              <span className="text-[10px] text-slate-300 dark:text-slate-600">Zero-CLS placement container</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
