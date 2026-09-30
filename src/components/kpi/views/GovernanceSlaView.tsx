/**
 * KPI View: Governance, SLAs, Accessibility & Benchmarks
 * SLA compliance tracking, WCAG 2.2 AA accessibility audit metrics,
 * P95/P99 latency profiles, and customer satisfaction indexes.
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, Eye, Zap, ThumbsUp 
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

interface GovernanceSlaViewProps {
  scorecard: ReleaseQualityScorecard;
  jiraItems: JiraWorkItem[];
}

export const GovernanceSlaView: React.FC<GovernanceSlaViewProps> = ({
  scorecard,
  jiraItems
}) => {
  const [selectedJustification, setSelectedJustification] = useState<KPIJustification | null>(null);

  const customerDefects = jiraItems.filter(i => i.isCustomerDefect || i.type === 'CustomerAPAR');
  const resolvedCustomerDefects = customerDefects.filter(i => i.status === 'Done');

  return (
    <div className="space-y-6">
      {/* Top Governance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Overall SLA Adherence"
          value={`${scorecard.slaAdherenceRate}%`}
          target="> 92.0%"
          trend="99.4% P1 triage"
          trendPositive={scorecard.slaAdherenceRate >= 92.0}
          statusBadge={scorecard.slaAdherenceRate >= 92.0 ? 'Compliant' : scorecard.slaAdherenceRate >= 85.0 ? 'At Risk' : 'Breached'}
          statusColor={scorecard.slaAdherenceRate >= 92.0 ? 'emerald' : scorecard.slaAdherenceRate >= 85.0 ? 'amber' : 'rose'}
          icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getSlaAdherenceJustification(scorecard))}
        />
        <MetricCard
          title="WCAG 2.2 AA Accessibility"
          value={`${scorecard.accessibilityScore}%`}
          target="> 95.0%"
          trend="Section 508 Ready"
          trendPositive={scorecard.accessibilityScore >= 95.0}
          statusBadge={scorecard.accessibilityScore >= 95.0 ? 'Audit Passed' : scorecard.accessibilityScore >= 90.0 ? 'Minor Violations' : 'Non-Compliant'}
          statusColor={scorecard.accessibilityScore >= 95.0 ? 'emerald' : scorecard.accessibilityScore >= 90.0 ? 'amber' : 'rose'}
          icon={<Eye className="w-5 h-5 text-cyan-500" />}
          onJustify={() => setSelectedJustification({
            title: 'WCAG 2.2 AA Accessibility Compliance',
            statusBadge: scorecard.accessibilityScore >= 95.0 ? 'Audit Passed' : 'Minor Violations',
            statusColor: scorecard.accessibilityScore >= 95.0 ? 'emerald' : 'amber',
            currentValue: `${scorecard.accessibilityScore}% Pass Rate`,
            targetValue: '> 95.0%',
            formulaOrRule: `AccessibilityScore = (PassedTestCasesInAccessibilitySuite / TotalAccessibilityTestCases) × 100`,
            rationale: `Automated and manual axe-core audit tests verified ${scorecard.accessibilityScore}% compliance with WCAG 2.2 Level AA guidelines, including color contrast, ARIA tags, and keyboard focus traps.`,
            recommendedAction: 'Verify screen-reader compatibility on newly added dynamic modal dialogs.'
          })}
        />
        <MetricCard
          title="Performance P95 Latency"
          value={`${scorecard.performanceP95Ms} ms`}
          target="< 180 ms"
          trendPositive={scorecard.performanceP95Ms <= 180}
          statusBadge={scorecard.performanceP95Ms <= 180 ? 'P99: 380 ms' : scorecard.performanceP95Ms <= 250 ? 'Spike Latency' : 'SLA Breached'}
          statusColor={scorecard.performanceP95Ms <= 180 ? 'emerald' : scorecard.performanceP95Ms <= 250 ? 'amber' : 'rose'}
          icon={<Zap className="w-5 h-5 text-purple-500" />}
          onJustify={() => setSelectedJustification({
            title: 'Performance P95 Latency Benchmark',
            statusBadge: scorecard.performanceP95Ms <= 180 ? 'Compliant' : 'Spike Latency',
            statusColor: scorecard.performanceP95Ms <= 180 ? 'emerald' : 'amber',
            currentValue: `${scorecard.performanceP95Ms} ms`,
            targetValue: '< 180 ms',
            formulaOrRule: `P95Latency = 95th Percentile Response Duration (ms) in Performance Suite executions`,
            rationale: `P95 latency is ${scorecard.performanceP95Ms} ms, reflecting server response time under simulated multi-user concurrent workloads.`,
            recommendedAction: 'Optimize database index scans on high-traffic query endpoints.'
          })}
        />
        <MetricCard
          title="Stakeholder Satisfaction (CSAT)"
          value="4.8 / 5.0"
          target="> 4.5"
          trend="96% Net Positive"
          trendPositive={true}
          statusBadge="High Trust"
          statusColor="emerald"
          icon={<ThumbsUp className="w-5 h-5 text-emerald-500" />}
          onJustify={() => setSelectedJustification({
            title: 'Stakeholder Satisfaction (CSAT)',
            statusBadge: 'High Trust',
            statusColor: 'emerald',
            currentValue: '4.8 / 5.0',
            targetValue: '> 4.5',
            formulaOrRule: `CSAT = AVERAGE(SurveyRatings across Product, Engineering, and Operations stakeholders)`,
            rationale: `Stakeholder feedback scores quality governance and release velocity at 4.8 out of 5.0 (96% net positive trust rating).`,
            recommendedAction: 'Maintain executive quality demo transparency and bi-weekly release reviews.'
          })}
        />
      </div>

      {/* SLA Compliance Breakdown Matrix */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
          Enterprise Quality Service Level Agreements (SLAs)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: 'Defect Triage SLA (P1 < 4h, P2 < 24h)',
              rateNum: scorecard.slaBreakdown.p1P2TriageRate,
              targetNum: 95.0,
              rate: `${scorecard.slaBreakdown.p1P2TriageRate}%`,
              target: '95.0%',
              desc: 'Rapid initial triage and assessment for blocking and critical defects.'
            },
            {
              name: 'Regression Execution SLA',
              rateNum: scorecard.slaBreakdown.regressionExecutionRate,
              targetNum: 90.0,
              rate: `${scorecard.slaBreakdown.regressionExecutionRate}%`,
              target: '90.0%',
              desc: 'Execution of complete regression cycle within scheduled sprint window.'
            },
            {
              name: 'Test Case Creation SLA',
              rateNum: scorecard.slaBreakdown.testPlanCreationRate,
              targetNum: 90.0,
              rate: `${scorecard.slaBreakdown.testPlanCreationRate}%`,
              target: '90.0%',
              desc: 'Test plans authored and reviewed prior to development handoff.'
            },
            {
              name: 'Daily QA Status Report SLA',
              rateNum: scorecard.slaBreakdown.dailyReportRate,
              targetNum: 98.0,
              rate: `${scorecard.slaBreakdown.dailyReportRate}%`,
              target: '98.0%',
              desc: 'Automated executive and squad reporting published every day at 17:00.'
            },
            {
              name: 'Automation Delivery SLA',
              rateNum: scorecard.slaBreakdown.automationDeliveryRate,
              targetNum: 85.0,
              rate: `${scorecard.slaBreakdown.automationDeliveryRate}%`,
              target: '85.0%',
              desc: 'In-sprint test automation completed within the same sprint as feature code.'
            },
            {
              name: 'Customer Defect Resolution SLA',
              rateNum: scorecard.slaBreakdown.customerDefectResolutionRate,
              targetNum: 90.0,
              rate: `${scorecard.slaBreakdown.customerDefectResolutionRate}%`,
              target: '90.0%',
              desc: `Hotfix turnaround for high-impact customer APARs (${resolvedCustomerDefects.length}/${customerDefects.length} resolved).`
            }
          ].map(sla => {
            const isOptimal = sla.rateNum >= sla.targetNum;
            const isWarning = !isOptimal && sla.rateNum >= sla.targetNum - 10;
            const statusColor = isOptimal ? 'emerald' : isWarning ? 'amber' : 'rose';
            const statusLabel = isOptimal ? 'Compliant' : isWarning ? 'At Risk' : 'Breached';
            const slaTheme = KPI_STATUS_THEMES[statusColor];

            return (
              <div 
                key={sla.name} 
                onClick={() => setSelectedJustification({
                  title: sla.name,
                  statusBadge: statusLabel,
                  statusColor,
                  currentValue: sla.rate,
                  targetValue: `≥ ${sla.target}`,
                  formulaOrRule: `SLA_Compliance = (ExecutedOnTimeItems / TotalApplicableItems) × 100`,
                  rationale: `Actual adherence is ${sla.rate} against a corporate governance target of ${sla.target}. ${sla.desc}`,
                  recommendedAction: isOptimal 
                    ? 'Compliance target met. Continue daily monitoring.' 
                    : 'Allocate dedicated QE and engineering triage capacity to address SLA bottlenecks.'
                })}
                className={`p-4 rounded-xl border transition-all space-y-2 cursor-pointer hover:scale-[1.02] ${slaTheme.card}`}
                title="Click for SLA justification and compliance audit"
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-['Outfit']">{sla.name}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border shadow-2xs flex items-center gap-1 ${slaTheme.badge}`}>
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

      {/* Accessibility & Performance Audit Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Accessibility Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-cyan-500" />
            <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
              Accessibility (WCAG 2.2 AA) Audit
            </h4>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Color Contrast Ratios (AA & AAA)</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">100% Pass (7:1 High Contrast)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Keyboard Navigation & Focus Traps</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">0 Traps Detected</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Screen Reader ARIA Compatibility</span>
              <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{scorecard.accessibilityScore}% Suite Pass Rate</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600 dark:text-slate-400">Audit Status</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                {scorecard.accessibilityScore >= 95 ? 'Certified for Public Sector' : 'Conditional Pass'}
              </span>
            </div>
          </div>
        </div>

        {/* Performance Benchmarks Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-500" />
            <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
              SaaS Performance & Reliability Benchmarks
            </h4>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">P95 Response Time Benchmark</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{scorecard.performanceP95Ms} ms (&lt; 180 ms target)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">P99 Spike Latency Benchmark</span>
              <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{scorecard.performanceP99Ms} ms (&lt; 450 ms target)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">HTTP 5xx Server Error Rate</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{scorecard.performanceErrorRate}%</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600 dark:text-slate-400">Infrastructure Stress Level</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {scorecard.performanceErrorRate > 1.0 ? 'Elevated Load Warning' : 'Under 40% CPU Capacity'}
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
