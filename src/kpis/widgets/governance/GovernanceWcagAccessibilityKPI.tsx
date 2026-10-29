/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Compass } from 'lucide-react';
import { MetricCard } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const GovernanceWcagAccessibilityKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const wcag = metrics.executiveScorecard?.accessibilityScore ?? 87.1;
  return (
    <MetricCard
      title="WCAG 2.2 AA Accessibility"
      value={`${wcag}%`}
      target="≥ 95.0%"
      statusBadge={wcag >= 95.0 ? 'Certified' : 'Audit Deficit'}
      statusColor={wcag >= 95.0 ? 'emerald' : 'amber'}
      icon={<Compass className="w-5 h-5 text-purple-500" />}
      onJustify={() => onJustifyMetric?.('accessibilityScore')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.accessibilityScore}%` : undefined}
    />
  );
};
