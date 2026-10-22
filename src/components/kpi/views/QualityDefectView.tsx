/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * KPI View: Quality & Defect Diagnostics
 * In-depth metrics on gating defects, aging queues, discovery vs burnout curves, and MTTR.
 * Seamlessly supports both single-scope analysis and vertically stacked (Scope 1 on top of Scope 2) comparison.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Bug, AlertTriangle, Clock, RefreshCw, Flame, HelpCircle
} from 'lucide-react';
import type { 
  AgingBuckets, 
  DefectSeverityCounts, 
  TrendPoint, 
  JiraWorkItem, 
  QualityDiagnosticsSummary,
  KPIJustification 
} from '../../../types/kpiPlatform';
import { MetricCard, AreaTrendChart } from '../VisualWidgets';
import { MetricJustificationModal } from '../MetricJustificationModal';
import { KPIJustificationService } from '../../../services/kpiJustificationService';
import type { ViewComparisonProps } from '../contracts/ViewComparisonContract';

interface QualityDefectViewProps extends ViewComparisonProps {
  agingBuckets: AgingBuckets;
  severityCounts: DefectSeverityCounts;
  defectTrends: TrendPoint[];
  mttrMttd: QualityDiagnosticsSummary;
  jiraItems: JiraWorkItem[];
  jiraItemsB?: JiraWorkItem[];
}

export const QualityDefectView: React.FC<QualityDefectViewProps> = ({
  agingBuckets,
  severityCounts,
  defectTrends,
  mttrMttd,
  jiraItems,
  jiraItemsB = [],
  isCompareMode = false,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  metricsB
}) => {
  const { t } = useTranslation();
  const [selectedJustification, setSelectedJustification] = useState<KPIJustification | null>(null);

  // Scope 1 filtered items
  const gatingDefectsList = jiraItems.filter(i => i.isGatingDefect && i.status !== 'Done');
  const customerAparList = jiraItems.filter(i => i.isCustomerDefect || i.type === 'CustomerAPAR');

  const totalAgingItems = 
    agingBuckets.pending7Days + 
    agingBuckets.pending7To14Days + 
    agingBuckets.pending14To21Days + 
    agingBuckets.pending21PlusDays;

  // Scope 2 extracted telemetry (when comparison mode is active)
  const mttrMttdB = metricsB?.mttrMttd;
  const agingBucketsB = metricsB?.agingBuckets;
  const severityCountsB = metricsB?.severityCounts;
  const defectTrendsB = metricsB?.defectTrends;
  const customerAparListB = jiraItemsB.filter(i => i.isCustomerDefect || i.type === 'CustomerAPAR');
  const gatingDefectsListB = jiraItemsB.filter(i => i.isGatingDefect && i.status !== 'Done');

  const totalAgingItemsB = agingBucketsB ? (
    agingBucketsB.pending7Days + 
    agingBucketsB.pending7To14Days + 
    agingBucketsB.pending14To21Days + 
    agingBucketsB.pending21PlusDays
  ) : 0;

  return (
    <div className="space-y-6">
      {/* Metrics Row: Vertically Stacked Metric Cards (Scope 1 on Top of Scope 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. MTTR */}
        <MetricCard
          title={t('kpiPlatform.qualityView.mttrCard', 'Mean Time to Resolve (MTTR)')}
          value={`${mttrMttd.avgMttrHours} ${t('kpiPlatform.hrsUnit', 'hrs')}`}
          target={`< 24.0 ${t('kpiPlatform.hrsUnit', 'hrs')}`}
          trend={`8.5% ${t('kpiPlatform.qualityView.fasterTrend', 'faster')}`}
          trendPositive={mttrMttd.avgMttrHours <= 24.0}
          statusBadge={mttrMttd.avgMttrHours <= 24.0 ? t('kpiPlatform.statusMet', 'SLA Met') : mttrMttd.avgMttrHours <= 36.0 ? t('kpiPlatform.statusWarning', 'Warning') : t('kpiPlatform.statusBreached', 'Breached')}
          statusColor={mttrMttd.avgMttrHours <= 24.0 ? 'emerald' : mttrMttd.avgMttrHours <= 36.0 ? 'amber' : 'rose'}
          icon={<Clock className="w-5 h-5 text-emerald-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getMttrJustification(mttrMttd.avgMttrHours))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={mttrMttdB ? `${mttrMttdB.avgMttrHours} ${t('kpiPlatform.hrsUnit', 'hrs')}` : undefined}
          compareStatusBadge={mttrMttdB ? (mttrMttdB.avgMttrHours <= 24.0 ? 'SLA Met' : mttrMttdB.avgMttrHours <= 36.0 ? 'Warning' : 'Breached') : undefined}
          compareStatusColor={mttrMttdB ? (mttrMttdB.avgMttrHours <= 24.0 ? 'emerald' : mttrMttdB.avgMttrHours <= 36.0 ? 'amber' : 'rose') : undefined}
          delta={mttrMttdB !== undefined ? `${(mttrMttd.avgMttrHours - mttrMttdB.avgMttrHours) > 0 ? '+' : ''}${(mttrMttd.avgMttrHours - mttrMttdB.avgMttrHours).toFixed(1)}h` : undefined}
          deltaPositive={mttrMttdB !== undefined && mttrMttd.avgMttrHours <= mttrMttdB.avgMttrHours}
        />

        {/* 2. MTTD */}
        <MetricCard
          title={t('kpiPlatform.qualityView.mttdCard', 'Mean Time to Detect (MTTD)')}
          value={`${mttrMttd.avgMttdHours} ${t('kpiPlatform.hrsUnit', 'hrs')}`}
          target={`< 6.0 ${t('kpiPlatform.hrsUnit', 'hrs')}`}
          trendPositive={mttrMttd.avgMttdHours <= 6.0}
          statusBadge={mttrMttd.avgMttdHours <= 6.0 ? t('kpiPlatform.statusFastDiscovery', 'Fast Discovery') : mttrMttd.avgMttdHours <= 12.0 ? t('kpiPlatform.statusLagging', 'Lagging') : t('kpiPlatform.statusCriticalLag', 'Critical Lag')}
          statusColor={mttrMttd.avgMttdHours <= 6.0 ? 'emerald' : mttrMttd.avgMttdHours <= 12.0 ? 'amber' : 'rose'}
          icon={<Flame className="w-5 h-5 text-amber-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getMttdJustification(mttrMttd.avgMttdHours))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={mttrMttdB ? `${mttrMttdB.avgMttdHours} ${t('kpiPlatform.hrsUnit', 'hrs')}` : undefined}
          compareStatusBadge={mttrMttdB ? (mttrMttdB.avgMttdHours <= 6.0 ? 'Fast Discovery' : mttrMttdB.avgMttdHours <= 12.0 ? 'Lagging' : 'Critical Lag') : undefined}
          compareStatusColor={mttrMttdB ? (mttrMttdB.avgMttdHours <= 6.0 ? 'emerald' : mttrMttdB.avgMttdHours <= 12.0 ? 'amber' : 'rose') : undefined}
          delta={mttrMttdB !== undefined ? `${(mttrMttd.avgMttdHours - mttrMttdB.avgMttdHours) > 0 ? '+' : ''}${(mttrMttd.avgMttdHours - mttrMttdB.avgMttdHours).toFixed(1)}h` : undefined}
          deltaPositive={mttrMttdB !== undefined && mttrMttd.avgMttdHours <= mttrMttdB.avgMttdHours}
        />

        {/* 3. Defect Reopen Rate */}
        <MetricCard
          title={t('kpiPlatform.qualityView.reopenCard', 'Defect Reopen Rate')}
          value={`${mttrMttd.reopenRate}%`}
          target="< 5.0%"
          trend={`${mttrMttd.reopenedCount} ${t('kpiPlatform.qualityView.reopenedTrend', 'reopened')}`}
          trendPositive={mttrMttd.reopenRate < 5}
          statusBadge={mttrMttd.reopenRate < 5 ? t('kpiPlatform.statusStable', 'Stable') : mttrMttd.reopenRate <= 10 ? t('kpiPlatform.statusElevated', 'Elevated') : t('kpiPlatform.statusHighChurn', 'High Churn')}
          statusColor={mttrMttd.reopenRate < 5 ? 'emerald' : mttrMttd.reopenRate <= 10 ? 'amber' : 'rose'}
          icon={<RefreshCw className="w-5 h-5 text-amber-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getReopenRateJustification(mttrMttd.reopenRate, mttrMttd.reopenedCount))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={mttrMttdB ? `${mttrMttdB.reopenRate}%` : undefined}
          compareStatusBadge={mttrMttdB ? (mttrMttdB.reopenRate < 5 ? 'Stable' : mttrMttdB.reopenRate <= 10 ? 'Elevated' : 'High Churn') : undefined}
          compareStatusColor={mttrMttdB ? (mttrMttdB.reopenRate < 5 ? 'emerald' : mttrMttdB.reopenRate <= 10 ? 'amber' : 'rose') : undefined}
          delta={mttrMttdB !== undefined ? `${(mttrMttd.reopenRate - mttrMttdB.reopenRate) > 0 ? '+' : ''}${(mttrMttd.reopenRate - mttrMttdB.reopenRate).toFixed(1)}%` : undefined}
          deltaPositive={mttrMttdB !== undefined && mttrMttd.reopenRate <= mttrMttdB.reopenRate}
        />

        {/* 4. Customer Escalations (APARs) */}
        <MetricCard
          title={t('kpiPlatform.qualityView.aparCard', 'Customer Escalations (APARs)')}
          value={customerAparList.length}
          target="< 10 Total"
          trendPositive={customerAparList.length <= 10}
          statusBadge={customerAparList.length <= 10 ? t('kpiPlatform.statusControlledImpact', 'Controlled Impact') : customerAparList.length <= 20 ? t('kpiPlatform.statusElevatedApars', 'Elevated APARs') : t('kpiPlatform.statusSevereEscapes', 'Severe Escapes')}
          statusColor={customerAparList.length <= 10 ? 'emerald' : customerAparList.length <= 20 ? 'amber' : 'rose'}
          icon={<Bug className="w-5 h-5 text-purple-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getCustomerAparJustification(customerAparList))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={customerAparListB.length}
          compareStatusBadge={customerAparListB.length <= 10 ? 'Controlled' : customerAparListB.length <= 20 ? 'Elevated' : 'Severe'}
          compareStatusColor={customerAparListB.length <= 10 ? 'emerald' : customerAparListB.length <= 20 ? 'amber' : 'rose'}
          delta={isCompareMode ? `${(customerAparList.length - customerAparListB.length) > 0 ? '+' : ''}${customerAparList.length - customerAparListB.length} APARs` : undefined}
          deltaPositive={customerAparList.length <= customerAparListB.length}
        />

        {/* 5. Defect Density per KLOC */}
        <MetricCard
          title={t('kpiPlatform.qualityView.defectDensityCard', 'Defect Density per KLOC')}
          value={`${mttrMttd.defectDensityKloc} / KLOC`}
          target={t('kpiPlatform.qualityView.targetDefectDensity', '< 1.00 / KLOC')}
          trend={t('kpiPlatform.qualityView.healthyArchitecture', 'Healthy Architecture')}
          trendPositive={mttrMttd.defectDensityKloc < 1.0}
          statusBadge={mttrMttd.defectDensityKloc < 1.0 ? t('kpiPlatform.statusOptimal', 'Optimal') : t('kpiPlatform.statusElevated', 'Elevated')}
          statusColor={mttrMttd.defectDensityKloc < 1.0 ? 'emerald' : 'rose'}
          icon={<Bug className="w-5 h-5 text-teal-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getDefectDensityJustification(mttrMttd.defectDensityKloc))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={mttrMttdB ? `${mttrMttdB.defectDensityKloc} / KLOC` : undefined}
          compareStatusBadge={mttrMttdB ? (mttrMttdB.defectDensityKloc < 1.0 ? 'Optimal' : 'Elevated') : undefined}
          compareStatusColor={mttrMttdB ? (mttrMttdB.defectDensityKloc < 1.0 ? 'emerald' : 'rose') : undefined}
          delta={mttrMttdB !== undefined ? `${(mttrMttd.defectDensityKloc - mttrMttdB.defectDensityKloc) > 0 ? '+' : ''}${(mttrMttd.defectDensityKloc - mttrMttdB.defectDensityKloc).toFixed(2)}/KLOC` : undefined}
          deltaPositive={mttrMttdB !== undefined && mttrMttd.defectDensityKloc <= mttrMttdB.defectDensityKloc}
        />

        {/* 6. First-Time Fix Rate */}
        <MetricCard
          title={t('kpiPlatform.qualityView.ftfrCard', 'First-Time Fix Rate (FTFR)')}
          value={`${mttrMttd.firstTimeFixRate}%`}
          target={t('kpiPlatform.qualityView.targetFtfr', '> 90.0%')}
          trend={t('kpiPlatform.qualityView.highFixRigor', 'High Fix Rigor')}
          trendPositive={mttrMttd.firstTimeFixRate >= 90.0}
          statusBadge={mttrMttd.firstTimeFixRate >= 90.0 ? t('kpiPlatform.statusOptimal', 'Rigorous') : t('kpiPlatform.statusWarning', 'Churn Risk')}
          statusColor={mttrMttd.firstTimeFixRate >= 90.0 ? 'emerald' : 'amber'}
          icon={<Clock className="w-5 h-5 text-indigo-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getFirstTimeFixRateJustification(mttrMttd.firstTimeFixRate))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={mttrMttdB ? `${mttrMttdB.firstTimeFixRate}%` : undefined}
          compareStatusBadge={mttrMttdB ? (mttrMttdB.firstTimeFixRate >= 90.0 ? 'Rigorous' : 'Churn Risk') : undefined}
          compareStatusColor={mttrMttdB ? (mttrMttdB.firstTimeFixRate >= 90.0 ? 'emerald' : 'amber') : undefined}
          delta={mttrMttdB !== undefined ? `${(mttrMttd.firstTimeFixRate - mttrMttdB.firstTimeFixRate) > 0 ? '+' : ''}${(mttrMttd.firstTimeFixRate - mttrMttdB.firstTimeFixRate).toFixed(1)}%` : undefined}
          deltaPositive={mttrMttdB !== undefined && mttrMttd.firstTimeFixRate >= mttrMttdB.firstTimeFixRate}
        />

        {/* 7. Net Defect Intake Velocity */}
        <MetricCard
          title={t('kpiPlatform.qualityView.netIntakeCard', 'Net Defect Intake Velocity')}
          value={`${mttrMttd.netDefectIntakeVelocity > 0 ? `+${mttrMttd.netDefectIntakeVelocity}` : `${mttrMttd.netDefectIntakeVelocity}`} ${t('kpiPlatform.qualityView.bugsUnit', 'Bugs')}`}
          target={t('kpiPlatform.qualityView.targetNetIntake', '≤ 0 (Burning Down)')}
          trend={t('kpiPlatform.qualityView.backlogBurnout', 'Backlog Burnout')}
          trendPositive={mttrMttd.netDefectIntakeVelocity <= 5}
          statusBadge={mttrMttd.netDefectIntakeVelocity <= 0 ? t('kpiPlatform.statusControlled', 'Burndown') : t('kpiPlatform.statusElevated', 'Intake Growth')}
          statusColor={mttrMttd.netDefectIntakeVelocity <= 0 ? 'emerald' : 'amber'}
          icon={<Flame className="w-5 h-5 text-orange-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getNetDefectVelocityJustification(mttrMttd.netDefectIntakeVelocity))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={mttrMttdB ? `${mttrMttdB.netDefectIntakeVelocity > 0 ? `+${mttrMttdB.netDefectIntakeVelocity}` : `${mttrMttdB.netDefectIntakeVelocity}`} Bugs` : undefined}
          compareStatusBadge={mttrMttdB ? (mttrMttdB.netDefectIntakeVelocity <= 0 ? 'Burndown' : 'Growth') : undefined}
          compareStatusColor={mttrMttdB ? (mttrMttdB.netDefectIntakeVelocity <= 0 ? 'emerald' : 'amber') : undefined}
          delta={mttrMttdB !== undefined ? `${(mttrMttd.netDefectIntakeVelocity - mttrMttdB.netDefectIntakeVelocity) > 0 ? '+' : ''}${mttrMttd.netDefectIntakeVelocity - mttrMttdB.netDefectIntakeVelocity} Bugs` : undefined}
          deltaPositive={mttrMttdB !== undefined && mttrMttd.netDefectIntakeVelocity <= mttrMttdB.netDefectIntakeVelocity}
        />
      </div>

      {/* Items Pending Testing Aging Profile: Scope 1 on top of Scope 2 */}
      <div className="space-y-4">
        {/* Scope 1 Aging Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="space-y-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
            {isCompareMode && (
              <div 
                className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider cursor-help"
                title={scopeALabel}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                <span className="truncate">{scopeALabel}</span>
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div>
                  <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
                    {t('kpiPlatform.qualityView.agingProfileTitle')}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('kpiPlatform.qualityView.agingProfileSubtitle')}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedJustification(KPIJustificationService.getAgingProfileJustification(agingBuckets, 'all'))}
                  title="Explain Aging Profile Metric"
                  className="p-1 rounded-md text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                {t('kpiPlatform.qualityView.totalInQueue')}: {totalAgingItems} {t('kpiPlatform.qualityView.itemsCount')}
              </span>
            </div>
          </div>

          {/* Scope 1 Aging Buckets */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* < 7 Days */}
            <div 
              onClick={() => setSelectedJustification(KPIJustificationService.getAgingProfileJustification(agingBuckets, 'under7'))}
              className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 cursor-pointer hover:shadow-md transition-shadow group"
              title="Click for metric clarification"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 block font-mono">
                  {t('kpiPlatform.qualityView.under7Days')}
                </span>
                <HelpCircle className="w-3.5 h-3.5 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-700 dark:text-emerald-400">
                  {agingBuckets.pending7Days}
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {t('kpiPlatform.qualityView.freshHealthy')}
                </span>
              </div>
              <div className="w-full bg-emerald-200 dark:bg-emerald-900/60 h-1.5 rounded-full mt-2">
                <div 
                  className="bg-emerald-500 h-1.5 rounded-full" 
                  style={{ width: `${(agingBuckets.pending7Days / Math.max(1, totalAgingItems)) * 100}%` }}
                />
              </div>
            </div>

            {/* 7 - 14 Days */}
            <div 
              onClick={() => setSelectedJustification(KPIJustificationService.getAgingProfileJustification(agingBuckets, '7to14'))}
              className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/30 cursor-pointer hover:shadow-md transition-shadow group"
              title="Click for metric clarification"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-800 dark:text-cyan-300 block font-mono">
                  {t('kpiPlatform.qualityView.days7To14')}
                </span>
                <HelpCircle className="w-3.5 h-3.5 text-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-700 dark:text-cyan-400">
                  {agingBuckets.pending7To14Days}
                </span>
                <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                  {t('kpiPlatform.qualityView.normalCadence')}
                </span>
              </div>
              <div className="w-full bg-cyan-200 dark:bg-cyan-900/60 h-1.5 rounded-full mt-2">
                <div 
                  className="bg-cyan-500 h-1.5 rounded-full" 
                  style={{ width: `${(agingBuckets.pending7To14Days / Math.max(1, totalAgingItems)) * 100}%` }}
                />
              </div>
            </div>

            {/* 14 - 21 Days */}
            <div 
              onClick={() => setSelectedJustification(KPIJustificationService.getAgingProfileJustification(agingBuckets, '14to21'))}
              className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 cursor-pointer hover:shadow-md transition-shadow group"
              title="Click for metric clarification"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 block font-mono">
                  {t('kpiPlatform.qualityView.days14To21')}
                </span>
                <HelpCircle className="w-3.5 h-3.5 text-amber-500 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-black font-mono text-amber-700 dark:text-amber-400">
                  {agingBuckets.pending14To21Days}
                </span>
                <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                  {t('kpiPlatform.statusAtRisk')}
                </span>
              </div>
              <div className="w-full bg-amber-200 dark:bg-amber-900/60 h-1.5 rounded-full mt-2">
                <div 
                  className="bg-amber-500 h-1.5 rounded-full" 
                  style={{ width: `${(agingBuckets.pending14To21Days / Math.max(1, totalAgingItems)) * 100}%` }}
                />
              </div>
            </div>

            {/* 21+ Days */}
            <div 
              onClick={() => setSelectedJustification(KPIJustificationService.getAgingProfileJustification(agingBuckets, '21plus'))}
              className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 cursor-pointer hover:shadow-md transition-shadow group"
              title="Click for metric clarification"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-rose-800 dark:text-rose-300 block font-mono">
                  {t('kpiPlatform.qualityView.days21Plus')}
                </span>
                <HelpCircle className="w-3.5 h-3.5 text-rose-500 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-black font-mono text-rose-700 dark:text-rose-400">
                  {agingBuckets.pending21PlusDays}
                </span>
                <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">
                  {t('kpiPlatform.qualityView.criticalSlaBreach')}
                </span>
              </div>
              <div className="w-full bg-rose-200 dark:bg-rose-900/60 h-1.5 rounded-full mt-2">
                <div 
                  className="bg-rose-500 h-1.5 rounded-full" 
                  style={{ width: `${(agingBuckets.pending21PlusDays / Math.max(1, totalAgingItems)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scope 2 Aging Card Stacked Below Scope 1 */}
        {isCompareMode && agingBucketsB && (
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="space-y-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div 
                className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider cursor-help"
                title={scopeBLabel}
              >
                <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                <span className="truncate">{scopeBLabel}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
                    {t('kpiPlatform.qualityView.agingProfileTitle')}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('kpiPlatform.qualityView.agingProfileSubtitle')}
                  </p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                  {t('kpiPlatform.qualityView.totalInQueue')}: {totalAgingItemsB} {t('kpiPlatform.qualityView.itemsCount')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Scope 2: < 7 Days */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30">
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 block font-mono">
                  {t('kpiPlatform.qualityView.under7Days')}
                </span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-700 dark:text-emerald-400">
                    {agingBucketsB.pending7Days}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {t('kpiPlatform.qualityView.freshHealthy')}
                  </span>
                </div>
                <div className="w-full bg-emerald-200 dark:bg-emerald-900/60 h-1.5 rounded-full mt-2">
                  <div 
                    className="bg-emerald-500 h-1.5 rounded-full" 
                    style={{ width: `${(agingBucketsB.pending7Days / Math.max(1, totalAgingItemsB)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Scope 2: 7 - 14 Days */}
              <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/30">
                <span className="text-xs font-semibold text-cyan-800 dark:text-cyan-300 block font-mono">
                  {t('kpiPlatform.qualityView.days7To14')}
                </span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-700 dark:text-cyan-400">
                    {agingBucketsB.pending7To14Days}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    {t('kpiPlatform.qualityView.normalCadence')}
                  </span>
                </div>
                <div className="w-full bg-cyan-200 dark:bg-cyan-900/60 h-1.5 rounded-full mt-2">
                  <div 
                    className="bg-cyan-500 h-1.5 rounded-full" 
                    style={{ width: `${(agingBucketsB.pending7To14Days / Math.max(1, totalAgingItemsB)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Scope 2: 14 - 21 Days */}
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30">
                <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 block font-mono">
                  {t('kpiPlatform.qualityView.days14To21')}
                </span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-amber-700 dark:text-amber-400">
                    {agingBucketsB.pending14To21Days}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                    {t('kpiPlatform.statusAtRisk')}
                  </span>
                </div>
                <div className="w-full bg-amber-200 dark:bg-amber-900/60 h-1.5 rounded-full mt-2">
                  <div 
                    className="bg-amber-500 h-1.5 rounded-full" 
                    style={{ width: `${(agingBucketsB.pending14To21Days / Math.max(1, totalAgingItemsB)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Scope 2: 21+ Days */}
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30">
                <span className="text-xs font-semibold text-rose-800 dark:text-rose-300 block font-mono">
                  {t('kpiPlatform.qualityView.days21Plus')}
                </span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-rose-700 dark:text-rose-400">
                    {agingBucketsB.pending21PlusDays}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">
                    {t('kpiPlatform.qualityView.criticalSlaBreach')}
                  </span>
                </div>
                <div className="w-full bg-rose-200 dark:bg-rose-900/60 h-1.5 rounded-full mt-2">
                  <div 
                    className="bg-rose-500 h-1.5 rounded-full" 
                    style={{ width: `${(agingBucketsB.pending21PlusDays / Math.max(1, totalAgingItemsB)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Two Column Layout: Defect Trend Area Chart + Severity Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Curve: Defect Discovery vs Burnout */}
        <div className="lg:col-span-8 space-y-4">
          <AreaTrendChart
            data={defectTrends}
            title={t('kpiPlatform.qualityView.trendChartTitle')}
            scopeLabel={isCompareMode ? scopeALabel : undefined}
            scopeType="primary"
            series1Name={t('kpiPlatform.qualityView.discoveredDefects')}
            series2Name={t('kpiPlatform.qualityView.resolvedBurnedOut')}
            series1Color="#f43f5e" // Rose
            series2Color="#10b981" // Emerald
            height={240}
            forecastBadge={mttrMttd.netDefectIntakeVelocity <= 0 ? '● Burndown Active' : '▲ Net Intake Growth'}
            forecastStatus={mttrMttd.netDefectIntakeVelocity <= 0 ? 'emerald' : 'amber'}
            onJustify={() => setSelectedJustification(KPIJustificationService.getDefectTrendChartJustification(mttrMttd.netDefectIntakeVelocity))}
          />

          {isCompareMode && defectTrendsB && (
            <AreaTrendChart
              data={defectTrendsB}
              title={t('kpiPlatform.qualityView.trendChartTitle')}
              scopeLabel={scopeBLabel}
              scopeType="secondary"
              series1Name={t('kpiPlatform.qualityView.discoveredDefects')}
              series2Name={t('kpiPlatform.qualityView.resolvedBurnedOut')}
              series1Color="#f43f5e" // Rose (same color as primary)
              series2Color="#10b981" // Emerald (same color as primary)
              height={240}
              forecastBadge={mttrMttdB && mttrMttdB.netDefectIntakeVelocity <= 0 ? '● Burndown Active' : '▲ Net Intake Growth'}
              forecastStatus={mttrMttdB && mttrMttdB.netDefectIntakeVelocity <= 0 ? 'emerald' : 'amber'}
            />
          )}
        </div>

        {/* Severity Distribution: Scope 1 on top of Scope 2 */}
        <div className="lg:col-span-4 space-y-4">
          {/* Scope 1 Severity Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="space-y-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
              {isCompareMode && (
                <div 
                  className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider cursor-help"
                  title={scopeALabel}
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                  <span className="truncate">{scopeALabel}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white">
                    {t('kpiPlatform.qualityView.severityTitle')}
                  </h4>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shadow-2xs ${
                    severityCounts.blockerP1 === 0 && severityCounts.criticalP2 <= 5
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800'
                      : severityCounts.blockerP1 === 0
                      ? 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800'
                      : 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800'
                  }`}>
                    {severityCounts.blockerP1 === 0 
                      ? (severityCounts.criticalP2 <= 5 ? t('kpiPlatform.statusOptimal', 'Controlled') : t('kpiPlatform.statusWarning', 'P2 Watch'))
                      : `${severityCounts.blockerP1} ${t('kpiPlatform.qualityView.blockersActive', 'Blockers')}`}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedJustification(KPIJustificationService.getDefectSeverityJustification(severityCounts))}
                  title="Explain Defect Severity Breakdown"
                  className="p-1 rounded-md text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:bg-slate-800 transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: t('kpiPlatform.qualityView.p1Blocker'), count: severityCounts.blockerP1, color: 'bg-rose-600', text: 'text-rose-600 dark:text-rose-400' },
                { label: t('kpiPlatform.qualityView.p2Critical'), count: severityCounts.criticalP2, color: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
                { label: t('kpiPlatform.qualityView.p3Major'), count: severityCounts.majorP3, color: 'bg-cyan-500', text: 'text-cyan-600 dark:text-cyan-400' },
                { label: t('kpiPlatform.qualityView.p4Minor'), count: severityCounts.minorP4, color: 'bg-slate-400', text: 'text-slate-600 dark:text-slate-400' }
              ].map(sev => {
                const total = severityCounts.blockerP1 + severityCounts.criticalP2 + severityCounts.majorP3 + severityCounts.minorP4;
                const pct = total > 0 ? ((sev.count / total) * 100).toFixed(0) : '0';
                return (
                  <div key={sev.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{sev.label}</span>
                      <span className={`font-bold ${sev.text}`}>{sev.count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className={`${sev.color} h-full rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scope 2 Severity Card Stacked Below Scope 1 */}
          {isCompareMode && severityCountsB && (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="space-y-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div 
                  className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider cursor-help"
                  title={scopeBLabel}
                >
                  <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                  <span className="truncate">{scopeBLabel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white">
                      {t('kpiPlatform.qualityView.severityTitle')}
                    </h4>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shadow-2xs ${
                      severityCountsB.blockerP1 === 0 && severityCountsB.criticalP2 <= 5
                        ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800'
                        : severityCountsB.blockerP1 === 0
                        ? 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800'
                        : 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800'
                    }`}>
                      {severityCountsB.blockerP1 === 0 
                        ? (severityCountsB.criticalP2 <= 5 ? t('kpiPlatform.statusOptimal', 'Controlled') : t('kpiPlatform.statusWarning', 'P2 Watch'))
                        : `${severityCountsB.blockerP1} ${t('kpiPlatform.qualityView.blockersActive', 'Blockers')}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: t('kpiPlatform.qualityView.p1Blocker'), count: severityCountsB.blockerP1, color: 'bg-rose-600', text: 'text-rose-600 dark:text-rose-400' },
                  { label: t('kpiPlatform.qualityView.p2Critical'), count: severityCountsB.criticalP2, color: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
                  { label: t('kpiPlatform.qualityView.p3Major'), count: severityCountsB.majorP3, color: 'bg-cyan-500', text: 'text-cyan-600 dark:text-cyan-400' },
                  { label: t('kpiPlatform.qualityView.p4Minor'), count: severityCountsB.minorP4, color: 'bg-slate-400', text: 'text-slate-600 dark:text-slate-400' }
                ].map(sev => {
                  const total = severityCountsB.blockerP1 + severityCountsB.criticalP2 + severityCountsB.majorP3 + severityCountsB.minorP4;
                  const pct = total > 0 ? ((sev.count / total) * 100).toFixed(0) : '0';
                  return (
                    <div key={sev.label} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{sev.label}</span>
                        <span className={`font-bold ${sev.text}`}>{sev.count} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className={`${sev.color} h-full rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Gating / Blocking Defects Table: Scope 1 */}
      {gatingDefectsList.length > 0 && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 shadow-sm space-y-3">
          <div className="space-y-1.5 pb-2 border-b border-rose-100 dark:border-rose-900/40">
            {isCompareMode && (
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider cursor-help" title={scopeALabel}>
                <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                <span className="truncate">{scopeALabel}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold text-sm font-['Outfit']">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{t('kpiPlatform.qualityView.gatingDefectsTitle')} ({gatingDefectsList.length} {t('kpiPlatform.qualityView.requireSignoff')})</span>
                <button
                  type="button"
                  onClick={() => setSelectedJustification(KPIJustificationService.getGatingDefectsTableJustification(gatingDefectsList))}
                  className="p-1 rounded-full text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Click for Gating Defects policy and sign-off justification"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-2.5 rounded-l-lg">{t('kpiPlatform.qualityView.tableKey')}</th>
                  <th className="p-2.5">{t('kpiPlatform.qualityView.tableTitle')}</th>
                  <th className="p-2.5">{t('kpiPlatform.qualityView.tableSeverity')}</th>
                  <th className="p-2.5">{t('kpiPlatform.qualityView.tableProduct')}</th>
                  <th className="p-2.5">{t('kpiPlatform.qualityView.tableComponent')}</th>
                  <th className="p-2.5">{t('kpiPlatform.qualityView.tableQaOwner')}</th>
                  <th className="p-2.5 rounded-r-lg">{t('kpiPlatform.qualityView.tableStatus')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {gatingDefectsList.slice(0, 5).map(bug => (
                  <tr key={bug.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-2.5 font-mono font-bold text-cyan-600 dark:text-cyan-400">{bug.id}</td>
                    <td className="p-2.5 text-slate-900 dark:text-white truncate max-w-xs">{bug.title}</td>
                    <td className="p-2.5 font-mono">
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border shadow-2xs ${
                        bug.severity === 'P1-Blocker'
                          ? 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800/40'
                          : bug.severity === 'P2-Critical'
                          ? 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800/40'
                          : bug.severity === 'P3-Major'
                          ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800/40'
                          : 'text-slate-700 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                      }`}>
                        {bug.severity}
                      </span>
                    </td>
                    <td className="p-2.5 text-slate-600 dark:text-slate-300">{bug.product}</td>
                    <td className="p-2.5 text-slate-600 dark:text-slate-300">{bug.component}</td>
                    <td className="p-2.5 text-slate-700 dark:text-slate-300 font-mono">{bug.qaOwner}</td>
                    <td className="p-2.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border shadow-2xs ${
                        bug.status === 'Done'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                          : bug.status === 'Under QA'
                          ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800'
                          : bug.status === 'In Development'
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                          : bug.status === 'Reopened'
                          ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                          : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                      }`}>
                        {bug.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Gating / Blocking Defects Table: Scope 2 Stacked Below */}
      {isCompareMode && gatingDefectsListB.length > 0 && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 shadow-sm space-y-3">
          <div className="space-y-1.5 pb-2 border-b border-rose-100 dark:border-rose-900/40">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider cursor-help" title={scopeBLabel}>
              <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
              <span className="truncate">{scopeBLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold text-sm font-['Outfit']">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{t('kpiPlatform.qualityView.gatingDefectsTitle')} ({gatingDefectsListB.length} {t('kpiPlatform.qualityView.requireSignoff')})</span>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-2.5 rounded-l-lg">{t('kpiPlatform.qualityView.tableKey')}</th>
                  <th className="p-2.5">{t('kpiPlatform.qualityView.tableTitle')}</th>
                  <th className="p-2.5">{t('kpiPlatform.qualityView.tableSeverity')}</th>
                  <th className="p-2.5">{t('kpiPlatform.qualityView.tableProduct')}</th>
                  <th className="p-2.5">{t('kpiPlatform.qualityView.tableComponent')}</th>
                  <th className="p-2.5">{t('kpiPlatform.qualityView.tableQaOwner')}</th>
                  <th className="p-2.5 rounded-r-lg">{t('kpiPlatform.qualityView.tableStatus')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {gatingDefectsListB.slice(0, 5).map(bug => (
                  <tr key={bug.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-2.5 font-mono font-bold text-cyan-600 dark:text-cyan-400">{bug.id}</td>
                    <td className="p-2.5 text-slate-900 dark:text-white truncate max-w-xs">{bug.title}</td>
                    <td className="p-2.5 font-mono">
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border shadow-2xs ${
                        bug.severity === 'P1-Blocker'
                          ? 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800/40'
                          : bug.severity === 'P2-Critical'
                          ? 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800/40'
                          : bug.severity === 'P3-Major'
                          ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800/40'
                          : 'text-slate-700 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                      }`}>
                        {bug.severity}
                      </span>
                    </td>
                    <td className="p-2.5 text-slate-600 dark:text-slate-300">{bug.product}</td>
                    <td className="p-2.5 text-slate-600 dark:text-slate-300">{bug.component}</td>
                    <td className="p-2.5 text-slate-700 dark:text-slate-300 font-mono">{bug.qaOwner}</td>
                    <td className="p-2.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border shadow-2xs ${
                        bug.status === 'Done'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                          : bug.status === 'Under QA'
                          ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800'
                          : bug.status === 'In Development'
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                          : bug.status === 'Reopened'
                          ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                          : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                      }`}>
                        {bug.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* KPI Decision & Audit Justification Modal */}
      <MetricJustificationModal
        isOpen={Boolean(selectedJustification)}
        justification={selectedJustification}
        onClose={() => setSelectedJustification(null)}
      />
    </div>
  );
};
