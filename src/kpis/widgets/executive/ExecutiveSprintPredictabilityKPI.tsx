/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const ExecutiveSprintPredictabilityKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const spi = sc?.sprintPredictabilityIndex ?? 49.9;
  return (
    <MetricCard
      title="Sprint Predictability Index"
      value={`${spi}%`}
      target="85% - 100%"
      trend="+4.5% vs Sprint Avg"
      trendPositive={spi >= 85}
      statusBadge={spi >= 85 ? 'On Target' : 'Warning'}
      statusColor={spi >= 85 ? 'emerald' : 'amber'}
      icon={<CheckCircle2 className="w-5 h-5 text-blue-500" />}
      onJustify={() => onJustifyMetric?.('sprintPredictabilityIndex')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.sprintPredictabilityIndex}%` : undefined}
    />
  );
};
