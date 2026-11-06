/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Split, HelpCircle } from 'lucide-react';
import { KPIActionToolbar, StackedProgressBar } from '../../../kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const AutomationExecutionSplitBarsKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  onJustifyMetric,
  onRemove
}) => {
  const autoDist = metrics.testDistributionAutomated || { passed: 750, failed: 76, blocked: 40, unattempted: 21, total: 887, passRate: 84.6 };
  const manualDist = metrics.testDistributionManual || { passed: 173, failed: 20, blocked: 13, unattempted: 5, total: 211, passRate: 82.0 };

  const autoDistB = metricsB?.testDistributionAutomated || { passed: 375, failed: 41, blocked: 18, unattempted: 12, total: 446, passRate: 84.1 };
  const manualDistB = metricsB?.testDistributionManual || { passed: 71, failed: 11, blocked: 5, unattempted: 12, total: 99, passRate: 71.7 };

  return (
    <div className="space-y-4 relative group">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}

      {/* Scope 1 Split Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="space-y-1 pb-2 border-b border-slate-100 dark:border-slate-800 pr-6">
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
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono flex items-center gap-1.5">
                <Split className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span>Automated Test Execution</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">(81% of Suite)</span>
                {onJustifyMetric && (
                  <button
                    type="button"
                    onClick={() => onJustifyMetric('automatedTestExecution', 'A')}
                    className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="Click for KPI justification and audit details"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </span>
            </div>
          </div>
          <StackedProgressBar
            distribution={autoDist}
            title="Automated Test Execution"
          />
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="space-y-1 pb-2 border-b border-slate-100 dark:border-slate-800 pr-6">
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
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono flex items-center gap-1.5">
                <Split className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                <span>Manual Exploratory Execution</span>
                <span className="text-purple-600 dark:text-purple-400 font-semibold">(19% of Suite)</span>
                {onJustifyMetric && (
                  <button
                    type="button"
                    onClick={() => onJustifyMetric('manualExploratoryExecution', 'A')}
                    className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="Click for KPI justification and audit details"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </span>
            </div>
          </div>
          <StackedProgressBar
            distribution={manualDist}
            title="Manual Exploratory Execution"
          />
        </div>
      </div>

      {/* Scope 2 Split Bars Stacked Below */}
      {isCompareMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="space-y-1 pb-2 border-b border-slate-100 dark:border-slate-800 pr-6">
              <div 
                className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider cursor-help"
                title={scopeBLabel}
              >
                <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                <span className="truncate">{scopeBLabel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono flex items-center gap-1.5">
                  <Split className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>Automated Test Execution</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold">(82% of Suite)</span>
                  {onJustifyMetric && (
                    <button
                      type="button"
                      onClick={() => onJustifyMetric('automatedTestExecution', 'B')}
                      className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                      title="Click for Scope 2 KPI justification and audit details"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </span>
              </div>
            </div>
            <StackedProgressBar
              distribution={autoDistB}
              title="Automated Test Execution"
            />
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="space-y-1 pb-2 border-b border-slate-100 dark:border-slate-800 pr-6">
              <div 
                className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider cursor-help"
                title={scopeBLabel}
              >
                <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                <span className="truncate">{scopeBLabel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono flex items-center gap-1.5">
                  <Split className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>Manual Exploratory Execution</span>
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">(18% of Suite)</span>
                  {onJustifyMetric && (
                    <button
                      type="button"
                      onClick={() => onJustifyMetric('manualExploratoryExecution', 'B')}
                      className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                      title="Click for Scope 2 KPI justification and audit details"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </span>
              </div>
            </div>
            <StackedProgressBar
              distribution={manualDistB}
              title="Manual Exploratory Execution"
            />
          </div>
        </div>
      )}
    </div>
  );
};
