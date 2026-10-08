/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * Quality Engineering KPI Platform - Centralized Constants & Configurations
 * Follows clean coding standards: single source of truth, eliminates hardcoded duplicates.
 */

import type { DataSourceConfig, RetrievalFrequency } from '../types/kpiPlatform';

export const APP_PRODUCTS = [
  'YouTube',
  'GMail',
  'LinkedIn',
  'Shopify',
  'Amazon'
] as const;

export type AppProduct = typeof APP_PRODUCTS[number];

export const PRODUCT_COMPONENTS_MAP: Record<AppProduct, readonly string[]> = {
  YouTube: [
    'Video Transcoding & Ingestion',
    'Recommendation Feed Algorithm',
    'Player Runtime & DRM',
    'Creator Studio & Analytics',
    'Live Streaming & Chat Broker',
    'Monetization & Ad Insertion'
  ],
  GMail: [
    'Smart Inbox & Threading',
    'Spam & Phishing AI Shield',
    'MIME Parser & Attachments',
    'IMAP/SMTP Gateway Protocol',
    'Search Index & Offline Sync',
    'Contact Manager & Autocomplete'
  ],
  LinkedIn: [
    'Member Profile & Graph Network',
    'Newsfeed & Content Ranking',
    'Recruiter ATS & Job Match',
    'Enterprise Ads Campaign Manager',
    'Messaging & WebSockets',
    'Learning Platform & Video Streaming'
  ],
  Shopify: [
    'Storefront Liquid Engine',
    'Checkout & Multi-Currency Gateway',
    'Inventory & Order Fulfillment',
    'Merchant Admin Dashboard',
    'App Bridge & GraphQL API',
    'Discounts & Promotion Rules'
  ],
  Amazon: [
    'Product Catalog & Search Ranking',
    '1-Click Checkout & Payments',
    'Prime Delivery & Logistics Routing',
    'Customer Reviews & Sentiment NLP',
    'Fulfillment by Amazon (FBA) Service',
    'Cart & Recommendation Carousel'
  ]
};

export const PRODUCT_RELEASES_MAP: Record<AppProduct, readonly string[]> = {
  YouTube: ['21.4.2', '21.4.0', '21.3.1', '21.2.0', '21.1.0'],
  GMail: ['2026.4.1', '2026.3.0', '2026.2.2', '2026.1.0', '2025.12.0'],
  LinkedIn: ['5.12.0', '5.11.2', '5.11.0', '5.10.1', '5.9.0'],
  Shopify: ['2026.3.2', '2026.3.0', '2026.2.1', '2026.1.0', '2025.4.0'],
  Amazon: ['4.8.2', '4.8.0', '4.7.1', '4.6.0', '4.5.0']
};

export const APP_COMPONENTS = Object.values(PRODUCT_COMPONENTS_MAP).flat();
export const APP_RELEASES = Object.values(PRODUCT_RELEASES_MAP).flat();

export const APP_SPRINTS = [
  'Sprint 2026.1 (Jan)',
  'Sprint 2026.2 (Feb)',
  'Sprint 2026.3 (Mar)',
  'Sprint 2026.4 (Apr)',
  'Sprint 2026.5 (Current)'
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
    projectOrOrgKey: 'YOUTUBE, GMAIL, LINKEDIN, SHOPIFY, AMAZON',
    frequency: 'daily',
    lastSyncTimestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    lastSyncStatus: 'success',
    recordCount: 10500
  },
  {
    id: 'testrail',
    name: 'TestRail QA Test Suite Manager',
    enabled: true,
    endpointUrl: 'https://infotechmicro.testrail.io/index.php?/api/v2',
    authType: 'apiKey',
    apiTokenOrKey: 'tr_key_841bcfa73001889e47',
    projectOrOrgKey: 'Enterprise_MultiProduct_Test_Suites',
    frequency: 'hourly',
    lastSyncTimestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    lastSyncStatus: 'success',
    recordCount: 12500
  },
  {
    id: 'github',
    name: 'GitHub Enterprise Source & CI/CD Actions',
    enabled: true,
    endpointUrl: 'https://api.github.com/orgs/InfoTechMicrosystems',
    authType: 'bearerToken',
    apiTokenOrKey: 'ghp_liveTokenForQAMiningPlatform_9831',
    projectOrOrgKey: 'YouTube-Core, GMail-Web, LinkedIn-Feed, Shopify-Checkout, Amazon-Retail',
    frequency: 'hourly',
    lastSyncTimestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
    lastSyncStatus: 'success',
    recordCount: 1200
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
  wcagComplianceMin: 92.0, // percent
  changeFailureRateMax: 5.0, // DORA Elite tier < 5%
  sprintPredictabilityMin: 85.0, // %
  contractUptimeMin: 99.95, // %
  engineerHourlyBlendedRate: 95 // USD/hour for rework & savings calculations
};

// ==========================================
// CENTRALIZED KPI STATUS & COMPLIANCE DESIGN TOKENS
// Single source of truth for colors, borders, badges, gradients & fonts
// ==========================================

export interface KPIStatusTheme {
  card: string;
  headerBg: string;
  badge: string;
  value: string;
  target: string;
  icon: string;
  calloutBg: string;
  calloutBorder: string;
  footerBorder: string;
  codeBlock: string;
  buttonAccent: string;
}

export const KPI_STATUS_THEMES: Record<'emerald' | 'amber' | 'rose' | 'cyan' | 'purple', KPIStatusTheme> = {
  rose: {
    card: 'bg-gradient-to-br from-rose-50/90 via-white to-red-50/40 dark:from-rose-950/40 dark:via-slate-900 dark:to-slate-950 border-rose-300 dark:border-rose-500/40 shadow-sm',
    headerBg: 'bg-gradient-to-r from-rose-100/70 via-rose-50/50 to-white dark:from-rose-950/60 dark:via-slate-900 dark:to-slate-900 border-b border-rose-200 dark:border-rose-500/30',
    badge: 'text-rose-800 dark:text-rose-300 bg-rose-100/90 dark:bg-rose-950/90 border border-rose-300 dark:border-rose-500/40 shadow-2xs font-mono font-bold',
    value: 'text-rose-600 dark:text-rose-400 font-mono font-black',
    target: 'text-emerald-700 dark:text-emerald-400 font-mono font-bold',
    icon: 'text-rose-600 dark:text-rose-400',
    calloutBg: 'bg-rose-50/70 dark:bg-rose-950/30',
    calloutBorder: 'border-rose-200 dark:border-rose-500/30',
    footerBorder: 'border-rose-100 dark:border-rose-900/30',
    codeBlock: 'bg-rose-950/90 dark:bg-slate-950 border border-rose-800/40 dark:border-rose-500/30 text-rose-200 dark:text-rose-300',
    buttonAccent: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
  },
  amber: {
    card: 'bg-gradient-to-br from-amber-50/90 via-white to-yellow-50/40 dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-950 border-amber-300 dark:border-amber-500/40 shadow-sm',
    headerBg: 'bg-gradient-to-r from-amber-100/70 via-amber-50/50 to-white dark:from-amber-950/60 dark:via-slate-900 dark:to-slate-900 border-b border-amber-200 dark:border-amber-500/30',
    badge: 'text-amber-800 dark:text-amber-300 bg-amber-100/90 dark:bg-amber-950/90 border border-amber-300 dark:border-amber-500/40 shadow-2xs font-mono font-bold',
    value: 'text-amber-600 dark:text-amber-400 font-mono font-black',
    target: 'text-emerald-700 dark:text-emerald-400 font-mono font-bold',
    icon: 'text-amber-600 dark:text-amber-400',
    calloutBg: 'bg-amber-50/70 dark:bg-amber-950/30',
    calloutBorder: 'border-amber-200 dark:border-amber-500/30',
    footerBorder: 'border-amber-100 dark:border-amber-900/30',
    codeBlock: 'bg-amber-950/90 dark:bg-slate-950 border border-amber-800/40 dark:border-amber-500/30 text-amber-200 dark:text-amber-300',
    buttonAccent: 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
  },
  emerald: {
    card: 'bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/40 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-950 border-emerald-300 dark:border-emerald-500/40 shadow-sm',
    headerBg: 'bg-gradient-to-r from-emerald-100/70 via-emerald-50/50 to-white dark:from-emerald-950/60 dark:via-slate-900 dark:to-slate-900 border-b border-emerald-200 dark:border-emerald-500/30',
    badge: 'text-emerald-800 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-500/40 shadow-2xs font-mono font-bold',
    value: 'text-emerald-600 dark:text-emerald-400 font-mono font-black',
    target: 'text-emerald-700 dark:text-emerald-400 font-mono font-bold',
    icon: 'text-emerald-600 dark:text-emerald-400',
    calloutBg: 'bg-emerald-50/70 dark:bg-emerald-950/30',
    calloutBorder: 'border-emerald-200 dark:border-emerald-500/30',
    footerBorder: 'border-emerald-100 dark:border-emerald-900/30',
    codeBlock: 'bg-emerald-950/90 dark:bg-slate-950 border border-emerald-800/40 dark:border-emerald-500/30 text-emerald-200 dark:text-emerald-300',
    buttonAccent: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
  },
  cyan: {
    card: 'bg-gradient-to-br from-cyan-50/90 via-white to-blue-50/40 dark:from-cyan-950/40 dark:via-slate-900 dark:to-slate-950 border-cyan-300 dark:border-cyan-500/40 shadow-sm',
    headerBg: 'bg-gradient-to-r from-cyan-100/70 via-cyan-50/50 to-white dark:from-cyan-950/60 dark:via-slate-900 dark:to-slate-900 border-b border-cyan-200 dark:border-cyan-500/30',
    badge: 'text-cyan-800 dark:text-cyan-300 bg-cyan-100/90 dark:bg-cyan-950/90 border border-cyan-300 dark:border-cyan-500/40 shadow-2xs font-mono font-bold',
    value: 'text-cyan-700 dark:text-cyan-400 font-mono font-black',
    target: 'text-emerald-700 dark:text-emerald-400 font-mono font-bold',
    icon: 'text-cyan-600 dark:text-cyan-400',
    calloutBg: 'bg-cyan-50/70 dark:bg-cyan-950/30',
    calloutBorder: 'border-cyan-200 dark:border-cyan-500/30',
    footerBorder: 'border-cyan-100 dark:border-cyan-900/30',
    codeBlock: 'bg-slate-900 dark:bg-slate-950 border border-slate-800 text-cyan-300',
    buttonAccent: 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs'
  },
  purple: {
    card: 'bg-gradient-to-br from-purple-50/90 via-white to-indigo-50/40 dark:from-purple-950/40 dark:via-slate-900 dark:to-slate-950 border-purple-300 dark:border-purple-500/40 shadow-sm',
    headerBg: 'bg-gradient-to-r from-purple-100/70 via-purple-50/50 to-white dark:from-purple-950/60 dark:via-slate-900 dark:to-slate-900 border-b border-purple-200 dark:border-purple-500/30',
    badge: 'text-purple-800 dark:text-purple-300 bg-purple-100/90 dark:bg-purple-950/90 border border-purple-300 dark:border-purple-500/40 shadow-2xs font-mono font-bold',
    value: 'text-purple-700 dark:text-purple-400 font-mono font-black',
    target: 'text-emerald-700 dark:text-emerald-400 font-mono font-bold',
    icon: 'text-purple-600 dark:text-purple-400',
    calloutBg: 'bg-purple-50/70 dark:bg-purple-950/30',
    calloutBorder: 'border-purple-200 dark:border-purple-500/30',
    footerBorder: 'border-purple-100 dark:border-purple-900/30',
    codeBlock: 'bg-slate-900 dark:bg-slate-950 border border-slate-800 text-purple-300',
    buttonAccent: 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs'
  }
};

