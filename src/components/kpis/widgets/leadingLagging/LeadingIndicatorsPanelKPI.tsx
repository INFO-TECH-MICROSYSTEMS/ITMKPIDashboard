/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { ArrowUpRight, HelpCircle } from 'lucide-react';
import { KPIActionToolbar } from '../../../kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const LeadingIndicatorsPanelKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  onJustifyMetric,
  onRemove
}) => {
  const leadingA = metrics.leadingLaggingMetrics?.leadingIndicators?.map(ind => ({
    name: ind.name,
    target: ind.target,
    value: ind.formattedValue,
    isPassing: ind.status === 'Optimal',
    description: ind.predictiveInsight
  })) || [
    { name: 'PR Code Quality Gate Compliance', target: '≥ 85.0%', value: '70.6%', isPassing: false, description: 'Predicts regression injection likelihood before code merges' },
    { name: 'High Dependency Coupling Ratio', target: '< 10.0%', value: '38%', isPassing: false, description: 'Early indicator of cross-service architectural blast radius' },
    { name: 'In-Flight Automated Test Coverage', target: '≥ 75.0%', value: '80.8%', isPassing: true, description: 'Predicts whether regression verification can complete on time' },
    { name: 'Exploratory & Ad-Hoc Shift-Left Ratio', target: '15.0% - 35.0%', value: '31.1%', isPassing: true, description: 'Proactive probing ratio to catch blind spots' }
  ];

  const leadingB = metricsB?.leadingLaggingMetrics?.leadingIndicators?.map(ind => ({
    name: ind.name,
    target: ind.target,
    value: ind.formattedValue,
    isPassing: ind.status === 'Optimal',
    description: ind.predictiveInsight
  })) || [
    { name: 'PR Code Quality Gate Compliance', target: '≥ 85.0%', value: '64.2%', isPassing: false, description: 'Predicts regression injection likelihood before code merges' },
    { name: 'High Dependency Coupling Ratio', target: '< 10.0%', value: '42%', isPassing: false, description: 'Early indicator of cross-service architectural blast radius' },
    { name: 'In-Flight Automated Test Coverage', target: '≥ 75.0%', value: '78.5%', isPassing: true, description: 'Predicts whether regression verification can complete on time' },
    { name: 'Exploratory & Ad-Hoc Shift-Left Ratio', target: '15.0% - 35.0%', value: '28.4%', isPassing: true, description: 'Proactive probing ratio to catch blind spots' }
  ];

  return (
    <div className="space-y-4 relative group">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}

      {/* Scope 1 Leading Indicators */}
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
            <div>
              <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>Leading Indicators (Predictive & In-Flight)</span>
                {onJustifyMetric && (
                  <button
                    type="button"
                    onClick={() => onJustifyMetric('leadingIndicatorsPanel', 'A')}
                    className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="Click for KPI justification and audit details"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Signals measured before release gating to forecast outcome risks
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-800">
              Shift-Left
            </span>
          </div>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {leadingA.map((ind) => (
            <div key={ind.name} className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-800 dark:text-slate-200">{ind.name}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Target: {ind.target} • {ind.description}</div>
              </div>
              <span className={`text-base font-black ${ind.isPassing ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {ind.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scope 2 Leading Indicators Stacked Below */}
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
              <div>
                <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>Leading Indicators (Predictive & In-Flight)</span>
                  {onJustifyMetric && (
                    <button
                      type="button"
                      onClick={() => onJustifyMetric('leadingIndicatorsPanel', 'B')}
                      className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                      title="Click for Scope 2 KPI justification and audit details"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Signals measured before release gating to forecast outcome risks
                </p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-800">
                Shift-Left
              </span>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {leadingB.map((ind) => (
              <div key={ind.name} className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{ind.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Target: {ind.target} • {ind.description}</div>
                </div>
                <span className={`text-base font-black ${ind.isPassing ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {ind.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
