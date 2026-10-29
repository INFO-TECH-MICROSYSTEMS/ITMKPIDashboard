/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';

export interface FilterSelectOption<T = string> {
  value: T;
  label: string;
}

export interface FilterSelectProps<T = string> {
  label: string;
  icon?: React.ReactNode;
  value: T;
  options: FilterSelectOption<T>[];
  onChange: (value: T) => void;
  badge?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  fontMono?: boolean;
}

/**
 * FilterSelect: Standardized multi-dimensional filter select dropdown item.
 * Supports primary (Scope A) and secondary (Scope B / comparison) styles.
 */
export const FilterSelect = <T extends string | number>({
  label,
  icon,
  value,
  options,
  onChange,
  badge,
  variant = 'primary',
  className = '',
  fontMono = false
}: FilterSelectProps<T>) => {
  const isSecondary = variant === 'secondary';

  return (
    <div className={`space-y-1 ${className}`}>
      <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
        {icon && (
          <span className={isSecondary ? 'text-purple-600 dark:text-purple-400' : 'text-cyan-600 dark:text-cyan-400'}>
            {icon}
          </span>
        )}
        <span>{label}</span>
        {badge}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors focus:outline-none ${
          fontMono ? 'font-mono' : ''
        } ${
          isSecondary
            ? 'bg-white dark:bg-slate-950 border-purple-200 dark:border-purple-900 text-slate-900 dark:text-slate-100 focus:border-purple-500'
            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:border-cyan-500'
        }`}
      >
        {options.map((opt) => (
          <option key={String(opt.value)} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
