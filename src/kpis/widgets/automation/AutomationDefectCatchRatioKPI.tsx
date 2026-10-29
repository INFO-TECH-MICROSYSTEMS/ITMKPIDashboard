/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const AutomationDefectCatchRatioKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const ratio = metrics.automationHealth?.automationCatchRatio ?? 79.2;
  return (
    <MetricCard
      title="Automation Defect Catch Ratio"
      value={`${ratio}%`}
      target="≥ 70.0%"
      trend="Shift-Left Hero"
      trendPositive={ratio >= 70.0}
      statusBadge={ratio >= 70.0 ? 'Optimal' : 'Needs Uplift'}
      statusColor={ratio >= 70.0 ? 'emerald' : 'amber'}
      icon={<ShieldCheck className="w-5 h-5 text-amber-500" />}
      onJustify={() => onJustifyMetric?.('defectCatchRatio')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.automationHealth ? `${metricsB.automationHealth.automationCatchRatio}%` : undefined}
    />
  );
};

// =========================================================================
// PLANNING, VELOCITY & SQUAD PRODUCTIVITY KPIS
// =========================================================================
