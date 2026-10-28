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

export const AutomationBurnoutVelocityForecastKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  onJustifyMetric,
  onRemove
}) => {
  const forecast = metrics.testAutomationForecast;
  if (!forecast) return null;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 relative">
      <KPIActionToolbar
        onJustify={() => onJustifyMetric?.('testAutomationForecast')}
        onRemove={onRemove}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800 pr-16">
        <div>
          <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
            Test Automation Burnout & Predictive Velocity Forecast
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total tests, automated tests, and remaining manual tests over time with forecast projection
          </p>
        </div>
        <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-full border bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
          ● On Schedule
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Daily Automation Velocity</div>
          <div className="text-lg font-bold font-['Outfit'] text-slate-900 dark:text-white mt-1">
            {forecast.currentDailyVelocity} <span className="text-xs font-normal text-slate-500">tests/Days</span>
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Manual Tests Remaining</div>
          <div className="text-lg font-bold font-['Outfit'] text-amber-600 dark:text-amber-400 mt-1">
            {forecast.manualTestsRemaining} Tests
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Projected Automation Runway</div>
          <div className="text-lg font-bold font-['Outfit'] text-cyan-600 dark:text-cyan-400 mt-1">
            {forecast.daysToAllAutomated} Days
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Projected 100% Automated</div>
          <div className="text-lg font-bold font-['Outfit'] text-slate-900 dark:text-white mt-1">
            {forecast.estimatedAllAutomatedDate}
          </div>
        </div>
      </div>

      <AreaTrendChart
        data={forecast.historyAndForecast}
        title="Test Automation Burnout & Predictive Velocity Forecast"
        series1Name="Total Tests"
        series2Name="Automated Tests"
        series3Name="Manual Tests"
        series1Color="#f43f5e"
        series2Color="#10b981"
        series3Color="#f59e0b"
        projectionLineColor="#06b6d4"
        series3ProjectionLineColor="#06b6d4"
        forecastBadge={`Target 100% Automated: ${forecast.estimatedAllAutomatedDate}`}
        forecastStatus="emerald"
        height={220}
        onJustify={() => onJustifyMetric?.('testAutomationForecast')}
      />
    </div>
  );
};
