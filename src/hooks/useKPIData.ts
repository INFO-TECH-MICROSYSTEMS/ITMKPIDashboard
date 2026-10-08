/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * Custom Hook: useKPIData
 * Decouples presentation components from the data repository and business engine.
 * Reactive state management, filtering, and sync triggering.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { kpiRepository } from '../services/kpiRepository';
import { KPICalculatorService } from '../services/kpiCalculatorService';
import type { 
  JiraWorkItem, 
  TestRailExecution, 
  GitHubPullRequest, 
  GitHubCommit,
  DataSourceConfig,
  SyncAuditLog,
  KPIFilterState,
  DataSourceType
} from '../types/kpiPlatform';

export const INITIAL_FILTER_STATE: KPIFilterState = {
  product: 'All',
  component: 'All',
  sprint: 'All',
  releaseVersion: 'All',
  dateRangeDays: 30
};

export function useKPIData() {
  const [filters, setFilters] = useState<KPIFilterState>(INITIAL_FILTER_STATE);
  const [jiraItems, setJiraItems] = useState<JiraWorkItem[]>([]);
  const [testRailExecutions, setTestRailExecutions] = useState<TestRailExecution[]>([]);
  const [githubPRs, setGithubPRs] = useState<GitHubPullRequest[]>([]);
  const [githubCommits, setGithubCommits] = useState<GitHubCommit[]>([]);
  const [connectorConfigs, setConnectorConfigs] = useState<DataSourceConfig[]>([]);
  const [syncLogs, setSyncLogs] = useState<SyncAuditLog[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date>(() => new Date());

  // Initialize DB and load data
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      await kpiRepository.init();

      const [jira, tr, prs, commits, configs, logs] = await Promise.all([
        kpiRepository.getJiraItems(filters),
        kpiRepository.getTestRailExecutions(filters),
        kpiRepository.getGitHubPullRequests(),
        kpiRepository.getGitHubCommits(),
        kpiRepository.getConnectorConfigs(),
        kpiRepository.getSyncLogs()
      ]);

      setJiraItems(jira);
      setTestRailExecutions(tr);
      setGithubPRs(prs);
      setGithubCommits(commits);
      setConnectorConfigs(configs);
      setSyncLogs(logs);
      setLastRefreshedAt(new Date());
    } catch (err) {
      console.error('Failed to load KPI platform data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Trigger sync (Atomic Wipe & Replace)
  const triggerSyncNow = useCallback(async (_source?: DataSourceType) => {
    setIsSyncing(true);
    try {
      // Simulate real mining API fetch and replace
      await new Promise(resolve => setTimeout(resolve, 800));
      await kpiRepository.resetToSampleDataset();
      await loadData();
    } catch (err) {
      console.error('Error during data retrieval sync:', err);
    } finally {
      setIsSyncing(false);
    }
  }, [loadData]);

  // Reset to initial rich sample dataset
  const resetToSampleData = useCallback(async () => {
    setIsSyncing(true);
    try {
      await kpiRepository.resetToSampleDataset();
      await loadData();
    } catch (err) {
      console.error('Error resetting sample dataset:', err);
    } finally {
      setIsSyncing(false);
    }
  }, [loadData]);

  // Save Connector Configuration
  const saveConnectorConfig = useCallback(async (config: DataSourceConfig) => {
    await kpiRepository.saveConnectorConfig(config);
    const updated = await kpiRepository.getConnectorConfigs();
    setConnectorConfigs(updated);
  }, []);

  // Update specific filter property
  const updateFilter = useCallback(<K extends keyof KPIFilterState>(key: K, value: KPIFilterState[K]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTER_STATE);
  }, []);

  // Compute calculated metrics via Business Logic service
  const executiveScorecard = useMemo(() => 
    KPICalculatorService.calculateExecutiveScorecard(jiraItems, testRailExecutions, githubPRs),
    [jiraItems, testRailExecutions, githubPRs]
  );

  const agingBuckets = useMemo(() => 
    KPICalculatorService.calculateAgingBuckets(jiraItems),
    [jiraItems]
  );

  const severityCounts = useMemo(() => 
    KPICalculatorService.calculateSeverityCounts(jiraItems),
    [jiraItems]
  );

  const testDistributionAll = useMemo(() => 
    KPICalculatorService.calculateTestDistribution(testRailExecutions),
    [testRailExecutions]
  );

  const testDistributionAutomated = useMemo(() => 
    KPICalculatorService.calculateTestDistribution(testRailExecutions, 'Automated'),
    [testRailExecutions]
  );

  const testDistributionManual = useMemo(() => 
    KPICalculatorService.calculateTestDistribution(testRailExecutions, 'Manual'),
    [testRailExecutions]
  );

  const defectTrends = useMemo(() => 
    KPICalculatorService.calculateDefectDiscoveryTrends(jiraItems, filters.dateRangeDays),
    [jiraItems, filters.dateRangeDays]
  );

  const testBurnoutForecast = useMemo(() => 
    KPICalculatorService.calculateTestExecutionBurnoutForecast(testRailExecutions, filters.dateRangeDays),
    [testRailExecutions, filters.dateRangeDays]
  );

  const componentRisks = useMemo(() => 
    KPICalculatorService.calculateComponentRisks(jiraItems, testRailExecutions),
    [jiraItems, testRailExecutions]
  );

  const { productivityMetrics, squadSummary } = useMemo(() => {
    const res = KPICalculatorService.calculateProductivityMetrics(testRailExecutions, jiraItems);
    return { productivityMetrics: res.metrics, squadSummary: res.summary };
  }, [testRailExecutions, jiraItems]);

  const automationHealth = useMemo(() => 
    KPICalculatorService.calculateAutomationHealth(testRailExecutions, githubPRs),
    [testRailExecutions, githubPRs]
  );

  const testAutomationForecast = useMemo(() => 
    KPICalculatorService.calculateTestAutomationBurnoutForecast(testRailExecutions, filters.dateRangeDays),
    [testRailExecutions, filters.dateRangeDays]
  );

  const mttrMttd = useMemo(() => 
    KPICalculatorService.calculateMttrAndMttd(jiraItems),
    [jiraItems]
  );

  return {
    filters,
    updateFilter,
    resetFilters,
    jiraItems,
    testRailExecutions,
    githubPRs,
    githubCommits,
    connectorConfigs,
    syncLogs,
    isLoading,
    isSyncing,
    lastRefreshedAt,
    triggerSyncNow,
    resetToSampleData,
    saveConnectorConfig,
    reload: loadData,
    metrics: {
      executiveScorecard,
      agingBuckets,
      severityCounts,
      testDistributionAll,
      testDistributionAutomated,
      testDistributionManual,
      defectTrends,
      testBurnoutForecast,
      testAutomationForecast,
      componentRisks,
      productivityMetrics,
      squadSummary,
      automationHealth,
      mttrMttd
    }
  };
}
