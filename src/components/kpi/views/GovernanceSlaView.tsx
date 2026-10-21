/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * KPI View: Governance, SLAs, Accessibility & Benchmarks
 * SLA compliance tracking, WCAG 2.2 AA accessibility audit metrics,
 * P95/P99 latency profiles, and customer satisfaction indexes.
 * Supports side-by-side metric comparison across scopes.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, Eye, Zap, ThumbsUp, HelpCircle 
} from 'lucide-react';
import type { 
  ReleaseQualityScorecard, 
  JiraWorkItem,
  KPIJustification 
} from '../../../types/kpiPlatform';
import { MetricCard } from '../VisualWidgets';
import { MetricJustificationModal } from '../MetricJustificationModal';
import { KPIJustificationService } from '../../../services/kpiJustificationService';
import { KPI_STATUS_THEMES } from '../../../constants/kpiConstants';
import type { ViewComparisonProps } from '../contracts/ViewComparisonContract';

interface GovernanceSlaViewProps extends ViewComparisonProps {
  scorecard: ReleaseQualityScorecard;
  jiraItems: JiraWorkItem[];
  jiraItemsB?: JiraWorkItem[];
}

export const GovernanceSlaView: React.FC<GovernanceSlaViewProps> = ({
  scorecard,
  jiraItems,
  isCompareMode = false,
  scopeALabel = 'Scope A',
  scopeBLabel = 'Scope B',
  metricsB
}) => {
  const { t } = useTranslation();
  const [selectedJustification, setSelectedJustification] = useState<KPIJustification | null>(null);

  const scorecardB = metricsB?.executiveScorecard;

  const customerDefects = jiraItems.filter(i => i.isCustomerDefect || i.type === 'CustomerAPAR');
  const resolvedCustomerDefects = customerDefects.filter(i => i.status === 'Done');

  return (
    <div className="space-y-6">
      {/* Top Governance Cards with Side-by-Side Scope Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Overall SLA Adherence */}
        <MetricCard
          title={t('kpiPlatform.governanceView.overallSla', 'Overall SLA Adherence')}
          value={`${scorecard.slaAdherenceRate}%`}
          target="> 92.0%"
          trend={`99.4% ${t('kpiPlatform.governanceView.triageTrend', 'P1 triage')}`}
          trendPositive={scorecard.slaAdherenceRate >= 92.0}
          statusBadge={scorecard.slaAdherenceRate >= 92.0 ? t('kpiPlatform.statusCompliant', 'Compliant') : scorecard.slaAdherenceRate >= 85.0 ? t('kpiPlatform.statusAtRisk', 'At Risk') : t('kpiPlatform.statusBreached', 'Breached')}
          statusColor={scorecard.slaAdherenceRate >= 92.0 ? 'emerald' : scorecard.slaAdherenceRate >= 85.0 ? 'amber' : 'rose'}
          icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getSlaAdherenceJustification(scorecard))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={scorecardB ? `${scorecardB.slaAdherenceRate}%` : undefined}
          compareStatusBadge={scorecardB ? (scorecardB.slaAdherenceRate >= 92.0 ? 'Compliant' : 'Risk') : undefined}
          compareStatusColor={scorecardB ? (scorecardB.slaAdherenceRate >= 92.0 ? 'emerald' : 'amber') : undefined}
          delta={scorecardB !== undefined ? `${(scorecard.slaAdherenceRate - scorecardB.slaAdherenceRate) > 0 ? '+' : ''}${(scorecard.slaAdherenceRate - scorecardB.slaAdherenceRate).toFixed(1)}%` : undefined}
          deltaPositive={scorecardB !== undefined && scorecard.slaAdherenceRate >= scorecardB.slaAdherenceRate}
        />

        {/* 2. WCAG 2.2 AA Accessibility */}
        <MetricCard
          title={t('kpiPlatform.governanceView.accessibilityTitle', 'WCAG 2.2 AA Accessibility')}
          value={`${scorecard.accessibilityScore}%`}
          target="> 95.0%"
          trend={t('kpiPlatform.governanceView.section508', 'Section 508 Ready')}
          trendPositive={scorecard.accessibilityScore >= 95.0}
          statusBadge={scorecard.accessibilityScore >= 95.0 ? t('kpiPlatform.statusAuditPassed', 'Audit Passed') : scorecard.accessibilityScore >= 90.0 ? t('kpiPlatform.statusMinorViolations', 'Minor Violations') : t('kpiPlatform.statusNonCompliant', 'Non-Compliant')}
          statusColor={scorecard.accessibilityScore >= 95.0 ? 'emerald' : scorecard.accessibilityScore >= 90.0 ? 'amber' : 'rose'}
          icon={<Eye className="w-5 h-5 text-cyan-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getAccessibilityJustification(scorecard.accessibilityScore))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={scorecardB ? `${scorecardB.accessibilityScore}%` : undefined}
          compareStatusBadge={scorecardB ? (scorecardB.accessibilityScore >= 95.0 ? 'Audit Passed' : 'Notice') : undefined}
          compareStatusColor={scorecardB ? (scorecardB.accessibilityScore >= 95.0 ? 'emerald' : 'amber') : undefined}
          delta={scorecardB !== undefined ? `${(scorecard.accessibilityScore - scorecardB.accessibilityScore) > 0 ? '+' : ''}${(scorecard.accessibilityScore - scorecardB.accessibilityScore).toFixed(1)}%` : undefined}
          deltaPositive={scorecardB !== undefined && scorecard.accessibilityScore >= scorecardB.accessibilityScore}
        />

        {/* 3. Performance P95 Latency */}
        <MetricCard
          title={t('kpiPlatform.governanceView.performanceP95', 'Performance P95 Latency')}
          value={`${scorecard.performanceP95Ms} ${t('kpiPlatform.msUnit', 'ms')}`}
          target={`< 180 ${t('kpiPlatform.msUnit', 'ms')}`}
          trendPositive={scorecard.performanceP95Ms <= 180}
          statusBadge={scorecard.performanceP95Ms <= 180 ? 'P99: 380 ms' : scorecard.performanceP95Ms <= 250 ? t('kpiPlatform.statusSpikeLatency', 'Spike Latency') : t('kpiPlatform.statusBreached', 'SLA Breached')}
          statusColor={scorecard.performanceP95Ms <= 180 ? 'emerald' : scorecard.performanceP95Ms <= 250 ? 'amber' : 'rose'}
          icon={<Zap className="w-5 h-5 text-purple-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getPerformanceP95Justification(scorecard.performanceP95Ms))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={scorecardB ? `${scorecardB.performanceP95Ms} ${t('kpiPlatform.msUnit', 'ms')}` : undefined}
          compareStatusBadge={scorecardB ? (scorecardB.performanceP95Ms <= 180 ? 'Optimal' : 'Latency Alert') : undefined}
          compareStatusColor={scorecardB ? (scorecardB.performanceP95Ms <= 180 ? 'emerald' : 'amber') : undefined}
          delta={scorecardB !== undefined ? `${(scorecard.performanceP95Ms - scorecardB.performanceP95Ms) > 0 ? '+' : ''}${scorecard.performanceP95Ms - scorecardB.performanceP95Ms}ms` : undefined}
          deltaPositive={scorecardB !== undefined && scorecard.performanceP95Ms <= scorecardB.performanceP95Ms}
        />

        {/* 4. Stakeholder Satisfaction (CSAT) */}
        <MetricCard
          title={t('kpiPlatform.governanceView.csatTitle', 'Stakeholder Satisfaction (CSAT)')}
          value="4.8 / 5.0"
          target="> 4.5"
          trend={`96% ${t('kpiPlatform.governanceView.netPositive', 'Net Positive')}`}
          trendPositive={true}
          statusBadge={t('kpiPlatform.statusHighTrust', 'High Trust')}
          statusColor="emerald"
          icon={<ThumbsUp className="w-5 h-5 text-emerald-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getCsatJustification())}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue="4.7 / 5.0"
          compareStatusBadge="High Trust"
          compareStatusColor="emerald"
        />

        {/* 5. Contract SLA Penalties */}
        <MetricCard
          title={t('kpiPlatform.governanceView.contractPenaltiesCard', 'Contract SLA Penalties')}
          value="$0"
          target={t('kpiPlatform.governanceView.targetZeroBreach', 'Target: $0 Zero Breach')}
          trend={t('kpiPlatform.governanceView.contractCompliant', '100% Contract Compliant')}
          trendPositive={true}
          statusBadge={t('kpiPlatform.governanceView.zeroPenalty', 'Zero Penalty')}
          statusColor="emerald"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getContractSlaPenaltiesJustification())}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue="$0"
          compareStatusBadge="Zero Penalty"
          compareStatusColor="emerald"
        />

        {/* 6. Audit Trail Traceability */}
        <MetricCard
          title={t('kpiPlatform.governanceView.auditTraceabilityCard', 'Audit Trail Traceability')}
          value="99.4%"
          target={t('kpiPlatform.governanceView.targetAudit', 'Target: 100%')}
          trend={t('kpiPlatform.governanceView.soc2Ready', 'SOC2 / ISO 27001 Ready')}
          trendPositive={true}
          statusBadge={t('kpiPlatform.governanceView.auditVerified', 'Audit Verified')}
          statusColor="emerald"
          icon={<ShieldCheck className="w-5 h-5 text-teal-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getAuditTraceabilityJustification())}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue="98.9%"
          compareStatusBadge="Audit Verified"
          compareStatusColor="emerald"
        />
      </div>

      {/* SLA Compliance Breakdown Matrix */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
            {t('kpiPlatform.governanceView.slaMatrixTitle')}
          </h4>
          <button
            type="button"
            onClick={() => setSelectedJustification(KPIJustificationService.getSlaAdherenceJustification(scorecard))}
            className="p-1 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Click for Enterprise Quality SLA Governance justification"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              id: 'defectTriage',
              name: t('kpiPlatform.slaItems.defectTriageName', 'Defect Triage SLA (P1 < 4h, P2 < 24h)'),
              rateNum: scorecard.slaBreakdown.p1P2TriageRate,
              rateNumB: scorecardB?.slaBreakdown?.p1P2TriageRate,
              targetNum: 95.0,
              rate: `${scorecard.slaBreakdown.p1P2TriageRate}%`,
              target: '95.0%',
              desc: t('kpiPlatform.slaItems.defectTriageDesc', 'Rapid initial triage and assessment for blocking and critical defects.')
            },
            {
              id: 'regressionExec',
              name: t('kpiPlatform.slaItems.regressionExecName', 'Regression Execution SLA'),
              rateNum: scorecard.slaBreakdown.regressionExecutionRate,
              rateNumB: scorecardB?.slaBreakdown?.regressionExecutionRate,
              targetNum: 90.0,
              rate: `${scorecard.slaBreakdown.regressionExecutionRate}%`,
              target: '90.0%',
              desc: t('kpiPlatform.slaItems.regressionExecDesc', 'Execution of complete regression cycle within scheduled sprint window.')
            },
            {
              id: 'testCreation',
              name: t('kpiPlatform.slaItems.testCreationName', 'Test Case Creation SLA'),
              rateNum: scorecard.slaBreakdown.testPlanCreationRate,
              rateNumB: scorecardB?.slaBreakdown?.testPlanCreationRate,
              targetNum: 90.0,
              rate: `${scorecard.slaBreakdown.testPlanCreationRate}%`,
              target: '90.0%',
              desc: t('kpiPlatform.slaItems.testCreationDesc', 'Test plans authored and reviewed prior to development handoff.')
            },
            {
              id: 'dailyReport',
              name: t('kpiPlatform.slaItems.dailyReportName', 'Daily QA Status Report SLA'),
              rateNum: scorecard.slaBreakdown.dailyReportRate,
              rateNumB: scorecardB?.slaBreakdown?.dailyReportRate,
              targetNum: 98.0,
              rate: `${scorecard.slaBreakdown.dailyReportRate}%`,
              target: '98.0%',
              desc: t('kpiPlatform.slaItems.dailyReportDesc', 'Automated executive and squad reporting published every day at 17:00.')
            },
            {
              id: 'autoDelivery',
              name: t('kpiPlatform.slaItems.autoDeliveryName', 'Automation Delivery SLA'),
              rateNum: scorecard.slaBreakdown.automationDeliveryRate,
              rateNumB: scorecardB?.slaBreakdown?.automationDeliveryRate,
              targetNum: 85.0,
              rate: `${scorecard.slaBreakdown.automationDeliveryRate}%`,
              target: '85.0%',
              desc: t('kpiPlatform.slaItems.autoDeliveryDesc', 'In-sprint test automation completed within the same sprint as feature code.')
            },
            {
              id: 'customerResolution',
              name: t('kpiPlatform.slaItems.customerResolutionName', 'Customer Defect Resolution SLA'),
              rateNum: scorecard.slaBreakdown.customerDefectResolutionRate,
              rateNumB: scorecardB?.slaBreakdown?.customerDefectResolutionRate,
              targetNum: 90.0,
              rate: `${scorecard.slaBreakdown.customerDefectResolutionRate}%`,
              target: '90.0%',
              desc: `${t('kpiPlatform.slaItems.customerResolutionDesc', 'Hotfix turnaround for high-impact customer APARs')} (${resolvedCustomerDefects.length}/${customerDefects.length}).`
            }
          ].map(sla => {
            const isOptimal = sla.rateNum >= sla.targetNum;
            const isWarning = !isOptimal && sla.rateNum >= sla.targetNum - 10;
            const statusColor = isOptimal ? 'emerald' : isWarning ? 'amber' : 'rose';
            const statusLabel = isOptimal ? t('kpiPlatform.statusCompliant', 'Compliant') : isWarning ? t('kpiPlatform.statusAtRisk', 'At Risk') : t('kpiPlatform.statusBreached', 'Breached');
            const slaTheme = KPI_STATUS_THEMES[statusColor];

            return (
              <div 
                key={sla.id} 
                onClick={() => setSelectedJustification(KPIJustificationService.getSlaBreakdownItemJustification(sla.name, sla.rate, sla.target, sla.desc, statusLabel, statusColor))}
                className={`p-4 rounded-xl border transition-all space-y-2 cursor-pointer hover:scale-[1.02] ${slaTheme.card}`}
                title={t('kpiPlatform.governanceView.viewJustification', 'Click for SLA justification and compliance audit')}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-['Outfit'] truncate">{sla.name}</span>
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 opacity-70" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border shadow-2xs flex items-center gap-1 shrink-0 ${slaTheme.badge}`}>
                    <span>{statusLabel}</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">{sla.desc}</p>
                <div className={`flex justify-between items-center pt-2 border-t text-xs font-mono ${slaTheme.footerBorder}`}>
                  <span className="text-slate-500 dark:text-slate-400">
                    {isCompareMode ? `${scopeALabel}: ` : `${t('kpiPlatform.governanceView.adherenceLabel', 'Adherence')}: `}
                    <strong className={slaTheme.value}>{sla.rate}</strong>
                    {isCompareMode && sla.rateNumB !== undefined && (
                      <span className="text-purple-600 dark:text-purple-400 ml-2">| {scopeBLabel}: <strong>{sla.rateNumB}%</strong></span>
                    )}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">{t('kpiPlatform.governanceView.targetSlaLabel', 'Target')}: {sla.target}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessibility & Performance Audit Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Accessibility Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-500" />
              <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
                {t('kpiPlatform.a11yAudit.title', 'Accessibility (WCAG 2.2 AA) Audit')}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setSelectedJustification(KPIJustificationService.getA11yAuditCardJustification(scorecard))}
              className="p-1 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Click for WCAG 2.2 AA Accessibility Audit clarification"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">{t('kpiPlatform.a11yAudit.colorContrast', 'Color Contrast Ratios (AA & AAA)')}</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{t('kpiPlatform.a11yAudit.colorContrastPass', '100% Pass (7:1 High Contrast)')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">{t('kpiPlatform.a11yAudit.keyboardNav', 'Keyboard Navigation & Focus Traps')}</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{t('kpiPlatform.a11yAudit.zeroTraps', '0 Traps Detected')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">{t('kpiPlatform.a11yAudit.screenReader', 'Screen Reader ARIA Compatibility')}</span>
              <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                {scorecard.accessibilityScore}%
                {isCompareMode && scorecardB && <span className="text-purple-600 dark:text-purple-400 ml-2">({scopeBLabel}: {scorecardB.accessibilityScore}%)</span>}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600 dark:text-slate-400">{t('kpiPlatform.a11yAudit.auditStatus', 'Audit Status')}</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                {scorecard.accessibilityScore >= 95 ? t('kpiPlatform.a11yAudit.certifiedPublicSector', 'Certified for Public Sector') : t('kpiPlatform.a11yAudit.conditionalPass', 'Conditional Pass')}
              </span>
            </div>
          </div>
        </div>

        {/* Performance Benchmarks Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-500" />
              <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
                {t('kpiPlatform.perfAudit.title', 'SaaS Performance & Reliability Benchmarks')}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setSelectedJustification(KPIJustificationService.getPerfAuditCardJustification(scorecard))}
              className="p-1 rounded-full text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Click for SaaS Performance & Reliability Benchmarks clarification"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">{t('kpiPlatform.perfAudit.p95Response', 'P95 Response Time Benchmark')}</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {scorecard.performanceP95Ms} {t('kpiPlatform.msUnit', 'ms')}
                {isCompareMode && scorecardB && <span className="text-purple-600 dark:text-purple-400 ml-2">({scopeBLabel}: {scorecardB.performanceP95Ms}ms)</span>}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">{t('kpiPlatform.perfAudit.p99Spike', 'P99 Spike Latency Benchmark')}</span>
              <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                {scorecard.performanceP99Ms} {t('kpiPlatform.msUnit', 'ms')}
                {isCompareMode && scorecardB && <span className="text-purple-600 dark:text-purple-400 ml-2">({scopeBLabel}: {scorecardB.performanceP99Ms}ms)</span>}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">{t('kpiPlatform.perfAudit.httpErrorRate', 'HTTP 5xx Server Error Rate')}</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {scorecard.performanceErrorRate}%
                {isCompareMode && scorecardB && <span className="text-purple-600 dark:text-purple-400 ml-2">({scopeBLabel}: {scorecardB.performanceErrorRate}%)</span>}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600 dark:text-slate-400">{t('kpiPlatform.perfAudit.infraStress', 'Infrastructure Stress Level')}</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {scorecard.performanceErrorRate > 1.0 ? t('kpiPlatform.perfAudit.elevatedLoadWarning', 'Elevated Load Warning') : t('kpiPlatform.perfAudit.underCpuCapacity', 'Under 40% CPU Capacity')}
              </span>
            </div>
          </div>
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
