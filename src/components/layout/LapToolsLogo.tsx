import React from 'react';

interface LapToolsLogoProps {
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
}

export function LapToolsLogo({ className = '', iconSize = 'md', showBadge = true }: LapToolsLogoProps) {
  const iconDimensions = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-8.5 h-8.5 rounded-xl',
    lg: 'w-10 h-10 rounded-2xl'
  }[iconSize];

  const svgDimensions = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }[iconSize];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Emblem Icon */}
      <div
        className={`${iconDimensions} bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20 ring-1 ring-white/25 transition-transform duration-200 group-hover:scale-105`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={svgDimensions}
        >
          {/* Outer drafting 'L' base coordinate */}
          <path
            d="M7 6V23C7 24.6569 8.34315 26 10 26H25"
            stroke="currentColor"
            strokeWidth="2.75"
            strokeLinecap="round"
          />
          {/* Horizontal and vertical 'T' caliper arms */}
          <path
            d="M14 11H25"
            stroke="currentColor"
            strokeWidth="2.75"
            strokeLinecap="round"
          />
          <path
            d="M19.5 11V21"
            stroke="currentColor"
            strokeWidth="2.75"
            strokeLinecap="round"
          />
          {/* Precision calibration nodes */}
          <circle cx="19.5" cy="6.5" r="2" fill="#38BDF8" />
          <circle cx="25" cy="11" r="1.5" fill="#E0E7FF" />
          <circle cx="25" cy="26" r="1.75" fill="#38BDF8" />
        </svg>
      </div>

      {/* Brand Typography Lockup */}
      <div className="flex items-center gap-1.5">
        <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white leading-none">
          Lap
          <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 dark:from-indigo-400 dark:via-blue-400 dark:to-cyan-300 bg-clip-text text-transparent ml-0.5">
            Tools
          </span>
        </span>
        {showBadge && (
          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 leading-none">
            Calc
          </span>
        )}
      </div>
    </div>
  );
}
