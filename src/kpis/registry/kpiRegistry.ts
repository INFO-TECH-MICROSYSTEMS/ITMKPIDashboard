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
  TrendPoint
} from '../../types/kpiPlatform';

export interface CalculatedMetricsDeck {
  executiveScorecard: ReleaseQualityScorecard;
  testDistributionAll: TestStatusDistribution;
  severityCounts?: { p1Blockers: number; p2Critical: number; p3Major: number; p4Minor: number };
  agingBuckets?: { zeroToThreeDays: number; fourToSevenDays: number; eightToFourteenDays: number; fifteenPlusDays: number };
  defectTrends?: TrendPoint[];
  defectBurnoutTrend?: TrendPoint[];
  mttrMttd?: QualityDiagnosticsSummary;
  componentRisks?: ComponentRiskMetric[];
  automationHealth?: AutomationHealthSummary;
  nearMissAnalytics?: NearMissAnalyticsSummary;
  blockerDefectsCount?: number;
  leadTimeHours?: number;
  sprintChurnRate?: number;
  meanTimeToResolutionHours?: number;
  defectReopenRate?: number;
  untestedCommitsCount?: number;
  hotspotModulesCount?: number;
  automationPassRate?: number;
  flakyTestCount?: number;
  ciRuntimeMinutes?: number;
  completedStoryPoints?: number;
  dailyExecutionRate?: number;
  slaAdherencePercent?: number;
  accessibilityScore?: number;
  escapePreventionRatio?: number;
  totalAvoidedOutageCost?: number;
  totalAvoidedDowntimeHours?: number;
  releaseReadinessScore?: number;
  readinessGrade?: string;
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
  defaultColSpan: 1 | 2 | 3;
  iconName: string;
}

export interface KPIWidgetRenderProps {
  metrics: CalculatedMetricsDeck;
  metricsB?: CalculatedMetricsDeck;
  isCompareMode?: boolean;
  isEditable?: boolean;
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  canMoveLeft?: boolean;
  canMoveRight?: boolean;
  onJustifyMetric?: (metricKey: string) => void;
}

/**
 * KPI_REGISTRY: Master catalog of all modular KPI widgets in the platform.
 * Allows users to choose any metric across the entire engineering suite for their custom categories.
 */
export const KPI_REGISTRY: KPIWidgetDescriptor[] = [
  // --- EXECUTIVE SCORECARD ---
  {
    id: 'executive-readiness-gauge',
    family: 'executive',
    title: 'Release Readiness Score',
    subtitle: 'Overall Delivery Quality & Gate Posture',
    description: 'Composite enterprise score synthesized from defect density, automated regression, and security gates.',
    defaultColSpan: 1,
    iconName: 'ShieldCheck'
  },
  {
    id: 'executive-blocker-card',
    family: 'executive',
    title: 'Gating & Blocker Defects',
    subtitle: 'P1/P2 Active Release Blockers',
    description: 'Count of active blocker bugs stalling production deployment branches.',
    defaultColSpan: 1,
    iconName: 'AlertTriangle'
  },
  {
    id: 'executive-dora-lead-time',
    family: 'executive',
    title: 'Lead Time for Changes',
    subtitle: 'DORA Velocity & Pipeline Cycle Time',
    description: 'Average hours elapsed between initial code commit and validated production staging.',
    defaultColSpan: 1,
    iconName: 'TrendingUp'
  },
  {
    id: 'executive-delivery-health-card',
    family: 'executive',
    title: 'Sprint Scope Volatility',
    subtitle: 'Mid-Sprint Churn & Injection Rate',
    description: 'Percentage of story point modifications committed after sprint commitment lockdown.',
    defaultColSpan: 1,
    iconName: 'Activity'
  },

  // --- QUALITY & DEFECTS ---
  {
    id: 'quality-defect-burnout-chart',
    family: 'quality',
    title: 'Defect Burnout & Discovery Trend',
    subtitle: 'Found vs Resolved Bug Convergence',
    description: 'Multi-day velocity tracking incoming defect discovery versus remediation resolution velocity.',
    defaultColSpan: 2,
    iconName: 'Activity'
  },
  {
    id: 'quality-mttr-card',
    family: 'quality',
    title: 'Mean Time to Resolution (MTTR)',
    subtitle: 'Average Bug Fix Turnaround',
    description: 'Hours elapsed from defect triage confirmation until engineer merges verified fix.',
    defaultColSpan: 1,
    iconName: 'Clock'
  },
  {
    id: 'quality-reopen-rate-card',
    family: 'quality',
    title: 'Defect Reopen Rate',
    subtitle: 'Fix Quality & Re-verification Failure',
    description: 'Proportion of resolved bugs that failed verification and were transitioned back to Open.',
    defaultColSpan: 1,
    iconName: 'RefreshCw'
  },

  // --- RISK & GATING ---
  {
    id: 'risk-untested-commits-card',
    family: 'risk',
    title: 'Untested Code Commits',
    subtitle: 'Gaps in Continuous Integration Runs',
    description: 'Number of mainline code merges deployed without corresponding unit or API test executions.',
    defaultColSpan: 1,
    iconName: 'AlertTriangle'
  },
  {
    id: 'risk-hotspot-files-card',
    family: 'risk',
    title: 'High Complexity Hotspots',
    subtitle: 'Code Files With Frequent Bug Regressions',
    description: 'Repository source modules exhibiting both high churn rates and multiple defect reports.',
    defaultColSpan: 1,
    iconName: 'Cpu'
  },

  // --- AUTOMATION ROI ---
  {
    id: 'automation-pass-rate-gauge',
    family: 'automation',
    title: 'Automated Suite Pass Rate',
    subtitle: 'Continuous Integration Test Reliability',
    description: 'Percentage of automated end-to-end and regression test executions passing cleanly on CI.',
    defaultColSpan: 1,
    iconName: 'Gauge'
  },
  {
    id: 'automation-flaky-tests-card',
    family: 'automation',
    title: 'Flaky Test Cases Detected',
    subtitle: 'Non-Deterministic Failure Rate',
    description: 'Tests that intermittently toggle between pass and fail without underlying code alterations.',
    defaultColSpan: 1,
    iconName: 'Cpu'
  },
  {
    id: 'automation-runtime-card',
    family: 'automation',
    title: 'CI Test Execution Runtime',
    subtitle: 'Pipeline Duration & Feedback Loop',
    description: 'P95 execution time of full automated regression suite in minutes.',
    defaultColSpan: 1,
    iconName: 'Clock'
  },

  // --- PRODUCTIVITY & CAPACITY ---
  {
    id: 'productivity-velocity-card',
    family: 'productivity',
    title: 'Sprint Story Points Delivered',
    subtitle: 'Squad Execution Velocity',
    description: 'Total completed and QA-verified story points within the selected sprint window.',
    defaultColSpan: 1,
    iconName: 'TrendingUp'
  },
  {
    id: 'productivity-test-execution-rate',
    family: 'productivity',
    title: 'Daily Test Execution Rate',
    subtitle: 'Quality Assurance Velocity',
    description: 'Number of manual and exploratory test cases validated per engineer per working day.',
    defaultColSpan: 1,
    iconName: 'Activity'
  },

  // --- GOVERNANCE & SLAS ---
  {
    id: 'governance-sla-gauge',
    family: 'governance',
    title: 'P1/P2 SLA Adherence',
    subtitle: 'Critical Bug Remediation Compliance',
    description: 'Compliance percentage against enterprise contractual resolution timeframes.',
    defaultColSpan: 1,
    iconName: 'ShieldCheck'
  },
  {
    id: 'governance-accessibility-card',
    family: 'governance',
    title: 'WCAG 2.2 AA Accessibility Compliance',
    subtitle: 'Digital Inclusion & Usability Score',
    description: 'Audit pass rate verifying color contrast, screen reader aria attributes, and keyboard navigation.',
    defaultColSpan: 1,
    iconName: 'Compass'
  },

  // --- LEADING / LAGGING & NEAR MISSES ---
  {
    id: 'leading-escape-prevention-gauge',
    family: 'leadingLagging',
    title: 'Escape Prevention Ratio',
    subtitle: 'Pre-Production Interception Rate',
    description: 'Percentage of critical near-miss defects intercepted during pre-production verification.',
    defaultColSpan: 1,
    iconName: 'ShieldCheck'
  },
  {
    id: 'leading-avoided-cost-card',
    family: 'leadingLagging',
    title: 'Estimated Averted Outage Cost',
    subtitle: 'Financial ROI of Proactive Quality Interception',
    description: 'Calculated savings based on averted production downtime hours and business impact.',
    defaultColSpan: 1,
    iconName: 'TrendingUp'
  }
];

export const KPI_REGISTRY_MAP = new Map<string, KPIWidgetDescriptor>(
  KPI_REGISTRY.map(item => [item.id, item])
);
