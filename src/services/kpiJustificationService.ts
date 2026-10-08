/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * Service: KPIJustificationService
 * Generates transparent, deterministic, audit-ready justifications and formulas
 * for every KPI, explaining exactly why a Grade (e.g. Grade F) or Status (Rose/Amber/Emerald)
 * was assigned based on current database telemetry.
 */

import type { 
  ReleaseQualityScorecard, 
  JiraWorkItem, 
  TestRailExecution, 
  KPIJustification,
  KPIContributingFactor,
  TestExecutionBurnoutForecast,
  AgingBuckets,
  DefectSeverityCounts,
  ComponentRiskMetric,
  PersonProductivityMetric,
  TestStatusDistribution
} from '../types/kpiPlatform';
import { QUALITY_THRESHOLDS } from '../constants/kpiConstants';

export class KPIJustificationService {

  /**
   * 1. Senior Management / Release Quality Index Justification (Explaining Grade A/B/C/F)
   */
  static getReleaseQualityIndexJustification(
    scorecard: ReleaseQualityScorecard,
    jiraItems: JiraWorkItem[],
    _testRailExecutions: TestRailExecution[]
  ): KPIJustification {
    const defects = jiraItems.filter(i => i.type === 'Bug' || i.type === 'CustomerAPAR');
    const openGatingDefects = defects.filter(d => d.isGatingDefect && d.status !== 'Done');

    const factors: KPIContributingFactor[] = [];

    // Factor 1: Gating defects
    if (openGatingDefects.length > 0) {
      factors.push({
        factor: 'Blocking Gating Defects Violation',
        impact: `-${openGatingDefects.length * 8} pts (Hard Gate Lock)`,
        status: 'critical',
        details: `${openGatingDefects.length} unresolved P1/P2 blocker defects exist in JIRA. Corporate policy requires 0 blockers before release.`
      });
    } else {
      factors.push({
        factor: 'Gating Defects Gate',
        impact: '0 Penalties',
        status: 'positive',
        details: 'All blocking and release-gating issues in JIRA are resolved.'
      });
    }

    // Factor 2: Customer Defect Leakage
    const leakagePenalty = Math.min(25, Math.round(scorecard.defectLeakageRate * 2.5));
    if (scorecard.defectLeakageRate > QUALITY_THRESHOLDS.defectLeakageRate.maxAcceptable) {
      factors.push({
        factor: 'Customer Defect Leakage (APARs)',
        impact: `-${leakagePenalty} pts`,
        status: 'critical',
        details: `Customer escape rate is ${scorecard.defectLeakageRate}% against a strict target of < 3.0%.`
      });
    } else if (scorecard.defectLeakageRate > 3.0) {
      factors.push({
        factor: 'Customer Defect Leakage (APARs)',
        impact: `-${leakagePenalty} pts`,
        status: 'warning',
        details: `Customer escape rate is ${scorecard.defectLeakageRate}%, slightly above optimal target.`
      });
    } else {
      factors.push({
        factor: 'Customer Defect Leakage (APARs)',
        impact: 'Compliant',
        status: 'positive',
        details: `Customer escape rate is ${scorecard.defectLeakageRate}%, well within target < 3.0%.`
      });
    }

    // Factor 3: Automation Coverage
    if (scorecard.automationCoverage < QUALITY_THRESHOLDS.automationCoverage.target) {
      const covPenalty = Math.round((QUALITY_THRESHOLDS.automationCoverage.target - scorecard.automationCoverage) * 0.4);
      factors.push({
        factor: 'Automation Coverage Deficit',
        impact: `-${covPenalty} pts`,
        status: scorecard.automationCoverage < 70 ? 'critical' : 'warning',
        details: `Current coverage is ${scorecard.automationCoverage}% vs corporate goal of ${QUALITY_THRESHOLDS.automationCoverage.target}%.`
      });
    } else {
      factors.push({
        factor: 'Automation Coverage',
        impact: 'Optimal',
        status: 'positive',
        details: `Coverage is ${scorecard.automationCoverage}%, meeting or exceeding corporate goals.`
      });
    }

    // Factor 4: SLA Adherence
    if (scorecard.slaAdherenceRate < 92.0) {
      factors.push({
        factor: 'Enterprise SLA Adherence',
        impact: 'SLA Warning',
        status: 'warning',
        details: `Composite SLA compliance is ${scorecard.slaAdherenceRate}% across 6 core operational SLAs.`
      });
    }

    // Offending entities
    const offending = openGatingDefects.slice(0, 5).map(d => ({
      id: d.id,
      title: d.title,
      source: 'JIRA' as const,
      severityOrStatus: `${d.severity} (${d.status})`
    }));

    // Dynamic rationale explanation
    let rationale = '';
    if (scorecard.readinessVerdict === 'Gated / Blocked') {
      rationale = `Grade ${scorecard.releaseReadyGrade} (${scorecard.overallScore}%) and "Gated / Blocked" status were triggered because the codebase currently has ${openGatingDefects.length} unresolved gating defect(s) and a defect leakage rate of ${scorecard.defectLeakageRate}%. Corporate release governance mandates an automatic blocker halt whenever unresolved P1 defects or high escape rates threaten production stability.`;
    } else if (scorecard.readinessVerdict === 'Conditional Warning') {
      rationale = `Grade ${scorecard.releaseReadyGrade} (${scorecard.overallScore}%) represents a "Conditional Warning". While there are no hard P1 blockers, one or more quality indicators (such as test automation coverage or regression duration) deviate slightly from target thresholds.`;
    } else {
      rationale = `Grade ${scorecard.releaseReadyGrade} (${scorecard.overallScore}%) represents full "Release Approved" compliance. Zero open gating blockers exist, regression velocity is high, and defect leakage is contained under corporate thresholds.`;
    }

    return {
      title: 'Release Quality Index & Executive Evaluation',
      statusBadge: `${scorecard.readinessVerdict} (Grade ${scorecard.releaseReadyGrade})`,
      statusColor: scorecard.readinessVerdict === 'Release Approved' ? 'emerald' : scorecard.readinessVerdict === 'Conditional Warning' ? 'amber' : 'rose',
      currentValue: `${scorecard.overallScore}% (Grade ${scorecard.releaseReadyGrade})`,
      targetValue: `≥ 90% (Grade A)`,
      description: 'A composite, multi-dimensional health scorecard synthesizing test pass rates, blocker defect status, test automation coverage, customer leakage, and regression cycle speed into a single unified executive readiness score (0-100%).',
      trackedInfo: 'Aggregates open P1/P2 release gating tickets in JIRA, automated test suite execution pass rates in TestRail, PR quality gate checks in GitHub, and customer APAR escape counts.',
      businessImportance: 'Protects enterprise brand reputation and service reliability by enforcing deterministic pre-release governance. Prevents premature software releases that cause costly production outages or customer churn.',
      formulaOrRule: `CompositeScore = 100 
  - (OpenGatingDefects × 8) 
  - (DefectLeakageRate × 2.5) 
  - (AutomationDeficit × 0.4) 
  - (PassRateDeficit × 0.8)

Gate Rule: If OpenGatingDefects > 0 → Hard Block → Max Grade = C/F`,
      rationale,
      factors,
      offendingItems: offending,
      recommendedAction: openGatingDefects.length > 0
        ? `1. Resolve or demote the ${openGatingDefects.length} gating JIRA tickets (${offending.map(o => o.id).join(', ')}). 2. Merge verification test suites for APAR customer escapes to pull leakage below 3.0%.`
        : 'Maintain automated regression test coverage and verify all PR checks before release tagging.'
    };
  }

  /**
   * 2. Gating Defects Justification
   */
  static getGatingDefectsJustification(jiraItems: JiraWorkItem[]): KPIJustification {
    const gating = jiraItems.filter(i => i.isGatingDefect && i.status !== 'Done');
    const isClean = gating.length === 0;

    return {
      title: 'Blocking / Gating Defects',
      statusBadge: isClean ? 'Clear Gate' : 'Action Required',
      statusColor: isClean ? 'emerald' : 'rose',
      currentValue: `${gating.length} Open Blockers`,
      targetValue: '0 Permitted at Gate',
      description: 'The count of unresolved, high-severity software defects (P1-Blocker or P2-Critical) that violate acceptance criteria or break critical customer workflows.',
      trackedInfo: 'Tracks active, in-development, or re-opened defects flagged with isGatingDefect=true in JIRA that have not reached "Done" or verified status.',
      businessImportance: 'Zero-tolerance release blocker. Shipping with known P1 blockers directly risks immediate production outages, contract breaches, and emergency developer firefighting.',
      formulaOrRule: `GatingDefects = COUNT(JiraItems WHERE isGatingDefect == true AND status != 'Done')`,
      rationale: isClean
        ? 'No unresolved gating defects are recorded in JIRA for this release scope. Quality gates are clear.'
        : `There are ${gating.length} active P1/P2 defect(s) flagged as release blockers. Any open blocker halts automated deployment pipelines to protect production integrity.`,
      offendingItems: gating.slice(0, 6).map(g => ({
        id: g.id,
        title: g.title,
        source: 'JIRA',
        severityOrStatus: `${g.severity} (${g.status})`
      })),
      recommendedAction: isClean
        ? 'No remediation required. Quality gate is clear.'
        : `Assign dedicated senior engineers to triage and hotfix the ${gating.length} blocking issues, followed by full automated regression execution.`
    };
  }

  /**
   * 3. Defect Leakage Justification
   */
  static getDefectLeakageJustification(rate: number, jiraItems: JiraWorkItem[]): KPIJustification {
    const customerEscapes = jiraItems.filter(i => i.isCustomerDefect || i.type === 'CustomerAPAR');
    const totalDefects = jiraItems.filter(i => i.type === 'Bug' || i.type === 'CustomerAPAR').length;
    const isOptimal = rate <= 3.0;
    const isWarning = rate <= QUALITY_THRESHOLDS.defectLeakageRate.maxAcceptable;

    return {
      title: 'Defect Leakage (Customer APARs)',
      statusBadge: isOptimal ? 'Controlled' : isWarning ? 'Elevated' : 'Breached',
      statusColor: isOptimal ? 'emerald' : isWarning ? 'amber' : 'rose',
      currentValue: `${rate}% (${customerEscapes.length}/${totalDefects})`,
      targetValue: '< 3.0%',
      description: 'The proportion of software bugs discovered in production by end customers compared to the total defects discovered across the entire lifecycle.',
      trackedInfo: 'Measures customer APAR incident tickets originated in live production environments vs. internal defects caught during CI, QA regression, and staging verification.',
      businessImportance: 'Key barometer of test suite screening rigor. High defect leakage damages customer trust, creates high-cost hotfix cycles, and incurs enterprise SLA penalty liabilities.',
      formulaOrRule: `DefectLeakageRate = (CustomerEscapedDefects / TotalIdentifiedDefects) × 100`,
      rationale: isOptimal
        ? `Defect leakage is ${rate}%, confirming that test suites and pre-production staging catch over ${100 - rate}% of bugs before reaching customers.`
        : `Defect leakage stands at ${rate}%, exceeding the 3.0% governance threshold. This indicates inadequate boundary condition testing or gaps in integration staging.`,
      offendingItems: customerEscapes.slice(0, 5).map(c => ({
        id: c.id,
        title: c.title,
        source: 'JIRA',
        severityOrStatus: `Customer APAR (${c.severity})`
      })),
      recommendedAction: isOptimal
        ? 'Continue shift-left regression testing and automated API contract validation.'
        : 'Implement automated regression tests for each customer APAR and mandate pre-merge integration tests on API endpoints.'
    };
  }

  /**
   * 4. Mean Time to Resolve (MTTR) Justification
   */
  static getMttrJustification(hours: number): KPIJustification {
    const target = 24.0;
    const isOptimal = hours <= target;
    const isWarning = hours <= 36.0;

    return {
      title: 'Mean Time to Resolve (MTTR)',
      statusBadge: isOptimal ? 'SLA Met' : isWarning ? 'Warning' : 'Breached',
      statusColor: isOptimal ? 'emerald' : isWarning ? 'amber' : 'rose',
      currentValue: `${hours} hours`,
      targetValue: `< ${target} hours`,
      description: 'The average duration elapsed from the moment a bug is logged in the system until a verified code fix is delivered.',
      trackedInfo: 'Measures turnaround cycle time in hours across defect creation, developer debugging, code commit, code review, and QA verification sign-off.',
      businessImportance: 'Direct measure of organizational agility and engineering responsiveness. Faster MTTR unblocks dependent test teams and preserves sprint throughput.',
      formulaOrRule: `MTTR = SUM(ResolutionTimestamp - CreationTimestamp) / TotalResolvedDefects`,
      rationale: isOptimal
        ? `Average turnaround time to resolve defects is ${hours} hours, safely within the ${target}-hour corporate SLA.`
        : `Defects require an average of ${hours} hours to resolve, exceeding the target of ${target} hours. This turnaround latency slows down sprint velocity and blocks downstream test suites.`,
      recommendedAction: isOptimal
        ? 'Maintain rapid triage cadences and automated CI failure diagnostics.'
        : 'Streamline defect triage handoffs between QA and Dev squads; establish daily 15-minute defect standups for critical items.'
    };
  }

  /**
   * 5. Items with No Unit Tests Justification
   */
  static getMissingUnitTestsJustification(jiraItems: JiraWorkItem[]): KPIJustification {
    const missing = jiraItems.filter(i => !i.hasUnitTests);
    const isClean = missing.length === 0;

    return {
      title: 'Items With No Unit Tests',
      statusBadge: isClean ? 'Compliant' : 'Gate Violation',
      statusColor: isClean ? 'emerald' : 'rose',
      currentValue: `${missing.length} Stories Missing Tests`,
      targetValue: '0 Permitted',
      description: 'The number of committed user stories or feature epics that lack automated unit test test suites in their pull requests.',
      trackedInfo: 'Inspects JIRA tickets merged to the main integration branch without verified unit test code coverage.',
      businessImportance: 'First line of defense against code regressions. Code merged without unit tests causes architectural rot, increases bug recurrence, and creates fragile builds.',
      formulaOrRule: `MissingUnitTests = COUNT(JiraItems WHERE hasUnitTests == false)`,
      rationale: isClean
        ? 'All stories and epics have accompanying unit test suites verified in PR workflows.'
        : `There are ${missing.length} work items in the backlog without unit test coverage. Shipping features without unit tests causes regression fragility and increases customer APARs.`,
      offendingItems: missing.slice(0, 5).map(m => ({
        id: m.id,
        title: m.title,
        source: 'JIRA',
        severityOrStatus: `Missing Unit Tests (${m.type})`
      })),
      recommendedAction: isClean
        ? 'Keep PR quality gate requiring unit tests active on GitHub branch protection.'
        : 'Block PR merges until unit tests covering > 80% branch coverage are attached and passing.'
    };
  }

  /**
   * 6. Automated Test Suite Pass Rate Justification
   */
  static getAutomationPassRateJustification(rate: number): KPIJustification {
    const target = 90.0;
    const isOptimal = rate >= target;
    const isWarning = rate >= 80.0;

    return {
      title: 'Automated Test Suite Pass Rate',
      statusBadge: isOptimal ? 'Optimal' : isWarning ? 'Acceptable' : 'Degraded',
      statusColor: isOptimal ? 'emerald' : isWarning ? 'amber' : 'rose',
      currentValue: `${rate}%`,
      targetValue: `> ${target}%`,
      description: 'The percentage of automated test assertions that complete successfully without assertion errors, timeouts, or unexpected crashes.',
      trackedInfo: 'Captures execution telemetry across Unit, API, Contract, and UI Playwright/Cypress test runs triggered in CI pipelines.',
      businessImportance: 'Indicates automated test suite health and build stability. A high pass rate guarantees confidence in rapid, continuous release deployments.',
      formulaOrRule: `PassRate = (PassedTestExecutions / TotalAutomatedExecutions) × 100`,
      rationale: isOptimal
        ? `Automated pass rate is ${rate}%, demonstrating high pipeline stability and repeatable build verification.`
        : `Automated test pass rate has dropped to ${rate}%, falling below the ${target}% target. This signals environmental instability or broken regressions.`,
      recommendedAction: isOptimal
        ? 'Continue scheduled nightly regressions and pre-merge smoke tests.'
        : 'Quarantine failing or flaky tests into an isolated test run and triage broken assertions.'
    };
  }

  /**
   * 7. Flaky Test Detection Index Justification
   */
  static getFlakyTestJustification(rate: number, flakyCount: number): KPIJustification {
    const target = QUALITY_THRESHOLDS.flakyRate.maxAcceptable;
    const isOptimal = rate <= target;

    return {
      title: 'Flaky Test Detection Index',
      statusBadge: isOptimal ? 'Controlled' : 'Quarantine Active',
      statusColor: isOptimal ? 'emerald' : 'rose',
      currentValue: `${rate}% (${flakyCount} Tests)`,
      targetValue: `< ${target}%`,
      description: 'The percentage of automated tests exhibiting non-deterministic behavior—passing and failing intermittently on identical code commits.',
      trackedInfo: 'Monitors tests requiring CI retry passes, asynchronous race conditions, or unhandled timing delays across test executions.',
      businessImportance: 'Protects developer trust in CI signals. Flaky tests desensitize engineering teams to real failures, cause unnecessary build retries, and waste compute budget.',
      formulaOrRule: `FlakyRate = (COUNT(TestsWithRerunsOrNonDeterministicResults) / TotalTests) × 100`,
      rationale: isOptimal
        ? `Flakiness index is ${rate}%, within the tolerated threshold of < ${target}%. Test results are deterministic and trustworthy.`
        : `Flakiness rate is ${rate}% across ${flakyCount} tests. Non-deterministic test runs waste engineering build minutes and erode team trust in CI/CD pipeline signals.`,
      recommendedAction: isOptimal
        ? 'Maintain strict retry caps in Playwright/Cypress configs.'
        : 'Activate automated quarantine on the flagged tests and refactor race conditions or asynchronous timing dependencies.'
    };
  }

  /**
   * 8. Over-Committed Engineers Justification
   */
  static getOverCommittedJustification(count: number): KPIJustification {
    const isClean = count === 0;

    return {
      title: 'Over-Committed Engineers',
      statusBadge: isClean ? 'Balanced' : 'Rebalance Needed',
      statusColor: isClean ? 'emerald' : 'amber',
      currentValue: `${count} Engineers Alerted`,
      targetValue: '0 Burnout Risk',
      description: 'The number of QA and test engineers assigned workloads that exceed sustainable sprint throughput capacity.',
      trackedInfo: 'Evaluates individual test execution assignments exceeding 140 executions/sprint or over 40 testing labor hours per week.',
      businessImportance: 'Guards team health and mitigates testing bottlenecks. Overloaded engineers lead to rushed testing, defect escapes, and eventual talent attrition.',
      formulaOrRule: `OverCommitted = COUNT(Engineers WHERE AssignedTests > 140 OR AssignedHours > 40/week)`,
      rationale: isClean
        ? 'QA workload is evenly distributed across team members without exceeding individual execution limits.'
        : `${count} QA engineer(s) are assigned more test executions than safe capacity limits allow, creating testing bottlenecks and burnout risks.`,
      recommendedAction: isClean
        ? 'Continue monitoring squad capacity during sprint planning.'
        : 'Rebalance test case execution assignments across squad members or convert high-labor manual tests to automation.'
    };
  }

  /**
   * 9. Overall SLA Adherence Justification
   */
  static getSlaAdherenceJustification(scorecard: ReleaseQualityScorecard): KPIJustification {
    const rate = scorecard.slaAdherenceRate;
    const target = 92.0;
    const isOptimal = rate >= target;
    const isWarning = rate >= 85.0;

    const factors: KPIContributingFactor[] = [
      {
        factor: 'P1/P2 Defect Triage SLA',
        impact: `${scorecard.slaBreakdown.p1P2TriageRate}%`,
        status: scorecard.slaBreakdown.p1P2TriageRate >= 95 ? 'positive' : 'warning',
        details: 'Initial triage within 4 hours for P1 blockers, 24 hours for P2 criticals.'
      },
      {
        factor: 'Regression Execution SLA',
        impact: `${scorecard.slaBreakdown.regressionExecutionRate}%`,
        status: scorecard.slaBreakdown.regressionExecutionRate >= 90 ? 'positive' : 'warning',
        details: 'Full suite execution completed within scheduled sprint test window.'
      },
      {
        factor: 'Customer Defect Resolution SLA',
        impact: `${scorecard.slaBreakdown.customerDefectResolutionRate}%`,
        status: scorecard.slaBreakdown.customerDefectResolutionRate >= 90 ? 'positive' : 'warning',
        details: 'Customer APAR turnaround time adhering to enterprise contract SLAs.'
      }
    ];

    return {
      title: 'Enterprise Quality SLA Adherence',
      statusBadge: isOptimal ? 'Compliant' : isWarning ? 'At Risk' : 'Breached',
      statusColor: isOptimal ? 'emerald' : isWarning ? 'amber' : 'rose',
      currentValue: `${rate}% Adherence`,
      targetValue: `≥ ${target}%`,
      description: 'The composite adherence percentage across six core corporate service level agreements governing defect triage, test execution, and APAR resolution.',
      trackedInfo: 'Measures compliance across P1/P2 defect triage (<4h/<24h), regression completion, test plan authoring, daily reports, automation delivery, and customer hotfix SLAs.',
      businessImportance: 'Protects contractual customer commitments and prevents SLA credit deductions or breach penalties from enterprise stakeholders.',
      formulaOrRule: `SLA_Adherence = AVERAGE(TriageSLA, RegressionSLA, TestPlanSLA, DailyReportSLA, AutomationSLA, CustomerDefectSLA)`,
      rationale: isOptimal
        ? `Enterprise SLA compliance is at ${rate}%, fulfilling all formal service commitments to product stakeholders and customers.`
        : `SLA adherence stands at ${rate}%, below the ${target}% compliance threshold. Delays in triage or customer defect resolution risk contract breach penalties.`,
      factors,
      recommendedAction: isOptimal
        ? 'Maintain current operational response cadence.'
        : 'Focus on accelerating defect triage turnaround and prioritizing customer-facing hotfix PRs.'
    };
  }

  /**
   * 10. Cost of Poor Quality (CoPQ) & Rework Justification
   */
  static getCostOfPoorQualityJustification(scorecard: ReleaseQualityScorecard): KPIJustification {
    const copq = scorecard.costOfPoorQuality;
    const savings = scorecard.costSavingsAutomated;
    const isOptimal = copq < 25000;

    return {
      title: 'Cost of Poor Quality (CoPQ) & Rework Impact',
      statusBadge: isOptimal ? 'Under Budget' : 'High Rework Cost',
      statusColor: isOptimal ? 'emerald' : 'amber',
      currentValue: `$${copq.toLocaleString()} Rework`,
      targetValue: '< $25,000 / Sprint',
      description: 'The financial cost incurred due to defect remediation, customer escalation handling, emergency hotfixes, and wasted developer rework hours.',
      trackedInfo: 'Quantifies developer labor hours spent investigating and patching customer APARs and internal defects at an enterprise blended hourly rate ($95/hr).',
      businessImportance: 'Translates technical software quality into executive dollar impact for CFOs and VPs, demonstrating the direct ROI of pre-release automated testing.',
      formulaOrRule: `CoPQ = (CustomerAPARs × 22 hrs + InternalBugs × 10 hrs) × $${QUALITY_THRESHOLDS.engineerHourlyBlendedRate}/hr`,
      rationale: `Estimated financial expenditure caused by defect remediation and customer hotfixes stands at $${copq.toLocaleString()}. Automated regression testing has offset this by an estimated $${savings.toLocaleString()} in saved manual test labor.`,
      recommendedAction: isOptimal
        ? 'Continue shifting quality verification left to catch regressions before integration.'
        : 'Prioritize unit and contract test coverage to prevent high-cost customer APAR investigations.'
    };
  }

  /**
   * 11. DORA Change Failure Rate (CFR) Justification
   */
  static getChangeFailureRateJustification(rate: number): KPIJustification {
    const target = QUALITY_THRESHOLDS.changeFailureRateMax || 5.0;
    const isElite = rate <= target;
    const isWarning = rate <= 15.0;

    return {
      title: 'DORA Change Failure Rate (CFR)',
      statusBadge: isElite ? 'DORA Elite' : isWarning ? 'High' : 'Needs Focus',
      statusColor: isElite ? 'emerald' : isWarning ? 'amber' : 'rose',
      currentValue: `${rate}% Failures`,
      targetValue: `< ${target}% (Elite)`,
      description: 'The percentage of production deployments or releases that cause service degradations or outages requiring remediation (hotfix or rollback).',
      trackedInfo: 'Calculates the ratio of pull requests and releases that failed post-deployment health checks or triggered emergency hotfix PRs.',
      businessImportance: 'Google DORA benchmark standard for release stability. Elite organizations balance rapid feature velocity with low release failure rates (< 5%).',
      formulaOrRule: `CFR = (Deployments Requiring Remediation / Total Production Deployments) × 100`,
      rationale: isElite
        ? `Change Failure Rate is ${rate}%, qualifying for Google DORA "Elite" tier (< 5%). Deployed changes rarely degrade production stability.`
        : `Change Failure Rate is ${rate}%, exceeding the Elite tier threshold of ${target}%. Releases require rollbacks or emergency patches too frequently.`,
      recommendedAction: isElite
        ? 'Preserve canary deployment strategies and automated smoke validation.'
        : 'Implement automated canary analysis and mandatory staging validation prior to traffic cutover.'
    };
  }

  /**
   * 12. Sprint Predictability Index (SPI) Justification
   */
  static getSprintPredictabilityJustification(rate: number): KPIJustification {
    const target = QUALITY_THRESHOLDS.sprintPredictabilityMin || 85.0;
    const isOptimal = rate >= target && rate <= 100.0;

    return {
      title: 'Sprint Predictability Index (SPI)',
      statusBadge: isOptimal ? 'Predictable' : rate > 100 ? 'Over-Delivered' : 'Under-Delivered',
      statusColor: isOptimal ? 'emerald' : 'amber',
      currentValue: `${rate}% Delivered`,
      targetValue: `${target}% - 100%`,
      description: 'The ratio of committed story points delivered at sprint completion versus the original commitment made during sprint planning.',
      trackedInfo: 'Measures total story points marked Done by sprint end divided by committed story points at sprint start.',
      businessImportance: 'Essential for dependable product roadmapping. High predictability enables business stakeholders to forecast releases and market launches accurately.',
      formulaOrRule: `SPI = (Completed Story Points / Committed Sprint Story Points) × 100`,
      rationale: isOptimal
        ? `Squad delivery predictability is ${rate}%, providing dependable roadmapping accuracy for executive product forecasting.`
        : `Sprint predictability is ${rate}%. Significant deviations from committed story points hinder cross-team release scheduling.`,
      recommendedAction: isOptimal
        ? 'Maintain realistic squad velocity baselines during sprint planning.'
        : 'Decompose large epics into smaller, independently testable user stories and avoid late scope-creep injections.'
    };
  }

  /**
   * 13. Test Execution Burnout & Velocity Forecast Justification
   */
  static getTestBurnoutForecastJustification(
    forecast: TestExecutionBurnoutForecast
  ): KPIJustification {
    const isOptimal = forecast.isVelocityHealthy;
    const factors: KPIContributingFactor[] = [
      {
        factor: 'Current Execution Run Rate',
        impact: `${forecast.currentDailyVelocity.toLocaleString()} tests / day`,
        status: forecast.currentDailyVelocity > 50 ? 'positive' : 'warning',
        details: `Calculated from a 7-day moving average of successfully closed and passed TestRail execution runs.`
      },
      {
        factor: 'Remaining Unexecuted Test Backlog',
        impact: `${forecast.remainingUntested.toLocaleString()} tests remaining`,
        status: forecast.remainingUntested === 0 ? 'positive' : forecast.remainingUntested > 500 ? 'critical' : 'warning',
        details: `${forecast.remainingUntested} tests remain in the 'Unattempted' state out of ${forecast.totalScope.toLocaleString()} total scoped test cases.`
      },
      {
        factor: 'Projected Runway to Full Test Completion',
        impact: `${forecast.daysToCompletion} calendar days (${forecast.estimatedCompletionDate})`,
        status: isOptimal ? 'positive' : 'critical',
        details: `Based on deterministic velocity modeling: DaysToComplete = CEIL(RemainingTests / DailyVelocity). Target completion is ${forecast.estimatedCompletionDate}.`
      }
    ];

    return {
      title: 'Test Execution Burnout & Predictive Velocity Forecast',
      statusBadge: isOptimal ? 'On Schedule' : 'Velocity At Risk',
      statusColor: isOptimal ? 'emerald' : 'amber',
      currentValue: `${forecast.completedSoFar.toLocaleString()} / ${forecast.totalScope.toLocaleString()} Done (${((forecast.completedSoFar / forecast.totalScope) * 100).toFixed(1)}%)`,
      targetValue: '100% Executed Prior to Release Gate',
      description: 'A multi-dimensional velocity burnout chart tracking cumulative total tests planned, completed test executions over time, and unexecuted tests remaining, extending dynamically into future dates to forecast total test completion.',
      trackedInfo: 'Aggregates historical TestRail test executions and planned test suite cases, computing a moving average daily run rate to project when remaining unexecuted tests will burn down to zero.',
      businessImportance: 'Provides senior executives with empirical foresight on testing runway. Prevents premature release deployments and identifies execution bottlenecks early enough to allocate additional SDET / QA automation capacity.',
      formulaOrRule: `VelocityRunwayDays = CEIL((TotalScopedTests - CompletedExecutions) / MovingAvgDailyExecutions) | TargetDate = Today + VelocityRunwayDays`,
      rationale: isOptimal
        ? `At current velocity (${forecast.currentDailyVelocity} tests/day), remaining test backlog will be burned down by ${forecast.estimatedCompletionDate} (${forecast.daysToCompletion} days remaining). Delivery velocity is aligned with release deadlines.`
        : `At current velocity (${forecast.currentDailyVelocity} tests/day), burning down the remaining ${forecast.remainingUntested} tests will require ${forecast.daysToCompletion} days, extending to ${forecast.estimatedCompletionDate}. Additional test execution bandwidth or CI/CD test parallelization is required.`,
      factors,
      recommendedAction: isOptimal
        ? 'Maintain current test execution pace and preserve automated pipeline concurrency.'
        : 'Increase parallel worker nodes in CI test execution pipelines or triage low-priority manual test suites.'
    };
  }

  /**
   * 14. Items Pending Testing Aging Profile Justification
   */
  static getAgingProfileJustification(
    agingBuckets: AgingBuckets,
    bucketKey: 'under7' | '7to14' | '14to21' | '21plus' | 'all'
  ): KPIJustification {
    const total = agingBuckets.pending7Days + agingBuckets.pending7To14Days + agingBuckets.pending14To21Days + agingBuckets.pending21PlusDays;
    const isStaleHigh = agingBuckets.pending21PlusDays > 10;

    let bucketTitle = 'Items Pending Testing Aging Profile';
    let currentVal = `${total} Total In QA Queue`;
    let statusBadge = isStaleHigh ? 'Critical Backlog SLA Breach' : 'Normal Cadence';
    let statusColor: 'emerald' | 'amber' | 'rose' = isStaleHigh ? 'rose' : 'emerald';

    if (bucketKey === 'under7') {
      bucketTitle = 'Items Pending Testing: Fresh (< 7 Days)';
      currentVal = `${agingBuckets.pending7Days} Items`;
      statusBadge = 'Fresh / Healthy';
      statusColor = 'emerald';
    } else if (bucketKey === '7to14') {
      bucketTitle = 'Items Pending Testing: Moderate (7 - 14 Days)';
      currentVal = `${agingBuckets.pending7To14Days} Items`;
      statusBadge = 'Normal Cadence';
      statusColor = 'emerald';
    } else if (bucketKey === '14to21') {
      bucketTitle = 'Items Pending Testing: At Risk (14 - 21 Days)';
      currentVal = `${agingBuckets.pending14To21Days} Items`;
      statusBadge = 'At Risk SLA';
      statusColor = 'amber';
    } else if (bucketKey === '21plus') {
      bucketTitle = 'Items Pending Testing: Stale / Blocked (21+ Days)';
      currentVal = `${agingBuckets.pending21PlusDays} Stale Items`;
      statusBadge = 'Critical SLA Breach';
      statusColor = 'rose';
    }

    return {
      title: bucketTitle,
      statusBadge,
      statusColor,
      currentValue: currentVal,
      targetValue: 'Target: 0 Items in 21+ Days Stale Bucket',
      description: 'Measures queue latency of JIRA work items and bug fixes waiting in "Under QA" state before verification completion and deployment sign-off.',
      trackedInfo: 'Aggregates age distribution of tickets queued in QA state: Fresh (<7d), Normal (7-14d), At Risk (14-21d), and Stale/Breached (21+d).',
      businessImportance: 'Uncovers QA verification bottlenecks. Work items idling in QA delay feature time-to-market, increase merge conflict risk, and inflate lead time for changes.',
      formulaOrRule: `AgingBucket = CurrentTimestamp - DateEnteredUnderQAState | Threshold: Stale if Duration > 21 Days`,
      rationale: `There are currently ${total} tickets awaiting testing, with ${agingBuckets.pending21PlusDays} items exceeding the 21-day stale threshold. Backlog latency prolongs delivery lead times and risks developer rework.`,
      recommendedAction: isStaleHigh
        ? 'Conduct emergency backlog swarm session to triage and verify items pending testing beyond 14 days.'
        : 'Maintain current cadence and enforce maximum 7-day QA turnaround SLA per sprint.'
    };
  }

  /**
   * 15. Defect Severity Breakdown Justification
   */
  static getDefectSeverityJustification(
    severityCounts: DefectSeverityCounts,
    sevKey?: 'blocker' | 'critical' | 'major' | 'minor'
  ): KPIJustification {
    const total = severityCounts.blockerP1 + severityCounts.criticalP2 + severityCounts.majorP3 + severityCounts.minorP4;
    const hasBlockers = severityCounts.blockerP1 > 0;

    let title = 'Defect Severity Distribution & Triage Hierarchy';
    let currentVal = `${total} Active Defects (P1: ${severityCounts.blockerP1}, P2: ${severityCounts.criticalP2})`;
    let statusBadge = hasBlockers ? 'Gated by Blockers' : 'Controlled Severity';
    let statusColor: 'emerald' | 'amber' | 'rose' = hasBlockers ? 'rose' : 'emerald';

    if (sevKey === 'blocker') {
      title = 'P1 - Blocker Defect Volume';
      currentVal = `${severityCounts.blockerP1} Blockers`;
      statusBadge = severityCounts.blockerP1 === 0 ? 'Gate Clear' : 'Hard Gate Lock';
      statusColor = severityCounts.blockerP1 === 0 ? 'emerald' : 'rose';
    } else if (sevKey === 'critical') {
      title = 'P2 - Critical Release Defect Volume';
      currentVal = `${severityCounts.criticalP2} Criticals`;
      statusBadge = severityCounts.criticalP2 <= 5 ? 'Acceptable' : 'High Defect Churn';
      statusColor = severityCounts.criticalP2 <= 5 ? 'emerald' : 'amber';
    }

    return {
      title,
      statusBadge,
      statusColor,
      currentValue: currentVal,
      targetValue: 'Target: 0 P1 Blockers & ≤ 5 P2 Criticals at Release Cutoff',
      description: 'Categorizes all open defects into standardized enterprise severity levels (P1-Blocker, P2-Critical, P3-Major, P4-Minor) to guide squad triage and release readiness.',
      trackedInfo: 'Measures live defect counts and percentage allocations across four standardized JIRA severity tiers.',
      businessImportance: 'Prevents critical customer-facing incidents. High-severity defects disrupt revenue transactions and cause brand reputation damage if released to production.',
      formulaOrRule: `SeverityRatio = (CountBySeverity / TotalActiveDefects) × 100 | Zero P1 Blockers Mandatory for Gate Clearance`,
      rationale: hasBlockers
        ? `There are ${severityCounts.blockerP1} active P1 Blocker defects. Enterprise quality governance automatically halts production rollouts until all P1 blockers are certified resolved.`
        : `Defect severity distribution is controlled with zero P1 blockers. Active defects are primarily functional or cosmetic (P3/P4).`,
      recommendedAction: hasBlockers
        ? 'Direct squad capacity toward P1 blocker remediation before committing to release cutover.'
        : 'Continue routine sprint defect burndown and triage minor cosmetics.'
    };
  }

  /**
   * 16. Active Release Gating Defects Table Justification
   */
  static getGatingDefectsTableJustification(
    gatingItems: JiraWorkItem[]
  ): KPIJustification {
    const count = gatingItems.length;
    const isGated = count > 0;

    return {
      title: 'Active Release Gating Defects Sign-Off Ledger',
      statusBadge: isGated ? 'Requires Sign-Off' : 'Gate Passed',
      statusColor: isGated ? 'rose' : 'emerald',
      currentValue: `${count} Gating Defects Unresolved`,
      targetValue: '0 Permitted at Gate Sign-Off',
      description: 'An executive audit ledger listing all unresolved P1/P2 defects identified as mandatory release blockers requiring explicit QA sign-off prior to production deployment.',
      trackedInfo: 'Tracks issue key, summary, assigned product, impacted component, QA owner, and workflow status for every active blocking ticket.',
      businessImportance: 'Strict compliance and release gating standard. Enforces zero-tolerance release policies to safeguard revenue transactions and user experience.',
      formulaOrRule: `GatingCriteria = ALL(JiraItems WHERE isGatingDefect == true) MUST HAVE status == 'Done'`,
      rationale: isGated
        ? `${count} release gating defects remain unresolved. Deployment pipelines are locked until these specific items receive certified bug fixes and passing automated verification.`
        : 'All release gating defects have been verified and resolved. Release quality gates are satisfied.',
      offendingItems: gatingItems.slice(0, 5).map(item => ({
        id: item.id,
        title: item.title,
        source: 'JIRA',
        severityOrStatus: `${item.severity} (${item.status})`
      })),
      recommendedAction: isGated
        ? 'Engage designated QA Owners and Engineering Leads to prioritize resolution and re-verification.'
        : 'Proceed with standard staging deployment sign-off.'
    };
  }

  /**
   * 17. Component Risk & Dependency Gating Matrix Justification
   */
  static getComponentRiskMatrixJustification(
    componentRisks: ComponentRiskMetric[]
  ): KPIJustification {
    const criticalCount = componentRisks.filter(c => c.riskLevel === 'Critical').length;
    const isCritical = criticalCount > 0;

    return {
      title: 'Component Risk & Dependency Gating Matrix',
      statusBadge: isCritical ? `${criticalCount} Critical Modules` : 'Low Module Risk',
      statusColor: isCritical ? 'rose' : 'emerald',
      currentValue: `${criticalCount} / ${componentRisks.length} Critical Modules`,
      targetValue: '0 Critical Modules at Release Gate',
      description: 'A multi-dimensional architectural risk index calculating vulnerability profiles across test failure rates, open gating bugs, cyclomatic complexity, code churn, and unit test coverage per module.',
      trackedInfo: 'Aggregates test execution failure rates, gating defects, test coverage %, missing unit tests, cyclomatic complexity (CC), and code churn lines per component.',
      businessImportance: 'Pinpoints architectural hotspots and blast radius. Modules with high churn and missing tests are primary sources of customer outages and regressions.',
      formulaOrRule: `ModuleRiskScore = (TestFailureRate × 0.4) + (GatingDefects × 2.0) + (Complexity × 0.3) + (Churn / 1000)`,
      rationale: isCritical
        ? `${criticalCount} component modules exhibit elevated risk profiles due to high test failure rates and unresolved gating bugs. Releases touching these modules require dedicated regression suites.`
        : 'All components maintain acceptable test pass rates and low cyclomatic complexity risk.',
      recommendedAction: isCritical
        ? 'Enforce automated unit test gate checks on high-churn components and prioritize architecture refactoring.'
        : 'Maintain continuous integration coverage on all core services.'
    };
  }

  /**
   * 18. Flaky Automated Tests & Quarantine Ledger Justification
   */
  static getFlakyTestsJustification(
    flakyTests: TestRailExecution[],
    totalReruns: number
  ): KPIJustification {
    const count = flakyTests.length;
    const isElevated = count > 20;

    return {
      title: 'Flaky Automated Tests & Quarantine Ledger',
      statusBadge: isElevated ? 'High Flakiness' : 'Quarantine Active',
      statusColor: isElevated ? 'rose' : 'amber',
      currentValue: `${count} Flaky Cases (${totalReruns} Pipeline Reruns)`,
      targetValue: '< 10 Cases Requiring Quarantine',
      description: 'Tracks non-deterministic automated test cases that exhibit intermittent pass/fail results across identical code revisions, wasting CI runner compute and slowing build pipelines.',
      trackedInfo: 'Monitors TestRail execution history for retry counts, non-deterministic status flips, execution durations, and impacted components.',
      businessImportance: 'Protects developer trust in CI/CD pipeline signals. Persistent test flakiness causes squads to ignore real test failures and leads to customer defect escapes.',
      formulaOrRule: `FlakyRate = (COUNT(TestCasesWithInconsistentRerunResults) / TotalAutomatedTestCases) × 100`,
      rationale: `${count} automated test cases required ${totalReruns} pipeline reruns to achieve green status. Non-deterministic test runs erode CI confidence and inflate pipeline runtimes.`,
      offendingItems: flakyTests.slice(0, 5).map(t => ({
        id: t.caseId,
        title: t.title,
        source: 'TestRail',
        severityOrStatus: `${t.rerunCount} reruns (${t.durationSeconds}s)`
      })),
      recommendedAction: 'Quarantine identified flaky test cases into an isolated monitoring suite until root cause timing or data dependencies are fixed.'
    };
  }

  /**
   * 19. QA Engineer Test Assignment & Throughput Ledger Justification
   */
  static getQaThroughputLedgerJustification(
    metrics: PersonProductivityMetric[]
  ): KPIJustification {
    const overCommitted = metrics.filter(m => m.isOverCommitted).length;
    const isBalanced = overCommitted === 0;

    return {
      title: 'QA Engineer Test Assignment & Throughput Ledger',
      statusBadge: isBalanced ? 'Balanced Workload' : `${overCommitted} Over-Committed`,
      statusColor: isBalanced ? 'emerald' : 'amber',
      currentValue: `${metrics.length} Active Engineers (${overCommitted} Overloaded)`,
      targetValue: '0 Over-Committed Engineers (Capacity < 140 Tests/Eng)',
      description: 'Evaluates workload distribution, test assignment equity, execution completion rates, and individual velocity across QA team members.',
      trackedInfo: 'Measures assigned test count, completed executions, completion rate %, delayed/blocked items, and average execution hours per engineer.',
      businessImportance: 'Prevents engineer burnout and throughput bottlenecks. Unbalanced workloads lead to skipped edge-case exploratory testing and release delays.',
      formulaOrRule: `OverCommitted = (AssignedTests > 140) OR (CompletionRate < 70% AND AssignedTests > 50)`,
      rationale: isBalanced
        ? 'All QA engineers maintain balanced workload allocations and healthy completion rates (> 80%).'
        : `${overCommitted} QA team member(s) exceed safe capacity thresholds (> 140 tests assigned). Rebalancing is recommended to prevent verification delays.`,
      recommendedAction: isBalanced
        ? 'Maintain current assignment cadence and support exploratory pair testing.'
        : 'Reassign test suites from overloaded specialists to peers with available bandwidth.'
    };
  }

  /**
   * 20. Automated vs Manual Test Execution Distribution Justification
   */
  static getTestExecutionDistributionJustification(
    distribution: TestStatusDistribution,
    mode: 'Automated' | 'Manual' | 'All'
  ): KPIJustification {
    const passRate = distribution.passRate;
    const isOptimal = passRate >= 80.0;

    return {
      title: `${mode} Test Suite Execution Distribution`,
      statusBadge: isOptimal ? 'Optimal Pass Rate' : 'Review Required',
      statusColor: isOptimal ? 'emerald' : 'amber',
      currentValue: `${distribution.passed.toLocaleString()} / ${distribution.total.toLocaleString()} Passed (${passRate}%)`,
      targetValue: '≥ 80.0% Pass Rate across Active Test Runs',
      description: `Detailed execution status distribution for ${mode.toLowerCase()} test runs, analyzing passes, failures, blocked tests, and unattempted cases.`,
      trackedInfo: 'Tracks execution status breakdown across TestRail runs: Passed, Failed, Blocked, and Unattempted.',
      businessImportance: 'Fundamental quality assurance health check. Tracks raw execution progression toward pre-release coverage and stability targets.',
      formulaOrRule: `PassRate = (PassedExecutions / TotalExecutions) × 100`,
      rationale: `Out of ${distribution.total.toLocaleString()} test executions, ${distribution.passed.toLocaleString()} passed (${passRate}%), with ${distribution.failed.toLocaleString()} failures and ${distribution.blocked.toLocaleString()} blocked test cases.`,
      recommendedAction: isOptimal
        ? 'Continue scheduled test execution cycles and triage blocked items.'
        : 'Investigate failing test assertions and verify underlying API/UI regression changes.'
    };
  }
}

