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
 * Refactored into a 100% modular architecture composing FilterHeader, FilterSelect, and FilterDateWindow.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Layers, GitBranch, ArrowLeftRight, X } from 'lucide-react';
import type { KPIFilterState, ReleaseWindow } from '../../types/kpiPlatform';
import { 
  APP_PRODUCTS, 
  PRODUCT_COMPONENTS_MAP, 
  PRODUCT_RELEASES_MAP, 
  type AppProduct 
} from '../../constants/kpiConstants';
import { FilterHeader, FilterSelect, FilterDateWindow } from '../common/filter';

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

  // Select Option Mappers
  const productOptions = APP_PRODUCTS.map(p => ({ value: p, label: p }));
  const componentOptionsA = [
    { value: 'All', label: t('kpiPlatform.allComponents', 'All Components') },
    ...productComponentsA.map(c => ({ value: c, label: c }))
  ];
  const releaseOptionsA = productReleasesA.map(r => ({ value: r, label: r }));

  const componentOptionsB = [
    { value: 'All', label: t('kpiPlatform.allComponents', 'All Components') },
    ...productComponentsB.map(c => ({ value: c, label: c }))
  ];
  const releaseOptionsB = productReleasesB.map(r => ({ value: r, label: r }));

  return (
    <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-cyan-500/20 shadow-sm space-y-4">
      {/* Top Header: Title, Telemetry Counts & Compare Mode Toggle */}
      <FilterHeader
        title={t('kpiPlatform.multiFilters', 'Multi-Dimensional Telemetry Filters')}
        totalFilteredJira={totalFilteredJira}
        totalFilteredTests={totalFilteredTests}
        isFiltered={isFilteredA}
        onResetFilters={onResetFilters}
        isCompareMode={isCompareMode}
        onToggleCompareMode={onToggleCompareMode}
        totalFilteredJiraB={totalFilteredJiraB}
        totalFilteredTestsB={totalFilteredTestsB}
        activeDatasetLabel={t('kpiPlatform.activeDataset', 'Active Dataset')}
        testsCountLabel={t('kpiPlatform.testsCount', 'tests')}
        itemsCountLabel={t('kpiPlatform.workItemsCount', 'items')}
        resetLabel={t('kpiPlatform.reset', 'Reset')}
      />

      {/* Scope A Filter Section */}
      <div className="space-y-1.5">
        {isCompareMode && (
          <div className="flex items-center justify-between text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Primary Scope
            </span>
            <div className="flex items-center gap-2">
              {onSwapScopes && (
                <button
                  type="button"
                  onClick={onSwapScopes}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-cyan-50 dark:hover:bg-cyan-950 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-300 dark:hover:border-cyan-700 transition-colors shadow-2xs cursor-pointer"
                  title="Swap Primary and Comparative Scopes"
                >
                  <ArrowLeftRight className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                  <span>Swap Primary ⇄ Comparative</span>
                </button>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Product Filter */}
          <FilterSelect
            label={t('kpiPlatform.product', 'Product Scope')}
            icon={<Box className="w-3.5 h-3.5" />}
            value={activeProductA}
            options={productOptions}
            onChange={(val) => onFilterChange('product', val)}
          />

          {/* Component Filter */}
          <FilterSelect
            label={t('kpiPlatform.component', 'Component')}
            icon={<Layers className="w-3.5 h-3.5" />}
            value={filters.component}
            options={componentOptionsA}
            onChange={(val) => onFilterChange('component', val)}
          />

          {/* Release Target Filter */}
          <FilterSelect
            label={t('kpiPlatform.releaseTarget', 'Release Target')}
            icon={<GitBranch className="w-3.5 h-3.5" />}
            value={filters.releaseVersion || defaultReleaseA}
            options={releaseOptionsA}
            onChange={(val) => onFilterChange('releaseVersion', val)}
            fontMono
          />

          {/* Automatic Release Window Display */}
          <FilterDateWindow
            label={t('kpiPlatform.releaseWindow', 'Release Window')}
            releaseWindow={releaseWindow}
            autoLabel={t('kpiPlatform.auto', 'Auto')}
            activeCycleLabel={t('kpiPlatform.activeCycle', 'Active Cycle')}
          />
        </div>
      </div>

      {/* Scope B (Comparative Scope Drawer) */}
      {isCompareMode && filtersB && onFilterChangeB && (
        <div className="space-y-1.5 pt-3 border-t border-purple-200/80 dark:border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20 p-3 rounded-xl">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-700 dark:text-purple-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Secondary Scope
            </span>

            <div className="flex items-center gap-2">
              {onResetFiltersB && (
                <button
                  type="button"
                  onClick={onResetFiltersB}
                  className="text-[11px] text-slate-500 hover:text-purple-600 transition-colors cursor-pointer"
                >
                  Reset Secondary
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
            <FilterSelect
              label="Product B"
              icon={<Box className="w-3.5 h-3.5" />}
              value={activeProductB}
              options={productOptions}
              onChange={(val) => onFilterChangeB('product', val)}
              variant="secondary"
            />

            {/* Scope B Component */}
            <FilterSelect
              label="Component B"
              icon={<Layers className="w-3.5 h-3.5" />}
              value={filtersB.component}
              options={componentOptionsB}
              onChange={(val) => onFilterChangeB('component', val)}
              variant="secondary"
            />

            {/* Scope B Release Target */}
            <FilterSelect
              label="Release Target B"
              icon={<GitBranch className="w-3.5 h-3.5" />}
              value={filtersB.releaseVersion || defaultReleaseB}
              options={releaseOptionsB}
              onChange={(val) => onFilterChangeB('releaseVersion', val)}
              variant="secondary"
              fontMono
            />

            {/* Scope B Release Window */}
            <FilterDateWindow
              label="Release Window B"
              releaseWindow={releaseWindowB}
              autoLabel={t('kpiPlatform.auto', 'Auto')}
              activeCycleLabel={t('kpiPlatform.activeCycle', 'Active Cycle')}
              variant="secondary"
            />
          </div>
        </div>
      )}
    </div>
  );
};
