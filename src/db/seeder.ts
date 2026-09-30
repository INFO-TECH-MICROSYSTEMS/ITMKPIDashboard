/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * High-Volume Realistic Sample Data Generator
 * Seeds the database with hundreds of JIRA, TestRail, and GitHub records
 * matching realistic enterprise Quality Engineering schemas and distributions.
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
  APP_COMPONENTS, 
  APP_SPRINTS, 
  APP_RELEASES, 
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

export function generateSampleDataset() {
  const rng = new PseudoRandom(1337);
  const now = Date.now();

  const jiraItems: JiraWorkItem[] = [];
  const testRailExecutions: TestRailExecution[] = [];
  const githubPRs: GitHubPullRequest[] = [];
  const githubCommits: GitHubCommit[] = [];

  const types: WorkItemType[] = ['Story', 'Story', 'Bug', 'Bug', 'Task', 'CustomerAPAR', 'Epic'];
  const severities: WorkItemSeverity[] = ['P1-Blocker', 'P2-Critical', 'P3-Major', 'P3-Major', 'P4-Minor'];
  const statuses: WorkItemStatus[] = ['Done', 'Done', 'Done', 'Under QA', 'In Development', 'Blocked', 'Reopened'];

  // 1. Generate 550 JIRA Work Items
  for (let i = 1; i <= 550; i++) {
    const id = `ITM-${1000 + i}`;
    const itemType = rng.choice(types);
    const severity = rng.choice(severities);
    const status = rng.choice(statuses);
    const product = rng.choice(APP_PRODUCTS);
    const component = rng.choice(APP_COMPONENTS);
    const sprint = rng.choice(APP_SPRINTS);
    const releaseVersion = rng.choice(APP_RELEASES);
    const assignee = rng.choice(DEV_ENGINEERS);
    const qaOwner = rng.choice(QA_ENGINEERS);
    
    // Calculate realistic timestamps within the last 60 days
    const daysAgoCreated = rng.range(2, 60);
    const createdAt = new Date(now - daysAgoCreated * 86400000).toISOString();
    
    // For aging pending tests: distribute QA entry dates between 3 to 35 days ago
    let qaQueueEntryDate: string | undefined = undefined;
    if (status === 'Under QA' || status === 'Blocked') {
      const daysInQA = rng.range(2, 35);
      qaQueueEntryDate = new Date(now - daysInQA * 86400000).toISOString();
    }

    const isBug = itemType === 'Bug' || itemType === 'CustomerAPAR';
    const isGating = isBug && (severity === 'P1-Blocker' || (severity === 'P2-Critical' && rng.boolean(0.5)));
    const isRegression = isBug && rng.boolean(0.35);
    const isCustomer = itemType === 'CustomerAPAR' || (isBug && rng.boolean(0.18));
    const isReopened = rng.boolean(0.12);

    let resolvedAt: string | undefined = undefined;
    if (status === 'Done') {
      const daysAgoResolved = Math.max(1, daysAgoCreated - rng.range(1, 10));
      resolvedAt = new Date(now - daysAgoResolved * 86400000).toISOString();
    }

    jiraItems.push({
      id,
      title: `${itemType}: Enhance ${component} handling for ${product}`,
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
      dependencyDepth: rng.range(1, 6),
      isGatingDefect: isGating,
      isRegressionDefect: isRegression,
      isCustomerDefect: isCustomer,
      isReopened,
      reopenCount: isReopened ? rng.range(1, 3) : 0,
      hasTestPlan: rng.boolean(0.85),
      hasUnitTests: rng.boolean(0.78),
      hasApiTests: rng.boolean(0.68),
      createdAt,
      qaQueueEntryDate,
      resolvedAt,
      testingHoursSpent: rng.range(2, 28)
    });
  }

  // 2. Generate 2,800 TestRail Executions
  const suiteTypes: TestSuiteType[] = [
    'Unit', 'API', 'Contract', 'UI', 'Regression', 
    'Performance', 'Accessibility', 'Security'
  ];

  for (let i = 1; i <= 2800; i++) {
    const id = `TR-RUN-${8000 + i}`;
    const caseId = `C${rng.range(100, 999)}`;
    const suiteType = rng.choice(suiteTypes);
    // Unit & API are mostly automated; UI & Exploratory have manual components
    const isAutomated = suiteType === 'Unit' || suiteType === 'API' || suiteType === 'Contract' 
      ? rng.boolean(0.95) 
      : rng.boolean(0.60);
    const mode: TestExecutionMode = isAutomated ? 'Automated' : 'Manual';
    
    // Status probability: ~82% Pass, ~10% Fail, ~4% Blocked, ~4% Unattempted
    const statusRoll = rng.next();
    let status: TestExecutionStatus = 'Passed';
    if (statusRoll > 0.96) status = 'Unattempted';
    else if (statusRoll > 0.92) status = 'Blocked';
    else if (statusRoll > 0.82) status = 'Failed';

    const isFlaky = isAutomated && rng.boolean(0.045);
    const rerunCount = isFlaky ? rng.range(1, 4) : 0;
    const executionDaysAgo = rng.range(0, 45);
    const executionDate = new Date(now - executionDaysAgo * 86400000).toISOString();

    const durationSeconds = isAutomated 
      ? rng.range(1, 45) 
      : rng.range(120, 1800);

    const linkedJiraKey = status === 'Failed' && rng.boolean(0.7) 
      ? `ITM-${rng.range(1001, 1500)}` 
      : undefined;

    testRailExecutions.push({
      id,
      caseId,
      title: `Verify ${suiteType} validation for ${rng.choice(APP_COMPONENTS)}`,
      suiteType,
      mode,
      status,
      product: rng.choice(APP_PRODUCTS),
      component: rng.choice(APP_COMPONENTS),
      sprint: rng.choice(APP_SPRINTS),
      releaseVersion: rng.choice(APP_RELEASES),
      executedBy: isAutomated ? 'CI/CD GitHub Runner' : rng.choice(QA_ENGINEERS),
      executionDate,
      durationSeconds,
      isFlaky,
      rerunCount,
      linkedJiraKey,
      errorMessage: status === 'Failed' ? 'AssertionError: HTTP 500 response code received during payload assert' : undefined
    });
  }

  // 3. Generate 350 GitHub Pull Requests
  for (let i = 1; i <= 350; i++) {
    const number = 300 + i;
    const id = `PR-${number}`;
    const prDaysAgo = rng.range(1, 50);
    const createdAt = new Date(now - prDaysAgo * 86400000).toISOString();
    const isMerged = rng.boolean(0.85);
    const mergedAt = isMerged ? new Date(now - (prDaysAgo - 1) * 86400000).toISOString() : undefined;
    
    githubPRs.push({
      id,
      number,
      title: `feat(${rng.choice(APP_COMPONENTS)}): upgrade resilience & retry logic`,
      author: rng.choice(DEV_ENGINEERS),
      repository: rng.choice(['ITMWebSite', 'ITM-Core-Engine', 'ITM-Cloud-Gateway']),
      targetBranch: rng.choice(['main', 'release/3.4', 'develop']),
      status: isMerged ? 'Merged' : rng.boolean(0.7) ? 'Open' : 'Closed',
      createdAt,
      mergedAt,
      linesAdded: rng.range(15, 650),
      linesDeleted: rng.range(5, 220),
      unitTestIncluded: rng.boolean(0.88),
      apiTestIncluded: rng.boolean(0.72),
      ciStatus: rng.boolean(0.89) ? 'Passed' : 'Failed',
      pipelineDurationMinutes: rng.range(4, 32),
      linkedJiraKey: `ITM-${rng.range(1001, 1500)}`
    });
  }

  // 4. Generate 500 GitHub Commits
  for (let i = 1; i <= 500; i++) {
    const commitDaysAgo = rng.range(1, 60);
    githubCommits.push({
      id: Math.random().toString(16).substring(2, 9),
      message: `ci/test: sync quality hooks and compliance suite #${rng.range(100, 999)}`,
      author: rng.choice(DEV_ENGINEERS),
      repository: rng.choice(['ITMWebSite', 'ITM-Core-Engine']),
      timestamp: new Date(now - commitDaysAgo * 86400000).toISOString(),
      hasComplianceTest: rng.boolean(0.92)
    });
  }

  return {
    jiraItems,
    testRailExecutions,
    githubPRs,
    githubCommits
  };
}
