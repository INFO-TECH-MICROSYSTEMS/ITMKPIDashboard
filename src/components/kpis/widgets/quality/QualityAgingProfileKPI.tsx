/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Clock, HelpCircle } from 'lucide-react';
import { KPIActionToolbar } from '../../../kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const QualityAgingProfileKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  onJustifyMetric,
  onRemove
}) => {
  const aging = metrics.agingBuckets || { pending7Days: 0, pending7To14Days: 0, pending14To21Days: 202, pending21PlusDays: 61 };
  const totalAgingItems = aging.pending7Days + aging.pending7To14Days + aging.pending14To21Days + aging.pending21PlusDays;

  const agingB = metricsB?.agingBuckets || { pending7Days: 0, pending7To14Days: 0, pending14To21Days: 140, pending21PlusDays: 45 };
  const totalAgingItemsB = agingB.pending7Days + agingB.pending7To14Days + agingB.pending14To21Days + agingB.pending21PlusDays;

  return (
    <div className="space-y-4 relative group">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}

      {/* Scope 1 Aging Profile Card */}
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
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Items Pending Testing Aging Profile</span>
                {onJustifyMetric && (
                  <button
                    type="button"
                    onClick={() => onJustifyMetric('agingProfile', 'A')}
                    className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="Click for KPI justification and audit details"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Backlog latency for items queued in "Under QA" state before verification completion.
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
              Total In QA Queue: {totalAgingItems} Items
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* < 7 Days */}
          <div 
            onClick={() => onJustifyMetric?.('agingProfileUnder7', 'A')}
            className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 cursor-pointer hover:shadow-md transition-shadow"
          >
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 block font-mono">
              &lt; 7 Days Pending
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-700 dark:text-emerald-400">
                {aging.pending7Days}
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                Fresh / Healthy
              </span>
            </div>
            <div className="w-full bg-emerald-200 dark:bg-emerald-900/60 h-1.5 rounded-full mt-2">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full" 
                style={{ width: `${(aging.pending7Days / Math.max(1, totalAgingItems)) * 100}%` }}
              />
            </div>
          </div>

          {/* 7 - 14 Days */}
          <div 
            onClick={() => onJustifyMetric?.('agingProfile7To14', 'A')}
            className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/30 cursor-pointer hover:shadow-md transition-shadow"
          >
            <span className="text-xs font-semibold text-cyan-800 dark:text-cyan-300 block font-mono">
              7 - 14 Days Pending
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-700 dark:text-cyan-400">
                {aging.pending7To14Days}
              </span>
              <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                Normal Cadence
              </span>
            </div>
            <div className="w-full bg-cyan-200 dark:bg-cyan-900/60 h-1.5 rounded-full mt-2">
              <div 
                className="bg-cyan-500 h-1.5 rounded-full" 
                style={{ width: `${(aging.pending7To14Days / Math.max(1, totalAgingItems)) * 100}%` }}
              />
            </div>
          </div>

          {/* 14 - 21 Days */}
          <div 
            onClick={() => onJustifyMetric?.('agingProfile14To21', 'A')}
            className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 cursor-pointer hover:shadow-md transition-shadow"
          >
            <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 block font-mono">
              14 - 21 Days Pending
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-amber-700 dark:text-amber-400">
                {aging.pending14To21Days}
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                At Risk
              </span>
            </div>
            <div className="w-full bg-amber-200 dark:bg-amber-900/60 h-1.5 rounded-full mt-2">
              <div 
                className="bg-amber-500 h-1.5 rounded-full" 
                style={{ width: `${(aging.pending14To21Days / Math.max(1, totalAgingItems)) * 100}%` }}
              />
            </div>
          </div>

          {/* 21+ Days */}
          <div 
            onClick={() => onJustifyMetric?.('agingProfile21Plus', 'A')}
            className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 cursor-pointer hover:shadow-md transition-shadow"
          >
            <span className="text-xs font-semibold text-rose-800 dark:text-rose-300 block font-mono">
              21+ Days (Stale / Gated)
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-rose-700 dark:text-rose-400">
                {aging.pending21PlusDays}
              </span>
              <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">
                Critical SLA Breach
              </span>
            </div>
            <div className="w-full bg-rose-200 dark:bg-rose-900/60 h-1.5 rounded-full mt-2">
              <div 
                className="bg-rose-500 h-1.5 rounded-full" 
                style={{ width: `${(aging.pending21PlusDays / Math.max(1, totalAgingItems)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scope 2 Aging Profile Card Stacked Below */}
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
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>Items Pending Testing Aging Profile</span>
                  {onJustifyMetric && (
                    <button
                      type="button"
                      onClick={() => onJustifyMetric('agingProfile', 'B')}
                      className="p-0.5 rounded-full text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                      title="Click for Scope 2 KPI justification and audit details"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Backlog latency for items queued in "Under QA" state before verification completion.
                </p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800">
                Total In QA Queue: {totalAgingItemsB} Items
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* < 7 Days */}
            <div 
              onClick={() => onJustifyMetric?.('agingProfileUnder7', 'B')}
              className="p-4 rounded-xl bg-purple-50/20 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 cursor-pointer hover:shadow-md transition-shadow"
            >
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block font-mono">
                &lt; 7 Days Pending
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-black font-mono text-purple-700 dark:text-purple-400">
                  {agingB.pending7Days}
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  Fresh / Healthy
                </span>
              </div>
              <div className="w-full bg-purple-100 dark:bg-purple-900/40 h-1.5 rounded-full mt-2">
                <div 
                  className="bg-purple-500 h-1.5 rounded-full" 
                  style={{ width: `${(agingB.pending7Days / Math.max(1, totalAgingItemsB)) * 100}%` }}
                />
              </div>
            </div>

            {/* 7 - 14 Days */}
            <div 
              onClick={() => onJustifyMetric?.('agingProfile7To14', 'B')}
              className="p-4 rounded-xl bg-purple-50/20 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 cursor-pointer hover:shadow-md transition-shadow"
            >
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block font-mono">
                7 - 14 Days Pending
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-black font-mono text-purple-700 dark:text-purple-400">
                  {agingB.pending7To14Days}
                </span>
                <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                  Normal Cadence
                </span>
              </div>
              <div className="w-full bg-purple-100 dark:bg-purple-900/40 h-1.5 rounded-full mt-2">
                <div 
                  className="bg-purple-500 h-1.5 rounded-full" 
                  style={{ width: `${(agingB.pending7To14Days / Math.max(1, totalAgingItemsB)) * 100}%` }}
                />
              </div>
            </div>

            {/* 14 - 21 Days */}
            <div 
              onClick={() => onJustifyMetric?.('agingProfile14To21', 'B')}
              className="p-4 rounded-xl bg-purple-50/20 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 cursor-pointer hover:shadow-md transition-shadow"
            >
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block font-mono">
                14 - 21 Days Pending
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-black font-mono text-amber-700 dark:text-amber-400">
                  {agingB.pending14To21Days}
                </span>
                <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                  At Risk
                </span>
              </div>
              <div className="w-full bg-purple-100 dark:bg-purple-900/40 h-1.5 rounded-full mt-2">
                <div 
                  className="bg-amber-500 h-1.5 rounded-full" 
                  style={{ width: `${(agingB.pending14To21Days / Math.max(1, totalAgingItemsB)) * 100}%` }}
                />
              </div>
            </div>

            {/* 21+ Days */}
            <div 
              onClick={() => onJustifyMetric?.('agingProfile21Plus', 'B')}
              className="p-4 rounded-xl bg-purple-50/20 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 cursor-pointer hover:shadow-md transition-shadow"
            >
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block font-mono">
                21+ Days (Stale / Gated)
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-black font-mono text-rose-700 dark:text-rose-400">
                  {agingB.pending21PlusDays}
                </span>
                <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">
                  Critical SLA Breach
                </span>
              </div>
              <div className="w-full bg-purple-100 dark:bg-purple-900/40 h-1.5 rounded-full mt-2">
                <div 
                  className="bg-rose-500 h-1.5 rounded-full" 
                  style={{ width: `${(agingB.pending21PlusDays / Math.max(1, totalAgingItemsB)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
