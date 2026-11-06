/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { PieChart, HelpCircle } from 'lucide-react';
import { KPIActionToolbar } from '../../../kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const QualityDefectSeverityBreakdownKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  onJustifyMetric,
  onRemove
}) => {
  const sev = metrics.severityCounts || { blockerP1: 63, criticalP2: 69, majorP3: 146, minorP4: 69 };
  const total = sev.blockerP1 + sev.criticalP2 + sev.majorP3 + sev.minorP4;

  const sevB = metricsB?.severityCounts || { blockerP1: 59, criticalP2: 38, majorP3: 84, minorP4: 49 };
  const totalB = sevB.blockerP1 + sevB.criticalP2 + sevB.majorP3 + sevB.minorP4;

  const rows = [
    { label: 'P1 - Blocker (Gating)', count: sev.blockerP1, color: 'bg-rose-600', text: 'text-rose-600 dark:text-rose-400' },
    { label: 'P2 - Critical Release Defect', count: sev.criticalP2, color: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
    { label: 'P3 - Major Functional Defect', count: sev.majorP3, color: 'bg-cyan-500', text: 'text-cyan-600 dark:text-cyan-400' },
    { label: 'P4 - Minor / Cosmetic Defect', count: sev.minorP4, color: 'bg-slate-400', text: 'text-slate-600 dark:text-slate-400' }
  ];

  const rowsB = [
    { label: 'P1 - Blocker (Gating)', count: sevB.blockerP1, color: 'bg-rose-600', text: 'text-rose-600 dark:text-rose-400' },
    { label: 'P2 - Critical Release Defect', count: sevB.criticalP2, color: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
    { label: 'P3 - Major Functional Defect', count: sevB.majorP3, color: 'bg-cyan-500', text: 'text-cyan-600 dark:text-cyan-400' },
    { label: 'P4 - Minor / Cosmetic Defect', count: sevB.minorP4, color: 'bg-slate-400', text: 'text-slate-600 dark:text-slate-400' }
  ];

  return (
    <div className="space-y-4 relative group">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}

      {/* Scope 1 Severity Breakdown Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Defect Severity Breakdown</span>
                {onJustifyMetric && (
                  <button
                    type="button"
                    onClick={() => onJustifyMetric('defectSeverity', 'A')}
                    className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="Click for KPI justification and audit details"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </h4>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shadow-2xs text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800">
                {sev.blockerP1} Blockers
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {rows.map(r => {
            const pct = total > 0 ? ((r.count / total) * 100).toFixed(0) : '0';
            return (
              <div key={r.label} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{r.label}</span>
                  <span className={`font-bold ${r.text}`}>{r.count} ({pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`${r.color} h-full rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scope 2 Severity Breakdown Card Stacked Below */}
      {isCompareMode && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/50 shadow-sm space-y-4">
          <div className="space-y-1.5 pb-2 border-b border-purple-100 dark:border-purple-900/40 pr-6">
            <div 
              className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider cursor-help"
              title={scopeBLabel}
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
              <span className="truncate">{scopeBLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>Defect Severity Breakdown</span>
                  {onJustifyMetric && (
                    <button
                      type="button"
                      onClick={() => onJustifyMetric('defectSeverity', 'B')}
                      className="p-0.5 rounded-full text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                      title="Click for Scope 2 KPI justification and audit details"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shadow-2xs text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800">
                  {sevB.blockerP1} Blockers
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {rowsB.map(r => {
              const pct = totalB > 0 ? ((r.count / totalB) * 100).toFixed(0) : '0';
              return (
                <div key={r.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{r.label}</span>
                    <span className={`font-bold ${r.text}`}>{r.count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className={`${r.color} h-full rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
