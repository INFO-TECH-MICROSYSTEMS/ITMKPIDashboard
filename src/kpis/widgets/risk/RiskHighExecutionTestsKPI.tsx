/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Clock } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const RiskHighExecutionTestsKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="High Execution Time Tests (>300s)"
      value="189"
      target="0 Bottlenecks"
      statusBadge="Pipeline Bottleneck"
      statusColor="rose"
      icon={<Clock className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('highExecutionTests')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '175' : undefined}
    />
  );
};

// =========================================================================
// AUTOMATION ROI & PIPELINE HEALTH KPIS
// =========================================================================
