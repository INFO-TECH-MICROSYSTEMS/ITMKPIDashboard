/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Compass, HelpCircle } from 'lucide-react';
import { KPIActionToolbar } from '../../../kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const DefectDiscoveryOriginBreakdownKPI: React.FC<KPIWidgetRenderProps> = ({
  onJustifyMetric,
  onRemove
}) => {
  const origins = [
    { label: 'Formal Scripted TestRail', count: 74, pct: '21.3%', color: 'bg-cyan-500' },
    { label: 'Automated CI/CD Pipeline', count: 50, pct: '14.4%', color: 'bg-emerald-500' },
    { label: 'Exploratory & Ad-hoc Probing', count: 32, pct: '9.2%', color: 'bg-purple-500' },
    { label: 'Bug Bash & Dogfooding', count: 24, pct: '6.9%', color: 'bg-amber-500' },
    { label: 'Escaped Customer APARs', count: 167, pct: '48.1%', color: 'bg-rose-500' }
  ];

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 relative">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}

      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 pr-6">
        <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
          <Compass className="w-4 h-4 text-violet-500 shrink-0" />
          <span>Defect Discovery Origin Breakdown</span>
          {onJustifyMetric && (
            <button
              type="button"
              onClick={() => onJustifyMetric('defectDiscoveryOrigin')}
              className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
              title="Click for KPI justification and audit details"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          )}
        </h4>
        <span className="text-[10px] font-mono text-slate-400">Formal vs. Non-Formal</span>
      </div>

      <div className="space-y-3">
        {origins.map((o) => (
          <div key={o.label} className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-700 dark:text-slate-300 font-medium">{o.label}</span>
              <span className="font-bold text-slate-900 dark:text-white">{o.count} ({o.pct})</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className={`${o.color} h-full rounded-full`} style={{ width: o.pct }} />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex justify-between items-center text-xs font-mono">
        <span className="text-slate-500">Suite Backfill Compliance:</span>
        <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
          80.8% Catalogued in TestRail
        </span>
      </div>
    </div>
  );
};
