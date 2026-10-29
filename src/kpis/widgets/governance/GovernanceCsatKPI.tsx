/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Award } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const GovernanceCsatKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Stakeholder Satisfaction (CSAT)"
      value="4.7 / 5.0"
      target="≥ 4.5 Stars"
      statusBadge="High Satisfaction"
      statusColor="emerald"
      icon={<Award className="w-5 h-5 text-amber-500" />}
      onJustify={() => onJustifyMetric?.('csat')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '4.5 / 5.0' : undefined}
    />
  );
};
