/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * KPI View: Risk Assessment & Release Gating
 * Pre-release risk radar, high dependency depth items, missing unit/API tests,
 * and component failure ranking.
 * Seamlessly supports both single-scope analysis and vertically stacked (Scope 1 on top of Scope 2) comparison.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ShieldAlert, GitPullRequest, 
  Layers, Clock, XCircle, HelpCircle 
} from 'lucide-react';
import type { 
  ComponentRiskMetric, 
  JiraWorkItem, 
  TestRailExecution,
  KPIJustification 
} from '../../../types/kpiPlatform';
import { MetricCard } from '../VisualWidgets';
import { MetricJustificationModal } from '../MetricJustificationModal';
import { KPIJustificationService } from '../../../services/kpiJustificationService';
import type { ViewComparisonProps } from '../contracts/ViewComparisonContract';

interface RiskGatingViewProps extends ViewComparisonProps {
  componentRisks: ComponentRiskMetric[];
  jiraItems: JiraWorkItem[];
  testRailExecutions: TestRailExecution[];
  jiraItemsB?: JiraWorkItem[];
  testRailExecutionsB?: TestRailExecution[];
}

export const RiskGatingView: React.FC<RiskGatingViewProps> = ({
  componentRisks,
  jiraItems,
  testRailExecutions,
  jiraItemsB = [],
  testRailExecutionsB = [],
  isCompareMode = false,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  metricsB
}) => {
  const { t } = useTranslation();
  const [selectedJustification, setSelectedJustification] = useState<KPIJustification | null>(null);

  // Scope 1 Calculations
  const itemsWithNoTests = jiraItems.filter(i => !i.hasTestPlan && (i.type === 'Story' || i.type === 'Epic'));
  const itemsWithNoUnitTests = jiraItems.filter(i => !i.hasUnitTests);
  const itemsWithNoApiTests = jiraItems.filter(i => !i.hasApiTests);
  const highDependencyItems = jiraItems.filter(i => i.dependencyDepth >= 4);
  const blockedItems = jiraItems.filter(i => i.status === 'Blocked');
  const highExecutionTests = testRailExecutions.filter(t => t.durationSeconds > 300);

  // Scope 2 Calculations
  const itemsWithNoUnitTestsB = jiraItemsB.filter(i => !i.hasUnitTests);
  const itemsWithNoApiTestsB = jiraItemsB.filter(i => !i.hasApiTests);
  const highDependencyItemsB = jiraItemsB.filter(i => i.dependencyDepth >= 4);
  const blockedItemsB = jiraItemsB.filter(i => i.status === 'Blocked');
  const highExecutionTestsB = testRailExecutionsB.filter(t => t.durationSeconds > 300);
  const componentRisksB = metricsB?.componentRisks;

  const riskBadgeStyles = {
    Critical: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/30',
    High: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30',
    Medium: 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/30',
    Low: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
  };

  return (
    <div className="space-y-6">
      {/* Top Risk KPI Cards: Vertically Stacked Metric Cards (Scope 1 on Top of Scope 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Items With No Unit Tests */}
        <MetricCard
          title={t('kpiPlatform.riskView.noUnitTests', 'Items With No Unit Tests')}
          value={itemsWithNoUnitTests.length}
          target={t('kpiPlatform.riskView.zeroPermitted', '0 Permitted')}
          trend={`${itemsWithNoTests.length} ${t('kpiPlatform.riskView.missingTestPlan', 'missing test plan')}`}
          trendPositive={itemsWithNoTests.length === 0}
          statusBadge={itemsWithNoUnitTests.length > 0 ? t('kpiPlatform.statusGateViolation', 'Gate Violation') : t('kpiPlatform.statusCompliant', 'Compliant')}
          statusColor={itemsWithNoUnitTests.length > 0 ? 'rose' : 'emerald'}
          icon={<ShieldAlert className="w-5 h-5 text-rose-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getMissingUnitTestsJustification(jiraItems))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={itemsWithNoUnitTestsB.length}
          compareStatusBadge={itemsWithNoUnitTestsB.length > 0 ? 'Gate Violation' : 'Compliant'}
          compareStatusColor={itemsWithNoUnitTestsB.length > 0 ? 'rose' : 'emerald'}
          delta={isCompareMode ? `${(itemsWithNoUnitTests.length - itemsWithNoUnitTestsB.length) > 0 ? '+' : ''}${itemsWithNoUnitTests.length - itemsWithNoUnitTestsB.length} items` : undefined}
          deltaPositive={itemsWithNoUnitTests.length <= itemsWithNoUnitTestsB.length}
        />

        {/* 2. Items With No API Tests */}
        <MetricCard
          title={t('kpiPlatform.riskView.noApiTests', 'Items With No API Tests')}
          value={itemsWithNoApiTests.length}
          target={t('kpiPlatform.riskView.exceptionsTarget', '< 5 Exceptions')}
          trendPositive={itemsWithNoApiTests.length < 5}
          statusBadge={itemsWithNoApiTests.length === 0 ? t('kpiPlatform.statusCompliant', 'Compliant') : itemsWithNoApiTests.length < 5 ? t('kpiPlatform.statusAcceptable', 'Acceptable') : t('kpiPlatform.statusContractRisk', 'Contract Risk')}
          statusColor={itemsWithNoApiTests.length === 0 ? 'emerald' : itemsWithNoApiTests.length < 5 ? 'amber' : 'rose'}
          icon={<GitPullRequest className="w-5 h-5 text-amber-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getMissingApiTestsJustification(itemsWithNoApiTests))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={itemsWithNoApiTestsB.length}
          compareStatusBadge={itemsWithNoApiTestsB.length === 0 ? 'Compliant' : itemsWithNoApiTestsB.length < 5 ? 'Acceptable' : 'Contract Risk'}
          compareStatusColor={itemsWithNoApiTestsB.length === 0 ? 'emerald' : itemsWithNoApiTestsB.length < 5 ? 'amber' : 'rose'}
          delta={isCompareMode ? `${(itemsWithNoApiTests.length - itemsWithNoApiTestsB.length) > 0 ? '+' : ''}${itemsWithNoApiTests.length - itemsWithNoApiTestsB.length} items` : undefined}
          deltaPositive={itemsWithNoApiTests.length <= itemsWithNoApiTestsB.length}
        />

        {/* 3. High Dependency Depth */}
        <MetricCard
          title={t('kpiPlatform.riskView.highDependency', 'High Dependency Depth (Depth ≥ 4)')}
          value={highDependencyItems.length}
          target={t('kpiPlatform.riskView.highRiskTarget', '< 3 High Risk')}
          trendPositive={highDependencyItems.length <= 3}
          statusBadge={highDependencyItems.length === 0 ? t('kpiPlatform.statusLowCoupling', 'Low Coupling') : highDependencyItems.length <= 3 ? t('kpiPlatform.statusManageable', 'Manageable') : t('kpiPlatform.statusBlastRadiusAlert', 'Blast Radius Alert')}
          statusColor={highDependencyItems.length === 0 ? 'emerald' : highDependencyItems.length <= 3 ? 'amber' : 'rose'}
          icon={<Layers className="w-5 h-5 text-purple-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getHighDependencyDepthJustification(highDependencyItems))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={highDependencyItemsB.length}
          compareStatusBadge={highDependencyItemsB.length === 0 ? 'Low Coupling' : highDependencyItemsB.length <= 3 ? 'Manageable' : 'Blast Alert'}
          compareStatusColor={highDependencyItemsB.length === 0 ? 'emerald' : highDependencyItemsB.length <= 3 ? 'amber' : 'rose'}
          delta={isCompareMode ? `${(highDependencyItems.length - highDependencyItemsB.length) > 0 ? '+' : ''}${highDependencyItems.length - highDependencyItemsB.length} items` : undefined}
          deltaPositive={highDependencyItems.length <= highDependencyItemsB.length}
        />

        {/* 4. High Execution Time Tests */}
        <MetricCard
          title={t('kpiPlatform.riskView.highExecutionTestsCard', 'High Execution Time Tests (>300s)')}
          value={highExecutionTests.length}
          target={t('kpiPlatform.riskView.targetHighExecution', '0 Bottlenecks')}
          trendPositive={highExecutionTests.length === 0}
          statusBadge={highExecutionTests.length === 0 ? t('kpiPlatform.statusFastPipeline', 'Fast Pipeline') : highExecutionTests.length <= 5 ? t('kpiPlatform.statusModerateLatency', 'Moderate Latency') : t('kpiPlatform.statusPipelineBottleneck', 'Pipeline Bottleneck')}
          statusColor={highExecutionTests.length === 0 ? 'emerald' : highExecutionTests.length <= 5 ? 'amber' : 'rose'}
          icon={<Clock className="w-5 h-5 text-cyan-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getHighExecutionTestsJustification(highExecutionTests))}
          isComparing={isCompareMode}
          scopeALabel={scopeALabel}
          scopeBLabel={scopeBLabel}
          compareValue={highExecutionTestsB.length}
          compareStatusBadge={highExecutionTestsB.length === 0 ? 'Fast' : highExecutionTestsB.length <= 5 ? 'Moderate' : 'Bottleneck'}
          compareStatusColor={highExecutionTestsB.length === 0 ? 'emerald' : highExecutionTestsB.length <= 5 ? 'amber' : 'rose'}
          delta={isCompareMode ? `${(highExecutionTests.length - highExecutionTestsB.length) > 0 ? '+' : ''}${highExecutionTests.length - highExecutionTestsB.length} tests` : undefined}
          deltaPositive={highExecutionTests.length <= highExecutionTestsB.length}
        />
      </div>

      {/* Component Risk Assessment Matrix: Scope 1 */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div>
              <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
                {t('kpiPlatform.riskView.matrixTitle')} {isCompareMode ? `— ${scopeALabel}` : ''}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.riskView.matrixSubtitle', 'Evaluated across test execution failure rates, open gating defects, and unit test omissions.')}
              </p>
            </div>
            <button
              onClick={() => setSelectedJustification(KPIJustificationService.getComponentRiskMatrixJustification(componentRisks))}
              title="Explain Component Risk & Dependency Gating Matrix"
              className="p-1 rounded-md text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
            {t('kpiPlatform.riskView.rankedByVulnerability', 'Ranked by Vulnerability')}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3 rounded-l-lg">{t('kpiPlatform.riskView.tableModule')}</th>
                <th className="p-3">{t('kpiPlatform.riskView.tableFailureRate')}</th>
                <th className="p-3">{t('kpiPlatform.riskView.tableGatingDefects')}</th>
                <th className="p-3">{t('kpiPlatform.riskView.tableTotalDefects')}</th>
                <th className="p-3">{t('kpiPlatform.riskView.tableTestCoverage')}</th>
                <th className="p-3">{t('kpiPlatform.riskView.tableMissingUnit')}</th>
                <th className="p-3">{t('kpiPlatform.riskView.tableComplexity', 'Complexity (CC)')}</th>
                <th className="p-3">{t('kpiPlatform.riskView.tableCodeChurn', 'Code Churn')}</th>
                <th className="p-3">{t('kpiPlatform.riskView.tableLicenseSecurity', 'License & Security')}</th>
                <th className="p-3 rounded-r-lg">{t('kpiPlatform.riskView.tableRiskTier')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {componentRisks.map((comp) => (
                <tr key={comp.component} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3 text-slate-900 dark:text-white font-semibold">
                    {comp.component}
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                    <span className={comp.failureRate > 12 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}>
                      {comp.failureRate}%
                    </span>
                  </td>
                  <td className="p-3 font-mono">
                    {comp.gatingCount > 0 ? (
                      <span className="font-bold text-rose-600 dark:text-rose-400">{comp.gatingCount} {t('kpiPlatform.riskView.gatingTag', 'Gating')}</span>
                    ) : (
                      <span className="text-slate-400">0</span>
                    )}
                  </td>
                  <td className="p-3 font-mono text-slate-700 dark:text-slate-300">
                    {comp.defectCount}
                  </td>
                  <td className="p-3 font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-cyan-500 h-full rounded-full" 
                          style={{ width: `${comp.testCoveragePercent}%` }} 
                        />
                      </div>
                      <span className="text-[11px] text-slate-700 dark:text-slate-300">{comp.testCoveragePercent}%</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-amber-600 dark:text-amber-400">
                    {comp.missingUnitTestsCount}
                  </td>
                  <td className="p-3 font-mono text-xs">
                    <span className={comp.cyclomaticComplexityRisk > 15 ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-600 dark:text-slate-400'}>
                      {comp.cyclomaticComplexityRisk}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-xs text-slate-500 dark:text-slate-400">
                    +{comp.codeChurnLines}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      comp.licenseComplianceStatus === 'Blocked' ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300' :
                      comp.licenseComplianceStatus === 'Warning' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' :
                      'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    }`}>
                      {comp.licenseComplianceStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${riskBadgeStyles[comp.riskLevel]}`}>
                      {comp.riskLevel} {t('kpiPlatform.riskView.riskSuffix', 'Risk')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Component Risk Assessment Matrix: Scope 2 Stacked Below */}
      {isCompareMode && componentRisksB && componentRisksB.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/50 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-purple-100 dark:border-purple-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <div>
                <h4 className="text-base font-bold font-['Outfit'] text-purple-900 dark:text-purple-200">
                  {t('kpiPlatform.riskView.matrixTitle')} — {scopeBLabel}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t('kpiPlatform.riskView.matrixSubtitle', 'Evaluated across test execution failure rates, open gating defects, and unit test omissions.')}
                </p>
              </div>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800">
              Vulnerability Ranking
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-purple-50/50 dark:bg-purple-950/40 font-mono text-purple-700 dark:text-purple-300 uppercase text-[10px]">
                <tr>
                  <th className="p-3 rounded-l-lg">{t('kpiPlatform.riskView.tableModule')}</th>
                  <th className="p-3">{t('kpiPlatform.riskView.tableFailureRate')}</th>
                  <th className="p-3">{t('kpiPlatform.riskView.tableGatingDefects')}</th>
                  <th className="p-3">{t('kpiPlatform.riskView.tableTotalDefects')}</th>
                  <th className="p-3">{t('kpiPlatform.riskView.tableTestCoverage')}</th>
                  <th className="p-3">{t('kpiPlatform.riskView.tableMissingUnit')}</th>
                  <th className="p-3">{t('kpiPlatform.riskView.tableComplexity', 'Complexity (CC)')}</th>
                  <th className="p-3">{t('kpiPlatform.riskView.tableCodeChurn', 'Code Churn')}</th>
                  <th className="p-3">{t('kpiPlatform.riskView.tableLicenseSecurity', 'License & Security')}</th>
                  <th className="p-3 rounded-r-lg">{t('kpiPlatform.riskView.tableRiskTier')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {componentRisksB.map((comp) => (
                  <tr key={comp.component} className="hover:bg-purple-50/30 dark:hover:bg-purple-950/20">
                    <td className="p-3 text-slate-900 dark:text-white font-semibold">
                      {comp.component}
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                      <span className={comp.failureRate > 12 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}>
                        {comp.failureRate}%
                      </span>
                    </td>
                    <td className="p-3 font-mono">
                      {comp.gatingCount > 0 ? (
                        <span className="font-bold text-rose-600 dark:text-rose-400">{comp.gatingCount} Gating</span>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </td>
                    <td className="p-3 font-mono text-slate-700 dark:text-slate-300">
                      {comp.defectCount}
                    </td>
                    <td className="p-3 font-mono">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-purple-500 h-full rounded-full" 
                            style={{ width: `${comp.testCoveragePercent}%` }} 
                          />
                        </div>
                        <span className="text-[11px] text-slate-700 dark:text-slate-300">{comp.testCoveragePercent}%</span>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-amber-600 dark:text-amber-400">
                      {comp.missingUnitTestsCount}
                    </td>
                    <td className="p-3 font-mono text-xs">
                      <span className={comp.cyclomaticComplexityRisk > 15 ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-600 dark:text-slate-400'}>
                        {comp.cyclomaticComplexityRisk}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-xs text-slate-500 dark:text-slate-400">
                      +{comp.codeChurnLines}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        comp.licenseComplianceStatus === 'Blocked' ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300' :
                        comp.licenseComplianceStatus === 'Warning' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' :
                        'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      }`}>
                        {comp.licenseComplianceStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${riskBadgeStyles[comp.riskLevel]}`}>
                        {comp.riskLevel} Risk
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* High Dependency Depth & Blocked Items Warning Section: Scope 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Blocked Items */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
              <XCircle className="w-4 h-4 text-rose-500" />
              <span>{t('kpiPlatform.riskView.blockedDevItems')} ({blockedItems.length}) {isCompareMode ? `— ${scopeALabel}` : ''}</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400">{t('kpiPlatform.riskView.stalledInSprint')}</span>
              <button
                type="button"
                onClick={() => setSelectedJustification(KPIJustificationService.getBlockedDevItemsJustification(blockedItems))}
                className="p-1 rounded-full text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Click for Blocked Development Items clarification and policy audit"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {blockedItems.slice(0, 4).map(item => (
              <div key={item.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex justify-between font-mono font-bold text-slate-900 dark:text-white">
                  <span className="text-cyan-600 dark:text-cyan-400">{item.id}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border shadow-2xs ${
                    item.severity === 'P1-Blocker'
                      ? 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800/40'
                      : item.severity === 'P2-Critical'
                      ? 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800/40'
                      : item.severity === 'P3-Major'
                      ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800/40'
                      : 'text-slate-700 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                  }`}>
                    {item.severity}
                  </span>
                </div>
                <div className="text-slate-600 dark:text-slate-300 truncate mt-0.5">{item.title}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">Component: {item.component} | Assignee: {item.assignee}</div>
              </div>
            ))}
          </div>
        </div>

        {/* High Dependency Depth */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500" />
              <span>{t('kpiPlatform.riskView.highDepthItems')} ({highDependencyItems.length}) {isCompareMode ? `— ${scopeALabel}` : ''}</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400">{t('kpiPlatform.riskView.couplingRisk')}</span>
              <button
                type="button"
                onClick={() => setSelectedJustification(KPIJustificationService.getHighDependencyDepthJustification(highDependencyItems))}
                className="p-1 rounded-full text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Click for High Dependency Depth clarification and coupling audit"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {highDependencyItems.slice(0, 4).map(item => (
              <div key={item.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex justify-between font-mono font-bold text-slate-900 dark:text-white">
                  <span className="text-cyan-600 dark:text-cyan-400">{item.id}</span>
                  <span className="text-purple-600 dark:text-purple-400">{t('kpiPlatform.riskView.depthLevel')}: {item.dependencyDepth}</span>
                </div>
                <div className="text-slate-600 dark:text-slate-300 truncate mt-0.5">{item.title}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">{t('kpiPlatform.riskView.crossTeamTesting')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scope 2 Blocked & High Depth Warning Section Stacked Below */}
      {isCompareMode && (blockedItemsB.length > 0 || highDependencyItemsB.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Scope 2 Blocked Items */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/50 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold font-['Outfit'] text-purple-900 dark:text-purple-200 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>{t('kpiPlatform.riskView.blockedDevItems')} ({blockedItemsB.length}) — {scopeBLabel}</span>
              </span>
              <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400">Stalled</span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {blockedItemsB.slice(0, 4).map(item => (
                <div key={item.id} className="p-2.5 rounded-xl bg-purple-50/30 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/50 text-xs">
                  <div className="flex justify-between font-mono font-bold text-slate-900 dark:text-white">
                    <span className="text-purple-600 dark:text-purple-400">{item.id}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold border border-rose-300 text-rose-600">
                      {item.severity}
                    </span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 truncate mt-0.5">{item.title}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-1">Component: {item.component} | Assignee: {item.assignee}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scope 2 High Dependency Depth */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/50 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold font-['Outfit'] text-purple-900 dark:text-purple-200 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-500" />
                <span>{t('kpiPlatform.riskView.highDepthItems')} ({highDependencyItemsB.length}) — {scopeBLabel}</span>
              </span>
              <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400">Coupling</span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {highDependencyItemsB.slice(0, 4).map(item => (
                <div key={item.id} className="p-2.5 rounded-xl bg-purple-50/30 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/50 text-xs">
                  <div className="flex justify-between font-mono font-bold text-slate-900 dark:text-white">
                    <span className="text-purple-600 dark:text-purple-400">{item.id}</span>
                    <span className="text-purple-600 dark:text-purple-400">Depth: {item.dependencyDepth}</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 truncate mt-0.5">{item.title}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-1">Cross-Module Blast Radius</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* KPI Decision & Audit Justification Modal */}
      <MetricJustificationModal
        isOpen={Boolean(selectedJustification)}
        justification={selectedJustification}
        onClose={() => setSelectedJustification(null)}
      />
    </div>
  );
};
