/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Network, HelpCircle } from 'lucide-react';
import { KPIActionToolbar } from '../../../kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const RiskComponentMatrixKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  onJustifyMetric,
  onRemove
}) => {
  const risks = metrics.componentRisks || [];
  const risksB = metricsB?.componentRisks || [];

  return (
    <div className="space-y-4 relative group">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}

      {/* Scope 1 Component Risk Matrix */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="space-y-1.5 pb-2 border-b border-slate-100 dark:border-slate-800 pr-6">
          {isCompareMode && (
            <div 
              className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider cursor-help"
              title={scopeALabel}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
              <span className="truncate">{scopeALabel}</span>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
                <Network className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Component Risk & Dependency Gating Matrix</span>
                {onJustifyMetric && (
                  <button
                    type="button"
                    onClick={() => onJustifyMetric('componentMatrix', 'A')}
                    className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="Click for KPI justification and audit details"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Evaluated across test execution failure rates, open gating defects, and unit test omissions.
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
              Ranked by Vulnerability
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3 rounded-l-lg">Component / Module</th>
                <th className="p-3">Test Failure Rate</th>
                <th className="p-3">Gating Defects</th>
                <th className="p-3">Total Defects</th>
                <th className="p-3">Test Coverage</th>
                <th className="p-3">Missing Unit Tests</th>
                <th className="p-3">Complexity (CC)</th>
                <th className="p-3">Code Churn</th>
                <th className="p-3">License & Security</th>
                <th className="p-3 rounded-r-lg">Risk Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {risks.slice(0, 6).map((comp) => (
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
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${comp.testCoveragePercent}%` }} />
                      </div>
                      <span className="font-mono text-slate-600 dark:text-slate-400">{comp.testCoveragePercent}%</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-slate-700 dark:text-slate-300">{comp.missingUnitTestsCount}</td>
                  <td className="p-3 font-mono text-slate-700 dark:text-slate-300">{comp.cyclomaticComplexityRisk}</td>
                  <td className="p-3 font-mono text-slate-700 dark:text-slate-300">+{comp.codeChurnLines}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      comp.licenseComplianceStatus === 'Passed' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                    }`}>
                      {comp.licenseComplianceStatus === 'Passed' ? 'Compliant' : 'Blocked'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      comp.riskLevel === 'Critical' ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800' : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                    }`}>
                      {comp.riskLevel} Risk
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scope 2 Component Risk Matrix Stacked Below */}
      {isCompareMode && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="space-y-1.5 pb-2 border-b border-slate-100 dark:border-slate-800 pr-6">
            <div 
              className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider cursor-help"
              title={scopeBLabel}
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
              <span className="truncate">{scopeBLabel}</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
                  <Network className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>Component Risk & Dependency Gating Matrix</span>
                  {onJustifyMetric && (
                    <button
                      type="button"
                      onClick={() => onJustifyMetric('componentMatrix', 'B')}
                      className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                      title="Click for Scope 2 KPI justification and audit details"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Evaluated across test execution failure rates, open gating defects, and unit test omissions.
                </p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                Ranked by Vulnerability
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3 rounded-l-lg">Component / Module</th>
                  <th className="p-3">Test Failure Rate</th>
                  <th className="p-3">Gating Defects</th>
                  <th className="p-3">Total Defects</th>
                  <th className="p-3">Test Coverage</th>
                  <th className="p-3">Missing Unit Tests</th>
                  <th className="p-3">Complexity (CC)</th>
                  <th className="p-3">Code Churn</th>
                  <th className="p-3">License & Security</th>
                  <th className="p-3 rounded-r-lg">Risk Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {risksB.slice(0, 6).map((comp) => (
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
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${comp.testCoveragePercent}%` }} />
                        </div>
                        <span className="font-mono text-slate-600 dark:text-slate-400">{comp.testCoveragePercent}%</span>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-slate-700 dark:text-slate-300">{comp.missingUnitTestsCount}</td>
                    <td className="p-3 font-mono text-slate-700 dark:text-slate-300">{comp.cyclomaticComplexityRisk}</td>
                    <td className="p-3 font-mono text-slate-700 dark:text-slate-300">+{comp.codeChurnLines}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        comp.licenseComplianceStatus === 'Passed' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                      }`}>
                        {comp.licenseComplianceStatus === 'Passed' ? 'Compliant' : 'Blocked'}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        comp.riskLevel === 'Critical' ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800' : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                      }`}>
                        {comp.riskLevel} Risk
                      </span>
                    </td>
                  </tr>
                ))}
                {risksB.length === 0 && (
                  <tr>
                    <td colSpan={10} className="p-4 text-center text-slate-400 text-xs">
                      No component risk records in Scope 2.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
