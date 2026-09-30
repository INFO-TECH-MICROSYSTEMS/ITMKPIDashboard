/**
 * KPI View: Planning, Velocity & Throughput
 * Individual & squad capacity modeling, test assignments/completion,
 * over-committed engineer alerts, and regression cycle time.
 */

import React, { useState } from 'react';
import { 
  Users, TrendingUp, AlertCircle, CheckCircle2 
} from 'lucide-react';
import type { 
  PersonProductivityMetric, 
  JiraWorkItem,
  KPIJustification 
} from '../../../types/kpiPlatform';
import { MetricCard } from '../VisualWidgets';
import { MetricJustificationModal } from '../MetricJustificationModal';
import { KPIJustificationService } from '../../../services/kpiJustificationService';

interface ProductivityViewProps {
  productivityMetrics: PersonProductivityMetric[];
  jiraItems: JiraWorkItem[];
}

export const ProductivityView: React.FC<ProductivityViewProps> = ({
  productivityMetrics,
  jiraItems
}) => {
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
          title="Avg QA Test Completion Rate"
          value={`${avgCompletionRate}%`}
          target="> 85.0%"
          trend="+4.1% sprint velocity"
          trendPositive={parseFloat(avgCompletionRate) >= 85.0}
          statusBadge={parseFloat(avgCompletionRate) >= 85.0 ? 'On Target' : parseFloat(avgCompletionRate) >= 70.0 ? 'Acceptable' : 'Behind Schedule'}
          statusColor={parseFloat(avgCompletionRate) >= 85.0 ? 'emerald' : parseFloat(avgCompletionRate) >= 70.0 ? 'amber' : 'rose'}
          icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
          onJustify={() => setSelectedJustification({
            title: 'Average QA Test Completion Rate',
            statusBadge: parseFloat(avgCompletionRate) >= 85.0 ? 'On Target' : 'Behind Schedule',
            statusColor: parseFloat(avgCompletionRate) >= 85.0 ? 'emerald' : 'amber',
            currentValue: `${avgCompletionRate}%`,
            targetValue: '> 85.0%',
            formulaOrRule: `AvgCompletionRate = AVERAGE(CompletedExecutions / AssignedExecutions across all QA team members) × 100`,
            rationale: `Squad members have completed an average of ${avgCompletionRate}% of their assigned test cases. Rates above 85% ensure verification finishes before sprint close.`,
            recommendedAction: 'Reassign delayed test executions from overloaded engineers to squad members with spare capacity.'
          })}
        />
        <MetricCard
          title="Over-Committed Engineers"
          value={overCommittedCount}
          target="0 Burnout Risk"
          trendPositive={overCommittedCount === 0}
          statusBadge={overCommittedCount === 0 ? 'Balanced' : overCommittedCount <= 2 ? 'Rebalance Needed' : 'Burnout Risk'}
          statusColor={overCommittedCount === 0 ? 'emerald' : overCommittedCount <= 2 ? 'amber' : 'rose'}
          icon={<AlertCircle className="w-5 h-5 text-amber-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getOverCommittedJustification(overCommittedCount))}
        />
        <MetricCard
          title="Sprint Story Completion Rate"
          value={`${sprintCompletionPercent}%`}
          target="> 80.0%"
          trendPositive={parseFloat(sprintCompletionPercent) >= 80.0}
          statusBadge={parseFloat(sprintCompletionPercent) >= 80.0 ? 'Throughput Met' : parseFloat(sprintCompletionPercent) >= 65.0 ? 'At Risk' : 'Slipping'}
          statusColor={parseFloat(sprintCompletionPercent) >= 80.0 ? 'emerald' : parseFloat(sprintCompletionPercent) >= 65.0 ? 'amber' : 'rose'}
          icon={<CheckCircle2 className="w-5 h-5 text-cyan-500" />}
          onJustify={() => setSelectedJustification({
            title: 'Sprint Story Completion Rate',
            statusBadge: parseFloat(sprintCompletionPercent) >= 80.0 ? 'Throughput Met' : 'Slipping',
            statusColor: parseFloat(sprintCompletionPercent) >= 80.0 ? 'emerald' : 'amber',
            currentValue: `${sprintCompletionPercent}% (${sprintCompletedItems.length}/${jiraItems.length} Done)`,
            targetValue: '> 80.0%',
            formulaOrRule: `StoryCompletionRate = (CompletedWorkItems / TotalSprintWorkItems) × 100`,
            rationale: `${sprintCompletedItems.length} of ${jiraItems.length} items are marked Done (${sprintCompletionPercent}%). Meeting story throughput ensures release scope commitments are delivered on schedule.`,
            recommendedAction: 'Focus team WIP on finishing in-flight stories rather than pulling new backlog items into sprint.'
          })}
        />
        <MetricCard
          title="Active QA Specialists"
          value={productivityMetrics.length}
          target="Dedicated Squad"
          statusBadge={productivityMetrics.length >= 4 ? 'Optimal Staffing' : 'Understaffed'}
          statusColor={productivityMetrics.length >= 4 ? 'emerald' : 'amber'}
          icon={<Users className="w-5 h-5 text-purple-500" />}
          onJustify={() => setSelectedJustification({
            title: 'Active QA Specialists & Capacity',
            statusBadge: productivityMetrics.length >= 4 ? 'Optimal Staffing' : 'Understaffed',
            statusColor: productivityMetrics.length >= 4 ? 'emerald' : 'amber',
            currentValue: `${productivityMetrics.length} QA Engineers`,
            targetValue: 'Dedicated Squad (≥ 4 Engineers)',
            formulaOrRule: `ActiveQA = COUNT(DistinctAssignees in TestRail execution logs)`,
            rationale: `Currently ${productivityMetrics.length} QA engineers are actively authoring and executing test suites across products.`,
            recommendedAction: 'Maintain balanced assignments and pair-test complex integration scenarios.'
          })}
        />
      </div>

      {/* Engineer Assignments & Completion Ratios Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
              QA Engineer Test Assignment & Throughput Ledger
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Assigned vs completed test case executions, blocked items, and individual velocity.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
            Capacity Limit: 140 Tests / Engineer
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3 rounded-l-lg">QA Engineer</th>
                <th className="p-3">Assigned Tests</th>
                <th className="p-3">Completed Tests</th>
                <th className="p-3">Completion Rate</th>
                <th className="p-3">Delayed / Blocked</th>
                <th className="p-3">Avg Hours / Test</th>
                <th className="p-3 rounded-r-lg">Workload Status</th>
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
                    {eng.avgHoursPerTest} hrs
                  </td>
                  <td className="p-3">
                    {eng.isOverCommitted ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30">
                        Over-Committed
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                        Balanced Load
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
