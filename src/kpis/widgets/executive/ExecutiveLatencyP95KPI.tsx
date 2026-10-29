/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Zap } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const ExecutiveLatencyP95KPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const p95 = sc?.performanceP95Ms ?? 135;
  return (
    <MetricCard
      title="P95 Latency Benchmark"
      value={`${p95} ms`}
      target="< 200 ms"
      statusBadge="P99: 380ms"
      statusColor={p95 <= 200 ? 'emerald' : p95 <= 350 ? 'amber' : 'rose'}
      icon={<Zap className="w-5 h-5 text-purple-500" />}
      onJustify={() => onJustifyMetric?.('performanceP95')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.performanceP95Ms} ms` : undefined}
    />
  );
};
