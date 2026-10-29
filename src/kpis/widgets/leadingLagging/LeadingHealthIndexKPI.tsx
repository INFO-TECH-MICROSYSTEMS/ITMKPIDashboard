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

export const LeadingHealthIndexKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Leading Health Index"
      value="92.4"
      target="≥ 90.0 Score"
      statusBadge="Predictive Safety"
      statusColor="emerald"
      icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('leadingHealthIndex')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '89.1' : undefined}
    />
  );
};
