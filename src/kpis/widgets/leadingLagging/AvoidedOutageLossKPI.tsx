/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { DollarSign } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const AvoidedOutageLossKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const loss = metrics.nearMissAnalytics?.totalAvoidedOutageCost ?? 184500;
  return (
    <MetricCard
      title="Avoided Outage Loss"
      value={`$${(loss / 1000).toFixed(0)}k`}
      target="Averted Downtime"
      statusBadge="High Risk Value"
      statusColor="emerald"
      icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('totalAvoidedOutageCost')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.nearMissAnalytics ? `$${((metricsB.nearMissAnalytics.totalAvoidedOutageCost ?? 184500) / 1000).toFixed(0)}k` : undefined}
    />
  );
};

// =========================================================================
// MASTER WIDGET RESOLVER
// =========================================================================
