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

export const QualityMttrResolveKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const mttr = metrics.mttrMttd?.avgMttrHours ?? 83.8;
  return (
    <MetricCard
      title="Mean Time to Resolve (MTTR)"
      value={`${mttr} hrs`}
      target="< 24.0 hrs"
      trend="8.5% faster"
      trendPositive={true}
      statusBadge={mttr <= 24.0 ? 'Optimal' : 'Breached'}
      statusColor={mttr <= 24.0 ? 'emerald' : 'rose'}
      icon={<Clock className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('meanTimeToResolve')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.mttrMttd ? `${metricsB.mttrMttd.avgMttrHours} hrs` : undefined}
    />
  );
};
