/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const QualityCustomerAparsKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const apars = 167;
  return (
    <MetricCard
      title="Customer Escalations (APARs)"
      value={apars}
      target="< 10 Total"
      statusBadge="Severe Escapes"
      statusColor="rose"
      icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
      onJustify={() => onJustifyMetric?.('customerEscalations')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? 152 : undefined}
    />
  );
};
