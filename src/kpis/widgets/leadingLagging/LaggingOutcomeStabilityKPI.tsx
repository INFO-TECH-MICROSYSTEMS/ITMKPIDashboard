/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Activity } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const LaggingOutcomeStabilityKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Lagging Outcome Stability"
      value="88.7"
      target="≥ 85.0 Target"
      statusBadge="Production Stable"
      statusColor="emerald"
      icon={<Activity className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('laggingStability')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '86.4' : undefined}
    />
  );
};
