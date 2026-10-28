/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Eye } from 'lucide-react';
import { KPIActionToolbar } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const GovernanceAccessibilityAuditPanelKPI: React.FC<KPIWidgetRenderProps> = ({
  onJustifyMetric,
  onRemove
}) => {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 relative">
      <KPIActionToolbar
        onJustify={() => onJustifyMetric?.('accessibilityAuditPanel')}
        onRemove={onRemove}
      />

      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 pr-16">
        <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan-500" />
          <span>Accessibility (WCAG 2.2 AA) Audit</span>
        </h4>
      </div>

      <div className="space-y-3 font-mono text-xs">
        <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
          <span className="text-slate-600 dark:text-slate-400">Color Contrast Ratios (AA & AAA)</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">100% Pass (7:1 High Contrast)</span>
        </div>
        <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
          <span className="text-slate-600 dark:text-slate-400">Keyboard Navigation & Focus Traps</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">0 Traps Detected</span>
        </div>
        <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
          <span className="text-slate-600 dark:text-slate-400">Screen Reader ARIA Compatibility</span>
          <span className="font-bold text-cyan-600 dark:text-cyan-400">87.1% Suite Pass Rate</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-slate-600 dark:text-slate-400">Audit Status</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            Conditional Pass
          </span>
        </div>
      </div>
    </div>
  );
};
