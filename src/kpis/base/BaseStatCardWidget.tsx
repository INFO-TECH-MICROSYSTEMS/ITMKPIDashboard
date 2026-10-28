/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BaseKPIWidget, type BaseKPIWidgetProps } from './BaseKPIWidget';

export interface BaseStatCardWidgetProps extends Omit<BaseKPIWidgetProps, 'children'> {
  value: string | number;
  target?: string;
  trend?: string;
  trendPositive?: boolean;
  statusBadge?: string;
  statusColor?: 'emerald' | 'amber' | 'rose' | 'cyan' | 'purple';
  icon?: React.ReactNode;
  
  // Dual-scope comparison parameters
  isComparing?: boolean;
  scopeALabel?: string;
  scopeBLabel?: string;
  compareValue?: string | number;
  compareTarget?: string;
  compareTrend?: string;
  compareTrendPositive?: boolean;
  compareStatusBadge?: string;
  compareStatusColor?: 'emerald' | 'amber' | 'rose' | 'cyan' | 'purple';
  delta?: string;
  deltaPositive?: boolean;
}

const colorMap = {
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800/60',
  amber: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800/60',
  rose: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800/60',
  cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-400 dark:border-cyan-800/60',
  purple: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-400 dark:border-purple-800/60',
};

/**
 * BaseStatCardWidget: Extends BaseKPIWidget for metric summary cards.
 * Provides unified number formatting, status badge coloring, delta badges,
 * and seamless dual-scope comparative rendering.
 */
export const BaseStatCardWidget: React.FC<BaseStatCardWidgetProps> = ({
  value,
  target,
  trend,
  trendPositive,
  statusBadge,
  statusColor = 'emerald',
  icon,
  isComparing = false,
  scopeALabel = 'Scope A',
  scopeBLabel = 'Scope B',
  compareValue,
  compareTarget,
  compareTrend,
  compareTrendPositive,
  compareStatusBadge,
  compareStatusColor = 'cyan',
  delta,
  deltaPositive,
  ...baseProps
}) => {
  return (
    <BaseKPIWidget {...baseProps}>
      {!isComparing ? (
        // Standard Single-Scope Card Layout
        <div className="flex flex-col justify-between h-full pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
                {value}
              </span>
              {target && (
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                  / {target}
                </span>
              )}
            </div>

            {icon && (
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-cyan-600 dark:text-cyan-400 shrink-0">
                {icon}
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
            {trend && (
              <div className={`flex items-center gap-1 text-xs font-semibold font-mono ${
                trendPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
              }`}>
                {trendPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                <span>{trend}</span>
              </div>
            )}

            {statusBadge && (
              <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${colorMap[statusColor]}`}>
                {statusBadge}
              </span>
            )}
          </div>
        </div>
      ) : (
        // Dual-Scope Comparison Layout
        <div className="flex flex-col gap-3 pt-1">
          <div className="grid grid-cols-2 gap-3 divide-x divide-slate-200 dark:divide-slate-800">
            {/* Scope A */}
            <div className="flex flex-col pr-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {scopeALabel}
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
                  {value}
                </span>
              </div>
              {statusBadge && (
                <span className={`mt-2 text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-full border w-fit ${colorMap[statusColor]}`}>
                  {statusBadge}
                </span>
              )}
            </div>

            {/* Scope B */}
            <div className="flex flex-col pl-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                {scopeBLabel}
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl sm:text-2xl font-black font-mono text-cyan-600 dark:text-cyan-300">
                  {compareValue ?? '—'}
                </span>
              </div>
              {compareStatusBadge && (
                <span className={`mt-2 text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-full border w-fit ${colorMap[compareStatusColor]}`}>
                  {compareStatusBadge}
                </span>
              )}
            </div>
          </div>

          {/* Delta Indicator */}
          {delta && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 dark:text-slate-500 text-[11px] font-mono">Scope Variance:</span>
              <span className={`font-mono font-semibold ${
                deltaPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
              }`}>
                {delta}
              </span>
            </div>
          )}
        </div>
      )}
    </BaseKPIWidget>
  );
};
