/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { 
  AlertTriangle, TrendingUp, Activity, 
  Clock, RefreshCw, Cpu, Compass 
} from 'lucide-react';
import { BaseStatCardWidget } from '../base/BaseStatCardWidget';
import { BaseGaugeWidget } from '../base/BaseGaugeWidget';
import { BaseChartWidget } from '../base/BaseChartWidget';
import type { KPIWidgetRenderProps } from '../registry/kpiRegistry';

/**
 * Concrete KPI Component: Release Readiness Score Gauge
 */
export const ExecutiveReadinessGaugeKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  onJustifyMetric,
  ...props
}) => {
  const score = Math.round(metrics.releaseReadinessScore || 0);
  return (
    <BaseGaugeWidget
      id="executive-readiness-gauge"
      title="Release Readiness Score"
      subtitle="Delivery Quality & Gate Posture"
      score={score}
      grade={metrics.readinessGrade || 'B+'}
      label="Composite Gate Reliability Index"
      onJustify={() => onJustifyMetric?.('releaseReadinessScore')}
      {...props}
    />
  );
};

/**
 * Concrete KPI Component: Blocker & Gating Defects Card
 */
export const ExecutiveBlockerCardKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  onJustifyMetric,
  ...props
}) => {
  const blockerCount = metrics.blockerDefectsCount ?? 0;
  return (
    <BaseStatCardWidget
      id="executive-blocker-card"
      title="Gating & Blocker Defects"
      subtitle="Active P1/P2 Release Blockers"
      value={blockerCount}
      target="0 Target"
      statusBadge={blockerCount === 0 ? 'Optimal' : blockerCount <= 2 ? 'Warning' : 'Critical'}
      statusColor={blockerCount === 0 ? 'emerald' : blockerCount <= 2 ? 'amber' : 'rose'}
      trend={blockerCount > 0 ? '+1 vs sprint commitment' : 'Stable'}
      trendPositive={blockerCount === 0}
      icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
      isComparing={isCompareMode}
      compareValue={metricsB?.blockerDefectsCount}
      compareStatusBadge={metricsB?.blockerDefectsCount === 0 ? 'Optimal' : 'Warning'}
      compareStatusColor={metricsB?.blockerDefectsCount === 0 ? 'emerald' : 'amber'}
      onJustify={() => onJustifyMetric?.('blockerDefects')}
      {...props}
    />
  );
};

/**
 * Concrete KPI Component: Lead Time For Changes Card
 */
export const ExecutiveDoraLeadTimeKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  onJustifyMetric,
  ...props
}) => {
  const leadTimeHours = metrics.leadTimeHours ?? 42.4;
  return (
    <BaseStatCardWidget
      id="executive-dora-lead-time"
      title="Lead Time for Changes"
      subtitle="Commit to Deploy Turnaround"
      value={`${leadTimeHours.toFixed(1)} hrs`}
      target="< 48.0 hrs"
      statusBadge="Healthy"
      statusColor="emerald"
      trend="-8.2% vs previous release"
      trendPositive={true}
      icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
      isComparing={isCompareMode}
      compareValue={metricsB ? `${metricsB.leadTimeHours?.toFixed(1)} hrs` : undefined}
      onJustify={() => onJustifyMetric?.('leadTimeHours')}
      {...props}
    />
  );
};

/**
 * Concrete KPI Component: Delivery Health & Volatility Card
 */
export const ExecutiveDeliveryHealthKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  onJustifyMetric,
  ...props
}) => {
  const churn = metrics.sprintChurnRate ?? 14.2;
  return (
    <BaseStatCardWidget
      id="executive-delivery-health-card"
      title="Sprint Scope Volatility"
      subtitle="Post-Lockdown Scope Injection"
      value={`${churn.toFixed(1)}%`}
      target="< 15.0%"
      statusBadge="Controlled"
      statusColor="cyan"
      trend="+2.1% injected scope"
      trendPositive={false}
      icon={<Activity className="w-5 h-5 text-cyan-500" />}
      isComparing={isCompareMode}
      compareValue={metricsB ? `${metricsB.sprintChurnRate?.toFixed(1)}%` : undefined}
      onJustify={() => onJustifyMetric?.('sprintChurnRate')}
      {...props}
    />
  );
};

/**
 * Concrete KPI Component: Defect Burnout & Discovery Trend Chart
 */
export const QualityDefectBurnoutChartKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  onJustifyMetric,
  ...props
}) => {
  const trendData = metrics.defectBurnoutTrend || [
    { date: '2026-10-01', label: 'Day 1', value1: 24, value2: 18, value3: 6 },
    { date: '2026-10-03', label: 'Day 3', value1: 32, value2: 25, value3: 7 },
    { date: '2026-10-06', label: 'Day 6', value1: 45, value2: 38, value3: 7 },
    { date: '2026-10-09', label: 'Day 9', value1: 52, value2: 48, value3: 4 },
    { date: '2026-10-12', label: 'Day 12', value1: 58, value2: 56, value3: 2 }
  ];

  return (
    <BaseChartWidget
      id="quality-defect-burnout-chart"
      title="Defect Burnout & Discovery Trend"
      subtitle="Discovered Bugs vs Verified Closed"
      data={trendData}
      series1Name="Discovered"
      series2Name="Resolved"
      series3Name="Active Backlog"
      series1Color="#f43f5e"
      series2Color="#10b981"
      series3Color="#f59e0b"
      height={170}
      onJustify={() => onJustifyMetric?.('defectBurnoutTrend')}
      {...props}
    />
  );
};

/**
 * Concrete KPI Component: Mean Time to Resolution (MTTR) Card
 */
export const QualityMttrCardKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  onJustifyMetric,
  ...props
}) => {
  const mttr = metrics.meanTimeToResolutionHours ?? 18.5;
  return (
    <BaseStatCardWidget
      id="quality-mttr-card"
      title="Mean Time to Resolution (MTTR)"
      subtitle="Average Defect Fix & Close Window"
      value={`${mttr.toFixed(1)} hrs`}
      target="< 24.0 hrs"
      statusBadge="Optimal"
      statusColor="emerald"
      trend="-4.3 hrs faster"
      trendPositive={true}
      icon={<Clock className="w-5 h-5 text-indigo-500" />}
      isComparing={isCompareMode}
      compareValue={metricsB ? `${metricsB.meanTimeToResolutionHours?.toFixed(1)} hrs` : undefined}
      onJustify={() => onJustifyMetric?.('meanTimeToResolutionHours')}
      {...props}
    />
  );
};

/**
 * Concrete KPI Component: Defect Reopen Rate Card
 */
export const QualityReopenRateCardKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  onJustifyMetric,
  ...props
}) => {
  const reopenRate = metrics.defectReopenRate ?? 4.8;
  return (
    <BaseStatCardWidget
      id="quality-reopen-rate-card"
      title="Defect Reopen Rate"
      subtitle="Verification Rejection Rate"
      value={`${reopenRate.toFixed(1)}%`}
      target="< 5.0%"
      statusBadge="Within Spec"
      statusColor="emerald"
      trend="-1.2% regression drop"
      trendPositive={true}
      icon={<RefreshCw className="w-5 h-5 text-cyan-500" />}
      isComparing={isCompareMode}
      compareValue={metricsB ? `${metricsB.defectReopenRate?.toFixed(1)}%` : undefined}
      onJustify={() => onJustifyMetric?.('defectReopenRate')}
      {...props}
    />
  );
};

/**
 * Concrete KPI Component: Untested Code Commits Card
 */
export const RiskUntestedCommitsCardKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  onJustifyMetric,
  ...props
}) => {
  const untested = metrics.untestedCommitsCount ?? 2;
  return (
    <BaseStatCardWidget
      id="risk-untested-commits-card"
      title="Untested Code Commits"
      subtitle="Mainline Merges Lacking Automation"
      value={untested}
      target="0 Desired"
      statusBadge={untested === 0 ? 'Compliant' : 'Risk Flag'}
      statusColor={untested === 0 ? 'emerald' : 'amber'}
      trend={untested > 0 ? '+2 unverified PRs' : 'Clean'}
      trendPositive={untested === 0}
      icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
      isComparing={isCompareMode}
      compareValue={metricsB?.untestedCommitsCount}
      onJustify={() => onJustifyMetric?.('untestedCommits')}
      {...props}
    />
  );
};

/**
 * Concrete KPI Component: High Complexity Hotspots Card
 */
export const RiskHotspotFilesCardKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  onJustifyMetric,
  ...props
}) => {
  const hotspots = metrics.hotspotModulesCount ?? 4;
  return (
    <BaseStatCardWidget
      id="risk-hotspot-files-card"
      title="High Complexity Hotspots"
      subtitle="Modules with Recurring Defect Density"
      value={hotspots}
      target="< 5 Modules"
      statusBadge="Monitored"
      statusColor="cyan"
      trend="Identified in PR analysis"
      trendPositive={true}
      icon={<Cpu className="w-5 h-5 text-purple-500" />}
      isComparing={isCompareMode}
      compareValue={metricsB?.hotspotModulesCount}
      onJustify={() => onJustifyMetric?.('hotspotModules')}
      {...props}
    />
  );
};

/**
 * Concrete KPI Component: Automated Test Suite Pass Rate Gauge
 */
export const AutomationPassRateGaugeKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  onJustifyMetric,
  ...props
}) => {
  const passRate = Math.round(metrics.automationPassRate ?? 92.5);
  return (
    <BaseGaugeWidget
      id="automation-pass-rate-gauge"
      title="Automated Suite Pass Rate"
      subtitle="CI/CD Nightly Pipeline Health"
      score={passRate}
      gaugeStatus="emerald"
      label="Target SLA: >= 90%"
      onJustify={() => onJustifyMetric?.('automationPassRate')}
      {...props}
    />
  );
};

/**
 * Concrete KPI Component: Flaky Test Cases Detected Card
 */
export const AutomationFlakyTestsCardKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  onJustifyMetric,
  ...props
}) => {
  const flaky = metrics.flakyTestCount ?? 3;
  return (
    <BaseStatCardWidget
      id="automation-flaky-tests-card"
      title="Flaky Test Cases Detected"
      subtitle="Intermittent CI Pipeline Failures"
      value={flaky}
      target="0 Flaky Target"
      statusBadge={flaky <= 3 ? 'Quarantined' : 'Needs Fix'}
      statusColor={flaky <= 3 ? 'amber' : 'rose'}
      trend="-1 flaky test resolved"
      trendPositive={true}
      icon={<Cpu className="w-5 h-5 text-amber-500" />}
      isComparing={isCompareMode}
      compareValue={metricsB?.flakyTestCount}
      onJustify={() => onJustifyMetric?.('flakyTests')}
      {...props}
    />
  );
};

/**
 * Concrete KPI Component: CI Test Execution Runtime Card
 */
export const AutomationRuntimeCardKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  onJustifyMetric,
  ...props
}) => {
  const duration = metrics.ciRuntimeMinutes ?? 14.5;
  return (
    <BaseStatCardWidget
      id="automation-runtime-card"
      title="CI Test Execution Runtime"
      subtitle="P95 Full Regression Duration"
      value={`${duration.toFixed(1)} min`}
      target="< 20.0 min"
      statusBadge="High Speed"
      statusColor="emerald"
      trend="-2.4 min faster parallelization"
      trendPositive={true}
      icon={<Clock className="w-5 h-5 text-cyan-500" />}
      isComparing={isCompareMode}
      compareValue={metricsB ? `${metricsB.ciRuntimeMinutes?.toFixed(1)} min` : undefined}
      onJustify={() => onJustifyMetric?.('ciRuntimeMinutes')}
      {...props}
    />
  );
};

/**
 * Concrete KPI Component: Sprint Story Points Delivered Card
 */
export const ProductivityVelocityCardKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  onJustifyMetric,
  ...props
}) => {
  const points = metrics.completedStoryPoints ?? 142;
  return (
    <BaseStatCardWidget
      id="productivity-velocity-card"
      title="Sprint Story Points Delivered"
      subtitle="Quality Assured Velocity"
      value={`${points} pts`}
      target="135 Planned"
      statusBadge="Surpassed"
      statusColor="emerald"
      trend="+5.2% squad velocity"
      trendPositive={true}
      icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
      isComparing={isCompareMode}
      compareValue={metricsB ? `${metricsB.completedStoryPoints} pts` : undefined}
      onJustify={() => onJustifyMetric?.('completedStoryPoints')}
      {...props}
    />
  );
};

/**
 * Concrete KPI Component: Daily Test Execution Rate Card
 */
export const ProductivityTestExecutionRateKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  onJustifyMetric,
  ...props
}) => {
  const rate = metrics.dailyExecutionRate ?? 28.4;
  return (
    <BaseStatCardWidget
      id="productivity-test-execution-rate"
      title="Daily Test Execution Rate"
      subtitle="Validated Tests per Engineer / Day"
      value={`${rate.toFixed(1)}`}
      target=">= 25.0 / day"
      statusBadge="Target Met"
      statusColor="emerald"
      trend="Steady throughput"
      trendPositive={true}
      icon={<Activity className="w-5 h-5 text-indigo-500" />}
      isComparing={isCompareMode}
      compareValue={metricsB ? `${metricsB.dailyExecutionRate?.toFixed(1)}` : undefined}
      onJustify={() => onJustifyMetric?.('dailyExecutionRate')}
      {...props}
    />
  );
};

/**
 * Concrete KPI Component: P1/P2 SLA Adherence Gauge
 */
export const GovernanceSlaGaugeKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  onJustifyMetric,
  ...props
}) => {
  const adherence = Math.round(metrics.slaAdherencePercent ?? 96.8);
  return (
    <BaseGaugeWidget
      id="governance-sla-gauge"
      title="P1/P2 SLA Adherence"
      subtitle="Resolution Compliance"
      score={adherence}
      gaugeStatus="emerald"
      label="Contractual Baseline: >= 95%"
      onJustify={() => onJustifyMetric?.('slaAdherencePercent')}
      {...props}
    />
  );
};

/**
 * Concrete KPI Component: WCAG 2.2 AA Accessibility Compliance Card
 */
export const GovernanceAccessibilityCardKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  onJustifyMetric,
  ...props
}) => {
  const wcagScore = metrics.accessibilityScore ?? 98.4;
  return (
    <BaseStatCardWidget
      id="governance-accessibility-card"
      title="WCAG 2.2 AA Compliance"
      subtitle="Digital Usability & Screen Reader Audit"
      value={`${wcagScore.toFixed(1)}%`}
      target="100% Target"
      statusBadge="Certified"
      statusColor="emerald"
      trend="Zero blocking aria deficits"
      trendPositive={true}
      icon={<Compass className="w-5 h-5 text-purple-500" />}
      isComparing={isCompareMode}
      compareValue={metricsB ? `${metricsB.accessibilityScore?.toFixed(1)}%` : undefined}
      onJustify={() => onJustifyMetric?.('accessibilityScore')}
      {...props}
    />
  );
};

/**
 * Concrete KPI Component: Escape Prevention Ratio Gauge
 */
export const LeadingEscapePreventionGaugeKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  onJustifyMetric,
  ...props
}) => {
  const escapeRatio = Math.round(metrics.escapePreventionRatio ?? 94.6);
  return (
    <BaseGaugeWidget
      id="leading-escape-prevention-gauge"
      title="Escape Prevention Ratio"
      subtitle="Near-Miss Interception Rate"
      score={escapeRatio}
      gaugeStatus="emerald"
      label="Intercepted Prior to Production"
      onJustify={() => onJustifyMetric?.('escapePreventionRatio')}
      {...props}
    />
  );
};

/**
 * Concrete KPI Component: Estimated Avoided Outage Cost Card
 */
export const LeadingAvoidedCostCardKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  onJustifyMetric,
  ...props
}) => {
  const cost = metrics.totalAvoidedOutageCost ?? 184500;
  return (
    <BaseStatCardWidget
      id="leading-avoided-cost-card"
      title="Estimated Averted Outage Cost"
      subtitle="Financial ROI of Proactive QA Gates"
      value={`$${(cost / 1000).toFixed(0)}k`}
      statusBadge="High Value"
      statusColor="emerald"
      trend={`Based on ${metrics.totalAvoidedDowntimeHours || 12} hrs averted downtime`}
      trendPositive={true}
      icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
      isComparing={isCompareMode}
      compareValue={metricsB ? `$${((metricsB.totalAvoidedOutageCost || 0) / 1000).toFixed(0)}k` : undefined}
      onJustify={() => onJustifyMetric?.('totalAvoidedOutageCost')}
      {...props}
    />
  );
};

/**
 * Component factory / resolver map for dynamic rendering of any selected KPI.
 */
export const KPI_COMPONENT_RESOLVER: Record<string, React.FC<KPIWidgetRenderProps>> = {
  'executive-readiness-gauge': ExecutiveReadinessGaugeKPI,
  'executive-blocker-card': ExecutiveBlockerCardKPI,
  'executive-dora-lead-time': ExecutiveDoraLeadTimeKPI,
  'executive-delivery-health-card': ExecutiveDeliveryHealthKPI,
  'quality-defect-burnout-chart': QualityDefectBurnoutChartKPI,
  'quality-mttr-card': QualityMttrCardKPI,
  'quality-reopen-rate-card': QualityReopenRateCardKPI,
  'risk-untested-commits-card': RiskUntestedCommitsCardKPI,
  'risk-hotspot-files-card': RiskHotspotFilesCardKPI,
  'automation-pass-rate-gauge': AutomationPassRateGaugeKPI,
  'automation-flaky-tests-card': AutomationFlakyTestsCardKPI,
  'automation-runtime-card': AutomationRuntimeCardKPI,
  'productivity-velocity-card': ProductivityVelocityCardKPI,
  'productivity-test-execution-rate': ProductivityTestExecutionRateKPI,
  'governance-sla-gauge': GovernanceSlaGaugeKPI,
  'governance-accessibility-card': GovernanceAccessibilityCardKPI,
  'leading-escape-prevention-gauge': LeadingEscapePreventionGaugeKPI,
  'leading-avoided-cost-card': LeadingAvoidedCostCardKPI,
};
