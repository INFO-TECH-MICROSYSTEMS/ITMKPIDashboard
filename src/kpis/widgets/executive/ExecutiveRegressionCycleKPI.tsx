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

export const ExecutiveRegressionCycleKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const days = sc?.regressionCycleTimeDays ?? 1.2;
  return (
    <MetricCard
      title="Regression Cycle Time"
      value={`${days} Days`}
      target="< 2.5 Days"
      trend="42% faster via SDET"
      trendPositive={days <= 2.5}
      statusBadge={days <= 2.5 ? 'Optimal' : days <= 3.5 ? 'Acceptable' : 'Breached'}
      statusColor={days <= 2.5 ? 'emerald' : days <= 3.5 ? 'amber' : 'rose'}
      icon={<Clock className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('regressionCycleTime')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.regressionCycleTimeDays} Days` : undefined}
    />
  );
};
