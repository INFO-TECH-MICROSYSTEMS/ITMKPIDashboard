/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Award, HelpCircle } from 'lucide-react';
import { KPIActionToolbar } from '../../../kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const GovernanceBenchmarksPanelKPI: React.FC<KPIWidgetRenderProps> = ({
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

  const p95A = scA?.performanceP95Ms ?? 135;
  const p99A = scA?.performanceP99Ms ?? 350;
  const errA = scA?.performanceErrorRate ?? 7.95;

  const p95B = scB?.performanceP95Ms ?? 136;
  const p99B = scB?.performanceP99Ms ?? 380;
  const errB = scB?.performanceErrorRate ?? 2.1;

  return (
    <div className="space-y-4 relative group">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}

      {/* Scope 1 Benchmarks */}
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
              <Award className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>SaaS Performance & Reliability Benchmarks</span>
              {onJustifyMetric && (
                <button
                  type="button"
                  onClick={() => onJustifyMetric('benchmarksPanel', 'A')}
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
            <span className="text-slate-600 dark:text-slate-400">P95 Response Time Benchmark</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{p95A} ms (&lt; 180 ms target)</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
            <span className="text-slate-600 dark:text-slate-400">P99 Spike Latency Benchmark</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{p99A} ms (&lt; 450 ms target)</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
            <span className="text-slate-600 dark:text-slate-400">HTTP 5xx Server Error Rate</span>
            <span className="font-bold text-rose-600 dark:text-rose-400">{errA}%</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-600 dark:text-slate-400">Infrastructure Stress Level</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              errA > 1.0 
                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
            }`}>
              {errA > 1.0 ? 'Elevated Load Warning' : 'Under 40% CPU Capacity'}
            </span>
          </div>
        </div>
      </div>

      {/* Scope 2 Benchmarks Stacked Below */}
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
                <Award className="w-4 h-4 text-purple-500 shrink-0" />
                <span>SaaS Performance & Reliability Benchmarks</span>
                {onJustifyMetric && (
                  <button
                    type="button"
                    onClick={() => onJustifyMetric('benchmarksPanel', 'B')}
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
              <span className="text-slate-600 dark:text-slate-400">P95 Response Time Benchmark</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{p95B} ms (&lt; 180 ms target)</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-600 dark:text-slate-400">P99 Spike Latency Benchmark</span>
              <span className="font-bold text-cyan-600 dark:text-cyan-400">{p99B} ms (&lt; 450 ms target)</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-600 dark:text-slate-400">HTTP 5xx Server Error Rate</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{errB}%</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600 dark:text-slate-400">Infrastructure Stress Level</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                errB > 1.0 
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                  : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
              }`}>
                {errB > 1.0 ? 'Elevated Load Warning' : 'Under 40% CPU Capacity'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
