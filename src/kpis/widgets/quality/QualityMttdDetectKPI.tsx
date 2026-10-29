/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Zap } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const QualityMttdDetectKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const mttd = metrics.mttrMttd?.avgMttdHours ?? 42.7;
  return (
    <MetricCard
      title="Mean Time to Detect (MTTD)"
      value={`${mttd} hrs`}
      target="< 6.0 hrs"
      statusBadge={mttd <= 6.0 ? 'Optimal' : 'Critical Lag'}
      statusColor={mttd <= 6.0 ? 'emerald' : 'rose'}
      icon={<Zap className="w-5 h-5 text-amber-500" />}
      onJustify={() => onJustifyMetric?.('meanTimeToDetect')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.mttrMttd ? `${metricsB.mttrMttd.avgMttdHours} hrs` : undefined}
    />
  );
};
