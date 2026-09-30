/**
 * Quality Engineering KPI Platform - Centralized Constants & Configurations
 * Follows clean coding standards: single source of truth, eliminates hardcoded duplicates.
 */

import type { DataSourceConfig, RetrievalFrequency } from '../types/kpiPlatform';

export const APP_PRODUCTS = [
  'Enterprise Cloud Gateway',
  'Microservices Core Engine',
  'Payment & Billing Ledger',
  'Mobile Client Suite (iOS/Android)',
  'Analytics & Reporting Portal'
] as const;

export const APP_COMPONENTS = [
  'Authentication & RBAC',
  'Transaction Processor',
  'API Gateway & Ingress',
  'Web Dashboard UI',
  'Data Pipeline & Ingestion',
  'Notification Broker'
] as const;

export const APP_SPRINTS = [
  'Sprint 2026.1 (Jan)',
  'Sprint 2026.2 (Feb)',
  'Sprint 2026.3 (Mar)',
  'Sprint 2026.4 (Apr)',
  'Sprint 2026.5 (Current)'
] as const;

export const APP_RELEASES = [
  'Release v3.2.0 (GA)',
  'Release v3.3.0 (GA)',
  'Release v3.4.0 (RC-1)',
  'Release v3.5.0-Dev'
] as const;

export const QA_ENGINEERS = [
  'Elena Rostova',
  'Marcus Vance',
  'Siddharth Nair',
  'Priya Patel',
  'Chloe Martin',
  'Tariq Al-Mansoor'
] as const;

export const DEV_ENGINEERS = [
  'Alexander Cruz',
  'David Kim',
  'Sarah Jenkins',
  'Vikram Sen',
  'Lucas Rossi'
] as const;

export interface KPICategoryDefinition {
  id: string;
  name: string;
  badge: string;
  description: string;
  iconName: string;
}

export const KPI_CATEGORIES: KPICategoryDefinition[] = [
  {
    id: 'executive',
    name: 'Executive & Senior Management Scorecard',
    badge: 'C-Level / Director',
    description: 'Release Readiness, Overall Quality Scorecard, Production Stability, and Enterprise Delivery Health.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'quality',
    name: 'Quality & Defect Diagnostics',
    badge: 'Operational Testing',
    description: 'Blocking/Gating defects, Regression rates, Defect discovery vs burnout trends, MTTR/MTTD, and QA Aging.',
    iconName: 'Activity'
  },
  {
    id: 'risk',
    name: 'Risk Assessment & Quality Gates',
    badge: 'Pre-Release Gating',
    description: 'Uncovered code, Missing unit/API tests, High dependency depth, High failure components, and Bottlenecks.',
    iconName: 'AlertTriangle'
  },
  {
    id: 'automation',
    name: 'Automation ROI & Pipeline Health',
    badge: 'SDET & CI/CD',
    description: 'Automated test suite pass rates, Flaky test detection, CI/CD runtimes, and Automation vs Manual defect discovery.',
    iconName: 'Cpu'
  },
  {
    id: 'productivity',
    name: 'Planning, Velocity & Throughput',
    badge: 'Squad Capacity',
    description: 'Test assignments and completion per engineer, Regression cycle times, Over-commitment detection, and Sprint velocity.',
    iconName: 'TrendingUp'
  },
  {
    id: 'governance',
    name: 'SLAs, Accessibility & Benchmarks',
    badge: 'Compliance & Performance',
    description: 'SLA adherence, WCAG 2.2 AA accessibility audit compliance, and P95/P99 latency benchmarks under load.',
    iconName: 'Gauge'
  }
];

export const RETRIEVAL_FREQUENCY_OPTIONS: { value: RetrievalFrequency; label: string; intervalDesc: string }[] = [
  { value: 'manual', label: 'On-Demand (Manual Trigger)', intervalDesc: 'Only syncs when an engineer clicks "Sync Now".' },
  { value: 'hourly', label: 'Hourly Periodic Retrieval', intervalDesc: 'Syncs fresh snapshots every 60 minutes.' },
  { value: 'daily', label: 'Daily Nightly Sync (02:00 EST)', intervalDesc: 'Batch ingests full test results and commits once per 24 hours.' },
  { value: 'weekly', label: 'Weekly Cadence', intervalDesc: 'Syncs every Sunday night before sprint planning.' },
  { value: 'sprint', label: 'Per Sprint Freeze & Audit', intervalDesc: 'Triggers on sprint closure milestones.' }
];

export const DEFAULT_CONNECTOR_CONFIGS: DataSourceConfig[] = [
  {
    id: 'jira',
    name: 'Atlassian JIRA Enterprise',
    enabled: true,
    endpointUrl: 'https://jira.infotechmicro.internal/rest/api/3',
    authType: 'apiKey',
    apiTokenOrKey: 'jira_pat_sec_9942a178bcde45f899b101',
    projectOrOrgKey: 'ITM_GATEWAY, ITM_BILLING, ITM_MOBILE',
    frequency: 'daily',
    lastSyncTimestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    lastSyncStatus: 'success',
    recordCount: 520
  },
  {
    id: 'testrail',
    name: 'TestRail QA Test Suite Manager',
    enabled: true,
    endpointUrl: 'https://infotechmicro.testrail.io/index.php?/api/v2',
    authType: 'apiKey',
    apiTokenOrKey: 'tr_key_841bcfa73001889e47',
    projectOrOrgKey: 'Suite_Platform_Regression_v3',
    frequency: 'hourly',
    lastSyncTimestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    lastSyncStatus: 'success',
    recordCount: 2840
  },
  {
    id: 'github',
    name: 'GitHub Enterprise Source & CI/CD Actions',
    enabled: true,
    endpointUrl: 'https://api.github.com/orgs/InfoTechMicrosystems',
    authType: 'bearerToken',
    apiTokenOrKey: 'ghp_liveTokenForQAMiningPlatform_9831',
    projectOrOrgKey: 'ITMWebSite, ITM-Core-Engine, ITM-Mobile',
    frequency: 'hourly',
    lastSyncTimestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
    lastSyncStatus: 'success',
    recordCount: 412
  }
];

export const QUALITY_THRESHOLDS = {
  releaseReadiness: {
    excellent: 85,
    acceptable: 70,
    blocked: 50
  },
  automationCoverage: {
    target: 75,
    minimum: 50
  },
  defectLeakageRate: {
    maxAcceptable: 5.0, // percent
    critical: 10.0
  },
  flakyRate: {
    maxAcceptable: 4.0 // percent
  },
  slaTriageP1Hours: 4,
  slaTriageP2Hours: 24,
  p95BenchmarkMs: 180,
  p99BenchmarkMs: 450,
  wcagComplianceMin: 92.0 // percent
};
