/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Activity } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const QualityNetIntakeVelocityKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const net = metrics.mttrMttd?.netDefectIntakeVelocity ?? 173;
  return (
    <MetricCard
      title="Net Defect Intake Velocity"
      value={`+${net} Bugs`}
      target="≤ 0 (Burning Down)"
      trend="Backlog Burnout"
      trendPositive={net <= 0}
      statusBadge={net <= 0 ? 'Burning Down' : 'Elevated'}
      statusColor={net <= 0 ? 'emerald' : 'amber'}
      icon={<Activity className="w-5 h-5 text-amber-500" />}
      onJustify={() => onJustifyMetric?.('netDefectIntake')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.mttrMttd ? `+${metricsB.mttrMttd.netDefectIntakeVelocity} Bugs` : undefined}
    />
  );
};
