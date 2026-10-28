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

export const ProductivityEngineerLedgerTableKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
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

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 relative">
      <KPIActionToolbar
        onJustify={() => onJustifyMetric?.('productivityLedger')}
        onRemove={onRemove}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-800 pr-16">
        <div>
          <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
            QA Engineer Test Assignment & Throughput Ledger
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Assigned vs completed test case executions, blocked items, and individual velocity.
          </p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
          Capacity Limit: 140 Tests / Engineer
        </span>
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
  );
};
