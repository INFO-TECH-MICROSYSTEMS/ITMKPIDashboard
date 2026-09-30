/**
 * Reusable, Responsive Visual Widgets
 * Built with pure SVG, Tailwind CSS transitions, and zero third-party chart dependencies.
 * Provides high-performance, dark/light mode adaptable charts and gauges.
 */

import React from 'react';
import type { TrendPoint, TestStatusDistribution } from '../../types/kpiPlatform';

// ==========================================
// 1. CIRCULAR GAUGE METER
// ==========================================

interface GaugeMeterProps {
  score: number; // 0 - 100
  title: string;
  subtitle?: string;
  size?: number;
  grade?: string;
}

export const GaugeMeter: React.FC<GaugeMeterProps> = ({
  score,
  title,
  subtitle,
  size = 180,
  grade
}) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = '#10b981'; // Emerald
  if (score < 50) strokeColor = '#f43f5e'; // Rose
  else if (score < 75) strokeColor = '#f59e0b'; // Amber
  else if (score < 90) strokeColor = '#06b6d4'; // Cyan

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-200 dark:text-slate-800"
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
          <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
            {score}%
          </span>
          {grade && (
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 mt-0.5">
              Grade {grade}
            </span>
          )}
        </div>
      </div>

      <span className="mt-3 text-sm font-bold text-slate-900 dark:text-white text-center font-['Outfit']">
        {title}
      </span>
      {subtitle && (
        <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-0.5">
          {subtitle}
        </span>
      )}
    </div>
  );
};

// ==========================================
// 2. MULTI-SERIES SVG AREA / TREND CHART
// ==========================================

interface AreaTrendChartProps {
  data: TrendPoint[];
  title: string;
  series1Name: string;
  series2Name?: string;
  series1Color?: string;
  series2Color?: string;
  height?: number;
}

export const AreaTrendChart: React.FC<AreaTrendChartProps> = ({
  data,
  title,
  series1Name,
  series2Name,
  series1Color = '#06b6d4', // Cyan
  series2Color = '#8b5cf6', // Purple
  height = 200
}) => {
  if (!data || data.length === 0) return null;

  const maxVal = Math.max(
    ...data.map(d => Math.max(d.value1, d.value2 ?? 0)),
    8
  );

  const width = 600;
  const paddingX = 40;
  const paddingY = 25;
  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  const getX = (index: number) => paddingX + (index / (data.length - 1)) * chartW;
  const getY = (val: number) => paddingY + chartH - (val / maxVal) * chartH;

  // Build path strings
  const points1 = data.map((d, i) => `${getX(i)},${getY(d.value1)}`).join(' ');
  const area1 = `${getX(0)},${paddingY + chartH} ${points1} ${getX(data.length - 1)},${paddingY + chartH}`;

  const points2 = series2Name ? data.map((d, i) => `${getX(i)},${getY(d.value2 ?? 0)}`).join(' ') : '';
  const area2 = series2Name ? `${getX(0)},${paddingY + chartH} ${points2} ${getX(data.length - 1)},${paddingY + chartH}` : '';

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white font-['Outfit']">
          {title}
        </h4>
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: series1Color }} />
            <span className="text-slate-600 dark:text-slate-300">{series1Name}</span>
          </div>
          {series2Name && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: series2Color }} />
              <span className="text-slate-600 dark:text-slate-300">{series2Name}</span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[380px]">
          {/* Horizontal gridlines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = paddingY + chartH * (1 - pct);
            const val = Math.round(maxVal * pct);
            return (
              <g key={i}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="currentColor"
                  className="text-slate-100 dark:text-slate-800/80"
                  strokeDasharray="3 3"
                />
                <text
                  x={paddingX - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[10px] fill-slate-400 font-mono"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Series 1 Area & Line */}
          <polygon points={area1} fill={series1Color} fillOpacity="0.15" />
          <polyline
            fill="none"
            stroke={series1Color}
            strokeWidth="2.5"
            points={points1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Series 2 Area & Line */}
          {series2Name && (
            <>
              <polygon points={area2} fill={series2Color} fillOpacity="0.12" />
              <polyline
                fill="none"
                stroke={series2Color}
                strokeWidth="2.5"
                points={points2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* Data Points */}
          {data.map((d, i) => (
            <g key={i} className="group cursor-pointer">
              <circle
                cx={getX(i)}
                cy={getY(d.value1)}
                r="3.5"
                fill={series1Color}
                className="transition-transform group-hover:scale-150"
              />
              {series2Name && (
                <circle
                  cx={getX(i)}
                  cy={getY(d.value2 ?? 0)}
                  r="3.5"
                  fill={series2Color}
                  className="transition-transform group-hover:scale-150"
                />
              )}
              {/* X Axis Labels */}
              {i % 2 === 0 && (
                <text
                  x={getX(i)}
                  y={height - 5}
                  textAnchor="middle"
                  className="text-[10px] fill-slate-400 font-mono"
                >
                  {d.label}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

// ==========================================
// 3. STACKED STATUS DISTRIBUTION BAR
// ==========================================

export const StackedProgressBar: React.FC<{
  distribution: TestStatusDistribution;
  title?: string;
}> = ({ distribution, title }) => {
  const { passed, failed, blocked, unattempted, total } = distribution;
  if (total === 0) return null;

  const passedPct = ((passed / total) * 100).toFixed(1);
  const failedPct = ((failed / total) * 100).toFixed(1);
  const blockedPct = ((blocked / total) * 100).toFixed(1);
  const unattemptedPct = ((unattempted / total) * 100).toFixed(1);

  return (
    <div className="space-y-2">
      {title && (
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-800 dark:text-slate-200">{title}</span>
          <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{passedPct}% Pass Rate</span>
        </div>
      )}

      {/* Bar */}
      <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800 shadow-inner">
        <div 
          style={{ width: `${passedPct}%` }} 
          className="bg-emerald-500 transition-all duration-500" 
          title={`Passed: ${passed} (${passedPct}%)`}
        />
        <div 
          style={{ width: `${failedPct}%` }} 
          className="bg-rose-500 transition-all duration-500" 
          title={`Failed: ${failed} (${failedPct}%)`}
        />
        <div 
          style={{ width: `${blockedPct}%` }} 
          className="bg-amber-500 transition-all duration-500" 
          title={`Blocked: ${blocked} (${blockedPct}%)`}
        />
        <div 
          style={{ width: `${unattemptedPct}%` }} 
          className="bg-slate-400 dark:bg-slate-600 transition-all duration-500" 
          title={`Unattempted: ${unattempted} (${unattemptedPct}%)`}
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400 pt-1">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
          Passed: <strong className="text-slate-900 dark:text-white">{passed}</strong> ({passedPct}%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
          Failed: <strong className="text-slate-900 dark:text-white">{failed}</strong> ({failedPct}%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
          Blocked: <strong className="text-slate-900 dark:text-white">{blocked}</strong> ({blockedPct}%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-slate-400 dark:bg-slate-600" />
          Unattempted: <strong className="text-slate-900 dark:text-white">{unattempted}</strong> ({unattemptedPct}%)
        </span>
      </div>
    </div>
  );
};

// ==========================================
// 4. METRIC KPI STAT CARD
// ==========================================

export const MetricCard: React.FC<{
  title: string;
  value: string | number;
  target?: string;
  trend?: string;
  trendPositive?: boolean;
  statusBadge?: string;
  statusColor?: 'emerald' | 'amber' | 'rose' | 'cyan' | 'purple';
  icon?: React.ReactNode;
}> = ({
  title,
  value,
  target,
  trend,
  trendPositive,
  statusBadge,
  statusColor = 'cyan',
  icon
}) => {
  const colorMap = {
    emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-500/30',
    amber: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-500/30',
    rose: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-500/30',
    cyan: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-500/30',
    purple: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-500/30'
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-cyan-400/60 transition-all flex flex-col justify-between">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 font-['Outfit']">
          {title}
        </span>
        {icon && <div className="text-cyan-600 dark:text-cyan-400 shrink-0">{icon}</div>}
      </div>

      <div className="flex items-baseline justify-between gap-2 my-1">
        <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
          {value}
        </span>
        {statusBadge && (
          <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full border ${colorMap[statusColor]}`}>
            {statusBadge}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        {target && <span>Target: <strong className="text-slate-700 dark:text-slate-300">{target}</strong></span>}
        {trend && (
          <span className={`font-semibold ${trendPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};
