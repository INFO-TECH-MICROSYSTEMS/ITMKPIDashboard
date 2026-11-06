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
  isCompareMode,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  onJustifyMetric,
  onRemove
}) => {
  const originsA = [
    { label: 'Formal Scripted TestRail', count: 74, pct: '21.3%', color: 'bg-cyan-500' },
    { label: 'Automated CI/CD Pipeline', count: 50, pct: '14.4%', color: 'bg-emerald-500' },
    { label: 'Exploratory & Ad-hoc Probing', count: 32, pct: '9.2%', color: 'bg-purple-500' },
    { label: 'Bug Bash & Dogfooding', count: 24, pct: '6.9%', color: 'bg-amber-500' },
    { label: 'Escaped Customer APARs', count: 167, pct: '48.1%', color: 'bg-rose-500' }
  ];

  const originsB = [
    { label: 'Formal Scripted TestRail', count: 68, pct: '22.1%', color: 'bg-cyan-500' },
    { label: 'Automated CI/CD Pipeline', count: 48, pct: '15.6%', color: 'bg-emerald-500' },
    { label: 'Exploratory & Ad-hoc Probing', count: 26, pct: '8.5%', color: 'bg-purple-500' },
    { label: 'Bug Bash & Dogfooding', count: 14, pct: '4.6%', color: 'bg-amber-500' },
    { label: 'Escaped Customer APARs', count: 152, pct: '46.1%', color: 'bg-rose-500' }
  ];

  return (
    <div className="space-y-4 relative group">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}

      {/* Scope 1 Discovery Origins */}
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
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-violet-500 shrink-0" />
              <span>Defect Discovery Origin Breakdown</span>
              {onJustifyMetric && (
                <button
                  type="button"
                  onClick={() => onJustifyMetric('defectDiscoveryOrigin', 'A')}
                  className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  title="Click for KPI justification and audit details"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              )}
            </h4>
            <span className="text-[10px] font-mono text-slate-400">Formal vs. Non-Formal</span>
          </div>
        </div>

        <div className="space-y-3">
          {originsA.map((o) => (
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

      {/* Scope 2 Discovery Origins Stacked Below */}
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
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-violet-500 shrink-0" />
                <span>Defect Discovery Origin Breakdown</span>
                {onJustifyMetric && (
                  <button
                    type="button"
                    onClick={() => onJustifyMetric('defectDiscoveryOrigin', 'B')}
                    className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="Click for Scope 2 KPI justification and audit details"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </h4>
              <span className="text-[10px] font-mono text-slate-400">Formal vs. Non-Formal</span>
            </div>
          </div>

          <div className="space-y-3">
            {originsB.map((o) => (
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
              77.4% Catalogued in TestRail
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
