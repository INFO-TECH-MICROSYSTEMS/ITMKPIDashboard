/**
 * KPI View: Executive & Senior Management Scorecard
 * High-level quality governance, release readiness dial, leakage rates, and operational stability.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  AlertOctagon, CheckCircle2, 
  TrendingDown, Clock, Zap, HelpCircle 
} from 'lucide-react';
import type { 
  ReleaseQualityScorecard, 
  TestStatusDistribution, 
  JiraWorkItem, 
  TestRailExecution, 
  KPIJustification 
} from '../../../types/kpiPlatform';
import { GaugeMeter, MetricCard, StackedProgressBar } from '../VisualWidgets';
import { MetricJustificationModal } from '../MetricJustificationModal';
import { KPIJustificationService } from '../../../services/kpiJustificationService';

import { KPI_STATUS_THEMES } from '../../../constants/kpiConstants';

interface ExecutiveScorecardViewProps {
  scorecard: ReleaseQualityScorecard;
  testDistribution: TestStatusDistribution;
  jiraItems?: JiraWorkItem[];
  testRailExecutions?: TestRailExecution[];
}

export const ExecutiveScorecardView: React.FC<ExecutiveScorecardViewProps> = ({
  scorecard,
  testDistribution,
  jiraItems = [],
  testRailExecutions = []
}) => {
  const { t } = useTranslation();
  const [selectedJustification, setSelectedJustification] = useState<KPIJustification | null>(null);

  const verdictStatusKey: 'emerald' | 'amber' | 'rose' = 
    scorecard.readinessVerdict === 'Release Approved' 
      ? 'emerald' 
      : scorecard.readinessVerdict === 'Conditional Warning' 
      ? 'amber' 
      : 'rose';

  const currentTheme = KPI_STATUS_THEMES[verdictStatusKey];

  const localizedVerdict = 
    scorecard.readinessVerdict === 'Release Approved'
      ? t('kpiPlatform.executiveView.verdictApproved')
      : scorecard.readinessVerdict === 'Conditional Warning'
      ? t('kpiPlatform.executiveView.verdictWarning')
      : t('kpiPlatform.executiveView.verdictGated');

  const handleOpenReleaseIndexJustification = () => {
    const just = KPIJustificationService.getReleaseQualityIndexJustification(
      scorecard,
      jiraItems,
      testRailExecutions
    );
    setSelectedJustification(just);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Release Readiness Hero Card */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all duration-300 ${currentTheme.card}`}>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Dial Meter */}
          <div className={`lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r ${currentTheme.footerBorder} pb-6 lg:pb-0 lg:pr-6`}>
            <GaugeMeter
              score={scorecard.overallScore}
              title={t('kpiPlatform.executiveView.qualityIndex')}
              subtitle={t('kpiPlatform.executiveView.qualityIndexSubtitle')}
              grade={scorecard.releaseReadyGrade}
              size={190}
              onJustify={handleOpenReleaseIndexJustification}
            />
          </div>

          {/* Verdict & Executive Summary */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono uppercase tracking-widest font-bold text-slate-700 dark:text-slate-300">
                {t('kpiPlatform.executiveView.evaluation')}
              </span>
              <button 
                type="button"
                onClick={handleOpenReleaseIndexJustification}
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-transform cursor-pointer ${currentTheme.badge}`}
                title="Click to see why this release verdict was triggered"
              >
                {scorecard.readinessVerdict === 'Release Approved' ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertOctagon className="w-4 h-4" />
                )}
                <span>{localizedVerdict}</span>
                <HelpCircle className="w-3 h-3 opacity-60 ml-0.5" />
              </button>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] tracking-tight text-slate-900 dark:text-white">
              {t('kpiPlatform.executiveView.assessmentTitle')}
            </h3>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t('kpiPlatform.executiveView.assessmentDesc')}
            </p>

            {/* Quick stats badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className={`p-3 rounded-xl border ${currentTheme.calloutBg} ${currentTheme.calloutBorder} shadow-2xs`}>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">{t('kpiPlatform.executiveView.gatingDefects')}</span>
                <span className={`text-xl font-bold font-mono ${scorecard.gatingDefectCount > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {scorecard.gatingDefectCount} {t('kpiPlatform.executiveView.blockersUnit')}
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${currentTheme.calloutBg} ${currentTheme.calloutBorder} shadow-2xs`}>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">{t('kpiPlatform.executiveView.defectLeakage')}</span>
                <span className={`text-xl font-bold font-mono ${scorecard.defectLeakageRate <= 3.0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {scorecard.defectLeakageRate}%
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${currentTheme.calloutBg} ${currentTheme.calloutBorder} shadow-2xs`}>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">{t('kpiPlatform.executiveView.automationCoverage')}</span>
                <span className="text-xl font-bold font-mono text-purple-700 dark:text-purple-400">
                  {scorecard.automationCoverage}%
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${currentTheme.calloutBg} ${currentTheme.calloutBorder} shadow-2xs`}>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">{t('kpiPlatform.executiveView.slaAdherence')}</span>
                <span className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
                  {scorecard.slaAdherenceRate}%
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title={t('kpiPlatform.executiveView.cardGating')}
          value={scorecard.gatingDefectCount}
          target={t('kpiPlatform.executiveView.targetZeroBlockers')}
          statusBadge={scorecard.gatingDefectCount === 0 ? t('kpiPlatform.executiveView.statusPassed', 'Clear Gate') : t('kpiPlatform.executiveView.actionRequired')}
          statusColor={scorecard.gatingDefectCount === 0 ? 'emerald' : 'rose'}
          icon={<AlertOctagon className="w-5 h-5 text-rose-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getGatingDefectsJustification(jiraItems))}
        />
        <MetricCard
          title={t('kpiPlatform.executiveView.cardLeakage')}
          value={`${scorecard.defectLeakageRate}%`}
          target={t('kpiPlatform.executiveView.targetLeakage')}
          trend={`-0.8% ${t('kpiPlatform.executiveView.vsLastSprint')}`}
          trendPositive={scorecard.defectLeakageRate <= 3.0}
          statusBadge={scorecard.defectLeakageRate <= 3.0 ? t('kpiPlatform.executiveView.statusPassed', 'Controlled') : scorecard.defectLeakageRate <= 5.0 ? t('kpiPlatform.executiveView.acceptable') : t('kpiPlatform.executiveView.breached')}
          statusColor={scorecard.defectLeakageRate <= 3.0 ? 'emerald' : scorecard.defectLeakageRate <= 5.0 ? 'amber' : 'rose'}
          icon={<TrendingDown className="w-5 h-5 text-cyan-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getDefectLeakageJustification(scorecard.defectLeakageRate, jiraItems))}
        />
        <MetricCard
          title={t('kpiPlatform.executiveView.cardRegression')}
          value={`${scorecard.regressionCycleTimeDays} ${t('kpiPlatform.executiveView.daysUnit')}`}
          target={t('kpiPlatform.executiveView.targetRegression')}
          trend={`42% ${t('kpiPlatform.executiveView.fasterViaSdet')}`}
          trendPositive={scorecard.regressionCycleTimeDays <= 2.5}
          statusBadge={scorecard.regressionCycleTimeDays <= 2.5 ? t('kpiPlatform.executiveView.statusPassed', 'Optimal') : scorecard.regressionCycleTimeDays <= 3.5 ? t('kpiPlatform.executiveView.acceptable') : t('kpiPlatform.executiveView.breached')}
          statusColor={scorecard.regressionCycleTimeDays <= 2.5 ? 'emerald' : scorecard.regressionCycleTimeDays <= 3.5 ? 'amber' : 'rose'}
          icon={<Clock className="w-5 h-5 text-emerald-500" />}
          onJustify={() => setSelectedJustification({
            title: 'Regression Cycle Time',
            statusBadge: scorecard.regressionCycleTimeDays <= 2.5 ? 'Optimal' : 'Delayed',
            statusColor: scorecard.regressionCycleTimeDays <= 2.5 ? 'emerald' : 'amber',
            currentValue: `${scorecard.regressionCycleTimeDays} Days`,
            targetValue: '< 2.5 Days',
            formulaOrRule: `RegressionCycleDays = SUM(RegressionTestDurationsInSeconds) / (8 hours/day * 3600)`,
            rationale: `Regression suite duration currently takes ${scorecard.regressionCycleTimeDays} days. Faster regressions allow squads to release continuously without holding back staging builds.`,
            recommendedAction: 'Expand parallel worker threads in CI/CD pipeline runners to keep full regression cycle under 2.5 days.'
          })}
        />
        <MetricCard
          title={t('kpiPlatform.executiveView.cardLatency')}
          value={`${scorecard.performanceP95Ms} ${t('kpiPlatform.executiveView.msUnit')}`}
          target={t('kpiPlatform.executiveView.targetLatency')}
          statusBadge={scorecard.performanceP95Ms <= 200 ? 'P99: 380ms' : t('kpiPlatform.executiveView.latencyWarning')}
          statusColor={scorecard.performanceP95Ms <= 200 ? 'emerald' : scorecard.performanceP95Ms <= 350 ? 'amber' : 'rose'}
          icon={<Zap className="w-5 h-5 text-purple-500" />}
          onJustify={() => setSelectedJustification({
            title: 'Performance P95 Latency Benchmark',
            statusBadge: scorecard.performanceP95Ms <= 200 ? 'Passed' : 'Latency Warning',
            statusColor: scorecard.performanceP95Ms <= 200 ? 'emerald' : 'rose',
            currentValue: `${scorecard.performanceP95Ms} ms`,
            targetValue: '< 200 ms',
            formulaOrRule: `P95Latency = 95th Percentile HTTP Response Duration across TestRail Performance Suite runs`,
            rationale: `P95 API response duration is ${scorecard.performanceP95Ms} ms. 95% of synthetic and load test requests complete within this latency envelope.`,
            recommendedAction: scorecard.performanceP95Ms <= 200
              ? 'Performance benchmarks are compliant with corporate SLA.'
              : 'Investigate slow database query execution and caching layers.'
          })}
        />
      </div>

      {/* Aggregate Test Suite Progress Bar */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
          {t('kpiPlatform.executiveView.snapshotTitle')} ({testDistribution.total.toLocaleString()} {t('kpiPlatform.executiveView.executedTests')})
        </h4>
        <StackedProgressBar
          distribution={testDistribution}
          title="Consolidated QA Execution Health (Automated + Manual)"
        />
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
