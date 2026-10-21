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
  TestExecutionBurnoutForecast,
  AgingBuckets,
  DefectSeverityCounts,
  TrendPoint,
  QualityDiagnosticsSummary,
  ComponentRiskMetric,
  AutomationHealthSummary,
  TestAutomationBurnoutForecast,
  PersonProductivityMetric,
  SquadProductivitySummary,
  LeadingLaggingMetricsSummary,
  NearMissAnalyticsSummary
} from '../../../types/kpiPlatform';

/**
 * Encapsulated bundle of all computed metrics for a given scope (Scope 1 or Scope 2).
 */
export interface ComputedKPIMetricsBundle {
  executiveScorecard: ReleaseQualityScorecard;
  agingBuckets: AgingBuckets;
  severityCounts: DefectSeverityCounts;
  testDistributionAll: TestStatusDistribution;
  testDistributionAutomated: TestStatusDistribution;
  testDistributionManual: TestStatusDistribution;
  defectTrends: TrendPoint[];
  testBurnoutForecast: TestExecutionBurnoutForecast;
  testAutomationForecast: TestAutomationBurnoutForecast;
  componentRisks: ComponentRiskMetric[];
  productivityMetrics: PersonProductivityMetric[];
  squadSummary?: SquadProductivitySummary;
  automationHealth: AutomationHealthSummary;
  mttrMttd: QualityDiagnosticsSummary;
  leadingLaggingMetrics: LeadingLaggingMetricsSummary;
  nearMissAnalytics: NearMissAnalyticsSummary;
}

/**
 * Standard comparison options passed to Category Views.
 */
export interface ViewComparisonProps {
  /** Whether the user has toggled dual-scope comparison mode */
  isCompareMode?: boolean;
  /** Label for Scope 1 (e.g. "YouTube v21.4.2") */
  scopeALabel?: string;
  /** Label for Scope 2 (e.g. "YouTube Studio v14.2.0") */
  scopeBLabel?: string;
  /** Complete metrics bundle calculated for Scope 2 */
  metricsB?: ComputedKPIMetricsBundle;
}
