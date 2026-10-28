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
  Clock, RefreshCw, Cpu, Compass, ShieldCheck,
  AlertOctagon, CheckCircle2, Zap, DollarSign, Users, Award
} from 'lucide-react';
import { MetricCard, GaugeMeter, AreaTrendChart } from '../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../registry/kpiRegistry';

// =========================================================================
// EXECUTIVE & SENIOR LEADERSHIP SCORECARD KPIS
// =========================================================================

export const ExecutiveReadinessGaugeKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  return (
    <div className="bg-white dark:bg-[#0c1021] rounded-2xl border border-slate-200 dark:border-cyan-500/20 shadow-xs p-4 flex flex-col items-center justify-center relative">
      <GaugeMeter
        score={sc?.overallScore ?? 15}
        title="Release Quality Index"
        subtitle="Composite score across testing gates"
        grade={sc?.releaseReadyGrade ?? 'F'}
        size={175}
        onJustify={() => onJustifyMetric?.('releaseQualityIndex')}
        onRemove={onRemove}
      />
    </div>
  );
};

export const ExecutiveBlockerCardKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const count = sc?.gatingDefectCount ?? 47;
  return (
    <MetricCard
      title="Blocking / Gating Defects"
      value={count}
      target="0 Blockers"
      statusBadge={count === 0 ? 'Optimal' : count <= 2 ? 'Warning' : 'Action Required'}
      statusColor={count === 0 ? 'emerald' : count <= 2 ? 'amber' : 'rose'}
      icon={<AlertOctagon className="w-5 h-5 text-rose-500" />}
      onJustify={() => onJustifyMetric?.('blockerDefects')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard?.gatingDefectCount}
    />
  );
};

export const ExecutiveLeakageCardKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const rate = sc?.defectLeakageRate ?? 48.1;
  return (
    <MetricCard
      title="Defect Leakage (Customer APARs)"
      value={`${rate}%`}
      target="< 3.0%"
      trend="-0.8% vs last sprint"
      trendPositive={rate <= 3.0}
      statusBadge={rate <= 3.0 ? 'Controlled' : rate <= 5.0 ? 'Acceptable' : 'Breached'}
      statusColor={rate <= 3.0 ? 'emerald' : rate <= 5.0 ? 'amber' : 'rose'}
      icon={<TrendingUp className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('defectLeakage')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.defectLeakageRate}%` : undefined}
    />
  );
};

export const ExecutiveRegressionCycleKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const days = sc?.regressionCycleTimeDays ?? 1.2;
  return (
    <MetricCard
      title="Regression Cycle Time"
      value={`${days} Days`}
      target="< 2.5 Days"
      trend="42% faster via SDET"
      trendPositive={days <= 2.5}
      statusBadge={days <= 2.5 ? 'Optimal' : days <= 3.5 ? 'Acceptable' : 'Breached'}
      statusColor={days <= 2.5 ? 'emerald' : days <= 3.5 ? 'amber' : 'rose'}
      icon={<Clock className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('regressionCycleTime')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.regressionCycleTimeDays} Days` : undefined}
    />
  );
};

export const ExecutiveLatencyP95KPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const p95 = sc?.performanceP95Ms ?? 135;
  return (
    <MetricCard
      title="P95 Latency Benchmark"
      value={`${p95} ms`}
      target="< 200 ms"
      statusBadge="P99: 380ms"
      statusColor={p95 <= 200 ? 'emerald' : p95 <= 350 ? 'amber' : 'rose'}
      icon={<Zap className="w-5 h-5 text-purple-500" />}
      onJustify={() => onJustifyMetric?.('performanceP95')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.performanceP95Ms} ms` : undefined}
    />
  );
};

export const ExecutiveCopqCardKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const copq = sc?.costOfPoorQuality ?? 675640;
  return (
    <MetricCard
      title="Cost of Poor Quality (CoPQ)"
      value={`$${copq.toLocaleString()}`}
      target="< $25,000"
      trend="+$21,090 automated savings"
      trendPositive={true}
      statusBadge={copq < 25000 ? 'Controlled' : 'Elevated'}
      statusColor={copq < 25000 ? 'emerald' : 'amber'}
      icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('costOfPoorQuality')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `$${(metricsB.executiveScorecard.costOfPoorQuality ?? 675640).toLocaleString()}` : undefined}
    />
  );
};

export const ExecutiveCfrCardKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const cfr = sc?.changeFailureRate ?? 10.6;
  return (
    <MetricCard
      title="Change Failure Rate (DORA)"
      value={`${cfr}%`}
      target="< 5.0% (Elite)"
      trend="-1.2% rollback rate"
      trendPositive={cfr <= 5.0}
      statusBadge={cfr <= 5.0 ? 'DORA Elite' : 'At Risk'}
      statusColor={cfr <= 5.0 ? 'emerald' : 'rose'}
      icon={<AlertOctagon className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('changeFailureRate')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.changeFailureRate}%` : undefined}
    />
  );
};

export const ExecutiveMttrRestoreKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const mttr = sc?.meanTimeToRestoreHours ?? 73.7;
  return (
    <MetricCard
      title="Mean Time to Restore (MTTR)"
      value={`${mttr} hrs`}
      target="< 4.0 Hours"
      trend="1.4h faster P1 resolve"
      trendPositive={mttr <= 4.0}
      statusBadge={mttr <= 4.0 ? 'DORA Elite' : 'Delayed'}
      statusColor={mttr <= 4.0 ? 'emerald' : 'amber'}
      icon={<Clock className="w-5 h-5 text-purple-500" />}
      onJustify={() => onJustifyMetric?.('meanTimeToRestoreHours')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.meanTimeToRestoreHours} hrs` : undefined}
    />
  );
};

export const ExecutiveSprintPredictabilityKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const spi = sc?.sprintPredictabilityIndex ?? 49.9;
  return (
    <MetricCard
      title="Sprint Predictability Index"
      value={`${spi}%`}
      target="85% - 100%"
      trend="+4.5% vs Sprint Avg"
      trendPositive={spi >= 85}
      statusBadge={spi >= 85 ? 'On Target' : 'Warning'}
      statusColor={spi >= 85 ? 'emerald' : 'amber'}
      icon={<CheckCircle2 className="w-5 h-5 text-blue-500" />}
      onJustify={() => onJustifyMetric?.('sprintPredictabilityIndex')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.sprintPredictabilityIndex}%` : undefined}
    />
  );
};

export const ExecutiveFeatureLeadTimeKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const days = sc?.featureLeadTimeDays ?? 4.1;
  return (
    <MetricCard
      title="Feature Lead Time (Commit-to-GA)"
      value={`${days} Days`}
      target="< 7.0 Days"
      trend="Rapid Flow"
      trendPositive={days <= 7.0}
      statusBadge={days <= 7.0 ? 'Optimal' : 'Delayed'}
      statusColor={days <= 7.0 ? 'emerald' : 'amber'}
      icon={<Clock className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('featureLeadTimeDays')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.featureLeadTimeDays} Days` : undefined}
    />
  );
};

export const ExecutiveSecurityVulnsKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const vulns = sc?.criticalVulnerabilitiesCount ?? 22;
  return (
    <MetricCard
      title="Security Gate Vulnerabilities"
      value={`${vulns} CVEs`}
      target="0 Open CVEs"
      trend="Zero Criticals"
      trendPositive={vulns === 0}
      statusBadge={vulns === 0 ? 'Certified' : 'Gate Violation'}
      statusColor={vulns === 0 ? 'emerald' : 'rose'}
      icon={<AlertOctagon className="w-5 h-5 text-rose-500" />}
      onJustify={() => onJustifyMetric?.('securityVulnerabilities')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.criticalVulnerabilitiesCount} CVEs` : undefined}
    />
  );
};

export const ExecutiveContractUptimeKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const uptime = sc?.contractUptimePercentage ?? 96.82;
  return (
    <MetricCard
      title="Contractual SLA Uptime"
      value={`${uptime}%`}
      target="≥ 99.95%"
      trend="Four Nines Tier"
      trendPositive={uptime >= 99.95}
      statusBadge={uptime >= 99.95 ? 'Compliant' : 'Breached'}
      statusColor={uptime >= 99.95 ? 'emerald' : 'rose'}
      icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('contractUptimePercentage')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.contractUptimePercentage}%` : undefined}
    />
  );
};

export const ExecutiveWcagComplianceKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const wcag = sc?.accessibilityScore ?? 87.1;
  return (
    <MetricCard
      title="WCAG 2.2 AA Compliance"
      value={`${wcag}%`}
      target="≥ 92.0%"
      trend="+1.5% audit score"
      trendPositive={wcag >= 92.0}
      statusBadge={wcag >= 92.0 ? 'Certified' : 'Warning'}
      statusColor={wcag >= 92.0 ? 'emerald' : 'amber'}
      icon={<Compass className="w-5 h-5 text-purple-500" />}
      onJustify={() => onJustifyMetric?.('accessibilityScore')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.accessibilityScore}%` : undefined}
    />
  );
};

// =========================================================================
// QUALITY & DEFECT DIAGNOSTICS KPIS
// =========================================================================

export const QualityMttrResolveKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const mttr = metrics.mttrMttd?.avgMttrHours ?? 83.8;
  return (
    <MetricCard
      title="Mean Time to Resolve (MTTR)"
      value={`${mttr} hrs`}
      target="< 24.0 hrs"
      trend="8.5% faster"
      trendPositive={true}
      statusBadge={mttr <= 24.0 ? 'Optimal' : 'Breached'}
      statusColor={mttr <= 24.0 ? 'emerald' : 'rose'}
      icon={<Clock className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('meanTimeToResolve')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.mttrMttd ? `${metricsB.mttrMttd.avgMttrHours} hrs` : undefined}
    />
  );
};

export const QualityMttdDetectKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const mttd = metrics.mttrMttd?.avgMttdHours ?? 42.7;
  return (
    <MetricCard
      title="Mean Time to Detect (MTTD)"
      value={`${mttd} hrs`}
      target="< 6.0 hrs"
      statusBadge={mttd <= 6.0 ? 'Optimal' : 'Critical Lag'}
      statusColor={mttd <= 6.0 ? 'emerald' : 'rose'}
      icon={<Zap className="w-5 h-5 text-amber-500" />}
      onJustify={() => onJustifyMetric?.('meanTimeToDetect')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.mttrMttd ? `${metricsB.mttrMttd.avgMttdHours} hrs` : undefined}
    />
  );
};

export const QualityReopenRateCardKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const rate = metrics.mttrMttd?.reopenRate ?? 15.5;
  const count = metrics.mttrMttd?.reopenedCount ?? 27;
  return (
    <MetricCard
      title="Defect Reopen Rate"
      value={`${rate}%`}
      target="< 5.0%"
      trend={`${count} reopened`}
      trendPositive={rate <= 5.0}
      statusBadge={rate <= 5.0 ? 'Controlled' : 'High Churn'}
      statusColor={rate <= 5.0 ? 'emerald' : 'rose'}
      icon={<RefreshCw className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('defectReopenRate')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.mttrMttd ? `${metricsB.mttrMttd.reopenRate}%` : undefined}
    />
  );
};

export const QualityCustomerAparsKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const apars = 167;
  return (
    <MetricCard
      title="Customer Escalations (APARs)"
      value={apars}
      target="< 10 Total"
      statusBadge="Severe Escapes"
      statusColor="rose"
      icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
      onJustify={() => onJustifyMetric?.('customerEscalations')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? 152 : undefined}
    />
  );
};

export const QualityDefectDensityKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const density = metrics.mttrMttd?.defectDensityKloc ?? 2.39;
  return (
    <MetricCard
      title="Defect Density per KLOC"
      value={`${density} / KLOC`}
      target="< 1.00 / KLOC"
      trend="Healthy Architecture"
      trendPositive={density <= 1.0}
      statusBadge={density <= 1.0 ? 'Target Met' : 'Elevated'}
      statusColor={density <= 1.0 ? 'emerald' : 'amber'}
      icon={<Cpu className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('defectDensity')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.mttrMttd ? `${metricsB.mttrMttd.defectDensityKloc} / KLOC` : undefined}
    />
  );
};

export const QualityFirstTimeFixRateKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const ftfr = metrics.mttrMttd?.firstTimeFixRate ?? 84.5;
  return (
    <MetricCard
      title="First-Time Fix Rate (FTFR)"
      value={`${ftfr}%`}
      target="≥ 90.0%"
      trend="High Fix Rigor"
      trendPositive={ftfr >= 90.0}
      statusBadge={ftfr >= 90.0 ? 'Certified' : 'Warning'}
      statusColor={ftfr >= 90.0 ? 'emerald' : 'amber'}
      icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('firstTimeFixRate')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.mttrMttd ? `${metricsB.mttrMttd.firstTimeFixRate}%` : undefined}
    />
  );
};

export const QualityNetIntakeVelocityKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const net = metrics.mttrMttd?.netDefectIntakeVelocity ?? 173;
  return (
    <MetricCard
      title="Net Defect Intake Velocity"
      value={`+${net} Bugs`}
      target="≤ 0 (Burning Down)"
      trend="Backlog Burnout"
      trendPositive={net <= 0}
      statusBadge={net <= 0 ? 'Burning Down' : 'Elevated'}
      statusColor={net <= 0 ? 'emerald' : 'amber'}
      icon={<Activity className="w-5 h-5 text-amber-500" />}
      onJustify={() => onJustifyMetric?.('netDefectIntake')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.mttrMttd ? `+${metricsB.mttrMttd.netDefectIntakeVelocity} Bugs` : undefined}
    />
  );
};

export const QualityDefectBurnoutChartKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, onJustifyMetric, onRemove }) => {
  const data = metrics.defectTrends || [
    { date: '2026-10-01', label: 'Day 1', value1: 24, value2: 18, value3: 6 },
    { date: '2026-10-03', label: 'Day 3', value1: 32, value2: 25, value3: 7 },
    { date: '2026-10-06', label: 'Day 6', value1: 45, value2: 38, value3: 7 },
    { date: '2026-10-09', label: 'Day 9', value1: 52, value2: 48, value3: 4 },
    { date: '2026-10-12', label: 'Day 12', value1: 58, value2: 56, value3: 2 }
  ];
  return (
    <div className="bg-white dark:bg-[#0c1021] rounded-2xl border border-slate-200 dark:border-cyan-500/20 shadow-xs p-4 relative">
      <AreaTrendChart
        data={data}
        title="Defect Discovery Rate vs. Defect Resolution Burnout (14-Day Velocity)"
        series1Name="Discovered Defects"
        series2Name="Resolved / Burned Out"
        series1Color="#f43f5e"
        series2Color="#10b981"
        height={170}
        onJustify={() => onJustifyMetric?.('defectBurnoutTrend')}
        onRemove={onRemove}
      />
    </div>
  );
};

// =========================================================================
// RISK ASSESSMENT & QUALITY GATES KPIS
// =========================================================================

export const RiskNoUnitTestsKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Items With No Unit Tests"
      value="147"
      target="0 Permitted"
      trend="43 missing test plan"
      trendPositive={false}
      statusBadge="Gate Violation"
      statusColor="rose"
      icon={<AlertOctagon className="w-5 h-5 text-rose-500" />}
      onJustify={() => onJustifyMetric?.('noUnitTests')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '132' : undefined}
    />
  );
};

export const RiskNoApiTestsKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Items With No API Tests"
      value="225"
      target="≤ 5 Exceptions"
      statusBadge="Contract Risk"
      statusColor="rose"
      icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
      onJustify={() => onJustifyMetric?.('noApiTests')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '210' : undefined}
    />
  );
};

export const RiskHighDependencyDepthKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="High Dependency Depth (Depth ≥ 4)"
      value="311"
      target="≤ 3 High Risk"
      statusBadge="Blast Radius Alert"
      statusColor="rose"
      icon={<Cpu className="w-5 h-5 text-purple-500" />}
      onJustify={() => onJustifyMetric?.('highDependencyDepth')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '280' : undefined}
    />
  );
};

export const RiskHighExecutionTestsKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="High Execution Time Tests (>300s)"
      value="189"
      target="0 Bottlenecks"
      statusBadge="Pipeline Bottleneck"
      statusColor="rose"
      icon={<Clock className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('highExecutionTests')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '175' : undefined}
    />
  );
};

// =========================================================================
// AUTOMATION ROI & PIPELINE HEALTH KPIS
// =========================================================================

export const AutomationSuitePassRateKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const rate = metrics.automationHealth?.automationRatioPercent ?? 84.6;
  return (
    <MetricCard
      title="Automated Test Suite Pass Rate"
      value={`${rate}%`}
      target="≥ 90.0%"
      trend="+3.2% vs last cycle"
      trendPositive={true}
      statusBadge={rate >= 90.0 ? 'Optimal' : 'Acceptable'}
      statusColor={rate >= 90.0 ? 'emerald' : 'amber'}
      icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('automationSuitePassRate')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.automationHealth ? `${metricsB.automationHealth.automationRatioPercent}%` : undefined}
    />
  );
};

export const AutomationFlakyIndexKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const flakyRate = metrics.automationHealth?.flakyRate ?? 3.6;
  const count = metrics.automationHealth?.flakyCount ?? 32;
  return (
    <MetricCard
      title="Flaky Test Detection Index"
      value={`${flakyRate}%`}
      target="< 4.0%"
      trend={`${count} flaky tests`}
      trendPositive={flakyRate <= 4.0}
      statusBadge={flakyRate <= 4.0 ? 'Controlled' : 'Elevated'}
      statusColor={flakyRate <= 4.0 ? 'emerald' : 'amber'}
      icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
      onJustify={() => onJustifyMetric?.('flakyIndex')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.automationHealth ? `${metricsB.automationHealth.flakyRate}%` : undefined}
    />
  );
};

export const AutomationPipelineRuntimeKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const runtime = metrics.automationHealth?.avgPipelineMins ?? 15.6;
  return (
    <MetricCard
      title="CI/CD Pipeline Runtime"
      value={`${runtime} mins`}
      target="< 15.0 mins"
      statusBadge={runtime <= 15.0 ? 'Optimal' : 'Moderate Latency'}
      statusColor={runtime <= 15.0 ? 'emerald' : 'amber'}
      icon={<Clock className="w-5 h-5 text-purple-500" />}
      onJustify={() => onJustifyMetric?.('pipelineRuntime')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.automationHealth ? `${metricsB.automationHealth.avgPipelineMins} mins` : undefined}
    />
  );
};

export const AutomationHoursSavedRoiKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const hrs = metrics.automationHealth?.manualHoursSaved ?? 218;
  return (
    <MetricCard
      title="Manual Hours Saved (ROI)"
      value={`${hrs} hrs`}
      target="~3.5 FTEs"
      trend="Saved per cycle"
      trendPositive={true}
      statusBadge="High ROI"
      statusColor="emerald"
      icon={<Zap className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('hoursSavedRoi')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.automationHealth ? `${metricsB.automationHealth.manualHoursSaved} hrs` : undefined}
    />
  );
};

export const AutomationComputeCostKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const cost = metrics.automationHealth?.cicdComputeCostDollars ?? 317;
  return (
    <MetricCard
      title="CI/CD Runner Compute Cost"
      value={`$${cost}`}
      target="< $250 / Sprint"
      trend="Cloud FinOps Optimal"
      trendPositive={cost <= 250}
      statusBadge={cost <= 250 ? 'Controlled' : 'Elevated'}
      statusColor={cost <= 250 ? 'emerald' : 'amber'}
      icon={<Cpu className="w-5 h-5 text-blue-500" />}
      onJustify={() => onJustifyMetric?.('computeCost')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.automationHealth ? `$${metricsB.automationHealth.cicdComputeCostDollars}` : undefined}
    />
  );
};

export const AutomationMtbfKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const mtbf = metrics.automationHealth?.mtbfHours ?? 3.8;
  return (
    <MetricCard
      title="Mean Time Between Flakes (MTBF)"
      value={`${mtbf} hrs`}
      target="> 24.0 hrs"
      trend="Deterministic Signals"
      trendPositive={mtbf >= 24.0}
      statusBadge={mtbf >= 24.0 ? 'Stable' : 'Warning'}
      statusColor={mtbf >= 24.0 ? 'emerald' : 'amber'}
      icon={<Clock className="w-5 h-5 text-purple-500" />}
      onJustify={() => onJustifyMetric?.('mtbf')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.automationHealth ? `${metricsB.automationHealth.mtbfHours} hrs` : undefined}
    />
  );
};

export const AutomationDefectCatchRatioKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const ratio = metrics.automationHealth?.automationCatchRatio ?? 79.2;
  return (
    <MetricCard
      title="Automation Defect Catch Ratio"
      value={`${ratio}%`}
      target="≥ 70.0%"
      trend="Shift-Left Hero"
      trendPositive={ratio >= 70.0}
      statusBadge={ratio >= 70.0 ? 'Optimal' : 'Needs Uplift'}
      statusColor={ratio >= 70.0 ? 'emerald' : 'amber'}
      icon={<ShieldCheck className="w-5 h-5 text-amber-500" />}
      onJustify={() => onJustifyMetric?.('defectCatchRatio')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.automationHealth ? `${metricsB.automationHealth.automationCatchRatio}%` : undefined}
    />
  );
};

// =========================================================================
// PLANNING, VELOCITY & SQUAD PRODUCTIVITY KPIS
// =========================================================================

export const ProductivityTestCompletionRateKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const rate = 91.0;
  return (
    <MetricCard
      title="Avg QA Test Completion Rate"
      value={`${rate}%`}
      target="> 85.0%"
      trend="+4.1% sprint velocity"
      trendPositive={true}
      statusBadge="On Target"
      statusColor="emerald"
      icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('testCompletionRate')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '88.2%' : undefined}
    />
  );
};

export const ProductivityOvercommittedKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Over-Committed Engineers"
      value="0"
      target="0 Burnout Risk"
      statusBadge="Balanced"
      statusColor="emerald"
      icon={<Users className="w-5 h-5 text-amber-500" />}
      onJustify={() => onJustifyMetric?.('overcommittedEngineers')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '1' : undefined}
    />
  );
};

export const ProductivityStoryCompletionKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const rate = 49.9;
  return (
    <MetricCard
      title="Sprint Story Completion Rate"
      value={`${rate}%`}
      target="≥ 80.0%"
      statusBadge="Slipping"
      statusColor="rose"
      icon={<CheckCircle2 className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('storyCompletionRate')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '65.0%' : undefined}
    />
  );
};

export const ProductivityActiveSpecialistsKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Active QA Specialists"
      value="6"
      target="Dedicated Squad"
      statusBadge="Optimal Staffing"
      statusColor="emerald"
      icon={<Users className="w-5 h-5 text-purple-500" />}
      onJustify={() => onJustifyMetric?.('activeSpecialists')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '6' : undefined}
    />
  );
};

export const ProductivityFlowEfficiencyKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const flow = 28.4;
  return (
    <MetricCard
      title="Flow Efficiency (Active vs Idle)"
      value={`${flow}%`}
      target="≥ 45.0%"
      trend="Minimal Idle Staging"
      trendPositive={flow >= 45.0}
      statusBadge="Delayed"
      statusColor="amber"
      icon={<TrendingUp className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('flowEfficiency')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '31.5%' : undefined}
    />
  );
};

export const ProductivitySpilloverRateKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const spillover = 51.4;
  return (
    <MetricCard
      title="Sprint Spillover Rate"
      value={`${spillover}%`}
      target="≤ 10.0%"
      trend="Scope Committed Delivered"
      trendPositive={spillover <= 10.0}
      statusBadge="Elevated"
      statusColor="amber"
      icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
      onJustify={() => onJustifyMetric?.('spilloverRate')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '42.0%' : undefined}
    />
  );
};

export const ProductivityDevToQaRatioKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Dev-to-QA Ratio"
      value="1:1.2"
      target="Benchmark 1:3 to 1:5"
      statusBadge="Balanced Squads"
      statusColor="emerald"
      icon={<Users className="w-5 h-5 text-blue-500" />}
      onJustify={() => onJustifyMetric?.('devToQaRatio')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '1:1.5' : undefined}
    />
  );
};

// =========================================================================
// GOVERNANCE, SLAS & BENCHMARKS KPIS
// =========================================================================

export const GovernanceSlaAdherenceKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const adherence = metrics.executiveScorecard?.slaAdherenceRate ?? 87.3;
  return (
    <MetricCard
      title="Overall SLA Adherence"
      value={`${adherence}%`}
      target="≥ 95.0%"
      statusBadge={adherence >= 95.0 ? 'Certified' : 'SLA Breached'}
      statusColor={adherence >= 95.0 ? 'emerald' : 'rose'}
      icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('slaAdherence')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.slaAdherenceRate}%` : undefined}
    />
  );
};

export const GovernanceWcagAccessibilityKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const wcag = metrics.executiveScorecard?.accessibilityScore ?? 87.1;
  return (
    <MetricCard
      title="WCAG 2.2 AA Accessibility"
      value={`${wcag}%`}
      target="≥ 95.0%"
      statusBadge={wcag >= 95.0 ? 'Certified' : 'Audit Deficit'}
      statusColor={wcag >= 95.0 ? 'emerald' : 'amber'}
      icon={<Compass className="w-5 h-5 text-purple-500" />}
      onJustify={() => onJustifyMetric?.('accessibilityScore')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.accessibilityScore}%` : undefined}
    />
  );
};

export const GovernanceLatencyP95KPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const p95 = metrics.executiveScorecard?.performanceP95Ms ?? 135;
  return (
    <MetricCard
      title="Performance P95 Latency"
      value={`${p95} ms`}
      target="< 200 ms"
      statusBadge="Optimal Flow"
      statusColor="emerald"
      icon={<Zap className="w-5 h-5 text-purple-500" />}
      onJustify={() => onJustifyMetric?.('performanceP95')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.performanceP95Ms} ms` : undefined}
    />
  );
};

export const GovernanceCsatKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Stakeholder Satisfaction (CSAT)"
      value="4.7 / 5.0"
      target="≥ 4.5 Stars"
      statusBadge="High Satisfaction"
      statusColor="emerald"
      icon={<Award className="w-5 h-5 text-amber-500" />}
      onJustify={() => onJustifyMetric?.('csat')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '4.5 / 5.0' : undefined}
    />
  );
};

export const GovernanceSlaPenaltiesKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Contract SLA Penalties"
      value="$0"
      target="$0 Incurred"
      statusBadge="No Financial Escapes"
      statusColor="emerald"
      icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('contractPenalties')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '$0' : undefined}
    />
  );
};

export const GovernanceTraceabilityKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Audit Trail Traceability"
      value="99.4%"
      target="100% Full Trace"
      statusBadge="Complete Evidence"
      statusColor="emerald"
      icon={<ShieldCheck className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('auditTraceability')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '98.5%' : undefined}
    />
  );
};

// =========================================================================
// LEADING, LAGGING & NEAR MISS KPIS
// =========================================================================

export const LeadingHealthIndexKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Leading Health Index"
      value="92.4"
      target="≥ 90.0 Score"
      statusBadge="Predictive Safety"
      statusColor="emerald"
      icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('leadingHealthIndex')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '89.1' : undefined}
    />
  );
};

export const LaggingOutcomeStabilityKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Lagging Outcome Stability"
      value="88.7"
      target="≥ 85.0 Target"
      statusBadge="Production Stable"
      statusColor="emerald"
      icon={<Activity className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('laggingStability')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '86.4' : undefined}
    />
  );
};

export const NearMissesInterceptedKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const escapes = metrics.nearMissAnalytics?.escapePreventionRatio ?? 94.6;
  return (
    <MetricCard
      title="Near Misses Intercepted"
      value={`${escapes}%`}
      target="≥ 90.0%"
      statusBadge="Zero Escaped Outages"
      statusColor="emerald"
      icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('escapePreventionRatio')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.nearMissAnalytics ? `${metricsB.nearMissAnalytics.escapePreventionRatio}%` : undefined}
    />
  );
};

export const AvoidedOutageLossKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const loss = metrics.nearMissAnalytics?.totalAvoidedOutageCost ?? 184500;
  return (
    <MetricCard
      title="Avoided Outage Loss"
      value={`$${(loss / 1000).toFixed(0)}k`}
      target="Averted Downtime"
      statusBadge="High Risk Value"
      statusColor="emerald"
      icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('totalAvoidedOutageCost')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.nearMissAnalytics ? `$${((metricsB.nearMissAnalytics.totalAvoidedOutageCost ?? 184500) / 1000).toFixed(0)}k` : undefined}
    />
  );
};

// =========================================================================
// MASTER WIDGET RESOLVER
// =========================================================================

export const KPI_COMPONENT_RESOLVER: Record<string, React.FC<KPIWidgetRenderProps>> = {
  // Executive
  'executive-readiness-gauge': ExecutiveReadinessGaugeKPI,
  'executive-blocker-card': ExecutiveBlockerCardKPI,
  'executive-leakage-card': ExecutiveLeakageCardKPI,
  'executive-regression-cycle': ExecutiveRegressionCycleKPI,
  'executive-latency-p95': ExecutiveLatencyP95KPI,
  'executive-copq-card': ExecutiveCopqCardKPI,
  'executive-cfr-card': ExecutiveCfrCardKPI,
  'executive-mttr-restore': ExecutiveMttrRestoreKPI,
  'executive-sprint-predictability': ExecutiveSprintPredictabilityKPI,
  'executive-feature-lead-time': ExecutiveFeatureLeadTimeKPI,
  'executive-security-vulns': ExecutiveSecurityVulnsKPI,
  'executive-contract-uptime': ExecutiveContractUptimeKPI,
  'executive-wcag-compliance': ExecutiveWcagComplianceKPI,

  // Quality
  'quality-mttr-resolve': QualityMttrResolveKPI,
  'quality-mttd-detect': QualityMttdDetectKPI,
  'quality-reopen-rate-card': QualityReopenRateCardKPI,
  'quality-customer-apars': QualityCustomerAparsKPI,
  'quality-defect-density': QualityDefectDensityKPI,
  'quality-first-time-fix-rate': QualityFirstTimeFixRateKPI,
  'quality-net-intake-velocity': QualityNetIntakeVelocityKPI,
  'quality-defect-burnout-chart': QualityDefectBurnoutChartKPI,

  // Risk
  'risk-no-unit-tests': RiskNoUnitTestsKPI,
  'risk-untested-commits-card': RiskNoUnitTestsKPI, // Alias for initial default watchlist
  'risk-no-api-tests': RiskNoApiTestsKPI,
  'risk-high-dependency-depth': RiskHighDependencyDepthKPI,
  'risk-high-execution-tests': RiskHighExecutionTestsKPI,

  // Automation
  'automation-suite-pass-rate': AutomationSuitePassRateKPI,
  'automation-pass-rate-gauge': AutomationSuitePassRateKPI, // Alias for initial default watchlist
  'automation-flaky-index': AutomationFlakyIndexKPI,
  'automation-pipeline-runtime': AutomationPipelineRuntimeKPI,
  'automation-hours-saved-roi': AutomationHoursSavedRoiKPI,
  'automation-compute-cost': AutomationComputeCostKPI,
  'automation-mtbf': AutomationMtbfKPI,
  'automation-defect-catch-ratio': AutomationDefectCatchRatioKPI,

  // Productivity
  'productivity-test-completion-rate': ProductivityTestCompletionRateKPI,
  'productivity-overcommitted': ProductivityOvercommittedKPI,
  'productivity-story-completion': ProductivityStoryCompletionKPI,
  'productivity-active-specialists': ProductivityActiveSpecialistsKPI,
  'productivity-flow-efficiency': ProductivityFlowEfficiencyKPI,
  'productivity-spillover-rate': ProductivitySpilloverRateKPI,
  'productivity-dev-to-qa-ratio': ProductivityDevToQaRatioKPI,

  // Governance
  'governance-sla-adherence': GovernanceSlaAdherenceKPI,
  'governance-sla-gauge': GovernanceSlaAdherenceKPI, // Alias for initial default watchlist
  'governance-wcag-accessibility': GovernanceWcagAccessibilityKPI,
  'governance-latency-p95': GovernanceLatencyP95KPI,
  'governance-csat': GovernanceCsatKPI,
  'governance-sla-penalties': GovernanceSlaPenaltiesKPI,
  'governance-traceability': GovernanceTraceabilityKPI,

  // Leading & Lagging
  'leading-health-index': LeadingHealthIndexKPI,
  'lagging-outcome-stability': LaggingOutcomeStabilityKPI,
  'near-misses-intercepted': NearMissesInterceptedKPI,
  'avoided-outage-loss': AvoidedOutageLossKPI
};
