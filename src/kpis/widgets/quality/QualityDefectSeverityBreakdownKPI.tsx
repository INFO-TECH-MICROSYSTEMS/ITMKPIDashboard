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

export const QualityDefectSeverityBreakdownKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  onJustifyMetric,
  onRemove
}) => {
  const sev = metrics.severityCounts || { blockerP1: 63, criticalP2: 69, majorP3: 146, minorP4: 69 };
  const total = sev.blockerP1 + sev.criticalP2 + sev.majorP3 + sev.minorP4;

  const sevB = metricsB?.severityCounts;

  const rows = [
    { label: 'P1 - Blocker (Gating)', count: sev.blockerP1, color: 'bg-rose-600', text: 'text-rose-600 dark:text-rose-400' },
    { label: 'P2 - Critical Release Defect', count: sev.criticalP2, color: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
    { label: 'P3 - Major Functional Defect', count: sev.majorP3, color: 'bg-cyan-500', text: 'text-cyan-600 dark:text-cyan-400' },
    { label: 'P4 - Minor / Cosmetic Defect', count: sev.minorP4, color: 'bg-slate-400', text: 'text-slate-600 dark:text-slate-400' }
  ];

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 relative">
      <KPIActionToolbar
        onJustify={() => onJustifyMetric?.('defectSeverity')}
        onRemove={onRemove}
      />

      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 pr-16">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white">
            Defect Severity Breakdown
          </h4>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shadow-2xs text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800">
            {sev.blockerP1} Blockers
          </span>
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

      {isCompareMode && sevB && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono">
          <span className="font-bold text-purple-700 dark:text-purple-400">Scope 2 Defect Severity: </span>
          <span className="text-slate-600 dark:text-slate-300">
            P1: {sevB.blockerP1} • P2: {sevB.criticalP2} • P3: {sevB.majorP3} • P4: {sevB.minorP4}
          </span>
        </div>
      )}
    </div>
  );
};
