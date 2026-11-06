/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Layers, HelpCircle } from 'lucide-react';
import { KPIActionToolbar } from '../../../kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const RiskHighDependencyDepthListKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  onJustifyMetric,
  onRemove
}) => {
  const jiraItems = metrics.jiraItems || [];
  const highDependencyItems = jiraItems.filter(i => i.dependencyDepth >= 4);

  const jiraItemsB = metricsB?.jiraItems || [];
  const highDependencyItemsB = jiraItemsB.filter(i => i.dependencyDepth >= 4);

  return (
    <div className="space-y-4 relative group">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}

      {/* Scope 1 High Dependency Depth */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
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
            <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500 shrink-0" />
              <span>High Dependency Depth Items ({highDependencyItems.length})</span>
              {onJustifyMetric && (
                <button
                  type="button"
                  onClick={() => onJustifyMetric('highDependencyDepth', 'A')}
                  className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  title="Click for KPI justification and audit details"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              )}
            </span>
            <span className="text-[10px] font-mono text-slate-400">Coupling Risk</span>
          </div>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {highDependencyItems.slice(0, 4).map(item => (
            <div key={item.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex justify-between font-mono font-bold text-slate-900 dark:text-white">
                <span className="text-cyan-600 dark:text-cyan-400">{item.id}</span>
                <span className="text-purple-600 dark:text-purple-400">Depth: {item.dependencyDepth}</span>
              </div>
              <div className="text-slate-600 dark:text-slate-300 truncate mt-0.5">{item.title}</div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">Cross-team testing recommended</div>
            </div>
          ))}
          {highDependencyItems.length === 0 && (
            <div className="text-xs text-slate-400 py-4 text-center">No high dependency items detected.</div>
          )}
        </div>
      </div>

      {/* Scope 2 High Dependency Depth Stacked Below */}
      {isCompareMode && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="space-y-1.5 pb-2 border-b border-slate-100 dark:border-slate-800 pr-6">
            <div 
              className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider cursor-help"
              title={scopeBLabel}
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
              <span className="truncate">{scopeBLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-500 shrink-0" />
                <span>High Dependency Depth Items ({highDependencyItemsB.length})</span>
                {onJustifyMetric && (
                  <button
                    type="button"
                    onClick={() => onJustifyMetric('highDependencyDepth', 'B')}
                    className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="Click for Scope 2 KPI justification and audit details"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </span>
              <span className="text-[10px] font-mono text-slate-400">Coupling Risk</span>
            </div>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {highDependencyItemsB.slice(0, 4).map(item => (
              <div key={item.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex justify-between font-mono font-bold text-slate-900 dark:text-white">
                  <span className="text-cyan-600 dark:text-cyan-400">{item.id}</span>
                  <span className="text-purple-600 dark:text-purple-400">Depth: {item.dependencyDepth}</span>
                </div>
                <div className="text-slate-600 dark:text-slate-300 truncate mt-0.5">{item.title}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">Cross-team testing recommended</div>
              </div>
            ))}
            {highDependencyItemsB.length === 0 && (
              <div className="text-xs text-slate-400 py-4 text-center">No high dependency items detected in Scope 2.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
