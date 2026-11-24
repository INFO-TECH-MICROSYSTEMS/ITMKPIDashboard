/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import { generateDynamicKPIEnterpriseDataset } from './dynamicDataGenerator';
import { supabase, checkStorageHealth, type StorageStatus } from './supabaseClient';
import type { 
  JiraWorkItem, 
  TestRailExecution, 
  GitHubPullRequest, 
  GitHubCommit, 
  DataSourceConfig, 
  SyncAuditLog, 
  KPIFilterState, 
  DataSourceType, 
  UserAccount, 
  UserRole,
  DefectDiscoveryMethod,
  WorkItemStatus,
  WorkItemSeverity,
  WorkItemType,
  TestSuiteType,
  TestExecutionMode,
  TestExecutionStatus
} from '../types/kpiPlatform';
import { DEFAULT_CONNECTOR_CONFIGS } from '../constants/kpiConstants';

export interface IKPIDataRepository {
  init(): Promise<void>;
  getStorageStatus(): Promise<StorageStatus>;
  resetToSampleDataset(seed?: string | number): Promise<{ recordsCount: number; seed: string; timestamp: string }>;
  wipeAndReplaceSource(source: DataSourceType, newData: any[]): Promise<void>;
  wipeAndReplaceAll(
    jira: JiraWorkItem[], 
    testRail: TestRailExecution[], 
    prs: GitHubPullRequest[], 
    commits: GitHubCommit[]
  ): Promise<void>;
  getJiraItems(filter?: KPIFilterState): Promise<JiraWorkItem[]>;
  getTestRailExecutions(filter?: KPIFilterState): Promise<TestRailExecution[]>;
  getGitHubPullRequests(filter?: KPIFilterState): Promise<GitHubPullRequest[]>;
  getGitHubCommits(filter?: KPIFilterState): Promise<GitHubCommit[]>;
  getConnectorConfigs(): Promise<DataSourceConfig[]>;
  saveConnectorConfig(config: DataSourceConfig): Promise<void>;
  getSyncLogs(): Promise<SyncAuditLog[]>;
  logSync(log: SyncAuditLog): Promise<void>;
  getRecordCounts(): Promise<{ jira: number; testRail: number; githubPRs: number; githubCommits: number }>;
  
  // User Authentication & Management
  getAllUsers(): Promise<UserAccount[]>;
  getUserByEmail(email: string): Promise<UserAccount | undefined>;
  getUserById(id: string): Promise<UserAccount | undefined>;
  saveUser(user: UserAccount): Promise<void>;
  updateUserRole(userId: string, newRole: UserRole): Promise<void>;
  deleteUser(userId: string): Promise<void>;
  getUserCount(): Promise<number>;
  getAdminCount(): Promise<number>;
}

class SupabaseCloudKPIDataRepository implements IKPIDataRepository {
  private initialized = false;
  private currentStorageStatus: StorageStatus | null = null;
  private inMemoryAuditLogs: SyncAuditLog[] = [];
  private inMemoryPRs: GitHubPullRequest[] = [];
  private inMemoryCommits: GitHubCommit[] = [];

  async getStorageStatus(): Promise<StorageStatus> {
    this.currentStorageStatus = await checkStorageHealth();
    return this.currentStorageStatus;
  }

  async init(): Promise<void> {
    if (this.initialized) return;
    await this.getStorageStatus();

    // Check if cloud database has records
    const counts = await this.getRecordCounts();
    if (counts.jira === 0 || counts.testRail === 0) {
      await this.resetToSampleDataset();
    }
    this.initialized = true;
  }

  /**
   * Generates sample dataset and populates directly into Supabase PostgreSQL tables.
   */
  async resetToSampleDataset(seed?: string | number): Promise<{ recordsCount: number; seed: string; timestamp: string }> {
    const dataset = generateDynamicKPIEnterpriseDataset(seed);
    const { jiraItems, testRailExecutions, githubPRs, githubCommits } = dataset;
    const totalRecords = jiraItems.length + testRailExecutions.length + githubPRs.length + githubCommits.length;

    this.inMemoryPRs = githubPRs;
    this.inMemoryCommits = githubCommits;

    if (!supabase) {
      throw new Error('Supabase client is not configured.');
    }

    // 1. Sync Releases
    if (dataset.releaseSchedules && dataset.releaseSchedules.length > 0) {
      const cloudReleases = dataset.releaseSchedules.map(r => ({
        id: `${r.product}_${r.releaseVersion}`,
        product: r.product,
        version: r.releaseVersion,
        start_date: r.startDate.toISOString().substring(0, 10),
        end_date: r.targetDate.toISOString().substring(0, 10),
        is_ongoing: r.isOngoing,
        status: r.isOngoing ? 'In Progress' : 'Completed'
      }));
      await supabase.from('releases').delete().neq('id', '___none___');
      await supabase.from('releases').insert(cloudReleases);
    }

    // 2. Sync Connectors
    const cloudConnectors = [
      {
        id: 'conn_jira',
        name: 'Jira Software',
        type: 'jira',
        endpoint_url: 'https://jira.infotechmicrosystems.com',
        auth_type: 'api_token',
        sync_schedule: 'every-15m',
        last_sync_status: 'Success',
        last_sync_timestamp: new Date().toISOString(),
        records_synced: jiraItems.length
      },
      {
        id: 'conn_testrail',
        name: 'TestRail QA',
        type: 'testrail',
        endpoint_url: 'https://testrail.infotechmicrosystems.com',
        auth_type: 'api_token',
        sync_schedule: 'every-15m',
        last_sync_status: 'Success',
        last_sync_timestamp: new Date().toISOString(),
        records_synced: testRailExecutions.length
      },
      {
        id: 'conn_github',
        name: 'GitHub Enterprise',
        type: 'github',
        endpoint_url: 'https://github.com/infotechmicrosystems',
        auth_type: 'pat',
        sync_schedule: 'every-hour',
        last_sync_status: 'Success',
        last_sync_timestamp: new Date().toISOString(),
        records_synced: githubPRs.length + githubCommits.length
      }
    ];
    await supabase.from('connectors').delete().neq('id', '___none___');
    await supabase.from('connectors').insert(cloudConnectors);

    // 3. Sync Work Items in Batches of 500
    await supabase.from('work_items').delete().neq('id', '___none___');
    const BATCH_SIZE = 500;
    for (let i = 0; i < jiraItems.length; i += BATCH_SIZE) {
      const batch = jiraItems.slice(i, i + BATCH_SIZE).map(item => ({
        id: item.id,
        product: item.product,
        component: item.component,
        release_version: item.releaseVersion,
        title: item.title,
        type: item.type,
        severity: item.severity,
        status: item.status,
        assignee: item.assignee,
        qa_owner: item.qaOwner,
        is_gating_defect: item.isGatingDefect,
        dependency_depth: item.dependencyDepth,
        created_date: item.createdAt ? item.createdAt.substring(0, 10) : new Date().toISOString().substring(0, 10),
        resolved_date: item.resolvedAt ? item.resolvedAt.substring(0, 10) : null
      }));
      const { error: batchErr } = await supabase.from('work_items').insert(batch);
      if (batchErr) {
        console.warn('[Repository] Supabase work_items batch insert error:', batchErr.message);
      }
    }

    // 4. Sync Test Executions in Batches of 500
    await supabase.from('test_executions').delete().neq('id', '___none___');
    for (let i = 0; i < testRailExecutions.length; i += BATCH_SIZE) {
      const batch = testRailExecutions.slice(i, i + BATCH_SIZE).map(test => ({
        id: test.id,
        product: test.product,
        component: test.component,
        release_version: test.releaseVersion,
        title: test.title,
        suite_type: test.suiteType,
        is_automated: test.mode === 'Automated',
        status: test.status === 'Unattempted' ? 'Untested' : test.status,
        is_flaky: test.isFlaky,
        rerun_count: test.rerunCount,
        duration_seconds: test.durationSeconds,
        executed_by: test.executedBy,
        executed_date: test.executionDate ? test.executionDate.substring(0, 10) : null
      }));
      const { error: batchErr } = await supabase.from('test_executions').insert(batch);
      if (batchErr) {
        console.warn('[Repository] Supabase test_executions batch insert error:', batchErr.message);
      }
    }

    const auditLog: SyncAuditLog = {
      id: `SYNC-${Date.now()}`,
      timestamp: new Date().toISOString(),
      source: 'all',
      recordsReplaced: totalRecords,
      durationMs: 450,
      status: 'success'
    };
    this.inMemoryAuditLogs.unshift(auditLog);

    return {
      recordsCount: totalRecords,
      seed: dataset.seed,
      timestamp: dataset.generatedAt
    };
  }

  async wipeAndReplaceSource(source: DataSourceType, newData: any[]): Promise<void> {
    const startTime = Date.now();
    if (!supabase) return;

    if (source === 'jira') {
      await supabase.from('work_items').delete().neq('id', '___none___');
      const BATCH = 500;
      for (let i = 0; i < newData.length; i += BATCH) {
        await supabase.from('work_items').insert(newData.slice(i, i + BATCH));
      }
    } else if (source === 'testrail') {
      await supabase.from('test_executions').delete().neq('id', '___none___');
      const BATCH = 500;
      for (let i = 0; i < newData.length; i += BATCH) {
        await supabase.from('test_executions').insert(newData.slice(i, i + BATCH));
      }
    }

    this.inMemoryAuditLogs.unshift({
      id: `SYNC-${Date.now()}`,
      timestamp: new Date().toISOString(),
      source,
      recordsReplaced: newData.length,
      durationMs: Date.now() - startTime,
      status: 'success'
    });
  }

  async wipeAndReplaceAll(
    _jira: JiraWorkItem[], 
    _testRail: TestRailExecution[], 
    prs: GitHubPullRequest[], 
    commits: GitHubCommit[]
  ): Promise<void> {
    this.inMemoryPRs = prs;
    this.inMemoryCommits = commits;
    await this.resetToSampleDataset();
  }

  async getJiraItems(filter?: KPIFilterState): Promise<JiraWorkItem[]> {
    if (!supabase) return [];
    let query = supabase.from('work_items').select('*');

    if (filter) {
      if (filter.product && filter.product !== 'All') {
        query = query.eq('product', filter.product);
      }
      if (filter.component && filter.component !== 'All') {
        query = query.eq('component', filter.component);
      }
      if (filter.releaseVersion && filter.releaseVersion !== 'All') {
        query = query.eq('release_version', filter.releaseVersion);
      }
    }

    const { data, error } = await query;
    if (error || !data) {
      console.warn('[Repository] work_items query error:', error?.message);
      return [];
    }

    return data.map((item: any): JiraWorkItem => ({
      id: item.id,
      product: item.product,
      component: item.component,
      sprint: 'Sprint-1',
      releaseVersion: item.release_version,
      title: item.title,
      type: (item.type as WorkItemType) || 'Story',
      severity: (item.severity as WorkItemSeverity) || 'P3-Major',
      status: (item.status as WorkItemStatus) || 'Done',
      assignee: item.assignee || 'Unassigned',
      qaOwner: item.qa_owner || 'Unassigned',
      storyPoints: 3,
      dependencyDepth: item.dependency_depth || 1,
      isGatingDefect: Boolean(item.is_gating_defect),
      isRegressionDefect: item.type === 'Bug',
      isCustomerDefect: item.type === 'CustomerAPAR',
      discoveryMethod: 'Automated CI Pipeline' as DefectDiscoveryMethod,
      isReopened: false,
      reopenCount: 0,
      hasTestPlan: true,
      hasUnitTests: true,
      hasApiTests: true,
      createdAt: item.created_date ? new Date(item.created_date).toISOString() : new Date().toISOString(),
      qaQueueEntryDate: item.created_date ? new Date(item.created_date).toISOString() : new Date().toISOString(),
      resolvedAt: item.resolved_date ? new Date(item.resolved_date).toISOString() : undefined,
      testingHoursSpent: 6
    }));
  }

  async getTestRailExecutions(filter?: KPIFilterState): Promise<TestRailExecution[]> {
    if (!supabase) return [];
    let query = supabase.from('test_executions').select('*');

    if (filter) {
      if (filter.product && filter.product !== 'All') {
        query = query.eq('product', filter.product);
      }
      if (filter.component && filter.component !== 'All') {
        query = query.eq('component', filter.component);
      }
      if (filter.releaseVersion && filter.releaseVersion !== 'All') {
        query = query.eq('release_version', filter.releaseVersion);
      }
    }

    const { data, error } = await query;
    if (error || !data) {
      console.warn('[Repository] test_executions query error:', error?.message);
      return [];
    }

    return data.map((t: any): TestRailExecution => ({
      id: t.id,
      caseId: `C${t.id.replace(/\D/g, '') || '1000'}`,
      title: t.title,
      suiteType: (t.suite_type as TestSuiteType) || 'Automated Regression',
      mode: (t.is_automated ? 'Automated' : 'Manual') as TestExecutionMode,
      status: (t.status === 'Untested' ? 'Unattempted' : t.status) as TestExecutionStatus,
      product: t.product,
      component: t.component,
      sprint: 'Sprint-1',
      releaseVersion: t.release_version,
      executedBy: t.executed_by || 'CI Bot',
      addedDate: t.executed_date ? new Date(t.executed_date).toISOString() : new Date().toISOString(),
      executionDate: t.executed_date ? new Date(t.executed_date).toISOString() : new Date().toISOString(),
      durationSeconds: t.duration_seconds || 15,
      isFlaky: Boolean(t.is_flaky),
      rerunCount: t.rerun_count || 0
    }));
  }

  async getGitHubPullRequests(filter?: KPIFilterState): Promise<GitHubPullRequest[]> {
    if (this.inMemoryPRs.length === 0) {
      const dataset = generateDynamicKPIEnterpriseDataset();
      this.inMemoryPRs = dataset.githubPRs;
    }
    if (filter && filter.product && filter.product !== 'All') {
      return this.inMemoryPRs.filter(p => p.repository.startsWith(filter.product.toLowerCase()));
    }
    return this.inMemoryPRs;
  }

  async getGitHubCommits(_filter?: KPIFilterState): Promise<GitHubCommit[]> {
    if (this.inMemoryCommits.length === 0) {
      const dataset = generateDynamicKPIEnterpriseDataset();
      this.inMemoryCommits = dataset.githubCommits;
    }
    return this.inMemoryCommits;
  }

  async getConnectorConfigs(): Promise<DataSourceConfig[]> {
    if (!supabase) return DEFAULT_CONNECTOR_CONFIGS;
    const { data, error } = await supabase.from('connectors').select('*');
    if (error || !data || data.length === 0) {
      return DEFAULT_CONNECTOR_CONFIGS;
    }
    return data.map((c: any) => ({
      id: c.type || c.id,
      name: c.name,
      enabled: true,
      endpointUrl: c.endpoint_url || 'https://api.infotechmicrosystems.com',
      authType: 'apiKey',
      apiTokenOrKey: '••••••••••••',
      projectOrOrgKey: 'PROJ-CORE',
      frequency: c.sync_schedule || 'every-15m',
      lastSyncTimestamp: c.last_sync_timestamp,
      lastSyncStatus: 'success',
      recordCount: c.records_synced || 0
    }));
  }

  async saveConnectorConfig(config: DataSourceConfig): Promise<void> {
    if (!supabase) return;
    await supabase.from('connectors').upsert({
      id: `conn_${config.id}`,
      name: config.name,
      type: config.id,
      endpoint_url: config.endpointUrl,
      auth_type: 'api_token',
      sync_schedule: config.frequency,
      last_sync_status: 'Success',
      last_sync_timestamp: new Date().toISOString(),
      records_synced: config.recordCount || 0
    });
  }

  async getSyncLogs(): Promise<SyncAuditLog[]> {
    return this.inMemoryAuditLogs;
  }

  async logSync(log: SyncAuditLog): Promise<void> {
    this.inMemoryAuditLogs.unshift(log);
  }

  async getRecordCounts(): Promise<{ jira: number; testRail: number; githubPRs: number; githubCommits: number }> {
    if (!supabase) {
      return { jira: 0, testRail: 0, githubPRs: 0, githubCommits: 0 };
    }
    const [jiraRes, testRes] = await Promise.all([
      supabase.from('work_items').select('*', { count: 'exact', head: true }),
      supabase.from('test_executions').select('*', { count: 'exact', head: true })
    ]);
    return {
      jira: jiraRes.count || 0,
      testRail: testRes.count || 0,
      githubPRs: 1200,
      githubCommits: 2000
    };
  }

  // ==========================================
  // USER AUTHENTICATION & RBAC (SUPABASE CLOUD)
  // ==========================================

  async getAllUsers(): Promise<UserAccount[]> {
    if (!supabase) return [];
    const { data, error } = await supabase.from('users').select('*');
    if (error || !data) {
      console.warn('[Repository] Supabase getAllUsers error:', error?.message);
      return [];
    }
    return data.map((d: any) => ({
      id: d.id,
      name: d.name,
      email: d.email,
      role: d.role as UserRole,
      passwordHash: d.password_hash,
      passwordSalt: d.password_salt,
      department: d.department || 'Quality Engineering',
      createdAt: d.created_at,
      updatedAt: d.updated_at,
      lastLoginAt: d.last_login_at
    }));
  }

  async getUserByEmail(email: string): Promise<UserAccount | undefined> {
    if (!supabase) return undefined;
    const normalized = email.trim().toLowerCase();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .ilike('email', normalized)
      .maybeSingle();

    if (error || !data) return undefined;
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role as UserRole,
      passwordHash: data.password_hash,
      passwordSalt: data.password_salt,
      department: data.department || 'Quality Engineering',
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      lastLoginAt: data.last_login_at
    };
  }

  async getUserById(id: string): Promise<UserAccount | undefined> {
    if (!supabase) return undefined;
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) return undefined;
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role as UserRole,
      passwordHash: data.password_hash,
      passwordSalt: data.password_salt,
      department: data.department || 'Quality Engineering',
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      lastLoginAt: data.last_login_at
    };
  }

  async saveUser(user: UserAccount): Promise<void> {
    if (!supabase) throw new Error('Supabase cloud client is unavailable.');

    const { error } = await supabase.from('users').upsert({
      id: user.id,
      name: user.name,
      email: user.email.toLowerCase(),
      role: user.role,
      password_hash: user.passwordHash,
      password_salt: user.passwordSalt,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      last_login_at: user.lastLoginAt
    });

    if (error) {
      console.error('[Repository] Cloud saveUser failed:', error.message);
      throw new Error(`Cloud database error: ${error.message}`);
    }
  }

  async updateUserRole(userId: string, newRole: UserRole): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) throw new Error('User not found.');

    if (user.role === 'admin' && newRole === 'user') {
      const adminCount = await this.getAdminCount();
      if (adminCount <= 1) {
        throw new Error('Action blocked: Cannot demote the last remaining Administrator.');
      }
    }

    user.role = newRole;
    user.updatedAt = new Date().toISOString();
    await this.saveUser(user);
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) return;

    if (user.role === 'admin') {
      const adminCount = await this.getAdminCount();
      if (adminCount <= 1) {
        throw new Error('Action blocked: Cannot delete the last remaining Administrator.');
      }
    }

    if (supabase) {
      await supabase.from('users').delete().eq('id', userId);
    }
  }

  async getUserCount(): Promise<number> {
    if (!supabase) return 0;
    const { count } = await supabase.from('users').select('*', { count: 'exact', head: true });
    return count || 0;
  }

  async getAdminCount(): Promise<number> {
    if (!supabase) return 0;
    const { count } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'admin');
    return count || 0;
  }
}

export const kpiRepository: IKPIDataRepository = new SupabaseCloudKPIDataRepository();
