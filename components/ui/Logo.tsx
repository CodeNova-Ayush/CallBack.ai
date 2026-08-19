'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showTagline?: boolean;
}

export function Logo({ className = '', size = 'md', showText = true, showTagline = false }: LogoProps) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  };

  const textSizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
  };

  const aiSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 font-bold tracking-tight text-slate-900 hover:opacity-90 transition-opacity select-none group ${className}`}
    >
      {/* Enhancv-Style Embedded Vector Icon (No Button Box Container) */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform group-hover:scale-105 duration-200"
        >
          <defs>
            <linearGradient id="embGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#048BA2" />
              <stop offset="100%" stopColor="#00A8C6" />
            </linearGradient>
          </defs>

          {/* Seamless Embedded Callback Flow & Wave Mark */}
          <path
            d="M5 16C5 9.92487 9.92487 5 16 5C22.0751 5 27 9.92487 27 16C27 22.0751 22.0751 27 16 27H9"
            stroke="url(#embGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 22.5L5 27L10 31.5"
            stroke="url(#embGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="16" r="3" fill="#048BA2" />
        </svg>
      </div>

      {/* Instagram-Style Script Typography for CallBack + .ai */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-baseline leading-none">
            <span
              className={`text-slate-900 font-normal tracking-wide transition-colors ${textSizes[size]}`}
              style={{ fontFamily: "'Grand Hotel', cursive, sans-serif" }}
            >
              CallBack
            </span>
            <span className={`font-black text-[#048BA2] ml-0.5 tracking-tight font-sans ${aiSizes[size]}`}>
              .ai
            </span>
          </div>
          {showTagline && (
            <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase -mt-0.5 font-sans">
              Autonomous Resume Agent
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

export default Logo;
