/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * Quality Engineering KPI Platform - Data Models & Contracts
 * Strict type definitions representing data mined from JIRA, TestRail, and GitHub,
 * along with Connector Configuration, Sync Audit, and Calculated KPI Metrics.
 */

// ==========================================
// 1. DATA SOURCE & CONNECTOR TYPES
// ==========================================

export type DataSourceType = 'jira' | 'testrail' | 'github' | 'sonarqube';

export type RetrievalFrequency = 'manual' | 'hourly' | 'daily' | 'weekly' | 'sprint';

export interface DataSourceConfig {
  id: DataSourceType;
  name: string;
  enabled: boolean;
  endpointUrl: string;
  authType: 'apiKey' | 'bearerToken' | 'basicAuth';
  username?: string;
  apiTokenOrKey: string;
  projectOrOrgKey: string; // e.g. JIRA project key, GitHub org/repo, TestRail suite ID
  frequency: RetrievalFrequency;
  lastSyncTimestamp?: string;
  lastSyncStatus?: 'success' | 'failed' | 'in_progress';
  recordCount?: number;
}

export interface SyncAuditLog {
  id: string;
  timestamp: string;
  source: DataSourceType | 'all';
  recordsReplaced: number;
  durationMs: number;
  status: 'success' | 'error';
  errorMessage?: string;
}

// ==========================================
// 2. JIRA SCHEMAS (Planning, Epics, Stories, Bugs)
// ==========================================

export type WorkItemType = 'Epic' | 'Story' | 'Task' | 'Bug' | 'CustomerAPAR';
export type WorkItemStatus = 'Backlog' | 'In Development' | 'Under QA' | 'In Review' | 'Done' | 'Blocked' | 'Reopened';
export type WorkItemSeverity = 'P1-Blocker' | 'P2-Critical' | 'P3-Major' | 'P4-Minor';

export type DefectDiscoveryMethod = 
  | 'Formal Scripted Test' 
  | 'Automated CI Pipeline' 
  | 'Exploratory / Ad-hoc' 
  | 'Bug Bash / Dogfooding' 
  | 'Production / Customer APAR';

export interface JiraWorkItem {
  id: string; // e.g., "ITM-1024"
  title: string;
  type: WorkItemType;
  status: WorkItemStatus;
  severity: WorkItemSeverity;
  product: string; // e.g. "Cloud Gateway", "Payment Engine", "Mobile App"
  component: string; // e.g. "Authentication", "Billing API", "Dashboard"
  sprint: string; // e.g. "Sprint 2026.4", "Sprint 2026.5"
  releaseVersion: string; // e.g. "v3.4.0"
  assignee: string;
  qaOwner: string;
  storyPoints: number;
  dependencyDepth: number; // For Risk Assessment
  isGatingDefect: boolean; // Release-blocking bug
  isRegressionDefect: boolean;
  isCustomerDefect: boolean; // APAR / customer-reported
  discoveryMethod?: DefectDiscoveryMethod; // Origin of defect discovery
  isReopened: boolean;
  reopenCount: number;
  hasTestPlan: boolean;
  hasUnitTests: boolean;
  hasApiTests: boolean;
  createdAt: string; // ISO string
  qaQueueEntryDate?: string; // When moved to 'Under QA'
  resolvedAt?: string; // ISO string
  testingHoursSpent: number;
}

// ==========================================
// 3. TESTRAIL SCHEMAS (Test Cases & Executions)
// ==========================================

export type TestSuiteType = 'Unit' | 'API' | 'Contract' | 'UI' | 'Regression' | 'Performance' | 'Accessibility' | 'Security';
export type TestExecutionStatus = 'Passed' | 'Failed' | 'Blocked' | 'Unattempted';
export type TestExecutionMode = 'Automated' | 'Manual';

export interface TestRailExecution {
  id: string; // e.g. "TR-RUN-8841"
  caseId: string; // e.g. "C1204"
  title: string;
  suiteType: TestSuiteType;
  mode: TestExecutionMode;
  status: TestExecutionStatus;
  product: string;
  component: string;
  sprint: string;
  releaseVersion: string;
  executedBy: string;
  executionDate: string;
  durationSeconds: number;
  isFlaky: boolean;
  rerunCount: number;
  linkedJiraKey?: string;
  errorMessage?: string;
}

// ==========================================
// 4. GITHUB SCHEMAS (Commits, PRs, Workflows)
// ==========================================

export interface GitHubPullRequest {
  id: string; // e.g. "PR-489"
  number: number;
  title: string;
  author: string;
  repository: string;
  targetBranch: string;
  status: 'Open' | 'Merged' | 'Closed';
  createdAt: string;
  mergedAt?: string;
  linesAdded: number;
  linesDeleted: number;
  unitTestIncluded: boolean;
  apiTestIncluded: boolean;
  ciStatus: 'Passed' | 'Failed' | 'Running';
  pipelineDurationMinutes: number;
  linkedJiraKey?: string;
}

export interface GitHubCommit {
  id: string; // e.g. "c8a41bf"
  message: string;
  author: string;
  repository: string;
  timestamp: string;
  hasComplianceTest: boolean;
}

// ==========================================
// 5. FILTERING & MULTI-DIMENSIONAL QUERY STATE
// ==========================================

export interface ReleaseWindow {
  startDate: string; // ISO format: 'YYYY-MM-DD'
  endDate: string;   // ISO format: 'YYYY-MM-DD'
  totalDays: number;
  isActive: boolean;
  formattedRange: string;
}

export interface KPIFilterState {
  product: string; // 'All' or specific product
  component: string; // 'All' or specific component
  sprint: string; // 'All' or specific sprint
  releaseVersion: string; // 'All' or specific release
  dateRangeDays?: number; // Optional legacy parameter
}

// ==========================================
// 6. AGGREGATED METRICS & KPI RESULTS
// ==========================================

export interface AgingBuckets {
  pending7Days: number;
  pending7To14Days: number;
  pending14To21Days: number;
  pending21PlusDays: number;
}

export interface DefectSeverityCounts {
  blockerP1: number;
  criticalP2: number;
  majorP3: number;
  minorP4: number;
}

export interface TestStatusDistribution {
  passed: number;
  failed: number;
  blocked: number;
  unattempted: number;
  total: number;
  passRate: number;
}

export interface SLADetailedBreakdown {
  p1P2TriageRate: number;
  regressionExecutionRate: number;
  testPlanCreationRate: number;
  dailyReportRate: number;
  automationDeliveryRate: number;
  customerDefectResolutionRate: number;
}

export interface ReleaseQualityScorecard {
  overallScore: number; // 0 - 100
  releaseReadyGrade: 'A+' | 'A' | 'B' | 'C' | 'F';
  readinessVerdict: 'Release Approved' | 'Conditional Warning' | 'Gated / Blocked';
  gatingDefectCount: number;
  regressionDefectCount: number;
  customerDefectCount: number;
  defectLeakageRate: number; // %
  automationPassRate: number; // %
  automationCoverage: number; // %
  regressionCycleTimeDays: number;
  slaAdherenceRate: number; // %
  slaBreakdown: SLADetailedBreakdown;
  accessibilityScore: number; // WCAG 2.2 score %
  performanceP95Ms: number;
  performanceP99Ms: number;
  performanceErrorRate: number; // %
  // Executive & Senior Management Scorecard Enhancements
  costOfPoorQuality: number; // Estimated dollar rework impact ($)
  costSavingsAutomated: number; // Estimated testing hours saved * rate ($)
  changeFailureRate: number; // % of releases/deployments needing hotfixes/reverts
  meanTimeToRestoreHours: number; // MTTR for critical production incidents (hours)
  sprintPredictabilityIndex: number; // % of committed story points delivered
  featureLeadTimeDays: number; // Average cycle time commit/story to production (days)
  criticalVulnerabilitiesCount: number; // Active CVE / security gate blockers
  contractUptimePercentage: number; // Composite production availability (e.g. 99.98%)
}

export interface TrendPoint {
  date: string;
  label: string;
  value1: number;
  value2?: number;
  value3?: number;
  isProjected?: boolean;
}

export interface TestExecutionBurnoutForecast {
  historyAndForecast: TrendPoint[];
  currentDailyVelocity: number;
  remainingUntested: number;
  totalScope: number;
  completedSoFar: number;
  estimatedCompletionDate: string; // e.g. "Oct 19, 2026"
  daysToCompletion: number;
  isVelocityHealthy: boolean;
}

export interface TestAutomationBurnoutForecast {
  historyAndForecast: TrendPoint[];
  currentDailyVelocity: number;      // e.g. 18 tests/day automated
  manualTestsRemaining: number;      // Manual tests remaining to be automated
  totalScope: number;                // Total tests in suite
  automatedSoFar: number;            // Tests automated so far
  estimatedAllAutomatedDate: string; // e.g. "Oct 28, 2026"
  daysToAllAutomated: number;        // Days until 100% tests are automated
  isVelocityHealthy: boolean;        // Whether automation runway is within corporate target
  automationPercent: number;         // Current automation coverage %
}

export interface ComponentRiskMetric {
  component: string;
  failureRate: number;
  defectCount: number;
  gatingCount: number;
  testCoveragePercent: number;
  missingUnitTestsCount: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  // Enriched Risk Metrics
  cyclomaticComplexityRisk: number; // Avg complexity (Benchmark < 15)
  codeChurnLines: number; // Lines of code added/modified
  securityVulnerabilityCount: number; // Package & SAST findings
  licenseComplianceStatus: 'Passed' | 'Warning' | 'Blocked';
}

export interface PersonProductivityMetric {
  personName: string;
  assignedTests: number;
  completedTests: number;
  completionRate: number;
  delayedExecutions: number;
  isOverCommitted: boolean;
  avgHoursPerTest: number;
}

export interface SquadProductivitySummary {
  avgCompletionRate: number;
  overCommittedCount: number;
  flowEfficiencyPercent: number; // Active work time vs total lead time
  sprintSpilloverRate: number; // % of committed points carried over
  devToQaRatio: string; // e.g., "1:3.2"
}

export interface QualityDiagnosticsSummary {
  avgMttrHours: number;
  avgMttdHours: number;
  reopenRate: number;
  reopenedCount: number;
  defectDensityKloc: number; // Defects per 1,000 lines of code
  firstTimeFixRate: number; // % defects fixed without reopening
  netDefectIntakeVelocity: number; // Bugs in minus bugs closed
}

export interface AutomationHealthSummary {
  totalAutomated: number;
  totalManual: number;
  flakyCount: number;
  flakyRate: number;
  totalReruns: number;
  avgPipelineMins: number;
  manualHoursSaved: number;
  automationRatioPercent: number;
  // Enriched Automation Metrics
  cicdComputeCostDollars: number; // CI runner compute cost in USD
  mtbfHours: number; // Mean Time Between Flakes
  automationCatchRatio: number; // % defects caught by CI automation vs manual
}

// ==========================================
// 6.1 LEADING & LAGGING INDICATORS & NEAR MISSES
// ==========================================

export interface LeadingIndicatorMetric {
  id: string;
  name: string;
  category: 'Code Quality Gates' | 'Velocity Runway' | 'Test Gap Warning' | 'Risk Churn';
  value: number;
  formattedValue: string;
  target: string;
  status: 'Optimal' | 'Warning' | 'Breached';
  predictiveInsight: string;
}

export interface LaggingIndicatorMetric {
  id: string;
  name: string;
  category: 'Escaped Quality' | 'Operational Stability' | 'Financial Impact';
  value: number;
  formattedValue: string;
  target: string;
  status: 'Optimal' | 'Warning' | 'Breached';
  historicalOutcome: string;
}

export interface LeadingLaggingMetricsSummary {
  leadingHealthScore: number; // 0-100 composite leading index
  laggingHealthScore: number; // 0-100 composite lagging index
  leadingStatus: 'Predictive Green' | 'Watchlist' | 'High Risk';
  laggingStatus: 'Stable Delivery' | 'Elevated Escapes' | 'Compromised';
  leadingIndicators: LeadingIndicatorMetric[];
  laggingIndicators: LaggingIndicatorMetric[];
  correlationInsight: string;
}

export interface NearMissDefectRecord {
  id: string;
  title: string;
  severity: WorkItemSeverity;
  product: string;
  component: string;
  discoveryMethod: DefectDiscoveryMethod;
  qaOwner: string;
  createdAt: string;
  status: WorkItemStatus;
  hasFormalTestCaseBackfill: boolean;
  linkedFormalTestCaseId?: string;
  preventedOutageCost: number; // Est. avoided cost ($)
}

export interface NearMissAnalyticsSummary {
  totalNearMisses: number; // Major defects (P1/P2) caught via non-formal testing
  nearMissP1Blockers: number;
  nearMissP2Critical: number;
  formalSuiteCoverageDeficit: number; // Near misses without formal backfilled test cases
  escapePreventionRatio: number; // % of critical defects intercepted before production
  totalAvoidedDowntimeHours: number; // Estimated hours of production outage averted
  totalAvoidedOutageCost: number; // Estimated dollar impact averted ($)
  discoveryMethodDistribution: {
    formalScripted: number;
    automatedCi: number;
    exploratoryAdHoc: number;
    bugBashDogfood: number;
    productionEscaped: number;
  };
  backfillCompliancePercent: number; // % of near misses that got converted into formal regression tests
  recentNearMisses: NearMissDefectRecord[];
}

// ==========================================
// 7. KPI EXPLAINABILITY & AUDIT JUSTIFICATION
// ==========================================

export interface KPIContributingFactor {
  factor: string;
  impact: string; // e.g. "-96 pts" or "Threshold Exceeded"
  status: 'critical' | 'warning' | 'positive';
  details: string;
}

export interface KPIJustification {
  title: string;
  statusBadge: string;
  statusColor: 'emerald' | 'amber' | 'rose' | 'cyan' | 'purple';
  currentValue: string | number;
  targetValue: string;
  // Educational & Contextual Metric Metadata: Single unified, formatted overview string
  overviewAndSignificance?: string;
  description?: string; // Optional backwards compatibility
  trackedInfo?: string; // Optional backwards compatibility
  businessImportance?: string; // Optional backwards compatibility
  formulaOrRule: string;
  rationale: string;
  factors?: KPIContributingFactor[];
  offendingItems?: Array<{
    id: string;
    title: string;
    source: 'JIRA' | 'TestRail' | 'GitHub';
    severityOrStatus?: string;
  }>;
  recommendedAction: string;
}

// ==========================================
// 8. USER ACCOUNTS & CUSTOM KPI CATEGORIES
// ==========================================

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password?: string; // Stored securely in Dexie DB
  avatarUrl?: string;
  role?: string;
  department?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCustomCategory {
  id: string;
  userId: string;
  title: string;
  badge?: string;
  description?: string;
  iconName: string;
  kpiIds: string[]; // Ordered list of selected KPI widget IDs
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

