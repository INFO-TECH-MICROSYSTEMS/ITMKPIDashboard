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

export const QualityDefectDensityKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const density = metrics.mttrMttd?.defectDensityKloc ?? 2.39;
  return (
    <MetricCard
      title="Defect Density per KLOC"
      value={`${density} / KLOC`}
      target="< 1.00 / KLOC"
      trend="Healthy Architecture"
      trendPositive={density <= 1.0}
      statusBadge={density <= 1.0 ? 'Target Met' : 'Elevated'}
      statusColor={density <= 1.0 ? 'emerald' : 'amber'}
      icon={<Cpu className="w-5 h-5 text-cyan-500" />}
      onJustify={() => onJustifyMetric?.('defectDensity')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.mttrMttd ? `${metricsB.mttrMttd.defectDensityKloc} / KLOC` : undefined}
    />
  );
};
