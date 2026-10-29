/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { RefreshCw } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const QualityReopenRateCardKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const rate = metrics.mttrMttd?.reopenRate ?? 15.5;
  const count = metrics.mttrMttd?.reopenedCount ?? 27;
  return (
    <MetricCard
      title="Defect Reopen Rate"
      value={`${rate}%`}
      target="< 5.0%"
      trend={`${count} reopened`}
      trendPositive={rate <= 5.0}
      statusBadge={rate <= 5.0 ? 'Controlled' : 'High Churn'}
      statusColor={rate <= 5.0 ? 'emerald' : 'rose'}
      icon={<RefreshCw className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('defectReopenRate')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.mttrMttd ? `${metricsB.mttrMttd.reopenRate}%` : undefined}
    />
  );
};
