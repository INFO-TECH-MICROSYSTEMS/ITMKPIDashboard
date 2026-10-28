/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { KPIActionToolbar } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const QualityActiveGatingDefectsTableKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  onJustifyMetric,
  onRemove
}) => {
  const jiraItems = metrics.jiraItems || [];
  const gatingList = jiraItems.filter(i => i.isGatingDefect && i.status !== 'Done');

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 shadow-sm space-y-3 relative">
      <KPIActionToolbar
        onJustify={() => onJustifyMetric?.('gatingDefectsTable')}
        onRemove={onRemove}
      />

      <div className="flex items-center justify-between pb-2 border-b border-rose-100 dark:border-rose-900/40 pr-16">
        <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold text-sm font-['Outfit']">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Active Release Gating Defects ({gatingList.length} Items Require Sign-off)</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
            <tr>
              <th className="p-2.5 rounded-l-lg">Key</th>
              <th className="p-2.5">Title</th>
              <th className="p-2.5">Severity</th>
              <th className="p-2.5">Product</th>
              <th className="p-2.5">Component</th>
              <th className="p-2.5">QA Owner</th>
              <th className="p-2.5 rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {gatingList.slice(0, 5).map((d) => (
              <tr key={d.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="p-2.5 font-mono font-bold text-cyan-600 dark:text-cyan-400">
                  {d.id}
                </td>
                <td className="p-2.5 font-medium text-slate-900 dark:text-white max-w-xs truncate">
                  {d.title}
                </td>
                <td className="p-2.5 font-mono">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    d.severity === 'P1-Blocker' ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300' : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                  }`}>
                    {d.severity}
                  </span>
                </td>
                <td className="p-2.5 text-slate-600 dark:text-slate-300">{d.product}</td>
                <td className="p-2.5 text-slate-600 dark:text-slate-300">{d.component}</td>
                <td className="p-2.5 text-slate-700 dark:text-slate-300 font-medium">{d.assignee || 'Unassigned'}</td>
                <td className="p-2.5">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {d.status}
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
