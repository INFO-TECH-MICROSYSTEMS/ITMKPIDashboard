/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { BaseKPIWidget, type BaseKPIWidgetProps } from './BaseKPIWidget';

export interface BaseGaugeWidgetProps extends Omit<BaseKPIWidgetProps, 'children'> {
  score: number; // 0 - 100
  size?: number;
  grade?: string;
  gaugeStatus?: 'emerald' | 'amber' | 'rose' | 'cyan';
  label?: string;
}

/**
 * BaseGaugeWidget: Extends BaseKPIWidget for circular gauge meters.
 * Encapsulates the SVG arc drawing, dynamic color selection based on threshold,
 * readiness grades, and layout consistency.
 */
export const BaseGaugeWidget: React.FC<BaseGaugeWidgetProps> = ({
  score,
  size = 170,
  grade,
  gaugeStatus,
  label,
  ...baseProps
}) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  let strokeColor = '#10b981'; // Emerald
  if (gaugeStatus === 'rose' || score < 50) strokeColor = '#f43f5e';
  else if (gaugeStatus === 'amber' || score < 75) strokeColor = '#f59e0b';
  else if (gaugeStatus === 'cyan' || score < 90) strokeColor = '#06b6d4';

  return (
    <BaseKPIWidget {...baseProps}>
      <div className="flex flex-col items-center justify-center p-2 relative">
        <div className="relative" style={{ width: size, height: size }}>
          <svg className="transform -rotate-90" width={size} height={size}>
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-slate-100 dark:text-slate-800"
              fill="transparent"
            />
            {/* Animated progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center score readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
              {score}%
            </span>
            {grade && (
              <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded-full mt-1 border ${
                score < 50
                  ? 'text-rose-700 bg-rose-100 border-rose-300 dark:text-rose-300 dark:bg-rose-950/80 dark:border-rose-700'
                  : score < 75
                  ? 'text-amber-700 bg-amber-100 border-amber-300 dark:text-amber-300 dark:bg-amber-950/80 dark:border-amber-700'
                  : 'text-emerald-700 bg-emerald-100 border-emerald-300 dark:text-emerald-300 dark:bg-emerald-950/80 dark:border-emerald-700'
              }`}>
                Grade {grade}
              </span>
            )}
          </div>
        </div>

        {label && (
          <span className="mt-2 text-xs font-mono text-slate-500 dark:text-slate-400 text-center">
            {label}
          </span>
        )}
      </div>
    </BaseKPIWidget>
  );
};
