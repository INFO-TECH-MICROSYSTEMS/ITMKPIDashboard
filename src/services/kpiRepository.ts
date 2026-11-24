/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import { kpiDb } from '../db/kpiDatabase';
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
  UserRole
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

class HybridKPIDataRepository implements IKPIDataRepository {
  private initialized = false;
  private currentStorageStatus: StorageStatus | null = null;

  async getStorageStatus(): Promise<StorageStatus> {
    this.currentStorageStatus = await checkStorageHealth();
    return this.currentStorageStatus;
  }

  async init(): Promise<void> {
    if (this.initialized) return;

    await this.getStorageStatus();
    const count = await kpiDb.jiraWorkItems.count();
    const firstItem = await kpiDb.jiraWorkItems.limit(1).first();
    const isLegacy = !firstItem || !['YouTube', 'GMail', 'LinkedIn', 'Shopify', 'Amazon'].includes(firstItem.product);

    // Dataset generation check
    const DATASET_GENERATION_KEY = 'itm_kpi_dataset_dynamic_v1';
    const hasGeneratedDynamic = typeof window !== 'undefined' ? localStorage.getItem(DATASET_GENERATION_KEY) : null;

    if (count < 10000 || isLegacy || !hasGeneratedDynamic) {
      await this.resetToSampleDataset();
      if (typeof window !== 'undefined') {
        localStorage.setItem(DATASET_GENERATION_KEY, new Date().toISOString());
      }
    } else {
      const configCount = await kpiDb.dataSourceConfigs.count();
      if (configCount === 0) {
        await kpiDb.dataSourceConfigs.bulkPut(DEFAULT_CONNECTOR_CONFIGS);
      }
    }

    // Clean legacy placeholder user in Dexie if it exists without password hash or with invalid non-UUID format
    try {
      const allDexieUsers = await kpiDb.users.toArray();
      for (const u of allDexieUsers) {
        // If it starts with usr_ or doesn't match standard UUID format, prune invalid local cache
        if (u.id.startsWith('usr_')) {
          await kpiDb.users.delete(u.id);
        }
      }
    } catch {
      // ignore
    }

    this.initialized = true;
  }

  /**
   * Generates completely fresh, realistic sample data dynamically anchored to `new Date()`.
   * Purges database tables, persists to Dexie (and Supabase if connected),
   * and logs atomic sync status.
   */
  async resetToSampleDataset(seed?: string | number): Promise<{ recordsCount: number; seed: string; timestamp: string }> {
    const dataset = generateDynamicKPIEnterpriseDataset(seed);
    const { jiraItems, testRailExecutions, githubPRs, githubCommits } = dataset;
    const totalRecords = jiraItems.length + testRailExecutions.length + githubPRs.length + githubCommits.length;

    // 1. Transactionally wipe and save in Dexie IndexedDB
    await kpiDb.transaction('rw', [
      kpiDb.jiraWorkItems,
      kpiDb.testRailExecutions,
      kpiDb.githubPullRequests,
      kpiDb.githubCommits,
      kpiDb.dataSourceConfigs,
      kpiDb.syncAuditLogs
    ], async () => {
      await kpiDb.jiraWorkItems.clear();
      await kpiDb.testRailExecutions.clear();
      await kpiDb.githubPullRequests.clear();
      await kpiDb.githubCommits.clear();

      await kpiDb.jiraWorkItems.bulkPut(jiraItems);
      await kpiDb.testRailExecutions.bulkPut(testRailExecutions);
      await kpiDb.githubPullRequests.bulkPut(githubPRs);
      await kpiDb.githubCommits.bulkPut(githubCommits);

      const existingConfigs = await kpiDb.dataSourceConfigs.toArray();
      if (existingConfigs.length === 0) {
        await kpiDb.dataSourceConfigs.bulkPut(DEFAULT_CONNECTOR_CONFIGS);
      }

      const auditLog: SyncAuditLog = {
        id: `SYNC-${Date.now()}`,
        timestamp: new Date().toISOString(),
        source: 'all',
        recordsReplaced: totalRecords,
        durationMs: 380,
        status: 'success'
      };
      await kpiDb.syncAuditLogs.put(auditLog);
    });

    // 2. If Supabase is reachable, asynchronously update cloud tables
    const status = await this.getStorageStatus();
    if (status.activeProvider === 'supabase' && supabase) {
      try {
        // Log to cloud audit log / sync table
        await supabase.from('connectors').upsert(
          DEFAULT_CONNECTOR_CONFIGS.map(c => ({
            id: c.id,
            name: c.name,
            frequency: c.frequency,
            last_sync_timestamp: new Date().toISOString(),
            last_sync_status: 'success',
            record_count: totalRecords
          }))
        );
      } catch (cloudErr) {
        console.warn('[Repository] Cloud push notification:', cloudErr);
      }
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('itm_kpi_dataset_dynamic_v1', dataset.generatedAt);
      localStorage.setItem('itm_kpi_last_seed', dataset.seed);
    }

    return {
      recordsCount: totalRecords,
      seed: dataset.seed,
      timestamp: dataset.generatedAt
    };
  }

  async wipeAndReplaceSource(source: DataSourceType, newData: any[]): Promise<void> {
    const startTime = Date.now();
    await kpiDb.transaction('rw', [
      kpiDb.jiraWorkItems,
      kpiDb.testRailExecutions,
      kpiDb.githubPullRequests,
      kpiDb.githubCommits,
      kpiDb.dataSourceConfigs,
      kpiDb.syncAuditLogs
    ], async () => {
      if (source === 'jira') {
        await kpiDb.jiraWorkItems.clear();
        await kpiDb.jiraWorkItems.bulkPut(newData as JiraWorkItem[]);
      } else if (source === 'testrail') {
        await kpiDb.testRailExecutions.clear();
        await kpiDb.testRailExecutions.bulkPut(newData as TestRailExecution[]);
      } else if (source === 'github') {
        await kpiDb.githubPullRequests.clear();
        await kpiDb.githubCommits.clear();
      }

      const connector = await kpiDb.dataSourceConfigs.get(source);
      if (connector) {
        connector.lastSyncTimestamp = new Date().toISOString();
        connector.lastSyncStatus = 'success';
        connector.recordCount = newData.length;
        await kpiDb.dataSourceConfigs.put(connector);
      }

      await kpiDb.syncAuditLogs.put({
        id: `SYNC-${Date.now()}`,
        timestamp: new Date().toISOString(),
        source,
        recordsReplaced: newData.length,
        durationMs: Date.now() - startTime,
        status: 'success'
      });
    });
  }

  async wipeAndReplaceAll(
    jira: JiraWorkItem[], 
    testRail: TestRailExecution[], 
    prs: GitHubPullRequest[], 
    commits: GitHubCommit[]
  ): Promise<void> {
    const startTime = Date.now();
    await kpiDb.transaction('rw', [
      kpiDb.jiraWorkItems,
      kpiDb.testRailExecutions,
      kpiDb.githubPullRequests,
      kpiDb.githubCommits,
      kpiDb.dataSourceConfigs,
      kpiDb.syncAuditLogs
    ], async () => {
      await kpiDb.jiraWorkItems.clear();
      await kpiDb.testRailExecutions.clear();
      await kpiDb.githubPullRequests.clear();
      await kpiDb.githubCommits.clear();

      await kpiDb.jiraWorkItems.bulkPut(jira);
      await kpiDb.testRailExecutions.bulkPut(testRail);
      await kpiDb.githubPullRequests.bulkPut(prs);
      await kpiDb.githubCommits.bulkPut(commits);

      const totalCount = jira.length + testRail.length + prs.length + commits.length;
      await kpiDb.syncAuditLogs.put({
        id: `SYNC-${Date.now()}`,
        timestamp: new Date().toISOString(),
        source: 'all',
        recordsReplaced: totalCount,
        durationMs: Date.now() - startTime,
        status: 'success'
      });
    });
  }

  async getJiraItems(filter?: KPIFilterState): Promise<JiraWorkItem[]> {
    let collection = kpiDb.jiraWorkItems.toCollection();
    if (filter) {
      if (filter.product && filter.product !== 'All') {
        collection = collection.filter(item => item.product === filter.product);
      }
      if (filter.component && filter.component !== 'All') {
        collection = collection.filter(item => item.component === filter.component);
      }
      if (filter.sprint && filter.sprint !== 'All') {
        collection = collection.filter(item => item.sprint === filter.sprint);
      }
      if (filter.releaseVersion && filter.releaseVersion !== 'All') {
        collection = collection.filter(item => item.releaseVersion === filter.releaseVersion);
      }
    }
    return await collection.toArray();
  }

  async getTestRailExecutions(filter?: KPIFilterState): Promise<TestRailExecution[]> {
    let collection = kpiDb.testRailExecutions.toCollection();
    if (filter) {
      if (filter.product && filter.product !== 'All') {
        collection = collection.filter(t => t.product === filter.product);
      }
      if (filter.component && filter.component !== 'All') {
        collection = collection.filter(t => t.component === filter.component);
      }
      if (filter.sprint && filter.sprint !== 'All') {
        collection = collection.filter(t => t.sprint === filter.sprint);
      }
      if (filter.releaseVersion && filter.releaseVersion !== 'All') {
        collection = collection.filter(t => t.releaseVersion === filter.releaseVersion);
      }
    }
    return await collection.toArray();
  }

  async getGitHubPullRequests(filter?: KPIFilterState): Promise<GitHubPullRequest[]> {
    let collection = kpiDb.githubPullRequests.toCollection();
    if (filter) {
      if (filter.product && filter.product !== 'All') {
        const repoPrefix = filter.product.toLowerCase();
        collection = collection.filter(pr => pr.repository.toLowerCase().includes(repoPrefix));
      }
    }
    return await collection.toArray();
  }

  async getGitHubCommits(filter?: KPIFilterState): Promise<GitHubCommit[]> {
    let collection = kpiDb.githubCommits.toCollection();
    if (filter) {
      if (filter.product && filter.product !== 'All') {
        const repoPrefix = filter.product.toLowerCase();
        collection = collection.filter(c => c.repository.toLowerCase().includes(repoPrefix));
      }
    }
    return await collection.toArray();
  }

  async getConnectorConfigs(): Promise<DataSourceConfig[]> {
    const configs = await kpiDb.dataSourceConfigs.toArray();
    if (configs.length === 0) {
      await kpiDb.dataSourceConfigs.bulkPut(DEFAULT_CONNECTOR_CONFIGS);
      return DEFAULT_CONNECTOR_CONFIGS;
    }
    return configs;
  }

  async saveConnectorConfig(config: DataSourceConfig): Promise<void> {
    await kpiDb.dataSourceConfigs.put(config);
  }

  async getSyncLogs(): Promise<SyncAuditLog[]> {
    return await kpiDb.syncAuditLogs.reverse().limit(20).toArray();
  }

  async logSync(log: SyncAuditLog): Promise<void> {
    await kpiDb.syncAuditLogs.put(log);
  }

  async getRecordCounts(): Promise<{ jira: number; testRail: number; githubPRs: number; githubCommits: number }> {
    const [jira, testRail, githubPRs, githubCommits] = await Promise.all([
      kpiDb.jiraWorkItems.count(),
      kpiDb.testRailExecutions.count(),
      kpiDb.githubPullRequests.count(),
      kpiDb.githubCommits.count()
    ]);
    return { jira, testRail, githubPRs, githubCommits };
  }

  // ==========================================
  // USER AUTHENTICATION & RBAC IMPLEMENTATION
  // ==========================================

  async getAllUsers(): Promise<UserAccount[]> {
    const status = await this.getStorageStatus();
    if (status.activeProvider === 'supabase' && supabase) {
      try {
        const { data, error } = await supabase.from('users').select('*');
        if (!error && data) {
          const cloudUsers: UserAccount[] = data.map((d: any) => ({
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
          
          // Replicate to local Dexie for fast offline cache
          if (cloudUsers.length > 0) {
            await kpiDb.users.bulkPut(cloudUsers);
          }
          return cloudUsers;
        }
      } catch (err) {
        console.warn('[Repository] Falling back to local users:', err);
      }
    }
    return await kpiDb.users.toArray();
  }

  async getUserByEmail(email: string): Promise<UserAccount | undefined> {
    const normalized = email.trim().toLowerCase();
    const status = await this.getStorageStatus();
    if (status.activeProvider === 'supabase' && supabase) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .ilike('email', normalized)
          .maybeSingle();
        if (!error && data) {
          const user: UserAccount = {
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
          await kpiDb.users.put(user);
          return user;
        }
      } catch (err) {
        console.warn('[Repository] Supabase user query error:', err);
      }
    }
    return await kpiDb.users.filter(u => u.email.toLowerCase() === normalized).first();
  }

  async getUserById(id: string): Promise<UserAccount | undefined> {
    const status = await this.getStorageStatus();
    if (status.activeProvider === 'supabase' && supabase) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        if (!error && data) {
          const user: UserAccount = {
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
          await kpiDb.users.put(user);
          return user;
        }
      } catch (err) {
        console.warn('[Repository] Supabase user query error:', err);
      }
    }
    return await kpiDb.users.get(id);
  }

  async saveUser(user: UserAccount): Promise<void> {
    await kpiDb.users.put(user);

    // If Supabase is connected, persist directly to cloud users table
    const status = await this.getStorageStatus();
    if (status.activeProvider === 'supabase' && supabase) {
      try {
        const { error } = await supabase.from('users').upsert({
          id: user.id,
          name: user.name,
          email: user.email.toLowerCase(),
          role: user.role,
          password_hash: user.passwordHash,
          password_salt: user.passwordSalt,
          department: user.department || 'Quality Engineering',
          created_at: user.createdAt,
          updated_at: user.updatedAt,
          last_login_at: user.lastLoginAt
        });
        if (error) {
          console.warn('[Repository] Supabase user upsert error:', error.message);
        }
      } catch (err) {
        console.warn('[Repository] Supabase user sync exception:', err);
      }
    }
  }

  async updateUserRole(userId: string, newRole: UserRole): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) throw new Error('User not found.');

    // If demoting an admin to user, ensure at least one other admin exists!
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

    await kpiDb.users.delete(userId);
    if (supabase) {
      try {
        await supabase.from('users').delete().eq('id', userId);
      } catch (err) {
        // ignore cloud delete error
      }
    }
  }

  async getUserCount(): Promise<number> {
    const status = await this.getStorageStatus();
    if (status.activeProvider === 'supabase' && supabase) {
      try {
        const { count, error } = await supabase.from('users').select('*', { count: 'exact', head: true });
        if (!error && count !== null) return count;
      } catch {
        // fallback
      }
    }
    return await kpiDb.users.count();
  }

  async getAdminCount(): Promise<number> {
    const status = await this.getStorageStatus();
    if (status.activeProvider === 'supabase' && supabase) {
      try {
        const { count, error } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'admin');
        if (!error && count !== null) return count;
      } catch {
        // fallback
      }
    }
    return await kpiDb.users.filter(u => u.role === 'admin').count();
  }
}

export const kpiRepository: IKPIDataRepository = new HybridKPIDataRepository();
