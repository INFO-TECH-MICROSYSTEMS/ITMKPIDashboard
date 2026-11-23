/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import type { 
  JiraWorkItem, 
  TestRailExecution, 
  GitHubPullRequest, 
  GitHubCommit,
  WorkItemType,
  WorkItemSeverity,
  WorkItemStatus,
  TestSuiteType,
  TestExecutionStatus,
  TestExecutionMode,
  DefectDiscoveryMethod
} from '../types/kpiPlatform';
import { 
  APP_PRODUCTS, 
  PRODUCT_COMPONENTS_MAP, 
  PRODUCT_RELEASES_MAP, 
  QA_ENGINEERS, 
  DEV_ENGINEERS,
  type AppProduct
} from '../constants/kpiConstants';

/**
 * Fast, seedable pseudo-random generator (Mulberry32).
 * Allows deterministic regeneration when a seed is provided,
 * or true randomized generation when initialized with Date.now().
 */
export class Mulberry32Rng {
  private state: number;

  constructor(seed: number | string = Date.now()) {
    if (typeof seed === 'string') {
      let h = 2166136261 >>> 0;
      for (let i = 0; i < seed.length; i++) {
        h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
      }
      this.state = h >>> 0;
    } else {
      this.state = (seed >>> 0) || 1;
    }
  }

  next(): number {
    let t = (this.state += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  choice<T>(arr: readonly T[]): T {
    return arr[Math.floor(this.next() * arr.length)];
  }

  range(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  boolean(prob = 0.5): boolean {
    return this.next() < prob;
  }
}

export interface ReleaseSchedule {
  product: AppProduct;
  releaseVersion: string;
  isOngoing: boolean;
  releaseIndex: number; // 0 = ongoing (latest), 1, 2, 3 = past completed
  startDate: Date;
  targetDate: Date;
  sprintCount: number;
}

export interface GeneratedDataset {
  jiraItems: JiraWorkItem[];
  testRailExecutions: TestRailExecution[];
  githubPRs: GitHubPullRequest[];
  githubCommits: GitHubCommit[];
  releaseSchedules: ReleaseSchedule[];
  generatedAt: string;
  seed: string;
}

/**
 * Computes dynamic release windows anchored strictly to current runtime time:
 * - 4 releases per product (Index 0 is latest/ongoing, indices 1..3 are past completed)
 * - 4 weeks (28 days) per release cycle, composed of two 2-week (14-day) sprints.
 * - Ongoing release: started 16 days ago, ends in 12 days (mid-cycle, actively in-flight).
 * - Completed releases: strictly ended in the past, sequentially chained backwards.
 */
export function computeDynamicReleaseSchedules(referenceDate: Date = new Date()): ReleaseSchedule[] {
  const schedules: ReleaseSchedule[] = [];
  const RELEASE_DURATION_DAYS = 28;
  const ONGOING_ELAPSED_DAYS = 16; // Mid-way through 28 days

  for (const product of APP_PRODUCTS) {
    const releases = PRODUCT_RELEASES_MAP[product]; // e.g. ['21.4.2', '21.4.0', '21.3.1', '21.2.0']
    const productReleases = releases.slice(0, 4);

    productReleases.forEach((releaseVersion, idx) => {
      let startDate: Date;
      let targetDate: Date;
      const isOngoing = (idx === 0);

      if (isOngoing) {
        startDate = new Date(referenceDate.getTime() - (ONGOING_ELAPSED_DAYS * 86400000));
        targetDate = new Date(startDate.getTime() + (RELEASE_DURATION_DAYS * 86400000));
      } else {
        // Past completed releases: index 1 ended when ongoing started, index 2 ended when 1 started, etc.
        const completedEndOffsetDays = ONGOING_ELAPSED_DAYS + ((idx - 1) * RELEASE_DURATION_DAYS);
        targetDate = new Date(referenceDate.getTime() - (completedEndOffsetDays * 86400000));
        startDate = new Date(targetDate.getTime() - (RELEASE_DURATION_DAYS * 86400000));
      }

      schedules.push({
        product,
        releaseVersion,
        isOngoing,
        releaseIndex: idx,
        startDate,
        targetDate,
        sprintCount: 2
      });
    });
  }

  return schedules;
}

/**
 * Enterprise Dynamic Sample Data Generator
 * Satisfies all user specifications:
 * 1. Anchored to runtime `new Date()`.
 * 2. ~1,000 tests and ~1,000 work items per product release.
 * 3. Only latest release is ongoing; older releases are completed.
 * 4. Completed releases pass Pre-Release Quality Assessment:
 *    - 0 untested tests (`untested === 0`).
 *    - Small allowable failures (~1-3%), no active P1/P2 blockers.
 *    - Deferred minor defects allowed without failing assessment.
 *    - No forecast trends (finished).
 * 5. Ongoing release:
 *    - Active tests, untested tests, possible P1/P2 blockers.
 *    - Forward-looking forecast.
 * 6. Progressive automation & execution growth from release start:
 *    - Starts with high manual count and 0 completed tests.
 *    - Progressive automated conversions; ~80-90% automated by end.
 */
export function generateDynamicKPIEnterpriseDataset(seedInput?: string | number): GeneratedDataset {
  const seedString = seedInput !== undefined && seedInput !== null && seedInput !== '' 
    ? String(seedInput) 
    : `seed-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  
  const rng = new Mulberry32Rng(seedString);
  const now = new Date();
  const schedules = computeDynamicReleaseSchedules(now);

  const jiraItems: JiraWorkItem[] = [];
  const testRailExecutions: TestRailExecution[] = [];
  const githubPRs: GitHubPullRequest[] = [];
  const githubCommits: GitHubCommit[] = [];

  const types: WorkItemType[] = ['Story', 'Story', 'Story', 'Bug', 'Bug', 'Task', 'CustomerAPAR', 'Epic'];
  const severities: WorkItemSeverity[] = ['P1-Blocker', 'P2-Critical', 'P3-Major', 'P3-Major', 'P4-Minor'];
  const suiteTypes: TestSuiteType[] = ['Unit', 'API', 'Contract', 'UI', 'Regression', 'Performance', 'Accessibility', 'Security'];

  let jiraCounter = 2000;
  let testCounter = 20000;

  // Process each product release schedule
  for (const schedule of schedules) {
    const { product, releaseVersion, isOngoing, startDate, targetDate } = schedule;
    const components = PRODUCT_COMPONENTS_MAP[product];
    const releaseSpanMs = targetDate.getTime() - startDate.getTime();

    // Sprints for this release
    const sprint1 = `Sprint ${releaseVersion}-S1`;
    const sprint2 = `Sprint ${releaseVersion}-S2`;

    // 1. Generate ~1,000 JIRA Work Items for this release (e.g. 950 - 1,050 distributed across components)
    const workItemCount = rng.range(960, 1040);
    const componentWeights = components.map(() => rng.range(120, 200));
    const totalWeight = componentWeights.reduce((a, b) => a + b, 0);

    for (let i = 0; i < workItemCount; i++) {
      jiraCounter++;
      const id = `${product.substring(0, 3).toUpperCase()}-${jiraCounter}`;

      // Pick component with natural variance
      let roll = rng.range(0, totalWeight);
      let compIdx = 0;
      for (let c = 0; c < components.length; c++) {
        roll -= componentWeights[c];
        if (roll <= 0) {
          compIdx = c;
          break;
        }
      }
      const component = components[compIdx] || components[0];
      const itemType = rng.choice(types);
      const isBug = itemType === 'Bug' || itemType === 'CustomerAPAR';
      const severity = rng.choice(severities);

      // Creation timestamp within the release window
      // For ongoing release: items were created between startDate and now
      const maxCreationTime = isOngoing ? now.getTime() : targetDate.getTime();
      const createdTimeMs = startDate.getTime() + rng.next() * (maxCreationTime - startDate.getTime());
      const createdAt = new Date(createdTimeMs).toISOString();

      // Sprint allocation
      const midPoint = startDate.getTime() + (releaseSpanMs / 2);
      const sprint = createdTimeMs < midPoint ? sprint1 : sprint2;

      // Determine Status & Resolution
      let status: WorkItemStatus;
      let resolvedAt: string | undefined = undefined;
      let qaQueueEntryDate: string | undefined = undefined;

      if (!isOngoing) {
        // COMPLETED RELEASE RULES:
        // Must pass Pre-Release Quality Assessment:
        // Stories & Epics & Tasks are Done.
        // Minor bugs can be Deferred (P3/P4 only) or Done.
        // NO active P1-Blocker or P2-Critical gating defects allowed!
        if (isBug) {
          if (severity === 'P1-Blocker' || severity === 'P2-Critical') {
            status = 'Done';
          } else {
            // Minor defect deferred or done
            status = rng.boolean(0.08) ? 'Done' : 'Done'; // Highly resolved
          }
        } else {
          status = 'Done';
        }
        
        // Resolution happened before or at targetDate
        const resolveTimeMs = Math.min(targetDate.getTime(), createdTimeMs + rng.range(1, 10) * 86400000);
        resolvedAt = new Date(resolveTimeMs).toISOString();
      } else {
        // ONGOING RELEASE RULES:
        // Actively progressing. Can have Under QA, In Development, Blocked, Done, Reopened.
        if (isBug) {
          const bugStatusRoll = rng.next();
          if (bugStatusRoll < 0.40) status = 'Done';
          else if (bugStatusRoll < 0.65) status = 'Under QA';
          else if (bugStatusRoll < 0.85) status = 'In Development';
          else status = 'Blocked';
        } else {
          const storyRoll = rng.next();
          if (storyRoll < 0.55) status = 'Done';
          else if (storyRoll < 0.80) status = 'Under QA';
          else status = 'In Development';
        }

        if (status === 'Done') {
          const resolveTimeMs = Math.min(now.getTime(), createdTimeMs + rng.range(1, 6) * 86400000);
          resolvedAt = new Date(resolveTimeMs).toISOString();
        } else if (status === 'Under QA' || status === 'Blocked') {
          const qaEntryMs = Math.min(now.getTime(), createdTimeMs + rng.range(1, 4) * 86400000);
          qaQueueEntryDate = new Date(qaEntryMs).toISOString();
        }
      }

      const isGating = isBug && (severity === 'P1-Blocker' || (severity === 'P2-Critical' && rng.boolean(0.5)));
      const isRegression = isBug && rng.boolean(0.28);
      const isCustomer = itemType === 'CustomerAPAR' || (isBug && rng.boolean(0.12));
      const isReopened = rng.boolean(0.05);

      let discoveryMethod: DefectDiscoveryMethod | undefined = undefined;
      if (isBug) {
        if (isCustomer) {
          discoveryMethod = 'Production / Customer APAR';
        } else {
          const discRoll = rng.next();
          if (discRoll < 0.45) discoveryMethod = 'Formal Scripted Test';
          else if (discRoll < 0.72) discoveryMethod = 'Automated CI Pipeline';
          else if (discRoll < 0.88) discoveryMethod = 'Exploratory / Ad-hoc';
          else discoveryMethod = 'Bug Bash / Dogfooding';
        }
      }

      jiraItems.push({
        id,
        title: `${itemType}: ${component} validation for ${product} v${releaseVersion}`,
        type: itemType,
        status,
        severity,
        product,
        component,
        sprint,
        releaseVersion,
        assignee: rng.choice(DEV_ENGINEERS),
        qaOwner: rng.choice(QA_ENGINEERS),
        storyPoints: rng.choice([1, 2, 3, 5, 8, 13]),
        dependencyDepth: rng.range(1, 4),
        isGatingDefect: isGating,
        isRegressionDefect: isRegression,
        isCustomerDefect: isCustomer,
        discoveryMethod,
        isReopened,
        reopenCount: isReopened ? rng.range(1, 2) : 0,
        hasTestPlan: rng.boolean(0.92),
        hasUnitTests: rng.boolean(0.88),
        hasApiTests: rng.boolean(0.80),
        createdAt,
        qaQueueEntryDate,
        resolvedAt,
        testingHoursSpent: rng.range(2, 20)
      });
    }

    // 2. Generate ~1,000 TestRail Test Executions for this release (e.g. 980 - 1,060)
    // REALISTIC LIFECYCLE REQUIREMENTS:
    // - Release kickoff (Day 0): A large initial bulk of existing tests (~85-90%) is marked for execution on startDate.
    // - Completed tests at kickoff = 0!
    // - As the release progresses, small amounts of new tests (~10-15%) are progressively added to scope.
    // - At release start: Both automated and manual tests exist; Manual tests exceed automated tests (e.g. ~55-65% manual vs ~35-45% automated).
    // - Over release progression: Manual tests are steadily automated, reaching ~85-90% automated by release end (some remaining manual).
    // - Completed tests grow steadily across the release cycle.
    // - At release end (completed releases): All tests marked for execution are completed (unattempted = 0).
    const testCount = rng.range(980, 1050);
    const initialScopeCount = Math.floor(testCount * rng.range(84, 89) / 100); // 84-89% existing tests selected on day 0

    for (let j = 0; j < testCount; j++) {
      testCounter++;
      const id = `TR-RUN-${testCounter}`;
      const caseId = `C${rng.range(1000, 9999)}`;
      const suiteType = rng.choice(suiteTypes);
      const component = rng.choice(components);

      // 1. Determine when the test was selected/added to scope (addedDate)
      const isInitialTest = (j < initialScopeCount);
      let addedMs: number;
      if (isInitialTest) {
        // Selected at release kickoff (Day 0)
        addedMs = startDate.getTime();
      } else {
        // Added later during release progression (spread between start and end/today)
        const maxAddMs = isOngoing ? now.getTime() : targetDate.getTime();
        addedMs = startDate.getTime() + rng.next() * (maxAddMs - startDate.getTime());
      }
      const addedDate = new Date(addedMs).toISOString();

      // 2. Determine execution status & execution timestamp (executionDate)
      let status: TestExecutionStatus;
      let executionDate: string;
      let execTimeMs: number;

      if (!isOngoing) {
        // COMPLETED RELEASE:
        // All tests marked for execution are completed! (unattempted === 0)
        // High pass rate (96%+), minor failures, tiny blocked due to deferred defects
        const roll = rng.next();
        if (roll < 0.965) status = 'Passed';
        else if (roll < 0.99) status = 'Failed';
        else status = 'Blocked';

        // Executed between addedMs and targetDate
        const executionSpan = Math.max(86400000, targetDate.getTime() - addedMs);
        execTimeMs = addedMs + rng.next() * executionSpan;
        executionDate = new Date(execTimeMs).toISOString();
      } else {
        // ONGOING RELEASE:
        // Starts with 0 completed tests at startDate, growing toward today.
        const releaseElapsedRatio = Math.min(1, Math.max(0.05, (now.getTime() - startDate.getTime()) / releaseSpanMs));
        
        // Probability this test has been executed yet: proportional to elapsed time since added
        const testAvailableSpan = Math.max(86400000, now.getTime() - addedMs);
        const testElapsedRatio = Math.min(1, testAvailableSpan / releaseSpanMs);
        const executionProbability = releaseElapsedRatio * (0.8 + 0.4 * testElapsedRatio);
        const hasBeenExecuted = rng.next() < executionProbability;

        if (hasBeenExecuted) {
          const resRoll = rng.next();
          if (resRoll < 0.88) status = 'Passed';
          else if (resRoll < 0.95) status = 'Failed';
          else status = 'Blocked';

          // Executed between addedMs and now
          execTimeMs = addedMs + rng.next() * (now.getTime() - addedMs);
          executionDate = new Date(execTimeMs).toISOString();
        } else {
          // Untested / Pending execution
          status = 'Unattempted';
          // For unattempted tests, executionDate defaults to now (or addedDate)
          execTimeMs = now.getTime();
          executionDate = addedDate;
        }
      }

      // 3. Automation Mode:
      // - At release start: large number of both automated and manual tests exist.
      // - Manual tests can always be more than automated tests initially (~40% automated, ~60% manual).
      // - Progressively automated as the release advances, reaching ~85-90% automated by end.
      // - Unit/API/Contract are almost always automated; UI/Regression/Security are gradually automated.
      const normalizedPoint = Math.min(1, Math.max(0, (execTimeMs - startDate.getTime()) / releaseSpanMs));
      const autoProbability = 0.38 + (normalizedPoint * 0.48); // 38% at start -> ~86% at end
      
      const isAutomated = (suiteType === 'Unit' || suiteType === 'API' || suiteType === 'Contract')
        ? rng.boolean(0.92)
        : rng.boolean(autoProbability);
      const mode: TestExecutionMode = isAutomated ? 'Automated' : 'Manual';

      const isFlaky = isAutomated && rng.boolean(0.035);
      const durationSeconds = isAutomated ? rng.range(2, 35) : rng.range(180, 1200);
      const sprint = execTimeMs < (startDate.getTime() + releaseSpanMs / 2) ? sprint1 : sprint2;

      testRailExecutions.push({
        id,
        caseId,
        title: `Verify ${suiteType} validation for ${component}`,
        suiteType,
        mode,
        status,
        product,
        component,
        sprint,
        releaseVersion,
        executedBy: isAutomated ? 'CI/CD GitHub Actions' : rng.choice(QA_ENGINEERS),
        addedDate,
        executionDate,
        durationSeconds,
        isFlaky,
        rerunCount: isFlaky ? rng.range(1, 3) : 0,
        linkedJiraKey: status === 'Failed' && rng.boolean(0.7) 
          ? `${product.substring(0, 3).toUpperCase()}-${rng.range(2001, jiraCounter)}` 
          : undefined,
        errorMessage: status === 'Failed' ? 'AssertionError: HTTP 500 downstream service error in test runtime' : undefined
      });
    }
  }

  // 3. Generate GitHub PRs & Commits aligned to the active release windows
  for (let p = 1; p <= 1200; p++) {
    const product = rng.choice(APP_PRODUCTS);
    const component = rng.choice(PRODUCT_COMPONENTS_MAP[product]);
    const prDaysAgo = rng.range(1, 75);
    const createdAt = new Date(now.getTime() - prDaysAgo * 86400000).toISOString();
    const isMerged = rng.boolean(0.88);

    githubPRs.push({
      id: `PR-${1000 + p}`,
      number: 1000 + p,
      title: `feat(${component}): release improvements for ${product}`,
      author: rng.choice(DEV_ENGINEERS),
      repository: `${product.toLowerCase()}-core`,
      targetBranch: rng.choice(['main', 'develop', 'release']),
      status: isMerged ? 'Merged' : rng.boolean(0.7) ? 'Open' : 'Closed',
      createdAt,
      mergedAt: isMerged ? new Date(now.getTime() - Math.max(0, prDaysAgo - 1) * 86400000).toISOString() : undefined,
      linesAdded: rng.range(30, 800),
      linesDeleted: rng.range(5, 250),
      unitTestIncluded: rng.boolean(0.92),
      apiTestIncluded: rng.boolean(0.78),
      ciStatus: rng.boolean(0.93) ? 'Passed' : 'Failed',
      pipelineDurationMinutes: rng.range(4, 25),
      linkedJiraKey: `${product.substring(0, 3).toUpperCase()}-${rng.range(2001, jiraCounter)}`
    });
  }

  for (let c = 1; c <= 2000; c++) {
    const product = rng.choice(APP_PRODUCTS);
    const commitDaysAgo = rng.range(1, 75);
    githubCommits.push({
      id: Math.random().toString(16).substring(2, 9),
      message: `ci/quality(${product}): automated test assertion suite #${rng.range(100, 999)}`,
      author: rng.choice(DEV_ENGINEERS),
      repository: `${product.toLowerCase()}-core`,
      timestamp: new Date(now.getTime() - commitDaysAgo * 86400000).toISOString(),
      hasComplianceTest: rng.boolean(0.94)
    });
  }

  return {
    jiraItems,
    testRailExecutions,
    githubPRs,
    githubCommits,
    releaseSchedules: schedules,
    generatedAt: now.toISOString(),
    seed: seedString
  };
}
