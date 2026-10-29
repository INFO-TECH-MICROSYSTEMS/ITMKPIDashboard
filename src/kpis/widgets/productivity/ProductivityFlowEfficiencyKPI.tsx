/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { TrendingUp } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const ProductivityFlowEfficiencyKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const flow = 28.4;
  return (
    <MetricCard
      title="Flow Efficiency (Active vs Idle)"
      value={`${flow}%`}
      target="≥ 45.0%"
      trend="Minimal Idle Staging"
      trendPositive={flow >= 45.0}
      statusBadge="Delayed"
      statusColor="amber"
      icon={<TrendingUp className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('flowEfficiency')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '31.5%' : undefined}
    />
  );
};
