/**
 * KPI Platform Filter Bar
 * Multi-dimensional filtering across Products, Components, Sprints, Releases, and Date Ranges.
 * Allows drilling down into granular quality metrics.
 */

import React from 'react';
import { Filter, RotateCcw, Calendar, Layers, Box, GitBranch } from 'lucide-react';
import type { KPIFilterState } from '../../types/kpiPlatform';
import { APP_PRODUCTS, APP_COMPONENTS, APP_SPRINTS, APP_RELEASES } from '../../constants/kpiConstants';

interface KPIFilterBarProps {
  filters: KPIFilterState;
  onFilterChange: <K extends keyof KPIFilterState>(key: K, value: KPIFilterState[K]) => void;
  onResetFilters: () => void;
  totalFilteredJira: number;
  totalFilteredTests: number;
}

export const KPIFilterBar: React.FC<KPIFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredJira,
  totalFilteredTests
}) => {
  const isFiltered = 
    filters.product !== 'All' || 
    filters.component !== 'All' || 
    filters.sprint !== 'All' || 
    filters.releaseVersion !== 'All' || 
    filters.dateRangeDays !== 30;

  return (
    <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-cyan-500/20 shadow-sm space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
          <Filter className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>Multi-Dimensional Filters</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Active Dataset: <strong className="text-cyan-600 dark:text-cyan-400">{totalFilteredTests.toLocaleString()}</strong> Tests | <strong className="text-purple-600 dark:text-purple-400">{totalFilteredJira}</strong> Work Items
          </span>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 hover:bg-rose-100 dark:hover:bg-rose-900/80 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
        {/* Product Filter */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
            <Box className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Product</span>
          </label>
          <select
            value={filters.product}
            onChange={(e) => onFilterChange('product', e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 text-xs font-medium"
          >
            <option value="All">All Products</option>
            {APP_PRODUCTS.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Component Filter */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
            <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Component</span>
          </label>
          <select
            value={filters.component}
            onChange={(e) => onFilterChange('component', e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 text-xs font-medium"
          >
            <option value="All">All Components</option>
            {APP_COMPONENTS.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Sprint Filter */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
            <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Sprint Cadence</span>
          </label>
          <select
            value={filters.sprint}
            onChange={(e) => onFilterChange('sprint', e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 text-xs font-medium"
          >
            <option value="All">All Sprints</option>
            {APP_SPRINTS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Release Version */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
            <GitBranch className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Release Target</span>
          </label>
          <select
            value={filters.releaseVersion}
            onChange={(e) => onFilterChange('releaseVersion', e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 text-xs font-medium"
          >
            <option value="All">All Releases</option>
            {APP_RELEASES.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Time Window (Pills) */}
        <div className="space-y-1">
          <label className="block text-slate-600 dark:text-slate-400 font-medium">
            Time Range Window
          </label>
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800">
            {[7, 14, 30, 90].map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => onFilterChange('dateRangeDays', days)}
                className={`flex-1 py-1 text-[11px] font-mono rounded-md font-semibold transition-all cursor-pointer ${
                  filters.dateRangeDays === days
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {days}d
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
