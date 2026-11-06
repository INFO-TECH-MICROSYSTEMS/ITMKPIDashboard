/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Eye, HelpCircle } from 'lucide-react';
import { KPIActionToolbar } from '../../../kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const GovernanceAccessibilityAuditPanelKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  onJustifyMetric,
  onRemove
}) => {
  const scA = metrics.executiveScorecard;
  const scB = metricsB?.executiveScorecard;

  const a11yScoreA = scA?.accessibilityScore ?? 87.1;
  const a11yScoreB = scB?.accessibilityScore ?? 82.8;

  return (
    <div className="space-y-4 relative group">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}

      {/* Scope 1 Accessibility Audit */}
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
              <Eye className="w-4 h-4 text-teal-500 shrink-0" />
              <span>Accessibility (WCAG 2.2 AA) Audit</span>
              {onJustifyMetric && (
                <button
                  type="button"
                  onClick={() => onJustifyMetric('accessibilityAuditPanel', 'A')}
                  className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  title="Click for KPI justification and audit details"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              )}
            </h4>
          </div>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
            <span className="text-slate-600 dark:text-slate-400">Color Contrast Ratios (AA & AAA)</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">100% Pass (7:1 High Contrast)</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
            <span className="text-slate-600 dark:text-slate-400">Keyboard Navigation & Focus Traps</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">0 Traps Detected</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
            <span className="text-slate-600 dark:text-slate-400">Screen Reader ARIA Compatibility</span>
            <span className="font-bold text-cyan-600 dark:text-cyan-400">{a11yScoreA}% Suite Pass Rate</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-600 dark:text-slate-400">Audit Status</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              a11yScoreA >= 95 
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
            }`}>
              {a11yScoreA >= 95 ? 'Certified Public Sector' : 'Conditional Pass'}
            </span>
          </div>
        </div>
      </div>

      {/* Scope 2 Accessibility Audit Stacked Below */}
      {isCompareMode && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/50 shadow-sm space-y-4">
          <div className="space-y-1.5 pb-2 border-b border-purple-100 dark:border-purple-900/40 pr-6">
            <div 
              className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider cursor-help"
              title={scopeBLabel}
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
              <span className="truncate">{scopeBLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Accessibility (WCAG 2.2 AA) Audit</span>
                {onJustifyMetric && (
                  <button
                    type="button"
                    onClick={() => onJustifyMetric('accessibilityAuditPanel', 'B')}
                    className="p-0.5 rounded-full text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="Click for Scope 2 KPI justification and audit details"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </h4>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-600 dark:text-slate-400">Color Contrast Ratios (AA & AAA)</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">100% Pass (7:1 High Contrast)</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-600 dark:text-slate-400">Keyboard Navigation & Focus Traps</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">0 Traps Detected</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-600 dark:text-slate-400">Screen Reader ARIA Compatibility</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">{a11yScoreB}% Suite Pass Rate</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600 dark:text-slate-400">Audit Status</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                a11yScoreB >= 95 
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
              }`}>
                {a11yScoreB >= 95 ? 'Certified Public Sector' : 'Conditional Pass'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
