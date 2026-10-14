/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * Main Quality Engineering KPI & Data Mining Platform Page
 * Central orchestration view delivering interactive categorized KPI dashboards,
 * multi-dimensional filtering, and data mining connector management.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, Activity, AlertTriangle, Cpu, 
  TrendingUp, Gauge, RefreshCw, Settings, Sparkles 
} from 'lucide-react';
import { useKPIData } from '../hooks/useKPIData';
import { KPI_CATEGORIES } from '../constants/kpiConstants';
import { KPIFilterBar } from '../components/kpi/KPIFilterBar';
import { ConnectorConfigModal } from '../components/kpi/ConnectorConfigModal';

// Category Views
import { ExecutiveScorecardView } from '../components/kpi/views/ExecutiveScorecardView';
import { QualityDefectView } from '../components/kpi/views/QualityDefectView';
import { RiskGatingView } from '../components/kpi/views/RiskGatingView';
import { AutomationView } from '../components/kpi/views/AutomationView';
import { ProductivityView } from '../components/kpi/views/ProductivityView';
import { GovernanceSlaView } from '../components/kpi/views/GovernanceSlaView';

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
  AlertTriangle: <AlertTriangle className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
  TrendingUp: <TrendingUp className="w-4 h-4" />,
  Gauge: <Gauge className="w-4 h-4" />
};

export const KPIPlatformPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('executive');
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);

  const {
    filters,
    releaseWindow,
    updateFilter,
    resetFilters,
    jiraItems,
    testRailExecutions,
    connectorConfigs,
    isLoading,
    isSyncing,
    lastRefreshedAt,
    triggerSyncNow,
    resetToSampleData,
    saveConnectorConfig,
    metrics
  } = useKPIData();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
              {t('kpiPlatform.engineBadge')}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-300 dark:border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t('kpiPlatform.liveTelemetry')}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] tracking-tight">
            {t('kpiPlatform.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
            {t('kpiPlatform.subtitle')}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Last refreshed timestamp */}
          <div className="hidden xl:flex flex-col text-right text-[11px] font-mono text-slate-500 dark:text-slate-400 mr-2">
            <span>{t('kpiPlatform.snapshot')}: {lastRefreshedAt.toLocaleTimeString()}</span>
            <span className="text-[10px] text-cyan-600 dark:text-cyan-400">{t('kpiPlatform.indexedDb')}</span>
          </div>

          {/* Sync Now Button (Atomic Wipe & Replace) */}
          <button
            type="button"
            onClick={() => triggerSyncNow()}
            disabled={isSyncing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-sm hover:shadow cursor-pointer disabled:opacity-50"
            title={t('kpiPlatform.syncTitle')}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? t('kpiPlatform.miningData') : t('kpiPlatform.syncWipe')}</span>
          </button>

          {/* Connectors & Mining Settings Button */}
          <button
            type="button"
            onClick={() => setIsConfigOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-800 transition-colors shadow-xs cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{t('kpiPlatform.connectorsSchedule')}</span>
          </button>

          {/* Reset to Sample Dataset */}
          <button
            type="button"
            onClick={resetToSampleData}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-semibold text-xs border border-purple-200 dark:border-purple-500/30 transition-colors cursor-pointer"
            title={t('kpiPlatform.resetDemoDataTitle')}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('kpiPlatform.resetDemoData')}</span>
          </button>
        </div>
      </div>

      {/* Multi-Dimensional Filter Bar */}
      <KPIFilterBar
        filters={filters}
        releaseWindow={releaseWindow}
        onFilterChange={updateFilter}
        onResetFilters={resetFilters}
        totalFilteredJira={jiraItems.length}
        totalFilteredTests={testRailExecutions.length}
      />

      {/* KPI Category Navigation (Full-Width Responsive Grid, No Horizontal Truncation) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5">
        {KPI_CATEGORIES.map(category => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`flex flex-col justify-between p-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer text-left gap-2 border ${
                isActive
                  ? 'bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 text-white border-transparent shadow-md shadow-cyan-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 border-slate-200 dark:border-slate-800 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between gap-1.5">
                <span className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400'}`}>
                  {iconMap[category.iconName]}
                </span>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}>
                  {t(`kpiPlatform.categories.${category.id}Badge`, category.badge)}
                </span>
              </div>
              <span className="font-['Outfit'] font-bold leading-tight line-clamp-2">
                {t(`kpiPlatform.categories.${category.id}`, category.name)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Category View Rendering */}
      <div className="transition-all duration-200">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-16 space-y-4">
            <RefreshCw className="w-8 h-8 text-cyan-600 dark:text-cyan-400 animate-spin" />
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {t('kpiPlatform.queryingDb')}
            </span>
          </div>
        ) : (
          <>
            {activeCategory === 'executive' && (
              <ExecutiveScorecardView
                scorecard={metrics.executiveScorecard}
                testDistribution={metrics.testDistributionAll}
                testBurnoutForecast={metrics.testBurnoutForecast}
                jiraItems={jiraItems}
                testRailExecutions={testRailExecutions}
              />
            )}

            {activeCategory === 'quality' && (
              <QualityDefectView
                agingBuckets={metrics.agingBuckets}
                severityCounts={metrics.severityCounts}
                defectTrends={metrics.defectTrends}
                mttrMttd={metrics.mttrMttd}
                jiraItems={jiraItems}
              />
            )}

            {activeCategory === 'risk' && (
              <RiskGatingView
                componentRisks={metrics.componentRisks}
                jiraItems={jiraItems}
                testRailExecutions={testRailExecutions}
              />
            )}

            {activeCategory === 'automation' && (
              <AutomationView
                automatedDistribution={metrics.testDistributionAutomated}
                manualDistribution={metrics.testDistributionManual}
                automationHealth={metrics.automationHealth}
                testRailExecutions={testRailExecutions}
                testAutomationForecast={metrics.testAutomationForecast}
              />
            )}

            {activeCategory === 'productivity' && (
              <ProductivityView
                productivityMetrics={metrics.productivityMetrics}
                squadSummary={metrics.squadSummary}
                jiraItems={jiraItems}
              />
            )}

            {activeCategory === 'governance' && (
              <GovernanceSlaView
                scorecard={metrics.executiveScorecard}
                jiraItems={jiraItems}
              />
            )}
          </>
        )}
      </div>

      {/* Connector Configuration & Scheduling Modal */}
      <ConnectorConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        configs={connectorConfigs}
        onSaveConfig={saveConnectorConfig}
        onTriggerSync={triggerSyncNow}
        onResetSampleData={resetToSampleData}
        isSyncing={isSyncing}
      />
    </div>
  );
};
