/**
 * KPI View: Automation ROI & Pipeline Health
 * Detailed telemetry on automated test pass rates, flaky test quarantine,
 * CI/CD execution runtimes, and engineering ROI.
 */

import React from 'react';
import { 
  Cpu, AlertCircle, RefreshCw, 
  Clock, Zap, CheckCircle2 
} from 'lucide-react';
import type { 
  TestStatusDistribution, 
  TestRailExecution 
} from '../../../types/kpiPlatform';
import { MetricCard, StackedProgressBar } from '../VisualWidgets';

interface AutomationViewProps {
  automatedDistribution: TestStatusDistribution;
  manualDistribution: TestStatusDistribution;
  automationHealth: {
    totalAutomated: number;
    totalManual: number;
    flakyCount: number;
    flakyRate: number;
    totalReruns: number;
    avgPipelineMins: number;
    manualHoursSaved: number;
    automationRatioPercent: number;
  };
  testRailExecutions: TestRailExecution[];
}

export const AutomationView: React.FC<AutomationViewProps> = ({
  automatedDistribution,
  manualDistribution,
  automationHealth,
  testRailExecutions
}) => {
  const flakyTestsList = testRailExecutions.filter(t => t.isFlaky || t.rerunCount > 0);

  return (
    <div className="space-y-6">
      {/* Top Automation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Automated Test Suite Pass Rate"
          value={`${automatedDistribution.passRate}%`}
          target="> 90.0%"
          trend="+3.2% vs last cycle"
          trendPositive={true}
          statusBadge={automatedDistribution.passRate > 85 ? 'Healthy' : 'Degraded'}
          statusColor={automatedDistribution.passRate > 85 ? 'emerald' : 'amber'}
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
        />
        <MetricCard
          title="Flaky Test Detection Index"
          value={`${automationHealth.flakyRate}%`}
          target="< 4.0%"
          trend={`${automationHealth.flakyCount} flaky tests`}
          trendPositive={automationHealth.flakyRate < 4}
          statusBadge="Quarantine Active"
          statusColor={automationHealth.flakyRate < 4 ? 'cyan' : 'rose'}
          icon={<AlertCircle className="w-5 h-5 text-rose-500" />}
        />
        <MetricCard
          title="CI/CD Pipeline Runtime"
          value={`${automationHealth.avgPipelineMins} mins`}
          target="< 15.0 mins"
          statusBadge="GitHub Actions"
          statusColor="purple"
          icon={<Clock className="w-5 h-5 text-purple-500" />}
        />
        <MetricCard
          title="Manual Hours Saved (ROI)"
          value={`${automationHealth.manualHoursSaved.toLocaleString()} hrs`}
          target="~3.5 FTEs"
          trend="Saved per cycle"
          trendPositive={true}
          statusBadge="High ROI"
          statusColor="emerald"
          icon={<Zap className="w-5 h-5 text-emerald-500" />}
        />
      </div>

      {/* Automated vs Manual Test Execution Distribution Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Automated Bar */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-500" />
              <span>Automated Test Execution ({automatedDistribution.total.toLocaleString()} Runs)</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-bold">
              {automationHealth.automationRatioPercent}% of Suite
            </span>
          </div>
          <StackedProgressBar distribution={automatedDistribution} />
        </div>

        {/* Manual Bar */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-purple-500" />
              <span>Manual Exploratory Execution ({manualDistribution.total.toLocaleString()} Runs)</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">
              {100 - automationHealth.automationRatioPercent}% of Suite
            </span>
          </div>
          <StackedProgressBar distribution={manualDistribution} />
        </div>
      </div>

      {/* Flaky Test Quarantine Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm font-['Outfit']">
            <AlertCircle className="w-4 h-4" />
            <span>Flaky Automated Tests Identified ({flakyTestsList.length} Cases Requiring Quarantine)</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Total Pipeline Reruns: <strong className="text-slate-700 dark:text-slate-200">{automationHealth.totalReruns}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-2.5 rounded-l-lg">Case ID</th>
                <th className="p-2.5">Title</th>
                <th className="p-2.5">Suite Type</th>
                <th className="p-2.5">Component</th>
                <th className="p-2.5">Rerun Count</th>
                <th className="p-2.5">Duration</th>
                <th className="p-2.5 rounded-r-lg">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {flakyTestsList.slice(0, 5).map(test => (
                <tr key={test.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-2.5 font-mono font-bold text-cyan-600 dark:text-cyan-400">{test.caseId}</td>
                  <td className="p-2.5 text-slate-900 dark:text-white truncate max-w-xs">{test.title}</td>
                  <td className="p-2.5 font-mono text-slate-600 dark:text-slate-300">{test.suiteType}</td>
                  <td className="p-2.5 text-slate-600 dark:text-slate-300">{test.component}</td>
                  <td className="p-2.5 font-mono text-amber-600 dark:text-amber-400 font-bold">{test.rerunCount} reruns</td>
                  <td className="p-2.5 font-mono text-slate-500">{test.durationSeconds}s</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
                      Flaky / Rerun
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
