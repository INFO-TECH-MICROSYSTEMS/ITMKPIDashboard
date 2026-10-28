/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import type {
  ReleaseQualityScorecard,
  TestStatusDistribution,
  QualityDiagnosticsSummary,
  ComponentRiskMetric,
  AutomationHealthSummary,
  NearMissAnalyticsSummary,
  AgingBuckets,
  DefectSeverityCounts,
  TrendPoint,
  TestExecutionBurnoutForecast,
  TestAutomationBurnoutForecast,
  PersonProductivityMetric,
  SquadProductivitySummary,
  LeadingLaggingMetricsSummary,
  JiraWorkItem,
  TestRailExecution
} from '../../types/kpiPlatform';

export interface CalculatedMetricsDeck {
  executiveScorecard: ReleaseQualityScorecard;
  testDistributionAll: TestStatusDistribution;
  testDistributionAutomated?: TestStatusDistribution;
  testDistributionManual?: TestStatusDistribution;
  severityCounts?: DefectSeverityCounts;
  agingBuckets?: AgingBuckets;
  defectTrends?: TrendPoint[];
  defectBurnoutTrend?: TrendPoint[];
  testBurnoutForecast?: TestExecutionBurnoutForecast;
  testAutomationForecast?: TestAutomationBurnoutForecast;
  mttrMttd?: QualityDiagnosticsSummary;
  componentRisks?: ComponentRiskMetric[];
  productivityMetrics?: PersonProductivityMetric[];
  squadSummary?: SquadProductivitySummary;
  automationHealth?: AutomationHealthSummary;
  leadingLaggingMetrics?: LeadingLaggingMetricsSummary;
  nearMissAnalytics?: NearMissAnalyticsSummary;
  jiraItems?: JiraWorkItem[];
  testRailExecutions?: TestRailExecution[];
}

export type KPICategoryFamily = 
  | 'executive' 
  | 'quality' 
  | 'risk' 
  | 'automation' 
  | 'productivity' 
  | 'governance' 
  | 'leadingLagging';

export interface KPIWidgetDescriptor {
  id: string;
  family: KPICategoryFamily;
  title: string;
  subtitle: string;
  description: string;
  defaultColSpan: 1 | 2 | 3 | 4;
  iconName: string;
}

export interface KPIWidgetRenderProps {
  metrics: CalculatedMetricsDeck;
  metricsB?: CalculatedMetricsDeck;
  isCompareMode?: boolean;
  onRemove?: () => void;
  onJustifyMetric?: (metricKey: string) => void;
}

/**
 * KPI_REGISTRY: Master catalog of ALL 45+ existing KPI widgets across the platform.
 * Exact 1:1 match with existing category views.
 */
export const KPI_REGISTRY: KPIWidgetDescriptor[] = [
  // --- EXECUTIVE SCORECARD ---
  {
    id: 'executive-readiness-gauge',
    family: 'executive',
    title: 'Pre-Release Quality & Risk Assessment',
    subtitle: 'Release Quality Index & Executive Evaluation',
    description: 'Composite enterprise hero banner evaluating test coverage, regression cycle velocity, gating defects, and customer escape rate.',
    defaultColSpan: 4,
    iconName: 'ShieldCheck'
  },
  {
    id: 'executive-blocker-card',
    family: 'executive',
    title: 'Blocking / Gating Defects',
    subtitle: 'Active P1/P2 Release Blockers',
    description: 'Active blocking bugs that stall release gate criteria.',
    defaultColSpan: 1,
    iconName: 'AlertOctagon'
  },
  {
    id: 'executive-leakage-card',
    family: 'executive',
    title: 'Defect Leakage (Customer APARs)',
    subtitle: 'Customer Escape Rate',
    description: 'Defects escaping into customer-facing production staging.',
    defaultColSpan: 1,
    iconName: 'TrendingUp'
  },
  {
    id: 'executive-regression-cycle',
    family: 'executive',
    title: 'Regression Cycle Time',
    subtitle: 'End-to-End Suite Turnaround',
    description: 'Turnaround duration in days for complete regression cycles.',
    defaultColSpan: 1,
    iconName: 'Clock'
  },
  {
    id: 'executive-latency-p95',
    family: 'executive',
    title: 'P95 Latency Benchmark',
    subtitle: 'Under Load SLA Threshold',
    description: 'P95 latency benchmark across primary microservices under concurrent load.',
    defaultColSpan: 1,
    iconName: 'Zap'
  },
  {
    id: 'executive-copq-card',
    family: 'executive',
    title: 'Cost of Poor Quality (CoPQ)',
    subtitle: 'Direct Rework and Bug Triage Overhead',
    description: 'Calculated financial rework cost from defect handling and rollbacks.',
    defaultColSpan: 1,
    iconName: 'DollarSign'
  },
  {
    id: 'executive-cfr-card',
    family: 'executive',
    title: 'Change Failure Rate (DORA)',
    subtitle: 'Percentage of Hotfixes and Rollbacks',
    description: 'DORA stability metric: proportion of deployments requiring emergency fixes.',
    defaultColSpan: 1,
    iconName: 'AlertOctagon'
  },
  {
    id: 'executive-mttr-restore',
    family: 'executive',
    title: 'Mean Time to Restore (MTTR)',
    subtitle: 'DORA Outage Recovery Velocity',
    description: 'Average hours elapsed to restore production service after an outage.',
    defaultColSpan: 1,
    iconName: 'Clock'
  },
  {
    id: 'executive-sprint-predictability',
    family: 'executive',
    title: 'Sprint Predictability Index',
    subtitle: 'Committed vs Delivered Story Points',
    description: 'Ratio of completed story points against initial sprint commitment.',
    defaultColSpan: 1,
    iconName: 'CheckCircle2'
  },
  {
    id: 'executive-feature-lead-time',
    family: 'executive',
    title: 'Feature Lead Time (Commit-to-GA)',
    subtitle: 'DORA Delivery Velocity',
    description: 'Days elapsed from initial commit to General Availability release.',
    defaultColSpan: 1,
    iconName: 'Clock'
  },
  {
    id: 'executive-security-vulns',
    family: 'executive',
    title: 'Security Gate Vulnerabilities',
    subtitle: 'Static and Dynamic CVE Blockers',
    description: 'Unresolved critical or major security vulnerabilities in pre-release scan.',
    defaultColSpan: 1,
    iconName: 'AlertOctagon'
  },
  {
    id: 'executive-contract-uptime',
    family: 'executive',
    title: 'Contractual SLA Uptime',
    subtitle: 'Enterprise Service Availability',
    description: 'Calculated service uptime against contractual four-nines tier commitment.',
    defaultColSpan: 1,
    iconName: 'CheckCircle2'
  },
  {
    id: 'executive-wcag-compliance',
    family: 'executive',
    title: 'WCAG 2.2 AA Compliance',
    subtitle: 'Accessibility & Usability Score',
    description: 'Compliance score across screen readers, color contrast, and keyboard navigation.',
    defaultColSpan: 1,
    iconName: 'Compass'
  },

  // --- QUALITY & DEFECT DIAGNOSTICS ---
  {
    id: 'quality-mttr-resolve',
    family: 'quality',
    title: 'Mean Time to Resolve (MTTR)',
    subtitle: 'Defect Resolution Turnaround',
    description: 'Hours to triage, patch, and verify reported defects.',
    defaultColSpan: 1,
    iconName: 'Clock'
  },
  {
    id: 'quality-mttd-detect',
    family: 'quality',
    title: 'Mean Time to Detect (MTTD)',
    subtitle: 'Defect Identification Lag',
    description: 'Hours between code introduction and defect triage log.',
    defaultColSpan: 1,
    iconName: 'Zap'
  },
  {
    id: 'quality-reopen-rate-card',
    family: 'quality',
    title: 'Defect Reopen Rate',
    subtitle: 'Failed QA Verification',
    description: 'Percentage of closed defects reopened due to incomplete remediation.',
    defaultColSpan: 1,
    iconName: 'RefreshCw'
  },
  {
    id: 'quality-customer-apars',
    family: 'quality',
    title: 'Customer Escalations (APARs)',
    subtitle: 'High Impact Production Escalations',
    description: 'Total escalated issues reported by enterprise customers.',
    defaultColSpan: 1,
    iconName: 'AlertTriangle'
  },
  {
    id: 'quality-defect-density',
    family: 'quality',
    title: 'Defect Density per KLOC',
    subtitle: 'Architectural Defect Frequency',
    description: 'Number of bugs per 1,000 lines of executable code.',
    defaultColSpan: 1,
    iconName: 'Cpu'
  },
  {
    id: 'quality-first-time-fix-rate',
    family: 'quality',
    title: 'First-Time Fix Rate (FTFR)',
    subtitle: 'Remediation Quality',
    description: 'Defects verified and resolved on first attempt without reopen cycles.',
    defaultColSpan: 1,
    iconName: 'CheckCircle2'
  },
  {
    id: 'quality-net-intake-velocity',
    family: 'quality',
    title: 'Net Defect Intake Velocity',
    subtitle: 'Discovery vs Resolution Trajectory',
    description: 'Net difference between incoming bugs and resolved defects.',
    defaultColSpan: 1,
    iconName: 'Activity'
  },
  {
    id: 'quality-defect-burnout-chart',
    family: 'quality',
    title: 'Defect Discovery Rate vs. Defect Resolution Burnout',
    subtitle: '14-Day Velocity Trend',
    description: 'Timeline comparison between incoming discovery and verified resolution velocity.',
    defaultColSpan: 2,
    iconName: 'Activity'
  },

  // --- RISK ASSESSMENT & QUALITY GATES ---
  {
    id: 'risk-no-unit-tests',
    family: 'risk',
    title: 'Items With No Unit Tests',
    subtitle: 'Coverage Blindspots',
    description: 'Production code changes merged without automated unit tests.',
    defaultColSpan: 1,
    iconName: 'AlertOctagon'
  },
  {
    id: 'risk-no-api-tests',
    family: 'risk',
    title: 'Items With No API Tests',
    subtitle: 'Contract & Endpoint Vulnerabilities',
    description: 'Services and APIs missing contract or functional validation.',
    defaultColSpan: 1,
    iconName: 'AlertTriangle'
  },
  {
    id: 'risk-high-dependency-depth',
    family: 'risk',
    title: 'High Dependency Depth (Depth ≥ 4)',
    subtitle: 'Blast Radius Risk',
    description: 'Modules with deep coupling that amplify failure blast radius.',
    defaultColSpan: 1,
    iconName: 'Cpu'
  },
  {
    id: 'risk-high-execution-tests',
    family: 'risk',
    title: 'High Execution Time Tests (>300s)',
    subtitle: 'Pipeline Bottlenecks',
    description: 'Individual test cases consuming excessive CI duration.',
    defaultColSpan: 1,
    iconName: 'Clock'
  },

  // --- AUTOMATION ROI & PIPELINE HEALTH ---
  {
    id: 'automation-suite-pass-rate',
    family: 'automation',
    title: 'Automated Test Suite Pass Rate',
    subtitle: 'CI Regression Reliability',
    description: 'Percentage of automated tests passing cleanly on CI runs.',
    defaultColSpan: 1,
    iconName: 'CheckCircle2'
  },
  {
    id: 'automation-flaky-index',
    family: 'automation',
    title: 'Flaky Test Detection Index',
    subtitle: 'Intermittent Failure Ratio',
    description: 'Intermittent tests exhibiting non-deterministic behavior.',
    defaultColSpan: 1,
    iconName: 'AlertTriangle'
  },
  {
    id: 'automation-pipeline-runtime',
    family: 'automation',
    title: 'CI/CD Pipeline Runtime',
    subtitle: 'Regression Cycle Turnaround',
    description: 'Total duration required to execute full automated test suite.',
    defaultColSpan: 1,
    iconName: 'Clock'
  },
  {
    id: 'automation-hours-saved-roi',
    family: 'automation',
    title: 'Manual Hours Saved (ROI)',
    subtitle: 'Engineering FTE Equivalency',
    description: 'Human testing hours saved through automated CI suites.',
    defaultColSpan: 1,
    iconName: 'Zap'
  },
  {
    id: 'automation-compute-cost',
    family: 'automation',
    title: 'CI/CD Runner Compute Cost',
    subtitle: 'Cloud FinOps Operational Cost',
    description: 'Compute infrastructure expense incurred by CI/CD execution.',
    defaultColSpan: 1,
    iconName: 'Cpu'
  },
  {
    id: 'automation-mtbf',
    family: 'automation',
    title: 'Mean Time Between Flakes (MTBF)',
    subtitle: 'Pipeline Stability Index',
    description: 'Operating hours between non-deterministic test failures.',
    defaultColSpan: 1,
    iconName: 'Clock'
  },
  {
    id: 'automation-defect-catch-ratio',
    family: 'automation',
    title: 'Automation Defect Catch Ratio',
    subtitle: 'Shift-Left Effectiveness',
    description: 'Ratio of defects caught in automated pipelines vs manual testing.',
    defaultColSpan: 1,
    iconName: 'ShieldCheck'
  },

  // --- SQUAD PRODUCTIVITY & VELOCITY ---
  {
    id: 'productivity-test-completion-rate',
    family: 'productivity',
    title: 'Avg QA Test Completion Rate',
    subtitle: 'Execution Velocity',
    description: 'Percentage of assigned test executions completed within sprint.',
    defaultColSpan: 1,
    iconName: 'TrendingUp'
  },
  {
    id: 'productivity-overcommitted',
    family: 'productivity',
    title: 'Over-Committed Engineers',
    subtitle: 'Workload Balance & Burnout Risk',
    description: 'Team members assigned work exceeding sustainable capacity.',
    defaultColSpan: 1,
    iconName: 'Users'
  },
  {
    id: 'productivity-story-completion',
    family: 'productivity',
    title: 'Sprint Story Completion Rate',
    subtitle: 'Sprint Delivery Ratio',
    description: 'User stories verified and marked Done against commitments.',
    defaultColSpan: 1,
    iconName: 'CheckCircle2'
  },
  {
    id: 'productivity-active-specialists',
    family: 'productivity',
    title: 'Active QA Specialists',
    subtitle: 'Dedicated Squad Headcount',
    description: 'Staffed QA engineers contributing to active release sprints.',
    defaultColSpan: 1,
    iconName: 'Users'
  },
  {
    id: 'productivity-flow-efficiency',
    family: 'productivity',
    title: 'Flow Efficiency (Active vs Idle)',
    subtitle: 'Cycle Time Flow Metric',
    description: 'Proportion of cycle time spent in active progress vs waiting.',
    defaultColSpan: 1,
    iconName: 'TrendingUp'
  },
  {
    id: 'productivity-spillover-rate',
    family: 'productivity',
    title: 'Sprint Spillover Rate',
    subtitle: 'Incomplete Sprint Scope',
    description: 'Story points rolled over to subsequent sprints.',
    defaultColSpan: 1,
    iconName: 'AlertTriangle'
  },
  {
    id: 'productivity-dev-to-qa-ratio',
    family: 'productivity',
    title: 'Dev-to-QA Ratio',
    subtitle: 'Staffing Ratio Benchmark',
    description: 'Proportion of development engineers to QA specialists.',
    defaultColSpan: 1,
    iconName: 'Users'
  },

  // --- GOVERNANCE & SLAS ---
  {
    id: 'governance-sla-adherence',
    family: 'governance',
    title: 'Overall SLA Adherence',
    subtitle: 'Contractual Quality Standards',
    description: 'Adherence against contractual defect turnaround and testing SLAs.',
    defaultColSpan: 1,
    iconName: 'ShieldCheck'
  },
  {
    id: 'governance-wcag-accessibility',
    family: 'governance',
    title: 'WCAG 2.2 AA Accessibility',
    subtitle: 'Digital Usability Standard',
    description: 'Automated compliance audit checking accessibility conformance.',
    defaultColSpan: 1,
    iconName: 'Compass'
  },
  {
    id: 'governance-latency-p95',
    family: 'governance',
    title: 'Performance P95 Latency',
    subtitle: 'Runtime Latency Performance',
    description: 'P95 response latency SLA compliance under benchmark load.',
    defaultColSpan: 1,
    iconName: 'Zap'
  },
  {
    id: 'governance-csat',
    family: 'governance',
    title: 'Stakeholder Satisfaction (CSAT)',
    subtitle: 'Customer & Leadership Score',
    description: 'Direct stakeholder satisfaction score on delivered quality.',
    defaultColSpan: 1,
    iconName: 'Award'
  },
  {
    id: 'governance-sla-penalties',
    family: 'governance',
    title: 'Contract SLA Penalties',
    subtitle: 'Financial Penalties Incurred',
    description: 'Financial damages or penalty credits incurred for breached SLAs.',
    defaultColSpan: 1,
    iconName: 'DollarSign'
  },
  {
    id: 'governance-traceability',
    family: 'governance',
    title: 'Audit Trail Traceability',
    subtitle: 'Requirements to Test Execution',
    description: 'Percentage of user stories with full bi-directional traceability.',
    defaultColSpan: 1,
    iconName: 'ShieldCheck'
  },

  // --- LEADING, LAGGING & NEAR MISSES ---
  {
    id: 'leading-health-index',
    family: 'leadingLagging',
    title: 'Leading Health Index',
    subtitle: 'Predictive Quality Forecast',
    description: 'Composite score synthesizing pre-release leading quality signals.',
    defaultColSpan: 1,
    iconName: 'ShieldCheck'
  },
  {
    id: 'lagging-outcome-stability',
    family: 'leadingLagging',
    title: 'Lagging Outcome Stability',
    subtitle: 'Post-Deployment Stability',
    description: 'Historical production stability score across released versions.',
    defaultColSpan: 1,
    iconName: 'Activity'
  },
  {
    id: 'near-misses-intercepted',
    family: 'leadingLagging',
    title: 'Near Misses Intercepted',
    subtitle: 'Escape Prevention Ratio',
    description: 'Percentage of critical regressions caught before production.',
    defaultColSpan: 1,
    iconName: 'ShieldCheck'
  },
  {
    id: 'avoided-outage-loss',
    family: 'leadingLagging',
    title: 'Avoided Outage Loss',
    subtitle: 'Financial Impact Averted',
    description: 'Estimated financial impact averted through proactive QA gating.',
    defaultColSpan: 1,
    iconName: 'DollarSign'
  },

  // --- COMPLEX OPERATIONAL & ANALYTICAL WIDGETS ---
  {
    id: 'executive-test-suite-snapshot',
    family: 'executive',
    title: 'Enterprise Test Suite Execution Snapshot',
    subtitle: 'Consolidated QA Execution Health (Automated + Manual)',
    description: 'Stacked distribution bar tracking passed, failed, blocked, and unattempted tests.',
    defaultColSpan: 4,
    iconName: 'Layers'
  },
  {
    id: 'executive-test-burnout-forecast',
    family: 'executive',
    title: 'Test Execution Burnout & Predictive Velocity Forecast',
    subtitle: 'Velocity Runway & Forecast Projection Chart',
    description: 'Predictive burnout trajectory model with projected completion dates.',
    defaultColSpan: 4,
    iconName: 'Activity'
  },
  {
    id: 'quality-aging-profile',
    family: 'quality',
    title: 'Items Pending Testing Aging Profile',
    subtitle: 'Backlog Latency Queues (< 7d, 7-14d, 14-21d, 21+d)',
    description: 'Distribution of work items pending verification categorized by latency buckets.',
    defaultColSpan: 4,
    iconName: 'Clock'
  },
  {
    id: 'quality-defect-severity-breakdown',
    family: 'quality',
    title: 'Defect Severity Breakdown',
    subtitle: 'P1 Blocker, P2 Critical, P3 Major, P4 Minor Distribution',
    description: 'Visual breakdown of open defects segmented by impact tier.',
    defaultColSpan: 2,
    iconName: 'AlertOctagon'
  },
  {
    id: 'quality-active-gating-defects-table',
    family: 'quality',
    title: 'Active Release Gating Defects Ledger',
    subtitle: 'Items Requiring Formal Quality Sign-off',
    description: 'Detailed defect table listing blocking bugs that stall release gate criteria.',
    defaultColSpan: 4,
    iconName: 'AlertTriangle'
  },
  {
    id: 'risk-component-matrix',
    family: 'risk',
    title: 'Component Risk & Dependency Gating Matrix',
    subtitle: 'Ranked by Vulnerability Across Modules',
    description: 'Complete cross-service risk table evaluating failure rates, complexity, and coverage.',
    defaultColSpan: 4,
    iconName: 'Cpu'
  },
  {
    id: 'risk-blocked-development-items',
    family: 'risk',
    title: 'Blocked Development Items',
    subtitle: 'Stalled Sprints & Impediment Queue',
    description: 'List of developmental stories blocked by cross-team dependencies.',
    defaultColSpan: 2,
    iconName: 'AlertCircle'
  },
  {
    id: 'risk-high-dependency-depth-list',
    family: 'risk',
    title: 'High Dependency Depth Items',
    subtitle: 'Coupling Risk Level ≥ 4',
    description: 'Modules with architectural coupling exceeding blast radius thresholds.',
    defaultColSpan: 2,
    iconName: 'Layers'
  },
  {
    id: 'automation-burnout-velocity-forecast',
    family: 'automation',
    title: 'Test Automation Burnout & Predictive Velocity Forecast',
    subtitle: 'Multi-Line Forecast Projection & Daily Runway',
    description: 'Burnout trajectory comparing total tests, automated tests, and remaining manual suites.',
    defaultColSpan: 4,
    iconName: 'Activity'
  },
  {
    id: 'automation-execution-split-bars',
    family: 'automation',
    title: 'Automated vs Manual Exploratory Execution',
    subtitle: 'Split Distribution Comparison (81% vs 19%)',
    description: 'Paired progress bars comparing execution outcomes between automated and manual testing.',
    defaultColSpan: 4,
    iconName: 'Layers'
  },
  {
    id: 'automation-flaky-tests-table',
    family: 'automation',
    title: 'Flaky Automated Tests Identified',
    subtitle: 'Quarantine & Pipeline Rerun Ledger',
    description: 'Table of non-deterministic automated tests with rerun frequencies and durations.',
    defaultColSpan: 4,
    iconName: 'AlertTriangle'
  },
  {
    id: 'productivity-engineer-ledger-table',
    family: 'productivity',
    title: 'QA Engineer Test Assignment & Throughput Ledger',
    subtitle: 'Capacity Limit & Individual Squad Velocity',
    description: 'Engineering ledger tracking individual test completion, delayed items, and burnout status.',
    defaultColSpan: 4,
    iconName: 'Users'
  },
  {
    id: 'governance-enterprise-slas-matrix',
    family: 'governance',
    title: 'Enterprise Quality Service Level Agreements (SLAs)',
    subtitle: 'Triage, Regression, Creation, and Resolution SLA Grid',
    description: 'Comprehensive grid measuring SLA compliance against contractual targets.',
    defaultColSpan: 4,
    iconName: 'ShieldCheck'
  },
  {
    id: 'governance-accessibility-audit-panel',
    family: 'governance',
    title: 'Accessibility (WCAG 2.2 AA) Audit Breakdown',
    subtitle: 'Contrast, Keyboards, and Screen Reader Conformance',
    description: 'Detailed audit ledger breaking down WCAG digital accessibility compliance standards.',
    defaultColSpan: 2,
    iconName: 'Compass'
  },
  {
    id: 'governance-benchmarks-panel',
    family: 'governance',
    title: 'SaaS Performance & Reliability Benchmarks',
    subtitle: 'P95/P99 Spike Latency & HTTP 5xx Error Rates',
    description: 'Operational benchmarks evaluating system stress levels and runtime latency under load.',
    defaultColSpan: 2,
    iconName: 'Zap'
  },
  {
    id: 'leading-indicators-panel',
    family: 'leadingLagging',
    title: 'Leading Indicators (Predictive & In-Flight)',
    subtitle: 'Signals Measured Before Release Gating',
    description: 'Shift-left telemetry tracking PR quality gate compliance, coupling ratio, and coverage.',
    defaultColSpan: 4,
    iconName: 'Compass'
  },
  {
    id: 'lagging-indicators-panel',
    family: 'leadingLagging',
    title: 'Lagging Indicators (Realized Outcomes & Stability)',
    subtitle: 'Historical Metrics Validating Quality Rigor',
    description: 'Post-hoc metrics tracking customer defect leakage, DORA CFR, MTTR, and CoPQ.',
    defaultColSpan: 4,
    iconName: 'Activity'
  },
  {
    id: 'defect-discovery-origin-breakdown',
    family: 'leadingLagging',
    title: 'Defect Discovery Origin Breakdown',
    subtitle: 'Formal Scripted vs Exploratory vs Customer Escapes',
    description: 'Origin analysis attributing defect detection to TestRail, CI/CD, bug bashes, or APARs.',
    defaultColSpan: 2,
    iconName: 'Layers'
  },
  {
    id: 'non-formal-intercepted-defects-table',
    family: 'leadingLagging',
    title: 'Major Defects Intercepted via Non-Formal Testing',
    subtitle: 'High-Severity Bugs Prevented from Production Escape',
    description: 'Table of exploratory interceptions with avoided outage dollar valuations.',
    defaultColSpan: 4,
    iconName: 'AlertTriangle'
  }
];

export const KPI_REGISTRY_MAP = new Map<string, KPIWidgetDescriptor>(
  KPI_REGISTRY.map(item => [item.id, item])
);
