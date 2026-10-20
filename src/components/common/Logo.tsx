interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Geometric Caliper & Calculation Matrix Mark */}
      <div className={`relative ${iconDimensions} shrink-0`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_2px_8px_rgba(79,70,229,0.25)]"
          aria-hidden="true"
        >
          <defs>
            {/* Primary Brand Gradient */}
            <linearGradient id="laptools-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>

            {/* Subtle Surface Gradient for Depth */}
            <linearGradient id="laptools-grad-inner" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Outer Rounded Geometric Frame */}
          <rect
            x="2"
            y="2"
            width="36"
            height="36"
            rx="10"
            fill="url(#laptools-grad-primary)"
          />

          {/* Caliper Measurement Grid / Notch Lines */}
          <line x1="8" y1="12" x2="12" y2="12" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="17" x2="14" y2="17" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="22" x2="12" y2="22" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" />

          {/* Interlocking Monogram 'L' & 'T' Precision Paths */}
          <path
            d="M17 11V25C17 26.6569 18.3431 28 20 28H29"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Top Crossbar for 'T' Integration */}
          <path
            d="M23 14H31"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Mathematical Focal Spark / Point */}
          <circle cx="28.5" cy="22.5" r="1.8" fill="#38BDF8" />
        </svg>
      </div>

      {/* Typographic Wordmark */}
      {showText && (
        <span className={`${textSize} tracking-tight font-sans flex items-baseline leading-none`}>
          <span className="font-semibold text-slate-900 dark:text-white tracking-tight">
            Lap
          </span>
          <span className="font-black bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 dark:from-indigo-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Tools
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 ml-0.5 self-end mb-0.5" />
        </span>
      )}
    </div>
  );
}
