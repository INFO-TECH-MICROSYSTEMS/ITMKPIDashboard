/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { KPIActionToolbar } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const LeadingIndicatorsPanelKPI: React.FC<KPIWidgetRenderProps> = ({
  onJustifyMetric,
  onRemove
}) => {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 relative">
      <KPIActionToolbar
        onJustify={() => onJustifyMetric?.('leadingIndicatorsPanel')}
        onRemove={onRemove}
      />

      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 pr-16">
        <div>
          <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4 text-cyan-500" />
            <span>Leading Indicators (Predictive & In-Flight)</span>
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Signals measured before release gating to forecast outcome risks
          </p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-800">
          Shift-Left
        </span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-200">PR Code Quality Gate Compliance</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Target: ≥ 85.0% • Predicts regression injection likelihood before code merges</div>
          </div>
          <span className="text-base font-black text-amber-600 dark:text-amber-400">70.6%</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-200">High Dependency Coupling Ratio</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Target: &lt; 10.0% • Early indicator of cross-service architectural blast radius</div>
          </div>
          <span className="text-base font-black text-rose-600 dark:text-rose-400">38%</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-200">In-Flight Automated Test Coverage</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Target: ≥ 75.0% • Predicts whether regression verification can complete on time</div>
          </div>
          <span className="text-base font-black text-emerald-600 dark:text-emerald-400">80.8%</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-200">Exploratory & Ad-Hoc Shift-Left Ratio</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Target: 15.0% - 35.0% • Proactive probing ratio to catch blind spots</div>
          </div>
          <span className="text-base font-black text-emerald-600 dark:text-emerald-400">31.1%</span>
        </div>
      </div>
    </div>
  );
};
