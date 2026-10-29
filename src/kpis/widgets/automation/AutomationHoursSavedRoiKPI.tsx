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

export const AutomationHoursSavedRoiKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const hrs = metrics.automationHealth?.manualHoursSaved ?? 218;
  return (
    <MetricCard
      title="Manual Hours Saved (ROI)"
      value={`${hrs} hrs`}
      target="~3.5 FTEs"
      trend="Saved per cycle"
      trendPositive={true}
      statusBadge="High ROI"
      statusColor="emerald"
      icon={<Zap className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('hoursSavedRoi')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.automationHealth ? `${metricsB.automationHealth.manualHoursSaved} hrs` : undefined}
    />
  );
};
