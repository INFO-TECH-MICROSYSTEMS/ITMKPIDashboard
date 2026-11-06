/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { TrendingDown, HelpCircle } from 'lucide-react';
import { AreaTrendChart, KPIActionToolbar } from '../../../kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const QualityDefectBurnoutChartKPI: React.FC<KPIWidgetRenderProps> = ({ 
  metrics, 
  metricsB,
  isCompareMode,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  onJustifyMetric, 
  onRemove 
}) => {
  const data = metrics.defectTrends || [
    { date: '2026-10-01', label: 'Day 1', value1: 24, value2: 18, value3: 6 },
    { date: '2026-10-03', label: 'Day 3', value1: 32, value2: 25, value3: 7 },
    { date: '2026-10-06', label: 'Day 6', value1: 45, value2: 38, value3: 7 },
    { date: '2026-10-09', label: 'Day 9', value1: 52, value2: 48, value3: 4 },
    { date: '2026-10-12', label: 'Day 12', value1: 58, value2: 56, value3: 2 }
  ];

  const dataB = metricsB?.defectTrends || [
    { date: '2026-10-01', label: 'Day 1', value1: 18, value2: 14, value3: 4 },
    { date: '2026-10-03', label: 'Day 3', value1: 25, value2: 20, value3: 5 },
    { date: '2026-10-06', label: 'Day 6', value1: 34, value2: 30, value3: 4 },
    { date: '2026-10-09', label: 'Day 9', value1: 41, value2: 38, value3: 3 },
    { date: '2026-10-12', label: 'Day 12', value1: 46, value2: 45, value3: 1 }
  ];

  return (
    <div className="space-y-4 relative group">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}

      {/* Scope 1 Burnout Chart */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
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
            <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Defect Discovery Rate vs. Defect Resolution Burnout (14-Day Velocity)</span>
              {onJustifyMetric && (
                <button
                  type="button"
                  onClick={() => onJustifyMetric('defectBurnoutTrend', 'A')}
                  className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  title="Click for KPI justification and audit details"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              )}
            </span>
          </div>
        </div>
        <AreaTrendChart
          data={data}
          title=""
          series1Name="Discovered Defects"
          series2Name="Resolved / Burned Out"
          series1Color="#f43f5e"
          series2Color="#10b981"
          height={170}
        />
      </div>

      {/* Scope 2 Burnout Chart Stacked Below */}
      {isCompareMode && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="space-y-1.5 pb-2 border-b border-slate-100 dark:border-slate-800 pr-6">
            <div 
              className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider cursor-help"
              title={scopeBLabel}
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
              <span className="truncate">{scopeBLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Defect Discovery Rate vs. Defect Resolution Burnout (14-Day Velocity)</span>
                {onJustifyMetric && (
                  <button
                    type="button"
                    onClick={() => onJustifyMetric('defectBurnoutTrend', 'B')}
                    className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="Click for Scope 2 KPI justification and audit details"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </span>
            </div>
          </div>
          <AreaTrendChart
            data={dataB}
            title=""
            series1Name="Discovered Defects"
            series2Name="Resolved / Burned Out"
            series1Color="#f43f5e"
            series2Color="#10b981"
            height={170}
          />
        </div>
      )}
    </div>
  );
};

// =========================================================================
// RISK ASSESSMENT & QUALITY GATES KPIS
// =========================================================================
