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

export const ExecutiveBlockerCardKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const count = sc?.gatingDefectCount ?? 47;
  return (
    <MetricCard
      title="Blocking / Gating Defects"
      value={count}
      target="0 Blockers"
      statusBadge={count === 0 ? 'Optimal' : count <= 2 ? 'Warning' : 'Action Required'}
      statusColor={count === 0 ? 'emerald' : count <= 2 ? 'amber' : 'rose'}
      icon={<AlertOctagon className="w-5 h-5 text-rose-500" />}
      onJustify={() => onJustifyMetric?.('blockerDefects')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard?.gatingDefectCount}
    />
  );
};
