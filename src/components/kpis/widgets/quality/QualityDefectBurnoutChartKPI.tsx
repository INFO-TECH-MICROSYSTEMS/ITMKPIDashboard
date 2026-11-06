/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { TrendingDown } from 'lucide-react';
import { AreaTrendChart } from '../../../kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const QualityDefectBurnoutChartKPI: React.FC<KPIWidgetRenderProps> = ({ 
  metrics, 
  metricsB,
  isCompareMode,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  onJustifyMetric, 
  onRemove 
}) => {
  const data = metrics.defectTrends || [
    { date: '2026-10-01', label: 'Day 1', value1: 24, value2: 18, value3: 6 },
    { date: '2026-10-03', label: 'Day 3', value1: 32, value2: 25, value3: 7 },
    { date: '2026-10-06', label: 'Day 6', value1: 45, value2: 38, value3: 7 },
    { date: '2026-10-09', label: 'Day 9', value1: 52, value2: 48, value3: 4 },
    { date: '2026-10-12', label: 'Day 12', value1: 58, value2: 56, value3: 2 }
  ];

  const dataB = metricsB?.defectTrends || [
    { date: '2026-10-01', label: 'Day 1', value1: 18, value2: 14, value3: 4 },
    { date: '2026-10-03', label: 'Day 3', value1: 25, value2: 20, value3: 5 },
    { date: '2026-10-06', label: 'Day 6', value1: 34, value2: 30, value3: 4 },
    { date: '2026-10-09', label: 'Day 9', value1: 41, value2: 38, value3: 3 },
    { date: '2026-10-12', label: 'Day 12', value1: 46, value2: 45, value3: 1 }
  ];

  return (
    <div className="space-y-4 relative group">
      <AreaTrendChart
        data={data}
        icon={<TrendingDown className="w-4 h-4 text-emerald-500" />}
        title="Defect Discovery Rate vs. Defect Resolution Burnout (14-Day Velocity)"
        scopeLabel={isCompareMode ? scopeALabel : undefined}
        scopeType="primary"
        series1Name="Discovered Defects"
        series2Name="Resolved / Burned Out"
        series1Color="#f43f5e"
        series2Color="#10b981"
        height={170}
        onJustify={() => onJustifyMetric?.('defectBurnoutTrend', 'A')}
        onRemove={onRemove}
      />

      {isCompareMode && (
        <AreaTrendChart
          data={dataB}
          icon={<TrendingDown className="w-4 h-4 text-purple-500" />}
          title="Defect Discovery Rate vs. Defect Resolution Burnout (Scope B Velocity)"
          scopeLabel={scopeBLabel}
          scopeType="secondary"
          series1Name="Discovered Defects"
          series2Name="Resolved / Burned Out"
          series1Color="#f43f5e"
          series2Color="#a855f7"
          projectionLineColor="#a855f7"
          height={170}
          onJustify={() => onJustifyMetric?.('defectBurnoutTrend', 'B')}
        />
      )}
    </div>
  );
};

// =========================================================================
// RISK ASSESSMENT & QUALITY GATES KPIS
// =========================================================================
