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

export const AutomationFlakyTestsTableKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  onJustifyMetric,
  onRemove
}) => {
  const tests = metrics.testRailExecutions || [];
  const flakyList = tests.filter(t => t.isFlaky || t.rerunCount > 0);

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50 shadow-sm space-y-3 relative">
      <KPIActionToolbar
        onJustify={() => onJustifyMetric?.('flakyTestsTable')}
        onRemove={onRemove}
      />

      <div className="flex items-center justify-between pb-2 border-b border-amber-100 dark:border-amber-900/40 pr-16">
        <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
          <span>Flaky Automated Tests Identified ({flakyList.length} Cases Requiring Quarantine)</span>
        </span>
        <span className="text-[10px] font-mono text-slate-400">Total Pipeline Reruns: 96</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
            <tr>
              <th className="p-2.5 rounded-l-lg">Case ID</th>
              <th className="p-2.5">Title</th>
              <th className="p-2.5">Suite Type</th>
              <th className="p-2.5">Component</th>
              <th className="p-2.5">Rerun Count</th>
              <th className="p-2.5">Duration</th>
              <th className="p-2.5 rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {flakyList.slice(0, 5).map(t => (
              <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="p-2.5 font-mono font-bold text-cyan-600 dark:text-cyan-400">{t.id}</td>
                <td className="p-2.5 font-medium text-slate-900 dark:text-white max-w-xs truncate">{t.title}</td>
                <td className="p-2.5 font-mono text-slate-600 dark:text-slate-300">{t.suiteType}</td>
                <td className="p-2.5 text-slate-600 dark:text-slate-300">{t.component}</td>
                <td className="p-2.5 font-mono text-amber-600 dark:text-amber-400 font-bold">{t.rerunCount} reruns</td>
                <td className="p-2.5 font-mono text-slate-500 dark:text-slate-400">{t.durationSeconds}s</td>
                <td className="p-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                    Flaky / Rerun
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
