import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hoverEffect = false, ...props }) => {
  return (
    <div
      className={clsx(
        'bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-xs transition-all',
        hoverEffect && 'hover:border-[#048BA2] hover:shadow-lg hover:shadow-[#048BA2]/5 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'indigo' | 'terracotta' | 'aurora';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className,
}) => {
  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs font-semibold gap-1',
    md: 'px-3 py-1 text-xs font-bold gap-1.5',
  };

  const variantStyles = {
    aurora: 'bg-[#E6F5F8] text-[#048BA2] border border-[#048BA2]/30',
    terracotta: 'bg-[#E6F5F8] text-[#048BA2] border border-[#048BA2]/30',
    indigo: 'bg-[#E6F5F8] text-[#048BA2] border border-[#048BA2]/30',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200/80',
    danger: 'bg-rose-50 text-rose-800 border border-rose-200/80',
    info: 'bg-[#E6F5F8] text-[#048BA2] border border-[#048BA2]/30',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full transition-colors select-none',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
};

interface ProgressRingProps {
  score: number; // 0 - 100
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  score,
  size = 110,
  strokeWidth = 9,
  label,
  sublabel,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = '#048BA2';
  if (score < 60) colorClass = '#E11D48';
  else if (score < 80) colorClass = '#D97706';

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colorClass}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-black text-slate-900 tracking-tight">{score}</span>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">/ 100</span>
        </div>
      </div>
      {label && <span className="mt-2 text-xs font-bold text-slate-900">{label}</span>}
      {sublabel && <span className="text-[11px] text-slate-500">{sublabel}</span>}
    </div>
  );
};
