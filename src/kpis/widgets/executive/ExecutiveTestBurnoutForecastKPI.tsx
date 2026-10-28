/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { AreaTrendChart, KPIActionToolbar } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const ExecutiveTestBurnoutForecastKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  onJustifyMetric,
  onRemove
}) => {
  const forecast = metrics.testBurnoutForecast;
  const forecastB = metricsB?.testBurnoutForecast;

  if (!forecast) return null;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 relative">
      <KPIActionToolbar
        onJustify={() => onJustifyMetric?.('testBurnoutForecast')}
        onRemove={onRemove}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800 pr-16">
        <div>
          <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
            Test Execution Burnout & Predictive Velocity Forecast
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total tests, completed tests, and remaining unexecuted tests over time with forecast projection
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-full border ${
            forecast.isVelocityHealthy 
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
              : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
          }`}>
            {forecast.isVelocityHealthy ? '● On Schedule' : '▲ Velocity At Risk'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Daily Execution Velocity</div>
          <div className="text-lg font-bold font-['Outfit'] text-slate-900 dark:text-white mt-1">
            {forecast.currentDailyVelocity.toLocaleString()} <span className="text-xs font-normal text-slate-500">tests/day</span>
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Untested Remaining</div>
          <div className="text-lg font-bold font-['Outfit'] text-amber-600 dark:text-amber-400 mt-1">
            {forecast.remainingUntested.toLocaleString()} <span className="text-xs font-normal text-slate-500">tests</span>
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Projected Runway</div>
          <div className="text-lg font-bold font-['Outfit'] text-cyan-600 dark:text-cyan-400 mt-1">
            {forecast.daysToCompletion} <span className="text-xs font-normal text-slate-500">Days</span>
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Projected All Completed</div>
          <div className="text-lg font-bold font-['Outfit'] text-slate-900 dark:text-white mt-1">
            {forecast.estimatedCompletionDate}
          </div>
        </div>
      </div>

      <AreaTrendChart
        data={forecast.historyAndForecast}
        title="Test Execution Burnout & Predictive Velocity Forecast"
        series1Name="Total Tests"
        series2Name="Completed Tests"
        series3Name="Remaining Tests"
        series1Color="#f43f5e"
        series2Color="#10b981"
        series3Color="#f59e0b"
        projectionLineColor="#06b6d4"
        series3ProjectionLineColor="#06b6d4"
        forecastBadge={`Target Complete: ${forecast.estimatedCompletionDate}`}
        forecastStatus={forecast.isVelocityHealthy ? 'emerald' : 'amber'}
        height={220}
        onJustify={() => onJustifyMetric?.('testBurnoutForecast')}
      />

      {isCompareMode && forecastB && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <AreaTrendChart
            data={forecastB.historyAndForecast}
            title="Scope B: Execution Burnout & Velocity Forecast"
            scopeLabel="Scope B"
            scopeType="secondary"
            series1Name="Total Tests"
            series2Name="Completed Tests"
            series3Name="Remaining Tests"
            series1Color="#f43f5e"
            series2Color="#10b981"
            series3Color="#f59e0b"
            projectionLineColor="#a855f7"
            series3ProjectionLineColor="#a855f7"
            forecastBadge={`Target Complete: ${forecastB.estimatedCompletionDate}`}
            forecastStatus={forecastB.isVelocityHealthy ? 'emerald' : 'amber'}
            height={220}
            onJustify={() => onJustifyMetric?.('testBurnoutForecast')}
          />
        </div>
      )}
    </div>
  );
};
