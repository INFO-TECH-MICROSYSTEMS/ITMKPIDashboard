/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Zap } from 'lucide-react';
import { KPIActionToolbar } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const GovernanceBenchmarksPanelKPI: React.FC<KPIWidgetRenderProps> = ({
  onJustifyMetric,
  onRemove
}) => {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 relative">
      <KPIActionToolbar
        onJustify={() => onJustifyMetric?.('benchmarksPanel')}
        onRemove={onRemove}
      />

      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 pr-16">
        <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-purple-500" />
          <span>SaaS Performance & Reliability Benchmarks</span>
        </h4>
      </div>

      <div className="space-y-3 font-mono text-xs">
        <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
          <span className="text-slate-600 dark:text-slate-400">P95 Response Time Benchmark</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">135 ms (&lt; 180 ms target)</span>
        </div>
        <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
          <span className="text-slate-600 dark:text-slate-400">P99 Spike Latency Benchmark</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">350 ms (&lt; 450 ms target)</span>
        </div>
        <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
          <span className="text-slate-600 dark:text-slate-400">HTTP 5xx Server Error Rate</span>
          <span className="font-bold text-rose-600 dark:text-rose-400">7.95%</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-slate-600 dark:text-slate-400">Infrastructure Stress Level</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            Elevated Load Warning
          </span>
        </div>
      </div>
    </div>
  );
};
