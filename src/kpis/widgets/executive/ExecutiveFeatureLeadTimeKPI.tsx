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

export const ExecutiveFeatureLeadTimeKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const days = sc?.featureLeadTimeDays ?? 4.1;
  return (
    <MetricCard
      title="Feature Lead Time (Commit-to-GA)"
      value={`${days} Days`}
      target="< 7.0 Days"
      trend="Rapid Flow"
      trendPositive={days <= 7.0}
      statusBadge={days <= 7.0 ? 'Optimal' : 'Delayed'}
      statusColor={days <= 7.0 ? 'emerald' : 'amber'}
      icon={<Clock className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('featureLeadTimeDays')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.featureLeadTimeDays} Days` : undefined}
    />
  );
};
