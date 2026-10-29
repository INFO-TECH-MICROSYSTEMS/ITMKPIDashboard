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

export const RiskNoApiTestsKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Items With No API Tests"
      value="225"
      target="≤ 5 Exceptions"
      statusBadge="Contract Risk"
      statusColor="rose"
      icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
      onJustify={() => onJustifyMetric?.('noApiTests')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '210' : undefined}
    />
  );
};
