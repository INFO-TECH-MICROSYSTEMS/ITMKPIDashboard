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

export const QualityFirstTimeFixRateKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const ftfr = metrics.mttrMttd?.firstTimeFixRate ?? 84.5;
  return (
    <MetricCard
      title="First-Time Fix Rate (FTFR)"
      value={`${ftfr}%`}
      target="≥ 90.0%"
      trend="High Fix Rigor"
      trendPositive={ftfr >= 90.0}
      statusBadge={ftfr >= 90.0 ? 'Certified' : 'Warning'}
      statusColor={ftfr >= 90.0 ? 'emerald' : 'amber'}
      icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('firstTimeFixRate')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.mttrMttd ? `${metricsB.mttrMttd.firstTimeFixRate}%` : undefined}
    />
  );
};
