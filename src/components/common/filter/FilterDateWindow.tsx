/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Calendar } from 'lucide-react';
import type { ReleaseWindow } from '../../../types/kpiPlatform';

export interface FilterDateWindowProps {
  label: string;
  releaseWindow?: ReleaseWindow;
  autoLabel?: string;
  activeCycleLabel?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

/**
 * FilterDateWindow: Formatted display for automated release window cycles.
 */
export const FilterDateWindow: React.FC<FilterDateWindowProps> = ({
  label,
  releaseWindow,
  autoLabel = 'AUTO',
  activeCycleLabel = 'Active Cycle',
  variant = 'primary',
  className = ''
}) => {
  const isSecondary = variant === 'secondary';

  return (
    <div className={`space-y-1 ${className}`}>
      <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
        <Calendar className={`w-3.5 h-3.5 ${isSecondary ? 'text-purple-600 dark:text-purple-400' : 'text-cyan-600 dark:text-cyan-400'}`} />
        <span>{label}</span>
        <span className={`text-[10px] uppercase font-mono px-1.5 py-0.2 rounded font-bold ${
          isSecondary 
            ? 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300' 
            : 'bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300'
        }`}>
          {autoLabel}
        </span>
      </label>
      <div className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-xs font-mono font-medium ${
        isSecondary
          ? 'bg-white dark:bg-slate-950 border-purple-200 dark:border-purple-900 text-slate-900 dark:text-slate-100'
          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100'
      }`}>
        <span className="truncate">{releaseWindow?.formattedRange || activeCycleLabel}</span>
        {releaseWindow && (
          <span className={`ml-1.5 text-[10px] font-bold whitespace-nowrap px-1.5 py-0.5 rounded border ${
            isSecondary
              ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80 border-purple-200 dark:border-purple-800'
              : 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/80 border-cyan-200 dark:border-cyan-800'
          }`}>
            {releaseWindow.totalDays}d
          </span>
        )}
      </div>
    </div>
  );
};
