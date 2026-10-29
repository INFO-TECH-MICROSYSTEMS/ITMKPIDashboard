/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Users } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const ProductivityOvercommittedKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Over-Committed Engineers"
      value="0"
      target="0 Burnout Risk"
      statusBadge="Balanced"
      statusColor="emerald"
      icon={<Users className="w-5 h-5 text-amber-500" />}
      onJustify={() => onJustifyMetric?.('overcommittedEngineers')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '1' : undefined}
    />
  );
};
