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

export const ExecutiveSecurityVulnsKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
  const sc = metrics.executiveScorecard;
  const vulns = sc?.criticalVulnerabilitiesCount ?? 22;
  return (
    <MetricCard
      title="Security Gate Vulnerabilities"
      value={`${vulns} CVEs`}
      target="0 Open CVEs"
      trend="Zero Criticals"
      trendPositive={vulns === 0}
      statusBadge={vulns === 0 ? 'Certified' : 'Gate Violation'}
      statusColor={vulns === 0 ? 'emerald' : 'rose'}
      icon={<AlertOctagon className="w-5 h-5 text-rose-500" />}
      onJustify={() => onJustifyMetric?.('securityVulnerabilities')}
      onRemove={onRemove}
      isComparing={isCompareMode}
      compareValue={metricsB?.executiveScorecard ? `${metricsB.executiveScorecard.criticalVulnerabilitiesCount} CVEs` : undefined}
    />
  );
};
