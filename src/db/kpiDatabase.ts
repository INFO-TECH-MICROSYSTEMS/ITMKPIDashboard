/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * IndexedDB Free Database Instance (Dexie.js)
 * Enterprise-grade, persistent client-side database with transactional support,
 * zero licensing cost, and rapid query execution.
 */

import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { 
  JiraWorkItem, 
  TestRailExecution, 
  GitHubPullRequest, 
  GitHubCommit, 
  DataSourceConfig, 
  SyncAuditLog 
} from '../types/kpiPlatform';

export class KPIDatabase extends Dexie {
  jiraWorkItems!: Table<JiraWorkItem, string>;
  testRailExecutions!: Table<TestRailExecution, string>;
  githubPullRequests!: Table<GitHubPullRequest, string>;
  githubCommits!: Table<GitHubCommit, string>;
  dataSourceConfigs!: Table<DataSourceConfig, string>;
  syncAuditLogs!: Table<SyncAuditLog, string>;

  constructor() {
    super('ITM_QualityEngineering_DB');

    this.version(1).stores({
      jiraWorkItems: 'id, product, component, sprint, releaseVersion, status, severity, isGatingDefect, isRegressionDefect, isCustomerDefect, createdAt',
      testRailExecutions: 'id, caseId, suiteType, mode, status, product, component, sprint, releaseVersion, executedBy, executionDate, isFlaky',
      githubPullRequests: 'id, number, repository, targetBranch, status, ciStatus, createdAt',
      githubCommits: 'id, repository, author, timestamp',
      dataSourceConfigs: 'id, name, frequency',
      syncAuditLogs: 'id, timestamp, source, status'
    });

    this.version(2).stores({
      jiraWorkItems: 'id, product, component, sprint, releaseVersion, status, severity, discoveryMethod, isGatingDefect, isRegressionDefect, isCustomerDefect, createdAt',
    });
  }
}

export const kpiDb = new KPIDatabase();
