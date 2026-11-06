/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Camera, HelpCircle } from 'lucide-react';
import { KPIActionToolbar, StackedProgressBar } from '../../../kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const ExecutiveTestSuiteSnapshotKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  onJustifyMetric,
  onRemove
}) => {
  const dist = metrics.testDistributionAll;
  const distB = metricsB?.testDistributionAll;

  return (
    <div className="space-y-4 relative group">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}

      {/* Scope 1 Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
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
              <Camera className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Enterprise Test Suite Execution Snapshot ({dist.total.toLocaleString()} Executed Tests)</span>
              {onJustifyMetric && (
                <button
                  type="button"
                  onClick={() => onJustifyMetric('testDistribution', 'A')}
                  className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  title="Click for KPI justification and audit details"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              )}
            </h4>
          </div>
        </div>
        <StackedProgressBar
          distribution={dist}
          title="Consolidated QA Execution Health (Automated + Manual)"
          onJustify={() => onJustifyMetric?.('testDistribution', 'A')}
        />
      </div>

      {/* Scope 2 Card Stacked Below */}
      {isCompareMode && distB && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="space-y-1.5 pb-2 border-b border-slate-100 dark:border-slate-800 pr-6">
            <div 
              className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider cursor-help"
              title={scopeBLabel}
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
              <span className="truncate">{scopeBLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Enterprise Test Suite Execution Snapshot ({distB.total.toLocaleString()} Executed Tests)</span>
                {onJustifyMetric && (
                  <button
                    type="button"
                    onClick={() => onJustifyMetric('testDistribution', 'B')}
                    className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="Click for Scope 2 KPI justification and audit details"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </h4>
            </div>
          </div>
          <StackedProgressBar
            distribution={distB}
            title="Consolidated QA Execution Health (Scope B)"
            scopeLabel={scopeBLabel}
            scopeType="secondary"
            onJustify={() => onJustifyMetric?.('testDistribution', 'B')}
          />
        </div>
      )}
    </div>
  );
};
