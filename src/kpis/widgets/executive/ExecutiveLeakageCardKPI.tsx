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

export const ExecutiveLeakageCardKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const rate = sc?.defectLeakageRate ?? 48.1;
  return (
    <MetricCard
      title="Defect Leakage (Customer APARs)"
      value={`${rate}%`}
      target="< 3.0%"
      trend="-0.8% vs last sprint"
      trendPositive={rate <= 3.0}
      statusBadge={rate <= 3.0 ? 'Controlled' : rate <= 5.0 ? 'Acceptable' : 'Breached'}
      statusColor={rate <= 3.0 ? 'emerald' : rate <= 5.0 ? 'amber' : 'rose'}
      icon={<TrendingUp className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('defectLeakage')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.defectLeakageRate}%` : undefined}
    />
  );
};
