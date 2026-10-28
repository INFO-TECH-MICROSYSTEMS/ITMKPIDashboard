/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { KPIActionToolbar } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const RiskComponentMatrixKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  onJustifyMetric,
  onRemove
}) => {
  const risks = metrics.componentRisks || [];

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 relative">
      <KPIActionToolbar
        onJustify={() => onJustifyMetric?.('componentMatrix')}
        onRemove={onRemove}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-800 pr-16">
        <div>
          <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
            Component Risk & Dependency Gating Matrix
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Evaluated across test execution failure rates, open gating defects, and unit test omissions.
          </p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
          Ranked by Vulnerability
        </span>
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
  );
};
