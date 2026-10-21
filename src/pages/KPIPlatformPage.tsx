/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * Main Quality Engineering KPI & Data Mining Platform Page
 * Central orchestration overview delivering interactive categorized KPI dashboards,
 * multi-dimensional filtering, and data mining connector management.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Activity, AlertTriangle, Cpu, 
  TrendingUp, Gauge, Compass, RefreshCw, Settings, Sparkles,
  FileText, Presentation, ExternalLink
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

export const KPIPlatformPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('executive');
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
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

  const handleOpenExport = (format: 'pdf' | 'pptx') => {
    setExportFormat(format);
    setIsExportOpen(true);
  };

  const activeCategoryDef = KPI_CATEGORIES.find(c => c.id === activeCategory) || KPI_CATEGORIES[0];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-cyan-500/20">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
              {t('kpiPlatform.engineBadge')}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-300 dark:border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t('kpiPlatform.liveTelemetry')}
            </span>

            {/* In-App Scope Context Indicator (Product, Component, Release Target) */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 font-normal">{t('kpiPlatform.exportScopeBadge', 'Scope')}:</span>
              <strong className="text-cyan-600 dark:text-cyan-400 font-semibold">{filters.product}</strong>
              <span className="text-slate-400">•</span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">{filters.component}</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">v{filters.releaseVersion}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
            {t('kpiPlatform.title')}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1">
            {t('kpiPlatform.subtitle')}
          </p>
        </div>

        {/* Global Action Controls: Export Buttons, Connector Modal, Demo Data Reset */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Dedicated Category Page Deep-Link */}
          <button
            type="button"
            onClick={() => navigate(activeCategoryDef.path)}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md shadow-cyan-600/20 transition-all cursor-pointer"
            title={`Open dedicated page for ${activeCategoryDef.name}`}
          >
            <span>Open Dedicated View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Export PDF Button */}
          <button
            type="button"
            onClick={() => handleOpenExport('pdf')}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-800 shadow-2xs transition-colors cursor-pointer"
            title={t('kpiPlatform.exportPdf', 'Export KPI Report (PDF)')}
          >
            <FileText className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="hidden sm:inline">{t('kpiPlatform.exportPdf', 'Export PDF')}</span>
          </button>

          {/* Export PPT Button */}
          <button
            type="button"
            onClick={() => handleOpenExport('pptx')}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-800 shadow-2xs transition-colors cursor-pointer"
            title={t('kpiPlatform.exportPpt', 'Export KPI Deck (PowerPoint PPTX)')}
          >
            <Presentation className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="hidden sm:inline">{t('kpiPlatform.exportPpt', 'Export PPT')}</span>
          </button>

          {/* Connectors & Schedule Modal Trigger */}
          <button
            type="button"
            onClick={() => setIsConfigOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 font-semibold text-xs border border-cyan-200 dark:border-cyan-500/30 transition-colors cursor-pointer"
            title={t('kpiPlatform.syncTitle')}
          >
            <Settings className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="hidden sm:inline">{t('kpiPlatform.connectorsSchedule')}</span>
          </button>

          {/* Reset Demo Data Button */}
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

      {/* KPI Category Navigation (Full-Width Responsive Grid, Uniform Height & Width across all 7 Categories) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7 gap-2.5 items-stretch">
        {KPI_CATEGORIES.map(category => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
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

            {activeCategory === 'leadingLagging' && (
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
        metrics={metrics}
        filters={filters}
        initialFormat={exportFormat}
      />

    </div>
  );
};
export default KPIPlatformPage;
