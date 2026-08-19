import React from 'react';
import { clsx } from 'clsx';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'pills';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  className,
}) => {
  return (
    <div
      className={clsx(
        variant === 'underline' ? 'border-b border-gray-200 flex gap-6' : 'bg-gray-100 p-1 rounded-lg inline-flex gap-1',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        if (variant === 'underline') {
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={clsx(
                'pb-3 pt-1 text-sm font-medium transition-all flex items-center gap-2 border-b-2 select-none',
                isActive
                  ? 'border-[#048BA2] text-[#048BA2]'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={clsx(
                    'px-1.5 py-0.5 text-xs rounded-full font-semibold',
                    isActive ? 'bg-[#E6F5F8] text-[#048BA2]' : 'bg-gray-100 text-gray-600'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-2 select-none',
              isActive
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span className="px-1.5 py-0.2 bg-gray-200 text-gray-700 text-[10px] rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
