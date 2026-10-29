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

export const ProductivityDevToQaRatioKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Dev-to-QA Ratio"
      value="1:1.2"
      target="Benchmark 1:3 to 1:5"
      statusBadge="Balanced Squads"
      statusColor="emerald"
      icon={<Users className="w-5 h-5 text-blue-500" />}
      onJustify={() => onJustifyMetric?.('devToQaRatio')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '1:1.5' : undefined}
    />
  );
};

// =========================================================================
// GOVERNANCE, SLAS & BENCHMARKS KPIS
// =========================================================================
