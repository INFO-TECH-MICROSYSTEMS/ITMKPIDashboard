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
 * Seamlessly supports both single-scope analysis and vertically stacked (Scope 1 on top of Scope 2) comparison.
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
}

export const GovernanceSlaView: React.FC<GovernanceSlaViewProps> = ({
  scorecard,
  jiraItems,
  isCompareMode = false,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  metricsB
}) => {
  const { t } = useTranslation();
  const [selectedJustification, setSelectedJustification] = useState<KPIJustification | null>(null);

  // Scope 1 items
  const customerDefects = jiraItems.filter(i => i.isCustomerDefect || i.type === 'CustomerAPAR');
  const resolvedCustomerDefects = customerDefects.filter(i => i.status === 'Done');

  // Scope 2 scorecard
  const scorecardB = metricsB?.executiveScorecard;

  return (
    <div className="space-y-6">
      {/* Top Governance Cards: Vertically Stacked Metric Cards (Scope 1 on Top of Scope 2) */}
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
          compareStatusBadge={scorecardB ? (scorecardB.slaAdherenceRate >= 92.0 ? 'Compliant' : scorecardB.slaAdherenceRate >= 85.0 ? 'At Risk' : 'Breached') : undefined}
          compareStatusColor={scorecardB ? (scorecardB.slaAdherenceRate >= 92.0 ? 'emerald' : scorecardB.slaAdherenceRate >= 85.0 ? 'amber' : 'rose') : undefined}
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
          compareStatusBadge={scorecardB ? (scorecardB.accessibilityScore >= 95.0 ? 'Audit Passed' : scorecardB.accessibilityScore >= 90.0 ? 'Minor Violations' : 'Non-Compliant') : undefined}
          compareStatusColor={scorecardB ? (scorecardB.accessibilityScore >= 95.0 ? 'emerald' : scorecardB.accessibilityScore >= 90.0 ? 'amber' : 'rose') : undefined}
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
          compareStatusBadge={scorecardB ? (scorecardB.performanceP95Ms <= 180 ? `P99: ${scorecardB.performanceP99Ms}ms` : scorecardB.performanceP95Ms <= 250 ? 'Spike Latency' : 'Breached') : undefined}
          compareStatusColor={scorecardB ? (scorecardB.performanceP95Ms <= 180 ? 'emerald' : scorecardB.performanceP95Ms <= 250 ? 'amber' : 'rose') : undefined}
          delta={scorecardB !== undefined ? `${(scorecard.performanceP95Ms - scorecardB.performanceP95Ms) > 0 ? '+' : ''}${scorecard.performanceP95Ms - scorecardB.performanceP95Ms} ms` : undefined}
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
          delta={isCompareMode ? '+0.1 CSAT' : undefined}
          deltaPositive={true}
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
          delta={isCompareMode ? '$0 diff' : undefined}
          deltaPositive={true}
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
          compareValue="99.1%"
          compareStatusBadge="Audit Verified"
          compareStatusColor="emerald"
          delta={isCompareMode ? '+0.3%' : undefined}
          deltaPositive={true}
        />
      </div>

      {/* SLA Compliance Breakdown Matrix: Scope 1 */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
            {t('kpiPlatform.governanceView.slaMatrixTitle')} {isCompareMode ? `— ${scopeALabel}` : ''}
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
              targetNum: 95.0,
              rate: `${scorecard.slaBreakdown.p1P2TriageRate}%`,
              target: '95.0%',
              desc: t('kpiPlatform.slaItems.defectTriageDesc', 'Rapid initial triage and assessment for blocking and critical defects.')
            },
            {
              id: 'regressionExec',
              name: t('kpiPlatform.slaItems.regressionExecName', 'Regression Execution SLA'),
              rateNum: scorecard.slaBreakdown.regressionExecutionRate,
              targetNum: 90.0,
              rate: `${scorecard.slaBreakdown.regressionExecutionRate}%`,
              target: '90.0%',
              desc: t('kpiPlatform.slaItems.regressionExecDesc', 'Execution of complete regression cycle within scheduled sprint window.')
            },
            {
              id: 'testCreation',
              name: t('kpiPlatform.slaItems.testCreationName', 'Test Case Creation SLA'),
              rateNum: scorecard.slaBreakdown.testPlanCreationRate,
              targetNum: 90.0,
              rate: `${scorecard.slaBreakdown.testPlanCreationRate}%`,
              target: '90.0%',
              desc: t('kpiPlatform.slaItems.testCreationDesc', 'Test plans authored and reviewed prior to development handoff.')
            },
            {
              id: 'dailyReport',
              name: t('kpiPlatform.slaItems.dailyReportName', 'Daily QA Status Report SLA'),
              rateNum: scorecard.slaBreakdown.dailyReportRate,
              targetNum: 98.0,
              rate: `${scorecard.slaBreakdown.dailyReportRate}%`,
              target: '98.0%',
              desc: t('kpiPlatform.slaItems.dailyReportDesc', 'Automated executive and squad reporting published every day at 17:00.')
            },
            {
              id: 'autoDelivery',
              name: t('kpiPlatform.slaItems.autoDeliveryName', 'Automation Delivery SLA'),
              rateNum: scorecard.slaBreakdown.automationDeliveryRate,
              targetNum: 85.0,
              rate: `${scorecard.slaBreakdown.automationDeliveryRate}%`,
              target: '85.0%',
              desc: t('kpiPlatform.slaItems.autoDeliveryDesc', 'In-sprint test automation completed within the same sprint as feature code.')
            },
            {
              id: 'customerResolution',
              name: t('kpiPlatform.slaItems.customerResolutionName', 'Customer Defect Resolution SLA'),
              rateNum: scorecard.slaBreakdown.customerDefectResolutionRate,
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
                  <span className="text-slate-500 dark:text-slate-400">{t('kpiPlatform.governanceView.adherenceLabel', 'Adherence')}: <strong className={slaTheme.value}>{sla.rate}</strong></span>
                  <span className="text-slate-500 dark:text-slate-400">{t('kpiPlatform.governanceView.targetSlaLabel', 'Target')}: {sla.target}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SLA Compliance Breakdown Matrix: Scope 2 Stacked Below */}
      {isCompareMode && scorecardB && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/50 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-purple-100 dark:border-purple-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <h4 className="text-base font-bold font-['Outfit'] text-purple-900 dark:text-purple-200">
                {t('kpiPlatform.governanceView.slaMatrixTitle')} — {scopeBLabel}
              </h4>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800">
              SLA Audit
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                id: 'defectTriage',
                name: 'Defect Triage SLA (P1 < 4h, P2 < 24h)',
                rateNum: scorecardB.slaBreakdown.p1P2TriageRate,
                targetNum: 95.0,
                rate: `${scorecardB.slaBreakdown.p1P2TriageRate}%`,
                target: '95.0%',
                desc: 'Rapid initial triage and assessment for blocking and critical defects.'
              },
              {
                id: 'regressionExec',
                name: 'Regression Execution SLA',
                rateNum: scorecardB.slaBreakdown.regressionExecutionRate,
                targetNum: 90.0,
                rate: `${scorecardB.slaBreakdown.regressionExecutionRate}%`,
                target: '90.0%',
                desc: 'Execution of complete regression cycle within scheduled sprint window.'
              },
              {
                id: 'testCreation',
                name: 'Test Case Creation SLA',
                rateNum: scorecardB.slaBreakdown.testPlanCreationRate,
                targetNum: 90.0,
                rate: `${scorecardB.slaBreakdown.testPlanCreationRate}%`,
                target: '90.0%',
                desc: 'Test plans authored and reviewed prior to development handoff.'
              },
              {
                id: 'dailyReport',
                name: 'Daily QA Status Report SLA',
                rateNum: scorecardB.slaBreakdown.dailyReportRate,
                targetNum: 98.0,
                rate: `${scorecardB.slaBreakdown.dailyReportRate}%`,
                target: '98.0%',
                desc: 'Automated executive and squad reporting published every day at 17:00.'
              },
              {
                id: 'autoDelivery',
                name: 'Automation Delivery SLA',
                rateNum: scorecardB.slaBreakdown.automationDeliveryRate,
                targetNum: 85.0,
                rate: `${scorecardB.slaBreakdown.automationDeliveryRate}%`,
                target: '85.0%',
                desc: 'In-sprint test automation completed within the same sprint as feature code.'
              },
              {
                id: 'customerResolution',
                name: 'Customer Defect Resolution SLA',
                rateNum: scorecardB.slaBreakdown.customerDefectResolutionRate,
                targetNum: 90.0,
                rate: `${scorecardB.slaBreakdown.customerDefectResolutionRate}%`,
                target: '90.0%',
                desc: 'Hotfix turnaround for high-impact customer APARs.'
              }
            ].map(sla => {
              const isOptimal = sla.rateNum >= sla.targetNum;
              const isWarning = !isOptimal && sla.rateNum >= sla.targetNum - 10;
              const statusColor = isOptimal ? 'emerald' : isWarning ? 'amber' : 'rose';
              const statusLabel = isOptimal ? 'Compliant' : isWarning ? 'At Risk' : 'Breached';
              const slaTheme = KPI_STATUS_THEMES[statusColor];

              return (
                <div 
                  key={sla.id} 
                  className={`p-4 rounded-xl border transition-all space-y-2 ${slaTheme.card}`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-['Outfit'] truncate">{sla.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border shadow-2xs flex items-center gap-1 shrink-0 ${slaTheme.badge}`}>
                      <span>{statusLabel}</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">{sla.desc}</p>
                  <div className={`flex justify-between items-center pt-2 border-t text-xs font-mono ${slaTheme.footerBorder}`}>
                    <span className="text-slate-500 dark:text-slate-400">Adherence: <strong className={slaTheme.value}>{sla.rate}</strong></span>
                    <span className="text-slate-500 dark:text-slate-400">Target: {sla.target}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Accessibility & Performance Audit Details: Scope 1 on top of Scope 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Accessibility Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
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

          {/* Primary A11y */}
          <div className="space-y-2 text-xs">
            {isCompareMode && (
              <span className="text-[11px] font-mono font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <span>{scopeALabel}</span>
              </span>
            )}
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
              <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{scorecard.accessibilityScore}% {t('kpiPlatform.a11yAudit.suitePassRate', 'Suite Pass Rate')}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600 dark:text-slate-400">{t('kpiPlatform.a11yAudit.auditStatus', 'Audit Status')}</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                {scorecard.accessibilityScore >= 95 ? t('kpiPlatform.a11yAudit.certifiedPublicSector', 'Certified for Public Sector') : t('kpiPlatform.a11yAudit.conditionalPass', 'Conditional Pass')}
              </span>
            </div>
          </div>

          {/* Comparative A11y Stacked Below */}
          {isCompareMode && scorecardB && (
            <div className="space-y-2 text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-mono font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>{scopeBLabel}</span>
              </span>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Screen Reader ARIA Compatibility</span>
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{scorecardB.accessibilityScore}% Pass</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600 dark:text-slate-400">Audit Status</span>
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                  {scorecardB.accessibilityScore >= 95 ? 'Certified' : 'Conditional'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Performance Benchmarks Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
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

          {/* Primary Perf */}
          <div className="space-y-2 text-xs">
            {isCompareMode && (
              <span className="text-[11px] font-mono font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <span>{scopeALabel}</span>
              </span>
            )}
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">{t('kpiPlatform.perfAudit.p95Response', 'P95 Response Time Benchmark')}</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{scorecard.performanceP95Ms} {t('kpiPlatform.msUnit', 'ms')} (&lt; 180 {t('kpiPlatform.perfAudit.msTarget', 'ms target')})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">{t('kpiPlatform.perfAudit.p99Spike', 'P99 Spike Latency Benchmark')}</span>
              <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{scorecard.performanceP99Ms} {t('kpiPlatform.msUnit', 'ms')} (&lt; 450 {t('kpiPlatform.perfAudit.msTarget', 'ms target')})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">{t('kpiPlatform.perfAudit.httpErrorRate', 'HTTP 5xx Server Error Rate')}</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{scorecard.performanceErrorRate}%</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600 dark:text-slate-400">{t('kpiPlatform.perfAudit.infraStress', 'Infrastructure Stress Level')}</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {scorecard.performanceErrorRate > 1.0 ? t('kpiPlatform.perfAudit.elevatedLoadWarning', 'Elevated Load Warning') : t('kpiPlatform.perfAudit.underCpuCapacity', 'Under 40% CPU Capacity')}
              </span>
            </div>
          </div>

          {/* Comparative Perf Stacked Below */}
          {isCompareMode && scorecardB && (
            <div className="space-y-2 text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-mono font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>{scopeBLabel}</span>
              </span>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">P95 Response Time</span>
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{scorecardB.performanceP95Ms} ms</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600 dark:text-slate-400">HTTP 5xx Server Error Rate</span>
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{scorecardB.performanceErrorRate}%</span>
              </div>
            </div>
          )}
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
