/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { AreaTrendChart } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const QualityDefectBurnoutChartKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, onJustifyMetric, onRemove }) => {
  const data = metrics.defectTrends || [
    { date: '2026-10-01', label: 'Day 1', value1: 24, value2: 18, value3: 6 },
    { date: '2026-10-03', label: 'Day 3', value1: 32, value2: 25, value3: 7 },
    { date: '2026-10-06', label: 'Day 6', value1: 45, value2: 38, value3: 7 },
    { date: '2026-10-09', label: 'Day 9', value1: 52, value2: 48, value3: 4 },
    { date: '2026-10-12', label: 'Day 12', value1: 58, value2: 56, value3: 2 }
  ];
  return (
    <AreaTrendChart
      data={data}
      title="Defect Discovery Rate vs. Defect Resolution Burnout (14-Day Velocity)"
      series1Name="Discovered Defects"
      series2Name="Resolved / Burned Out"
      series1Color="#f43f5e"
      series2Color="#10b981"
      height={170}
      onJustify={() => onJustifyMetric?.('defectBurnoutTrend')}
      onRemove={onRemove}
    />
  );
};

// =========================================================================
// RISK ASSESSMENT & QUALITY GATES KPIS
// =========================================================================
