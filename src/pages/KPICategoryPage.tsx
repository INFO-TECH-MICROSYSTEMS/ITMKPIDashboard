/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  RefreshCw, Settings, Sparkles, FileText, Presentation, 
  ChevronRight, ShieldCheck, Activity, AlertTriangle, 
  Cpu, TrendingUp, Gauge, Compass, ArrowDown
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
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'pptx'>('pdf');

  const {
    filters,
    filtersB,
    isCompareMode,
    setIsCompareMode,
    releaseWindow,
    releaseWindowB,
    updateFilter,
    updateFilterB,
    resetFilters,
    resetFiltersB,
    swapScopes,
    jiraItems,
    jiraItemsB,
    testRailExecutions,
    testRailExecutionsB,
    connectorConfigs,
    isLoading,
    isSyncing,
    triggerSyncNow,
    resetToSampleData,
    saveConnectorConfig,
    metrics,
    metricsB
  } = useKPIDataContext();

  const currentCategory = KPI_CATEGORIES.find(c => c.id === categoryId) || KPI_CATEGORIES[0];
  const categoryName = t(`kpiPlatform.categories.${currentCategory.id}`, currentCategory.name);
  const badgeText = t(`kpiPlatform.categories.${currentCategory.id}Badge`, currentCategory.badge);

  const scopeALabel = `${filters.product} (${filters.component !== 'All' ? `${filters.component} • ` : ''}v${filters.releaseVersion})`;
  const scopeBLabel = filtersB ? `${filtersB.product} (${filtersB.component !== 'All' ? `${filtersB.component} • ` : ''}v${filtersB.releaseVersion})` : 'Scope B';

  const handleOpenExport = (format: 'pdf' | 'pptx') => {
    setExportFormat(format);
    setIsExportOpen(true);
  };

  /**
   * Helper to render the entire KPI view for a given scope
   */
  const renderCategoryContent = (scopeType: 'A' | 'B') => {
    const isScopeB = scopeType === 'B';
    const activeMetrics = isScopeB && metricsB ? metricsB : metrics;
    const activeJira = isScopeB ? jiraItemsB : jiraItems;
    const activeTests = isScopeB ? testRailExecutionsB : testRailExecutions;

    if (!activeMetrics) return null;

    return (
      <>
        {categoryId === 'executive' && (
          <ExecutiveScorecardView
            scorecard={activeMetrics.executiveScorecard}
            testDistribution={activeMetrics.testDistributionAll}
            testBurnoutForecast={activeMetrics.testBurnoutForecast}
            jiraItems={activeJira}
            testRailExecutions={activeTests}
          />
        )}

        {categoryId === 'quality' && (
          <QualityDefectView
            agingBuckets={activeMetrics.agingBuckets}
            severityCounts={activeMetrics.severityCounts}
            defectTrends={activeMetrics.defectTrends}
            mttrMttd={activeMetrics.mttrMttd}
            jiraItems={activeJira}
          />
        )}

        {categoryId === 'risk' && (
          <RiskGatingView
            componentRisks={activeMetrics.componentRisks}
            jiraItems={activeJira}
            testRailExecutions={activeTests}
          />
        )}

        {categoryId === 'automation' && (
          <AutomationView
            automatedDistribution={activeMetrics.testDistributionAutomated}
            manualDistribution={activeMetrics.testDistributionManual}
            automationHealth={activeMetrics.automationHealth}
            testRailExecutions={activeTests}
            testAutomationForecast={activeMetrics.testAutomationForecast}
          />
        )}

        {categoryId === 'productivity' && (
          <ProductivityView
            productivityMetrics={activeMetrics.productivityMetrics}
            squadSummary={activeMetrics.squadSummary}
            jiraItems={activeJira}
          />
        )}

        {categoryId === 'governance' && (
          <GovernanceSlaView
            scorecard={activeMetrics.executiveScorecard}
            jiraItems={activeJira}
          />
        )}

        {categoryId === 'leadingLagging' && (
          <LeadingLaggingNearMissView
            leadingLaggingMetrics={activeMetrics.leadingLaggingMetrics}
            nearMissAnalytics={activeMetrics.nearMissAnalytics}
            jiraItems={activeJira}
            testRailExecutions={activeTests}
          />
        )}
      </>
    );
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-6 space-y-6 animate-in fade-in duration-300">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          {t('nav.home', 'Home')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 dark:text-slate-200 font-semibold truncate">
          {categoryName}
        </span>
        {isCompareMode && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30">
              Stacked Scope Comparison Active
            </span>
          </>
        )}
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
              <span className="text-slate-400 font-normal">Scope 1:</span>
              <strong className="text-cyan-600 dark:text-cyan-400 font-semibold">{filters.product}</strong>
              <span className="text-slate-400">•</span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">{filters.component}</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">v{filters.releaseVersion}</span>
            </span>

            {isCompareMode && filtersB && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                <span className="text-purple-400 font-normal">Scope 2:</span>
                <strong className="text-purple-600 dark:text-purple-400 font-semibold">{filtersB.product}</strong>
                <span className="text-purple-400">•</span>
                <span className="text-purple-700 dark:text-purple-300 font-medium">{filtersB.component}</span>
                <span className="text-purple-400">•</span>
                <span className="text-purple-600 dark:text-purple-400 font-semibold">v{filtersB.releaseVersion}</span>
              </span>
            )}

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

      {/* Multi-Dimensional Filter Bar with Dual-Scope Comparison Support */}
      <KPIFilterBar
        filters={filters}
        releaseWindow={releaseWindow}
        onFilterChange={updateFilter}
        onResetFilters={resetFilters}
        totalFilteredJira={jiraItems.length}
        totalFilteredTests={testRailExecutions.length}
        isCompareMode={isCompareMode}
        onToggleCompareMode={() => setIsCompareMode(!isCompareMode)}
        filtersB={filtersB}
        onFilterChangeB={updateFilterB}
        onResetFiltersB={resetFiltersB}
        onSwapScopes={swapScopes}
        totalFilteredJiraB={jiraItemsB.length}
        totalFilteredTestsB={testRailExecutionsB.length}
        releaseWindowB={releaseWindowB}
      />

      {/* Main Content Area: Single Scope View or Stacked Comparison Views (Scope 1 above Scope 2) */}
      <div className="transition-all duration-200">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-16 space-y-4">
            <RefreshCw className="w-8 h-8 text-cyan-600 dark:text-cyan-400 animate-spin" />
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {t('kpiPlatform.queryingDb', 'Querying local IndexedDB telemetry cache...')}
            </span>
          </div>
        ) : !isCompareMode ? (
          /* Standard Single-Scope Presentation */
          renderCategoryContent('A')
        ) : (
          /* Stacked Dual-Scope Presentation: Clean, Uncompromised View 1 followed by View 2 */
          <div className="space-y-12">
            {/* Section 1: Scope 1 Header & Complete Original KPI Presentation */}
            <div className="space-y-4 p-5 sm:p-6 rounded-3xl bg-cyan-50/20 dark:bg-cyan-950/10 border-2 border-cyan-500/30 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-cyan-200/60 dark:border-cyan-800/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-cyan-500 ring-4 ring-cyan-500/20" />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold">
                      Comparison Target 1
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
                      {scopeALabel}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-300 dark:border-cyan-800">
                    {testRailExecutions.length.toLocaleString()} Tests • {jiraItems.length.toLocaleString()} Work Items
                  </span>
                </div>
              </div>

              {renderCategoryContent('A')}
            </div>

            {/* Visual Divider / Flow Indicator */}
            <div className="flex items-center justify-center gap-4 py-2">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-mono font-semibold border border-slate-200 dark:border-slate-700 shadow-2xs">
                <ArrowDown className="w-3.5 h-3.5 text-purple-500 animate-bounce" />
                <span>Comparing with Scope 2 below</span>
              </div>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Section 2: Scope 2 Header & Complete Original KPI Presentation */}
            <div className="space-y-4 p-5 sm:p-6 rounded-3xl bg-purple-50/20 dark:bg-purple-950/10 border-2 border-purple-500/30 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-200/60 dark:border-purple-800/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-purple-500 ring-4 ring-purple-500/20" />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-bold">
                      Comparison Target 2
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
                      {scopeBLabel}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold border border-purple-300 dark:border-purple-800">
                    {testRailExecutionsB.length.toLocaleString()} Tests • {jiraItemsB.length.toLocaleString()} Work Items
                  </span>
                </div>
              </div>

              {renderCategoryContent('B')}
            </div>
          </div>
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
