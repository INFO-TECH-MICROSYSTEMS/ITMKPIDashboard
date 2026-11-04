/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import type { BaseClarificationDialogProps } from './BaseClarificationDialog';
import { BaseClarificationDialog } from './BaseClarificationDialog';

// Domain-Specific Concrete Clarification Dialogs
import {
  ReleaseQualityClarificationDialog,
  BlockerDefectsClarificationDialog,
  DefectLeakageClarificationDialog,
  RegressionCycleClarificationDialog,
  CopqClarificationDialog,
  CfrClarificationDialog,
  MttrRestoreClarificationDialog,
  SprintPredictabilityClarificationDialog,
  FeatureLeadTimeClarificationDialog,
  SecurityVulnsClarificationDialog,
  ContractUptimeClarificationDialog,
  TestBurnoutClarificationDialog,
  TestDistributionClarificationDialog
} from './domains/ExecutiveClarificationDialogs';

import {
  AutomationPassRateClarificationDialog,
  FlakyTestClarificationDialog,
  PipelineRuntimeClarificationDialog,
  ManualHoursSavedClarificationDialog,
  CicdComputeCostClarificationDialog,
  MtbfClarificationDialog,
  AutomationCatchRatioClarificationDialog,
  AutomationForecastClarificationDialog
} from './domains/AutomationClarificationDialogs';

import {
  MttrResolveClarificationDialog,
  MttdDetectClarificationDialog,
  DefectReopenRateClarificationDialog,
  CustomerAparClarificationDialog,
  DefectDensityClarificationDialog,
  FirstTimeFixRateClarificationDialog,
  NetDefectVelocityClarificationDialog,
  DefectAgingClarificationDialog,
  DefectBurnoutTrendClarificationDialog
} from './domains/QualityClarificationDialogs';

import {
  NoUnitTestsClarificationDialog,
  NoApiTestsClarificationDialog,
  DependencyDepthClarificationDialog,
  HighExecutionTestsClarificationDialog,
  ComponentMatrixRiskClarificationDialog,
  BlockedDevItemsClarificationDialog
} from './domains/RiskClarificationDialogs';

import {
  TestCompletionRateClarificationDialog,
  OvercommittedEngineersClarificationDialog,
  StoryVelocityClarificationDialog,
  ActiveSpecialistsClarificationDialog,
  FlowEfficiencyClarificationDialog,
  SpilloverRateClarificationDialog,
  DevToQaRatioClarificationDialog
} from './domains/ProductivityClarificationDialogs';

import {
  SlaAdherenceClarificationDialog,
  AccessibilityClarificationDialog,
  PerformanceLatencyClarificationDialog,
  CsatClarificationDialog,
  SlaPenaltiesClarificationDialog,
  TraceabilityClarificationDialog
} from './domains/GovernanceClarificationDialogs';

import {
  LeadingHealthIndexClarificationDialog,
  LaggingStabilityClarificationDialog,
  NearMissesInterceptedClarificationDialog,
  AvoidedOutageLossClarificationDialog,
  PrQualityGateClarificationDialog,
  HighDependencyRatioClarificationDialog,
  InFlightAutomationClarificationDialog,
  ExploratoryRatioClarificationDialog
} from './domains/LeadingLaggingClarificationDialogs';

export type ClarificationDialogComponent = React.FC<BaseClarificationDialogProps>;

/**
 * Polymorphic Registry mapping KPI clarification titles, metric keys, or aliases
 * to concrete specialized dialog classes/components.
 */
export const CLARIFICATION_DIALOG_REGISTRY: Record<string, ClarificationDialogComponent> = {
  // ==========================================
  // Executive Scorecard
  // ==========================================
  'Release Quality Index & Executive Evaluation': ReleaseQualityClarificationDialog,
  'releaseQualityIndex': ReleaseQualityClarificationDialog,

  'Blocking / Gating Defects': BlockerDefectsClarificationDialog,
  'blockerDefects': BlockerDefectsClarificationDialog,
  'Gating Blockers & Critical Defects': BlockerDefectsClarificationDialog,
  'Active Release Gating Defects Sign-Off Ledger': BlockerDefectsClarificationDialog,
  'gatingDefectsTable': BlockerDefectsClarificationDialog,

  'Defect Leakage (Customer APARs)': DefectLeakageClarificationDialog,
  'defectLeakage': DefectLeakageClarificationDialog,
  'Customer Defect Leakage Rate': DefectLeakageClarificationDialog,

  'Regression Cycle Time': RegressionCycleClarificationDialog,
  'regressionCycleTime': RegressionCycleClarificationDialog,

  'Cost of Poor Quality (CoPQ) & Rework Impact': CopqClarificationDialog,
  'costOfPoorQuality': CopqClarificationDialog,

  'DORA Change Failure Rate (CFR)': CfrClarificationDialog,
  'changeFailureRate': CfrClarificationDialog,

  'Mean Time to Restore (MTTR)': MttrRestoreClarificationDialog,
  'meanTimeToRestoreHours': MttrRestoreClarificationDialog,

  'Sprint Predictability Index (SPI)': SprintPredictabilityClarificationDialog,
  'sprintPredictabilityIndex': SprintPredictabilityClarificationDialog,

  'Feature Lead Time (Commit-to-Customer)': FeatureLeadTimeClarificationDialog,
  'featureLeadTimeDays': FeatureLeadTimeClarificationDialog,

  'Security Gate Vulnerabilities & CVE Compliance': SecurityVulnsClarificationDialog,
  'securityVulnerabilities': SecurityVulnsClarificationDialog,

  'Contractual Production SLA Uptime': ContractUptimeClarificationDialog,
  'contractUptimePercentage': ContractUptimeClarificationDialog,

  'Test Execution Burnout & Predictive Velocity Forecast': TestBurnoutClarificationDialog,
  'testBurnoutForecast': TestBurnoutClarificationDialog,

  'Test Suite Execution Distribution': TestDistributionClarificationDialog,
  'testDistribution': TestDistributionClarificationDialog,
  'automatedTestExecution': TestDistributionClarificationDialog,
  'manualExploratoryExecution': TestDistributionClarificationDialog,

  // ==========================================
  // Automation & CI/CD
  // ==========================================
  'Automated Test Suite Pass Rate': AutomationPassRateClarificationDialog,
  'automationSuitePassRate': AutomationPassRateClarificationDialog,

  'Flaky Test Detection Index': FlakyTestClarificationDialog,
  'flakyIndex': FlakyTestClarificationDialog,
  'Flaky Test Index & Nondeterminism': FlakyTestClarificationDialog,
  'Flaky Automated Tests & Quarantine Ledger': FlakyTestClarificationDialog,
  'flakyTestsTable': FlakyTestClarificationDialog,

  'CI/CD Pipeline Runtime': PipelineRuntimeClarificationDialog,
  'pipelineRuntime': PipelineRuntimeClarificationDialog,
  'CI/CD Pipeline Execution Runtime': PipelineRuntimeClarificationDialog,

  'Manual Hours Saved (Automation ROI)': ManualHoursSavedClarificationDialog,
  'hoursSavedRoi': ManualHoursSavedClarificationDialog,

  'CI/CD Cloud Runner Compute Expenditure': CicdComputeCostClarificationDialog,
  'computeCost': CicdComputeCostClarificationDialog,

  'Mean Time Between Test Flakes (MTBF)': MtbfClarificationDialog,
  'mtbf': MtbfClarificationDialog,

  'Automation Defect Catch Ratio': AutomationCatchRatioClarificationDialog,
  'defectCatchRatio': AutomationCatchRatioClarificationDialog,

  'Test Automation Burnout & Predictive Velocity Forecast': AutomationForecastClarificationDialog,
  'testAutomationForecast': AutomationForecastClarificationDialog,

  // ==========================================
  // Quality & Defects
  // ==========================================
  'Mean Time to Resolve (MTTR)': MttrResolveClarificationDialog,
  'meanTimeToResolve': MttrResolveClarificationDialog,

  'Mean Time to Detect (MTTD)': MttdDetectClarificationDialog,
  'meanTimeToDetect': MttdDetectClarificationDialog,

  'Defect Reopen Rate': DefectReopenRateClarificationDialog,
  'defectReopenRate': DefectReopenRateClarificationDialog,

  'Customer Escalations (APARs)': CustomerAparClarificationDialog,
  'customerEscalations': CustomerAparClarificationDialog,

  'Defect Density per 1,000 Lines of Code (KLOC)': DefectDensityClarificationDialog,
  'defectDensity': DefectDensityClarificationDialog,

  'First-Time Fix Rate (FTFR)': FirstTimeFixRateClarificationDialog,
  'firstTimeFixRate': FirstTimeFixRateClarificationDialog,

  'Net Defect Intake Velocity': NetDefectVelocityClarificationDialog,
  'netDefectIntake': NetDefectVelocityClarificationDialog,

  'Defect Aging Profile': DefectAgingClarificationDialog,
  'agingProfile': DefectAgingClarificationDialog,
  'agingProfileUnder7': DefectAgingClarificationDialog,
  'agingProfile7To14': DefectAgingClarificationDialog,
  'agingProfile14To21': DefectAgingClarificationDialog,
  'agingProfile21Plus': DefectAgingClarificationDialog,

  'Defect Discovery vs. Resolution Burnout Trend': DefectBurnoutTrendClarificationDialog,
  'defectBurnoutTrend': DefectBurnoutTrendClarificationDialog,
  'defectSeverity': DefectBurnoutTrendClarificationDialog,

  // ==========================================
  // Risk & Gating
  // ==========================================
  'Items With No Unit Tests': NoUnitTestsClarificationDialog,
  'noUnitTests': NoUnitTestsClarificationDialog,

  'Items With No API Tests': NoApiTestsClarificationDialog,
  'noApiTests': NoApiTestsClarificationDialog,

  'High Dependency Depth (Depth ≥ 4)': DependencyDepthClarificationDialog,
  'highDependencyDepth': DependencyDepthClarificationDialog,
  'High Dependency Depth Architecture': DependencyDepthClarificationDialog,

  'High Execution Time Tests (>300s)': HighExecutionTestsClarificationDialog,
  'highExecutionTests': HighExecutionTestsClarificationDialog,

  'Component Risk & Dependency Gating Matrix': ComponentMatrixRiskClarificationDialog,
  'componentMatrix': ComponentMatrixRiskClarificationDialog,
  'Component Failure Risk Matrix': ComponentMatrixRiskClarificationDialog,

  'Blocked Development Items': BlockedDevItemsClarificationDialog,
  'blockedDevelopmentItems': BlockedDevItemsClarificationDialog,

  // ==========================================
  // Productivity & Agility
  // ==========================================
  'Average QA Test Completion Rate': TestCompletionRateClarificationDialog,
  'testCompletionRate': TestCompletionRateClarificationDialog,

  'Over-Committed Engineers': OvercommittedEngineersClarificationDialog,
  'overcommittedEngineers': OvercommittedEngineersClarificationDialog,

  'Sprint Story Completion Rate': StoryVelocityClarificationDialog,
  'storyCompletionRate': StoryVelocityClarificationDialog,
  'Story Completion Velocity': StoryVelocityClarificationDialog,

  'Active QA Specialists & Capacity': ActiveSpecialistsClarificationDialog,
  'activeSpecialists': ActiveSpecialistsClarificationDialog,

  'Flow Efficiency (Active vs Wait Time)': FlowEfficiencyClarificationDialog,
  'flowEfficiency': FlowEfficiencyClarificationDialog,
  'Sprint Flow Efficiency': FlowEfficiencyClarificationDialog,

  'Sprint Carry-Over & Spillover Rate': SpilloverRateClarificationDialog,
  'spilloverRate': SpilloverRateClarificationDialog,

  'Developer to QA Staffing Ratio': DevToQaRatioClarificationDialog,
  'devToQaRatio': DevToQaRatioClarificationDialog,

  'QA Engineer Test Assignment & Throughput Ledger': ActiveSpecialistsClarificationDialog,
  'productivityLedger': ActiveSpecialistsClarificationDialog,

  // ==========================================
  // Governance & SLAs
  // ==========================================
  'Enterprise Quality SLA Adherence': SlaAdherenceClarificationDialog,
  'slaAdherence': SlaAdherenceClarificationDialog,
  'Enterprise SLA Adherence & Uptime': SlaAdherenceClarificationDialog,
  'enterpriseSlasMatrix': SlaAdherenceClarificationDialog,

  'WCAG 2.2 AA Accessibility Compliance': AccessibilityClarificationDialog,
  'accessibilityScore': AccessibilityClarificationDialog,
  'WCAG Accessibility Conformance': AccessibilityClarificationDialog,
  'Accessibility (WCAG 2.2 AA) Multi-Criteria Audit': AccessibilityClarificationDialog,
  'accessibilityAuditPanel': AccessibilityClarificationDialog,

  'Performance P95 Latency Benchmark': PerformanceLatencyClarificationDialog,
  'performanceP95': PerformanceLatencyClarificationDialog,
  'SaaS Performance & Reliability Benchmarks': PerformanceLatencyClarificationDialog,
  'benchmarksPanel': PerformanceLatencyClarificationDialog,

  'Stakeholder Satisfaction (CSAT)': CsatClarificationDialog,
  'csat': CsatClarificationDialog,

  'Contractual SLA Credit Penalties Incurred': SlaPenaltiesClarificationDialog,
  'contractPenalties': SlaPenaltiesClarificationDialog,

  'Audit Trail & Requirement Traceability Index': TraceabilityClarificationDialog,
  'auditTraceability': TraceabilityClarificationDialog,
  'Requirement Traceability Matrix': TraceabilityClarificationDialog,

  // ==========================================
  // Leading, Lagging & Near Misses
  // ==========================================
  'Proactive Leading Health Index': LeadingHealthIndexClarificationDialog,
  'leadingHealthIndex': LeadingHealthIndexClarificationDialog,
  'Leading & Lagging Quality Indicator Correlation': LeadingHealthIndexClarificationDialog,
  'leadingIndicatorsPanel': LeadingHealthIndexClarificationDialog,

  'Lagging Outcome Stability': LaggingStabilityClarificationDialog,
  'laggingStability': LaggingStabilityClarificationDialog,
  'laggingIndicatorsPanel': LaggingStabilityClarificationDialog,

  'Pre-Production Near Misses Intercepted': NearMissesInterceptedClarificationDialog,
  'escapePreventionRatio': NearMissesInterceptedClarificationDialog,
  'Near Miss Analysis & Non-Formal Testing Telemetry': NearMissesInterceptedClarificationDialog,
  'nonFormalDefectsTable': NearMissesInterceptedClarificationDialog,
  'defectDiscoveryOrigin': NearMissesInterceptedClarificationDialog,
  'Defect Discovery Origin Breakdown': NearMissesInterceptedClarificationDialog,

  'Avoided Outage Loss ($ COPQ)': AvoidedOutageLossClarificationDialog,
  'totalAvoidedOutageCost': AvoidedOutageLossClarificationDialog,

  'PR Code Quality Gate Compliance': PrQualityGateClarificationDialog,
  'High Dependency Coupling Ratio': HighDependencyRatioClarificationDialog,
  'In-Flight Automated Test Coverage': InFlightAutomationClarificationDialog,
  'Exploratory & Ad-Hoc Shift-Left Ratio': ExploratoryRatioClarificationDialog
};

/**
 * Factory resolver to look up the appropriate concrete clarification dialog component.
 * Defaults gracefully to the BaseClarificationDialog for any standard KPI.
 */
export function getClarificationDialogForKPI(titleOrKey?: string): ClarificationDialogComponent {
  if (!titleOrKey) return BaseClarificationDialog;
  return CLARIFICATION_DIALOG_REGISTRY[titleOrKey] || BaseClarificationDialog;
}

export * from './BaseClarificationDialog';
export * from './domains/ExecutiveClarificationDialogs';
export * from './domains/AutomationClarificationDialogs';
export * from './domains/QualityClarificationDialogs';
export * from './domains/RiskClarificationDialogs';
export * from './domains/ProductivityClarificationDialogs';
export * from './domains/GovernanceClarificationDialogs';
export * from './domains/LeadingLaggingClarificationDialogs';
