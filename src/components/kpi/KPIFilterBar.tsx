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
 * Seamlessly supports Single-Scope Filtering and Dual-Scope Comparative Evaluation.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Filter, RotateCcw, Layers, Box, GitBranch, Calendar, 
  ArrowLeftRight, X 
} from 'lucide-react';
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

  // Comparison props
  isCompareMode?: boolean;
  onToggleCompareMode?: () => void;
  filtersB?: KPIFilterState;
  onFilterChangeB?: <K extends keyof KPIFilterState>(key: K, value: KPIFilterState[K]) => void;
  onResetFiltersB?: () => void;
  onSwapScopes?: () => void;
  totalFilteredJiraB?: number;
  totalFilteredTestsB?: number;
  releaseWindowB?: ReleaseWindow;
}

export const KPIFilterBar: React.FC<KPIFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredJira,
  totalFilteredTests,
  releaseWindow,
  isCompareMode = false,
  onToggleCompareMode,
  filtersB,
  onFilterChangeB,
  onResetFiltersB,
  onSwapScopes,
  totalFilteredJiraB = 0,
  totalFilteredTestsB = 0,
  releaseWindowB
}) => {
  const { t } = useTranslation();

  // Scope A options
  const activeProductA = (APP_PRODUCTS.includes(filters.product as AppProduct) 
    ? filters.product 
    : APP_PRODUCTS[0]) as AppProduct;
  const productComponentsA = PRODUCT_COMPONENTS_MAP[activeProductA] || [];
  const productReleasesA = PRODUCT_RELEASES_MAP[activeProductA] || [];
  const defaultReleaseA = productReleasesA[0] || '';

  const isFilteredA = 
    filters.product !== APP_PRODUCTS[0] || 
    filters.component !== 'All' || 
    filters.releaseVersion !== defaultReleaseA;

  // Scope B options
  const activeProductB = filtersB ? ((APP_PRODUCTS.includes(filtersB.product as AppProduct)
    ? filtersB.product
    : APP_PRODUCTS[0]) as AppProduct) : activeProductA;
  const productComponentsB = PRODUCT_COMPONENTS_MAP[activeProductB] || [];
  const productReleasesB = PRODUCT_RELEASES_MAP[activeProductB] || [];
  const defaultReleaseB = productReleasesB[0] || '';

  return (
    <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-cyan-500/20 shadow-sm space-y-4">
      {/* Top Header: Title, Telemetry Counts & Compare Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
          <Filter className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>{t('kpiPlatform.multiFilters', 'Multi-Dimensional Telemetry Filters')}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Active Dataset Stats */}
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {t('kpiPlatform.activeDataset', 'Active Dataset')}: <strong className="text-cyan-600 dark:text-cyan-400">{totalFilteredTests.toLocaleString()}</strong> {t('kpiPlatform.testsCount', 'tests')} | <strong className="text-purple-600 dark:text-purple-400">{totalFilteredJira.toLocaleString()}</strong> {t('kpiPlatform.workItemsCount', 'items')}
            {isCompareMode && (
              <span className="ml-2 pl-2 border-l border-slate-300 dark:border-slate-700 text-purple-600 dark:text-purple-400">
                Scope B: <strong>{totalFilteredTestsB.toLocaleString()}</strong> tests | <strong>{totalFilteredJiraB.toLocaleString()}</strong> items
              </span>
            )}
          </span>

          {/* Reset Scope A Filter Button */}
          {isFilteredA && !isCompareMode && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 hover:bg-rose-100 dark:hover:bg-rose-900/80 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t('kpiPlatform.reset', 'Reset')}</span>
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

      {/* Scope A Filter Section */}
      <div className="space-y-1.5">
        {isCompareMode && (
          <div className="flex items-center justify-between text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Primary Scope (Scope A)
            </span>
            <div className="flex items-center gap-2">
              {onSwapScopes && (
                <button
                  type="button"
                  onClick={onSwapScopes}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-950 hover:text-cyan-600 transition-colors cursor-pointer"
                  title="Swap Scope A and Scope B"
                >
                  <ArrowLeftRight className="w-3 h-3" />
                  <span>Swap A ⇄ B</span>
                </button>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Product Filter */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
              <Box className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>{t('kpiPlatform.product', 'Product Scope')}</span>
            </label>
            <select
              value={activeProductA}
              onChange={(e) => onFilterChange('product', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 text-xs font-medium cursor-pointer"
            >
              {APP_PRODUCTS.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Component Filter */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
              <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>{t('kpiPlatform.component', 'Component')}</span>
            </label>
            <select
              value={filters.component}
              onChange={(e) => onFilterChange('component', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 text-xs font-medium cursor-pointer"
            >
              <option value="All">{t('kpiPlatform.allComponents', 'All Components')}</option>
              {productComponentsA.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Release Target Filter */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
              <GitBranch className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>{t('kpiPlatform.releaseTarget', 'Release Target')}</span>
            </label>
            <select
              value={filters.releaseVersion || defaultReleaseA}
              onChange={(e) => onFilterChange('releaseVersion', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 text-xs font-medium cursor-pointer font-mono"
            >
              {productReleasesA.map(r => (
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

      {/* Scope B (Comparative Scope Drawer) */}
      {isCompareMode && filtersB && onFilterChangeB && (
        <div className="space-y-1.5 pt-3 border-t border-purple-200/80 dark:border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20 p-3 rounded-xl">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-700 dark:text-purple-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Comparative Target (Scope B)
            </span>

            <div className="flex items-center gap-2">
              {onResetFiltersB && (
                <button
                  type="button"
                  onClick={onResetFiltersB}
                  className="text-[11px] text-slate-500 hover:text-purple-600 transition-colors cursor-pointer"
                >
                  Reset Scope B
                </button>
              )}
              {onToggleCompareMode && (
                <button
                  type="button"
                  onClick={onToggleCompareMode}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  title="Close Comparison Mode"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Scope B Product */}
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                <Box className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Product B</span>
              </label>
              <select
                value={activeProductB}
                onChange={(e) => onFilterChangeB('product', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-950 border border-purple-200 dark:border-purple-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-purple-500 text-xs font-medium cursor-pointer"
              >
                {APP_PRODUCTS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Scope B Component */}
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                <Layers className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Component B</span>
              </label>
              <select
                value={filtersB.component}
                onChange={(e) => onFilterChangeB('component', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-950 border border-purple-200 dark:border-purple-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-purple-500 text-xs font-medium cursor-pointer"
              >
                <option value="All">{t('kpiPlatform.allComponents', 'All Components')}</option>
                {productComponentsB.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Scope B Release Target */}
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                <GitBranch className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Release Target B</span>
              </label>
              <select
                value={filtersB.releaseVersion || defaultReleaseB}
                onChange={(e) => onFilterChangeB('releaseVersion', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-950 border border-purple-200 dark:border-purple-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-purple-500 text-xs font-medium cursor-pointer font-mono"
              >
                {productReleasesB.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Scope B Release Window */}
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Release Window B</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold">{t('kpiPlatform.auto', 'Auto')}</span>
              </label>
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-950 border border-purple-200 dark:border-purple-900 text-slate-900 dark:text-slate-100 text-xs font-mono font-medium">
                <span className="truncate">{releaseWindowB?.formattedRange || t('kpiPlatform.activeCycle', 'Active Cycle')}</span>
                {releaseWindowB && (
                  <span className="ml-1.5 text-[10px] text-purple-600 dark:text-purple-400 font-bold whitespace-nowrap bg-purple-50 dark:bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-200 dark:border-purple-800">
                    {releaseWindowB.totalDays}d
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
