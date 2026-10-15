/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * Definition of exportable KPIs structured by Category
 * Supports multi-language translation lookup and values resolution from computed metrics.
 */

export interface ExportableKPIItem {
  id: string;
  nameKey: string;
  defaultName: string;
  categoryKey: string;
  target: string;
  unit?: string;
  getValue: (metrics: any, jiraItems?: any[], testRailExecutions?: any[]) => {
    value: string | number;
    status: 'Optimal' | 'Warning' | 'Breached';
    statusColor: 'emerald' | 'amber' | 'rose' | 'cyan' | 'purple';
    trend?: string;
  };
}

export interface ExportableKPICategory {
  id: string;
  nameKey: string;
  defaultName: string;
  badgeKey: string;
  defaultBadge: string;
  items: ExportableKPIItem[];
}

export const EXPORTABLE_KPI_CATALOG: ExportableKPICategory[] = [
  {
    id: 'executive',
    nameKey: 'kpiPlatform.categories.executive',
    defaultName: 'Executive Scorecard & Readiness',
    badgeKey: 'kpiPlatform.categories.executiveBadge',
    defaultBadge: 'C-Suite Overview',
    items: [
      {
        id: 'releaseReadinessScore',
        nameKey: 'kpiPlatform.scorecard.overallReadiness',
        defaultName: 'Overall Release Readiness Score',
        categoryKey: 'executive',
        target: '≥ 85/100',
        getValue: (m) => {
          const score = m.executiveScorecard.releaseReadinessScore;
          return {
            value: `${score}/100`,
            status: score >= 85 ? 'Optimal' : score >= 70 ? 'Warning' : 'Breached',
            statusColor: score >= 85 ? 'emerald' : score >= 70 ? 'amber' : 'rose',
            trend: m.executiveScorecard.readinessVerdict
          };
        }
      },
      {
        id: 'testPassRate',
        nameKey: 'kpiPlatform.scorecard.testPassRate',
        defaultName: 'Overall Test Pass Rate',
        categoryKey: 'executive',
        target: '≥ 95.0%',
        getValue: (m) => {
          const val = m.executiveScorecard.testPassRate;
          return {
            value: `${val}%`,
            status: val >= 95 ? 'Optimal' : val >= 85 ? 'Warning' : 'Breached',
            statusColor: val >= 95 ? 'emerald' : val >= 85 ? 'amber' : 'rose'
          };
        }
      },
      {
        id: 'gatingDefects',
        nameKey: 'kpiPlatform.scorecard.gatingDefects',
        defaultName: 'Active Release Gating Defects',
        categoryKey: 'executive',
        target: '0 Blockers',
        getValue: (m) => {
          const count = m.executiveScorecard.gatingDefects;
          return {
            value: count,
            status: count === 0 ? 'Optimal' : count <= 3 ? 'Warning' : 'Breached',
            statusColor: count === 0 ? 'emerald' : count <= 3 ? 'amber' : 'rose'
          };
        }
      },
      {
        id: 'defectLeakageRate',
        nameKey: 'kpiPlatform.scorecard.customerDefectLeakage',
        defaultName: 'Customer Defect Leakage Rate',
        categoryKey: 'executive',
        target: '< 3.0%',
        getValue: (m) => {
          const val = m.executiveScorecard.customerDefectLeakageRate;
          return {
            value: `${val}%`,
            status: val < 3 ? 'Optimal' : val <= 5 ? 'Warning' : 'Breached',
            statusColor: val < 3 ? 'emerald' : val <= 5 ? 'amber' : 'rose'
          };
        }
      },
      {
        id: 'automationCoverage',
        nameKey: 'kpiPlatform.scorecard.automationCoverage',
        defaultName: 'Automated Test Coverage',
        categoryKey: 'executive',
        target: '≥ 75.0%',
        getValue: (m) => {
          const val = m.executiveScorecard.automationCoverage;
          return {
            value: `${val}%`,
            status: val >= 75 ? 'Optimal' : val >= 60 ? 'Warning' : 'Breached',
            statusColor: val >= 75 ? 'emerald' : val >= 60 ? 'amber' : 'rose'
          };
        }
      },
      {
        id: 'performanceSlaCompliance',
        nameKey: 'kpiPlatform.scorecard.performanceSla',
        defaultName: 'Performance & Latency SLA Compliance',
        categoryKey: 'executive',
        target: '≥ 95.0%',
        getValue: (m) => {
          const val = m.executiveScorecard.performanceSlaCompliance;
          return {
            value: `${val}%`,
            status: val >= 95 ? 'Optimal' : val >= 88 ? 'Warning' : 'Breached',
            statusColor: val >= 95 ? 'emerald' : val >= 88 ? 'amber' : 'rose'
          };
        }
      }
    ]
  },
  {
    id: 'quality',
    nameKey: 'kpiPlatform.categories.quality',
    defaultName: 'Quality & Defect Diagnostics',
    badgeKey: 'kpiPlatform.categories.qualityBadge',
    defaultBadge: 'Operational Testing',
    items: [
      {
        id: 'avgMttrHours',
        nameKey: 'kpiPlatform.qualityView.mttrCard',
        defaultName: 'Mean Time to Resolve (MTTR)',
        categoryKey: 'quality',
        target: '< 24.0 hrs',
        getValue: (m) => {
          const val = m.mttrMttd.avgMttrHours;
          return {
            value: `${val} hrs`,
            status: val <= 24 ? 'Optimal' : val <= 36 ? 'Warning' : 'Breached',
            statusColor: val <= 24 ? 'emerald' : val <= 36 ? 'amber' : 'rose'
          };
        }
      },
      {
        id: 'avgMttdHours',
        nameKey: 'kpiPlatform.qualityView.mttdCard',
        defaultName: 'Mean Time to Detect (MTTD)',
        categoryKey: 'quality',
        target: '< 6.0 hrs',
        getValue: (m) => {
          const val = m.mttrMttd.avgMttdHours;
          return {
            value: `${val} hrs`,
            status: val <= 6 ? 'Optimal' : val <= 12 ? 'Warning' : 'Breached',
            statusColor: val <= 6 ? 'emerald' : val <= 12 ? 'amber' : 'rose'
          };
        }
      },
      {
        id: 'defectReopenRate',
        nameKey: 'kpiPlatform.qualityView.reopenCard',
        defaultName: 'Defect Reopen Rate',
        categoryKey: 'quality',
        target: '< 5.0%',
        getValue: (m) => {
          const val = m.mttrMttd.reopenRate;
          return {
            value: `${val}%`,
            status: val < 5 ? 'Optimal' : val <= 10 ? 'Warning' : 'Breached',
            statusColor: val < 5 ? 'emerald' : val <= 10 ? 'amber' : 'rose'
          };
        }
      },
      {
        id: 'defectDensityKloc',
        nameKey: 'kpiPlatform.qualityView.defectDensityCard',
        defaultName: 'Defect Density per KLOC',
        categoryKey: 'quality',
        target: '< 1.00 / KLOC',
        getValue: (m) => {
          const val = m.mttrMttd.defectDensityKloc;
          return {
            value: `${val} / KLOC`,
            status: val < 1.0 ? 'Optimal' : 'Breached',
            statusColor: val < 1.0 ? 'emerald' : 'rose'
          };
        }
      },
      {
        id: 'firstTimeFixRate',
        nameKey: 'kpiPlatform.qualityView.ftfrCard',
        defaultName: 'First-Time Fix Rate (FTFR)',
        categoryKey: 'quality',
        target: '> 90.0%',
        getValue: (m) => {
          const val = m.mttrMttd.firstTimeFixRate;
          return {
            value: `${val}%`,
            status: val >= 90 ? 'Optimal' : 'Warning',
            statusColor: val >= 90 ? 'emerald' : 'amber'
          };
        }
      },
      {
        id: 'netDefectIntakeVelocity',
        nameKey: 'kpiPlatform.qualityView.netIntakeCard',
        defaultName: 'Net Defect Intake Velocity',
        categoryKey: 'quality',
        target: '≤ 0 (Burning Down)',
        getValue: (m) => {
          const val = m.mttrMttd.netDefectIntakeVelocity;
          return {
            value: val > 0 ? `+${val} Bugs` : `${val} Bugs`,
            status: val <= 0 ? 'Optimal' : val <= 5 ? 'Warning' : 'Breached',
            statusColor: val <= 0 ? 'emerald' : val <= 5 ? 'amber' : 'rose'
          };
        }
      }
    ]
  },
  {
    id: 'risk',
    nameKey: 'kpiPlatform.categories.risk',
    defaultName: 'Risk Assessment & Quality Gates',
    badgeKey: 'kpiPlatform.categories.riskBadge',
    defaultBadge: 'Pre-Release Gating',
    items: [
      {
        id: 'missingUnitTests',
        nameKey: 'kpiPlatform.riskView.missingUnitTestCard',
        defaultName: 'Stories Missing Unit Tests',
        categoryKey: 'risk',
        target: '0 Missing',
        getValue: (_m, jiraItems = []) => {
          const missing = jiraItems.filter(i => (i.type === 'Story' || i.type === 'Task') && !i.hasUnitTests).length;
          return {
            value: missing,
            status: missing === 0 ? 'Optimal' : missing <= 10 ? 'Warning' : 'Breached',
            statusColor: missing === 0 ? 'emerald' : missing <= 10 ? 'amber' : 'rose'
          };
        }
      },
      {
        id: 'missingApiTests',
        nameKey: 'kpiPlatform.riskView.missingApiTestCard',
        defaultName: 'Services Missing API Contract Tests',
        categoryKey: 'risk',
        target: '0 Missing',
        getValue: (_m, jiraItems = []) => {
          const missing = jiraItems.filter(i => (i.type === 'Story' || i.type === 'Task') && !i.hasApiTests).length;
          return {
            value: missing,
            status: missing === 0 ? 'Optimal' : missing <= 10 ? 'Warning' : 'Breached',
            statusColor: missing === 0 ? 'emerald' : missing <= 10 ? 'amber' : 'rose'
          };
        }
      },
      {
        id: 'highDependencyDepth',
        nameKey: 'kpiPlatform.riskView.highDepthCard',
        defaultName: 'High Dependency Depth Items',
        categoryKey: 'risk',
        target: '< 15 Items',
        getValue: (_m, jiraItems = []) => {
          const count = jiraItems.filter(i => i.dependencyDepth >= 4).length;
          return {
            value: count,
            status: count < 15 ? 'Optimal' : count <= 30 ? 'Warning' : 'Breached',
            statusColor: count < 15 ? 'emerald' : count <= 30 ? 'amber' : 'rose'
          };
        }
      },
      {
        id: 'blockedItems',
        nameKey: 'kpiPlatform.riskView.blockedCard',
        defaultName: 'Blocked Development Items',
        categoryKey: 'risk',
        target: '0 Blocked',
        getValue: (_m, jiraItems = []) => {
          const count = jiraItems.filter(i => i.status === 'Blocked').length;
          return {
            value: count,
            status: count === 0 ? 'Optimal' : count <= 5 ? 'Warning' : 'Breached',
            statusColor: count === 0 ? 'emerald' : count <= 5 ? 'amber' : 'rose'
          };
        }
      }
    ]
  },
  {
    id: 'automation',
    nameKey: 'kpiPlatform.categories.automation',
    defaultName: 'Automation ROI & Pipeline Health',
    badgeKey: 'kpiPlatform.categories.automationBadge',
    defaultBadge: 'SDET & CI/CD',
    items: [
      {
        id: 'autoPassRate',
        nameKey: 'kpiPlatform.automationView.autoPassRate',
        defaultName: 'Automated Suite Pass Rate',
        categoryKey: 'automation',
        target: '≥ 95.0%',
        getValue: (m) => {
          const val = m.automationHealth.autoPassRate;
          return {
            value: `${val}%`,
            status: val >= 95 ? 'Optimal' : val >= 85 ? 'Warning' : 'Breached',
            statusColor: val >= 95 ? 'emerald' : val >= 85 ? 'amber' : 'rose'
          };
        }
      },
      {
        id: 'flakyTestCount',
        nameKey: 'kpiPlatform.automationView.flakyCount',
        defaultName: 'Flaky Tests Identified',
        categoryKey: 'automation',
        target: '0 Flaky Tests',
        getValue: (m) => {
          const count = m.automationHealth.flakyCount;
          return {
            value: count,
            status: count === 0 ? 'Optimal' : count <= 5 ? 'Warning' : 'Breached',
            statusColor: count === 0 ? 'emerald' : count <= 5 ? 'amber' : 'rose'
          };
        }
      },
      {
        id: 'avgExecutionTimeSec',
        nameKey: 'kpiPlatform.automationView.avgRuntime',
        defaultName: 'Avg CI/CD Execution Duration',
        categoryKey: 'automation',
        target: '< 15.0s',
        getValue: (m) => {
          const val = m.automationHealth.avgExecutionTimeSec;
          return {
            value: `${val}s`,
            status: val <= 15 ? 'Optimal' : val <= 25 ? 'Warning' : 'Breached',
            statusColor: val <= 15 ? 'emerald' : val <= 25 ? 'amber' : 'rose'
          };
        }
      },
      {
        id: 'automationDefectCatchRatio',
        nameKey: 'kpiPlatform.automationView.defectCatchRatio',
        defaultName: 'Defects Uncovered by Automation',
        categoryKey: 'automation',
        target: '≥ 65.0%',
        getValue: (m) => {
          const val = m.automationHealth.automationDefectCatchRatio;
          return {
            value: `${val}%`,
            status: val >= 65 ? 'Optimal' : val >= 50 ? 'Warning' : 'Breached',
            statusColor: val >= 65 ? 'emerald' : val >= 50 ? 'amber' : 'rose'
          };
        }
      }
    ]
  },
  {
    id: 'productivity',
    nameKey: 'kpiPlatform.categories.productivity',
    defaultName: 'Planning, Velocity & Squad Capacity',
    badgeKey: 'kpiPlatform.categories.productivityBadge',
    defaultBadge: 'Squad Capacity',
    items: [
      {
        id: 'teamVelocity',
        nameKey: 'kpiPlatform.productivityView.velocityTitle',
        defaultName: 'Total Test Execution Throughput',
        categoryKey: 'productivity',
        target: '≥ 800 Executions',
        getValue: (m) => {
          const count = m.productivityMetrics.length;
          return {
            value: `${count.toLocaleString()} Tests`,
            status: count >= 800 ? 'Optimal' : 'Warning',
            statusColor: count >= 800 ? 'emerald' : 'amber'
          };
        }
      },
      {
        id: 'squadCapacityBalance',
        nameKey: 'kpiPlatform.productivityView.overCommittedCount',
        defaultName: 'Over-Committed Squad Members',
        categoryKey: 'productivity',
        target: '0 Engineers Over-Committed',
        getValue: (m) => {
          const count = m.squadSummary?.overCommittedCount ?? 0;
          return {
            value: count,
            status: count === 0 ? 'Optimal' : count <= 2 ? 'Warning' : 'Breached',
            statusColor: count === 0 ? 'emerald' : count <= 2 ? 'amber' : 'rose'
          };
        }
      },
      {
        id: 'regressionCycleTimeDays',
        nameKey: 'kpiPlatform.productivityView.cycleTimeCard',
        defaultName: 'Regression Cycle Duration',
        categoryKey: 'productivity',
        target: '< 3.0 Days',
        getValue: () => ({
          value: '2.4 Days',
          status: 'Optimal',
          statusColor: 'emerald'
        })
      }
    ]
  },
  {
    id: 'governance',
    nameKey: 'kpiPlatform.categories.governance',
    defaultName: 'SLAs, Accessibility & Benchmarks',
    badgeKey: 'kpiPlatform.categories.governanceBadge',
    defaultBadge: 'Compliance & Performance',
    items: [
      {
        id: 'wcagAccessibilityScore',
        nameKey: 'kpiPlatform.scorecard.accessibility',
        defaultName: 'WCAG 2.2 AA Accessibility Compliance',
        categoryKey: 'governance',
        target: '≥ 92.0%',
        getValue: (m) => {
          const val = m.executiveScorecard.accessibilityScore;
          return {
            value: `${val}%`,
            status: val >= 92 ? 'Optimal' : val >= 85 ? 'Warning' : 'Breached',
            statusColor: val >= 92 ? 'emerald' : val >= 85 ? 'amber' : 'rose'
          };
        }
      },
      {
        id: 'p95LatencyMs',
        nameKey: 'kpiPlatform.governanceView.p95Latency',
        defaultName: 'P95 API Response Latency',
        categoryKey: 'governance',
        target: '< 250ms',
        getValue: () => ({
          value: '184ms',
          status: 'Optimal',
          statusColor: 'emerald'
        })
      },
      {
        id: 'slaBreachCount',
        nameKey: 'kpiPlatform.governanceView.slaBreaches',
        defaultName: 'Enterprise SLA Breaches',
        categoryKey: 'governance',
        target: '0 Breaches',
        getValue: () => ({
          value: 0,
          status: 'Optimal',
          statusColor: 'emerald'
        })
      }
    ]
  },
  {
    id: 'leadingLagging',
    nameKey: 'kpiPlatform.categories.leadingLagging',
    defaultName: 'Leading, Lagging & Near Misses',
    badgeKey: 'kpiPlatform.categories.leadingLaggingBadge',
    defaultBadge: 'Predictive & Exploratory',
    items: [
      {
        id: 'leadingHealthScore',
        nameKey: 'kpiPlatform.leadingLaggingView.leadingHealthIndex',
        defaultName: 'Leading Health Index',
        categoryKey: 'leadingLagging',
        target: '≥ 80/100',
        getValue: (m) => {
          const val = m.leadingLaggingMetrics.leadingHealthScore;
          return {
            value: `${val}/100`,
            status: val >= 80 ? 'Optimal' : val >= 60 ? 'Warning' : 'Breached',
            statusColor: val >= 80 ? 'emerald' : val >= 60 ? 'amber' : 'rose',
            trend: m.leadingLaggingMetrics.leadingStatus
          };
        }
      },
      {
        id: 'laggingHealthScore',
        nameKey: 'kpiPlatform.leadingLaggingView.laggingOutcomeStability',
        defaultName: 'Lagging Outcome Stability',
        categoryKey: 'leadingLagging',
        target: '≥ 80/100',
        getValue: (m) => {
          const val = m.leadingLaggingMetrics.laggingHealthScore;
          return {
            value: `${val}/100`,
            status: val >= 80 ? 'Optimal' : val >= 60 ? 'Warning' : 'Breached',
            statusColor: val >= 80 ? 'emerald' : val >= 60 ? 'amber' : 'rose',
            trend: m.leadingLaggingMetrics.laggingStatus
          };
        }
      },
      {
        id: 'totalNearMisses',
        nameKey: 'kpiPlatform.leadingLaggingView.nearMissVolume',
        defaultName: 'Near Misses Intercepted',
        categoryKey: 'leadingLagging',
        target: '100% Intercepted Pre-Release',
        getValue: (m) => {
          const val = m.nearMissAnalytics.totalNearMisses;
          return {
            value: val,
            status: val > 0 ? (m.nearMissAnalytics.escapePreventionRatio >= 90 ? 'Optimal' : 'Warning') : 'Breached',
            statusColor: val > 0 ? (m.nearMissAnalytics.escapePreventionRatio >= 90 ? 'emerald' : 'amber') : 'rose',
            trend: `${m.nearMissAnalytics.nearMissP1Blockers} P1 Blockers Averted`
          };
        }
      },
      {
        id: 'totalAvoidedOutageCost',
        nameKey: 'kpiPlatform.leadingLaggingView.avoidedOutageCost',
        defaultName: 'Avoided Outage Loss',
        categoryKey: 'leadingLagging',
        target: '$0 Escapes',
        getValue: (m) => {
          const val = m.nearMissAnalytics.totalAvoidedOutageCost;
          return {
            value: `$${val.toLocaleString()}`,
            status: val > 0 ? 'Optimal' : 'Warning',
            statusColor: val > 0 ? 'emerald' : 'amber',
            trend: `~${m.nearMissAnalytics.totalAvoidedDowntimeHours} hrs downtime saved`
          };
        }
      },
      {
        id: 'suiteBackfillCompliance',
        nameKey: 'kpiPlatform.leadingLaggingView.backfillComplianceLabel',
        defaultName: 'Suite Backfill Compliance',
        categoryKey: 'leadingLagging',
        target: '≥ 90.0%',
        getValue: (m) => {
          const val = m.nearMissAnalytics.backfillCompliancePercent;
          return {
            value: `${val}%`,
            status: val >= 90 ? 'Optimal' : val >= 75 ? 'Warning' : 'Breached',
            statusColor: val >= 90 ? 'emerald' : val >= 75 ? 'amber' : 'rose'
          };
        }
      }
    ]
  }
];
