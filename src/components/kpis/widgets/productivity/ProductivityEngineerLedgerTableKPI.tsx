/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Users, HelpCircle } from 'lucide-react';
import { KPIActionToolbar } from '../../../kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const ProductivityEngineerLedgerTableKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  onJustifyMetric,
  onRemove
}) => {
  const prod = metrics.productivityMetrics || [
    { personName: 'Marcus Vance', assignedTests: 45, completedTests: 43, completionRate: 95.6, delayedExecutions: 1, avgHoursPerTest: 0.25, isOverCommitted: false },
    { personName: 'Chloe Martin', assignedTests: 43, completedTests: 41, completionRate: 95.3, delayedExecutions: 1, avgHoursPerTest: 0.22, isOverCommitted: false },
    { personName: 'Elena Rostova', assignedTests: 36, completedTests: 33, completionRate: 91.7, delayedExecutions: 3, avgHoursPerTest: 0.26, isOverCommitted: false },
    { personName: 'Siddharth Nair', assignedTests: 31, completedTests: 26, completionRate: 83.9, delayedExecutions: 4, avgHoursPerTest: 0.21, isOverCommitted: false },
    { personName: 'Tariq Al-Mansoor', assignedTests: 30, completedTests: 25, completionRate: 83.3, delayedExecutions: 3, avgHoursPerTest: 0.22, isOverCommitted: false },
    { personName: 'Priya Patel', assignedTests: 26, completedTests: 25, completionRate: 96.2, delayedExecutions: 1, avgHoursPerTest: 0.22, isOverCommitted: false }
  ];

  const prodB = metricsB?.productivityMetrics || prod.map(p => ({
    ...p,
    assignedTests: Math.round(p.assignedTests * 0.85),
    completedTests: Math.round(p.completedTests * 0.82),
    completionRate: Number((p.completionRate * 0.96).toFixed(1))
  }));

  return (
    <div className="space-y-4 relative group">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}

      {/* Scope 1 Ledger */}
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
                <Users className="w-4 h-4 text-blue-500 shrink-0" />
                <span>QA Engineer Test Assignment & Throughput Ledger</span>
                {onJustifyMetric && (
                  <button
                    type="button"
                    onClick={() => onJustifyMetric('productivityLedger', 'A')}
                    className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="Click for KPI justification and audit details"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Assigned vs completed test case executions, blocked items, and individual velocity.
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
              Capacity Limit: 140 Tests / Engineer
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3 rounded-l-lg">QA Engineer</th>
                <th className="p-3">Assigned Tests</th>
                <th className="p-3">Completed Tests</th>
                <th className="p-3">Completion Rate</th>
                <th className="p-3">Delayed / Blocked</th>
                <th className="p-3">Avg Hours / Test</th>
                <th className="p-3 rounded-r-lg">Workload Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {prod.map((person) => (
                <tr key={person.personName} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 flex items-center justify-center font-bold text-[10px]">
                      {person.personName[0]}
                    </div>
                    <span>{person.personName}</span>
                  </td>
                  <td className="p-3 font-mono text-slate-700 dark:text-slate-300">{person.assignedTests}</td>
                  <td className="p-3 font-mono text-slate-700 dark:text-slate-300">{person.completedTests}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${person.completionRate}%` }} />
                      </div>
                      <span className="font-mono text-slate-700 dark:text-slate-300 font-bold">{person.completionRate}%</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-slate-700 dark:text-slate-300">{person.delayedExecutions}</td>
                  <td className="p-3 font-mono text-slate-600 dark:text-slate-400">{person.avgHoursPerTest} hrs</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      person.isOverCommitted ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800' : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                    }`}>
                      {person.isOverCommitted ? 'Over-Committed' : 'Balanced Load'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scope 2 Ledger Stacked Below */}
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
                  <Users className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>QA Engineer Test Assignment & Throughput Ledger</span>
                  {onJustifyMetric && (
                    <button
                      type="button"
                      onClick={() => onJustifyMetric('productivityLedger', 'B')}
                      className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                      title="Click for Scope 2 KPI justification and audit details"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Assigned vs completed test case executions, blocked items, and individual velocity.
                </p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                Capacity Limit: 140 Tests / Engineer
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3 rounded-l-lg">QA Engineer</th>
                  <th className="p-3">Assigned Tests</th>
                  <th className="p-3">Completed Tests</th>
                  <th className="p-3">Completion Rate</th>
                  <th className="p-3">Delayed / Blocked</th>
                  <th className="p-3">Avg Hours / Test</th>
                  <th className="p-3 rounded-r-lg">Workload Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {prodB.map((person) => (
                  <tr key={person.personName} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 flex items-center justify-center font-bold text-[10px]">
                        {person.personName[0]}
                      </div>
                      <span>{person.personName}</span>
                    </td>
                    <td className="p-3 font-mono text-slate-700 dark:text-slate-300">{person.assignedTests}</td>
                    <td className="p-3 font-mono text-slate-700 dark:text-slate-300">{person.completedTests}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${person.completionRate}%` }} />
                        </div>
                        <span className="font-mono text-slate-700 dark:text-slate-300 font-bold">{person.completionRate}%</span>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-slate-700 dark:text-slate-300">{person.delayedExecutions}</td>
                    <td className="p-3 font-mono text-slate-600 dark:text-slate-400">{person.avgHoursPerTest} hrs</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        person.isOverCommitted ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800' : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                      }`}>
                        {person.isOverCommitted ? 'Over-Committed' : 'Balanced Load'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
