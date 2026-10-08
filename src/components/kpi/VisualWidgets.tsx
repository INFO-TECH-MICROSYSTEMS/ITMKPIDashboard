/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * Reusable, Responsive Visual Widgets
 * Built with pure SVG, Tailwind CSS transitions, and zero third-party chart dependencies.
 * Provides high-performance, dark/light mode adaptable charts and gauges.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { HelpCircle } from 'lucide-react';
import type { TrendPoint, TestStatusDistribution } from '../../types/kpiPlatform';
import { KPI_STATUS_THEMES } from '../../constants/kpiConstants';

// ==========================================
// 1. CIRCULAR GAUGE METER
// ==========================================

interface GaugeMeterProps {
  score: number; // 0 - 100
  title: string;
  subtitle?: string;
  size?: number;
  grade?: string;
  onJustify?: () => void;
}

export const GaugeMeter: React.FC<GaugeMeterProps> = ({
  score,
  title,
  subtitle,
  size = 180,
  grade,
  onJustify
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
    <div className="flex flex-col items-center justify-center p-4 relative group">
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
            <button
              onClick={onJustify}
              className={`text-xs font-bold font-mono px-2.5 py-0.5 rounded-full mt-0.5 shadow-2xs flex items-center gap-1 transition-transform hover:scale-105 cursor-pointer ${
                score < 50 
                  ? 'text-rose-800 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/90 border border-rose-300 dark:border-rose-500/40 hover:bg-rose-200' 
                  : score < 75 
                  ? 'text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/90 border border-amber-300 dark:border-amber-500/40 hover:bg-amber-200' 
                  : 'text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-500/40 hover:bg-emerald-200'
              }`}
              title="Click for grade justification and breakdown"
            >
              <span>Grade {grade}</span>
              {onJustify && <HelpCircle className="w-3 h-3 opacity-70" />}
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        <span className="text-sm font-bold text-slate-900 dark:text-white text-center font-['Outfit']">
          {title}
        </span>
        {onJustify && (
          <button
            onClick={onJustify}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Click to view KPI calculation formula and rule justifications"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {subtitle && (
        <span className="text-xs text-slate-600 dark:text-slate-400 text-center mt-0.5">
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
  series3Name?: string;
  series1Color?: string;
  series2Color?: string;
  series3Color?: string;
  height?: number;
  projectionLineColor?: string;
  series3ProjectionLineColor?: string;
  forecastBadge?: string;
  onJustify?: () => void;
}

export const AreaTrendChart: React.FC<AreaTrendChartProps> = ({
  data,
  title,
  series1Name,
  series2Name,
  series3Name,
  series1Color = '#f43f5e', // Rose (Total Tests)
  series2Color = '#10b981', // Emerald (Completed Tests)
  series3Color = '#f59e0b', // Amber (Remaining Tests)
  height = 170,
  projectionLineColor = '#06b6d4', // Cyan dashed (Completed Forecast)
  series3ProjectionLineColor = '#fbbf24', // Amber dashed (Remaining Burnout Forecast)
  forecastBadge,
  onJustify
}) => {
  if (!data || data.length === 0) return null;

  const maxVal = Math.max(
    ...data.map(d => Math.max(d.value1, d.value2 ?? 0, d.value3 ?? 0)),
    8
  );

  const width = 640;
  const paddingX = 40;
  const paddingY = 18;
  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  const getX = (index: number) => paddingX + (index / (data.length - 1)) * chartW;
  const getY = (val: number) => paddingY + chartH - (val / maxVal) * chartH;

  // Split history vs projection
  const firstProjectedIndex = data.findIndex(d => d.isProjected);
  const hasProjection = firstProjectedIndex !== -1;

  // Series 1: Total Tests (Scope)
  const points1 = data.map((d, i) => `${getX(i)},${getY(d.value1)}`).join(' ');
  const area1 = `${getX(0)},${paddingY + chartH} ${points1} ${getX(data.length - 1)},${paddingY + chartH}`;

  // Series 2: Completed Tests (Historical)
  const historyData = hasProjection ? data.slice(0, firstProjectedIndex + 1) : data;
  const points2History = series2Name ? historyData.map((d, i) => `${getX(i)},${getY(d.value2 ?? 0)}`).join(' ') : '';
  const area2 = series2Name && historyData.length > 0 
    ? `${getX(0)},${paddingY + chartH} ${points2History} ${getX(historyData.length - 1)},${paddingY + chartH}` 
    : '';

  // Series 2 Projected portion (connects from last historical point onwards)
  const projectionStartIndex = hasProjection ? Math.max(0, firstProjectedIndex - 1) : -1;
  const projectedData = hasProjection ? data.slice(projectionStartIndex) : [];
  const points2Projected = hasProjection && series2Name 
    ? projectedData.map((d, idx) => `${getX(projectionStartIndex + idx)},${getY(d.value2 ?? 0)}`).join(' ') 
    : '';
  const area2Projected = hasProjection && series2Name && projectedData.length > 0
    ? `${getX(projectionStartIndex)},${paddingY + chartH} ${points2Projected} ${getX(data.length - 1)},${paddingY + chartH}`
    : '';

  // Series 3: Remaining Tests (Historical)
  const points3History = series3Name ? historyData.map((d, i) => `${getX(i)},${getY(d.value3 ?? 0)}`).join(' ') : '';
  const area3 = series3Name && historyData.length > 0
    ? `${getX(0)},${paddingY + chartH} ${points3History} ${getX(historyData.length - 1)},${paddingY + chartH}`
    : '';

  // Series 3 Projected portion (burning down to 0)
  const points3Projected = hasProjection && series3Name
    ? projectedData.map((d, idx) => `${getX(projectionStartIndex + idx)},${getY(d.value3 ?? 0)}`).join(' ')
    : '';
  const area3Projected = hasProjection && series3Name && projectedData.length > 0
    ? `${getX(projectionStartIndex)},${paddingY + chartH} ${points3Projected} ${getX(data.length - 1)},${paddingY + chartH}`
    : '';

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white font-['Outfit']">
            {title}
          </h4>
          {forecastBadge && (
            onJustify ? (
              <button
                type="button"
                onClick={onJustify}
                className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 hover:scale-105 transition-transform flex items-center gap-1 cursor-pointer"
                title="Click to view explanation, formulas, and audit clarification"
              >
                <span>{forecastBadge}</span>
                <HelpCircle className="w-2.5 h-2.5 opacity-70" />
              </button>
            ) : (
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
                {forecastBadge}
              </span>
            )
          )}
          {onJustify && (
            <button
              type="button"
              onClick={onJustify}
              className="p-1 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Click to view metric clarification & audit modal"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono">
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
          {series3Name && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: series3Color }} />
              <span className="text-slate-600 dark:text-slate-300">{series3Name}</span>
            </div>
          )}
          {hasProjection && (
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 border-t-2 border-dashed" style={{ borderColor: projectionLineColor }} />
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Projected Forecast</span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[380px]">
          <defs>
            {hasProjection && (
              <>
                <linearGradient id="forecastHatch" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={projectionLineColor} stopOpacity="0.22" />
                  <stop offset="100%" stopColor={projectionLineColor} stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="remainingForecastHatch" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={series3ProjectionLineColor} stopOpacity="0.18" />
                  <stop offset="100%" stopColor={series3ProjectionLineColor} stopOpacity="0.01" />
                </linearGradient>
              </>
            )}
          </defs>

          {/* Forecast background zone indicator */}
          {hasProjection && (
            <rect
              x={getX(firstProjectedIndex)}
              y={paddingY}
              width={chartW - (getX(firstProjectedIndex) - paddingX)}
              height={chartH}
              fill="currentColor"
              className="text-cyan-500/[0.04] dark:text-cyan-400/[0.04]"
              rx="4"
            />
          )}

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

          {/* Series 1 Area & Line: Total Tests */}
          <polygon points={area1} fill={series1Color} fillOpacity="0.08" />
          <polyline
            fill="none"
            stroke={series1Color}
            strokeWidth="2.5"
            points={points1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Series 3 Area & Line: Remaining Tests (Historical) */}
          {series3Name && (
            <>
              {area3 && <polygon points={area3} fill={series3Color} fillOpacity="0.10" />}
              <polyline
                fill="none"
                stroke={series3Color}
                strokeWidth="2.5"
                points={points3History}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* Series 3 Projected Area & Dashed Line: Remaining Tests Burnout */}
          {hasProjection && series3Name && (
            <>
              {area3Projected && <polygon points={area3Projected} fill="url(#remainingForecastHatch)" />}
              <polyline
                fill="none"
                stroke={series3ProjectionLineColor}
                strokeWidth="2.5"
                strokeDasharray="5 3"
                points={points3Projected}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* Series 2 Historical Area & Line: Completed Tests */}
          {series2Name && (
            <>
              {area2 && <polygon points={area2} fill={series2Color} fillOpacity="0.12" />}
              <polyline
                fill="none"
                stroke={series2Color}
                strokeWidth="2.5"
                points={points2History}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* Series 2 Projected Area & Dashed Line: Completed Forecast Runway */}
          {hasProjection && series2Name && (
            <>
              {area2Projected && <polygon points={area2Projected} fill="url(#forecastHatch)" />}
              <polyline
                fill="none"
                stroke={projectionLineColor}
                strokeWidth="2.5"
                strokeDasharray="6 4"
                points={points2Projected}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* Milestone demarcation line at transition into forecast */}
          {hasProjection && (
            <g>
              <line
                x1={getX(firstProjectedIndex)}
                y1={paddingY}
                x2={getX(firstProjectedIndex)}
                y2={paddingY + chartH}
                stroke={projectionLineColor}
                strokeWidth="1.5"
                strokeDasharray="2 2"
                opacity="0.8"
              />
              <text
                x={getX(firstProjectedIndex) + 4}
                y={paddingY + 12}
                className="text-[9px] fill-cyan-500 dark:fill-cyan-400 font-mono font-bold"
              >
                Today / Forecast →
              </text>
            </g>
          )}

          {/* Data Points */}
          {data.map((d, i) => {
            const isPointProjected = Boolean(d.isProjected);
            return (
              <g key={i} className="group cursor-pointer">
                {/* Total tests point */}
                <circle
                  cx={getX(i)}
                  cy={getY(d.value1)}
                  r={isPointProjected ? '2.5' : '3.5'}
                  fill={series1Color}
                  className="transition-transform group-hover:scale-150"
                />

                {/* Completed tests point */}
                {series2Name && (
                  <circle
                    cx={getX(i)}
                    cy={getY(d.value2 ?? 0)}
                    r={isPointProjected ? '3' : '3.5'}
                    fill={isPointProjected ? projectionLineColor : series2Color}
                    stroke={isPointProjected ? '#fff' : undefined}
                    strokeWidth={isPointProjected ? 1.5 : 0}
                    className="transition-transform group-hover:scale-150"
                  />
                )}

                {/* Remaining tests point */}
                {series3Name && typeof d.value3 === 'number' && (
                  <circle
                    cx={getX(i)}
                    cy={getY(d.value3)}
                    r={isPointProjected ? '3' : '3.5'}
                    fill={isPointProjected ? series3ProjectionLineColor : series3Color}
                    stroke={isPointProjected ? '#fff' : undefined}
                    strokeWidth={isPointProjected ? 1.5 : 0}
                    className="transition-transform group-hover:scale-150"
                  />
                )}

                {/* X Axis Labels (Adaptive step depending on time range window: 7d, 14d, 30d, 90d) */}
                {(() => {
                  const step = data.length > 50 ? 7 : data.length > 25 ? 4 : data.length > 14 ? 2 : 1;
                  const isFirst = i === 0;
                  const isLast = i === data.length - 1;
                  const isFirstProjected = hasProjection && i === firstProjectedIndex;
                  const shouldShow = isFirst || isLast || isFirstProjected || (i % step === 0);
                  if (!shouldShow) return null;

                  return (
                    <text
                      x={getX(i)}
                      y={height - 5}
                      textAnchor="middle"
                      className={`text-[10px] font-mono ${isPointProjected ? 'fill-cyan-500 dark:fill-cyan-400 font-bold' : 'fill-slate-400'}`}
                    >
                      {d.label}
                    </text>
                  );
                })()}
              </g>
            );
          })}
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
  onJustify?: () => void;
}> = ({ distribution, title, onJustify }) => {
  const { t } = useTranslation();
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
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-800 dark:text-slate-200">{title}</span>
            {onJustify && (
              <button
                type="button"
                onClick={onJustify}
                className="p-0.5 rounded text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                title="Click for metric clarification & formula audit"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{passedPct}% {t('kpiPlatform.executiveView.passed', 'Pass Rate')}</span>
        </div>
      )}

      {/* Bar */}
      <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800 shadow-inner">
        <div 
          style={{ width: `${passedPct}%` }} 
          className="bg-emerald-500 transition-all duration-500" 
          title={`${t('kpiPlatform.executiveView.passed', 'Passed')}: ${passed} (${passedPct}%)`}
        />
        <div 
          style={{ width: `${failedPct}%` }} 
          className="bg-rose-500 transition-all duration-500" 
          title={`${t('kpiPlatform.executiveView.failed', 'Failed')}: ${failed} (${failedPct}%)`}
        />
        <div 
          style={{ width: `${blockedPct}%` }} 
          className="bg-amber-500 transition-all duration-500" 
          title={`${t('kpiPlatform.executiveView.blocked', 'Blocked')}: ${blocked} (${blockedPct}%)`}
        />
        <div 
          style={{ width: `${unattemptedPct}%` }} 
          className="bg-slate-400 dark:bg-slate-600 transition-all duration-500" 
          title={`${t('kpiPlatform.executiveView.untested', 'Unattempted')}: ${unattempted} (${unattemptedPct}%)`}
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400 pt-1">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
          {t('kpiPlatform.executiveView.passed', 'Passed')}: <strong className="text-slate-900 dark:text-white">{passed}</strong> ({passedPct}%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
          {t('kpiPlatform.executiveView.failed', 'Failed')}: <strong className="text-slate-900 dark:text-white">{failed}</strong> ({failedPct}%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
          {t('kpiPlatform.executiveView.blocked', 'Blocked')}: <strong className="text-slate-900 dark:text-white">{blocked}</strong> ({blockedPct}%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-slate-400 dark:bg-slate-600" />
          {t('kpiPlatform.executiveView.untested', 'Unattempted')}: <strong className="text-slate-900 dark:text-white">{unattempted}</strong> ({unattemptedPct}%)
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
  onJustify?: () => void;
}> = ({
  title,
  value,
  target,
  trend,
  trendPositive,
  statusBadge,
  statusColor = 'cyan',
  icon,
  onJustify
}) => {
  const { t } = useTranslation();
  const theme = KPI_STATUS_THEMES[statusColor];

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between ${theme.card}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-['Outfit'] truncate">
            {title}
          </span>
          {onJustify && (
            <button
              onClick={onJustify}
              className="p-0.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-colors shrink-0"
              title="Click for KPI justification and audit details"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {icon && <div className={`shrink-0 ${theme.icon}`}>{icon}</div>}
      </div>

      <div className="flex items-baseline justify-between gap-2 my-1">
        <span className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${theme.value}`}>
          {value}
        </span>
        {statusBadge && (
          <button
            onClick={onJustify}
            disabled={!onJustify}
            className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full border shadow-2xs flex items-center gap-1 transition-transform ${
              onJustify ? 'hover:scale-105 cursor-pointer' : ''
            } ${theme.badge}`}
            title={onJustify ? 'Click for status audit and rule breakdown' : undefined}
          >
            <span>{statusBadge}</span>
            {onJustify && <HelpCircle className="w-2.5 h-2.5 opacity-60" />}
          </button>
        )}
      </div>

      <div className={`flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t ${theme.footerBorder}`}>
        {target && <span>{t('kpiPlatform.targetLabel', 'Target')}: <strong className="text-slate-800 dark:text-slate-200">{target}</strong></span>}
        {trend && (
          <span className={`font-semibold ${trendPositive ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

