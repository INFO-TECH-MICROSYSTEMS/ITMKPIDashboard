/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { DollarSign } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const ExecutiveCopqCardKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const copq = sc?.costOfPoorQuality ?? 675640;
  return (
    <MetricCard
      title="Cost of Poor Quality (CoPQ)"
      value={`$${copq.toLocaleString()}`}
      target="< $25,000"
      trend="+$21,090 automated savings"
      trendPositive={true}
      statusBadge={copq < 25000 ? 'Controlled' : 'Elevated'}
      statusColor={copq < 25000 ? 'emerald' : 'amber'}
      icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('costOfPoorQuality')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `$${(metricsB.executiveScorecard.costOfPoorQuality ?? 675640).toLocaleString()}` : undefined}
    />
  );
};
