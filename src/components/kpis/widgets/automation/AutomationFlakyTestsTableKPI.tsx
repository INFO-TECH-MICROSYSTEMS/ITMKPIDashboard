/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Bug, HelpCircle } from 'lucide-react';
import { KPIActionToolbar } from '../../../kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const AutomationFlakyTestsTableKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  onJustifyMetric,
  onRemove
}) => {
  const tests = metrics.testRailExecutions || [];
  const flakyList = tests.filter(t => t.isFlaky || t.rerunCount > 0);
  const testsB = metricsB?.testRailExecutions || [];
  const flakyListB = testsB.filter(t => t.isFlaky || t.rerunCount > 0);

  return (
    <div className="space-y-4 relative group">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}

      {/* Scope 1 Table Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50 shadow-sm space-y-3">
        <div className="space-y-1.5 pb-2 border-b border-amber-100 dark:border-amber-900/40 pr-6">
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
            <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
              <Bug className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Flaky Automated Tests Identified ({flakyList.length} Cases Requiring Quarantine)</span>
              {onJustifyMetric && (
                <button
                  type="button"
                  onClick={() => onJustifyMetric('flakyTestsTable', 'A')}
                  className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  title="Click for KPI justification and audit details"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              )}
            </span>
            <span className="text-[10px] font-mono text-slate-400">Total Pipeline Reruns: {metrics.automationHealth?.totalReruns ?? 96}</span>
          </div>
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
              {flakyList.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-slate-400 text-xs">
                    No flaky tests detected in current test runs.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scope 2 Table Card Stacked Below */}
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
              <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
                <Bug className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Flaky Automated Tests Identified ({flakyListB.length} Cases Requiring Quarantine)</span>
                {onJustifyMetric && (
                  <button
                    type="button"
                    onClick={() => onJustifyMetric('flakyTestsTable', 'B')}
                    className="p-0.5 rounded-full text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="Click for Scope 2 KPI justification and audit details"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </span>
              <span className="text-[10px] font-mono text-slate-400">Total Pipeline Reruns: {metricsB?.automationHealth?.totalReruns ?? 0}</span>
            </div>
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
                {flakyListB.slice(0, 5).map(t => (
                  <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-2.5 font-mono font-bold text-purple-600 dark:text-purple-400">{t.id}</td>
                    <td className="p-2.5 font-medium text-slate-900 dark:text-white max-w-xs truncate">{t.title}</td>
                    <td className="p-2.5 font-mono text-slate-600 dark:text-slate-300">{t.suiteType}</td>
                    <td className="p-2.5 text-slate-600 dark:text-slate-300">{t.component}</td>
                    <td className="p-2.5 font-mono text-purple-600 dark:text-purple-400 font-bold">{t.rerunCount} reruns</td>
                    <td className="p-2.5 font-mono text-slate-500 dark:text-slate-400">{t.durationSeconds}s</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                        Flaky / Rerun
                      </span>
                    </td>
                  </tr>
                ))}
                {flakyListB.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-slate-400 text-xs">
                      No flaky tests detected in Scope 2.
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
