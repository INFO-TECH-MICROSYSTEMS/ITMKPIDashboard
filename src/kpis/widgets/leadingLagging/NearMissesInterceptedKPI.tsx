/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const NearMissesInterceptedKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const escapes = metrics.nearMissAnalytics?.escapePreventionRatio ?? 94.6;
  return (
    <MetricCard
      title="Near Misses Intercepted"
      value={`${escapes}%`}
      target="≥ 90.0%"
      statusBadge="Zero Escaped Outages"
      statusColor="emerald"
      icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('escapePreventionRatio')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.nearMissAnalytics ? `${metricsB.nearMissAnalytics.escapePreventionRatio}%` : undefined}
    />
  );
};
