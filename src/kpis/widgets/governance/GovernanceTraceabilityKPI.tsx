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

export const GovernanceTraceabilityKPI: React.FC<KPIWidgetRenderProps> = ({ metrics: _metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  return (
    <MetricCard
      title="Audit Trail Traceability"
      value="99.4%"
      target="100% Full Trace"
      statusBadge="Complete Evidence"
      statusColor="emerald"
      icon={<ShieldCheck className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('auditTraceability')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB ? '98.5%' : undefined}
    />
  );
};

// =========================================================================
// LEADING, LAGGING & NEAR MISS KPIS
// =========================================================================
