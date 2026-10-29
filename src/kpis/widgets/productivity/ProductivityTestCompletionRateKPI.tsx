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

export const ProductivityTestCompletionRateKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const rate = 91.0;
  return (
    <MetricCard
      title="Avg QA Test Completion Rate"
      value={`${rate}%`}
      target="> 85.0%"
      trend="+4.1% sprint velocity"
      trendPositive={true}
      statusBadge="On Target"
      statusColor="emerald"
      icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('testCompletionRate')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '88.2%' : undefined}
    />
  );
};
