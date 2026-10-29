/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { DollarSign } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const GovernanceSlaPenaltiesKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Contract SLA Penalties"
      value="$0"
      target="$0 Incurred"
      statusBadge="No Financial Escapes"
      statusColor="emerald"
      icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('contractPenalties')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '$0' : undefined}
    />
  );
};
