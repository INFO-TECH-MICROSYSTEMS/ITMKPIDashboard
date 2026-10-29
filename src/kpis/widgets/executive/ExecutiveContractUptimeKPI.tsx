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

export const ExecutiveContractUptimeKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const uptime = sc?.contractUptimePercentage ?? 96.82;
  return (
    <MetricCard
      title="Contractual SLA Uptime"
      value={`${uptime}%`}
      target="≥ 99.95%"
      trend="Four Nines Tier"
      trendPositive={uptime >= 99.95}
      statusBadge={uptime >= 99.95 ? 'Compliant' : 'Breached'}
      statusColor={uptime >= 99.95 ? 'emerald' : 'rose'}
      icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('contractUptimePercentage')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.contractUptimePercentage}%` : undefined}
    />
  );
};
