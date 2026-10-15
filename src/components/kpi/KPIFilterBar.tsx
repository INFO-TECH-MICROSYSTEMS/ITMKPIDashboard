/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * KPI Platform Filter Bar
 * Multi-dimensional filtering across Products, Components, Sprints, Releases, and Date Ranges.
 * Allows drilling down into granular quality metrics.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Filter, RotateCcw, Layers, Box, GitBranch, Calendar } from 'lucide-react';
import type { KPIFilterState, ReleaseWindow } from '../../types/kpiPlatform';
import { 
  APP_PRODUCTS, 
  PRODUCT_COMPONENTS_MAP, 
  PRODUCT_RELEASES_MAP, 
  type AppProduct 
} from '../../constants/kpiConstants';

interface KPIFilterBarProps {
  filters: KPIFilterState;
  onFilterChange: <K extends keyof KPIFilterState>(key: K, value: KPIFilterState[K]) => void;
  onResetFilters: () => void;
  totalFilteredJira: number;
  totalFilteredTests: number;
  releaseWindow?: ReleaseWindow;
}

export const KPIFilterBar: React.FC<KPIFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredJira,
  totalFilteredTests,
  releaseWindow
}) => {
  const { t } = useTranslation();

  const activeProduct = (APP_PRODUCTS.includes(filters.product as AppProduct) 
    ? filters.product 
    : APP_PRODUCTS[0]) as AppProduct;

  const productComponents = PRODUCT_COMPONENTS_MAP[activeProduct] || [];
  const productReleases = PRODUCT_RELEASES_MAP[activeProduct] || [];
  const defaultRelease = productReleases[0] || '';

  const isFiltered = 
    filters.product !== APP_PRODUCTS[0] || 
    filters.component !== 'All' || 
    filters.releaseVersion !== defaultRelease;

  return (
    <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-cyan-500/20 shadow-sm space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
          <Filter className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>{t('kpiPlatform.multiFilters')}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {t('kpiPlatform.activeDataset')}: <strong className="text-cyan-600 dark:text-cyan-400">{totalFilteredTests.toLocaleString()}</strong> {t('kpiPlatform.testsCount')} | <strong className="text-purple-600 dark:text-purple-400">{totalFilteredJira.toLocaleString()}</strong> {t('kpiPlatform.workItemsCount')}
          </span>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 hover:bg-rose-100 dark:hover:bg-rose-900/80 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t('kpiPlatform.reset')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Selectors Grid (4 Columns: Product, Component, Release, Time Window) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Product Filter (No 'All Products', first product default) */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
            <Box className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{t('kpiPlatform.product')}</span>
          </label>
          <select
            value={activeProduct}
            onChange={(e) => onFilterChange('product', e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 text-xs font-medium cursor-pointer"
          >
            {APP_PRODUCTS.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Component Filter (Populated per Product at runtime) */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
            <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{t('kpiPlatform.component')}</span>
          </label>
          <select
            value={filters.component}
            onChange={(e) => onFilterChange('component', e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 text-xs font-medium cursor-pointer"
          >
            <option value="All">{t('kpiPlatform.allComponents')}</option>
            {productComponents.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Release Target Filter (No 'All Releases', latest release default, populated per Product) */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
            <GitBranch className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{t('kpiPlatform.releaseTarget')}</span>
          </label>
          <select
            value={filters.releaseVersion || defaultRelease}
            onChange={(e) => onFilterChange('releaseVersion', e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 text-xs font-medium cursor-pointer font-mono"
          >
            {productReleases.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Automatic Release Window Display */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
            <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{t('kpiPlatform.releaseWindow', 'Release Window')}</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 font-bold">{t('kpiPlatform.auto', 'Auto')}</span>
          </label>
          <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-medium">
            <span className="truncate">{releaseWindow?.formattedRange || t('kpiPlatform.activeCycle', 'Active Cycle')}</span>
            {releaseWindow && (
              <span className="ml-1.5 text-[10px] text-cyan-600 dark:text-cyan-400 font-bold whitespace-nowrap bg-cyan-50 dark:bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-200 dark:border-cyan-800">
                {releaseWindow.totalDays}d
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
