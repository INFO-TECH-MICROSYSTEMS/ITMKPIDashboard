/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * KPI View: Automation ROI & Pipeline Health
 * Detailed telemetry on automated test pass rates, flaky test quarantine,
 * CI/CD execution runtimes, and engineering ROI.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Cpu, AlertCircle, RefreshCw, 
  Clock, Zap, CheckCircle2, HelpCircle 
} from 'lucide-react';
import type { 
  TestStatusDistribution, 
  TestRailExecution,
  AutomationHealthSummary,
  TestAutomationBurnoutForecast,
  KPIJustification 
} from '../../../types/kpiPlatform';
import { MetricCard, StackedProgressBar, AreaTrendChart } from '../VisualWidgets';
import { MetricJustificationModal } from '../MetricJustificationModal';
import { KPIJustificationService } from '../../../services/kpiJustificationService';

interface AutomationViewProps {
  automatedDistribution: TestStatusDistribution;
  manualDistribution: TestStatusDistribution;
  automationHealth: AutomationHealthSummary;
  testRailExecutions: TestRailExecution[];
  testAutomationForecast?: TestAutomationBurnoutForecast;
}

export const AutomationView: React.FC<AutomationViewProps> = ({
  automatedDistribution,
  manualDistribution,
  automationHealth,
  testRailExecutions,
  testAutomationForecast
}) => {
  const { t } = useTranslation();
  const [selectedJustification, setSelectedJustification] = useState<KPIJustification | null>(null);

  const flakyTestsList = testRailExecutions.filter(t => t.isFlaky || t.rerunCount > 0);

  return (
    <div className="space-y-6">
      {/* Top Automation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title={t('kpiPlatform.automationView.suitePassRate', 'Automated Test Suite Pass Rate')}
          value={`${automatedDistribution.passRate}%`}
          target="> 90.0%"
          trend={`+3.2% ${t('kpiPlatform.automationView.vsLastCycle', 'vs last cycle')}`}
          trendPositive={automatedDistribution.passRate >= 90.0}
          statusBadge={automatedDistribution.passRate >= 90.0 ? t('kpiPlatform.statusOptimal', 'Optimal') : automatedDistribution.passRate >= 80.0 ? t('kpiPlatform.statusAcceptable', 'Acceptable') : t('kpiPlatform.statusBreached', 'Degraded')}
          statusColor={automatedDistribution.passRate >= 90.0 ? 'emerald' : automatedDistribution.passRate >= 80.0 ? 'amber' : 'rose'}
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getAutomationPassRateJustification(automatedDistribution.passRate))}
        />
        <MetricCard
          title={t('kpiPlatform.automationView.flakyIndex', 'Flaky Test Detection Index')}
          value={`${automationHealth.flakyRate}%`}
          target="< 4.0%"
          trend={`${automationHealth.flakyCount} ${t('kpiPlatform.automationView.flakyTestsCount', 'flaky tests')}`}
          trendPositive={automationHealth.flakyRate <= 4.0}
          statusBadge={automationHealth.flakyRate <= 4.0 ? t('kpiPlatform.statusControlled', 'Controlled') : automationHealth.flakyRate <= 8.0 ? t('kpiPlatform.statusQuarantineActive', 'Quarantine Active') : t('kpiPlatform.statusPipelineDestabilized', 'Pipeline Destabilized')}
          statusColor={automationHealth.flakyRate <= 4.0 ? 'emerald' : automationHealth.flakyRate <= 8.0 ? 'amber' : 'rose'}
          icon={<AlertCircle className="w-5 h-5 text-rose-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getFlakyTestJustification(automationHealth.flakyRate, automationHealth.flakyCount))}
        />
        <MetricCard
          title={t('kpiPlatform.automationView.pipelineRuntime', 'CI/CD Pipeline Runtime')}
          value={`${automationHealth.avgPipelineMins} ${t('kpiPlatform.minsUnit', 'mins')}`}
          target={`< 15.0 ${t('kpiPlatform.minsUnit', 'mins')}`}
          trendPositive={automationHealth.avgPipelineMins <= 15.0}
          statusBadge={automationHealth.avgPipelineMins <= 15.0 ? t('kpiPlatform.statusFastPipeline', 'Fast Pipeline') : automationHealth.avgPipelineMins <= 25.0 ? t('kpiPlatform.statusModerateLatency', 'Moderate Latency') : t('kpiPlatform.statusPipelineBottleneck', 'Pipeline Bottleneck')}
          statusColor={automationHealth.avgPipelineMins <= 15.0 ? 'emerald' : automationHealth.avgPipelineMins <= 25.0 ? 'amber' : 'rose'}
          icon={<Clock className="w-5 h-5 text-purple-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getPipelineRuntimeJustification(automationHealth.avgPipelineMins))}
        />
        <MetricCard
          title={t('kpiPlatform.automationView.hoursSavedRoi', 'Manual Hours Saved (ROI)')}
          value={`${automationHealth.manualHoursSaved.toLocaleString()} ${t('kpiPlatform.hrsUnit', 'hrs')}`}
          target="~3.5 FTEs"
          trend={t('kpiPlatform.automationView.savedPerCycle', 'Saved per cycle')}
          trendPositive={true}
          statusBadge={automationHealth.manualHoursSaved > 200 ? t('kpiPlatform.statusHighRoi', 'High ROI') : t('kpiPlatform.statusModerateRoi', 'Moderate ROI')}
          statusColor={automationHealth.manualHoursSaved > 200 ? 'emerald' : 'amber'}
          icon={<Zap className="w-5 h-5 text-emerald-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getManualHoursSavedJustification(automationHealth.manualHoursSaved))}
        />
        {/* Enriched Automation Metric 1: CI/CD Compute Cost */}
        <MetricCard
          title={t('kpiPlatform.automationView.computeCostCard', 'CI/CD Runner Compute Cost')}
          value={`$${automationHealth.cicdComputeCostDollars.toLocaleString()}`}
          target={t('kpiPlatform.automationView.targetComputeCost', '< $250 / Sprint')}
          trend={t('kpiPlatform.automationView.cloudFinOps', 'Cloud FinOps Optimal')}
          trendPositive={automationHealth.cicdComputeCostDollars < 250}
          statusBadge={automationHealth.cicdComputeCostDollars < 250 ? t('kpiPlatform.statusOptimal', 'Efficient') : t('kpiPlatform.statusElevated', 'High Compute')}
          statusColor={automationHealth.cicdComputeCostDollars < 250 ? 'emerald' : 'amber'}
          icon={<Cpu className="w-5 h-5 text-blue-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getCicdComputeCostJustification(automationHealth.cicdComputeCostDollars))}
        />
        {/* Enriched Automation Metric 2: MTBF */}
        <MetricCard
          title={t('kpiPlatform.automationView.mtbfCard', 'Mean Time Between Flakes (MTBF)')}
          value={`${automationHealth.mtbfHours} ${t('kpiPlatform.hrsUnit', 'hrs')}`}
          target={t('kpiPlatform.automationView.targetMtbf', '> 24.0 hrs')}
          trend={t('kpiPlatform.automationView.deterministicSignals', 'Deterministic Signals')}
          trendPositive={automationHealth.mtbfHours >= 24.0}
          statusBadge={automationHealth.mtbfHours >= 24.0 ? t('kpiPlatform.statusHighTrust', 'Trustworthy') : t('kpiPlatform.statusWarning', 'Flaky Alert')}
          statusColor={automationHealth.mtbfHours >= 24.0 ? 'emerald' : 'amber'}
          icon={<Clock className="w-5 h-5 text-purple-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getMtbfJustification(automationHealth.mtbfHours))}
        />
        {/* Enriched Automation Metric 3: Automation Defect Catch Ratio */}
        <MetricCard
          title={t('kpiPlatform.automationView.defectCatchRatioCard', 'Automation Defect Catch Ratio')}
          value={`${automationHealth.automationCatchRatio}%`}
          target={t('kpiPlatform.automationView.targetDefectCatch', '> 70.0%')}
          trend={t('kpiPlatform.automationView.shiftLeftHero', 'Shift-Left Effective')}
          trendPositive={automationHealth.automationCatchRatio >= 70.0}
          statusBadge={automationHealth.automationCatchRatio >= 70.0 ? t('kpiPlatform.statusOptimal', 'Shift-Left Hero') : t('kpiPlatform.statusLagging', 'Manual Lag')}
          statusColor={automationHealth.automationCatchRatio >= 70.0 ? 'emerald' : 'amber'}
          icon={<Zap className="w-5 h-5 text-amber-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getAutomationCatchRatioJustification(automationHealth.automationCatchRatio))}
        />
      </div>

      {/* Test Automation Burnout & Predictive Velocity Forecast */}
      {testAutomationForecast && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
                {t('kpiPlatform.automationView.burnoutTitle', 'Test Automation Burnout & Predictive Velocity Forecast')}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.automationView.burnoutSubtitle', 'Total tests, automated tests, and remaining manual tests over time with forecast projection')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedJustification(KPIJustificationService.getTestAutomationBurnoutForecastJustification(testAutomationForecast))}
                className="px-2.5 py-1 text-xs font-mono font-bold rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 hover:scale-105 transition-transform flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Click to view full mathematical formula, velocity runway, and architectural audit breakdown"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{t('kpiPlatform.automationView.explainForecast', 'Explain Forecast')}</span>
              </button>
              <span className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-full border ${
                testAutomationForecast.isVelocityHealthy 
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
              }`}>
                {testAutomationForecast.isVelocityHealthy 
                  ? `● ${t('kpiPlatform.automationView.onSchedule', 'On Schedule')}` 
                  : `▲ ${t('kpiPlatform.automationView.paceWarning', 'Pace Warning')}`}
              </span>
            </div>
          </div>

          {/* Quick Velocity KPI Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.automationView.dailyVelocity', 'Daily Automation Velocity')}
              </div>
              <div className="text-lg font-bold font-['Outfit'] text-slate-900 dark:text-white mt-1">
                {testAutomationForecast.currentDailyVelocity.toLocaleString()} <span className="text-xs font-normal text-slate-500">tests/{t('kpiPlatform.daysUnit', 'day')}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.automationView.manualRemaining', 'Manual Tests Remaining')}
              </div>
              <div className="text-lg font-bold font-['Outfit'] text-amber-600 dark:text-amber-400 mt-1">
                {testAutomationForecast.manualTestsRemaining.toLocaleString()} <span className="text-xs font-normal text-slate-500">{t('kpiPlatform.testsCount', 'tests')}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.automationView.projectedRunway', 'Projected Automation Runway')}
              </div>
              <div className="text-lg font-bold font-['Outfit'] text-cyan-600 dark:text-cyan-400 mt-1">
                {testAutomationForecast.daysToAllAutomated} <span className="text-xs font-normal text-slate-500">{t('kpiPlatform.daysUnit', 'days')}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.automationView.estimatedAllAutomated', 'Projected 100% Automated')}
              </div>
              <div className="text-lg font-bold font-['Outfit'] text-emerald-600 dark:text-emerald-400 mt-1">
                {testAutomationForecast.estimatedAllAutomatedDate}
              </div>
            </div>
          </div>

          {/* Area Trend & Burnout Chart with Extrapolated Velocity Runway */}
          <AreaTrendChart
            data={testAutomationForecast.historyAndForecast}
            title={t('kpiPlatform.automationView.burnoutTitle', 'Test Automation Burnout & Predictive Velocity Forecast')}
            series1Name={t('kpiPlatform.automationView.totalTestsSeries', 'Total Tests')}
            series2Name={t('kpiPlatform.automationView.automatedTestsSeries', 'Automated Tests')}
            series3Name={t('kpiPlatform.automationView.manualTestsSeries', 'Manual Tests')}
            series1Color="#f43f5e" // Total Tests (Rose solid)
            series2Color="#10b981" // Automated Tests (Emerald solid)
            series3Color="#f59e0b" // Manual Tests (Amber solid)
            projectionLineColor="#06b6d4" // Automated forecast trajectory (Cyan dashed)
            series3ProjectionLineColor="#fbbf24" // Manual tests burnout trajectory (Amber dashed)
            forecastBadge={`${t('kpiPlatform.automationView.targetAllAutomatedPrefix', 'Target 100% Automated')}: ${testAutomationForecast.estimatedAllAutomatedDate}`}
            forecastStatus={testAutomationForecast.isVelocityHealthy ? 'emerald' : 'amber'}
            onJustify={() => setSelectedJustification(KPIJustificationService.getTestAutomationBurnoutForecastJustification(testAutomationForecast))}
            height={185}
          />
        </div>
      )}

      {/* Automated vs Manual Test Execution Distribution Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Automated Bar */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-500" />
              <span>{t('kpiPlatform.automationView.automatedExecution')} ({automatedDistribution.total.toLocaleString()} {t('kpiPlatform.automationView.runsCount')})</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-bold">
                {automationHealth.automationRatioPercent}% {t('kpiPlatform.automationView.ofSuite')}
              </span>
              <button
                onClick={() => setSelectedJustification(KPIJustificationService.getTestExecutionDistributionJustification(automatedDistribution, 'Automated'))}
                title="Explain Automated Execution Breakdown"
                className="p-1 rounded text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <StackedProgressBar 
            distribution={automatedDistribution} 
            onJustify={() => setSelectedJustification(KPIJustificationService.getTestExecutionDistributionJustification(automatedDistribution, 'Automated'))}
          />
        </div>

        {/* Manual Bar */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-purple-500" />
              <span>{t('kpiPlatform.automationView.manualExecution')} ({manualDistribution.total.toLocaleString()} {t('kpiPlatform.automationView.runsCount')})</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">
                {100 - automationHealth.automationRatioPercent}% {t('kpiPlatform.automationView.ofSuite')}
              </span>
              <button
                onClick={() => setSelectedJustification(KPIJustificationService.getTestExecutionDistributionJustification(manualDistribution, 'Manual'))}
                title="Explain Manual Execution Breakdown"
                className="p-1 rounded text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <StackedProgressBar 
            distribution={manualDistribution} 
            onJustify={() => setSelectedJustification(KPIJustificationService.getTestExecutionDistributionJustification(manualDistribution, 'Manual'))}
          />
        </div>
      </div>

      {/* Flaky Test Quarantine Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold text-sm font-['Outfit']">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{t('kpiPlatform.automationView.flakyTableTitle')} ({flakyTestsList.length} {t('kpiPlatform.automationView.casesRequiringQuarantine')})</span>
            <button
              type="button"
              onClick={() => setSelectedJustification(KPIJustificationService.getFlakyTestsJustification(flakyTestsList, automationHealth.totalReruns))}
              className="p-1 rounded-full text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Click for Flaky Tests quarantine policy and rerun audit"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-slate-400">
              {t('kpiPlatform.automationView.totalPipelineReruns')}: <strong className="text-slate-700 dark:text-slate-200">{automationHealth.totalReruns}</strong>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-2.5 rounded-l-lg">{t('kpiPlatform.automationView.tableCaseId')}</th>
                <th className="p-2.5">{t('kpiPlatform.qualityView.tableTitle')}</th>
                <th className="p-2.5">{t('kpiPlatform.automationView.tableSuiteType')}</th>
                <th className="p-2.5">{t('kpiPlatform.qualityView.tableComponent')}</th>
                <th className="p-2.5">{t('kpiPlatform.automationView.tableRerunCount')}</th>
                <th className="p-2.5">{t('kpiPlatform.automationView.tableDuration')}</th>
                <th className="p-2.5 rounded-r-lg">{t('kpiPlatform.qualityView.tableStatus')}</th>
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
                      {t('kpiPlatform.statusFlakyRerun', 'Flaky / Rerun')}
                    </span>
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
