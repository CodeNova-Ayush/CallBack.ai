import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showTagline?: boolean;
}

export function Logo({ className = '', size = 'md', showText = true, showTagline = false }: LogoProps) {
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-base',
    lg: 'w-11 h-11 text-xl',
  };

  const svgSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-bold tracking-tight text-[#231F1D] hover:opacity-90 transition-opacity select-none ${className}`}
    >
      {/* Terracotta Phone Icon Badge */}
      <div
        className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-[#C85A32] to-[#B24D28] text-white shadow-md shadow-[#C85A32]/25 shrink-0 ${sizeClasses[size]}`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={svgSizes[size]}
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          <path d="M14 2a6 6 0 0 1 6 6" />
          <path d="M14 6a2 2 0 0 1 2 2" />
        </svg>
      </div>

      {/* Brand Name Text */}
      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-serif text-lg sm:text-xl font-black tracking-tight text-[#231F1D] leading-none flex items-center">
            CallBack<span className="text-[#C85A32] font-sans font-extrabold ml-0.5">.ai</span>
          </span>
          {showTagline && (
            <span className="text-[10px] text-[#786F68] font-extrabold tracking-wider uppercase mt-1">
              Next-Gen Resume AI
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

export default Logo;
