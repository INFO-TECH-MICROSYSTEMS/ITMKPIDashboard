/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { StackedProgressBar, KPIActionToolbar } from '../../../components/kpi/VisualWidgets';
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
      <KPIActionToolbar
        onJustify={() => onJustifyMetric?.('testDistribution')}
        onRemove={onRemove}
      />
      <div className="pr-16">
        <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
          Enterprise Test Suite Execution Snapshot ({dist.total.toLocaleString()} Executed Tests)
        </h4>
      </div>
      <StackedProgressBar
        distribution={dist}
        title="Consolidated QA Execution Health (Automated + Manual)"
        onJustify={() => onJustifyMetric?.('testDistribution')}
      />
      {isCompareMode && distB && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <StackedProgressBar
            distribution={distB}
            title="Consolidated QA Execution Health (Scope B)"
            scopeLabel="Scope B"
            scopeType="secondary"
            onJustify={() => onJustifyMetric?.('testDistribution')}
          />
        </div>
      )}
    </div>
  );
};
