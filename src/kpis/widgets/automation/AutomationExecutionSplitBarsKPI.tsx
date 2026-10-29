/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { KPIActionToolbar, StackedProgressBar } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const AutomationExecutionSplitBarsKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  onJustifyMetric,
  onRemove
}) => {
  const autoDist = metrics.testDistributionAutomated || { passed: 750, failed: 76, blocked: 40, unattempted: 21, total: 887, passRate: 84.6 };
  const manualDist = metrics.testDistributionManual || { passed: 173, failed: 20, blocked: 13, unattempted: 5, total: 211, passRate: 82.0 };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 relative">
        <KPIActionToolbar
          onJustify={() => onJustifyMetric?.('automatedTestExecution')}
          onRemove={onRemove}
        />
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 pr-16">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono flex items-center gap-1.5">
            <span>Automated Test Execution</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">(81% of Suite)</span>
          </span>
        </div>
        <StackedProgressBar
          distribution={autoDist}
          title="Automated Test Execution"
          onJustify={() => onJustifyMetric?.('automatedTestExecution')}
        />
      </div>

      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 relative">
        <KPIActionToolbar
          onJustify={() => onJustifyMetric?.('manualExploratoryExecution')}
        />
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 pr-16">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono flex items-center gap-1.5">
            <span>Manual Exploratory Execution</span>
            <span className="text-purple-600 dark:text-purple-400 font-semibold">(19% of Suite)</span>
          </span>
        </div>
        <StackedProgressBar
          distribution={manualDist}
          title="Manual Exploratory Execution"
          onJustify={() => onJustifyMetric?.('manualExploratoryExecution')}
        />
      </div>
    </div>
  );
};
