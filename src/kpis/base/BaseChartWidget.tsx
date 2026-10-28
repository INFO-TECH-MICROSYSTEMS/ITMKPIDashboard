/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { BaseKPIWidget, type BaseKPIWidgetProps } from './BaseKPIWidget';
import type { TrendPoint } from '../../types/kpiPlatform';

export interface BaseChartWidgetProps extends Omit<BaseKPIWidgetProps, 'children'> {
  data: TrendPoint[];
  series1Name: string;
  series2Name?: string;
  series3Name?: string;
  series1Color?: string;
  series2Color?: string;
  series3Color?: string;
  height?: number;
}

/**
 * BaseChartWidget: Extends BaseKPIWidget for responsive SVG multi-series trend charts.
 * Automatically computes coordinate scales, grid lines, path rendering, and legends.
 */
export const BaseChartWidget: React.FC<BaseChartWidgetProps> = ({
  data,
  series1Name,
  series2Name,
  series3Name,
  series1Color = '#f43f5e',
  series2Color = '#10b981',
  series3Color = '#f59e0b',
  height = 160,
  ...baseProps
}) => {
  if (!data || data.length === 0) {
    return (
      <BaseKPIWidget {...baseProps}>
        <div className="flex items-center justify-center h-36 text-slate-400 text-xs font-mono">
          No trend telemetry available
        </div>
      </BaseKPIWidget>
    );
  }

  const values = data.flatMap(d => [d.value1, d.value2 ?? 0, d.value3 ?? 0]);
  const maxValue = Math.max(...values, 10);
  const width = 450;
  const padding = 25;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const getPoints = (key: 'value1' | 'value2' | 'value3') => {
    return data.map((d, index) => {
      const val = d[key] ?? 0;
      const x = padding + (index / (data.length - 1 || 1)) * graphWidth;
      const y = height - padding - (val / maxValue) * graphHeight;
      return `${x},${y}`;
    }).join(' ');
  };

  const getAreaPath = (key: 'value1' | 'value2' | 'value3') => {
    const points = data.map((d, index) => {
      const val = d[key] ?? 0;
      const x = padding + (index / (data.length - 1 || 1)) * graphWidth;
      const y = height - padding - (val / maxValue) * graphHeight;
      return `${x},${y}`;
    });
    if (points.length === 0) return '';
    const firstX = padding;
    const lastX = padding + graphWidth;
    const baselineY = height - padding;
    return `M ${firstX},${baselineY} L ${points.join(' L ')} L ${lastX},${baselineY} Z`;
  };

  return (
    <BaseKPIWidget {...baseProps}>
      <div className="w-full flex flex-col justify-between pt-2">
        {/* SVG Visualization */}
        <div className="w-full overflow-hidden">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id={`grad-s1-${baseProps.id || 'widget'}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={series1Color} stopOpacity="0.25" />
                <stop offset="100%" stopColor={series1Color} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 0.5, 1].map((ratio, idx) => {
              const y = padding + graphHeight * ratio;
              return (
                <line
                  key={idx}
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="currentColor"
                  strokeDasharray="3 3"
                  className="text-slate-100 dark:text-slate-800"
                />
              );
            })}

            {/* Area fill */}
            <path d={getAreaPath('value1')} fill={`url(#grad-s1-${baseProps.id || 'widget'})`} />

            {/* Trend Polylines */}
            <polyline fill="none" stroke={series1Color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={getPoints('value1')} />
            {series2Name && (
              <polyline fill="none" stroke={series2Color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={getPoints('value2')} />
            )}
            {series3Name && (
              <polyline fill="none" stroke={series3Color} strokeWidth="2" strokeDasharray="4 4" points={getPoints('value3')} />
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: series1Color }} />
            <span>{series1Name}</span>
          </div>
          {series2Name && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: series2Color }} />
              <span>{series2Name}</span>
            </div>
          )}
          {series3Name && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: series3Color }} />
              <span>{series3Name}</span>
            </div>
          )}
        </div>
      </div>
    </BaseKPIWidget>
  );
};
