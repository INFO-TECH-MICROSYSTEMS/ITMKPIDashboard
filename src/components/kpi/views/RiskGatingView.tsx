/**
 * KPI View: Risk Assessment & Release Gating
 * Pre-release risk radar, high dependency depth items, missing unit/API tests,
 * and component failure ranking.
 */

import React from 'react';
import { 
  ShieldAlert, GitPullRequest, 
  Layers, Clock, XCircle 
} from 'lucide-react';
import type { 
  ComponentRiskMetric, 
  JiraWorkItem, 
  TestRailExecution 
} from '../../../types/kpiPlatform';
import { MetricCard } from '../VisualWidgets';

interface RiskGatingViewProps {
  componentRisks: ComponentRiskMetric[];
  jiraItems: JiraWorkItem[];
  testRailExecutions: TestRailExecution[];
}

export const RiskGatingView: React.FC<RiskGatingViewProps> = ({
  componentRisks,
  jiraItems,
  testRailExecutions
}) => {
  // PPT Requirement Calculations:
  const itemsWithNoTests = jiraItems.filter(i => !i.hasTestPlan && (i.type === 'Story' || i.type === 'Epic'));
  const itemsWithNoUnitTests = jiraItems.filter(i => !i.hasUnitTests);
  const itemsWithNoApiTests = jiraItems.filter(i => !i.hasApiTests);
  const highDependencyItems = jiraItems.filter(i => i.dependencyDepth >= 4);
  const blockedItems = jiraItems.filter(i => i.status === 'Blocked');
  const highExecutionTests = testRailExecutions.filter(t => t.durationSeconds > 300);

  const riskBadgeStyles = {
    Critical: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/30',
    High: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30',
    Medium: 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/30',
    Low: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
  };

  return (
    <div className="space-y-6">
      {/* Top Risk KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Items With No Unit Tests"
          value={itemsWithNoUnitTests.length}
          target="0 Permitted"
          trend={`${itemsWithNoTests.length} missing test plan`}
          trendPositive={itemsWithNoTests.length === 0}
          statusBadge={itemsWithNoUnitTests.length > 0 ? 'Gate Violation' : 'Compliant'}
          statusColor={itemsWithNoUnitTests.length > 0 ? 'rose' : 'emerald'}
          icon={<ShieldAlert className="w-5 h-5 text-rose-500" />}
        />
        <MetricCard
          title="Items With No API Tests"
          value={itemsWithNoApiTests.length}
          target="< 5 Exceptions"
          trendPositive={itemsWithNoApiTests.length < 5}
          statusBadge={itemsWithNoApiTests.length === 0 ? 'Compliant' : itemsWithNoApiTests.length < 5 ? 'Acceptable' : 'Contract Risk'}
          statusColor={itemsWithNoApiTests.length === 0 ? 'emerald' : itemsWithNoApiTests.length < 5 ? 'amber' : 'rose'}
          icon={<GitPullRequest className="w-5 h-5 text-amber-500" />}
        />
        <MetricCard
          title="High Dependency Depth (Depth ≥ 4)"
          value={highDependencyItems.length}
          target="< 3 High Risk"
          trendPositive={highDependencyItems.length <= 3}
          statusBadge={highDependencyItems.length === 0 ? 'Low Coupling' : highDependencyItems.length <= 3 ? 'Manageable' : 'Blast Radius Alert'}
          statusColor={highDependencyItems.length === 0 ? 'emerald' : highDependencyItems.length <= 3 ? 'amber' : 'rose'}
          icon={<Layers className="w-5 h-5 text-purple-500" />}
        />
        <MetricCard
          title="High Execution Time Tests (>300s)"
          value={highExecutionTests.length}
          target="0 Bottlenecks"
          trendPositive={highExecutionTests.length === 0}
          statusBadge={highExecutionTests.length === 0 ? 'Fast Pipeline' : highExecutionTests.length <= 5 ? 'Mild Latency' : 'Pipeline Bottleneck'}
          statusColor={highExecutionTests.length === 0 ? 'emerald' : highExecutionTests.length <= 5 ? 'amber' : 'rose'}
          icon={<Clock className="w-5 h-5 text-cyan-500" />}
        />
      </div>

      {/* Component Risk Assessment Matrix */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
              Component Risk Matrix & Failure Vulnerability
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluated across test execution failure rates, open gating defects, and unit test omissions.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
            Ranked by Vulnerability
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3 rounded-l-lg">Component / Module</th>
                <th className="p-3">Test Failure Rate</th>
                <th className="p-3">Gating Defects</th>
                <th className="p-3">Total Defects</th>
                <th className="p-3">Test Coverage</th>
                <th className="p-3">Missing Unit Tests</th>
                <th className="p-3 rounded-r-lg">Risk Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {componentRisks.map((comp) => (
                <tr key={comp.component} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3 text-slate-900 dark:text-white font-semibold">
                    {comp.component}
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                    <span className={comp.failureRate > 12 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}>
                      {comp.failureRate}%
                    </span>
                  </td>
                  <td className="p-3 font-mono">
                    {comp.gatingCount > 0 ? (
                      <span className="font-bold text-rose-600 dark:text-rose-400">{comp.gatingCount} Gating</span>
                    ) : (
                      <span className="text-slate-400">0</span>
                    )}
                  </td>
                  <td className="p-3 font-mono text-slate-700 dark:text-slate-300">
                    {comp.defectCount}
                  </td>
                  <td className="p-3 font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-cyan-500 h-full rounded-full" 
                          style={{ width: `${comp.testCoveragePercent}%` }} 
                        />
                      </div>
                      <span className="text-[11px] text-slate-700 dark:text-slate-300">{comp.testCoveragePercent}%</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-amber-600 dark:text-amber-400">
                    {comp.missingUnitTestsCount}
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${riskBadgeStyles[comp.riskLevel]}`}>
                      {comp.riskLevel} Risk
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* High Dependency Depth & Blocked Items Warning Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Blocked Items */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
              <XCircle className="w-4 h-4 text-rose-500" />
              <span>Blocked Development Items ({blockedItems.length})</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">Stalled in Sprint</span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {blockedItems.slice(0, 4).map(item => (
              <div key={item.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex justify-between font-mono font-bold text-slate-900 dark:text-white">
                  <span className="text-cyan-600 dark:text-cyan-400">{item.id}</span>
                  <span className="text-rose-600 dark:text-rose-400">{item.severity}</span>
                </div>
                <div className="text-slate-600 dark:text-slate-300 truncate mt-0.5">{item.title}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">Component: {item.component} | Assignee: {item.assignee}</div>
              </div>
            ))}
          </div>
        </div>

        {/* High Dependency Depth */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500" />
              <span>High Dependency Depth Items ({highDependencyItems.length})</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">Coupling Risk</span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {highDependencyItems.slice(0, 4).map(item => (
              <div key={item.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex justify-between font-mono font-bold text-slate-900 dark:text-white">
                  <span className="text-cyan-600 dark:text-cyan-400">{item.id}</span>
                  <span className="text-purple-600 dark:text-purple-400">Depth Level: {item.dependencyDepth}</span>
                </div>
                <div className="text-slate-600 dark:text-slate-300 truncate mt-0.5">{item.title}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">Requires cross-team regression testing before merge.</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
