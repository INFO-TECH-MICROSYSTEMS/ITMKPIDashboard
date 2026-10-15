/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * KPI View: Leading, Lagging & Near Misses Analytics
 * Visualizes predictive leading indicators, historical lagging outcomes,
 * and near-miss defect discoveries intercepted through non-formal exploratory testing.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Compass, ArrowUpRight, ArrowDownRight, ShieldCheck, 
  AlertTriangle, Crosshair, Search, DollarSign, CheckCircle2, 
  HelpCircle, Sparkles, Layers, Activity
} from 'lucide-react';
import type { 
  LeadingLaggingMetricsSummary, 
  NearMissAnalyticsSummary,
  JiraWorkItem,
  TestRailExecution,
  KPIJustification
} from '../../../types/kpiPlatform';
import { MetricCard } from '../VisualWidgets';
import { MetricJustificationModal } from '../MetricJustificationModal';
import { KPIJustificationService } from '../../../services/kpiJustificationService';

interface LeadingLaggingNearMissViewProps {
  leadingLaggingMetrics: LeadingLaggingMetricsSummary;
  nearMissAnalytics: NearMissAnalyticsSummary;
  jiraItems: JiraWorkItem[];
  testRailExecutions: TestRailExecution[];
}

export const LeadingLaggingNearMissView: React.FC<LeadingLaggingNearMissViewProps> = ({
  leadingLaggingMetrics,
  nearMissAnalytics,
  jiraItems,
  testRailExecutions
}) => {
  const { t } = useTranslation();
  const [selectedJustification, setSelectedJustification] = useState<KPIJustification | null>(null);

  const statusColorMap = {
    Optimal: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-500/30',
    Warning: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-500/30',
    Breached: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-500/30'
  };

  return (
    <div className="space-y-6">
      {/* Top Telemetry Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Leading Health Index */}
        <MetricCard
          title={t('kpiPlatform.leadingLaggingView.leadingHealthIndex', 'Leading Health Index')}
          value={`${leadingLaggingMetrics.leadingHealthScore}/100`}
          target={t('kpiPlatform.leadingLaggingView.targetLeadingScore', '≥ 80/100')}
          trend={t('kpiPlatform.leadingLaggingView.predictiveTrajectory', 'Predictive Trajectory')}
          trendPositive={leadingLaggingMetrics.leadingHealthScore >= 80}
          statusBadge={t(`kpiPlatform.leadingLaggingView.status_${leadingLaggingMetrics.leadingStatus.replace(/\s+/g, '')}`, leadingLaggingMetrics.leadingStatus)}
          statusColor={leadingLaggingMetrics.leadingHealthScore >= 80 ? 'emerald' : leadingLaggingMetrics.leadingHealthScore >= 60 ? 'amber' : 'rose'}
          icon={<Compass className="w-5 h-5 text-cyan-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getLeadingLaggingJustification(leadingLaggingMetrics))}
        />

        {/* 2. Lagging Outcome Stability */}
        <MetricCard
          title={t('kpiPlatform.leadingLaggingView.laggingOutcomeStability', 'Lagging Outcome Stability')}
          value={`${leadingLaggingMetrics.laggingHealthScore}/100`}
          target={t('kpiPlatform.leadingLaggingView.targetLaggingScore', '≥ 80/100')}
          trend={t('kpiPlatform.leadingLaggingView.historicalRealization', 'Realized Production Health')}
          trendPositive={leadingLaggingMetrics.laggingHealthScore >= 80}
          statusBadge={t(`kpiPlatform.leadingLaggingView.status_${leadingLaggingMetrics.laggingStatus.replace(/\s+/g, '')}`, leadingLaggingMetrics.laggingStatus)}
          statusColor={leadingLaggingMetrics.laggingHealthScore >= 80 ? 'emerald' : leadingLaggingMetrics.laggingHealthScore >= 60 ? 'amber' : 'rose'}
          icon={<Activity className="w-5 h-5 text-purple-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getLeadingLaggingJustification(leadingLaggingMetrics))}
        />

        {/* 3. Near Miss Intercepted Defects */}
        <MetricCard
          title={t('kpiPlatform.leadingLaggingView.nearMissVolume', 'Near Misses Intercepted')}
          value={nearMissAnalytics.totalNearMisses}
          target={t('kpiPlatform.leadingLaggingView.targetNearMissRatio', '100% Intercepted Pre-Release')}
          trend={`${nearMissAnalytics.nearMissP1Blockers} ${t('kpiPlatform.leadingLaggingView.p1BlockersAverted', 'P1 Blockers Averted')}`}
          trendPositive={true}
          statusBadge={nearMissAnalytics.escapePreventionRatio >= 90 ? t('kpiPlatform.leadingLaggingView.statusShieldActive', 'Escape Shield Active') : t('kpiPlatform.statusWarning', 'Warning')}
          statusColor="emerald"
          icon={<Crosshair className="w-5 h-5 text-rose-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getNearMissAnalyticsJustification(nearMissAnalytics))}
        />

        {/* 4. Avoided Production Outage Cost */}
        <MetricCard
          title={t('kpiPlatform.leadingLaggingView.avoidedOutageCost', 'Avoided Outage Loss')}
          value={`$${nearMissAnalytics.totalAvoidedOutageCost.toLocaleString()}`}
          target={t('kpiPlatform.leadingLaggingView.targetZeroEscapes', '$0 Escapes')}
          trend={`~${nearMissAnalytics.totalAvoidedDowntimeHours} ${t('kpiPlatform.hrsUnit', 'hrs')} ${t('kpiPlatform.leadingLaggingView.downtimeSaved', 'downtime saved')}`}
          trendPositive={true}
          statusBadge={t('kpiPlatform.leadingLaggingView.statusValuePreserved', 'Value Preserved')}
          statusColor="emerald"
          icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getNearMissAnalyticsJustification(nearMissAnalytics))}
        />
      </div>

      {/* Correlation Insight Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-900/10 via-blue-900/10 to-indigo-900/10 dark:from-cyan-950/40 dark:via-blue-950/40 dark:to-indigo-950/40 border border-cyan-200/60 dark:border-cyan-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider font-bold text-cyan-600 dark:text-cyan-400">
              {t('kpiPlatform.leadingLaggingView.correlationAnalysisTitle', 'Predictive Correlation Telemetry')}
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">
              {leadingLaggingMetrics.correlationInsight}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setSelectedJustification(KPIJustificationService.getLeadingLaggingJustification(leadingLaggingMetrics))}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors shadow-2xs shrink-0 cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>{t('kpiPlatform.leadingLaggingView.viewCorrelationModel', 'Audit Correlation Model')}</span>
        </button>
      </div>

      {/* Two Column Layout: Leading Indicators vs Lagging Indicators Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Leading Indicators (In-flight / Predictive) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <ArrowUpRight className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white">
                  {t('kpiPlatform.leadingLaggingView.leadingColumnTitle', 'Leading Indicators (Predictive & In-Flight)')}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t('kpiPlatform.leadingLaggingView.leadingColumnSubtitle', 'Signals measured before release gating to forecast outcome risks')}
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
              {t('kpiPlatform.leadingLaggingView.shiftLeftBadge', 'Shift-Left')}
            </span>
          </div>

          <div className="space-y-3">
            {leadingLaggingMetrics.leadingIndicators.map(indicator => {
              const handleJustify = () => {
                if (indicator.id === 'pr-test-gate') {
                  setSelectedJustification(KPIJustificationService.getPrQualityGateJustification(indicator));
                } else if (indicator.id === 'high-dep-complexity') {
                  setSelectedJustification(KPIJustificationService.getHighDependencyRatioJustification(indicator));
                } else if (indicator.id === 'automation-velocity') {
                  setSelectedJustification(KPIJustificationService.getInFlightAutomationVelocityJustification(indicator));
                } else if (indicator.id === 'exploratory-intercept') {
                  setSelectedJustification(KPIJustificationService.getExploratoryRatioJustification(indicator));
                }
              };

              return (
                <div 
                  key={indicator.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-2 hover:border-cyan-300 dark:hover:border-cyan-700/60 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-mono uppercase font-semibold text-slate-400 dark:text-slate-500">
                        {t(`kpiPlatform.leadingLaggingView.category_${indicator.category.replace(/\s+/g, '')}`, indicator.category)}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {t(`kpiPlatform.leadingLaggingView.metric_${indicator.id.replace(/-/g, '_')}`, indicator.name)}
                        </span>
                        <button
                          type="button"
                          onClick={handleJustify}
                          className="p-0.5 rounded text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                          title={t('kpiPlatform.leadingLaggingView.explainMetric', 'Click to view metric audit justification & formula')}
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleJustify}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border cursor-pointer hover:scale-105 transition-transform ${statusColorMap[indicator.status]}`}
                      title={t('kpiPlatform.leadingLaggingView.explainMetric', 'Click to view metric audit justification & formula')}
                    >
                      {indicator.formattedValue}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span>{t('kpiPlatform.leadingLaggingView.targetLabel', 'Target')}: <strong className="text-slate-700 dark:text-slate-300">{indicator.target}</strong></span>
                    <span className="text-[10px] italic">{indicator.predictiveInsight}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Lagging Indicators (Outcome / Post-Release) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                <ArrowDownRight className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white">
                  {t('kpiPlatform.leadingLaggingView.laggingColumnTitle', 'Lagging Indicators (Realized Outcomes & Stability)')}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t('kpiPlatform.leadingLaggingView.laggingColumnSubtitle', 'Historical metrics validating whether leading rigor prevented defects')}
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50">
              {t('kpiPlatform.leadingLaggingView.postHocBadge', 'Post-Hoc')}
            </span>
          </div>

          <div className="space-y-3">
            {leadingLaggingMetrics.laggingIndicators.map(indicator => {
              const handleJustify = () => {
                if (indicator.id === 'defect-leakage') {
                  setSelectedJustification(KPIJustificationService.getDefectLeakageJustification(indicator.value, jiraItems));
                } else if (indicator.id === 'dora-cfr') {
                  setSelectedJustification(KPIJustificationService.getChangeFailureRateJustification(indicator.value));
                } else if (indicator.id === 'mttr-lagging') {
                  setSelectedJustification(KPIJustificationService.getMttrJustification(indicator.value));
                } else if (indicator.id === 'copq-rework') {
                  setSelectedJustification(KPIJustificationService.getCostOfPoorQualityJustification({
                    costOfPoorQuality: indicator.value,
                    costSavingsAutomated: 32500
                  } as any));
                }
              };

              return (
                <div 
                  key={indicator.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-2 hover:border-purple-300 dark:hover:border-purple-700/60 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-mono uppercase font-semibold text-slate-400 dark:text-slate-500">
                        {t(`kpiPlatform.leadingLaggingView.category_${indicator.category.replace(/\s+/g, '')}`, indicator.category)}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {t(`kpiPlatform.leadingLaggingView.metric_${indicator.id.replace(/-/g, '_')}`, indicator.name)}
                        </span>
                        <button
                          type="button"
                          onClick={handleJustify}
                          className="p-0.5 rounded text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                          title={t('kpiPlatform.leadingLaggingView.explainMetric', 'Click to view metric audit justification & formula')}
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleJustify}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border cursor-pointer hover:scale-105 transition-transform ${statusColorMap[indicator.status]}`}
                      title={t('kpiPlatform.leadingLaggingView.explainMetric', 'Click to view metric audit justification & formula')}
                    >
                      {indicator.formattedValue}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span>{t('kpiPlatform.leadingLaggingView.targetLabel', 'Target')}: <strong className="text-slate-700 dark:text-slate-300">{indicator.target}</strong></span>
                    <span className="text-[10px] italic">{indicator.historicalOutcome}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Near Miss Intelligence & Discovery Origin Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Method Distribution Chart / Cards */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white">
                {t('kpiPlatform.leadingLaggingView.discoveryOriginsTitle', 'Defect Discovery Origin Breakdown')}
              </h4>
              <button
                type="button"
                onClick={() => setSelectedJustification(KPIJustificationService.getDiscoveryOriginsJustification(nearMissAnalytics))}
                className="p-1 rounded-md text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={t('kpiPlatform.leadingLaggingView.explainMetric', 'Click to view metric audit justification & formula')}
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              {t('kpiPlatform.leadingLaggingView.formalVsNonFormal', 'Formal vs. Non-Formal')}
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                label: t('kpiPlatform.leadingLaggingView.methodFormalScripted', 'Formal Scripted TestRail'),
                count: nearMissAnalytics.discoveryMethodDistribution.formalScripted,
                color: 'bg-cyan-500',
                badgeColor: 'text-cyan-600 dark:text-cyan-400'
              },
              {
                label: t('kpiPlatform.leadingLaggingView.methodAutomatedCi', 'Automated CI/CD Pipeline'),
                count: nearMissAnalytics.discoveryMethodDistribution.automatedCi,
                color: 'bg-emerald-500',
                badgeColor: 'text-emerald-600 dark:text-emerald-400'
              },
              {
                label: t('kpiPlatform.leadingLaggingView.methodExploratoryAdHoc', 'Exploratory & Ad-hoc Probing'),
                count: nearMissAnalytics.discoveryMethodDistribution.exploratoryAdHoc,
                color: 'bg-amber-500',
                badgeColor: 'text-amber-600 dark:text-amber-400'
              },
              {
                label: t('kpiPlatform.leadingLaggingView.methodBugBashDogfood', 'Bug Bash & Dogfooding'),
                count: nearMissAnalytics.discoveryMethodDistribution.bugBashDogfood,
                color: 'bg-purple-500',
                badgeColor: 'text-purple-600 dark:text-purple-400'
              },
              {
                label: t('kpiPlatform.leadingLaggingView.methodProductionEscaped', 'Escaped Customer APARs'),
                count: nearMissAnalytics.discoveryMethodDistribution.productionEscaped,
                color: 'bg-rose-500',
                badgeColor: 'text-rose-600 dark:text-rose-400'
              }
            ].map(item => {
              const total = 
                nearMissAnalytics.discoveryMethodDistribution.formalScripted +
                nearMissAnalytics.discoveryMethodDistribution.automatedCi +
                nearMissAnalytics.discoveryMethodDistribution.exploratoryAdHoc +
                nearMissAnalytics.discoveryMethodDistribution.bugBashDogfood +
                nearMissAnalytics.discoveryMethodDistribution.productionEscaped;
              const pct = total > 0 ? ((item.count / total) * 100).toFixed(1) : '0';

              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{item.label}</span>
                    <span className={`font-bold ${item.badgeColor}`}>{item.count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>{t('kpiPlatform.leadingLaggingView.backfillComplianceLabel', 'Suite Backfill Compliance')}:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {nearMissAnalytics.backfillCompliancePercent}% {t('kpiPlatform.leadingLaggingView.catalogued', 'Catalogued in TestRail')}
            </span>
          </div>
        </div>

        {/* Near Miss Defect Intercept Log Table */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white">
                  {t('kpiPlatform.leadingLaggingView.nearMissTableTitle', 'Major Defects Intercepted via Non-Formal Testing')}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t('kpiPlatform.leadingLaggingView.nearMissTableSubtitle', 'High-severity bugs found during exploratory sessions that prevented production escape')}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedJustification(KPIJustificationService.getNearMissAnalyticsJustification(nearMissAnalytics))}
              className="p-1 rounded-md text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Explain Near Miss Methodology & Justification"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-2.5 rounded-l-lg">{t('kpiPlatform.qualityView.tableKey', 'Key')}</th>
                  <th className="p-2.5">{t('kpiPlatform.qualityView.tableTitle', 'Title')}</th>
                  <th className="p-2.5">{t('kpiPlatform.qualityView.tableSeverity', 'Severity')}</th>
                  <th className="p-2.5">{t('kpiPlatform.leadingLaggingView.tableDiscovery', 'Discovery')}</th>
                  <th className="p-2.5">{t('kpiPlatform.leadingLaggingView.tableAvoidedCost', 'Avoided Cost')}</th>
                  <th className="p-2.5 rounded-r-lg">{t('kpiPlatform.leadingLaggingView.tableTestRailBackfill', 'TestRail Backfill')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {nearMissAnalytics.recentNearMisses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-slate-400 font-mono">
                      {t('kpiPlatform.leadingLaggingView.noNearMissesFound', 'No near miss defects recorded in selected scope.')}
                    </td>
                  </tr>
                ) : (
                  nearMissAnalytics.recentNearMisses.map(defect => (
                    <tr key={defect.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-2.5 font-mono font-bold text-cyan-600 dark:text-cyan-400">{defect.id}</td>
                      <td className="p-2.5 text-slate-900 dark:text-white truncate max-w-xs">{defect.title}</td>
                      <td className="p-2.5 font-mono text-rose-600 dark:text-rose-400 font-bold">{defect.severity}</td>
                      <td className="p-2.5 font-mono text-[11px] text-amber-600 dark:text-amber-400">{defect.discoveryMethod}</td>
                      <td className="p-2.5 font-mono text-emerald-600 dark:text-emerald-400 font-bold">${defect.preventedOutageCost.toLocaleString()}</td>
                      <td className="p-2.5 font-mono">
                        {defect.hasFormalTestCaseBackfill ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" />
                            {defect.linkedFormalTestCaseId || t('kpiPlatform.leadingLaggingView.backfilled', 'Backfilled')}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] text-rose-600 dark:text-rose-400 font-semibold bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-500/20">
                            <AlertTriangle className="w-3 h-3" />
                            {t('kpiPlatform.leadingLaggingView.backfillPending', 'Pending Backfill')}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* KPI Justification Modal */}
      <MetricJustificationModal
        isOpen={Boolean(selectedJustification)}
        justification={selectedJustification}
        onClose={() => setSelectedJustification(null)}
      />
    </div>
  );
};
