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

export const ProductivityStoryCompletionKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const rate = 49.9;
  return (
    <MetricCard
      title="Sprint Story Completion Rate"
      value={`${rate}%`}
      target="≥ 80.0%"
      statusBadge="Slipping"
      statusColor="rose"
      icon={<CheckCircle2 className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('storyCompletionRate')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '65.0%' : undefined}
    />
  );
};
