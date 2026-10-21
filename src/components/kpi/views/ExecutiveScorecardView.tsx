/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * KPI View: Executive & Senior Management Scorecard
 * High-level quality governance, release readiness dial, leakage rates, and operational stability.
 * Seamlessly supports both single-scope analysis and stacked (Scope 1 on top of Scope 2) comparison.
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
  KPIJustification,
  TestExecutionBurnoutForecast 
} from '../../../types/kpiPlatform';
import { GaugeMeter, MetricCard, StackedProgressBar, AreaTrendChart } from '../VisualWidgets';
import { MetricJustificationModal } from '../MetricJustificationModal';
import { KPIJustificationService } from '../../../services/kpiJustificationService';
import { KPI_STATUS_THEMES } from '../../../constants/kpiConstants';
import type { ViewComparisonProps } from '../contracts/ViewComparisonContract';

interface ExecutiveScorecardViewProps extends ViewComparisonProps {
  scorecard: ReleaseQualityScorecard;
  testDistribution: TestStatusDistribution;
  testBurnoutForecast?: TestExecutionBurnoutForecast;
  jiraItems?: JiraWorkItem[];
  testRailExecutions?: TestRailExecution[];
  jiraItemsB?: JiraWorkItem[];
  testRailExecutionsB?: TestRailExecution[];
}

export const ExecutiveScorecardView: React.FC<ExecutiveScorecardViewProps> = ({
  scorecard,
  testDistribution,
  testBurnoutForecast,
  jiraItems = [],
  testRailExecutions = [],
  jiraItemsB = [],
  testRailExecutionsB = [],
  isCompareMode = false,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  metricsB
}) => {
  const { t } = useTranslation();
  const [selectedJustification, setSelectedJustification] = useState<KPIJustification | null>(null);

  const scorecardB = metricsB?.executiveScorecard;
  const testDistributionB = metricsB?.testDistributionAll;
  const testBurnoutForecastB = metricsB?.testBurnoutForecast;

  // Verdict status for Scope 1
  const verdictStatusKeyA: 'emerald' | 'amber' | 'rose' = 
    scorecard.readinessVerdict === 'Release Approved' 
      ? 'emerald' 
      : scorecard.readinessVerdict === 'Conditional Warning' 
      ? 'amber' 
      : 'rose';

  const currentThemeA = KPI_STATUS_THEMES[verdictStatusKeyA];

  const localizedVerdictA = 
    scorecard.readinessVerdict === 'Release Approved'
      ? t('kpiPlatform.executiveView.verdictApproved')
      : scorecard.readinessVerdict === 'Conditional Warning'
      ? t('kpiPlatform.executiveView.verdictWarning')
      : t('kpiPlatform.executiveView.verdictGated');

  // Verdict status for Scope 2 (when in compare mode)
  const verdictStatusKeyB: 'emerald' | 'amber' | 'rose' = 
    scorecardB?.readinessVerdict === 'Release Approved' 
      ? 'emerald' 
      : scorecardB?.readinessVerdict === 'Conditional Warning' 
      ? 'amber' 
      : 'rose';

  const currentThemeB = KPI_STATUS_THEMES[verdictStatusKeyB];

  const localizedVerdictB = scorecardB ? (
    scorecardB.readinessVerdict === 'Release Approved'
      ? t('kpiPlatform.executiveView.verdictApproved')
      : scorecardB.readinessVerdict === 'Conditional Warning'
      ? t('kpiPlatform.executiveView.verdictWarning')
      : t('kpiPlatform.executiveView.verdictGated')
  ) : '';

  const handleOpenReleaseIndexJustificationA = () => {
    const just = KPIJustificationService.getReleaseQualityIndexJustification(
      scorecard,
      jiraItems,
      testRailExecutions
    );
    setSelectedJustification(just);
  };

  const handleOpenReleaseIndexJustificationB = () => {
    if (!scorecardB) return;
    const just = KPIJustificationService.getReleaseQualityIndexJustification(
      scorecardB,
      jiraItemsB,
      testRailExecutionsB
    );
    setSelectedJustification(just);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Release Readiness Hero Card */}
      {!isCompareMode ? (
        // Standard Single Scope Banner
        <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all duration-300 ${currentThemeA.card}`}>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Dial Meter */}
            <div className={`lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r ${currentThemeA.footerBorder} pb-6 lg:pb-0 lg:pr-6`}>
              <GaugeMeter
                score={scorecard.overallScore}
                title={t('kpiPlatform.executiveView.qualityIndex')}
                subtitle={t('kpiPlatform.executiveView.qualityIndexSubtitle')}
                grade={scorecard.releaseReadyGrade}
                size={190}
                onJustify={handleOpenReleaseIndexJustificationA}
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
                  onClick={handleOpenReleaseIndexJustificationA}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-transform cursor-pointer ${currentThemeA.badge}`}
                  title="Click to see why this release verdict was triggered"
                >
                  {scorecard.readinessVerdict === 'Release Approved' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertOctagon className="w-4 h-4" />
                  )}
                  <span>{localizedVerdictA}</span>
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
                <div className={`p-3 rounded-xl border ${currentThemeA.calloutBg} ${currentThemeA.calloutBorder} shadow-2xs`}>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">{t('kpiPlatform.executiveView.gatingDefects')}</span>
                  <span className={`text-xl font-bold font-mono ${scorecard.gatingDefectCount > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {scorecard.gatingDefectCount} {t('kpiPlatform.executiveView.blockersUnit')}
                  </span>
                </div>
                <div className={`p-3 rounded-xl border ${currentThemeA.calloutBg} ${currentThemeA.calloutBorder} shadow-2xs`}>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">{t('kpiPlatform.executiveView.defectLeakage')}</span>
                  <span className={`text-xl font-bold font-mono ${scorecard.defectLeakageRate <= 3.0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {scorecard.defectLeakageRate}%
                  </span>
                </div>
                <div className={`p-3 rounded-xl border ${currentThemeA.calloutBg} ${currentThemeA.calloutBorder} shadow-2xs`}>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">{t('kpiPlatform.executiveView.automationCoverage')}</span>
                  <span className="text-xl font-bold font-mono text-purple-700 dark:text-purple-400">
                    {scorecard.automationCoverage}%
                  </span>
                </div>
                <div className={`p-3 rounded-xl border ${currentThemeA.calloutBg} ${currentThemeA.calloutBorder} shadow-2xs`}>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">{t('kpiPlatform.executiveView.slaAdherence')}</span>
                  <span className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
                    {scorecard.slaAdherenceRate}%
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : (
        // Stacked Dual-Scope Release Readiness Cards (Scope 1 on Top of Scope 2)
        <div className="space-y-4">
          {/* Scope 1 Readiness Card */}
          <div className={`p-6 rounded-3xl border relative overflow-hidden transition-all duration-300 ${currentThemeA.card}`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                  {scopeALabel}
                </span>
              </div>
              <button 
                type="button"
                onClick={handleOpenReleaseIndexJustificationA}
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 shadow-2xs ${currentThemeA.badge}`}
              >
                {scorecard.readinessVerdict === 'Release Approved' ? <CheckCircle2 className="w-4 h-4" /> : <AlertOctagon className="w-4 h-4" />}
                <span>{localizedVerdictA}</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-4">
              <GaugeMeter
                score={scorecard.overallScore}
                title={t('kpiPlatform.executiveView.qualityIndex')}
                subtitle={scopeALabel}
                grade={scorecard.releaseReadyGrade}
                size={170}
                onJustify={handleOpenReleaseIndexJustificationA}
              />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full sm:w-auto">
                <div className={`p-3 rounded-xl border text-xs font-mono ${currentThemeA.calloutBg} ${currentThemeA.calloutBorder}`}>
                  <span className="text-slate-500 dark:text-slate-400 block">{t('kpiPlatform.executiveView.gatingDefects')}</span>
                  <span className="text-lg font-bold">{scorecard.gatingDefectCount} {t('kpiPlatform.executiveView.blockersUnit')}</span>
                </div>
                <div className={`p-3 rounded-xl border text-xs font-mono ${currentThemeA.calloutBg} ${currentThemeA.calloutBorder}`}>
                  <span className="text-slate-500 dark:text-slate-400 block">{t('kpiPlatform.executiveView.defectLeakage')}</span>
                  <span className="text-lg font-bold">{scorecard.defectLeakageRate}%</span>
                </div>
                <div className={`p-3 rounded-xl border text-xs font-mono ${currentThemeA.calloutBg} ${currentThemeA.calloutBorder}`}>
                  <span className="text-slate-500 dark:text-slate-400 block">{t('kpiPlatform.executiveView.automationCoverage')}</span>
                  <span className="text-lg font-bold">{scorecard.automationCoverage}%</span>
                </div>
                <div className={`p-3 rounded-xl border text-xs font-mono ${currentThemeA.calloutBg} ${currentThemeA.calloutBorder}`}>
                  <span className="text-slate-500 dark:text-slate-400 block">{t('kpiPlatform.executiveView.slaAdherence')}</span>
                  <span className="text-lg font-bold">{scorecard.slaAdherenceRate}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scope 2 Readiness Card directly below Scope 1 */}
          <div className={`p-6 rounded-3xl border relative overflow-hidden transition-all duration-300 ${scorecardB ? currentThemeB.card : 'bg-slate-50 dark:bg-slate-900 border-slate-200'}`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                  {scopeBLabel}
                </span>
              </div>
              {scorecardB && (
                <button 
                  type="button"
                  onClick={handleOpenReleaseIndexJustificationB}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 shadow-2xs ${currentThemeB.badge}`}
                >
                  {scorecardB.readinessVerdict === 'Release Approved' ? <CheckCircle2 className="w-4 h-4" /> : <AlertOctagon className="w-4 h-4" />}
                  <span>{localizedVerdictB}</span>
                </button>
              )}
            </div>

            {scorecardB ? (
              <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-4">
                <GaugeMeter
                  score={scorecardB.overallScore}
                  title={t('kpiPlatform.executiveView.qualityIndex')}
                  subtitle={scopeBLabel}
                  grade={scorecardB.releaseReadyGrade}
                  size={170}
                  onJustify={handleOpenReleaseIndexJustificationB}
                />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full sm:w-auto">
                  <div className={`p-3 rounded-xl border text-xs font-mono ${currentThemeB.calloutBg} ${currentThemeB.calloutBorder}`}>
                    <span className="text-slate-500 dark:text-slate-400 block">{t('kpiPlatform.executiveView.gatingDefects')}</span>
                    <span className="text-lg font-bold">{scorecardB.gatingDefectCount} {t('kpiPlatform.executiveView.blockersUnit')}</span>
                  </div>
                  <div className={`p-3 rounded-xl border text-xs font-mono ${currentThemeB.calloutBg} ${currentThemeB.calloutBorder}`}>
                    <span className="text-slate-500 dark:text-slate-400 block">{t('kpiPlatform.executiveView.defectLeakage')}</span>
                    <span className="text-lg font-bold">{scorecardB.defectLeakageRate}%</span>
                  </div>
                  <div className={`p-3 rounded-xl border text-xs font-mono ${currentThemeB.calloutBg} ${currentThemeB.calloutBorder}`}>
                    <span className="text-slate-500 dark:text-slate-400 block">{t('kpiPlatform.executiveView.automationCoverage')}</span>
                    <span className="text-lg font-bold">{scorecardB.automationCoverage}%</span>
                  </div>
                  <div className={`p-3 rounded-xl border text-xs font-mono ${currentThemeB.calloutBg} ${currentThemeB.calloutBorder}`}>
                    <span className="text-slate-500 dark:text-slate-400 block">{t('kpiPlatform.executiveView.slaAdherence')}</span>
                    <span className="text-lg font-bold">{scorecardB.slaAdherenceRate}%</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-36 text-xs font-mono text-slate-500">
                Scope 2 telemetry loading...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Metric Cards Grid: Scope 1 on Top of Scope 2 in Each Individual Metric */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Gating Blockers */}
        <MetricCard
          title={t('kpiPlatform.executiveView.cardGating')}
          value={scorecard.gatingDefectCount}
          target={t('kpiPlatform.executiveView.targetZeroBlockers')}
          statusBadge={scorecard.gatingDefectCount === 0 ? t('kpiPlatform.executiveView.statusPassed', 'Clear Gate') : t('kpiPlatform.executiveView.actionRequired')}
          statusColor={scorecard.gatingDefectCount === 0 ? 'emerald' : 'rose'}
          icon={<AlertOctagon className="w-5 h-5 text-rose-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getGatingDefectsJustification(jiraItems))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={scorecardB?.gatingDefectCount}
          compareStatusBadge={scorecardB ? (scorecardB.gatingDefectCount === 0 ? 'Clear Gate' : 'Action Req') : undefined}
          compareStatusColor={scorecardB?.gatingDefectCount === 0 ? 'emerald' : 'rose'}
          delta={scorecardB !== undefined ? `${scorecard.gatingDefectCount - scorecardB.gatingDefectCount > 0 ? '+' : ''}${scorecard.gatingDefectCount - scorecardB.gatingDefectCount} blockers` : undefined}
          deltaPositive={scorecardB !== undefined && scorecard.gatingDefectCount <= scorecardB.gatingDefectCount}
        />

        {/* 2. Defect Leakage Rate */}
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
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={scorecardB ? `${scorecardB.defectLeakageRate}%` : undefined}
          compareStatusBadge={scorecardB ? (scorecardB.defectLeakageRate <= 3.0 ? 'Controlled' : 'Elevated') : undefined}
          compareStatusColor={scorecardB ? (scorecardB.defectLeakageRate <= 3.0 ? 'emerald' : 'rose') : undefined}
          delta={scorecardB !== undefined ? `${(scorecard.defectLeakageRate - scorecardB.defectLeakageRate) > 0 ? '+' : ''}${(scorecard.defectLeakageRate - scorecardB.defectLeakageRate).toFixed(1)}%` : undefined}
          deltaPositive={scorecardB !== undefined && scorecard.defectLeakageRate <= scorecardB.defectLeakageRate}
        />

        {/* 3. Regression Cycle Time */}
        <MetricCard
          title={t('kpiPlatform.executiveView.cardRegression')}
          value={`${scorecard.regressionCycleTimeDays} ${t('kpiPlatform.executiveView.daysUnit')}`}
          target={t('kpiPlatform.executiveView.targetRegression')}
          trend={`42% ${t('kpiPlatform.executiveView.fasterViaSdet')}`}
          trendPositive={scorecard.regressionCycleTimeDays <= 2.5}
          statusBadge={scorecard.regressionCycleTimeDays <= 2.5 ? t('kpiPlatform.executiveView.statusPassed', 'Optimal') : scorecard.regressionCycleTimeDays <= 3.5 ? t('kpiPlatform.executiveView.acceptable') : t('kpiPlatform.executiveView.breached')}
          statusColor={scorecard.regressionCycleTimeDays <= 2.5 ? 'emerald' : scorecard.regressionCycleTimeDays <= 3.5 ? 'amber' : 'rose'}
          icon={<Clock className="w-5 h-5 text-emerald-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getRegressionCycleTimeJustification(scorecard))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={scorecardB ? `${scorecardB.regressionCycleTimeDays} ${t('kpiPlatform.executiveView.daysUnit')}` : undefined}
          compareStatusBadge={scorecardB ? (scorecardB.regressionCycleTimeDays <= 2.5 ? 'Optimal' : 'Elevated') : undefined}
          compareStatusColor={scorecardB ? (scorecardB.regressionCycleTimeDays <= 2.5 ? 'emerald' : 'amber') : undefined}
          delta={scorecardB !== undefined ? `${(scorecard.regressionCycleTimeDays - scorecardB.regressionCycleTimeDays) > 0 ? '+' : ''}${(scorecard.regressionCycleTimeDays - scorecardB.regressionCycleTimeDays).toFixed(1)}d` : undefined}
          deltaPositive={scorecardB !== undefined && scorecard.regressionCycleTimeDays <= scorecardB.regressionCycleTimeDays}
        />

        {/* 4. Performance Latency P95 */}
        <MetricCard
          title={t('kpiPlatform.executiveView.cardLatency')}
          value={`${scorecard.performanceP95Ms} ${t('kpiPlatform.executiveView.msUnit')}`}
          target={t('kpiPlatform.executiveView.targetLatency')}
          statusBadge={scorecard.performanceP95Ms <= 200 ? 'P99: 380ms' : t('kpiPlatform.executiveView.latencyWarning')}
          statusColor={scorecard.performanceP95Ms <= 200 ? 'emerald' : scorecard.performanceP95Ms <= 350 ? 'amber' : 'rose'}
          icon={<Zap className="w-5 h-5 text-purple-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getPerformanceP95Justification(scorecard))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={scorecardB ? `${scorecardB.performanceP95Ms} ${t('kpiPlatform.executiveView.msUnit')}` : undefined}
          compareStatusBadge={scorecardB ? (scorecardB.performanceP95Ms <= 200 ? 'Optimal' : 'Elevated') : undefined}
          compareStatusColor={scorecardB ? (scorecardB.performanceP95Ms <= 200 ? 'emerald' : 'amber') : undefined}
          delta={scorecardB !== undefined ? `${(scorecard.performanceP95Ms - scorecardB.performanceP95Ms) > 0 ? '+' : ''}${scorecard.performanceP95Ms - scorecardB.performanceP95Ms}ms` : undefined}
          deltaPositive={scorecardB !== undefined && scorecard.performanceP95Ms <= scorecardB.performanceP95Ms}
        />
      </div>

      {/* Senior Leadership Strategic Scorecard (CoPQ, DORA CFR, MTTR, SPI, Lead Time, Security, Uptime, WCAG) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
          <h4 className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white uppercase tracking-wider">
            {t('kpiPlatform.executiveView.governanceHeader', 'Executive & Senior Leadership Governance (DORA, Financial & Delivery)')}
          </h4>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
            {t('kpiPlatform.executiveView.telemetryBadge', 'C-Suite / VP Telemetry')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Cost of Poor Quality */}
          <MetricCard
            title={t('kpiPlatform.executiveView.cardCopq', 'Cost of Poor Quality (CoPQ)')}
            value={`$${(scorecard.costOfPoorQuality ?? 18450).toLocaleString()}`}
            target={t('kpiPlatform.executiveView.targetCopq', '< $25,000')}
            trend={`+$${(scorecard.costSavingsAutomated ?? 32500).toLocaleString()} ${t('kpiPlatform.executiveView.copqSavings', 'saved via SDET')}`}
            trendPositive={true}
            statusBadge={(scorecard.costOfPoorQuality ?? 18450) < 25000 ? t('kpiPlatform.statusControlled', 'Controlled') : t('kpiPlatform.statusElevated', 'High Rework')}
            statusColor={(scorecard.costOfPoorQuality ?? 18450) < 25000 ? 'emerald' : 'amber'}
            icon={<TrendingDown className="w-5 h-5 text-emerald-500" />}
            onJustify={() => setSelectedJustification(KPIJustificationService.getCostOfPoorQualityJustification(scorecard))}
            isComparing={isCompareMode}
            scopeALabel={scopeALabel}
            scopeBLabel={scopeBLabel}
            compareValue={scorecardB ? `$${(scorecardB.costOfPoorQuality ?? 18450).toLocaleString()}` : undefined}
            compareStatusBadge={scorecardB ? ((scorecardB.costOfPoorQuality ?? 18450) < 25000 ? 'Controlled' : 'High') : undefined}
            compareStatusColor={scorecardB ? ((scorecardB.costOfPoorQuality ?? 18450) < 25000 ? 'emerald' : 'amber') : undefined}
            delta={scorecardB !== undefined ? `${((scorecard.costOfPoorQuality ?? 18450) - (scorecardB.costOfPoorQuality ?? 18450)) > 0 ? '+$' : '-$'}${Math.abs((scorecard.costOfPoorQuality ?? 18450) - (scorecardB.costOfPoorQuality ?? 18450)).toLocaleString()}` : undefined}
            deltaPositive={scorecardB !== undefined && (scorecard.costOfPoorQuality ?? 18450) <= (scorecardB.costOfPoorQuality ?? 18450)}
          />

          {/* 2. DORA Change Failure Rate */}
          <MetricCard
            title={t('kpiPlatform.executiveView.cardCfr', 'Change Failure Rate (DORA)')}
            value={`${scorecard.changeFailureRate ?? 3.4}%`}
            target={t('kpiPlatform.executiveView.targetCfr', '< 5.0% (Elite)')}
            trend="-1.2% rollback rate"
            trendPositive={(scorecard.changeFailureRate ?? 3.4) <= 5.0}
            statusBadge={(scorecard.changeFailureRate ?? 3.4) <= 5.0 ? t('kpiPlatform.executiveView.eliteDora', 'DORA Elite') : t('kpiPlatform.statusAtRisk', 'High Risk')}
            statusColor={(scorecard.changeFailureRate ?? 3.4) <= 5.0 ? 'emerald' : 'rose'}
            icon={<AlertOctagon className="w-5 h-5 text-cyan-500" />}
            onJustify={() => setSelectedJustification(KPIJustificationService.getChangeFailureRateJustification(scorecard.changeFailureRate ?? 3.4))}
            isComparing={isCompareMode}
            scopeALabel={scopeALabel}
            scopeBLabel={scopeBLabel}
            compareValue={scorecardB ? `${scorecardB.changeFailureRate ?? 3.4}%` : undefined}
            compareStatusBadge={scorecardB ? ((scorecardB.changeFailureRate ?? 3.4) <= 5.0 ? 'DORA Elite' : 'At Risk') : undefined}
            compareStatusColor={scorecardB ? ((scorecardB.changeFailureRate ?? 3.4) <= 5.0 ? 'emerald' : 'rose') : undefined}
            delta={scorecardB !== undefined ? `${((scorecard.changeFailureRate ?? 3.4) - (scorecardB.changeFailureRate ?? 3.4)) > 0 ? '+' : ''}${((scorecard.changeFailureRate ?? 3.4) - (scorecardB.changeFailureRate ?? 3.4)).toFixed(1)}%` : undefined}
            deltaPositive={scorecardB !== undefined && (scorecard.changeFailureRate ?? 3.4) <= (scorecardB.changeFailureRate ?? 3.4)}
          />

          {/* 3. DORA Mean Time to Restore (MTTR) */}
          <MetricCard
            title={t('kpiPlatform.executiveView.cardMttr', 'Mean Time to Restore (MTTR)')}
            value={`${scorecard.meanTimeToRestoreHours ?? 2.8} ${t('kpiPlatform.hrsUnit', 'hrs')}`}
            target={t('kpiPlatform.executiveView.targetMttr', '< 4.0 Hours')}
            trend="1.4h faster P1 resolve"
            trendPositive={(scorecard.meanTimeToRestoreHours ?? 2.8) <= 4.0}
            statusBadge={(scorecard.meanTimeToRestoreHours ?? 2.8) <= 4.0 ? t('kpiPlatform.executiveView.eliteDora', 'DORA Elite') : t('kpiPlatform.statusDelayed', 'Delayed')}
            statusColor={(scorecard.meanTimeToRestoreHours ?? 2.8) <= 4.0 ? 'emerald' : 'amber'}
            icon={<Clock className="w-5 h-5 text-purple-500" />}
            onJustify={() => setSelectedJustification(KPIJustificationService.getMttrJustification(scorecard.meanTimeToRestoreHours ?? 2.8))}
            isComparing={isCompareMode}
            scopeALabel={scopeALabel}
            scopeBLabel={scopeBLabel}
            compareValue={scorecardB ? `${scorecardB.meanTimeToRestoreHours ?? 2.8} ${t('kpiPlatform.hrsUnit', 'hrs')}` : undefined}
            compareStatusBadge={scorecardB ? ((scorecardB.meanTimeToRestoreHours ?? 2.8) <= 4.0 ? 'DORA Elite' : 'Delayed') : undefined}
            compareStatusColor={scorecardB ? ((scorecardB.meanTimeToRestoreHours ?? 2.8) <= 4.0 ? 'emerald' : 'amber') : undefined}
            delta={scorecardB !== undefined ? `${((scorecard.meanTimeToRestoreHours ?? 2.8) - (scorecardB.meanTimeToRestoreHours ?? 2.8)) > 0 ? '+' : ''}${((scorecard.meanTimeToRestoreHours ?? 2.8) - (scorecardB.meanTimeToRestoreHours ?? 2.8)).toFixed(1)}h` : undefined}
            deltaPositive={scorecardB !== undefined && (scorecard.meanTimeToRestoreHours ?? 2.8) <= (scorecardB.meanTimeToRestoreHours ?? 2.8)}
          />

          {/* 4. Sprint Predictability Index */}
          <MetricCard
            title={t('kpiPlatform.executiveView.cardSpi', 'Sprint Predictability Index')}
            value={`${scorecard.sprintPredictabilityIndex ?? 91.2}%`}
            target={t('kpiPlatform.executiveView.targetSpi', '85% - 100%')}
            trend="+4.5% vs Sprint Avg"
            trendPositive={(scorecard.sprintPredictabilityIndex ?? 91.2) >= 85}
            statusBadge={(scorecard.sprintPredictabilityIndex ?? 91.2) >= 85 ? t('kpiPlatform.statusOnTarget', 'On Roadmap') : t('kpiPlatform.statusWarning', 'Variance')}
            statusColor={(scorecard.sprintPredictabilityIndex ?? 91.2) >= 85 ? 'emerald' : 'amber'}
            icon={<CheckCircle2 className="w-5 h-5 text-blue-500" />}
            onJustify={() => setSelectedJustification(KPIJustificationService.getSprintPredictabilityJustification(scorecard.sprintPredictabilityIndex ?? 91.2))}
            isComparing={isCompareMode}
            scopeALabel={scopeALabel}
            scopeBLabel={scopeBLabel}
            compareValue={scorecardB ? `${scorecardB.sprintPredictabilityIndex ?? 91.2}%` : undefined}
            compareStatusBadge={scorecardB ? ((scorecardB.sprintPredictabilityIndex ?? 91.2) >= 85 ? 'On Roadmap' : 'Variance') : undefined}
            compareStatusColor={scorecardB ? ((scorecardB.sprintPredictabilityIndex ?? 91.2) >= 85 ? 'emerald' : 'amber') : undefined}
            delta={scorecardB !== undefined ? `${((scorecard.sprintPredictabilityIndex ?? 91.2) - (scorecardB.sprintPredictabilityIndex ?? 91.2)) > 0 ? '+' : ''}${((scorecard.sprintPredictabilityIndex ?? 91.2) - (scorecardB.sprintPredictabilityIndex ?? 91.2)).toFixed(1)}%` : undefined}
            deltaPositive={scorecardB !== undefined && (scorecard.sprintPredictabilityIndex ?? 91.2) >= (scorecardB.sprintPredictabilityIndex ?? 91.2)}
          />

          {/* 5. Feature Lead Time Commit-to-GA */}
          <MetricCard
            title={t('kpiPlatform.executiveView.cardLeadTime', 'Feature Lead Time (Commit-to-GA)')}
            value={`${scorecard.featureLeadTimeDays} ${t('kpiPlatform.daysUnit', 'Days')}`}
            target={t('kpiPlatform.executiveView.targetLeadTime', '< 7.0 Days')}
            trend="Rapid Flow"
            trendPositive={scorecard.featureLeadTimeDays <= 7.0}
            statusBadge={scorecard.featureLeadTimeDays <= 7.0 ? t('kpiPlatform.statusOptimal', 'Optimal') : t('kpiPlatform.statusDelayed', 'Bottlenecked')}
            statusColor={scorecard.featureLeadTimeDays <= 7.0 ? 'emerald' : 'amber'}
            icon={<Clock className="w-5 h-5 text-teal-500" />}
            onJustify={() => setSelectedJustification(KPIJustificationService.getFeatureLeadTimeJustification(scorecard))}
            isComparing={isCompareMode}
            scopeALabel={scopeALabel}
            scopeBLabel={scopeBLabel}
            compareValue={scorecardB ? `${scorecardB.featureLeadTimeDays} ${t('kpiPlatform.daysUnit', 'Days')}` : undefined}
            compareStatusBadge={scorecardB ? (scorecardB.featureLeadTimeDays <= 7.0 ? 'Optimal' : 'Delayed') : undefined}
            compareStatusColor={scorecardB ? (scorecardB.featureLeadTimeDays <= 7.0 ? 'emerald' : 'amber') : undefined}
            delta={scorecardB !== undefined ? `${(scorecard.featureLeadTimeDays - scorecardB.featureLeadTimeDays) > 0 ? '+' : ''}${(scorecard.featureLeadTimeDays - scorecardB.featureLeadTimeDays).toFixed(1)}d` : undefined}
            deltaPositive={scorecardB !== undefined && scorecard.featureLeadTimeDays <= scorecardB.featureLeadTimeDays}
          />

          {/* 6. Security Gate Vulnerabilities */}
          <MetricCard
            title={t('kpiPlatform.executiveView.cardSecurity', 'Security Gate Vulnerabilities')}
            value={`${scorecard.criticalVulnerabilitiesCount} CVEs`}
            target={t('kpiPlatform.executiveView.targetSecurity', '0 Open CVEs')}
            trend="Zero Criticals"
            trendPositive={scorecard.criticalVulnerabilitiesCount === 0}
            statusBadge={scorecard.criticalVulnerabilitiesCount === 0 ? t('kpiPlatform.statusCompliant', 'Gate Clear') : t('kpiPlatform.statusGateViolation', 'CISO Escalation')}
            statusColor={scorecard.criticalVulnerabilitiesCount === 0 ? 'emerald' : 'rose'}
            icon={<AlertOctagon className="w-5 h-5 text-rose-500" />}
            onJustify={() => setSelectedJustification(KPIJustificationService.getSecurityGateJustification(scorecard))}
            isComparing={isCompareMode}
            scopeALabel={scopeALabel}
            scopeBLabel={scopeBLabel}
            compareValue={scorecardB ? `${scorecardB.criticalVulnerabilitiesCount} CVEs` : undefined}
            compareStatusBadge={scorecardB ? (scorecardB.criticalVulnerabilitiesCount === 0 ? 'Gate Clear' : 'Escalation') : undefined}
            compareStatusColor={scorecardB ? (scorecardB.criticalVulnerabilitiesCount === 0 ? 'emerald' : 'rose') : undefined}
            delta={scorecardB !== undefined ? `${(scorecard.criticalVulnerabilitiesCount - scorecardB.criticalVulnerabilitiesCount) > 0 ? '+' : ''}${scorecard.criticalVulnerabilitiesCount - scorecardB.criticalVulnerabilitiesCount} CVEs` : undefined}
            deltaPositive={scorecardB !== undefined && scorecard.criticalVulnerabilitiesCount <= scorecardB.criticalVulnerabilitiesCount}
          />

          {/* 7. Contractual SLA Production Availability */}
          <MetricCard
            title={t('kpiPlatform.executiveView.cardUptime', 'Contractual SLA Uptime')}
            value={`${scorecard.contractUptimePercentage}%`}
            target={t('kpiPlatform.executiveView.targetUptime', '≥ 99.95%')}
            trend="Four Nines Tier"
            trendPositive={scorecard.contractUptimePercentage >= 99.95}
            statusBadge={scorecard.contractUptimePercentage >= 99.95 ? t('kpiPlatform.statusOptimal', 'Four Nines') : t('kpiPlatform.statusBreached', 'Penalty Risk')}
            statusColor={scorecard.contractUptimePercentage >= 99.95 ? 'emerald' : 'rose'}
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            onJustify={() => setSelectedJustification(KPIJustificationService.getContractUptimeJustification(scorecard))}
            isComparing={isCompareMode}
            scopeALabel={scopeALabel}
            scopeBLabel={scopeBLabel}
            compareValue={scorecardB ? `${scorecardB.contractUptimePercentage}%` : undefined}
            compareStatusBadge={scorecardB ? (scorecardB.contractUptimePercentage >= 99.95 ? 'Four Nines' : 'Breached') : undefined}
            compareStatusColor={scorecardB ? (scorecardB.contractUptimePercentage >= 99.95 ? 'emerald' : 'rose') : undefined}
            delta={scorecardB !== undefined ? `${(scorecard.contractUptimePercentage - scorecardB.contractUptimePercentage) > 0 ? '+' : ''}${(scorecard.contractUptimePercentage - scorecardB.contractUptimePercentage).toFixed(2)}%` : undefined}
            deltaPositive={scorecardB !== undefined && scorecard.contractUptimePercentage >= scorecardB.contractUptimePercentage}
          />

          {/* 8. Accessibility Compliance Score */}
          <MetricCard
            title={t('kpiPlatform.executiveView.cardAccessibility', 'WCAG 2.2 AA Compliance')}
            value={`${scorecard.accessibilityScore}%`}
            target={t('kpiPlatform.executiveView.targetAccessibility', '≥ 92.0%')}
            trend="+1.5% audit score"
            trendPositive={scorecard.accessibilityScore >= 92.0}
            statusBadge={scorecard.accessibilityScore >= 92.0 ? t('kpiPlatform.statusCompliant', 'Compliant') : t('kpiPlatform.statusWarning', 'Audit Notice')}
            statusColor={scorecard.accessibilityScore >= 92.0 ? 'emerald' : 'amber'}
            icon={<CheckCircle2 className="w-5 h-5 text-cyan-500" />}
            onJustify={() => setSelectedJustification(KPIJustificationService.getAccessibilityScoreJustification(scorecard))}
            isComparing={isCompareMode}
            scopeALabel={scopeALabel}
            scopeBLabel={scopeBLabel}
            compareValue={scorecardB ? `${scorecardB.accessibilityScore}%` : undefined}
            compareStatusBadge={scorecardB ? (scorecardB.accessibilityScore >= 92.0 ? 'Compliant' : 'Warning') : undefined}
            compareStatusColor={scorecardB ? (scorecardB.accessibilityScore >= 92.0 ? 'emerald' : 'amber') : undefined}
            delta={scorecardB !== undefined ? `${(scorecard.accessibilityScore - scorecardB.accessibilityScore) > 0 ? '+' : ''}${(scorecard.accessibilityScore - scorecardB.accessibilityScore).toFixed(1)}%` : undefined}
            deltaPositive={scorecardB !== undefined && scorecard.accessibilityScore >= scorecardB.accessibilityScore}
          />
        </div>
      </div>

      {/* Aggregate Test Suite Progress Bars (Single or Stacked Dual Scope) */}
      {!isCompareMode ? (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
            {t('kpiPlatform.executiveView.snapshotTitle')} ({testDistribution.total.toLocaleString()} {t('kpiPlatform.executiveView.executedTests')})
          </h4>
          <StackedProgressBar
            distribution={testDistribution}
            title={t('kpiPlatform.executiveView.stackedTitle', 'Consolidated QA Execution Health (Automated + Manual)')}
            onJustify={() => setSelectedJustification(KPIJustificationService.getTestExecutionDistributionJustification(testDistribution, 'All'))}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Scope 1 Test Distribution */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-500/30 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                {scopeALabel} Execution Health
              </span>
              <span className="text-xs font-mono text-slate-500">
                {testDistribution.total.toLocaleString()} tests
              </span>
            </div>
            <StackedProgressBar
              distribution={testDistribution}
              title={`${scopeALabel} Distribution`}
              onJustify={() => setSelectedJustification(KPIJustificationService.getTestExecutionDistributionJustification(testDistribution, 'All'))}
            />
          </div>

          {/* Scope 2 Test Distribution directly underneath */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-purple-500/30 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
                {scopeBLabel} Execution Health
              </span>
              <span className="text-xs font-mono text-slate-500">
                {(testDistributionB?.total ?? 0).toLocaleString()} tests
              </span>
            </div>
            {testDistributionB ? (
              <StackedProgressBar
                distribution={testDistributionB}
                title={`${scopeBLabel} Distribution`}
                onJustify={() => setSelectedJustification(KPIJustificationService.getTestExecutionDistributionJustification(testDistributionB, 'All'))}
              />
            ) : (
              <div className="text-xs font-mono text-slate-400 py-4">Scope 2 distribution unavailable</div>
            )}
          </div>
        </div>
      )}

      {/* Test Execution Scope Added vs. Completed Burnout with Velocity Projection */}
      {testBurnoutForecast && !isCompareMode && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
                {t('kpiPlatform.executiveView.burnoutTitle')}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.executiveView.burnoutSubtitle')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedJustification(KPIJustificationService.getTestBurnoutForecastJustification(testBurnoutForecast))}
                className="px-2.5 py-1 text-xs font-mono font-bold rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 hover:scale-105 transition-transform flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Click to view full mathematical formula, velocity runway, and architectural audit breakdown"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{t('kpiPlatform.executiveView.explainForecast', 'Explain Forecast')}</span>
              </button>
              <span className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-full border ${
                testBurnoutForecast.isVelocityHealthy 
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
              }`}>
                {testBurnoutForecast.isVelocityHealthy 
                  ? `● ${t('kpiPlatform.executiveView.onTrack')}` 
                  : `▲ ${t('kpiPlatform.executiveView.atRisk')}`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.executiveView.dailyVelocity')}
              </div>
              <div className="text-lg font-bold font-['Outfit'] text-slate-900 dark:text-white mt-1">
                {testBurnoutForecast.currentDailyVelocity.toLocaleString()} <span className="text-xs font-normal text-slate-500">tests/{t('kpiPlatform.daysUnit', 'day')}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.executiveView.untestedRemaining')}
              </div>
              <div className="text-lg font-bold font-['Outfit'] text-amber-600 dark:text-amber-400 mt-1">
                {testBurnoutForecast.remainingUntested.toLocaleString()} <span className="text-xs font-normal text-slate-500">{t('kpiPlatform.testsCount', 'tests')}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.executiveView.projectedRunway')}
              </div>
              <div className="text-lg font-bold font-['Outfit'] text-cyan-600 dark:text-cyan-400 mt-1">
                {testBurnoutForecast.daysToCompletion} <span className="text-xs font-normal text-slate-500">{t('kpiPlatform.daysUnit', 'days')}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.executiveView.estimatedCompletion')}
              </div>
              <div className="text-lg font-bold font-['Outfit'] text-emerald-600 dark:text-emerald-400 mt-1">
                {testBurnoutForecast.estimatedCompletionDate}
              </div>
            </div>
          </div>

          <AreaTrendChart
            data={testBurnoutForecast.historyAndForecast}
            title={t('kpiPlatform.executiveView.burnoutTitle')}
            series1Name={t('kpiPlatform.executiveView.totalTestsSeries')}
            series2Name={t('kpiPlatform.executiveView.completedTestsSeries')}
            series3Name={t('kpiPlatform.executiveView.remainingTestsSeries')}
            series1Color="#f43f5e"
            series2Color="#10b981"
            series3Color="#f59e0b"
            projectionLineColor="#06b6d4"
            series3ProjectionLineColor="#fbbf24"
            forecastBadge={`${t('kpiPlatform.executiveView.targetCompletePrefix', 'Target Complete')}: ${testBurnoutForecast.estimatedCompletionDate}`}
            forecastStatus={testBurnoutForecast.isVelocityHealthy ? 'emerald' : 'amber'}
            onJustify={() => setSelectedJustification(KPIJustificationService.getTestBurnoutForecastJustification(testBurnoutForecast))}
            height={175}
          />
        </div>
      )}

      {/* Stacked Burnout Trajectories when in Compare Mode (Scope 1 on Top of Scope 2) */}
      {isCompareMode && testBurnoutForecast && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
              Comparative Burnout Trajectory Forecasts
            </h4>
            <span className="text-xs font-mono text-purple-600 dark:text-purple-400">
              Comparative Trajectories
            </span>
          </div>

          {/* Scope 1 Burnout Forecast */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                {scopeALabel} Runway
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${testBurnoutForecast.isVelocityHealthy ? 'bg-emerald-50 text-emerald-600 border-emerald-300' : 'bg-amber-50 text-amber-600 border-amber-300'}`}>
                {testBurnoutForecast.daysToCompletion}d runway • {testBurnoutForecast.estimatedCompletionDate}
              </span>
            </div>
            <AreaTrendChart
              data={testBurnoutForecast.historyAndForecast}
              title={`${scopeALabel} Burnout`}
              series1Name="Total"
              series2Name="Done"
              series3Name="Remaining"
              onJustify={() => setSelectedJustification(KPIJustificationService.getTestBurnoutForecastJustification(testBurnoutForecast))}
              height={160}
            />
          </div>

          {/* Scope 2 Burnout Forecast directly underneath */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                {scopeBLabel} Runway
              </span>
              {testBurnoutForecastB ? (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${testBurnoutForecastB.isVelocityHealthy ? 'bg-emerald-50 text-emerald-600 border-emerald-300' : 'bg-amber-50 text-amber-600 border-amber-300'}`}>
                  {testBurnoutForecastB.daysToCompletion}d runway • {testBurnoutForecastB.estimatedCompletionDate}
                </span>
              ) : (
                <span className="text-[10px] text-slate-400">Runway unavailable</span>
              )}
            </div>
            {testBurnoutForecastB ? (
              <AreaTrendChart
                data={testBurnoutForecastB.historyAndForecast}
                title={`${scopeBLabel} Burnout`}
                series1Name="Total"
                series2Name="Done"
                series3Name="Remaining"
                onJustify={() => setSelectedJustification(KPIJustificationService.getTestBurnoutForecastJustification(testBurnoutForecastB))}
                height={160}
              />
            ) : (
              <div className="h-[160px] flex items-center justify-center text-xs font-mono text-slate-400">
                Scope 2 burnout data not available
              </div>
            )}
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
