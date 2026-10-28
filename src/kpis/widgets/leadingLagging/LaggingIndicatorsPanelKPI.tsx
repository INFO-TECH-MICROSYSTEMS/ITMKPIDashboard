/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { KPIActionToolbar } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const LaggingIndicatorsPanelKPI: React.FC<KPIWidgetRenderProps> = ({
  onJustifyMetric,
  onRemove
}) => {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 relative">
      <KPIActionToolbar
        onJustify={() => onJustifyMetric?.('laggingIndicatorsPanel')}
        onRemove={onRemove}
      />

      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 pr-16">
        <div>
          <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
            <ArrowDownRight className="w-4 h-4 text-purple-500" />
            <span>Lagging Indicators (Realized Outcomes & Stability)</span>
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Historical metrics validating whether leading rigor prevented defects
          </p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800">
          Post-Hoc
        </span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-200">Customer Defect Leakage Rate (APARs)</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Target: &lt; 3.0% • Post-release defect escapes reported by customers</div>
          </div>
          <span className="text-base font-black text-rose-600 dark:text-rose-400">48.1%</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-200">DORA Change Failure Rate (CFR)</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Target: &lt; 5.0% • Percentage of releases requiring emergency rollbacks</div>
          </div>
          <span className="text-base font-black text-emerald-600 dark:text-emerald-400">3.4%</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-200">Mean Time to Resolve (MTTR)</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Target: &lt; 24.0 hrs • Historical duration required to remediate incidents</div>
          </div>
          <span className="text-base font-black text-rose-600 dark:text-rose-400">83.8 hrs</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-200">Cost of Poor Quality (Escaped Defect Rework)</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Target: &lt; $25,000 • Overhead in triage, communication, and hotfixes</div>
          </div>
          <span className="text-base font-black text-rose-600 dark:text-rose-400">$308,950</span>
        </div>
      </div>
    </div>
  );
};
