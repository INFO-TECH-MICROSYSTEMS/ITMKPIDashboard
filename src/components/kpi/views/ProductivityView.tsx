/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * KPI View: Planning, Velocity & Throughput
 * Individual & squad capacity modeling, test assignments/completion,
 * over-committed engineer alerts, and regression cycle time.
 * Supports side-by-side metric comparison across scopes.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, TrendingUp, AlertCircle, CheckCircle2, HelpCircle 
} from 'lucide-react';
import type { 
  PersonProductivityMetric, 
  SquadProductivitySummary,
  JiraWorkItem,
  KPIJustification 
} from '../../../types/kpiPlatform';
import { MetricCard } from '../VisualWidgets';
import { MetricJustificationModal } from '../MetricJustificationModal';
import { KPIJustificationService } from '../../../services/kpiJustificationService';
import type { ViewComparisonProps } from '../contracts/ViewComparisonContract';

interface ProductivityViewProps extends ViewComparisonProps {
  productivityMetrics: PersonProductivityMetric[];
  squadSummary?: SquadProductivitySummary;
  jiraItems: JiraWorkItem[];
  jiraItemsB?: JiraWorkItem[];
}

export const ProductivityView: React.FC<ProductivityViewProps> = ({
  productivityMetrics,
  squadSummary,
  jiraItems,
  jiraItemsB = [],
  isCompareMode = false,
  scopeALabel = 'Scope A',
  scopeBLabel = 'Scope B',
  metricsB
}) => {
  const { t } = useTranslation();
  const [selectedJustification, setSelectedJustification] = useState<KPIJustification | null>(null);

  const productivityMetricsB = metricsB?.productivityMetrics || [];
  const squadSummaryB = metricsB?.squadSummary;

  // Scope A
  const overCommittedCountA = productivityMetrics.filter(p => p.isOverCommitted).length;
  const avgCompletionRateA = productivityMetrics.length > 0 
    ? (productivityMetrics.reduce((sum, p) => sum + p.completionRate, 0) / productivityMetrics.length).toFixed(1)
    : '0';

  const sprintCompletedItemsA = jiraItems.filter(i => i.status === 'Done');
  const sprintCompletionPercentA = jiraItems.length > 0 
    ? ((sprintCompletedItemsA.length / jiraItems.length) * 100).toFixed(1) 
    : '0';

  // Scope B (when comparing)
  const overCommittedCountB = productivityMetricsB.filter(p => p.isOverCommitted).length;
  const avgCompletionRateB = productivityMetricsB.length > 0 
    ? (productivityMetricsB.reduce((sum, p) => sum + p.completionRate, 0) / productivityMetricsB.length).toFixed(1)
    : '0';

  const sprintCompletedItemsB = jiraItemsB.filter(i => i.status === 'Done');
  const sprintCompletionPercentB = jiraItemsB.length > 0 
    ? ((sprintCompletedItemsB.length / jiraItemsB.length) * 100).toFixed(1) 
    : '0';

  return (
    <div className="space-y-6">
      {/* Top Productivity Cards with Side-by-Side Scope Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Avg QA Test Completion Rate */}
        <MetricCard
          title={t('kpiPlatform.productivityView.qaCompletionRate', 'Avg QA Test Completion Rate')}
          value={`${avgCompletionRateA}%`}
          target="> 85.0%"
          trend={`+4.1% ${t('kpiPlatform.productivityView.sprintVelocityTrend', 'sprint velocity')}`}
          trendPositive={parseFloat(avgCompletionRateA) >= 85.0}
          statusBadge={parseFloat(avgCompletionRateA) >= 85.0 ? t('kpiPlatform.statusOnTarget', 'On Target') : parseFloat(avgCompletionRateA) >= 70.0 ? t('kpiPlatform.statusAcceptable', 'Acceptable') : t('kpiPlatform.statusBehindSchedule', 'Behind Schedule')}
          statusColor={parseFloat(avgCompletionRateA) >= 85.0 ? 'emerald' : parseFloat(avgCompletionRateA) >= 70.0 ? 'amber' : 'rose'}
          icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getAvgQaCompletionRateJustification(avgCompletionRateA))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={isCompareMode ? `${avgCompletionRateB}%` : undefined}
          compareStatusBadge={isCompareMode ? (parseFloat(avgCompletionRateB) >= 85.0 ? 'On Target' : 'Behind') : undefined}
          compareStatusColor={isCompareMode ? (parseFloat(avgCompletionRateB) >= 85.0 ? 'emerald' : 'amber') : undefined}
          delta={isCompareMode ? `${(parseFloat(avgCompletionRateA) - parseFloat(avgCompletionRateB)) > 0 ? '+' : ''}${(parseFloat(avgCompletionRateA) - parseFloat(avgCompletionRateB)).toFixed(1)}%` : undefined}
          deltaPositive={parseFloat(avgCompletionRateA) >= parseFloat(avgCompletionRateB)}
        />

        {/* 2. Over-Committed Engineers */}
        <MetricCard
          title={t('kpiPlatform.productivityView.overCommittedEngineers', 'Over-Committed Engineers')}
          value={overCommittedCountA}
          target={t('kpiPlatform.productivityView.zeroBurnoutRisk', '0 Burnout Risk')}
          trendPositive={overCommittedCountA === 0}
          statusBadge={overCommittedCountA === 0 ? t('kpiPlatform.statusBalanced', 'Balanced') : overCommittedCountA <= 2 ? t('kpiPlatform.statusRebalanceNeeded', 'Rebalance Needed') : t('kpiPlatform.statusBurnoutRisk', 'Burnout Risk')}
          statusColor={overCommittedCountA === 0 ? 'emerald' : overCommittedCountA <= 2 ? 'amber' : 'rose'}
          icon={<AlertCircle className="w-5 h-5 text-amber-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getOverCommittedJustification(overCommittedCountA))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={isCompareMode ? overCommittedCountB : undefined}
          compareStatusBadge={isCompareMode ? (overCommittedCountB === 0 ? 'Balanced' : 'Burnout Risk') : undefined}
          compareStatusColor={isCompareMode ? (overCommittedCountB === 0 ? 'emerald' : 'rose') : undefined}
          delta={isCompareMode ? `${overCommittedCountA - overCommittedCountB > 0 ? '+' : ''}${overCommittedCountA - overCommittedCountB}` : undefined}
          deltaPositive={overCommittedCountA <= overCommittedCountB}
        />

        {/* 3. Sprint Story Completion Rate */}
        <MetricCard
          title={t('kpiPlatform.productivityView.storyCompletionRate', 'Sprint Story Completion Rate')}
          value={`${sprintCompletionPercentA}%`}
          target="> 80.0%"
          trendPositive={parseFloat(sprintCompletionPercentA) >= 80.0}
          statusBadge={parseFloat(sprintCompletionPercentA) >= 80.0 ? t('kpiPlatform.statusThroughputMet', 'Throughput Met') : parseFloat(sprintCompletionPercentA) >= 65.0 ? t('kpiPlatform.statusAtRisk', 'At Risk') : t('kpiPlatform.statusSlipping', 'Slipping')}
          statusColor={parseFloat(sprintCompletionPercentA) >= 80.0 ? 'emerald' : parseFloat(sprintCompletionPercentA) >= 65.0 ? 'amber' : 'rose'}
          icon={<CheckCircle2 className="w-5 h-5 text-cyan-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getStoryCompletionRateJustification(parseFloat(sprintCompletionPercentA), sprintCompletedItemsA.length, jiraItems.length))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={isCompareMode ? `${sprintCompletionPercentB}%` : undefined}
          compareStatusBadge={isCompareMode ? (parseFloat(sprintCompletionPercentB) >= 80.0 ? 'Throughput Met' : 'Slipping') : undefined}
          compareStatusColor={isCompareMode ? (parseFloat(sprintCompletionPercentB) >= 80.0 ? 'emerald' : 'amber') : undefined}
          delta={isCompareMode ? `${(parseFloat(sprintCompletionPercentA) - parseFloat(sprintCompletionPercentB)) > 0 ? '+' : ''}${(parseFloat(sprintCompletionPercentA) - parseFloat(sprintCompletionPercentB)).toFixed(1)}%` : undefined}
          deltaPositive={parseFloat(sprintCompletionPercentA) >= parseFloat(sprintCompletionPercentB)}
        />

        {/* 4. Active QA Specialists */}
        <MetricCard
          title={t('kpiPlatform.productivityView.activeQaSpecialists', 'Active QA Specialists')}
          value={productivityMetrics.length}
          target={t('kpiPlatform.productivityView.dedicatedSquad', 'Dedicated Squad')}
          statusBadge={productivityMetrics.length >= 4 ? t('kpiPlatform.statusOptimalStaffing', 'Optimal Staffing') : t('kpiPlatform.statusUnderstaffed', 'Understaffed')}
          statusColor={productivityMetrics.length >= 4 ? 'emerald' : 'amber'}
          icon={<Users className="w-5 h-5 text-purple-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getActiveQaSpecialistsJustification(productivityMetrics.length))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={isCompareMode ? productivityMetricsB.length : undefined}
          compareStatusBadge={isCompareMode ? (productivityMetricsB.length >= 4 ? 'Optimal' : 'Understaffed') : undefined}
          compareStatusColor={isCompareMode ? (productivityMetricsB.length >= 4 ? 'emerald' : 'amber') : undefined}
          delta={isCompareMode ? `${productivityMetrics.length - productivityMetricsB.length > 0 ? '+' : ''}${productivityMetrics.length - productivityMetricsB.length} SDETs` : undefined}
          deltaPositive={productivityMetrics.length >= productivityMetricsB.length}
        />

        {/* 5. Flow Efficiency */}
        <MetricCard
          title={t('kpiPlatform.productivityView.flowEfficiencyCard', 'Flow Efficiency (Active vs Idle)')}
          value={`${squadSummary?.flowEfficiencyPercent ?? 0}%`}
          target={t('kpiPlatform.productivityView.targetFlowEfficiency', '> 65.0%')}
          trend={t('kpiPlatform.productivityView.minimalIdle', 'Minimal Idle Staging')}
          trendPositive={(squadSummary?.flowEfficiencyPercent ?? 0) >= 65.0}
          statusBadge={(squadSummary?.flowEfficiencyPercent ?? 0) >= 65.0 ? t('kpiPlatform.statusOptimal', 'High Flow') : t('kpiPlatform.statusDelayed', 'Handoff Delays')}
          statusColor={(squadSummary?.flowEfficiencyPercent ?? 0) >= 65.0 ? 'emerald' : 'amber'}
          icon={<TrendingUp className="w-5 h-5 text-teal-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getFlowEfficiencyJustification(squadSummary?.flowEfficiencyPercent ?? 0))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={squadSummaryB ? `${squadSummaryB.flowEfficiencyPercent}%` : undefined}
          compareStatusBadge={squadSummaryB ? (squadSummaryB.flowEfficiencyPercent >= 65.0 ? 'High Flow' : 'Delays') : undefined}
          compareStatusColor={squadSummaryB ? (squadSummaryB.flowEfficiencyPercent >= 65.0 ? 'emerald' : 'amber') : undefined}
          delta={squadSummaryB !== undefined ? `${((squadSummary?.flowEfficiencyPercent ?? 0) - squadSummaryB.flowEfficiencyPercent) > 0 ? '+' : ''}${((squadSummary?.flowEfficiencyPercent ?? 0) - squadSummaryB.flowEfficiencyPercent).toFixed(1)}%` : undefined}
          deltaPositive={(squadSummary?.flowEfficiencyPercent ?? 0) >= (squadSummaryB?.flowEfficiencyPercent ?? 0)}
        />

        {/* 6. Sprint Carry-Over Spillover Rate */}
        <MetricCard
          title={t('kpiPlatform.productivityView.spilloverRateCard', 'Sprint Spillover Rate')}
          value={`${squadSummary?.sprintSpilloverRate ?? 0}%`}
          target={t('kpiPlatform.productivityView.targetSpillover', '< 10.0%')}
          trend={t('kpiPlatform.productivityView.committedDelivered', 'Scope Committed Delivered')}
          trendPositive={(squadSummary?.sprintSpilloverRate ?? 0) < 10.0}
          statusBadge={(squadSummary?.sprintSpilloverRate ?? 0) < 10.0 ? t('kpiPlatform.statusControlled', 'Controlled') : t('kpiPlatform.statusElevated', 'High Spillover')}
          statusColor={(squadSummary?.sprintSpilloverRate ?? 0) < 10.0 ? 'emerald' : 'amber'}
          icon={<AlertCircle className="w-5 h-5 text-orange-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getSprintSpilloverJustification(squadSummary?.sprintSpilloverRate ?? 0))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={squadSummaryB ? `${squadSummaryB.sprintSpilloverRate}%` : undefined}
          compareStatusBadge={squadSummaryB ? (squadSummaryB.sprintSpilloverRate < 10.0 ? 'Controlled' : 'Elevated') : undefined}
          compareStatusColor={squadSummaryB ? (squadSummaryB.sprintSpilloverRate < 10.0 ? 'emerald' : 'amber') : undefined}
          delta={squadSummaryB !== undefined ? `${((squadSummary?.sprintSpilloverRate ?? 0) - squadSummaryB.sprintSpilloverRate) > 0 ? '+' : ''}${((squadSummary?.sprintSpilloverRate ?? 0) - squadSummaryB.sprintSpilloverRate).toFixed(1)}%` : undefined}
          deltaPositive={(squadSummary?.sprintSpilloverRate ?? 0) <= (squadSummaryB?.sprintSpilloverRate ?? 0)}
        />

        {/* 7. Dev to QA Ratio */}
        <MetricCard
          title={t('kpiPlatform.productivityView.devToQaRatioCard', 'Dev-to-QA Ratio')}
          value={squadSummary?.devToQaRatio ?? '1:1'}
          target={t('kpiPlatform.productivityView.targetDevToQa', 'Benchmark: 1:3 to 1:5')}
          trend={t('kpiPlatform.productivityView.balancedSquads', 'Balanced Squads')}
          trendPositive={true}
          statusBadge={t('kpiPlatform.statusBalanced', 'Balanced Pod')}
          statusColor="emerald"
          icon={<Users className="w-5 h-5 text-blue-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getDevToQaRatioJustification(squadSummary?.devToQaRatio ?? '1:1'))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={squadSummaryB?.devToQaRatio}
          compareStatusBadge="Balanced Pod"
          compareStatusColor="emerald"
        />
      </div>

      {/* Engineer Assignments & Completion Ratios Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div>
              <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
                {t('kpiPlatform.productivityView.ledgerTitle')}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isCompareMode ? `Specialist throughput for ${scopeALabel}` : t('kpiPlatform.productivityView.ledgerSubtitle')}
              </p>
            </div>
            <button
              onClick={() => setSelectedJustification(KPIJustificationService.getQaThroughputLedgerJustification(productivityMetrics))}
              title="Explain QA Engineer Assignment & Throughput Metrics"
              className="p-1 rounded-md text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
            {scopeALabel}: {t('kpiPlatform.productivityView.capacityLimit')}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3 rounded-l-lg">{t('kpiPlatform.productivityView.tableEngineer')}</th>
                <th className="p-3">{t('kpiPlatform.productivityView.tableAssigned')}</th>
                <th className="p-3">{t('kpiPlatform.productivityView.tableCompleted')}</th>
                <th className="p-3">{t('kpiPlatform.productivityView.tableRate')}</th>
                <th className="p-3">{t('kpiPlatform.productivityView.tableDelayed')}</th>
                <th className="p-3">{t('kpiPlatform.productivityView.tableAvgHours')}</th>
                <th className="p-3 rounded-r-lg">{t('kpiPlatform.productivityView.tableWorkload')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {productivityMetrics.map(eng => (
                <tr key={eng.personName} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3 text-slate-900 dark:text-white font-semibold flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-[10px]">
                      {eng.personName.charAt(0)}
                    </div>
                    <span>{eng.personName}</span>
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                    {eng.assignedTests}
                  </td>
                  <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    {eng.completedTests}
                  </td>
                  <td className="p-3 font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full" 
                          style={{ width: `${Math.min(100, eng.completionRate)}%` }} 
                        />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">{eng.completionRate}%</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono">
                    <span className={eng.delayedExecutions > 5 ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-500'}>
                      {eng.delayedExecutions}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-600 dark:text-slate-400">
                    {eng.avgHoursPerTest} {t('kpiPlatform.hrsUnit', 'hrs')}
                  </td>
                  <td className="p-3">
                    {eng.isOverCommitted ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30">
                        {t('kpiPlatform.overCommitted', 'Over-Committed')}
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                        {t('kpiPlatform.statusBalancedLoad', 'Balanced Load')}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scope B Throughput Ledger (when in compare mode) */}
      {isCompareMode && productivityMetricsB.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/50 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h4 className="text-base font-bold font-['Outfit'] text-purple-700 dark:text-purple-300">
              {scopeBLabel} Specialist Throughput & Load
            </h4>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-bold border border-purple-200">
              {scopeBLabel} Squad ({productivityMetricsB.length} SDETs)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-purple-50/50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3 rounded-l-lg">{t('kpiPlatform.productivityView.tableEngineer')}</th>
                  <th className="p-3">{t('kpiPlatform.productivityView.tableAssigned')}</th>
                  <th className="p-3">{t('kpiPlatform.productivityView.tableCompleted')}</th>
                  <th className="p-3">{t('kpiPlatform.productivityView.tableRate')}</th>
                  <th className="p-3">{t('kpiPlatform.productivityView.tableDelayed')}</th>
                  <th className="p-3 rounded-r-lg">{t('kpiPlatform.productivityView.tableWorkload')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100 dark:divide-slate-800 font-medium">
                {productivityMetricsB.map(eng => (
                  <tr key={eng.personName} className="hover:bg-purple-50/30 dark:hover:bg-slate-800/40">
                    <td className="p-3 text-slate-900 dark:text-white font-semibold flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-[10px]">
                        {eng.personName.charAt(0)}
                      </div>
                      <span>{eng.personName}</span>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{eng.assignedTests}</td>
                    <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">{eng.completedTests}</td>
                    <td className="p-3 font-mono">{eng.completionRate}%</td>
                    <td className="p-3 font-mono">{eng.delayedExecutions}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${eng.isOverCommitted ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {eng.isOverCommitted ? 'Over-Committed' : 'Balanced Load'}
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
