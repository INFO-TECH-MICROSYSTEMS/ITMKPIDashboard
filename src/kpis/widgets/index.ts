/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import type { KPIWidgetRenderProps } from '../registry/kpiRegistry';

// Import all 68 individual widget components
import { ExecutiveBlockerCardKPI } from './executive/ExecutiveBlockerCardKPI';
import { ExecutiveCfrCardKPI } from './executive/ExecutiveCfrCardKPI';
import { ExecutiveContractUptimeKPI } from './executive/ExecutiveContractUptimeKPI';
import { ExecutiveCopqCardKPI } from './executive/ExecutiveCopqCardKPI';
import { ExecutiveFeatureLeadTimeKPI } from './executive/ExecutiveFeatureLeadTimeKPI';
import { ExecutiveLatencyP95KPI } from './executive/ExecutiveLatencyP95KPI';
import { ExecutiveLeakageCardKPI } from './executive/ExecutiveLeakageCardKPI';
import { ExecutiveMttrRestoreKPI } from './executive/ExecutiveMttrRestoreKPI';
import { ExecutiveReadinessGaugeKPI } from './executive/ExecutiveReadinessGaugeKPI';
import { ExecutiveRegressionCycleKPI } from './executive/ExecutiveRegressionCycleKPI';
import { ExecutiveSecurityVulnsKPI } from './executive/ExecutiveSecurityVulnsKPI';
import { ExecutiveSprintPredictabilityKPI } from './executive/ExecutiveSprintPredictabilityKPI';
import { ExecutiveTestBurnoutForecastKPI } from './executive/ExecutiveTestBurnoutForecastKPI';
import { ExecutiveTestSuiteSnapshotKPI } from './executive/ExecutiveTestSuiteSnapshotKPI';
import { ExecutiveWcagComplianceKPI } from './executive/ExecutiveWcagComplianceKPI';
import { QualityActiveGatingDefectsTableKPI } from './quality/QualityActiveGatingDefectsTableKPI';
import { QualityAgingProfileKPI } from './quality/QualityAgingProfileKPI';
import { QualityCustomerAparsKPI } from './quality/QualityCustomerAparsKPI';
import { QualityDefectBurnoutChartKPI } from './quality/QualityDefectBurnoutChartKPI';
import { QualityDefectDensityKPI } from './quality/QualityDefectDensityKPI';
import { QualityDefectSeverityBreakdownKPI } from './quality/QualityDefectSeverityBreakdownKPI';
import { QualityFirstTimeFixRateKPI } from './quality/QualityFirstTimeFixRateKPI';
import { QualityMttdDetectKPI } from './quality/QualityMttdDetectKPI';
import { QualityMttrResolveKPI } from './quality/QualityMttrResolveKPI';
import { QualityNetIntakeVelocityKPI } from './quality/QualityNetIntakeVelocityKPI';
import { QualityReopenRateCardKPI } from './quality/QualityReopenRateCardKPI';
import { RiskBlockedDevelopmentItemsKPI } from './risk/RiskBlockedDevelopmentItemsKPI';
import { RiskComponentMatrixKPI } from './risk/RiskComponentMatrixKPI';
import { RiskHighDependencyDepthKPI } from './risk/RiskHighDependencyDepthKPI';
import { RiskHighDependencyDepthListKPI } from './risk/RiskHighDependencyDepthListKPI';
import { RiskHighExecutionTestsKPI } from './risk/RiskHighExecutionTestsKPI';
import { RiskNoApiTestsKPI } from './risk/RiskNoApiTestsKPI';
import { RiskNoUnitTestsKPI } from './risk/RiskNoUnitTestsKPI';
import { AutomationBurnoutVelocityForecastKPI } from './automation/AutomationBurnoutVelocityForecastKPI';
import { AutomationComputeCostKPI } from './automation/AutomationComputeCostKPI';
import { AutomationDefectCatchRatioKPI } from './automation/AutomationDefectCatchRatioKPI';
import { AutomationExecutionSplitBarsKPI } from './automation/AutomationExecutionSplitBarsKPI';
import { AutomationFlakyIndexKPI } from './automation/AutomationFlakyIndexKPI';
import { AutomationFlakyTestsTableKPI } from './automation/AutomationFlakyTestsTableKPI';
import { AutomationHoursSavedRoiKPI } from './automation/AutomationHoursSavedRoiKPI';
import { AutomationMtbfKPI } from './automation/AutomationMtbfKPI';
import { AutomationPipelineRuntimeKPI } from './automation/AutomationPipelineRuntimeKPI';
import { AutomationSuitePassRateKPI } from './automation/AutomationSuitePassRateKPI';
import { ProductivityActiveSpecialistsKPI } from './productivity/ProductivityActiveSpecialistsKPI';
import { ProductivityDevToQaRatioKPI } from './productivity/ProductivityDevToQaRatioKPI';
import { ProductivityEngineerLedgerTableKPI } from './productivity/ProductivityEngineerLedgerTableKPI';
import { ProductivityFlowEfficiencyKPI } from './productivity/ProductivityFlowEfficiencyKPI';
import { ProductivityOvercommittedKPI } from './productivity/ProductivityOvercommittedKPI';
import { ProductivitySpilloverRateKPI } from './productivity/ProductivitySpilloverRateKPI';
import { ProductivityStoryCompletionKPI } from './productivity/ProductivityStoryCompletionKPI';
import { ProductivityTestCompletionRateKPI } from './productivity/ProductivityTestCompletionRateKPI';
import { GovernanceAccessibilityAuditPanelKPI } from './governance/GovernanceAccessibilityAuditPanelKPI';
import { GovernanceBenchmarksPanelKPI } from './governance/GovernanceBenchmarksPanelKPI';
import { GovernanceCsatKPI } from './governance/GovernanceCsatKPI';
import { GovernanceEnterpriseSlasMatrixKPI } from './governance/GovernanceEnterpriseSlasMatrixKPI';
import { GovernanceLatencyP95KPI } from './governance/GovernanceLatencyP95KPI';
import { GovernanceSlaAdherenceKPI } from './governance/GovernanceSlaAdherenceKPI';
import { GovernanceSlaPenaltiesKPI } from './governance/GovernanceSlaPenaltiesKPI';
import { GovernanceTraceabilityKPI } from './governance/GovernanceTraceabilityKPI';
import { GovernanceWcagAccessibilityKPI } from './governance/GovernanceWcagAccessibilityKPI';
import { AvoidedOutageLossKPI } from './leadingLagging/AvoidedOutageLossKPI';
import { DefectDiscoveryOriginBreakdownKPI } from './leadingLagging/DefectDiscoveryOriginBreakdownKPI';
import { LaggingIndicatorsPanelKPI } from './leadingLagging/LaggingIndicatorsPanelKPI';
import { LaggingOutcomeStabilityKPI } from './leadingLagging/LaggingOutcomeStabilityKPI';
import { LeadingHealthIndexKPI } from './leadingLagging/LeadingHealthIndexKPI';
import { LeadingIndicatorsPanelKPI } from './leadingLagging/LeadingIndicatorsPanelKPI';
import { NearMissesInterceptedKPI } from './leadingLagging/NearMissesInterceptedKPI';
import { NonFormalInterceptedDefectsTableKPI } from './leadingLagging/NonFormalInterceptedDefectsTableKPI';

export {
  ExecutiveBlockerCardKPI,
  ExecutiveCfrCardKPI,
  ExecutiveContractUptimeKPI,
  ExecutiveCopqCardKPI,
  ExecutiveFeatureLeadTimeKPI,
  ExecutiveLatencyP95KPI,
  ExecutiveLeakageCardKPI,
  ExecutiveMttrRestoreKPI,
  ExecutiveReadinessGaugeKPI,
  ExecutiveRegressionCycleKPI,
  ExecutiveSecurityVulnsKPI,
  ExecutiveSprintPredictabilityKPI,
  ExecutiveTestBurnoutForecastKPI,
  ExecutiveTestSuiteSnapshotKPI,
  ExecutiveWcagComplianceKPI,
  QualityActiveGatingDefectsTableKPI,
  QualityAgingProfileKPI,
  QualityCustomerAparsKPI,
  QualityDefectBurnoutChartKPI,
  QualityDefectDensityKPI,
  QualityDefectSeverityBreakdownKPI,
  QualityFirstTimeFixRateKPI,
  QualityMttdDetectKPI,
  QualityMttrResolveKPI,
  QualityNetIntakeVelocityKPI,
  QualityReopenRateCardKPI,
  RiskBlockedDevelopmentItemsKPI,
  RiskComponentMatrixKPI,
  RiskHighDependencyDepthKPI,
  RiskHighDependencyDepthListKPI,
  RiskHighExecutionTestsKPI,
  RiskNoApiTestsKPI,
  RiskNoUnitTestsKPI,
  AutomationBurnoutVelocityForecastKPI,
  AutomationComputeCostKPI,
  AutomationDefectCatchRatioKPI,
  AutomationExecutionSplitBarsKPI,
  AutomationFlakyIndexKPI,
  AutomationFlakyTestsTableKPI,
  AutomationHoursSavedRoiKPI,
  AutomationMtbfKPI,
  AutomationPipelineRuntimeKPI,
  AutomationSuitePassRateKPI,
  ProductivityActiveSpecialistsKPI,
  ProductivityDevToQaRatioKPI,
  ProductivityEngineerLedgerTableKPI,
  ProductivityFlowEfficiencyKPI,
  ProductivityOvercommittedKPI,
  ProductivitySpilloverRateKPI,
  ProductivityStoryCompletionKPI,
  ProductivityTestCompletionRateKPI,
  GovernanceAccessibilityAuditPanelKPI,
  GovernanceBenchmarksPanelKPI,
  GovernanceCsatKPI,
  GovernanceEnterpriseSlasMatrixKPI,
  GovernanceLatencyP95KPI,
  GovernanceSlaAdherenceKPI,
  GovernanceSlaPenaltiesKPI,
  GovernanceTraceabilityKPI,
  GovernanceWcagAccessibilityKPI,
  AvoidedOutageLossKPI,
  DefectDiscoveryOriginBreakdownKPI,
  LaggingIndicatorsPanelKPI,
  LaggingOutcomeStabilityKPI,
  LeadingHealthIndexKPI,
  LeadingIndicatorsPanelKPI,
  NearMissesInterceptedKPI,
  NonFormalInterceptedDefectsTableKPI,
};

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
  'avoided-outage-loss': AvoidedOutageLossKPI,

  // Complex Operational & Analytical Widgets
  'executive-test-suite-snapshot': ExecutiveTestSuiteSnapshotKPI,
  'executive-test-burnout-forecast': ExecutiveTestBurnoutForecastKPI,
  'quality-aging-profile': QualityAgingProfileKPI,
  'quality-defect-severity-breakdown': QualityDefectSeverityBreakdownKPI,
  'quality-active-gating-defects-table': QualityActiveGatingDefectsTableKPI,
  'risk-component-matrix': RiskComponentMatrixKPI,
  'risk-blocked-development-items': RiskBlockedDevelopmentItemsKPI,
  'risk-high-dependency-depth-list': RiskHighDependencyDepthListKPI,
  'automation-burnout-velocity-forecast': AutomationBurnoutVelocityForecastKPI,
  'automation-execution-split-bars': AutomationExecutionSplitBarsKPI,
  'automation-flaky-tests-table': AutomationFlakyTestsTableKPI,
  'productivity-engineer-ledger-table': ProductivityEngineerLedgerTableKPI,
  'governance-enterprise-slas-matrix': GovernanceEnterpriseSlasMatrixKPI,
  'governance-accessibility-audit-panel': GovernanceAccessibilityAuditPanelKPI,
  'governance-benchmarks-panel': GovernanceBenchmarksPanelKPI,
  'leading-indicators-panel': LeadingIndicatorsPanelKPI,
  'lagging-indicators-panel': LaggingIndicatorsPanelKPI,
  'defect-discovery-origin-breakdown': DefectDiscoveryOriginBreakdownKPI,
  'non-formal-intercepted-defects-table': NonFormalInterceptedDefectsTableKPI
};

