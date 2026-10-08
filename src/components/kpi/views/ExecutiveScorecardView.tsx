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

interface ExecutiveScorecardViewProps {
  scorecard: ReleaseQualityScorecard;
  testDistribution: TestStatusDistribution;
  testBurnoutForecast?: TestExecutionBurnoutForecast;
  jiraItems?: JiraWorkItem[];
  testRailExecutions?: TestRailExecution[];
}

export const ExecutiveScorecardView: React.FC<ExecutiveScorecardViewProps> = ({
  scorecard,
  testDistribution,
  testBurnoutForecast,
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
            description: 'The total wall-clock duration in days required to execute the complete end-to-end regression test suite before release.',
            trackedInfo: 'Measures total cumulative execution seconds across all automated and manual regression test runs divided by standard working hours.',
            businessImportance: 'Determines release cadence and agility. Shorter regression cycles allow engineering squads to ship fixes and features continuously without multi-day staging freezes.',
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
            description: 'The 95th percentile response time (in milliseconds) for critical application endpoints and user transactions under load.',
            trackedInfo: 'Tracks synthetic API request and UI transaction latencies, measuring the duration within which 95% of user requests resolve.',
            businessImportance: 'Protects user experience and prevents transaction abandonment. High latency directly correlates with customer bounce rates and lost checkout conversions.',
            formulaOrRule: `P95Latency = 95th Percentile HTTP Response Duration across TestRail Performance Suite runs`,
            rationale: `P95 API response duration is ${scorecard.performanceP95Ms} ms. 95% of synthetic and load test requests complete within this latency envelope.`,
            recommendedAction: scorecard.performanceP95Ms <= 200
              ? 'Performance benchmarks are compliant with corporate SLA.'
              : 'Investigate slow database query execution and caching layers.'
          })}
        />
      </div>

      {/* Senior Leadership Strategic Scorecard (CoPQ, DORA CFR, MTTR, SPI, Lead Time, Security) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
          <h4 className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white uppercase tracking-wider">
            Executive & Senior Leadership Governance (DORA, Financial & Delivery)
          </h4>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
            C-Suite / VP Telemetry
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Cost of Poor Quality */}
          <MetricCard
            title={t('kpiPlatform.executiveView.cardCopq', 'Cost of Poor Quality (CoPQ)')}
            value={`$${(scorecard.costOfPoorQuality ?? 18450).toLocaleString()}`}
            target={t('kpiPlatform.executiveView.targetCopq', 'Target: < $25,000')}
            trend={`+$${(scorecard.costSavingsAutomated ?? 32500).toLocaleString()} ${t('kpiPlatform.executiveView.copqSavings', 'saved via SDET')}`}
            trendPositive={true}
            statusBadge={(scorecard.costOfPoorQuality ?? 18450) < 25000 ? 'Controlled' : 'High Rework'}
            statusColor={(scorecard.costOfPoorQuality ?? 18450) < 25000 ? 'emerald' : 'amber'}
            icon={<TrendingDown className="w-5 h-5 text-emerald-500" />}
            onJustify={() => setSelectedJustification(KPIJustificationService.getCostOfPoorQualityJustification(scorecard))}
          />

          {/* 2. DORA Change Failure Rate */}
          <MetricCard
            title={t('kpiPlatform.executiveView.cardCfr', 'Change Failure Rate (DORA)')}
            value={`${scorecard.changeFailureRate ?? 3.4}%`}
            target={t('kpiPlatform.executiveView.targetCfr', 'Target: < 5.0% (Elite)')}
            trend="-1.2% rollback rate"
            trendPositive={(scorecard.changeFailureRate ?? 3.4) <= 5.0}
            statusBadge={(scorecard.changeFailureRate ?? 3.4) <= 5.0 ? t('kpiPlatform.executiveView.eliteDora', 'DORA Elite') : 'High Risk'}
            statusColor={(scorecard.changeFailureRate ?? 3.4) <= 5.0 ? 'emerald' : 'rose'}
            icon={<AlertOctagon className="w-5 h-5 text-cyan-500" />}
            onJustify={() => setSelectedJustification(KPIJustificationService.getChangeFailureRateJustification(scorecard.changeFailureRate ?? 3.4))}
          />

          {/* 3. DORA Mean Time to Restore (MTTR) */}
          <MetricCard
            title={t('kpiPlatform.executiveView.cardMttr', 'Mean Time to Restore (MTTR)')}
            value={`${scorecard.meanTimeToRestoreHours ?? 2.8} hrs`}
            target={t('kpiPlatform.executiveView.targetMttr', 'Target: < 4.0 Hours')}
            trend="1.4h faster P1 resolve"
            trendPositive={(scorecard.meanTimeToRestoreHours ?? 2.8) <= 4.0}
            statusBadge={(scorecard.meanTimeToRestoreHours ?? 2.8) <= 4.0 ? 'DORA Elite' : 'Delayed'}
            statusColor={(scorecard.meanTimeToRestoreHours ?? 2.8) <= 4.0 ? 'emerald' : 'amber'}
            icon={<Clock className="w-5 h-5 text-purple-500" />}
            onJustify={() => setSelectedJustification(KPIJustificationService.getMttrJustification(scorecard.meanTimeToRestoreHours ?? 2.8))}
          />

          {/* 4. Sprint Predictability Index */}
          <MetricCard
            title={t('kpiPlatform.executiveView.cardSpi', 'Sprint Predictability Index')}
            value={`${scorecard.sprintPredictabilityIndex ?? 91.2}%`}
            target={t('kpiPlatform.executiveView.targetSpi', 'Target: 85% - 100%')}
            trend="+4.5% vs Sprint Avg"
            trendPositive={(scorecard.sprintPredictabilityIndex ?? 91.2) >= 85}
            statusBadge={(scorecard.sprintPredictabilityIndex ?? 91.2) >= 85 ? 'On Roadmap' : 'Variance'}
            statusColor={(scorecard.sprintPredictabilityIndex ?? 91.2) >= 85 ? 'emerald' : 'amber'}
            icon={<CheckCircle2 className="w-5 h-5 text-blue-500" />}
            onJustify={() => setSelectedJustification(KPIJustificationService.getSprintPredictabilityJustification(scorecard.sprintPredictabilityIndex ?? 91.2))}
          />

          {/* 5. Feature Lead Time Commit-to-GA */}
          <MetricCard
            title={t('kpiPlatform.executiveView.cardLeadTime', 'Feature Lead Time (Commit-to-GA)')}
            value={`${scorecard.featureLeadTimeDays ?? 4.6} Days`}
            target={t('kpiPlatform.executiveView.targetLeadTime', 'Target: < 7.0 Days')}
            trend="Rapid Flow"
            trendPositive={(scorecard.featureLeadTimeDays ?? 4.6) <= 7.0}
            statusBadge={(scorecard.featureLeadTimeDays ?? 4.6) <= 7.0 ? 'Optimal' : 'Bottlenecked'}
            statusColor={(scorecard.featureLeadTimeDays ?? 4.6) <= 7.0 ? 'emerald' : 'amber'}
            icon={<Clock className="w-5 h-5 text-teal-500" />}
            onJustify={() => setSelectedJustification({
              title: 'Feature Lead Time (Commit-to-Customer)',
              statusBadge: (scorecard.featureLeadTimeDays ?? 4.6) <= 7.0 ? 'Optimal Flow' : 'Delayed',
              statusColor: (scorecard.featureLeadTimeDays ?? 4.6) <= 7.0 ? 'emerald' : 'amber',
              currentValue: `${scorecard.featureLeadTimeDays ?? 4.6} Days`,
              targetValue: '< 7.0 Days',
              description: 'The average number of calendar days elapsed from a developer’s first commit on a branch until the feature successfully runs in customer-facing production.',
              trackedInfo: 'Measures lifecycle progression timestamp across Git commit history, pull request reviews, automated CI checks, and deployment release tags.',
              businessImportance: 'Google DORA core speed metric. Minimizes stale branching, accelerates customer feedback loops, and enables rapid competitive product iteration.',
              formulaOrRule: `LeadTime = AVERAGE(StoryProductionDeploymentTimestamp - FirstCommitTimestamp)`,
              rationale: `Features require on average ${scorecard.featureLeadTimeDays ?? 4.6} days from initial commit to general availability. Shorter lead time allows agile business iterations and rapid competitive response.`,
              recommendedAction: 'Keep PR branch lifetimes short (< 48 hrs) and minimize handoff delays between dev and QA verification.'
            })}
          />

          {/* 6. Security Gate Vulnerabilities */}
          <MetricCard
            title={t('kpiPlatform.executiveView.cardSecurity', 'Security Gate Vulnerabilities')}
            value={`${scorecard.criticalVulnerabilitiesCount ?? 0} CVEs`}
            target={t('kpiPlatform.executiveView.targetSecurity', 'Target: 0 Open CVEs')}
            trend="Zero Criticals"
            trendPositive={(scorecard.criticalVulnerabilitiesCount ?? 0) === 0}
            statusBadge={(scorecard.criticalVulnerabilitiesCount ?? 0) === 0 ? 'Gate Clear' : 'CISO Escalation'}
            statusColor={(scorecard.criticalVulnerabilitiesCount ?? 0) === 0 ? 'emerald' : 'rose'}
            icon={<AlertOctagon className="w-5 h-5 text-rose-500" />}
            onJustify={() => setSelectedJustification({
              title: 'Security Gate Vulnerabilities & CVE Compliance',
              statusBadge: (scorecard.criticalVulnerabilitiesCount ?? 0) === 0 ? 'Passed' : 'Security Halt',
              statusColor: (scorecard.criticalVulnerabilitiesCount ?? 0) === 0 ? 'emerald' : 'rose',
              currentValue: `${scorecard.criticalVulnerabilitiesCount ?? 0} Critical CVEs`,
              targetValue: '0 Permitted at Gate',
              description: 'The count of unresolved Critical or High Common Vulnerabilities and Exposures (CVEs) or SAST/DAST security violations present in the release.',
              trackedInfo: 'Aggregates automated dependency vulnerability scans, container image audits, and static application security test findings.',
              businessImportance: 'Strict CISO and compliance gating standard. Eliminates cyber risk exposure, protects user data, and complies with SOC2, ISO 27001, and HIPAA mandates.',
              formulaOrRule: `SecurityGate = COUNT(SAST/DAST Critical Security Findings + Open CVEs in Production Dependencies)`,
              rationale: (scorecard.criticalVulnerabilitiesCount ?? 0) === 0
                ? 'All automated security scans, dependency audits, and SAST/DAST test executions pass without critical findings.'
                : `There are ${scorecard.criticalVulnerabilitiesCount} critical security issues detected. Releases cannot proceed until patched.`,
              recommendedAction: (scorecard.criticalVulnerabilitiesCount ?? 0) === 0
                ? 'Continue automated Dependabot and SAST pipeline gating.'
                : 'Prioritize emergency security patching and redeploy to staging for re-scan.'
            })}
          />

          {/* 7. Contractual SLA Production Availability */}
          <MetricCard
            title={t('kpiPlatform.executiveView.cardUptime', 'Contractual SLA Uptime')}
            value={`${scorecard.contractUptimePercentage ?? 99.98}%`}
            target={t('kpiPlatform.executiveView.targetUptime', 'Target: ≥ 99.95%')}
            trend="Four Nines Tier"
            trendPositive={(scorecard.contractUptimePercentage ?? 99.98) >= 99.95}
            statusBadge={(scorecard.contractUptimePercentage ?? 99.98) >= 99.95 ? 'Four Nines' : 'Penalty Risk'}
            statusColor={(scorecard.contractUptimePercentage ?? 99.98) >= 99.95 ? 'emerald' : 'rose'}
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            onJustify={() => setSelectedJustification({
              title: 'Contractual Production SLA Uptime',
              statusBadge: (scorecard.contractUptimePercentage ?? 99.98) >= 99.95 ? 'Compliant' : 'Breached',
              statusColor: (scorecard.contractUptimePercentage ?? 99.98) >= 99.95 ? 'emerald' : 'rose',
              currentValue: `${scorecard.contractUptimePercentage ?? 99.98}%`,
              targetValue: '≥ 99.95%',
              description: 'The percentage of scheduled operational minutes during which production services, APIs, and customer interfaces remain accessible and fully functional.',
              trackedInfo: 'Measures synthetic API health-check probes, global uptime monitors, and recorded incident downtime minutes.',
              businessImportance: 'Protects contractual customer SLAs and avoids contractually mandated customer refund credits or financial service breach penalties.',
              formulaOrRule: `ContractUptime = 100% - (ProductionUnplannedDowntimeMinutes / TotalOperatingMinutes) × 100`,
              rationale: `Current composite availability is ${scorecard.contractUptimePercentage ?? 99.98}%, successfully meeting high-availability enterprise customer service level commitments.`,
              recommendedAction: 'Preserve automated health-check synthetic probes and multi-region failover configs.'
            })}
          />

          {/* 8. Accessibility Compliance Score */}
          <MetricCard
            title={t('kpiPlatform.executiveView.cardAccessibility', 'WCAG 2.2 AA Compliance')}
            value={`${scorecard.accessibilityScore}%`}
            target="Target: ≥ 92.0%"
            trend="+1.5% audit score"
            trendPositive={scorecard.accessibilityScore >= 92.0}
            statusBadge={scorecard.accessibilityScore >= 92.0 ? 'Compliant' : 'Audit Notice'}
            statusColor={scorecard.accessibilityScore >= 92.0 ? 'emerald' : 'amber'}
            icon={<CheckCircle2 className="w-5 h-5 text-cyan-500" />}
            onJustify={() => setSelectedJustification({
              title: 'WCAG 2.2 AA Accessibility Compliance',
              statusBadge: scorecard.accessibilityScore >= 92.0 ? 'Passed' : 'Warning',
              statusColor: scorecard.accessibilityScore >= 92.0 ? 'emerald' : 'amber',
              currentValue: `${scorecard.accessibilityScore}%`,
              targetValue: '≥ 92.0%',
              description: 'The automated and audited compliance score against the Web Content Accessibility Guidelines (WCAG 2.2 Level AA) and Section 508 standards.',
              trackedInfo: 'Tracks automated axe-core UI test suite results evaluating color contrast, ARIA landmarks, screen-reader markup, and keyboard focus traps.',
              businessImportance: 'Legal compliance and universal design. Ensures accessible digital services for users with disabilities while shielding against ADA legal litigation.',
              formulaOrRule: `WCAG_Score = (PassedAccessibilityTests / TotalAccessibilityTests) × 100`,
              rationale: `Automated axe-core / accessibility test suite pass rate is ${scorecard.accessibilityScore}%, meeting federal and enterprise accessibility compliance standards.`,
              recommendedAction: 'Maintain automated accessibility linting in UI component pull requests.'
            })}
          />
        </div>
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

      {/* Test Execution Scope Added vs. Completed Burnout with Velocity Projection */}
      {testBurnoutForecast && (
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

          {/* Quick Velocity KPI Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.executiveView.dailyVelocity')}
              </div>
              <div className="text-lg font-bold font-['Outfit'] text-slate-900 dark:text-white mt-1">
                {testBurnoutForecast.currentDailyVelocity.toLocaleString()} <span className="text-xs font-normal text-slate-500">tests/day</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.executiveView.untestedRemaining')}
              </div>
              <div className="text-lg font-bold font-['Outfit'] text-amber-600 dark:text-amber-400 mt-1">
                {testBurnoutForecast.remainingUntested.toLocaleString()} <span className="text-xs font-normal text-slate-500">tests</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.executiveView.projectedRunway')}
              </div>
              <div className="text-lg font-bold font-['Outfit'] text-cyan-600 dark:text-cyan-400 mt-1">
                {testBurnoutForecast.daysToCompletion} <span className="text-xs font-normal text-slate-500">days</span>
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

          {/* Area Trend & Burnout Chart with Extrapolated Velocity Runway */}
          <AreaTrendChart
            data={testBurnoutForecast.historyAndForecast}
            title={`${t('kpiPlatform.executiveView.burnoutTitle')} (Historical + Projected Runway)`}
            series1Name={t('kpiPlatform.executiveView.scopeAddedSeries')}
            series2Name={t('kpiPlatform.executiveView.completedVelocitySeries')}
            series1Color="#f43f5e" // Scope / added line (Rose)
            series2Color="#10b981" // Historical completed velocity (Emerald)
            projectionLineColor="#06b6d4" // Future velocity projected runway (Cyan dashed)
            forecastBadge={`Target Complete: ${testBurnoutForecast.estimatedCompletionDate}`}
            height={260}
          />
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
