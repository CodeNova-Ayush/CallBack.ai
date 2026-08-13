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
    sm: 'w-6 h-6 text-sm',
    md: 'w-8 h-8 text-lg',
    lg: 'w-10 h-10 text-xl',
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 font-bold tracking-tight text-espresso-900 ${className}`}>
      <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-terracotta-500 to-terracotta-600 text-white shadow-md shadow-terracotta-500/20 ${sizeClasses[size]}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          <path d="M14 2a6 6 0 0 1 6 6" />
          <path d="M14 6a2 2 0 0 1 2 2" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="font-serif tracking-tight text-espresso-900 leading-none">
            CallBack<span className="text-terracotta-600 font-sans font-semibold">.ai</span>
          </span>
          {showTagline && (
            <span className="text-[10px] text-espresso-500 font-medium tracking-wider uppercase mt-0.5">Next-Gen Resume AI</span>
          )}
        </div>
      )}
    </Link>
  );
}

export default Logo;
