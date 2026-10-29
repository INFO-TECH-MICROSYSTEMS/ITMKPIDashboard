/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Cpu } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const AutomationComputeCostKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const cost = metrics.automationHealth?.cicdComputeCostDollars ?? 317;
  return (
    <MetricCard
      title="CI/CD Runner Compute Cost"
      value={`$${cost}`}
      target="< $250 / Sprint"
      trend="Cloud FinOps Optimal"
      trendPositive={cost <= 250}
      statusBadge={cost <= 250 ? 'Controlled' : 'Elevated'}
      statusColor={cost <= 250 ? 'emerald' : 'amber'}
      icon={<Cpu className="w-5 h-5 text-blue-500" />}
      onJustify={() => onJustifyMetric?.('computeCost')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.automationHealth ? `$${metricsB.automationHealth.cicdComputeCostDollars}` : undefined}
    />
  );
};
