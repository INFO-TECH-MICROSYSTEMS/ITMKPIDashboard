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

interface RiskGatingViewProps {
  componentRisks: ComponentRiskMetric[];
  jiraItems: JiraWorkItem[];
  testRailExecutions: TestRailExecution[];
}

export const RiskGatingView: React.FC<RiskGatingViewProps> = ({
  componentRisks,
  jiraItems,
  testRailExecutions
}) => {
  const { t } = useTranslation();
  const [selectedJustification, setSelectedJustification] = useState<KPIJustification | null>(null);

  // PPT Requirement Calculations:
  const itemsWithNoTests = jiraItems.filter(i => !i.hasTestPlan && (i.type === 'Story' || i.type === 'Epic'));
  const itemsWithNoUnitTests = jiraItems.filter(i => !i.hasUnitTests);
  const itemsWithNoApiTests = jiraItems.filter(i => !i.hasApiTests);
  const highDependencyItems = jiraItems.filter(i => i.dependencyDepth >= 4);
  const blockedItems = jiraItems.filter(i => i.status === 'Blocked');
  const highExecutionTests = testRailExecutions.filter(t => t.durationSeconds > 300);

  const riskBadgeStyles = {
    Critical: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/30',
    High: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30',
    Medium: 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/30',
    Low: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
  };

  return (
    <div className="space-y-6">
      {/* Top Risk KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
        />
        <MetricCard
          title={t('kpiPlatform.riskView.noApiTests', 'Items With No API Tests')}
          value={itemsWithNoApiTests.length}
          target={t('kpiPlatform.riskView.exceptionsTarget', '< 5 Exceptions')}
          trendPositive={itemsWithNoApiTests.length < 5}
          statusBadge={itemsWithNoApiTests.length === 0 ? t('kpiPlatform.statusCompliant', 'Compliant') : itemsWithNoApiTests.length < 5 ? t('kpiPlatform.statusAcceptable', 'Acceptable') : t('kpiPlatform.statusContractRisk', 'Contract Risk')}
          statusColor={itemsWithNoApiTests.length === 0 ? 'emerald' : itemsWithNoApiTests.length < 5 ? 'amber' : 'rose'}
          icon={<GitPullRequest className="w-5 h-5 text-amber-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getMissingApiTestsJustification(itemsWithNoApiTests))}
        />
        <MetricCard
          title={t('kpiPlatform.riskView.highDependency', 'High Dependency Depth (Depth ≥ 4)')}
          value={highDependencyItems.length}
          target={t('kpiPlatform.riskView.highRiskTarget', '< 3 High Risk')}
          trendPositive={highDependencyItems.length <= 3}
          statusBadge={highDependencyItems.length === 0 ? t('kpiPlatform.statusLowCoupling', 'Low Coupling') : highDependencyItems.length <= 3 ? t('kpiPlatform.statusManageable', 'Manageable') : t('kpiPlatform.statusBlastRadiusAlert', 'Blast Radius Alert')}
          statusColor={highDependencyItems.length === 0 ? 'emerald' : highDependencyItems.length <= 3 ? 'amber' : 'rose'}
          icon={<Layers className="w-5 h-5 text-purple-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getHighDependencyDepthJustification(highDependencyItems))}
        />
        <MetricCard
          title="High Execution Time Tests (>300s)"
          value={highExecutionTests.length}
          target="0 Bottlenecks"
          trendPositive={highExecutionTests.length === 0}
          statusBadge={highExecutionTests.length === 0 ? t('kpiPlatform.statusFastPipeline', 'Fast Pipeline') : highExecutionTests.length <= 5 ? t('kpiPlatform.statusModerateLatency', 'Moderate Latency') : t('kpiPlatform.statusPipelineBottleneck', 'Pipeline Bottleneck')}
          statusColor={highExecutionTests.length === 0 ? 'emerald' : highExecutionTests.length <= 5 ? 'amber' : 'rose'}
          icon={<Clock className="w-5 h-5 text-cyan-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getHighExecutionTestsJustification(highExecutionTests))}
        />
      </div>

      {/* Component Risk Assessment Matrix */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div>
              <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
                {t('kpiPlatform.riskView.matrixTitle')}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Evaluated across test execution failure rates, open gating defects, and unit test omissions.
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
            Ranked by Vulnerability
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
                <th className="p-3">Complexity (CC)</th>
                <th className="p-3">Code Churn</th>
                <th className="p-3">License & Security</th>
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
                      {comp.cyclomaticComplexityRisk ?? 12}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-xs text-slate-500 dark:text-slate-400">
                    +{comp.codeChurnLines ?? 500}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      comp.licenseComplianceStatus === 'Blocked' ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300' :
                      comp.licenseComplianceStatus === 'Warning' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' :
                      'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    }`}>
                      {comp.licenseComplianceStatus ?? 'Passed'}
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

      {/* High Dependency Depth & Blocked Items Warning Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Blocked Items */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
              <XCircle className="w-4 h-4 text-rose-500" />
              <span>{t('kpiPlatform.riskView.blockedDevItems')} ({blockedItems.length})</span>
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
                  <span className="text-rose-600 dark:text-rose-400">{item.severity}</span>
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
              <span>{t('kpiPlatform.riskView.highDepthItems')} ({highDependencyItems.length})</span>
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

      {/* KPI Decision & Audit Justification Modal */}
      <MetricJustificationModal
        isOpen={Boolean(selectedJustification)}
        justification={selectedJustification}
        onClose={() => setSelectedJustification(null)}
      />
    </div>
  );
};
