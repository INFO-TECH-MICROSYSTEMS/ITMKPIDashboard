/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { AlertOctagon } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const ExecutiveCfrCardKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const cfr = sc?.changeFailureRate ?? 10.6;
  return (
    <MetricCard
      title="Change Failure Rate (DORA)"
      value={`${cfr}%`}
      target="< 5.0% (Elite)"
      trend="-1.2% rollback rate"
      trendPositive={cfr <= 5.0}
      statusBadge={cfr <= 5.0 ? 'DORA Elite' : 'At Risk'}
      statusColor={cfr <= 5.0 ? 'emerald' : 'rose'}
      icon={<AlertOctagon className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('changeFailureRate')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.changeFailureRate}%` : undefined}
    />
  );
};
