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

export const ProductivitySpilloverRateKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const spillover = 51.4;
  return (
    <MetricCard
      title="Sprint Spillover Rate"
      value={`${spillover}%`}
      target="≤ 10.0%"
      trend="Scope Committed Delivered"
      trendPositive={spillover <= 10.0}
      statusBadge="Elevated"
      statusColor="amber"
      icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
      onJustify={() => onJustifyMetric?.('spilloverRate')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '42.0%' : undefined}
    />
  );
};
