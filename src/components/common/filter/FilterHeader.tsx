/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Filter, RotateCcw, ArrowLeftRight } from 'lucide-react';

export interface FilterHeaderProps {
  title: string;
  totalFilteredJira: number;
  totalFilteredTests: number;
  isFiltered?: boolean;
  onResetFilters?: () => void;
  isCompareMode?: boolean;
  onToggleCompareMode?: () => void;
  totalFilteredJiraB?: number;
  totalFilteredTestsB?: number;
  activeDatasetLabel?: string;
  testsCountLabel?: string;
  itemsCountLabel?: string;
  resetLabel?: string;
}

/**
 * FilterHeader: Header bar for telemetry filter panels with counts and comparative toggle.
 */
export const FilterHeader: React.FC<FilterHeaderProps> = ({
  title,
  totalFilteredJira,
  totalFilteredTests,
  isFiltered = false,
  onResetFilters,
  isCompareMode = false,
  onToggleCompareMode,
  totalFilteredJiraB = 0,
  totalFilteredTestsB = 0,
  activeDatasetLabel = 'Active Dataset',
  testsCountLabel = 'tests',
  itemsCountLabel = 'items',
  resetLabel = 'Reset'
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
        <Filter className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
        <span>{title}</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Active Dataset Stats */}
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          {activeDatasetLabel}: <strong className="text-cyan-600 dark:text-cyan-400">{totalFilteredTests.toLocaleString()}</strong> {testsCountLabel} | <strong className="text-purple-600 dark:text-purple-400">{totalFilteredJira.toLocaleString()}</strong> {itemsCountLabel}
          {isCompareMode && (
            <span className="ml-2 pl-2 border-l border-slate-300 dark:border-slate-700 text-purple-600 dark:text-purple-400">
              Comparative: <strong>{totalFilteredTestsB.toLocaleString()}</strong> tests | <strong>{totalFilteredJiraB.toLocaleString()}</strong> items
            </span>
          )}
        </span>

        {/* Reset Filter Button */}
        {isFiltered && !isCompareMode && onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 hover:bg-rose-100 dark:hover:bg-rose-900/80 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{resetLabel}</span>
          </button>
        )}

        {/* Compare Mode Toggle Switch */}
        {onToggleCompareMode && (
          <button
            type="button"
            onClick={onToggleCompareMode}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all border cursor-pointer ${
              isCompareMode
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent shadow-md shadow-purple-600/25 ring-2 ring-purple-400/40'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>{isCompareMode ? 'Compare Mode Active' : 'Compare Mode (⇄)'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
