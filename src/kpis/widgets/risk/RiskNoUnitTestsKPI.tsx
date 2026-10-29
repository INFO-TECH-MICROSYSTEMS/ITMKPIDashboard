/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { AlertOctagon } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const RiskNoUnitTestsKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Items With No Unit Tests"
      value="147"
      target="0 Permitted"
      trend="43 missing test plan"
      trendPositive={false}
      statusBadge="Gate Violation"
      statusColor="rose"
      icon={<AlertOctagon className="w-5 h-5 text-rose-500" />}
      onJustify={() => onJustifyMetric?.('noUnitTests')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '132' : undefined}
    />
  );
};
