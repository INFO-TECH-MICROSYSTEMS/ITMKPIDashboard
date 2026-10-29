/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Cpu } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const RiskHighDependencyDepthKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="High Dependency Depth (Depth ≥ 4)"
      value="311"
      target="≤ 3 High Risk"
      statusBadge="Blast Radius Alert"
      statusColor="rose"
      icon={<Cpu className="w-5 h-5 text-purple-500" />}
      onJustify={() => onJustifyMetric?.('highDependencyDepth')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '280' : undefined}
    />
  );
};
