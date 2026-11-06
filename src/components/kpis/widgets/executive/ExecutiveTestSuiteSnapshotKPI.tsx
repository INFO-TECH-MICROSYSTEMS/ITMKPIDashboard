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
  onJustifyMetric,
  onRemove
}) => {
  const dist = metrics.testDistributionAll;
  const distB = metricsB?.testDistributionAll;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 relative">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}
      <div className="pr-6">
        <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
          <Camera className="w-4 h-4 text-blue-500 shrink-0" />
          <span>Enterprise Test Suite Execution Snapshot ({dist.total.toLocaleString()} Executed Tests)</span>
          {onJustifyMetric && (
            <button
              type="button"
              onClick={() => onJustifyMetric('testDistribution')}
              className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
              title="Click for KPI justification and audit details"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          )}
        </h4>
      </div>
      <StackedProgressBar
        distribution={dist}
        title="Consolidated QA Execution Health (Automated + Manual)"
        onJustify={() => onJustifyMetric?.('testDistribution', 'A')}
      />
      {isCompareMode && distB && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <StackedProgressBar
            distribution={distB}
            title="Consolidated QA Execution Health (Scope B)"
            scopeLabel="Scope B"
            scopeType="secondary"
            onJustify={() => onJustifyMetric?.('testDistribution', 'B')}
          />
        </div>
      )}
    </div>
  );
};
