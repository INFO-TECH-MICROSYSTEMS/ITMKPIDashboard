/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { AlertTriangle, HelpCircle } from 'lucide-react';
import { KPIActionToolbar } from '../../../kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const QualityActiveGatingDefectsTableKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  onJustifyMetric,
  onRemove
}) => {
  const jiraItems = metrics.jiraItems || [];
  const gatingList = jiraItems.filter(i => i.isGatingDefect && i.status !== 'Done');

  const jiraItemsB = metricsB?.jiraItems || [];
  const gatingListB = jiraItemsB.filter(i => i.isGatingDefect && i.status !== 'Done');

  return (
    <div className="space-y-4 relative group">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}

      {/* Scope 1 Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 shadow-sm space-y-3">
        <div className="space-y-1.5 pb-2 border-b border-rose-100 dark:border-rose-900/40 pr-6">
          {isCompareMode && (
            <div 
              className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider cursor-help"
              title={scopeALabel}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
              <span className="truncate">{scopeALabel}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold text-sm font-['Outfit']">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Active Release Gating Defects ({gatingList.length} Items Require Sign-off)</span>
              {onJustifyMetric && (
                <button
                  type="button"
                  onClick={() => onJustifyMetric('gatingDefectsTable', 'A')}
                  className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  title="Click for KPI justification and audit details"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
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
              {gatingList.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-slate-400 text-xs">
                    No active gating defects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scope 2 Table Stacked Below */}
      {isCompareMode && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/50 shadow-sm space-y-3">
          <div className="space-y-1.5 pb-2 border-b border-purple-100 dark:border-purple-900/40 pr-6">
            <div 
              className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider cursor-help"
              title={scopeBLabel}
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
              <span className="truncate">{scopeBLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-bold text-sm font-['Outfit']">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Active Release Gating Defects ({gatingListB.length} Items Require Sign-off)</span>
                {onJustifyMetric && (
                  <button
                    type="button"
                    onClick={() => onJustifyMetric('gatingDefectsTable', 'B')}
                    className="p-0.5 rounded-full text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="Click for Scope 2 KPI justification and audit details"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
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
                {gatingListB.slice(0, 5).map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-2.5 font-mono font-bold text-purple-600 dark:text-purple-400">
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
                {gatingListB.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-slate-400 text-xs">
                      No active gating defects found in Scope 2.
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
