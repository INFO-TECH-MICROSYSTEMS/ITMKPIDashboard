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

export const AutomationPipelineRuntimeKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const runtime = metrics.automationHealth?.avgPipelineMins ?? 15.6;
  return (
    <MetricCard
      title="CI/CD Pipeline Runtime"
      value={`${runtime} mins`}
      target="< 15.0 mins"
      statusBadge={runtime <= 15.0 ? 'Optimal' : 'Moderate Latency'}
      statusColor={runtime <= 15.0 ? 'emerald' : 'amber'}
      icon={<Clock className="w-5 h-5 text-purple-500" />}
      onJustify={() => onJustifyMetric?.('pipelineRuntime')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.automationHealth ? `${metricsB.automationHealth.avgPipelineMins} mins` : undefined}
    />
  );
};
