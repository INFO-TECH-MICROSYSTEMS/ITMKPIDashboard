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
 * Reactive state management, multi-scope filtering, and sync triggering.
 * Supports both Standard Single-Scope and Dual-Scope Comparison Modes.
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

import { APP_PRODUCTS, PRODUCT_RELEASES_MAP, type AppProduct } from '../constants/kpiConstants';

export const INITIAL_FILTER_STATE: KPIFilterState = {
  product: APP_PRODUCTS[0], // 'YouTube'
  component: 'All',
  sprint: 'All',
  releaseVersion: PRODUCT_RELEASES_MAP[APP_PRODUCTS[0]][0] // '21.4.2'
};

export const INITIAL_COMPARE_FILTER_STATE: KPIFilterState = {
  product: APP_PRODUCTS[0],
  component: 'All',
  sprint: 'All',
  releaseVersion: PRODUCT_RELEASES_MAP[APP_PRODUCTS[0]][1] || PRODUCT_RELEASES_MAP[APP_PRODUCTS[0]][0]
};

export function useKPIData() {
  // Scope A (Primary Scope)
  const [filters, setFilters] = useState<KPIFilterState>(INITIAL_FILTER_STATE);

  // Scope B (Comparative Scope) & Toggle
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [filtersB, setFiltersB] = useState<KPIFilterState>(INITIAL_COMPARE_FILTER_STATE);

  // Raw telemetry datasets for Scope A
  const [jiraItems, setJiraItems] = useState<JiraWorkItem[]>([]);
  const [testRailExecutions, setTestRailExecutions] = useState<TestRailExecution[]>([]);
  const [githubPRs, setGithubPRs] = useState<GitHubPullRequest[]>([]);
  const [githubCommits, setGithubCommits] = useState<GitHubCommit[]>([]);

  // Raw telemetry datasets for Scope B (when in compare mode)
  const [jiraItemsB, setJiraItemsB] = useState<JiraWorkItem[]>([]);
  const [testRailExecutionsB, setTestRailExecutionsB] = useState<TestRailExecution[]>([]);
  const [githubPRsB, setGithubPRsB] = useState<GitHubPullRequest[]>([]);
  const [githubCommitsB, setGithubCommitsB] = useState<GitHubCommit[]>([]);

  const [connectorConfigs, setConnectorConfigs] = useState<DataSourceConfig[]>([]);
  const [syncLogs, setSyncLogs] = useState<SyncAuditLog[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date>(() => new Date());

  // Initialize DB and load data for Scope A and conditionally Scope B
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      await kpiRepository.init();

      const promises: [
        Promise<JiraWorkItem[]>,
        Promise<TestRailExecution[]>,
        Promise<GitHubPullRequest[]>,
        Promise<GitHubCommit[]>,
        Promise<DataSourceConfig[]>,
        Promise<SyncAuditLog[]>,
        Promise<JiraWorkItem[]>?,
        Promise<TestRailExecution[]>?,
        Promise<GitHubPullRequest[]>?,
        Promise<GitHubCommit[]>?
      ] = [
        kpiRepository.getJiraItems(filters),
        kpiRepository.getTestRailExecutions(filters),
        kpiRepository.getGitHubPullRequests(filters),
        kpiRepository.getGitHubCommits(filters),
        kpiRepository.getConnectorConfigs(),
        kpiRepository.getSyncLogs()
      ];

      if (isCompareMode) {
        promises.push(
          kpiRepository.getJiraItems(filtersB),
          kpiRepository.getTestRailExecutions(filtersB),
          kpiRepository.getGitHubPullRequests(filtersB),
          kpiRepository.getGitHubCommits(filtersB)
        );
      }

      const results = await Promise.all(promises);

      setJiraItems(results[0]);
      setTestRailExecutions(results[1]);
      setGithubPRs(results[2]);
      setGithubCommits(results[3]);
      setConnectorConfigs(results[4]);
      setSyncLogs(results[5]);

      if (isCompareMode && results.length >= 10) {
        setJiraItemsB(results[6] as JiraWorkItem[]);
        setTestRailExecutionsB(results[7] as TestRailExecution[]);
        setGithubPRsB(results[8] as GitHubPullRequest[]);
        setGithubCommitsB(results[9] as GitHubCommit[]);
      } else {
        setJiraItemsB([]);
        setTestRailExecutionsB([]);
        setGithubPRsB([]);
        setGithubCommitsB([]);
      }

      setLastRefreshedAt(new Date());
    } catch (err) {
      console.error('Failed to load KPI platform data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [filters, isCompareMode, filtersB]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Trigger sync (Atomic Wipe & Replace)
  const triggerSyncNow = useCallback(async (_source?: DataSourceType) => {
    setIsSyncing(true);
    try {
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

  // Update Scope A filter property
  const updateFilter = useCallback(<K extends keyof KPIFilterState>(key: K, value: KPIFilterState[K]) => {
    setFilters(prev => {
      if (key === 'product') {
        const prod = value as AppProduct;
        const latestRelease = PRODUCT_RELEASES_MAP[prod]?.[0] || '1.0.0';
        return {
          ...prev,
          product: prod,
          component: 'All',
          releaseVersion: latestRelease
        };
      }
      return {
        ...prev,
        [key]: value
      };
    });
  }, []);

  // Update Scope B filter property
  const updateFilterB = useCallback(<K extends keyof KPIFilterState>(key: K, value: KPIFilterState[K]) => {
    setFiltersB(prev => {
      if (key === 'product') {
        const prod = value as AppProduct;
        const latestRelease = PRODUCT_RELEASES_MAP[prod]?.[0] || '1.0.0';
        return {
          ...prev,
          product: prod,
          component: 'All',
          releaseVersion: latestRelease
        };
      }
      return {
        ...prev,
        [key]: value
      };
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTER_STATE);
  }, []);

  const resetFiltersB = useCallback(() => {
    setFiltersB(INITIAL_COMPARE_FILTER_STATE);
  }, []);

  const swapScopes = useCallback(() => {
    setFilters(filtersB);
    setFiltersB(filters);
  }, [filters, filtersB]);

  // Scope A Calculations
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

  const releaseWindow = useMemo(() => 
    KPICalculatorService.getReleaseWindow(
      filters.product,
      filters.releaseVersion,
      testRailExecutions,
      jiraItems
    ),
    [filters.product, filters.releaseVersion, testRailExecutions, jiraItems]
  );

  const releaseWindowB = useMemo(() => {
    if (!isCompareMode) return undefined;
    return KPICalculatorService.getReleaseWindow(
      filtersB.product,
      filtersB.releaseVersion,
      testRailExecutionsB,
      jiraItemsB
    );
  }, [isCompareMode, filtersB.product, filtersB.releaseVersion, testRailExecutionsB, jiraItemsB]);

  const defectTrends = useMemo(() => 
    KPICalculatorService.calculateDefectDiscoveryTrends(jiraItems, releaseWindow),
    [jiraItems, releaseWindow]
  );

  const testBurnoutForecast = useMemo(() => 
    KPICalculatorService.calculateTestExecutionBurnoutForecast(testRailExecutions, releaseWindow),
    [testRailExecutions, releaseWindow]
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
    KPICalculatorService.calculateTestAutomationBurnoutForecast(testRailExecutions, releaseWindow),
    [testRailExecutions, releaseWindow]
  );

  const mttrMttd = useMemo(() => 
    KPICalculatorService.calculateMttrAndMttd(jiraItems),
    [jiraItems]
  );

  const leadingLaggingMetrics = useMemo(() =>
    KPICalculatorService.calculateLeadingLaggingMetrics(jiraItems, testRailExecutions, githubPRs),
    [jiraItems, testRailExecutions, githubPRs]
  );

  const nearMissAnalytics = useMemo(() =>
    KPICalculatorService.calculateNearMissAnalytics(jiraItems, testRailExecutions),
    [jiraItems, testRailExecutions]
  );

  // Scope B Calculations (when compare mode is active)
  const metricsB = useMemo(() => {
    if (!isCompareMode) return undefined;

    const execB = KPICalculatorService.calculateExecutiveScorecard(jiraItemsB, testRailExecutionsB, githubPRsB);
    const agingB = KPICalculatorService.calculateAgingBuckets(jiraItemsB);
    const sevB = KPICalculatorService.calculateSeverityCounts(jiraItemsB);
    const distAllB = KPICalculatorService.calculateTestDistribution(testRailExecutionsB);
    const distAutoB = KPICalculatorService.calculateTestDistribution(testRailExecutionsB, 'Automated');
    const distManualB = KPICalculatorService.calculateTestDistribution(testRailExecutionsB, 'Manual');
    const trendsB = KPICalculatorService.calculateDefectDiscoveryTrends(jiraItemsB, releaseWindowB);
    const burnoutB = KPICalculatorService.calculateTestExecutionBurnoutForecast(testRailExecutionsB, releaseWindowB);
    const compB = KPICalculatorService.calculateComponentRisks(jiraItemsB, testRailExecutionsB);
    const prodB = KPICalculatorService.calculateProductivityMetrics(testRailExecutionsB, jiraItemsB);
    const autoB = KPICalculatorService.calculateAutomationHealth(testRailExecutionsB, githubPRsB);
    const autoForecastB = KPICalculatorService.calculateTestAutomationBurnoutForecast(testRailExecutionsB, releaseWindowB);
    const mttrB = KPICalculatorService.calculateMttrAndMttd(jiraItemsB);
    const leadLagB = KPICalculatorService.calculateLeadingLaggingMetrics(jiraItemsB, testRailExecutionsB, githubPRsB);
    const nearB = KPICalculatorService.calculateNearMissAnalytics(jiraItemsB, testRailExecutionsB);

    return {
      executiveScorecard: execB,
      agingBuckets: agingB,
      severityCounts: sevB,
      testDistributionAll: distAllB,
      testDistributionAutomated: distAutoB,
      testDistributionManual: distManualB,
      defectTrends: trendsB,
      testBurnoutForecast: burnoutB,
      testAutomationForecast: autoForecastB,
      componentRisks: compB,
      productivityMetrics: prodB.metrics,
      squadSummary: prodB.summary,
      automationHealth: autoB,
      mttrMttd: mttrB,
      leadingLaggingMetrics: leadLagB,
      nearMissAnalytics: nearB
    };
  }, [isCompareMode, jiraItemsB, testRailExecutionsB, githubPRsB, releaseWindowB]);

  return {
    filters,
    filtersB,
    isCompareMode,
    setIsCompareMode,
    releaseWindow,
    releaseWindowB,
    updateFilter,
    updateFilterB,
    resetFilters,
    resetFiltersB,
    swapScopes,
    jiraItems,
    jiraItemsB,
    testRailExecutions,
    testRailExecutionsB,
    githubPRs,
    githubPRsB,
    githubCommits,
    githubCommitsB,
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
      mttrMttd,
      leadingLaggingMetrics,
      nearMissAnalytics
    },
    metricsB
  };
}
