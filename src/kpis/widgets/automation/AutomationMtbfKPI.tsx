/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Clock } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const AutomationMtbfKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const mtbf = metrics.automationHealth?.mtbfHours ?? 3.8;
  return (
    <MetricCard
      title="Mean Time Between Flakes (MTBF)"
      value={`${mtbf} hrs`}
      target="> 24.0 hrs"
      trend="Deterministic Signals"
      trendPositive={mtbf >= 24.0}
      statusBadge={mtbf >= 24.0 ? 'Stable' : 'Warning'}
      statusColor={mtbf >= 24.0 ? 'emerald' : 'amber'}
      icon={<Clock className="w-5 h-5 text-purple-500" />}
      onJustify={() => onJustifyMetric?.('mtbf')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.automationHealth ? `${metricsB.automationHealth.mtbfHours} hrs` : undefined}
    />
  );
};
