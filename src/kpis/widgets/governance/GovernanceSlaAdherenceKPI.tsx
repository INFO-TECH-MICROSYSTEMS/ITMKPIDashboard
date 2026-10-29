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

export const GovernanceSlaAdherenceKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const adherence = metrics.executiveScorecard?.slaAdherenceRate ?? 87.3;
  return (
    <MetricCard
      title="Overall SLA Adherence"
      value={`${adherence}%`}
      target="≥ 95.0%"
      statusBadge={adherence >= 95.0 ? 'Certified' : 'SLA Breached'}
      statusColor={adherence >= 95.0 ? 'emerald' : 'rose'}
      icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />}
      onJustify={() => onJustifyMetric?.('slaAdherence')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.slaAdherenceRate}%` : undefined}
    />
  );
};
