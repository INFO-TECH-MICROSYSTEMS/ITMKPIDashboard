/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const AutomationFlakyIndexKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const flakyRate = metrics.automationHealth?.flakyRate ?? 3.6;
  const count = metrics.automationHealth?.flakyCount ?? 32;
  return (
    <MetricCard
      title="Flaky Test Detection Index"
      value={`${flakyRate}%`}
      target="< 4.0%"
      trend={`${count} flaky tests`}
      trendPositive={flakyRate <= 4.0}
      statusBadge={flakyRate <= 4.0 ? 'Controlled' : 'Elevated'}
      statusColor={flakyRate <= 4.0 ? 'emerald' : 'amber'}
      icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
      onJustify={() => onJustifyMetric?.('flakyIndex')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.automationHealth ? `${metricsB.automationHealth.flakyRate}%` : undefined}
    />
  );
};
