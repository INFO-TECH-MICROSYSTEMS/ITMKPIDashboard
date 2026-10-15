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

interface ProductivityViewProps {
  productivityMetrics: PersonProductivityMetric[];
  squadSummary?: SquadProductivitySummary;
  jiraItems: JiraWorkItem[];
}

export const ProductivityView: React.FC<ProductivityViewProps> = ({
  productivityMetrics,
  squadSummary,
  jiraItems
}) => {
  const { t } = useTranslation();
  const [selectedJustification, setSelectedJustification] = useState<KPIJustification | null>(null);

  const overCommittedCount = productivityMetrics.filter(p => p.isOverCommitted).length;
  const avgCompletionRate = productivityMetrics.length > 0 
    ? (productivityMetrics.reduce((sum, p) => sum + p.completionRate, 0) / productivityMetrics.length).toFixed(1)
    : '0';

  const sprintCompletedItems = jiraItems.filter(i => i.status === 'Done');
  const sprintCompletionPercent = jiraItems.length > 0 
    ? ((sprintCompletedItems.length / jiraItems.length) * 100).toFixed(1) 
    : '0';

  return (
    <div className="space-y-6">
      {/* Top Productivity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title={t('kpiPlatform.productivityView.qaCompletionRate', 'Avg QA Test Completion Rate')}
          value={`${avgCompletionRate}%`}
          target="> 85.0%"
          trend={`+4.1% ${t('kpiPlatform.productivityView.sprintVelocityTrend', 'sprint velocity')}`}
          trendPositive={parseFloat(avgCompletionRate) >= 85.0}
          statusBadge={parseFloat(avgCompletionRate) >= 85.0 ? t('kpiPlatform.statusOnTarget', 'On Target') : parseFloat(avgCompletionRate) >= 70.0 ? t('kpiPlatform.statusAcceptable', 'Acceptable') : t('kpiPlatform.statusBehindSchedule', 'Behind Schedule')}
          statusColor={parseFloat(avgCompletionRate) >= 85.0 ? 'emerald' : parseFloat(avgCompletionRate) >= 70.0 ? 'amber' : 'rose'}
          icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getAvgQaCompletionRateJustification(avgCompletionRate))}
        />
        <MetricCard
          title={t('kpiPlatform.productivityView.overCommittedEngineers', 'Over-Committed Engineers')}
          value={overCommittedCount}
          target={t('kpiPlatform.productivityView.zeroBurnoutRisk', '0 Burnout Risk')}
          trendPositive={overCommittedCount === 0}
          statusBadge={overCommittedCount === 0 ? t('kpiPlatform.statusBalanced', 'Balanced') : overCommittedCount <= 2 ? t('kpiPlatform.statusRebalanceNeeded', 'Rebalance Needed') : t('kpiPlatform.statusBurnoutRisk', 'Burnout Risk')}
          statusColor={overCommittedCount === 0 ? 'emerald' : overCommittedCount <= 2 ? 'amber' : 'rose'}
          icon={<AlertCircle className="w-5 h-5 text-amber-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getOverCommittedJustification(overCommittedCount))}
        />
        <MetricCard
          title={t('kpiPlatform.productivityView.storyCompletionRate', 'Sprint Story Completion Rate')}
          value={`${sprintCompletionPercent}%`}
          target="> 80.0%"
          trendPositive={parseFloat(sprintCompletionPercent) >= 80.0}
          statusBadge={parseFloat(sprintCompletionPercent) >= 80.0 ? t('kpiPlatform.statusThroughputMet', 'Throughput Met') : parseFloat(sprintCompletionPercent) >= 65.0 ? t('kpiPlatform.statusAtRisk', 'At Risk') : t('kpiPlatform.statusSlipping', 'Slipping')}
          statusColor={parseFloat(sprintCompletionPercent) >= 80.0 ? 'emerald' : parseFloat(sprintCompletionPercent) >= 65.0 ? 'amber' : 'rose'}
          icon={<CheckCircle2 className="w-5 h-5 text-cyan-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getStoryCompletionRateJustification(parseFloat(sprintCompletionPercent), sprintCompletedItems.length, jiraItems.length))}
        />
        <MetricCard
          title={t('kpiPlatform.productivityView.activeQaSpecialists', 'Active QA Specialists')}
          value={productivityMetrics.length}
          target={t('kpiPlatform.productivityView.dedicatedSquad', 'Dedicated Squad')}
          statusBadge={productivityMetrics.length >= 4 ? t('kpiPlatform.statusOptimalStaffing', 'Optimal Staffing') : t('kpiPlatform.statusUnderstaffed', 'Understaffed')}
          statusColor={productivityMetrics.length >= 4 ? 'emerald' : 'amber'}
          icon={<Users className="w-5 h-5 text-purple-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getActiveQaSpecialistsJustification(productivityMetrics.length))}
        />
        {/* Enriched Productivity Metric 1: Flow Efficiency */}
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
        />
        {/* Enriched Productivity Metric 2: Sprint Carry-Over Spillover Rate */}
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
        />
        {/* Enriched Productivity Metric 3: Dev to QA Ratio */}
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
                {t('kpiPlatform.productivityView.ledgerSubtitle')}
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
            {t('kpiPlatform.productivityView.capacityLimit')}
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

      {/* KPI Decision & Audit Justification Modal */}
      <MetricJustificationModal
        isOpen={Boolean(selectedJustification)}
        justification={selectedJustification}
        onClose={() => setSelectedJustification(null)}
      />
    </div>
  );
};
