/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { KPIActionToolbar } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const RiskBlockedDevelopmentItemsKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  onJustifyMetric,
  onRemove
}) => {
  const jiraItems = metrics.jiraItems || [];
  const blockedItems = jiraItems.filter(i => i.status === 'Blocked');

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 relative">
      <KPIActionToolbar
        onJustify={() => onJustifyMetric?.('blockedDevelopmentItems')}
        onRemove={onRemove}
      />

      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 pr-16">
        <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500" />
          <span>Blocked Development Items ({blockedItems.length})</span>
        </span>
        <span className="text-[10px] font-mono text-slate-400">Stalled in Sprint</span>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {blockedItems.slice(0, 4).map(item => (
          <div key={item.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex justify-between font-mono font-bold text-slate-900 dark:text-white">
              <span className="text-rose-600 dark:text-rose-400">{item.id}</span>
              <span className="text-slate-500">{item.severity}</span>
            </div>
            <div className="text-slate-600 dark:text-slate-300 truncate mt-0.5">{item.title}</div>
            <div className="text-[10px] font-mono text-slate-400 mt-1 flex justify-between">
              <span>{item.component}</span>
              <span>{item.assignee || 'Unassigned'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
