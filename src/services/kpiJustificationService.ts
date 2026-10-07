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
  KPIContributingFactor
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
}
