/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * High-Volume Realistic Enterprise Dataset Generator
 * Generates >10,000 JIRA work items and >12,000 TestRail test executions
 * across 5 major real-world products (YouTube, GMail, LinkedIn, Shopify, Amazon)
 * with dedicated per-product components, realistic release timelines (e.g. 21.4.2, 4.8.2),
 * and rich QA telemetry providing deep, meaningful insights for every view.
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
  TestExecutionMode
} from '../types/kpiPlatform';
import { 
  APP_PRODUCTS, 
  PRODUCT_COMPONENTS_MAP, 
  PRODUCT_RELEASES_MAP, 
  APP_SPRINTS,
  QA_ENGINEERS, 
  DEV_ENGINEERS
} from '../constants/kpiConstants';

// Deterministic pseudo-random number generator for consistent seed data
class PseudoRandom {
  private seed: number;
  constructor(seed = 42) {
    this.seed = seed;
  }
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
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

// Release age offsets in days from today (most recent release is current, older releases represent past milestones)
const RELEASE_AGE_OFFSETS: Record<number, { minDays: number; maxDays: number; defaultStatus: WorkItemStatus[] }> = {
  0: { minDays: 0, maxDays: 20, defaultStatus: ['Under QA', 'Done', 'In Development', 'Blocked', 'Done', 'Done'] },   // Latest release: active in QA
  1: { minDays: 14, maxDays: 45, defaultStatus: ['Done', 'Done', 'Done', 'Done', 'Reopened', 'Done'] },              // Previous release: mostly done
  2: { minDays: 35, maxDays: 75, defaultStatus: ['Done', 'Done', 'Done', 'Done'] },                                  // Older: completed
  3: { minDays: 60, maxDays: 110, defaultStatus: ['Done', 'Done', 'Done', 'Done'] },                                 // Older: completed
  4: { minDays: 90, maxDays: 160, defaultStatus: ['Done', 'Done', 'Done', 'Done'] }                                  // Oldest
};

export function generateSampleDataset() {
  const rng = new PseudoRandom(20261008);
  const now = Date.now();

  const jiraItems: JiraWorkItem[] = [];
  const testRailExecutions: TestRailExecution[] = [];
  const githubPRs: GitHubPullRequest[] = [];
  const githubCommits: GitHubCommit[] = [];

  const types: WorkItemType[] = ['Story', 'Story', 'Bug', 'Bug', 'Task', 'CustomerAPAR', 'Epic'];
  const severities: WorkItemSeverity[] = ['P1-Blocker', 'P2-Critical', 'P3-Major', 'P3-Major', 'P4-Minor'];
  const suiteTypes: TestSuiteType[] = [
    'Unit', 'API', 'Contract', 'UI', 'Regression', 
    'Performance', 'Accessibility', 'Security'
  ];

  let jiraGlobalId = 1000;
  let testGlobalId = 10000;

  // 1. Generate 2,100 JIRA Work Items PER PRODUCT -> 10,500 total (>10,000)
  for (const product of APP_PRODUCTS) {
    const components = PRODUCT_COMPONENTS_MAP[product];
    const releases = PRODUCT_RELEASES_MAP[product];

    for (let i = 0; i < 2100; i++) {
      jiraGlobalId++;
      const id = `${product.substring(0, 3).toUpperCase()}-${jiraGlobalId}`;
      const itemType = rng.choice(types);
      const severity = rng.choice(severities);
      const component = rng.choice(components);
      
      // Distribute items across releases: weighted towards latest releases
      const releaseIdx = rng.choice([0, 0, 0, 1, 1, 2, 3, 4]);
      const releaseVersion = releases[releaseIdx] || releases[0];
      const ageProfile = RELEASE_AGE_OFFSETS[releaseIdx] || RELEASE_AGE_OFFSETS[0];

      // Status determined by release stage
      const status = rng.choice(ageProfile.defaultStatus);
      const sprint = rng.choice(APP_SPRINTS);
      const assignee = rng.choice(DEV_ENGINEERS);
      const qaOwner = rng.choice(QA_ENGINEERS);

      // Realistic creation timestamp according to release age
      const daysAgoCreated = rng.range(ageProfile.minDays, ageProfile.maxDays);
      const createdAt = new Date(now - daysAgoCreated * 86400000).toISOString();

      let qaQueueEntryDate: string | undefined = undefined;
      if (status === 'Under QA' || status === 'Blocked') {
        const daysInQA = rng.range(1, Math.min(28, Math.max(2, daysAgoCreated)));
        qaQueueEntryDate = new Date(now - daysInQA * 86400000).toISOString();
      }

      const isBug = itemType === 'Bug' || itemType === 'CustomerAPAR';
      const isGating = isBug && (severity === 'P1-Blocker' || (severity === 'P2-Critical' && rng.boolean(0.4)));
      const isRegression = isBug && rng.boolean(0.32);
      const isCustomer = itemType === 'CustomerAPAR' || (isBug && rng.boolean(0.18));
      const isReopened = status === 'Reopened' || (status === 'Done' && rng.boolean(0.08));

      let resolvedAt: string | undefined = undefined;
      if (status === 'Done') {
        const daysAgoResolved = Math.max(0, daysAgoCreated - rng.range(1, 8));
        resolvedAt = new Date(now - daysAgoResolved * 86400000).toISOString();
      }

      // Assign defect discovery method (formal vs automated vs exploratory vs dogfooding vs customer escape)
      let discoveryMethod: import('../types/kpiPlatform').DefectDiscoveryMethod | undefined = undefined;
      if (isBug) {
        if (isCustomer) {
          discoveryMethod = 'Production / Customer APAR';
        } else {
          // Internal discoveries: 45% Formal scripted, 30% Automated CI, 15% Exploratory / Ad-hoc, 10% Bug Bash
          const roll = rng.next();
          if (roll < 0.45) {
            discoveryMethod = 'Formal Scripted Test';
          } else if (roll < 0.75) {
            discoveryMethod = 'Automated CI Pipeline';
          } else if (roll < 0.90) {
            discoveryMethod = 'Exploratory / Ad-hoc';
          } else {
            discoveryMethod = 'Bug Bash / Dogfooding';
          }
        }
      }

      let itemTitle = `${itemType}: ${component} validation for ${product} v${releaseVersion}`;
      if (isBug) {
        if (discoveryMethod === 'Exploratory / Ad-hoc') {
          const exploratoryScenarios = [
            `Unexpected memory leak in ${component} under high concurrency stress`,
            `Deadlock race condition in ${component} worker thread pool`,
            `Payload boundary overflow in ${component} edge gateway parser`,
            `Unhandled WebSocket disconnect state corruption in ${component}`,
            `Cache invalidation race leading to stale data in ${component}`,
            `JWT authorization token replay vulnerability detected in ${component}`
          ];
          itemTitle = rng.choice(exploratoryScenarios);
        } else if (discoveryMethod === 'Bug Bash / Dogfooding') {
          const bugBashScenarios = [
            `UI freezing on rapid double-click action in ${component}`,
            `Visual rendering regression on dark theme toggle in ${component}`,
            `Incorrect error dialog displayed on network drop in ${component}`,
            `Accessibility focus trap discovered in ${component} modal`,
            `Session logout bypass during fast navigation across ${component}`,
            `Broken deep-link routing state in ${component}`
          ];
          itemTitle = rng.choice(bugBashScenarios);
        } else if (discoveryMethod === 'Automated CI Pipeline') {
          itemTitle = `Automated regression assertion failure in ${component} integration suite`;
        }
      }

      jiraItems.push({
        id,
        title: itemTitle,
        type: itemType,
        status,
        severity,
        product,
        component,
        sprint,
        releaseVersion,
        assignee,
        qaOwner,
        storyPoints: rng.choice([1, 2, 3, 5, 8, 13]),
        dependencyDepth: rng.range(1, 5),
        isGatingDefect: isGating,
        isRegressionDefect: isRegression,
        isCustomerDefect: isCustomer,
        discoveryMethod,
        isReopened,
        reopenCount: isReopened ? rng.range(1, 3) : 0,
        hasTestPlan: rng.boolean(0.88),
        hasUnitTests: rng.boolean(0.82),
        hasApiTests: rng.boolean(0.74),
        createdAt,
        qaQueueEntryDate,
        resolvedAt,
        testingHoursSpent: rng.range(2, 24)
      });
    }
  }

  // 2. Generate 2,500 TestRail Executions PER PRODUCT -> 12,500 total (>10,000)
  for (const product of APP_PRODUCTS) {
    const components = PRODUCT_COMPONENTS_MAP[product];
    const releases = PRODUCT_RELEASES_MAP[product];

    for (let i = 0; i < 2500; i++) {
      testGlobalId++;
      const id = `TR-RUN-${testGlobalId}`;
      const caseId = `C${rng.range(100, 999)}`;
      const suiteType = rng.choice(suiteTypes);
      const component = rng.choice(components);

      // Weighted towards latest release (current active validation)
      const releaseIdx = rng.choice([0, 0, 0, 0, 1, 1, 2, 3, 4]);
      const releaseVersion = releases[releaseIdx] || releases[0];
      const ageProfile = RELEASE_AGE_OFFSETS[releaseIdx] || RELEASE_AGE_OFFSETS[0];

      // Automated mode: Unit, API, Contract, Performance, Security are mostly automated
      const isAutomated = (suiteType === 'Unit' || suiteType === 'API' || suiteType === 'Contract' || suiteType === 'Performance')
        ? rng.boolean(0.94)
        : rng.boolean(0.68);
      const mode: TestExecutionMode = isAutomated ? 'Automated' : 'Manual';

      // Status distribution: ~84% Passed, ~9% Failed, ~4% Blocked, ~3% Unattempted
      const statusRoll = rng.next();
      let status: TestExecutionStatus = 'Passed';
      if (statusRoll > 0.97) status = 'Unattempted';
      else if (statusRoll > 0.93) status = 'Blocked';
      else if (statusRoll > 0.84) status = 'Failed';

      const isFlaky = isAutomated && rng.boolean(0.04);
      const rerunCount = isFlaky ? rng.range(1, 4) : 0;
      const executionDaysAgo = rng.range(ageProfile.minDays, ageProfile.maxDays);
      const executionDate = new Date(now - executionDaysAgo * 86400000).toISOString();

      const durationSeconds = isAutomated 
        ? rng.range(1, 40) 
        : rng.range(120, 1500);

      const linkedJiraKey = status === 'Failed' && rng.boolean(0.7) 
        ? `${product.substring(0, 3).toUpperCase()}-${rng.range(1001, 2000)}` 
        : undefined;

      testRailExecutions.push({
        id,
        caseId,
        title: `Verify ${suiteType} validation for ${component}`,
        suiteType,
        mode,
        status,
        product,
        component,
        sprint: rng.choice(APP_SPRINTS),
        releaseVersion,
        executedBy: isAutomated ? 'CI/CD GitHub Runner' : rng.choice(QA_ENGINEERS),
        executionDate,
        durationSeconds,
        isFlaky,
        rerunCount,
        linkedJiraKey,
        errorMessage: status === 'Failed' ? 'AssertionError: HTTP 500 payload response check failed' : undefined
      });
    }
  }

  // 3. Generate 1,200 GitHub Pull Requests across all products
  for (let i = 1; i <= 1200; i++) {
    const number = 1000 + i;
    const id = `PR-${number}`;
    const product = rng.choice(APP_PRODUCTS);
    const component = rng.choice(PRODUCT_COMPONENTS_MAP[product]);
    const prDaysAgo = rng.range(1, 55);
    const createdAt = new Date(now - prDaysAgo * 86400000).toISOString();
    const isMerged = rng.boolean(0.86);
    const mergedAt = isMerged ? new Date(now - Math.max(0, prDaysAgo - 1) * 86400000).toISOString() : undefined;

    githubPRs.push({
      id,
      number,
      title: `feat(${component}): enhance resilience for ${product}`,
      author: rng.choice(DEV_ENGINEERS),
      repository: `${product.toLowerCase()}-service`,
      targetBranch: rng.choice(['main', 'develop', 'release']),
      status: isMerged ? 'Merged' : rng.boolean(0.7) ? 'Open' : 'Closed',
      createdAt,
      mergedAt,
      linesAdded: rng.range(25, 750),
      linesDeleted: rng.range(5, 260),
      unitTestIncluded: rng.boolean(0.90),
      apiTestIncluded: rng.boolean(0.76),
      ciStatus: rng.boolean(0.91) ? 'Passed' : 'Failed',
      pipelineDurationMinutes: rng.range(4, 28),
      linkedJiraKey: `${product.substring(0, 3).toUpperCase()}-${rng.range(1001, 2000)}`
    });
  }

  // 4. Generate 2,000 GitHub Commits
  for (let i = 1; i <= 2000; i++) {
    const product = rng.choice(APP_PRODUCTS);
    const commitDaysAgo = rng.range(1, 60);
    githubCommits.push({
      id: Math.random().toString(16).substring(2, 9),
      message: `ci/test(${product}): sync quality gates and compliance checks #${rng.range(100, 999)}`,
      author: rng.choice(DEV_ENGINEERS),
      repository: `${product.toLowerCase()}-service`,
      timestamp: new Date(now - commitDaysAgo * 86400000).toISOString(),
      hasComplianceTest: rng.boolean(0.93)
    });
  }

  return {
    jiraItems,
    testRailExecutions,
    githubPRs,
    githubCommits
  };
}
