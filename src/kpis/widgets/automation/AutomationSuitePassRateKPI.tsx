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

export const AutomationSuitePassRateKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const rate = metrics.automationHealth?.automationRatioPercent ?? 84.6;
  return (
    <MetricCard
      title="Automated Test Suite Pass Rate"
      value={`${rate}%`}
      target="≥ 90.0%"
      trend="+3.2% vs last cycle"
      trendPositive={true}
      statusBadge={rate >= 90.0 ? 'Optimal' : 'Acceptable'}
      statusColor={rate >= 90.0 ? 'emerald' : 'amber'}
      icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('automationSuitePassRate')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.automationHealth ? `${metricsB.automationHealth.automationRatioPercent}%` : undefined}
    />
  );
};
