/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { 
  RefreshCw, Settings, Sparkles, FileText, Presentation, 
  ChevronRight, ShieldCheck, Activity, AlertTriangle, 
  Cpu, TrendingUp, Gauge, Compass
} from 'lucide-react';
import { useKPIDataContext } from '../context/KPIDataContext';
import { KPI_CATEGORIES } from '../constants/kpiConstants';
import { KPIFilterBar } from '../components/kpi/KPIFilterBar';
import { ConnectorConfigModal } from '../components/kpi/ConnectorConfigModal';
import { KPIExportModal } from '../components/kpi/export/KPIExportModal';

// Category Views
import { ExecutiveScorecardView } from '../components/kpi/views/ExecutiveScorecardView';
import { QualityDefectView } from '../components/kpi/views/QualityDefectView';
import { RiskGatingView } from '../components/kpi/views/RiskGatingView';
import { AutomationView } from '../components/kpi/views/AutomationView';
import { ProductivityView } from '../components/kpi/views/ProductivityView';
import { GovernanceSlaView } from '../components/kpi/views/GovernanceSlaView';
import { LeadingLaggingNearMissView } from '../components/kpi/views/LeadingLaggingNearMissView';

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
  AlertTriangle: <AlertTriangle className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
  TrendingUp: <TrendingUp className="w-4 h-4" />,
  Gauge: <Gauge className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />
};

interface KPICategoryPageProps {
  categoryId: string;
}

export const KPICategoryPage: React.FC<KPICategoryPageProps> = ({ categoryId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'pptx'>('pdf');

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
    triggerSyncNow,
    resetToSampleData,
    saveConnectorConfig,
    metrics
  } = useKPIDataContext();

  const currentCategory = KPI_CATEGORIES.find(c => c.id === categoryId) || KPI_CATEGORIES[0];
  const categoryName = t(`kpiPlatform.categories.${currentCategory.id}`, currentCategory.name);
  const badgeText = t(`kpiPlatform.categories.${currentCategory.id}Badge`, currentCategory.badge);

  const handleOpenExport = (format: 'pdf' | 'pptx') => {
    setExportFormat(format);
    setIsExportOpen(true);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-6 space-y-6 animate-in fade-in duration-300">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          {t('nav.kpiDashboard', 'KPI Dashboard')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 dark:text-slate-200 font-semibold truncate">
          {categoryName}
        </span>
      </nav>

      {/* Page Header & Global Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-cyan-500/20">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
              {t('kpiPlatform.engineBadge', 'Quality Intelligence Engine')}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-300 dark:border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t('kpiPlatform.liveTelemetry', 'Live Telemetry Active')}
            </span>

            {/* In-App Scope Context Indicator */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 font-normal">{t('kpiPlatform.exportScopeBadge', 'Scope')}:</span>
              <strong className="text-cyan-600 dark:text-cyan-400 font-semibold">{filters.product}</strong>
              <span className="text-slate-400">•</span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">{filters.component}</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">v{filters.releaseVersion}</span>
            </span>

            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-semibold border border-cyan-300 dark:border-cyan-500/30">
              {badgeText}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit'] flex items-center gap-3">
            <span className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 shrink-0">
              {iconMap[currentCategory.iconName]}
            </span>
            <span>{categoryName}</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1">
            {currentCategory.description}
          </p>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => handleOpenExport('pdf')}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-800 shadow-2xs transition-colors cursor-pointer"
            title={t('kpiPlatform.exportPdf', 'Export KPI Report (PDF)')}
          >
            <FileText className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="hidden sm:inline">{t('kpiPlatform.exportPdf', 'Export PDF')}</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenExport('pptx')}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-800 shadow-2xs transition-colors cursor-pointer"
            title={t('kpiPlatform.exportPpt', 'Export KPI Deck (PowerPoint PPTX)')}
          >
            <Presentation className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="hidden sm:inline">{t('kpiPlatform.exportPpt', 'Export PPT')}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsConfigOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 font-semibold text-xs border border-cyan-200 dark:border-cyan-500/30 transition-colors cursor-pointer"
            title={t('kpiPlatform.syncTitle', 'Configure automated connectors and batch sync schedule')}
          >
            <Settings className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="hidden sm:inline">{t('kpiPlatform.connectorsSchedule', 'Connectors & Schedule')}</span>
          </button>

          <button
            type="button"
            onClick={resetToSampleData}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-semibold text-xs border border-purple-200 dark:border-purple-500/30 transition-colors cursor-pointer"
            title={t('kpiPlatform.resetDemoDataTitle', 'Reset all metrics back to default baseline')}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('kpiPlatform.resetDemoData', 'Reset Baseline')}</span>
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

      {/* Secondary Fast Category Switcher Pill Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7 gap-2.5 items-stretch">
        {KPI_CATEGORIES.map(category => {
          const isActive = currentCategory.id === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => navigate(category.path)}
              className={`flex flex-col justify-between h-[88px] min-h-[88px] max-h-[88px] w-full p-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer text-left border ${
                isActive
                  ? 'bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 text-white border-transparent shadow-md shadow-cyan-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 border-slate-200 dark:border-slate-800 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between gap-1.5 w-full">
                <span className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-white/20 text-white' : 'bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400'}`}>
                  {iconMap[category.iconName]}
                </span>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full truncate max-w-[120px] text-right ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}>
                  {t(`kpiPlatform.categories.${category.id}Badge`, category.badge)}
                </span>
              </div>
              <span className="font-['Outfit'] font-bold leading-tight line-clamp-2 mt-auto">
                {t(`kpiPlatform.categories.${category.id}`, category.name)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Category Content View */}
      <div className="transition-all duration-200">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-16 space-y-4">
            <RefreshCw className="w-8 h-8 text-cyan-600 dark:text-cyan-400 animate-spin" />
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {t('kpiPlatform.queryingDb', 'Querying local IndexedDB telemetry cache...')}
            </span>
          </div>
        ) : (
          <>
            {categoryId === 'executive' && (
              <ExecutiveScorecardView
                scorecard={metrics.executiveScorecard}
                testDistribution={metrics.testDistributionAll}
                testBurnoutForecast={metrics.testBurnoutForecast}
                jiraItems={jiraItems}
                testRailExecutions={testRailExecutions}
              />
            )}

            {categoryId === 'quality' && (
              <QualityDefectView
                agingBuckets={metrics.agingBuckets}
                severityCounts={metrics.severityCounts}
                defectTrends={metrics.defectTrends}
                mttrMttd={metrics.mttrMttd}
                jiraItems={jiraItems}
              />
            )}

            {categoryId === 'risk' && (
              <RiskGatingView
                componentRisks={metrics.componentRisks}
                jiraItems={jiraItems}
                testRailExecutions={testRailExecutions}
              />
            )}

            {categoryId === 'automation' && (
              <AutomationView
                automatedDistribution={metrics.testDistributionAutomated}
                manualDistribution={metrics.testDistributionManual}
                automationHealth={metrics.automationHealth}
                testRailExecutions={testRailExecutions}
                testAutomationForecast={metrics.testAutomationForecast}
              />
            )}

            {categoryId === 'productivity' && (
              <ProductivityView
                productivityMetrics={metrics.productivityMetrics}
                squadSummary={metrics.squadSummary}
                jiraItems={jiraItems}
              />
            )}

            {categoryId === 'governance' && (
              <GovernanceSlaView
                scorecard={metrics.executiveScorecard}
                jiraItems={jiraItems}
              />
            )}

            {categoryId === 'leadingLagging' && (
              <LeadingLaggingNearMissView
                leadingLaggingMetrics={metrics.leadingLaggingMetrics}
                nearMissAnalytics={metrics.nearMissAnalytics}
                jiraItems={jiraItems}
                testRailExecutions={testRailExecutions}
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

      {/* KPI Export Modal Dialog */}
      <KPIExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        filters={filters}
        releaseWindow={releaseWindow}
        metrics={metrics}
        jiraItems={jiraItems}
        testRailExecutions={testRailExecutions}
        initialFormat={exportFormat}
      />
    </div>
  );
};
