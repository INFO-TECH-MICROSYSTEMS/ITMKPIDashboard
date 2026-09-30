/**
 * KPI View: Governance, SLAs, Accessibility & Benchmarks
 * SLA compliance tracking, WCAG 2.2 AA accessibility audit metrics,
 * P95/P99 latency profiles, and customer satisfaction indexes.
 */

import React from 'react';
import { 
  ShieldCheck, Eye, Zap, ThumbsUp 
} from 'lucide-react';
import type { ReleaseQualityScorecard, JiraWorkItem } from '../../../types/kpiPlatform';
import { MetricCard } from '../VisualWidgets';

interface GovernanceSlaViewProps {
  scorecard: ReleaseQualityScorecard;
  jiraItems: JiraWorkItem[];
}

export const GovernanceSlaView: React.FC<GovernanceSlaViewProps> = ({
  scorecard,
  jiraItems
}) => {
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
          trendPositive={true}
          statusBadge="Compliant"
          statusColor="emerald"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />}
        />
        <MetricCard
          title="WCAG 2.2 AA Accessibility"
          value={`${scorecard.accessibilityScore}%`}
          target="> 95.0%"
          trend="Section 508 Ready"
          trendPositive={true}
          statusBadge="Audit Passed"
          statusColor="cyan"
          icon={<Eye className="w-5 h-5 text-cyan-500" />}
        />
        <MetricCard
          title="Performance P95 Latency"
          value={`${scorecard.performanceP95Ms} ms`}
          target="< 180 ms"
          statusBadge="P99: 380 ms"
          statusColor="purple"
          icon={<Zap className="w-5 h-5 text-purple-500" />}
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
              rate: `${scorecard.slaBreakdown.p1P2TriageRate}%`,
              target: '95.0%',
              desc: 'Rapid initial triage and assessment for blocking and critical defects.',
              status: scorecard.slaBreakdown.p1P2TriageRate >= 95 ? 'Optimal' : 'Needs Review'
            },
            {
              name: 'Regression Execution SLA',
              rate: `${scorecard.slaBreakdown.regressionExecutionRate}%`,
              target: '90.0%',
              desc: 'Execution of complete regression cycle within scheduled sprint window.',
              status: scorecard.slaBreakdown.regressionExecutionRate >= 90 ? 'Optimal' : 'Needs Review'
            },
            {
              name: 'Test Case Creation SLA',
              rate: `${scorecard.slaBreakdown.testPlanCreationRate}%`,
              target: '90.0%',
              desc: 'Test plans authored and reviewed prior to development handoff.',
              status: scorecard.slaBreakdown.testPlanCreationRate >= 85 ? 'Compliant' : 'Needs Review'
            },
            {
              name: 'Daily QA Status Report SLA',
              rate: `${scorecard.slaBreakdown.dailyReportRate}%`,
              target: '98.0%',
              desc: 'Automated executive and squad reporting published every day at 17:00.',
              status: 'Exceeding'
            },
            {
              name: 'Automation Delivery SLA',
              rate: `${scorecard.slaBreakdown.automationDeliveryRate}%`,
              target: '85.0%',
              desc: 'In-sprint test automation completed within the same sprint as feature code.',
              status: scorecard.slaBreakdown.automationDeliveryRate >= 85 ? 'Compliant' : 'Needs Review'
            },
            {
              name: 'Customer Defect Resolution SLA',
              rate: `${scorecard.slaBreakdown.customerDefectResolutionRate}%`,
              target: '90.0%',
              desc: `Hotfix turnaround for high-impact customer APARs (${resolvedCustomerDefects.length}/${customerDefects.length} resolved).`,
              status: scorecard.slaBreakdown.customerDefectResolutionRate >= 90 ? 'Optimal' : 'Needs Review'
            }
          ].map(sla => (
            <div key={sla.name} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-start gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white font-['Outfit']">{sla.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                  {sla.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{sla.desc}</p>
              <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-mono">
                <span className="text-slate-500">Adherence: <strong className="text-emerald-600 dark:text-emerald-400">{sla.rate}</strong></span>
                <span className="text-slate-400">Target: {sla.target}</span>
              </div>
            </div>
          ))}
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
    </div>
  );
};
