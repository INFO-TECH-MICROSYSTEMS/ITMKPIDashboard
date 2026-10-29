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

export const ExecutiveMttrRestoreKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const mttr = sc?.meanTimeToRestoreHours ?? 73.7;
  return (
    <MetricCard
      title="Mean Time to Restore (MTTR)"
      value={`${mttr} hrs`}
      target="< 4.0 Hours"
      trend="1.4h faster P1 resolve"
      trendPositive={mttr <= 4.0}
      statusBadge={mttr <= 4.0 ? 'DORA Elite' : 'Delayed'}
      statusColor={mttr <= 4.0 ? 'emerald' : 'amber'}
      icon={<Clock className="w-5 h-5 text-purple-500" />}
      onJustify={() => onJustifyMetric?.('meanTimeToRestoreHours')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.meanTimeToRestoreHours} hrs` : undefined}
    />
  );
};
